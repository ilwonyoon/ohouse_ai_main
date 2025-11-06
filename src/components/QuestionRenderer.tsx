/**
 * QuestionRenderer Component
 * Detects question type from API response and renders appropriate component
 * Task 2.B.1: Render different question types
 */

"use client";

import React, { useState } from "react";
import { MultipleChoiceQuestion, MultipleChoiceOption } from "./questions/MultipleChoiceQuestion";
import { OpenEndedQuestion } from "./questions/OpenEndedQuestion";
import { RangeSelector } from "./questions/RangeSelector";

export interface QuestionType {
  type: "multiple_choice" | "open_ended" | "range";
  question: string;
  questionId: string;
  options?: MultipleChoiceOption[]; // For multiple choice
  minValue?: number; // For range
  maxValue?: number; // For range
  minLabel?: string; // For range
  maxLabel?: string; // For range
  placeholder?: string; // For open-ended
  multiline?: boolean; // For open-ended
  maxLength?: number; // For open-ended
}

export interface QuestionRendererProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

const questionContainerStyle: React.CSSProperties = {
  marginBottom: "16px",
  animation: "slideIn 0.3s ease-in-out",
};

export function QuestionRenderer({
  question,
  onAnswer,
  disabled = false,
}: QuestionRendererProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleMultipleChoice = (optionId: string) => {
    setSelectedValue(optionId);
    onAnswer(optionId);
  };

  const handleOpenEnded = (value: string) => {
    setSelectedValue(value);
  };

  const handleOpenEndedSubmit = () => {
    if (selectedValue.trim()) {
      onAnswer(selectedValue);
      setSelectedValue("");
    }
  };

  const handleRange = (value: number) => {
    setSelectedValue(String(value));
    onAnswer(String(value));
  };

  return (
    <div style={questionContainerStyle}>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {question.type === "multiple_choice" && (
        <MultipleChoiceQuestion
          questionId={question.questionId}
          question={question.question}
          options={question.options || []}
          selectedOptionId={selectedValue}
          onSelect={handleMultipleChoice}
          disabled={disabled}
        />
      )}

      {question.type === "open_ended" && (
        <OpenEndedQuestion
          questionId={question.questionId}
          question={question.question}
          value={selectedValue}
          onChange={handleOpenEnded}
          onSubmit={handleOpenEndedSubmit}
          placeholder={question.placeholder}
          multiline={question.multiline}
          maxLength={question.maxLength}
          disabled={disabled}
        />
      )}

      {question.type === "range" && (
        <RangeSelector
          questionId={question.questionId}
          question={question.question}
          minValue={question.minValue || 0}
          maxValue={question.maxValue || 100}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
          value={selectedValue ? parseInt(selectedValue) : undefined}
          onChange={handleRange}
          disabled={disabled}
        />
      )}
    </div>
  );
}
