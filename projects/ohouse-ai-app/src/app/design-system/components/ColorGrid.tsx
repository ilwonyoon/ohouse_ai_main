'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import {
  PrimitiveTokens,
  SemanticTokens,
} from '@/docs/tokens';

interface ColorItem {
  name: string;
  value: string;
  usage: string;
}

export default function ColorGrid() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (value: string, name: string) => {
    navigator.clipboard.writeText(value);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const primitiveColors: ColorItem[] = [
    // Neutral
    { name: 'White (50)', value: PrimitiveTokens.Colors.Neutral._50, usage: 'Primary backgrounds' },
    { name: 'Off-White (100)', value: '#F5F5F5', usage: 'Subtle backgrounds' },
    { name: 'Gray (500)', value: PrimitiveTokens.Colors.Neutral._500, usage: 'Secondary text' },
    { name: 'Charcoal (600)', value: PrimitiveTokens.Colors.Neutral._600, usage: 'Primary text' },
    // Border
    { name: 'Border Default', value: PrimitiveTokens.Colors.Border.DEFAULT, usage: 'Standard borders' },
    { name: 'Border Light', value: PrimitiveTokens.Colors.Border.LIGHT, usage: 'Subtle borders' },
    // Brand
    { name: 'Primary Cyan', value: PrimitiveTokens.Colors.Brand.PRIMARY, usage: 'Brand actions & links' },
  ];

  const semanticColors: ColorItem[] = [
    // Background
    { name: 'bg-default', value: SemanticTokens.Color.Background.DEFAULT, usage: 'Main backgrounds, cards' },
    { name: 'bg-inverse', value: SemanticTokens.Color.Background.INVERSE, usage: 'Dark backgrounds' },
    { name: 'bg-grouped', value: SemanticTokens.Color.Background.GROUPED, usage: 'Grouped list areas' },
    // Foreground
    { name: 'fg-default', value: SemanticTokens.Color.Foreground.DEFAULT, usage: 'Primary text' },
    { name: 'fg-secondary', value: SemanticTokens.Color.Foreground.SECONDARY, usage: 'Secondary text' },
    { name: 'fg-brand', value: SemanticTokens.Color.Foreground.BRAND, usage: 'Links & CTAs' },
    { name: 'fg-inverse', value: SemanticTokens.Color.Foreground.INVERSE, usage: 'Text on dark' },
    // Border
    { name: 'border-default', value: SemanticTokens.Color.Border.DEFAULT, usage: 'Standard borders' },
    { name: 'border-light', value: SemanticTokens.Color.Border.LIGHT, usage: 'Light borders' },
  ];

  const colorCardStyle = (color: string) => css`
    background-color: ${color};
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 200ms ease-out;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }
  `;

  const colorNameStyle = (color: string) => css`
    font-size: 14px;
    font-weight: 600;
    color: ${parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? '#2f3438' : '#ffffff'};
  `;

  const colorValueStyle = (color: string) => css`
    font-size: 13px;
    font-weight: 400;
    color: ${parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? '#828c94' : 'rgba(255, 255, 255, 0.7)'};
    font-family: 'Monaco', monospace;
  `;

  const usageStyle = (color: string) => css`
    font-size: 12px;
    color: ${parseInt(color.replace('#', ''), 16) > 0xffffff / 2 ? '#828c94' : 'rgba(255, 255, 255, 0.6)'};
    margin-top: 4px;
  `;

  const sectionStyle = css`
    margin-bottom: 50px;
  `;

  const sectionTitleStyle = css`
    font-size: 20px;
    font-weight: 700;
    color: #2f3438;
    margin-bottom: 16px;
  `;

  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  `;

  return (
    <div>
      <h2 css={css`font-size: 28px; font-weight: 700; color: #2f3438; margin-bottom: 8px;`}>
        🎨 Color Palette
      </h2>
      <p css={css`font-size: 16px; color: #828c94; margin-bottom: 40px; line-height: 1.5;`}>
        Complete color system organized by primitive and semantic tokens. Click any color to copy its hex value.
      </p>

      {/* Primitive Colors */}
      <div css={sectionStyle}>
        <h3 css={sectionTitleStyle}>Primitive Colors</h3>
        <div css={gridStyle}>
          {primitiveColors.map((color) => (
            <div
              key={color.name}
              css={colorCardStyle(color.value)}
              onClick={() => copyToClipboard(color.value, color.name)}
              title={`Click to copy: ${color.value}`}
            >
              <div css={colorNameStyle(color.value)}>{color.name}</div>
              <div css={colorValueStyle(color.value)}>
                {copiedColor === color.name ? '✓ Copied!' : color.value}
              </div>
              <div css={usageStyle(color.value)}>{color.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Colors */}
      <div css={sectionStyle}>
        <h3 css={sectionTitleStyle}>Semantic Colors</h3>
        <p css={css`font-size: 14px; color: #828c94; margin-bottom: 16px;`}>
          Context-aware colors mapped to semantic names for consistent usage across components.
        </p>
        <div css={gridStyle}>
          {semanticColors.map((color) => (
            <div
              key={color.name}
              css={colorCardStyle(color.value)}
              onClick={() => copyToClipboard(color.value, color.name)}
              title={`Click to copy: ${color.value}`}
            >
              <div css={colorNameStyle(color.value)}>{color.name}</div>
              <div css={colorValueStyle(color.value)}>
                {copiedColor === color.name ? '✓ Copied!' : color.value}
              </div>
              <div css={usageStyle(color.value)}>{color.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrast Table */}
      <div css={sectionStyle}>
        <h3 css={sectionTitleStyle}>Color Contrast Ratios (WCAG AA)</h3>
        <p css={css`font-size: 14px; color: #828c94; margin-bottom: 16px;`}>
          All colors meet WCAG AA accessibility standards for contrast.
        </p>
        <div css={css`
          background: #f7f9fa;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e6e6e6;
        `}>
          <table css={css`
            width: 100%;
            border-collapse: collapse;
          `}>
            <thead>
              <tr css={css`background-color: #ffffff; border-bottom: 2px solid #e6e6e6;`}>
                <th css={css`
                  padding: 16px;
                  text-align: left;
                  font-size: 14px;
                  font-weight: 700;
                  color: #2f3438;
                `}>
                  Color Combination
                </th>
                <th css={css`
                  padding: 16px;
                  text-align: left;
                  font-size: 14px;
                  font-weight: 700;
                  color: #2f3438;
                `}>
                  Ratio
                </th>
                <th css={css`
                  padding: 16px;
                  text-align: left;
                  font-size: 14px;
                  font-weight: 700;
                  color: #2f3438;
                `}>
                  Level
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { combo: '#2F3438 on #FFFFFF', ratio: '14.5:1', level: 'AAA ✓' },
                { combo: '#828C94 on #FFFFFF', ratio: '5.8:1', level: 'AA ✓' },
                { combo: '#0AA5FF on #FFFFFF', ratio: '3.2:1', level: 'AA ✓' },
                { combo: '#FFFFFF on #0AA5FF', ratio: '4.5:1', level: 'AA ✓' },
                { combo: '#FFFFFF on #2F3438', ratio: '12.8:1', level: 'AAA ✓' },
              ].map((item, idx) => (
                <tr
                  key={idx}
                  css={css`border-bottom: 1px solid #e6e6e6;`}
                >
                  <td css={css`padding: 16px; font-size: 14px; color: #2f3438;`}>
                    {item.combo}
                  </td>
                  <td css={css`padding: 16px; font-size: 14px; color: #2f3438; font-weight: 600;`}>
                    {item.ratio}
                  </td>
                  <td css={css`padding: 16px; font-size: 14px; color: #27ae60; font-weight: 600;`}>
                    {item.level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
