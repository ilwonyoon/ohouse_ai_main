'use client';

import { css } from '@emotion/react';

export default function Home() {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
  `;

  const titleStyles = css`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
  `;

  const subtitleStyles = css`
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 32px;
    line-height: 1.5;
  `;

  const buttonStyles = css`
    background: white;
    color: #667eea;
    border: none;
    padding: 12px 32px;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  `;

  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>Ohouse AI</h1>
      <p css={subtitleStyles}>
        Your AI-Powered Interior Design Assistant
      </p>
      <button css={buttonStyles}>
        Get Started
      </button>
    </div>
  );
}
