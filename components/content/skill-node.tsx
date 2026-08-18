import { cn } from "@/lib/utils";
import type { Skill, SkillTier } from "@/types/skill";

export const TIER_LABEL: Record<SkillTier, string> = {
  core: "Core",
  working: "Working Knowledge",
  exposure: "Exposure",
};

export const TIER_STYLE: Record<SkillTier, string> = {
  core: "border-brand/40 bg-bg-surface-2 font-medium text-text-primary",
  working: "border-border-default text-text-secondary",
  exposure: "border-dashed border-border-subtle text-text-tertiary",
};

type SkillNodeProps = {
  skill: Skill;
  selected?: boolean;
  onSelect?: (skill: Skill) => void;
};

function hasEvidence(skill: Skill) {
  return Boolean(
    skill.evidence &&
      ((skill.evidence.learnedThrough?.length ?? 0) > 0 ||
        (skill.evidence.appliedIn?.length ?? 0) > 0),
  );
}

/**
 * The base unit of the whole page. Tier is communicated purely through
 * border style, weight, and color depth — never a bar, percentage, or
 * star. Skills with real evidence become a toggle button (selecting them
 * opens the shared evidence panel below the cluster); skills without
 * evidence render as plain, non-interactive chips — no dead clicks.
 */
export function SkillNode({ skill, selected, onSelect }: SkillNodeProps) {
  const tier = skill.tier ?? "working";
  const interactive = hasEvidence(skill) && Boolean(onSelect);

  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-body-sm transition-all duration-fast ease-out",
    TIER_STYLE[tier],
    interactive &&
      "cursor-pointer hover:-translate-y-0.5 hover:border-brand/60 hover:text-text-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    selected && "border-brand bg-brand/10 text-text-primary shadow-md",
  );

  if (!interactive) {
    return <span className={classes}>{skill.name}</span>;
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect?.(skill)}
      className={classes}
    >
      {skill.name}
      <span
        className={cn(
          "size-1 rounded-full",
          selected ? "bg-brand" : "bg-text-tertiary",
        )}
        aria-hidden
      />
    </button>
  );
}
