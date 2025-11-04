'use client';

import { css } from '@emotion/react';
import React from 'react';

export interface BottomNavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BottomNavigationProps {
  items: BottomNavItem[];
  activeId?: string;
  onNavClick?: (id: string) => void;
}

const containerStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88.5px;
  background-color: #ffffff;
  border-top: 1px solid #e6e6e6;
  display: flex;
  align-items: flex-end;
  z-index: 300;
`;

const navItemsStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
`;

const itemStyle = (isActive: boolean) => css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 8px;
  padding-top: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: Pretendard, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  color: ${isActive ? '#0aa5ff' : '#2f3438'};
  transition: color 200ms ease;
  position: relative;
  gap: 4px;

  &:hover {
    opacity: 0.8;
  }

  ${isActive &&
  css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: #0aa5ff;
    }
  `}
`;

const iconStyle = css`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const labelStyle = css`
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeId,
  onNavClick,
}) => {
  const handleClick = (item: BottomNavItem) => {
    onNavClick?.(item.id);
    item.onClick?.();
  };

  return (
    <nav css={containerStyle} role="navigation">
      <div css={navItemsStyle}>
        {items.map((item) => (
          <button
            key={item.id}
            css={itemStyle(activeId === item.id)}
            onClick={() => handleClick(item)}
            aria-label={item.label}
            aria-current={activeId === item.id ? 'page' : undefined}
          >
            <div css={iconStyle}>{item.icon}</div>
            <span css={labelStyle}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

BottomNavigation.displayName = 'BottomNavigation';
