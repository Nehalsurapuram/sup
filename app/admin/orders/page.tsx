import type { Metadata } from "next";
import type { OrderStatus } from "@/lib/types";
import { getOrders } from "@/lib/data/orders";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Orders" };
export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-accent/20 text-accent",
  preparing: "bg-accent/20 text-accent",
  ready: "bg-success/20 text-success",
  completed: "bg-surface-muted text-muted",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
      <p className="text-sm text-muted">{orders.length} total</p>

      {orders.length === 0 ? (
        <p className="mt-8 rounded-card border border-dashed border-border p-10 text-center text-muted">
          No orders yet.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-card border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-border bg-surface/50"
                >
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {o.number}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {o.customerName}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted">{o.type}</td>
                  <td className="px-4 py-3 text-muted">
                    {o.items.reduce((n, l) => n + l.qty, 0)}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {formatPrice(o.subtotalPaise)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-xs font-semibold capitalize " +
                        STATUS_STYLE[o.status]
                      }
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
