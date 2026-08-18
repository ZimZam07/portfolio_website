"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type CaseStudyNavProps = {
  sections: { id: string; label: string }[];
};

/**
 * Sticky section nav — docs/03-wireframes.md §2.8. Pills are plain anchors,
 * so jumping to a section is native browser behaviour (keyboard, focus
 * handling and offset via each section's `scroll-mt` all come for free)
 * rather than a JS scroll handler that would have to re-implement them.
 *
 * Active tracking uses a single IntersectionObserver over all sections. The
 * asymmetric rootMargin makes a section "active" once it's roughly a third
 * into the viewport; where several qualify, the earliest in document order
 * wins so the indicator never jitters between neighbours.
 */
export function CaseStudyNav({ sections }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const visibleRef = useRef<Set<string>>(new Set());
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const visible = visibleRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const firstVisible = sections.find((section) =>
          visible.has(section.id),
        );
        if (firstVisible) setActiveId(firstVisible.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    const observed = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    observed.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Project sections"
      className="sticky top-16 z-20 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md lg:top-18"
    >
      {/* The bar itself is full-bleed; this inner track repeats Container's
          max-width and padding so the pills line up with page content. */}
      <ul className="mx-auto flex max-w-content gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:px-8 lg:px-16 [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative block rounded-md px-3 py-1.5 text-body-sm transition-colors duration-fast ease-out",
                  isActive
                    ? "text-text-primary"
                    : "text-text-tertiary hover:bg-bg-surface-2 hover:text-text-primary",
                )}
              >
                {section.label}
                {isActive && (
                  <motion.span
                    layoutId="case-study-nav-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
