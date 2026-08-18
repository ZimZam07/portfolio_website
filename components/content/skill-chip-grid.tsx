import { Badge } from "@/components/ui/badge";
import type { SkillGroup } from "@/lib/content/skills";

type SkillChipGridProps = {
  groups: SkillGroup[];
};

/**
 * Curated capability clusters for the Home preview — same divided-strip
 * treatment as AvailabilityStrip, reused rather than inventing a new
 * pattern. Full categorized grid lives on the dedicated /skills page.
 */
export function SkillChipGrid({ groups }: SkillChipGridProps) {
  const visibleGroups = groups.filter((group) => group.skills.length > 0);

  if (visibleGroups.length === 0) return null;

  return (
    <div className="flex flex-col divide-y divide-border-subtle rounded-lg border border-border-subtle sm:flex-row sm:divide-x sm:divide-y-0">
      {visibleGroups.map((group) => (
        <div key={group.label} className="flex-1 px-5 py-4">
          <p className="text-caption tracking-wide text-text-tertiary uppercase">
            {group.label}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Badge key={skill.name} tone="outline">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
