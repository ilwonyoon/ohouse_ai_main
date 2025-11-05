# Design System Structure & Organization

## 🏗️ Overall Architecture

```
Ohouse AI Design System (v1.0)
│
├─── PRIMITIVE TOKENS
│    ├─ Colors (6)
│    ├─ Typography (13)
│    ├─ Spacing (8)
│    ├─ Border Radius (3)
│    └─ Blur Effects (2)
│
├─── SEMANTIC TOKENS
│    ├─ Color by Context (9 uses)
│    ├─ Typography Styles (9 styles)
│    ├─ Spacing Rules (4 types)
│    └─ Radius Specs (2 types)
│
├─── COMPONENT TOKENS
│    ├─ Navigation (top, tabs, bottom)
│    ├─ Cards (large, small)
│    ├─ Buttons (primary)
│    └─ Badges (overlays)
│
└─── LAYOUT TOKENS
     ├─ Viewport (375×1765px)
     ├─ Safe Area (16px)
     └─ Container (343px)
```

---

## 🎨 Color Token Hierarchy

```
Colors (6 Primitive)
│
├─── NEUTRALS
│    ├─ White (50)        → #FFFFFF
│    ├─ Off-White (100)   → #F5F5F5
│    ├─ Gray (500)        → #828C94
│    └─ Charcoal (600)    → #2F3438
│
├─── BRAND
│    └─ Primary Cyan      → #0AA5FF
│
└─── BORDERS
     ├─ Default           → #E6E6E6
     └─ Light             → #DADDE0

     ↓ (Mapped to)
     
Semantic Colors (9 Uses)
│
├─── BACKGROUNDS
│    ├─ Default (white)
│    ├─ Inverse (dark)
│    └─ Grouped (white)
│
├─── FOREGROUNDS (Text)
│    ├─ Default (dark text)
│    ├─ Secondary (gray text)
│    ├─ Inverse (light text)
│    └─ Brand (cyan highlight)
│
└─── BORDERS
     ├─ Default
     └─ Light
```

---

## 🔤 Typography Token Hierarchy

```
Typography System (13 Primitives)
│
├─── FONT FAMILY
│    └─ Pretendard (weights: 400, 500, 600, 700)
│
├─── FONT SIZES (8px-based scale)
│    ├─ xs    → 10px
│    ├─ sm    → 13px
│    ├─ md    → 14px
│    ├─ lg    → 15px
│    ├─ xl    → 16px
│    └─ xxl   → 17px
│
├─── LINE HEIGHTS
│    ├─ tight   → 14px
│    ├─ medium  → 18px
│    ├─ default → 20px
│    ├─ body    → 24px
│    └─ heading → 26px
│
└─── LETTER SPACING
     └─ tight → -0.3px

     ↓ (Composed to)
     
Typography Styles (9 Semantic)
│
├─── HEADING
│    └─ H1: 17px / 600 / 26px lh
│
├─── BODY (4 variants)
│    ├─ Large:   16px / 700 / 20px lh
│    ├─ Default: 15px / 600 / 24px lh
│    ├─ Regular: 14px / 400 / 18px lh
│    └─ Medium:  14px / 500 / 20px lh
│
└─── DETAIL (3 variants)
     ├─ Medium:     13px / 400 / 18px lh
     ├─ Small:      10px / 500 / 14px lh
     └─ Small Bold: 10px / 700 / 14px lh
```

---

## 📏 Spacing Token Hierarchy

```
Spacing Scale (8px base unit)
│
├─ xs    → 2px    (borders, dividers)
├─ sm    → 4px    (compact spacing)
├─ md    → 6px    (tight spacing)
├─ lg    → 8px    (standard padding)
├─ xl    → 10px   (card padding)
├─ xxl   → 12px   (section gap)
├─ xxxl  → 16px   (margins)
└─ huge  → 20px   (large spacing)

     ↓ (Applied as)
     
Component Spacing
│
├─── PADDING
│    ├─ Compact → 4px
│    ├─ Tight   → 8px
│    ├─ Default → 10px
│    └─ Loose   → 12px
│
└─── MARGIN
     ├─ Default → 16px
     └─ Large   → 20px
```

---

## 🧩 Component Token Organization

```
Components (7 Total)
│
├─── NAVIGATION (3 components)
│    ├─ TopNavigation
│    │  ├─ Height: 44px
│    │  ├─ Background: #FFFFFF
│    │  ├─ Icon Size: 24px
│    │  └─ Title: 16px / 700 weight
│    │
│    ├─ Tab
│    │  ├─ Height: 44px
│    │  ├─ Active Border: 2px #2F3438
│    │  ├─ Active Color: #2F3438
│    │  └─ Inactive Color: #828C94
│    │
│    └─ BottomNavigation
│       ├─ Height: 88.5px
│       ├─ Icon Size: 24px
│       ├─ Active: #0AA5FF
│       └─ Home Indicator: 134×5px
│
├─── CARDS (2 components)
│    ├─ FeatureCardLarge
│    │  ├─ Size: 351×263px
│    │  ├─ Image Height: 175px
│    │  ├─ Border Radius: 12px
│    │  └─ Button: 47×28px
│    │
│    └─ FeatureCardSmall
│       ├─ Size: 167×250px
│       ├─ Border: 0.5px #E6E6E6
│       ├─ Border Radius: 12px
│       └─ Gradient Overlay: present
│
├─── BUTTONS (1 component)
│    └─ PrimaryButton
│       ├─ Background: #2F3438
│       ├─ Color: #FFFFFF
│       ├─ Padding: 8px 4px
│       ├─ Border Radius: 8px
│       ├─ Font Size: 14px
│       └─ Size: 47×28px
│
└─── BADGES (1 component)
     └─ ImageBadge
        ├─ Padding: 4px
        ├─ Border Radius: 4px
        ├─ Background: rgba(0,0,0,0.1)
        ├─ Backdrop Filter: blur(2px)
        ├─ Color: #FFFFFF
        └─ Font Size: 10px
```

---

## 📊 Component Relationships

```
Screen Layout
│
├─ Status Bar (48px)
│  └─ System status: Time, signal, battery
│
├─ Top Navigation (44px)
│  └─ Back button + Title + Actions
│
├─ Tab Navigation (44px)
│  ├─ Design (active)
│  └─ Explore
│
├─ Content Area (variable)
│  │
│  ├─ Section Header
│  │  └─ "Try this first"
│  │
│  ├─ Feature Cards - Large (2 instances)
│  │  ├─ Image Container (175px height)
│  │  │  ├─ Before image (175px)
│  │  │  ├─ After image (175px)
│  │  │  └─ Divider (1px)
│  │  │
│  │  └─ Info Container (88px)
│  │     ├─ Title (15px)
│  │     ├─ Description (14px)
│  │     └─ "Try it" Button (47×28px)
│  │
│  └─ Feature Cards - Small (4 instances)
│     ├─ Image (167×171px)
│     └─ Overlay Container
│        ├─ Title (15px)
│        ├─ Description (13px, optional)
│        └─ "Try it" Button (optional)
│
├─ Bottom Navigation (88.5px)
│  ├─ Tab 1: Interior AI (active, #0AA5FF)
│  └─ Tab 2: 3D Room Planner (inactive, #2F3438)
│
└─ Home Indicator (34px)
   └─ iPhone safe area indicator
```

---

## 🔄 Token Application Flow

```
User Interface
    ↓
Component Instance
    ↓
Semantic Token Applied
    ↓ (resolves to)
Primitive Token Value
    ↓
CSS/JavaScript
    ↓
Rendered Output


Example:
─────────
"Feature Card Title"
    ↓
<h2> Component
    ↓
SemanticTokens.Typography.Body.DEFAULT
    ↓ (resolves to)
PrimitiveTokens.Typography.FontSize.LG (15px)
PrimitiveTokens.Typography.FontWeight.SEMIBOLD (600)
PrimitiveTokens.Typography.LineHeight.BODY (24px)
PrimitiveTokens.Typography.LetterSpacing.TIGHT (-0.3px)
    ↓ (becomes)
font-size: 15px;
font-weight: 600;
line-height: 24px;
letter-spacing: -0.3px;
    ↓
Rendered: Properly styled text
```

---

## 📁 File-to-Purpose Mapping

```
Documentation Files
│
├─ INDEX.md
│  └─ Navigation hub
│     └─ Role-specific guides
│        └─ Quick start
│
├─ DESIGN_SYSTEM.md
│  ├─ Primitive Tokens (reference)
│  ├─ Semantic Tokens (reference)
│  ├─ Component Specs (detailed)
│  ├─ Typography System (complete)
│  └─ Layout Guidelines (complete)
│
├─ tokens.ts (TypeScript)
│  ├─ Namespace: PrimitiveTokens
│  │  └─ Exported constants
│  ├─ Namespace: SemanticTokens
│  │  └─ Exported constants & interfaces
│  ├─ Namespace: ComponentTokens
│  │  └─ Exported constants & interfaces
│  ├─ Namespace: LayoutTokens
│  │  └─ Exported constants
│  └─ Type Exports
│     └─ Token type unions
│
├─ tokens.json (Data)
│  ├─ primitiveTokens
│  │  ├─ colors
│  │  ├─ typography
│  │  ├─ spacing
│  │  ├─ borderRadius
│  │  └─ blur
│  ├─ semanticTokens
│  │  ├─ color
│  │  ├─ typography
│  │  ├─ spacing
│  │  └─ radius
│  ├─ components
│  │  ├─ topNavigation
│  │  ├─ tab
│  │  ├─ bottomNavigation
│  │  ├─ featureCardLarge
│  │  ├─ featureCardSmall
│  │  ├─ button
│  │  └─ badge
│  └─ layout
│     ├─ viewport
│     ├─ safeArea
│     └─ containerWidth
│
├─ TOKENS_QUICK_REFERENCE.md
│  ├─ Most used colors
│  ├─ Most used typography
│  ├─ Component templates
│  ├─ Common patterns
│  └─ Troubleshooting
│
├─ DESIGN_SYSTEM_README.md
│  ├─ Setup instructions
│  ├─ Usage examples
│  ├─ Adding new frames (4-step process)
│  ├─ Naming conventions
│  ├─ Spacing reference
│  ├─ Checklists
│  └─ Integration tools
│
└─ DESIGN_SYSTEM_STRUCTURE.md (this file)
   └─ Visual reference
      └─ Organization guide
```

---

## 🎯 Token Usage by Role

```
Developer's Flow:
─────────────────
1. Import: import { SemanticTokens } from '@/docs/tokens'
2. Reference: TOKENS_QUICK_REFERENCE.md for copy-paste
3. Apply: const style = { color: SemanticTokens.Color.Foreground.DEFAULT }
4. Detail: Check DESIGN_SYSTEM.md if needed


Designer's Flow:
────────────────
1. Review: DESIGN_SYSTEM.md components section
2. Reference: TOKENS_QUICK_REFERENCE.md for patterns
3. Specify: Use exact pixel/color values
4. Document: Add to DESIGN_SYSTEM.md


PM's Flow:
──────────
1. Overview: INDEX.md
2. Details: DESIGN_SYSTEM.md
3. Process: DESIGN_SYSTEM_README.md
4. Checklist: New screen addition checklist
```

---

## 🔗 Cross-References

```
When you want to:              Look at:
────────────────────────────────────────────────────
Know hex values                DESIGN_SYSTEM.md
                               or TOKENS_QUICK_REFERENCE.md

Understand structure            DESIGN_SYSTEM_STRUCTURE.md (this file)

Import in code                 tokens.ts
                               or INDEX.md

Get exact component specs      DESIGN_SYSTEM.md
                               Component Specifications section

Add new screen                 DESIGN_SYSTEM_README.md
                               "Adding New Figma Frames" section

Find quick examples            TOKENS_QUICK_REFERENCE.md
                               Component Token Templates

Know file locations            INDEX.md
                               File Overview section

Troubleshoot issues            TOKENS_QUICK_REFERENCE.md
                               Troubleshooting section
```

---

## 📈 Scalability Plan

```
Current State (v1.0):
├─ Initial Design Screen
├─ 7 Component types
├─ 32 Total tokens
└─ Ready for expansion

Future State (v1.1+):
├─ Add new screens
│  └─ Extract from Figma
│  └─ Document in DESIGN_SYSTEM.md
│  └─ Update tokens.ts & tokens.json
│
├─ Add interaction states
│  └─ Hover, active, disabled
│  └─ Transitions, animations
│
├─ Add responsive variants
│  └─ Tablet breakpoints
│  └─ Desktop sizes
│
├─ Add dark mode
│  └─ Dark palette tokens
│  └─ Semantic mappings
│
└─ Add accessibility
   └─ High contrast variants
   └─ Reduced motion support
```

---

**Last Updated**: November 4, 2025  
**Version**: Design System Structure v1.0  
**Companion Files**: All `.md`, `.ts`, and `.json` files in `/docs/`
