import Link from "next/link";
import { getFeaturedItems } from "@/lib/data/menu";
import { MenuCard } from "@/components/menu-card";
import { HeroCarousel } from "@/components/hero-carousel";

// Home / landing page — Server Component.
export default async function HomePage() {
  const featured = await getFeaturedItems();

  return (
    <>
      {/* Sliding hero */}
      <HeroCarousel featured={featured.slice(0, 4)} />

      {/* Featured */}
      <section
        id="favorites"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Customer favorites
            </h2>
            <p className="mt-1 text-muted">The ones we can barely keep in stock.</p>
          </div>
          <Link
            href="/menu"
            className="hidden text-sm font-semibold text-accent hover:underline sm:block"
          >
            View full menu →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
