import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { QuickScan } from "@/components/recruiter/quick-scan";
import { siteConfig } from "@/lib/constants";
import { recruiterHero } from "@/lib/content/recruiter";

type RecruiterHeroProps = {
  statusLabel: string;
};

/**
 * Identity block. Sequenced with the site's existing reveal primitive at
 * increasing indices so eyebrow → name → title → summary → actions resolve
 * in order; the staggering *is* the animation, so this page introduces no
 * new motion vocabulary.
 */
export function RecruiterHero({ statusLabel }: RecruiterHeroProps) {
  return (
    <div>
      <RevealOnScroll>
        <p className="text-caption tracking-wide text-brand uppercase">
          {recruiterHero.eyebrow}
        </p>
      </RevealOnScroll>

      <RevealOnScroll index={1}>
        <h1 className="mt-4 text-display-lg font-semibold text-text-primary">
          {recruiterHero.name}
        </h1>
      </RevealOnScroll>

      <RevealOnScroll index={2}>
        <p className="mt-2 text-heading-lg text-text-secondary">
          {recruiterHero.title}
        </p>
      </RevealOnScroll>

      <RevealOnScroll index={3}>
        <p className="mt-5 max-w-[62ch] text-body-lg text-text-secondary">
          {recruiterHero.summary}
        </p>
      </RevealOnScroll>

      <RevealOnScroll index={4}>
        <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-bg-surface px-4 py-2">
          <StatusDot tone="success" pulse />
          <span className="text-body-sm font-medium text-text-primary">
            {statusLabel}
          </span>
        </span>
      </RevealOnScroll>

      <RevealOnScroll index={5}>
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
            Let&apos;s Connect
            <ArrowRight
              className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:translate-x-1"
              aria-hidden
            />
          </Button>

          <QuickScan />
        </div>
      </RevealOnScroll>
    </div>
  );
}
