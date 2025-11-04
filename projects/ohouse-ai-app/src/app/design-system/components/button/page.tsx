'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import { CodeBlock } from '../CodeBlock';
import { ComponentPreview } from '../ComponentPreview';

export default function ButtonPage() {
  // 모든 버튼이 공유하는 기본 토큰
  const [sharedTokens, setSharedTokens] = useState({
    fontWeight: 600,
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
    transitionDuration: '200ms',
    borderRadius: '8px',
  });

  // Primary 버튼 컬러 토큰
  const [primaryColors, setPrimaryColors] = useState({
    backgroundColor: '#0aa5ff',
    textColor: '#ffffff',
    hoverBackgroundColor: '#0087cc',
    activeBackgroundColor: '#005fa3',
    disabledBackgroundColor: '#c2c8cc',
    disabledTextColor: '#828c94',
  });

  // Secondary 버튼 컬러 토큰
  const [secondaryColors, setSecondaryColors] = useState({
    backgroundColor: '#f7f9fa',
    textColor: '#2f3438',
    borderColor: '#e6e6e6',
    hoverBackgroundColor: '#f0f8ff',
    hoverTextColor: '#0aa5ff',
    hoverBorderColor: '#0aa5ff',
    disabledBackgroundColor: '#f5f5f5',
    disabledTextColor: '#828c94',
    disabledBorderColor: '#e6e6e6',
  });

  // 버튼 사이즈 정의
  const buttonSizes = [
    { name: 'Small', height: '28px', padding: '6px 12px', fontSize: '12px' },
    { name: 'Medium', height: '32px', padding: '8px 16px', fontSize: '13px' },
    { name: 'Default', height: '40px', padding: '10px 20px', fontSize: '14px' },
    { name: 'Large', height: '44px', padding: '12px 24px', fontSize: '15px' },
    { name: 'Extra Large', height: '50px', padding: '14px 28px', fontSize: '16px' },
  ];

  // 레이아웃 스타일
  const pageContainerStyle = css`
    display: flex;
    gap: 24px;
    height: 100vh;
  `;

  const mainContentStyle = css`
    flex: 1;
    overflow-y: auto;
    padding: 48px;
  `;

  const rightPanelStyle = css`
    width: 380px;
    background-color: #f7f9fa;
    border-left: 1px solid #e6e6e6;
    overflow-y: auto;
    padding: 24px;
    position: sticky;
    top: 0;
    height: 100vh;

    h3 {
      margin: 24px 0 16px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2f3438;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    h3:first-child {
      margin-top: 0;
    }
  `;

  const tokenGroupStyle = css`
    margin-bottom: 24px;
    padding: 16px;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
  `;

  const tokenInputGroupStyle = css`
    margin-bottom: 12px;

    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: #2f3438;
      margin-bottom: 6px;
      text-transform: capitalize;
    }

    input {
      width: 100%;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #e6e6e6;
      font-size: 13px;
      font-family: monospace;

      &:focus {
        outline: none;
        border-color: #0aa5ff;
        box-shadow: 0 0 0 3px rgba(10, 165, 255, 0.1);
      }
    }
  `;

  const sizeGridStyle = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  `;

  const sizeButtonStyle = css`
    padding: 16px;
    background-color: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    text-align: center;

    .label {
      font-size: 12px;
      font-weight: 600;
      color: #2f3438;
      margin-bottom: 8px;
    }

    .buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
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

  const dropdownStyle = css`
    margin-bottom: 16px;

    button {
      width: 100%;
      padding: 12px;
      background-color: #ffffff;
      color: #2f3438;
      border: 1px solid #e6e6e6;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f7f9fa;
        border-color: #0aa5ff;
      }
    }
  `;

  // 버튼 스타일 생성 함수
  const createButtonStyle = (
    backgroundColor: string,
    textColor: string,
    hoverBackgroundColor: string,
    fontSize: string,
    padding: string
  ) => css`
    padding: ${padding};
    background-color: ${backgroundColor};
    color: ${textColor};
    border: none;
    border-radius: ${sharedTokens.borderRadius};
    font-size: ${fontSize};
    font-weight: ${sharedTokens.fontWeight};
    font-family: ${sharedTokens.fontFamily};
    cursor: pointer;
    transition: all ${sharedTokens.transitionDuration} ease-out;

    &:hover {
      background-color: ${hoverBackgroundColor};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${backgroundColor};
      outline-offset: 2px;
    }
  `;

  const [expandedSections, setExpandedSections] = useState<string[]>(['shared', 'primary']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div css={pageContainerStyle}>
      {/* Main Content */}
      <div css={mainContentStyle}>
        <h1 css={headingStyle}>Button Component</h1>
        <p css={descriptionStyle}>
          A versatile button component supporting multiple variants, sizes, and states.
        </p>

        <div css={sectionStyle}>
          <h2>Button Sizes</h2>
          <ComponentPreview>
            <div css={sizeGridStyle}>
              {buttonSizes.map((size) => (
                <div key={size.name} css={sizeButtonStyle}>
                  <div className="label">{size.name} ({size.height})</div>
                  <div className="buttons">
                    <button css={createButtonStyle(primaryColors.backgroundColor, primaryColors.textColor, primaryColors.hoverBackgroundColor, size.fontSize, size.padding)}>
                      {size.name}
                    </button>
                    <button css={createButtonStyle(secondaryColors.backgroundColor, secondaryColors.textColor, secondaryColors.hoverBackgroundColor, size.fontSize, size.padding)} style={{ border: `1px solid ${secondaryColors.borderColor}` }}>
                      {size.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div css={sectionStyle}>
          <h2>Installation</h2>
          <p>Copy the button component to your project:</p>
          <CodeBlock code={`cp components/button.tsx your-project/src/components/Button.tsx`} language="bash" />
        </div>

        <div css={sectionStyle}>
          <h2>API Reference</h2>
          <details css={dropdownStyle}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
              📋 Props & Type Definitions
            </summary>
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '13px' }}>Props</h3>
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
                    <td><code>'primary' | 'secondary'</code></td>
                    <td>'primary'</td>
                    <td>Visual style variant</td>
                  </tr>
                  <tr>
                    <td>size</td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td>'md'</td>
                    <td>Button size</td>
                  </tr>
                  <tr>
                    <td>disabled</td>
                    <td><code>boolean</code></td>
                    <td>false</td>
                    <td>Disabled state</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>

          <details css={dropdownStyle}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
              ♿ Accessibility
            </summary>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '13px', color: '#2f3438', lineHeight: 1.8 }}>
              <li>Focus indicators with 2px cyan outline</li>
              <li>Disabled buttons with reduced opacity</li>
              <li>Keyboard activation support</li>
              <li>WCAG AA color contrast compliance</li>
            </ul>
          </details>

          <details css={dropdownStyle}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
              💡 Best Practices
            </summary>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '13px', color: '#2f3438', lineHeight: 1.8 }}>
              <li><strong>Primary:</strong> Main call-to-action</li>
              <li><strong>Secondary:</strong> Less important actions</li>
              <li><strong>Disabled:</strong> Only when necessary</li>
            </ul>
          </details>
        </div>
      </div>

      {/* Right Panel Editor */}
      <div css={rightPanelStyle}>
        <h3>Token Editor</h3>

        {/* Shared Tokens */}
        <div css={tokenGroupStyle}>
          <button
            onClick={() => toggleSection('shared')}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '8px 0',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2f3438',
            }}
          >
            <span>🎨 Shared Tokens</span>
            <span>{expandedSections.includes('shared') ? '▼' : '▶'}</span>
          </button>

          {expandedSections.includes('shared') && (
            <div style={{ marginTop: '12px' }}>
              <div css={tokenInputGroupStyle}>
                <label>Border Radius</label>
                <input
                  type="text"
                  value={sharedTokens.borderRadius}
                  onChange={(e) =>
                    setSharedTokens({ ...sharedTokens, borderRadius: e.target.value })
                  }
                />
              </div>
              <div css={tokenInputGroupStyle}>
                <label>Font Weight</label>
                <input
                  type="text"
                  value={sharedTokens.fontWeight}
                  onChange={(e) =>
                    setSharedTokens({ ...sharedTokens, fontWeight: parseInt(e.target.value) || 600 })
                  }
                />
              </div>
              <div css={tokenInputGroupStyle}>
                <label>Transition Duration</label>
                <input
                  type="text"
                  value={sharedTokens.transitionDuration}
                  onChange={(e) =>
                    setSharedTokens({ ...sharedTokens, transitionDuration: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Primary Colors */}
        <div css={tokenGroupStyle}>
          <button
            onClick={() => toggleSection('primary')}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '8px 0',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2f3438',
            }}
          >
            <span>🔵 Primary Colors</span>
            <span>{expandedSections.includes('primary') ? '▼' : '▶'}</span>
          </button>

          {expandedSections.includes('primary') && (
            <div style={{ marginTop: '12px' }}>
              {Object.entries(primaryColors).map(([key, value]) => (
                <div key={key} css={tokenInputGroupStyle}>
                  <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) =>
                        setPrimaryColors({ ...primaryColors, [key]: e.target.value })
                      }
                      style={{ flex: 1, height: '36px', borderRadius: '6px', border: '1px solid #e6e6e6', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setPrimaryColors({ ...primaryColors, [key]: e.target.value })
                      }
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #e6e6e6', fontSize: '12px', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Secondary Colors */}
        <div css={tokenGroupStyle}>
          <button
            onClick={() => toggleSection('secondary')}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '8px 0',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2f3438',
            }}
          >
            <span>⚪ Secondary Colors</span>
            <span>{expandedSections.includes('secondary') ? '▼' : '▶'}</span>
          </button>

          {expandedSections.includes('secondary') && (
            <div style={{ marginTop: '12px' }}>
              {Object.entries(secondaryColors).map(([key, value]) => (
                <div key={key} css={tokenInputGroupStyle}>
                  <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) =>
                        setSecondaryColors({ ...secondaryColors, [key]: e.target.value })
                      }
                      style={{ flex: 1, height: '36px', borderRadius: '6px', border: '1px solid #e6e6e6', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setSecondaryColors({ ...secondaryColors, [key]: e.target.value })
                      }
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #e6e6e6', fontSize: '12px', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
