"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { SkillNode } from "@/components/content/skill-node";
import { SkillEvidencePanel } from "@/components/content/skill-evidence-panel";
import type { Skill, SkillCategory } from "@/types/skill";

type SkillExplorerProps = {
  skills: Skill[];
};

/**
 * Filter groups, not raw categories — "Backend" meaning databases too is
 * how someone scanning for backend capability actually thinks. Product and
 * Communication lead, matching the page's ordering everywhere else.
 */
const FILTERS: { id: string; label: string; categories: SkillCategory[] | null }[] =
  [
    { id: "all", label: "All", categories: null },
    { id: "product", label: "Product", categories: ["Product"] },
    { id: "communication", label: "Communication", categories: ["Communication"] },
    { id: "languages", label: "Languages", categories: ["Languages"] },
    { id: "frontend", label: "Frontend", categories: ["Frontend"] },
    { id: "backend", label: "Backend", categories: ["Backend", "Databases"] },
    { id: "ai", label: "AI & Data", categories: ["AI", "Data"] },
    {
      id: "foundations",
      label: "Foundations",
      categories: ["Fundamentals", "Concepts"],
    },
    { id: "tools", label: "Tools", categories: ["Tools", "Frameworks"] },
  ];

/**
 * Browse every skill by area. Chips animate between arrangements with
 * Framer's `layout`, which drives the reflow on transforms rather than
 * animating width/height — and is switched off entirely under reduced
 * motion, where filtering becomes an instant swap.
 *
 * Filters are toggle buttons with `aria-pressed` rather than a tab widget:
 * they re-filter a list in place instead of swapping panels, so tab
 * semantics would promise keyboard behaviour this doesn't have. The result
 * count is announced politely so the change isn't silent for screen
 * readers.
 */
export function SkillExplorer({ skills }: SkillExplorerProps) {
  const [activeId, setActiveId] = useState("all");
  const [selected, setSelected] = useState<Skill | null>(null);
  const reducedMotion = useReducedMotion();

  const visible = useMemo(() => {
    const filter = FILTERS.find((entry) => entry.id === activeId);
    if (!filter?.categories) return skills;
    return skills.filter((skill) => filter.categories!.includes(skill.category));
  }, [activeId, skills]);

  function handleSelect(skill: Skill) {
    setSelected((current) => (current?.name === skill.name ? null : skill));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by area">
        {FILTERS.map((filter) => {
          const isActive = filter.id === activeId;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setActiveId(filter.id);
                setSelected(null);
              }}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-body-sm transition-colors duration-fast ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                isActive
                  ? "border-brand bg-brand/10 font-medium text-text-primary"
                  : "border-border-default text-text-secondary hover:border-brand/50 hover:text-text-primary",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${visible.length} skills shown`}
      </p>

      <motion.ul layout={!reducedMotion} className="mt-6 flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((skill) => (
            <motion.li
              key={skill.name}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillNode
                skill={skill}
                selected={selected?.name === skill.name}
                onSelect={handleSelect}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <SkillEvidencePanel skill={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
