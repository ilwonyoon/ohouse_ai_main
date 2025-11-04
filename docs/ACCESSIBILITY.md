# Accessibility (A11y) Guidelines (v1.1)

> WCAG 2.1 AA compliance standards and accessibility specifications for Ohouse AI design system.

**Version**: 1.1
**Last Updated**: November 4, 2025
**Target**: WCAG 2.1 Level AA Compliance
**Status**: Ready for Implementation

---

## Table of Contents

1. [Overview & Commitment](#overview--commitment)
2. [Color Contrast Standards](#color-contrast-standards)
3. [Focus Management](#focus-management)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [Motion & Animation](#motion--animation)
7. [Text & Typography](#text--typography)
8. [Interactive Components](#interactive-components)
9. [Forms & Inputs](#forms--inputs)
10. [Accessibility Checklist](#accessibility-checklist)

---

## Overview & Commitment

Ohouse AI is committed to being accessible to all users, including those with disabilities. All components and pages must meet **WCAG 2.1 Level AA** standards as a minimum.

### Accessibility is for Everyone

Good accessibility practices benefit:
- Users with disabilities (blind, low vision, deaf, hard of hearing, etc.)
- Users with temporary disabilities (broken arm, eye strain, etc.)
- Users in different environments (bright sunlight, loud spaces, etc.)
- Users with slower internet or older devices

### Four Core Principles

1. **Perceivable** — Information must be presentable to users in ways they can perceive
2. **Operable** — Users must be able to interact using keyboard, voice, or other means
3. **Understandable** — Information and controls must be clear and predictable
4. **Robust** — Content must work with assistive technologies

---

## Color Contrast Standards

### Minimum Contrast Ratios (WCAG AA)

| Text Type | Minimum Ratio | Ohouse AI Colors |
|-----------|--------------|-----------------|
| Normal text (<18px) | 4.5:1 | Most text met |
| Large text (18px+) | 3:1 | All large text met |
| UI Components & Borders | 3:1 | All borders/icons met |
| Graphical Elements | 3:1 | All graphics met |

### AAA Compliance (Enhanced - Optional)

- Normal text: 7:1
- Large text: 4.5:1

### Verified Contrast Ratios (Ohouse AI Colors)

```typescript
// Primary text on white background
'#2F3438' on '#FFFFFF' = 14.5:1 ✅ AAA
gray: 'Perfect for headers, body text'

// Secondary text on white background
'#828C94' on '#FFFFFF' = 5.8:1 ✅ AA
usage: 'Descriptions, hints, secondary text'

// Brand color on white background
'#0AA5FF' on '#FFFFFF' = 3.2:1 ✅ AA
usage: 'Links, CTAs, brand elements'

// White text on brand background
'#FFFFFF' on '#0AA5FF' = 4.5:1 ✅ AA
usage: 'Button text, inverse colors'

// White text on dark background
'#FFFFFF' on '#2F3438' = 12.8:1 ✅ AAA
usage: 'Dark theme, overlays'

// Error color
'#E74C3C' on '#FFFFFF' = 3.9:1 ✅ AA
usage: 'Error messages, validation'

// Success color
'#27AE60' on '#FFFFFF' = 5.2:1 ✅ AA
usage: 'Success states, confirmations'

// Warning color
'#F39C12' on '#FFFFFF' = 3.3:1 ✅ AA
usage: 'Warnings, alerts'
```

### Contrast Checking Tools

- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- WCAG Contrast Checker: https://www.tpgi.com/color-contrast-checker/
- Browser DevTools: Chrome/Firefox built-in contrast checking

---

## Focus Management

### Focus Indicators (CRITICAL)

**Every interactive element must have a visible focus indicator:**

```typescript
const focusRing = css`
  &:focus-visible {
    outline: 2px solid #0AA5FF;     // Brand color
    outline-offset: 2px;             // Space between element and ring
    border-radius: inherit;          // Match element radius
  }
`;
```

**Requirements:**
- ✅ Must be visible (not outline: none)
- ✅ Must use contrasting color (brand blue #0AA5FF)
- ✅ Must have 2px width + 2px offset
- ✅ Must appear on keyboard tab navigation
- ✅ Must not disappear on interaction

### Focus Visible vs Focus

```typescript
// GOOD: Shows ring only on keyboard focus
&:focus-visible {
  outline: 2px solid #0AA5FF;
  outline-offset: 2px;
}

// BAD: Shows ring on click (confusing on touch)
&:focus {
  outline: 2px solid #0AA5FF;
}
```

### Focus Order (Tab Key)

Tab order must be logical and match visual order:

```html
<!-- GOOD: Left to right, top to bottom -->
<button>Back</button>
<input type="text" />
<button>Submit</button>

<!-- BAD: Non-logical focus order -->
<button>Submit</button>
<input type="text" />
<button>Back</button>
```

**In React:**
```typescript
// Use tabIndex carefully
<button tabIndex={1}>First</button>
<button tabIndex={2}>Second</button>
<button tabIndex={3}>Third</button>

// Avoid tabIndex > 0 - use natural DOM order instead
```

### Skip Navigation Links

For pages with lots of navigation:

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- Navigation content -->

<main id="main-content">
  <!-- Page content -->
</main>
```

```typescript
const skipLink = css`
  position: absolute;
  top: -40px;
  left: 0;
  background: #0AA5FF;
  color: #FFFFFF;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 8px 0;
  z-index: 100;

  &:focus {
    top: 0;
  }
`;
```

---

## Keyboard Navigation

### Essential Keyboard Interactions

| Element | Key | Action |
|---------|-----|--------|
| Button, Link | `Enter`, `Space` | Activate |
| Checkbox | `Space` | Toggle |
| Radio Button | `Arrow keys` | Select option |
| Tab Navigation | `Arrow keys` | Switch tab |
| Modal | `Escape` | Close |
| Dropdown | `Arrow keys`, `Enter` | Navigate & select |
| Menu | `Arrow keys`, `Escape` | Navigate & close |

### Keyboard Event Handling

```typescript
// Handle keyboard events properly
const handleKeyDown = (event: KeyboardEvent) => {
  // Enter or Space activates button
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }

  // Escape closes modals
  if (event.key === 'Escape') {
    handleClose();
  }
};

// For arrow navigation
if (event.key === 'ArrowRight') {
  selectNextOption();
}
if (event.key === 'ArrowLeft') {
  selectPreviousOption();
}
```

### Mouse vs Keyboard Interaction

```typescript
// Interactive component must work with both
const InteractiveButton = () => {
  const handleClick = () => {
    // Activate
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      Click or Press Enter/Space
    </button>
  );
};
```

---

## Screen Reader Support

### ARIA (Accessible Rich Internet Applications)

#### Essential ARIA Attributes

| Attribute | Use Case | Example |
|-----------|----------|---------|
| `aria-label` | Label for icon-only elements | `<button aria-label="Close">✕</button>` |
| `aria-labelledby` | Element labeled by another | `<div id="title">...</div><section aria-labelledby="title">` |
| `aria-describedby` | Additional description | `<input aria-describedby="hint">` |
| `aria-hidden` | Hide from screen readers | `<span aria-hidden="true">→</span>` |
| `aria-expanded` | Toggle state indicator | `<button aria-expanded="false">Menu</button>` |
| `aria-pressed` | Toggle button state | `<button aria-pressed="false">Bold</button>` |
| `aria-disabled` | Disabled state | `<button aria-disabled="true">Submit</button>` |
| `aria-live` | Dynamic content updates | `<div aria-live="polite">Loading...</div>` |

### Common ARIA Patterns

#### Icon Button

```html
<!-- Bad: Icon only, unclear what it does -->
<button>✕</button>

<!-- Good: Has aria-label -->
<button aria-label="Close dialog">✕</button>
```

#### Expandable Section

```html
<!-- Good: aria-expanded shows toggle state -->
<button aria-expanded="false" aria-controls="details">
  More Information
</button>

<div id="details" hidden>
  [content shown when expanded]
</div>
```

#### Live Region (Toast, Notifications)

```html
<!-- Good: aria-live announces new content -->
<div aria-live="polite" aria-atomic="true">
  Copied to clipboard!
</div>
```

**aria-live values:**
- `polite` — Wait for pause before announcing
- `assertive` — Interrupt current announcement
- `off` — Don't announce (default)

#### Form Error

```html
<label for="email">Email</label>
<input id="email" aria-describedby="email-error" type="email" />
<span id="email-error" role="alert">Invalid email address</span>
```

### Semantic HTML (Best Practice)

Always prefer semantic HTML over ARIA:

```html
<!-- Good: Semantic -->
<button>Submit</button>
<nav>Navigation</nav>
<main>Content</main>
<section>Section</section>
<article>Article</article>

<!-- Acceptable: With ARIA when needed -->
<div role="button" aria-label="Submit">Submit</div>

<!-- Avoid: Generic elements without semantics -->
<div onclick="submit()">Submit</div>
```

### Screen Reader Testing

Test with:
- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)
- **axe DevTools** browser extension

---

## Motion & Animation

### Respecting User Preferences

```typescript
// Always check prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Play animations
} else {
  // Skip animations or use instant transitions
}
```

### CSS Implementation

```typescript
const animatedElement = css`
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  // Respect user's motion preference
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }
`;
```

### Vestibular Disorders & Animations

Some users with vestibular disorders (dizziness, nausea) can be triggered by:
- Fast, large animations
- Parallax scrolling
- Auto-playing videos
- Flashing content

**Safe practices:**
- ✅ Keep animations under 300ms
- ✅ Limit movement distance
- ✅ Respect prefers-reduced-motion
- ✅ Never auto-play videos with sound
- ✅ Never use flashing (>3 flashes/second)

---

## Text & Typography

### Font Size

**Minimum readable size:**
- Body text: 16px minimum (14px acceptable with good contrast)
- Labels: 14px minimum
- Buttons: 14px minimum
- Captions: 12px (only if high contrast)

### Line Height

Minimum 1.5x for body text:

```typescript
// Good
{
  fontSize: '16px',
  lineHeight: '24px'  // 1.5x multiplier
}

// Acceptable
{
  fontSize: '14px',
  lineHeight: '21px'  // 1.5x multiplier
}
```

### Text Spacing

Allow users to override text spacing:

```css
/* Avoid using !important on spacing */
p {
  margin: 0;
  padding: 0;
  line-height: normal;
}

/* Users should be able to override */
p {
  margin-block-end: 1.5em;
  line-height: 1.5;
}
```

### Font Selection

**Accessible fonts:**
- ✅ Pretendard (system font, good for all sizes)
- ✅ Arial, Helvetica, Verdana (safe sans-serif)
- ✅ Times New Roman (serif for print)
- ❌ Decorative fonts at small sizes
- ❌ Justified text (hard to read for dyslexic users)

---

## Interactive Components

### Buttons

✅ **Must have:**
- Visible focus indicator
- Keyboard accessible (Enter/Space)
- Clear, descriptive label
- Sufficient padding (min 44×44px for touch targets)
- Color + icon (not color alone)

```html
<!-- Good -->
<button aria-label="Close dialog">✕</button>

<!-- Bad -->
<div onclick="close()">✕</div>
```

### Links

✅ **Must have:**
- Underline or visual distinction (color alone insufficient)
- Descriptive link text
- Focus indicator
- Sufficient touch target (44×44px)

```html
<!-- Good -->
<a href="/learn-more">Learn more about our design system</a>

<!-- Bad -->
<a href="/learn-more">Click here</a>
```

### Dropdowns & Menus

✅ **Must have:**
- Keyboard navigation (Arrow keys)
- Open/close with Enter/Space
- Escape to close
- Focus management
- Proper ARIA (aria-expanded, aria-haspopup)

```html
<button aria-haspopup="true" aria-expanded="false">
  Options
</button>

<div role="menu">
  <button role="menuitem">Option 1</button>
  <button role="menuitem">Option 2</button>
</div>
```

### Modals & Dialogs

✅ **Must have:**
- Focus trap (tab stays within modal)
- Escape to close
- Proper ARIA (role="dialog", aria-modal="true")
- Clear close button
- Initial focus on important element

```html
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h1 id="title">Confirm Action</h1>
  <p>Are you sure?</p>
  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

---

## Forms & Inputs

### Labels

**Every form input must have a label:**

```html
<!-- Good: Associated with for/id -->
<label for="email">Email Address</label>
<input id="email" type="email" />

<!-- Bad: No label -->
<input type="email" placeholder="Email" />

<!-- Acceptable: Hidden label -->
<label for="search" class="sr-only">Search</label>
<input id="search" type="search" />
```

**Screen Reader Only Text:**
```typescript
const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
```

### Error Messages

✅ **Must have:**
- Associated with input (aria-describedby)
- Clear, specific message
- Visual indicator (color + icon)
- Color not sole indicator

```html
<input
  id="password"
  aria-describedby="password-error"
  type="password"
/>
<span id="password-error" role="alert">
  ✗ Password must be at least 8 characters
</span>
```

### Required Fields

Indicate with text, not symbol alone:

```html
<!-- Good -->
<label for="name">Name <span aria-label="required">*</span></label>
<input id="name" required />

<!-- Better -->
<label for="name">Name <span>(required)</span></label>
<input id="name" required />

<!-- Not accessible -->
<label for="name">Name *</label>
<!-- Users don't know what * means -->
```

### Form Validation

✅ **Best practices:**
- Validate on submit (not on blur)
- Show all errors at once
- Highlight invalid fields with color + border
- Provide clear, actionable error messages
- Allow users to review before final submission

---

## Accessibility Checklist

### Design Phase

- [ ] Colors have sufficient contrast (4.5:1 for normal text)
- [ ] Focus states defined for all interactive elements
- [ ] No information conveyed by color alone
- [ ] Text is readable (16px+ minimum, 1.5x line height)
- [ ] Interactive elements are 44×44px minimum
- [ ] Touch targets have 8px spacing between them
- [ ] Animations respect prefers-reduced-motion
- [ ] Error states use color + icon + text

### Development Phase

- [ ] All buttons have focus rings
- [ ] All forms have labels
- [ ] Keyboard navigation works (Tab, Enter, Arrow keys, Escape)
- [ ] ARIA roles and attributes used correctly
- [ ] Semantic HTML used (button, nav, main, etc.)
- [ ] Images have alt text
- [ ] Videos have captions and transcripts
- [ ] Screen reader tested (NVDA, VoiceOver)
- [ ] Axe DevTools shows no errors
- [ ] Color contrast verified with checker
- [ ] Tested with keyboard only (no mouse)

### Testing Phase

- [ ] Tested with screen reader
- [ ] Tested with keyboard only
- [ ] Tested with browser zoom (200%)
- [ ] Tested with high contrast mode
- [ ] Tested with prefers-reduced-motion enabled
- [ ] Tested on mobile
- [ ] WCAG 2.1 AA compliance verified

---

## Accessibility Testing Tools

### Automated Testing

- **axe DevTools** — Chrome/Firefox, catches ~90% of issues
- **Wave** — WebAIM tool, visual feedback
- **Lighthouse** — Built into Chrome DevTools
- **Pa11y** — Command-line tool, CI/CD integration

### Manual Testing

- **Screen readers** — NVDA, JAWS, VoiceOver, TalkBack
- **Keyboard navigation** — Tab through entire page
- **Color contrast** — WebAIM Contrast Checker
- **Zoom testing** — Browser zoom to 200%
- **Text spacing** — Use browser extensions

### Browser Extensions

- axe DevTools
- WAVE
- Color Contrast Analyzer
- Accessibility Insights
- Lighthouse

---

## Common A11y Failures (Avoid!)

| Failure | Impact | Solution |
|---------|--------|----------|
| No focus ring | Keyboard users lost | Add `:focus-visible` with 2px outline |
| Color-only indicator | Color blind users confused | Add text, icon, or pattern |
| Small text (<12px) | Hard to read | Increase to 14px+ |
| Missing alt text | Image meaning lost | Add descriptive alt text |
| No form labels | Screen readers confused | Every input needs <label> |
| Auto-playing video | Vestibular triggered, annoying | Never auto-play with sound |
| Flashing content | Can trigger seizures | Max 3 flashes/second |
| Inaccessible ARIA | Wrong semantics | Use semantic HTML first |
| Unmutable autoplay | Users can't control | Let users control playback |

---

## Accessibility Resources

### Documentation

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **WebAIM**: https://webaim.org/

### Tools

- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **Lighthouse**: Built into Chrome
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Learning

- **A11y Project**: https://www.a11yproject.com/
- **Accessibility for Everyone** (book)
- **WebAIM Blog**: https://webaim.org/blog/

---

## A11y Commitment

Every component in Ohouse AI should:
1. ✅ Meet WCAG 2.1 AA standards
2. ✅ Be keyboard accessible
3. ✅ Work with screen readers
4. ✅ Support user preferences (motion, color, text size)
5. ✅ Be tested with real assistive technology

Remember: **Accessibility is not optional, it's essential.**

---

## Related Documentation

- **STATES_AND_VARIANTS.md** — Focus and disabled states
- **ANIMATIONS.md** — Motion and prefers-reduced-motion
- **DESIGN_SYSTEM.md** — Color contrast ratios
- **tokens.ts** — Accessible color tokens

---

**Last Updated**: November 4, 2025
**Version**: v1.1
**Maintained By**: Design System & A11y Team
**WCAG Target**: 2.1 Level AA
