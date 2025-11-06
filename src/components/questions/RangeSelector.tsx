/**
 * RangeSelector Component
 * Renders range/slider input for numerical questions
 * S2.D: Part of new UI components for consultation questions
 */

/** @jsxImportSource @emotion/react */
"use client";

import React from "react";
import { css } from "@emotion/react";

export interface RangeSelectorProps {
  questionId: string;
  question: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  labels?: {
    min: string;
    max: string;
  };
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

const sliderContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const sliderStyle = css`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e6e6e6;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0aa5ff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0aa5ff;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const labelsContainerStyle = css`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #828c94;
`;

const valueDisplayStyle = css`
  font-size: 14px;
  font-weight: 600;
  color: #0aa5ff;
  text-align: center;
`;

// ===== COMPONENT =====

export const RangeSelector: React.FC<RangeSelectorProps> = ({
  questionId,
  question,
  min,
  max,
  step = 1,
  unit = "",
  value,
  onChange,
  disabled = false,
  labels,
}) => {
  const displayValue =
    value !== undefined
      ? `${value}${unit ? " " + unit : ""}`
      : `${min}${unit ? " " + unit : ""}`;

  return (
    <div css={containerStyle} data-question-id={questionId}>
      <div css={questionStyle}>{question}</div>

      <div css={sliderContainerStyle}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value ?? min}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          css={sliderStyle}
          aria-label={question}
        />

        {labels && (
          <div css={labelsContainerStyle}>
            <span>{labels.min}</span>
            <span>{labels.max}</span>
          </div>
        )}

        <div css={valueDisplayStyle}>{displayValue}</div>
      </div>
    </div>
  );
};

export default RangeSelector;
