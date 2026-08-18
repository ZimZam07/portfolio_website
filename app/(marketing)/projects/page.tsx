import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { FeaturedProjectCard } from "@/components/content/featured-project-card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getAllProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering work, written up as case studies rather than screenshots.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="py-12 lg:py-20">
      <Container>
        <SectionHeading eyebrow="Selected Work" title="Projects" level="h1" />
        <p className="mt-4 max-w-[60ch] text-body-lg text-text-secondary">
          Selected engineering work, written up as case studies rather than
          screenshots.
        </p>

        <div className="mt-12 flex flex-col gap-6">
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
    </div>
  );
}
