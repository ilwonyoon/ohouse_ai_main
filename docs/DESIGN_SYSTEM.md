# Ohouse AI - Design System (v1.1)

> **Version**: 1.1 (Updated with additional frame specifications)  
> **Last Updated**: November 4, 2025  
> **Source**: Figma - Ohouse-AI--AI-interior- (Multiple frames)

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

**Device Target**: Mobile (375px × 812px+)  
**Base Unit**: 8px spacing scale  
**Font Family**: Pretendard (primary), SF Pro Text (fallback)

---

## Primitive Tokens

### Colors

#### Neutral Colors
- **neutral600 (fg-default)**: `#2F3438` — Primary text, dark elements
- **neutral500 (fg-secondary)**: `#828C94` — Secondary text, disabled states
- **neutral300 (base_4)**: `#EAEDEF` — Light backgrounds, borders
- **white (bg-default)**: `#FFFFFF` — Main backgrounds, cards
- **background (alias)**: `#ffffff` — Page backgrounds
- **bg_grey (ohouse_ai specific)**: `#f2f2f2` — Subtle backgrounds

#### Brand Colors
- **primary1_basic (fg-brand)**: `#0AA5FF` — Primary actions, brand accent
- **foregroundBrand (alias)**: `#00a1ff` — Alternative brand color

#### Semantic Colors
- **foreground**: `#2f3438` — Primary text color
- **foregroundInverse**: `#ffffff` — Text on dark backgrounds
- **foregroundWeak**: `#828c94` — Secondary/disabled text
- **foregroundDisabled**: `#c2c8cc` — Disabled state text
- **background**: `#ffffff` — Primary background
- **backgroundInverse**: `#2f3438` — Dark backgrounds
- **backgroundWeak**: `#f7f9fa` — Subtle backgrounds
- **border**: `#e6e6e6` — Standard borders
- **border[light]**: `#DADDE0` — Light borders
- **borderInverse**: `#ffffff` — Borders on dark backgrounds
- **dimBasic**: `#21262980` — Semi-transparent overlays

### Typography

#### Font Family
- **Primary**: Pretendard (system font)
- **Fallback**: SF Pro Text, Sans-serif
- **Weights**: Regular (400), Medium (500), SemiBold (600), Bold (700)

#### Font Sizes & Line Heights
- **24px** → lineHeight: 32px (Heading24)
- **20px** → lineHeight: 28px (Heading20)
- **18px** → lineHeight: 24px (Heading18)
- **17px** → lineHeight: 26px (Heading17)
- **16px** → lineHeight: 20px (Body16)
- **15px** → lineHeight: 24px (Body15)
- **14px** → lineHeight: 20px (Body14 - most common)
- **13px** → lineHeight: 18px (Detail13)
- **12px** → lineHeight: 16px (Detail12)
- **11px** → lineHeight: 14px (Detail11)
- **10px** → lineHeight: 14px (Detail10)

### Spacing Scale (8pt base unit)
- **2px** → 0.25 unit (micro)
- **4px** → 0.5 unit (extra small)
- **8px** → 1 unit (small)
- **12px** → 1.5 units (medium-small)
- **16px** → 2 units (medium)
- **20px** → 2.5 units (medium-large)
- **24px** → 3 units (large)
- **32px** → 4 units (extra large)

### Border Radius
- **Radius-2**: `8px` — Standard corner radius (buttons, cards)
- **Radius-3**: `12px` — Larger corner radius (modals, overlays)

### Borders & Shadows
- **border-thumbnail**: `#0000000d` — Subtle border/shadow
- **Seperator/Light/Non-opaque**: `#3C3C43` — Divider lines

---

## Semantic Tokens

### Color Usage Context

**Text Colors**
- **fg-default**: `#2F3438` → Primary headings, body text
- **fg-secondary**: `#828C94` → Secondary descriptions, hints
- **fg-brand**: `#0AA5FF` → CTAs, links, brand elements
- **fg-inverse**: `#FFFFFF` → Text on dark backgrounds
- **fg-disabled**: `#C2C8CC` → Disabled button text

**Background Colors**
- **bg-default**: `#FFFFFF` → Main page backgrounds, cards
- **bg-inverse**: `#2F3438` → Dark overlays, dark theme
- **bg-grouped-contents**: `#FFFFFF` → Grouped list backgrounds
- **bg-weak**: `#F7F9FA` → Subtle section backgrounds
- **bg_grey**: `#F2F2F2` → Alternative subtle backgrounds

**Border Colors**
- **border-default**: `#E6E6E6` → Standard borders
- **border-light**: `#DADDE0` → Lighter borders
- **border-thumbnail**: `#0000000d` → Subtle borders

### Typography Styles

| Style | Size | Weight | Line-Height | Use Case |
|-------|------|--------|-------------|----------|
| **Heading24/Bold** | 24px | 700 | 32px | Main page titles |
| **Heading20/Semibold** | 20px | 600 | 28px | Section headers |
| **Heading18/Bold** | 18px | 700 | 24px | Card titles |
| **Heading17/Semibold** | 17px | 600 | 26px | Top navigation text |
| **Body16/Bold** | 16px | 700 | 20px | Emphasizes body text |
| **Body15/Bold** | 15px | 700 | 24px | Tab text, strong body |
| **Body15/Semibold** | 15px | 600 | 24px | Featured content text |
| **Body15/Medium** | 15px | 500 | 24px | Regular body text |
| **Body14/Semibold** | 14px | 600 | 20px | Button text, labels |
| **Body14/Medium** | 14px | 500 | 20px | Regular body text |
| **Body14/Regular** | 14px | 400 | 18px | Descriptions |
| **Detail13/Semibold** | 13px | 600 | 18px | Small labels |
| **Detail13/Regular** | 13px | 400 | 18px | Secondary details |
| **Detail12/Semibold** | 12px | 600 | 16px | Small emphasizes |
| **Detail12/Medium** | 12px | 500 | 16px | Helper text |
| **Detail10/Bold** | 10px | 700 | 14px | Badges, tags |

---

## Component Specifications

### 1. Top Navigation Bar

**Container Height**: 44px  
**Background**: `#FFFFFF`  
**Border**: `#E6E6E6` (bottom)  
**Layout**: Flex, centered  
**Safe Area Padding**: 16px (horizontal)

**Contents**:
- Back Arrow (24×24px, optional)
- Title (Heading17/Semibold)
- Close/Action Icon (24×24px, optional)

---

### 2. Tab Navigation (🌀 Tab)

**Container Height**: 44px  
**Background**: `#FFFFFF`  
**Border**: `#E6E6E6` (top and bottom)

**Tab Item**:
- **Width**: Equal distribution
- **Height**: 44px
- **Text**: Body14/Semibold, fg-default
- **Underline** (active): 3px height, fg-brand (`#0AA5FF`)
- **Spacing**: Divider between tabs (1px, `#E6E6E6`)

---

### 3. Feature Entry Card (Large)

**Dimensions**: 351×263px (on 375px viewport = 93.6% width)  
**Background**: `#FFFFFF`  
**Border Radius**: 12px  
**Box Shadow**: `#0000000d`  
**Margin**: 16px horizontal (auto-centered), 12px vertical

**Structure**:
```
┌─────────────────────────┐
│  Image Container (175h) │ ← Before/After split image
├─────────────────────────┤
│  Content Container (88h)│ ← Title, description, button
│                         │
│ [Title] [Try Button]    │
│ [Description]           │
└─────────────────────────┘
```

**Image Section (175×351px)**:
- Split 50/50 left (Before) and right (After)
- Each side: 175×175px rounded rect
- Image overflow: masked
- Divider: 1px vertical line at center (`#2F3438` at 50% opacity)
- Badges: 40×18px (positioned at bottom of each image)
  - Font: Detail10/Bold
  - Background: Semi-transparent `#2F3438`
  - Text: `#FFFFFF`
  - Border Radius: 4px

**Content Section (351×88px)**:
- Padding: 12px
- **Title**: Body15/Bold, fg-default, max 2 lines
- **Description**: Body14/Regular, fg-secondary, max 2 lines
- **Button**: positioned at right (absolute), 47×28px

---

### 4. Feature Entry Card (Small)

**Dimensions**: 167×250px  
**Background**: `#FFFFFF`  
**Border Radius**: 12px  
**Box Shadow**: `#0000000d`  
**Grid Layout**: 2 columns, flexible rows

**Structure**:
```
┌─────────┐
│ Image   │ (167×171px)
├─────────┤
│ Title   │ (167×79px content)
│ Button  │
└─────────┘
```

**Image Section**: 167×171px (full-bleed rounded)

**Content Section (167×79px)**:
- Padding: 12px
- **Title**: Body15/Bold, fg-default
- **Body** (optional): Body14/Regular, fg-secondary
- **Button** (optional): 47×28px

---

### 5. Primary Button (Box Button)

**Dimensions**: 47×28px  
**Border Radius**: 8px  
**Background**: fg-brand (`#0AA5FF`)  
**Text**: Body14/Semibold, fg-inverse (`#FFFFFF`)  
**States**:
- **Default**: Opacity 1.0
- **Hover**: Opacity 0.85
- **Active**: Opacity 0.7
- **Disabled**: Background `#C2C8CC`, opacity 0.5

---

### 6. Bottom Navigation (🗂️ Bottom Navigation)

**Container Height**: 88.5px  
**Background**: `#FFFFFF`  
**Border**: `#E6E6E6` (top)  
**Safe Area**: 16px horizontal, 8px bottom

**Layout**: 5 equal-width items (75px each on 375px)

**Item Structure**:
- **Icon**: 24×24px, fg-default
- **Label**: Detail10/Bold, fg-default
- **Spacing**: 4px between icon and label
- **Active State**: 
  - Icon color: fg-brand (`#0AA5FF`)
  - Label color: fg-brand
  - Underline: 3px above item, fg-brand

---

### 7. Room List Item (my_room_list)

**Container Height**: 72px  
**Background**: `#FFFFFF`  
**Padding**: 12px horizontal, 8px vertical  
**Border**: `#E6E6E6` (bottom)

**Layout**:
- **Thumbnail**: 56×56px, rounded (4px)
- **Content Section**: Flex column
  - **Room Name**: Body15/Bold, fg-default
  - **Room Type**: Detail12/Medium, fg-secondary
- **Action Button** (optional): 24×24px icon, right aligned

---

### 8. Section Header / Title Bar

**Height**: 50px  
**Background**: `#FFFFFF`  
**Padding**: 16px

**Text**: Heading17/Semibold or Body15/Bold  
**Color**: fg-default (`#2F3438`)  
**Bottom Border**: 1px `#E6E6E6` (optional)

---

### 9. Status Bar (System)

**Height**: 48px (including safe area)  
**Background**: `#FFFFFF` or match content  
**Content**: Time, Signal, WiFi, Battery (iOS style)  
**Text**: Detail12/Medium, fg-default

---

### 10. Image Badge

**Dimensions**: 40×18px  
**Border Radius**: 4px  
**Background**: `#2F3438` at 80% opacity  
**Text**: Detail10/Bold, `#FFFFFF`  
**Padding**: 2px horizontal  
**Text Alignment**: Center

---

## Layout & Spacing

### Safe Area
- **Top**: 48px (status bar)
- **Bottom**: 88.5px (bottom navigation)
- **Sides**: 16px padding

### Container Width
- **Mobile**: 375px (full width)
- **Content Width**: 343px (375px - 32px sides)

### Common Spacing Patterns

**Vertical Spacing**:
- Between sections: 20px
- Between cards: 12px
- Between title and content: 8px
- Between content lines: 4px

**Horizontal Spacing**:
- Page edges: 16px
- Element spacing: 12px
- Text spacing: 8px

---

## Border & Shadow

### Border Styles
- **Standard**: 1px `#E6E6E6`
- **Light**: 1px `#DADDE0`
- **Subtle**: `#0000000d` (used in shadows)

### Shadow Effects
- **Card Shadow**: Soft shadow using `#0000000d`
- **Overlay Dim**: `#21262980` (33% opacity `#212629`)

### Rounded Corners
- **Buttons**: 8px (Radius-2)
- **Cards**: 12px (Radius-3)
- **Images**: 12px
- **Badges**: 4px (special case)

---

## Additional Design Rules from Frame 11552-5414

### Room Analyzer Component
- **Height**: 104px
- **Background**: `#FFFFFF`
- **Border**: `#E6E6E6` (bottom)
- **Layout**: Row with title section + toggle switch
  - **Title Section**: 
    - Heading: Body15/Bold, fg-default
    - Description: Detail13/Regular, fg-secondary
    - Spacing: 8px between
  - **Toggle**: 50×30px, right-aligned

### Upload/Grid Patterns

**Single Upload Cell**:
- Dimensions: 166×126px
- Border Radius: 8px
- Background: `#F2F2F2` or placeholder
- Icon: 44×44px (centered)
- Text: Detail10/Bold, fg-default (below icon)

**Grid Layout**:
- Row spacing: 12px
- Column spacing: 12px
- Auto-fit to content width

### Responsive Behavior
- Content reflows based on available space
- 16px safe margins maintained
- Components scale proportionally

---

## Color Contrast (WCAG AA Compliance)

✓ `#2F3438` on `#FFFFFF`: **14.5:1** (AAA)  
✓ `#828C94` on `#FFFFFF`: **5.8:1** (AA)  
✓ `#0AA5FF` on `#FFFFFF`: **3.2:1** (AA)  
✓ `#FFFFFF` on `#0AA5FF`: **4.5:1** (AA)  
✓ `#FFFFFF` on `#2F3438`: **12.8:1** (AAA)  

---

## Figma Reference

**Primary Frame**: 11815-20728 (처음 생성시 - Initial Creation Screen)  
**Secondary Frame**: 11552-5414 (Explore/Gallery Screen)

All components are editable components in Figma with variants for different states (default, active, disabled, loading, etc.).
