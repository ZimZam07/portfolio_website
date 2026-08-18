"use client";

import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAIAssistant } from "@/components/ai-assistant/ai-assistant-provider";

/**
 * Floating trigger, available from anywhere (docs/01 §3). One of the
 * sanctioned gradient surfaces (docs/02 §1) — kept to this one fixed
 * element rather than reused as a generic button style.
 */
export function AIAssistantTrigger() {
  const { setOpen } = useAIAssistant();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open AI assistant"
      className={cn(
        "fixed right-6 bottom-6 z-40 flex size-12 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg transition-transform duration-fast ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <Sparkles className="size-5" aria-hidden />
    </button>
  );
}
