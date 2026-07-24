"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MenuItem, OrderLine } from "@/lib/types";

export type CartLine = OrderLine;

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotalPaise: number;
  add: (item: MenuItem) => void;
  setQty: (itemId: string, qty: number) => void;
  remove: (itemId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "caffora.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (after initial load).
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartValue>(() => {
    const add = (item: MenuItem) =>
      setLines((prev) => {
        const existing = prev.find((l) => l.itemId === item.id);
        if (existing) {
          return prev.map((l) =>
            l.itemId === item.id ? { ...l, qty: l.qty + 1 } : l,
          );
        }
        return [
          ...prev,
          {
            itemId: item.id,
            name: item.name,
            emoji: item.emoji,
            pricePaise: item.pricePaise,
            qty: 1,
          },
        ];
      });

    const setQty = (itemId: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.itemId !== itemId)
          : prev.map((l) => (l.itemId === itemId ? { ...l, qty } : l)),
      );

    const remove = (itemId: string) =>
      setLines((prev) => prev.filter((l) => l.itemId !== itemId));

    const clear = () => setLines([]);

    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotalPaise = lines.reduce(
      (sum, l) => sum + l.pricePaise * l.qty,
      0,
    );

    return { lines, count, subtotalPaise, add, setQty, remove, clear };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
