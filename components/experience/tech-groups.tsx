import { Badge } from "@/components/ui/badge";
import type { ExperienceTechGroup } from "@/types/experience";

type TechGroupsProps = {
  groups: ExperienceTechGroup[];
};

/**
 * Tools and concepts, grouped rather than dumped as one wall of chips —
 * the grouping is itself information about how the work was organised.
 * Rendered as a description list because each label genuinely defines the
 * set beneath it.
 */
export function TechGroups({ groups }: TechGroupsProps) {
  return (
    <dl className="divide-y divide-border-subtle border-t border-border-subtle">
      {groups.map((group) => (
        <div
          key={group.label}
          className="grid gap-3 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8"
        >
          <dt className="text-caption tracking-wide text-text-tertiary uppercase sm:pt-1.5">
            {group.label}
          </dt>
          <dd className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge key={item} tone="outline">
                {item}
              </Badge>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
