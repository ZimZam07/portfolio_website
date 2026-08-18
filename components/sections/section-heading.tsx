import type { ElementType } from "react";

import { Button } from "@/components/ui/button";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  level?: ElementType;
};

/** Eyebrow + title + optional "View all" link — reused across every Home section. */
export function SectionHeading({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel = "View all",
  level: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-caption tracking-wide text-text-tertiary uppercase">
          {eyebrow}
        </p>
        <Heading className="mt-1 text-display-lg font-semibold text-text-primary">
          {title}
        </Heading>
      </div>
      {viewAllHref && (
        <Button variant="text" href={viewAllHref}>
          {viewAllLabel} →
        </Button>
      )}
    </div>
  );
}
