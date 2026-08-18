import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { OrgLogo } from "@/components/content/org-logo";
import { CompanyWordmark } from "@/components/content/company-wordmark";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { Experience } from "@/types/experience";

type ExperienceHeroProps = {
  experience: Experience;
};

/**
 * Header for the experience detail page. Sequenced with the portfolio's
 * existing reveal primitive at increasing indices, so the mark, title and
 * meta row resolve in order instead of all at once — the staggering is the
 * motion, not a bespoke animation.
 *
 * No company logo file is used: OrgLogo's rule is real asset > known brand
 * vector > neutral monogram, never a scraped image, and no official
 * Rezolve.ai asset ships with this repo. The monogram keeps the treatment
 * honest and costs no network request.
 */
export function ExperienceHero({ experience }: ExperienceHeroProps) {
  return (
    <div>
      <RevealOnScroll>
        <p className="text-caption tracking-wide text-text-tertiary uppercase">
          Experience
        </p>
      </RevealOnScroll>

      {/* The brand lockup leads, since a ~5:1 wordmark set beside a
          display-size heading would either dwarf it or shrink to nothing. */}
      <RevealOnScroll index={1}>
        <div className="mt-5">
          {experience.companyLogo ? (
            <CompanyWordmark
              name={experience.company}
              src={experience.companyLogo.src}
              width={experience.companyLogo.width}
              height={experience.companyLogo.height}
            />
          ) : (
            <OrgLogo name={experience.company} />
          )}
        </div>
      </RevealOnScroll>

      <RevealOnScroll index={2}>
        <div className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <h1 className="text-display-lg font-semibold text-text-primary">
              {experience.role}
            </h1>
            <p className="mt-2 text-heading-md text-text-secondary">
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-sm transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {experience.company}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                experience.company
              )}
            </p>
          </div>

          {experience.durationLabel && (
            <Badge tone="outline" className="font-mono tracking-wide uppercase">
              {experience.durationLabel}
            </Badge>
          )}
        </div>
      </RevealOnScroll>

      {/*
        Employment dates are a fact a recruiter looks for, so they sit on
        the primary text colour at body-md rather than the tertiary/body-sm
        pairing used for incidental captions elsewhere.
        The containing rule is what separates them from surrounding prose;
        the icons stay tertiary so they mark the fields without competing
        with the values, and the divider is dropped once the row wraps.
      */}
      <RevealOnScroll index={3}>
        <div className="mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-border-subtle bg-bg-surface px-4 py-2.5">
          {experience.preciseDateLabel && (
            <span className="inline-flex items-center gap-2">
              <CalendarDays
                className="size-4 shrink-0 text-text-tertiary"
                aria-hidden
              />
              <span className="font-mono text-body-md font-medium text-text-primary">
                {experience.preciseDateLabel}
              </span>
            </span>
          )}

          {experience.preciseDateLabel && experience.location && (
            <span
              className="hidden h-4 w-px bg-border-default sm:block"
              aria-hidden
            />
          )}

          {experience.location && (
            <span className="inline-flex items-center gap-2">
              <MapPin
                className="size-4 shrink-0 text-text-tertiary"
                aria-hidden
              />
              <span className="text-body-md text-text-primary">
                {experience.location}
              </span>
            </span>
          )}
        </div>
      </RevealOnScroll>

      {experience.companyDescription && (
        <RevealOnScroll index={4}>
          <p className="mt-8 max-w-[62ch] border-l-2 border-border-default pl-5 text-body-md text-text-tertiary">
            {experience.companyDescription}
          </p>
        </RevealOnScroll>
      )}

      {experience.summary && (
        <RevealOnScroll index={5}>
          <p className="mt-8 max-w-[65ch] text-body-lg text-text-secondary">
            {experience.summary}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
