import Link from "next/link";
import { mainNav, site } from "@/lib/site";

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
        <nav className="hidden items-center rounded-full bg-surface p-1.5 md:flex">
          {mainNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors " +
                (i === 0
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-surface-muted")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
          >
            <SearchIcon />
          </button>
          <Link
            href="/menu"
            aria-label="Cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
          >
            <BagIcon />
          </Link>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="flex items-center justify-center gap-1 pb-2 md:hidden">
        {mainNav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide " +
              (i === 0
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-surface")
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

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

function BagIcon() {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
