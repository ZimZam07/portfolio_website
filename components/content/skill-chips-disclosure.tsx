"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";

type SkillChipsDisclosureProps = {
  skills: string[];
  visibleCount?: number;
};

/**
 * Progressive disclosure for skill chips — shows the first `visibleCount`
 * and folds the rest behind a "+N more" toggle, so a 13-skill certificate
 * doesn't read as clutter next to a 3-skill one. Real button + aria-expanded,
 * not a hover-only trick, so it works identically on touch and keyboard.
 */
export function SkillChipsDisclosure({
  skills,
  visibleCount = 5,
}: SkillChipsDisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = skills.length > visibleCount;
  const shown = expanded ? skills : skills.slice(0, visibleCount);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {shown.map((skill) => (
        <Badge
          key={skill}
          tone="outline"
          className="transition-transform duration-fast ease-out hover:scale-105 hover:border-border-default hover:text-text-primary"
        >
          {skill}
        </Badge>
      ))}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="rounded-full border border-border-default px-2.5 py-1 text-caption text-text-tertiary transition-colors duration-fast ease-out hover:bg-bg-surface-2 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {expanded ? "Show less" : `+${skills.length - visibleCount} more`}
        </button>
      )}
    </div>
  );
}
