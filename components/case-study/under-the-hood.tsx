import type { ProjectTechNote } from "@/types/project";

type UnderTheHoodProps = {
  notes: ProjectTechNote[];
};

/**
 * Technical breakdown as a description list — each row is genuinely a
 * term/definition pair, so `<dl>` carries that relationship to assistive
 * tech instead of faking it with headings.
 */
export function UnderTheHood({ notes }: UnderTheHoodProps) {
  return (
    <dl className="divide-y divide-border-subtle border-t border-border-subtle">
      {notes.map((note) => (
        <div
          key={note.area}
          className="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8"
        >
          <dt className="font-mono text-mono-sm text-text-tertiary sm:pt-1">
            {note.area}
          </dt>
          <dd className="max-w-[68ch] text-body-md text-text-secondary">
            {note.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
