'use client';

import { css } from '@emotion/react';
import { CodeBlock } from '../../components/CodeBlock';
import { ComponentPreview } from '../../components/ComponentPreview';

export default function TypographyPage() {
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
        Typography patterns used throughout Ohouse AI. Learn where each style is used and why,
        so you can apply them consistently when building new screens and features.
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
        <h2>Page Headings & Section Titles</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          How headings are used in actual Ohouse AI screens
        </p>

        {/* Heading 24 - Main Hero */}
        <ComponentPreview description="Heading24/Bold - Main page title, feature hero">
          <div css={css`background-color: #f7f9fa; padding: 32px; border-radius: 8px;`}>
            <h1 css={previewStyle('24px', 700, '32px')} style={{ marginBottom: 16 }}>
              No-Code Interior Design
            </h1>
            <p css={previewStyle('15px', 500, '24px')} style={{ color: '#828c94', margin: 0 }}>
              Design beautiful interiors with AI-powered recommendations
            </p>
          </div>
        </ComponentPreview>

        {/* Heading 20 - Section Header */}
        <ComponentPreview description="Heading20/Semibold - Major section headers">
          <div css={css`padding: 24px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px;`}>
            <h2 css={previewStyle('20px', 600, '28px')} style={{ marginBottom: 12, marginTop: 0 }}>
              My Room Projects
            </h2>
            <p css={previewStyle('14px', 500, '20px')} style={{ color: '#828c94', margin: 0 }}>
              Start a new design project or view previous ones
            </p>
          </div>
        </ComponentPreview>

        {/* Heading 18 - Card Title */}
        <ComponentPreview description="Heading18/Bold - Card and dialog titles">
          <div css={css`display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;`}>
            <div css={css`padding: 20px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 12px;`}>
              <h3 css={previewStyle('18px', 700, '24px')} style={{ margin: '0 0 12px 0' }}>
                Living Room
              </h3>
              <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: 0 }}>
                Modern Minimalist Style
              </p>
            </div>
            <div css={css`padding: 20px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 12px;`}>
              <h3 css={previewStyle('18px', 700, '24px')} style={{ margin: '0 0 12px 0' }}>
                Bedroom
              </h3>
              <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: 0 }}>
                Cozy Scandinavian
              </p>
            </div>
          </div>
        </ComponentPreview>

        {/* Heading 17 - Top Navigation */}
        <ComponentPreview description="Heading17/Semibold - Top navigation, page subtitles">
          <div css={css`border-bottom: 1px solid #e6e6e6; padding: 12px 0;`}>
            <h2 css={previewStyle('17px', 600, '26px')} style={{ margin: 0 }}>
              Design the Perfect Space
            </h2>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>Body & Content Text</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          Body text styles for different content contexts
        </p>

        {/* Body 16 - Emphasis */}
        <ComponentPreview description="Body16/Bold - Emphasized text, strong callouts">
          <div css={css`padding: 24px; background-color: #f0f8ff; border-left: 4px solid #0aa5ff; border-radius: 4px;`}>
            <p css={previewStyle('16px', 700, '20px')} style={{ margin: '0 0 12px 0', color: '#0aa5ff' }}>
              ✨ AI Design Recommendation
            </p>
            <p css={previewStyle('14px', 500, '20px')} style={{ color: '#2f3438', margin: 0 }}>
              This color palette works beautifully with your space. Try pairing it with natural wood tones.
            </p>
          </div>
        </ComponentPreview>

        {/* Body 15 - Feature Card & Tab Text */}
        <ComponentPreview description="Body15/Bold & Semibold - Card titles, tab text">
          <div css={css`display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;`}>
            <div css={css`padding: 16px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px; text-align: center;`}>
              <p css={previewStyle('15px', 700, '24px')} style={{ margin: '0 0 8px 0' }}>
                🎨 Colors
              </p>
              <p css={previewStyle('13px', 400, '18px')} style={{ color: '#828c94', margin: 0 }}>
                View palette
              </p>
            </div>
            <div css={css`padding: 16px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px; text-align: center; background-color: #f0f8ff;`}>
              <p css={previewStyle('15px', 700, '24px')} style={{ margin: '0 0 8px 0', color: '#0aa5ff' }}>
                ✓ Layouts
              </p>
              <p css={previewStyle('13px', 400, '18px')} style={{ color: '#828c94', margin: 0 }}>
                Active tab
              </p>
            </div>
            <div css={css`padding: 16px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px; text-align: center;`}>
              <p css={previewStyle('15px', 700, '24px')} style={{ margin: '0 0 8px 0' }}>
                📐 Styles
              </p>
              <p css={previewStyle('13px', 400, '18px')} style={{ color: '#828c94', margin: 0 }}>
                View styles
              </p>
            </div>
          </div>
        </ComponentPreview>

        {/* Body 14 - Most Common Text */}
        <ComponentPreview description="Body14/Medium & Regular - Main content, descriptions">
          <div css={css`padding: 24px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Design Tips & Tricks
            </h4>
            <p css={previewStyle('14px', 500, '20px')} style={{ margin: '0 0 12px 0', color: '#2f3438' }}>
              <strong>Pro Tip:</strong> Combine warm and cool tones for a balanced, inviting space.
            </p>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: 0 }}>
              This is regular body text for longer descriptions and explanations. It provides context and helps users understand the interface better. Body14/Regular is the most commonly used text style in the application.
            </p>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>Labels, Captions & Small Text</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          Small text for supporting information and metadata
        </p>

        {/* Detail 13 - Room Type Labels */}
        <ComponentPreview description="Detail13/Semibold & Regular - Labels, secondary info">
          <div css={css`padding: 16px; background-color: #f7f9fa; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 16px 0' }}>
              Room Details
            </h4>
            <div css={css`display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;`}>
              <div>
                <span css={previewStyle('13px', 600, '18px')} style={{ color: '#2f3438', display: 'block', marginBottom: '4px' }}>
                  Room Type
                </span>
                <span css={previewStyle('13px', 400, '18px')} style={{ color: '#828c94' }}>
                  Living Room
                </span>
              </div>
              <div>
                <span css={previewStyle('13px', 600, '18px')} style={{ color: '#2f3438', display: 'block', marginBottom: '4px' }}>
                  Style
                </span>
                <span css={previewStyle('13px', 400, '18px')} style={{ color: '#828c94' }}>
                  Modern Minimalist
                </span>
              </div>
            </div>
          </div>
        </ComponentPreview>

        {/* Detail 12 - Helper Text & Metadata */}
        <ComponentPreview description="Detail12/Medium & Semibold - Helper text, metadata">
          <div css={css`padding: 16px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px;`}>
            <div css={css`margin-bottom: 16px;`}>
              <label css={previewStyle('14px', 600, '20px')} style={{ display: 'block', marginBottom: '8px', color: '#2f3438' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                css={css`
                  width: 100%;
                  padding: 10px 12px;
                  border: 1px solid #e6e6e6;
                  border-radius: 6px;
                  font-size: 14px;
                  box-sizing: border-box;
                `}
              />
              <span css={previewStyle('12px', 500, '16px')} style={{ color: '#828c94', display: 'block', marginTop: '4px' }}>
                We'll use this to send you design updates and recommendations
              </span>
            </div>

            <div>
              <label css={previewStyle('14px', 600, '20px')} style={{ display: 'block', marginBottom: '8px', color: '#2f3438' }}>
                Budget Range
              </label>
              <select
                css={css`
                  width: 100%;
                  padding: 10px 12px;
                  border: 1px solid #e6e6e6;
                  border-radius: 6px;
                  font-size: 14px;
                  box-sizing: border-box;
                `}
              >
                <option>Select your budget</option>
              </select>
              <span css={previewStyle('12px', 500, '16px')} style={{ color: '#828c94', display: 'block', marginTop: '4px' }}>
                Optional · This helps us recommend products in your price range
              </span>
            </div>
          </div>
        </ComponentPreview>

        {/* Detail 10 - Badges & Tags */}
        <ComponentPreview description="Detail10/Bold - Badges, tags, status labels">
          <div css={css`display: flex; gap: 12px; flex-wrap: wrap; padding: 16px; background-color: #f7f9fa; border-radius: 8px;`}>
            <span css={css`
              ${previewStyle('10px', 700, '14px')}
              background-color: #e6f5e6;
              color: #27ae60;
              padding: 6px 12px;
              border-radius: 20px;
            `}>
              ✓ Recommended
            </span>
            <span css={css`
              ${previewStyle('10px', 700, '14px')}
              background-color: #fff3cd;
              color: #856404;
              padding: 6px 12px;
              border-radius: 20px;
            `}>
              🔥 Popular
            </span>
            <span css={css`
              ${previewStyle('10px', 700, '14px')}
              background-color: #e0f5ff;
              color: #0aa5ff;
              padding: 6px 12px;
              border-radius: 20px;
            `}>
              ⭐ New
            </span>
            <span css={css`
              ${previewStyle('10px', 700, '14px')}
              background-color: #f0f0f0;
              color: #828c94;
              padding: 6px 12px;
              border-radius: 20px;
            `}>
              · 4.8 rating
            </span>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>Complete Screen Example</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          How all typography styles come together in a real Ohouse AI screen
        </p>

        <ComponentPreview description="Feature Card listing screen with mixed typography">
          <div css={css`padding: 24px; background-color: #f7f9fa; border-radius: 8px;`}>
            {/* Page Title */}
            <h1 css={previewStyle('24px', 700, '32px')} style={{ margin: '0 0 8px 0' }}>
              Discover Designs
            </h1>
            <p css={previewStyle('15px', 500, '24px')} style={{ color: '#828c94', margin: '0 0 32px 0' }}>
              Explore curated interior designs from our community
            </p>

            {/* Section Header */}
            <h2 css={previewStyle('20px', 600, '28px')} style={{ margin: '0 0 16px 0', paddingTop: 16, borderTop: '1px solid #e6e6e6' }}>
              Featured Designs
            </h2>

            {/* Card Grid */}
            <div css={css`display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;`}>
              {/* Card 1 */}
              <div css={css`background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 12px; overflow: hidden;`}>
                <div css={css`height: 120px; background: linear-gradient(135deg, #0aa5ff, #0088cc); display: flex; align-items: center; justify-content: center; color: #ffffff;`}>
                  Image Placeholder
                </div>
                <div css={css`padding: 16px;`}>
                  <h3 css={previewStyle('18px', 700, '24px')} style={{ margin: '0 0 8px 0' }}>
                    Modern Living
                  </h3>
                  <p css={previewStyle('14px', 500, '20px')} style={{ color: '#2f3438', margin: '0 0 12px 0' }}>
                    Minimalist furniture with warm lighting
                  </p>
                  <div css={css`display: flex; gap: 8px;`}>
                    <span css={css`
                      ${previewStyle('10px', 700, '14px')}
                      background-color: #e0f5ff;
                      color: #0aa5ff;
                      padding: 4px 8px;
                      border-radius: 4px;
                    `}>
                      Modern
                    </span>
                    <span css={css`
                      ${previewStyle('10px', 700, '14px')}
                      background-color: #f0f0f0;
                      color: #828c94;
                      padding: 4px 8px;
                      border-radius: 4px;
                    `}>
                      · 4.9★
                    </span>
                  </div>
                  <p css={previewStyle('12px', 500, '16px')} style={{ color: '#828c94', margin: '12px 0 0 0' }}>
                    By Sarah Chen · 2,340 likes
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div css={css`background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 12px; overflow: hidden;`}>
                <div css={css`height: 120px; background: linear-gradient(135deg, #f5a623, #d4822f); display: flex; align-items: center; justify-content: center; color: #ffffff;`}>
                  Image Placeholder
                </div>
                <div css={css`padding: 16px;`}>
                  <h3 css={previewStyle('18px', 700, '24px')} style={{ margin: '0 0 8px 0' }}>
                    Cozy Scandinavian
                  </h3>
                  <p css={previewStyle('14px', 500, '20px')} style={{ color: '#2f3438', margin: '0 0 12px 0' }}>
                    Natural wood and soft textiles
                  </p>
                  <div css={css`display: flex; gap: 8px;`}>
                    <span css={css`
                      ${previewStyle('10px', 700, '14px')}
                      background-color: #fff3cd;
                      color: #856404;
                      padding: 4px 8px;
                      border-radius: 4px;
                    `}>
                      Warm
                    </span>
                    <span css={css`
                      ${previewStyle('10px', 700, '14px')}
                      background-color: #f0f0f0;
                      color: #828c94;
                      padding: 4px 8px;
                      border-radius: 4px;
                    `}>
                      · 4.7★
                    </span>
                  </div>
                  <p css={previewStyle('12px', 500, '16px')} style={{ color: '#828c94', margin: '12px 0 0 0' }}>
                    By Marcus Johansson · 1,820 likes
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div css={css`background-color: #e0f5ff; border: 1px solid #0aa5ff; border-radius: 8px; padding: 16px;`}>
              <h4 css={previewStyle('15px', 600, '24px')} style={{ color: '#0aa5ff', margin: '0 0 8px 0' }}>
                ✨ Personalized Recommendations
              </h4>
              <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
                Based on your preferences and budget, we've selected these designs especially for you.
              </p>
            </div>
          </div>
        </ComponentPreview>
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
        <h2>When to Use Each Style</h2>
        <p css={css`color: #828c94; margin-bottom: 24px;`}>
          Quick decision guide for choosing the right typography style
        </p>

        <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;`}>
          <div css={css`padding: 20px; background-color: #f7f9fa; border-radius: 8px; border-left: 4px solid #0aa5ff;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Page Titles
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: '0 0 12px 0' }}>
              Use Heading24/Bold for the main title of a page or hero section
            </p>
            <code css={css`
              background-color: #ffffff;
              padding: 8px 12px;
              border-radius: 4px;
              display: block;
              font-size: 12px;
              color: #0aa5ff;
              font-family: monospace;
            `}>
              Heading24/Bold
            </code>
          </div>

          <div css={css`padding: 20px; background-color: #f7f9fa; border-radius: 8px; border-left: 4px solid #0aa5ff;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Section Headers
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: '0 0 12px 0' }}>
              Use Heading20/Semibold for major section headings with descriptions
            </p>
            <code css={css`
              background-color: #ffffff;
              padding: 8px 12px;
              border-radius: 4px;
              display: block;
              font-size: 12px;
              color: #0aa5ff;
              font-family: monospace;
            `}>
              Heading20/Semibold
            </code>
          </div>

          <div css={css`padding: 20px; background-color: #f7f9fa; border-radius: 8px; border-left: 4px solid #0aa5ff;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Card Titles
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: '0 0 12px 0' }}>
              Use Heading18/Bold for individual card or modal titles
            </p>
            <code css={css`
              background-color: #ffffff;
              padding: 8px 12px;
              border-radius: 4px;
              display: block;
              font-size: 12px;
              color: #0aa5ff;
              font-family: monospace;
            `}>
              Heading18/Bold
            </code>
          </div>

          <div css={css`padding: 20px; background-color: #e6f5e6; border-radius: 8px; border-left: 4px solid #27ae60;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Most Common Text
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: '0 0 12px 0' }}>
              Body14/Medium & Regular covers ~70% of all body text needs
            </p>
            <code css={css`
              background-color: #ffffff;
              padding: 8px 12px;
              border-radius: 4px;
              display: block;
              font-size: 12px;
              color: #0aa5ff;
              font-family: monospace;
            `}>
              Body14/Medium
            </code>
          </div>

          <div css={css`padding: 20px; background-color: #f7f9fa; border-radius: 8px; border-left: 4px solid #0aa5ff;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Helper Text
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: '0 0 12px 0' }}>
              Use Detail12/Medium for form hints and supporting text below inputs
            </p>
            <code css={css`
              background-color: #ffffff;
              padding: 8px 12px;
              border-radius: 4px;
              display: block;
              font-size: 12px;
              color: #0aa5ff;
              font-family: monospace;
            `}>
              Detail12/Medium
            </code>
          </div>

          <div css={css`padding: 20px; background-color: #f7f9fa; border-radius: 8px; border-left: 4px solid #0aa5ff;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 12px 0' }}>
              Badges & Tags
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#828c94', margin: '0 0 12px 0' }}>
              Use Detail10/Bold for status badges, tags, and micro labels
            </p>
            <code css={css`
              background-color: #ffffff;
              padding: 8px 12px;
              border-radius: 4px;
              display: block;
              font-size: 12px;
              color: #0aa5ff;
              font-family: monospace;
            `}>
              Detail10/Bold
            </code>
          </div>
        </div>
      </div>

      <div css={sectionStyle}>
        <h2>Best Practices</h2>
        <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 16px;`}>
          <div css={css`padding: 20px; background-color: #e6f5e6; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 8px 0', color: '#27ae60' }}>
              ✓ DO: Use semantic styles
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
              Always reference typography by name (Body14, Detail10) instead of pixel values
            </p>
          </div>

          <div css={css`padding: 20px; background-color: #ffe0e0; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 8px 0', color: '#c00' }}>
              ✗ DON'T: Create custom sizes
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
              Avoid defining arbitrary font sizes - stick to the design system scale
            </p>
          </div>

          <div css={css`padding: 20px; background-color: #e6f5e6; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 8px 0', color: '#27ae60' }}>
              ✓ DO: Pair with appropriate body text
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
              Follow heading styles with properly sized body text - don't mix styles randomly
            </p>
          </div>

          <div css={css`padding: 20px; background-color: #ffe0e0; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 8px 0', color: '#c00' }}>
              ✗ DON'T: Use headings for body text
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
              Never use heading styles (Heading18+) for regular content - they're too large
            </p>
          </div>

          <div css={css`padding: 20px; background-color: #e6f5e6; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 8px 0', color: '#27ae60' }}>
              ✓ DO: Check contrast ratios
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
              Ensure 4.5:1 contrast minimum between text and background colors
            </p>
          </div>

          <div css={css`padding: 20px; background-color: #ffe0e0; border-radius: 8px;`}>
            <h4 css={previewStyle('15px', 600, '24px')} style={{ margin: '0 0 8px 0', color: '#c00' }}>
              ✗ DON'T: Rely on color alone
            </h4>
            <p css={previewStyle('14px', 400, '18px')} style={{ color: '#2f3438', margin: 0 }}>
              Use weight changes, sizes, or positioning - not just color - to indicate hierarchy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
