# Responsive Design & Breakpoints (v1.1)

> Mobile-first responsive design patterns and breakpoint specifications for Ohouse AI.

**Version**: 1.1
**Last Updated**: November 4, 2025
**Approach**: Mobile-first
**Status**: Ready for Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Breakpoint System](#breakpoint-system)
3. [Layout Patterns](#layout-patterns)
4. [Typography Scaling](#typography-scaling)
5. [Spacing Adjustments](#spacing-adjustments)
6. [Component Variants](#component-variants)
7. [Responsive Images](#responsive-images)
8. [Navigation Patterns](#navigation-patterns)

---

## Overview

Ohouse AI uses a **mobile-first** approach:

1. Design and build for mobile (375px) first
2. Add enhancements at larger breakpoints
3. Use `min-width` media queries

```typescript
// Mobile-first pattern
const styles = css`
  // Mobile styles (base)
  width: 100%;
  font-size: 14px;

  // Tablet
  @media (min-width: 768px) {
    width: 80%;
    font-size: 16px;
  }

  // Desktop
  @media (min-width: 1024px) {
    width: 70%;
    font-size: 18px;
  }
`;
```

---

## Breakpoint System

### Standard Breakpoints

| Name | Width | Use Case | Devices |
|------|-------|----------|---------|
| **Mobile** | 320px - 767px | Default, smartphones | iPhone, Android phones |
| **Tablet** | 768px - 1023px | Tablets in portrait | iPad, Android tablets |
| **Desktop** | 1024px+ | Larger screens | Laptops, desktops, large tablets |

### Breakpoint Variables

```typescript
// Emotion/styled approach
const breakpoints = {
  mobile: '375px',      // Primary mobile viewport
  tablet: '768px',      // Tablet and up
  desktop: '1024px',    // Desktop and up
  wide: '1440px'        // Large desktop
};

// Usage in Emotion
const responsive = css`
  // Mobile (base)
  font-size: 14px;

  // Tablet
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }

  // Desktop
  @media (min-width: ${breakpoints.desktop}) {
    font-size: 18px;
  }
`;
```

### Exact Breakpoint Media Queries

```typescript
// Mobile only
@media (max-width: 767px) { }

// Tablet only
@media (min-width: 768px) and (max-width: 1023px) { }

// Desktop and up
@media (min-width: 1024px) { }

// High DPI screens (retina)
@media (min-resolution: 192dpi) { }

// Landscape orientation
@media (orientation: landscape) { }

// Touch-capable devices
@media (hover: none) { }
```

---

## Layout Patterns

### Mobile Layout (375px)

```
┌─────────────────────────────┐
│ Status Bar (48px)           │
├─────────────────────────────┤
│ Top Nav (44px)              │
├─────────────────────────────┤
│ Content (padded)            │
│ • 16px horizontal padding   │
│ • 343px max content width   │
│ • Full height scrollable    │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│ Bottom Nav (88.5px)         │
├─────────────────────────────┤
│ Home Indicator (34px)       │
└─────────────────────────────┘
```

**Specs:**
- Viewport width: 375px
- Content width: 343px (375 - 32px sides)
- Horizontal padding: 16px each side
- Single column layout

### Tablet Layout (768px+)

```
┌──────────────────────────────────────┐
│ Status Bar                           │
├──────────────────────────────────────┤
│ Top Nav (44px)                       │
├────────────────┬──────────────────────┤
│ Sidebar Nav    │ Content (scrollable) │
│ 200px          │ • 16px padding      │
│                │ • 500px max width   │
│                │ • Multi-column OK   │
│                │                     │
│                │                     │
│                │                     │
├────────────────┴──────────────────────┤
│ Bottom Navigation (if applicable)    │
└──────────────────────────────────────┘
```

**Specs:**
- Viewport width: 768px+
- Can add sidebar navigation (200px)
- Content width: 500px recommended
- Two-column layout possible
- Bottom nav becomes top/side nav

### Desktop Layout (1024px+)

```
┌────────────────────────────────────────────┐
│ Header (persistent)                       │
├──────────┬──────────────────────┬──────────┤
│ Sidebar  │ Main Content         │ Sidebar  │
│ 240px    │ • 600px max width    │ 240px    │
│          │ • 16px padding       │ (optional)│
│          │ • Multi-column grid  │          │
│          │                      │          │
│          │                      │          │
└──────────┴──────────────────────┴──────────┘
```

**Specs:**
- Viewport width: 1024px+
- Three-column layout possible
- Content width: 600-800px
- Fixed navigation can appear
- More breathing room

---

## Typography Scaling

Mobile-first typography:

### Base Typography (Mobile, 375px)

| Element | Size | Weight | Line Height |
|---------|------|--------|------------|
| Heading24 | 20px | 700 | 28px |
| Heading20 | 18px | 600 | 24px |
| Heading18 | 16px | 700 | 20px |
| Body16 | 14px | 700 | 20px |
| Body15 | 14px | 600 | 20px |
| Body14 | 13px | 400 | 18px |
| Detail13 | 12px | 400 | 16px |
| Detail10 | 10px | 500 | 14px |

### Tablet Typography (768px+)

```typescript
const tabletTypography = css`
  // Headings get slightly larger
  h1 { font-size: 18px; }      // was 16px
  h2 { font-size: 17px; }      // was 16px
  h3 { font-size: 15px; }      // was 14px

  p { font-size: 15px; }       // was 14px
  button { font-size: 14px; }  // stays same
`;
```

### Desktop Typography (1024px+)

```typescript
const desktopTypography = css`
  // Full design system sizes available
  h1 { font-size: 24px; }      // Use design system
  h2 { font-size: 20px; }
  h3 { font-size: 18px; }

  p { font-size: 16px; }
`;
```

**Principle:** Never shrink text below system minimum (12px) for readability.

---

## Spacing Adjustments

### Mobile Spacing (375px)

```typescript
const mobileSpacing = css`
  // Tighter spacing on mobile
  margin: 8px 0;
  padding: 12px 16px;
  gap: 8px;

  // Card spacing
  section + section {
    margin-top: 12px;
  }

  // Horizontal padding
  padding-left: 16px;
  padding-right: 16px;
`;
```

### Tablet Spacing (768px+)

```typescript
const tabletSpacing = css`
  @media (min-width: 768px) {
    // More breathing room
    margin: 12px 0;
    padding: 16px 24px;
    gap: 12px;

    // Larger spacing between sections
    section + section {
      margin-top: 24px;
    }

    // Horizontal padding
    padding-left: 24px;
    padding-right: 24px;
  }
`;
```

### Desktop Spacing (1024px+)

```typescript
const desktopSpacing = css`
  @media (min-width: 1024px) {
    // Generous spacing
    margin: 16px 0;
    padding: 20px 32px;
    gap: 16px;

    // Large section spacing
    section + section {
      margin-top: 32px;
    }

    // Auto-center with max-width
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
  }
`;
```

---

## Component Variants

### Button Sizing

| Breakpoint | Height | Padding | Font Size |
|-----------|--------|---------|-----------|
| Mobile | 40px | 8px 16px | 14px |
| Tablet | 44px | 10px 20px | 14px |
| Desktop | 48px | 12px 24px | 16px |

```typescript
const responsiveButton = css`
  // Mobile
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;

  // Tablet
  @media (min-width: 768px) {
    height: 44px;
    padding: 10px 20px;
  }

  // Desktop
  @media (min-width: 1024px) {
    height: 48px;
    padding: 12px 24px;
    font-size: 16px;
  }
`;
```

### Card Layout

#### Mobile (Single Column)

```typescript
const cardGridMobile = css`
  // Stack cards vertically
  display: flex;
  flex-direction: column;
  gap: 12px;

  > * {
    width: 100%;
  }
`;
```

#### Tablet (2 Columns)

```typescript
const cardGridTablet = css`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;
```

#### Desktop (3+ Columns)

```typescript
const cardGridDesktop = css`
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;
```

**Complete Example:**
```typescript
const cardGrid = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;
```

### Navigation Layout

#### Mobile (Bottom Navigation)

```
┌──────────────────────┐
│ Top Nav              │
├──────────────────────┤
│ Content              │
│                      │
│                      │
├──────────────────────┤
│ Bottom Navigation    │ ← 5 items, icons + labels
└──────────────────────┘
```

#### Tablet+ (Top/Side Navigation)

```
┌──────────────────────────────┐
│ Header with horizontal nav   │ ← Navigation in header
├──────────────────────────────┤
│ Main Content                 │
│                              │
│                              │
└──────────────────────────────┘
```

---

## Responsive Images

### Image Scaling

```html
<!-- Responsive image -->
<img
  src="image-small.jpg"
  srcset="image-medium.jpg 768w, image-large.jpg 1024w"
  alt="Description"
  style="width: 100%; max-width: 500px; height: auto;"
/>
```

### Picture Element (Art Direction)

```html
<!-- Use different crops/aspect ratios per breakpoint -->
<picture>
  <source media="(max-width: 767px)" srcset="image-mobile.jpg">
  <source media="(min-width: 768px)" srcset="image-tablet.jpg">
  <source media="(min-width: 1024px)" srcset="image-desktop.jpg">
  <img src="image-default.jpg" alt="Description">
</picture>
```

### CSS Image Sizing

```typescript
const responsiveImage = css`
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: cover;

  // Mobile: 100% width
  // Tablet: 80% width
  @media (min-width: 768px) {
    width: 80%;
  }

  // Desktop: 600px fixed
  @media (min-width: 1024px) {
    width: 600px;
    height: 400px;
  }
`;
```

---

## Navigation Patterns

### Mobile Navigation

**Bottom Tab Bar:** (88.5px height)
- 5 equal-width items
- Icons (24×24px) + labels
- Easy thumb access
- Active indicator

### Tablet Navigation

**Top Sticky Header + Slide Out Menu:**
- Persistent header
- Hamburger icon opens side menu
- Or horizontal tab navigation

### Desktop Navigation

**Multiple Options:**
1. Permanent side navigation (200-240px)
2. Top horizontal navigation
3. Breadcrumb navigation
4. Sticky header

---

## Touch-Friendly Design

### Touch Target Sizes

- **Minimum:** 44×44px (44px recommended)
- **Spacing:** 8px minimum between targets
- **Safe area:** Avoid elements in bottom 16px (curved edge phones)

```typescript
const touchButton = css`
  // iOS/Android minimum touch target
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  // Add padding for spacing
  margin: 4px;
`;
```

### Hover States

On touch devices, hover doesn't exist:

```typescript
const hoverableElement = css`
  // Hover state (desktop/tablet with mouse)
  &:hover {
    background-color: #f7f9fa;
  }

  // Remove hover on touch devices
  @media (hover: none) {
    &:hover {
      background-color: transparent;
    }

    // Use active/focus instead
    &:active {
      background-color: #eaedef;
    }
  }
`;
```

---

## Testing Responsive Design

### Browser DevTools

1. Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Set viewport size
3. Test at each breakpoint:
   - 375px (mobile)
   - 768px (tablet)
   - 1024px (desktop)
   - 1440px (wide)

### Real Device Testing

Always test on actual devices:
- iPhone 12/13/14 (375px)
- iPad (768px)
- iPad Pro (1024px+)
- Android phones/tablets

### Responsive Checklist

- [ ] Mobile layout (375px) looks good
- [ ] Tablet layout (768px) looks good
- [ ] Desktop layout (1024px) looks good
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets are 44×44px minimum
- [ ] Text is readable at all sizes
- [ ] Images scale properly
- [ ] Navigation accessible at all breakpoints
- [ ] Tested on real devices

---

## Accessibility at Different Breakpoints

### Text Readability

```typescript
// Always maintain 16px+ on mobile for small text
// Larger breakpoints can go down to 14px
const accessibleText = css`
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 14px;  // Now acceptable
  }
`;
```

### Focus Management

Ensure focus indicators work at all sizes:

```typescript
const accessibleFocus = css`
  &:focus-visible {
    outline: 2px solid #0AA5FF;
    outline-offset: 2px;
  }

  // Works at all breakpoints
`;
```

### Zoom Support

Users may zoom up to 200%:

```typescript
// Test at: DevTools → Settings → Rendering → Emulate CSS media feature prefers-reduced-motion
// And use browser zoom 200%
```

---

## Mobile-First Development Tips

1. **Start with mobile styles** in the base CSS
2. **Add tablet styles** with min-width: 768px
3. **Add desktop styles** with min-width: 1024px
4. **Use max-width for max content width**, not min-width
5. **Avoid max-width media queries** (use min-width instead)

```typescript
// Good: Mobile-first
const styles = css`
  width: 100%;            // Mobile default
  font-size: 14px;

  @media (min-width: 768px) {
    max-width: 500px;     // Tablet
    font-size: 15px;
  }

  @media (min-width: 1024px) {
    max-width: 800px;     // Desktop
    font-size: 16px;
  }
`;

// Avoid: Desktop-first
const styles = css`
  @media (max-width: 1024px) {
    // Don't do this
  }
`;
```

---

## Related Documentation

- **DESIGN_SYSTEM.md** — Base component specifications
- **STATES_AND_VARIANTS.md** — Component states
- **ACCESSIBILITY.md** — A11y at all breakpoints
- **tokens.ts** — Responsive token definitions

---

**Last Updated**: November 4, 2025
**Version**: v1.1
**Approach**: Mobile-first
**Maintained By**: Design System Team
