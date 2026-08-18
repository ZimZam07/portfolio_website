import type { SVGProps } from "react";

type SimpleIcon = { path: string };

type BrandIconProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  icon: SimpleIcon;
};

/**
 * Renders a simple-icons brand glyph inline. Lucide dropped all
 * trademarked logo icons (GitHub, LinkedIn, etc.) from this version, so
 * brand marks come from simple-icons instead — generic UI icons stay on
 * lucide-react. LinkedIn has no entry in simple-icons (removed at the
 * brand owner's request), so social links that need it fall back to a
 * neutral Lucide icon rather than an unofficial substitute mark.
 */
export function BrandIcon({ icon, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}
