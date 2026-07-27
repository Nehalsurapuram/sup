import type { MenuItem } from "@/lib/types";

// Starter menu, loaded into SQLite the first time the database is created.
// After that the database is the source of truth — editing this file will
// not change an existing .data/caffora.db. Starbucks-style sample data,
// priced in INR paise.
export const menuSeed: MenuItem[] = [
  // Hot Coffees
  { id: "caffe-americano", name: "Caffè Americano", description: "Espresso shots topped with hot water.", pricePaise: 27500, category: "hot-coffee", emoji: "☕", tags: ["hot", "classic"], available: true },
  { id: "caffe-latte", name: "Caffè Latte", description: "Rich espresso with steamed milk.", pricePaise: 32000, category: "hot-coffee", emoji: "☕", tags: ["hot", "popular"], featured: true, available: true },
  { id: "cappuccino", name: "Cappuccino", description: "Espresso with steamed milk and deep foam.", pricePaise: 32000, category: "hot-coffee", emoji: "☕", tags: ["hot", "popular"], featured: true, available: true },
  { id: "caramel-macchiato", name: "Caramel Macchiato", description: "Vanilla, steamed milk, espresso, caramel drizzle.", pricePaise: 36000, category: "hot-coffee", emoji: "☕", tags: ["hot", "sweet"], featured: true, available: true },
  { id: "caffe-mocha", name: "Caffè Mocha", description: "Espresso with bittersweet mocha and milk.", pricePaise: 35000, category: "hot-coffee", emoji: "☕", tags: ["hot", "sweet"], available: true },
  { id: "flat-white", name: "Flat White", description: "Ristretto shots with velvety steamed milk.", pricePaise: 34000, category: "hot-coffee", emoji: "☕", tags: ["hot"], available: true },
  { id: "espresso", name: "Espresso", description: "A rich, full-bodied shot with caramel crema.", pricePaise: 22000, category: "hot-coffee", emoji: "☕", tags: ["hot", "classic"], available: true },
  { id: "pike-place", name: "Freshly Brewed Coffee", description: "Our signature medium-roast, brewed fresh.", pricePaise: 24000, category: "hot-coffee", emoji: "☕", tags: ["hot"], available: true },

  // Cold Coffees
  { id: "iced-caffe-latte", name: "Iced Caffè Latte", description: "Espresso and milk poured over ice.", pricePaise: 33000, category: "cold-coffee", emoji: "🧊", tags: ["cold", "popular"], featured: true, available: true },
  { id: "iced-caramel-macchiato", name: "Iced Caramel Macchiato", description: "Vanilla, milk, espresso, caramel, over ice.", pricePaise: 37000, category: "cold-coffee", emoji: "🧊", tags: ["cold", "sweet"], featured: true, available: true },
  { id: "iced-americano", name: "Iced Caffè Americano", description: "Espresso shots over cold water and ice.", pricePaise: 28500, category: "cold-coffee", emoji: "🧊", tags: ["cold"], available: true },
  { id: "cold-brew", name: "Cold Brew", description: "Slow-steeped 20 hours, smooth and bold.", pricePaise: 32000, category: "cold-coffee", emoji: "🧊", tags: ["cold"], available: true },
  { id: "vanilla-sweet-cream-cold-brew", name: "Vanilla Sweet Cream Cold Brew", description: "Cold brew topped with vanilla sweet cream.", pricePaise: 36000, category: "cold-coffee", emoji: "🧊", tags: ["cold", "sweet"], available: true },
  { id: "nitro-cold-brew", name: "Nitro Cold Brew", description: "Nitrogen-infused for a creamy, cascading pour.", pricePaise: 38000, category: "cold-coffee", emoji: "🧊", tags: ["cold"], available: true },

  // Frappuccino
  { id: "caramel-frappuccino", name: "Caramel Frappuccino", description: "Coffee blended with caramel, milk, and ice.", pricePaise: 39000, category: "frappuccino", emoji: "🥤", tags: ["blended", "sweet"], featured: true, available: true },
  { id: "mocha-frappuccino", name: "Mocha Frappuccino", description: "Coffee and mocha blended with milk and ice.", pricePaise: 39000, category: "frappuccino", emoji: "🥤", tags: ["blended", "sweet"], available: true },
  { id: "java-chip-frappuccino", name: "Java Chip Frappuccino", description: "Mocha, chocolate chips, coffee, blended cold.", pricePaise: 41000, category: "frappuccino", emoji: "🥤", tags: ["blended", "sweet"], available: true },
  { id: "vanilla-bean-creme-frappuccino", name: "Vanilla Bean Crème Frappuccino", description: "Vanilla bean blended with milk and ice, coffee-free.", pricePaise: 37000, category: "frappuccino", emoji: "🥤", tags: ["blended", "caffeine-free"], available: true },
  { id: "double-choc-chip-frappuccino", name: "Double Chocolaty Chip Crème", description: "Chocolate and chips blended, coffee-free.", pricePaise: 40000, category: "frappuccino", emoji: "🥤", tags: ["blended", "sweet"], available: true },

  // Hot Teas
  { id: "chai-tea-latte", name: "Chai Tea Latte", description: "Black tea with cinnamon, clove, and steamed milk.", pricePaise: 31000, category: "hot-tea", emoji: "🍵", tags: ["hot", "spiced"], featured: true, available: true },
  { id: "matcha-latte", name: "Matcha Green Tea Latte", description: "Smooth matcha with steamed milk.", pricePaise: 33000, category: "hot-tea", emoji: "🍵", tags: ["hot"], available: true },
  { id: "london-fog", name: "London Fog Tea Latte", description: "Earl Grey, vanilla, and steamed milk.", pricePaise: 31000, category: "hot-tea", emoji: "🍵", tags: ["hot"], available: true },
  { id: "english-breakfast-tea", name: "Brewed English Breakfast Tea", description: "Full-bodied black tea, brewed to order.", pricePaise: 24000, category: "hot-tea", emoji: "🍵", tags: ["hot"], available: true },
  { id: "honey-citrus-mint-tea", name: "Honey Citrus Mint Tea", description: "Green and mint teas with honey and citrus.", pricePaise: 28000, category: "hot-tea", emoji: "🍵", tags: ["hot", "soothing"], available: true },

  // Cold Drinks
  { id: "mango-dragonfruit-refresher", name: "Mango Dragonfruit Refresher", description: "Tropical mango and dragonfruit over ice.", pricePaise: 34000, category: "cold-drink", emoji: "🍓", tags: ["cold", "refreshing"], featured: true, available: true },
  { id: "strawberry-acai-refresher", name: "Strawberry Açaí Refresher", description: "Sweet strawberry and açaí with real fruit.", pricePaise: 34000, category: "cold-drink", emoji: "🍓", tags: ["cold", "refreshing"], available: true },
  { id: "pink-drink", name: "Pink Drink", description: "Strawberry açaí with creamy coconutmilk.", pricePaise: 36000, category: "cold-drink", emoji: "🥥", tags: ["cold", "popular"], available: true },
  { id: "iced-black-tea", name: "Iced Black Tea", description: "Freshly brewed black tea over ice.", pricePaise: 24000, category: "cold-drink", emoji: "🧃", tags: ["cold"], available: true },
  { id: "iced-chai-latte", name: "Iced Chai Tea Latte", description: "Spiced chai with milk, poured over ice.", pricePaise: 32000, category: "cold-drink", emoji: "🧃", tags: ["cold", "spiced"], available: true },

  // Hot Drinks
  { id: "hot-chocolate", name: "Hot Chocolate", description: "Steamed milk, mocha, whipped cream.", pricePaise: 30000, category: "hot-drink", emoji: "🍫", tags: ["hot", "sweet"], available: true },
  { id: "caramel-hot-chocolate", name: "Caramel Hot Chocolate", description: "Hot chocolate with caramel and whipped cream.", pricePaise: 32000, category: "hot-drink", emoji: "🍫", tags: ["hot", "sweet"], available: true },
  { id: "steamed-milk", name: "Steamed Milk", description: "Simple, comforting steamed milk (a Steamer).", pricePaise: 22000, category: "hot-drink", emoji: "🥛", tags: ["hot", "caffeine-free"], available: true },

  // Bakery
  { id: "butter-croissant", name: "Butter Croissant", description: "Flaky, buttery, and baked golden.", pricePaise: 22000, category: "bakery", emoji: "🥐", tags: ["baked"], featured: true, available: true },
  { id: "chocolate-croissant", name: "Chocolate Croissant", description: "Buttery croissant with chocolate batons.", pricePaise: 24000, category: "bakery", emoji: "🥐", tags: ["baked", "sweet"], available: true },
  { id: "blueberry-muffin", name: "Blueberry Muffin", description: "Moist muffin bursting with blueberries.", pricePaise: 20000, category: "bakery", emoji: "🧁", tags: ["baked"], available: true },
  { id: "banana-walnut-bread", name: "Banana Walnut Bread", description: "Loaf slice with banana and toasted walnuts.", pricePaise: 21000, category: "bakery", emoji: "🍞", tags: ["baked"], available: true },
  { id: "choc-chip-cookie", name: "Chocolate Chip Cookie", description: "Chewy cookie loaded with chocolate chunks.", pricePaise: 18000, category: "bakery", emoji: "🍪", tags: ["baked", "sweet"], available: true },
  { id: "cake-pop", name: "Birthday Cake Pop", description: "Bite-sized vanilla cake dipped in pink icing.", pricePaise: 17000, category: "bakery", emoji: "🍭", tags: ["baked", "sweet"], available: true },

  // Food
  { id: "cheese-tomato-panini", name: "Cheese & Tomato Panini", description: "Melted cheese and tomato on pressed bread.", pricePaise: 30000, category: "food", emoji: "🥪", tags: ["veg"], featured: true, available: true },
  { id: "spinach-feta-wrap", name: "Spinach, Feta & Egg White Wrap", description: "Egg white, spinach, and feta in a wheat wrap.", pricePaise: 32000, category: "food", emoji: "🌯", tags: ["protein"], available: true },
  { id: "chicken-bacon-sandwich", name: "Chicken & Bacon Sandwich", description: "Grilled chicken, bacon, and herbed mayo.", pricePaise: 36000, category: "food", emoji: "🥪", tags: ["non-veg"], available: true },
  { id: "sausage-roll", name: "Sausage Roll", description: "Flaky pastry wrapped around savory sausage.", pricePaise: 24000, category: "food", emoji: "🥐", tags: ["non-veg"], available: true },
];
