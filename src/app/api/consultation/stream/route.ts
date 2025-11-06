/**
 * API: Stream consultation response from OpenAI
 * POST /api/consultation/stream
 *
 * Streams real-time AI-generated responses for the consultation chat
 * Returns Server-Sent Events (SSE) stream with text chunks as they're generated
 *
 * Request body:
 * {
 *   userMessage: string
 *   consultationId: string
 *   conversationHistory: Array<{role, content}> - Previous messages
 *   currentPhase: string - Current consultation phase
 *   previousMetadata: object - Previously extracted metadata
 * }
 *
 * Response format:
 * text/event-stream with format:
 * data: {"type": "chunk", "content": "text"}\n\n
 * data: {"type": "done", "metadata": {...}}\n\n
 * data: {"type": "error", "error": "message"}\n\n
 */

import { NextRequest, NextResponse } from "next/server";
import { streamOpenAIResponse } from "@/api/openaiStreaming";
import { generateSystemPrompt } from "@/api/openai";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";
import { consultationEngine } from "@/api/consultationEngine";
import type { ExtractedMetadata } from "@/types/consultation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userMessage,
      consultationId,
      conversationHistory = [],
      currentPhase = "intent_detection",
      previousMetadata = {},
    } = body;

    // ===== VALIDATION =====
    if (!userMessage || !consultationId) {
      return NextResponse.json(
        { error: "Missing required fields: userMessage, consultationId" },
        { status: 400 }
      );
    }

    // ===== CREATE READABLE STREAM =====
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Extract metadata from user message
          const extractedMetadata: ExtractedMetadata =
            await extractMetadataFromMessage(userMessage, previousMetadata);

          // Generate system prompt based on phase
          const systemPrompt = generateSystemPrompt(currentPhase);

          // Prepare messages for OpenAI
          const messages = [
            ...conversationHistory.map((msg: any) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user" as const,
              content: userMessage,
            },
          ];

          // Start streaming from OpenAI
          const textStream = streamOpenAIResponse(messages, systemPrompt);
          let fullResponse = "";

          for await (const chunk of textStream) {
            fullResponse += chunk;

            // Send chunk to client
            controller.enqueue(
              new TextEncoder().encode(
                `data: ${JSON.stringify({
                  type: "chunk",
                  content: chunk,
                })}\n\n`
              )
            );
          }

          // Detect phase transitions
          const shouldTransition = consultationEngine.shouldMoveToNextPhase(
            extractedMetadata,
            currentPhase
          );

          let nextPhase = currentPhase;
          if (shouldTransition) {
            nextPhase = consultationEngine.determineNextPhase(
              extractedMetadata.projectScope?.type || "exploratory"
            );
          }

          // Send completion with metadata
          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({
                type: "done",
                metadata: {
                  extractedMetadata,
                  nextPhase,
                  shouldTransition,
                  fullText: fullResponse,
                },
              })}\n\n`
            )
          );

          controller.close();
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error("Stream error:", error);

          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({
                type: "error",
                error: errorMessage,
              })}\n\n`
            )
          );

          controller.close();
        }
      },
    });

    // ===== RESPONSE =====
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in stream endpoint:", error);
    return NextResponse.json(
      {
        error: "Failed to start stream",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
