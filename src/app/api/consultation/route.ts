/**
 * API Routes for Consultation Management
 * Handles message processing, metadata extraction, and brief generation
 */

import { NextRequest, NextResponse } from "next/server";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";
import { consultationEngine } from "@/api/consultationEngine";
import { generateBrief } from "@/api/briefGenerator";
import type { ExtractedMetadata } from "@/types/consultation";

// ===== POST /api/consultation/process-message =====
/**
 * Process user message and generate response
 * Task 2.A: Extracts metadata, detects conversion signals, manages phase transitions
 *
 * Request body:
 * {
 *   userMessage: string
 *   consultationId: string
 *   previousMetadata?: ExtractedMetadata
 *   currentPhase?: string
 *   messages?: ConsultationMessage[]
 *   imageMetadata?: ImageMetadata
 * }
 */
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

    // Check if this is a brief generation request
    const url = new URL(request.url);
    if (url.pathname.includes("generate-brief")) {
      // Route to brief generation handler below
      return generateBriefHandler(request);
    }

    // ===== STEP 1: Extract metadata =====
    // 2.A.1: Enhanced metadata extraction
    const extractedMetadata: ExtractedMetadata =
      await extractMetadataFromMessage(userMessage, previousMetadata);

    // Merge image metadata if provided (from Agent 1.3: ImageAnalyzer)
    if (imageMetadata) {
      extractedMetadata.imageMetadata = imageMetadata;
    }

    // ===== STEP 2: Process response and detect signals =====
    // 2.A.3: Detect conversion signals
    const processedResponse = await consultationEngine.processUserResponse(
      userMessage,
      extractedMetadata,
      currentPhase
    );

    // ===== STEP 3: Determine phase transition =====
    // 2.A.2: Pass phase parameter through API
    const shouldTransition = consultationEngine.shouldMoveToNextPhase(
      extractedMetadata,
      currentPhase
    );

    let nextPhase = currentPhase;
    let phaseReason = "No transition criteria met";

    if (processedResponse.conversionSignal) {
      nextPhase = consultationEngine.determineNextPhase(
        extractedMetadata.projectScope?.type || "exploratory"
      );
      phaseReason = "Conversion signal detected";
    } else if (shouldTransition) {
      nextPhase = consultationEngine.determineNextPhase(
        extractedMetadata.projectScope?.type || "exploratory"
      );
      phaseReason = "Phase requirements satisfied";
    }

    // ===== STEP 4: Generate response =====
    const assistantResponse = await consultationEngine.generateNextQuestion(
      messages,
      extractedMetadata,
      nextPhase
    );

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

        // Response
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

// ===== Handler for brief generation =====
async function generateBriefHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const { consultationId, messages, metadata, userType, clientName } = body;

    if (!consultationId || !metadata) {
      return NextResponse.json(
        { error: "Missing required fields: consultationId, metadata" },
        { status: 400 }
      );
    }

    // Generate brief
    const brief = generateBrief(
      consultationId,
      messages || [],
      metadata,
      userType || "exploratory",
      clientName
    );

    return NextResponse.json({
      success: true,
      brief,
      briefJSON: JSON.stringify(brief, null, 2),
    });
  } catch (error) {
    console.error("Error generating brief:", error);
    return NextResponse.json(
      {
        error: "Failed to generate brief",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
