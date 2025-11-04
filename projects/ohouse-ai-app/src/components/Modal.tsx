'use client';

import { css } from '@emotion/react';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: css`
    max-width: 300px;
  `,
  md: css`
    max-width: 500px;
  `,
  lg: css`
    max-width: 700px;
  `,
};

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(33, 38, 41, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
  opacity: 0;
  visibility: hidden;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

const modalStyle = css`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.95);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;

  .open & {
    transform: scale(1);
  }
`;

const headerStyle = css`
  padding: 20px 24px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #2f3438;
    font-family: Pretendard, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
  }
`;

const closeButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: #828c94;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  transition: color 200ms ease;

  &:hover {
    color: #2f3438;
  }
`;

const bodyStyle = css`
  flex: 1;
  padding: 24px;
`;

const footerStyle = css`
  padding: 16px 24px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export interface ModalFooterProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  return (
    <div css={overlayStyle} className={isOpen ? 'open' : ''} onClick={onClose} role="presentation">
      <div
        css={css`
          ${modalStyle}
          ${sizeStyles[size]}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div css={headerStyle}>
            <h2>{title}</h2>
            {showCloseButton && (
              <button css={closeButtonStyle} onClick={onClose} aria-label="Close modal">
                ✕
              </button>
            )}
          </div>
        )}
        <div css={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <div css={footerStyle}>{children}</div>;
};

ModalFooter.displayName = 'ModalFooter';
