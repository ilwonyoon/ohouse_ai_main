/**
 * MultipleChoiceQuestion Component
 * Renders multiple choice questions with selectable options
 * S2.D: Part of new UI components for consultation questions
 */

/** @jsxImportSource @emotion/react */
"use client";

import React from "react";
import { css } from "@emotion/react";

export interface MultipleChoiceOption {
  id: string;
  label: string;
  description?: string;
}

export interface MultipleChoiceQuestionProps {
  questionId: string;
  question: string;
  options: MultipleChoiceOption[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
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
  margin-bottom: 8px;
`;

const optionsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const optionButtonStyle = (selected: boolean) => css`
  padding: 12px 16px;
  border: 2px solid ${selected ? "#0aa5ff" : "#e6e6e6"};
  border-radius: 8px;
  background-color: ${selected ? "#f0f8ff" : "#ffffff"};
  color: ${selected ? "#0aa5ff" : "#2f3438"};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: #0aa5ff;
    background-color: #f0f8ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  font-size: 14px;
  font-weight: 500;
`;

const optionDescriptionStyle = css`
  font-size: 12px;
  color: #828c94;
  margin-top: 4px;
`;

// ===== COMPONENT =====

export const MultipleChoiceQuestion: React.FC<
  MultipleChoiceQuestionProps
> = ({
  questionId,
  question,
  options,
  selectedOptionId,
  onSelect,
  disabled = false,
}) => {
  return (
    <div css={containerStyle} data-question-id={questionId}>
      <div css={questionStyle}>{question}</div>

      <div css={optionsContainerStyle}>
        {options.map((option) => (
          <button
            key={option.id}
            css={optionButtonStyle(selectedOptionId === option.id)}
            onClick={() => onSelect(option.id)}
            disabled={disabled}
            type="button"
            aria-selected={selectedOptionId === option.id}
            role="option"
          >
            <div>{option.label}</div>
            {option.description && (
              <div css={optionDescriptionStyle}>
                {option.description}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
