/**
 * Style Quiz Component (Agent 1.4 - Task 1.4.3)
 * Interactive "this or that" style preference quiz
 *
 * Features:
 * - Binary image choice questions
 * - Progress tracking
 * - Response time recording
 * - Results display with style ranking
 * - Responsive design
 */

"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  StyleQuizQuestion,
  StyleQuizResponse,
  StyleQuizSession,
  StyleQuizResults,
} from "@/types/consultation";

// ===== TYPES =====

interface StyleQuizComponentProps {
  userId: string;
  questions: StyleQuizQuestion[];
  onQuizComplete?: (results: StyleQuizResults) => void;
  onCancel?: () => void;
}

interface QuizState {
  phase: "intro" | "quiz" | "results" | "loading";
  currentQuestionIndex: number;
  responses: StyleQuizResponse[];
  startTime: Date;
  questionStartTime: number; // for response time calculation
  results: StyleQuizResults | null;
  error: string | null;
}

// ===== STYLES =====

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "800px",
  margin: "0 auto",
  minHeight: "600px",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "16px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#2F3438",
  margin: "0 0 8px 0",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#828C94",
  margin: "0",
};

const introContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
};

const introTextStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#2F3438",
  textAlign: "center",
  maxWidth: "500px",
};

const progressBarStyle: React.CSSProperties = {
  width: "100%",
  height: "6px",
  backgroundColor: "#E6E6E6",
  borderRadius: "3px",
  overflow: "hidden",
  marginBottom: "16px",
};

const progressFillStyle = (percent: number): React.CSSProperties => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#0AA5FF",
  transition: "width 0.3s ease",
});

const progressTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#828C94",
  marginBottom: "16px",
};

const questionContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const questionTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2F3438",
  textAlign: "center",
};

const imagePairContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const imageChoiceStyle = (selected: boolean, hovering: boolean): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  cursor: "pointer",
  transition: "all 0.2s",
  opacity: hovering ? 0.8 : 1,
  transform: selected ? "scale(1.02)" : "scale(1)",
});

const imageContainerStyle = (selected: boolean, hovering: boolean): React.CSSProperties => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  border: selected ? "3px solid #0AA5FF" : hovering ? "2px solid #0AA5FF" : "2px solid #E6E6E6",
  aspectRatio: "4/3",
  backgroundColor: "#F9F9F9",
});

const placeholderImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundColor: "#E6E6E6",
};

const imageLabelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#2F3438",
  textAlign: "center",
};

const vsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: "700",
  color: "#828C94",
  padding: "0 8px",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
  justifyContent: "center",
};

const buttonStyle = (variant: "primary" | "secondary" | "disabled" = "primary"): React.CSSProperties => ({
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  minWidth: "120px",
  ...(variant === "primary" && {
    backgroundColor: "#0AA5FF",
    color: "#ffffff",
  }),
  ...(variant === "secondary" && {
    backgroundColor: "#F0F0F0",
    color: "#2F3438",
    border: "1px solid #E6E6E6",
  }),
  ...(variant === "disabled" && {
    backgroundColor: "#E6E6E6",
    color: "#828C94",
    cursor: "not-allowed",
  }),
});

const resultsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const resultSectionStyle: React.CSSProperties = {
  padding: "16px",
  backgroundColor: "#F9F9F9",
  borderRadius: "8px",
  border: "1px solid #E6E6E6",
};

const primaryStyleBoxStyle: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#E6F3FF",
  borderRadius: "8px",
  border: "2px solid #0AA5FF",
  textAlign: "center",
};

const primaryStyleNameStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#0AA5FF",
  margin: "0 0 8px 0",
};

const primaryStyleDescStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#2F3438",
  lineHeight: "1.5",
};

const styleRankingItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingBottom: "12px",
  borderBottom: "1px solid #E6E6E6",
};

const rankingLabelStyle: React.CSSProperties = {
  flex: 1,
  fontSize: "14px",
  fontWeight: "500",
  color: "#2F3438",
};

const rankingBarStyle: React.CSSProperties = {
  flex: 2,
  height: "8px",
  backgroundColor: "#E6E6E6",
  borderRadius: "4px",
  overflow: "hidden",
};

const rankingFillStyle = (percentage: number): React.CSSProperties => ({
  height: "100%",
  width: `${percentage}%`,
  backgroundColor: "#0AA5FF",
});

const percentageStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#828C94",
  minWidth: "40px",
  textAlign: "right",
};

const insightsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const insightItemStyle: React.CSSProperties = {
  padding: "12px",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  border: "1px solid #E6E6E6",
};

const insightLabelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#828C94",
  textTransform: "uppercase",
  marginBottom: "4px",
};

const insightValueStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#2F3438",
};

const profileBoxStyle: React.CSSProperties = {
  padding: "16px",
  backgroundColor: "#F9F9F9",
  borderRadius: "8px",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#2F3438",
  fontStyle: "italic",
};

const errorStyle: React.CSSProperties = {
  padding: "12px",
  backgroundColor: "#FFE6E6",
  border: "1px solid #FFB3B3",
  borderRadius: "8px",
  color: "#D9534F",
  fontSize: "14px",
};

// ===== COMPONENT =====

export function StyleQuizComponent({
  userId,
  questions,
  onQuizComplete,
  onCancel,
}: StyleQuizComponentProps) {
  const [state, setState] = useState<QuizState>({
    phase: "intro",
    currentQuestionIndex: 0,
    responses: [],
    startTime: new Date(),
    questionStartTime: Date.now(),
    results: null,
    error: null,
  });

  const [hoveringImage, setHoveringImage] = useState<"imageA" | "imageB" | null>(null);

  const currentQuestion =
    state.currentQuestionIndex < questions.length
      ? questions[state.currentQuestionIndex]
      : null;

  const progressPercent = ((state.currentQuestionIndex + 1) / questions.length) * 100;

  // ===== HANDLERS =====

  const handleStartQuiz = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "quiz",
      startTime: new Date(),
      questionStartTime: Date.now(),
    }));
  }, []);

  const handleImageChoice = useCallback(
    (chosenImageId: "imageA" | "imageB") => {
      if (!currentQuestion) return;

      const responseTime = Date.now() - state.questionStartTime;
      const newResponse: StyleQuizResponse = {
        questionId: currentQuestion.id,
        chosenImageId,
        responseTime,
        timestamp: new Date(),
      };

      const newResponses = [...state.responses, newResponse];

      // Check if quiz complete
      const isLastQuestion = state.currentQuestionIndex === questions.length - 1;

      if (isLastQuestion) {
        // Calculate results
        calculateAndSetResults(newResponses);
      } else {
        // Move to next question
        setState((prev) => ({
          ...prev,
          responses: newResponses,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          questionStartTime: Date.now(),
        }));
      }
    },
    [currentQuestion, state.questionStartTime, state.responses, questions.length]
  );

  const calculateAndSetResults = (responses: StyleQuizResponse) => {
    // This will call the scoreCalculator in Task 1.4.4
    // For now, create a placeholder result
    const placeholderResults: StyleQuizResults = {
      sessionId: `session_${Date.now()}`,
      userId,
      completedAt: new Date(),
      primaryStyle: {
        style: "modern",
        score: 85,
        confidence: 0.88,
      },
      styleRanking: [
        { style: "modern", score: 85, confidence: 0.88 },
        { style: "contemporary", score: 72, confidence: 0.82 },
        { style: "minimalist", score: 68, confidence: 0.75 },
      ],
      insights: {
        colorPreference: "warm",
        colorBoldness: "neutral",
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
        "You prefer clean, contemporary designs with warm tones and natural materials. Your style leans minimalist but comfortable, valuing both aesthetics and functionality.",
      extractedMetadata: {
        style: {
          style_hints: ["modern", "contemporary", "minimalist"],
          color_preferences: ["warm", "neutral"],
          formality_level: "casual",
        },
      },
    };

    setState((prev) => ({
      ...prev,
      phase: "results",
      results: placeholderResults,
    }));

    onQuizComplete?.(placeholderResults);
  };

  const handleRetakeQuiz = useCallback(() => {
    setState({
      phase: "intro",
      currentQuestionIndex: 0,
      responses: [],
      startTime: new Date(),
      questionStartTime: Date.now(),
      results: null,
      error: null,
    });
  }, []);

  // ===== RENDER =====

  return (
    <div style={containerStyle}>
      {/* INTRO PHASE */}
      {state.phase === "intro" && (
        <>
          <div style={headerStyle}>
            <h2 style={titleStyle}>✨ Discover Your Style</h2>
            <p style={subtitleStyle}>Let's find your design aesthetic</p>
          </div>

          <div style={introContainerStyle}>
            <div style={introTextStyle}>
              <p>
                We'll show you pairs of room designs. Choose the one that appeals to you more.
              </p>
              <p>
                Based on your choices, we'll identify your primary design style and create a
                personalized style profile.
              </p>
              <p style={{ fontSize: "12px", color: "#828C94" }}>
                ~5-8 minutes • {questions.length} questions
              </p>
            </div>

            <div style={buttonGroupStyle}>
              <button style={buttonStyle("primary")} onClick={handleStartQuiz}>
                Start Quiz
              </button>
              {onCancel && (
                <button style={buttonStyle("secondary")} onClick={onCancel}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* QUIZ PHASE */}
      {state.phase === "quiz" && currentQuestion && (
        <>
          <div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle(progressPercent)} />
            </div>
            <p style={progressTextStyle}>
              Question {state.currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div style={questionContainerStyle}>
            <h3 style={questionTitleStyle}>{currentQuestion.question}</h3>

            {currentQuestion.description && (
              <p
                style={{
                  fontSize: "14px",
                  color: "#828C94",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                {currentQuestion.description}
              </p>
            )}

            {/* Image Pair */}
            <div style={imagePairContainerStyle}>
              {/* Image A */}
              <div
                style={imageChoiceStyle(
                  false,
                  hoveringImage === "imageA"
                )}
                onMouseEnter={() => setHoveringImage("imageA")}
                onMouseLeave={() => setHoveringImage(null)}
                onClick={() => handleImageChoice("imageA")}
              >
                <div
                  style={imageContainerStyle(
                    false,
                    hoveringImage === "imageA"
                  )}
                >
                  <div
                    style={{
                      ...placeholderImageStyle,
                      backgroundColor: "#E0E0E0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                    }}
                  >
                    🖼️
                  </div>
                </div>
                <div style={imageLabelStyle}>{currentQuestion.imageA.description}</div>
              </div>

              {/* Image B */}
              <div
                style={imageChoiceStyle(
                  false,
                  hoveringImage === "imageB"
                )}
                onMouseEnter={() => setHoveringImage("imageB")}
                onMouseLeave={() => setHoveringImage(null)}
                onClick={() => handleImageChoice("imageB")}
              >
                <div
                  style={imageContainerStyle(
                    false,
                    hoveringImage === "imageB"
                  )}
                >
                  <div
                    style={{
                      ...placeholderImageStyle,
                      backgroundColor: "#D0D0D0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                    }}
                  >
                    🖼️
                  </div>
                </div>
                <div style={imageLabelStyle}>{currentQuestion.imageB.description}</div>
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#828C94" }}>
            Choose the design you prefer to continue
          </p>
        </>
      )}

      {/* RESULTS PHASE */}
      {state.phase === "results" && state.results && (
        <>
          <div style={headerStyle}>
            <h2 style={titleStyle}>Your Design Style</h2>
            <p style={subtitleStyle}>Based on your {questions.length} responses</p>
          </div>

          <div style={resultsContainerStyle}>
            {/* Primary Style */}
            <div style={primaryStyleBoxStyle}>
              <h3 style={primaryStyleNameStyle}>
                {state.results.primaryStyle.style.replace(/_/g, " ")}
              </h3>
              <p style={primaryStyleDescStyle}>{state.results.profile}</p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#0AA5FF",
                  margin: "12px 0 0 0",
                }}
              >
                Confidence: {(state.results.primaryStyle.confidence * 100).toFixed(0)}%
              </p>
            </div>

            {/* Style Ranking */}
            <div style={resultSectionStyle}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2F3438",
                  margin: "0 0 12px 0",
                }}
              >
                Your Style Preferences
              </h4>
              {state.results.styleRanking.slice(0, 5).map((pref, index) => (
                <div key={index} style={styleRankingItemStyle}>
                  <div style={rankingLabelStyle}>
                    {index + 1}. {pref.style.replace(/_/g, " ")}
                  </div>
                  <div style={rankingBarStyle}>
                    <div style={rankingFillStyle(pref.score)} />
                  </div>
                  <div style={percentageStyle}>{pref.score}%</div>
                </div>
              ))}
            </div>

            {/* Insights */}
            <div style={resultSectionStyle}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2F3438",
                  margin: "0 0 12px 0",
                }}
              >
                Your Design Preferences
              </h4>
              <div style={insightsGridStyle}>
                <div style={insightItemStyle}>
                  <div style={insightLabelStyle}>Color</div>
                  <div style={insightValueStyle}>
                    {state.results.insights.colorPreference}
                  </div>
                </div>
                <div style={insightItemStyle}>
                  <div style={insightLabelStyle}>Formality</div>
                  <div style={insightValueStyle}>{state.results.insights.formality}</div>
                </div>
                <div style={insightItemStyle}>
                  <div style={insightLabelStyle}>Patterns</div>
                  <div style={insightValueStyle}>{state.results.insights.patterns}</div>
                </div>
                <div style={insightItemStyle}>
                  <div style={insightLabelStyle}>Ornamentation</div>
                  <div style={insightValueStyle}>
                    {state.results.insights.ornamentation}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div style={resultSectionStyle}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2F3438",
                  margin: "0 0 12px 0",
                }}
              >
                Your Design Profile
              </h4>
              <p style={profileBoxStyle}>"{state.results.profile}"</p>
            </div>
          </div>

          {/* Actions */}
          <div style={buttonGroupStyle}>
            <button style={buttonStyle("primary")} onClick={handleRetakeQuiz}>
              Retake Quiz
            </button>
            {onCancel && (
              <button style={buttonStyle("secondary")} onClick={onCancel}>
                Done
              </button>
            )}
          </div>
        </>
      )}

      {/* ERROR STATE */}
      {state.error && <div style={errorStyle}>{state.error}</div>}
    </div>
  );
}
