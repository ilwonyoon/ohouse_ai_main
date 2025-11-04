'use client';

import { css } from '@emotion/react';
import { SemanticTokens } from '@/docs/tokens';

export default function TypographyShowcase() {
  const typographyStyles = [
    { name: 'Heading 24 / Bold', ...SemanticTokens.Typography.Heading.H1, usage: 'Main page titles' },
    { name: 'Body 16 / Bold', ...SemanticTokens.Typography.Body.LARGE, usage: 'Large primary text' },
    { name: 'Body 15 / Semibold', ...SemanticTokens.Typography.Body.DEFAULT, usage: 'Card titles, emphasis' },
    { name: 'Body 14 / Medium', ...SemanticTokens.Typography.Body.MEDIUM, usage: 'Button text, labels' },
    { name: 'Body 14 / Regular', ...SemanticTokens.Typography.Body.REGULAR, usage: 'Body text, descriptions' },
    { name: 'Detail 13 / Medium', ...SemanticTokens.Typography.Detail.MEDIUM, usage: 'Supplementary text' },
    { name: 'Detail 10 / Small', ...SemanticTokens.Typography.Detail.SMALL, usage: 'Small labels' },
  ];

  const sampleStyle = css`
    display: grid;
    gap: 32px;
  `;

  const sampleItemStyle = css`
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 24px;
  `;

  const sampleTextStyle = (style: any) => css`
    font-size: ${style.fontSize};
    font-weight: ${style.fontWeight};
    line-height: ${style.lineHeight};
    letter-spacing: ${style.letterSpacing};
    font-family: ${style.fontFamily};
    color: #2f3438;
    margin-bottom: 12px;
  `;

  const labelStyle = css`
    font-size: 12px;
    font-weight: 600;
    color: #828c94;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  `;

  const specStyle = css`
    font-size: 13px;
    color: #828c94;
    font-family: 'Monaco', monospace;
    background-color: #f7f9fa;
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 8px;
    word-break: break-all;
  `;

  const copyButtonStyle = css`
    padding: 6px 12px;
    background-color: #0aa5ff;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: #0087cc;
      transform: translateY(-1px);
    }
  `;

  return (
    <div>
      <h2 css={css`font-size: 28px; font-weight: 700; color: #2f3438; margin-bottom: 8px;`}>
        🔤 Typography System
      </h2>
      <p css={css`font-size: 16px; color: #828c94; margin-bottom: 40px; line-height: 1.5;`}>
        All typography styles following the Pretendard font family with precise sizing, weight, and line-height ratios.
      </p>

      <div css={sampleStyle}>
        {typographyStyles.map((style) => (
          <div key={style.name} css={sampleItemStyle}>
            <div css={labelStyle}>{style.name}</div>
            <div css={sampleTextStyle(style)}>The quick brown fox jumps over the lazy dog</div>
            <div css={specStyle}>
              Size: {style.fontSize} | Weight: {style.fontWeight} | Height: {style.lineHeight}
            </div>
            <p css={css`font-size: 13px; color: #828c94; margin: 8px 0 0 0;`}>
              Usage: {style.usage}
            </p>
          </div>
        ))}
      </div>

      {/* Typography Pairing Examples */}
      <div css={css`margin-top: 50px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 24px;`}>
          Typical Pairings
        </h3>

        <div css={css`
          background: #f7f9fa;
          border-radius: 12px;
          padding: 40px;
          margin-bottom: 24px;
        `}>
          <h4 css={sampleTextStyle(SemanticTokens.Typography.Body.DEFAULT)}>
            Feature Card Title
          </h4>
          <p css={sampleTextStyle(SemanticTokens.Typography.Body.REGULAR)}>
            This is the description text that provides context about the feature card above.
          </p>
          <button css={copyButtonStyle}>Try It</button>
        </div>

        <div css={css`
          background: #f7f9fa;
          border-radius: 12px;
          padding: 40px;
        `}>
          <h2 css={sampleTextStyle(SemanticTokens.Typography.Heading.H1)}>
            Page Heading
          </h2>
          <p css={sampleTextStyle(SemanticTokens.Typography.Body.REGULAR)}>
            This is supporting body text that explains the page heading in more detail with multiple lines.
          </p>
        </div>
      </div>
    </div>
  );
}
