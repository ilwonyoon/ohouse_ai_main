/**
 * API: Process consultation message
 * POST /api/consultation/process
 *
 * Processes user message, extracts metadata, and generates response
 */

import { NextRequest, NextResponse } from "next/server";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";
import { consultationEngine } from "@/api/consultationEngine";
import { ConsultationMessage, ExtractedMetadata } from "@/types/consultation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userMessage,
      consultationId,
      previousMetadata,
      currentPhase,
      messages = [],
    } = body;

    // Validation
    if (!userMessage || !consultationId) {
      return NextResponse.json(
        { error: "Missing required fields: userMessage, consultationId" },
        { status: 400 }
      );
    }

    // 1. Extract metadata from user message
    const extractedMetadata: ExtractedMetadata =
      await extractMetadataFromMessage(userMessage, previousMetadata);

    // 2. Process user response and detect conversion signals
    const processedResponse = await consultationEngine.processUserResponse(
      userMessage,
      extractedMetadata,
      currentPhase || "intent_detection"
    );

    // 3. Determine if we should transition to next phase
    const shouldTransition = consultationEngine.shouldMoveToNextPhase(
      extractedMetadata,
      currentPhase || "intent_detection"
    );

    // 4. Determine next phase
    let nextPhase = currentPhase || "intent_detection";
    if (shouldTransition || processedResponse.conversionSignal) {
      nextPhase = consultationEngine.determineNextPhase(
        extractedMetadata.projectScope?.type || "exploratory"
      );
    }

    // 5. Generate next assistant question/response
    const assistantResponse = await consultationEngine.generateNextQuestion(
      messages,
      extractedMetadata,
      nextPhase
    );

    return NextResponse.json({
      success: true,
      data: {
        extractedMetadata,
        assistantResponse,
        nextPhase,
        shouldTransition,
        conversionSignal: processedResponse.conversionSignal,
        questionsAsked: consultationEngine.questionsAsked,
      },
    });
  } catch (error) {
    console.error("Error processing consultation message:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
