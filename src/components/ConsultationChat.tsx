/**
 * Consultation Chat Component
 * Main UI for AI Interior Design Consultant Chatbot
 * Handles message display, user input, and state management
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { useConsultationState } from "@/hooks/useConsultationState";
import { ConsultationMessage } from "@/types/consultation";
import { extractMetadataFromMessage } from "@/api/metadataExtractor";

// ===== STYLES =====

const chatContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const messagesContainerStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const messageStyle = (role: "user" | "assistant") => css`
  display: flex;
  justify-content: ${role === "user" ? "flex-end" : "flex-start"};
  gap: 8px;
`;

const messageBubbleStyle = (role: "user" | "assistant") => css`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${role === "user" ? "#0AA5FF" : "#F0F0F0"};
  color: ${role === "user" ? "#FFFFFF" : "#2F3438"};
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;

  /* User messages align right, assistant align left */
  margin-left: ${role === "user" ? "auto" : "0"};
`;

const inputContainerStyle = css`
  padding: 16px;
  border-top: 1px solid #E6E6E6;
  display: flex;
  gap: 8px;
`;

const inputFieldStyle = css`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #E6E6E6;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0aa5ff;
  }
`;

const sendButtonStyle = css`
  padding: 10px 16px;
  background-color: #0aa5ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0892d6;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const headerStyle = css`
  padding: 16px;
  border-bottom: 1px solid #E6E6E6;
  background-color: #f9f9f9;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #2f3438;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #828c94;
  }
`;

const loadingIndicatorStyle = css`
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background-color: #f0f0f0;
  border-radius: 12px;
  width: fit-content;

  span {
    width: 8px;
    height: 8px;
    background-color: #999;
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

// ===== COMPONENT =====

export interface ConsultationChatProps {
  userId: string;
  onBriefGenerated?: (brief: any) => void;
  initialMessage?: string;
}

export function ConsultationChat({
  userId,
  onBriefGenerated,
  initialMessage = "Hi! Welcome! I'm here to help you create a space you'll love.\n\nWhat brings you here today?",
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
  }, [messages]);

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

      // Call API to process message
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
      const { extractedMetadata, assistantResponse, nextPhase, conversionSignal } = data.data;

      // Update metadata
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

      // Add assistant response
      if (assistantResponse) {
        addMessage("assistant", assistantResponse.conversationalMessage);
      }

      // Check if consultation is complete
      if (nextPhase === "synthesis" || nextPhase === "completed") {
        updateCompletionStatus("ready_for_style_profiler");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      // Show error to user
      addMessage("assistant", `Sorry, I encountered an error: ${errorMessage}. Please try again.`);
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
        {messages.map((message: ConsultationMessage) => (
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
