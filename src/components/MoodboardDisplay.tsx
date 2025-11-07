/**
 * Moodboard Display Component
 * Task 1.5.6: Beautiful moodboard visualization component
 *
 * Features:
 * - Carousel/gallery of moodboard images
 * - Color palette visualization
 * - Design elements showcase
 * - Download as PDF
 * - Star rating system
 * - Share functionality
 */

"use client";

import React, { useState } from "react";
import { Moodboard, MoodboardImage } from "@/types/consultation";
import { ChevronLeft, ChevronRight, Download, Share2, Star } from "lucide-react";

// ===== TYPES =====

interface MoodboardDisplayProps {
  moodboard: Moodboard;
  onRate?: (rating: number) => void;
  onDownload?: () => void;
}

// ===== STYLES =====

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
  maxWidth: "100%",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 600,
  color: "#2F3438",
  margin: 0,
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#828C94",
  margin: 0,
  lineHeight: "1.5",
};

const conceptStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#2F3438",
  fontStyle: "italic",
  lineHeight: "1.6",
  padding: "16px",
  backgroundColor: "#F9F9F9",
  borderLeft: "4px solid #0AA5FF",
  borderRadius: "4px",
};

const galleryContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const mainImageStyle: React.CSSProperties = {
  width: "100%",
  maxHeight: "500px",
  objectFit: "cover",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
};

const imageNavigationStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const navButtonStyle: (disabled?: boolean) => React.CSSProperties = (disabled) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: disabled ? "#E6E6E6" : "#0AA5FF",
  color: disabled ? "#828C94" : "#FFFFFF",
  border: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "background-color 0.2s",
});

const imageCounterStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#828C94",
  fontWeight: 500,
};

const thumbnailGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "8px",
};

const thumbnailStyle: (isActive: boolean) => React.CSSProperties = (isActive) => ({
  width: "100%",
  aspectRatio: "1",
  objectFit: "cover",
  borderRadius: "6px",
  border: isActive ? "3px solid #0AA5FF" : "2px solid #E6E6E6",
  cursor: "pointer",
  opacity: isActive ? 1 : 0.6,
  transition: "all 0.2s",
});

const colorPaletteStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const paletteHeaderStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 600,
  color: "#2F3438",
};

const colorSwatchesStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const colorSwatchStyle: (hex: string) => React.CSSProperties = (hex) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",
});

const colorBoxStyle: (hex: string) => React.CSSProperties = (hex) => ({
  width: "60px",
  height: "60px",
  borderRadius: "6px",
  backgroundColor: hex,
  border: "1px solid #E6E6E6",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

const colorLabelStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#828C94",
  textAlign: "center",
  fontWeight: 500,
};

const designElementsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const elementsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "12px",
};

const elementCardStyle: React.CSSProperties = {
  padding: "12px",
  backgroundColor: "#F9F9F9",
  borderRadius: "6px",
  border: "1px solid #E6E6E6",
};

const elementTypeStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 600,
  color: "#0AA5FF",
  backgroundColor: "#E8F4FD",
  padding: "4px 8px",
  borderRadius: "4px",
  marginBottom: "6px",
  textTransform: "uppercase",
};

const elementNameStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#2F3438",
  marginBottom: "4px",
};

const elementDescStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#828C94",
  lineHeight: "1.4",
};

const actionBarStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  justifyContent: "space-between",
  padding: "16px 0",
  borderTop: "1px solid #E6E6E6",
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
};

const actionButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 16px",
  fontSize: "13px",
  fontWeight: 500,
  color: "#2F3438",
  backgroundColor: "#F5F5F5",
  border: "1px solid #E6E6E6",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const starRatingStyle: React.CSSProperties = {
  display: "flex",
  gap: "4px",
};

const starStyle: (filled: boolean) => React.CSSProperties = (filled) => ({
  width: "20px",
  height: "20px",
  color: filled ? "#FFB800" : "#E6E6E6",
  cursor: "pointer",
  transition: "color 0.2s",
});

// ===== COMPONENT =====

export const MoodboardDisplay: React.FC<MoodboardDisplayProps> = ({
  moodboard,
  onRate,
  onDownload,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRating, setUserRating] = useState(moodboard.userRating || 0);

  const images = moodboard.moodboardImages || [];
  const currentImage = images[currentImageIndex];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    onRate?.(rating);
  };

  const handleDownload = () => {
    onDownload?.();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: moodboard.title,
        text: moodboard.description,
      });
    }
  };

  if (!images || images.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>{moodboard.title}</h1>
          <p style={descriptionStyle}>{moodboard.description}</p>
        </div>
        <div style={{ padding: "40px 20px", textAlign: "center", color: "#828C94" }}>
          <p>Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{moodboard.title}</h1>
        <p style={descriptionStyle}>{moodboard.description}</p>
        <div style={conceptStyle}>{moodboard.concept}</div>
      </div>

      {/* Gallery */}
      <div style={galleryContainerStyle}>
        {/* Main Image */}
        {currentImage && (
          <img
            src={currentImage.url}
            alt={currentImage.description}
            style={mainImageStyle}
          />
        )}

        {/* Navigation */}
        {images.length > 1 && (
          <div style={imageNavigationStyle}>
            <button
              style={navButtonStyle(currentImageIndex === 0)}
              onClick={handlePrevious}
              disabled={images.length <= 1}
            >
              <ChevronLeft size={20} />
            </button>
            <span style={imageCounterStyle}>
              {currentImageIndex + 1} / {images.length}
            </span>
            <button
              style={navButtonStyle(currentImageIndex === images.length - 1)}
              onClick={handleNext}
              disabled={images.length <= 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={thumbnailGridStyle}>
            {images.map((image, idx) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Thumbnail ${idx + 1}`}
                style={thumbnailStyle(idx === currentImageIndex)}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Style & Atmosphere */}
      <div>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#2F3438", margin: "0 0 12px 0" }}>
          Design Direction
        </h3>
        <p style={{ fontSize: "13px", color: "#828C94", margin: "0", lineHeight: "1.6" }}>
          <strong>Style:</strong> {moodboard.primaryStyle}
          {moodboard.secondaryStyles.length > 0 && ` + ${moodboard.secondaryStyles.join(", ")}`}
        </p>
        <p style={{ fontSize: "13px", color: "#828C94", margin: "8px 0 0 0", lineHeight: "1.6" }}>
          <strong>Atmosphere:</strong> {moodboard.atmosphere}
        </p>
      </div>

      {/* Color Palette */}
      <div style={colorPaletteStyle}>
        <h3 style={paletteHeaderStyle}>Color Palette</h3>
        <div style={colorSwatchesStyle}>
          <div style={colorSwatchStyle(moodboard.colorPalette.primary.hex)}>
            <div style={colorBoxStyle(moodboard.colorPalette.primary.hex)} />
            <span style={colorLabelStyle}>{moodboard.colorPalette.primary.name}</span>
          </div>
          {moodboard.colorPalette.secondary.map((color) => (
            <div key={color.hex} style={colorSwatchStyle(color.hex)}>
              <div style={colorBoxStyle(color.hex)} />
              <span style={colorLabelStyle}>{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Design Elements */}
      {moodboard.designElements.length > 0 && (
        <div style={designElementsStyle}>
          <h3 style={paletteHeaderStyle}>Key Design Elements</h3>
          <div style={elementsGridStyle}>
            {moodboard.designElements.map((element) => (
              <div key={`${element.type}-${element.name}`} style={elementCardStyle}>
                <div style={elementTypeStyle}>{element.type}</div>
                <div style={elementNameStyle}>{element.name}</div>
                <div style={elementDescStyle}>{element.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {moodboard.recommendations && (
        <div style={designElementsStyle}>
          <h3 style={paletteHeaderStyle}>Design Recommendations</h3>
          <div style={{ fontSize: "13px", color: "#828C94", lineHeight: "1.6" }}>
            {moodboard.recommendations.furniture && (
              <p>
                <strong>Furniture:</strong> {moodboard.recommendations.furniture.join(", ")}
              </p>
            )}
            {moodboard.recommendations.lighting && (
              <p>
                <strong>Lighting:</strong> {moodboard.recommendations.lighting.join(", ")}
              </p>
            )}
            {moodboard.recommendations.textiles && (
              <p>
                <strong>Textiles:</strong> {moodboard.recommendations.textiles.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div style={actionBarStyle}>
        <div style={starRatingStyle}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              style={starStyle(star <= userRating)}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        <div style={buttonGroupStyle}>
          <button
            style={actionButtonStyle}
            onClick={handleDownload}
            title="Download as PDF"
          >
            <Download size={16} />
            Download
          </button>
          <button
            style={actionButtonStyle}
            onClick={handleShare}
            title="Share moodboard"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodboardDisplay;
