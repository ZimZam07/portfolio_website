import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrgLogo } from "@/components/content/org-logo";
import { SkillChipsDisclosure } from "@/components/content/skill-chips-disclosure";
import type { Certificate } from "@/types/certificate";

type CertificateHeroCardProps = {
  certificate: Certificate;
};

/**
 * The single most important credential, given real editorial space —
 * ambient glow (same technique as the Home hero photo) plus the gradient
 * border already used for "Currently Building," combined for one
 * deliberate high-impact moment. Everything below this is the timeline.
 */
export function CertificateHeroCard({ certificate }: CertificateHeroCardProps) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-brand opacity-[0.08] blur-3xl"
        aria-hidden
      />
      <div className="rounded-lg bg-gradient-brand p-px transition-all duration-base ease-out hover:-translate-y-1 hover:shadow-2xl">
        <div className="rounded-[calc(var(--radius-lg)-1px)] bg-bg-base p-8 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-caption tracking-wide text-brand uppercase">
                <Sparkles className="size-3.5" aria-hidden />
                Top Certification
              </div>

              <div className="mt-4 flex items-start gap-4">
                <OrgLogo name={certificate.issuer} logo={certificate.logo} />
                <div className="min-w-0">
                  <h2 className="text-heading-lg text-text-primary">
                    {certificate.title}
                  </h2>
                  <p className="mt-1.5 text-body-sm text-text-tertiary">
                    {certificate.issuer} · {certificate.dateIssued}
                  </p>
                  <p className="mt-1 text-caption tracking-wide text-text-tertiary uppercase">
                    {certificate.category}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-[65ch] text-body-lg text-text-secondary">
                {certificate.whyItMatters}
              </p>

              <div className="mt-6">
                <SkillChipsDisclosure
                  skills={certificate.skillsDemonstrated}
                  visibleCount={8}
                />
              </div>
            </div>

            <div className="flex shrink-0 flex-row items-center gap-4 lg:flex-col lg:items-end lg:gap-3">
              {certificate.credentialId && (
                <p className="font-mono text-mono-sm text-text-tertiary">
                  ID: {certificate.credentialId}
                </p>
              )}
              {certificate.credentialUrl && (
                <Button
                  href={certificate.credentialUrl}
                  variant="secondary"
                  external
                  className="group"
                >
                  View Credential
                  <ArrowUpRight
                    className="size-4 transition-transform duration-fast ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
