import type { CategoryId, MenuItem } from "@/lib/types";

// Photo helper. We don't ship product photos in the repo yet, so each item
// gets a topical, license-free stock photo from loremflickr (keyword-based,
// stable per item). Swap this for real photos in /public any time —
// components read the URL from here, so nothing else changes.

// Per-item keyword overrides for the best-matching photo.
const KEYWORDS: Record<string, string> = {
  "caffe-americano": "americano,coffee",
  "caffe-latte": "latte,coffee",
  cappuccino: "cappuccino",
  "caramel-macchiato": "macchiato,coffee",
  "caffe-mocha": "mocha,coffee",
  "flat-white": "flatwhite,coffee",
  espresso: "espresso",
  "pike-place": "brewed,coffee",
  "iced-caffe-latte": "iced,latte",
  "iced-caramel-macchiato": "iced,macchiato",
  "iced-americano": "iced,americano",
  "cold-brew": "coldbrew,coffee",
  "vanilla-sweet-cream-cold-brew": "coldbrew",
  "nitro-cold-brew": "nitro,coffee",
  "caramel-frappuccino": "frappuccino,caramel",
  "mocha-frappuccino": "frappuccino,mocha",
  "java-chip-frappuccino": "frappuccino,chocolate",
  "vanilla-bean-creme-frappuccino": "vanilla,milkshake",
  "double-choc-chip-frappuccino": "chocolate,milkshake",
  "chai-tea-latte": "chai,latte",
  "matcha-latte": "matcha,latte",
  "london-fog": "tea,latte",
  "english-breakfast-tea": "blacktea",
  "honey-citrus-mint-tea": "herbal,tea",
  "mango-dragonfruit-refresher": "mango,drink",
  "strawberry-acai-refresher": "strawberry,drink",
  "pink-drink": "pink,drink",
  "iced-black-tea": "iced,tea",
  "iced-chai-latte": "iced,chai",
  "hot-chocolate": "hotchocolate",
  "caramel-hot-chocolate": "hotchocolate,caramel",
  "steamed-milk": "milk,glass",
  "butter-croissant": "croissant",
  "chocolate-croissant": "chocolate,croissant",
  "blueberry-muffin": "blueberry,muffin",
  "banana-walnut-bread": "banana,bread",
  "choc-chip-cookie": "cookie",
  "cake-pop": "cakepop",
  "cheese-tomato-panini": "panini,sandwich",
  "spinach-feta-wrap": "wrap,food",
  "chicken-bacon-sandwich": "sandwich",
  "sausage-roll": "pastry,sausage",
};

// Fallback keyword by category.
const CATEGORY_KEYWORDS: Record<CategoryId, string> = {
  "hot-coffee": "coffee",
  "cold-coffee": "iced,coffee",
  frappuccino: "frappe,coffee",
  "hot-tea": "tea",
  "cold-drink": "cold,drink",
  "hot-drink": "hot,chocolate",
  bakery: "pastry",
  food: "sandwich",
};

// Small stable hash so each item always resolves to the same photo.
function lock(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100000;
  return h;
}

export function itemImage(item: MenuItem, w = 600, h = 450): string {
  const keyword = KEYWORDS[item.id] ?? CATEGORY_KEYWORDS[item.category];
  return `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock(item.id)}`;
}

// Photo for an order/cart line, which only carries an item id.
export function lineImage(itemId: string, w = 160, h = 160): string {
  const keyword = KEYWORDS[itemId] ?? "coffee";
  return `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock(itemId)}`;
}
