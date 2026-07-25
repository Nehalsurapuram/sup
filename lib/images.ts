import type { CategoryId, MenuItem } from "@/lib/types";

// Curated product photos stored locally in /public/items (downloaded from
// Unsplash). Mapping an item -> file keeps images relevant and offline-proof.
// Add your own photos to /public/items and point the maps here.

const ITEM_FILE: Record<string, string> = {
  // Hot coffees
  "caffe-americano": "americano",
  "caffe-latte": "latte",
  cappuccino: "cappuccino",
  "caramel-macchiato": "flat-white",
  "caffe-mocha": "mocha",
  "flat-white": "flat-white",
  espresso: "espresso",
  "pike-place": "brewed-coffee",
  // Cold coffees
  "iced-caffe-latte": "iced-latte",
  "iced-caramel-macchiato": "iced-coffee",
  "iced-americano": "iced-coffee",
  "cold-brew": "cold-brew",
  "vanilla-sweet-cream-cold-brew": "cold-brew",
  "nitro-cold-brew": "cold-brew",
  // Frappuccino
  "caramel-frappuccino": "frappuccino",
  "mocha-frappuccino": "choc-shake",
  "java-chip-frappuccino": "choc-shake",
  "vanilla-bean-creme-frappuccino": "frappuccino",
  "double-choc-chip-frappuccino": "choc-shake",
  // Hot teas
  "chai-tea-latte": "chai",
  "matcha-latte": "matcha",
  "london-fog": "tea-black",
  "english-breakfast-tea": "tea-black",
  "honey-citrus-mint-tea": "tea-herbal",
  // Cold drinks
  "mango-dragonfruit-refresher": "refresher-berry",
  "strawberry-acai-refresher": "refresher-berry",
  "pink-drink": "refresher-pink",
  "iced-black-tea": "iced-tea",
  "iced-chai-latte": "iced-tea",
  // Hot drinks
  "hot-chocolate": "hot-chocolate",
  "caramel-hot-chocolate": "hot-chocolate",
  "steamed-milk": "steamed-milk",
  // Bakery
  "butter-croissant": "croissant",
  "chocolate-croissant": "choc-croissant",
  "blueberry-muffin": "muffin",
  "banana-walnut-bread": "bread-loaf",
  "choc-chip-cookie": "cookie",
  "cake-pop": "cake-pop",
  // Food
  "cheese-tomato-panini": "panini",
  "spinach-feta-wrap": "wrap",
  "chicken-bacon-sandwich": "chicken-sandwich",
  "sausage-roll": "sausage-roll",
};

// Fallback photo per category, for admin-added items with no specific match.
const CATEGORY_FILE: Record<CategoryId, string> = {
  "hot-coffee": "latte",
  "cold-coffee": "iced-coffee",
  frappuccino: "frappuccino",
  "hot-tea": "tea-black",
  "cold-drink": "cold-drink",
  "hot-drink": "hot-chocolate",
  bakery: "croissant",
  food: "sandwich",
};

function fileForItem(item: MenuItem): string {
  return ITEM_FILE[item.id] ?? CATEGORY_FILE[item.category];
}

export function itemImage(item: MenuItem): string {
  return `/items/${fileForItem(item)}.jpg`;
}

// Photo for a cart/order line, which only carries an item id.
export function lineImage(itemId: string): string {
  return `/items/${ITEM_FILE[itemId] ?? "latte"}.jpg`;
}
