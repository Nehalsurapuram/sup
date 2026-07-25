import Link from "next/link";
import { site } from "@/lib/site";
import { CartButton } from "@/components/cart/cart-button";
import { MainNav } from "@/components/main-nav";

// Server Component: pill navigation shared across public pages.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Stacked wordmark */}
        <Link href="/" className="flex items-center gap-1 leading-none">
          <span className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
            <span className="block">Caf</span>
            <span className="block">Fora</span>
          </span>
          <span aria-hidden className="-ml-0.5 text-lg text-foreground">
            ☕
          </span>
        </Link>

        {/* Center pill nav */}
        <MainNav />

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
          >
            <SearchIcon />
          </button>
          <CartButton />
        </div>
      </div>

      {/* Mobile nav row */}
      <MainNav mobile />

      <span className="sr-only">{site.name}</span>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
