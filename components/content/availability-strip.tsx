import { Globe2, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import type { Availability } from "@/types/availability";

type AvailabilityStripProps = {
  availability: Availability;
};

type MetaCard = {
  label: string;
  icon: LucideIcon;
  /** Rendered as chips when present, otherwise `value` is used. */
  chips?: string[];
  value?: string;
  span: string;
};

/**
 * Recruiter-facing availability, directly below the hero.
 *
 * Separate cards on an asymmetric 5/3/2/2 track rather than one evenly
 * divided strip: the status is the item a recruiter is actually scanning
 * for, and equal columns gave it no more weight than work authorisation.
 * It takes the widest card, a faint brand wash, and the only live
 * indicator on the page.
 *
 * Cards with no data are dropped entirely rather than rendering an
 * "Add …" prompt (docs/03-wireframes.md §0.3), so a partially-filled
 * availability still looks deliberate.
 */
export function AvailabilityStrip({ availability }: AvailabilityStripProps) {
  const { currentStatus, lookingFor, workModes, relocation, workAuthorization } =
    availability;

  const cards: MetaCard[] = [];

  if (workModes && workModes.length > 0) {
    cards.push({
      label: "Work mode",
      icon: Globe2,
      chips: workModes,
      span: "lg:col-span-3",
    });
  }

  if (relocation !== undefined) {
    cards.push({
      label: "Relocation",
      icon: MapPin,
      value: relocation ? "Open to relocation" : "Not relocating",
      span: "lg:col-span-2",
    });
  }

  if (workAuthorization) {
    cards.push({
      label: "Work authorization",
      icon: ShieldCheck,
      value: workAuthorization,
      span: "lg:col-span-2",
    });
  }

  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
      <div className="group relative overflow-hidden rounded-lg border border-border-subtle bg-bg-surface p-5 transition-all duration-base ease-out hover:border-brand/40 motion-safe:hover:-translate-y-0.5 sm:col-span-2 lg:col-span-5">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-[0.05] transition-opacity duration-base ease-out group-hover:opacity-[0.09]"
          aria-hidden
        />

        <div className="relative">
          <dt className="text-caption tracking-wide text-text-tertiary uppercase">
            Status
          </dt>
          <dd className="mt-2.5 flex items-start gap-2.5">
            {/* Nudged onto the first line's optical centre so the indicator
                stays aligned when the label wraps. */}
            <span className="mt-[0.5rem] shrink-0">
              <StatusDot tone="success" pulse />
            </span>
            <span className="text-heading-sm font-medium text-text-primary">
              {currentStatus}
            </span>
          </dd>

          {lookingFor && lookingFor.length > 0 && (
            <div className="mt-5 border-t border-border-subtle pt-4">
              <dt className="text-caption tracking-wide text-text-tertiary uppercase">
                Looking for
              </dt>
              <dd className="mt-1.5 text-body-lg text-text-primary">
                {lookingFor.join(" · ")}
              </dd>
            </div>
          )}
        </div>
      </div>

      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={cn(
              "group rounded-lg border border-border-subtle bg-bg-surface p-5 transition-all duration-base ease-out hover:border-brand/40 motion-safe:hover:-translate-y-0.5",
              card.span,
            )}
          >
            <dt className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
              <Icon
                className="size-3.5 shrink-0 transition-colors duration-base ease-out group-hover:text-brand"
                aria-hidden
              />
              {card.label}
            </dt>
            <dd className="mt-3">
              {card.chips ? (
                <ul className="flex flex-wrap gap-1.5">
                  {card.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-border-default px-2.5 py-1 text-body-sm text-text-secondary transition-colors duration-fast ease-out group-hover:text-text-primary"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-body-md text-text-primary">
                  {card.value}
                </span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
