import type { Metadata } from "next";
import { getCategories, getMenu } from "@/lib/data/menu";
import { formatPrice } from "@/lib/format";
import { addItemAction } from "@/lib/actions";
import { ItemActions } from "@/components/admin/item-actions";

export const metadata: Metadata = { title: "Menu management" };
export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const [items, categories] = await Promise.all([getMenu(), getCategories()]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Menu management
      </h1>
      <p className="text-sm text-muted">{items.length} items</p>

      {/* Add item */}
      <form
        action={addItemAction}
        className="mt-6 grid gap-3 rounded-card border border-border bg-surface p-5 sm:grid-cols-2 lg:grid-cols-6"
      >
        <input
          name="name"
          required
          placeholder="Item name"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent lg:col-span-2"
        />
        <input
          name="price"
          type="number"
          min="1"
          step="1"
          required
          placeholder="Price ₹"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
        />
        <select
          name="category"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          name="emoji"
          maxLength={2}
          placeholder="Emoji"
          defaultValue="☕"
          className="rounded-xl border border-border bg-background px-3 py-2 text-center text-sm text-foreground outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Add item
        </button>
        <input
          name="description"
          placeholder="Short description (optional)"
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent sm:col-span-2 lg:col-span-6"
        />
      </form>

      {/* Item table */}
      <div className="mt-6 overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border bg-surface/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden>
                      {item.emoji}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-muted">
                  {item.category}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {formatPrice(item.pricePaise)}
                </td>
                <td className="px-4 py-3">
                  <ItemActions
                    id={item.id}
                    available={item.available !== false}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
