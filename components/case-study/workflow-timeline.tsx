"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { ProjectWorkflowStep } from "@/types/project";

type WorkflowTimelineProps = {
  steps: ProjectWorkflowStep[];
};

/**
 * Scroll-driven product workflow. A single spine runs the height of the
 * list and fills in step with scroll progress, while each stage resolves
 * as it enters view — a continuous process rather than five equal columns.
 *
 * The fill is a `scaleY` on one element driven by `useScroll`, so the
 * scroll-linked work stays on the compositor: no per-frame layout, no
 * scroll listener, nothing that reads geometry during scroll. Under
 * reduced motion the spine renders filled and stages render resolved, so
 * the diagram still reads correctly with no animation at all.
 */
export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  const containerRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 65%"],
  });
  const spineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <ol ref={containerRef} className="relative">
      {/* Spine: track + scroll-linked fill, aligned to the marker centres. */}
      <div
        className="absolute top-4 bottom-4 left-[1.4375rem] w-px bg-border-subtle sm:left-[1.6875rem]"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-brand"
          style={reducedMotion ? { scaleY: 1 } : { scaleY: spineScale }}
        />
      </div>

      {steps.map((step, index) => (
        <WorkflowStep
          key={step.title}
          step={step}
          index={index}
          isLast={index === steps.length - 1}
        />
      ))}
    </ol>
  );
}

function WorkflowStep({
  step,
  index,
  isLast,
}: {
  step: ProjectWorkflowStep;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const resolved = inView || reducedMotion;

  return (
    <li ref={ref} className={cn("relative flex gap-5", !isLast && "pb-10")}>
      <span
        className={cn(
          "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border font-mono text-mono-sm transition-colors duration-base ease-out sm:size-14",
          resolved
            ? "border-brand bg-bg-base text-brand"
            : "border-border-default bg-bg-base text-text-tertiary",
        )}
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div
        className="min-w-0 flex-1 pt-2.5 sm:pt-3.5"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={resolved ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="text-heading-sm font-medium text-text-primary">
          <span className="sr-only">{`Step ${index + 1}: `}</span>
          {step.title}
        </h3>
        <p className="mt-1.5 max-w-[58ch] text-body-md text-text-secondary">
          {step.description}
        </p>
        {step.detail && (
          <p className="mt-2.5 inline-block rounded-md bg-bg-surface-2 px-2.5 py-1 font-mono text-mono-sm text-text-tertiary">
            {step.detail}
          </p>
        )}
      </motion.div>
    </li>
  );
}
