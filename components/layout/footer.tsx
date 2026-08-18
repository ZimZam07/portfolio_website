import { FileText } from "lucide-react";

import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { SocialLinks } from "@/components/content/social-links";
import { siteConfig } from "@/lib/constants";

type FooterProps = {
  variant?: "full" | "recruiter";
};

export function Footer({ variant = "full" }: FooterProps) {
  return (
    <footer className="border-t border-border-subtle">
      <Container className="flex flex-col items-center gap-4 py-16 sm:flex-row sm:justify-between">
        <p className="text-body-sm text-text-tertiary">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-1">
          {variant === "full" && (
            <IconButton
              icon={<FileText className="size-4" aria-hidden />}
              label="Resume"
              href={siteConfig.resumeUrl}
              external
              size="sm"
            />
          )}
          <SocialLinks size="sm" />
        </div>
      </Container>
    </footer>
  );
}
