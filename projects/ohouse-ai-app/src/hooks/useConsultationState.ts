/**
 * Jotai-based state management for consultation session
 * Manages all consultation data with localStorage persistence
 */

import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  ConsultationContext,
  ConsultationMessage,
  ExtractedMetadata,
  ConsultationPhase,
  ProjectScopeType,
  ConsultantResponse,
} from "@/types/consultation";

// ===== ATOMS =====

/**
 * Current consultation context
 * Persisted to localStorage
 */
export const consultationContextAtom = atomWithStorage<ConsultationContext | null>(
  "consultation_context",
  null,
  {
    getItem: (key) => {
      if (typeof window === "undefined") return null;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    setItem: (key, value) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    },
  }
);

/**
 * Current conversation messages
 * Part of consultation context but exposed separately for easier access
 */
export const messagesAtom = atom<ConsultationMessage[]>((get) => {
  const context = get(consultationContextAtom);
  return context?.messages || [];
});

/**
 * Current extracted metadata
 * Updated as new information is discovered
 */
export const metadataAtom = atom<ExtractedMetadata>((get) => {
  const context = get(consultationContextAtom);
  return (
    context?.metadata || {
      confidence: 0,
      rawKeywords: [],
    }
  );
});

/**
 * Current consultation phase
 */
export const currentPhaseAtom = atom<ConsultationPhase>((get) => {
  const context = get(consultationContextAtom);
  return context?.phase || "intent_detection";
});

/**
 * Detected user type / project scope
 */
export const userTypeAtom = atom<ProjectScopeType>((get) => {
  const context = get(consultationContextAtom);
  return context?.userType || "exploratory";
});

/**
 * Is consultation active?
 */
export const isActiveAtom = atom<boolean>((get) => {
  const context = get(consultationContextAtom);
  return context?.isActive ?? true;
});

/**
 * Consultation completion status
 */
export const completionStatusAtom = atom<ConsultationContext["completionStatus"]>(
  (get) => {
    const context = get(consultationContextAtom);
    return context?.completionStatus || "not_started";
  }
);

/**
 * Loading state for API calls
 */
export const isLoadingAtom = atom<boolean>(false);

/**
 * Error state
 */
export const errorAtom = atom<string | null>(null);

/**
 * Quality score for the consultation
 */
export const qualityScoreAtom = atom<number>((get) => {
  const context = get(consultationContextAtom);
  return context?.conversationQualityScore || 0;
});

// ===== CUSTOM HOOK =====

/**
 * Main hook for managing consultation state
 */
export function useConsultationState() {
  const [context, setContext] = useAtom(consultationContextAtom);
  const [messages] = useAtom(messagesAtom);
  const [metadata] = useAtom(metadataAtom);
  const [currentPhase] = useAtom(currentPhaseAtom);
  const [userType] = useAtom(userTypeAtom);
  const [isActive] = useAtom(isActiveAtom);
  const [completionStatus] = useAtom(completionStatusAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  // Initialize new consultation with optional greeting message
  const initializeConsultation = (userId: string, greetingMessage?: string) => {
    const initialMessages: ConsultationMessage[] = [];

    if (greetingMessage) {
      initialMessages.push({
        id: `msg_${Date.now()}`,
        role: "assistant",
        content: greetingMessage,
        timestamp: new Date(),
      });
    }

    const newContext: ConsultationContext = {
      id: `consultation_${Date.now()}`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: initialMessages,
      phase: "intent_detection",
      userType: "exploratory",
      metadata: {
        confidence: 0,
        rawKeywords: [],
      },
      isActive: true,
      completionStatus: "not_started",
    };
    setContext(newContext);
    return newContext;
  };

  // Add message to conversation
  const addMessage = (
    role: "user" | "assistant",
    content: string,
    extractedMetadata?: ExtractedMetadata
  ) => {
    const message: ConsultationMessage = {
      id: `msg_${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
      extractedMetadata,
    };

    let didUpdate = false;

    setContext((prevContext) => {
      if (!prevContext) {
        return prevContext;
      }

      didUpdate = true;

      return {
        ...prevContext,
        messages: [...prevContext.messages, message],
        metadata: extractedMetadata || prevContext.metadata,
        updatedAt: new Date(),
      };
    });

    return didUpdate ? message : undefined;
  };

  // Update consultation phase
  const updatePhase = (newPhase: ConsultationPhase) => {
    setContext((prevContext) => {
      if (!prevContext) {
        return prevContext;
      }

      return {
        ...prevContext,
        phase: newPhase,
        updatedAt: new Date(),
      };
    });
  };

  // Update user type based on intent detection
  const updateUserType = (newType: ProjectScopeType) => {
    setContext((prevContext) => {
      if (!prevContext) {
        return prevContext;
      }

      return {
        ...prevContext,
        userType: newType,
        updatedAt: new Date(),
      };
    });
  };

  // Update completion status
  const updateCompletionStatus = (
    status: ConsultationContext["completionStatus"]
  ) => {
    setContext((prevContext) => {
      if (!prevContext) {
        return prevContext;
      }

      return {
        ...prevContext,
        completionStatus: status,
        updatedAt: new Date(),
      };
    });
  };

  // Update metadata with extracted information
  const mergeMetadata = (newMetadata: Partial<ExtractedMetadata>) => {
    setContext((prevContext) => {
      if (!prevContext) {
        return prevContext;
      }

      const mergedMetadata: ExtractedMetadata = {
        ...prevContext.metadata,
        ...newMetadata,
        rawKeywords: [
          ...new Set([
            ...prevContext.metadata.rawKeywords,
            ...(newMetadata.rawKeywords || []),
          ]),
        ],
      };

      return {
        ...prevContext,
        metadata: mergedMetadata,
        updatedAt: new Date(),
      };
    });
  };

  // Update quality score
  const updateQualityScore = (score: number) => {
    setContext((prevContext) => {
      if (!prevContext) {
        return prevContext;
      }

      return {
        ...prevContext,
        conversationQualityScore: Math.min(Math.max(score, 0), 1),
        updatedAt: new Date(),
      };
    });
  };

  // Clear consultation
  const clearConsultation = () => {
    setContext(null);
    setError(null);
  };

  // Export consultation data (for sending to other agents)
  const exportConsultationData = () => {
    if (!context) return null;
    return {
      id: context.id,
      messages: context.messages,
      metadata: context.metadata,
      phase: context.phase,
      userType: context.userType,
      status: context.completionStatus,
      timestamp: new Date().toISOString(),
    };
  };

  return {
    // State
    context,
    messages,
    metadata,
    currentPhase,
    userType,
    isActive,
    completionStatus,
    isLoading,
    error,

    // Actions
    initializeConsultation,
    addMessage,
    updatePhase,
    updateUserType,
    updateCompletionStatus,
    mergeMetadata,
    updateQualityScore,
    clearConsultation,
    exportConsultationData,

    // Setters for loading/error states
    setIsLoading,
    setError,
  };
}
