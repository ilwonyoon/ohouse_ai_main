'use client';

import { css } from '@emotion/react';
import { CodeBlock } from '../../components/CodeBlock';
import { ComponentPreview } from '../../components/ComponentPreview';

export default function SpacingPage() {
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

  const spacingGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 24px;
  `;

  const spacingCardStyle = css`
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e6e6e6;
    background-color: #f7f9fa;
    padding: 16px;
  `;

  const spacingVisualStyle = (size: string) => css`
    background-color: #0aa5ff;
    margin-bottom: 12px;
    border-radius: 4px;
    opacity: 0.8;
    height: ${size};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #ffffff;
    font-weight: 600;
  `;

  const spacingLabelStyle = css`
    font-size: 14px;
    font-weight: 600;
    color: #2f3438;
    margin-bottom: 8px;
  `;

  const spacingValueStyle = css`
    font-size: 12px;
    color: #828c94;
    font-family: monospace;
    margin-bottom: 4px;
  `;

  const usageTableStyle = css`
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

  const exampleContainerStyle = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  `;

  const dividerStyle = (thickness: string) => css`
    height: ${thickness};
    background-color: #e6e6e6;
    width: 100%;
    margin: 12px 0;
  `;

  const spacingDemoStyle = css`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-top: 24px;
    padding: 24px;
    background-color: #f7f9fa;
    border-radius: 8px;
  `;

  const demoBoxStyle = css`
    width: 100px;
    height: 100px;
    background-color: #0aa5ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
  `;

  const spacingExampleStyle = (spacing: string) => css`
    display: flex;
    gap: ${spacing};
    margin-bottom: 16px;

    > div {
      flex: 1;
    }
  `;

  const spacingScaleData = [
    { name: 'Micro', value: '2px', units: '0.25', usage: 'Dividers, micro gaps' },
    { name: 'Extra Small', value: '4px', units: '0.5', usage: 'Icon-text gaps, small spacing' },
    { name: 'Small', value: '8px', units: '1', usage: 'Element spacing, padding' },
    { name: 'Medium-Small', value: '12px', units: '1.5', usage: 'Card padding, item spacing' },
    { name: 'Medium', value: '16px', units: '2', usage: 'Page margins, component spacing' },
    { name: 'Medium-Large', value: '20px', units: '2.5', usage: 'Section spacing' },
    { name: 'Large', value: '24px', units: '3', usage: 'Major section separation' },
    { name: 'Extra Large', value: '32px', units: '4', usage: 'Large section spacing' },
  ];

  const componentSpacingData = [
    { component: 'Top Navigation', padding: '10px', margin: '0', height: '44px' },
    { component: 'Feature Card', padding: '12px', margin: '16px (H), 12px (V)', height: '263px' },
    { component: 'Room List Item', padding: '12px (H), 8px (V)', margin: '0', height: '72px' },
    { component: 'Bottom Navigation', padding: '16px (H), 8px (B)', margin: '0', height: '88.5px' },
    { component: 'Room Analyzer', padding: '16px', margin: '0', height: '104px' },
    { component: 'Upload Cell', padding: '0', margin: '12px', height: '126px' },
  ];

  const importCode = `import { SemanticTokens } from '@/docs/tokens';

// Use spacing tokens
const pagePadding = SemanticTokens.Spacing.Horizontal.PAGE_EDGE; // 16px
const cardSpacing = SemanticTokens.Spacing.Vertical.CARD_SPACING; // 12px
const componentGap = SemanticTokens.Spacing.Component.Gap.ELEMENT; // 12px

// Or use primitive tokens
import { PrimitiveTokens } from '@/docs/tokens';
const spacing = PrimitiveTokens.Spacing.MEDIUM; // 16px`;

  const cssExample = `// Using spacing in CSS
const containerStyle = css\`
  padding: \${SemanticTokens.Spacing.Component.Padding.DEFAULT}; // 12px
  margin-bottom: \${SemanticTokens.Spacing.Vertical.SECTION_SPACING}; // 20px
  gap: \${SemanticTokens.Spacing.Component.Gap.ELEMENT}; // 12px
\`;`;

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Spacing</h1>
      <p css={descriptionStyle}>
        A comprehensive spacing system built on an 8px base unit. All spacing values derive from this
        base unit to maintain consistency and create a predictable layout rhythm across the entire
        application.
      </p>

      <div css={sectionStyle}>
        <h2>8px Base Unit System</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          The entire spacing system is built on a single 8px base unit. All spacing values are
          multiples of this unit, ensuring perfect alignment and consistency.
        </p>
        <div css={spacingGridStyle}>
          {spacingScaleData.map((item) => (
            <div key={item.value} css={spacingCardStyle}>
              <div css={spacingVisualStyle(item.value)}>{item.value}</div>
              <div css={spacingLabelStyle}>{item.name}</div>
              <div css={spacingValueStyle}>{item.units} unit(s)</div>
              <div css={css`font-size: 12px; color: #828c94; line-height: 1.4;`}>
                {item.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Spacing Scale Reference</h2>
        <table css={usageTableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Units</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            {spacingScaleData.map((item) => (
              <tr key={item.value}>
                <td>
                  <code>{item.name}</code>
                </td>
                <td>
                  <code>{item.value}</code>
                </td>
                <td>{item.units}x</td>
                <td>{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div css={sectionStyle}>
        <h2>Spacing by Context</h2>

        <h3 css={css`margin: 24px 0 16px 0; font-size: 20px; font-weight: 600; color: #2f3438;`}>
          Horizontal Spacing
        </h3>
        <p css={css`color: #828c94; margin-bottom: 16px;`}>
          Horizontal spacing defines the left and right margins of content
        </p>
        <table css={usageTableStyle}>
          <thead>
            <tr>
              <th>Context</th>
              <th>Size</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Page Edges</td>
              <td>
                <code>16px</code>
              </td>
              <td>Safe margin on both sides of the viewport</td>
            </tr>
            <tr>
              <td>Element Spacing</td>
              <td>
                <code>12px</code>
              </td>
              <td>Space between adjacent elements within a container</td>
            </tr>
            <tr>
              <td>Content Width</td>
              <td>
                <code>343px</code>
              </td>
              <td>Maximum usable content width (375px - 32px sides)</td>
            </tr>
          </tbody>
        </table>

        <h3 css={css`margin: 32px 0 16px 0; font-size: 20px; font-weight: 600; color: #2f3438;`}>
          Vertical Spacing
        </h3>
        <p css={css`color: #828c94; margin-bottom: 16px;`}>
          Vertical spacing creates hierarchy and separates content sections
        </p>
        <table css={usageTableStyle}>
          <thead>
            <tr>
              <th>Context</th>
              <th>Size</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Section Spacing</td>
              <td>
                <code>20px</code>
              </td>
              <td>Spacing between major content sections</td>
            </tr>
            <tr>
              <td>Card Spacing</td>
              <td>
                <code>12px</code>
              </td>
              <td>Vertical space between cards and list items</td>
            </tr>
            <tr>
              <td>Title to Content</td>
              <td>
                <code>8px</code>
              </td>
              <td>Space between section title and body content</td>
            </tr>
            <tr>
              <td>Content Lines</td>
              <td>
                <code>4px</code>
              </td>
              <td>Micro spacing between content lines</td>
            </tr>
          </tbody>
        </table>

        <h3 css={css`margin: 32px 0 16px 0; font-size: 20px; font-weight: 600; color: #2f3438;`}>
          Safe Area Spacing
        </h3>
        <p css={css`color: #828c94; margin-bottom: 16px;`}>
          Mobile safe area boundaries that must be respected
        </p>
        <table css={usageTableStyle}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Size</th>
              <th>Contains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Top</td>
              <td>
                <code>48px</code>
              </td>
              <td>Status bar</td>
            </tr>
            <tr>
              <td>Bottom</td>
              <td>
                <code>88.5px</code>
              </td>
              <td>Bottom navigation</td>
            </tr>
            <tr>
              <td>Horizontal Sides</td>
              <td>
                <code>16px</code>
              </td>
              <td>Page margins</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div css={sectionStyle}>
        <h2>Component Spacing Specifications</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          Standard spacing values for each component type
        </p>
        <table css={usageTableStyle}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Padding</th>
              <th>Margin</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            {componentSpacingData.map((item) => (
              <tr key={item.component}>
                <td>{item.component}</td>
                <td>
                  <code>{item.padding}</code>
                </td>
                <td>
                  <code>{item.margin}</code>
                </td>
                <td>
                  <code>{item.height}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div css={sectionStyle}>
        <h2>Visual Examples</h2>

        <h3 css={css`margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          Vertical Spacing
        </h3>
        <ComponentPreview description="Visual representation of vertical spacing">
          <div css={exampleContainerStyle}>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>2px (Micro)</div>
              <div css={dividerStyle('2px')} />
            </div>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>4px (Extra Small)</div>
              <div css={dividerStyle('4px')} />
            </div>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>8px (Small)</div>
              <div css={dividerStyle('8px')} />
            </div>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>12px (Medium-Small)</div>
              <div css={dividerStyle('12px')} />
            </div>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>16px (Medium)</div>
              <div css={dividerStyle('16px')} />
            </div>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>20px (Medium-Large)</div>
              <div css={dividerStyle('20px')} />
            </div>
            <div>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>24px (Large)</div>
              <div css={dividerStyle('24px')} />
            </div>
          </div>
        </ComponentPreview>

        <h3 css={css`margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          Horizontal Spacing with Gap
        </h3>
        <ComponentPreview description="Element spacing using horizontal gaps">
          <div>
            <div css={css`margin-bottom: 16px;`}>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>Gap: 4px (Icon-text)</div>
              <div css={spacingExampleStyle('4px')}>
                <div css={demoBoxStyle}>A</div>
                <div css={demoBoxStyle}>B</div>
              </div>
            </div>
            <div css={css`margin-bottom: 16px;`}>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>Gap: 12px (Element)</div>
              <div css={spacingExampleStyle('12px')}>
                <div css={demoBoxStyle}>A</div>
                <div css={demoBoxStyle}>B</div>
                <div css={demoBoxStyle}>C</div>
              </div>
            </div>
            <div css={css`margin-bottom: 16px;`}>
              <div css={css`font-size: 12px; color: #828c94; margin-bottom: 8px;`}>Gap: 20px (Section)</div>
              <div css={spacingExampleStyle('20px')}>
                <div css={demoBoxStyle}>A</div>
                <div css={demoBoxStyle}>B</div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>Usage</h2>
        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          Import and Use Tokens
        </h3>
        <CodeBlock code={importCode} language="typescript" />

        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          CSS Example
        </h3>
        <CodeBlock code={cssExample} language="typescript" />
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

            code {
              background-color: #f7f9fa;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
              color: #0aa5ff;
            }
          `}
        >
          <li>
            <strong>Always use spacing tokens:</strong> Never use arbitrary pixel values outside the
            spacing scale
          </li>
          <li>
            <strong>Maintain consistency:</strong> Use the same spacing values for similar components
          </li>
          <li>
            <strong>Think in rhythm:</strong> Combine spacing values to create visual hierarchy (e.g.,
            8px + 12px = 20px section break)
          </li>
          <li>
            <strong>Respect safe areas:</strong> Always account for status bar (48px) and bottom
            navigation (88.5px)
          </li>
          <li>
            <strong>Mobile first:</strong> Horizontal spacing should never be less than 16px on mobile
            to maintain usable margins
          </li>
          <li>
            <strong>Between elements:</strong> Use 12px as default gap between list items and components
          </li>
          <li>
            <strong>Section breaks:</strong> Use 20px or 24px spacing to visually separate major sections
          </li>
        </ul>
      </div>
    </div>
  );
}
