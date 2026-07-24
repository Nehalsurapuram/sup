import Link from "next/link";
import "../globals.css";

// Staff POS has its own full-screen chrome, separate from the public site.
export default function PosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            ☕
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            Caffora POS
          </span>
        </div>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/menu"
            className="rounded-full px-4 py-2 font-medium text-muted hover:bg-surface-muted hover:text-foreground"
          >
            New order
          </Link>
          <Link
            href="/admin"
            className="rounded-full px-4 py-2 font-medium text-muted hover:bg-surface-muted hover:text-foreground"
          >
            Admin
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
