import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { EngineeringFocus } from "@/components/case-study/engineering-focus";
import { ExperienceHero } from "@/components/experience/experience-hero";
import { FocusAreaGrid } from "@/components/experience/focus-area-grid";
import { KnowledgePipeline } from "@/components/experience/knowledge-pipeline";
import { InvestigationGrid } from "@/components/experience/investigation-grid";
import { TechGroups } from "@/components/experience/tech-groups";
import { getAllExperience } from "@/lib/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "AI Research Intern at Rezolve.ai — enterprise agentic AI research, technical feasibility analysis, and investigation of knowledge ingestion and retrieval pipelines.",
};

export default function ExperiencePage() {
  const [experience] = getAllExperience();

  if (!experience) return null;

  // Section pills derive from what this role actually has, matching the
  // case-study pattern in docs/03-wireframes.md §2.8 / §0.3.
  const sections = [
    experience.contributions?.length && { id: "work", label: "The Work" },
    experience.focusAreas?.length && { id: "focus", label: "Focus Areas" },
    experience.pipeline?.length && { id: "pipeline", label: "Systems Studied" },
    experience.investigations?.length && {
      id: "investigation",
      label: "Investigation",
    },
    experience.techGroups?.length && { id: "stack", label: "Tools" },
    experience.takeaways && { id: "takeaways", label: "Takeaways" },
  ].filter((section): section is { id: string; label: string } =>
    Boolean(section),
  );

  return (
    <article className="pb-20 lg:pb-28">
      <Container className="pt-10 pb-12 lg:pt-16">
        <ExperienceHero experience={experience} />
      </Container>

      {sections.length > 0 && <CaseStudyNav sections={sections} />}

      <Container className="mt-14 flex flex-col gap-16 lg:mt-20 lg:gap-24">
        {experience.contributions && experience.contributions.length > 0 && (
          <CaseStudySection
            id="work"
            eyebrow="What I worked on"
            title="The Work"
          >
            <ol className="divide-y divide-border-subtle border-t border-border-subtle">
              {experience.contributions.map((contribution, index) => (
                <li
                  key={contribution.title}
                  className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <span
                    className="font-mono text-mono-sm text-text-tertiary sm:pt-1"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-heading-sm font-medium text-text-primary">
                      {contribution.title}
                    </h3>
                    <p className="mt-1.5 max-w-[68ch] text-body-md text-text-secondary">
                      {contribution.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CaseStudySection>
        )}

        {experience.focusAreas && experience.focusAreas.length > 0 && (
          <CaseStudySection
            id="focus"
            eyebrow="Dimensions of the role"
            title="Focus Areas"
          >
            <FocusAreaGrid areas={experience.focusAreas} />
          </CaseStudySection>
        )}

        {experience.pipeline && experience.pipeline.length > 0 && (
          <CaseStudySection
            id="pipeline"
            eyebrow="Systems and workflows I investigated"
            title="Enterprise Knowledge Pipeline"
          >
            <p className="mb-10 max-w-[68ch] text-body-md text-text-secondary">
              Tracing how enterprise knowledge becomes retrievable was the most
              technical strand of the internship. The flow below is the
              architecture I studied and analysed during the role — existing
              systems I worked to understand, not systems I built.
            </p>
            <KnowledgePipeline stages={experience.pipeline} />
          </CaseStudySection>
        )}

        {experience.investigations && experience.investigations.length > 0 && (
          <CaseStudySection
            id="investigation"
            eyebrow="Below the surface"
            title="Engineering Investigation"
          >
            <p className="mb-8 max-w-[68ch] text-body-md text-text-secondary">
              Data-quality and lifecycle issues examined while following
              content through ingestion. Each degrades retrieval quietly —
              nothing errors, the answers just get worse.
            </p>
            <InvestigationGrid investigations={experience.investigations} />
          </CaseStudySection>
        )}

        {experience.techGroups && experience.techGroups.length > 0 && (
          <CaseStudySection
            id="stack"
            eyebrow="Worked with"
            title="Tools & Technologies"
          >
            <TechGroups groups={experience.techGroups} />
          </CaseStudySection>
        )}

        {experience.takeaways && (
          <CaseStudySection
            id="takeaways"
            eyebrow="What it gave me"
            title="Key Takeaways"
          >
            <EngineeringFocus focus={experience.takeaways} />
          </CaseStudySection>
        )}
      </Container>
    </article>
  );
}
