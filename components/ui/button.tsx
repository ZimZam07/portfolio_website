import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Button hierarchy matches docs/02-design-system.md §7 / docs/03-wireframes.md
 * §1.6 exactly: one gradient (primary) surface per viewport, outlined
 * secondary, ghost tertiary, and a chrome-less text link. `destructive` and
 * `icon-sm` exist only to back shadcn's own Dialog/Sheet close buttons.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-fast ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-gradient-brand text-white hover:brightness-110",
        secondary:
          "border border-border-default bg-transparent text-text-primary hover:bg-bg-surface-2",
        tertiary: "text-text-tertiary hover:bg-bg-surface-2 hover:text-text-primary",
        text: "h-auto p-0 text-text-secondary hover:text-brand underline-offset-4 hover:underline",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  loading?: boolean;
  href?: string;
  external?: boolean;
};

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    className,
    variant,
    size,
    loading,
    href,
    external,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        {...externalProps}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && <Loader2 className="animate-spin" aria-hidden />}
      {children}
    </button>
  );
});

export { buttonVariants };
