'use client';

import Link from 'next/link';
import MobileContainer from '@/components/layout/MobileContainer';
import { css } from '@emotion/react';

export default function GalleryPage() {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    color: white;
    text-align: center;
  `;

  const titleStyles = css`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #1a1a1a;
  `;

  const subtitleStyles = css`
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 32px;
    color: #1a1a1a;
  `;

  const buttonStyles = css`
    background: white;
    color: #a8edea;
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
        <h1 css={titleStyles}>🖼️ Gallery</h1>
        <p css={subtitleStyles}>
          View and manage your design collection
        </p>

        <div css={css`
          background: rgba(0, 0, 0, 0.1);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 12px;
          line-height: 1.6;
          color: #1a1a1a;
        `}>
          <p>Feature page for Gallery project</p>
          <p style={{ marginTop: '8px', opacity: 0.7 }}>Coming soon...</p>
        </div>

        <Link href="/">
          <button css={buttonStyles}>← Back to Home</button>
        </Link>
      </div>
    </MobileContainer>
  );
}
