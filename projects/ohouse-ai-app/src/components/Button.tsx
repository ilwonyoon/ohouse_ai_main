'use client';

import { css } from '@emotion/react';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: css`
    background-color: #0aa5ff;
    color: #ffffff;
    border: none;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }

    &:active:not(:disabled) {
      opacity: 0.7;
    }
  `,
  secondary: css`
    background-color: #ffffff;
    color: #2f3438;
    border: 1px solid #e6e6e6;

    &:hover:not(:disabled) {
      background-color: #f7f9fa;
      border-color: #dadde0;
    }

    &:active:not(:disabled) {
      background-color: #eaedef;
      border-color: #dadde0;
    }
  `,
  danger: css`
    background-color: #ff4444;
    color: #ffffff;
    border: none;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }

    &:active:not(:disabled) {
      opacity: 0.7;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: #0aa5ff;
    border: none;

    &:hover:not(:disabled) {
      background-color: rgba(10, 165, 255, 0.1);
    }

    &:active:not(:disabled) {
      background-color: rgba(10, 165, 255, 0.2);
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 6px;
    height: 32px;
  `,
  md: css`
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    height: 40px;
  `,
  lg: css`
    padding: 12px 20px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 8px;
    height: 48px;
  `,
};

const baseStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  font-family: Pretendard, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #c2c8cc;
    color: #828c94;
  }

  &:focus-visible {
    outline: 2px solid #0aa5ff;
    outline-offset: 2px;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isFullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        css={css`
          ${baseStyle}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          width: ${isFullWidth ? '100%' : 'auto'};
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span
            css={css`
              display: inline-block;
              width: 1em;
              height: 1em;
              border: 2px solid currentColor;
              border-right-color: transparent;
              border-radius: 50%;
              animation: spin 0.6s linear infinite;

              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
