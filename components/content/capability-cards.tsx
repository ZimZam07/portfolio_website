import {
  Code2,
  Compass,
  Megaphone,
  MessagesSquare,
  Route,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { CapabilityKind, ProfessionalCapability } from "@/types/skill";

type CapabilityCardsProps = {
  capabilities: ProfessionalCapability[];
};

const ICONS: Record<string, LucideIcon> = {
  "software-engineering": Code2,
  "product-management": Route,
  "product-thinking": Compass,
  "product-communication": Megaphone,
  "stakeholder-communication": MessagesSquare,
};

/**
 * Kind drives a single accent hue rather than a whole visual dialect —
 * enough to signal that engineering, product and communication are three
 * facets of one profile, without splitting the page into three designs.
 */
const KIND_ACCENT: Record<CapabilityKind, string> = {
  engineering: "text-brand",
  product: "text-brand-2",
  communication: "text-text-secondary",
};

/**
 * Headline capabilities, above the technology inventory. Each card leads
 * with what the person can be trusted with and closes with the concrete
 * thing backing it — the evidence line is what separates this from the
 * usual adjective wall.
 */
export function CapabilityCards({ capabilities }: CapabilityCardsProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((capability, index) => {
        const Icon = ICONS[capability.id] ?? Code2;
        return (
          <li key={capability.id}>
            <RevealOnScroll index={index}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-border-subtle bg-bg-surface p-5 transition-all duration-base ease-out hover:border-border-default motion-safe:hover:-translate-y-1">
                <Icon
                  className={cn("size-5", KIND_ACCENT[capability.kind])}
                  aria-hidden
                />
                <h3 className="mt-3 text-heading-sm font-medium text-text-primary">
                  {capability.title}
                </h3>
                <p className="mt-1.5 flex-1 text-body-sm text-text-secondary">
                  {capability.description}
                </p>

                <p className="mt-4 font-mono text-mono-sm text-text-tertiary">
                  {capability.evidence}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {capability.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border-subtle px-2.5 py-1 text-caption text-text-secondary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

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
