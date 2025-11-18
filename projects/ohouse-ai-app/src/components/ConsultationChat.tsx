/**
 * Consultation Chat Component
 * Main UI for AI Interior Design Consultant Chatbot
 * Handles message display, user input, and state management
 * Integrates with OpenAI API for sophisticated responses
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { PrimitiveTokens, SemanticTokens } from "@/tokens";
import { useConsultationState } from "@/hooks/useConsultationState";
import { ConsultationMessage } from "@/types/consultation";

// ===== STYLES =====

const chatContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${SemanticTokens.Color.Background.DEFAULT};
  overflow: hidden;
`;

const messagesContainerStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  display: flex;
  flex-direction: column;
  gap: ${PrimitiveTokens.Spacing.MEDIUM_SMALL};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${SemanticTokens.Color.Border.DEFAULT};
    border-radius: ${PrimitiveTokens.BorderRadius.TIGHT};
  }
`;

const messageStyle = (role: "user" | "assistant") => css`
  display: flex;
  justify-content: ${role === "user" ? "flex-end" : "flex-start"};
  gap: ${PrimitiveTokens.Spacing.SMALL};
`;

const messageBubbleStyle = (role: "user" | "assistant") => css`
  max-width: 85%;
  padding: ${PrimitiveTokens.Spacing.MEDIUM_SMALL} ${PrimitiveTokens.Spacing.MEDIUM};
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  background-color: ${role === "user"
    ? SemanticTokens.Color.Foreground.BRAND
    : "#F5F5F5"};
  color: ${role === "user"
    ? SemanticTokens.Color.Foreground.INVERSE
    : SemanticTokens.Color.Foreground.DEFAULT};
  word-wrap: break-word;
  font-size: ${PrimitiveTokens.Typography.FontSize.MD};
  line-height: ${PrimitiveTokens.Typography.LineHeight.MEDIUM};
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
  font-weight: ${PrimitiveTokens.Typography.FontWeight.REGULAR};

  /* User messages align right, assistant align left */
  margin-left: ${role === "user" ? "auto" : "0"};
`;

const inputContainerStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  border-top: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  display: flex;
  gap: ${PrimitiveTokens.Spacing.SMALL};
  background-color: ${SemanticTokens.Color.Background.DEFAULT};
`;

const inputFieldStyle = css`
  flex: 1;
  padding: ${PrimitiveTokens.Spacing.EXTRA_SMALL} ${PrimitiveTokens.Spacing.SMALL};
  border: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  border-radius: ${PrimitiveTokens.BorderRadius.TIGHT};
  font-size: ${PrimitiveTokens.Typography.FontSize.MD};
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${SemanticTokens.Color.Foreground.BRAND};
    box-shadow: 0 0 0 2px rgba(10, 165, 255, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: ${SemanticTokens.Color.Foreground.SECONDARY};
  }
`;

const sendButtonStyle = css`
  padding: ${PrimitiveTokens.Spacing.EXTRA_SMALL} ${PrimitiveTokens.Spacing.MEDIUM};
  background-color: ${SemanticTokens.Color.Foreground.BRAND};
  color: ${SemanticTokens.Color.Foreground.INVERSE};
  border: none;
  border-radius: ${PrimitiveTokens.BorderRadius.TIGHT};
  font-size: ${PrimitiveTokens.Typography.FontSize.MD};
  font-weight: ${PrimitiveTokens.Typography.FontWeight.MEDIUM};
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #0892d6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(10, 165, 255, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${SemanticTokens.Color.Border.DEFAULT};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const loadingIndicatorStyle = css`
  display: flex;
  gap: ${PrimitiveTokens.Spacing.EXTRA_SMALL};
  padding: ${PrimitiveTokens.Spacing.MEDIUM_SMALL} ${PrimitiveTokens.Spacing.MEDIUM};
  background-color: #f5f5f5;
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  width: fit-content;

  span {
    width: 8px;
    height: 8px;
    background-color: ${SemanticTokens.Color.Foreground.SECONDARY};
    border-radius: 50%;
    animation: bounce 1.4s infinite;

    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scaleY(1);
    }
    40% {
      transform: scaleY(1.5);
    }
  }
`;

const headerStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  border-bottom: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  background-color: ${SemanticTokens.Color.Background.DEFAULT};

  h2 {
    margin: 0 0 ${PrimitiveTokens.Spacing.EXTRA_SMALL} 0;
    font-size: ${PrimitiveTokens.Typography.FontSize.LG};
    font-weight: ${PrimitiveTokens.Typography.FontWeight.BOLD};
    color: ${SemanticTokens.Color.Foreground.DEFAULT};
  }

  p {
    margin: 0;
    font-size: ${PrimitiveTokens.Typography.FontSize.SM};
    color: ${SemanticTokens.Color.Foreground.SECONDARY};
  }
`;

// ===== COMPONENT =====

/**
 * Default greeting message for consultation
 * Sets expectations and context for the conversation
 */
const DEFAULT_GREETING = `Hi! 👋 I'm your AI interior design consultant.

I'm here to learn about your space, what you're hoping to achieve, and any constraints we should keep in mind so we can craft the perfect plan together.

Whenever you're ready, tell me about the space you'd like to transform. 🏠`;

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

  const [inputValue, setInputValue] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize consultation on mount
  useEffect(() => {
    if (isInitialized) return;

    if (!context || context.messages.length === 0) {
      console.log("Initializing consultation with greeting...");
      initializeConsultation(userId, initialMessage);
    }

    setIsInitialized(true);
  }, [context, initializeConsultation, initialMessage, isInitialized, userId]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [context?.messages.length]);

  // Handle user message submission
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !context) return;

    const userMessageText = inputValue.trim();
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Add user message to state
      addMessage("user", userMessageText);

      // Call API to process message with OpenAI
      const response = await fetch("/api/consultation/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: userMessageText,
          consultationId: context.id,
          previousMetadata: metadata,
          currentPhase: currentPhase,
          messages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process message");
      }

      const data = await response.json();
      const {
        extractedMetadata,
        assistantMessage,
        nextPhase,
        conversionSignal,
        llmMetadata,
      } = data.data;

      // Update metadata with both LLM extraction and pattern matching
      if (extractedMetadata) {
        mergeMetadata(extractedMetadata);
      }

      // Update phase if needed
      if (nextPhase && nextPhase !== currentPhase) {
        updatePhase(nextPhase);

        // Update user type based on scope
        if (extractedMetadata?.projectScope?.type) {
          updateUserType(extractedMetadata.projectScope.type);
        }
      }

      // Handle conversion signal for exploratory users
      if (conversionSignal) {
        console.log("Conversion signal detected:", conversionSignal);
        // UI can show notification or trigger action
      }

      // Add OpenAI-generated assistant response
      if (assistantMessage) {
        addMessage("assistant", assistantMessage);
      }

      // Check if consultation is complete
      if (nextPhase === "synthesis" || nextPhase === "completed") {
        updateCompletionStatus("ready_for_style_profiler");
      }

      // Log LLM extraction for debugging
      if (llmMetadata && Object.keys(llmMetadata).length > 0) {
        console.log("LLM Extracted:", llmMetadata);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Chat error:", err);
      // Show error to user
      addMessage(
        "assistant",
        `Sorry, I encountered an error: ${errorMessage}. Please check that your OpenAI API key is configured correctly in .env.local`
      );
    } finally {
      setIsLoading(false);
    }
  };

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
    <div css={chatContainerStyle}>
      {/* Header */}
      <div css={headerStyle}>
        <h2>Interior Design Consultant</h2>
        <p>Let's discover the perfect design for your space</p>
      </div>

      {/* Messages */}
      <div css={messagesContainerStyle}>
        {context.messages.map((message: ConsultationMessage) => (
          <div key={message.id} css={messageStyle(message.role)}>
            <div css={messageBubbleStyle(message.role)}>
              {message.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div css={messageStyle("assistant")}>
            <div css={loadingIndicatorStyle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div
          css={css`
            padding: 12px 16px;
            background-color: #ffe5e5;
            color: #cc0000;
            font-size: 12px;
            border-bottom: 1px solid #E6E6E6;
          `}
        >
          {error}
        </div>
      )}

      {/* Input */}
      <div css={inputContainerStyle}>
        <input
          type="text"
          css={inputFieldStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading || completionStatus === "ready_for_style_profiler"}
        />
        <button
          css={sendButtonStyle}
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim() || completionStatus === "ready_for_style_profiler"}
        >
          Send
        </button>
      </div>

      {/* Completion message */}
      {completionStatus === "ready_for_style_profiler" && (
        <div
          css={css`
            padding: 12px 16px;
            background-color: #e5f2ff;
            color: #0066cc;
            font-size: 12px;
            border-top: 1px solid #E6E6E6;
            text-align: center;
          `}
        >
          ✓ Consultation complete! Ready for Style Profiler
        </div>
      )}
    </div>
  );
}
