'use client';

import { css } from '@emotion/react';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'bordered';
  children: React.ReactNode;
  hoverable?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const variantStyles = {
  default: css`
    background-color: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  `,
  subtle: css`
    background-color: #f7f9fa;
    border: 1px solid #e6e6e6;
    box-shadow: none;
  `,
  bordered: css`
    background-color: #ffffff;
    border: 2px solid #e6e6e6;
    box-shadow: none;
  `,
};

const baseCardStyle = css`
  border-radius: 12px;
  overflow: hidden;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const cardHeaderStyle = css`
  padding: 16px;
  border-bottom: 1px solid #e6e6e6;

  h2,
  h3,
  h4 {
    margin: 0;
    font-family: Pretendard, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    color: #2f3438;
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
  }

  h4 {
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #828c94;
    font-size: 14px;
  }
`;

const cardBodyStyle = css`
  padding: 16px;

  p {
    margin: 0;
    color: #2f3438;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const cardFooterStyle = css`
  padding: 16px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        css={css`
          ${baseCardStyle}
          ${variantStyles[variant]}
          ${hoverable &&
          css`
            &:hover {
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
              transform: translateY(-2px);
            }
          `}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} css={cardHeaderStyle} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} css={cardBodyStyle} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} css={cardFooterStyle} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
