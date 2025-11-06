/**
 * Metadata Panel Component - SKILL.md Aware
 * Real-time visualization of extracted metadata with completion progress
 * Shows what information has been collected and what's still needed
 */

/** @jsxImportSource @emotion/react */
"use client";

import React from "react";
import { css } from "@emotion/react";
import { PrimitiveTokens, SemanticTokens } from "@/tokens";
import { ExtractedMetadata, ConsultationContext, ConsultationPhase } from "@/types/consultation";

// ===== STYLES =====

const panelStyle = css`
  display: flex;
  flex-direction: column;
  background: ${SemanticTokens.Color.Background.DEFAULT};
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
`;

const headerStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  border-bottom: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);

  h2 {
    margin: 0 0 ${PrimitiveTokens.Spacing.EXTRA_SMALL} 0;
    font-size: 16px;
    font-weight: 600;
    color: ${SemanticTokens.Color.Foreground.DEFAULT};
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${SemanticTokens.Color.Foreground.SECONDARY};
  }
`;

const progressSectionStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  border-bottom: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  background-color: #fafbfc;
`;

const progressLabelStyle = css`
  font-size: 12px;
  font-weight: 600;
  color: ${SemanticTokens.Color.Foreground.DEFAULT};
  margin-bottom: ${PrimitiveTokens.Spacing.EXTRA_SMALL};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const progressBarContainerStyle = css`
  display: flex;
  gap: ${PrimitiveTokens.Spacing.EXTRA_SMALL};
  align-items: center;
`;

const progressBarStyle = css`
  flex: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const progressBarFillStyle = (percent: number) => css`
  height: 100%;
  width: ${percent}%;
  background: linear-gradient(
    90deg,
    ${SemanticTokens.Color.Foreground.BRAND} 0%,
    #00d4ff 100%
  );
  transition: width 0.3s ease;
`;

const percentTextStyle = css`
  font-size: 12px;
  font-weight: 600;
  color: ${SemanticTokens.Color.Foreground.DEFAULT};
  min-width: 35px;
`;

const contentStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  display: flex;
  flex-direction: column;
  gap: ${PrimitiveTokens.Spacing.MEDIUM};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${SemanticTokens.Color.Border.DEFAULT};
    border-radius: ${PrimitiveTokens.BorderRadius.TIGHT};
  }
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${PrimitiveTokens.Spacing.EXTRA_SMALL};
`;

const sectionTitleStyle = css`
  font-size: 12px;
  font-weight: 600;
  color: ${SemanticTokens.Color.Foreground.DEFAULT};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${PrimitiveTokens.Spacing.EXTRA_SMALL} ${PrimitiveTokens.Spacing.SMALL};
  background-color: #f5f7fa;
  border-radius: ${PrimitiveTokens.BorderRadius.TIGHT};
  border-left: 3px solid transparent;
  transition: all 0.2s ease;

  &.filled {
    border-left-color: ${SemanticTokens.Color.Foreground.BRAND};
    background-color: #f0f8ff;
  }

  &.empty {
    opacity: 0.6;
    border-left-color: #e0e0e0;
  }
`;

const itemLabelStyle = css`
  font-size: 13px;
  color: ${SemanticTokens.Color.Foreground.DEFAULT};
  font-weight: 500;
`;

const itemValueStyle = css`
  font-size: 12px;
  color: ${SemanticTokens.Color.Foreground.SECONDARY};
  margin-top: 2px;
  word-break: break-word;
  max-width: 120px;
`;

const statusIndicatorStyle = (_filled: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${PrimitiveTokens.Spacing.EXTRA_SMALL};
  flex-shrink: 0;
`;

const dotStyle = (filled: boolean) => css`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${filled ? SemanticTokens.Color.Foreground.BRAND : "#d0d0d0"};
`;

const emptyStateStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  text-align: center;
  color: ${SemanticTokens.Color.Foreground.SECONDARY};
  font-size: 12px;
  font-style: italic;
`;

const phaseIndicatorStyle = css`
  padding: ${PrimitiveTokens.Spacing.SMALL} ${PrimitiveTokens.Spacing.MEDIUM};
  background-color: #f0f5ff;
  border-left: 3px solid ${SemanticTokens.Color.Foreground.BRAND};
  font-size: 12px;
  color: ${SemanticTokens.Color.Foreground.BRAND};
  font-weight: 600;
`;

// ===== HELPER FUNCTIONS =====

function getPhaseLabel(phase: ConsultationPhase): string {
  const labels: Record<ConsultationPhase, string> = {
    phase_0_intent_detection: "Phase 0: Intent Detection",
    phase_1a_exploratory_mode: "Phase 1-A: Exploratory",
    phase_1b_scope_clarification: "Phase 1-B: Scope",
    phase_1c_light_consultation: "Phase 1-C: Light",
    phase_1d_standard_consultation: "Phase 1-D: Standard",
    phase_2_rapport_building: "Phase 2: Rapport",
    phase_3_project_context: "Phase 3: Context",
    phase_4_functional_requirements: "Phase 4: Functional",
    phase_5_budget_discovery: "Phase 5: Budget",
    phase_6_scope_timeline: "Phase 6: Timeline",
    phase_7_additional_discovery: "Phase 7: Additional",
    phase_8_synthesis: "Phase 8: Synthesis",
  };
  return labels[phase] || "Unknown Phase";
}

function calculateCompletionPercent(metadata: ExtractedMetadata, phase: ConsultationPhase): number {
  let filledFields = 0;
  let totalFields = 0;

  // Light consultation: 7 key fields
  if (phase.includes("1c")) {
    const fields = [
      !!metadata.room,
      !!metadata.goals?.pain_points,
      !!metadata.goals?.emotional_outcome,
      !!metadata.room?.existing_pieces,
      !!metadata.budget,
      !!metadata.timeline,
      !!metadata.goals?.must_haves,
    ];
    filledFields = fields.filter(Boolean).length;
    totalFields = fields.length;
  }
  // Standard consultation: 9 essential fields + optional
  else if (phase.includes("1d")) {
    const essentialFields = [
      !!metadata.projectScope,
      !!metadata.goals?.emotional_outcome,
      !!metadata.goals?.success_definition,
      !!metadata.lifestyle?.household_size,
      !!metadata.functional?.primary_activities,
      !!metadata.goals?.pain_points,
      !!metadata.goals?.must_haves,
      !!metadata.budget,
      !!metadata.timeline,
    ];
    filledFields = essentialFields.filter(Boolean).length;
    totalFields = essentialFields.length;
  } else {
    // General: check non-empty metadata
    const hasRoom = !!metadata.room;
    const hasGoals = !!metadata.goals;
    const hasBudget = !!metadata.budget;
    const hasTimeline = !!metadata.timeline;

    filledFields = [hasRoom, hasGoals, hasBudget, hasTimeline].filter(Boolean).length;
    totalFields = 4;
  }

  return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
}

// ===== COMPONENT =====

interface MetadataPanelProps {
  metadata: ExtractedMetadata;
  context: ConsultationContext;
}

export function MetadataPanel({ metadata, context }: MetadataPanelProps) {
  const completionPercent = calculateCompletionPercent(metadata, context.phase);
  const phaseLabel = getPhaseLabel(context.phase);

  return (
    <div css={panelStyle}>
      {/* Header */}
      <div css={headerStyle}>
        <h2>Project Metadata</h2>
        <p>Real-time information extraction</p>
      </div>

      {/* Phase Indicator */}
      <div css={phaseIndicatorStyle}>{phaseLabel}</div>

      {/* Progress Section */}
      <div css={progressSectionStyle}>
        <div css={progressLabelStyle}>Overall Completion</div>
        <div css={progressBarContainerStyle}>
          <div css={progressBarStyle}>
            <div css={progressBarFillStyle(completionPercent)} />
          </div>
          <div css={percentTextStyle}>{completionPercent}%</div>
        </div>
      </div>

      {/* Content */}
      <div css={contentStyle}>
        {/* Room Information */}
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>📍 Room & Space</div>
          {metadata.room ? (
            <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
              <div>
                <div css={itemLabelStyle}>Primary Room</div>
                <div css={itemValueStyle}>{metadata.room.primary}</div>
              </div>
              <div css={statusIndicatorStyle(true)}>
                <div css={dotStyle(true)} />
              </div>
            </div>
          ) : (
            <div css={[itemStyle, { opacity: 0.5 }]}>
              <div>
                <div css={itemLabelStyle}>Primary Room</div>
                <div css={itemValueStyle}>Not yet mentioned</div>
              </div>
              <div css={statusIndicatorStyle(false)}>
                <div css={dotStyle(false)} />
              </div>
            </div>
          )}
        </div>

        {/* Goals & Vision */}
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>🎯 Goals & Vision</div>
          {metadata.goals?.emotional_outcome ? (
            <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
              <div>
                <div css={itemLabelStyle}>Desired Feeling</div>
                <div css={itemValueStyle}>{metadata.goals.emotional_outcome}</div>
              </div>
              <div css={statusIndicatorStyle(true)}>
                <div css={dotStyle(true)} />
              </div>
            </div>
          ) : (
            <div css={[itemStyle, { opacity: 0.5 }]}>
              <div>
                <div css={itemLabelStyle}>Desired Feeling</div>
                <div css={itemValueStyle}>Not yet explored</div>
              </div>
              <div css={statusIndicatorStyle(false)}>
                <div css={dotStyle(false)} />
              </div>
            </div>
          )}

          {metadata.goals?.pain_points && metadata.goals.pain_points.length > 0 ? (
            <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
              <div>
                <div css={itemLabelStyle}>Pain Points</div>
                <div css={itemValueStyle}>{metadata.goals.pain_points.join(", ")}</div>
              </div>
              <div css={statusIndicatorStyle(true)}>
                <div css={dotStyle(true)} />
              </div>
            </div>
          ) : (
            <div css={[itemStyle, { opacity: 0.5 }]}>
              <div>
                <div css={itemLabelStyle}>Pain Points</div>
                <div css={itemValueStyle}>Not mentioned</div>
              </div>
              <div css={statusIndicatorStyle(false)}>
                <div css={dotStyle(false)} />
              </div>
            </div>
          )}

          {metadata.goals?.must_haves && metadata.goals.must_haves.length > 0 ? (
            <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
              <div>
                <div css={itemLabelStyle}>Must-Haves</div>
                <div css={itemValueStyle}>{metadata.goals.must_haves.join(", ")}</div>
              </div>
              <div css={statusIndicatorStyle(true)}>
                <div css={dotStyle(true)} />
              </div>
            </div>
          ) : (
            <div css={[itemStyle, { opacity: 0.5 }]}>
              <div>
                <div css={itemLabelStyle}>Must-Haves</div>
                <div css={itemValueStyle}>Not discussed</div>
              </div>
              <div css={statusIndicatorStyle(false)}>
                <div css={dotStyle(false)} />
              </div>
            </div>
          )}
        </div>

        {/* Budget & Timeline */}
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>💰 Budget & Timeline</div>
          {metadata.budget ? (
            <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
              <div>
                <div css={itemLabelStyle}>Budget Range</div>
                <div css={itemValueStyle}>{metadata.budget.range || "Amount provided"}</div>
              </div>
              <div css={statusIndicatorStyle(true)}>
                <div css={dotStyle(true)} />
              </div>
            </div>
          ) : (
            <div css={[itemStyle, { opacity: 0.5 }]}>
              <div>
                <div css={itemLabelStyle}>Budget Range</div>
                <div css={itemValueStyle}>Not yet discussed</div>
              </div>
              <div css={statusIndicatorStyle(false)}>
                <div css={dotStyle(false)} />
              </div>
            </div>
          )}

          {metadata.timeline ? (
            <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
              <div>
                <div css={itemLabelStyle}>Timeline</div>
                <div css={itemValueStyle}>{metadata.timeline.flexibility || "Discussed"}</div>
              </div>
              <div css={statusIndicatorStyle(true)}>
                <div css={dotStyle(true)} />
              </div>
            </div>
          ) : (
            <div css={[itemStyle, { opacity: 0.5 }]}>
              <div>
                <div css={itemLabelStyle}>Timeline</div>
                <div css={itemValueStyle}>Not explored</div>
              </div>
              <div css={statusIndicatorStyle(false)}>
                <div css={dotStyle(false)} />
              </div>
            </div>
          )}
        </div>

        {/* Lifestyle & Constraints */}
        {context.phase.includes("1d") && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>👥 Lifestyle & Constraints</div>
            {metadata.lifestyle?.household_size ? (
              <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
                <div>
                  <div css={itemLabelStyle}>Household</div>
                  <div css={itemValueStyle}>{metadata.lifestyle.household_size} people</div>
                </div>
                <div css={statusIndicatorStyle(true)}>
                  <div css={dotStyle(true)} />
                </div>
              </div>
            ) : (
              <div css={[itemStyle, { opacity: 0.5 }]}>
                <div>
                  <div css={itemLabelStyle}>Household</div>
                  <div css={itemValueStyle}>Not mentioned</div>
                </div>
                <div css={statusIndicatorStyle(false)}>
                  <div css={dotStyle(false)} />
                </div>
              </div>
            )}

            {metadata.constraints ? (
              <div css={[itemStyle, { borderLeftColor: SemanticTokens.Color.Foreground.BRAND }]}>
                <div>
                  <div css={itemLabelStyle}>Constraints</div>
                  <div css={itemValueStyle}>Identified</div>
                </div>
                <div css={statusIndicatorStyle(true)}>
                  <div css={dotStyle(true)} />
                </div>
              </div>
            ) : (
              <div css={[itemStyle, { opacity: 0.5 }]}>
                <div>
                  <div css={itemLabelStyle}>Constraints</div>
                  <div css={itemValueStyle}>Not discussed</div>
                </div>
                <div css={statusIndicatorStyle(false)}>
                  <div css={dotStyle(false)} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Confidence Note */}
        <div css={emptyStateStyle}>
          Confidence: {Math.round((metadata.confidence || 0) * 100)}%
        </div>
      </div>
    </div>
  );
}
