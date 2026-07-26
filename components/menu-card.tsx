import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ItemImage } from "@/components/item-image";
import { Tilt } from "@/components/tilt";
import { baseCaloriesFor, groupsForCategory } from "@/lib/customization";

// Starbucks-style product card with a 3D tilt. The whole card links to the
// item's detail page; badges and CTA pop toward the viewer for depth.
export function MenuCard({ item }: { item: MenuItem }) {
  const soldOut = item.available === false;
  const customizable = groupsForCategory(item.category).length > 0;

  return (
    <Tilt className="h-full">
      <Link
        href={`/menu/${item.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-lg transition-shadow duration-300 [transform-style:preserve-3d] hover:shadow-2xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ItemImage item={item} zoom speed={8} />
          {/* subtle depth gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          {item.featured && !soldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-lg">
              Popular
            </span>
          )}
          {soldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-lg">
              Sold out
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 [transform:translateZ(25px)]">
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
    </Tilt>
  );
}
