"use client";

import { useTransition } from "react";
import { deleteItemAction, toggleAvailabilityAction } from "@/lib/actions";

// Availability toggle + delete controls for an admin menu row.
export function ItemActions({
  id,
  available,
}: {
  id: string;
  available: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(() => toggleAvailabilityAction(id))
        }
        className={
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-60 " +
          (available
            ? "bg-success/20 text-success hover:bg-success/30"
            : "bg-surface-muted text-muted hover:bg-border")
        }
      >
        {available ? "Available" : "Hidden"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("Remove this item from the menu?")) {
            startTransition(() => deleteItemAction(id));
          }
        }}
        aria-label="Delete item"
        className="rounded-full px-2 py-1 text-xs font-semibold text-muted transition-colors hover:text-danger disabled:opacity-60"
      >
        ✕
      </button>
    </div>
  );
}
