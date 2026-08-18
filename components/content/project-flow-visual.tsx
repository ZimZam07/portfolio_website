"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type ProjectFlowVisualProps = {
  size?: "compact" | "expanded";
  className?: string;
};

/**
 * Decorative product-UI fragment standing in for a screenshot: an abstracted
 * listing plus the item's real status lifecycle (open → accepted →
 * completed), which is the single idea the project is built around.
 *
 * Entirely `aria-hidden` — every stage it depicts is stated in the adjacent
 * copy, so a screen reader gains nothing from the mock chrome. Animation
 * runs once on enter and settles; nothing loops. Under reduced motion it
 * renders in its resolved final state with no transition.
 */
const STAGES = [
  { label: "Reported", meta: "lost_requests" },
  { label: "Finder request", meta: "acceptances" },
  { label: "Returned", meta: "completed" },
] as const;

const STATUS_PILLS = [
  { label: "open", className: "bg-bg-surface-2 text-text-tertiary" },
  { label: "accepted", className: "bg-brand/10 text-brand" },
  { label: "returned", className: "bg-success/10 text-success" },
] as const;

export function ProjectFlowVisual({
  size = "compact",
  className,
}: ProjectFlowVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const timers = STAGES.map((_, index) =>
      setTimeout(() => setStep(index), 260 + index * 620),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const isExpanded = size === "expanded";
  // Reduced motion resolves to the final stage during render rather than
  // through the effect above — it's derived state, not a scheduled step.
  const activeStep = reducedMotion ? STAGES.length - 1 : step;
  const progress = activeStep <= 0 ? 0 : activeStep / (STAGES.length - 1);
  const pill = STATUS_PILLS[Math.max(activeStep, 0)];

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "overflow-hidden rounded-lg border border-border-subtle bg-bg-surface select-none",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <span className="font-mono text-mono-sm text-text-tertiary">
          recovery lifecycle
        </span>
        <span
          className={cn(
            "inline-flex min-w-[5.25rem] justify-center rounded-full px-2.5 py-1 font-mono text-mono-sm transition-colors duration-base ease-out",
            pill.className,
          )}
        >
          {pill.label}
        </span>
      </div>

      {/* Abstracted listing record — deliberately not a fake screenshot. */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-border-subtle px-4",
          isExpanded ? "py-5" : "py-4",
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md border border-border-subtle bg-bg-surface-2 text-text-tertiary",
            isExpanded ? "size-14" : "size-11",
          )}
        >
          <ImageIcon className={isExpanded ? "size-5" : "size-4"} />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-2 w-2/3 rounded-full bg-bg-surface-2" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-1/3 rounded-full bg-bg-surface-2" />
            <span className="rounded-full border border-border-subtle px-2 py-0.5 font-mono text-[0.6875rem] leading-4 text-text-tertiary">
              ₹ reward
            </span>
          </div>
        </div>
      </div>

      <div className={cn("relative px-4", isExpanded ? "py-5" : "py-4")}>
        {/* Connector track, with a brand-gradient fill that advances by stage. */}
        <div
          className={cn(
            "absolute left-[1.4375rem] w-px bg-border-default",
            isExpanded ? "top-[2.125rem] bottom-[2.125rem]" : "top-8 bottom-8",
          )}
        >
          <motion.div
            className="h-full w-full origin-top bg-gradient-brand"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progress }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
          />
        </div>

        <ul className={cn("relative", isExpanded ? "space-y-6" : "space-y-4")}>
          {STAGES.map((stage, index) => {
            const active = index <= activeStep;
            return (
              <li key={stage.label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-base ease-out",
                    active
                      ? "border-brand bg-brand"
                      : "border-border-default bg-bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "size-1 rounded-full bg-bg-base transition-opacity duration-base ease-out",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "flex-1 transition-colors duration-base ease-out",
                    isExpanded ? "text-body-md" : "text-body-sm",
                    active ? "text-text-primary" : "text-text-tertiary",
                  )}
                >
                  {stage.label}
                </span>
                <span className="font-mono text-mono-sm text-text-tertiary">
                  {stage.meta}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
