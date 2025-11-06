/**
 * Consultation Chat Component
 * Main UI for AI Interior Design Consultant Chatbot
 * Handles message display, user input, and state management with streaming responses
 *
 * Key Features:
 * - Real-time streaming responses from OpenAI
 * - Token usage tracking and display
 * - User message persistence (fixes disappearing message bug)
 * - Loading indicator during streaming
 */

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useConsultationState } from "@/hooks/useConsultationState";
import { useStreamingResponse } from "@/hooks/useStreamingResponse";
import { ConsultationMessage } from "@/types/consultation";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";

// ===== STYLES =====

const chatContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const messagesContainerStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const messageStyle = (role: "user" | "assistant"): React.CSSProperties => ({
  display: "flex",
  justifyContent: role === "user" ? "flex-end" : "flex-start",
  gap: "8px",
});

const messageBubbleStyle = (role: "user" | "assistant"): React.CSSProperties => ({
  maxWidth: "80%",
  padding: "12px 16px",
  borderRadius: "12px",
  backgroundColor: role === "user" ? "#0AA5FF" : "#F0F0F0",
  color: role === "user" ? "#FFFFFF" : "#2F3438",
  wordWrap: "break-word",
  fontSize: "14px",
  lineHeight: "1.4",
  marginLeft: role === "user" ? "auto" : "0",
});

const inputContainerStyle: React.CSSProperties = {
  padding: "16px",
  borderTop: "1px solid #E6E6E6",
  display: "flex",
  gap: "8px",
};

const inputFieldStyle: React.CSSProperties = {
  flex: 1,
  padding: "10px 14px",
  border: "1px solid #E6E6E6",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
};

const sendButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  backgroundColor: "#0aa5ff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const sendButtonHoverStyle: React.CSSProperties = {
  backgroundColor: "#0892d6",
};

const sendButtonDisabledStyle: React.CSSProperties = {
  backgroundColor: "#ccc",
  cursor: "not-allowed",
};

const headerStyle: React.CSSProperties = {
  padding: "16px",
  borderBottom: "1px solid #E6E6E6",
  backgroundColor: "#f9f9f9",
};

const headerTitleStyle: React.CSSProperties = {
  margin: "0",
  fontSize: "18px",
  fontWeight: "600",
  color: "#2f3438",
};

const headerSubtitleStyle: React.CSSProperties = {
  margin: "4px 0 0 0",
  fontSize: "12px",
  color: "#828c94",
};

const loadingIndicatorStyle: React.CSSProperties = {
  display: "flex",
  gap: "4px",
  padding: "12px 16px",
  backgroundColor: "#f0f0f0",
  borderRadius: "12px",
  width: "fit-content",
};

const loadingDotStyle: React.CSSProperties = {
  width: "8px",
  height: "8px",
  backgroundColor: "#999",
  borderRadius: "50%",
};

const tokenCounterStyle: React.CSSProperties = {
  position: "fixed",
  top: "16px",
  right: "16px",
  padding: "8px 12px",
  backgroundColor: "#f0f0f0",
  borderRadius: "6px",
  fontSize: "11px",
  color: "#2F3438",
  fontWeight: "500",
  border: "1px solid #E6E6E6",
  zIndex: 1000,
};

const streamingBubbleStyle: React.CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "transparent",
  color: "#2F3438",
  fontSize: "14px",
  lineHeight: "1.4",
  fontFamily: "inherit",
  maxWidth: "80%",
};

const streamingCursorStyle: React.CSSProperties = {
  display: "inline-block",
  width: "2px",
  height: "1em",
  backgroundColor: "#2F3438",
  marginLeft: "2px",
  animation: "blink 1s infinite",
};

// ===== COMPONENT =====

export interface ConsultationChatProps {
  userId: string;
  onBriefGenerated?: (brief: any) => void;
  initialMessage?: string;
}

export function ConsultationChat({
  userId,
  onBriefGenerated,
  initialMessage = "Hi! 👋 I'm your AI interior design consultant.\n\nHere's what we'll do together:\n1. **Learn about your space** - Room size, layout, natural light\n2. **Understand your goals** - What look do you want?\n3. **Explore your lifestyle** - How do you live in this space?\n4. **Collect inspiration** - Colors, styles, materials you love\n5. **Build your brief** - A detailed design roadmap\n\nLet's start! Tell me about the space you'd like to transform. 🏠",
}: ConsultationChatProps) {
  const {
    context,
    messages,
    metadata,
    currentPhase,
    userType,
    completionStatus,
    isLoading,
    error,
    initializeConsultation,
    addMessage,
    updatePhase,
    updateUserType,
    mergeMetadata,
    updateCompletionStatus,
    setIsLoading,
    setError,
  } = useConsultationState();

  const {
    text: streamingText,
    isStreaming,
    metadata: streamMetadata,
    error: streamError,
    startStream,
    reset: resetStream,
  } = useStreamingResponse();

  const [inputValue, setInputValue] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize consultation on mount
  useEffect(() => {
    if (!isInitialized && !context) {
      const newContext = initializeConsultation(userId);
      if (newContext) {
        // Add initial assistant message
        addMessage("assistant", initialMessage);
        setIsInitialized(true);
      }
    }
  }, [isInitialized, context, initializeConsultation, userId, initialMessage, addMessage]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText, isStreaming]);

  // Handle streaming completion - update state with metadata and add final message
  useEffect(() => {
    if (!isStreaming && streamMetadata && streamingText) {
      try {
        // Add the streamed response as assistant message
        addMessage("assistant", streamingText);

        // Update metadata from streaming response
        if (streamMetadata.extractedMetadata) {
          mergeMetadata(streamMetadata.extractedMetadata);
        }

        // Update phase if needed
        if (streamMetadata.nextPhase && streamMetadata.nextPhase !== currentPhase) {
          updatePhase(streamMetadata.nextPhase);

          if (streamMetadata.extractedMetadata?.projectScope?.type) {
            updateUserType(streamMetadata.extractedMetadata.projectScope.type);
          }
        }

        // Update token count (rough estimate: 1 token ≈ 4 characters)
        const estimatedTokens = Math.ceil(streamingText.length / 4);
        setTokensUsed((prev) => prev + estimatedTokens);
        // Estimate cost: GPT-4 Turbo is ~$0.01 per 1K tokens
        const cost = (estimatedTokens / 1000) * 0.01;
        setEstimatedCost((prev) => prev + cost);

        // Check if consultation is complete
        if (
          streamMetadata.nextPhase === "phase_8_synthesis" ||
          streamMetadata.nextPhase === "completed"
        ) {
          updateCompletionStatus("ready_for_style_profiler");
        }

        // Reset streaming state
        resetStream();
      } catch (error) {
        console.error("Error handling stream completion:", error);
      }
    }
  }, [
    isStreaming,
    streamMetadata,
    streamingText,
    currentPhase,
    addMessage,
    mergeMetadata,
    updatePhase,
    updateUserType,
    updateCompletionStatus,
    resetStream,
  ]);

  // Handle user message submission with streaming
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isStreaming || !context) return;

    const userMessageText = inputValue.trim();
    setInputValue("");

    try {
      // STEP 1: Add user message to state IMMEDIATELY
      // This fixes the disappearing message bug - user message must be added BEFORE streaming
      addMessage("user", userMessageText);

      // STEP 2: Reset streaming state
      resetStream();

      // STEP 3: Start streaming response from OpenAI
      await startStream(
        userMessageText,
        context.id,
        messages.map((m) => ({ role: m.role, content: m.content })),
        currentPhase,
        metadata
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      addMessage(
        "assistant",
        `Sorry, I encountered an error: ${errorMessage}. Please try again.`
      );
    }
  }, [
    inputValue,
    isStreaming,
    context,
    addMessage,
    resetStream,
    startStream,
    messages,
    currentPhase,
    metadata,
    setError,
  ]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!context) {
    return <div>Initializing consultation...</div>;
  }

  return (
    <div style={chatContainerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={headerTitleStyle}>Interior Design Consultant</h2>
        <p style={headerSubtitleStyle}>Let's discover the perfect design for your space</p>
      </div>

      {/* Messages */}
      <div style={messagesContainerStyle}>
        {messages.map((message: ConsultationMessage) => (
          <div key={message.id} style={messageStyle(message.role)}>
            <div style={messageBubbleStyle(message.role)}>
              {message.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div style={messageStyle("assistant")}>
            <div style={loadingIndicatorStyle}>
              <span style={{...loadingDotStyle, animation: "bounce 1.4s infinite"}}></span>
              <span style={{...loadingDotStyle, animation: "bounce 1.4s infinite 0.2s"}}></span>
              <span style={{...loadingDotStyle, animation: "bounce 1.4s infinite 0.4s"}}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#ffe5e5",
            color: "#cc0000",
            fontSize: "12px",
            borderBottom: "1px solid #E6E6E6",
          }}
        >
          {error}
        </div>
      )}

      {/* Input */}
      <div style={inputContainerStyle}>
        <input
          type="text"
          style={inputFieldStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading || completionStatus === "ready_for_style_profiler"}
        />
        <button
          style={{
            ...sendButtonStyle,
            ...(buttonHover ? sendButtonHoverStyle : {}),
            ...(isLoading || !inputValue.trim() || completionStatus === "ready_for_style_profiler" ? sendButtonDisabledStyle : {}),
          }}
          onClick={handleSendMessage}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          disabled={isLoading || !inputValue.trim() || completionStatus === "ready_for_style_profiler"}
        >
          Send
        </button>
      </div>

      {/* Completion message */}
      {completionStatus === "ready_for_style_profiler" && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#e5f2ff",
            color: "#0066cc",
            fontSize: "12px",
            borderTop: "1px solid #E6E6E6",
            textAlign: "center",
          }}
        >
          ✓ Consultation complete! Ready for Style Profiler
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scaleY(1);
          }
          40% {
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </div>
  );
}
