/**
 * LLM Integration Hook
 * Handles ChatGPT API calls for design suggestions
 */

import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getDesignSuggestions } from '@/api/llm';

export function useLLM() {
  /**
   * Generate design suggestions based on room details
   */
  const generateSuggestions = useMutation({
    mutationFn: async (prompt: string) => {
      return getDesignSuggestions(prompt);
    },
  });

  /**
   * Format room details into LLM prompt
   */
  const createPrompt = useCallback((details: any) => {
    return `
      Design a ${details.style} interior for a ${details.type} with these details:
      - Area: ${details.area} m²
      - Budget: $${details.budget}
      - Preferred colors: ${details.colors?.join(', ') || 'neutral'}
      - Notes: ${details.additionalNotes || 'none'}

      Please provide specific, actionable design recommendations.
    `;
  }, []);

  return {
    generateSuggestions,
    createPrompt,
    isLoading: generateSuggestions.isPending,
    error: generateSuggestions.error,
  };
}

/**
 * Hook for fetching design suggestions with caching
 */
export function useDesignSuggestions(prompt: string | null) {
  return useQuery({
    queryKey: ['designSuggestions', prompt],
    queryFn: () => {
      if (!prompt) throw new Error('Prompt is required');
      return getDesignSuggestions(prompt);
    },
    enabled: !!prompt,
  });
}
