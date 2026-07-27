import type { Metadata } from "next";
import Link from "next/link";
import type { Order, OrderStatus } from "@/lib/types";
import { getActiveOrders } from "@/lib/data/orders";
import { OrderTicket } from "@/components/pos/order-ticket";

export const metadata: Metadata = { title: "POS" };

// Live order board — refreshes via revalidatePath after each staff action.
export const dynamic = "force-dynamic";

const COLUMNS: { status: OrderStatus; title: string; hint: string }[] = [
  { status: "new", title: "New", hint: "Just came in" },
  { status: "preparing", title: "Preparing", hint: "On the bar" },
  { status: "ready", title: "Ready", hint: "For pickup" },
];

export default async function PosPage() {
  const orders = await getActiveOrders();

  const byStatus = (status: OrderStatus): Order[] =>
    orders.filter((o) => o.status === status);

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Order queue
          </h1>
          <p className="text-sm text-muted">
            {orders.length} active order{orders.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const list = byStatus(col.status);
          return (
            <section
              key={col.status}
              className="rounded-card bg-surface-muted/60 p-3"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-semibold text-foreground">
                  {col.title}
                  <span className="ml-2 rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                    {list.length}
                  </span>
                </h2>
                <span className="text-xs text-muted">{col.hint}</span>
              </div>
              <div className="space-y-3">
                {list.map((order) => (
                  <OrderTicket key={order.id} order={order} />
                ))}
                {list.length === 0 && (
                  <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted">
                    Nothing here
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {orders.length === 0 && (
        <p className="mt-10 text-center text-muted">
          No active orders yet. Place one from the{" "}
          <Link href="/menu" className="text-accent hover:underline">
            customer menu
          </Link>{" "}
          to see it appear here.
        </p>
      )}
    </div>
  );
}
