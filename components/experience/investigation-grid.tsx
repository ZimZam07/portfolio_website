import type { ExperienceInvestigation } from "@/types/experience";

type InvestigationGridProps = {
  investigations: ExperienceInvestigation[];
};

/**
 * The specific technical problems examined. Numbered in mono to read as
 * findings from an investigation rather than as feature bullets — this is
 * the section that shows the work went below the product surface.
 */
export function InvestigationGrid({ investigations }: InvestigationGridProps) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {investigations.map((investigation, index) => (
        <li
          key={investigation.title}
          className="group rounded-md bg-bg-surface p-5 transition-colors duration-base ease-out hover:bg-bg-surface-2"
        >
          <span
            className="font-mono text-mono-sm text-brand"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-heading-sm font-medium text-text-primary">
            {investigation.title}
          </h3>
          <p className="mt-1.5 text-body-sm text-text-secondary">
            {investigation.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
