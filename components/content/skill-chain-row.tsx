"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { ResolvedSkillChain } from "@/lib/content/skills";

type SkillChainRowProps = {
  resolved: ResolvedSkillChain;
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const stepVariantsMotion = {
  hidden: { opacity: 0, scale: 0.92, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stepVariantsStatic = {
  hidden: { opacity: 1, scale: 1, y: 0 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

/**
 * One capability pathway — a sequence of skills that connect into a
 * larger capability, not isolated tags. Steps stagger in together
 * ("assembling") the first time the row enters the viewport.
 */
export function SkillChainRow({ resolved }: SkillChainRowProps) {
  const { chain, skills } = resolved;
  const reducedMotion = useReducedMotion();
  const stepVariants = reducedMotion ? stepVariantsStatic : stepVariantsMotion;

  return (
    <div>
      <p className="text-caption tracking-wide text-text-tertiary uppercase">
        {chain.title}
      </p>
      <motion.ol
        className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
      >
        {skills.map((skill, index) => (
          <motion.li key={skill.name} className="flex items-center gap-2" variants={stepVariants}>
            <span className="rounded-full border border-border-default px-3.5 py-1.5 text-body-sm text-text-primary">
              {skill.name}
            </span>
            {index < skills.length - 1 && (
              <ArrowRight className="size-4 shrink-0 text-text-tertiary" aria-hidden />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
