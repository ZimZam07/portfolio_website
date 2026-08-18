import { cn } from "@/lib/utils";
import { TIER_LABEL, TIER_STYLE } from "@/components/content/skill-node";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { TechGroup } from "@/lib/content/recruiter";

type TechnicalProfileProps = {
  groups: TechGroup[];
};

/**
 * Technologies grouped by area.
 *
 * Depth is shown with the site's existing tier vocabulary — border weight
 * and style, borrowed straight from SkillNode so the two pages encode it
 * identically — rather than invented percentages or filled-dot meters. A
 * "Backend 87%" would be a number nobody measured; "Core" is a claim the
 * skills data actually makes.
 *
 * Chips are static here: this is a summary, and the interactive evidence
 * panels live on /skills.
 */
export function TechnicalProfile({ groups }: TechnicalProfileProps) {
  return (
    <div>
      <dl className="divide-y divide-border-subtle border-t border-border-subtle">
        {groups.map((group, index) => (
          <RevealOnScroll key={group.label} index={index}>
            <div className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="text-caption tracking-wide text-text-tertiary uppercase sm:pt-1.5">
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-body-sm",
                      TIER_STYLE[skill.tier ?? "working"],
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </dd>
            </div>
          </RevealOnScroll>
        ))}
      </dl>

      <RevealOnScroll>
        <p className="mt-5 text-body-sm text-text-tertiary">
          Emphasis indicates depth — {TIER_LABEL.core.toLowerCase()} skills are
          shown with a stronger border. No proficiency scores, because none
          were measured. Full breakdown on the{" "}
          <a
            href="/skills"
            className="rounded-sm text-brand underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            skills page
          </a>
          .
        </p>
      </RevealOnScroll>
    </div>
  );
}
