import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { SkillClusterCards } from "@/components/content/skill-cluster-cards";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { SkillGroup } from "@/lib/content/skills";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

/**
 * Four capability clusters — engineering, languages, AI, and product —
 * given the same editorial weight as the Projects and Experience sections
 * rather than compressed into a divided strip. Product sits among them as
 * a peer, not below the technical ones. Full categorised view on /skills.
 */
export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section>
      <Container>
        <SectionHeading eyebrow="Toolbox" title="Skills" viewAllHref="/skills" />

        <RevealOnScroll index={1}>
          <p className="mt-4 max-w-[52ch] text-body-lg text-text-secondary">
            The technologies and capabilities I use to turn an idea into a
            product people can actually use.
          </p>
        </RevealOnScroll>

        <div className="mt-8">
          <SkillClusterCards groups={groups} />
        </div>
      </Container>
    </section>
  );
}
