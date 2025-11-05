/**
 * LLM Integration - ChatGPT API Client
 * Handles communication with OpenAI ChatGPT API for design suggestions
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Call ChatGPT for design suggestions based on room details
 */
export async function getDesignSuggestions(_prompt: string): Promise<LLMResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  // TODO: Implement OpenAI API call
  // This is a placeholder for the actual implementation
  throw new Error('LLM implementation pending');
}

/**
 * Refine design suggestions based on user feedback
 */
export async function refineDesignSuggestions(
  _messages: ChatMessage[]
): Promise<LLMResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  // TODO: Implement multi-turn conversation with ChatGPT
  throw new Error('LLM implementation pending');
}
