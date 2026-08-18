import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusDotVariants = cva("inline-block size-1.5 shrink-0 rounded-full", {
  variants: {
    tone: {
      success: "bg-success",
      neutral: "bg-text-tertiary",
      brand: "bg-brand",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

type StatusDotProps = VariantProps<typeof statusDotVariants> & {
  pulse?: boolean;
  className?: string;
};

/**
 * Shipped/in-progress/archived indicator, availability status, and the
 * "actively building" pulse. Color is never the sole signal — always
 * paired with adjacent text (docs/05-component-library.md Primitives).
 */
export function StatusDot({ tone, pulse, className }: StatusDotProps) {
  return (
    <span className="relative inline-flex size-1.5">
      {pulse && (
        <span
          className={cn(
            statusDotVariants({ tone }),
            "absolute inline-flex h-full w-full animate-ping opacity-75 motion-reduce:hidden",
          )}
          aria-hidden
        />
      )}
      <span
        className={cn(statusDotVariants({ tone }), "relative", className)}
        aria-hidden
      />
    </span>
  );
}
