import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { FeaturedProjectCard } from "@/components/content/featured-project-card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { Project } from "@/types/project";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

/**
 * docs/03-wireframes.md §1.2. Every featured project gets the full
 * editorial card — a compact 2-up grid underneath would rank the second
 * project as a footnote, and each of these carries a purpose-built visual
 * that needs the width. Hierarchy comes from the lead card's gradient
 * treatment and from column order alternating down the stack, not from
 * shrinking anything.
 */
export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section>
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          viewAllHref="/projects"
        />

        <div className="mt-8 flex flex-col gap-6">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.slug} index={index}>
              <FeaturedProjectCard
                project={project}
                variant={index === 0 ? "lead" : "standard"}
                reverse={index % 2 === 1}
              />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
