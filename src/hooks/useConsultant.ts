// Hook for managing consultant state and interactions
// TODO: Implement actual hook logic

import { useState } from "react";
import { ConsultantMessage, ConsultationContext } from "@/types";
import { getConsultantResponse } from "@/api/llm";

export function useConsultant() {
  const [contexts, setContexts] = useState<ConsultationContext[]>([]);
  const [currentContextId, setCurrentContextId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentContext = contexts.find((c) => c.id === currentContextId);

  const sendMessage = async (content: string) => {
    if (!currentContextId) {
      setError("No active consultation context");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Add user message
      const userMessage: ConsultantMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setContexts((prev) =>
        prev.map((c) =>
          c.id === currentContextId
            ? { ...c, messages: [...c.messages, userMessage] }
            : c
        )
      );

      // Get assistant response
      const response = await getConsultantResponse([
        ...(currentContext?.messages || []),
        userMessage,
      ]);

      const assistantMessage: ConsultantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };

      setContexts((prev) =>
        prev.map((c) =>
          c.id === currentContextId
            ? { ...c, messages: [...c.messages, assistantMessage] }
            : c
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const createContext = (title: string) => {
    const newContext: ConsultationContext = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setContexts((prev) => [...prev, newContext]);
    setCurrentContextId(newContext.id);
  };

  return {
    contexts,
    currentContext,
    isLoading,
    error,
    sendMessage,
    createContext,
    setCurrentContextId,
  };
}
