"use client";

import { useEffect } from "react";

type ShortcutMap = Record<string, () => void>;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * Global single-letter shortcuts (G/L/R/P/A/C). Per
 * docs/03-wireframes.md §0.5, these must never fire while focus is inside
 * an input, textarea, contenteditable, or the AI chat composer — checked
 * on every keydown, not scoped to specific known fields, so it holds for
 * any current or future text entry surface on the site.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const handler = shortcuts[event.key.toLowerCase()];
      if (!handler) return;

      event.preventDefault();
      handler();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}
