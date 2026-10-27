import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { CapabilityGrid } from "@/components/case-study/capability-grid";
import { IntelligencePanel } from "@/components/case-study/intelligence-panel";
import { WorkflowTimeline } from "@/components/case-study/workflow-timeline";
import { UnderTheHood } from "@/components/case-study/under-the-hood";
import { EngineeringFocus } from "@/components/case-study/engineering-focus";
import { ImpactShifts } from "@/components/case-study/impact-shifts";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.positioning ?? project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { live, github, liveNote } = project.links;
  const hasOverview = Boolean(project.problemStatement || project.solution);

  // Sub-nav pills are derived from what this project actually has, so a
  // project without a workflow simply has no "How It Works" pill
  // (docs/03-wireframes.md §2.8 / §0.3).
  const sections = [
    hasOverview && { id: "overview", label: "Overview" },
    project.capabilities?.length && {
      id: "capabilities",
      label: "Capabilities",
    },
    project.workflow?.length && { id: "workflow", label: "How It Works" },
    project.intelligence && { id: "intelligence", label: "Intelligence" },
    project.technicalNotes?.length && {
      id: "under-the-hood",
      label: "Under the Hood",
    },
    project.engineeringFocus && { id: "engineering", label: "Engineering" },
    project.impact?.length && { id: "impact", label: "Impact" },
  ].filter((section): section is { id: string; label: string } =>
    Boolean(section),
  );

  return (
    <article className="pb-20 lg:pb-28">
      <Container className="pt-10 pb-12 lg:pt-16">
        <CaseStudyHero project={project} />
      </Container>

      {sections.length > 0 && <CaseStudyNav sections={sections} />}

      <Container className="mt-14 flex flex-col gap-16 lg:mt-20 lg:gap-24">
        {hasOverview && (
          <CaseStudySection
            id="overview"
            eyebrow="Overview"
            title="Why this exists"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {project.problemStatement && (
                <div className="rounded-md bg-bg-surface p-6">
                  <h3 className="text-caption tracking-wide text-text-tertiary uppercase">
                    The problem
                  </h3>
                  <p className="mt-3 text-body-md text-text-secondary">
                    {project.problemStatement}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-md border-l-2 border-brand bg-bg-surface p-6">
                  <h3 className="text-caption tracking-wide text-brand uppercase">
                    The solution
                  </h3>
                  <p className="mt-3 text-body-md text-text-secondary">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </CaseStudySection>
        )}

        {project.capabilities && project.capabilities.length > 0 && (
          <CaseStudySection
            id="capabilities"
            eyebrow="What it does"
            title="Key Capabilities"
          >
            <CapabilityGrid capabilities={project.capabilities} />
          </CaseStudySection>
        )}

        {project.workflow && project.workflow.length > 0 && (
          <CaseStudySection
            id="workflow"
            eyebrow="The flow"
            title="How It Works"
          >
            <WorkflowTimeline steps={project.workflow} />
          </CaseStudySection>
        )}

        {project.intelligence && (
          <CaseStudySection
            id="intelligence"
            eyebrow="The AI layer"
            title="The Intelligence Behind the Experience"
          >
            <IntelligencePanel intelligence={project.intelligence} />
          </CaseStudySection>
        )}

        {project.technicalNotes && project.technicalNotes.length > 0 && (
          <CaseStudySection
            id="under-the-hood"
            eyebrow="Implementation"
            title="Under the Hood"
          >
            <UnderTheHood notes={project.technicalNotes} />
          </CaseStudySection>
        )}

        {project.engineeringFocus && (
          <CaseStudySection
            id="engineering"
            eyebrow="Takeaway"
            title="Engineering Focus"
          >
            <EngineeringFocus focus={project.engineeringFocus} />
          </CaseStudySection>
        )}

        {project.impact && project.impact.length > 0 && (
          <CaseStudySection
            id="impact"
            eyebrow="Why it matters"
            title="Project Impact"
          >
            <ImpactShifts shifts={project.impact} />
          </CaseStudySection>
        )}

        <RevealOnScroll>
          <div className="flex flex-col items-start gap-6 border-t border-border-subtle pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-out hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-base ease-out motion-safe:group-hover:-translate-x-1"
                aria-hidden
              />
              Back to all projects
            </Link>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <div className="flex flex-wrap items-center gap-3">
                {live && (
                  <Button href={live} external variant="primary" className="group">
                    Explore Live Platform
                    <ArrowUpRight
                      className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </Button>
                )}
                {github && (
                  <Button href={github} external variant="secondary" className="group">
                    <BrandIcon icon={siGithub} className="size-4" aria-hidden />
                    View Source
                    <ArrowUpRight
                      className="size-4 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </Button>
                )}
              </div>
              {live && liveNote && (
                <p className="max-w-[48ch] text-body-sm text-text-tertiary sm:text-right">
                  {liveNote}
                </p>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </article>
  );
}
