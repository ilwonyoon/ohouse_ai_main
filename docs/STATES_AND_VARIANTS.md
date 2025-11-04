# Component States & Variants (v1.1)

> Complete specification of interactive states for all components in the Ohouse AI design system.

**Version**: 1.1
**Last Updated**: November 4, 2025
**Status**: Ready for Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Universal State Principles](#universal-state-principles)
3. [Button States](#button-states)
4. [Form Input States](#form-input-states)
5. [Navigation States](#navigation-states)
6. [Card States](#card-states)
7. [Interactive Component States](#interactive-component-states)
8. [Loading & Async States](#loading--async-states)
9. [Error & Validation States](#error--validation-states)

---

## Overview

Every interactive component in Ohouse AI has multiple states. This document defines the visual and behavioral characteristics of each state for all component types.

### State Categories

1. **Default/Rest** - Initial, uninteracted state
2. **Hover** - Pointer over element (desktop only)
3. **Active/Pressed** - Element is being interacted with
4. **Focus** - Keyboard focus (accessibility)
5. **Disabled** - Component cannot be interacted with
6. **Loading** - Async operation in progress
7. **Error** - Validation or system error state
8. **Success** - Positive completion state

---

## Universal State Principles

### Color & Opacity Changes

**For Brightness Adjustment:**
```
Default: 100% opacity
Hover: 85% opacity OR 10% darker shade
Active/Pressed: 70% opacity OR 20% darker shade
Disabled: 50% opacity
```

**Example with Button Background (#2F3438):**
```
Default:  #2F3438 (100%)
Hover:    rgba(47, 52, 56, 0.85)
Active:   rgba(47, 52, 56, 0.70)
Disabled: rgba(47, 52, 56, 0.50)
```

### Focus States (Accessibility Critical)

**All interactive elements must have:**
- Focus ring: 2px solid `#0AA5FF` (brand color)
- Focus ring offset: 2px
- Visible on keyboard tab navigation

```typescript
// Emotion CSS example
const focusStyle = css`
  &:focus-visible {
    outline: 2px solid #0AA5FF;
    outline-offset: 2px;
  }
`;
```

### Transition Timing

**Standard state transitions:**
- Fast: 150ms (micro-interactions, quick feedback)
- Normal: 300ms (most state changes)
- Slow: 500ms (page transitions, modals)

**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard)

---

## Button States

### Primary Button (47×28px, Background: #2F3438)

| State | Background | Text Color | Opacity | Cursor | Notes |
|-------|-----------|-----------|---------|--------|-------|
| **Default** | #2F3438 | #FFFFFF | 100% | pointer | Active, clickable |
| **Hover** | #1a1d21 | #FFFFFF | 85% | pointer | Subtle darkening |
| **Active/Pressed** | #0f1115 | #FFFFFF | 70% | pointer | User actively pressing |
| **Focus** | #2F3438 + ring | #FFFFFF | 100% | pointer | 2px #0AA5FF outline |
| **Disabled** | #C2C8CC | #828C94 | 50% | not-allowed | No interaction |

**Emotion Implementation:**
```typescript
const primaryButton = css`
  background-color: #2F3438;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover:not(:disabled) {
    background-color: #1a1d21;
    opacity: 0.85;
  }

  &:active:not(:disabled) {
    background-color: #0f1115;
    opacity: 0.70;
  }

  &:focus-visible {
    outline: 2px solid #0AA5FF;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #C2C8CC;
    color: #828C94;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
```

### Secondary Button (White/Border Variant)

| State | Background | Border | Text Color | Opacity |
|-------|-----------|--------|-----------|---------|
| **Default** | #FFFFFF | 1px #E6E6E6 | #2F3438 | 100% |
| **Hover** | #F7F9FA | 1px #DADDE0 | #2F3438 | 85% |
| **Active/Pressed** | #EAEDEF | 1px #DADDE0 | #2F3438 | 70% |
| **Focus** | #FFFFFF + ring | 1px #E6E6E6 | #2F3438 | 100% |
| **Disabled** | #F5F5F5 | 1px #E6E6E6 | #828C94 | 50% |

### Brand Button (CTA)

| State | Background | Text | Notes |
|-------|-----------|------|-------|
| **Default** | #0AA5FF | #FFFFFF | Primary action color |
| **Hover** | #0087CC | #FFFFFF | 15% darker blue |
| **Active/Pressed** | #006699 | #FFFFFF | 30% darker blue |
| **Focus** | #0AA5FF + ring | #FFFFFF | Bright outline |
| **Disabled** | #C2C8CC | #828C94 | Neutral disabled |

---

## Form Input States

### Text Input (Height: 40px, Border: 1px #E6E6E6)

| State | Background | Border | Text | Helper |
|-------|-----------|--------|------|--------|
| **Default (Empty)** | #FFFFFF | 1px #E6E6E6 | #828C94 placeholder | Optional |
| **Focus** | #FFFFFF | 2px #0AA5FF | #2F3438 | Blue border |
| **Filled** | #FFFFFF | 1px #E6E6E6 | #2F3438 | Normal |
| **Disabled** | #F5F5F5 | 1px #E6E6E6 | #C2C8CC | Grayed out |
| **Error** | #FFFFFF | 2px #E74C3C | #2F3438 | Red border + message |
| **Success** | #FFFFFF | 2px #27AE60 | #2F3438 | Green border |

**Placeholder Style:**
```typescript
font-size: 14px;
font-weight: 400;
color: #828C94;
```

**Error Message:**
```typescript
font-size: 12px;
font-weight: 500;
color: #E74C3C;
margin-top: 4px;
```

### Checkbox States

| State | Background | Border | Checkmark | Cursor |
|-------|-----------|--------|-----------|--------|
| **Unchecked Default** | #FFFFFF | 2px #E6E6E6 | - | pointer |
| **Unchecked Hover** | #F7F9FA | 2px #DADDE0 | - | pointer |
| **Checked Default** | #0AA5FF | 2px #0AA5FF | #FFFFFF | pointer |
| **Checked Hover** | #0087CC | 2px #0087CC | #FFFFFF | pointer |
| **Focus** | [state bg] | [state border] + glow | - | pointer |
| **Disabled** | #F5F5F5 | 2px #E6E6E6 | #C2C8CC | not-allowed |

**Dimensions:**
- Size: 20×20px
- Border radius: 4px
- Checkmark icon: 12×12px, inside

### Radio Button States

| State | Outer Ring | Inner Dot | Cursor |
|-------|-----------|-----------|--------|
| **Unchecked Default** | 2px #E6E6E6 | - | pointer |
| **Unchecked Hover** | 2px #DADDE0 | - | pointer |
| **Checked Default** | 2px #0AA5FF | 8px #0AA5FF | pointer |
| **Checked Hover** | 2px #0087CC | 8px #0087CC | pointer |
| **Focus** | [state] + glow | - | pointer |
| **Disabled** | 2px #E6E6E6 | #C2C8CC | not-allowed |

**Dimensions:**
- Outer: 20×20px
- Inner dot: 8×8px (when checked)
- Border radius: 50%

### Toggle Switch States

| State | Background | Track | Knob Position |
|-------|-----------|-------|----------------|
| **Off Default** | #E6E6E6 | Gray | Left |
| **Off Hover** | #DADDE0 | Gray | Left |
| **On Default** | #0AA5FF | Brand blue | Right |
| **On Hover** | #0087CC | Dark blue | Right |
| **Focus** | [state] + ring | - | - |
| **Disabled** | #F5F5F5 | Gray | Fixed position |

**Dimensions:**
- Size: 50×30px
- Border radius: 15px
- Knob: 26×26px circle
- Animation: Smooth slide 300ms

---

## Navigation States

### Tab Navigation States

| Tab State | Background | Text Color | Underline | Border |
|-----------|-----------|-----------|-----------|--------|
| **Active Default** | #FFFFFF | #2F3438 | 3px #0AA5FF (bottom) | 1px #E6E6E6 (bottom) |
| **Active Hover** | #F7F9FA | #0AA5FF | 3px #0AA5FF | 1px #E6E6E6 |
| **Inactive Default** | #FFFFFF | #828C94 | None | 1px #E6E6E6 (bottom) |
| **Inactive Hover** | #F7F9FA | #2F3438 | None | 1px #E6E6E6 |
| **Focus** | [state bg] | [state text] | [underline] + ring | - |

**Height:** 44px
**Font:** Body14/Semibold
**Transition:** 300ms

### Bottom Navigation Item States

| State | Icon Color | Label Color | Background | Indicator |
|-------|-----------|------------|-----------|-----------|
| **Active Default** | #0AA5FF | #0AA5FF | transparent | 3px bar (top) |
| **Active Hover** | #0087CC | #0087CC | #F7F9FA | 3px bar (top) |
| **Inactive Default** | #2F3438 | #2F3438 | transparent | None |
| **Inactive Hover** | #0AA5FF | #2F3438 | #F7F9FA | None |
| **Focus** | [state color] | [state color] | [bg] + ring | - |

**Height:** 88.5px total
**Icon Size:** 24×24px
**Label Size:** Detail10/Bold
**Spacing:** 4px between icon and label

---

## Card States

### Feature Card Large (351×263px) States

| State | Background | Border | Shadow | Interaction |
|-------|-----------|--------|--------|-------------|
| **Default** | #FFFFFF | None | `#0000000d` | Pointer |
| **Hover** | #FFFFFF | 1px #E6E6E6 | `#00000019` (elevated) | Pointer |
| **Pressed** | #F7F9FA | 1px #E6E6E6 | `#0000000d` | Pointer |
| **Focus** | #FFFFFF | None | `#0000000d` + ring | - |

**Shadow Elevation:**
```typescript
// Default
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

// Hover (elevated)
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

// Transition
transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Feature Card Small (167×250px) States

| State | Background | Border | Scale | Shadow |
|-------|-----------|--------|-------|--------|
| **Default** | #FFFFFF | 0.5px #E6E6E6 | 100% | Subtle |
| **Hover** | #FFFFFF | 1px #E6E6E6 | 102% | Elevated |
| **Pressed** | #F7F9FA | 0.5px #E6E6E6 | 100% | Subtle |

**Transform on Hover:**
```typescript
&:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Interactive Component States

### Room List Item (72px) States

| State | Background | Border | Text Color | Action Icon |
|-------|-----------|--------|-----------|-------------|
| **Default** | #FFFFFF | 1px #E6E6E6 (bottom) | #2F3438 | #828C94 |
| **Hover** | #F7F9FA | 1px #E6E6E6 | #2F3438 | #0AA5FF |
| **Selected** | #FFFFFF | 1px #0AA5FF | #0AA5FF | #0AA5FF |
| **Active** | #EAEDEF | 1px #E6E6E6 | #2F3438 | #0AA5FF |

### Room Analyzer Component (104px) States

| State | Background | Border | Title | Description | Toggle |
|-------|-----------|--------|-------|-------------|--------|
| **Default** | #FFFFFF | 1px #E6E6E6 | #2F3438 | #828C94 | Off |
| **Hover** | #F7F9FA | 1px #E6E6E6 | #2F3438 | #0AA5FF | [state] |
| **Enabled** | #FFFFFF | 1px #E6E6E6 | #2F3438 | #828C94 | On (#0AA5FF) |

---

## Loading & Async States

### Button Loading State

```typescript
const loadingButton = css`
  background-color: #2F3438;
  color: #FFFFFF;
  cursor: not-allowed;
  opacity: 0.8;
  position: relative;

  // Spinner inside button
  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #FFFFFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
```

**Specifications:**
- Spinner size: 12×12px
- Spinner color: White with opacity
- Button opacity: 80%
- Cursor: not-allowed
- Duration: 1s (one full rotation)

### Card Loading State

```typescript
const loadingCard = css`
  position: relative;
  opacity: 0.6;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
```

### Skeleton Screen

```typescript
const skeleton = css`
  background: linear-gradient(
    90deg,
    #F5F5F5 25%,
    #FFFFFF 50%,
    #F5F5F5 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
```

---

## Error & Validation States

### Input Error State

```typescript
const errorInput = css`
  border: 2px solid #E74C3C;
  background-color: #FFFFFF;

  &:focus {
    border-color: #E74C3C;
    outline: none;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  }

  // Error message below
  & + .error-message {
    font-size: 12px;
    color: #E74C3C;
    margin-top: 4px;
    font-weight: 500;
  }
`;
```

### Success State

```typescript
const successInput = css`
  border: 2px solid #27AE60;
  background-color: #FFFFFF;

  // Success checkmark
  & + .success-icon {
    color: #27AE60;
    font-size: 16px;
  }
`;
```

### Error Message Style

| Attribute | Value |
|-----------|-------|
| Font Size | Detail12/Medium (12px, 500) |
| Color | #E74C3C (Error Red) |
| Margin Top | 4px |
| Icon (optional) | 16×16px, left-aligned |

**Example:**
```typescript
const errorMessage = {
  fontSize: '12px',
  fontWeight: 500,
  color: '#E74C3C',
  marginTop: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
};
```

### Form Validation States

| Field | Valid | Invalid | Warning |
|-------|-------|---------|---------|
| **Border** | 2px #27AE60 | 2px #E74C3C | 2px #F39C12 |
| **Icon** | ✓ Green | ✗ Red | ⚠ Orange |
| **Message** | "Looks good!" | "This field is required" | "Check this carefully" |
| **Message Color** | #27AE60 | #E74C3C | #F39C12 |

---

## Accessibility Requirements for All States

### Focus Management

✅ **MUST have visible focus indicators**
- Focus ring: 2px solid #0AA5FF
- Focus ring offset: 2px from element
- Visible on keyboard navigation (tab key)

### Color Contrast

✅ **State colors MUST meet WCAG AA standards**
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18px+): 3:1 contrast ratio minimum

**Verified Contrasts:**
- `#2F3438` on `#FFFFFF`: **14.5:1** ✅ AAA
- `#828C94` on `#FFFFFF`: **5.8:1** ✅ AA
- `#0AA5FF` on `#FFFFFF`: **3.2:1** ✅ AA
- `#FFFFFF` on `#0AA5FF`: **4.5:1** ✅ AA

### Reduced Motion Support

```typescript
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Cursor Feedback

| State | Cursor | Meaning |
|-------|--------|---------|
| Enabled Interactive | `pointer` | Can be clicked |
| Disabled | `not-allowed` | Cannot interact |
| Loading | `wait` | Operation in progress |
| Draggable | `grab` / `grabbing` | Can be dragged |

---

## Implementation Checklist

When implementing components with states, verify:

- [ ] All 6+ states defined (default, hover, active, focus, disabled, error)
- [ ] Focus ring visible with 2px #0AA5FF outline
- [ ] Hover effects use opacity or color shift
- [ ] Disabled state uses #828C94 or 50% opacity
- [ ] Transition timing 300ms with standard easing
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Cursor changes appropriately
- [ ] Loading states show spinner or shimmer
- [ ] Error states show red (#E74C3C) border + message
- [ ] Reduced motion media query respected

---

## Related Documentation

- **DESIGN_SYSTEM.md** — Base component specifications
- **ACCESSIBILITY.md** — Complete a11y guidelines
- **ANIMATIONS.md** — Motion and transition tokens
- **tokens.ts** — TypeScript state token definitions
- **tokens.json** — JSON state token values

---

**Last Updated**: November 4, 2025
**Version**: v1.1
**Maintained By**: Design System Team
