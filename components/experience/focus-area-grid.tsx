import {
  Blocks,
  Compass,
  FlaskConical,
  Layers,
  Microscope,
  type LucideIcon,
} from "lucide-react";

import type { ExperienceFocusArea, FocusAreaIcon } from "@/types/experience";

type FocusAreaGridProps = {
  areas: ExperienceFocusArea[];
};

const ICONS: Record<FocusAreaIcon, LucideIcon> = {
  research: Microscope,
  evaluation: FlaskConical,
  knowledge: Layers,
  pipeline: Blocks,
  product: Compass,
};

/**
 * The dimensions of the role. Topic chips stay visible at rest rather than
 * appearing on hover — hiding content behind a pointer interaction would
 * put it out of reach on touch and for keyboard users, and this is exactly
 * the detail a recruiter is scanning for. Hover adds emphasis only: a lift
 * plus an accent rule that draws in along the bottom edge.
 */
export function FocusAreaGrid({ areas }: FocusAreaGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => {
        const Icon = ICONS[area.icon];
        return (
          <li
            key={area.title}
            className="group relative overflow-hidden rounded-md bg-bg-surface p-5 transition-all duration-base ease-out hover:bg-bg-surface-2 motion-safe:hover:-translate-y-0.5"
          >
            <Icon
              className="size-5 text-text-tertiary transition-colors duration-base ease-out group-hover:text-brand"
              aria-hidden
            />
            <h3 className="mt-3 text-heading-sm font-medium text-text-primary">
              {area.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {area.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border-subtle px-2.5 py-1 text-caption text-text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>

            <span
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-base ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              aria-hidden
            />
          </li>
        );
      })}
    </ul>
  );
}
