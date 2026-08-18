import { Globe2, MapPin, Plane } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import { getLookingFor } from "@/lib/content/recruiter";

/**
 * The availability statement, given the gradient-hairline treatment this
 * design system reserves for the single most important surface in a
 * viewport — on a recruiter page, "is this person available, and for
 * what" is that surface.
 *
 * Reuses the same pulsing StatusDot as Home and Contact, so availability
 * reads identically wherever it appears.
 */
export function LookingForCard() {
  const looking = getLookingFor();

  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-brand opacity-[0.07] blur-3xl"
        aria-hidden
      />
      <div className="rounded-lg bg-gradient-brand p-px">
        <div className="rounded-[calc(var(--radius-lg)-1px)] bg-bg-base p-6 sm:p-8">
          <span className="inline-flex items-center gap-2.5">
            <StatusDot tone="success" pulse />
            <span className="text-caption tracking-wide text-brand uppercase">
              {looking.status}
            </span>
          </span>

          <p className="mt-5 text-heading-lg font-semibold text-text-primary">
            {looking.primary}
          </p>
          <p className="mt-1.5 text-body-lg text-text-secondary">
            {looking.secondary}
          </p>

          <dl className="mt-7 grid gap-5 border-t border-border-subtle pt-6 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
                <Globe2 className="size-3.5" aria-hidden />
                Work mode
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {looking.workModes.map((mode) => (
                  <Badge key={mode} tone="outline">
                    {mode}
                  </Badge>
                ))}
              </dd>
            </div>

            <div>
              <dt className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
                <MapPin className="size-3.5" aria-hidden />
                Location
              </dt>
              <dd className="mt-2 text-body-md text-text-primary">
                {looking.location}
              </dd>
            </div>

            <div>
              <dt className="flex items-center gap-2 text-caption tracking-wide text-text-tertiary uppercase">
                <Plane className="size-3.5" aria-hidden />
                Relocation
              </dt>
              <dd className="mt-2 text-body-md text-text-primary">
                {looking.relocation}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
