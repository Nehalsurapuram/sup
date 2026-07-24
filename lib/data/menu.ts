import type { Category, CategoryId, MenuItem } from "@/lib/types";

// --- Mock data layer -------------------------------------------------
// This is the single source of truth for the menu while we build the UI.
// Later this module can be swapped for a real database without changing
// the components that consume `getMenu()` / `getCategories()`.

export const categories: Category[] = [
  { id: "coffee", name: "Coffee", description: "Espresso-based classics, pulled to order." },
  { id: "tea", name: "Tea", description: "Loose-leaf brews and spiced chai." },
  { id: "cold", name: "Cold Drinks", description: "Iced coffees, coolers, and shakes." },
  { id: "pastries", name: "Pastries", description: "Baked fresh every morning." },
  { id: "food", name: "Food", description: "Sandwiches, bowls, and all-day bites." },
];

export const menuItems: MenuItem[] = [
  // Coffee
  { id: "espresso", name: "Espresso", description: "A bold single shot with a rich crema.", pricePaise: 12000, category: "coffee", emoji: "☕", tags: ["hot", "classic"], available: true },
  { id: "cappuccino", name: "Cappuccino", description: "Equal parts espresso, steamed milk, and foam.", pricePaise: 18000, category: "coffee", emoji: "☕", tags: ["hot", "popular"], featured: true, available: true },
  { id: "latte", name: "Cafe Latte", description: "Smooth espresso with silky steamed milk.", pricePaise: 19000, category: "coffee", emoji: "☕", tags: ["hot", "popular"], featured: true, available: true },
  { id: "mocha", name: "Mocha", description: "Espresso, chocolate, and steamed milk.", pricePaise: 21000, category: "coffee", emoji: "☕", tags: ["hot", "sweet"], available: true },
  { id: "flat-white", name: "Flat White", description: "Velvety microfoam over a double ristretto.", pricePaise: 20000, category: "coffee", emoji: "☕", tags: ["hot"], available: true },

  // Tea
  { id: "masala-chai", name: "Masala Chai", description: "Spiced black tea simmered with milk.", pricePaise: 10000, category: "tea", emoji: "🍵", tags: ["hot", "spiced"], featured: true, available: true },
  { id: "green-tea", name: "Green Tea", description: "Delicate loose-leaf green tea.", pricePaise: 11000, category: "tea", emoji: "🍵", tags: ["hot", "light"], available: true },
  { id: "earl-grey", name: "Earl Grey", description: "Black tea scented with bergamot.", pricePaise: 12000, category: "tea", emoji: "🍵", tags: ["hot"], available: true },

  // Cold
  { id: "iced-latte", name: "Iced Latte", description: "Chilled espresso over milk and ice.", pricePaise: 20000, category: "cold", emoji: "🧊", tags: ["cold", "popular"], featured: true, available: true },
  { id: "cold-brew", name: "Cold Brew", description: "Slow-steeped 18 hours, smooth and bold.", pricePaise: 22000, category: "cold", emoji: "🧊", tags: ["cold"], available: true },
  { id: "iced-mocha", name: "Iced Mocha", description: "Chocolate, espresso, milk, over ice.", pricePaise: 23000, category: "cold", emoji: "🧊", tags: ["cold", "sweet"], available: true },
  { id: "lemonade", name: "Fresh Lemonade", description: "Hand-squeezed lemons, lightly sweetened.", pricePaise: 15000, category: "cold", emoji: "🍋", tags: ["cold", "refreshing"], available: true },

  // Pastries
  { id: "croissant", name: "Butter Croissant", description: "Flaky, buttery, baked in-house.", pricePaise: 14000, category: "pastries", emoji: "🥐", tags: ["baked"], featured: true, available: true },
  { id: "choc-muffin", name: "Chocolate Muffin", description: "Rich and moist with chocolate chips.", pricePaise: 13000, category: "pastries", emoji: "🧁", tags: ["baked", "sweet"], available: true },
  { id: "banana-bread", name: "Banana Bread", description: "Toasted slice with a pat of butter.", pricePaise: 12000, category: "pastries", emoji: "🍞", tags: ["baked"], available: true },

  // Food
  { id: "veg-sandwich", name: "Grilled Veg Sandwich", description: "Grilled vegetables, cheese, herb spread.", pricePaise: 22000, category: "food", emoji: "🥪", tags: ["veg"], available: true },
  { id: "paneer-wrap", name: "Paneer Tikka Wrap", description: "Spiced paneer, onions, mint chutney.", pricePaise: 24000, category: "food", emoji: "🌯", tags: ["veg", "spiced"], featured: true, available: true },
  { id: "avocado-toast", name: "Avocado Toast", description: "Smashed avocado on sourdough, chili flakes.", pricePaise: 26000, category: "food", emoji: "🥑", tags: ["veg"], available: true },
];

// --- Accessors -------------------------------------------------------
// Async so callers already `await` them; swapping in a real DB later
// won't change any call sites.

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getMenu(): Promise<MenuItem[]> {
  return menuItems;
}

export async function getMenuByCategory(
  category: CategoryId,
): Promise<MenuItem[]> {
  return menuItems.filter((item) => item.category === category);
}

export async function getFeaturedItems(): Promise<MenuItem[]> {
  return menuItems.filter((item) => item.featured);
}

export async function getMenuItem(id: string): Promise<MenuItem | undefined> {
  return menuItems.find((item) => item.id === id);
}
