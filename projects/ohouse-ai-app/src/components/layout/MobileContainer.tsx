'use client';

import { ReactNode, CSSProperties } from 'react';
import { css } from '@emotion/react';

interface MobileContainerProps {
  children: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  const containerStyle: CSSProperties = {
    // Fixed mobile viewport
    width: '375px',
    height: '812px',

    // Container behavior
    position: 'relative',
    overflow: 'hidden',
    background: '#ffffff',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    borderRadius: '20px',

    // Safe area for notch-aware phones
    display: 'flex',
    flexDirection: 'column',
  };

  const wrapperStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch',
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background: #f5f5f5;

        @media (max-width: 425px) {
          padding: 0;

          > div {
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        }
      `}
    >
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
