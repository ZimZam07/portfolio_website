import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { CertificateHeroCard } from "@/components/content/certificate-hero-card";
import { CertificateTimeline } from "@/components/content/certificate-timeline";
import { getCertificates } from "@/lib/content/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Formal learning and hands-on credentials, ordered by relevance rather than date.",
};

export default function CertificatesPage() {
  const [topCertificate, ...remainingCertificates] = getCertificates();

  return (
    <div className="py-12 lg:py-20">
      <Container width="recruiter">
        <SectionHeading eyebrow="Credentials" title="Certificates" level="h1" />
        <p className="mt-4 max-w-[60ch] text-body-lg text-text-secondary">
          {topCertificate ? 1 + remainingCertificates.length : 0} credentials,
          ordered by relevance rather than date.
        </p>

        {topCertificate && (
          <div className="mt-12">
            <CertificateHeroCard certificate={topCertificate} />
          </div>
        )}

        {remainingCertificates.length > 0 && (
          <div className="mt-16">
            <CertificateTimeline certificates={remainingCertificates} />
          </div>
        )}
      </Container>
    </div>
  );
}
