"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { useCart } from "@/components/cart/cart-context";

// Add-to-cart button used on menu cards.
export function AddToCart({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = item.available === false;

  function handleAdd() {
    add(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={soldOut}
      className={
        "w-full rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
        (soldOut
          ? "cursor-not-allowed bg-surface-muted text-muted"
          : "bg-primary text-primary-foreground hover:bg-primary-hover")
      }
    >
      {soldOut ? "Sold out" : added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
