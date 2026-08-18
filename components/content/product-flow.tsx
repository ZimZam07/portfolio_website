"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { ProductFlowStage } from "@/types/skill";

type ProductFlowProps = {
  stages: ProductFlowStage[];
};

/**
 * Problem → delivery. The argument the page is making in one graphic: the
 * product-side stages and the engineering stage sit on a single arc, so
 * neither reads as an add-on to the other.
 *
 * Rail fills with scroll via one transform, matching the technique used by
 * the case-study and experience flows so the site has a single motion
 * vocabulary. Reduced motion renders the rail full and every stage
 * resolved.
 */
export function ProductFlow({ stages }: ProductFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Column count and rail inset are derived from the stage count rather
  // than hardcoded, so the same component serves flows of any length. With
  // N equal columns the first and last markers sit at 100/(2N)% of the
  // track, which is exactly where the rail has to start and stop.
  const layout = {
    "--flow-cols": String(stages.length),
    "--flow-inset": `${100 / (2 * stages.length)}%`,
  } as CSSProperties;

  return (
    <div ref={containerRef} style={layout} className="relative">
      {/* Stacked layout rail */}
      <div
        className="absolute top-3 bottom-3 left-[0.4375rem] w-px bg-border-subtle lg:hidden"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-brand"
          style={reducedMotion ? { scaleY: 1 } : { scaleY: progress }}
        />
      </div>

      {/* Diagram layout rail — spans the first and last marker centres. */}
      <div
        className="absolute top-[0.4375rem] right-[var(--flow-inset)] left-[var(--flow-inset)] hidden h-px bg-border-subtle lg:block"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-brand"
          style={reducedMotion ? { scaleX: 1 } : { scaleX: progress }}
        />
      </div>

      <ol className="relative grid gap-6 lg:grid-cols-[repeat(var(--flow-cols),minmax(0,1fr))] lg:gap-4">
        {stages.map((stage, index) => (
          <FlowStage key={stage.label} stage={stage} index={index} />
        ))}
      </ol>
    </div>
  );
}

function FlowStage({
  stage,
  index,
}: {
  stage: ProductFlowStage;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const resolved = inView || reducedMotion;

  return (
    <li
      ref={ref}
      className="flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
    >
      <span
        className={cn(
          "relative z-10 mt-1.5 size-3.5 shrink-0 rounded-full border-2 bg-bg-base transition-colors duration-base ease-out lg:mt-0",
          resolved ? "border-brand" : "border-border-default",
        )}
        aria-hidden
      />

      <motion.div
        className="min-w-0 flex-1 lg:flex-none"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={resolved ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.3,
          delay: reducedMotion ? 0 : index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <h3 className="text-body-md font-medium text-text-primary">
          {stage.label}
        </h3>
        <p className="mt-1 text-body-sm text-text-tertiary">{stage.detail}</p>
      </motion.div>
    </li>
  );
}
