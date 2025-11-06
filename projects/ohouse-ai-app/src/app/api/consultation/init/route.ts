/**
 * API: Initialize consultation
 * POST /api/consultation/init
 *
 * Creates a new consultation session
 */

import { NextRequest, NextResponse } from "next/server";
import { ConsultationContext } from "@/types/consultation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, clientName } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required field: userId" },
        { status: 400 }
      );
    }

    // Create new consultation context
    const newContext: ConsultationContext = {
      id: `consultation_${Date.now()}`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
      phase: "intent_detection",
      userType: "exploratory",
      metadata: {
        confidence: 0,
        rawKeywords: [],
      },
      isActive: true,
      completionStatus: "not_started",
    };

    return NextResponse.json({
      success: true,
      data: newContext,
    });
  } catch (error) {
    console.error("Error initializing consultation:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize consultation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
