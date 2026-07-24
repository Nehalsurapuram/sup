import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/data/orders";
import { formatPrice } from "@/lib/format";

// Order confirmation — Server Component reads the order from the store.
export default async function OrderPage(props: PageProps<"/order/[id]">) {
  const { id } = await props.params;
  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-card border border-border bg-surface p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-3xl">
          ✓
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold text-foreground">
          Order confirmed!
        </h1>
        <p className="mt-2 text-muted">
          Thanks, {order.customerName}. We&apos;re getting it ready.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface-muted px-5 py-2">
          <span className="text-sm text-muted">Order</span>
          <span className="font-display text-xl font-bold text-foreground">
            #{order.number}
          </span>
        </div>

        <ul className="mt-8 space-y-2 text-left">
          {order.items.map((line) => (
            <li
              key={line.itemId}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted">
                <span aria-hidden>{line.emoji}</span> {line.name} × {line.qty}
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(line.pricePaise * line.qty)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-left">
          <span className="font-medium text-muted capitalize">
            {order.type} · Subtotal
          </span>
          <span className="font-bold text-foreground">
            {formatPrice(order.subtotalPaise)}
          </span>
        </div>

        {order.note && (
          <p className="mt-4 rounded-xl bg-surface-muted p-3 text-left text-sm text-muted">
            <span className="font-medium text-foreground">Note:</span>{" "}
            {order.note}
          </p>
        )}

        <Link
          href="/menu"
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Order something else
        </Link>
      </div>
    </section>
  );
}
