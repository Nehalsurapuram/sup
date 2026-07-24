"use client";

import { useTransition } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { advanceOrderAction, completeOrderAction } from "@/lib/actions";
import { formatPrice } from "@/lib/format";

const NEXT_LABEL: Record<OrderStatus, string | null> = {
  new: "Start preparing",
  preparing: "Mark ready",
  ready: "Complete order",
  completed: null,
};

// A single order ticket on the POS board. Staff advance it through stages.
export function OrderTicket({ order }: { order: Order }) {
  const [pending, startTransition] = useTransition();
  const label = NEXT_LABEL[order.status];

  function advance() {
    startTransition(async () => {
      if (order.status === "ready") {
        await completeOrderAction(order.id);
      } else {
        await advanceOrderAction(order.id);
      }
    });
  }

  const time = new Date(order.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-bold text-foreground">
          #{order.number}
        </span>
        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium capitalize text-muted">
          {order.type}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted">
        {order.customerName} · {time}
      </p>

      <ul className="mt-3 space-y-1.5 text-sm">
        {order.items.map((line) => (
          <li key={line.lineId} className="text-foreground">
            <span className="font-semibold">{line.qty}×</span> {line.name}
            {line.options.length > 0 && (
              <span className="block pl-5 text-xs text-muted">
                {line.options.join(" · ")}
              </span>
            )}
          </li>
        ))}
      </ul>

      {order.note && (
        <p className="mt-2 rounded-lg bg-surface-muted p-2 text-xs text-muted">
          📝 {order.note}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-semibold text-foreground">
          {formatPrice(order.subtotalPaise)}
        </span>
        {label && (
          <button
            type="button"
            onClick={advance}
            disabled={pending}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {pending ? "…" : label}
          </button>
        )}
      </div>
    </article>
  );
}
