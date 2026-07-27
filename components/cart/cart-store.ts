"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { OrderLine } from "@/lib/types";

export type CartLine = OrderLine;

export interface CartValue {
  lines: CartLine[];
  count: number;
  subtotalPaise: number;
  /** Add a fully-built (customized) line; merges by lineId. */
  add: (line: CartLine) => void;
  setQty: (lineId: string, qty: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
}

const STORAGE_KEY = "caffora.cart.v2";

// The cart lives outside React, in localStorage, so components read it with
// useSyncExternalStore instead of copying it into state inside an effect.
// The server snapshot is an empty cart; React re-reads the real one right
// after hydration, so the two passes stay consistent.

const EMPTY: CartLine[] = [];

/** Cached snapshot — useSyncExternalStore needs a stable reference. */
let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as CartLine[]) : EMPTY;
  } catch {
    return EMPTY; // malformed or unavailable storage
  }
}

function getSnapshot(): CartLine[] {
  lines ??= readStorage();
  return lines;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function emit(): void {
  for (const listener of listeners) listener();
}

/** Another tab changed the cart — drop the cache and re-read. */
function handleStorageEvent(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return;
  lines = readStorage();
  emit();
}

function subscribe(onChange: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener("storage", handleStorageEvent);
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

function write(next: CartLine[]): void {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — the in-memory cart still works this session.
  }
  emit();
}

function add(line: CartLine): void {
  const prev = getSnapshot();
  const existing = prev.some((l) => l.lineId === line.lineId);
  write(
    existing
      ? prev.map((l) =>
          l.lineId === line.lineId ? { ...l, qty: l.qty + line.qty } : l,
        )
      : [...prev, line],
  );
}

function setQty(lineId: string, qty: number): void {
  const prev = getSnapshot();
  write(
    qty <= 0
      ? prev.filter((l) => l.lineId !== lineId)
      : prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l)),
  );
}

function remove(lineId: string): void {
  write(getSnapshot().filter((l) => l.lineId !== lineId));
}

function clear(): void {
  write(EMPTY);
}

export function useCart(): CartValue {
  const lines = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotalPaise: lines.reduce((sum, l) => sum + l.pricePaise * l.qty, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [lines],
  );
}
