"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold`. Drives the nav's
 * transparent -> glass transition (docs/03-wireframes.md §0.1). Backed by
 * a scroll listener with a rAF-throttled state write, which is cheap
 * enough for a single boolean flip and avoids the extra IntersectionObserver
 * sentinel element this would otherwise need.
 */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY >= threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
