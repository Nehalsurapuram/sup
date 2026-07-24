import type { Metadata } from "next";
import Link from "next/link";
import { getDashboardStats } from "@/lib/data/orders";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const tiles = [
    { label: "Total orders", value: String(stats.totalOrders) },
    { label: "Active now", value: String(stats.activeOrders) },
    { label: "Revenue", value: formatPrice(stats.revenuePaise) },
    { label: "Items sold", value: String(stats.itemsSold) },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Dashboard
      </h1>
      <p className="text-sm text-muted">Live overview of today&apos;s trade.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-card border border-border bg-surface p-5"
          >
            <p className="text-sm text-muted">{t.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">
              {t.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Top items */}
        <div className="rounded-card border border-border bg-surface p-6">
          <h2 className="font-semibold text-foreground">Top sellers</h2>
          {stats.topItems.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              No sales yet. Orders will show up here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {stats.topItems.map((item, i) => (
                <li key={item.name} className="flex items-center gap-3">
                  <span className="w-5 text-sm font-semibold text-muted">
                    {i + 1}
                  </span>
                  <span className="text-2xl" aria-hidden>
                    {item.emoji}
                  </span>
                  <span className="flex-1 text-foreground">{item.name}</span>
                  <span className="font-semibold text-foreground">
                    {item.qty} sold
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <div className="rounded-card border border-border bg-surface p-6">
          <h2 className="font-semibold text-foreground">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            <Link
              href="/admin/orders"
              className="rounded-xl border border-border p-4 transition-colors hover:bg-surface-muted"
            >
              <p className="font-medium text-foreground">Manage orders →</p>
              <p className="text-sm text-muted">
                View and track every order placed.
              </p>
            </Link>
            <Link
              href="/admin/menu"
              className="rounded-xl border border-border p-4 transition-colors hover:bg-surface-muted"
            >
              <p className="font-medium text-foreground">Edit menu →</p>
              <p className="text-sm text-muted">
                Add items, change availability, remove products.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
