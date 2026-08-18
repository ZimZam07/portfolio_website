import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrgLogo } from "@/components/content/org-logo";
import { SkillChipsDisclosure } from "@/components/content/skill-chips-disclosure";
import { TextDisclosure } from "@/components/content/text-disclosure";
import type { Certificate } from "@/types/certificate";

type CertificateTimelineEntryProps = {
  certificate: Certificate;
};

/**
 * One journey entry. Every entry follows the exact same typographic
 * recipe and spacing rhythm regardless of content length — that
 * consistency is what reads as "intentionally designed," not forcing
 * every card to an identical pixel height (which is what caused the
 * ragged-grid problem this replaces).
 */
export function CertificateTimelineEntry({
  certificate,
}: CertificateTimelineEntryProps) {
  return (
    <div className="-mx-4 flex items-start gap-4 rounded-lg px-4 py-2 transition-all duration-base ease-out hover:-translate-y-0.5 hover:bg-bg-surface">
      <OrgLogo name={certificate.issuer} logo={certificate.logo} size="sm" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-heading-md text-text-primary">
            {certificate.title}
          </h3>
          <span className="shrink-0 text-caption text-text-tertiary">
            {certificate.dateIssued}
          </span>
        </div>
        <p className="mt-1 text-body-sm text-text-tertiary">
          {certificate.issuer}
        </p>
        <p className="mt-1 text-caption tracking-wide text-text-tertiary uppercase">
          {certificate.category}
        </p>

        <TextDisclosure
          text={certificate.whyItMatters}
          className="mt-3 max-w-[60ch] text-body-sm text-text-secondary"
        />

        <div className="mt-3">
          <SkillChipsDisclosure skills={certificate.skillsDemonstrated} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          {certificate.credentialId && (
            <span className="font-mono text-mono-sm text-text-tertiary">
              ID: {certificate.credentialId}
            </span>
          )}
          {certificate.credentialUrl && (
            <Button
              href={certificate.credentialUrl}
              variant="secondary"
              size="sm"
              external
              className="group"
            >
              View Credential
              <ArrowUpRight
                className="size-3.5 transition-transform duration-fast ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
