import { ArrowRight, ServerCog, ShieldCheck } from "lucide-react";

import type { ProjectIntelligence } from "@/types/project";

type IntelligencePanelProps = {
  intelligence: ProjectIntelligence;
};

/**
 * The AI deep-dive. Structured as an actual pipeline — what goes in, what
 * processes it, what comes back — because the point being made is that the
 * model receives real user context rather than a bare question. Guardrails
 * sit underneath as a separate row: they constrain the whole pipeline, so
 * folding them into either column would misrepresent where they apply.
 */
export function IntelligencePanel({ intelligence }: IntelligencePanelProps) {
  return (
    <div>
      <p className="max-w-[68ch] text-body-lg text-text-secondary">
        {intelligence.summary}
      </p>

      <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <PipelineColumn
          eyebrow="Context assembled"
          items={intelligence.inputs}
          tone="neutral"
        />

        <div
          className="flex items-center justify-center gap-3 lg:flex-col"
          aria-hidden
        >
          <span className="hidden h-full w-px bg-border-subtle lg:block" />
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border-default bg-bg-base text-brand">
            <ServerCog className="size-5" />
          </span>
          <span className="hidden h-full w-px bg-border-subtle lg:block" />
          <ArrowRight className="size-4 rotate-90 text-text-tertiary lg:hidden" />
        </div>

        <PipelineColumn
          eyebrow="Response returned"
          items={intelligence.outputs}
          tone="brand"
        />
      </div>

      <div className="mt-4 rounded-md bg-bg-surface p-5">
        <p className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
          <ShieldCheck className="size-3.5" aria-hidden />
          Constraints
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {intelligence.guardrails.map((guardrail) => (
            <li
              key={guardrail}
              className="text-body-sm text-text-secondary before:mr-2 before:text-brand before:content-['—']"
            >
              {guardrail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PipelineColumn({
  eyebrow,
  items,
  tone,
}: {
  eyebrow: string;
  items: string[];
  tone: "neutral" | "brand";
}) {
  return (
    <div className="rounded-md bg-bg-surface p-5">
      <p className="text-caption tracking-wide text-text-tertiary uppercase">
        {eyebrow}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-body-sm text-text-secondary"
          >
            <span
              className={
                tone === "brand"
                  ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                  : "mt-1.5 size-1.5 shrink-0 rounded-full bg-text-tertiary"
              }
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
