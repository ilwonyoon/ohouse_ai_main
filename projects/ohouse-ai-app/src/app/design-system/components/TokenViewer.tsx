'use client';

import { css } from '@emotion/react';

export default function TokenViewer() {
  return (
    <div>
      <h2 css={css`font-size: 28px; font-weight: 700; color: #2f3438; margin-bottom: 8px;`}>
        📦 Token Reference
      </h2>
      <p css={css`font-size: 16px; color: #828c94; margin-bottom: 40px; line-height: 1.5;`}>
        Searchable token reference with import examples and values.
      </p>

      <div css={css`
        background: #f7f9fa;
        border-radius: 12px;
        padding: 60px 40px;
        text-align: center;
        color: #828c94;
      `}>
        <p css={css`font-size: 18px; margin-bottom: 12px;`}>🔍 Token Search</p>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Interactive token search coming soon...
        </p>
        <p style={{ fontSize: '12px', marginTop: '16px', color: '#c2c8cc' }}>
          All tokens available via import from @/docs/tokens
        </p>
      </div>

      {/* Token Categories */}
      <div css={css`margin-top: 40px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 24px;`}>
          Token Categories
        </h3>

        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        `}>
          {[
            { category: 'Primitive Tokens', count: 32 },
            { category: 'Semantic Tokens', count: 18 },
            { category: 'Component Tokens', count: 10 },
            { category: 'Animation Tokens', count: 12 },
            { category: 'State Tokens', count: 15 },
            { category: 'Utility Tokens', count: 20 },
            { category: 'Accessibility', count: 8 },
            { category: 'Breakpoints', count: 4 },
          ].map((item) => (
            <div
              key={item.category}
              css={css`
                border: 1px solid #e6e6e6;
                border-radius: 12px;
                padding: 20px;
                background: #ffffff;

                h4 {
                  margin: 0 0 8px 0;
                  font-size: 15px;
                  font-weight: 600;
                  color: #2f3438;
                }

                p {
                  margin: 0;
                  font-size: 13px;
                  color: #828c94;
                }
              `}
            >
              <h4>{item.category}</h4>
              <p>{item.count} tokens</p>
            </div>
          ))}
        </div>
      </div>

      {/* Import Example */}
      <div css={css`margin-top: 50px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 16px;`}>
          Quick Start
        </h3>
        <div css={css`
          background: #1e1e1e;
          color: #d4d4d4;
          border-radius: 12px;
          padding: 20px;
          overflow-x: auto;
          font-family: 'Monaco', monospace;
          font-size: 13px;
          line-height: 1.6;
        `}>
          {`import {
  PrimitiveTokens,
  SemanticTokens,
  ComponentTokens,
  AnimationTokens,
  StateTokens,
  UtilityTokens,
  AccessibilityTokens
} from '@/docs/tokens';

// Use in your component
const buttonColor = SemanticTokens.Color.Foreground.BRAND; // #0AA5FF
const animationDuration = AnimationTokens.Duration.NORMAL; // 300ms`}
        </div>
      </div>
    </div>
  );
}
