import {
  GraduationCap,
  Globe2,
  MapPin,
  Plane,
  Target,
  type LucideIcon,
} from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { SnapshotCard } from "@/lib/content/recruiter";

type SnapshotCardsProps = {
  cards: SnapshotCard[];
};

const ICONS: Record<SnapshotCard["icon"], LucideIcon> = {
  education: GraduationCap,
  location: MapPin,
  looking: Target,
  mode: Globe2,
  relocation: Plane,
};

/**
 * The five facts a recruiter checks first, as a compact scannable row.
 * Values sit on the primary text colour with labels dropped to tertiary —
 * the same inversion used by the availability module on Home, so the two
 * read as one system.
 */
export function SnapshotCards({ cards }: SnapshotCardsProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = ICONS[card.icon];
        return (
          <li key={card.label}>
            <RevealOnScroll index={index}>
              <div className="group relative h-full overflow-hidden rounded-lg border border-border-subtle bg-bg-surface p-5 transition-all duration-base ease-out hover:border-brand/40 motion-safe:hover:-translate-y-0.5">
                <p className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
                  <Icon
                    className="size-3.5 shrink-0 transition-colors duration-base ease-out group-hover:text-brand"
                    aria-hidden
                  />
                  {card.label}
                </p>
                <p className="mt-3 text-body-md font-medium text-text-primary">
                  {card.value}
                </p>
                {card.detail && (
                  <p className="mt-1 text-body-sm text-text-tertiary">
                    {card.detail}
                  </p>
                )}

                <span
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-base ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  aria-hidden
                />
              </div>
            </RevealOnScroll>
          </li>
        );
      })}
    </ul>
  );
}
