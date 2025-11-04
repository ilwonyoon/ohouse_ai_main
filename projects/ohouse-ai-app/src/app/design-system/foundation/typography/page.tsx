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

  const typoPreviewStyle = (size: string, weight: number, lineHeight: number) => css`
    font-size: ${size};
    font-weight: ${weight};
    line-height: ${lineHeight};
    color: #2f3438;
    margin: 0 0 16px 0;
  `;

  const specStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    font-size: 13px;
    color: #828c94;

    div {
      display: flex;
      justify-content: space-between;
    }

    strong {
      color: #2f3438;
      font-weight: 600;
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

  const pairedTypoStyle = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  const h1Style = css`
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    color: #2f3438;
    margin: 0;
  `;

  const h2TypoStyle = css`
    font-size: 36px;
    font-weight: 700;
    line-height: 1.3;
    color: #2f3438;
    margin: 0;
  `;

  const h3TypoStyle = css`
    font-size: 28px;
    font-weight: 700;
    line-height: 1.4;
    color: #2f3438;
    margin: 0;
  `;

  const h4TypoStyle = css`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
    color: #2f3438;
    margin: 0;
  `;

  const h5TypoStyle = css`
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    color: #2f3438;
    margin: 0;
  `;

  const bodyLargeStyle = css`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: #2f3438;
    margin: 0;
  `;

  const bodyStyle = css`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    color: #2f3438;
    margin: 0;
  `;

  const bodySmallStyle = css`
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    color: #828c94;
    margin: 0;
  `;

  const captionStyle = css`
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
    color: #c2c8cc;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
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

  const importCode = `import { typography } from '@/docs/tokens';

// Use typography token
const headingStyle = css\`
  font-size: \${typography.size.h1}; // 48px
  font-weight: \${typography.weight.bold}; // 700
  line-height: \${typography.lineHeight.tight}; // 1.2
\`;`;

  const cssVarsCode = `/* CSS Variables Approach */
:root {
  --typography-h1-size: 48px;
  --typography-h1-weight: 700;
  --typography-h1-line-height: 1.2;

  --typography-body-size: 14px;
  --typography-body-weight: 400;
  --typography-body-line-height: 1.6;
}

h1 {
  font-size: var(--typography-h1-size);
  font-weight: var(--typography-h1-weight);
  line-height: var(--typography-h1-line-height);
}`;

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Typography</h1>
      <p css={descriptionStyle}>
        A carefully crafted typography system with semantic scale for headings, body text, and
        captions. Ensures consistent, readable, and accessible text across the entire product.
      </p>

      <div css={sectionStyle}>
        <h2>Headings</h2>
        <div css={typoGridStyle}>
          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Heading 1</div>
            <h1 css={typoPreviewStyle('48px', 700, 1.2)}>The quick brown fox</h1>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>48px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>700 (Bold)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.2</strong>
              </div>
              <div>
                <span>Letter Spacing</span>
                <strong>-0.5px</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Heading 2</div>
            <h2 css={typoPreviewStyle('36px', 700, 1.3)}>The quick brown fox</h2>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>36px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>700 (Bold)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.3</strong>
              </div>
              <div>
                <span>Letter Spacing</span>
                <strong>-0.25px</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Heading 3</div>
            <h3 css={typoPreviewStyle('28px', 700, 1.4)}>The quick brown fox</h3>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>28px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>700 (Bold)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.4</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Heading 4</div>
            <h4 css={typoPreviewStyle('20px', 700, 1.5)}>The quick brown fox</h4>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>20px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>700 (Bold)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.5</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Heading 5</div>
            <h5 css={typoPreviewStyle('16px', 600, 1.5)}>The quick brown fox</h5>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>16px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>600 (Semibold)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.5</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Body Text</h2>
        <div css={typoGridStyle}>
          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Body Large</div>
            <p
              css={typoPreviewStyle('16px', 400, 1.6)}
              style={{ marginBottom: 16 }}
            >
              The quick brown fox jumps over the lazy dog. This is a sample of body large text
              which is commonly used for introductory paragraphs and emphasized content.
            </p>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>16px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>400 (Regular)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.6</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Body (Default)</div>
            <p
              css={typoPreviewStyle('14px', 400, 1.6)}
              style={{ marginBottom: 16 }}
            >
              The quick brown fox jumps over the lazy dog. This is the default body text size used
              throughout the application for most content.
            </p>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>14px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>400 (Regular)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.6</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Body Small</div>
            <p
              css={typoPreviewStyle('12px', 400, 1.5)}
              style={{ marginBottom: 16 }}
            >
              The quick brown fox jumps over the lazy dog. Used for secondary information and
              helper text.
            </p>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>12px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>400 (Regular)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.5</strong>
              </div>
            </div>
          </div>

          <div css={typoItemStyle}>
            <div css={typoLabelStyle}>Caption</div>
            <p
              css={typoPreviewStyle('11px', 500, 1.4)}
              style={{ marginBottom: 16 }}
            >
              CAPTION TEXT · LABELS & BADGES
            </p>
            <div css={specStyle}>
              <div>
                <span>Size</span>
                <strong>11px</strong>
              </div>
              <div>
                <span>Weight</span>
                <strong>500 (Medium)</strong>
              </div>
              <div>
                <span>Line Height</span>
                <strong>1.4</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Pairing Examples</h2>
        <p>Best practices for combining typography styles in common UI patterns</p>
        <div css={usageExampleStyle}>
          <div css={exampleCardStyle}>
            <h3>Card Title + Body</h3>
            <div css={pairedTypoStyle}>
              <h3 css={h3TypoStyle}>Feature Title</h3>
              <p css={bodyStyle}>This is body text that provides context and explanation for the heading above.</p>
            </div>
          </div>

          <div css={exampleCardStyle}>
            <h3>Form Label + Helper Text</h3>
            <div css={pairedTypoStyle}>
              <label css={h5TypoStyle}>Email Address</label>
              <p css={bodySmallStyle}>We'll never share your email with anyone else.</p>
            </div>
          </div>

          <div css={exampleCardStyle}>
            <h3>Section Title + Subtitle</h3>
            <div css={pairedTypoStyle}>
              <h2 css={h2TypoStyle}>Typography System</h2>
              <p css={bodyLargeStyle}>A carefully crafted scale for all text styles</p>
            </div>
          </div>

          <div css={exampleCardStyle}>
            <h3>Data Label + Value</h3>
            <div css={pairedTypoStyle}>
              <p css={bodySmallStyle}>TOTAL USERS</p>
              <h3 css={h2TypoStyle}>24,563</h3>
            </div>
          </div>

          <div css={exampleCardStyle}>
            <h3>Dialog Title + Description</h3>
            <div css={pairedTypoStyle}>
              <h2 css={h2TypoStyle}>Confirm Action</h2>
              <p css={bodyStyle}>Are you sure you want to proceed? This action cannot be undone.</p>
            </div>
          </div>

          <div css={exampleCardStyle}>
            <h3>Button + Caption</h3>
            <div css={pairedTypoStyle} style={{ gap: 8 }}>
              <button css={css`
                padding: 10px 20px;
                background-color: #0aa5ff;
                color: #ffffff;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
              `}>Primary Action</button>
              <p css={bodySmallStyle}>Required field</p>
            </div>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Usage</h2>
        <CodeBlock code={importCode} language="typescript" />
      </div>

      <div css={sectionStyle}>
        <h2>Font Family</h2>
        <p>System font stack for optimal performance and readability across all platforms:</p>
        <CodeBlock
          code={`font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;`}
          language="css"
        />
      </div>

      <div css={sectionStyle}>
        <h2>Reference Table</h2>
        <table css={tableStyle}>
          <thead>
            <tr>
              <th>Style</th>
              <th>Size</th>
              <th>Weight</th>
              <th>Line Height</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>h1</code></td>
              <td>48px</td>
              <td>700</td>
              <td>1.2</td>
              <td>Page titles, hero sections</td>
            </tr>
            <tr>
              <td><code>h2</code></td>
              <td>36px</td>
              <td>700</td>
              <td>1.3</td>
              <td>Section headings, major titles</td>
            </tr>
            <tr>
              <td><code>h3</code></td>
              <td>28px</td>
              <td>700</td>
              <td>1.4</td>
              <td>Subsection headings</td>
            </tr>
            <tr>
              <td><code>h4</code></td>
              <td>20px</td>
              <td>700</td>
              <td>1.5</td>
              <td>Card titles, minor headings</td>
            </tr>
            <tr>
              <td><code>h5</code></td>
              <td>16px</td>
              <td>600</td>
              <td>1.5</td>
              <td>Form labels, emphasis text</td>
            </tr>
            <tr>
              <td><code>body-large</code></td>
              <td>16px</td>
              <td>400</td>
              <td>1.6</td>
              <td>Introductory paragraphs</td>
            </tr>
            <tr>
              <td><code>body</code></td>
              <td>14px</td>
              <td>400</td>
              <td>1.6</td>
              <td>Default text content</td>
            </tr>
            <tr>
              <td><code>body-small</code></td>
              <td>12px</td>
              <td>400</td>
              <td>1.5</td>
              <td>Secondary text, helper text</td>
            </tr>
            <tr>
              <td><code>caption</code></td>
              <td>11px</td>
              <td>500</td>
              <td>1.4</td>
              <td>Labels, badges, captions</td>
            </tr>
          </tbody>
        </table>
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
          <li><strong>Use semantic HTML:</strong> Use <code>h1</code>-<code>h6</code> for headings and <code>p</code> for body text</li>
          <li><strong>Maintain hierarchy:</strong> Never skip heading levels (h1 → h3) to maintain document structure</li>
          <li><strong>Line length:</strong> Keep line length between 45-75 characters for optimal readability</li>
          <li><strong>Contrast:</strong> All text meets WCAG AA standards (4.5:1 minimum contrast)</li>
          <li><strong>Font scaling:</strong> Use relative units (rem, em) for responsive typography</li>
          <li><strong>Consistent pairing:</strong> Use the provided typographic pairings for consistent visual hierarchy</li>
        </ul>
      </div>
    </div>
  );
}
