import { ArrowUpRight } from "lucide-react";

import { StatusDot } from "@/components/ui/status-dot";
import { siGithub } from "simple-icons";
import { BrandIcon } from "@/components/ui/brand-icon";
import type { CurrentlyBuilding } from "@/types/currently-building";

type CurrentlyBuildingCardProps = {
  project: CurrentlyBuilding;
};

/**
 * Visually distinct from every other card — gradient border (1px, via the
 * padding-box trick below) instead of neutral, per docs/03-wireframes.md
 * §1.5. One of the sanctioned gradient surfaces in docs/02 §1.
 */
export function CurrentlyBuildingCard({ project }: CurrentlyBuildingCardProps) {
  return (
    <div className="rounded-lg bg-gradient-brand p-px">
      <div className="flex flex-col gap-3 rounded-[calc(var(--radius-lg)-1px)] bg-bg-base p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-caption tracking-wide text-brand uppercase">
            <StatusDot tone="brand" pulse />
            Actively building
          </div>
          <p className="mt-2 text-heading-md text-text-primary">
            {project.title}
          </p>
          <p className="mt-1 text-body-sm text-text-secondary">
            {project.description}
          </p>
        </div>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-body-sm text-text-secondary hover:text-text-primary"
          >
            <BrandIcon icon={siGithub} className="size-4" aria-hidden />
            Repo
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}
