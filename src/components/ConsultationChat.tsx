/**
 * Consultation Chat Component
 * Main UI for AI Interior Design Consultant Chatbot
 * Handles message display, user input, and state management
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useConsultationState } from "@/hooks/useConsultationState";
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
  const [buttonHover, setButtonHover] = useState(false);
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
