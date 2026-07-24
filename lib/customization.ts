import type { CategoryId, MenuItem, OrderLine } from "@/lib/types";

// --- Customization config --------------------------------------------
// Each option carries a calorie delta and price delta (paise). The
// product page adds these on top of the item's base size to show live
// calories + price, Starbucks-style. Values are approximate demo data.

export interface OptionChoice {
  id: string;
  label: string;
  caloriesDelta: number;
  pricePaiseDelta: number;
}

export interface OptionGroup {
  id: "size" | "milk" | "shots" | "syrups" | "toppings";
  label: string;
  kind: "single" | "multi" | "stepper";
  categories: CategoryId[];
  choices: OptionChoice[];
  defaultChoiceId?: string; // single only
  max?: number; // stepper only
}

const DRINKS: CategoryId[] = [
  "hot-coffee",
  "cold-coffee",
  "frappuccino",
  "hot-tea",
  "cold-drink",
  "hot-drink",
];

export const OPTION_GROUPS: OptionGroup[] = [
  {
    id: "size",
    label: "Size",
    kind: "single",
    categories: DRINKS,
    defaultChoiceId: "grande",
    choices: [
      { id: "tall", label: "Tall · 12oz", caloriesDelta: 0, pricePaiseDelta: 0 },
      { id: "grande", label: "Grande · 16oz", caloriesDelta: 70, pricePaiseDelta: 4000 },
      { id: "venti", label: "Venti · 20oz", caloriesDelta: 140, pricePaiseDelta: 7000 },
    ],
  },
  {
    id: "milk",
    label: "Milk",
    kind: "single",
    categories: ["hot-coffee", "cold-coffee", "frappuccino", "hot-tea", "hot-drink"],
    defaultChoiceId: "two-percent",
    choices: [
      { id: "two-percent", label: "2% milk", caloriesDelta: 0, pricePaiseDelta: 0 },
      { id: "whole", label: "Whole milk", caloriesDelta: 30, pricePaiseDelta: 0 },
      { id: "nonfat", label: "Nonfat milk", caloriesDelta: -10, pricePaiseDelta: 0 },
      { id: "oat", label: "Oat milk", caloriesDelta: 40, pricePaiseDelta: 6000 },
      { id: "almond", label: "Almond milk", caloriesDelta: -20, pricePaiseDelta: 6000 },
      { id: "soy", label: "Soy milk", caloriesDelta: 20, pricePaiseDelta: 6000 },
    ],
  },
  {
    id: "shots",
    label: "Extra espresso shots",
    kind: "stepper",
    categories: ["hot-coffee", "cold-coffee", "frappuccino"],
    max: 6,
    choices: [
      { id: "shot", label: "shot", caloriesDelta: 5, pricePaiseDelta: 4500 },
    ],
  },
  {
    id: "syrups",
    label: "Syrups",
    kind: "multi",
    categories: ["hot-coffee", "cold-coffee", "frappuccino", "hot-tea", "hot-drink"],
    choices: [
      { id: "vanilla", label: "Vanilla", caloriesDelta: 20, pricePaiseDelta: 3000 },
      { id: "caramel", label: "Caramel", caloriesDelta: 20, pricePaiseDelta: 3000 },
      { id: "hazelnut", label: "Hazelnut", caloriesDelta: 20, pricePaiseDelta: 3000 },
      { id: "mocha", label: "Mocha", caloriesDelta: 25, pricePaiseDelta: 3000 },
    ],
  },
  {
    id: "toppings",
    label: "Toppings",
    kind: "multi",
    categories: ["frappuccino", "cold-coffee", "hot-drink", "cold-drink"],
    choices: [
      { id: "whipped-cream", label: "Whipped cream", caloriesDelta: 70, pricePaiseDelta: 2500 },
      { id: "caramel-drizzle", label: "Caramel drizzle", caloriesDelta: 30, pricePaiseDelta: 2000 },
      { id: "cinnamon", label: "Cinnamon powder", caloriesDelta: 5, pricePaiseDelta: 0 },
    ],
  },
];

export function groupsForCategory(category: CategoryId): OptionGroup[] {
  return OPTION_GROUPS.filter((g) => g.categories.includes(category));
}

// --- Base calories ---------------------------------------------------

const CATEGORY_CALORIES: Record<CategoryId, number> = {
  "hot-coffee": 120,
  "cold-coffee": 120,
  frappuccino: 350,
  "hot-tea": 150,
  "cold-drink": 90,
  "hot-drink": 300,
  bakery: 300,
  food: 350,
};

const ITEM_CALORIES: Record<string, number> = {
  espresso: 5,
  "caffe-americano": 15,
  "pike-place": 5,
  cappuccino: 110,
  "caffe-latte": 150,
  "flat-white": 170,
  "caffe-mocha": 250,
  "caramel-macchiato": 190,
  "iced-caffe-latte": 130,
  "iced-caramel-macchiato": 190,
  "iced-americano": 15,
  "cold-brew": 5,
  "vanilla-sweet-cream-cold-brew": 110,
  "nitro-cold-brew": 5,
  "caramel-frappuccino": 380,
  "mocha-frappuccino": 370,
  "java-chip-frappuccino": 440,
  "vanilla-bean-creme-frappuccino": 350,
  "double-choc-chip-frappuccino": 410,
  "chai-tea-latte": 190,
  "matcha-latte": 200,
  "london-fog": 140,
  "english-breakfast-tea": 0,
  "honey-citrus-mint-tea": 130,
  "mango-dragonfruit-refresher": 90,
  "strawberry-acai-refresher": 90,
  "pink-drink": 140,
  "iced-black-tea": 0,
  "iced-chai-latte": 200,
  "hot-chocolate": 320,
  "caramel-hot-chocolate": 350,
  "steamed-milk": 130,
  "butter-croissant": 260,
  "chocolate-croissant": 300,
  "blueberry-muffin": 360,
  "banana-walnut-bread": 420,
  "choc-chip-cookie": 220,
  "cake-pop": 160,
  "cheese-tomato-panini": 380,
  "spinach-feta-wrap": 290,
  "chicken-bacon-sandwich": 400,
  "sausage-roll": 320,
};

export function baseCaloriesFor(item: MenuItem): number {
  return (
    item.baseCalories ??
    ITEM_CALORIES[item.id] ??
    CATEGORY_CALORIES[item.category]
  );
}

// --- Selection → cart line -------------------------------------------

export interface Selection {
  size?: string;
  milk?: string;
  shots?: number;
  syrups?: string[];
  toppings?: string[];
}

function choice(groupId: OptionGroup["id"], id: string): OptionChoice | undefined {
  return OPTION_GROUPS.find((g) => g.id === groupId)?.choices.find(
    (c) => c.id === id,
  );
}

/**
 * Build a cart line from an item + selection. Pure and deterministic:
 * identical selections produce the same lineId so they merge in the cart.
 * Used both for the live preview and when adding to the cart.
 */
export function buildCartLine(
  item: MenuItem,
  sel: Selection,
  qty: number,
): OrderLine {
  const groups = groupsForCategory(item.category);
  const has = (id: OptionGroup["id"]) => groups.some((g) => g.id === id);

  let price = item.pricePaise;
  let calories = baseCaloriesFor(item);
  const options: string[] = [];
  const key: string[] = [item.id];

  // Size (single)
  if (has("size")) {
    const sizeId = sel.size ?? "grande";
    const c = choice("size", sizeId);
    if (c) {
      price += c.pricePaiseDelta;
      calories += c.caloriesDelta;
      options.push(c.label.split(" ·")[0]);
      key.push(`z:${sizeId}`);
    }
  }

  // Milk (single)
  if (has("milk")) {
    const milkId = sel.milk ?? "two-percent";
    const c = choice("milk", milkId);
    if (c) {
      price += c.pricePaiseDelta;
      calories += c.caloriesDelta;
      if (milkId !== "two-percent") options.push(c.label);
      key.push(`m:${milkId}`);
    }
  }

  // Shots (stepper)
  if (has("shots")) {
    const n = Math.max(0, Math.min(sel.shots ?? 0, 6));
    if (n > 0) {
      const c = choice("shots", "shot")!;
      price += c.pricePaiseDelta * n;
      calories += c.caloriesDelta * n;
      options.push(`+${n} shot${n > 1 ? "s" : ""}`);
      key.push(`s:${n}`);
    }
  }

  // Syrups (multi)
  if (has("syrups") && sel.syrups?.length) {
    const ids = [...sel.syrups].sort();
    for (const id of ids) {
      const c = choice("syrups", id);
      if (c) {
        price += c.pricePaiseDelta;
        calories += c.caloriesDelta;
        options.push(`${c.label} syrup`);
      }
    }
    key.push(`y:${ids.join(",")}`);
  }

  // Toppings (multi)
  if (has("toppings") && sel.toppings?.length) {
    const ids = [...sel.toppings].sort();
    for (const id of ids) {
      const c = choice("toppings", id);
      if (c) {
        price += c.pricePaiseDelta;
        calories += c.caloriesDelta;
        options.push(c.label);
      }
    }
    key.push(`t:${ids.join(",")}`);
  }

  return {
    lineId: key.join("|"),
    itemId: item.id,
    name: item.name,
    emoji: item.emoji,
    pricePaise: price,
    qty,
    calories: Math.max(0, calories),
    options,
  };
}
