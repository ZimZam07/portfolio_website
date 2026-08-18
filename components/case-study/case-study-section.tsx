import type { ReactNode } from "react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { cn } from "@/lib/utils";

type CaseStudySectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * One major band of the case study. The `id` is both the anchor target and
 * the value CaseStudyNav tracks, so the two stay in sync from a single
 * source (the SECTIONS list built in the page).
 *
 * `scroll-mt` clears the stacked main nav + sticky sub-nav so an anchored
 * heading never lands underneath them (docs/03-wireframes.md §2.8).
 */
export function CaseStudySection({
  id,
  eyebrow,
  title,
  children,
  className,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-36 lg:scroll-mt-40", className)}
    >
      <RevealOnScroll>
        {eyebrow && (
          <p className="text-caption tracking-wide text-text-tertiary uppercase">
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-heading`}
          className="mt-1 text-heading-lg font-semibold text-text-primary"
        >
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </RevealOnScroll>
    </section>
  );
}
