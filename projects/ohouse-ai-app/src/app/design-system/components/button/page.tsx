'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import { CodeBlock } from '../CodeBlock';
import { ComponentPreview } from '../ComponentPreview';
import { SemanticTokenEditor } from '../SemanticTokenEditor';

export default function ButtonPage() {
  const [primaryTokens, setPrimaryTokens] = useState({
    backgroundColor: '#0aa5ff',
    textColor: '#ffffff',
    hoverBackgroundColor: '#0087cc',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
  });

  const handlePrimaryTokenChange = (tokenKey: string, value: string | number) => {
    setPrimaryTokens((prev) => ({
      ...prev,
      [tokenKey]: value,
    }));
  };

  const [secondaryTokens, setSecondaryTokens] = useState({
    backgroundColor: '#f7f9fa',
    textColor: '#2f3438',
    borderColor: '#e6e6e6',
    hoverBackgroundColor: '#f0f8ff',
    hoverTextColor: '#0aa5ff',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
  });

  const handleSecondaryTokenChange = (tokenKey: string, value: string | number) => {
    setSecondaryTokens((prev) => ({
      ...prev,
      [tokenKey]: value,
    }));
  };
  const pageStyle = css`
    max-width: 900px;
  `;

  const headingStyle = css`
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 700;
    color: #2f3438;
  `;

  const descriptionStyle = css`
    margin: 0 0 32px 0;
    font-size: 16px;
    color: #828c94;
    line-height: 1.6;
  `;

  const sectionStyle = css`
    margin: 48px 0;

    > h2 {
      margin: 0 0 24px 0;
      font-size: 24px;
      font-weight: 700;
      color: #2f3438;
      border-bottom: 2px solid #e6e6e6;
      padding-bottom: 12px;
    }
  `;

  const propsTableStyle = css`
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;

    th {
      text-align: left;
      padding: 12px;
      background-color: #f7f9fa;
      border-bottom: 2px solid #e6e6e6;
      font-weight: 600;
      color: #2f3438;
      font-size: 14px;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #e6e6e6;
      font-size: 14px;
      color: #2f3438;
    }

    code {
      background-color: #f7f9fa;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      color: #0aa5ff;
    }
  `;

  const buttonExamplesStyle = css`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  `;

  const basicButtonStyle = css`
    padding: 10px 20px;
    background-color: #2f3438;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: #1a1d21;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid #0aa5ff;
      outline-offset: 2px;
    }
  `;

  const primaryButtonStyle = css`
    padding: ${primaryTokens.padding};
    background-color: ${primaryTokens.backgroundColor};
    color: ${primaryTokens.textColor};
    border: none;
    border-radius: ${primaryTokens.borderRadius};
    font-size: ${primaryTokens.fontSize};
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: ${primaryTokens.hoverBackgroundColor};
      box-shadow: 0 2px 8px rgba(10, 165, 255, 0.24);
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${primaryTokens.backgroundColor};
      outline-offset: 2px;
    }
  `;

  const secondaryButtonStyle = css`
    padding: ${secondaryTokens.padding};
    background-color: ${secondaryTokens.backgroundColor};
    color: ${secondaryTokens.textColor};
    border: 1px solid ${secondaryTokens.borderColor};
    border-radius: ${secondaryTokens.borderRadius};
    font-size: ${secondaryTokens.fontSize};
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      border-color: ${secondaryTokens.hoverTextColor};
      color: ${secondaryTokens.hoverTextColor};
      background-color: ${secondaryTokens.hoverBackgroundColor};
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${secondaryTokens.hoverTextColor};
      outline-offset: 2px;
    }
  `;

  const disabledButtonStyle = css`
    padding: 10px 20px;
    background-color: #c2c8cc;
    color: #828c94;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: not-allowed;
    opacity: 0.6;
  `;

  const dangerButtonStyle = css`
    padding: 10px 20px;
    background-color: #ff4444;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: #dd0000;
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid #0aa5ff;
      outline-offset: 2px;
    }
  `;

  const importCode = `import { Button } from '@/components/Button';

export function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}`;

  const propsCode = `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}`;

  // 새로운 디버그 패널 스타일
  const debugPanelStyle = css`
    margin: 24px 0;
    padding: 16px;
    background-color: #f0f8ff;
    border: 2px dashed #0aa5ff;
    border-radius: 8px;
    font-family: monospace;
    font-size: 12px;
    color: #2f3438;
    max-height: 120px;
    overflow-y: auto;
  `;

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Button Component</h1>
      <p css={descriptionStyle}>
        A versatile button component supporting multiple variants, sizes, and states.
        Use buttons for primary actions, secondary actions, and destructive operations.
      </p>

      <div css={sectionStyle}>
        <h2>Live Preview</h2>
        <ComponentPreview>
          <button css={basicButtonStyle}>Default</button>
          <button css={primaryButtonStyle}>Primary</button>
          <button css={secondaryButtonStyle}>Secondary</button>
          <button css={dangerButtonStyle}>Danger</button>
          <button css={disabledButtonStyle} disabled>
            Disabled
          </button>
        </ComponentPreview>

        {/* 실시간 업데이트 모니터링 */}
        <div css={debugPanelStyle}>
          <div><strong>🔄 현재 Primary Button 토큰:</strong></div>
          <div>backgroundColor: {primaryTokens.backgroundColor}</div>
          <div>textColor: {primaryTokens.textColor}</div>
          <div>padding: {primaryTokens.padding}</div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Installation</h2>
        <p>Copy the button component to your project:</p>
        <CodeBlock
          code={`cp components/button.tsx your-project/src/components/Button.tsx`}
          language="bash"
        />
      </div>

      <div css={sectionStyle}>
        <h2>Usage</h2>
        <CodeBlock code={importCode} language="typescript" />
      </div>

      <div css={sectionStyle}>
        <h2>Examples</h2>
        <h3 css={css`margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          Variants
        </h3>
        <ComponentPreview description="Different button variants for different use cases">
          <div css={buttonExamplesStyle}>
            <button css={basicButtonStyle}>Default</button>
            <button css={primaryButtonStyle}>Primary</button>
            <button css={secondaryButtonStyle}>Secondary</button>
            <button css={dangerButtonStyle}>Danger</button>
          </div>
        </ComponentPreview>

        <SemanticTokenEditor
          componentName="Primary Button"
          tokens={primaryTokens}
          onTokenChange={handlePrimaryTokenChange}
        />

        <SemanticTokenEditor
          componentName="Secondary Button"
          tokens={secondaryTokens}
          onTokenChange={handleSecondaryTokenChange}
        />

        <h3 css={css`margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          States
        </h3>
        <ComponentPreview description="Different button states including disabled">
          <div css={buttonExamplesStyle}>
            <button css={basicButtonStyle}>Hover me</button>
            <button css={basicButtonStyle} disabled>
              Disabled
            </button>
            <button css={css`${basicButtonStyle}; opacity: 0.6;`}>Loading...</button>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>API Reference</h2>
        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          Props
        </h3>
        <table css={propsTableStyle}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>variant</td>
              <td>
                <code>'default' | 'primary' | 'secondary' | 'danger'</code>
              </td>
              <td>'default'</td>
              <td>Visual style variant of the button</td>
            </tr>
            <tr>
              <td>size</td>
              <td>
                <code>'sm' | 'md' | 'lg'</code>
              </td>
              <td>'md'</td>
              <td>Button size</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>
                <code>boolean</code>
              </td>
              <td>false</td>
              <td>Whether the button is disabled</td>
            </tr>
            <tr>
              <td>isLoading</td>
              <td>
                <code>boolean</code>
              </td>
              <td>false</td>
              <td>Show loading state</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td>
                <code>() =&gt; void</code>
              </td>
              <td>-</td>
              <td>Click handler function</td>
            </tr>
          </tbody>
        </table>

        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          Type Definitions
        </h3>
        <CodeBlock code={propsCode} language="typescript" />
      </div>

      <div css={sectionStyle}>
        <h2>Accessibility</h2>
        <ul
          css={css`
            margin: 0;
            padding-left: 20px;
            color: #2f3438;
            line-height: 1.8;

            li {
              margin-bottom: 12px;
            }

            code {
              background-color: #f7f9fa;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
              color: #0aa5ff;
            }
          `}
        >
          <li>All buttons have visible focus indicators with 2px cyan outline</li>
          <li>Disabled buttons have reduced opacity and disabled attribute set</li>
          <li>Buttons support keyboard activation via Enter and Space keys</li>
          <li>Loading state should use aria-busy attribute</li>
          <li>Icon-only buttons should have aria-label</li>
          <li>Color contrast ratios meet WCAG AA standards (4.5:1)</li>
        </ul>
      </div>

      <div css={sectionStyle}>
        <h2>Best Practices</h2>
        <ul
          css={css`
            margin: 0;
            padding-left: 20px;
            color: #2f3438;
            line-height: 1.8;

            li {
              margin-bottom: 12px;
            }
          `}
        >
          <li>
            <strong>Primary actions:</strong> Use primary variant (blue) for the main call-to-action
          </li>
          <li>
            <strong>Secondary actions:</strong> Use secondary variant (outlined) for less important
            actions
          </li>
          <li>
            <strong>Destructive actions:</strong> Use danger variant (red) for delete/remove
            operations
          </li>
          <li>
            <strong>Loading states:</strong> Use isLoading prop to indicate async operations
          </li>
          <li>
            <strong>Disabled states:</strong> Only disable buttons when truly necessary to reduce
            user confusion
          </li>
        </ul>
      </div>
    </div>
  );
}
