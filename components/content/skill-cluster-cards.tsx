"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Braces, Code2, Compass, Sparkles, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { SkillGroup, SkillGroupIcon } from "@/lib/content/skills";

type SkillClusterCardsProps = {
  groups: SkillGroup[];
};

const ICONS: Record<SkillGroupIcon, LucideIcon> = {
  engineering: Code2,
  languages: Braces,
  ai: Sparkles,
  product: Compass,
};

/**
 * Asymmetric spans, alternating 7/5 then 5/7 across a 12-column grid. Four
 * equal columns is what made the previous treatment read as a table; an
 * uneven rhythm reads as a composition, and gives the wider clusters room
 * for five chips on one line.
 */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

/**
 * Home skills preview. Separate floating cards rather than one divided
 * rectangle, so the section has the same air as Featured Projects.
 *
 * Hovering a cluster dims its siblings — the "constellation" relationship
 * expressed by focus rather than by drawing literal connecting lines,
 * which at this size would be noise. That dimming is purely decorative:
 * every skill stays legible and nothing is revealed only on hover, so
 * touch and keyboard users lose no information.
 */
export function SkillClusterCards({ groups }: SkillClusterCardsProps) {
  const [active, setActive] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const visible = groups.filter((group) => group.skills.length > 0);
  if (visible.length === 0) return null;

  const chipVariants = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 6 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
      onMouseLeave={() => setActive(null)}
    >
      {visible.map((group, index) => {
        const Icon = group.icon ? ICONS[group.icon] : Code2;
        const isProduct = group.icon === "product";
        const dimmed = active !== null && active !== group.label;

        return (
          <motion.li
            key={group.label}
            className={cn("sm:col-span-1", SPANS[index] ?? "lg:col-span-6")}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-8% 0px" }}
            transition={{
              duration: 0.35,
              delay: reducedMotion ? 0 : index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setActive(group.label)}
          >
            <div
              className={cn(
                "group relative h-full overflow-hidden rounded-lg border bg-bg-surface p-6 transition-all duration-base ease-out",
                // Product carries a faint brand-tinted border at rest so the
                // non-technical half of the profile registers without a
                // second gradient surface competing with Featured Projects.
                isProduct ? "border-brand/30" : "border-border-subtle",
                dimmed ? "opacity-55" : "opacity-100",
                "hover:border-brand/50 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl",
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "size-4 transition-colors duration-base ease-out",
                    isProduct
                      ? "text-brand"
                      : "text-text-tertiary group-hover:text-brand",
                  )}
                  aria-hidden
                />
                <h3 className="text-caption tracking-wide text-text-tertiary uppercase">
                  {group.label}
                </h3>
              </div>

              {group.description && (
                <p className="mt-3 text-body-md text-text-primary">
                  {group.description}
                </p>
              )}

              <motion.ul
                className="mt-5 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={listVariants}
              >
                {group.skills.map((skill) => (
                  <motion.li key={skill.name} variants={chipVariants}>
                    <span className="inline-flex rounded-full border border-border-default px-3 py-1.5 text-body-sm text-text-secondary transition-colors duration-fast ease-out group-hover:border-border-default group-hover:text-text-primary">
                      {skill.name}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-base ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                aria-hidden
              />
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
