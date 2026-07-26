"use client";

import { useEffect, useState } from "react";

// Subscribe to a CSS media query and re-render when it changes. Starts
// `false` on the server / first paint, then syncs on mount so SSR output
// stays stable (motion is treated as opt-in until we know the client).
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
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
