import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";

import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/ui/brand-icon";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { Project } from "@/types/project";

type SelectedWorkProps = {
  projects: Project[];
};

/**
 * Compact project rows, not the editorial cards used on Home. Recruiter
 * Mode optimises for evaluation speed, and the full-width visual panels
 * would push Experience and Availability below a second screen.
 *
 * Stretched-link pattern: the case-study link covers the row via
 * `after:inset-0`, while the live/source links sit above it on `z-10` so
 * they stay separately focusable rather than nested inside another anchor.
 */
export function SelectedWork({ projects }: SelectedWorkProps) {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map((project, index) => {
        const { live, github } = project.links;
        return (
          <li key={project.slug}>
            <RevealOnScroll index={index}>
              <article className="group relative overflow-hidden rounded-lg border border-border-subtle bg-bg-surface p-6 transition-all duration-base ease-out hover:border-brand/40 motion-safe:hover:-translate-y-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-heading-sm font-medium text-text-primary">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    {project.kicker && (
                      <p className="mt-1 text-caption tracking-wide text-text-tertiary uppercase">
                        {project.kicker}
                      </p>
                    )}
                  </div>
                  <Badge tone="outline">{project.category}</Badge>
                </div>

                <p className="mt-3 max-w-[70ch] text-body-sm text-text-secondary">
                  {project.tagline}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <li key={tech}>
                      <Badge tone="outline" className="font-mono">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-text-primary">
                    View project
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
                      Live
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
                      Source
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>

                <span
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-base ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  aria-hidden
                />
              </article>
            </RevealOnScroll>
          </li>
        );
      })}
    </ul>
  );
}
