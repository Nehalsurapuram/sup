import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenu, getMenuItem } from "@/lib/data/menu";
import { baseCaloriesFor } from "@/lib/customization";
import { formatPrice } from "@/lib/format";
import { ItemImage } from "@/components/item-image";
import { ProductCustomizer } from "@/components/product-customizer";
import { Tilt } from "@/components/tilt";

// Pre-generate a page for every known item.
export async function generateStaticParams() {
  const items = await getMenu();
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata(
  props: PageProps<"/menu/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const item = await getMenuItem(id);
  return { title: item?.name ?? "Item" };
}

export default async function ProductPage(props: PageProps<"/menu/[id]">) {
  const { id } = await props.params;
  const item = await getMenuItem(id);
  if (!item) notFound();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/menu"
        className="text-sm font-medium text-muted hover:text-foreground"
      >
        ← Back to menu
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        {/* Photo + info */}
        <div>
          <Tilt max={10}>
            <div className="overflow-hidden rounded-card border border-border shadow-2xl">
              <div className="aspect-square">
                <ItemImage item={item} zoom speed={12} />
              </div>
            </div>
          </Tilt>
          <h1 className="mt-5 font-display text-3xl font-bold text-foreground">
            {item.name}
          </h1>
          <p className="mt-2 text-muted">{item.description}</p>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="font-semibold text-accent">
              from {formatPrice(item.pricePaise)}
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted">~{baseCaloriesFor(item)} cal base</span>
          </div>
        </div>

        {/* Customizer */}
        <div>
          <ProductCustomizer item={item} />
        </div>
      </div>
    </section>
  );
}
