"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, Sparkles } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { useAIAssistant } from "@/components/ai-assistant/ai-assistant-provider";
import {
  MAX_HISTORY,
  MAX_MESSAGE_LENGTH,
  type ChatErrorReason,
} from "@/lib/ai/chat-schema";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "Summarize the experience shown here",
  "What are his strongest projects?",
  "Why should I consider him for an AI role?",
];

/** Phrasing the visitor sees; provider errors never reach them. */
const ERROR_COPY: Record<ChatErrorReason, string> = {
  unconfigured:
    "The assistant isn't connected yet. You can still explore the projects, experience and skills pages, or reach out from the contact page.",
  rate_limited:
    "That's a lot of questions at once — give it a moment and try again.",
  failed:
    "Sorry, I couldn't reach the assistant just now. Please try again, or use the contact links on the page.",
  invalid: "That message couldn't be sent. Try rephrasing it.",
};

export function AIAssistantPanel() {
  const { open, setOpen } = useAIAssistant();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ChatErrorReason | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Abandon an in-flight answer when the panel closes or unmounts — the
  // route handler stops generating on cancel.
  useEffect(() => {
    if (!open) abortRef.current?.abort();
  }, [open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!trimmed || pending) return;

    setError(null);
    setDraft("");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    const assistantId = crypto.randomUUID();

    // Captured before the state update so the request carries the same
    // history the user just saw, without waiting for a re-render.
    const history = [...messages, userMessage]
      .slice(-MAX_HISTORY)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const result = (await response
          .json()
          .catch(() => null)) as { reason?: ChatErrorReason } | null;
        setError(result?.reason ?? "failed");
        // Drop the empty assistant bubble — nothing was said.
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m,
          ),
        );
      }

      // A stream that closed without producing anything is a failure the
      // visitor would otherwise see as an empty bubble.
      setMessages((prev) => {
        const answered = prev.find((m) => m.id === assistantId)?.content.trim();
        if (answered) return prev;
        setError("failed");
        return prev.filter((m) => m.id !== assistantId);
      });
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") {
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        return;
      }
      setError("failed");
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setPending(false);
      abortRef.current = null;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border-subtle">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="size-4 text-brand" aria-hidden />
            Ask about {siteConfig.name.split(" ")[0]}
          </SheetTitle>
          <SheetDescription>
            Ask about projects, experience, skills, or why to reach out.
          </SheetDescription>
        </SheetHeader>

        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-4"
          aria-live="polite"
          aria-busy={pending}
        >
          {messages.length === 0 && !error ? (
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void send(prompt)}
                  className="rounded-md border border-border-subtle px-3 py-2 text-left text-body-sm text-text-secondary transition-colors duration-fast hover:bg-bg-surface-2 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-body-sm whitespace-pre-wrap",
                  message.role === "user"
                    ? "ml-auto bg-bg-surface-2 text-text-primary"
                    : "mr-auto bg-bg-surface text-text-secondary",
                )}
              >
                {message.content || <ThinkingDots />}
              </div>
            ))
          )}

          {error && (
            <p className="rounded-md border border-border-default bg-bg-surface-2 px-3 py-2 text-body-sm text-text-secondary">
              {ERROR_COPY[error]}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border-subtle p-4"
        >
          <label htmlFor="ai-assistant-composer" className="sr-only">
            Ask a question
          </label>
          <Input
            id="ai-assistant-composer"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask a question..."
            autoComplete="off"
            maxLength={MAX_MESSAGE_LENGTH}
            disabled={pending}
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Send message"
            disabled={pending || draft.trim().length === 0}
          >
            <Send className="size-4" aria-hidden />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

/** Placeholder while the first token is still in flight. */
function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Thinking">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-1.5 animate-pulse rounded-full bg-text-tertiary motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
