"use client";

import { useRouter } from "next/navigation";

import { keyboardShortcuts, siteConfig, socialLinks } from "@/lib/constants";
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts";
import { useAIAssistant } from "@/components/ai-assistant/ai-assistant-provider";

/** Wires the G/L/R/P/A/C shortcuts documented in docs/03-wireframes.md §0.5. */
export function GlobalShortcuts() {
  const router = useRouter();
  const { setOpen: setAIAssistantOpen } = useAIAssistant();

  useKeyboardShortcuts({
    [keyboardShortcuts.github]: () => {
      if (socialLinks.github) window.open(socialLinks.github, "_blank");
    },
    [keyboardShortcuts.linkedin]: () => {
      if (socialLinks.linkedin) window.open(socialLinks.linkedin, "_blank");
    },
    [keyboardShortcuts.resume]: () => window.open(siteConfig.resumeUrl, "_blank"),
    [keyboardShortcuts.projects]: () => router.push("/projects"),
    [keyboardShortcuts.aiAssistant]: () => setAIAssistantOpen(true),
    [keyboardShortcuts.contact]: () => router.push("/contact"),
  });

  return null;
}
