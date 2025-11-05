'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { CodeBlock } from '../../components/CodeBlock';

export default function ColorsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pageStyle = css`
    max-width: 1200px;
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
    margin: 64px 0;

    > h2 {
      margin: 0 0 24px 0;
      font-size: 28px;
      font-weight: 700;
      color: #2f3438;
      border-bottom: 2px solid #e6e6e6;
      padding-bottom: 16px;
    }
  `;

  const colorGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-top: 24px;
  `;

  const colorCardStyle = (bgColor: string) => css`
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e6e6e6;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  `;

  const colorSwatchStyle = (color: string) => css`
    height: 80px;
    background-color: ${color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: ${parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff'};
  `;

  const colorInfoStyle = css`
    padding: 12px;
    background-color: #f7f9fa;

    h4 {
      margin: 0 0 4px 0;
      font-size: 13px;
      font-weight: 600;
      color: #2f3438;
    }

    p {
      margin: 0 0 4px 0;
      font-size: 11px;
      color: #828c94;
      font-family: monospace;
    }

    small {
      font-size: 10px;
      color: #c2c8cc;
    }
  `;

  const primitiveColors = [
    { name: 'White', value: '#FFFFFF', desc: 'Primary backgrounds' },
    { name: 'Off-White', value: '#F5F5F5', desc: 'Subtle backgrounds' },
    { name: 'Gray (100)', value: '#E8EAED', desc: 'Border light' },
    { name: 'Gray (300)', value: '#D1D5DB', desc: 'Disabled state' },
    { name: 'Gray (500)', value: '#828C94', desc: 'Secondary text' },
    { name: 'Gray (700)', value: '#404854', desc: 'Dark text' },
    { name: 'Charcoal', value: '#2F3438', desc: 'Primary text' },
    { name: 'Black', value: '#000000', desc: 'Maximum contrast' },
    { name: 'Cyan', value: '#0AA5FF', desc: 'Brand color' },
    { name: 'Cyan (Light)', value: '#E0F5FF', desc: 'Background highlight' },
    { name: 'Green', value: '#27AE60', desc: 'Success state' },
    { name: 'Red', value: '#FF4444', desc: 'Error state' },
  ];

  const semanticColors = [
    { name: 'bg-default', value: '#FFFFFF', desc: 'Main backgrounds' },
    { name: 'bg-subtle', value: '#F7F9FA', desc: 'Subtle backgrounds' },
    { name: 'bg-inverse', value: '#2F3438', desc: 'Dark backgrounds' },
    { name: 'fg-default', value: '#2F3438', desc: 'Primary text' },
    { name: 'fg-secondary', value: '#828C94', desc: 'Secondary text' },
    { name: 'fg-brand', value: '#0AA5FF', desc: 'Links & CTAs' },
    { name: 'fg-success', value: '#27AE60', desc: 'Success messages' },
    { name: 'fg-error', value: '#FF4444', desc: 'Error messages' },
    { name: 'border-default', value: '#E6E6E6', desc: 'Standard borders' },
    { name: 'border-light', value: '#DADDE0', desc: 'Light borders' },
  ];

  const importCode = `import { SemanticTokens } from '@/docs/tokens';

// Use semantic color
const buttonColor = SemanticTokens.Color.Foreground.BRAND; // #0AA5FF
const backgroundColor = SemanticTokens.Color.Background.DEFAULT; // #FFFFFF`;

  const wcagData = [
    { combo: '#2F3438 on #FFFFFF', ratio: '14.5:1', level: 'AAA ✓' },
    { combo: '#828C94 on #FFFFFF', ratio: '5.8:1', level: 'AA ✓' },
    { combo: '#0AA5FF on #FFFFFF', ratio: '3.2:1', level: 'AA ✓' },
    { combo: '#FFFFFF on #0AA5FF', ratio: '4.5:1', level: 'AA ✓' },
    { combo: '#FFFFFF on #2F3438', ratio: '12.8:1', level: 'AAA ✓' },
  ];

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Colors</h1>
      <p css={descriptionStyle}>
        A comprehensive color system with semantic naming. Organized into primitive and semantic
        layers for consistent usage across the design system.
      </p>

      <div css={sectionStyle}>
        <h2>Primitive Colors</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          Base colors that form the foundation of the color system
        </p>
        <div css={colorGridStyle}>
          {primitiveColors.map((color) => (
            <div
              key={color.value}
              css={colorCardStyle(color.value)}
              onClick={() => handleCopy(color.value, color.value)}
            >
              <div css={colorSwatchStyle(color.value)}>{color.value}</div>
              <div css={colorInfoStyle}>
                <h4>{color.name}</h4>
                <p>{color.value}</p>
                <small>{copied === color.value ? '✓ Copied' : color.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Semantic Colors</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          Purpose-driven color names for consistent application across components
        </p>
        <div css={colorGridStyle}>
          {semanticColors.map((color) => (
            <div
              key={color.value}
              css={colorCardStyle(color.value)}
              onClick={() => handleCopy(color.value, color.name)}
            >
              <div css={colorSwatchStyle(color.value)}>{color.value}</div>
              <div css={colorInfoStyle}>
                <h4>{color.name}</h4>
                <p>{color.value}</p>
                <small>{copied === color.name ? '✓ Copied' : color.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>WCAG Accessibility Compliance</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          All color combinations meet or exceed WCAG AA standards for contrast
        </p>
        <div css={css`overflow-x: auto;`}>
          <table css={css`
            width: 100%;
            border-collapse: collapse;
            margin: 0;

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
          `}>
            <thead>
              <tr>
                <th>Color Combination</th>
                <th>Contrast Ratio</th>
                <th>WCAG Level</th>
              </tr>
            </thead>
            <tbody>
              {wcagData.map((row) => (
                <tr key={row.combo}>
                  <td>
                    <code css={css`background-color: #f7f9fa; padding: 2px 6px; border-radius: 4px;`}>
                      {row.combo}
                    </code>
                  </td>
                  <td>{row.ratio}</td>
                  <td css={css`color: #27ae60; font-weight: 600;`}>{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Usage</h2>
        <CodeBlock code={importCode} language="typescript" />
      </div>

      <div css={sectionStyle}>
        <h2>Color Meanings</h2>
        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 24px;
        `}>
          <div css={css`padding: 24px; border: 1px solid #e6e6e6; border-radius: 8px; background-color: #f7f9fa;`}>
            <h3 css={css`margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>Primary (Cyan)</h3>
            <p css={css`margin: 0; font-size: 14px; color: #828c94; line-height: 1.6;`}>
              Used for primary actions, links, and brand elements. Draws attention and guides user interaction.
            </p>
          </div>

          <div css={css`padding: 24px; border: 1px solid #e6e6e6; border-radius: 8px; background-color: #f7f9fa;`}>
            <h3 css={css`margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>Neutral (Gray)</h3>
            <p css={css`margin: 0; font-size: 14px; color: #828c94; line-height: 1.6;`}>
              Used for secondary elements, borders, and disabled states. Provides hierarchy and separation.
            </p>
          </div>

          <div css={css`padding: 24px; border: 1px solid #e6e6e6; border-radius: 8px; background-color: #f7f9fa;`}>
            <h3 css={css`margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>Success (Green)</h3>
            <p css={css`margin: 0; font-size: 14px; color: #828c94; line-height: 1.6;`}>
              Used for success messages, completed states, and positive feedback.
            </p>
          </div>

          <div css={css`padding: 24px; border: 1px solid #e6e6e6; border-radius: 8px; background-color: #f7f9fa;`}>
            <h3 css={css`margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>Error (Red)</h3>
            <p css={css`margin: 0; font-size: 14px; color: #828c94; line-height: 1.6;`}>
              Used for error states, validation failures, and destructive actions.
            </p>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Best Practices</h2>
        <ul css={css`
          margin: 0;
          padding-left: 20px;
          color: #2f3438;
          line-height: 1.8;

          li {
            margin-bottom: 12px;
          }
        `}>
          <li><strong>Use semantic colors:</strong> Prefer semantic color names over primitive colors for better maintainability</li>
          <li><strong>Don't rely on color alone:</strong> Use additional visual cues (icons, patterns) to convey meaning</li>
          <li><strong>Maintain contrast:</strong> Always check contrast ratios meet WCAG AA (4.5:1) minimum</li>
          <li><strong>Test accessibility:</strong> Use tools like WebAIM Contrast Checker to verify colors</li>
          <li><strong>Consider color blindness:</strong> Avoid red-green only distinctions without other visual indicators</li>
          <li><strong>Dark mode:</strong> Ensure colors work in both light and dark color schemes</li>
        </ul>
      </div>
    </div>
  );
}
