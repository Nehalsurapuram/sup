import Link from "next/link";
import "../globals.css";
import { AdminNav } from "@/components/admin/admin-nav";

// Admin area chrome: sidebar + content, separate from the public site.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col md:flex-row">
      <aside className="border-b border-border bg-surface p-4 md:w-60 md:border-b-0 md:border-r">
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
          <span className="text-xl" aria-hidden>
            ☕
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            Caffora Admin
          </span>
        </Link>
        <AdminNav />
        <div className="mt-8 border-t border-border pt-4">
          <Link
            href="/pos"
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            → Open POS
          </Link>
          <Link
            href="/"
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            → View site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
