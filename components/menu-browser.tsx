"use client";

import { useMemo, useState } from "react";
import type { Category, MenuItem } from "@/lib/types";
import { MenuCard } from "@/components/menu-card";

type Filter = "all" | Category["id"];

// Client Component: category filter tabs over the full menu.
// Receives already-fetched data as props from the server page.
export function MenuBrowser({
  categories,
  items,
}: {
  categories: Category[];
  items: MenuItem[];
}) {
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  const tabs: { id: Filter; name: string }[] = [
    { id: "all", name: "All" },
    ...categories.map((c) => ({ id: c.id as Filter, name: c.name })),
  ];

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              aria-pressed={selected}
              className={
                "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                (selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted hover:bg-surface-muted hover:text-foreground border border-border")
              }
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-muted">
          Nothing here yet. Try another category.
        </p>
      )}
    </div>
  );
}
