/**
 * Metadata Panel Component
 * Real-time visualization of extracted metadata
 * Shows what the AI has learned about the user's project
 */

"use client";

import React from "react";
import { css } from "@emotion/react";
import { PrimitiveTokens, SemanticTokens } from "@/tokens";
import { ExtractedMetadata, ConsultationContext } from "@/types/consultation";

// ===== STYLES =====

const panelStyle = css`
  display: flex;
  flex-direction: column;
  background: ${SemanticTokens.Color.Background.DEFAULT};
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const headerStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  border-bottom: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  background-color: #f9f9f9;

  h2 {
    margin: 0;
    font-size: ${PrimitiveTokens.Typography.FontSize.LG};
    font-weight: ${PrimitiveTokens.Typography.FontWeight.SEMIBOLD};
    color: ${SemanticTokens.Color.Foreground.DEFAULT};
    font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
  }

  p {
    margin: ${PrimitiveTokens.Spacing.EXTRA_SMALL} 0 0 0;
    font-size: ${PrimitiveTokens.Typography.FontSize.SM};
    color: ${SemanticTokens.Color.Foreground.SECONDARY};
  }
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
  font-size: ${PrimitiveTokens.Typography.FontSize.SM};
  font-weight: ${PrimitiveTokens.Typography.FontWeight.SEMIBOLD};
  color: ${SemanticTokens.Color.Foreground.DEFAULT};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
`;

const itemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${PrimitiveTokens.Spacing.EXTRA_SMALL} ${PrimitiveTokens.Spacing.SMALL};
  background-color: #f5f7fa;
  border-radius: ${PrimitiveTokens.BorderRadius.TIGHT};
  font-size: ${PrimitiveTokens.Typography.FontSize.MD};
  color: ${SemanticTokens.Color.Foreground.DEFAULT};
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};

  &.empty {
    color: ${SemanticTokens.Color.Foreground.SECONDARY};
    font-size: ${PrimitiveTokens.Typography.FontSize.SM};
    font-style: italic;
  }
`;

const badgeStyle = css`
  display: inline-block;
  padding: 2px 8px;
  background-color: ${SemanticTokens.Color.Foreground.BRAND};
  color: white;
  border-radius: 4px;
  font-size: ${PrimitiveTokens.Typography.FontSize.XS};
  font-weight: ${PrimitiveTokens.Typography.FontWeight.MEDIUM};
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
`;

const confidenceBarStyle = css`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: ${PrimitiveTokens.Spacing.EXTRA_SMALL};

  &::after {
    content: "";
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${SemanticTokens.Color.Foreground.BRAND} 0%,
      #00d4ff 100%
    );
  }
`;

// ===== COMPONENT =====

interface MetadataPanelProps {
  metadata: ExtractedMetadata;
  context: ConsultationContext;
}

export function MetadataPanel({ metadata, context }: MetadataPanelProps) {
  const confidencePercent = Math.round((metadata.confidence || 0) * 100);

  return (
    <div css={panelStyle}>
      <div css={headerStyle}>
        <h2>Project Metadata</h2>
        <p>Real-time information extraction</p>
      </div>

      <div css={contentStyle}>
        {/* Confidence Score */}
        <div css={sectionStyle}>
          <div css={sectionTitleStyle}>Overall Confidence</div>
          <div css={itemStyle}>
            <span>{confidencePercent}% complete</span>
            <div
              css={confidenceBarStyle}
              style={{
                maxWidth: `${confidencePercent}%`,
              }}
            />
          </div>
        </div>

        {/* Project Scope */}
        {metadata.projectScope && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Project Scope</div>
            <div css={itemStyle}>
              <span>{metadata.projectScope.type}</span>
              <span css={badgeStyle}>{metadata.projectScope.type}</span>
            </div>
            {metadata.projectScope.rooms?.length > 0 && (
              <div css={itemStyle}>
                <span>Rooms: {metadata.projectScope.rooms.join(", ")}</span>
              </div>
            )}
          </div>
        )}

        {/* Room Information */}
        {metadata.room && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Room</div>
            {metadata.room.primary && (
              <div css={itemStyle}>
                <span>Primary: {metadata.room.primary}</span>
              </div>
            )}
            {metadata.room.natural_light && (
              <div css={itemStyle}>
                <span>Light: {metadata.room.natural_light}</span>
              </div>
            )}
            {metadata.room.current_issues?.length > 0 && (
              <div css={itemStyle}>
                <span>Issues: {metadata.room.current_issues.join(", ")}</span>
              </div>
            )}
          </div>
        )}

        {/* Goals */}
        {metadata.goals && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Goals</div>
            {metadata.goals.primary && (
              <div css={itemStyle}>
                <span>{metadata.goals.primary}</span>
              </div>
            )}
            {metadata.goals.emotional_outcome && (
              <div css={itemStyle}>
                <span>Feel: {metadata.goals.emotional_outcome}</span>
              </div>
            )}
            {metadata.goals.pain_points?.length > 0 && (
              <div css={itemStyle}>
                <span>Pain: {metadata.goals.pain_points.join(", ")}</span>
              </div>
            )}
            {metadata.goals.must_haves?.length > 0 && (
              <div css={itemStyle}>
                <span>Must: {metadata.goals.must_haves.join(", ")}</span>
              </div>
            )}
          </div>
        )}

        {/* Budget */}
        {metadata.budget && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Budget</div>
            {metadata.budget.range && (
              <div css={itemStyle}>
                <span>Range: {metadata.budget.range}</span>
              </div>
            )}
            {metadata.budget.total && (
              <div css={itemStyle}>
                <span>Total: ${metadata.budget.total.toLocaleString()}</span>
              </div>
            )}
            {metadata.budget.comfort_level && (
              <div css={itemStyle}>
                <span>Comfort: {metadata.budget.comfort_level}</span>
              </div>
            )}
          </div>
        )}

        {/* Timeline */}
        {metadata.timeline && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Timeline</div>
            {metadata.timeline.flexibility && (
              <div css={itemStyle}>
                <span>{metadata.timeline.flexibility}</span>
              </div>
            )}
            {metadata.timeline.drivers?.length > 0 && (
              <div css={itemStyle}>
                <span>Drivers: {metadata.timeline.drivers.join(", ")}</span>
              </div>
            )}
          </div>
        )}

        {/* Lifestyle */}
        {metadata.lifestyle && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Lifestyle</div>
            {metadata.lifestyle.household_size && (
              <div css={itemStyle}>
                <span>Household: {metadata.lifestyle.household_size} people</span>
              </div>
            )}
            {metadata.lifestyle.children && (
              <div css={itemStyle}>
                <span>
                  Children: {metadata.lifestyle.children.count}{" "}
                  {metadata.lifestyle.children.ages.length > 0 &&
                    `(ages: ${metadata.lifestyle.children.ages.join(", ")})`}
                </span>
              </div>
            )}
            {metadata.lifestyle.pets?.length > 0 && (
              <div css={itemStyle}>
                <span>
                  Pets: {metadata.lifestyle.pets.map((p) => p.type).join(", ")}
                </span>
              </div>
            )}
            {metadata.lifestyle.work_from_home && (
              <div css={itemStyle}>
                <span>WFH: {metadata.lifestyle.work_from_home}</span>
              </div>
            )}
          </div>
        )}

        {/* Constraints */}
        {metadata.constraints && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Constraints</div>
            {metadata.constraints.ownership && (
              <div css={itemStyle}>
                <span>{metadata.constraints.ownership === "rented" ? "🏠 Rented" : "🏡 Owned"}</span>
              </div>
            )}
            {metadata.constraints.architectural_constraints?.length > 0 && (
              <div css={itemStyle}>
                <span>
                  Arch: {metadata.constraints.architectural_constraints.join(", ")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Style Hints */}
        {metadata.style?.style_hints?.length > 0 && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Style</div>
            {metadata.style.style_hints.map((style) => (
              <div key={style} css={itemStyle}>
                <span>{style}</span>
              </div>
            ))}
          </div>
        )}

        {/* Keywords */}
        {metadata.rawKeywords?.length > 0 && (
          <div css={sectionStyle}>
            <div css={sectionTitleStyle}>Keywords</div>
            <div css={itemStyle}>
              <span>{metadata.rawKeywords.slice(0, 3).join(", ")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
