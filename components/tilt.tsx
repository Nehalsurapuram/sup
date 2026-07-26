"use client";

import { useRef, useState } from "react";
import { usePointerMotion } from "@/lib/hooks";

// Reusable 3D tilt wrapper. Rotates its contents toward the cursor in
// real perspective and lifts with a dynamic shadow. Children can use
// `translateZ(...)` (with the parent's preserve-3d) to pop toward the
// viewer for a layered, parallax feel.
export function Tilt({
  children,
  className = "",
  max = 12,
  scale = 1.03,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = usePointerMotion();
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg) scale(1)",
  });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || !enabled) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(${scale})`,
      transition: "transform 80ms ease-out",
    });
  }

  function reset() {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 400ms ease-out",
    });
  }

  return (
    <div ref={ref} className={"[perspective:1000px] " + className}>
      <div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ ...style, transformStyle: "preserve-3d" }}
        className="h-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
