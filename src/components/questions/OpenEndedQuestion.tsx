/**
 * OpenEndedQuestion Component
 * Renders open-ended text input questions
 * S2.D: Part of new UI components for consultation questions
 */

/** @jsxImportSource @emotion/react */
"use client";

import React from "react";
import { css } from "@emotion/react";

export interface OpenEndedQuestionProps {
  questionId: string;
  question: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
}

// ===== STYLES =====

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
`;

const questionStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: #2f3438;
`;

const inputStyle = css`
  padding: 12px 16px;
  border: 2px solid #e6e6e6;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #2f3438;
  transition: border-color 0.2s ease;
  outline: none;

  &:focus {
    border-color: #0aa5ff;
    box-shadow: 0 0 0 3px rgba(10, 165, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f5f5f5;
  }
`;

const textareaStyle = css`
  ${inputStyle}
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
`;

const charCountStyle = (isNearLimit: boolean) => css`
  font-size: 12px;
  color: ${isNearLimit ? "#e74c3c" : "#828c94"};
  text-align: right;
`;

const submitButtonStyle = css`
  padding: 10px 16px;
  background-color: #0aa5ff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0880cc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const buttonsContainerStyle = css`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

// ===== COMPONENT =====

export const OpenEndedQuestion: React.FC<
  OpenEndedQuestionProps
> = ({
  questionId,
  question,
  placeholder = "Enter your response here...",
  value = "",
  onChange,
  onSubmit,
  disabled = false,
  multiline = false,
  maxLength,
}) => {
  const isNearLimit =
    maxLength && value.length > maxLength * 0.8;

  const handleSubmit = () => {
    if (onSubmit && value.trim()) {
      onSubmit();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Allow Ctrl+Enter or Cmd+Enter to submit
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "Enter" &&
      onSubmit
    ) {
      handleSubmit();
    }
  };

  return (
    <div css={containerStyle} data-question-id={questionId}>
      <div css={questionStyle}>{question}</div>

      {multiline ? (
        <>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            onKeyDown={handleKeyDown}
            css={textareaStyle}
            aria-label={question}
          />
          {maxLength && (
            <div css={charCountStyle(isNearLimit)}>
              {value.length} / {maxLength}
            </div>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            onKeyDown={handleKeyDown}
            css={inputStyle}
            aria-label={question}
          />
          {maxLength && (
            <div css={charCountStyle(isNearLimit)}>
              {value.length} / {maxLength}
            </div>
          )}
        </>
      )}

      {onSubmit && (
        <div css={buttonsContainerStyle}>
          <button
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            css={submitButtonStyle}
            type="button"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default OpenEndedQuestion;
