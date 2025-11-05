'use client';

import Link from 'next/link';
import { css } from '@emotion/react';
import { CSSProperties } from 'react';

interface AppIconProps {
  name: string;
  icon: string; // emoji or SVG
  href: string;
  description?: string;
}

export default function AppIcon({
  name,
  icon,
  href,
  description,
}: AppIconProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    padding: '12px',
    borderRadius: '8px',
  };

  const iconStyle: CSSProperties = {
    fontSize: '64px',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
  };

  const labelStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '80px',
    wordBreak: 'break-word',
    transition: 'color 0.2s ease',
  };

  const hoverStyles = css`
    &:hover {
      transform: scale(1.1);

      div:first-child {
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      div:last-child {
        color: #ffffff;
      }
    }

    &:active {
      transform: scale(0.95);
    }
  `;

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div css={[hoverStyles]} style={containerStyle}>
        <div style={iconStyle}>{icon}</div>
        <div style={labelStyle}>{name}</div>
        {description && (
          <div
            css={css`
              font-size: 10px;
              color: rgba(255, 255, 255, 0.5);
              text-align: center;
            `}
          >
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
