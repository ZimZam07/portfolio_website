"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPaletteProvider } from "@/components/command/command-palette-provider";
import { CommandPalette } from "@/components/command/command-palette";
import { GlobalShortcuts } from "@/components/providers/global-shortcuts";

/**
 * Root-level providers. The command palette is mounted here (not
 * per-layout) so ⌘K keeps working everywhere, including Recruiter Mode
 * (docs/03-wireframes.md §3.2/§3.4).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <CommandPaletteProvider>
          <GlobalShortcuts />
          {children}
          <CommandPalette />
        </CommandPaletteProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
