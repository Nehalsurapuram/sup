"use client";

import { useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import {
  buildCartLine,
  groupsForCategory,
  type Selection,
} from "@/lib/customization";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/format";

// Starbucks-style customizer: pick size / milk / shots / syrups / toppings
// and watch calories + price update live.
export function ProductCustomizer({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const groups = groupsForCategory(item.category);
  const soldOut = item.available === false;

  const [sel, setSel] = useState<Selection>(() => {
    const init: Selection = { shots: 0, syrups: [], toppings: [] };
    for (const g of groups) {
      if (g.kind === "single") {
        if (g.id === "size") init.size = g.defaultChoiceId;
        if (g.id === "milk") init.milk = g.defaultChoiceId;
      }
    }
    return init;
  });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Live preview — the single source of truth for price + calories.
  const preview = buildCartLine(item, sel, qty);
  const totalPaise = preview.pricePaise * qty;

  function toggleMulti(group: "syrups" | "toppings", id: string) {
    setSel((s) => {
      const cur = s[group] ?? [];
      const next = cur.includes(id)
        ? cur.filter((x) => x !== id)
        : [...cur, id];
      return { ...s, [group]: next };
    });
    setAdded(false);
  }

  function handleAdd() {
    add(buildCartLine(item, sel, qty));
    setAdded(true);
  }

  return (
    <div className="space-y-7">
      {groups.map((group) => {
        if (group.kind === "single") {
          const current = group.id === "size" ? sel.size : sel.milk;
          return (
            <Field key={group.id} label={group.label}>
              <div className="flex flex-wrap gap-2">
                {group.choices.map((c) => {
                  const active = current === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSel((s) => ({
                          ...s,
                          [group.id === "size" ? "size" : "milk"]: c.id,
                        }));
                        setAdded(false);
                      }}
                      className={chip(active)}
                    >
                      {c.label}
                      {c.pricePaiseDelta > 0 && (
                        <span className="ml-1 opacity-70">
                          +{formatPrice(c.pricePaiseDelta)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Field>
          );
        }

        if (group.kind === "stepper") {
          const n = sel.shots ?? 0;
          return (
            <Field key={group.id} label={group.label}>
              <div className="flex items-center gap-3">
                <StepBtn
                  onClick={() => {
                    setSel((s) => ({ ...s, shots: Math.max(0, n - 1) }));
                    setAdded(false);
                  }}
                >
                  −
                </StepBtn>
                <span className="w-8 text-center font-semibold text-foreground">
                  {n}
                </span>
                <StepBtn
                  onClick={() => {
                    setSel((s) => ({
                      ...s,
                      shots: Math.min(group.max ?? 6, n + 1),
                    }));
                    setAdded(false);
                  }}
                >
                  +
                </StepBtn>
                <span className="text-sm text-muted">
                  {formatPrice(group.choices[0].pricePaiseDelta)} each
                </span>
              </div>
            </Field>
          );
        }

        // multi
        const selected = (group.id === "syrups" ? sel.syrups : sel.toppings) ?? [];
        return (
          <Field key={group.id} label={group.label}>
            <div className="flex flex-wrap gap-2">
              {group.choices.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() =>
                    toggleMulti(group.id as "syrups" | "toppings", c.id)
                  }
                  className={chip(selected.includes(c.id))}
                >
                  {c.label}
                  {c.pricePaiseDelta > 0 && (
                    <span className="ml-1 opacity-70">
                      +{formatPrice(c.pricePaiseDelta)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Field>
        );
      })}

      {/* Quantity */}
      <Field label="Quantity">
        <div className="flex items-center gap-3">
          <StepBtn onClick={() => setQty((q) => Math.max(1, q - 1))}>−</StepBtn>
          <span className="w-8 text-center font-semibold text-foreground">
            {qty}
          </span>
          <StepBtn onClick={() => setQty((q) => q + 1)}>+</StepBtn>
        </div>
      </Field>

      {/* Live summary + add */}
      <div className="sticky bottom-4 rounded-card border border-border bg-surface p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">
              ~{preview.calories} cal{qty > 1 ? " each" : ""}
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              {formatPrice(totalPaise)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={soldOut}
            className={
              "rounded-full px-8 py-3 text-sm font-semibold transition-colors " +
              (soldOut
                ? "cursor-not-allowed bg-surface-muted text-muted"
                : "bg-primary text-primary-foreground hover:bg-primary-hover")
            }
          >
            {soldOut ? "Sold out" : added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
        {added && (
          <Link
            href="/cart"
            className="mt-3 block text-center text-sm font-semibold text-accent hover:underline"
          >
            View cart →
          </Link>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

function chip(active: boolean): string {
  return (
    "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
    (active
      ? "border-accent bg-surface-muted text-foreground"
      : "border-border bg-surface text-muted hover:text-foreground")
  );
}

function StepBtn({
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg text-foreground transition-colors hover:bg-surface-muted"
    >
      {children}
    </button>
  );
}
