'use client';

import { css } from '@emotion/react';

export default function ComponentLibrary() {
  return (
    <div>
      <h2 css={css`font-size: 28px; font-weight: 700; color: #2f3438; margin-bottom: 8px;`}>
        🧩 Component Library
      </h2>
      <p css={css`font-size: 16px; color: #828c94; margin-bottom: 40px; line-height: 1.5;`}>
        Interactive preview of all components in the design system with state variations.
      </p>

      <div css={css`
        background: #f7f9fa;
        border-radius: 12px;
        padding: 60px 40px;
        text-align: center;
        color: #828c94;
      `}>
        <p css={css`font-size: 18px; margin-bottom: 12px;`}>🚀 Component Preview</p>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Interactive component library coming soon...
        </p>
        <p style={{ fontSize: '12px', marginTop: '16px', color: '#c2c8cc' }}>
          See DESIGN_SYSTEM.md for component specifications
        </p>
      </div>

      {/* Component Categories */}
      <div css={css`margin-top: 40px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 24px;`}>
          Available Components
        </h3>

        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        `}>
          {['Buttons', 'Forms', 'Navigation', 'Cards', 'Badges', 'Modals', 'Tabs', 'Dropdowns'].map(
            (component) => (
              <div
                key={component}
                css={css`
                  border: 1px solid #e6e6e6;
                  border-radius: 12px;
                  padding: 24px;
                  cursor: pointer;
                  transition: all 200ms ease-out;

                  &:hover {
                    border-color: #0aa5ff;
                    box-shadow: 0 4px 16px rgba(10, 165, 255, 0.1);
                    transform: translateY(-2px);
                  }
                `}
              >
                <h4 css={css`font-size: 16px; font-weight: 600; color: #2f3438; margin: 0 0 8px 0;`}>
                  {component}
                </h4>
                <p css={css`font-size: 13px; color: #828c94; margin: 0;`}>
                  Click to view component specs and variations
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
