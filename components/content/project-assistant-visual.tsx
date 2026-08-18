"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type ProjectAssistantVisualProps = {
  size?: "compact" | "expanded";
  className?: string;
};

/**
 * Decorative product-UI fragment for the fitness app. It depicts the one
 * thing that makes the project interesting: the user's own context is
 * gathered first, deterministic figures are computed from it, and only then
 * does a grounded reply stream in.
 *
 * Deliberately abstract — the repository ships no screenshots, so inventing
 * a pixel-perfect fake of a screen that may not look like this would be
 * worse than an honest diagram. The metric values are illustrative sample
 * output of the app's real formulas, not measured results.
 *
 * `aria-hidden` throughout: the same sequence is described in the adjacent
 * copy, so this adds nothing for a screen reader. Runs once on enter and
 * settles; under reduced motion it renders resolved with no transition.
 */

/** Phases of the entrance sequence. */
const CONTEXT = 0;
const METRICS = 1;
const STREAM = 2;
const DONE = 3;

const CONTEXT_CHIPS = ["profile", "7 daily logs"];

const METRICS_ROW = [
  { label: "BMI", value: "22.4" },
  { label: "kcal / day", value: "2,340" },
  { label: "water", value: "2.6 L" },
];

/** Widths of the abstracted reply lines, in order. */
const REPLY_LINES = ["92%", "78%", "45%"];

export function ProjectAssistantVisual({
  size = "compact",
  className,
}: ProjectAssistantVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const schedule = [200, 750, 1300, 2350];
    const timers = schedule.map((delay, index) =>
      setTimeout(() => setStep(index), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const isExpanded = size === "expanded";
  // Reduced motion resolves to the finished state during render rather than
  // through the effect above — derived state, not a scheduled step.
  const activeStep = reducedMotion ? DONE : step;

  const streaming = activeStep === STREAM;
  const finished = activeStep >= DONE;

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
          fitness assistant
        </span>
        <span
          className={cn(
            "inline-flex min-w-[5.75rem] items-center justify-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-mono-sm transition-colors duration-base ease-out",
            finished
              ? "bg-success/10 text-success"
              : streaming
                ? "bg-brand/10 text-brand"
                : "bg-bg-surface-2 text-text-tertiary",
          )}
        >
          {streaming && <StatusDot tone="brand" pulse />}
          {finished ? "ready" : streaming ? "streaming" : "idle"}
        </span>
      </div>

      {/* 1 — the context assembled into the prompt before any model call. */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 border-b border-border-subtle px-4",
          isExpanded ? "py-4" : "py-3",
        )}
      >
        <span className="font-mono text-mono-sm text-text-tertiary">
          context
        </span>
        {CONTEXT_CHIPS.map((chip, index) => (
          <motion.span
            key={chip}
            className="rounded-full border border-border-subtle bg-bg-base px-2 py-0.5 font-mono text-[0.6875rem] leading-4 text-text-secondary"
            initial={reducedMotion ? false : { opacity: 0, y: 4 }}
            animate={
              activeStep >= CONTEXT ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }
            }
            transition={{
              duration: 0.25,
              delay: reducedMotion ? 0 : index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {chip}
          </motion.span>
        ))}
      </div>

      {/* 2 — figures the app computes itself, no model involved. */}
      <div
        className={cn(
          "grid grid-cols-3 gap-3 border-b border-border-subtle px-4",
          isExpanded ? "py-5" : "py-4",
        )}
      >
        {METRICS_ROW.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={
              activeStep >= METRICS ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
            }
            transition={{
              duration: 0.3,
              delay: reducedMotion ? 0 : index * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="font-mono text-mono-sm text-text-tertiary">
              {metric.label}
            </p>
            <p
              className={cn(
                "mt-0.5 font-medium text-text-primary",
                isExpanded ? "text-heading-sm" : "text-body-sm",
              )}
            >
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 3 — the grounded reply arriving token by token. */}
      <div className={cn("px-4", isExpanded ? "py-5" : "py-4")}>
        <div className="flex gap-3">
          <span
            className={cn(
              "mt-0.5 w-px shrink-0 rounded-full transition-colors duration-base ease-out",
              activeStep >= STREAM ? "bg-gradient-brand" : "bg-border-default",
              isExpanded ? "h-14" : "h-11",
            )}
          />
          <div className="min-w-0 flex-1 space-y-2">
            {REPLY_LINES.map((width, index) => (
              <motion.div
                key={width}
                className="h-2 rounded-full bg-bg-surface-2"
                initial={reducedMotion ? false : { width: 0 }}
                animate={activeStep >= STREAM ? { width } : { width: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.45,
                  delay: reducedMotion ? 0 : index * 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
