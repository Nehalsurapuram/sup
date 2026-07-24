import type { NewOrderInput, Order, OrderStatus } from "@/lib/types";

// In-memory order store (mock). Shared by customer checkout, staff POS,
// and admin. Resets when the server restarts. Replace with a DB later.

const orders: Order[] = [];
let counter = 100;

const STATUS_FLOW: OrderStatus[] = ["new", "preparing", "ready", "completed"];

export async function createOrder(input: NewOrderInput): Promise<Order> {
  const subtotalPaise = input.items.reduce(
    (sum, line) => sum + line.pricePaise * line.qty,
    0,
  );
  const order: Order = {
    id: crypto.randomUUID(),
    number: ++counter,
    items: input.items,
    subtotalPaise,
    customerName: input.customerName.trim() || "Guest",
    type: input.type,
    note: input.note?.trim() || undefined,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  return order;
}

export async function getOrders(): Promise<Order[]> {
  return [...orders];
}

export async function getActiveOrders(): Promise<Order[]> {
  return orders.filter((o) => o.status !== "completed");
}

export async function getOrder(id: string): Promise<Order | undefined> {
  return orders.find((o) => o.id === id);
}

/** Move an order to the next stage in the fulfillment flow. */
export function advanceOrder(id: string): void {
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  const idx = STATUS_FLOW.indexOf(order.status);
  if (idx >= 0 && idx < STATUS_FLOW.length - 1) {
    order.status = STATUS_FLOW[idx + 1];
  }
}

export function setOrderStatus(id: string, status: OrderStatus): void {
  const order = orders.find((o) => o.id === id);
  if (order) order.status = status;
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
  const revenuePaise = orders.reduce((sum, o) => sum + o.subtotalPaise, 0);
  const itemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, l) => s + l.qty, 0),
    0,
  );

  const byItem = new Map<string, { name: string; emoji: string; qty: number }>();
  for (const o of orders) {
    for (const line of o.items) {
      const cur = byItem.get(line.itemId) ?? {
        name: line.name,
        emoji: line.emoji,
        qty: 0,
      };
      cur.qty += line.qty;
      byItem.set(line.itemId, cur);
    }
  }
  const topItems = [...byItem.values()]
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return {
    totalOrders: orders.length,
    activeOrders: orders.filter((o) => o.status !== "completed").length,
    revenuePaise,
    itemsSold,
    topItems,
  };
}
