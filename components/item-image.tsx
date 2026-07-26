"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { itemImage } from "@/lib/images";
import { usePrefersReducedMotion } from "@/lib/hooks";

// Product photo with a graceful fallback to the emoji tile if the image
// fails to load. When `zoom` is set, the photo slowly zooms in and out
// (Ken Burns), desynchronised per item for a lively 3D feel.
export function ItemImage({
  item,
  className = "",
  zoom = false,
  speed = 7,
}: {
  item: MenuItem;
  className?: string;
  zoom?: boolean;
  /** Seconds for a full zoom in-and-out cycle. */
  speed?: number;
}) {
  const [failed, setFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
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

  // Negative delay desynchronises each photo so the grid doesn't pulse in unison.
  const delay = -(item.id.length % 7);
  const zoomStyle: React.CSSProperties =
    zoom && !reducedMotion
      ? { animation: `breathe ${speed}s ease-in-out ${delay}s infinite` }
      : {};

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={itemImage(item)}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
      style={zoomStyle}
      className={
        "h-full w-full object-cover will-change-transform " +
        (soldOut ? "opacity-40 grayscale " : "") +
        className
      }
    />
  );
}
