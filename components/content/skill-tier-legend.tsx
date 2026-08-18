import { TIER_LABEL, TIER_STYLE } from "@/components/content/skill-node";
import type { SkillTier } from "@/types/skill";

const TIER_DEFINITIONS: { tier: SkillTier; description: string }[] = [
  {
    tier: "core",
    description: "Used consistently, across real work — I can go deep on these.",
  },
  {
    tier: "working",
    description: "Real, applied experience, though not a daily driver.",
  },
  {
    tier: "exposure",
    description: "Learned and can speak to it — typically from focused, hands-on study rather than repeated production use.",
  },
];

/**
 * Teaches the border-style/weight language used by every SkillNode on the
 * page, using the exact same styling — no separate legend vocabulary to
 * learn. The honest, non-numeric alternative to a percentage or rating.
 */
export function SkillTierLegend() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {TIER_DEFINITIONS.map(({ tier, description }) => (
        <div key={tier} className="flex flex-col gap-2">
          <span
            className={`inline-flex w-fit items-center rounded-full border px-3.5 py-1.5 text-body-sm ${TIER_STYLE[tier]}`}
          >
            {TIER_LABEL[tier]}
          </span>
          <p className="text-body-sm text-text-tertiary">{description}</p>
        </div>
      ))}
    </div>
  );
}
