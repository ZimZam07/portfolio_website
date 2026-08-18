import { z } from "zod";

/**
 * Request shape for /api/chat, shared by the panel and the route handler.
 *
 * The limits are the abuse controls: a bounded message length and a bounded
 * history cap the tokens any single request can spend, which matters
 * because this endpoint is public and every call costs money.
 */
export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_HISTORY = 12;

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
});

export const chatRequestSchema = z.object({
  // Ordered oldest-first and capped, so a client can't replay an unbounded
  // transcript back at the model.
  messages: z.array(chatMessageSchema).min(1).max(MAX_HISTORY),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

/** Reasons the panel renders differently from a normal failure. */
export type ChatErrorReason = "invalid" | "unconfigured" | "rate_limited" | "failed";
