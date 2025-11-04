# Ohouse AI - Design System

> **Version**: 1.0  
> **Last Updated**: November 4, 2025  
> **Source**: Figma - Ohouse-AI--AI-interior- (Design)

---

## Table of Contents

1. [Overview](#overview)
2. [Primitive Tokens](#primitive-tokens)
3. [Semantic Tokens](#semantic-tokens)
4. [Typography System](#typography-system)
5. [Component Specifications](#component-specifications)
6. [Layout & Spacing](#layout--spacing)
7. [Border & Shadow](#border--shadow)

---

## Overview

The Ohouse AI design system is built on a modern, clean aesthetic with a focus on interior design visualization. The system uses a neutral color palette with a vibrant cyan accent for primary actions.

**Device Target**: Mobile (375px × 1765px viewport)
**Design Language**: Minimalist with rich imagery
**Framework**: React + Next.js
**Styling**: CSS/Tailwind (to be standardized)

---

## Primitive Tokens

### Colors - Primitive

#### Neutrals
```
neutral-50:        #FFFFFF   (white)
neutral-100:       #F5F5F5   (off-white, derived)
neutral-500:       #828C94   (gray, secondary foreground)
neutral-600:       #2F3438   (dark gray, primary foreground)
neutral-border:    #E6E6E6   (border color)
neutral-border-light: #DADDE0 (light border)
```

#### Brand Colors
```
brand-primary:     #0AA5FF   (cyan blue - primary action)
```

#### Backgrounds
```
bg-primary:        #FFFFFF   (white background)
bg-inverse:        #2F3438   (dark inverse)
```

#### Foreground
```
fg-primary:        #2F3438   (dark text)
fg-secondary:      #828C94   (gray text)
fg-inverse:        #FFFFFF   (white/light text)
fg-brand:          #0AA5FF   (brand cyan)
```

---

## Semantic Tokens

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg-default` | `#FFFFFF` | Default page/card backgrounds |
| `bg-grouped-contents` | `#FFFFFF` | Grouped content containers |
| `bg-inverse` | `#2F3438` | Dark background for inverse contrast |

### Foreground Colors

| Token | Value | Usage |
|-------|-------|-------|
| `fg-default` | `#2F3438` | Primary text (headings, titles) |
| `fg-secondary` | `#828C94` | Secondary text (descriptions, labels) |
| `fg-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `fg-brand` | `#0AA5FF` | Brand/primary action text & indicators |

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `border-default` | `#E6E6E6` | Default borders (cards, dividers) |
| `border-light` | `#DADDE0` | Light borders (less prominent dividers) |

---

## Typography System

### Font Family
```
Primary: Pretendard
  - Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  - Fallback: sans-serif
```

### Type Scale

#### Headings

| Style | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|-----------------|-------|
| `Heading17/Heading17_Semibold` | 17px | 600 | 26px | -0.3px | Page titles, top navigation |

#### Body

| Style | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|-----------------|-------|
| `Body16/Body16L20_Bold` | 16px | 700 | 20px | -0.3px | Large primary text |
| `Body15/Body15L24_Bold` | 15px | 700 | 24px | -0.3px | Tab titles, card titles |
| `Body15/Body15L24_Semibold` | 15px | 600 | 24px | -0.3px | Feature card titles, emphasis |
| `Body14/Body14L18_Regular` | 14px | 400 | 18px | -0.3px | Body text, descriptions |
| `Body14/Body14L20_Medium` | 14px | 500 | 20px | -0.3px | Button text, action labels |

#### Detail (Small Text)

| Style | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|-----------------|-------|
| `Detail13/Detail13L18_Regular` | 13px | 400 | 18px | -0.3px | Supplementary text, secondary descriptions |
| `Detail10/Detail10L14_Medium` | 10px | 500 | 14px | -0.3px | Small labels, badges |
| `Detail10/Detail10_Bold` | 10px | 700 | 14px | -0.3px | Small bold labels |

---

## Component Specifications

### Navigation Components

#### Top Navigation Bar
```
Height: 44px
Background: #FFFFFF
Border: None (shadow-based separation implied)
Position: Fixed/Sticky at top (after status bar)
Padding: 10px horizontal, 10px vertical

Left Element: Back arrow icon (24×24px)
Center Element: Title ("Ohouse AI", 16px Bold)
Right Element: (Empty in current design, reserved for actions)
```

#### Tab Component
```
Height: 44px
Items: Design, Explore
Padding: 10px vertical, 6px horizontal per tab
Active Tab Indicator: 2px bottom border (#2F3438)
Font: Body15/Body15L24_Bold
Active Text: #2F3438
Inactive Text: #828C94
Border Bottom: 1px #EAEDEF divider
```

#### Bottom Navigation
```
Height: 88.5px (including home indicator)
Background: #FFFFFF
Border Top: 0.5px separator
Items: 2 main tabs + home indicator
Tab Layout: Flex, centered
Icon Size: 24×24px
Text: Detail10/Detail10_Bold (10px)
Active Color: #0AA5FF
Inactive Color: #2F3438
Home Indicator: 5px × 134px centered black bar at bottom
```

### Card Components

#### Feature Entry - Large
```
Size: 351px width × 263px height
Background: #FFFFFF
Border: None
Content Layout:
  - Image Container: 343px × 175px (rounded 12px)
    - Before/After split (175px each)
    - Badges: 40×18px with blur backdrop (10px Medium)
    - Divider: 1px white line between images
  - Info Container: 343px × 88px
    - Title: Body15/Body15L24_Semibold (#2F3438)
    - Description: Body14/Body14L18_Regular (#828C94)
    - CTA Button: "Try it" (47×28px)
Button Style: Dark background (#2F3438), white text, rounded 8px
```

#### Feature Entry - Small
```
Size: 167px width × 250px height
Background: #FFFFFF
Border: 0.5px #E6E6E6
Border Radius: 12px
Content Layout:
  - Image: 167px × 171px (full background)
  - Overlay: Gradient (transparent → rgba(0,0,0,0.1))
  - Text Container (absolute positioned):
    - Title: Body15/Body15L24_Semibold (#FFFFFF)
    - Optional Description: Detail13/Detail13L18_Regular (#FFFFFF, opacity 70%)
    - CTA Button: "Try it" (47×28px, optional)
```

### Button Components

#### Box Button - Primary
```
Background: #2F3438
Text Color: #FFFFFF
Font: Body14/Body14L20_Medium
Padding: 8px horizontal × 4px vertical
Border Radius: 8px
Size Variants:
  - Standard: 47px × 28px
  - Icon Gap: 4px internal spacing
```

#### Badge
```
Backdrop: Blur 2px + rgba(0,0,0,0.1)
Background: Semi-transparent dark overlay
Padding: 4px horizontal × 2px vertical
Border Radius: 4px
Text: Detail10/Detail10L14_Medium (#FFFFFF)
Text Options: "Before", "After"
```

---

## Layout & Spacing

### Viewport
```
Mobile Width: 375px
Safe Area Padding: 16px horizontal (from edge)
Container Width: 343px (within safe area)
```

### Spacing Scale (8px base unit)
```
2px:   border, dividers
4px:   compact spacing (badge padding)
6px:   tight spacing (tab gaps)
8px:   standard spacing (button padding)
10px:  medium spacing (card padding)
12px:  section spacing
16px:  container margins/padding
20px:  large spacing between sections
```

### Section Spacing
```
Top Navigation to Content: 44px (tab) + 44px (nav) = 88px total
Content to Bottom Navigation: 88.5px
Page Height: 1765px (including status bar 48px + indicator 34px)
```

---

## Border & Shadow

### Border Radius
```
Smooth (12px):  Feature cards, image containers
Tight (8px):    Buttons, badges
None:           Typography, full-width elements
```

### Borders
```
Default (0.5px): #E6E6E6 on cards
Divider (1px):   White on images, #EAEDEF on sections
Tab Active (2px): #2F3438 bottom border
```

### Shadows & Blur Effects
```
Card Shadows: Implied (not explicitly defined in spec)
Image Blur: 2px backdrop blur on badges
Gradient Overlay: Linear gradient to-b from transparent to rgba(0,0,0,0.1) on small cards
```

---

## Usage Examples

### Colors in Components

```json
{
  "card": {
    "background": "bg-default",
    "border": "border-default"
  },
  "text": {
    "primary": "fg-default",
    "secondary": "fg-secondary",
    "inverse": "fg-inverse"
  },
  "button": {
    "background": "bg-inverse",
    "text": "fg-inverse",
    "active": "fg-brand"
  },
  "navigation": {
    "activeTab": "fg-brand",
    "inactiveTab": "fg-secondary",
    "background": "bg-default"
  }
}
```

---

## Next Steps

- [ ] Expand with additional screen designs
- [ ] Define animation/transition tokens
- [ ] Document responsive breakpoints (tablet, desktop)
- [ ] Add accessibility considerations (contrast ratios, focus states)
- [ ] Create Figma tokens export for code generation
- [ ] Define component composition patterns
- [ ] Document interaction states (hover, active, disabled)

---

## Figma References

| Frame | Node ID | Description |
|-------|---------|-------------|
| 처음 생성시 (Initial Screen) | 11815:20728 | Design tab with feature cards |
| Status Bar - iPhone | 11815:20775 | System status bar |
| Top Navigation-new | 11815:20773 | Header navigation |
| 🌀 Tab | 11815:20729 | Tab navigation component |
| Feature entry_lg | 11815:20730, 11815:20933 | Large feature cards |
| Feature entry_sm | 11815:20894, 11815:20915, 11815:20921, 11815:20927 | Small feature cards |
| 🗂️ Bottom Navigation | 11815:20777 | Bottom tab navigation |
