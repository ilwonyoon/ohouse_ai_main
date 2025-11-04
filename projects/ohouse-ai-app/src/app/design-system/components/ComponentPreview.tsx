'use client';

import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function ComponentPreview({
  children,
  title,
  description,
}: ComponentPreviewProps) {
  const containerStyle = css`
    margin: 32px 0;
  `;

  const titleStyle = css`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #2f3438;
  `;

  const descriptionStyle = css`
    margin: 0 0 16px 0;
    font-size: 14px;
    color: #828c94;
    line-height: 1.6;
  `;

  const previewStyle = css`
    padding: 32px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    gap: 16px;
    flex-wrap: wrap;
  `;

  return (
    <div css={containerStyle}>
      {title && <h3 css={titleStyle}>{title}</h3>}
      {description && <p css={descriptionStyle}>{description}</p>}
      <div css={previewStyle}>{children}</div>
    </div>
  );
}
