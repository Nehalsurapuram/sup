"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { HeroCup } from "@/components/hero-cup";
import { ItemImage } from "@/components/item-image";
import { Tilt } from "@/components/tilt";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

// Sliding hero. Slide 0 is the branded cup; the rest showcase featured
// drinks. Arrows, dots, and autoplay all drive the same index.
export function HeroCarousel({ featured }: { featured: MenuItem[] }) {
  const slideCount = featured.length + 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex((next + slideCount) % slideCount),
    [slideCount],
  );

  // Autoplay, paused on hover/focus.
  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slideCount), 5000);
    return () => clearInterval(id);
  }, [paused, slideCount]);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {/* Slide 0 — branded cup */}
          <div className="w-full shrink-0">
            <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-2 sm:px-6">
              <h1 className="pointer-events-none select-none text-center font-display font-bold uppercase leading-[0.82] tracking-tight text-foreground">
                <span className="block text-[22vw] md:text-[15rem]">
                  Everyday
                </span>
              </h1>
              <div className="relative -mt-[14vw] flex justify-center md:-mt-40">
                <HeroCup />
              </div>
              <p className="mx-auto mt-4 max-w-md text-center text-sm font-medium uppercase leading-relaxed tracking-wide text-muted">
                {site.blurb}
              </p>
            </div>
          </div>

          {/* Product slides */}
          {featured.map((item) => (
            <div key={item.id} className="w-full shrink-0">
              <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
                <div className="order-2 md:order-1">
                  <p className="font-medium uppercase tracking-widest text-accent">
                    Featured
                  </p>
                  <h2 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
                    {item.name}
                  </h2>
                  <p className="mt-3 max-w-md text-lg text-muted">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-foreground">
                      {formatPrice(item.pricePaise)}
                    </span>
                    <Link
                      href={`/menu/${item.id}`}
                      className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-hover"
                    >
                      Customize & order
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Tilt max={14} className="mx-auto w-full max-w-sm">
                    <div className="aspect-square w-full overflow-hidden rounded-card border border-border shadow-2xl">
                      <ItemImage item={item} zoom speed={10} />
                    </div>
                  </Tilt>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-8 sm:px-6">
          <div className="flex gap-2">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={
                  "h-2.5 rounded-full transition-all " +
                  (i === index
                    ? "w-6 bg-foreground"
                    : "w-2.5 bg-border hover:bg-muted")
                }
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(index + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
