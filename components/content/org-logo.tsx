import Image from "next/image";
import { siCisco, siHp } from "simple-icons";

import { BrandIcon } from "@/components/ui/brand-icon";
import { cn } from "@/lib/utils";

type OrgLogoProps = {
  name: string;
  logo?: string;
  size?: "sm" | "md";
};

const SIZE_CLASS = { sm: "size-12", md: "size-14" } as const;

// Known-brand fallback for common issuers not yet backed by a real logo
// file — matched by issuer name substring. Everyone else falls back to a
// plain monogram rather than a guessed or fabricated mark.
const KNOWN_ICONS: { match: RegExp; icon: { path: string } }[] = [
  { match: /cisco/i, icon: siCisco },
  { match: /\bhp\b/i, icon: siHp },
];

function initialsFor(name: string) {
  return name
    .replace(/\(.*?\)/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/** Issuer mark next to a certificate's title. Real logo file > known-brand
 * vector > neutral initials — never an invented or scraped image. */
export function OrgLogo({ name, logo, size = "md" }: OrgLogoProps) {
  const knownIcon = KNOWN_ICONS.find((entry) => entry.match.test(name))?.icon;

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-bg-surface-2 text-text-secondary",
        SIZE_CLASS[size],
      )}
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          sizes="56px"
          className="object-contain p-2"
        />
      ) : knownIcon ? (
        <BrandIcon icon={knownIcon} className="size-1/2" aria-hidden />
      ) : (
        <span
          className={cn(
            "font-medium",
            size === "sm" ? "text-caption" : "text-body-sm",
          )}
          aria-hidden
        >
          {initialsFor(name)}
        </span>
      )}
    </div>
  );
}
