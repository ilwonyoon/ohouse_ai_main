# Interactive Design System Editor - Implementation Plan

## 🎯 Vision
Figma-style editor where designers/developers can:
1. **View** design system components with live examples
2. **Select** any component or element to inspect
3. **Edit** all token values (colors, typography, spacing) in real-time
4. **See** changes instantly reflected in the preview
5. **Export** final token configurations

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERACTIVE EDITOR PAGE                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐        ┌──────────────────────┐   │
│  │   LEFT SIDEBAR       │        │   CENTER CANVAS      │   │
│  │  (Components List)   │        │  (Live Preview)      │   │
│  │                      │        │                      │   │
│  │ • Typography         │        │  ┌────────────────┐  │   │
│  │ • Colors             │        │  │                │  │   │
│  │ • Spacing            │        │  │ Selected       │  │   │
│  │ • Components         │        │  │ Component      │  │   │
│  │                      │        │  │ (Highlighted)  │  │   │
│  │ [Click to select]    │        │  │                │  │   │
│  │                      │        │  └────────────────┘  │   │
│  └──────────────────────┘        └──────────────────────┘   │
│                                                               │
│                   ┌──────────────────────┐                   │
│                   │  RIGHT PANEL         │                   │
│                   │  (Token Editor)      │                   │
│                   │                      │                   │
│                   │ 📋 Properties        │                   │
│                   │ ├─ Typography        │                   │
│                   │ │ ├─ Font Size      │                   │
│                   │ │ ├─ Font Weight    │                   │
│                   │ │ └─ Line Height    │                   │
│                   │ ├─ Colors           │                   │
│                   │ │ ├─ Foreground     │                   │
│                   │ │ └─ Background     │                   │
│                   │ └─ Spacing          │                   │
│                   │   ├─ Padding        │                   │
│                   │   ├─ Margin         │                   │
│                   │   └─ Gap            │                   │
│                   │                      │                   │
│                   │ [Sliders/Inputs]    │                   │
│                   │ [Color Picker]      │                   │
│                   │ [Preview]           │                   │
│                   │                      │                   │
│                   │ 📤 Export Config     │                   │
│                   │ [Download JSON]     │                   │
│                   └──────────────────────┘                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Core Features

### 1. Component Selection System
```
User Flow:
1. User clicks component in canvas
2. Component gets highlighted with selection border
3. Component info displayed in right panel
4. Panel shows all applicable tokens for that component
```

**Implementation:**
- Track selected component via state
- Pass selection context to right panel
- Highlight selected element with border/overlay

### 2. Token Editor Panel (Right Side)

#### Typography Editor
- Font Size: Dropdown + custom input (10px - 32px)
- Font Weight: Radio buttons (Regular, Medium, Semibold, Bold)
- Line Height: Dropdown + input (14px - 32px)
- Font Family: Dropdown (Pretendard, SF Pro Text, etc.)

#### Colors Editor
- Foreground: Color picker + hex input
- Background: Color picker + hex input
- Border: Color picker + hex input
- Preview swatch showing actual colors

#### Spacing Editor
- Padding: Individual inputs (Top, Right, Bottom, Left)
- Margin: Individual inputs (Top, Right, Bottom, Left)
- Gap: Single input for flex/grid gap
- Visual spacing preview

### 3. Live Preview System
```
Token Change Flow:
1. User adjusts value in right panel (e.g., fontSize: 14px → 16px)
2. State updates immediately
3. Canvas component re-renders with new token
4. Change visible in real-time
```

### 4. Export Configuration
```
Users can download:
- Modified tokens.json with new values
- CSS variables (--font-size: 16px, etc.)
- TypeScript token definitions
```

---

## 📦 Data Structure

### Selected Component Object
```typescript
interface SelectedComponent {
  id: string;                    // 'typography-heading20'
  name: string;                  // 'Heading20/Semibold'
  type: 'typography' | 'color' | 'spacing' | 'component';
  currentTokens: {
    typography?: TypographyTokens;
    colors?: ColorTokens;
    spacing?: SpacingTokens;
  };
}

interface TypographyTokens {
  fontSize: string;              // '20px'
  fontWeight: number;            // 600
  lineHeight: string;            // '28px'
  fontFamily: string;            // 'Pretendard'
}

interface ColorTokens {
  foreground: string;            // '#2F3438'
  background: string;            // '#FFFFFF'
  border: string;                // '#E6E6E6'
}

interface SpacingTokens {
  padding: { top: string; right: string; bottom: string; left: string };
  margin: { top: string; right: string; bottom: string; left: string };
  gap: string;
}
```

---

## 🎨 Right Panel Layout (Figma-inspired)

### Section Hierarchy
```
┌─ Property Name ─────────────────────┐
├─ [Icon] Expandable Section Header   │
├─────────────────────────────────────┤
│                                     │
│ Subsection 1                        │
│ ├─ [Label] ──────────[Input/Picker]│
│ ├─ [Label] ──────────[Input/Picker]│
│ └─ [Label] ──────────[Input/Picker]│
│                                     │
│ Subsection 2                        │
│ ├─ [Label] ──────────[Input/Picker]│
│ └─ [Label] ──────────[Input/Picker]│
│                                     │
│ Preview                             │
│ ├─ Visual preview of changes        │
│ └─ Before/After comparison          │
│                                     │
└─────────────────────────────────────┘
```

---

## 🏗️ Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create editor page layout (left, center, right)
- [ ] Implement component selection system
- [ ] Build basic right panel structure
- [ ] Add Typography token editor

### Phase 2: Token Editors (Week 2)
- [ ] Color picker integration
- [ ] Spacing editor with visual feedback
- [ ] Component token combinations
- [ ] Live preview updates

### Phase 3: Advanced Features (Week 3)
- [ ] Before/After comparison mode
- [ ] Token history/undo system
- [ ] Export functionality
- [ ] Component library presets

### Phase 4: Polish (Week 4)
- [ ] Responsive design
- [ ] Keyboard shortcuts
- [ ] Performance optimization
- [ ] Documentation

---

## 📂 File Structure

```
src/app/design-system/
├── editor/
│   ├── page.tsx                    // Main editor page
│   ├── layout.tsx                  // Editor layout
│   └── components/
│       ├── Canvas.tsx              // Left: Component list + center preview
│       ├── RightPanel.tsx          // Right: Token editor
│       ├── editors/
│       │   ├── TypographyEditor.tsx
│       │   ├── ColorEditor.tsx
│       │   ├── SpacingEditor.tsx
│       │   └── ComponentEditor.tsx
│       ├── previews/
│       │   ├── TypographyPreview.tsx
│       │   ├── ColorPreview.tsx
│       │   └── SpacingPreview.tsx
│       └── utils/
│           ├── tokenManager.ts     // Token state management
│           └── exportUtils.ts      // JSON/CSS export
```

---

## 🎯 Key Interactions

### 1. Click Component to Select
```
Canvas (Center)
│
└─> Click on component
    │
    ├─> Highlight component (border + overlay)
    ├─> Update selected state
    └─> Right panel loads component tokens
```

### 2. Adjust Token Value
```
Right Panel Input
│
└─> User changes value (e.g., fontSize: 14 → 16)
    │
    ├─> Update token state
    ├─> Re-render canvas with new token
    └─> Show live preview immediately
```

### 3. Export Configuration
```
Right Panel Export Button
│
└─> User clicks "Export"
    │
    ├─> Generate JSON with all modified tokens
    ├─> Create downloadable file
    └─> Download tokens.json
```

---

## 🔄 State Management

Using React hooks + context for token state:

```typescript
// Global token state
const [tokens, setTokens] = useState<DesignTokens>(initialTokens);

// Selected component
const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);

// Handlers
const handleComponentSelect = (componentId: string) => {
  // Find component, set selected
  setSelectedComponent(findComponent(componentId));
};

const handleTokenUpdate = (path: string, value: any) => {
  // e.g., path: 'typography.fontSize', value: '16px'
  setTokens(prev => ({
    ...prev,
    [path]: value
  }));
};
```

---

## 📊 Component Selection Map

### Typography Components
- [ ] Heading24/Bold
- [ ] Heading20/Semibold
- [ ] Heading18/Bold
- [ ] Heading17/Semibold
- [ ] Body16/Bold
- [ ] Body15/Semibold
- [ ] Body14/Medium
- [ ] Body14/Regular
- [ ] Detail13/Semibold
- [ ] Detail12/Medium
- [ ] Detail10/Bold

### Color Components
- [ ] Text (Foreground)
- [ ] Background
- [ ] Border
- [ ] Brand/Accent

### Spacing Combinations
- [ ] Page padding
- [ ] Card padding
- [ ] Element gap
- [ ] Section spacing

---

## 🎨 Design Inspiration (Figma Editor)

**Right Panel Features to Replicate:**
1. Collapsible sections with icons
2. Input fields with labels on left
3. Dropdown selectors for preset values
4. Color picker with hex input
5. Slider controls for numeric values
6. Visual preview of changes
7. Before/After toggle
8. Export/Download buttons
9. Smooth transitions on value changes

---

## ⚡ Performance Considerations

- Use React.memo for component previews (prevent unnecessary re-renders)
- Debounce token updates for smoother interactions
- Virtual scrolling for component list if needed
- Lazy load color picker library
- Cache token combinations to avoid recalculation

---

## 📝 Success Metrics

1. ✅ Can select any component from canvas
2. ✅ Right panel shows all editable tokens
3. ✅ Live preview updates < 100ms after token change
4. ✅ Can export modified tokens as JSON
5. ✅ UI feels responsive like Figma editor
6. ✅ Mobile-friendly responsive design
7. ✅ Intuitive for designers and developers

---

## 🚀 Next Steps

1. Create editor page with 3-column layout
2. Build component selection system
3. Implement basic typography editor
4. Add live preview system
5. Test interactions and performance
6. Add color and spacing editors
7. Implement export functionality
8. Polish UI and interactions
