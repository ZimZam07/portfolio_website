"use client";

import { useState } from "react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SkillNode } from "@/components/content/skill-node";
import { SkillEvidencePanel } from "@/components/content/skill-evidence-panel";
import type { ResolvedSkillCluster } from "@/lib/content/skills";
import type { Skill } from "@/types/skill";

type SkillClusterSectionProps = {
  resolved: ResolvedSkillCluster;
  index: number;
  /** The one cluster that gets the ambient glow treatment — the site's
   * differentiator, not a decoration applied everywhere. */
  highlight?: boolean;
};

export function SkillClusterSection({
  resolved,
  index,
  highlight,
}: SkillClusterSectionProps) {
  const { cluster, skills } = resolved;
  const [selected, setSelected] = useState<Skill | null>(null);

  function handleSelect(skill: Skill) {
    setSelected((current) => (current?.name === skill.name ? null : skill));
  }

  return (
    <RevealOnScroll index={index}>
      <section aria-labelledby={`cluster-${cluster.id}`} className="relative">
        {highlight && (
          <div
            className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-lg bg-gradient-brand opacity-[0.06] blur-3xl"
            aria-hidden
          />
        )}

        <h2 id={`cluster-${cluster.id}`} className="text-heading-lg text-text-primary">
          {cluster.title}
        </h2>
        <p className="mt-1.5 max-w-[65ch] text-body-sm text-text-tertiary">
          {cluster.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              selected={selected?.name === skill.name}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <SkillEvidencePanel skill={selected} onClose={() => setSelected(null)} />
      </section>
    </RevealOnScroll>
  );
}
