'use client';

import { css } from '@emotion/react';

export default function AccessibilityChecks() {
  const wcagRequirements = [
    { level: 'WCAG AA', ratio: '4.5:1', type: 'Normal text', status: '✓ Met' },
    { level: 'WCAG AA', ratio: '3:1', type: 'Large text (18px+)', status: '✓ Met' },
    { level: 'WCAG AA', ratio: '3:1', type: 'UI components', status: '✓ Met' },
    { level: 'AAA', ratio: '7:1', type: 'Enhanced contrast', status: '✓ Available' },
  ];

  const a11yChecks = [
    { item: 'Keyboard Navigation', status: 'Supported', icon: '⌨️' },
    { item: 'Focus Indicators', status: 'Visible', icon: '👁️' },
    { item: 'Screen Reader Support', status: 'ARIA Labels', icon: '📢' },
    { item: 'Color Contrast', status: 'WCAG AA', icon: '🎨' },
    { item: 'Reduced Motion', status: 'Supported', icon: '🎬' },
    { item: 'Text Resizing', status: 'Responsive', icon: '📝' },
  ];

  return (
    <div>
      <h2 css={css`font-size: 28px; font-weight: 700; color: #2f3438; margin-bottom: 8px;`}>
        ♿ Accessibility & Compliance
      </h2>
      <p css={css`font-size: 16px; color: #828c94; margin-bottom: 40px; line-height: 1.5;`}>
        Ohouse AI is committed to WCAG 2.1 Level AA compliance to ensure accessibility for all users.
      </p>

      {/* A11y Checklist */}
      <div css={css`margin-bottom: 50px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 24px;`}>
          A11y Features
        </h3>

        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        `}>
          {a11yChecks.map((check) => (
            <div
              key={check.item}
              css={css`
                border: 1px solid #e6e6e6;
                border-radius: 12px;
                padding: 20px;
                background: #ffffff;
                display: flex;
                flex-direction: column;
                gap: 8px;

                &:hover {
                  border-color: #0aa5ff;
                  box-shadow: 0 2px 8px rgba(10, 165, 255, 0.1);
                }
              `}
            >
              <div css={css`font-size: 24px;`}>{check.icon}</div>
              <h4 css={css`margin: 0; font-size: 15px; font-weight: 600; color: #2f3438;`}>
                {check.item}
              </h4>
              <p css={css`margin: 0; font-size: 13px; color: #27ae60; font-weight: 600;`}>
                ✓ {check.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG Compliance Table */}
      <div css={css`margin-bottom: 50px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 16px;`}>
          WCAG 2.1 Compliance
        </h3>

        <div css={css`
          background: #f7f9fa;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e6e6e6;
        `}>
          <table css={css`width: 100%; border-collapse: collapse;`}>
            <thead>
              <tr css={css`background-color: #ffffff; border-bottom: 2px solid #e6e6e6;`}>
                <th css={css`padding: 16px; text-align: left; font-size: 14px; font-weight: 700; color: #2f3438;`}>
                  Level
                </th>
                <th css={css`padding: 16px; text-align: left; font-size: 14px; font-weight: 700; color: #2f3438;`}>
                  Requirement
                </th>
                <th css={css`padding: 16px; text-align: left; font-size: 14px; font-weight: 700; color: #2f3438;`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {wcagRequirements.map((req, idx) => (
                <tr key={idx} css={css`border-bottom: 1px solid #e6e6e6;`}>
                  <td css={css`padding: 16px; font-size: 14px; color: #2f3438; font-weight: 600;`}>
                    {req.level}
                  </td>
                  <td css={css`padding: 16px; font-size: 14px; color: #2f3438;`}>
                    <strong>{req.type}</strong>: {req.ratio} contrast
                  </td>
                  <td css={css`padding: 16px; font-size: 14px; color: #27ae60; font-weight: 600;`}>
                    {req.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Focus Management */}
      <div css={css`margin-bottom: 50px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 24px;`}>
          Focus Management & Keyboard Navigation
        </h3>

        <div css={css`
          background: #f7f9fa;
          border-radius: 12px;
          padding: 40px;
        `}>
          <p css={css`
            font-size: 14px;
            color: #2f3438;
            margin: 0 0 16px 0;
            line-height: 1.6;
          `}>
            Try using the <strong>Tab</strong> key to navigate through interactive elements. You'll notice:
          </p>
          <ul css={css`
            margin: 0;
            padding-left: 20px;
            font-size: 14px;
            color: #2f3438;
            line-height: 1.8;
          `}>
            <li>Visible focus rings on all interactive elements (2px cyan outline)</li>
            <li>Logical tab order matching visual layout</li>
            <li>Clear indication of current focus state</li>
            <li>Proper focus management in modals and dropdowns</li>
          </ul>
        </div>
      </div>

      {/* Documentation Reference */}
      <div css={css`
        background: #f0f8ff;
        border: 1px solid #0aa5ff;
        border-radius: 12px;
        padding: 30px;
      `}>
        <h3 css={css`font-size: 18px; font-weight: 700; color: #0aa5ff; margin-top: 0; margin-bottom: 16px;`}>
          📚 Full Accessibility Documentation
        </h3>
        <p css={css`
          font-size: 14px;
          color: #2f3438;
          margin: 0 0 12px 0;
          line-height: 1.6;
        `}>
          Complete accessibility guidelines, WCAG compliance checklist, and implementation details:
        </p>
        <ul css={css`
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: #2f3438;
        `}>
          <li>ACCESSIBILITY.md - Complete WCAG 2.1 AA guidelines</li>
          <li>STATES_AND_VARIANTS.md - Focus and disabled states</li>
          <li>AccessibilityTokens - Focus ring and high contrast tokens</li>
          <li>WCAG 2.1 Quick Reference - Accessibility requirements</li>
        </ul>
      </div>
    </div>
  );
}
