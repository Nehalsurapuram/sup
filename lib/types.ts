// Shared domain types for the cafe app.
// Used across every surface: marketing, ordering, staff POS, and admin.

export type CategoryId = "coffee" | "tea" | "cold" | "pastries" | "food";

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
}

// --- Orders ----------------------------------------------------------

export type OrderStatus = "new" | "preparing" | "ready" | "completed";

export type OrderType = "dine-in" | "takeaway";

export interface OrderLine {
  itemId: string;
  name: string;
  emoji: string;
  pricePaise: number;
  qty: number;
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
