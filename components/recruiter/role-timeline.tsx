"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { RecruiterRole } from "@/lib/content/recruiter";

type RoleTimelineProps = {
  roles: RecruiterRole[];
};

/**
 * Roles as a vertical timeline, using the same scroll-linked rail
 * technique as the Experience and About pages so the motion vocabulary
 * stays consistent across the site.
 *
 * Only entries with a genuinely known period render one — the product
 * roles carry no dates anywhere in the project, and inventing them to
 * fill the column would be fabrication.
 */
export function RoleTimeline({ roles }: RoleTimelineProps) {
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

      {roles.map((role, index) => (
        <Entry
          key={`${role.organisation}-${role.role}`}
          role={role}
          index={index}
          isLast={index === roles.length - 1}
        />
      ))}
    </ol>
  );
}

function Entry({
  role,
  index,
  isLast,
}: {
  role: RecruiterRole;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const resolved = inView || reducedMotion;

  return (
    <li ref={ref} className={cn("relative flex gap-5", !isLast && "pb-8")}>
      <span
        className={cn(
          "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border-2 transition-colors duration-base ease-out",
          resolved ? "border-brand bg-brand" : "border-border-default bg-bg-base",
        )}
        aria-hidden
      />

      <motion.div
        className="min-w-0 flex-1"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={resolved ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.3,
          delay: reducedMotion ? 0 : Math.min(index, 4) * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-heading-sm font-medium text-text-primary">
            {role.role}
          </h3>
          {role.period && (
            <span className="font-mono text-mono-sm text-text-tertiary">
              {role.period}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-body-sm text-brand">{role.organisation}</p>
        <p className="mt-2 max-w-[68ch] text-body-md text-text-secondary">
          {role.detail}
        </p>
      </motion.div>
    </li>
  );
}
