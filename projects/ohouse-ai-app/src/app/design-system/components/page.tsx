'use client';

import { css } from '@emotion/react';
import Link from 'next/link';

export default function ComponentsPage() {
  const pageStyle = css`
    max-width: 1200px;
  `;

  const heroStyle = css`
    text-align: center;
    margin-bottom: 64px;
  `;

  const titleStyle = css`
    margin: 0 0 16px 0;
    font-size: 40px;
    font-weight: 700;
    color: #2f3438;
  `;

  const subtitleStyle = css`
    margin: 0 0 32px 0;
    font-size: 18px;
    color: #828c94;
    line-height: 1.6;
  `;

  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 64px;
  `;

  const componentCardStyle = css`
    padding: 32px 24px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #ffffff;
    cursor: pointer;
    transition: all 200ms ease-out;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:hover {
      border-color: #0aa5ff;
      box-shadow: 0 4px 16px rgba(10, 165, 255, 0.12);
      transform: translateY(-2px);
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2f3438;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #828c94;
      line-height: 1.5;
    }

    .status {
      margin-top: auto;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 20px;
      text-align: center;
      width: fit-content;
    }

    .status.active {
      background-color: #e6f5e6;
      color: #27ae60;
    }

    .status.coming {
      background-color: #e0f5ff;
      color: #0aa5ff;
    }
  `;

  const components = [
    {
      name: 'Button',
      description: 'Primary action component with multiple variants and states',
      href: '/design-system/components/button',
      status: 'active',
    },
    {
      name: 'Input',
      description: 'Text input component with validation and helper text',
      href: '/design-system/components/input',
      status: 'active',
    },
    {
      name: 'Card',
      description: 'Container component for grouping related content',
      href: '/design-system/components/card',
      status: 'active',
    },
    {
      name: 'Select',
      description: 'Dropdown component for selecting from a list',
      href: '/design-system/components/select',
      status: 'coming',
    },
    {
      name: 'Modal',
      description: 'Dialog component for focused interactions',
      href: '/design-system/components/modal',
      status: 'coming',
    },
    {
      name: 'Badge',
      description: 'Component for displaying labels and statuses',
      href: '/design-system/components/badge',
      status: 'coming',
    },
    {
      name: 'Tabs',
      description: 'Tabbed interface for organizing content',
      href: '/design-system/components/tabs',
      status: 'coming',
    },
    {
      name: 'Toast',
      description: 'Notification component for temporary messages',
      href: '/design-system/components/toast',
      status: 'coming',
    },
  ];

  return (
    <div css={pageStyle}>
      <div css={heroStyle}>
        <h1 css={titleStyle}>Components</h1>
        <p css={subtitleStyle}>
          Explore our library of reusable components with live previews and code examples
        </p>
      </div>

      <div css={gridStyle}>
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            css={componentCardStyle}
          >
            <h3>{component.name}</h3>
            <p>{component.description}</p>
            <div className={`status ${component.status}`}>
              {component.status === 'active' ? '✓ Available' : '🚀 Coming Soon'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
