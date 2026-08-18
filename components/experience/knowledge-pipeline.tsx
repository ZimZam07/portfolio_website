"use client";

import { useRef } from "react";
import {
  Boxes,
  Cloud,
  Database,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type {
  ExperiencePipelineStage,
  PipelineStageIcon,
} from "@/types/experience";

type KnowledgePipelineProps = {
  stages: ExperiencePipelineStage[];
};

const ICONS: Record<PipelineStageIcon, LucideIcon> = {
  sources: Cloud,
  ingestion: Workflow,
  embeddings: Boxes,
  storage: Database,
  retrieval: Search,
};

/**
 * The knowledge pipeline studied during the internship, drawn as an actual
 * architecture flow: horizontal on desktop, stacked on smaller screens.
 *
 * Distinct from the projects' numbered WorkflowTimeline on purpose — that
 * one narrates a user journey step by step, this one depicts a system's
 * shape, so it reads left-to-right as a diagram rather than top-to-bottom
 * as a story.
 *
 * The connecting rail fills with scroll via a single `scaleX`/`scaleY` on
 * one element, keeping scroll-linked work on the compositor. Under reduced
 * motion the rail renders full and every stage renders resolved.
 */
export function KnowledgePipeline({ stages }: KnowledgePipelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical rail (stacked layout), aligned to the marker centres. */}
      <div
        className="absolute top-6 bottom-6 left-[1.375rem] w-px bg-border-subtle lg:hidden"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-brand"
          style={reducedMotion ? { scaleY: 1 } : { scaleY: progress }}
        />
      </div>

      {/* Horizontal rail (diagram layout). Spans marker centres: with five
          equal columns those sit at 10% and 90% of the track. */}
      <div
        className="absolute top-[1.375rem] right-[10%] left-[10%] hidden h-px bg-border-subtle lg:block"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-brand"
          style={reducedMotion ? { scaleX: 1 } : { scaleX: progress }}
        />
      </div>

      {/* minmax(0,1fr) rather than a bare 1fr: auto-min tracks can be forced
          wider than their share by content, which is how grids overflow. */}
      <ol className="relative grid gap-8 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-4">
        {stages.map((stage, index) => (
          <PipelineStage key={stage.label} stage={stage} index={index} />
        ))}
      </ol>
    </div>
  );
}

function PipelineStage({
  stage,
  index,
}: {
  stage: ExperiencePipelineStage;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const resolved = inView || reducedMotion;
  const Icon = ICONS[stage.icon];

  return (
    <li
      ref={ref}
      className="flex gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
    >
      <span
        className={cn(
          "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border bg-bg-base transition-colors duration-base ease-out",
          resolved
            ? "border-brand text-brand"
            : "border-border-default text-text-tertiary",
        )}
        aria-hidden
      >
        <Icon className="size-5" />
      </span>

      <motion.div
        className="min-w-0 flex-1 lg:flex-none"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={resolved ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.3,
          delay: reducedMotion ? 0 : index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <h3 className="text-heading-sm font-medium text-text-primary">
          {stage.label}
        </h3>
        {stage.caption && (
          <p className="mt-1 font-mono text-mono-sm text-text-tertiary">
            {stage.caption}
          </p>
        )}
        <ul className="mt-3 flex flex-wrap gap-1.5 lg:justify-center">
          {stage.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border-subtle bg-bg-surface px-2.5 py-1 text-caption text-text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}
