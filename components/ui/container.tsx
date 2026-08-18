import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const WIDTHS = {
  content: "max-w-content",
  prose: "max-w-prose",
  recruiter: "max-w-recruiter",
} as const;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: keyof typeof WIDTHS;
  as?: ElementType;
  children: ReactNode;
};

/** Max-width/padding wrapper — docs/03-wireframes.md grid specs (1280/760/920px). */
export function Container({
  width = "content",
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-16",
        WIDTHS[width],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
