import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatusDot } from "@/components/ui/status-dot";
import { Badge } from "@/components/ui/badge";
import { ContactChannels } from "@/components/contact/contact-channels";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getAvailability } from "@/lib/content/availability";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about AI software engineering roles, product development work, or anything worth building.",
};

/** Focus areas, stated as direction rather than as a list of job titles. */
const FOCUS = ["AI Software Engineering", "AI / Product Development"];

export default function ContactPage() {
  const availability = getAvailability();

  return (
    <div className="py-12 lg:py-20">
      {/* `prose` rather than `recruiter`: without the form this is a single
          column, and the wider track left the channel cards stranded. */}
      <Container width="prose">
        <SectionHeading eyebrow="Contact" title="Let's start a conversation" level="h1" />

        <RevealOnScroll index={1}>
          <p className="mt-5 text-body-lg text-text-secondary">
            I&apos;m open to AI software engineering roles, product
            development work, and collaborations where the problem is worth
            solving. The fastest way to reach me is email.
          </p>
        </RevealOnScroll>

        <RevealOnScroll index={2}>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-bg-surface px-4 py-2">
              <StatusDot tone="success" pulse />
              <span className="text-body-md font-medium text-text-primary">
                {availability.currentStatus}
              </span>
            </span>

            <ul className="flex flex-wrap gap-2">
              {FOCUS.map((focus) => (
                <li key={focus}>
                  <Badge tone="outline">{focus}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <div className="mt-12 lg:mt-14">
          <ContactChannels />
        </div>
      </Container>
    </div>
  );
}
