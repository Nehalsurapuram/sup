import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ItemImage } from "@/components/item-image";
import { baseCaloriesFor, groupsForCategory } from "@/lib/customization";

// Starbucks-style product card. The whole card links to the item's
// detail page, where size / calories / add-ons are customized.
export function MenuCard({ item }: { item: MenuItem }) {
  const soldOut = item.available === false;
  const customizable = groupsForCategory(item.category).length > 0;

  return (
    <Link
      href={`/menu/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ItemImage
          item={item}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {item.featured && !soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow">
            Popular
          </span>
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-primary-foreground shadow">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight text-foreground">
            {item.name}
          </h3>
          <span className="shrink-0 font-semibold text-accent">
            {customizable ? "from " : ""}
            {formatPrice(item.pricePaise)}
          </span>
        </div>
        <p className="mt-1 flex-1 text-sm text-muted">{item.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted">
            ~{baseCaloriesFor(item)} cal
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
            {soldOut ? "View" : customizable ? "Customize" : "Add"} →
          </span>
        </div>
      </div>
    </Link>
  );
}
