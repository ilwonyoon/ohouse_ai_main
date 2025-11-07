/**
 * Context Form Builder (Agent 1.2)
 * Generates and manages form-based context collection
 *
 * Purpose: Provide structured form alternative to open-ended conversation
 * for faster context collection when user is ready to provide detailed info
 */

import {
  ContextFormSchema,
  ContextFormSection,
  ContextFormResponse,
  ExtractedMetadata,
  LifestyleMetadata,
  ConstraintMetadata,
} from "@/types/consultation";

// ===== FORM SCHEMA FACTORY =====

/**
 * Master form schema for complete context collection
 * Organized into logical sections that can be completed independently
 */
export function createContextFormSchema(): ContextFormSchema {
  return {
    id: "context_form_master_v1",
    version: "1.0",
    title: "Complete Room Context",
    description:
      "Help us understand your space better with this guided form. All fields are optional - share what you're comfortable with!",
    sections: [
      createLivingSpaceSection(),
      createHouseholdSection(),
      createFunctionalitySection(),
      createConstraintsSection(),
    ],
    completionStrategy: "adaptive", // Show next based on previous answers
    estimatedTotalTime: "10-15 minutes",
  };
}

// ===== SECTION BUILDERS =====

/**
 * Section 1: Physical Space Information
 * Gathers room dimensions, lighting, current state
 */
function createLivingSpaceSection(): ContextFormSection {
  return {
    id: "living_space",
    title: "🏠 Your Space",
    description: "Tell us about the physical characteristics of your room",
    fields: [
      {
        id: "room_type",
        label: "What room are we designing?",
        type: "select",
        required: true,
        options: [
          { id: "living_room", label: "Living Room" },
          { id: "bedroom", label: "Bedroom" },
          { id: "kitchen", label: "Kitchen" },
          { id: "bathroom", label: "Bathroom" },
          { id: "dining_room", label: "Dining Room" },
          { id: "office", label: "Home Office" },
          { id: "entryway", label: "Entryway" },
          { id: "other", label: "Other" },
        ],
        helpText: "This helps us apply room-specific design rules",
      },
      {
        id: "room_size",
        label: "Approximate room size",
        type: "radio",
        options: [
          { id: "small", label: "Small", description: "< 100 sq ft" },
          { id: "medium", label: "Medium", description: "100-250 sq ft" },
          { id: "large", label: "Large", description: "> 250 sq ft" },
        ],
        helpText: "Helps us recommend furniture scale",
      },
      {
        id: "natural_light",
        label: "Natural light in the room",
        type: "radio",
        options: [
          { id: "poor", label: "Poor", description: "Little to no sunlight" },
          { id: "moderate", label: "Moderate", description: "Some windows" },
          { id: "excellent", label: "Excellent", description: "Bright & sunny" },
        ],
        helpText: "Affects color and lighting recommendations",
      },
      {
        id: "current_issues",
        label: "What bothers you most about the current space?",
        type: "checkbox",
        options: [
          { id: "dark", label: "Too dark" },
          { id: "cramped", label: "Feels cramped" },
          { id: "cluttered", label: "Too cluttered" },
          { id: "dated", label: "Looks dated" },
          { id: "cold", label: "Doesn't feel cozy" },
          { id: "disorganized", label: "Disorganized" },
          { id: "uncomfortable", label: "Uncomfortable" },
        ],
        helpText: "Check all that apply",
      },
    ],
    estimatedTime: "3-4 minutes",
  };
}

/**
 * Section 2: Household & Lifestyle
 * Gathers info about residents, pets, daily habits
 */
function createHouseholdSection(): ContextFormSection {
  return {
    id: "household",
    title: "👥 Your Household",
    description: "Tell us about who uses this space and how",
    optional: true,
    fields: [
      {
        id: "household_size",
        label: "How many people live in your home?",
        type: "number",
        placeholder: "e.g., 2",
        validation: { minLength: 1, maxLength: 2 },
        helpText: "Helps us plan seating and traffic flow",
      },
      {
        id: "children",
        label: "Do you have children?",
        type: "radio",
        options: [
          { id: "none", label: "No children" },
          { id: "young", label: "Young children (0-5)" },
          { id: "school_age", label: "School-age (6-12)" },
          { id: "teens", label: "Teens (13+)" },
          { id: "mixed", label: "Multiple ages" },
        ],
        helpText: "Kids affect design choices (durability, safety)",
      },
      {
        id: "pets",
        label: "Pets in this space?",
        type: "checkbox",
        options: [
          { id: "dog", label: "Dog" },
          { id: "cat", label: "Cat" },
          { id: "other", label: "Other" },
        ],
        helpText: "Affects material and furniture selection",
      },
      {
        id: "work_from_home",
        label: "Do you work from home in this space?",
        type: "radio",
        options: [
          { id: "no", label: "No" },
          { id: "part_time", label: "Part-time" },
          { id: "full_time", label: "Full-time" },
        ],
        helpText: "Determines if we need desk/storage space",
      },
      {
        id: "entertaining_frequency",
        label: "How often do you entertain guests here?",
        type: "radio",
        options: [
          { id: "rarely", label: "Rarely" },
          { id: "occasionally", label: "Occasionally" },
          { id: "often", label: "Often" },
        ],
        helpText: "Affects seating layout and ambiance",
      },
    ],
    estimatedTime: "3-4 minutes",
  };
}

/**
 * Section 3: Functional Requirements
 * Primary activities, storage needs, accessibility
 */
function createFunctionalitySection(): ContextFormSection {
  return {
    id: "functionality",
    title: "⚙️ How You Use It",
    description: "What activities happen in this space?",
    optional: true,
    fields: [
      {
        id: "primary_activities",
        label: "Main activities in this room",
        type: "checkbox",
        options: [
          { id: "relaxing", label: "Relaxing/unwinding" },
          { id: "sleeping", label: "Sleeping" },
          { id: "working", label: "Working" },
          { id: "exercising", label: "Exercising" },
          { id: "cooking", label: "Cooking/eating" },
          { id: "entertaining", label: "Entertaining" },
          { id: "reading", label: "Reading" },
          { id: "hobbies", label: "Hobbies" },
        ],
        helpText: "Check all that apply",
      },
      {
        id: "storage_needs",
        label: "Storage priorities",
        type: "checkbox",
        options: [
          { id: "books", label: "Books" },
          { id: "clothes", label: "Clothes" },
          { id: "toys", label: "Children's toys" },
          { id: "sports", label: "Sports equipment" },
          { id: "collections", label: "Collections/displays" },
          { id: "office", label: "Office supplies" },
        ],
        helpText: "Helps us recommend storage solutions",
      },
      {
        id: "accessibility_needs",
        label: "Any accessibility considerations?",
        type: "checkbox",
        optional: true,
        options: [
          { id: "mobility", label: "Mobility assistance" },
          { id: "stairs", label: "Stair alternatives needed" },
          { id: "vision", label: "Vision considerations" },
          { id: "hearing", label: "Hearing considerations" },
        ],
        helpText: "We'll design with inclusive principles",
      },
      {
        id: "lighting_preferences",
        label: "Lighting preferences",
        type: "checkbox",
        options: [
          { id: "bright", label: "Bright & energizing" },
          { id: "warm", label: "Warm & cozy" },
          { id: "adjustable", label: "Adjustable/dimmable" },
          { id: "natural", label: "Natural light focused" },
        ],
        helpText: "Affects our lighting plan",
      },
    ],
    estimatedTime: "3-4 minutes",
  };
}

/**
 * Section 4: Constraints & Restrictions
 * Ownership, rental restrictions, physical limitations
 */
function createConstraintsSection(): ContextFormSection {
  return {
    id: "constraints",
    title: "🚧 Constraints & Restrictions",
    description: "Let us know about any limitations we should consider",
    optional: true,
    fields: [
      {
        id: "ownership_type",
        label: "Do you own or rent?",
        type: "radio",
        options: [
          { id: "own", label: "Own" },
          { id: "rent", label: "Rent" },
          { id: "unsure", label: "Unsure" },
        ],
        helpText: "Affects what changes we can recommend",
      },
      {
        id: "rental_restrictions",
        label: "Rental restrictions (if applicable)",
        type: "checkbox",
        optional: true,
        options: [
          { id: "no_painting", label: "Can't paint" },
          { id: "no_permanent", label: "No permanent changes" },
          { id: "no_large_furniture", label: "Limited furniture placement" },
          { id: "other", label: "Other restrictions" },
        ],
        helpText: "We'll recommend renter-friendly solutions",
      },
      {
        id: "architectural_constraints",
        label: "Structural limitations",
        type: "textarea",
        placeholder: "e.g., sloped ceilings, pillars, odd window placement...",
        optional: true,
        helpText: "Any unusual architectural features?",
      },
      {
        id: "budget_notes",
        label: "Budget concerns or priorities?",
        type: "textarea",
        placeholder: "e.g., want to invest in good lighting, budget is tight...",
        optional: true,
        helpText: "Helps us recommend smartly",
      },
    ],
    estimatedTime: "2-3 minutes",
  };
}

// ===== FORM SUBMISSION & EXTRACTION =====

/**
 * Extract metadata from form response
 * Converts form field values into ExtractedMetadata structure
 */
export function extractMetadataFromForm(
  response: ContextFormResponse
): Partial<ExtractedMetadata> {
  const metadata: Partial<ExtractedMetadata> = {
    confidence: calculateFormConfidence(response),
    rawKeywords: extractKeywords(response),
  };

  // Extract room information
  if (response.values.room_type || response.values.room_size) {
    metadata.room = {
      primary: response.values.room_type || "unknown",
      approximate_size: response.values.room_size,
      natural_light: response.values.natural_light,
      current_issues: response.values.current_issues || [],
    };
  }

  // Extract lifestyle information
  if (
    response.values.household_size ||
    response.values.children ||
    response.values.pets ||
    response.values.work_from_home ||
    response.values.entertaining_frequency
  ) {
    const lifestyleMetadata: LifestyleMetadata = {};

    // Household size
    if (response.values.household_size) {
      lifestyleMetadata.household_size = parseInt(response.values.household_size);
    }

    // Children information
    if (response.values.children && response.values.children !== "none") {
      const childrenMap: Record<string, { count: number; ageRange: string }> = {
        young: { count: 1, ageRange: "0-5" },
        school_age: { count: 2, ageRange: "6-12" },
        teens: { count: 1, ageRange: "13+" },
        mixed: { count: 3, ageRange: "0-18" },
      };

      if (childrenMap[response.values.children]) {
        const ageInfo = childrenMap[response.values.children];
        lifestyleMetadata.children = {
          count: ageInfo.count,
          ages: generateAgesFromRange(ageInfo.ageRange),
        };
      }
    }

    // Pets information with enhanced type detection
    if (response.values.pets && Array.isArray(response.values.pets)) {
      lifestyleMetadata.pets = response.values.pets.map((type: string) => {
        const sizeMap: Record<string, "small" | "medium" | "large"> = {
          dog: "medium",
          cat: "small",
          other: "medium",
        };
        return {
          type,
          size: sizeMap[type] || "medium",
          behavior: type === "dog" ? "active" : "calm",
        };
      });
    }

    // Work from home
    if (response.values.work_from_home) {
      lifestyleMetadata.work_from_home = response.values.work_from_home as any;
    }

    // Entertaining frequency
    if (response.values.entertaining_frequency) {
      lifestyleMetadata.entertaining_frequency =
        response.values.entertaining_frequency as any;
    }

    metadata.lifestyle = lifestyleMetadata;
  }

  // Extract functional requirements
  if (response.values.primary_activities || response.values.storage_needs) {
    metadata.functional = {
      primary_activities: response.values.primary_activities || [],
      secondary_activities: [],
      storage_needs: response.values.storage_needs || [],
      accessibility_needs: response.values.accessibility_needs || [],
      lighting_preferences: response.values.lighting_preferences || [],
    };
  }

  // Extract constraints
  if (response.values.ownership_type || response.values.rental_restrictions) {
    const constraintMetadata: ConstraintMetadata = {
      ownership: response.values.ownership_type as any,
    };

    if (response.values.rental_restrictions) {
      constraintMetadata.rental_restrictions =
        response.values.rental_restrictions || [];
    }

    if (response.values.architectural_constraints) {
      constraintMetadata.architectural_constraints = [
        response.values.architectural_constraints,
      ];
    }

    metadata.constraints = constraintMetadata;
  }

  return metadata;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Generate age array from age range string
 */
function generateAgesFromRange(ageRange: string): number[] {
  const rangeMap: Record<string, number[]> = {
    "0-5": [1, 3, 5],
    "6-12": [6, 9, 12],
    "13+": [13, 16, 18],
    "0-18": [2, 8, 14],
  };
  return rangeMap[ageRange] || [];
}

/**
 * Calculate confidence score based on form completion
 */
function calculateFormConfidence(response: ContextFormResponse): number {
  const completedSections = response.completedSections.length;
  const totalSections = 4; // living_space, household, functionality, constraints

  // Base: completed sections
  let confidence = completedSections / totalSections;

  // Boost: required fields completed
  if (response.values.room_type && response.values.room_size) {
    confidence = Math.min(confidence + 0.1, 1);
  }

  // Boost: lifestyle info provided
  if (response.values.household_size) {
    confidence = Math.min(confidence + 0.1, 1);
  }

  return confidence;
}

/**
 * Extract keywords from form values for searching/filtering
 */
function extractKeywords(response: ContextFormResponse): string[] {
  const keywords: string[] = [];

  // Room and issues
  if (response.values.room_type) keywords.push(response.values.room_type);
  if (response.values.room_size) keywords.push(`size:${response.values.room_size}`);
  if (response.values.natural_light) keywords.push(`light:${response.values.natural_light}`);
  if (Array.isArray(response.values.current_issues)) {
    keywords.push(...response.values.current_issues);
  }

  // Household
  if (response.values.children) keywords.push(`children:${response.values.children}`);
  if (Array.isArray(response.values.pets)) {
    keywords.push(...response.values.pets);
  }
  if (response.values.work_from_home) keywords.push(`wfh:${response.values.work_from_home}`);

  // Functionality
  if (Array.isArray(response.values.primary_activities)) {
    keywords.push(...response.values.primary_activities);
  }

  // Constraints
  if (response.values.ownership_type) keywords.push(`ownership:${response.values.ownership_type}`);

  return keywords;
}

/**
 * Validate form response before submission
 */
export function validateFormResponse(
  response: ContextFormResponse
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  if (!response.values.room_type) {
    errors.push("Room type is required");
  }
  if (!response.values.room_size) {
    errors.push("Room size is required");
  }

  // Check at least one section completed
  if (response.completedSections.length === 0) {
    errors.push("Please complete at least one section");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
