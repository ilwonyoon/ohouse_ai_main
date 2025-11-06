/**
 * API: Process consultation message
 * POST /api/consultation/process
 *
 * Task 2.A: API Route Updates - Phase parameter + conversion detection
 * Processes user message, extracts metadata, detects conversion signals, and manages phase transitions
 *
 * Request body:
 * {
 *   userMessage: string - User's message
 *   consultationId: string - Consultation session ID
 *   previousMetadata?: ExtractedMetadata - Previous state metadata
 *   currentPhase?: string - Current consultation phase
 *   messages?: ConsultationMessage[] - Previous conversation messages
 *   imageMetadata?: ImageMetadata - Optional image analysis data
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";
import { consultationEngine } from "@/api/consultationEngine";
import type { ExtractedMetadata } from "@/types/consultation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userMessage,
      consultationId,
      previousMetadata,
      currentPhase = "intent_detection",
      messages = [],
      imageMetadata,
    } = body;

    // ===== VALIDATION =====
    if (!userMessage || !consultationId) {
      return NextResponse.json(
        { error: "Missing required fields: userMessage, consultationId" },
        { status: 400 }
      );
    }

    // ===== STEP 1: Extract metadata from user message =====
    // 2.A.1: Enhanced metadata extraction with image support
    const extractedMetadata: ExtractedMetadata =
      await extractMetadataFromMessage(userMessage, previousMetadata);

    // Merge image metadata if provided (from Agent 1.3: ImageAnalyzer)
    if (imageMetadata) {
      extractedMetadata.imageMetadata = imageMetadata;
    }

    // ===== STEP 2: Process user response and detect signals =====
    // 2.A.3: Detect conversion signals in responses
    const processedResponse = await consultationEngine.processUserResponse(
      userMessage,
      extractedMetadata,
      currentPhase
    );

    // ===== STEP 3: Determine phase transition =====
    // 2.A.2: Pass phase parameter through API for proper sequencing
    const shouldTransition = consultationEngine.shouldMoveToNextPhase(
      extractedMetadata,
      currentPhase
    );

    // Calculate next phase based on conversion signals and transition criteria
    let nextPhase = currentPhase;
    let phaseReason = "No transition criteria met";

    if (processedResponse.conversionSignal) {
      // User showed conversion intent - move to scope clarification
      nextPhase = consultationEngine.determineNextPhase(
        extractedMetadata.projectScope?.type || "exploratory"
      );
      phaseReason = "Conversion signal detected";
    } else if (shouldTransition) {
      // Sufficient information collected for current phase - move forward
      nextPhase = consultationEngine.determineNextPhase(
        extractedMetadata.projectScope?.type || "exploratory"
      );
      phaseReason = "Phase requirements satisfied";
    }

    // ===== STEP 4: Generate next question =====
    const assistantResponse = await consultationEngine.generateNextQuestion(
      messages,
      extractedMetadata,
      nextPhase
    );

    // ===== RESPONSE =====
    return NextResponse.json({
      success: true,
      data: {
        // Phase management
        currentPhase,
        nextPhase,
        shouldTransition,
        phaseReason,

        // Metadata & signals
        extractedMetadata,
        conversionSignal: processedResponse.conversionSignal,

        // Response from agent
        assistantResponse,

        // Progress tracking
        questionsAsked: consultationEngine.questionsAsked,
        messageCount: messages.length + 1,
      },
    });
  } catch (error) {
    console.error("Error processing consultation message:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
