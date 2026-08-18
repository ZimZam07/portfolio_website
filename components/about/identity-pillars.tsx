import {
  Code2,
  Compass,
  MessagesSquare,
  PenLine,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { AboutPillar, PillarIcon } from "@/types/about";

type IdentityPillarsProps = {
  pillars: AboutPillar[];
};

const ICONS: Record<PillarIcon, LucideIcon> = {
  engineering: Code2,
  product: Compass,
  ai: Sparkles,
  communication: MessagesSquare,
  venture: Rocket,
  creative: PenLine,
};

/**
 * The six facets, stated up front. Each card closes on its evidence line
 * so the claim above it is anchored to something real — that line is the
 * difference between a profile and a list of adjectives.
 *
 * Evidence stays visible rather than hiding behind hover: it's the part
 * worth reading, and hover content is unreachable on touch anyway.
 */
export function IdentityPillars({ pillars }: IdentityPillarsProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar, index) => {
        const Icon = ICONS[pillar.icon];
        return (
          <li key={pillar.id}>
            <RevealOnScroll index={index}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-border-subtle bg-bg-surface p-5 transition-all duration-base ease-out hover:border-border-default motion-safe:hover:-translate-y-1">
                <Icon
                  className="size-5 text-text-tertiary transition-colors duration-base ease-out group-hover:text-brand"
                  aria-hidden
                />
                <h3 className="mt-3 text-heading-sm font-medium text-text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 flex-1 text-body-sm text-text-secondary">
                  {pillar.description}
                </p>
                <p className="mt-4 font-mono text-mono-sm text-text-tertiary">
                  {pillar.evidence}
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
