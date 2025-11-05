# Animation & Motion Design Tokens (v1.1)

> Specification of motion, duration, easing, and transition patterns for Ohouse AI design system.

**Version**: 1.1
**Last Updated**: November 4, 2025
**Status**: Ready for Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Motion Principles](#motion-principles)
3. [Duration Tokens](#duration-tokens)
4. [Easing Functions](#easing-functions)
5. [Transition Patterns](#transition-patterns)
6. [Micro-interactions](#micro-interactions)
7. [Page Transitions](#page-transitions)
8. [Loading States](#loading-states)
9. [Accessibility (Reduced Motion)](#accessibility-reduced-motion)

---

## Overview

Motion in Ohouse AI serves three purposes:
1. **Feedback** — Confirm user actions
2. **Communication** — Guide attention to important elements
3. **Polish** — Create a polished, professional feel

All animations respect user preferences (prefers-reduced-motion).

### Animation Principles

✅ **Purpose-driven** — Every animation has a reason
✅ **Performant** — Use GPU-accelerated properties (transform, opacity)
✅ **Respectful** — Respect `prefers-reduced-motion` media query
✅ **Accessible** — Don't distract from content or a11y
✅ **Consistent** — Use standard durations and easings

---

## Motion Principles

### Ebbinghaus Curve

Ohouse AI uses motion that feels natural and alive:

1. **Ease-out for incoming** — Elements entering feel light and settling
2. **Ease-in for outgoing** — Elements leaving feel natural
3. **Ease-in-out for continuous** — Smooth, predictable motion

### Speed & Weight

- **Fast & Light** — Micro-interactions, feedback
- **Medium & Balanced** — Component state changes
- **Slow & Heavy** — Page transitions, modals

---

## Duration Tokens

### Standard Duration Scale

```typescript
// Micro-interactions (buttons, hovers)
const DURATION_FAST = 150; // milliseconds

// Component state changes (tabs, visibility)
const DURATION_NORMAL = 300; // milliseconds

// Page transitions, modals
const DURATION_SLOW = 500; // milliseconds

// Long animations (carousels, scrolling)
const DURATION_SLOWER = 800; // milliseconds
```

### When to Use Each Duration

| Duration | Use Case | Example |
|----------|----------|---------|
| **150ms** | Button feedback, hover effects | Opacity change, color shift |
| **300ms** | Component state, visibility | Tab switch, card transform |
| **500ms** | Page entry, modal appear | Bottom sheet slide up |
| **800ms** | Carousel, complex animations | Multi-step animations |
| **1000ms+** | Very slow reveals | Page load animations |

**Rule of Thumb:**
- Keep animations under 300ms for micro-interactions
- Never exceed 1000ms unless specifically designed
- Most animations should be 300ms

---

## Easing Functions

### Standard Easing

```typescript
// Material Design standard easing
const EASING_STANDARD = 'cubic-bezier(0.4, 0, 0.2, 1)';

// For entrances (ease-out style)
const EASING_ENTRANCE = 'cubic-bezier(0, 0, 0.2, 1)';

// For exits (ease-in style)
const EASING_EXIT = 'cubic-bezier(0.4, 0, 1, 1)';

// For interactive/playful transitions
const EASING_INTERACTIVE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
```

### Bezier Curve Breakdown

**Standard (0.4, 0, 0.2, 1):**
```
Fast at start → Slow at end (ease-out feel)
Best for: Most component interactions
Visual: Bouncy but controlled
```

**Entrance (0, 0, 0.2, 1):**
```
Slow start → Fast middle → Slow end (symmetric ease-out)
Best for: Elements appearing
Visual: Smooth entrance
```

**Exit (0.4, 0, 1, 1):**
```
Fast start → Slow end (strong ease-in)
Best for: Elements disappearing
Visual: Heavy exit
```

**Interactive (0.34, 1.56, 0.64, 1):**
```
Bouncy, playful curve (slight overshoot)
Best for: Delightful interactions
Visual: Fun, snappy
```

### CSS Implementation

```css
/* Standard easing - use by default */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Entrance animation */
animation: slideUp 500ms cubic-bezier(0, 0, 0.2, 1);

/* Exit animation */
animation: slideDown 300ms cubic-bezier(0.4, 0, 1, 1);

/* Playful button press */
transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Transition Patterns

### Property-Specific Transitions

**For Best Performance, animate only:**
- `opacity` — Fade in/out
- `transform` — Move, scale, rotate
- Avoid: `width`, `height`, `left`, `top` (triggers layout recalculation)

### Color Transitions

```typescript
// Smoothly transition colors
const colorTransition = css`
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
              color 300ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;
```

### Shadow Transitions

```typescript
// Smooth shadow elevation
const shadowTransition = css`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;
```

### Combined Transition

```typescript
// Multiple properties with appropriate timings
const cardHover = css`
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1),
              background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    background-color: #F7F9FA;
  }
`;
```

---

## Micro-interactions

### Button Click Feedback

**Duration:** 150ms
**Easing:** Interactive
**Property:** transform, opacity

```typescript
const buttonClick = css`
  transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.96);
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid #0AA5FF;
    outline-offset: 2px;
  }
`;
```

### Button Hover Lift

**Duration:** 300ms
**Easing:** Standard
**Property:** transform, box-shadow

```typescript
const buttonHover = css`
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
```

### Ripple Effect (Touch Feedback)

```typescript
const rippleAnimation = css`
  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 0.6;
    }
    100% {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }

  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    animation: ripple 600ms ease-out;
  }
`;
```

### Icon Spin Loading

**Duration:** 1000ms (full rotation)
**Easing:** linear
**Property:** transform (rotate)

```typescript
const spinAnimation = css`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s linear infinite;
`;
```

### Pulse Animation (Attention)

**Duration:** 2000ms
**Easing:** ease-in-out
**Property:** opacity, transform

```typescript
const pulseAnimation = css`
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  animation: pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;
```

### Fade In

**Duration:** 300ms
**Easing:** Entrance
**Property:** opacity

```typescript
const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeIn 300ms cubic-bezier(0, 0, 0.2, 1) forwards;
`;
```

### Slide Up

**Duration:** 500ms
**Easing:** Entrance
**Property:** transform (translateY), opacity

```typescript
const slideUp = css`
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: slideUp 500ms cubic-bezier(0, 0, 0.2, 1) forwards;
`;
```

### Slide In From Right

**Duration:** 300ms
**Easing:** Standard
**Property:** transform (translateX), opacity

```typescript
const slideInRight = css`
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  animation: slideInRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;
```

### Scale & Fade (Modal Entry)

**Duration:** 300ms
**Easing:** Entrance
**Property:** transform, opacity

```typescript
const scaleIn = css`
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  animation: scaleIn 300ms cubic-bezier(0, 0, 0.2, 1) forwards;
`;
```

---

## Page Transitions

### Full Page Fade

```typescript
const pageTransitionFade = css`
  @keyframes fadeInPage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeInPage 500ms cubic-bezier(0, 0, 0.2, 1);
`;
```

### Route Slide (Left to Right)

```typescript
const routeTransition = css`
  @keyframes slideFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  animation: slideFromRight 500ms cubic-bezier(0.4, 0, 0.2, 1);
`;
```

### Content Area Stagger

When revealing multiple items (cards, list items):

```typescript
const staggerAnimation = css`
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // First item: 0ms
  // Second item: 100ms
  // Third item: 200ms
  // etc.

  animation: slideUp 300ms cubic-bezier(0, 0, 0.2, 1) forwards;

  @for $i from 1 to 10 {
    &:nth-child(#{$i}) {
      animation-delay: calc(#{$i - 1} * 100ms);
    }
  }
`;
```

---

## Loading States

### Shimmer Animation

**Duration:** 1500ms
**Easing:** linear
**Property:** background-position

```typescript
const shimmerAnimation = css`
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  background: linear-gradient(
    90deg,
    #f5f5f5 0%,
    #ffffff 50%,
    #f5f5f5 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 1.5s linear infinite;
`;
```

### Pulse Loading

```typescript
const pulseLoading = css`
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
```

### Wave Animation (Carousel, Progress)

```typescript
const waveAnimation = css`
  @keyframes wave {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(4px);
    }
  }

  animation: wave 600ms ease-in-out infinite;
`;
```

---

## Accessibility (Reduced Motion)

### Always Respect User Preferences

```typescript
// Media query that respects user's motion preference
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Implementation in Components

```typescript
import { css } from '@emotion/react';

const animatedButton = css`
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;
```

### Recommended Approach

Define animations, but allow users to disable them:

```typescript
// Safe pattern - animations enabled by default, user can disable
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animated {
  animation: slideUp 500ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Animation Reference Guide

### Quick Lookup

| Effect | Duration | Easing | Property | Code |
|--------|----------|--------|----------|------|
| Button press | 150ms | Interactive | transform | `scale(0.96)` |
| Button hover | 300ms | Standard | shadow, transform | `lift 2px` |
| Color change | 300ms | Standard | color, bg | fade |
| Fade in | 300ms | Entrance | opacity | `0 → 1` |
| Slide up | 500ms | Entrance | transform-Y | `20px → 0` |
| Page transition | 500ms | Standard | opacity, transform | slide + fade |
| Spin loader | 1000ms | linear | transform | `rotate(360deg)` |
| Shimmer | 1500ms | linear | bg-position | wave |
| Pulse | 2000ms | ease-in-out | opacity, transform | `0.8 ↔ 1.0` |

---

## Component Animation Examples

### Card Hover Animation

```typescript
const cardHover = css`
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
`;
```

### Tab Switch Animation

```typescript
const tabIndicator = css`
  @keyframes underlineSlide {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 100%;
      opacity: 1;
    }
  }

  animation: underlineSlide 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;
```

### Modal Appear Animation

```typescript
const modalEnter = css`
  @keyframes modalScaleIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  animation: modalScaleIn 300ms cubic-bezier(0, 0, 0.2, 1);
`;
```

---

## Performance Tips

✅ **Use GPU-accelerated properties:**
```
- transform: translate, scale, rotate
- opacity
- filter
```

❌ **Avoid layout-triggering properties:**
```
- width, height, margin, padding
- left, top, right, bottom
- display, position
```

✅ **Use will-change sparingly:**
```typescript
.animated-element {
  will-change: transform, opacity;
  animation: slideUp 500ms ease-out;
}

// Remove after animation
.animated-element {
  will-change: auto;
}
```

---

## Testing Animations

### Test Accessibility

```typescript
// Test prefers-reduced-motion
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
  // User prefers reduced motion - disable animations
}
```

### Visual Regression Testing

- Capture state frames at 0%, 50%, 100% of animation
- Verify smooth motion with 60 FPS
- Test on low-end devices

---

## Animation Checklist

When implementing animations, verify:

- [ ] Duration is 150ms, 300ms, 500ms, or 800ms
- [ ] Easing is one of: Standard, Entrance, Exit, or Interactive
- [ ] Only animates transform or opacity
- [ ] Respects `prefers-reduced-motion`
- [ ] No animations exceed 1000ms
- [ ] Smooth at 60 FPS on mobile
- [ ] Has fallback for browsers without animation support
- [ ] Purpose is clear (feedback, guidance, polish)

---

## Related Documentation

- **STATES_AND_VARIANTS.md** — Component state transitions
- **DESIGN_SYSTEM.md** — Component specifications
- **ACCESSIBILITY.md** — Full a11y guidelines
- **tokens.ts** — Animation token exports

---

**Last Updated**: November 4, 2025
**Version**: v1.1
**Maintained By**: Design System Team
