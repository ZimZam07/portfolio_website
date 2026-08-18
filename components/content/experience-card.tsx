import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { OrgLogo } from "@/components/content/org-logo";
import { CompanyWordmark } from "@/components/content/company-wordmark";
import type { Experience } from "@/types/experience";

type ExperienceCardProps = {
  experience: Experience;
};

/**
 * Homepage experience card. Deliberately quieter than the project cards —
 * a neutral border with a single brand rail instead of a gradient surface,
 * since this section should read as professional record rather than
 * showcase. The rail is the only accent, and it grows on hover.
 *
 * Same stretched-link pattern as FeaturedProjectCard: one anchor covers the
 * card via `after:inset-0`, keeping the whole surface clickable while
 * staying a single tab stop.
 */
export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="group relative">
      <div className="overflow-hidden rounded-lg border border-border-default transition-all duration-base ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-2xl">
        <div className="relative flex">
          <span
            className="w-0.5 shrink-0 bg-gradient-brand opacity-70 transition-opacity duration-base ease-out group-hover:opacity-100"
            aria-hidden
          />

          <div className="min-w-0 flex-1 bg-bg-base p-6 sm:p-8">
            {/* Brand lockup gets its own row: a wide wordmark alongside the
                role would crowd it and force the badge to wrap. */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {experience.companyLogo ? (
                <CompanyWordmark
                  name={experience.company}
                  src={experience.companyLogo.src}
                  width={experience.companyLogo.width}
                  height={experience.companyLogo.height}
                  size="sm"
                />
              ) : (
                <OrgLogo name={experience.company} />
              )}

              {experience.durationLabel && (
                <Badge tone="outline" className="font-mono tracking-wide uppercase">
                  {experience.durationLabel}
                </Badge>
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-heading-md font-semibold text-text-primary">
                <Link
                  href="/experience"
                  className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {experience.role}
                </Link>
              </h3>
              <p className="mt-1 text-body-sm text-text-secondary">
                {experience.company}
                {experience.location ? ` · ${experience.location}` : ""}
              </p>
              {experience.dateRangeLabel && (
                <p className="mt-1 font-mono text-mono-sm text-text-tertiary">
                  {experience.dateRangeLabel}
                </p>
              )}
            </div>

            {experience.highlights && experience.highlights.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-body-sm text-text-secondary"
                  >
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                      aria-hidden
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <span className="mt-7 inline-flex items-center gap-1.5 text-body-sm font-medium text-text-primary">
              Explore Experience
              <ArrowRight
                className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
