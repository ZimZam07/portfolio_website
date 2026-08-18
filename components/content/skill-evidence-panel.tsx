"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import type { Skill } from "@/types/skill";

type SkillEvidencePanelProps = {
  skill: Skill | null;
  onClose: () => void;
};

/**
 * Shared panel beneath a cluster's chip grid — one skill's evidence at a
 * time, never a floating popover per chip. Avoids any positioning
 * fragility and works identically on mobile.
 */
export function SkillEvidencePanel({ skill, onClose }: SkillEvidencePanelProps) {
  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait">
        {skill && (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 rounded-lg border border-border-subtle bg-bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-heading-sm text-text-primary">{skill.name}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1 text-text-tertiary transition-colors duration-fast hover:bg-bg-surface-2 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {skill.evidence?.learnedThrough && skill.evidence.learnedThrough.length > 0 && (
                <div>
                  <p className="text-caption tracking-wide text-text-tertiary uppercase">
                    Learned through
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {skill.evidence.learnedThrough.map((item) => (
                      <li key={item} className="text-body-sm text-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {skill.evidence?.appliedIn && skill.evidence.appliedIn.length > 0 && (
                <div>
                  <p className="text-caption tracking-wide text-text-tertiary uppercase">
                    Applied in
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {skill.evidence.appliedIn.map((item) => (
                      <li key={item} className="text-body-sm text-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
