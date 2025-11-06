/**
 * Brief Generator
 * Converts extracted metadata into structured briefs for downstream agents
 * Generates different brief types based on project scope
 */

import {
  ConsultationBrief,
  ExtractedMetadata,
  ProjectScopeType,
  ConsultationMessage,
} from "@/types/consultation";

// ===== BRIEF GENERATOR =====

export class BriefGenerator {
  /**
   * Generate consultation brief based on metadata and messages
   */
  static generateBrief(
    consultationId: string,
    messages: ConsultationMessage[],
    metadata: ExtractedMetadata,
    userType: ProjectScopeType,
    clientName?: string
  ): ConsultationBrief {
    // Determine brief type based on userType and data completeness
    const briefType = this.determineBriefType(userType, metadata);

    // Generate appropriate brief
    switch (briefType) {
      case "minimal":
        return this.generateMinimalBrief(
          consultationId,
          metadata,
          clientName,
          messages
        );
      case "standard":
        return this.generateStandardBrief(
          consultationId,
          metadata,
          clientName,
          messages
        );
      case "exploratory":
        return this.generateExploratoryBrief(
          consultationId,
          metadata,
          clientName,
          messages
        );
      case "partial":
        return this.generatePartialBrief(
          consultationId,
          metadata,
          clientName,
          messages
        );
      default:
        return this.generateMinimalBrief(
          consultationId,
          metadata,
          clientName,
          messages
        );
    }
  }

  /**
   * Determine brief type based on user type and metadata completeness
   */
  private static determineBriefType(
    userType: ProjectScopeType,
    metadata: ExtractedMetadata
  ): "minimal" | "standard" | "exploratory" | "partial" {
    if (userType === "exploratory") {
      return "exploratory";
    }

    const dataCompleteness =
      (!!metadata.room ? 1 : 0) +
      (!!metadata.goals ? 1 : 0) +
      (!!metadata.budget ? 1 : 0) +
      (!!metadata.timeline ? 1 : 0) +
      (!!metadata.lifestyle ? 1 : 0) +
      (!!metadata.constraints ? 1 : 0);

    if (userType === "small_refresh" || userType === "single_room") {
      return dataCompleteness >= 3 ? "minimal" : "partial";
    }

    if (userType === "multi_room" || userType === "full_home") {
      return dataCompleteness >= 5 ? "standard" : "partial";
    }

    return "partial";
  }

  /**
   * Generate Minimal Brief (for small refresh projects)
   */
  private static generateMinimalBrief(
    consultationId: string,
    metadata: ExtractedMetadata,
    clientName: string | undefined,
    messages: ConsultationMessage[]
  ): ConsultationBrief {
    const roomName = metadata.room?.primary || "Room";
    const emotionalOutcome = metadata.goals?.emotional_outcome || "transformed";
    const painPoints = metadata.goals?.pain_points || [];
    const keepingItems = metadata.room?.existing_pieces?.map((p) => p.name) || [];

    return {
      id: `brief_${Date.now()}`,
      consultationId,
      clientName,
      createdAt: new Date(),
      briefType: "minimal",
      executiveSummary: `Quick project summary: Refreshing ${roomName} to feel more ${emotionalOutcome}. ${keepingItems.length > 0 ? `Will keep: ${keepingItems.join(", ")}. ` : ""}Budget and timeline flexible.`,
      projectContext: {
        spark: painPoints.join(", ") || "Wants to refresh the space",
        goals: metadata.goals?.must_haves || [],
        emotionalOutcome,
        successDefinition:
          metadata.goals?.success_definition || "Space feels refreshed and updated",
      },
      functionalRequirements: {
        rooms: metadata.room?.primary ? [metadata.room.primary] : [],
        primaryUsers: "Client",
        activities: metadata.functional?.primary_activities || [],
        mustHaves: metadata.goals?.must_haves || [],
        existingPieces: metadata.room?.existing_pieces || [],
        constraints: metadata.constraints?.architectural_constraints || [],
      },
      budget: {
        total: metadata.budget?.total,
        range: metadata.budget?.range,
        priorities: [
          metadata.budget?.priority || "balanced approach",
        ],
      },
      timeline: {
        targetDate: metadata.timeline?.target_completion,
        flexibility: metadata.timeline?.flexibility || "flexible",
        drivers: metadata.timeline?.drivers || [],
      },
      lifestyle: {
        household: "Not specified",
        lifestyle_factors: [],
        maintenance: metadata.style?.maintenance_preference || "moderate",
      },
      designHints: {
        styleDirections: metadata.style?.style_hints || [],
        colorPreferences: metadata.style?.color_preferences || [],
        formality: metadata.style?.formality_level || "casual",
        displayPreference: metadata.style?.display_preference || "moderate",
      },
      missingInformation: this.identifyMissingInfo(metadata, "minimal"),
      redFlags: [],
      specialConsiderations: [],
      fullMetadata: metadata,
    };
  }

  /**
   * Generate Standard Brief (for medium/large projects)
   */
  private static generateStandardBrief(
    consultationId: string,
    metadata: ExtractedMetadata,
    clientName: string | undefined,
    messages: ConsultationMessage[]
  ): ConsultationBrief {
    const roomNames = metadata.room?.primary
      ? [metadata.room.primary, ...(metadata.room?.secondary || [])]
      : [];
    const householdDescription = this.describeHousehold(metadata.lifestyle);

    return {
      id: `brief_${Date.now()}`,
      consultationId,
      clientName,
      createdAt: new Date(),
      briefType: "standard",
      executiveSummary: `Comprehensive project: Transforming ${roomNames.join(" + ")} for ${householdDescription}. Timeline is ${metadata.timeline?.flexibility || "flexible"}. Design team should focus on ${metadata.goals?.primary || "creating functional, beautiful spaces"}.`,
      projectContext: {
        spark:
          messages
            .filter((m) => m.role === "user")
            .map((m) => m.content)
            .join(" ") || "Interior design project",
        goals: metadata.goals?.secondary || [metadata.goals?.primary || ""],
        emotionalOutcome:
          metadata.goals?.emotional_outcome || "transformed and functional",
        successDefinition:
          metadata.goals?.success_definition ||
          "Space meets all functional needs and feels beautiful",
      },
      functionalRequirements: {
        rooms: roomNames,
        primaryUsers: householdDescription,
        activities: metadata.functional?.primary_activities || [],
        mustHaves: metadata.goals?.must_haves || [],
        existingPieces: metadata.room?.existing_pieces || [],
        constraints: [
          ...(metadata.constraints?.architectural_constraints || []),
          ...(metadata.constraints?.physical_limitations || []),
        ],
      },
      budget: {
        total: metadata.budget?.total,
        range: metadata.budget?.range,
        allocation: metadata.budget?.allocation,
        priorities: [metadata.budget?.priority || "balanced"],
      },
      timeline: {
        targetDate: metadata.timeline?.target_completion,
        flexibility: metadata.timeline?.flexibility || "flexible",
        drivers: metadata.timeline?.drivers || [],
      },
      lifestyle: {
        household: householdDescription,
        lifestyle_factors: this.extractLifestyleFactors(metadata.lifestyle),
        maintenance:
          metadata.style?.maintenance_preference || "moderate upkeep",
      },
      designHints: {
        styleDirections: metadata.style?.style_hints || [],
        colorPreferences: metadata.style?.color_preferences || [],
        formality: metadata.style?.formality_level || "mixed",
        displayPreference: metadata.style?.display_preference || "moderate",
      },
      missingInformation: this.identifyMissingInfo(metadata, "standard"),
      redFlags: this.identifyRedFlags(metadata),
      specialConsiderations: this.identifySpecialConsiderations(metadata),
      fullMetadata: metadata,
    };
  }

  /**
   * Generate Exploratory Brief (for tire-kickers)
   */
  private static generateExploratoryBrief(
    consultationId: string,
    metadata: ExtractedMetadata,
    clientName: string | undefined,
    messages: ConsultationMessage[]
  ): ConsultationBrief {
    return {
      id: `brief_${Date.now()}`,
      consultationId,
      clientName,
      createdAt: new Date(),
      briefType: "exploratory",
      executiveSummary: `Exploratory session: User is browsing ideas, not yet committed to a project. Engaged with ${metadata.style?.style_hints?.join(", ") || "various styles"}. Watch for conversion signals.`,
      projectContext: {
        spark: "Browsing inspiration",
        goals: [],
        emotionalOutcome: "Exploring possibilities",
        successDefinition:
          "User had fun, saw inspiring examples, interested in returning",
      },
      functionalRequirements: {
        rooms: metadata.room?.primary ? [metadata.room.primary] : [],
        primaryUsers: "Potential client",
        activities: [],
        mustHaves: [],
        existingPieces: [],
        constraints: [],
      },
      budget: {
        range: undefined,
        priorities: [],
      },
      timeline: {
        flexibility: "no timeline",
        drivers: [],
      },
      lifestyle: {
        household: "Unknown",
        lifestyle_factors: [],
        maintenance: "Unknown",
      },
      designHints: {
        styleDirections: metadata.style?.style_hints || [],
        colorPreferences: metadata.style?.color_preferences || [],
        formality: "unknown",
        displayPreference: "unknown",
      },
      missingInformation: [
        "All project details - user is in exploration phase",
      ],
      redFlags: [],
      specialConsiderations: [
        "Monitor for conversion signals indicating real project interest",
      ],
      fullMetadata: metadata,
    };
  }

  /**
   * Generate Partial Information Brief (for reluctant/vague users)
   */
  private static generatePartialBrief(
    consultationId: string,
    metadata: ExtractedMetadata,
    clientName: string | undefined,
    messages: ConsultationMessage[]
  ): ConsultationBrief {
    return {
      id: `brief_${Date.now()}`,
      consultationId,
      clientName,
      createdAt: new Date(),
      briefType: "partial",
      executiveSummary: `Partial information brief: Client shared some details but preferred not to provide complete information at this stage. Design team should prepare flexible options at multiple price points and style directions.`,
      projectContext: {
        spark: metadata.goals?.primary || "Interior design project",
        goals: metadata.goals?.secondary || [],
        emotionalOutcome:
          metadata.goals?.emotional_outcome || "improved space",
        successDefinition: metadata.goals?.success_definition || "Satisfied client",
      },
      functionalRequirements: {
        rooms: metadata.room?.primary ? [metadata.room.primary] : [],
        primaryUsers: metadata.lifestyle?.household_size
          ? `${metadata.lifestyle.household_size} person(s)`
          : "Client(s)",
        activities: metadata.functional?.primary_activities || [],
        mustHaves: metadata.goals?.must_haves || [],
        existingPieces: metadata.room?.existing_pieces || [],
        constraints: [],
      },
      budget: {
        range: metadata.budget?.range,
        priorities: [],
      },
      timeline: {
        flexibility: metadata.timeline?.flexibility || "unknown",
        drivers: metadata.timeline?.drivers || [],
      },
      lifestyle: {
        household: "Partial information available",
        lifestyle_factors: [],
        maintenance: "Not specified",
      },
      designHints: {
        styleDirections: metadata.style?.style_hints || [],
        colorPreferences: metadata.style?.color_preferences || [],
        formality: metadata.style?.formality_level || "unknown",
        displayPreference: "unknown",
      },
      missingInformation: this.identifyMissingInfo(metadata, "partial"),
      redFlags: [
        "Limited information shared - design team should be prepared to iterate",
      ],
      specialConsiderations: [
        "Prepare multiple options at different budget/style levels",
        "First presentation should be exploratory, expecting refinement",
      ],
      fullMetadata: metadata,
    };
  }

  /**
   * Helper: Describe household from lifestyle metadata
   */
  private static describeHousehold(
    lifestyle: ExtractedMetadata["lifestyle"]
  ): string {
    if (!lifestyle) return "Client";

    const parts: string[] = [];

    if (lifestyle.children) {
      parts.push(`couple with ${lifestyle.children.count} child(ren)`);
    } else if (lifestyle.household_size) {
      parts.push(`${lifestyle.household_size} person(s)`);
    } else {
      parts.push("Client(s)");
    }

    if (lifestyle.pets && lifestyle.pets.length > 0) {
      parts.push(`and ${lifestyle.pets.map((p) => p.type).join(", ")}`);
    }

    return parts.join(" ");
  }

  /**
   * Helper: Extract lifestyle factors
   */
  private static extractLifestyleFactors(
    lifestyle: ExtractedMetadata["lifestyle"]
  ): string[] {
    const factors: string[] = [];

    if (lifestyle?.work_from_home === "full_time") {
      factors.push("Works from home full-time");
    } else if (lifestyle?.work_from_home === "part_time") {
      factors.push("Works from home part-time");
    }

    if (
      lifestyle?.entertaining_frequency === "often" ||
      lifestyle?.entertaining_frequency === "occasionally"
    ) {
      factors.push(`Entertains ${lifestyle.entertaining_frequency}`);
    }

    if (lifestyle?.cooking_habits) {
      factors.push(`Cooking habits: ${lifestyle.cooking_habits}`);
    }

    if (lifestyle?.children) {
      factors.push(`Has ${lifestyle.children.count} child(ren)`);
    }

    if (lifestyle?.pets && lifestyle.pets.length > 0) {
      factors.push(`Has ${lifestyle.pets.length} pet(s)`);
    }

    return factors;
  }

  /**
   * Helper: Identify missing information
   */
  private static identifyMissingInfo(
    metadata: ExtractedMetadata,
    briefType: "minimal" | "standard" | "partial"
  ): string[] {
    const missing: string[] = [];

    if (briefType === "standard") {
      if (!metadata.budget) missing.push("Budget not confirmed");
      if (!metadata.timeline) missing.push("Timeline not confirmed");
      if (!metadata.lifestyle)
        missing.push("Lifestyle details not fully explored");
      if (!metadata.constraints) missing.push("Constraints not identified");
    } else if (briefType === "minimal") {
      if (!metadata.budget) missing.push("Budget not discussed");
      if (!metadata.timeline) missing.push("Timeline not discussed");
    }

    if (!metadata.style) missing.push("Style preferences not yet explored");

    return missing;
  }

  /**
   * Helper: Identify red flags
   */
  private static identifyRedFlags(
    metadata: ExtractedMetadata
  ): string[] {
    const flags: string[] = [];

    // Budget/scope mismatch
    if (
      metadata.budget?.total &&
      metadata.budget.total < 3000 &&
      metadata.projectScope?.type === "full_home"
    ) {
      flags.push(
        "Budget may be insufficient for full home renovation scope"
      );
    }

    // Conflicting info
    if (
      metadata.timeline?.drivers?.includes("urgent") &&
      metadata.timeline?.flexibility === "no_rush"
    ) {
      flags.push("Timeline information seems contradictory");
    }

    return flags;
  }

  /**
   * Helper: Identify special considerations
   */
  private static identifySpecialConsiderations(
    metadata: ExtractedMetadata
  ): string[] {
    const considerations: string[] = [];

    if (metadata.lifestyle?.children) {
      considerations.push(
        `Design for child safety and durability (${metadata.lifestyle.children.count} child(ren))`
      );
    }

    if (metadata.lifestyle?.pets && metadata.lifestyle.pets.length > 0) {
      considerations.push("Choose pet-friendly materials and finishes");
    }

    if (metadata.timeline?.drivers?.includes("baby")) {
      considerations.push("Time-sensitive: new baby arrival");
    }

    if (metadata.constraints?.ownership === "rented") {
      considerations.push(
        "Rental property - limited scope for permanent changes"
      );
    }

    if (metadata.lifestyle?.work_from_home === "full_time") {
      considerations.push("Dedicated workspace needed for full-time WFH");
    }

    return considerations;
  }

  /**
   * Export brief as JSON for API transmission
   */
  static exportBriefJSON(brief: ConsultationBrief): string {
    return JSON.stringify(brief, null, 2);
  }

  /**
   * Export brief as formatted text for display
   */
  static exportBriefText(brief: ConsultationBrief): string {
    const lines: string[] = [];

    lines.push("=".repeat(60));
    lines.push(`CONSULTATION BRIEF - ${brief.briefType.toUpperCase()}`);
    lines.push("=".repeat(60));
    lines.push("");
    lines.push(`Project ID: ${brief.id}`);
    lines.push(`Created: ${brief.createdAt.toLocaleDateString()}`);
    if (brief.clientName) lines.push(`Client: ${brief.clientName}`);
    lines.push("");
    lines.push("EXECUTIVE SUMMARY");
    lines.push("-".repeat(60));
    lines.push(brief.executiveSummary);
    lines.push("");

    lines.push("PROJECT CONTEXT");
    lines.push("-".repeat(60));
    lines.push(`Goals: ${brief.projectContext.goals.join(", ") || "Not specified"}`);
    lines.push(
      `Emotional Outcome: ${brief.projectContext.emotionalOutcome}`
    );
    lines.push(
      `Success Definition: ${brief.projectContext.successDefinition}`
    );
    lines.push("");

    lines.push("FUNCTIONAL REQUIREMENTS");
    lines.push("-".repeat(60));
    lines.push(`Rooms: ${brief.functionalRequirements.rooms.join(", ") || "Not specified"}`);
    lines.push(`Primary Users: ${brief.functionalRequirements.primaryUsers}`);
    lines.push(
      `Activities: ${brief.functionalRequirements.activities.join(", ") || "Not specified"}`
    );
    lines.push(
      `Must-Haves: ${brief.functionalRequirements.mustHaves.join(", ") || "Not specified"}`
    );
    lines.push("");

    lines.push("BUDGET & TIMELINE");
    lines.push("-".repeat(60));
    if (brief.budget.total) lines.push(`Total Budget: $${brief.budget.total}`);
    if (brief.budget.range) lines.push(`Budget Range: ${brief.budget.range}`);
    lines.push(`Timeline Flexibility: ${brief.timeline.flexibility}`);
    lines.push("");

    if (brief.missingInformation && brief.missingInformation.length > 0) {
      lines.push("MISSING INFORMATION");
      lines.push("-".repeat(60));
      brief.missingInformation.forEach((item) => lines.push(`• ${item}`));
      lines.push("");
    }

    if (brief.redFlags && brief.redFlags.length > 0) {
      lines.push("RED FLAGS");
      lines.push("-".repeat(60));
      brief.redFlags.forEach((flag) => lines.push(`⚠️  ${flag}`));
      lines.push("");
    }

    lines.push("=".repeat(60));

    return lines.join("\n");
  }
}

// Export convenience function
export function generateBrief(
  consultationId: string,
  messages: ConsultationMessage[],
  metadata: ExtractedMetadata,
  userType: ProjectScopeType,
  clientName?: string
): ConsultationBrief {
  return BriefGenerator.generateBrief(
    consultationId,
    messages,
    metadata,
    userType,
    clientName
  );
}
