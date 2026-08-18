import { Badge } from "@/components/ui/badge";

type EngineeringFocusProps = {
  focus: { summary: string; areas: string[] };
};

/**
 * The page's one gradient surface (docs/02 §1 allows a single such moment
 * per viewport) — this is the paragraph a recruiter should leave with, so
 * it gets the emphasis rather than the hero, which already has the title
 * and actions doing that work.
 */
export function EngineeringFocus({ focus }: EngineeringFocusProps) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-brand opacity-[0.07] blur-3xl"
        aria-hidden
      />
      <div className="rounded-lg bg-gradient-brand p-px">
        <div className="rounded-[calc(var(--radius-lg)-1px)] bg-bg-base p-6 sm:p-8 lg:p-10">
          <p className="max-w-[62ch] text-body-lg text-text-primary">
            {focus.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {focus.areas.map((area) => (
              <li key={area}>
                <Badge tone="outline">{area}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
