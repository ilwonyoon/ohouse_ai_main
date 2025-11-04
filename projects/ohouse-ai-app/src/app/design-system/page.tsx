'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import ColorGrid from './components/ColorGrid';
import TypographyShowcase from './components/TypographyShowcase';
import ComponentLibrary from './components/ComponentLibrary';
import TokenViewer from './components/TokenViewer';
import StateVariants from './components/StateVariants';
import AccessibilityChecks from './components/AccessibilityChecks';

type Section = 'colors' | 'typography' | 'components' | 'tokens' | 'states' | 'accessibility' | 'animations';

const SECTIONS = [
  { id: 'colors', label: '🎨 Colors', icon: '🎨' },
  { id: 'typography', label: '🔤 Typography', icon: '🔤' },
  { id: 'components', label: '🧩 Components', icon: '🧩' },
  { id: 'states', label: '✨ States & Variants', icon: '✨' },
  { id: 'tokens', label: '📦 Tokens', icon: '📦' },
  { id: 'animations', label: '🎬 Animations', icon: '🎬' },
  { id: 'accessibility', label: '♿ Accessibility', icon: '♿' },
] as const;

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<Section>('colors');

  const sidebarStyle = css`
    width: 280px;
    background-color: #f7f9fa;
    border-right: 1px solid #e6e6e6;
    overflow-y: auto;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  `;

  const navStyle = css`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    flex: 1;
  `;

  const navItemStyle = (isActive: boolean) => css`
    padding: 12px 20px;
    border-left: 3px solid transparent;
    cursor: pointer;
    transition: all 200ms ease-out;
    color: ${isActive ? '#0aa5ff' : '#828c94'};
    border-left-color: ${isActive ? '#0aa5ff' : 'transparent'};
    background-color: ${isActive ? '#f0f8ff' : 'transparent'};
    font-weight: ${isActive ? 600 : 500};
    font-size: 14px;

    &:hover {
      background-color: #f0f8ff;
      color: #0aa5ff;
    }
  `;

  const mainContentStyle = css`
    flex: 1;
    overflow-y: auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
  `;

  const sectionTitleStyle = css`
    font-size: 32px;
    font-weight: 700;
    color: #2f3438;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  const sectionDescStyle = css`
    font-size: 16px;
    color: #828c94;
    margin-bottom: 40px;
    line-height: 1.5;
  `;

  const renderSection = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorGrid />;
      case 'typography':
        return <TypographyShowcase />;
      case 'components':
        return <ComponentLibrary />;
      case 'states':
        return <StateVariants />;
      case 'tokens':
        return <TokenViewer />;
      case 'animations':
        return (
          <div>
            <h2 css={sectionTitleStyle}>🎬 Animations & Motion</h2>
            <p css={sectionDescStyle}>
              Explore animation tokens, easing functions, durations, and motion design patterns.
            </p>
            <div css={css`
              background: #f7f9fa;
              border-radius: 12px;
              padding: 40px;
              text-align: center;
              color: #828c94;
            `}>
              <p>Animation showcase coming soon...</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                See ANIMATIONS.md for complete motion specifications
              </p>
            </div>
          </div>
        );
      case 'accessibility':
        return <AccessibilityChecks />;
      default:
        return null;
    }
  };

  return (
    <div css={css`display: flex; width: 100%; height: 100%;`}>
      {/* Sidebar Navigation */}
      <nav css={sidebarStyle}>
        <div css={css`padding: 20px;`}>
          <h2 css={css`
            font-size: 14px;
            font-weight: 700;
            color: #2f3438;
            margin: 0 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          `}>
            Sections
          </h2>
        </div>
        <div css={navStyle}>
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              css={navItemStyle(activeSection === section.id)}
              onClick={() => setActiveSection(section.id as Section)}
              style={{ border: 'none', background: 'none', textAlign: 'left', font: 'inherit' }}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Quick Links */}
        <div css={css`
          padding: 20px;
          border-top: 1px solid #e6e6e6;
          margin-top: auto;
        `}>
          <h3 css={css`
            font-size: 12px;
            font-weight: 700;
            color: #828c94;
            margin: 0 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          `}>
            Documentation
          </h3>
          <div css={css`display: flex; flex-direction: column; gap: 8px;`}>
            <a href="/design-system" css={css`
              font-size: 13px;
              color: #0aa5ff;
              text-decoration: none;
              transition: color 200ms;

              &:hover {
                color: #0087cc;
              }
            `}>
              📄 Design System Guide
            </a>
            <a href="/design-system" css={css`
              font-size: 13px;
              color: #0aa5ff;
              text-decoration: none;
              transition: color 200ms;

              &:hover {
                color: #0087cc;
              }
            `}>
              🎨 DESIGN_SYSTEM.md
            </a>
            <a href="/design-system" css={css`
              font-size: 13px;
              color: #0aa5ff;
              text-decoration: none;
              transition: color 200ms;

              &:hover {
                color: #0087cc;
              }
            `}>
              ♿ ACCESSIBILITY.md
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main css={mainContentStyle}>
        {renderSection()}
      </main>
    </div>
  );
}
