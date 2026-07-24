"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/orders", label: "Orders", exact: false },
  { href: "/admin/menu", label: "Menu", exact: false },
];

// Sidebar navigation for the admin area, with active highlighting.
export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors " +
              (active
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:bg-surface-muted hover:text-foreground")
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
