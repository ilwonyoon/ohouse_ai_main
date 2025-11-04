'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import { CodeBlock } from '../CodeBlock';
import { ComponentPreview } from '../ComponentPreview';

// 토큰별 설정 (step, suffix, min, max)
const tokenConfig: Record<string, { step: number; suffix: string; min: number; max: number }> = {
  borderRadius: { step: 1, suffix: 'px', min: 0, max: 24 },
  fontWeight: { step: 100, suffix: '', min: 100, max: 900 },
  transitionDuration: { step: 50, suffix: 'ms', min: 0, max: 1000 },
  paddingVertical: { step: 1, suffix: 'px', min: 0, max: 20 },
  paddingHorizontal: { step: 1, suffix: 'px', min: 0, max: 40 },
};

const colorTokenConfig = {
  step: 1,
  suffix: '',
  min: 0,
  max: 255,
};

export default function ButtonPage() {
  // 모든 버튼이 공유하는 기본 토큰
  const [sharedTokens, setSharedTokens] = useState({
    borderRadius: 8,
    fontWeight: 600,
    transitionDuration: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
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

  // Primary override 토큰 (스타일 재정의용)
  const [primaryOverride, setPrimaryOverride] = useState({
    borderRadius: null as number | null,
    fontWeight: null as number | null,
    transitionDuration: null as number | null,
    paddingVertical: null as number | null,
    paddingHorizontal: null as number | null,
  });

  // Secondary override 토큰 (스타일 재정의용)
  const [secondaryOverride, setSecondaryOverride] = useState({
    borderRadius: null as number | null,
    fontWeight: null as number | null,
    transitionDuration: null as number | null,
    paddingVertical: null as number | null,
    paddingHorizontal: null as number | null,
  });

  // 버튼 사이즈 정의
  const buttonSizes = [
    { name: 'Small', height: '28px', width: '72px', padding: '6px 12px', fontSize: '12px' },
    { name: 'Medium', height: '32px', width: '84px', padding: '8px 16px', fontSize: '13px' },
    { name: 'Default', height: '40px', width: '104px', padding: '10px 20px', fontSize: '14px' },
    { name: 'Large', height: '44px', minWidth: '280px', padding: '12px 24px', fontSize: '15px' },
    { name: 'Extra Large', height: '50px', minWidth: '343px', padding: '14px 28px', fontSize: '16px' },
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
      padding: 8px 8px 8px 8px;
      border-radius: 6px;
      border: 1px solid #e6e6e6;
      font-size: 13px;
      font-family: monospace;
      background-color: #ffffff;
      transition: all 0.2s ease;
      position: relative;

      &:focus {
        outline: none;
        border-color: #0aa5ff;
        box-shadow: 0 0 0 3px rgba(10, 165, 255, 0.1);
      }

      &::placeholder {
        color: #c2c8cc;
      }
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-suffix {
      position: absolute;
      right: 8px;
      font-size: 12px;
      color: #c2c8cc;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      pointer-events: none;
    }

    input.with-suffix {
      padding-right: 24px;
    }
  `;

  const sizeGridStyle = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  `;

  const sizeButtonContainerStyle = css`
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

    .spec {
      font-size: 11px;
      color: #828c94;
      margin-bottom: 8px;
    }

    .buttons {
      display: flex;
      gap: 8px;
      justify-content: flex-start;
      padding: 0 16px;
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

  // 버튼 스타일 생성 함수 - override 지원
  const createButtonStyle = (
    backgroundColor: string,
    textColor: string,
    hoverBackgroundColor: string,
    fontSize: string,
    padding: string,
    isPrimary: boolean = true,
    override?: { borderRadius?: number; fontWeight?: number; transitionDuration?: number; paddingVertical?: number; paddingHorizontal?: number }
  ) => {
    const br = override?.borderRadius ?? sharedTokens.borderRadius;
    const fw = override?.fontWeight ?? sharedTokens.fontWeight;
    const td = override?.transitionDuration ?? sharedTokens.transitionDuration;
    const pv = override?.paddingVertical ?? sharedTokens.paddingVertical;
    const ph = override?.paddingHorizontal ?? sharedTokens.paddingHorizontal;
    
    // 선택된 색상 토큰 사용 (primary/secondary에 따라)
    const colors = isPrimary ? primaryColors : secondaryColors;
    
    // 동적 padding 생성
    const dynamicPadding = `${pv}px ${ph}px`;
    
    return css`
      padding: ${dynamicPadding};
      background-color: ${isPrimary ? colors.backgroundColor : backgroundColor};
      color: ${isPrimary ? colors.textColor : textColor};
      border: none;
      border-radius: ${br}px;
      font-size: ${fontSize};
      font-weight: ${fw};
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
      cursor: pointer;
      transition: all ${td}ms ease-out;

      &:hover {
        background-color: ${isPrimary ? colors.hoverBackgroundColor : hoverBackgroundColor};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      }

      &:active {
        transform: scale(0.98);
      }

      &:focus-visible {
        outline: 2px solid ${isPrimary ? colors.backgroundColor : backgroundColor};
        outline-offset: 2px;
      }
    `;
  };

  const handleSharedTokenChange = (key: keyof typeof sharedTokens, value: number) => {
    setSharedTokens({ ...sharedTokens, [key]: value });
  };

  const handleKeyboardNav = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: string,
    value: number,
    setState: any,
    config: any
  ) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setState((prev: any) => ({ ...prev, [key]: Math.min(value + config.step, config.max) }));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setState((prev: any) => ({ ...prev, [key]: Math.max(value - config.step, config.min) }));
    }
  };

  const [expandedSections, setExpandedSections] = useState<string[]>(['shared']);

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
              {buttonSizes.map((size) => {
                const displayWidth = size.minWidth || size.width;
                const widthDisplay = size.minWidth ? `Min: ${size.minWidth}` : `W: ${displayWidth}`;
                
                return (
                  <div key={size.name} css={sizeButtonContainerStyle}>
                    <div className="label">{size.name}</div>
                    <div className="spec">H: {size.height} × {widthDisplay}</div>
                    <div className="buttons">
                      <button
                        css={createButtonStyle(
                          primaryColors.backgroundColor,
                          primaryColors.textColor,
                          primaryColors.hoverBackgroundColor,
                          size.fontSize,
                          size.padding,
                          true,
                          primaryOverride
                        )}
                        style={{ minWidth: size.minWidth, width: size.width }}
                      >
                        {size.name}
                      </button>
                      <button
                        css={createButtonStyle(
                          secondaryColors.backgroundColor,
                          secondaryColors.textColor,
                          secondaryColors.hoverBackgroundColor,
                          size.fontSize,
                          size.padding,
                          false,
                          secondaryOverride
                        )}
                        style={{ 
                          border: `1px solid ${secondaryColors.borderColor}`,
                          minWidth: size.minWidth,
                          width: size.width
                        }}
                      >
                        {size.name}
                      </button>
                    </div>
                  </div>
                );
              })}
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
        <h3>Style Editor</h3>

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
              {Object.entries(sharedTokens).map(([key, value]) => {
                const config = tokenConfig[key];
                return (
                  <div key={key} css={tokenInputGroupStyle}>
                    <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleSharedTokenChange(key as keyof typeof sharedTokens, parseInt(e.target.value) || 0)
                        }
                        onKeyDown={(e) =>
                          handleKeyboardNav(e, key, value, setSharedTokens, config)
                        }
                        step={config.step}
                        min={config.min}
                        max={config.max}
                        className="with-suffix"
                      />
                      {config.suffix && <span className="input-suffix">{config.suffix}</span>}
                    </div>
                  </div>
                );
              })}
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

              {/* Primary Override */}
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e6e6e6' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#0aa5ff', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Override Shared Tokens
                </label>
                {Object.entries(primaryOverride).map(([key, value]) => {
                  const config = tokenConfig[key];
                  return (
                    <div key={key} css={tokenInputGroupStyle}>
                      <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <div className="input-wrapper">
                        <input
                          type="number"
                          value={value ?? ''}
                          onChange={(e) =>
                            setPrimaryOverride({
                              ...primaryOverride,
                              [key]: e.target.value ? parseInt(e.target.value) : null,
                            })
                          }
                          onKeyDown={(e) => {
                            if (value !== null) {
                              handleKeyboardNav(e, key, value, setPrimaryOverride, config);
                            }
                          }}
                          step={config.step}
                          min={config.min}
                          max={config.max}
                          placeholder="Inherit"
                          className="with-suffix"
                          style={{ color: value === null ? '#c2c8cc' : '#2f3438' }}
                        />
                        {config.suffix && <span className="input-suffix">{config.suffix}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
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

              {/* Secondary Override */}
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e6e6e6' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#0aa5ff', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Override Shared Tokens
                </label>
                {Object.entries(secondaryOverride).map(([key, value]) => {
                  const config = tokenConfig[key];
                  return (
                    <div key={key} css={tokenInputGroupStyle}>
                      <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <div className="input-wrapper">
                        <input
                          type="number"
                          value={value ?? ''}
                          onChange={(e) =>
                            setSecondaryOverride({
                              ...secondaryOverride,
                              [key]: e.target.value ? parseInt(e.target.value) : null,
                            })
                          }
                          onKeyDown={(e) => {
                            if (value !== null) {
                              handleKeyboardNav(e, key, value, setSecondaryOverride, config);
                            }
                          }}
                          step={config.step}
                          min={config.min}
                          max={config.max}
                          placeholder="Inherit"
                          className="with-suffix"
                          style={{ color: value === null ? '#c2c8cc' : '#2f3438' }}
                        />
                        {config.suffix && <span className="input-suffix">{config.suffix}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
