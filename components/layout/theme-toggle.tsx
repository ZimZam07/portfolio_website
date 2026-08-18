"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { IconButton } from "@/components/ui/icon-button";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoids a hydration mismatch: the server can't know the persisted
  // theme, so the toggle renders inert until mounted client-side.
  const mounted = useHasMounted();

  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <IconButton
      icon={
        isDark ? (
          <Sun className="size-4" aria-hidden />
        ) : (
          <Moon className="size-4" aria-hidden />
        )
      }
      label={`Switch to ${nextTheme} mode`}
      size="sm"
      onClick={() => setTheme(nextTheme)}
      disabled={!mounted}
    />
  );
}
