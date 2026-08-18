import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { IdentityPillars } from "@/components/about/identity-pillars";
import { JourneyTimeline } from "@/components/about/journey-timeline";
import { VentureCard } from "@/components/about/venture-card";
import { BeyondTheCode } from "@/components/about/beyond-the-code";
import { ProductFlow } from "@/components/content/product-flow";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { siteConfig } from "@/lib/constants";
import {
  aboutIntro,
  getAboutPillars,
  getBeyond,
  getDirections,
  getJourney,
  getThinkingSteps,
  getVenture,
} from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer and product thinker — building full-stack and AI-integrated applications, with hands-on product management experience and an early-stage venture in progress.",
};

export default function AboutPage() {
  const pillars = getAboutPillars();
  const thinking = getThinkingSteps();
  const journey = getJourney();
  const venture = getVenture();
  const beyond = getBeyond();
  const directions = getDirections();

  return (
    <div className="py-12 lg:py-20">
      <Container width="recruiter">
        <SectionHeading eyebrow="About" title="About Me" level="h1" />

        <RevealOnScroll index={1}>
          <p className="mt-6 max-w-[54ch] text-heading-md text-text-primary">
            {aboutIntro.lead}
          </p>
        </RevealOnScroll>

        <div className="mt-6 flex max-w-[68ch] flex-col gap-4">
          {aboutIntro.paragraphs.map((paragraph, index) => (
            <RevealOnScroll key={paragraph.slice(0, 24)} index={index + 2}>
              <p className="text-body-lg text-text-secondary">{paragraph}</p>
            </RevealOnScroll>
          ))}
        </div>

        <section aria-labelledby="pillars-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="The short version"
              title="What I'm made of"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <IdentityPillars pillars={pillars} />
          </div>
        </section>

        <section aria-labelledby="thinking-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="How I approach things"
              title="Problem first, code last"
              level="h2"
            />
            <p className="mt-3 max-w-[65ch] text-body-sm text-text-tertiary">
              Writing the code is the last step, and usually the most
              straightforward one.
            </p>
          </RevealOnScroll>
          <div className="mt-10">
            <ProductFlow stages={thinking} />
          </div>
        </section>

        <section aria-labelledby="venture-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Right now"
              title="Something of my own"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <VentureCard venture={venture} />
          </div>
        </section>

        <section aria-labelledby="journey-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="How I got here"
              title="The journey"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-10">
            <JourneyTimeline milestones={journey} />
          </div>
        </section>

        <section aria-labelledby="direction-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Where it's going"
              title="What I'm building toward"
              level="h2"
            />
          </RevealOnScroll>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {directions.map((direction, index) => (
              <li key={direction.title}>
                <RevealOnScroll index={index}>
                  <div className="rounded-md bg-bg-surface p-5 transition-colors duration-base ease-out hover:bg-bg-surface-2">
                    <p className="font-mono text-mono-sm text-brand">
                      {direction.verb}
                    </p>
                    <h3 className="mt-2 text-heading-sm font-medium text-text-primary">
                      {direction.title}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-text-secondary">
                      {direction.detail}
                    </p>
                  </div>
                </RevealOnScroll>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="beyond-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Away from the screen"
              title="Beyond the code"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <BeyondTheCode items={beyond} />
          </div>
        </section>

        <RevealOnScroll>
          <div className="mt-16 border-t border-border-subtle pt-10 lg:mt-24">
            <p className="max-w-[52ch] text-heading-md text-text-primary">
              Still building, still learning, and mostly looking for better
              problems to work on.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/projects" variant="text">
                Projects
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/experience" variant="text">
                Experience
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/skills" variant="text">
                Skills
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href={`mailto:${siteConfig.email}`} variant="text">
                <Mail className="size-4" aria-hidden />
                Get in touch
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </div>
  );
}
