/**
 * API: Generate consultation brief
 * POST /api/consultation/brief
 *
 * Generates final consultation brief from collected metadata
 * Output ready for Style Profiler, Designer, and other downstream agents
 */

import { NextRequest, NextResponse } from "next/server";
import { generateBrief } from "@/api/briefGenerator";
import { BriefGenerator } from "@/api/briefGenerator";
import { ExtractedMetadata, ConsultationMessage, ProjectScopeType } from "@/types/consultation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      consultationId,
      messages = [],
      metadata,
      userType = "exploratory",
      clientName,
    } = body;

    // Validation
    if (!consultationId || !metadata) {
      return NextResponse.json(
        { error: "Missing required fields: consultationId, metadata" },
        { status: 400 }
      );
    }

    // Generate brief
    const brief = generateBrief(
      consultationId,
      messages as ConsultationMessage[],
      metadata as ExtractedMetadata,
      userType as ProjectScopeType,
      clientName
    );

    // Generate formatted text version
    const briefText = BriefGenerator.exportBriefText(brief);

    return NextResponse.json({
      success: true,
      data: {
        brief,
        briefType: brief.briefType,
        summary: brief.executiveSummary,
        missingInformation: brief.missingInformation,
        redFlags: brief.redFlags,
        specialConsiderations: brief.specialConsiderations,
      },
      // Also include raw JSON for API consumers
      json: brief,
      // Text format for display
      text: briefText,
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
