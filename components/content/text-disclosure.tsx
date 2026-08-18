"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type TextDisclosureProps = {
  text: string;
  className?: string;
  /** Character count above which the text collapses by default. */
  threshold?: number;
};

/**
 * Collapses long paragraphs to 3 lines behind a "Read more" toggle. Short
 * text (under `threshold`) renders in full with no toggle at all — this
 * never hides content permanently, just defers it one click, same
 * philosophy as SkillChipsDisclosure.
 */
export function TextDisclosure({
  text,
  className,
  threshold = 220,
}: TextDisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = text.length > threshold;

  return (
    <div>
      <p
        className={cn(
          className,
          needsToggle && !expanded && "line-clamp-3",
        )}
      >
        {text}
      </p>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-1 text-caption font-medium text-brand transition-colors duration-fast ease-out hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
