"use client";

import Link from "next/link";
import { Search, Sparkles } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { primaryNavItems, siteConfig } from "@/lib/constants";
import { useCommandPalette } from "@/components/command/command-palette-provider";

type MobileNavSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavSheet({ open, onClose }: MobileNavSheetProps) {
  const { setOpen: setPaletteOpen } = useCommandPalette();

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 data-[side=right]:w-full data-[side=right]:max-w-none"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Site navigation</SheetTitle>
        </SheetHeader>

        <button
          type="button"
          onClick={() => {
            onClose();
            setPaletteOpen(true);
          }}
          className="mx-4 mt-4 flex items-center gap-2 rounded-md border border-border-default px-4 py-3 text-body-sm text-text-secondary"
        >
          <Search className="size-4" aria-hidden />
          Search
        </button>

        <nav aria-label="Primary" className="flex flex-1 flex-col p-4">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex min-h-14 items-center text-heading-md text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border-subtle p-4">
          <Button href="/recruiter" variant="secondary" onClick={onClose}>
            <Sparkles className="size-4" aria-hidden />
            Recruiter Mode
          </Button>
          <Button href={siteConfig.resumeUrl} external variant="primary" onClick={onClose}>
            View Resume
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
