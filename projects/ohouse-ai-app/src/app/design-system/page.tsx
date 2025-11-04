'use client';

import { css } from '@emotion/react';
import Link from 'next/link';
import { CodeBlock } from './components/CodeBlock';

export default function DesignSystemHomepage() {
  const pageStyle = css`
    max-width: 1200px;
    margin: 0 auto;
  `;

  const heroStyle = css`
    text-align: center;
    padding: 48px 0;
    margin-bottom: 64px;
    border-bottom: 2px solid #e6e6e6;
  `;

  const titleStyle = css`
    margin: 0 0 16px 0;
    font-size: 48px;
    font-weight: 700;
    color: #2f3438;
  `;

  const subtitleStyle = css`
    margin: 0;
    font-size: 20px;
    color: #828c94;
    line-height: 1.6;
  `;

  const sectionStyle = css`
    margin: 64px 0;

    > h2 {
      margin: 0 0 32px 0;
      font-size: 32px;
      font-weight: 700;
      color: #2f3438;
      border-bottom: 2px solid #e6e6e6;
      padding-bottom: 16px;
    }
  `;

  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  `;

  const componentCardStyle = css`
    padding: 32px 24px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #ffffff;
    cursor: pointer;
    transition: all 200ms ease-out;
    text-decoration: none;

    &:hover {
      border-color: #0aa5ff;
      box-shadow: 0 4px 16px rgba(10, 165, 255, 0.12);
      transform: translateY(-2px);
    }

    h3 {
      margin: 0 0 12px 0;
      font-size: 20px;
      font-weight: 600;
      color: #2f3438;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #828c94;
      line-height: 1.6;
    }
  `;

  const featureListStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 32px;
  `;

  const featureItemStyle = css`
    display: flex;
    gap: 16px;
    padding: 24px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #f7f9fa;
  `;

  const featureIconStyle = css`
    font-size: 32px;
    flex-shrink: 0;
  `;

  const featureContentStyle = css`
    flex: 1;

    h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2f3438;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #828c94;
      line-height: 1.6;
    }
  `;

  const quickStartStyle = css`
    background-color: #f0f8ff;
    border: 1px solid #0aa5ff;
    border-radius: 8px;
    padding: 32px;
    margin-top: 32px;
  `;

  const quickStartTitleStyle = css`
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 700;
    color: #0aa5ff;
  `;

  return (
    <div css={pageStyle}>
      <div css={heroStyle}>
        <h1 css={titleStyle}>Ohouse AI Design System</h1>
        <p css={subtitleStyle}>
          A comprehensive design system for building consistent, accessible, and beautiful user
          interfaces.
        </p>
      </div>

      <div css={sectionStyle}>
        <h2>Key Features</h2>
        <div css={featureListStyle}>
          <div css={featureItemStyle}>
            <div css={featureIconStyle}>🎨</div>
            <div css={featureContentStyle}>
              <h3>Comprehensive Color System</h3>
              <p>
                Organized primitive and semantic colors with WCAG AA accessibility compliance
              </p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>🔤</div>
            <div css={featureContentStyle}>
              <h3>Typography Scale</h3>
              <p>Carefully crafted font sizes, weights, and line heights for optimal readability</p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>🧩</div>
            <div css={featureContentStyle}>
              <h3>Reusable Components</h3>
              <p>Battle-tested components for buttons, forms, cards, modals, and more</p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>♿</div>
            <div css={featureContentStyle}>
              <h3>Accessibility First</h3>
              <p>All components follow WCAG 2.1 Level AA guidelines for inclusive design</p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>📦</div>
            <div css={featureContentStyle}>
              <h3>Design Tokens</h3>
              <p>Semantic tokens for colors, spacing, typography, and animations</p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>🎬</div>
            <div css={featureContentStyle}>
              <h3>Animations & Transitions</h3>
              <p>Consistent motion design for smooth, delightful user interactions</p>
            </div>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Components</h2>
        <p css={css`font-size: 16px; color: #828c94; margin-bottom: 32px;`}>
          Explore our library of reusable components with live previews and code examples
        </p>
        <div css={gridStyle}>
          <Link href="/design-system/components/button" css={componentCardStyle}>
            <h3>Button</h3>
            <p>Versatile button component with multiple variants, sizes, and states</p>
          </Link>

          <Link href="/design-system/components/card" css={componentCardStyle}>
            <h3>Card</h3>
            <p>Container component for grouping related content with consistent styling</p>
          </Link>

          <Link href="/design-system/components/input" css={componentCardStyle}>
            <h3>Input</h3>
            <p>Text input component with validation states and helper text support</p>
          </Link>

          <Link href="/design-system/components/select" css={componentCardStyle}>
            <h3>Select</h3>
            <p>Dropdown component for selecting from a list of options</p>
          </Link>

          <Link href="/design-system/components/modal" css={componentCardStyle}>
            <h3>Modal</h3>
            <p>Dialog component for focused user interactions and confirmations</p>
          </Link>

          <Link href="/design-system/components/badge" css={componentCardStyle}>
            <h3>Badge</h3>
            <p>Small component for displaying labels, statuses, and counts</p>
          </Link>

          <Link href="/design-system/components/tabs" css={componentCardStyle}>
            <h3>Tabs</h3>
            <p>Tabbed interface for organizing content into separate sections</p>
          </Link>

          <Link href="/design-system/components/toast" css={componentCardStyle}>
            <h3>Toast</h3>
            <p>Notification component for displaying temporary messages to users</p>
          </Link>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Design Tokens</h2>
        <p css={css`font-size: 16px; color: #828c94; margin-bottom: 24px;`}>
          Use design tokens to maintain consistency across your application
        </p>
        <div css={quickStartStyle}>
          <h3 css={quickStartTitleStyle}>Quick Start</h3>
          <CodeBlock
            code={`import {
  PrimitiveTokens,
  SemanticTokens,
  ComponentTokens,
  AnimationTokens
} from '@/docs/tokens';

// Use semantic color token
const buttonColor = SemanticTokens.Color.Foreground.BRAND; // #0AA5FF

// Use animation token
const duration = AnimationTokens.Duration.NORMAL; // 300ms

// Use component token
const buttonPadding = ComponentTokens.Button.Padding.MD; // 10px 20px`}
            language="typescript"
          />
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Getting Started</h2>
        <div css={featureListStyle}>
          <div css={featureItemStyle}>
            <div css={featureIconStyle}>📚</div>
            <div css={featureContentStyle}>
              <h3>Read the Docs</h3>
              <p>
                Check out the component documentation pages for detailed usage examples and
                guidelines
              </p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>🎨</div>
            <div css={featureContentStyle}>
              <h3>Copy Components</h3>
              <p>
                Copy the components you need to your project and customize them as needed
              </p>
            </div>
          </div>

          <div css={featureItemStyle}>
            <div css={featureIconStyle}>🚀</div>
            <div css={featureContentStyle}>
              <h3>Build with Consistency</h3>
              <p>
                Use design tokens and components to build interfaces that match the design
                system
              </p>
            </div>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Documentation</h2>
        <div css={featureListStyle}>
          <a
            href="https://github.com/ilwonyoon/ohouse_ai_main"
            target="_blank"
            rel="noopener noreferrer"
            css={componentCardStyle}
          >
            <h3>📄 Design Tokens</h3>
            <p>Complete reference of all design tokens organized by category</p>
          </a>

          <a
            href="https://github.com/ilwonyoon/ohouse_ai_main"
            target="_blank"
            rel="noopener noreferrer"
            css={componentCardStyle}
          >
            <h3>♿ Accessibility Guidelines</h3>
            <p>WCAG 2.1 Level AA compliance checklist and implementation guidelines</p>
          </a>

          <a
            href="https://github.com/ilwonyoon/ohouse_ai_main"
            target="_blank"
            rel="noopener noreferrer"
            css={componentCardStyle}
          >
            <h3>🎬 Animations</h3>
            <p>Motion design guidelines, transitions, and animation specifications</p>
          </a>
        </div>
      </div>
    </div>
  );
}
