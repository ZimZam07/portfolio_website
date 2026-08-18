"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalShortcuts } from "@/components/providers/global-shortcuts";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <GlobalShortcuts />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
