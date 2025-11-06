/**
 * Hook for handling streaming responses from OpenAI
 * Manages SSE stream, chunks, and metadata extraction
 */

import { useState, useCallback } from "react";

export interface StreamingState {
  isStreaming: boolean;
  text: string;
  error: string | null;
  metadata: Record<string, any> | null;
}

export function useStreamingResponse() {
  const [state, setState] = useState<StreamingState>({
    isStreaming: false,
    text: "",
    error: null,
    metadata: null,
  });

  const startStream = useCallback(
    async (
      userMessage: string,
      consultationId: string,
      conversationHistory: any[] = [],
      currentPhase: string = "intent_detection",
      previousMetadata: any = {}
    ) => {
      setState({ isStreaming: true, text: "", error: null, metadata: null });

      try {
        const response = await fetch("/api/consultation/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage,
            consultationId,
            conversationHistory,
            currentPhase,
            previousMetadata,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === "chunk") {
                  // Accumulate text chunks
                  fullText += data.content;
                  setState((prev) => ({
                    ...prev,
                    text: fullText,
                  }));
                } else if (data.type === "done") {
                  // Stream complete with metadata
                  setState((prev) => ({
                    ...prev,
                    isStreaming: false,
                    metadata: data.metadata,
                  }));
                } else if (data.type === "error") {
                  // Error in stream
                  throw new Error(data.error);
                }
              } catch (e) {
                // Skip parse errors
                if (!(e instanceof SyntaxError)) {
                  throw e;
                }
              }
            }
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setState((prev) => ({
          ...prev,
          isStreaming: false,
          error: errorMessage,
        }));
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ isStreaming: false, text: "", error: null, metadata: null });
  }, []);

  return {
    ...state,
    startStream,
    reset,
  };
}
