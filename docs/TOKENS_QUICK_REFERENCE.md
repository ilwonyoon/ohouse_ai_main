# Design Tokens - Quick Reference Guide

## ⚡ Most Used Tokens

### Colors
```typescript
// Primary colors
const darkText = '#2F3438';      // fg-default
const lightText = '#FFFFFF';     // fg-inverse
const secondaryText = '#828C94'; // fg-secondary
const brandBlue = '#0AA5FF';     // fg-brand

// Backgrounds
const whiteBg = '#FFFFFF';       // bg-default
const darkBg = '#2F3438';        // bg-inverse

// Borders
const borderColor = '#E6E6E6';   // border-default
```

### Typography
```typescript
// Headings
fontSize: 17px, fontWeight: 600, lineHeight: 26px

// Body text (most common)
fontSize: 15px, fontWeight: 600, lineHeight: 24px

// Descriptions
fontSize: 14px, fontWeight: 400, lineHeight: 18px

// Buttons
fontSize: 14px, fontWeight: 500, lineHeight: 20px

// Small labels
fontSize: 10px, fontWeight: 500, lineHeight: 14px
```

### Spacing
```
xs:  2px     (borders)
sm:  4px     (compact)
md:  6px     (tight)
lg:  8px     (default padding)
xl:  10px    (card padding)
xxl: 12px    (section gap)
xxxl: 16px   (margins)
huge: 20px   (large spacing)
```

---

## 🎯 Component Token Templates

### Card Component
```typescript
const cardStyle = {
  backgroundColor: '#FFFFFF',           // bg-default
  borderRadius: '12px',                 // radius-smooth
  padding: '16px',                      // spacing-xxxl
  border: '0.5px solid #E6E6E6'         // border-default
};
```

### Button Component
```typescript
const buttonStyle = {
  backgroundColor: '#2F3438',           // bg-inverse
  color: '#FFFFFF',                     // fg-inverse
  padding: '8px 16px',                  // spacing-lg + spacing-xxxl
  borderRadius: '8px',                  // radius-tight
  fontSize: '14px',                     // body-medium
  fontWeight: 500,
  border: 'none'
};

// When hovered/active
const buttonActiveStyle = {
  // Can add scale, opacity, or shadow effects
};
```

### Text Styles
```typescript
// Large heading
{
  fontSize: '17px',
  fontWeight: 600,
  lineHeight: '26px',
  color: '#2F3438'
}

// Feature card title
{
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '24px',
  color: '#2F3438'
}

// Body/description text
{
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  color: '#828C94'
}

// Small label/badge
{
  fontSize: '10px',
  fontWeight: 500,
  lineHeight: '14px',
  color: '#FFFFFF'
}
```

### Navigation Component
```typescript
const navStyle = {
  height: '44px',
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #EAEDEF',
  padding: '0 16px'
};

const navTitleStyle = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#2F3438'
};
```

### Badge/Overlay Label
```typescript
const badgeStyle = {
  padding: '4px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 500,
  color: '#FFFFFF',
  backgroundColor: 'rgba(0,0,0,0.1)',
  backdropFilter: 'blur(2px)'
};
```

---

## 📏 Responsive Spacing

### Container Spacing
```typescript
const containerStyle = {
  width: '343px',      // Safe area
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '16px',  // safe area padding
  paddingRight: '16px'
};
```

### Section Spacing
```typescript
const section = {
  paddingTop: '20px',    // large spacing
  paddingBottom: '20px',
  paddingLeft: '16px',   // container padding
  paddingRight: '16px'
};
```

---

## 🎨 Color Usage by Context

### Primary Actions
```
Color: #0AA5FF (brand-primary)
Background: #2F3438 (inverse)
Used for: Active tabs, buttons, important CTAs
```

### Secondary Actions
```
Color: #2F3438 (foreground-default)
Background: #FFFFFF (background-default)
Used for: Secondary buttons, inactive states
```

### Disabled States
```
Color: #828C94 (foreground-secondary)
Opacity: 50%
Background: #F5F5F5 (neutral-100)
```

### Text Hierarchy
```
Primary text:    #2F3438 (neutral-600)
Secondary text:  #828C94 (neutral-500)
Tertiary text:   #828C94 with opacity
```

---

## 🔤 Typography Usage Rules

### When to use each style:

| Style | Usage | Example |
|-------|-------|---------|
| Heading17/Semibold | Page titles, nav headers | "Interior AI", "Design Suggestions" |
| Body15/Semibold | Card titles, emphasis | "Try a New Style", "New Flooring" |
| Body14/Regular | Body text, descriptions | "Apply new interior style" |
| Body14/Medium | Button text, labels | "Try it", "See More" |
| Detail13/Regular | Supplementary text | "Completely redesign..." |
| Detail10/Medium | Badges, small labels | "Before", "After" |

---

## 📱 Mobile Layout Specs

```typescript
const mobileViewport = {
  width: 375,              // iPhone standard width
  safeAreaHorizontal: 16,  // Padding from edge
  containerWidth: 343      // 375 - (16*2)
};

// Typical content spacing
const contentLayout = {
  topBar: 44,              // Navigation height
  tabBar: 44,              // Tab navigation
  bottomNav: 88.5,         // Bottom navigation + indicator
  statusBar: 48,           // System status bar
  contentArea: 1765 - 44 - 44 - 88.5 - 48  // Available space
};
```

---

## 🎯 Token Import Examples

### TypeScript/React
```typescript
import { SemanticTokens, ComponentTokens, PrimitiveTokens } from '@/docs/tokens';

// Use in component
const Card = () => {
  return (
    <div style={{
      background: SemanticTokens.Color.Background.DEFAULT,
      border: `0.5px solid ${SemanticTokens.Color.Border.DEFAULT}`,
      borderRadius: SemanticTokens.Radius.CARD,
      padding: SemanticTokens.Spacing.Component.Padding.DEFAULT
    }}>
      <h2 style={SemanticTokens.Typography.Body.DEFAULT}>
        Card Title
      </h2>
      <p style={SemanticTokens.Typography.Detail.MEDIUM}>
        Card description
      </p>
    </div>
  );
};
```

### CSS Variables (if generated)
```css
:root {
  --color-bg-default: #FFFFFF;
  --color-fg-default: #2F3438;
  --color-fg-secondary: #828C94;
  --color-fg-brand: #0AA5FF;
  --color-border-default: #E6E6E6;
  
  --font-size-body: 15px;
  --font-weight-semibold: 600;
  --line-height-body: 24px;
  
  --radius-card: 12px;
  --radius-button: 8px;
  
  --spacing-xs: 2px;
  --spacing-sm: 4px;
  --spacing-lg: 8px;
  --spacing-xxxl: 16px;
}
```

---

## ✅ Common Patterns

### Card with Image + Info
```typescript
const featureCard = {
  width: '351px',
  background: '#FFFFFF',
  imageContainer: {
    height: '175px',
    borderRadius: '12px'
  },
  infoContainer: {
    padding: '12px',
    title: '15px / 600 weight / #2F3438',
    description: '14px / 400 weight / #828C94',
    button: {
      width: '47px',
      height: '28px',
      background: '#2F3438',
      color: '#FFFFFF'
    }
  }
};
```

### Tab Navigation
```typescript
const activeTab = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#2F3438',
  borderBottom: '2px solid #2F3438'
};

const inactiveTab = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#828C94',
  borderBottom: 'none'
};
```

### Bottom Navigation Item
```typescript
const navItem = {
  icon: {
    size: '24px',
    color: 'active: #0AA5FF, inactive: #2F3438'
  },
  label: {
    fontSize: '10px',
    fontWeight: 700,
    marginTop: '2px'
  }
};
```

---

## 🔄 State Variations

### Button States
```typescript
// Default
{ background: '#2F3438', color: '#FFFFFF' }

// Hover
{ background: '#1a1d21', color: '#FFFFFF' }

// Active/Pressed
{ background: '#0f1115', color: '#FFFFFF' }

// Disabled
{ background: '#F5F5F5', color: '#828C94' }
```

### Text States
```typescript
// Enabled
{ color: '#2F3438' }

// Disabled
{ color: '#828C94', opacity: 0.5 }

// Hover
{ color: '#0aa5ff' }
```

---

## 📚 Design Token Files

All tokens are centrally managed in:
- **`tokens.json`** - For design tools and code generation
- **`tokens.ts`** - For TypeScript/React imports
- **`DESIGN_SYSTEM.md`** - For full documentation

**Import path**: `@/docs/tokens`

---

## 🆘 Troubleshooting

**Q: Color looks wrong?**
- Check `SemanticTokens.Color` for the correct semantic token
- Verify contrast ratio (WCAG AA minimum)

**Q: Typography feels off-size?**
- Use semantic tokens like `Body.DEFAULT` instead of raw pixels
- Check `lineHeight` and `letterSpacing` are applied

**Q: Spacing not consistent?**
- Use `Spacing.Component.Padding` instead of arbitrary values
- Reference the 8px base unit scale

**Q: Need a new token?**
- Document it in `DESIGN_SYSTEM.md`
- Add to both `tokens.json` and `tokens.ts`
- Update version number
- Reference the Figma node ID
