/**
 * Design-related types
 */

export interface DesignSuggestion {
  id: string;
  roomId: string;
  title: string;
  description: string;
  recommendations: string[];
  estimatedCost?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignFeedback {
  suggestionId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  adjustments?: string[];
}

export interface SavedDesign {
  id: string;
  roomId: string;
  suggestion: DesignSuggestion;
  images: string[];
  notes: string;
  createdAt: Date;
}
