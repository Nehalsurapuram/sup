import Link from "next/link";
import { mainNav, site } from "@/lib/site";

// Server Component: static navigation shared across all public pages.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-2xl" aria-hidden>
            ☕
          </span>
          <span className="text-lg tracking-tight text-foreground">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/menu"
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Order now
          </Link>
        </nav>
      </div>
    </header>
  );
}
