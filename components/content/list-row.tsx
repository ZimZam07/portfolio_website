import Link from "next/link";

import { cn } from "@/lib/utils";

type ListRowProps = {
  title: string;
  subtitle?: string;
  impact?: string;
  href?: string;
  initials?: string;
};

/**
 * Generic row — Experience preview today, reused by Recruiter Mode's
 * project/experience rows later. docs/05-component-library.md "ListRow".
 */
export function ListRow({ title, subtitle, impact, href, initials }: ListRowProps) {
  const content = (
    <div className="flex flex-col gap-3 rounded-md px-3 py-4 transition-colors duration-fast hover:bg-bg-surface-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {initials && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-bg-surface-2 text-caption font-medium text-text-secondary">
            {initials}
          </span>
        )}
        <div>
          <p className="text-heading-sm text-text-primary">{title}</p>
          {subtitle && (
            <p className="text-body-sm text-text-tertiary">{subtitle}</p>
          )}
        </div>
      </div>
      {impact && (
        <p className="text-body-sm text-text-secondary sm:text-right">
          {impact}
        </p>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className={cn(
        "-mx-3 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      {content}
    </Link>
  );
}
