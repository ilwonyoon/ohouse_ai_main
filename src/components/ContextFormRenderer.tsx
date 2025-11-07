/**
 * Context Form Renderer (Agent 1.2 - Task 1.2.2)
 * Renders form-based context collection sections
 *
 * Features:
 * - Section-based navigation
 * - Field validation
 * - Progress tracking
 * - Adaptive section showing
 */

"use client";

import React, { useState, useCallback } from "react";
import {
  ContextFormSchema,
  ContextFormField,
  ContextFormResponse,
} from "@/types/consultation";
import { extractMetadataFromForm, validateFormResponse } from "@/api/contextFormBuilder";

// ===== TYPES =====

interface FormState {
  currentSectionIndex: number;
  fieldValues: Record<string, any>;
  completedSections: Set<string>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

interface ContextFormRendererProps {
  schema: ContextFormSchema;
  onSubmit: (response: ContextFormResponse) => void;
  onCancel?: () => void;
  userId: string;
}

// ===== STYLES =====

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const progressBarStyle: React.CSSProperties = {
  width: "100%",
  height: "6px",
  backgroundColor: "#E6E6E6",
  borderRadius: "3px",
  overflow: "hidden",
  marginBottom: "16px",
};

const progressFillStyle = (percent: number): React.CSSProperties => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#0AA5FF",
  transition: "width 0.3s ease",
});

const sectionContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2F3438",
  marginBottom: "4px",
};

const sectionDescriptionStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#828C94",
  marginBottom: "16px",
};

const fieldContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#2F3438",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  border: "1px solid #E6E6E6",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const helpTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#828C94",
  marginTop: "4px",
};

const checkboxGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const checkboxItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const radioGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const radioItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "12px",
  border: "1px solid #E6E6E6",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
};

const buttonStyle = (variant: "primary" | "secondary" = "primary"): React.CSSProperties => ({
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s",
  ...(variant === "primary" && {
    backgroundColor: "#0AA5FF",
    color: "white",
  }),
  ...(variant === "secondary" && {
    backgroundColor: "#F0F0F0",
    color: "#2F3438",
    border: "1px solid #E6E6E6",
  }),
});

// ===== COMPONENT =====

export function ContextFormRenderer({
  schema,
  onSubmit,
  onCancel,
  userId,
}: ContextFormRendererProps) {
  const [formState, setFormState] = useState<FormState>({
    currentSectionIndex: 0,
    fieldValues: {},
    completedSections: new Set(),
    isSubmitting: false,
    errors: {},
  });

  const currentSection = schema.sections[formState.currentSectionIndex];
  const completionPercent = (formState.completedSections.size / schema.sections.length) * 100;

  // Handle field value change
  const handleFieldChange = useCallback(
    (fieldId: string, value: any) => {
      setFormState((prev) => ({
        ...prev,
        fieldValues: {
          ...prev.fieldValues,
          [fieldId]: value,
        },
        errors: {
          ...prev.errors,
          [fieldId]: "", // Clear error when user starts typing
        },
      }));
    },
    []
  );

  // Validate field
  const validateField = (field: ContextFormField, value: any): string => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    if (field.validation?.minLength && typeof value === "string" && value.length < field.validation.minLength) {
      return `Minimum ${field.validation.minLength} characters`;
    }
    if (field.validation?.maxLength && typeof value === "string" && value.length > field.validation.maxLength) {
      return `Maximum ${field.validation.maxLength} characters`;
    }
    return "";
  };

  // Handle section completion
  const handleNextSection = useCallback(() => {
    // Validate current section's required fields
    const sectionErrors: Record<string, string> = {};
    for (const field of currentSection.fields) {
      if (field.required) {
        const error = validateField(field, formState.fieldValues[field.id]);
        if (error) {
          sectionErrors[field.id] = error;
        }
      }
    }

    if (Object.keys(sectionErrors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        errors: sectionErrors,
      }));
      return;
    }

    // Mark section as completed
    setFormState((prev) => {
      const updatedCompleted = new Set(prev.completedSections);
      updatedCompleted.add(currentSection.id);

      const nextIndex = prev.currentSectionIndex + 1;
      return {
        ...prev,
        completedSections: updatedCompleted,
        currentSectionIndex: Math.min(nextIndex, schema.sections.length - 1),
      };
    });
  }, [currentSection, formState.fieldValues]);

  // Handle previous section
  const handlePreviousSection = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      currentSectionIndex: Math.max(prev.currentSectionIndex - 1, 0),
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    // Validate entire form
    const response: ContextFormResponse = {
      formId: schema.id,
      userId,
      submittedAt: new Date(),
      values: formState.fieldValues,
      completedSections: Array.from(formState.completedSections),
      extractedMetadata: {},
    };

    const validation = validateFormResponse(response);
    if (!validation.isValid) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          form: validation.errors.join("; "),
        },
      }));
      return;
    }

    // Extract metadata
    response.extractedMetadata = extractMetadataFromForm(response);

    // Submit
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    onSubmit(response);
  }, [schema, userId, formState, onSubmit]);

  // Check if last section
  const isLastSection = formState.currentSectionIndex === schema.sections.length - 1;

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: "600", color: "#2F3438" }}>
          {schema.title}
        </h2>
        <p style={{ margin: "0", fontSize: "14px", color: "#828C94" }}>{schema.description}</p>
      </div>

      {/* Progress Bar */}
      <div style={progressBarStyle}>
        <div style={progressFillStyle(completionPercent)} />
      </div>

      <p style={{ margin: "0", fontSize: "12px", color: "#828C94" }}>
        Section {formState.currentSectionIndex + 1} of {schema.sections.length}
      </p>

      {/* Current Section */}
      <div style={sectionContainerStyle}>
        <div>
          <h3 style={sectionTitleStyle}>{currentSection.title}</h3>
          <p style={sectionDescriptionStyle}>{currentSection.description}</p>
          {currentSection.estimatedTime && (
            <p style={{ ...sectionDescriptionStyle, marginBottom: "0" }}>⏱️ {currentSection.estimatedTime}</p>
          )}
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {currentSection.fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={formState.fieldValues[field.id] || ""}
              onChange={(value) => handleFieldChange(field.id, value)}
              error={formState.errors[field.id]}
              isRequired={field.required}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={buttonGroupStyle}>
        {formState.currentSectionIndex > 0 && (
          <button style={buttonStyle("secondary")} onClick={handlePreviousSection}>
            ← Back
          </button>
        )}

        {!isLastSection ? (
          <button style={{ ...buttonStyle("primary"), flex: 1 }} onClick={handleNextSection}>
            Next Section →
          </button>
        ) : (
          <button
            style={{ ...buttonStyle("primary"), flex: 1 }}
            onClick={handleSubmit}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Submitting..." : "Complete Form"}
          </button>
        )}

        {onCancel && (
          <button style={buttonStyle("secondary")} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {/* Form-level errors */}
      {formState.errors.form && (
        <div style={{ padding: "12px", backgroundColor: "#FFE6E6", borderRadius: "8px", color: "#D9534F" }}>
          {formState.errors.form}
        </div>
      )}
    </div>
  );
}

// ===== FIELD RENDERER =====

interface FieldRendererProps {
  field: ContextFormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  isRequired?: boolean;
}

function FieldRenderer({ field, value, onChange, error, isRequired }: FieldRendererProps) {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>
            {field.label} {isRequired && <span style={{ color: "#D9534F" }}>*</span>}
          </label>
          <input
            type={field.type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            style={{
              ...inputStyle,
              borderColor: error ? "#D9534F" : "#E6E6E6",
            }}
          />
          {field.helpText && <div style={helpTextStyle}>{field.helpText}</div>}
          {error && <div style={{ ...helpTextStyle, color: "#D9534F" }}>{error}</div>}
        </div>
      );

    case "textarea":
      return (
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>
            {field.label} {isRequired && <span style={{ color: "#D9534F" }}>*</span>}
          </label>
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            style={{
              ...inputStyle,
              borderColor: error ? "#D9534F" : "#E6E6E6",
              minHeight: "100px",
              resize: "vertical",
            }}
          />
          {field.helpText && <div style={helpTextStyle}>{field.helpText}</div>}
          {error && <div style={{ ...helpTextStyle, color: "#D9534F" }}>{error}</div>}
        </div>
      );

    case "select":
      return (
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>
            {field.label} {isRequired && <span style={{ color: "#D9534F" }}>*</span>}
          </label>
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{
              ...inputStyle,
              borderColor: error ? "#D9534F" : "#E6E6E6",
              cursor: "pointer",
            }}
          >
            <option value="">Select an option...</option>
            {field.options?.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {field.helpText && <div style={helpTextStyle}>{field.helpText}</div>}
          {error && <div style={{ ...helpTextStyle, color: "#D9534F" }}>{error}</div>}
        </div>
      );

    case "checkbox":
      return (
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>
            {field.label} {isRequired && <span style={{ color: "#D9534F" }}>*</span>}
          </label>
          <div style={checkboxGroupStyle}>
            {field.options?.map((opt) => (
              <div key={opt.id} style={checkboxItemStyle}>
                <input
                  type="checkbox"
                  id={opt.id}
                  checked={Array.isArray(value) && value.includes(opt.id)}
                  onChange={(e) => {
                    const currentValue = Array.isArray(value) ? value : [];
                    onChange(
                      e.target.checked
                        ? [...currentValue, opt.id]
                        : currentValue.filter((id: string) => id !== opt.id)
                    );
                  }}
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor={opt.id} style={{ cursor: "pointer", fontSize: "14px" }}>
                  {opt.label}
                  {opt.description && <div style={{ fontSize: "12px", color: "#828C94" }}>{opt.description}</div>}
                </label>
              </div>
            ))}
          </div>
          {field.helpText && <div style={helpTextStyle}>{field.helpText}</div>}
          {error && <div style={{ ...helpTextStyle, color: "#D9534F" }}>{error}</div>}
        </div>
      );

    case "radio":
      return (
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>
            {field.label} {isRequired && <span style={{ color: "#D9534F" }}>*</span>}
          </label>
          <div style={radioGroupStyle}>
            {field.options?.map((opt) => (
              <div
                key={opt.id}
                style={{
                  ...radioItemStyle,
                  backgroundColor: value === opt.id ? "#E6F3FF" : "transparent",
                  borderColor: value === opt.id ? "#0AA5FF" : "#E6E6E6",
                }}
                onClick={() => onChange(opt.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="radio"
                    id={opt.id}
                    name={field.id}
                    checked={value === opt.id}
                    onChange={() => onChange(opt.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <label htmlFor={opt.id} style={{ cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
                    {opt.label}
                  </label>
                </div>
                {opt.description && <div style={{ fontSize: "12px", color: "#828C94", marginLeft: "24px" }}>{opt.description}</div>}
              </div>
            ))}
          </div>
          {field.helpText && <div style={helpTextStyle}>{field.helpText}</div>}
          {error && <div style={{ ...helpTextStyle, color: "#D9534F" }}>{error}</div>}
        </div>
      );

    default:
      return null;
  }
}
