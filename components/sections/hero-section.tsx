import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { SocialLinks } from "@/components/content/social-links";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { siteConfig } from "@/lib/constants";

type HeroSectionProps = {
  statusLabel: string;
};

/** docs/03-wireframes.md §1.2. Static positioning line — no rotating role text. */
export function HeroSection({ statusLabel }: HeroSectionProps) {
  return (
    <section className="pt-4 lg:pt-8">
      <Container className="grid items-center gap-10 lg:grid-cols-[58%_42%] lg:gap-16">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1 text-caption text-text-secondary">
            <StatusDot tone="success" />
            {statusLabel}
          </div>

          <h1 className="mt-4 text-display-xl font-semibold text-text-primary">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-heading-lg text-text-secondary">
            {siteConfig.role}
          </p>
          <p className="mt-1 text-body-sm text-text-tertiary">
            {siteConfig.roleContext}
          </p>
          <p className="mt-4 max-w-[60ch] text-body-lg text-text-secondary">
            {siteConfig.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={siteConfig.resumeUrl} external variant="primary">
              View Resume
            </Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
            {/* Email included here rather than adding a second link group:
                this row already sits beside the primary CTAs, and the
                icons stay secondary to them by design. */}
            <SocialLinks />
          </div>
        </RevealOnScroll>

        <RevealOnScroll index={1} className="justify-self-center">
          <div className="relative size-48 sm:size-64">
            <div
              className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-10 blur-2xl"
              aria-hidden
            />
            <Image
              src={siteConfig.photo}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(min-width: 640px) 256px, 192px"
              priority
              className="rounded-full border border-border-subtle object-cover"
            />
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
