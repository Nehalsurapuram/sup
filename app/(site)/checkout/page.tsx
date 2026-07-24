"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/format";
import { placeOrder } from "@/lib/actions";
import type { OrderType } from "@/lib/types";

// Checkout — collects customer details and submits the order.
export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotalPaise, count, clear } = useCart();
  const [name, setName] = useState("");
  const [type, setType] = useState<OrderType>("takeaway");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { id } = await placeOrder({
        items: lines,
        customerName: name,
        type,
        note,
      });
      clear();
      router.push(`/order/${id}`);
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  }

  if (count === 0) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Checkout
        </h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Browse the menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_360px]">
      {/* Form */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Checkout
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Your name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Abhay"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none placeholder:text-muted focus:border-accent"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Order type
            </span>
            <div className="flex gap-3">
              {(["takeaway", "dine-in"] as OrderType[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setType(opt)}
                  className={
                    "flex-1 rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors " +
                    (type === opt
                      ? "border-accent bg-surface-muted text-foreground"
                      : "border-border bg-surface text-muted hover:text-foreground")
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Notes <span className="text-muted">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Allergies, extra shot, oat milk…"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none placeholder:text-muted focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {submitting
              ? "Placing order…"
              : `Place order · ${formatPrice(subtotalPaise)}`}
          </button>
          <p className="text-center text-xs text-muted">
            Payment is collected at the counter. This is a demo checkout.
          </p>
        </form>
      </div>

      {/* Summary */}
      <aside className="h-fit rounded-card border border-border bg-surface p-6">
        <h2 className="font-semibold text-foreground">Order summary</h2>
        <ul className="mt-4 space-y-3">
          {lines.map((line) => (
            <li
              key={line.lineId}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <span className="text-muted">
                <span aria-hidden>{line.emoji}</span> {line.name} × {line.qty}
                {line.options.length > 0 && (
                  <span className="block text-xs opacity-80">
                    {line.options.join(" · ")}
                  </span>
                )}
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(line.pricePaise * line.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-medium text-muted">Subtotal</span>
          <span className="font-bold text-foreground">
            {formatPrice(subtotalPaise)}
          </span>
        </div>
      </aside>
    </section>
  );
}
