// Common types for AI Consultant application
export interface ConsultantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ConsultationContext {
  id: string;
  title: string;
  messages: ConsultantMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultantResponse {
  message: string;
  suggestedActions?: string[];
  metadata?: Record<string, unknown>;
}
