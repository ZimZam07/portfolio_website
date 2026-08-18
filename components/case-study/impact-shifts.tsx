import { ArrowRight } from "lucide-react";

import type { ProjectImpactShift } from "@/types/project";

type ImpactShiftsProps = {
  shifts: ProjectImpactShift[];
};

/**
 * "Before → after" framing, deliberately qualitative: this project has no
 * real usage data, and inventing adoption or recovery numbers to fill a
 * metrics row would be fabrication. The shift itself is the argument.
 */
export function ImpactShifts({ shifts }: ImpactShiftsProps) {
  return (
    <ul className="divide-y divide-border-subtle border-y border-border-subtle">
      {shifts.map((shift) => (
        <li
          key={shift.to}
          className="group grid items-center gap-2 py-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-6"
        >
          <span className="text-body-md text-text-tertiary line-through decoration-border-default">
            {shift.from}
          </span>
          <ArrowRight
            className="size-4 rotate-90 text-brand transition-transform duration-base ease-out sm:rotate-0 motion-safe:sm:group-hover:translate-x-1"
            aria-hidden
          />
          <span className="text-body-lg font-medium text-text-primary">
            {shift.to}
          </span>
        </li>
      ))}
    </ul>
  );
}
