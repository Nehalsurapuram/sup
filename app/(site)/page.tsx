import Link from "next/link";
import { getFeaturedItems } from "@/lib/data/menu";
import { MenuCard } from "@/components/menu-card";
import { site } from "@/lib/site";

// Home / landing page — Server Component.
export default async function HomePage() {
  const featured = await getFeaturedItems();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface-muted">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="rounded-full bg-surface px-4 py-1.5 text-sm font-medium text-muted shadow-sm">
            {site.hours}
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Freshly roasted coffee, house-made bakes, and a cozy corner to
            slow down. Order ahead and skip the line at {site.name}.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Browse the menu
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-border bg-surface px-6 py-3 font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Order now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Customer favorites
            </h2>
            <p className="mt-1 text-muted">The ones we can barely keep in stock.</p>
          </div>
          <Link
            href="/menu"
            className="hidden text-sm font-semibold text-primary hover:underline sm:block"
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
