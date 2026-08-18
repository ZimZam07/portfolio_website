import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, GraduationCap, Mail } from "lucide-react";
import { siGithub } from "simple-icons";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { RecruiterHero } from "@/components/recruiter/recruiter-hero";
import { SnapshotCards } from "@/components/recruiter/snapshot-cards";
import { StrengthCards } from "@/components/recruiter/strength-cards";
import { TechnicalProfile } from "@/components/recruiter/technical-profile";
import { SelectedWork } from "@/components/recruiter/selected-work";
import { RoleTimeline } from "@/components/recruiter/role-timeline";
import { LookingForCard } from "@/components/recruiter/looking-for-card";
import { siteConfig, socialLinks } from "@/lib/constants";
import { getAvailability } from "@/lib/content/availability";
import {
  education,
  getRoles,
  getSelectedWork,
  getSnapshot,
  getStrengths,
  getTechGroups,
} from "@/lib/content/recruiter";

export const metadata: Metadata = {
  title: "Recruiter Mode",
  description:
    "A 60-second candidate snapshot — technical profile, selected work, experience, and what I'm looking for.",
};

/**
 * Recruiter Mode lives inside the (marketing) segment on purpose: that
 * layout owns the shared fracture background, so this route reuses the
 * single persistent WebGL canvas rather than mounting a second renderer.
 * A separate route group would have unmounted the layout on navigation
 * and rebuilt the context on every entry and exit.
 */
export default function RecruiterPage() {
  const availability = getAvailability();

  return (
    <div className="py-12 lg:py-20">
      <Container width="recruiter">
        <RecruiterHero statusLabel={availability.currentStatus} />

        <section aria-labelledby="snapshot-heading" className="mt-16 lg:mt-20">
          <RevealOnScroll>
            <h2
              id="snapshot-heading"
              className="text-caption tracking-wide text-text-tertiary uppercase"
            >
              Quick Snapshot
            </h2>
          </RevealOnScroll>
          <div className="mt-5">
            <SnapshotCards cards={getSnapshot()} />
          </div>
        </section>

        <section aria-labelledby="why-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading eyebrow="Strengths" title="Why Zimran?" level="h2" />
          </RevealOnScroll>
          <div className="mt-8">
            <StrengthCards strengths={getStrengths()} />
          </div>
        </section>

        <section aria-labelledby="tech-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="What I work with"
              title="Technical Profile"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <TechnicalProfile groups={getTechGroups()} />
          </div>
        </section>

        <section aria-labelledby="work-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Evidence"
              title="Selected Work"
              level="h2"
              viewAllHref="/projects"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <SelectedWork projects={getSelectedWork()} />
          </div>
        </section>

        <section aria-labelledby="experience-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Where I've worked"
              title="Experience"
              level="h2"
              viewAllHref="/experience"
            />
          </RevealOnScroll>
          <div className="mt-10">
            <RoleTimeline roles={getRoles()} />
          </div>
        </section>

        <section aria-labelledby="education-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading eyebrow="Background" title="Education" level="h2" />
          </RevealOnScroll>

          <RevealOnScroll index={1}>
            <div className="mt-8 flex items-start gap-4 rounded-lg border border-border-subtle bg-bg-surface p-6">
              <GraduationCap
                className="mt-0.5 size-5 shrink-0 text-brand"
                aria-hidden
              />
              <div className="min-w-0">
                <h3 className="text-heading-sm font-medium text-text-primary">
                  {education.institution}
                </h3>
                <p className="mt-1 text-body-md text-text-secondary">
                  {education.degree}
                </p>
                <p className="mt-1.5 font-mono text-mono-sm text-text-tertiary">
                  {education.period} · {education.location}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section aria-labelledby="looking-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Availability"
              title="Currently Looking For"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <LookingForCard />
          </div>
        </section>

        <RevealOnScroll>
          <section
            aria-labelledby="connect-heading"
            className="mt-16 border-t border-border-subtle pt-12 lg:mt-24"
          >
            <h2
              id="connect-heading"
              className="text-display-lg font-semibold text-text-primary"
            >
              Let&apos;s connect
            </h2>
            <p className="mt-4 max-w-[56ch] text-body-lg text-text-secondary">
              Interested in working together, or discussing an AI/product
              opportunity?
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={siteConfig.resumeUrl}
                external
                variant="primary"
                className="group"
              >
                View Resume
                <ArrowUpRight
                  className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </Button>

              <Button href="/contact" variant="secondary" className="group">
                Contact
                <ArrowRight
                  className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-1"
                  aria-hidden
                />
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Mail className="size-4" aria-hidden />
                {siteConfig.email}
              </a>

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  LinkedIn
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}

              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <BrandIcon icon={siGithub} className="size-4" aria-hidden />
                  GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </section>
        </RevealOnScroll>
      </Container>
    </div>
  );
}
