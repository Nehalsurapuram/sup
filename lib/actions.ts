"use server";

import { revalidatePath } from "next/cache";
import type { CategoryId, NewOrderInput } from "@/lib/types";
import { createOrder, advanceOrder, setOrderStatus } from "@/lib/data/orders";
import {
  addMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
} from "@/lib/data/menu";

// NOTE: These are mock actions with no auth. In a real deployment every
// POS/admin action must verify staff authentication + authorization.

// --- Ordering (customer) ---------------------------------------------

export async function placeOrder(input: NewOrderInput) {
  if (!input.items || input.items.length === 0) {
    throw new Error("Cannot place an empty order.");
  }
  const order = await createOrder(input);
  revalidatePath("/pos");
  revalidatePath("/admin");
  return { id: order.id, number: order.number };
}

// --- Fulfillment (staff POS) -----------------------------------------

export async function advanceOrderAction(id: string) {
  advanceOrder(id);
  revalidatePath("/pos");
  revalidatePath("/admin/orders");
}

export async function completeOrderAction(id: string) {
  setOrderStatus(id, "completed");
  revalidatePath("/pos");
  revalidatePath("/admin/orders");
}

// --- Menu management (admin) -----------------------------------------

export async function toggleAvailabilityAction(id: string) {
  toggleItemAvailability(id);
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteItemAction(id: string) {
  deleteMenuItem(id);
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function addItemAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const priceRupees = Number(formData.get("price") ?? 0);
  const category = String(formData.get("category") ?? "hot-coffee") as CategoryId;
  const description = String(formData.get("description") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? "☕").trim() || "☕";

  if (!name || priceRupees <= 0) {
    throw new Error("Name and a positive price are required.");
  }

  addMenuItem({
    name,
    description: description || "—",
    pricePaise: Math.round(priceRupees * 100),
    category,
    emoji,
    tags: [],
    available: true,
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
