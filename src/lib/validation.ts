/**
 * Validation Schemas using Zod
 * Centralized schemas for API request validation
 */

import { z } from 'zod';

/**
 * Consultation Message Schema
 */
export const ConsultationMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.date().optional(),
  extractedMetadata: z.record(z.string(), z.any()).optional(),
});

/**
 * Extracted Metadata Schema
 */
export const ExtractedMetadataSchema = z.object({
  projectScope: z.object({
    type: z.enum(['exploratory', 'small_refresh', 'single_room', 'multi_room', 'full_home'] as const).optional(),
    rooms: z.array(z.string()).optional(),
  }).optional(),
  room: z.object({
    primary: z.string().optional(),
    secondary: z.array(z.string()).optional(),
    current_issues: z.array(z.string()).optional(),
  }).optional(),
  goals: z.array(z.string()).optional(),
  budget: z.object({
    total: z.number().optional(),
    range: z.string().optional(),
    flexibility: z.string().optional(),
  }).optional(),
  timeline: z.object({
    start_date: z.string().optional(),
    deadline: z.string().optional(),
    urgency: z.string().optional(),
  }).optional(),
  lifestyle: z.object({
    family_size: z.number().optional(),
    pets: z.array(z.string()).optional(),
    entertainment_style: z.string().optional(),
  }).optional(),
  constraints: z.array(z.string()).optional(),
  style: z.object({
    primary: z.string().optional(),
    secondary: z.array(z.string()).optional(),
    color_palette: z.array(z.string()).optional(),
    inspiration_sources: z.array(z.string()).optional(),
  }).optional(),
  confidence: z.number().min(0).max(1).optional(),
  rawKeywords: z.array(z.string()).optional(),
}).strict().partial();

/**
 * Process Consultation Request Schema
 */
export const ProcessConsultationSchema = z.object({
  userMessage: z.string()
    .min(1, 'User message cannot be empty')
    .max(5000, 'User message exceeds maximum length'),
  consultationId: z.string()
    .min(1, 'Consultation ID is required'),
  previousMetadata: ExtractedMetadataSchema.optional(),
  currentPhase: z.string().optional().default('phase_0_intent_detection'),
  messages: z.array(ConsultationMessageSchema).optional().default([]),
});

/**
 * Initialize Consultation Request Schema
 */
export const InitializeConsultationSchema = z.object({
  userId: z.string()
    .min(1, 'User ID is required')
    .max(255, 'User ID too long'),
});

/**
 * Generate Brief Request Schema
 */
export const GenerateBriefSchema = z.object({
  consultationId: z.string()
    .min(1, 'Consultation ID is required'),
  metadata: ExtractedMetadataSchema.optional(),
  messages: z.array(ConsultationMessageSchema).optional(),
});

/**
 * Type Exports for Runtime Safety
 */
export type ProcessConsultationRequest = z.infer<typeof ProcessConsultationSchema>;
export type InitializeConsultationRequest = z.infer<typeof InitializeConsultationSchema>;
export type GenerateBriefRequest = z.infer<typeof GenerateBriefSchema>;
export type ExtractedMetadataInput = z.infer<typeof ExtractedMetadataSchema>;

/**
 * Validation helper functions
 */
export function validateProcessConsultation(data: unknown) {
  return ProcessConsultationSchema.safeParse(data);
}

export function validateInitializeConsultation(data: unknown) {
  return InitializeConsultationSchema.safeParse(data);
}

export function validateGenerateBrief(data: unknown) {
  return GenerateBriefSchema.safeParse(data);
}
