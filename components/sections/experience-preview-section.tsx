import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { ExperienceCard } from "@/components/content/experience-card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { Experience } from "@/types/experience";

type ExperiencePreviewSectionProps = {
  experience: Experience[];
};

/**
 * docs/03-wireframes.md §1.2 — condensed on Home, full write-up on
 * /experience. With a single role a list of compact rows would read as an
 * unfinished section, so each role gets a full card and the detail lives
 * one click away.
 */
export function ExperiencePreviewSection({
  experience,
}: ExperiencePreviewSectionProps) {
  if (experience.length === 0) return null;

  return (
    <section>
      <Container>
        <SectionHeading
          eyebrow="Where I've worked"
          title="Experience"
          viewAllHref="/experience"
        />

        <div className="mt-8 flex flex-col gap-6">
          {experience.map((role, index) => (
            <RevealOnScroll key={`${role.company}-${role.role}`} index={index}>
              <ExperienceCard experience={role} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
