"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type ProjectApronVisualProps = {
  size?: "compact" | "expanded";
  className?: string;
};

/**
 * Decorative engine-state fragment for TarmacOS. It replays the project's
 * reference "three-way deadlock" scenario under the Recovery policy: flights
 * A, B and C each hold one apron resource and wait for the next, the cycle
 * is detected, victim C is rolled back, and the flights finish at the ticks
 * the engine actually reports (B t13, A t18, C t21 — see the repository's
 * README and golden test T-G4).
 *
 * Deliberately abstract rather than a fake dashboard screenshot. `aria-hidden`
 * throughout: the same mechanism is described in the adjacent copy. Runs
 * once on enter and settles; under reduced motion it renders resolved.
 */

/** Phases of the entrance sequence. */
const HOLD = 0;
const WAIT = 1;
const RECOVER = 2;
const DONE = 3;

type Holder = "A" | "B" | "C";

const RESOURCES: { label: string; holder: Holder; recoveredHolder: Holder }[] = [
  { label: "Gate 3", holder: "A", recoveredHolder: "A" },
  { label: "Fuel truck", holder: "B", recoveredHolder: "B" },
  // C is the victim: its tug is preempted and granted to the waiting B.
  { label: "Tug", holder: "C", recoveredHolder: "B" },
];

const WAITS: { flight: Holder; waitsFor: string; recovered: string }[] = [
  { flight: "A", waitsFor: "fuel truck", recovered: "waits for fuel truck" },
  { flight: "B", waitsFor: "tug", recovered: "granted tug" },
  { flight: "C", waitsFor: "gate 3", recovered: "rolled back · victim" },
];

const FINISH = [
  { flight: "B", tick: "t13" },
  { flight: "A", tick: "t18" },
  { flight: "C", tick: "t21" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectApronVisual({
  size = "compact",
  className,
}: ProjectApronVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const schedule = [200, 950, 1800, 2500];
    const timers = schedule.map((delay, index) =>
      setTimeout(() => setStep(index), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const isExpanded = size === "expanded";
  // Reduced motion resolves to the finished state during render rather than
  // through the effect above — derived state, not a scheduled step.
  const activeStep = reducedMotion ? DONE : step;

  const deadlocked = activeStep === WAIT;
  const recovered = activeStep >= RECOVER;
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
          apron control
        </span>
        <span
          className={cn(
            "inline-flex min-w-[6.5rem] items-center justify-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-mono-sm transition-colors duration-base ease-out",
            recovered
              ? "bg-success/10 text-success"
              : deadlocked
                ? "bg-warning/10 text-warning"
                : "bg-bg-surface-2 text-text-tertiary",
          )}
        >
          {!recovered && !deadlocked && <StatusDot tone="brand" pulse />}
          {recovered ? "recovered" : deadlocked ? "t8 · cycle" : "running"}
        </span>
      </div>

      {/* 1 — the three contended resources and who holds each. */}
      <div
        className={cn(
          "grid grid-cols-3 gap-2 border-b border-border-subtle px-4",
          isExpanded ? "py-5" : "py-4",
        )}
      >
        {RESOURCES.map((resource, index) => {
          const holder = recovered ? resource.recoveredHolder : resource.holder;
          const reassigned = recovered && holder !== resource.holder;
          return (
            <motion.div
              key={resource.label}
              className="min-w-0 rounded-md border border-border-subtle bg-bg-base px-2.5 py-2"
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={
                activeStep >= HOLD ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
              }
              transition={{
                duration: 0.3,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: EASE,
              }}
            >
              <p className="truncate font-mono text-mono-sm text-text-tertiary">
                {resource.label}
              </p>
              {/* Size and colour are joined by hand: twMerge treats the
                  custom text-* size tokens as colours and would drop one. */}
              <p
                className={`mt-0.5 font-medium transition-colors duration-base ease-out ${
                  isExpanded ? "text-heading-sm" : "text-body-sm"
                } ${reassigned ? "text-brand" : "text-text-primary"}`}
              >
                {holder}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* 2 — the wait-for chain that closes into a cycle, then breaks. */}
      <ul
        className={cn(
          "space-y-2 border-b border-border-subtle px-4",
          isExpanded ? "py-5" : "py-4",
        )}
      >
        {WAITS.map((wait, index) => {
          const victim = recovered && wait.flight === "C";
          return (
            <motion.li
              key={wait.flight}
              className="flex items-center gap-3"
              initial={reducedMotion ? false : { opacity: 0, x: -6 }}
              animate={
                activeStep >= WAIT ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }
              }
              transition={{
                duration: 0.3,
                delay: reducedMotion ? 0 : index * 0.1,
                ease: EASE,
              }}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6875rem] leading-4 transition-colors duration-base ease-out",
                  deadlocked
                    ? "border-warning text-warning"
                    : victim
                      ? "border-border-default text-text-tertiary"
                      : "border-brand text-brand",
                )}
              >
                {wait.flight}
              </span>
              <span
                className={`flex-1 font-mono text-mono-sm transition-colors duration-base ease-out ${
                  victim ? "text-text-tertiary" : "text-text-secondary"
                }`}
              >
                {recovered ? wait.recovered : `waits for ${wait.waitsFor}`}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {/* 3 — every flight completes once the cycle is broken. */}
      <div
        className={cn(
          "flex items-center gap-3 px-4",
          isExpanded ? "py-5" : "py-4",
        )}
      >
        <span className="font-mono text-mono-sm text-text-tertiary">
          finished
        </span>
        <div className="flex flex-wrap gap-2">
          {FINISH.map((item, index) => (
            <motion.span
              key={item.flight}
              className="rounded-full border border-border-subtle bg-bg-base px-2 py-0.5 font-mono text-[0.6875rem] leading-4 text-text-secondary"
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={finished ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{
                duration: 0.25,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: EASE,
              }}
            >
              {item.flight} {item.tick}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
