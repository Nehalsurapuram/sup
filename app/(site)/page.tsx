import Link from "next/link";
import { getFeaturedItems } from "@/lib/data/menu";
import { MenuCard } from "@/components/menu-card";
import { HeroCup } from "@/components/hero-cup";
import { site } from "@/lib/site";

// Home / landing page — Server Component.
export default async function HomePage() {
  const featured = await getFeaturedItems();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6">
          {/* Giant display word */}
          <h1 className="pointer-events-none select-none text-center font-display font-bold uppercase leading-[0.82] tracking-tight text-foreground">
            <span className="block text-[22vw] md:text-[15rem]">Everyday</span>
          </h1>

          {/* Cup overlapping the headline */}
          <div className="relative -mt-[14vw] flex justify-center md:-mt-40">
            <HeroCup />
          </div>

          {/* Bottom row: blurb / arrows / tagline */}
          <div className="mt-6 grid grid-cols-1 items-end gap-8 md:grid-cols-3">
            <p className="max-w-xs text-sm font-medium uppercase leading-relaxed tracking-wide text-muted">
              {site.blurb}
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                aria-label="Previous"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
              >
                →
              </button>
            </div>

            <div className="md:text-right">
              <p className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Your cozy corner,
                <br />
                every day.
              </p>
              <Link
                href="/menu"
                className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Order now
              </Link>
            </div>
          </div>
        </div>
      </section>

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
