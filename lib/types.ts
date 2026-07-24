// Shared domain types for the cafe app.
// These describe the data used across every surface:
// marketing site, customer ordering, staff POS, and admin.

export type CategoryId =
  | "coffee"
  | "tea"
  | "cold"
  | "pastries"
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
}
