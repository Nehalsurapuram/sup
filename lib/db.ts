import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { menuSeed } from "@/lib/data/menu-seed";

// SQLite persistence, using Node's built-in driver (no native dependency).
// Everything the app writes — orders and admin menu edits — survives a
// restart. The file lives in .data/ and is gitignored.
//
// Deploy note: this assumes a single server process with a writable disk
// (local dev, a VM, or a container with a volume). On a read-only or
// multi-instance serverless host, point DATABASE_PATH at a networked
// database instead.

const DB_PATH =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), ".data", "caffora.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS menu_items (
  id           TEXT PRIMARY KEY,
  name         TEXT    NOT NULL,
  description  TEXT    NOT NULL,
  price_paise  INTEGER NOT NULL,
  category     TEXT    NOT NULL,
  emoji        TEXT    NOT NULL,
  tags         TEXT    NOT NULL DEFAULT '[]',
  featured     INTEGER NOT NULL DEFAULT 0,
  available    INTEGER NOT NULL DEFAULT 1,
  base_calories INTEGER,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id             TEXT PRIMARY KEY,
  number         INTEGER NOT NULL UNIQUE,
  customer_name  TEXT    NOT NULL,
  type           TEXT    NOT NULL,
  note           TEXT,
  status         TEXT    NOT NULL,
  subtotal_paise INTEGER NOT NULL,
  created_at     TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS order_lines (
  order_id    TEXT    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  line_id     TEXT    NOT NULL,
  item_id     TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  emoji       TEXT    NOT NULL,
  price_paise INTEGER NOT NULL,
  qty         INTEGER NOT NULL,
  calories    INTEGER NOT NULL,
  options     TEXT    NOT NULL DEFAULT '[]',
  position    INTEGER NOT NULL,
  PRIMARY KEY (order_id, line_id)
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_lines_order ON order_lines(order_id);
`;

function connect(): DatabaseSync {
  mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(SCHEMA);
  seedMenu(db);
  return db;
}

/** Load the starter menu the first time the database is created. */
function seedMenu(db: DatabaseSync): void {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM menu_items").get() as {
    count: number;
  };
  if (count > 0) return;

  const insert = db.prepare(
    `INSERT INTO menu_items
       (id, name, description, price_paise, category, emoji, tags,
        featured, available, base_calories, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  transaction(db, () => {
    menuSeed.forEach((item, index) => {
      insert.run(
        item.id,
        item.name,
        item.description,
        item.pricePaise,
        item.category,
        item.emoji,
        JSON.stringify(item.tags),
        item.featured ? 1 : 0,
        item.available === false ? 0 : 1,
        item.baseCalories ?? null,
        index,
      );
    });
  });
}

/** Run `fn` inside a transaction, rolling back if it throws. */
export function transaction<T>(db: DatabaseSync, fn: () => T): T {
  db.exec("BEGIN");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

// Cache the connection on globalThis so dev-server hot reloads reuse one
// handle instead of opening a new one per recompile.
const globalForDb = globalThis as typeof globalThis & {
  __cafforaDb?: DatabaseSync;
};

export const db: DatabaseSync = (globalForDb.__cafforaDb ??= connect());
