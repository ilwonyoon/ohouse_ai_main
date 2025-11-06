/**
 * Consultation Layout Component
 * Displays chat UI alongside metadata panel
 * Follows ohouse-ai-app design system
 */

"use client";

import _React from "react";
import { css } from "@emotion/react";
import { PrimitiveTokens, SemanticTokens } from "@/tokens";
import { ConsultationChat } from "./ConsultationChat";
import { MetadataPanel } from "./MetadataPanel";
import { useConsultationState } from "@/hooks/useConsultationState";

// ===== STYLES =====

const layoutContainerStyle = css`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${PrimitiveTokens.Spacing.MEDIUM};
  height: 100vh;
  background: linear-gradient(
    135deg,
    ${SemanticTokens.Color.Background.DEFAULT} 0%,
    #f5f7fa 100%
  );
  padding: ${PrimitiveTokens.Spacing.MEDIUM};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${PrimitiveTokens.Spacing.SMALL};
    padding: ${PrimitiveTokens.Spacing.SMALL};
  }
`;

const chatContainerStyle = css`
  display: flex;
  flex-direction: column;
  background: ${SemanticTokens.Color.Background.DEFAULT};
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 1024px) {
    border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  }
`;

const headerStyle = css`
  padding: ${PrimitiveTokens.Spacing.MEDIUM};
  border-bottom: 1px solid ${SemanticTokens.Color.Border.DEFAULT};
  background-color: #f9f9f9;

  h1 {
    margin: 0;
    font-size: ${PrimitiveTokens.Typography.FontSize.XXL};
    font-weight: ${PrimitiveTokens.Typography.FontWeight.SEMIBOLD};
    color: ${SemanticTokens.Color.Foreground.DEFAULT};
    font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
  }

  p {
    margin: ${PrimitiveTokens.Spacing.EXTRA_SMALL} 0 0 0;
    font-size: ${PrimitiveTokens.Typography.FontSize.SM};
    color: ${SemanticTokens.Color.Foreground.SECONDARY};
    font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY}, ${PrimitiveTokens.Typography.FontFamily.FALLBACK};
  }
`;

const mobileViewportStyle = css`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 812px;
  margin: 0 auto;
  background: ${SemanticTokens.Color.Background.DEFAULT};
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    min-height: 600px;
    box-shadow: none;
  }
`;

const metadataSidebarStyle = css`
  display: flex;
  flex-direction: column;
  background: ${SemanticTokens.Color.Background.DEFAULT};
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// ===== COMPONENT =====

export function ConsultationLayout() {
  const { context, metadata } = useConsultationState();

  return (
    <div css={layoutContainerStyle}>
      {/* Chat Section */}
      <div css={chatContainerStyle}>
        <div css={headerStyle}>
          <h1>Interior Design Consultant</h1>
          <p>Let's discover the perfect design for your space</p>
        </div>
        <div css={mobileViewportStyle}>
          <ConsultationChat userId="user_default" />
        </div>
      </div>

      {/* Metadata Panel */}
      <div css={metadataSidebarStyle}>
        {context && <MetadataPanel metadata={metadata} context={context} />}
      </div>
    </div>
  );
}
