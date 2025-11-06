/**
 * Test API to verify OpenAI connection
 * GET /api/test
 */

import { NextResponse } from "next/server";
import { callOpenAI } from "@/api/openai";

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "OPENAI_API_KEY not configured",
          details: "Please add OPENAI_API_KEY to .env.local",
        },
        { status: 400 }
      );
    }

    // Test message
    const testMessages = [
      {
        role: "system" as const,
        content: "You are a helpful assistant. Respond briefly.",
      },
      {
        role: "user" as const,
        content: "Say 'Hello! OpenAI API is working correctly!' in exactly those words.",
      },
    ];

    const response = await callOpenAI(testMessages);

    return NextResponse.json({
      success: true,
      message: "OpenAI API connection successful!",
      apiKeyConfigured: true,
      apiKeyPrefix: apiKey.substring(0, 20) + "...",
      testResponse: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("OpenAI test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details:
          error instanceof Error
            ? error.toString()
            : "Failed to connect to OpenAI API",
      },
      { status: 500 }
    );
  }
}
