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

  // Initialize new consultation
  const initializeConsultation = (userId: string) => {
    const newContext: ConsultationContext = {
      id: `consultation_${Date.now()}`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
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
    if (!context) return;

    const newMessage: ConsultationMessage = {
      id: `msg_${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
      extractedMetadata,
    };

    const updatedMessages = [...messages, newMessage];
    const updatedContext: ConsultationContext = {
      ...context,
      messages: updatedMessages,
      metadata: extractedMetadata || context.metadata,
      updatedAt: new Date(),
    };

    setContext(updatedContext);
    return newMessage;
  };

  // Update consultation phase
  const updatePhase = (newPhase: ConsultationPhase) => {
    if (!context) return;
    const updatedContext: ConsultationContext = {
      ...context,
      phase: newPhase,
      updatedAt: new Date(),
    };
    setContext(updatedContext);
  };

  // Update user type based on intent detection
  const updateUserType = (newType: ProjectScopeType) => {
    if (!context) return;
    const updatedContext: ConsultationContext = {
      ...context,
      userType: newType,
      updatedAt: new Date(),
    };
    setContext(updatedContext);
  };

  // Update completion status
  const updateCompletionStatus = (
    status: ConsultationContext["completionStatus"]
  ) => {
    if (!context) return;
    const updatedContext: ConsultationContext = {
      ...context,
      completionStatus: status,
      updatedAt: new Date(),
    };
    setContext(updatedContext);
  };

  // Update metadata with extracted information
  const mergeMetadata = (newMetadata: Partial<ExtractedMetadata>) => {
    if (!context) return;
    const mergedMetadata: ExtractedMetadata = {
      ...context.metadata,
      ...newMetadata,
      rawKeywords: [
        ...new Set([
          ...context.metadata.rawKeywords,
          ...(newMetadata.rawKeywords || []),
        ]),
      ],
    };

    const updatedContext: ConsultationContext = {
      ...context,
      metadata: mergedMetadata,
      updatedAt: new Date(),
    };
    setContext(updatedContext);
  };

  // Update quality score
  const updateQualityScore = (score: number) => {
    if (!context) return;
    const updatedContext: ConsultationContext = {
      ...context,
      conversationQualityScore: Math.min(Math.max(score, 0), 1),
      updatedAt: new Date(),
    };
    setContext(updatedContext);
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
