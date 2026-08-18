import Anthropic from "@anthropic-ai/sdk";

import { buildPortfolioContext } from "@/lib/ai/portfolio-context";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { chatRequestSchema, type ChatErrorReason } from "@/lib/ai/chat-schema";

/**
 * Portfolio assistant.
 *
 * The API key is read from the environment inside the handler — no
 * `NEXT_PUBLIC_` prefix, no module-scope capture — so it is never inlined
 * into a client bundle, returned in a response, or logged. The browser
 * talks to this route; only this route talks to Anthropic.
 *
 * Required:
 *   ANTHROPIC_API_KEY — from console.anthropic.com
 */

/**
 * Claude Haiku 4.5: fast, inexpensive, and strong at instruction following —
 * which is what this job needs, since the work is grounded Q&A over a small
 * context under strict scope rules rather than open-ended reasoning.
 * Swap this one line for "claude-opus-5" for the most capable model.
 */
const MODEL = "claude-haiku-4-5";

/** Bounded because the portfolio context is small and answers should be short. */
const MAX_TOKENS = 1024;

/**
 * Rebuilt per request rather than memoised at module scope: content modules
 * are plain functions, the cost is negligible, and it means an edit shows up
 * without a restart in dev.
 */
function systemPrompt() {
  return buildSystemPrompt(buildPortfolioContext());
}

function errorResponse(reason: ChatErrorReason, status: number) {
  return Response.json({ ok: false, reason }, { status });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return errorResponse("invalid", 400);
  }

  const parsed = chatRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return errorResponse("invalid", 400);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return errorResponse("unconfigured", 503);
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt(),
      messages: parsed.data.messages,
    });

    // Relay text deltas as they arrive so the panel can render progressively
    // instead of waiting for the full answer.
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch {
          // The response has already begun, so the status code is committed.
          // Close cleanly and let the panel surface whatever arrived; a
          // thrown error here would look like a truncated network failure.
          controller.close();
        }
      },
      cancel() {
        // Visitor closed the panel or navigated away — stop generating
        // rather than paying for tokens nobody will read.
        stream.abort();
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    // Provider details never reach the visitor — only a coarse reason the
    // panel knows how to phrase.
    if (error instanceof Anthropic.RateLimitError) {
      return errorResponse("rate_limited", 429);
    }
    return errorResponse("failed", 502);
  }
}
