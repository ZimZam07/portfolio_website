import type { ReactNode } from "react";
import { Link2, Mail } from "lucide-react";
import { siGithub, siLeetcode } from "simple-icons";

import { BrandIcon } from "@/components/ui/brand-icon";
import { IconButton } from "@/components/ui/icon-button";
import { siteConfig, socialLinks } from "@/lib/constants";

type SocialLinksProps = {
  size?: "sm" | "md";
  showEmail?: boolean;
};

/** GitHub/LinkedIn/LeetCode/Email icon row — reused by Hero, Contact CTA, Footer. */
export function SocialLinks({ size = "md", showEmail = true }: SocialLinksProps) {
  const items = [
    socialLinks.github && {
      icon: <BrandIcon icon={siGithub} className="size-4" aria-hidden />,
      label: "GitHub",
      href: socialLinks.github,
      external: true,
    },
    socialLinks.linkedin && {
      icon: <Link2 className="size-4" aria-hidden />,
      label: "LinkedIn",
      href: socialLinks.linkedin,
      external: true,
    },
    socialLinks.leetcode && {
      icon: <BrandIcon icon={siLeetcode} className="size-4" aria-hidden />,
      label: "LeetCode",
      href: socialLinks.leetcode,
      external: true,
    },
    showEmail && {
      icon: <Mail className="size-4" aria-hidden />,
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      external: false,
    },
  ].filter(Boolean) as {
    icon: ReactNode;
    label: string;
    href: string;
    external: boolean;
  }[];

  return (
    <div className="flex items-center gap-1">
      {items.map((item) => (
        <IconButton
          key={item.label}
          icon={item.icon}
          label={item.label}
          href={item.href}
          external={item.external}
          size={size}
        />
      ))}
    </div>
  );
}
