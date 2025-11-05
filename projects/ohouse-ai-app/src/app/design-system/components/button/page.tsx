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
  paddingTop: { step: 1, suffix: 'px', min: 0, max: 20 },
  paddingRight: { step: 1, suffix: 'px', min: 0, max: 40 },
  paddingBottom: { step: 1, suffix: 'px', min: 0, max: 20 },
  paddingLeft: { step: 1, suffix: 'px', min: 0, max: 40 },
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
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  });

  // 선택된 버튼 크기와 variant
  const [selectedSize, setSelectedSize] = useState<string>('Default');
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary'>('primary');
  const [isButtonSelected, setIsButtonSelected] = useState(false);

  // Override 대기 상태 - null인 값을 override하려고 할 때 경고 표시
  const [pendingOverrideToken, setPendingOverrideToken] = useState<string | null>(null);

  // Primary 버튼 컬러 토큰
  const [primaryColors, setPrimaryColors] = useState({
    backgroundColor: '#000000',
    textColor: '#ffffff',
    hoverBackgroundColor: '#333333',
    activeBackgroundColor: '#1a1a1a',
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

  // 버튼별 토큰 오버라이드 (크기_variant 조합별)
  // 예: "Small_primary", "Medium_primary", "Large_secondary" 등
  interface ButtonOverride {
    borderRadius?: number | null;
    fontWeight?: number | null;
    transitionDuration?: number | null;
    paddingTop?: number | null;
    paddingRight?: number | null;
    paddingBottom?: number | null;
    paddingLeft?: number | null;
  }

  const buttonSizeVariants = [
    'Small_primary', 'Small_secondary',
    'Medium_primary', 'Medium_secondary',
    'Default_primary', 'Default_secondary',
    'Large_primary', 'Large_secondary',
    'ExtraLarge_primary', 'ExtraLarge_secondary'
  ];

  const [buttonOverrides, setButtonOverrides] = useState<Record<string, ButtonOverride>>(() => {
    const initialOverrides: Record<string, ButtonOverride> = {};
    buttonSizeVariants.forEach(variant => {
      initialOverrides[variant] = {
        borderRadius: null,
        fontWeight: null,
        transitionDuration: null,
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null,
      };
    });
    return initialOverrides;
  });

  // 현재 선택된 버튼의 override 키 생성
  const currentButtonKey = `${selectedSize}_${selectedVariant}`;
  const currentOverride = buttonOverrides[currentButtonKey] || {};

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  const formatButtonKey = (key: string) => {
    const [size, variant] = key.split('_');
    const variantLabel = variant === 'primary' ? 'Primary' : 'Secondary';
    return `${size} • ${variantLabel}`;
  };

  const setOverrideValue = (tokenKey: keyof ButtonOverride, newValue: number | null) => {
    setButtonOverrides((prev) => {
      const existing = prev[currentButtonKey] ?? {};
      return {
        ...prev,
        [currentButtonKey]: {
          ...existing,
          [tokenKey]: newValue,
        },
      };
    });
  };

  const activateOverride = (tokenKey: keyof ButtonOverride) => {
    const sharedValue = sharedTokens[tokenKey as keyof typeof sharedTokens];
    const numericValue = typeof sharedValue === 'number' ? sharedValue : 0;
    setOverrideValue(tokenKey, numericValue);
    setPendingOverrideToken(null);
  };

  const activatePaddingOverride = () => {
    setButtonOverrides((prev) => {
      const existing = prev[currentButtonKey] ?? {};
      return {
        ...prev,
        [currentButtonKey]: {
          ...existing,
          paddingTop: sharedTokens.paddingTop,
          paddingBottom: sharedTokens.paddingBottom,
          paddingLeft: sharedTokens.paddingLeft,
          paddingRight: sharedTokens.paddingRight,
        },
      };
    });
    setPendingOverrideToken(null);
  };

  const clearOverride = (tokenKey: keyof ButtonOverride) => {
    setOverrideValue(tokenKey, null);
  };

  const clearPaddingOverride = () => {
    setButtonOverrides((prev) => {
      const existing = prev[currentButtonKey] ?? {};
      return {
        ...prev,
        [currentButtonKey]: {
          ...existing,
          paddingTop: null,
          paddingBottom: null,
          paddingLeft: null,
          paddingRight: null,
        },
      };
    });
  };

  const updateOverrideToken = (tokenKey: keyof ButtonOverride, newValue: number) => {
    setButtonOverrides((prev) => {
      const existing = prev[currentButtonKey] ?? {};
      const updated: ButtonOverride = {
        ...existing,
      };

      if (tokenKey === 'paddingLeft' || tokenKey === 'paddingRight') {
        updated.paddingLeft = newValue;
        updated.paddingRight = newValue;
      } else if (tokenKey === 'paddingTop' || tokenKey === 'paddingBottom') {
        updated.paddingTop = newValue;
        updated.paddingBottom = newValue;
      } else {
        updated[tokenKey] = newValue;
      }

      return {
        ...prev,
        [currentButtonKey]: updated,
      };
    });
  };

  const updateOverridePadding = (direction: 'horizontal' | 'vertical', newValue: number) => {
    setButtonOverrides((prev) => {
      const existing = prev[currentButtonKey] ?? {};
      const updated: ButtonOverride = {
        ...existing,
      };

      if (direction === 'horizontal') {
        updated.paddingLeft = newValue;
        updated.paddingRight = newValue;
      } else {
        updated.paddingTop = newValue;
        updated.paddingBottom = newValue;
      }

      return {
        ...prev,
        [currentButtonKey]: updated,
      };
    });
  };

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

  // 버튼 선택 UI 스타일
  const buttonSelectionStyle = css`
    margin-bottom: 24px;
    padding: 16px;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e6e6e6;

    label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #0aa5ff;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .selection-group {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    button {
      padding: 8px 12px;
      background-color: #f7f9fa;
      color: #2f3438;
      border: 1px solid #e6e6e6;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f0f8ff;
        border-color: #0aa5ff;
      }

      &.active {
        background-color: #0aa5ff;
        color: #ffffff;
        border-color: #0aa5ff;
        font-weight: 600;
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
    override?: { borderRadius?: number; fontWeight?: number; transitionDuration?: number; paddingTop?: number; paddingRight?: number; paddingBottom?: number; paddingLeft?: number }
  ) => {
    const br = override?.borderRadius ?? sharedTokens.borderRadius;
    const fw = override?.fontWeight ?? sharedTokens.fontWeight;
    const td = override?.transitionDuration ?? sharedTokens.transitionDuration;
    const pt = override?.paddingTop ?? sharedTokens.paddingTop;
    const pr = override?.paddingRight ?? sharedTokens.paddingRight;
    const pb = override?.paddingBottom ?? sharedTokens.paddingBottom;
    const pl = override?.paddingLeft ?? sharedTokens.paddingLeft;
    
    // 선택된 색상 토큰 사용 (primary/secondary에 따라)
    const colors = isPrimary ? primaryColors : secondaryColors;
    
    // 동적 padding 생성
    const dynamicPadding = `${pt}px ${pr}px ${pb}px ${pl}px`;
    
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
    // 패딩 좌우/상하 동기화
    if (key === 'paddingLeft') {
      setSharedTokens({ ...sharedTokens, paddingLeft: value, paddingRight: value });
    } else if (key === 'paddingRight') {
      setSharedTokens({ ...sharedTokens, paddingLeft: value, paddingRight: value });
    } else if (key === 'paddingTop') {
      setSharedTokens({ ...sharedTokens, paddingTop: value, paddingBottom: value });
    } else if (key === 'paddingBottom') {
      setSharedTokens({ ...sharedTokens, paddingTop: value, paddingBottom: value });
    } else {
      setSharedTokens({ ...sharedTokens, [key]: value });
    }
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

  // 주어진 토큰에 대해 override를 가진 버튼 목록 반환
  const getExceptions = (tokenKey: string): string[] => {
    const exceptions: string[] = [];
    Object.entries(buttonOverrides).forEach(([buttonKey, overrideValues]) => {
      if (overrideValues[tokenKey as keyof typeof overrideValues] !== null) {
        exceptions.push(buttonKey);
      }
    });
    return exceptions;
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
                
                // 현재 렌더링 중인 사이즈의 override 가져오기
                const primaryOverrideKey = `${size.name}_primary`;
                const secondaryOverrideKey = `${size.name}_secondary`;
                const primaryOverride = buttonOverrides[primaryOverrideKey];
                const secondaryOverride = buttonOverrides[secondaryOverrideKey];
                
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
                        onClick={() => {
                          setSelectedSize(size.name);
                          setSelectedVariant('primary');
                          setIsButtonSelected(true);
                        }}
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
                        onClick={() => {
                          setSelectedSize(size.name);
                          setSelectedVariant('secondary');
                          setIsButtonSelected(true);
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
        <h3>
          Style Editor
          {selectedSize && selectedVariant && (
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '400', 
              color: '#828c94',
              marginLeft: '8px'
            }}>
              — {selectedSize} ({selectedVariant === 'primary' ? '🔵' : '⚪'})
            </span>
          )}
        </h3>

        {/* Button Selection UI - Only show when button is selected */}
        {isButtonSelected && (
        <div css={buttonSelectionStyle}>
          <label>Size</label>
          <div className="selection-group">
            {buttonSizes.map((size) => (
              <button
                key={size.name}
                className={selectedSize === size.name ? 'active' : ''}
                onClick={() => setSelectedSize(size.name)}
              >
                {size.name}
              </button>
            ))}
          </div>

          <label>Variant</label>
          <div className="selection-group">
            <button
              className={selectedVariant === 'primary' ? 'active' : ''}
              onClick={() => setSelectedVariant('primary')}
            >
              🔵 Primary
            </button>
            <button
              className={selectedVariant === 'secondary' ? 'active' : ''}
              onClick={() => setSelectedVariant('secondary')}
            >
              ⚪ Secondary
            </button>
          </div>
        </div>
        )}

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
                // Padding 필드는 특별한 그룹으로 처리
                if (key.startsWith('padding')) {
                  // Padding 그룹은 첫 번째 padding 필드에서만 렌더링
                  if (key === 'paddingTop') {
                    const isPaddingOverrideActive = currentOverride.paddingTop !== null;
                    const paddingTopValue = isPaddingOverrideActive && currentOverride.paddingTop !== null ? currentOverride.paddingTop : sharedTokens.paddingTop;
                    const paddingBottomValue = isPaddingOverrideActive && currentOverride.paddingBottom !== null ? currentOverride.paddingBottom : sharedTokens.paddingBottom;
                    const paddingLeftValue = isPaddingOverrideActive && currentOverride.paddingLeft !== null ? currentOverride.paddingLeft : sharedTokens.paddingLeft;
                    const paddingRightValue = isPaddingOverrideActive && currentOverride.paddingRight !== null ? currentOverride.paddingRight : sharedTokens.paddingRight;

                    return (
                      <div key="padding-group" style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#2f3438', marginBottom: '8px', textTransform: 'capitalize' }}>
                          Padding
                        </label>

                        {isButtonSelected && (
                          <div
                            style={{
                              marginBottom: '12px',
                              padding: '8px 10px',
                              borderRadius: '6px',
                              border: '1px solid ' + (isPaddingOverrideActive ? '#0aa5ff' : '#ffd24d'),
                              backgroundColor: isPaddingOverrideActive ? '#f0f8ff' : '#fffbf0',
                              fontSize: '11px',
                              color: isPaddingOverrideActive ? '#005999' : '#7a5c00',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '12px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span style={{ flex: '1 1 auto', minWidth: '200px' }}>
                              {isPaddingOverrideActive
                                ? `Overriding padding for ${selectedSize} • ${selectedVariant === 'primary' ? 'Primary' : 'Secondary'}.`
                                : 'Global padding applies to all buttons. Create a per-button override?'}
                            </span>
                            {isPaddingOverrideActive ? (
                              <button
                                onClick={clearPaddingOverride}
                                style={{
                                  padding: '6px 10px',
                                  backgroundColor: '#0aa5ff',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                Revert to shared ({sharedTokens.paddingTop}px/{sharedTokens.paddingLeft}px)
                              </button>
                            ) : (
                              <button
                                onClick={activatePaddingOverride}
                                style={{
                                  padding: '6px 10px',
                                  backgroundColor: '#ffd24d',
                                  color: '#4a3800',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                Override for {selectedSize}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Padding visual representation */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                          marginBottom: '8px',
                          padding: '12px',
                          backgroundColor: '#ffffff',
                          borderRadius: '6px',
                          border: '1px solid #e6e6e6',
                        }}>
                          {/* Top */}
                          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '11px', color: '#828c94' }}>↑</span>
                              <input
                                type="number"
                                value={paddingTopValue}
                                onChange={(e) => {
                                  const parsed = parseInt(e.target.value, 10);
                                  const nextValue = Number.isNaN(parsed) ? 0 : parsed;
                                  if (isPaddingOverrideActive) {
                                    updateOverridePadding('vertical', clamp(nextValue, tokenConfig.paddingTop.min, tokenConfig.paddingTop.max));
                                  } else {
                                    handleSharedTokenChange('paddingTop', clamp(nextValue, tokenConfig.paddingTop.min, tokenConfig.paddingTop.max));
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (isPaddingOverrideActive) {
                                    const baseValue = paddingTopValue;
                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                      e.preventDefault();
                                      const delta = e.key === 'ArrowUp' ? tokenConfig.paddingTop.step : -tokenConfig.paddingTop.step;
                                      updateOverridePadding('vertical', clamp(baseValue + delta, tokenConfig.paddingTop.min, tokenConfig.paddingTop.max));
                                    }
                                  } else {
                                    handleKeyboardNav(e, 'paddingTop', sharedTokens.paddingTop, setSharedTokens, tokenConfig.paddingTop);
                                  }
                                }}
                                step={tokenConfig.paddingTop.step}
                                min={tokenConfig.paddingTop.min}
                                max={tokenConfig.paddingTop.max}
                                style={{
                                  width: '55px',
                                  padding: '4px 6px',
                                  borderRadius: '4px',
                                  border: '1px solid #e6e6e6',
                                  fontSize: '12px',
                                  textAlign: 'center',
                                  fontFamily: 'monospace',
                                }}
                              />
                              <span style={{ fontSize: '11px', color: '#c2c8cc' }}>px</span>
                            </div>
                          </div>

                          {/* Left & Right */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                            <span style={{ fontSize: '11px', color: '#828c94' }}>←</span>
                            <input
                              type="number"
                              value={paddingLeftValue}
                              onChange={(e) => {
                                const parsed = parseInt(e.target.value, 10);
                                const nextValue = Number.isNaN(parsed) ? 0 : parsed;
                                if (isPaddingOverrideActive) {
                                  updateOverridePadding('horizontal', clamp(nextValue, tokenConfig.paddingLeft.min, tokenConfig.paddingLeft.max));
                                } else {
                                  handleSharedTokenChange('paddingLeft', clamp(nextValue, tokenConfig.paddingLeft.min, tokenConfig.paddingLeft.max));
                                }
                              }}
                              onKeyDown={(e) => {
                                if (isPaddingOverrideActive) {
                                  const baseValue = paddingLeftValue;
                                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const delta = e.key === 'ArrowUp' ? tokenConfig.paddingLeft.step : -tokenConfig.paddingLeft.step;
                                    updateOverridePadding('horizontal', clamp(baseValue + delta, tokenConfig.paddingLeft.min, tokenConfig.paddingLeft.max));
                                  }
                                } else {
                                  handleKeyboardNav(e, 'paddingLeft', sharedTokens.paddingLeft, setSharedTokens, tokenConfig.paddingLeft);
                                }
                              }}
                              step={tokenConfig.paddingLeft.step}
                              min={tokenConfig.paddingLeft.min}
                              max={tokenConfig.paddingLeft.max}
                              style={{
                                width: '55px',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                border: '1px solid #e6e6e6',
                                fontSize: '12px',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                              }}
                            />
                            <span style={{ fontSize: '11px', color: '#c2c8cc' }}>px</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                            <input
                              type="number"
                              value={paddingRightValue}
                              onChange={(e) => {
                                const parsed = parseInt(e.target.value, 10);
                                const nextValue = Number.isNaN(parsed) ? 0 : parsed;
                                if (isPaddingOverrideActive) {
                                  updateOverridePadding('horizontal', clamp(nextValue, tokenConfig.paddingRight.min, tokenConfig.paddingRight.max));
                                } else {
                                  handleSharedTokenChange('paddingRight', clamp(nextValue, tokenConfig.paddingRight.min, tokenConfig.paddingRight.max));
                                }
                              }}
                              onKeyDown={(e) => {
                                if (isPaddingOverrideActive) {
                                  const baseValue = paddingRightValue;
                                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const delta = e.key === 'ArrowUp' ? tokenConfig.paddingRight.step : -tokenConfig.paddingRight.step;
                                    updateOverridePadding('horizontal', clamp(baseValue + delta, tokenConfig.paddingRight.min, tokenConfig.paddingRight.max));
                                  }
                                } else {
                                  handleKeyboardNav(e, 'paddingRight', sharedTokens.paddingRight, setSharedTokens, tokenConfig.paddingRight);
                                }
                              }}
                              step={tokenConfig.paddingRight.step}
                              min={tokenConfig.paddingRight.min}
                              max={tokenConfig.paddingRight.max}
                              style={{
                                width: '55px',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                border: '1px solid #e6e6e6',
                                fontSize: '12px',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                              }}
                            />
                            <span style={{ fontSize: '11px', color: '#c2c8cc' }}>px</span>
                            <span style={{ fontSize: '11px', color: '#828c94' }}>→</span>
                          </div>

                          {/* Bottom */}
                          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '11px', color: '#828c94' }}>↓</span>
                              <input
                                type="number"
                                value={paddingBottomValue}
                                onChange={(e) => {
                                  const parsed = parseInt(e.target.value, 10);
                                  const nextValue = Number.isNaN(parsed) ? 0 : parsed;
                                  if (isPaddingOverrideActive) {
                                    updateOverridePadding('vertical', clamp(nextValue, tokenConfig.paddingBottom.min, tokenConfig.paddingBottom.max));
                                  } else {
                                    handleSharedTokenChange('paddingBottom', clamp(nextValue, tokenConfig.paddingBottom.min, tokenConfig.paddingBottom.max));
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (isPaddingOverrideActive) {
                                    const baseValue = paddingBottomValue;
                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                      e.preventDefault();
                                      const delta = e.key === 'ArrowUp' ? tokenConfig.paddingBottom.step : -tokenConfig.paddingBottom.step;
                                      updateOverridePadding('vertical', clamp(baseValue + delta, tokenConfig.paddingBottom.min, tokenConfig.paddingBottom.max));
                                    }
                                  } else {
                                    handleKeyboardNav(e, 'paddingBottom', sharedTokens.paddingBottom, setSharedTokens, tokenConfig.paddingBottom);
                                  }
                                }}
                                step={tokenConfig.paddingBottom.step}
                                min={tokenConfig.paddingBottom.min}
                                max={tokenConfig.paddingBottom.max}
                                style={{
                                  width: '55px',
                                  padding: '4px 6px',
                                  borderRadius: '4px',
                                  border: '1px solid #e6e6e6',
                                  fontSize: '12px',
                                  textAlign: 'center',
                                  fontFamily: 'monospace',
                                }}
                              />
                              <span style={{ fontSize: '11px', color: '#c2c8cc' }}>px</span>
                            </div>
                          </div>
                        </div>

                        {/* Padding Exception 표시 */}
                        {(() => {
                          const paddingExceptions: { top: string[], right: string[], bottom: string[], left: string[] } = {
                            top: getExceptions('paddingTop'),
                            right: getExceptions('paddingRight'),
                            bottom: getExceptions('paddingBottom'),
                            left: getExceptions('paddingLeft'),
                          };
                          const allPaddingExceptions = [...new Set([...paddingExceptions.top, ...paddingExceptions.right, ...paddingExceptions.bottom, ...paddingExceptions.left])];

                          if (allPaddingExceptions.length > 0) {
                            return (
                              <div style={{
                                marginTop: '8px',
                                padding: '6px 8px',
                                backgroundColor: '#f0f8ff',
                                border: '1px solid #b3d9ff',
                                borderRadius: '4px',
                                fontSize: '10px',
                                color: '#0066cc',
                                lineHeight: '1.4',
                              }}>
                                <span style={{ fontWeight: '600' }}>Exception: </span>
                                {allPaddingExceptions.map((excBtn, idx) => {
                                  const paddingValues: string[] = [];
                                  const overrideRecord = buttonOverrides[excBtn];
                                  if (paddingExceptions.top.includes(excBtn)) paddingValues.push(`T:${typeof overrideRecord.paddingTop === 'number' ? overrideRecord.paddingTop : '—'}`);
                                  if (paddingExceptions.right.includes(excBtn)) paddingValues.push(`R:${typeof overrideRecord.paddingRight === 'number' ? overrideRecord.paddingRight : '—'}`);
                                  if (paddingExceptions.bottom.includes(excBtn)) paddingValues.push(`B:${typeof overrideRecord.paddingBottom === 'number' ? overrideRecord.paddingBottom : '—'}`);
                                  if (paddingExceptions.left.includes(excBtn)) paddingValues.push(`L:${typeof overrideRecord.paddingLeft === 'number' ? overrideRecord.paddingLeft : '—'}`);

                                  const [size, variant] = excBtn.split('_');
                                  const handleExceptionClick = () => {
                                    setSelectedSize(size);
                                    setSelectedVariant(variant as 'primary' | 'secondary');
                                    setIsButtonSelected(true);
                                  };

                                  return (
                                    <button
                                      key={idx}
                                      onClick={handleExceptionClick}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '0',
                                        cursor: 'pointer',
                                        color: '#0066cc',
                                        textDecoration: 'underline',
                                        fontSize: '10px',
                                        fontWeight: idx === 0 ? '400' : '400',
                                      }}
                                    >
                                          {formatButtonKey(excBtn)} <strong>({paddingValues.join(', ')})</strong>
                                      {idx < allPaddingExceptions.length - 1 ? ', ' : ''}
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    );
                  }
                  // 나머지 padding 필드는 스킵
                  return null;
                }

                // 일반 토큰 필드
                const config = tokenConfig[key];
                const exceptions = getExceptions(key);
                const overrideKey = key as keyof ButtonOverride;
                const supportsOverride = Object.prototype.hasOwnProperty.call(currentOverride, overrideKey);
                const overrideValue = supportsOverride ? currentOverride[overrideKey] : null;
                const isOverrideActive = Boolean(isButtonSelected && supportsOverride && overrideValue !== null);
                const effectiveValue = isOverrideActive && typeof overrideValue === 'number' ? overrideValue : value;

                return (
                  <div key={key} css={tokenInputGroupStyle}>
                    <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        value={effectiveValue}
                        onChange={(e) => {
                          const parsed = parseInt(e.target.value, 10);
                          const nextValue = Number.isNaN(parsed) ? 0 : parsed;

                          if (isOverrideActive) {
                            updateOverrideToken(overrideKey, clamp(nextValue, config.min, config.max));
                          } else {
                            handleSharedTokenChange(key as keyof typeof sharedTokens, clamp(nextValue, config.min, config.max));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (isOverrideActive) {
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                              e.preventDefault();
                              const delta = e.key === 'ArrowUp' ? config.step : -config.step;
                              const nextValue = clamp(effectiveValue + delta, config.min, config.max);
                              updateOverrideToken(overrideKey, nextValue);
                            }
                          } else {
                            handleKeyboardNav(e, key, value, setSharedTokens, config);
                          }
                        }}
                        step={config.step}
                        min={config.min}
                        max={config.max}
                        className="with-suffix"
                      />
                      {config.suffix && <span className="input-suffix">{config.suffix}</span>}
                    </div>

                    {/* Override guidance */}
                    {isButtonSelected && supportsOverride && (
                      <div
                        style={{
                          marginTop: '8px',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid ' + (isOverrideActive ? '#0aa5ff' : '#ffd24d'),
                          backgroundColor: isOverrideActive ? '#f0f8ff' : '#fffbf0',
                          fontSize: '11px',
                          color: isOverrideActive ? '#005999' : '#7a5c00',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '12px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span style={{ flex: '1 1 auto', minWidth: '180px' }}>
                          {isOverrideActive
                            ? `Overriding ${selectedSize} • ${selectedVariant === 'primary' ? 'Primary' : 'Secondary'}.`
                            : 'Global setting. Update all buttons or create an override.'}
                        </span>
                        {isOverrideActive ? (
                          <button
                            onClick={() => clearOverride(overrideKey)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#0aa5ff',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Revert to shared ({sharedTokens[overrideKey as keyof typeof sharedTokens]}{config.suffix})
                          </button>
                        ) : (
                          <button
                            onClick={() => activateOverride(overrideKey)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#ffd24d',
                              color: '#4a3800',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Override for {selectedSize}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Exception 표시 */}
                    {exceptions.length > 0 && (
                      <div style={{
                        marginTop: '8px',
                        padding: '6px 8px',
                        backgroundColor: '#f0f8ff',
                        border: '1px solid #b3d9ff',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#0066cc',
                        lineHeight: '1.4',
                      }}>
                        <span style={{ fontWeight: '600' }}>Overrides: </span>
                        {exceptions.map((excBtn, idx) => {
                          const overrideRecord = buttonOverrides[excBtn];
                          const overrideAmount = overrideRecord?.[overrideKey];
                          const displayAmount = typeof overrideAmount === 'number' ? overrideAmount : '—';
                          const handleExceptionClick = () => {
                            const [size, variant] = excBtn.split('_');
                            setSelectedSize(size);
                            setSelectedVariant(variant as 'primary' | 'secondary');
                            setIsButtonSelected(true);
                          };

                          return (
                            <button
                              key={idx}
                              onClick={handleExceptionClick}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '0',
                                cursor: 'pointer',
                                color: '#0066cc',
                                textDecoration: 'underline',
                                fontSize: '11px',
                              }}
                            >
                              {formatButtonKey(excBtn)} → <strong>{displayAmount}{config.suffix}</strong>
                              {idx < exceptions.length - 1 ? ', ' : ''}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Primary Colors */}
        {selectedVariant === 'primary' && (
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
                {Object.entries(currentOverride).map(([key, value]) => {
                  const config = tokenConfig[key];
                  const isInheriting = value === null;
                  const sharedValue = sharedTokens[key as keyof typeof sharedTokens];

                  return (
                    <div key={key} css={tokenInputGroupStyle}>
                      <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <div className="input-wrapper">
                        <input
                          type="number"
                          value={value ?? ''}
                          disabled={isInheriting}
                          onChange={(e) => {
                            const newValue = e.target.value ? parseInt(e.target.value) : null;

                            // Override each token independently - no forced synchronization
                            const updatedOverride = { ...currentOverride, [key]: newValue };

                            setButtonOverrides({
                              ...buttonOverrides,
                              [currentButtonKey]: updatedOverride,
                            });

                            // 경고 메시지 숨김
                            setPendingOverrideToken(null);
                          }}
                          onKeyDown={(e) => {
                            if (value !== null) {
                              handleKeyboardNav(e, key, value, setButtonOverrides, config);
                            }
                          }}
                          step={config.step}
                          min={config.min}
                          max={config.max}
                          placeholder="Click Override"
                          className="with-suffix"
                          style={{
                            color: value === null ? '#c2c8cc' : '#2f3438',
                            backgroundColor: value === null ? '#f0f0f0' : '#ffffff',
                            cursor: value === null ? 'not-allowed' : 'text',
                          }}
                        />
                        {config.suffix && <span className="input-suffix">{config.suffix}</span>}
                      </div>

                      {/* 경고 메시지 - null 값일 때만 표시 */}
                      {isInheriting && pendingOverrideToken === key && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px 12px',
                          backgroundColor: '#fffbf0',
                          border: '1px solid #ffd700',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: '#8b6914',
                        }}>
                          <div style={{ marginBottom: '8px' }}>
                            ⚠️ Changing this will modify the global setting ({sharedValue}{config.suffix})
                          </div>
                          <button
                            onClick={() => {
                              const updatedOverride = { ...currentOverride, [key]: sharedValue };
                              setButtonOverrides({
                                ...buttonOverrides,
                                [currentButtonKey]: updatedOverride,
                              });
                              setPendingOverrideToken(null);
                            }}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#0aa5ff',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0087cc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0aa5ff'}
                          >
                            Override
                          </button>
                        </div>
                      )}

                      {/* 입력 필드 클릭 시 경고 표시 */}
                      {isInheriting && pendingOverrideToken !== key && (
                        <div
                          onClick={() => setPendingOverrideToken(key)}
                          style={{
                            marginTop: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#f5f5f5',
                            border: '1px dashed #c2c8cc',
                            borderRadius: '6px',
                            fontSize: '11px',
                            color: '#828c94',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fffbf0';
                            e.currentTarget.style.borderColor = '#ffd700';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                            e.currentTarget.style.borderColor = '#c2c8cc';
                          }}
                        >
                          Click to override this token
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        )}

        {/* Secondary Colors */}
        {selectedVariant === 'secondary' && (
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
                {Object.entries(currentOverride).map(([key, value]) => {
                  const config = tokenConfig[key];
                  const isInheriting = value === null;
                  const sharedValue = sharedTokens[key as keyof typeof sharedTokens];

                  return (
                    <div key={key} css={tokenInputGroupStyle}>
                      <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <div className="input-wrapper">
                        <input
                          type="number"
                          value={value ?? ''}
                          disabled={isInheriting}
                          onChange={(e) => {
                            const newValue = e.target.value ? parseInt(e.target.value) : null;

                            // Override each token independently - no forced synchronization
                            const updatedOverride = { ...currentOverride, [key]: newValue };

                            setButtonOverrides({
                              ...buttonOverrides,
                              [currentButtonKey]: updatedOverride,
                            });

                            // 경고 메시지 숨김
                            setPendingOverrideToken(null);
                          }}
                          onKeyDown={(e) => {
                            if (value !== null) {
                              handleKeyboardNav(e, key, value, setButtonOverrides, config);
                            }
                          }}
                          step={config.step}
                          min={config.min}
                          max={config.max}
                          placeholder="Click Override"
                          className="with-suffix"
                          style={{
                            color: value === null ? '#c2c8cc' : '#2f3438',
                            backgroundColor: value === null ? '#f0f0f0' : '#ffffff',
                            cursor: value === null ? 'not-allowed' : 'text',
                          }}
                        />
                        {config.suffix && <span className="input-suffix">{config.suffix}</span>}
                      </div>

                      {/* 경고 메시지 - null 값일 때만 표시 */}
                      {isInheriting && pendingOverrideToken === key && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px 12px',
                          backgroundColor: '#fffbf0',
                          border: '1px solid #ffd700',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: '#8b6914',
                        }}>
                          <div style={{ marginBottom: '8px' }}>
                            ⚠️ Changing this will modify the global setting ({sharedValue}{config.suffix})
                          </div>
                          <button
                            onClick={() => {
                              const updatedOverride = { ...currentOverride, [key]: sharedValue };
                              setButtonOverrides({
                                ...buttonOverrides,
                                [currentButtonKey]: updatedOverride,
                              });
                              setPendingOverrideToken(null);
                            }}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#0aa5ff',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0087cc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0aa5ff'}
                          >
                            Override
                          </button>
                        </div>
                      )}

                      {/* 입력 필드 클릭 시 경고 표시 */}
                      {isInheriting && pendingOverrideToken !== key && (
                        <div
                          onClick={() => setPendingOverrideToken(key)}
                          style={{
                            marginTop: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#f5f5f5',
                            border: '1px dashed #c2c8cc',
                            borderRadius: '6px',
                            fontSize: '11px',
                            color: '#828c94',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fffbf0';
                            e.currentTarget.style.borderColor = '#ffd700';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                            e.currentTarget.style.borderColor = '#c2c8cc';
                          }}
                        >
                          Click to override this token
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
