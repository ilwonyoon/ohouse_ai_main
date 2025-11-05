# 📚 Ohouse AI Design System - Documentation Index

**Status**: ✅ Design System v1.0 Complete  
**Last Updated**: November 4, 2025  
**Source**: Figma - Ohouse-AI--AI-interior-  
**Maintainer**: Design Team

---

## 📖 Quick Navigation

### For Designers
- **Start here**: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - Complete design specifications
- **Visual overview**: View the [screenshot](../projects/ohouse-ai-app/public/) of extracted designs
- **Component specs**: See "Component Specifications" section in DESIGN_SYSTEM.md

### For Developers  
- **Start here**: [`TOKENS_QUICK_REFERENCE.md`](./TOKENS_QUICK_REFERENCE.md) - Most commonly used tokens
- **Implementation**: [`tokens.ts`](./tokens.ts) - TypeScript imports and types
- **Data format**: [`tokens.json`](./tokens.json) - JSON token definitions
- **Setup guide**: [`DESIGN_SYSTEM_README.md`](./DESIGN_SYSTEM_README.md) - Integration instructions

### For Product Managers
- **Overview**: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - Full design specs and components
- **Checklist**: [`DESIGN_SYSTEM_README.md`](./DESIGN_SYSTEM_README.md) - Adding new screens checklist

---

## 📄 File Overview

### 1. **DESIGN_SYSTEM.md** (9.1 KB)
The comprehensive design system documentation.

**Contains:**
- 📋 Complete design overview
- 🎨 Primitive tokens (colors, typography, spacing, borders, blur)
- 🏷️ Semantic tokens (colors by context, typography styles, spacing/radius)
- 🧩 Component specifications (navigation, cards, buttons, badges)
- 📐 Layout & spacing guidelines
- 🎯 Figma references and node IDs

**Best for:** Deep understanding of the design system, referencing specific values

---

### 2. **tokens.ts** (10.3 KB)
TypeScript type definitions and token exports.

**Contains:**
- 🔤 Namespaced token exports
- 📝 TypeScript interfaces for components
- 💾 Pre-configured component objects
- 🎯 Type exports for token usage
- ✨ IDE autocomplete support

**Best for:** Importing tokens in React/Next.js components with type safety

**Usage:**
```typescript
import { SemanticTokens, ComponentTokens, PrimitiveTokens } from '@/docs/tokens';

const style = {
  background: SemanticTokens.Color.Background.DEFAULT,
  color: SemanticTokens.Color.Foreground.DEFAULT
};
```

---

### 3. **tokens.json** (7.1 KB)
Machine-readable token definitions in JSON format.

**Contains:**
- 🎨 Primitive tokens (colors, typography, spacing, borders, blur)
- 🏷️ Semantic tokens (with descriptions)
- 🧩 Component specifications
- 📏 Layout tokens

**Best for:** Design tool integration, code generation, design token plugins

**Usage:**
```json
{
  "primitiveTokens": { /* ... */ },
  "semanticTokens": { /* ... */ },
  "components": { /* ... */ },
  "layout": { /* ... */ }
}
```

---

### 4. **TOKENS_QUICK_REFERENCE.md** (8.8 KB)
Quick lookup guide for most common tokens and patterns.

**Contains:**
- ⚡ Most used colors and typography
- 🎯 Component token templates
- 📐 Common spacing patterns
- 🎨 Color usage by context
- ✅ Common component patterns
- 🆘 Troubleshooting guide

**Best for:** Quick lookups while coding, copy-paste templates

---

### 5. **DESIGN_SYSTEM_README.md** (7.4 KB)
Integration guide and setup instructions.

**Contains:**
- 🎨 Design system structure explanation
- 🚀 How to use tokens in code
- 📋 Step-by-step guide for adding new Figma frames
- 🎯 Token naming conventions
- 📐 Spacing scale reference
- 🎨 Color palette summary
- ✅ Checklist for new screen additions
- 🔧 Integration tools and compatibility

**Best for:** Onboarding new team members, setting up token imports

---

### 6. **INDEX.md** (This file)
Navigation guide for the design system documentation.

---

## 🎨 Design Token Hierarchy

```
Design System (v1.0)
├── Primitive Tokens (base values)
│   ├── Colors (6 colors)
│   ├── Typography (font family, weight, sizes, line heights)
│   ├── Spacing (8 scales)
│   ├── Border Radius (3 types)
│   └── Blur (2 types)
│
├── Semantic Tokens (contextual usage)
│   ├── Colors (9 semantic uses)
│   ├── Typography (9 semantic styles)
│   ├── Spacing (component padding/margin)
│   └── Radius (button, card)
│
├── Component Tokens (pre-configured)
│   ├── Navigation (top bar, tabs, bottom nav)
│   ├── Cards (large, small)
│   ├── Buttons (primary)
│   └── Badges
│
└── Layout Tokens (viewport specs)
    ├── Viewport (375px × 1765px)
    ├── Safe area (16px horizontal)
    └── Container width (343px)
```

---

## 🔢 Token Counts

| Category | Count | Examples |
|----------|-------|----------|
| **Primitive Colors** | 6 | White, Dark Charcoal, Medium Gray, Cyan, Borders |
| **Semantic Colors** | 9 | bg-default, fg-primary, border-default, etc. |
| **Typography Styles** | 9 | H1, 4 body variants, 4 detail variants |
| **Spacing Scales** | 8 | xs (2px) → huge (20px) |
| **Border Radius** | 3 | tight (8px), smooth (12px), full (100px) |
| **Components** | 7 | Navigation, tabs, cards, buttons, badges |

---

## 📋 Extracted Design Frames

All designs extracted from Figma node: **11815:20728**

| Frame | Node ID | Type | Status |
|-------|---------|------|--------|
| Initial Design Screen | 11815:20728 | Full screen | ✅ Complete |
| Status Bar - iPhone | 11815:20775 | Component | ✅ Extracted |
| Top Navigation | 11815:20773 | Component | ✅ Extracted |
| Tab Navigation | 11815:20729 | Component | ✅ Extracted |
| Feature Card Large | 11815:20730 | Component | ✅ Extracted |
| Feature Card Large | 11815:20933 | Component | ✅ Extracted |
| Feature Card Small | 11815:20894 | Component | ✅ Extracted |
| Feature Card Small | 11815:20915 | Component | ✅ Extracted |
| Feature Card Small | 11815:20921 | Component | ✅ Extracted |
| Feature Card Small | 11815:20927 | Component | ✅ Extracted |
| Bottom Navigation | 11815:20777 | Component | ✅ Extracted |

---

## 🚀 Getting Started

### Step 1: Choose Your Role
- **👨‍💻 Developer** → Read [`TOKENS_QUICK_REFERENCE.md`](./TOKENS_QUICK_REFERENCE.md)
- **🎨 Designer** → Read [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- **📋 Product** → Read [`DESIGN_SYSTEM_README.md`](./DESIGN_SYSTEM_README.md)

### Step 2: Import Tokens
```typescript
// In your React/Next.js component
import { SemanticTokens, ComponentTokens } from '@/docs/tokens';
```

### Step 3: Use in Components
```typescript
const component = {
  background: SemanticTokens.Color.Background.DEFAULT,
  padding: SemanticTokens.Spacing.Component.Padding.DEFAULT
};
```

### Step 4: Add New Designs
Follow the 4-step process in [`DESIGN_SYSTEM_README.md`](./DESIGN_SYSTEM_README.md#-adding-new-figma-frames)

---

## 📊 Usage by Role

### Developers
```
Files to use:
1. tokens.ts (for imports)
2. TOKENS_QUICK_REFERENCE.md (for lookups)
3. DESIGN_SYSTEM.md (for details)

Time commitment: 30 min to set up, 5 min per component
```

### Designers
```
Files to review:
1. DESIGN_SYSTEM.md (full specs)
2. TOKENS_QUICK_REFERENCE.md (patterns)

Time commitment: 1 hour for full review
```

### Design System Maintainers
```
Files to manage:
1. DESIGN_SYSTEM.md (primary source)
2. tokens.ts (TypeScript sync)
3. tokens.json (data sync)
4. DESIGN_SYSTEM_README.md (process)

Update process: When new Figma designs added
```

---

## 🔄 Update Workflow

**When adding new designs:**

1. ✅ Extract from Figma MCP
2. ✅ Update `DESIGN_SYSTEM.md` with new components
3. ✅ Add tokens to `tokens.json`
4. ✅ Add types to `tokens.ts`
5. ✅ Update Figma References table
6. ✅ Increment version number
7. ✅ Update this INDEX.md if needed

**Estimated time**: 30-45 minutes per new screen

---

## 🎯 Design System Goals

✅ **Consistency** - Single source of truth for all design values  
✅ **Type Safety** - TypeScript definitions for code safety  
✅ **Scalability** - Easy to add new screens and components  
✅ **Accessibility** - WCAG-compliant color contrasts  
✅ **Documentation** - Comprehensive reference for team  
✅ **Integration** - Works with Figma, CSS, Tailwind, CSS-in-JS  

---

## 📞 Support & Resources

| Question | Resource |
|----------|----------|
| How do I use tokens in my component? | [`TOKENS_QUICK_REFERENCE.md`](./TOKENS_QUICK_REFERENCE.md) |
| What's the hex code for [color]? | [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md#primitive-tokens) |
| How do I add a new screen? | [`DESIGN_SYSTEM_README.md`](./DESIGN_SYSTEM_README.md#-adding-new-figma-frames) |
| What's the exact typography spec? | [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md#typography-system) |
| Where do I import tokens? | [`tokens.ts`](./tokens.ts) |
| I need JSON format | [`tokens.json`](./tokens.json) |

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| **1.0** | 2025-11-04 | ✅ Initial design system extracted from Figma (11815:20728) |
| **Upcoming** | TBD | Design system expansion with additional screens |

---

## 🔗 Related Files

- **Component Library**: `/src/components/`
- **Design Files**: Figma project (Ohouse-AI--AI-interior-)
- **Public Assets**: `/projects/ohouse-ai-app/public/` (extracted images)
- **TypeScript Config**: `/projects/ohouse-ai-app/tsconfig.json`

---

**Last Updated**: November 4, 2025  
**Maintained by**: Design System Team  
**Status**: Active & Ready for Use ✅
