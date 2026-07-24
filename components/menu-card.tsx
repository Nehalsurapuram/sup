import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/cart/add-to-cart";
import { ItemImage } from "@/components/item-image";

// Starbucks-style product card: photo on top, details + add button below.
export function MenuCard({ item }: { item: MenuItem }) {
  const soldOut = item.available === false;

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
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
            {formatPrice(item.pricePaise)}
          </span>
        </div>
        <p className="mt-1 flex-1 text-sm text-muted">{item.description}</p>

        {item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <AddToCart item={item} />
        </div>
      </div>
    </article>
  );
}
