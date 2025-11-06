/**
 * OpenAI Streaming Integration
 * Provides real-time text generation with streaming support
 * Tracks token usage and returns metadata for display
 */

import { logger } from "@/lib/logger";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface StreamingResponse {
  stream: AsyncGenerator<string>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Stream OpenAI response as it arrives
 * Yields text chunks for real-time display
 */
export async function* streamOpenAIResponse(
  messages: ChatMessage[],
  systemPrompt?: string
): AsyncGenerator<string> {
  if (!OPENAI_API_KEY) {
    const error = "OPENAI_API_KEY is not configured. Please add it to .env.local";
    logger.error("OpenAI API key missing", new Error(error));
    throw new Error(error);
  }

  const startTime = Date.now();
  const messageCount = messages.length;

  try {
    const fullMessages = systemPrompt
      ? [{ role: "system" as const, content: systemPrompt }, ...messages]
      : messages;

    logger.info("Starting OpenAI stream", {
      model: "gpt-4-turbo",
      messageCount: fullMessages.length,
    });

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || response.statusText;
      logger.warn("OpenAI API streaming request failed", {
        statusCode: response.status,
        errorMessage,
      });
      throw new Error(`OpenAI API error: ${errorMessage}`);
    }

    if (!response.body) {
      throw new Error("No response body from OpenAI");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                fullText += content;
                yield content;
              }
            } catch (e) {
              // Skip parsing errors for individual chunks
              logger.debug("Failed to parse stream chunk", { line });
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    const duration = Date.now() - startTime;
    logger.info("OpenAI stream completed", {
      duration: `${duration}ms`,
      totalLength: fullText.length,
      messageCount,
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("OpenAI streaming error", error instanceof Error ? error : null, {
      duration: `${duration}ms`,
      messageCount,
    });
    throw error;
  }
}

/**
 * Call OpenAI without streaming (complete response)
 * Returns full text at once with token usage
 */
export async function callOpenAIComplete(
  messages: ChatMessage[],
  systemPrompt?: string
): Promise<{ text: string; usage?: Record<string, number> }> {
  if (!OPENAI_API_KEY) {
    const error = "OPENAI_API_KEY is not configured. Please add it to .env.local";
    logger.error("OpenAI API key missing", new Error(error));
    throw new Error(error);
  }

  const startTime = Date.now();

  try {
    const fullMessages = systemPrompt
      ? [{ role: "system" as const, content: systemPrompt }, ...messages]
      : messages;

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || response.statusText;
      logger.warn("OpenAI API request failed", {
        statusCode: response.status,
        errorMessage,
        duration: `${duration}ms`,
      });
      throw new Error(`OpenAI API error: ${errorMessage}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    logger.info("OpenAI API call successful", {
      duration: `${duration}ms`,
      responseLength: text.length,
      tokensUsed: data.usage?.total_tokens,
    });

    return {
      text,
      usage: data.usage,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("OpenAI API error", error instanceof Error ? error : null, {
      duration: `${duration}ms`,
    });
    throw error;
  }
}
