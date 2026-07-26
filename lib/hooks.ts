"use client";

import { useSyncExternalStore } from "react";

// Subscribe to a CSS media query and re-render when it changes. Uses
// useSyncExternalStore so React reads the value from the browser directly
// and stays consistent; the server snapshot is `false`, so motion is treated
// as opt-in until the client hydrates.
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True when the user has asked the OS to minimise animation. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True when rich pointer-driven motion (e.g. cursor tilt) is appropriate:
 * a fine, hovering pointer and no reduced-motion preference. Touch devices
 * and reduced-motion users get the static layout instead.
 */
export function usePointerMotion(): boolean {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = usePrefersReducedMotion();
  return finePointer && !reduced;
}
