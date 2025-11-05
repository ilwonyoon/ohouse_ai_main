'use client';

import { css } from '@emotion/react';

interface ComingSoonProps {
  title: string;
  description: string;
  category: string;
}

export function ComingSoon({ title, description, category }: ComingSoonProps) {
  const containerStyle = css`
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
  `;

  const badgeStyle = css`
    display: inline-block;
    padding: 6px 12px;
    background-color: #e0f5ff;
    border: 1px solid #0aa5ff;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #0aa5ff;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;

  const titleStyle = css`
    margin: 0 0 12px 0;
    font-size: 32px;
    font-weight: 700;
    color: #2f3438;
  `;

  const descriptionStyle = css`
    margin: 0 0 32px 0;
    font-size: 16px;
    color: #828c94;
    line-height: 1.6;
    max-width: 500px;
  `;

  const iconStyle = css`
    font-size: 64px;
    margin-bottom: 24px;
    opacity: 0.5;
  `;

  const timelineStyle = css`
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 48px;
    padding-top: 48px;
    border-top: 1px solid #e6e6e6;
  `;

  const phaseStyle = css`
    padding: 16px 24px;
    background-color: #f7f9fa;
    border-radius: 8px;
    text-align: left;

    h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2f3438;
    }

    p {
      margin: 0;
      font-size: 12px;
      color: #828c94;
    }
  `;

  return (
    <div css={containerStyle}>
      <div css={iconStyle}>🚀</div>
      <div css={badgeStyle}>Coming Soon</div>
      <h1 css={titleStyle}>{title}</h1>
      <p css={descriptionStyle}>{description}</p>

      <div css={timelineStyle}>
        <div css={phaseStyle}>
          <h4>Phase 1</h4>
          <p>Foundation & Core</p>
        </div>
        <div css={phaseStyle}>
          <h4>Phase 2</h4>
          <p>Components</p>
        </div>
        <div css={phaseStyle}>
          <h4>Phase 3</h4>
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
}
