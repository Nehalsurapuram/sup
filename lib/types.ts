// Shared domain types for the cafe app.
// Used across every surface: marketing, ordering, staff POS, and admin.

export type CategoryId =
  | "hot-coffee"
  | "cold-coffee"
  | "frappuccino"
  | "hot-tea"
  | "cold-drink"
  | "hot-drink"
  | "bakery"
  | "food";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in the smallest currency unit (paise) to avoid float errors. */
  pricePaise: number;
  category: CategoryId;
  /** Emoji stand-in for a product image while we use mock data. */
  emoji: string;
  tags: string[];
  featured?: boolean;
  available?: boolean;
  /** Approx. calories for the base (small / Tall) size, no add-ons. */
  baseCalories?: number;
}

// --- Orders ----------------------------------------------------------

export type OrderStatus = "new" | "preparing" | "ready" | "completed";

export type OrderType = "dine-in" | "takeaway";

export interface OrderLine {
  /** Unique per (item + customization) combo, so identical picks merge. */
  lineId: string;
  itemId: string;
  name: string;
  emoji: string;
  /** Unit price including customizations, in paise. */
  pricePaise: number;
  qty: number;
  /** Approx. calories per unit, including customizations. */
  calories: number;
  /** Human-readable selections, e.g. ["Grande", "Oat milk", "+1 shot"]. */
  options: string[];
}

export interface Order {
  id: string;
  /** Short human-friendly number shown to staff and customers. */
  number: number;
  items: OrderLine[];
  subtotalPaise: number;
  customerName: string;
  type: OrderType;
  note?: string;
  status: OrderStatus;
  /** ISO timestamp. */
  createdAt: string;
}

/** Payload sent from the checkout form to create an order. */
export interface NewOrderInput {
  items: OrderLine[];
  customerName: string;
  type: OrderType;
  note?: string;
}
