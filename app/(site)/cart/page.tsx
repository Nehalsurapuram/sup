"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-store";
import { formatPrice } from "@/lib/format";
import { LineThumb } from "@/components/line-thumb";

// Cart page — review and adjust items before checkout.
export default function CartPage() {
  const { lines, subtotalPaise, setQty, remove, count } = useCart();

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Your cart
      </h1>

      {count === 0 ? (
        <div className="mt-10 rounded-card border border-border bg-surface p-10 text-center">
          <p className="text-lg text-muted">Your cart is empty.</p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {lines.map((line) => (
            <div
              key={line.lineId}
              className="flex items-center gap-4 rounded-card border border-border bg-surface p-4"
            >
              <LineThumb itemId={line.itemId} emoji={line.emoji} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{line.name}</p>
                {line.options.length > 0 && (
                  <p className="truncate text-xs text-muted">
                    {line.options.join(" · ")}
                  </p>
                )}
                <p className="text-sm text-muted">
                  {formatPrice(line.pricePaise)} each · ~{line.calories} cal
                </p>
              </div>

              <div className="flex items-center gap-2">
                <QtyButton onClick={() => setQty(line.lineId, line.qty - 1)}>
                  −
                </QtyButton>
                <span className="w-6 text-center font-semibold text-foreground">
                  {line.qty}
                </span>
                <QtyButton onClick={() => setQty(line.lineId, line.qty + 1)}>
                  +
                </QtyButton>
              </div>

              <div className="w-20 text-right font-semibold text-foreground">
                {formatPrice(line.pricePaise * line.qty)}
              </div>

              <button
                type="button"
                onClick={() => remove(line.lineId)}
                aria-label={`Remove ${line.name}`}
                className="text-muted transition-colors hover:text-danger"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-6 rounded-card border border-border bg-surface p-6">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-muted">Subtotal</span>
              <span className="font-bold text-foreground">
                {formatPrice(subtotalPaise)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/menu"
              className="mt-3 block text-center text-sm font-medium text-accent hover:underline"
            >
              Add more items
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function QtyButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted"
    >
      {children}
    </button>
  );
}
