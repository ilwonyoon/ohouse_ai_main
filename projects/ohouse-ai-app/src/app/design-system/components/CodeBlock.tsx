'use client';

import { css } from '@emotion/react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerStyle = css`
    position: relative;
    background-color: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    margin: 16px 0;
    border: 1px solid #2d2d2d;
  `;

  const headerStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: #2d2d2d;
    border-bottom: 1px solid #3d3d3d;
    font-size: 12px;
    color: #828c94;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  `;

  const codeStyle = css`
    padding: 16px;
    overflow-x: auto;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #d4d4d4;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #3d3d3d;
      border-radius: 3px;

      &:hover {
        background: #4d4d4d;
      }
    }
  `;

  const copyButtonStyle = css`
    padding: 6px 12px;
    background-color: #0aa5ff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: #0087cc;
    }

    &:active {
      transform: scale(0.96);
    }
  `;

  const copiedStyle = css`
    padding: 6px 12px;
    background-color: #27ae60;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: default;
  `;

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <span>{language}</span>
        <button
          onClick={handleCopy}
          css={copied ? copiedStyle : copyButtonStyle}
          type="button"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre css={codeStyle}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
