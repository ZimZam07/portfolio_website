import { StatusDot } from "@/components/ui/status-dot";
import type { Venture } from "@/types/about";

type VentureCardProps = {
  venture: Venture;
};

/**
 * The current venture. Gets the gradient-border treatment reserved for
 * live, in-progress work (the same one "Currently Building" uses on Home),
 * because that is exactly what it is.
 *
 * There is no metrics row here by design — no users, no launch date, no
 * revenue. Naming the stage honestly is what makes it credible; a card
 * dressed up as a finished product would not survive one follow-up
 * question in an interview.
 */
export function VentureCard({ venture }: VentureCardProps) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-brand opacity-[0.07] blur-3xl"
        aria-hidden
      />
      <div className="rounded-lg bg-gradient-brand p-px">
        <div className="rounded-[calc(var(--radius-lg)-1px)] bg-bg-base p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-caption tracking-wide text-brand uppercase">
              <StatusDot tone="brand" pulse />
              Currently building
            </span>
            <span className="rounded-full border border-border-default px-2.5 py-1 font-mono text-mono-sm text-text-tertiary">
              {venture.stage}
            </span>
          </div>

          <h3 className="mt-5 max-w-[24ch] text-heading-lg font-semibold text-text-primary">
            {venture.title}
          </h3>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-caption tracking-wide text-text-tertiary uppercase">
                The gap
              </p>
              <p className="mt-2 text-body-md text-text-secondary">
                {venture.problem}
              </p>
            </div>
            <div>
              <p className="text-caption tracking-wide text-text-tertiary uppercase">
                What we&apos;re doing about it
              </p>
              <p className="mt-2 text-body-md text-text-secondary">
                {venture.approach}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border-subtle pt-5">
            <ul className="flex flex-wrap items-center gap-2">
              {venture.team.map((member) => (
                <li
                  key={member}
                  className="rounded-full border border-border-default px-3 py-1 text-body-sm text-text-primary"
                >
                  {member}
                </li>
              ))}
            </ul>
            <span className="font-mono text-mono-sm text-text-tertiary">
              {venture.teamNote}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
