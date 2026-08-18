"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type RevealOnScrollProps = {
  children: ReactNode;
  /** Position within a staggered group; capped at 6 per docs/03-wireframes.md §1.7. */
  index?: number;
  className?: string;
};

/**
 * The one approved scroll-reveal pattern (fade + 12px translate-Y, fires
 * once) — see docs/02-design-system.md §5 and docs/05-component-library.md.
 * No component should hand-roll its own scroll animation instead of this.
 */
export function RevealOnScroll({
  children,
  index = 0,
  className,
}: RevealOnScrollProps) {
  const reducedMotion = useReducedMotion();
  const delay = reducedMotion ? 0 : Math.min(index, 6) * 0.04;

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-10% 0px" }}
      transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
