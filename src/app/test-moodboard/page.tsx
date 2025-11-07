/**
 * Test Moodboard Page
 * Quick way to test Agent 1.5 VisionBuilderAgent on the web
 *
 * Navigate to: http://localhost:3000/test-moodboard
 */

"use client";

import React, { useState } from "react";
import MoodboardDisplay from "@/components/MoodboardDisplay";
import { Moodboard, StyleQuizResults } from "@/types/consultation";

// ===== MOCK DATA =====

/**
 * Mock style quiz results for testing
 * Simulates user completing the style quiz
 */
const MOCK_STYLE_QUIZ_RESULTS: StyleQuizResults = {
  sessionId: "test-session-123",
  userId: "test-user-1",
  completedAt: new Date(),

  primaryStyle: "modern",

  styleRanking: [
    {
      style: "modern",
      score: 92,
      confidence: 0.95,
      percentage: 92,
    },
    {
      style: "minimalist",
      score: 78,
      confidence: 0.88,
      percentage: 78,
    },
    {
      style: "scandinavian",
      score: 65,
      confidence: 0.82,
      percentage: 65,
    },
  ],

  insights: {
    colorPreference: "cool",
    colorBoldness: "balanced",
    formality: "casual",
    patterns: "minimal",
    ornamentation: "minimal",
    materials: {
      natural: 40,
      synthetic: 35,
      mixed: 25,
    },
  },

  profile:
    "You have a strong preference for modern design with minimalist touches. You value clean lines, functionality, and a clutter-free environment.",

  extractedMetadata: {
    style: {
      primary: "modern",
      secondary: ["minimalist"],
    },
  },
};

/**
 * Mock moodboard data for testing UI
 * Shows what the output will look like
 */
const MOCK_MOODBOARD: Moodboard = {
  id: "moodboard-test-1",
  userId: "test-user-1",
  roomType: "living_room",
  createdAt: new Date(),

  title: "Modern Minimalist Living Room",
  description: "A clean, sophisticated space with contemporary design elements",
  concept:
    "Transform your living room into a serene, functional space that balances modern aesthetics with comfort. This design emphasizes open space, natural light, and carefully curated furnishings.",

  primaryStyle: "modern",
  secondaryStyles: ["minimalist"],
  styleNarrative:
    "Modern minimalism prioritizes function over form while maintaining aesthetic appeal. This approach removes visual clutter and focuses on essential elements with clean lines and neutral tones.",

  colorPalette: {
    primary: {
      hex: "#F5F5F5",
      name: "Off-White",
      usage: "walls",
    },
    secondary: [
      {
        hex: "#2C2C2C",
        name: "Charcoal",
        usage: "furniture",
      },
      {
        hex: "#A0A0A0",
        name: "Light Gray",
        usage: "accents",
      },
    ],
    accents: [
      {
        hex: "#0AA5FF",
        name: "Blue",
        mood: "energetic",
      },
    ],
    mood: "cool",
    boldness: "subtle",
  },

  designElements: [
    {
      type: "furniture",
      name: "Sectional Sofa",
      description: "Low-profile gray sectional with clean lines",
      style: "modern",
      mood: "comfortable",
      estimatedBudget: 1200,
    },
    {
      type: "lighting",
      name: "Pendant Lights",
      description: "Minimalist pendant lights in matte black",
      mood: "ambient",
      estimatedBudget: 300,
    },
    {
      type: "textiles",
      name: "Area Rug",
      description: "Light gray wool area rug",
      mood: "cozy",
      estimatedBudget: 400,
    },
  ],

  moodboardImages: [
    {
      id: "img-1",
      url: "https://via.placeholder.com/1024x1024?text=Modern+Living+Room+1",
      description: "Full room view with sectional and minimalist decor",
      style: "modern",
      dominantColors: ["#F5F5F5", "#2C2C2C"],
      designElements: [],
      visualMood: "serene",
      confidence: 0.95,
      source: "generated",
    },
    {
      id: "img-2",
      url: "https://via.placeholder.com/1024x1024?text=Modern+Living+Room+2",
      description: "Seating area with accent lighting",
      style: "modern",
      dominantColors: ["#F5F5F5", "#A0A0A0"],
      designElements: [],
      visualMood: "sophisticated",
      confidence: 0.92,
      source: "generated",
    },
    {
      id: "img-3",
      url: "https://via.placeholder.com/1024x1024?text=Modern+Living+Room+3",
      description: "Color palette and texture details",
      style: "modern",
      dominantColors: ["#0AA5FF", "#2C2C2C"],
      designElements: [],
      visualMood: "modern",
      confidence: 0.88,
      source: "generated",
    },
  ],

  mood: "serene",
  atmosphere: "A tranquil, organized space that feels open and calm while maintaining warmth through carefully selected furnishings and subtle blue accents.",
  basedOnUserPreferences: MOCK_STYLE_QUIZ_RESULTS,

  generationMethod: "ai_generated",
  aiModel: "dall-e-3",

  recommendations: {
    furniture: ["Low-profile gray sectional", "Minimalist coffee table"],
    lighting: ["Pendant lights in matte black", "Floor lamp with dimmer"],
    textiles: ["Light gray wool rug", "White throw pillows"],
    color_accents: ["Blue throw blanket", "Artwork with blue tones"],
    materials: ["Natural wood accents", "Matte finishes"],
  },

  estimatedBudgetRange: {
    min: 3000,
    max: 5000,
    currency: "USD",
    breakdown: {
      furniture: 1500,
      lighting: 400,
      textiles: 600,
      decor: 400,
      paint_and_walls: 200,
    },
  },
};

// ===== STYLES =====

const pageContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#F9F9F9",
  padding: "20px",
};

const pageHeaderStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto 40px",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: "#2F3438",
  marginBottom: "8px",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#828C94",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const buttonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: 500,
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: isActive ? "#0AA5FF" : "#E6E6E6",
  color: isActive ? "#FFFFFF" : "#2F3438",
  transition: "all 0.2s",
});

const loadingStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  fontSize: "18px",
  color: "#828C94",
};

const moodboardContainerStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const infoBoxStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto 20px",
  padding: "16px",
  backgroundColor: "#E8F4FD",
  border: "1px solid #0AA5FF",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#2F3438",
};

// ===== COMPONENT =====

export default function TestMoodboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [moodboard, setMoodboard] = useState<Moodboard | null>(MOCK_MOODBOARD);
  const [activeTab, setActiveTab] = useState<"mock" | "real">("mock");

  /**
   * Generate moodboard with mock data
   * Shows what the real implementation will do
   */
  const handleGenerateMockMoodboard = async () => {
    setIsLoading(true);
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMoodboard(MOCK_MOODBOARD);
    setIsLoading(false);
  };

  /**
   * Generate moodboard with real API
   * Calls the actual VisionBuilderAgent
   * (Will be implemented in next phase)
   */
  const handleGenerateRealMoodboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/moodboard/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "test-user-1",
          roomType: "living_room",
          stylePreferences: MOCK_STYLE_QUIZ_RESULTS,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate moodboard");
      }

      const data = await response.json();
      setMoodboard(data.moodboard);
    } catch (error) {
      console.error("Error generating moodboard:", error);
      alert(
        "Error generating moodboard. Make sure the API endpoint is implemented."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user rating
   */
  const handleRate = (rating: number) => {
    if (moodboard) {
      setMoodboard({
        ...moodboard,
        userRating: rating,
      });
      console.log(`Moodboard rated: ${rating}/5 stars`);
    }
  };

  /**
   * Handle download
   */
  const handleDownload = () => {
    console.log("Download moodboard as PDF");
    alert("Download functionality would be implemented in the next phase");
  };

  return (
    <div style={pageContainerStyle}>
      {/* Header */}
      <div style={pageHeaderStyle}>
        <h1 style={titleStyle}>🎨 Test Moodboard Generator</h1>
        <p style={subtitleStyle}>Agent 1.5: VisionBuilderAgent Test Interface</p>
      </div>

      {/* Info Box */}
      <div style={infoBoxStyle}>
        <strong>How to use:</strong> Click "Generate Mock Moodboard" to see the UI with
        sample data. Click "Generate Real Moodboard" to test the actual API
        (requires implementation of /api/moodboard/generate endpoint).
      </div>

      {/* Action Buttons */}
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle(activeTab === "mock")}
          onClick={() => {
            setActiveTab("mock");
            handleGenerateMockMoodboard();
          }}
        >
          📸 Generate Mock Moodboard (Test UI)
        </button>
        <button
          style={buttonStyle(activeTab === "real")}
          onClick={() => {
            setActiveTab("real");
            handleGenerateRealMoodboard();
          }}
        >
          🚀 Generate Real Moodboard (API)
        </button>
      </div>

      {/* Content */}
      <div style={moodboardContainerStyle}>
        {isLoading ? (
          <div style={loadingStyle}>
            ⏳ Generating moodboard images with DALL-E 3... (this may take 30-60 seconds)
          </div>
        ) : moodboard ? (
          <MoodboardDisplay
            moodboard={moodboard}
            onRate={handleRate}
            onDownload={handleDownload}
          />
        ) : (
          <div style={loadingStyle}>Click a button above to generate a moodboard</div>
        )}
      </div>
    </div>
  );
}
