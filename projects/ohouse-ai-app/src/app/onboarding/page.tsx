'use client';

import Link from 'next/link';
import MobileContainer from '@/components/layout/MobileContainer';
import { css } from '@emotion/react';

export default function OnboardingPage() {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    text-align: center;
  `;

  const titleStyles = css`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
  `;

  const subtitleStyles = css`
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 32px;
  `;

  const buttonStyles = css`
    background: white;
    color: #f5576c;
    border: none;
    padding: 12px 24px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 16px;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  `;

  return (
    <MobileContainer>
      <div css={containerStyles}>
        <h1 css={titleStyles}>🎯 Onboarding</h1>
        <p css={subtitleStyles}>
          Get started with your interior design journey
        </p>

        <div css={css`
          background: rgba(255, 255, 255, 0.1);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 12px;
          line-height: 1.6;
        `}>
          <p>Feature page for Onboarding project</p>
          <p style={{ marginTop: '8px', opacity: 0.7 }}>Coming soon...</p>
        </div>

        <Link href="/">
          <button css={buttonStyles}>← Back to Home</button>
        </Link>
      </div>
    </MobileContainer>
  );
}
