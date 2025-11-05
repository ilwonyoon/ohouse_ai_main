'use client';

import { css } from '@emotion/react';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  state?: 'default' | 'error' | 'success' | 'disabled';
}

const baseInputStyle = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  font-family: Pretendard, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  border-radius: 6px;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  &::placeholder {
    color: #c2c8cc;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #c2c8cc;
    cursor: not-allowed;
  }
`;

const stateStyles = {
  default: css`
    border: 1px solid #e6e6e6;
    color: #2f3438;
    background-color: #ffffff;

    &:hover:not(:disabled) {
      border-color: #dadde0;
    }

    &:focus:not(:disabled) {
      border-color: #0aa5ff;
      box-shadow: 0 0 0 3px rgba(10, 165, 255, 0.1);
    }
  `,
  error: css`
    border: 2px solid #ff4444;
    color: #2f3438;
    background-color: #ffffff;

    &:focus:not(:disabled) {
      border-color: #ff4444;
      box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    }
  `,
  success: css`
    border: 2px solid #27ae60;
    color: #2f3438;
    background-color: #ffffff;

    &:focus:not(:disabled) {
      border-color: #27ae60;
      box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    }
  `,
  disabled: css`
    border: 1px solid #e6e6e6;
    background-color: #f5f5f5;
    color: #c2c8cc;
  `,
};

const labelStyle = css`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #2f3438;
`;

const helperTextStyle = css`
  margin-top: 4px;
  font-size: 12px;
  color: #828c94;
`;

const errorTextStyle = css`
  margin-top: 4px;
  font-size: 12px;
  color: #ff4444;
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      state = 'default',
      disabled,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const finalState = disabled ? 'disabled' : error ? 'error' : state;

    return (
      <div css={wrapperStyle}>
        {label && (
          <label htmlFor={inputId} css={labelStyle}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          css={css`
            ${baseInputStyle}
            ${stateStyles[finalState]}
          `}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} css={errorTextStyle}>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} css={helperTextStyle}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
