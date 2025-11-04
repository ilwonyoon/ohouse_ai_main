'use client';

import { css } from '@emotion/react';

export default function Page() {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
  `;

  const titleStyles = css`
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 16px;
  `;

  const subtitleStyles = css`
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 32px;
    line-height: 1.5;
  `;

  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>Entry Revival</h1>
      <p css={subtitleStyles}>
        Feature development workspace
      </p>
    </div>
  );
}
