import { BookOpen, Camera, Goal, Users, type LucideIcon } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { BeyondItem } from "@/types/about";

type BeyondTheCodeProps = {
  items: BeyondItem[];
};

/**
 * `Goal` stands in for football — this icon set dropped its trademarked
 * brand and sport marks, and a goalpost reads more clearly at 20px than
 * any generic ball would. `Camera` covers the content work rather than a
 * platform logo, which keeps the set visually consistent and avoids
 * implying any affiliation.
 */
const ICONS: Record<BeyondItem["icon"], LucideIcon> = {
  football: Goal,
  writing: BookOpen,
  content: Camera,
  campus: Users,
};

/**
 * The personal section. Deliberately lighter chrome than the professional
 * cards above — a bordered row rather than a filled card — so it reads as
 * a change of register rather than more of the same argument. These are
 * interests stated as interests; none of them is spun into a competency.
 */
export function BeyondTheCode({ items }: BeyondTheCodeProps) {
  return (
    <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {items.map((item, index) => {
        const Icon = ICONS[item.icon];
        return (
          <li key={item.title}>
            <RevealOnScroll index={index}>
              <div className="group flex gap-4 border-t border-border-subtle pt-5">
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-text-tertiary transition-colors duration-base ease-out group-hover:text-brand"
                  aria-hidden
                />
                <div className="min-w-0">
                  <h3 className="text-heading-sm font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-body-sm text-text-secondary">
                    {item.detail}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </li>
        );
      })}
    </ul>
  );
}
