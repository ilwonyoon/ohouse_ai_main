/**
 * Image Uploader Component (Agent 1.3 - Task 1.3.5)
 * Handles room image upload and displays vision analysis results
 *
 * Features:
 * - File upload with preview
 * - Progress indicator
 * - Results display with metadata extraction
 * - Error handling
 */

"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  ImageAnalysisResult,
  ExtractedMetadata,
} from "@/types/consultation";

// ===== TYPES =====

interface ImageUploaderProps {
  userId: string;
  onAnalysisComplete?: (analysis: ImageAnalysisResult) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

interface UploadState {
  selectedFile: File | null;
  preview: string | null;
  isLoading: boolean;
  progress: number;
  analysis: ImageAnalysisResult | null;
  error: string | null;
}

// ===== STYLES =====

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #E6E6E6",
};

const uploadAreaStyle = (isDragActive: boolean): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "32px",
  border: "2px dashed",
  borderColor: isDragActive ? "#0AA5FF" : "#E6E6E6",
  borderRadius: "12px",
  backgroundColor: isDragActive ? "#E6F3FF" : "#F9F9F9",
  cursor: "pointer",
  transition: "all 0.3s ease",
  minHeight: "150px",
});

const previewStyle: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "300px",
  borderRadius: "8px",
  objectFit: "cover",
};

const progressBarStyle: React.CSSProperties = {
  width: "100%",
  height: "6px",
  backgroundColor: "#E6E6E6",
  borderRadius: "3px",
  overflow: "hidden",
};

const progressFillStyle = (percent: number): React.CSSProperties => ({
  height: "100%",
  width: `${percent}%`,
  backgroundColor: "#0AA5FF",
  transition: "width 0.3s ease",
});

const resultsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const resultSectionStyle: React.CSSProperties = {
  padding: "12px",
  backgroundColor: "#F9F9F9",
  borderRadius: "8px",
  border: "1px solid #E6E6E6",
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#828C94",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#2F3438",
  marginTop: "4px",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginTop: "12px",
};

const buttonStyle = (variant: "primary" | "secondary" = "primary"): React.CSSProperties => ({
  padding: "8px 16px",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s",
  ...(variant === "primary" && {
    backgroundColor: "#0AA5FF",
    color: "#ffffff",
  }),
  ...(variant === "secondary" && {
    backgroundColor: "#F0F0F0",
    color: "#2F3438",
    border: "1px solid #E6E6E6",
  }),
});

const errorStyle: React.CSSProperties = {
  padding: "12px",
  backgroundColor: "#FFE6E6",
  border: "1px solid #FFB3B3",
  borderRadius: "8px",
  color: "#D9534F",
  fontSize: "14px",
};

const successStyle: React.CSSProperties = {
  padding: "12px",
  backgroundColor: "#E6F8E6",
  border: "1px solid #B3FFB3",
  borderRadius: "8px",
  color: "#2F7F2F",
  fontSize: "14px",
};

// ===== COMPONENT =====

export function ImageUploader({
  userId,
  onAnalysisComplete,
  onError,
  disabled,
}: ImageUploaderProps) {
  const [state, setState] = useState<UploadState>({
    selectedFile: null,
    preview: null,
    isLoading: false,
    progress: 0,
    analysis: null,
    error: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  // ===== FILE HANDLING =====

  const handleFileSelect = useCallback((file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    // Validation
    if (!validTypes.includes(file.type)) {
      setState((prev) => ({
        ...prev,
        error: "Invalid file type. Supported: JPEG, PNG, GIF, WebP",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setState((prev) => ({
        ...prev,
        error: "File too large. Maximum 5MB allowed.",
      }));
      return;
    }

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setState((prev) => ({
        ...prev,
        selectedFile: file,
        preview: e.target?.result as string,
        error: null,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // ===== DRAG & DROP =====

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // ===== UPLOAD =====

  const handleUpload = async () => {
    if (!state.selectedFile) {
      setState((prev) => ({
        ...prev,
        error: "Please select an image first",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      progress: 0,
      error: null,
    }));

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", state.selectedFile);
      formData.append("userId", userId);

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setState((prev) => ({
            ...prev,
            progress: Math.round(progress),
          }));
        }
      });

      // Handle response
      await new Promise<void>((resolve, reject) => {
        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.success && response.data) {
                setState((prev) => ({
                  ...prev,
                  analysis: response.data,
                  isLoading: false,
                  progress: 100,
                }));
                onAnalysisComplete?.(response.data);
              } else {
                reject(new Error(response.error || "Analysis failed"));
              }
            } catch (e) {
              reject(new Error("Failed to parse response"));
            }
            resolve();
          } else {
            reject(
              new Error(
                `Upload failed: ${xhr.status} ${xhr.statusText}`
              )
            );
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Network error during upload"));
        });

        xhr.addEventListener("abort", () => {
          reject(new Error("Upload cancelled"));
        });

        xhr.open("POST", "/api/consultation/image-analysis");
        xhr.send(formData);
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error occurred";
      setState((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      onError?.(errorMsg);
    }
  };

  // ===== RESET =====

  const handleReset = () => {
    setState({
      selectedFile: null,
      preview: null,
      isLoading: false,
      progress: 0,
      analysis: null,
      error: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ===== RENDER =====

  return (
    <div style={containerStyle}>
      {/* Upload Area */}
      {!state.analysis && (
        <>
          <div
            ref={dragRef}
            style={uploadAreaStyle(false)}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: "32px" }}>📸</div>
            <div>
              <div style={{ fontWeight: "600", color: "#2F3438" }}>
                Choose an image or drag & drop
              </div>
              <div style={{ fontSize: "12px", color: "#828C94" }}>
                Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: "none" }}
            disabled={disabled || state.isLoading}
          />

          {/* Preview */}
          {state.preview && (
            <div>
              <div style={labelStyle}>Preview</div>
              <img src={state.preview} alt="Preview" style={previewStyle} />
            </div>
          )}

          {/* Progress */}
          {state.isLoading && (
            <div>
              <div style={labelStyle}>Uploading & Analyzing</div>
              <div style={progressBarStyle}>
                <div style={progressFillStyle(state.progress)} />
              </div>
              <div style={{ ...valueStyle, marginTop: "8px" }}>
                {state.progress}% complete
              </div>
            </div>
          )}

          {/* Error */}
          {state.error && <div style={errorStyle}>{state.error}</div>}

          {/* Actions */}
          {state.selectedFile && !state.isLoading && (
            <div style={buttonGroupStyle}>
              <button
                style={{ ...buttonStyle("primary"), flex: 1 }}
                onClick={handleUpload}
                disabled={disabled}
              >
                Analyze Image
              </button>
              <button
                style={buttonStyle("secondary")}
                onClick={handleReset}
                disabled={disabled || state.isLoading}
              >
                Clear
              </button>
            </div>
          )}
        </>
      )}

      {/* Results Display */}
      {state.analysis && (
        <div style={resultsContainerStyle}>
          <div style={successStyle}>
            ✅ Image analysis complete in{" "}
            {state.analysis.processingTime / 1000}s
          </div>

          {/* Room Analysis */}
          <div style={resultSectionStyle}>
            <div style={labelStyle}>Room Identification</div>
            <div style={valueStyle}>
              {state.analysis.roomAnalysis.roomType.replace(/_/g, " ")} (
              {(state.analysis.roomAnalysis.confidence * 100).toFixed(0)}%
              confidence)
            </div>
            <div style={{ ...valueStyle, fontSize: "12px", color: "#828C94" }}>
              Size: {state.analysis.roomAnalysis.estimatedSize.category} •
              Light:{" "}
              {state.analysis.roomAnalysis.characteristics.hasNaturalLight}
            </div>
          </div>

          {/* Style Analysis */}
          <div style={resultSectionStyle}>
            <div style={labelStyle}>Design Style</div>
            <div style={valueStyle}>
              {state.analysis.styleAnalysis.primaryStyle.replace(/_/g, " ")}
            </div>
            <div style={{ ...valueStyle, fontSize: "12px", color: "#828C94" }}>
              {state.analysis.styleAnalysis.secondaryStyles
                .map((s) => s.replace(/_/g, " "))
                .join(", ")}
            </div>
          </div>

          {/* Colors */}
          <div style={resultSectionStyle}>
            <div style={labelStyle}>Dominant Colors</div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {state.analysis.visualAnalysis.colorPalette.dominant
                .slice(0, 3)
                .map((color) => (
                  <div
                    key={color.hex}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: color.hex,
                        borderRadius: "6px",
                        border: "1px solid #E6E6E6",
                      }}
                    />
                    <div style={{ fontSize: "10px", color: "#828C94" }}>
                      {color.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Issues */}
          {state.analysis.issueAnalysis.visibleIssues.length > 0 && (
            <div style={resultSectionStyle}>
              <div style={labelStyle}>Issues Identified</div>
              {state.analysis.issueAnalysis.visibleIssues
                .slice(0, 3)
                .map((issue, i) => (
                  <div
                    key={i}
                    style={{
                      marginTop: "8px",
                      paddingTop: "8px",
                      borderTop:
                        i > 0 ? "1px solid #E6E6E6" : "none",
                    }}
                  >
                    <div style={valueStyle}>{issue.issue}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#828C94",
                        marginTop: "4px",
                      }}
                    >
                      Severity: {issue.severity}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Quick Wins */}
          {state.analysis.issueAnalysis.quickWins.length > 0 && (
            <div style={resultSectionStyle}>
              <div style={labelStyle}>Quick Wins</div>
              <ul style={{ margin: "8px 0 0 16px", color: "#2F3438" }}>
                {state.analysis.issueAnalysis.quickWins.slice(0, 3).map((win, i) => (
                  <li key={i} style={{ fontSize: "14px", marginBottom: "4px" }}>
                    {win}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div style={buttonGroupStyle}>
            <button
              style={{ ...buttonStyle("primary"), flex: 1 }}
              onClick={() => onAnalysisComplete?.(state.analysis!)}
            >
              Use This Analysis
            </button>
            <button
              style={buttonStyle("secondary")}
              onClick={handleReset}
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
