import { Compass, Layers, Sparkles, type LucideIcon } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { Strength } from "@/lib/content/recruiter";

type StrengthCardsProps = {
  strengths: Strength[];
};

const ICONS: Record<Strength["icon"], LucideIcon> = {
  fullstack: Layers,
  ai: Sparkles,
  product: Compass,
};

/**
 * Three capability claims, each backed by work shown further down the
 * page. The index numeral is the visual anchor — it stays legible at rest
 * rather than only appearing on hover, since this section is meant to be
 * skimmed rather than explored.
 */
export function StrengthCards({ strengths }: StrengthCardsProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {strengths.map((strength, index) => {
        const Icon = ICONS[strength.icon];
        return (
          <li key={strength.index}>
            <RevealOnScroll index={index}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-surface p-6 transition-all duration-base ease-out hover:border-brand/40 motion-safe:hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-mono-sm text-brand">
                    {strength.index}
                  </span>
                  <Icon
                    className="size-5 text-text-tertiary transition-colors duration-base ease-out group-hover:text-brand"
                    aria-hidden
                  />
                </div>

                <h3 className="mt-4 text-heading-sm font-medium text-text-primary">
                  {strength.title}
                </h3>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {strength.description}
                </p>

                <span
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-base ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  aria-hidden
                />
              </article>
            </RevealOnScroll>
          </li>
        );
      })}
    </ul>
  );
}
