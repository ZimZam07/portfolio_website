import Link from "next/link";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { siGithub } from "simple-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { StatusDot } from "@/components/ui/status-dot";
import { ProjectVisual } from "@/components/content/project-visual";
import type { Project, ProjectStatus } from "@/types/project";

type CaseStudyHeroProps = {
  project: Project;
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

const STATUS_TONE: Record<ProjectStatus, "success" | "brand" | "neutral"> = {
  shipped: "success",
  "in-progress": "brand",
  archived: "neutral",
};

/**
 * Case study hero — docs/03-wireframes.md §2.2. Button hierarchy follows
 * §2.7: the live demo is primary where one exists and source drops to
 * secondary, never two gradient buttons side by side. Meta facts omit
 * themselves when absent rather than rendering an empty slot (§2.11).
 */
export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const { live, github, liveNote } = project.links;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
      <div className="min-w-0">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-body-sm text-text-tertiary">
            <li>
              <Link
                href="/projects"
                className="rounded-sm transition-colors duration-fast ease-out hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">{project.category}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-display-lg font-semibold text-text-primary">
          {project.title}
        </h1>

        {project.positioning && (
          <p className="mt-4 max-w-[54ch] text-body-lg text-text-secondary">
            {project.positioning}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm text-text-tertiary">
          {project.timeline.start && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              {project.timeline.start}
              {project.timeline.end ? ` – ${project.timeline.end}` : ""}
            </span>
          )}
          {project.role && (
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="size-4" aria-hidden />
              {project.role}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <StatusDot tone={STATUS_TONE[project.status]} />
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech}>
              <Badge tone="outline" className="font-mono">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {live && (
            <Button href={live} external variant="primary" className="group">
              Explore Live Platform
              <ArrowUpRight
                className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          )}
          {github && (
            <Button
              href={github}
              external
              variant={live ? "secondary" : "primary"}
              className="group"
            >
              <BrandIcon icon={siGithub} className="size-4" aria-hidden />
              View Source
              <ArrowUpRight
                className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          )}
        </div>

        {live && liveNote && (
          <p className="mt-3 max-w-[54ch] text-body-sm text-text-tertiary">
            {liveNote}
          </p>
        )}
      </div>

      <ProjectVisual visual={project.visual} size="expanded" />
    </div>
  );
}
