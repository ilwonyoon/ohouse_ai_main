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
    height: 64px;
    padding: 0 32px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    flex-shrink: 0;
  `;

  const logoStyle = css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #2f3438;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  `;

  const navStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;

    a {
      padding: 8px 12px;
      font-size: 14px;
      color: #828c94;
      text-decoration: none;
      border-radius: 6px;
      transition: all 200ms ease-out;

      &:hover {
        color: #2f3438;
        background-color: #f7f9fa;
      }
    }
  `;

  const searchStyle = css`
    flex: 1;
    max-width: 400px;
    margin: 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #f7f9fa;
    font-size: 14px;
    color: #828c94;

    input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 14px;
      color: #2f3438;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #c2c8cc;
      }
    }

    kbd {
      padding: 4px 8px;
      background-color: #ffffff;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      font-size: 12px;
      color: #828c94;
      font-family: monospace;
    }
  `;

  const contentStyle = css`
    flex: 1;
    overflow: hidden;
    display: flex;
    background-color: #ffffff;
  `;

  const sidebarStyle = css`
    width: 280px;
    border-right: 1px solid #e6e6e6;
    overflow-y: auto;
    padding: 24px 0;
    background-color: #ffffff;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #e6e6e6;
      border-radius: 4px;

      &:hover {
        background: #c2c8cc;
      }
    }
  `;

  const sectionStyle = css`
    padding: 0 12px;
    margin-bottom: 24px;
  `;

  const sectionTitleStyle = css`
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #828c94;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  `;

  const navItemStyle = css`
    display: block;
    padding: 8px 12px;
    font-size: 14px;
    color: #828c94;
    text-decoration: none;
    border-radius: 6px;
    transition: all 200ms ease-out;
    margin-bottom: 4px;

    &:hover {
      color: #2f3438;
      background-color: #f7f9fa;
    }

    &.active {
      color: #0aa5ff;
      background-color: #f0f8ff;
      font-weight: 600;
    }
  `;

  const mainStyle = css`
    flex: 1;
    overflow-y: auto;
    padding: 32px 48px;
    background-color: #ffffff;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #e6e6e6;
      border-radius: 4px;

      &:hover {
        background: #c2c8cc;
      }
    }
  `;

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <a href="/design-system" css={logoStyle}>
          🎨 Ohouse AI
        </a>
        <nav css={navStyle}>
          <a href="/design-system">Docs</a>
          <a href="/design-system/components">Components</a>
          <a href="/design-system#themes">Themes</a>
          <a href="/design-system#colors">Colors</a>
        </nav>
        <div css={searchStyle}>
          <span>🔍</span>
          <input type="text" placeholder="Search documentation..." />
          <kbd>⌘ K</kbd>
        </div>
      </header>
      <div css={contentStyle}>
        <aside css={sidebarStyle}>
          <nav css={sectionStyle}>
            <div css={sectionTitleStyle}>Foundation</div>
            <a href="/design-system/foundation/typography" css={navItemStyle}>Typography</a>
            <a href="/design-system/foundation/colors" css={navItemStyle}>Colors</a>
            <a href="/design-system/foundation/spacing" css={navItemStyle}>Spacing</a>
            <a href="/design-system/foundation/icons" css={navItemStyle}>Icons</a>
          </nav>

          <nav css={sectionStyle}>
            <div css={sectionTitleStyle}>Getting Started</div>
            <a href="/design-system" css={navItemStyle}>Overview</a>
            <a href="/design-system/foundation/tokens" css={navItemStyle}>Design Tokens</a>
            <a href="/design-system/foundation/accessibility" css={navItemStyle}>Accessibility</a>
          </nav>

          <nav css={sectionStyle}>
            <div css={sectionTitleStyle}>Components</div>
            <a href="/design-system/components/button" css={navItemStyle}>Button</a>
            <a href="/design-system/components/card" css={navItemStyle}>Card</a>
            <a href="/design-system/components/input" css={navItemStyle}>Input</a>
            <a href="/design-system/components/select" css={navItemStyle}>Select</a>
            <a href="/design-system/components/modal" css={navItemStyle}>Modal</a>
            <a href="/design-system/components/badge" css={navItemStyle}>Badge</a>
            <a href="/design-system/components/tabs" css={navItemStyle}>Tabs</a>
            <a href="/design-system/components/toast" css={navItemStyle}>Toast</a>
          </nav>

          <nav css={sectionStyle}>
            <div css={sectionTitleStyle}>Patterns</div>
            <a href="/design-system/patterns/forms" css={navItemStyle}>Forms</a>
            <a href="/design-system/patterns/layout" css={navItemStyle}>Layout</a>
            <a href="/design-system/patterns/navigation" css={navItemStyle}>Navigation</a>
          </nav>

          <nav css={sectionStyle}>
            <div css={sectionTitleStyle}>Resources</div>
            <a href="/design-system#colors" css={navItemStyle}>Color System</a>
            <a href="/design-system#tokens" css={navItemStyle}>Token Reference</a>
            <a href="/design-system#animations" css={navItemStyle}>Animations</a>
          </nav>
        </aside>

        <main css={mainStyle}>
          {children}
        </main>
      </div>
    </div>
  );
}
