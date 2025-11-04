'use client';

import { ReactNode } from 'react';
import { css } from '@emotion/react';

interface DesignSystemLayoutProps {
  children: ReactNode;
}

export default function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  const containerStyle = css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    overflow: hidden;
  `;

  const headerStyle = css`
    height: 60px;
    padding: 0 32px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    flex-shrink: 0;

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #2f3438;
    }
  `;

  const contentStyle = css`
    flex: 1;
    overflow: hidden;
    display: flex;
  `;

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <h1>🎨 Ohouse AI Design System</h1>
      </header>
      <div css={contentStyle}>
        {children}
      </div>
    </div>
  );
}
