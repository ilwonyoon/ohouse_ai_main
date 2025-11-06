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

// ===== UTILITIES =====

/**
 * Split message into logical bubbles based on character count
 * Each bubble should be 150-300 characters for readability
 */
function splitMessageIntoBubbles(text: string): string[] {
  // Only split if message is longer than 200 characters
  if (text.length <= 200) {
    return [text];
  }

  // Split by sentence boundaries (., !, ?)
  const sentences = text.split(/(?<=[.!?])\s+/);
  const bubbles: string[] = [];
  let currentBubble = "";

  for (const sentence of sentences) {
    const combinedLength = (currentBubble ? currentBubble + " " : "") + sentence;

    // Start new bubble if combined text exceeds 150 characters
    if (combinedLength.length > 150 && currentBubble) {
      bubbles.push(currentBubble);
      currentBubble = sentence;
    } else {
      currentBubble = combinedLength.trimStart();
    }
  }

  // Add remaining text
  if (currentBubble) {
    bubbles.push(currentBubble);
  }

  return bubbles.length > 0 ? bubbles : [text];
}

/**
 * Calculate reading time delay for a message bubble
 * Based on ~200 words per minute reading speed
 * 1000 characters ≈ 200 words ≈ 60 seconds
 * So: charCount * 60ms / 1000 = charCount * 0.06ms
 * Round to: charCount * 50ms / 1000 = charCount * 0.05ms
 *
 * Appears 300ms BEFORE the user would finish reading
 */
function calculateMessageDelay(text: string, readingSpeedMs = 50): number {
  const charCount = text.length;
  const baseDuration = charCount * readingSpeedMs;
  // Appear 300ms before user finishes reading
  return Math.max(500, baseDuration - 300);
}

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

// ===== CONSTANTS =====

/**
 * Default greeting message for consultation
 * Sets expectations and context for the conversation
 */
const DEFAULT_GREETING = `Hi! 👋 I'm your AI interior design consultant.

Here's what we'll do together:
1. **Learn about your space** - Room size, layout, natural light, current furniture
2. **Understand your goals** - What look do you want? What problems are you solving?
3. **Explore your lifestyle** - How do you live in this space? Entertaining? Kids? WFH?
4. **Collect inspiration** - Colors, styles, materials you love
5. **Build your brief** - A detailed design roadmap for professional designers

**Let's start!** Tell me about the space you'd like to transform. 🏠`;

export interface ConsultationChatProps {
  userId: string;
  onBriefGenerated?: (brief: any) => void;
  initialMessage?: string;
}

export function ConsultationChat({
  userId,
  onBriefGenerated,
  initialMessage = DEFAULT_GREETING,
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
  const [pendingBubbles, setPendingBubbles] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const staggerTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Handle streaming completion - split message and prepare for staggered display
  useEffect(() => {
    if (!isStreaming && streamMetadata && streamingText) {
      try {
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

        // Split message into bubbles for staggered display
        const bubbles = splitMessageIntoBubbles(streamingText);
        setPendingBubbles(bubbles);

        // Clear loading state
        setIsLoading(false);

        // Reset streaming state
        resetStream();
      } catch (error) {
        console.error("Error handling stream completion:", error);
        setIsLoading(false);
      }
    }
  }, [
    isStreaming,
    streamMetadata,
    streamingText,
    currentPhase,
    mergeMetadata,
    updatePhase,
    updateUserType,
    updateCompletionStatus,
    resetStream,
    setIsLoading,
  ]);

  // Handle staggered message display
  useEffect(() => {
    // If we have pending bubbles, display them with staggered timing
    if (pendingBubbles.length > 0) {
      // Clear any existing timer
      if (staggerTimerRef.current) {
        clearTimeout(staggerTimerRef.current);
      }

      // Display first bubble immediately
      const firstBubble = pendingBubbles[0];
      addMessage("assistant", firstBubble);

      // Display remaining bubbles with delays
      if (pendingBubbles.length > 1) {
        let currentDelay = 0;

        for (let i = 1; i < pendingBubbles.length; i++) {
          const bubble = pendingBubbles[i];
          // Calculate delay based on the PREVIOUS bubble's reading time
          const previousBubble = pendingBubbles[i - 1];
          const readingDelay = calculateMessageDelay(previousBubble);
          currentDelay += readingDelay;

          // Schedule this bubble to be added
          staggerTimerRef.current = setTimeout(() => {
            addMessage("assistant", bubble);
          }, currentDelay);
        }
      }

      // Clear pending bubbles after scheduling all messages
      setPendingBubbles([]);
    }

    // Cleanup: clear timer on unmount
    return () => {
      if (staggerTimerRef.current) {
        clearTimeout(staggerTimerRef.current);
      }
    };
  }, [pendingBubbles, addMessage]);

  // Handle user message submission with streaming
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isStreaming || !context) return;

    const userMessageText = inputValue.trim();
    setInputValue("");

    try {
      // STEP 1: Add user message to state IMMEDIATELY
      // This fixes the disappearing message bug - user message must be added BEFORE streaming
      addMessage("user", userMessageText);

      // STEP 2: Set loading state to show indicator
      setIsLoading(true);
      setError(null);

      // STEP 3: Reset streaming state
      resetStream();

      // STEP 4: Start streaming response from OpenAI
      await startStream(
        userMessageText,
        context.id,
        messages.map((m) => ({ role: m.role, content: m.content })),
        currentPhase,
        metadata
      );

      // STEP 5: Clear loading state once streaming completes
      // (streaming completion is handled in the useEffect below)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setIsLoading(false);
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
    setIsLoading,
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

      {/* Token Usage Counter */}
      {tokensUsed > 0 && (
        <div style={tokenCounterStyle}>
          📊 Tokens: {tokensUsed} | Cost: ${estimatedCost.toFixed(3)}
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
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
