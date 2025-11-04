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

    // Center on larger screens
    margin: '0 auto',

    // Container behavior
    position: 'relative',
    overflow: 'hidden',
    background: '#ffffff',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',

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
        align-items: flex-start;
        min-height: 100vh;
        padding: 20px;

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
