"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { itemImage } from "@/lib/images";

// Product photo with a graceful fallback to the emoji tile if the image
// fails to load (e.g. offline). Uses a plain <img> so no next/image host
// config is needed for the external photo source.
export function ItemImage({
  item,
  className = "",
}: {
  item: MenuItem;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const soldOut = item.available === false;

  if (failed) {
    return (
      <div
        className={
          "flex items-center justify-center bg-surface-muted text-5xl " +
          className
        }
      >
        <span aria-hidden>{item.emoji}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={itemImage(item)}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={
        "h-full w-full object-cover " +
        (soldOut ? "opacity-40 grayscale " : "") +
        className
      }
    />
  );
}
