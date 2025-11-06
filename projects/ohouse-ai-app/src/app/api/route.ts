/**
 * API Routes for Consultation Management
 * Handles message processing, metadata extraction, and brief generation
 */

import { NextRequest, NextResponse } from "next/server";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";
import { consultationEngine } from "@/api/consultationEngine";
import { generateBrief } from "@/api/briefGenerator";
import { ExtractedMetadata, ConsultationMessage } from "@/types/consultation";

// ===== POST /api/consultation/process-message =====
/**
 * Process user message and generate response
 * Extracts metadata, generates next question, tracks conversation state
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userMessage,
      consultationId,
      previousMetadata,
      currentPhase,
      messages,
    } = body;

    if (!userMessage || !consultationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Extract metadata from user message
    const extractedMetadata = await extractMetadataFromMessage(
      userMessage,
      previousMetadata
    );

    // 2. Process user response and detect signals
    const processedResponse = await consultationEngine.processUserResponse(
      userMessage,
      extractedMetadata
    );

    // 3. Determine next phase and generate question
    const shouldTransition = consultationEngine.shouldMoveToNextPhase(
      extractedMetadata,
      currentPhase
    );

    const nextPhase = shouldTransition
      ? consultationEngine.determineNextPhase(
        extractedMetadata.projectScope?.type || "exploratory"
      )
      : currentPhase;

    const assistantResponse = await consultationEngine.generateNextQuestion(
      messages || [],
      extractedMetadata,
      nextPhase
    );

    return NextResponse.json({
      success: true,
      extractedMetadata,
      assistantResponse,
      nextPhase,
      shouldTransition,
      conversionSignal: processedResponse.conversionSignal,
    });
  } catch (error) {
    console.error("Error processing consultation message:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}

// ===== POST /api/consultation/generate-brief =====
/**
 * Generate consultation brief from collected metadata
 * Creates structured output for downstream AI agents (Style Profiler, Designer, etc.)
 */
export async function POST(request: NextRequest) {
  // Check if this is for brief generation
  const url = new URL(request.url);
  if (!url.pathname.includes("generate-brief")) {
    // Route to main handler above
    return POST(request);
  }

  try {
    const body = await request.json();
    const {
      consultationId,
      messages,
      metadata,
      userType,
      clientName,
    } = body;

    if (!consultationId || !metadata) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
      { error: "Failed to generate brief" },
      { status: 500 }
    );
  }
}
