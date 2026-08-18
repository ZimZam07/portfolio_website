import Image from "next/image";

import { cn } from "@/lib/utils";

type CompanyWordmarkProps = {
  /** Company name — used for the accessible fallback, not rendered. */
  name: string;
  src: string;
  /** Intrinsic pixel size of the source file, for aspect-ratio reservation. */
  width: number;
  height: number;
  size?: "sm" | "md";
  className?: string;
};

const HEIGHT_CLASS = { sm: "h-6", md: "h-7" } as const;

/**
 * A full-width brand lockup, as opposed to OrgLogo's square monogram tile —
 * squeezing a ~5:1 wordmark into a square would render it unreadably small.
 *
 * The light plate is deliberate: this mark is black type, which disappears
 * against the dark theme's near-black canvas. Recolouring isn't an option
 * (a filter that lifts the type to white also rotates the green cube to
 * magenta), and altering a company's mark is the wrong call regardless. A
 * white plate is the conventional fix and reads identically in both themes.
 *
 * `alt=""` because every placement renders the company name as adjacent
 * text — announcing the mark too would just repeat it.
 */
export function CompanyWordmark({
  name,
  src,
  width,
  height,
  size = "md",
  className,
}: CompanyWordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-border-subtle bg-white px-3 py-2",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={cn("w-auto", HEIGHT_CLASS[size])}
        // Small, above the fold on /experience, and never re-fetched.
        priority
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}
