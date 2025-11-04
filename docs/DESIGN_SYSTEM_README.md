# Design System Documentation - README

## Overview

This directory contains the complete design system specifications for the **Ohouse AI** application, extracted from Figma designs.

### 📁 Files in This Directory

1. **`DESIGN_SYSTEM.md`** - Comprehensive design system documentation
   - Primitive tokens (colors, typography, spacing)
   - Semantic tokens (usage-based color assignments)
   - Component specifications with detailed specs
   - Layout guidelines and spacing system

2. **`tokens.json`** - Structured token data
   - Machine-readable format
   - Organized by category (primitives, semantics, components)
   - Easy to import into code generation tools

3. **`tokens.ts`** - TypeScript type definitions
   - Type-safe token exports
   - Namespaced exports for easy IDE autocomplete
   - Ready to use in React/Next.js components

4. **`DESIGN_SYSTEM_README.md`** - This file

---

## 🎨 Design System Structure

### Primitive Tokens
Base design elements without context or meaning:
- **Colors**: Neutrals, borders, brand colors
- **Typography**: Font families, weights, sizes, line heights
- **Spacing**: 8px-based scale
- **Border Radius**: Tight (8px), smooth (12px), full (100px)
- **Blur Effects**: Used in badges and overlays

### Semantic Tokens
Context-aware tokens that describe how primitives are used:
- **Background Colors**: default, inverse, grouped
- **Foreground Colors**: default, secondary, inverse, brand
- **Border Colors**: default, light
- **Typography Styles**: Heading, body (4 variants), detail (3 variants)
- **Spacing**: Component padding and margins
- **Radius**: Button, card specific values

### Component Tokens
Pre-configured specifications for UI components:
- **Navigation**: Top bar, tabs, bottom navigation
- **Cards**: Large feature cards, small feature cards
- **Buttons**: Primary button specs
- **Badges**: Image overlay labels

---

## 🚀 How to Use in Your Code

### TypeScript/React Usage

```typescript
import { 
  SemanticTokens, 
  ComponentTokens,
  PrimitiveTokens 
} from '@/docs/tokens';

// Using color tokens
const buttonStyle = {
  backgroundColor: SemanticTokens.Color.Background.INVERSE,
  color: SemanticTokens.Color.Foreground.INVERSE
};

// Using typography
const titleStyle = SemanticTokens.Typography.Heading.H1;

// Using component tokens
const cardSpecs = ComponentTokens.FeatureCardLarge;

// Using primitive tokens
const spacing = PrimitiveTokens.Spacing.LG; // '8px'
```

### JSON-Based Usage

```json
{
  "card": {
    "backgroundColor": "#tokens.semanticTokens.color.background.default",
    "borderColor": "#tokens.semanticTokens.color.border.default"
  }
}
```

---

## 📋 Adding New Figma Frames

When importing new screens from Figma, follow this process:

### Step 1: Extract from Figma MCP
```bash
# Use Figma MCP to get design context
# Extract metadata, screenshots, and variable definitions
```

### Step 2: Document New Components

Add to `DESIGN_SYSTEM.md`:
1. New component section under **Component Specifications**
2. Document layout, spacing, colors, typography
3. Include Figma node IDs for reference

Example template:
```markdown
#### [New Component Name]
Size: [width]px × [height]px
Background: [color]
Border: [border style]
Content Layout:
  - [Element]: [specifications]
Typography:
  - Title: [style]
  - Description: [style]
```

### Step 3: Update Token Files

**In `tokens.json`:**
```json
{
  "components": {
    "newComponent": {
      "width": "...",
      "height": "...",
      // ... specifications
    }
  }
}
```

**In `tokens.ts`:**
```typescript
export namespace ComponentTokens {
  export interface NewComponent {
    // interface definition
  }

  export const NewComponent: NewComponent = {
    // token values
  };
}
```

### Step 4: Update DESIGN_SYSTEM.md References

Add to the **Figma References** table:
```markdown
| New Frame | Node ID | Description |
|-----------|---------|-------------|
| Frame Name | 11815:xxxxx | Description |
```

---

## 🔗 Figma Source

**Project**: Ohouse-AI--AI-interior-
**Design File**: https://www.figma.com/design/k7C6jxlWGJaz8j0k9a2Wjb/Ohouse-AI--AI-interior-

### Extracted Frames
- Initial Design Screen (node-id: 11815-20728)
- Feature Cards (Large & Small)
- Navigation Components
- Status Bar & Indicators

---

## 🎯 Token Naming Conventions

### Colors
- **Prefix**: `color`, `bg`, `fg`, `border`
- **Pattern**: `[type]-[category]-[variant]`
- **Examples**: 
  - `bg-default` (background default)
  - `fg-secondary` (foreground secondary)
  - `border-light` (border light)

### Typography
- **Pattern**: `[category]-[size]-[weight]`
- **Examples**:
  - `heading-h1`
  - `body-large`
  - `detail-small`

### Spacing
- **Pattern**: `[category]-[scale]`
- **Examples**:
  - `spacing-xs` (2px)
  - `spacing-lg` (8px)
  - `spacing-xxxl` (16px)

### Border Radius
- **Pattern**: `radius-[style]`
- **Examples**:
  - `radius-tight` (8px)
  - `radius-smooth` (12px)
  - `radius-full` (100px)

---

## 📐 Spacing Scale Reference

Based on an 8px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 2px | Borders, thin dividers |
| sm | 4px | Badge padding, compact components |
| md | 6px | Tight spacing between elements |
| lg | 8px | Standard button padding |
| xl | 10px | Default card padding |
| xxl | 12px | Section headers spacing |
| xxxl | 16px | Container margins |
| huge | 20px | Large section spacing |

---

## 🎨 Color Palette at a Glance

### Primary Palette
```
White              #FFFFFF    (bg-default, fg-inverse)
Dark Charcoal      #2F3438    (fg-default, bg-inverse)
Medium Gray        #828C94    (fg-secondary)
Cyan Blue          #0AA5FF    (fg-brand, active indicator)
Border Gray        #E6E6E6    (border-default)
Light Border       #DADDE0    (border-light)
```

---

## ✅ Checklist for New Screen Additions

- [ ] Extract design from Figma using MCP
- [ ] Document all new components in `DESIGN_SYSTEM.md`
- [ ] Add new colors to primitive tokens if any
- [ ] Add new typography styles if any
- [ ] Create component token entries in `tokens.json`
- [ ] Add TypeScript interfaces in `tokens.ts`
- [ ] Update Figma References table
- [ ] Verify consistency with existing design system
- [ ] Add usage examples in component specs
- [ ] Update this README if introducing new patterns

---

## 🔧 Tools & Integration

### Ready for Integration With:
- **Figma Tokens Plugin** - Export tokens directly to code
- **Tailwind CSS** - Configure with token values
- **CSS-in-JS** - Use token namespaces in styled-components, Emotion, etc.
- **Design Tokens Format** - W3C compliant token structure

### Generated Code
- React/Next.js components
- TypeScript type definitions
- JSON configuration files
- CSS variables (can be generated from tokens.json)

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-04 | Initial design system extracted from Figma |

---

## 🤝 Contributing

When adding new designs:

1. Always export from Figma using MCP
2. Follow naming conventions consistently
3. Document both primitives and semantics
4. Add TypeScript types
5. Include component specs with exact pixel values
6. Reference Figma node IDs for traceability

---

## 📞 Questions?

Refer to:
- `DESIGN_SYSTEM.md` - Full specifications
- `tokens.json` - Machine-readable reference
- `tokens.ts` - TypeScript implementations
- Figma design file - Visual source of truth
