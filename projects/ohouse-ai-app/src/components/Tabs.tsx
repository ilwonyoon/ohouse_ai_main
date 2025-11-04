'use client';

import { css } from '@emotion/react';
import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  variant?: 'default' | 'card';
}

const containerStyle = css`
  width: 100%;
`;

const tabsHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 0;
  border-bottom: 1px solid #e6e6e6;
  background-color: #ffffff;
  height: 44px;
`;

const tabStyle = (isActive: boolean) => css`
  flex: 1;
  padding: 0 16px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: Pretendard, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  color: ${isActive ? '#0aa5ff' : '#828c94'};
  position: relative;
  transition: color 200ms ease;

  &:hover {
    color: ${isActive ? '#0aa5ff' : '#2f3438'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #0aa5ff;
    opacity: ${isActive ? 1 : 0};
    transition: opacity 200ms ease;
  }
`;

const contentStyle = css`
  padding: 24px;
  animation: fadeIn 200ms ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  onChange,
  variant = 'default',
}) => {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id || '');

  const handleTabClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  const activeTab = items.find((item) => item.id === activeId);

  return (
    <div css={containerStyle}>
      <div css={tabsHeaderStyle}>
        {items.map((item) => (
          <button
            key={item.id}
            css={tabStyle(activeId === item.id)}
            onClick={() => handleTabClick(item.id)}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`tabpanel-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeTab && (
        <div
          id={`tabpanel-${activeTab.id}`}
          css={contentStyle}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';
