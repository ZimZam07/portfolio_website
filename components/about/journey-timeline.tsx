"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { JourneyMilestone } from "@/types/about";

type JourneyTimelineProps = {
  milestones: JourneyMilestone[];
};

/**
 * The journey as threads rather than timestamps. Only milestones with a
 * genuinely known period display one — the rest carry no date at all,
 * because filling the column with plausible-looking dates would be
 * fabrication dressed as design.
 *
 * Vertical at every breakpoint: a life doesn't compress into six equal
 * columns, and the descriptions need the reading width.
 */
export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <ol ref={containerRef} className="relative">
      <div
        className="absolute top-3 bottom-3 left-[0.3125rem] w-px bg-border-subtle"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-brand"
          style={reducedMotion ? { scaleY: 1 } : { scaleY: progress }}
        />
      </div>

      {milestones.map((milestone, index) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          index={index}
          isLast={index === milestones.length - 1}
        />
      ))}
    </ol>
  );
}

function Milestone({
  milestone,
  index,
  isLast,
}: {
  milestone: JourneyMilestone;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const resolved = inView || reducedMotion;
  const isNow = milestone.kind === "now";

  return (
    <li ref={ref} className={cn("relative flex gap-5", !isLast && "pb-9")}>
      <span
        className={cn(
          "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border-2 transition-colors duration-base ease-out",
          resolved
            ? "border-brand bg-brand"
            : "border-border-default bg-bg-base",
          isNow && resolved && "ring-4 ring-brand/20",
        )}
        aria-hidden
      />

      <motion.div
        className="min-w-0 flex-1"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={resolved ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.3,
          delay: reducedMotion ? 0 : Math.min(index, 4) * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-heading-sm font-medium text-text-primary">
            {milestone.title}
          </h3>
          {milestone.period && (
            <span className="font-mono text-mono-sm text-text-tertiary">
              {milestone.period}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-body-sm text-brand">{milestone.context}</p>
        <p className="mt-2 max-w-[64ch] text-body-md text-text-secondary">
          {milestone.description}
        </p>
      </motion.div>
    </li>
  );
}
