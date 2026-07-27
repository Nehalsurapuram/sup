import { db, transaction } from "@/lib/db";
import type {
  NewOrderInput,
  Order,
  OrderLine,
  OrderStatus,
  OrderType,
} from "@/lib/types";

// Order store, persisted in SQLite. Shared by customer checkout, staff POS,
// and admin — all three read the same rows, so an order placed at checkout
// shows up on the POS board and survives a server restart.

const STATUS_FLOW: OrderStatus[] = ["new", "preparing", "ready", "completed"];

interface OrderRow {
  id: string;
  number: number;
  customer_name: string;
  type: string;
  note: string | null;
  status: string;
  subtotal_paise: number;
  created_at: string;
}

interface LineRow {
  order_id: string;
  line_id: string;
  item_id: string;
  name: string;
  emoji: string;
  price_paise: number;
  qty: number;
  calories: number;
  options: string;
}

function toLine(row: LineRow): OrderLine {
  return {
    lineId: row.line_id,
    itemId: row.item_id,
    name: row.name,
    emoji: row.emoji,
    pricePaise: row.price_paise,
    qty: row.qty,
    calories: row.calories,
    options: JSON.parse(row.options) as string[],
  };
}

function toOrder(row: OrderRow, items: OrderLine[]): Order {
  return {
    id: row.id,
    number: row.number,
    items,
    subtotalPaise: row.subtotal_paise,
    customerName: row.customer_name,
    type: row.type as OrderType,
    note: row.note ?? undefined,
    status: row.status as OrderStatus,
    createdAt: row.created_at,
  };
}

const SELECT_ORDER = `
  SELECT id, number, customer_name, type, note, status, subtotal_paise, created_at
  FROM orders`;

const SELECT_LINES = `
  SELECT order_id, line_id, item_id, name, emoji, price_paise, qty, calories, options
  FROM order_lines
  WHERE order_id = ?
  ORDER BY position`;

/** Attach lines to a set of order rows, newest first. */
function hydrate(rows: OrderRow[]): Order[] {
  const lines = db.prepare(SELECT_LINES);
  return rows.map((row) =>
    toOrder(row, (lines.all(row.id) as unknown as LineRow[]).map(toLine)),
  );
}

export async function createOrder(input: NewOrderInput): Promise<Order> {
  const subtotalPaise = input.items.reduce(
    (sum, line) => sum + line.pricePaise * line.qty,
    0,
  );
  const order: Order = {
    id: crypto.randomUUID(),
    number: 0, // assigned inside the transaction, below
    items: input.items,
    subtotalPaise,
    customerName: input.customerName.trim() || "Guest",
    type: input.type,
    note: input.note?.trim() || undefined,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  return transaction(db, () => {
    // Numbering starts at 101, and stays unique because MAX() and the
    // INSERT share one transaction.
    const { next } = db
      .prepare("SELECT COALESCE(MAX(number), 100) + 1 AS next FROM orders")
      .get() as { next: number };
    order.number = next;

    db.prepare(
      `INSERT INTO orders
         (id, number, customer_name, type, note, status, subtotal_paise, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      order.id,
      order.number,
      order.customerName,
      order.type,
      order.note ?? null,
      order.status,
      order.subtotalPaise,
      order.createdAt,
    );

    const insertLine = db.prepare(
      `INSERT INTO order_lines
         (order_id, line_id, item_id, name, emoji, price_paise, qty, calories, options, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    order.items.forEach((line, index) => {
      insertLine.run(
        order.id,
        line.lineId,
        line.itemId,
        line.name,
        line.emoji,
        line.pricePaise,
        line.qty,
        line.calories,
        JSON.stringify(line.options),
        index,
      );
    });

    return order;
  });
}

export async function getOrders(): Promise<Order[]> {
  const rows = db
    .prepare(`${SELECT_ORDER} ORDER BY number DESC`)
    .all() as unknown as OrderRow[];
  return hydrate(rows);
}

export async function getActiveOrders(): Promise<Order[]> {
  const rows = db
    .prepare(`${SELECT_ORDER} WHERE status != 'completed' ORDER BY number DESC`)
    .all() as unknown as OrderRow[];
  return hydrate(rows);
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const row = db.prepare(`${SELECT_ORDER} WHERE id = ?`).get(id) as
    | OrderRow
    | undefined;
  return row ? hydrate([row])[0] : undefined;
}

/** Move an order to the next stage in the fulfillment flow. */
export function advanceOrder(id: string): void {
  const row = db.prepare("SELECT status FROM orders WHERE id = ?").get(id) as
    | { status: string }
    | undefined;
  if (!row) return;

  const idx = STATUS_FLOW.indexOf(row.status as OrderStatus);
  if (idx < 0 || idx >= STATUS_FLOW.length - 1) return;
  setOrderStatus(id, STATUS_FLOW[idx + 1]);
}

export function setOrderStatus(id: string, status: OrderStatus): void {
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
}

// --- Stats for the admin dashboard -----------------------------------

export interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  revenuePaise: number;
  itemsSold: number;
  topItems: { name: string; emoji: string; qty: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const totals = db
    .prepare(
      `SELECT COUNT(*) AS total,
              COALESCE(SUM(subtotal_paise), 0) AS revenue,
              COALESCE(SUM(status != 'completed'), 0) AS active
       FROM orders`,
    )
    .get() as { total: number; revenue: number; active: number };

  const { sold } = db
    .prepare("SELECT COALESCE(SUM(qty), 0) AS sold FROM order_lines")
    .get() as { sold: number };

  // Lines store the name/emoji as sold, so renaming a menu item later
  // doesn't rewrite history. If a name did change mid-life, SQLite picks
  // one of the group's rows for the label — the totals stay correct.
  const topItems = db
    .prepare(
      `SELECT name, emoji, SUM(qty) AS qty
       FROM order_lines
       GROUP BY item_id
       ORDER BY qty DESC
       LIMIT 5`,
    )
    .all() as unknown as { name: string; emoji: string; qty: number }[];

  return {
    totalOrders: totals.total,
    activeOrders: totals.active,
    revenuePaise: totals.revenue,
    itemsSold: sold,
    topItems,
  };
}
