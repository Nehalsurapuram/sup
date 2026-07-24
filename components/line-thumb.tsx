"use client";

import { useState } from "react";
import { lineImage } from "@/lib/images";

// Small square photo for a cart/order line, falling back to the emoji.
export function LineThumb({
  itemId,
  emoji,
  className = "h-14 w-14",
}: {
  itemId: string;
  emoji: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={
          "flex items-center justify-center rounded-lg bg-surface-muted text-2xl " +
          className
        }
      >
        <span aria-hidden>{emoji}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={lineImage(itemId)}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={"rounded-lg object-cover " + className}
    />
  );
}
