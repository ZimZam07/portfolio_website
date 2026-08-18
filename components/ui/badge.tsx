import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-bg-surface-2 text-text-secondary",
        outline: "border border-border-default text-text-secondary",
      },
    },
    defaultVariants: {
      tone: "outline",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

/** Category tags, tech-stack chips, skill/status labels. Never solid-fill saturated. */
export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
