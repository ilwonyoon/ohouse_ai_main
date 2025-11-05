'use client';

import { css } from '@emotion/react';
import AppIcon from './AppIcon';

const APPS = [
  {
    name: 'AI Consultant',
    icon: '💬',
    href: '/ai-consultant',
    description: 'Design consultation',
  },
  {
    name: 'Design System',
    icon: '🎨',
    href: '/design-system',
    description: 'UI components',
  },
  {
    name: 'Entry Revival',
    icon: '📝',
    href: '/feature_entry',
    description: 'Entry management',
  },
  {
    name: 'Onboarding',
    icon: '🎯',
    href: '/onboarding',
    description: 'User setup',
  },
  {
    name: 'Room Editor',
    icon: '🎨',
    href: '/room_editor',
    description: 'Design space',
  },
  {
    name: 'Gallery',
    icon: '🖼️',
    href: '/gallery',
    description: 'Your designs',
  },
  {
    name: 'Settings',
    icon: '⚙️',
    href: '/settings',
    description: 'Preferences',
  },
];

export default function Desktop() {
  const desktopStyles = css`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow: hidden;
    position: relative;
  `;

  const headerStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  `;

  const titleStyles = css`
    font-size: 18px;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;

    span:first-of-type {
      font-size: 24px;
    }
  `;

  const timeStyles = css`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  `;

  const appsContainerStyles = css`
    position: absolute;
    top: 70px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: calc(100% - 100px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
  `;

  const appWrapperStyles = css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateX(-4px);
    }
  `;

  const iconStyles = css`
    font-size: 32px;
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const labelStyles = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    .name {
      font-size: 12px;
      font-weight: 500;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .desc {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  const footerStyles = css`
    position: absolute;
    bottom: 12px;
    left: 20px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.3);
  `;

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div css={desktopStyles}>
      <div css={headerStyles}>
        <div css={titleStyles}>
          <span>🏠</span>
          <div>
            <div>Ohouse AI</div>
          </div>
        </div>
        <div css={timeStyles}>{getCurrentTime()}</div>
      </div>

      <div css={appsContainerStyles}>
        {APPS.map((app) => (
          <a
            key={app.href}
            href={app.href}
            css={appWrapperStyles}
            style={{ textDecoration: 'none' }}
          >
            <div css={iconStyles}>{app.icon}</div>
            <div css={labelStyles}>
              <div className="name">{app.name}</div>
              <div className="desc">{app.description}</div>
            </div>
          </a>
        ))}
      </div>

      <div css={footerStyles}>
        Ohouse AI • Interior Design Studio
      </div>
    </div>
  );
}
