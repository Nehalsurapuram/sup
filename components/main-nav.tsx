"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// Route-aware nav pills. The active highlight follows the current page.
export function MainNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="flex items-center justify-center gap-1 pb-2 md:hidden">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className={
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide " +
              (isActive(pathname, item.href)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-surface")
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center rounded-full bg-surface p-1.5 md:flex">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          className={
            "rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors " +
            (isActive(pathname, item.href)
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-surface-muted")
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
