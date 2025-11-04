'use client';

import { css } from '@emotion/react';
import { CodeBlock } from '../../components/CodeBlock';

export default function TypographyPage() {
  const pageStyle = css`
    max-width: 1000px;
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

  const typoGridStyle = css`
    display: grid;
    gap: 32px;
    margin-top: 24px;
  `;

  const typoItemStyle = css`
    padding: 32px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #f7f9fa;
  `;

  const typoLabelStyle = css`
    font-size: 12px;
    font-weight: 700;
    color: #828c94;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  `;

  const previewStyle = (fontSize: string, fontWeight: number, lineHeight: string) => css`
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    color: #2f3438;
    margin: 0 0 16px 0;
    font-family: 'Pretendard', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  `;

  const specStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    font-size: 13px;
    color: #828c94;
    font-family: monospace;
    background-color: #ffffff;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;

    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    strong {
      color: #2f3438;
      font-weight: 600;
      font-family: monospace;
    }
  `;

  const usageExampleStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 24px;
  `;

  const exampleCardStyle = css`
    padding: 32px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #ffffff;

    h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2f3438;
    }
  `;

  const tableStyle = css`
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;

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
      font-size: 13px;
    }
  `;

  const typographyStyles = [
    {
      name: 'Heading 24 / Bold',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
      usage: 'Main page titles, hero headings',
    },
    {
      name: 'Heading 20 / Semibold',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      usage: 'Section headers, major titles',
    },
    {
      name: 'Heading 18 / Bold',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '24px',
      usage: 'Card titles, dialog headers',
    },
    {
      name: 'Heading 17 / Semibold',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '26px',
      usage: 'Top navigation text, page subtitles',
    },
    {
      name: 'Body 16 / Bold',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '20px',
      usage: 'Emphasized body text, strong emphasis',
    },
    {
      name: 'Body 15 / Bold',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '24px',
      usage: 'Tab text, featured content emphasis',
    },
    {
      name: 'Body 15 / Semibold',
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: '24px',
      usage: 'Feature card titles, highlighted text',
    },
    {
      name: 'Body 15 / Medium',
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: '24px',
      usage: 'Regular body text, standard content',
    },
    {
      name: 'Body 14 / Semibold',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      usage: 'Button text, labels, callouts',
    },
    {
      name: 'Body 14 / Medium',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      usage: 'Regular body text (most common)',
    },
    {
      name: 'Body 14 / Regular',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      usage: 'Descriptions, explanatory text',
    },
    {
      name: 'Detail 13 / Semibold',
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: '18px',
      usage: 'Small labels, emphasized details',
    },
    {
      name: 'Detail 13 / Regular',
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '18px',
      usage: 'Secondary details, captions',
    },
    {
      name: 'Detail 12 / Semibold',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '16px',
      usage: 'Small emphasizes, tags',
    },
    {
      name: 'Detail 12 / Medium',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      usage: 'Helper text, small captions',
    },
    {
      name: 'Detail 10 / Bold',
      fontSize: '10px',
      fontWeight: 700,
      lineHeight: '14px',
      usage: 'Badges, tags, small labels',
    },
  ];

  const importCode = `import { SemanticTokens } from '@/docs/tokens';

// Use typography token
const heading = SemanticTokens.Typography.Heading.H1; // 24px, Bold
const body = SemanticTokens.Typography.Body.MEDIUM; // 14px, Medium
const detail = SemanticTokens.Typography.Detail.MEDIUM; // 13px, Medium

// Apply in CSS
const headingStyle = css\`
  font-size: \${heading.fontSize};
  font-weight: \${heading.fontWeight};
  line-height: \${heading.lineHeight};
  font-family: \${heading.fontFamily};
\`;`;

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Typography</h1>
      <p css={descriptionStyle}>
        A precise typography system based on Pretendard font family with semantic scale for
        headings, body text, and details. Designed for clarity and readability across all
        viewport sizes.
      </p>

      <div css={sectionStyle}>
        <h2>Font Family & Weights</h2>
        <div css={usageExampleStyle} style={{ marginTop: 24 }}>
          <div css={exampleCardStyle}>
            <h3>Primary Font</h3>
            <p
              css={css`
                font-size: 14px;
                color: #2f3438;
                margin: 0;
                line-height: 1.6;
              `}
            >
              <strong>Pretendard</strong> - Korean-optimized system font for exceptional
              readability and modern aesthetic
            </p>
          </div>

          <div css={exampleCardStyle}>
            <h3>Fallback Stack</h3>
            <p
              css={css`
                font-size: 14px;
                color: #2f3438;
                margin: 0;
                font-family: monospace;
                line-height: 1.6;
              `}
            >
              SF Pro Text → -apple-system → sans-serif
            </p>
          </div>

          <div css={exampleCardStyle}>
            <h3>Available Weights</h3>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
              `}
            >
              <div>
                <span css={css`color: #828c94; font-size: 12px; display: block; margin-bottom: 4px;`}>
                  Regular
                </span>
                <span css={css`font-weight: 400;`}>The quick brown fox</span>
              </div>
              <div>
                <span css={css`color: #828c94; font-size: 12px; display: block; margin-bottom: 4px;`}>
                  Medium
                </span>
                <span css={css`font-weight: 500;`}>The quick brown fox</span>
              </div>
              <div>
                <span css={css`color: #828c94; font-size: 12px; display: block; margin-bottom: 4px;`}>
                  Semibold
                </span>
                <span css={css`font-weight: 600;`}>The quick brown fox</span>
              </div>
              <div>
                <span css={css`color: #828c94; font-size: 12px; display: block; margin-bottom: 4px;`}>
                  Bold
                </span>
                <span css={css`font-weight: 700;`}>The quick brown fox</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Headings</h2>
        <div css={typoGridStyle}>
          {typographyStyles
            .filter((style) => style.name.includes('Heading'))
            .map((style) => (
              <div key={style.name} css={typoItemStyle}>
                <div css={typoLabelStyle}>{style.name}</div>
                <div css={previewStyle(style.fontSize, style.fontWeight, style.lineHeight)}>
                  The quick brown fox jumps
                </div>
                <div css={specStyle}>
                  <div>
                    <span>Size</span>
                    <strong>{style.fontSize}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{style.fontWeight}</strong>
                  </div>
                  <div>
                    <span>Line Height</span>
                    <strong>{style.lineHeight}</strong>
                  </div>
                </div>
                <p
                  css={css`
                    font-size: 13px;
                    color: #828c94;
                    margin: 12px 0 0 0;
                  `}
                >
                  {style.usage}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Body Text</h2>
        <div css={typoGridStyle}>
          {typographyStyles
            .filter((style) => style.name.includes('Body'))
            .map((style) => (
              <div key={style.name} css={typoItemStyle}>
                <div css={typoLabelStyle}>{style.name}</div>
                <div css={previewStyle(style.fontSize, style.fontWeight, style.lineHeight)}>
                  The quick brown fox jumps over the lazy dog. This is sample text.
                </div>
                <div css={specStyle}>
                  <div>
                    <span>Size</span>
                    <strong>{style.fontSize}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{style.fontWeight}</strong>
                  </div>
                  <div>
                    <span>Line Height</span>
                    <strong>{style.lineHeight}</strong>
                  </div>
                </div>
                <p
                  css={css`
                    font-size: 13px;
                    color: #828c94;
                    margin: 12px 0 0 0;
                  `}
                >
                  {style.usage}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Details & Small Text</h2>
        <div css={typoGridStyle}>
          {typographyStyles
            .filter((style) => style.name.includes('Detail'))
            .map((style) => (
              <div key={style.name} css={typoItemStyle}>
                <div css={typoLabelStyle}>{style.name}</div>
                <div css={previewStyle(style.fontSize, style.fontWeight, style.lineHeight)}>
                  The quick brown fox jumps
                </div>
                <div css={specStyle}>
                  <div>
                    <span>Size</span>
                    <strong>{style.fontSize}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{style.fontWeight}</strong>
                  </div>
                  <div>
                    <span>Line Height</span>
                    <strong>{style.lineHeight}</strong>
                  </div>
                </div>
                <p
                  css={css`
                    font-size: 13px;
                    color: #828c94;
                    margin: 12px 0 0 0;
                  `}
                >
                  {style.usage}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Real World Examples</h2>
        <div css={usageExampleStyle}>
          <div css={exampleCardStyle}>
            <h3 css={previewStyle('18px', 700, '24px')}>Feature Card</h3>
            <p css={previewStyle('15px', 600, '24px')} style={{ marginBottom: 8 }}>
              Card Title
            </p>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94' }}>
              This is the description text that provides context and explains the feature card
              above.
            </p>
          </div>

          <div css={exampleCardStyle}>
            <h3 css={previewStyle('20px', 600, '28px')} style={{ marginBottom: 16 }}>
              Section Header
            </h3>
            <p css={previewStyle('14px', 500, '20px')} style={{ marginBottom: 12 }}>
              Supporting body text that explains the section heading in more detail with
              information about the content below.
            </p>
            <p css={previewStyle('13px', 400, '18px')} style={{ color: '#828c94' }}>
              Helper text or metadata
            </p>
          </div>

          <div css={exampleCardStyle}>
            <h3 css={previewStyle('17px', 600, '26px')} style={{ marginBottom: 16 }}>
              Navigation Title
            </h3>
            <button
              css={css`
                padding: 10px 20px;
                background-color: #0aa5ff;
                color: #ffffff;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
              `}
            >
              Try It
            </button>
            <p css={previewStyle('12px', 500, '16px')} style={{ color: '#828c94', marginTop: 12 }}>
              Helper text · Metadata
            </p>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Complete Reference</h2>
        <div css={css`overflow-x: auto;`}>
          <table css={tableStyle}>
            <thead>
              <tr>
                <th>Style Name</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Line Height</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {typographyStyles.map((style) => (
                <tr key={style.name}>
                  <td>
                    <code>{style.name}</code>
                  </td>
                  <td>{style.fontSize}</td>
                  <td>{style.fontWeight}</td>
                  <td>{style.lineHeight}</td>
                  <td>{style.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Usage in Code</h2>
        <CodeBlock code={importCode} language="typescript" />
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
            <strong>Use semantic names:</strong> Reference typography by semantic names (Heading20,
            Body14) rather than pixel values
          </li>
          <li>
            <strong>Maintain hierarchy:</strong> Use proper heading levels (h1-h6) in HTML for
            accessibility and SEO
          </li>
          <li>
            <strong>Consistent pairing:</strong> Always pair headings with appropriate body text
            from the scale
          </li>
          <li>
            <strong>Line length:</strong> Keep text lines between 45-75 characters for optimal
            readability
          </li>
          <li>
            <strong>Font loading:</strong> Pretendard should be loaded from system or CDN for
            optimal performance
          </li>
          <li>
            <strong>Accessibility:</strong> Ensure sufficient color contrast (4.5:1 minimum) with
            background colors
          </li>
        </ul>
      </div>
    </div>
  );
}
