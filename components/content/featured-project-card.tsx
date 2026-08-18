import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { siGithub } from "simple-icons";

import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/ui/brand-icon";
import { StatusDot } from "@/components/ui/status-dot";
import { ProjectVisual } from "@/components/content/project-visual";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type FeaturedProjectCardProps = {
  project: Project;
  /**
   * `lead` carries the gradient hairline + ambient glow; `standard` keeps
   * the identical layout, visual and motion but drops to a neutral border.
   * docs/02 §1 allows only one gradient surface per viewport, and stacked
   * full-width cards do share one — so the treatment marks the lead card
   * rather than repeating on every card.
   */
  variant?: "lead" | "standard";
  /** Mirrors the columns so stacked cards alternate instead of marching. */
  reverse?: boolean;
};

/**
 * The editorial project card. Every featured project gets this same
 * treatment — the visual differs per project, the structure does not.
 *
 * Link structure: the case-study link is stretched over the whole card via
 * `after:inset-0`, so the entire surface is clickable while remaining a
 * single tab stop. The live/source links sit above that overlay on `z-10`,
 * which keeps them real, separately-focusable anchors instead of nested
 * ones (nested <a> is invalid and breaks keyboard navigation).
 */
export function FeaturedProjectCard({
  project,
  variant = "lead",
  reverse = false,
}: FeaturedProjectCardProps) {
  const { live, github } = project.links;
  const isLead = variant === "lead";

  return (
    <article className="group relative">
      {isLead && (
        <div
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-brand opacity-[0.07] blur-3xl"
          aria-hidden
        />
      )}

      <div
        className={cn(
          "rounded-lg transition-all duration-base ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-2xl",
          isLead
            ? "bg-gradient-brand p-px"
            : "border border-border-default motion-safe:group-hover:border-border-default",
        )}
      >
        <div
          className={cn(
            "relative grid gap-8 bg-bg-base p-6 sm:p-8 lg:items-center lg:gap-12 lg:p-10",
            isLead ? "rounded-[calc(var(--radius-lg)-1px)]" : "rounded-lg",
            reverse
              ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
          )}
        >
          <div className={cn("min-w-0", reverse && "lg:order-2")}>
            <div className="flex items-center gap-2 text-caption tracking-wide text-brand uppercase">
              <StatusDot tone="brand" pulse />
              {isLead ? "Featured Project" : project.category}
            </div>

            <h3 className="mt-4 text-heading-lg font-semibold text-text-primary">
              <Link
                href={`/projects/${project.slug}`}
                className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {project.title}
              </Link>
            </h3>

            {project.kicker && (
              <p className="mt-1.5 text-caption tracking-wide text-text-tertiary uppercase">
                {project.kicker}
              </p>
            )}

            <p className="mt-4 max-w-[52ch] text-body-md text-text-secondary">
              {project.tagline}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-body-sm text-text-secondary"
                  >
                    <Check className="size-3.5 shrink-0 text-brand" aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} tone="outline" className="font-mono">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-text-primary">
                Explore Case Study
                <ArrowRight
                  className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-1"
                  aria-hidden
                />
              </span>

              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Live Project
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <BrandIcon icon={siGithub} className="size-3.5" aria-hidden />
                  GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>

          <ProjectVisual
            visual={project.visual}
            className={cn(reverse && "lg:order-1")}
          />
        </div>
      </div>
    </article>
  );
}
