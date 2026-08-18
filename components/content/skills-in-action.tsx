import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { SkillApplication } from "@/types/skill";

type SkillsInActionProps = {
  applications: SkillApplication[];
};

/**
 * Skill → where it was used → what was done with it. The page's proof
 * layer: a claim that links to a case study can be checked, which is
 * exactly the point.
 *
 * A description list, because each row genuinely defines a skill by its
 * application rather than merely listing two related strings.
 */
export function SkillsInAction({ applications }: SkillsInActionProps) {
  return (
    <dl className="divide-y divide-border-subtle border-t border-border-subtle">
      {applications.map((application, index) => (
        <RevealOnScroll key={`${application.skill}-${application.context}`} index={index}>
          <div className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
            <dt>
              <span className="text-heading-sm font-medium text-text-primary">
                {application.skill}
              </span>
              <span className="mt-1.5 block">
                {application.href ? (
                  <Link
                    href={application.href}
                    className="group inline-flex items-center gap-1 rounded-sm font-mono text-mono-sm text-text-tertiary transition-colors duration-fast ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {application.context}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-fast ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                ) : (
                  <span className="font-mono text-mono-sm text-text-tertiary">
                    {application.context}
                  </span>
                )}
              </span>
            </dt>
            <dd className="max-w-[68ch] text-body-md text-text-secondary">
              {application.detail}
            </dd>
          </div>
        </RevealOnScroll>
      ))}
    </dl>
  );
}
