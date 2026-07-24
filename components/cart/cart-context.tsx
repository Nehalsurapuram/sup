"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { OrderLine } from "@/lib/types";

export type CartLine = OrderLine;

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotalPaise: number;
  /** Add a fully-built (customized) line; merges by lineId. */
  add: (line: CartLine) => void;
  setQty: (lineId: string, qty: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "caffora.cart.v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartValue>(() => {
    const add = (line: CartLine) =>
      setLines((prev) => {
        const existing = prev.find((l) => l.lineId === line.lineId);
        if (existing) {
          return prev.map((l) =>
            l.lineId === line.lineId ? { ...l, qty: l.qty + line.qty } : l,
          );
        }
        return [...prev, line];
      });

    const setQty = (lineId: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.lineId !== lineId)
          : prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l)),
      );

    const remove = (lineId: string) =>
      setLines((prev) => prev.filter((l) => l.lineId !== lineId));

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
