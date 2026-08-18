import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { SkillTierLegend } from "@/components/content/skill-tier-legend";
import { SkillClusterSection } from "@/components/content/skill-cluster-section";
import { SkillChainRow } from "@/components/content/skill-chain-row";
import { CapabilityCards } from "@/components/content/capability-cards";
import { SkillsInAction } from "@/components/content/skills-in-action";
import { ProductFlow } from "@/components/content/product-flow";
import { SkillExplorer } from "@/components/content/skill-explorer";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { socialLinks } from "@/lib/constants";
import {
  getAllSkills,
  getCapabilities,
  getCurrentFocus,
  getProductFlow,
  getSkillApplications,
  getSkillChains,
  getSkillClusters,
} from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Engineering, product and communication capability — grouped by depth, and tied to the projects and roles where each was actually used.",
};

export default function SkillsPage() {
  const capabilities = getCapabilities();
  const clusters = getSkillClusters();
  const chains = getSkillChains();
  const applications = getSkillApplications();
  const productFlow = getProductFlow();
  const currentFocus = getCurrentFocus();
  const allSkills = getAllSkills();

  return (
    <div className="py-12 lg:py-20">
      <Container width="recruiter">
        <SectionHeading eyebrow="Capabilities" title="Skills" level="h1" />
        <p className="mt-4 max-w-[62ch] text-body-lg text-text-secondary">
          Three things, not one: what I can build, what I can decide about
          what gets built, and how I explain it to the people who need to act
          on it. Every entry below points at where it was actually used.
        </p>

        {/* Capabilities first: the technology inventory answers "what tools",
            which is the less useful question to lead with. */}
        <section aria-labelledby="capabilities-heading" className="mt-14 lg:mt-20">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="What I bring"
              title="Core Capabilities"
              level="h2"
            />
          </RevealOnScroll>
          <div className="mt-8">
            <CapabilityCards capabilities={capabilities} />
          </div>
        </section>

        <section aria-labelledby="flow-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="How I work"
              title="Problem to Delivery"
              level="h2"
            />
            <p className="mt-3 max-w-[65ch] text-body-sm text-text-tertiary">
              Engineering is one stage of this arc, not the whole of it.
            </p>
          </RevealOnScroll>
          <div className="mt-10">
            <ProductFlow stages={productFlow} />
          </div>
        </section>

        <section aria-labelledby="action-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Evidence"
              title="Skills in Action"
              level="h2"
            />
            <p className="mt-3 max-w-[65ch] text-body-sm text-text-tertiary">
              Each skill, where it was used, and what was done with it.
            </p>
          </RevealOnScroll>
          <div className="mt-8">
            <SkillsInAction applications={applications} />
          </div>
        </section>

        <section aria-labelledby="explorer-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Browse"
              title="Everything, by area"
              level="h2"
            />
            <p className="mt-3 max-w-[65ch] text-body-sm text-text-tertiary">
              Filter by area, then select any highlighted skill to see where it
              came from.
            </p>
          </RevealOnScroll>

          <div className="mt-8">
            <SkillTierLegend />
          </div>

          <div className="mt-10">
            <SkillExplorer skills={allSkills} />
          </div>
        </section>

        <section aria-labelledby="depth-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Grouped by theme"
              title="Where the depth is"
              level="h2"
            />
          </RevealOnScroll>

          <div className="mt-10 flex flex-col gap-16 lg:gap-20">
            {clusters.map((resolved, index) => (
              <SkillClusterSection
                key={resolved.cluster.id}
                resolved={resolved}
                index={index}
                highlight={resolved.cluster.id === "product-communication"}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="chains-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Connections"
              title="How it fits together"
              level="h2"
            />
            <p className="mt-3 max-w-[65ch] text-body-sm text-text-tertiary">
              Skills rarely stand alone — these are the pathways that show up
              most often in real work.
            </p>
          </RevealOnScroll>

          <div className="mt-8 flex flex-col gap-8">
            {chains.map((resolved) => (
              <SkillChainRow key={resolved.chain.id} resolved={resolved} />
            ))}
          </div>
        </section>

        <section aria-labelledby="focus-heading" className="mt-16 lg:mt-24">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Right now"
              title="Current Focus"
              level="h2"
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {currentFocus.map((focus) => (
                <li
                  key={focus}
                  className="rounded-full border border-brand/40 bg-bg-surface-2 px-3.5 py-1.5 text-body-sm text-text-primary"
                >
                  {focus}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </section>

        <RevealOnScroll>
          <div className="mt-16 border-t border-border-subtle pt-10 lg:mt-24">
            <p className="text-body-md text-text-secondary">
              Want to see any of this applied?
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/projects" variant="text">
                Projects
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/experience" variant="text">
                Experience
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              {socialLinks.github && (
                <Button href={socialLinks.github} variant="text" external>
                  <BrandIcon icon={siGithub} className="size-4" aria-hidden />
                  GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </Button>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </div>
  );
}
