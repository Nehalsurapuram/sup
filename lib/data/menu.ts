import { db } from "@/lib/db";
import type { Category, CategoryId, MenuItem } from "@/lib/types";

// --- Menu data layer -------------------------------------------------
// Backed by SQLite, so admin edits survive a restart. The starter menu
// lives in menu-seed.ts and is loaded on first run.

// Categories are structural, not editable, so they stay in code.
export const categories: Category[] = [
  { id: "hot-coffee", name: "Hot Coffees", description: "Espresso classics and freshly brewed coffee." },
  { id: "cold-coffee", name: "Cold Coffees", description: "Iced espresso and slow-steeped cold brew." },
  { id: "frappuccino", name: "Frappuccino", description: "Blended iced beverages, coffee and crème." },
  { id: "hot-tea", name: "Hot Teas", description: "Tea lattes and brewed loose-leaf teas." },
  { id: "cold-drink", name: "Cold Drinks", description: "Refreshers, iced teas, and coolers." },
  { id: "hot-drink", name: "Hot Drinks", description: "Hot chocolate and steamed favorites." },
  { id: "bakery", name: "Bakery", description: "Croissants, muffins, cookies, and cakes." },
  { id: "food", name: "Food", description: "Sandwiches, wraps, and all-day bites." },
];

interface MenuRow {
  id: string;
  name: string;
  description: string;
  price_paise: number;
  category: string;
  emoji: string;
  tags: string;
  featured: number;
  available: number;
  base_calories: number | null;
}

function toMenuItem(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    pricePaise: row.price_paise,
    category: row.category as CategoryId,
    emoji: row.emoji,
    tags: JSON.parse(row.tags) as string[],
    featured: row.featured === 1,
    available: row.available === 1,
    baseCalories: row.base_calories ?? undefined,
  };
}

const SELECT_ITEM = `
  SELECT id, name, description, price_paise, category, emoji, tags,
         featured, available, base_calories
  FROM menu_items`;

// --- Read accessors --------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getMenu(): Promise<MenuItem[]> {
  const rows = db
    .prepare(`${SELECT_ITEM} ORDER BY sort_order`)
    .all() as unknown as MenuRow[];
  return rows.map(toMenuItem);
}

export async function getMenuByCategory(
  category: CategoryId,
): Promise<MenuItem[]> {
  const rows = db
    .prepare(`${SELECT_ITEM} WHERE category = ? ORDER BY sort_order`)
    .all(category) as unknown as MenuRow[];
  return rows.map(toMenuItem);
}

export async function getFeaturedItems(): Promise<MenuItem[]> {
  const rows = db
    .prepare(
      `${SELECT_ITEM} WHERE featured = 1 AND available = 1 ORDER BY sort_order`,
    )
    .all() as unknown as MenuRow[];
  return rows.map(toMenuItem);
}

export async function getMenuItem(id: string): Promise<MenuItem | undefined> {
  const row = db.prepare(`${SELECT_ITEM} WHERE id = ?`).get(id) as
    | MenuRow
    | undefined;
  return row ? toMenuItem(row) : undefined;
}

// --- Write accessors (used by the admin dashboard) -------------------

export function toggleItemAvailability(id: string): void {
  db.prepare("UPDATE menu_items SET available = 1 - available WHERE id = ?").run(
    id,
  );
}

export function addMenuItem(input: Omit<MenuItem, "id">): MenuItem {
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { count } = db
    .prepare("SELECT COUNT(*) AS count FROM menu_items")
    .get() as { count: number };

  // Suffix until the slug is free, so adding a duplicate name can't collide
  // with an existing row's primary key.
  const base = slug || `item-${count + 1}`;
  const exists = db.prepare("SELECT 1 FROM menu_items WHERE id = ?");
  let id = base;
  let suffix = 2;
  while (exists.get(id)) id = `${base}-${suffix++}`;

  const { next } = db
    .prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM menu_items")
    .get() as { next: number };

  db.prepare(
    `INSERT INTO menu_items
       (id, name, description, price_paise, category, emoji, tags,
        featured, available, base_calories, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.name,
    input.description,
    input.pricePaise,
    input.category,
    input.emoji,
    JSON.stringify(input.tags),
    input.featured ? 1 : 0,
    input.available === false ? 0 : 1,
    input.baseCalories ?? null,
    next,
  );

  return { ...input, id };
}

export function deleteMenuItem(id: string): void {
  db.prepare("DELETE FROM menu_items WHERE id = ?").run(id);
}
