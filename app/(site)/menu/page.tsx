import type { Metadata } from "next";
import { getCategories, getMenu } from "@/lib/data/menu";
import { MenuBrowser } from "@/components/menu-browser";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse our full menu of coffee, tea, cold drinks, and food.",
};

// Full menu page — Server Component fetches data, client browser filters it.
export default async function MenuPage() {
  const [categories, items] = await Promise.all([getCategories(), getMenu()]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our Menu
        </h1>
        <p className="mt-2 text-muted">
          {items.length} items across {categories.length} categories.
        </p>
      </header>

      <MenuBrowser categories={categories} items={items} />
    </section>
  );
}
