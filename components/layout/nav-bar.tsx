"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { primaryNavItems, siteConfig } from "@/lib/constants";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";

export function NavBar() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 h-16 border-b border-transparent transition-colors duration-base ease-out lg:h-18",
        scrolled &&
          "border-border-subtle bg-bg-surface/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="text-heading-sm font-semibold text-text-primary"
        >
          {siteConfig.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="relative px-3 py-2 text-body-sm text-text-secondary transition-colors duration-fast hover:text-text-primary data-[active=true]:text-text-primary"
                data-active={isActive}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            href="/recruiter"
            variant="secondary"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Sparkles className="size-4" aria-hidden />
            Recruiter Mode
          </Button>
          <Button
            href={siteConfig.resumeUrl}
            external
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
          >
            Resume
          </Button>
          <IconButton
            icon={<Menu className="size-4" aria-hidden />}
            label="Open menu"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <MobileNavSheet open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
