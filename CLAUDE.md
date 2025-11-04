# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ohouse AI** is a monorepo workspace for prototyping AI-powered interior design applications. The main active project is a Next.js 15.3 application with a MacOS-style desktop launcher, serving as a hub for multiple design features.

- **Main App**: `projects/ohouse-ai-app/` (Next.js 15.3, React 19, TypeScript 5.x)
- **Package Manager**: Yarn 3.2.0 (npm compatible)
- **Node.js Requirement**: >= 22
- **Key Architecture**: Feature-based routing with feature pages

## Repository Structure

```
Ohouse_ai_onGoing/
├── projects/
│   ├── ohouse-ai-app/                    # Main active project
│   │   ├── src/
│   │   │   ├── app/                      # Next.js App Router (pages/routes)
│   │   │   ├── components/               # React components (desktop, layout, features, common)
│   │   │   ├── hooks/                    # Custom hooks (useDesignState, useLLM)
│   │   │   ├── api/                      # API clients (llm.ts, imageGen.ts)
│   │   │   ├── types/                    # TypeScript definitions (room.ts, design.ts, llm.ts)
│   │   │   └── styles/                   # Global styles
│   │   ├── public/                       # Static assets (16 PNG/SVG images)
│   │   ├── next.config.ts                # Next.js configuration (minimal)
│   │   ├── tsconfig.json                 # TypeScript config with strict mode, path aliases (@/*)
│   │   ├── .eslintrc.json                # ESLint with Next.js recommended rules
│   │   ├── package.json                  # Dependencies & scripts
│   │   └── .env.example                  # Environment variables template
│   └── feature_entry_revival/            # Archived feature prototype (deleted)
├── shared/                               # Placeholder for shared utilities (currently empty)
├── docs/                                 # Design system documentation
│   ├── DESIGN_SYSTEM.md                  # Complete specifications
│   ├── tokens.ts                         # TypeScript token definitions
│   ├── tokens.json                       # Machine-readable tokens
│   └── [8 more docs files]               # Design guides and references
├── README.md                             # Main workspace documentation
├── tech_stack.md                         # Tech stack guide (Korean)
└── CLAUDE.md                             # This file
```

## Development Commands

Run these commands from `/projects/ohouse-ai-app/`:

```bash
# Development
yarn dev                 # Start dev server (port 3000, hot reload)
yarn dev -p 3002        # Use different port

# Building & Type Checking
yarn build              # Production build
yarn typecheck          # Type check without emit (faster than build)
yarn lint               # Run ESLint
yarn lint:fix           # Auto-fix ESLint issues

# Testing (not yet set up)
yarn test               # Would run Jest (needs setup)
```

## ⚠️ Design System Usage - MUST HAVE

**All components must follow the design system.** This is a critical requirement. Before building any component, consult the design system files.

### Design System Files

- **`docs/DESIGN_SYSTEM.md`**: Complete specifications with component patterns, spacing, typography, and colors
- **`docs/tokens.ts`**: TypeScript token exports (recommended for type-safe usage)
- **`docs/tokens.json`**: JSON format for reference

### Rules for Component Implementation

#### 1. **Always Import & Use Tokens**

When building components, import and use tokens from `docs/tokens.ts`:

```typescript
import {
  PrimitiveTokens,
  SemanticTokens,
  ComponentTokens
} from '@/docs/tokens';

// Use tokens in Emotion styles
const buttonStyles = css`
  background-color: ${SemanticTokens.Color.Foreground.BRAND}; // #0AA5FF
  color: ${SemanticTokens.Color.Foreground.INVERSE};
  font-size: ${SemanticTokens.Typography.Body.MEDIUM.fontSize};
  font-weight: ${SemanticTokens.Typography.Body.MEDIUM.fontWeight};
  border-radius: ${PrimitiveTokens.BorderRadius.TIGHT}; // 8px
  padding: ${PrimitiveTokens.Spacing.XXL} ${PrimitiveTokens.Spacing.XXXL}; // 12px 16px
`;
```

#### 2. **Color Usage - Context Matters**

Use semantic tokens based on context:

- **`SemanticTokens.Color.Foreground.DEFAULT`** (`#2F3438`): Primary text, headings, body text
- **`SemanticTokens.Color.Foreground.SECONDARY`** (`#828C94`): Descriptions, secondary text
- **`SemanticTokens.Color.Foreground.BRAND`** (`#0AA5FF`): CTAs, brand elements, active states
- **`SemanticTokens.Color.Foreground.INVERSE`** (`#FFFFFF`): Text on dark backgrounds
- **`SemanticTokens.Color.Background.DEFAULT`** (`#FFFFFF`): Main backgrounds, cards
- **`SemanticTokens.Color.Border.DEFAULT`** (`#E6E6E6`): Standard borders and dividers

**Never hardcode colors.** Always use token values.

#### 3. **Typography - Must Match Design System**

Use typography from `SemanticTokens.Typography`:

| Use Case | Token | Size | Weight |
|----------|-------|------|--------|
| Page titles, navigation | `H1` | 17px | 600 |
| Feature card titles | `Body.DEFAULT` | 15px | 600 |
| Button text, labels | `Body.MEDIUM` | 14px | 500 |
| Body text, descriptions | `Body.REGULAR` | 14px | 400 |
| Secondary details | `Detail.MEDIUM` | 13px | 400 |
| Badges, small labels | `Detail.SMALL` or `Detail.SMALL_BOLD` | 10px | 500/700 |

Example:
```typescript
const titleStyle = css`
  font-size: ${SemanticTokens.Typography.Body.DEFAULT.fontSize};
  font-weight: ${SemanticTokens.Typography.Body.DEFAULT.fontWeight};
  line-height: ${SemanticTokens.Typography.Body.DEFAULT.lineHeight};
  letter-spacing: ${SemanticTokens.Typography.Body.DEFAULT.letterSpacing};
  font-family: ${PrimitiveTokens.Typography.FontFamily.PRIMARY};
`;
```

#### 4. **Spacing - 8px Base Unit**

All spacing must use the 8px scale:

- `2px` (XS): Micro spacing
- `4px` (SM): Extra small
- `8px` (LG): Small, default
- `12px` (XXL): Medium (most common for component padding)
- `16px` (XXXL): Large (page edges, safe areas)
- `20px` (HUGE): Extra large (section spacing)

Apply via `PrimitiveTokens.Spacing`:

```typescript
const cardStyle = css`
  padding: ${PrimitiveTokens.Spacing.XXL}; // 12px
  margin-bottom: ${PrimitiveTokens.Spacing.HUGE}; // 20px
  gap: ${PrimitiveTokens.Spacing.LG}; // 8px
`;
```

#### 5. **Border Radius**

- **Buttons**: `8px` (`BorderRadius.TIGHT`)
- **Cards**: `12px` (`BorderRadius.SMOOTH`)
- **Images**: `12px` (`BorderRadius.SMOOTH`)
- **Badges**: `4px` (special case—use literal value)

```typescript
const buttonStyle = css`
  border-radius: ${PrimitiveTokens.BorderRadius.TIGHT}; // 8px
`;

const cardStyle = css`
  border-radius: ${PrimitiveTokens.BorderRadius.SMOOTH}; // 12px
`;
```

#### 6. **Component Specifications**

The design system defines specific component dimensions and styles in `ComponentTokens`. Check `DESIGN_SYSTEM.md` before building:

- **Top Navigation**: 44px height, specific title typography
- **Bottom Navigation**: 88.5px height with 5 items, active state brand color
- **Feature Cards (Large)**: 351×263px with image/content split
- **Feature Cards (Small)**: 167×250px grid layout
- **Primary Button**: 47×28px, brand background, specific typography

Use `ComponentTokens` constants:

```typescript
import { ComponentTokens } from '@/docs/tokens';

const cardContainer = css`
  width: ${ComponentTokens.FeatureCardLarge.width};
  height: ${ComponentTokens.FeatureCardLarge.height};
  border-radius: ${ComponentTokens.FeatureCardLarge.imageBorderRadius};
`;
```

#### 7. **Mobile Viewport & Safe Areas**

- **Viewport**: 375px × 812px (iPhone SE)
- **Horizontal Safe Area Padding**: 16px on each side
- **Content Width**: 343px (375px - 32px sides)
- **Status Bar Height**: 48px (top)
- **Bottom Navigation Height**: 88.5px (bottom)

Use `LayoutTokens`:

```typescript
import { LayoutTokens } from '@/docs/tokens';

const contentStyle = css`
  width: ${LayoutTokens.CONTAINER_WIDTH}; // 343px
  padding: 0 ${LayoutTokens.SAFE_AREA.horizontal}; // 0 16px
`;
```

### When You're Unsure - Review the Design System

If component requirements aren't explicitly provided:

1. **Check `DESIGN_SYSTEM.md`** for similar components
2. **Look at existing components** in `src/components/` for consistency
3. **Review the Figma reference** (frames: 11815-20728, 11552-5414) mentioned in the design system
4. **Match the closest existing style** and use the same tokens
5. **Ask: "What tokens would this component use?"** before adding anything custom

### Common Pitfalls to Avoid

❌ **Don't hardcode colors**: `background: '#0AA5FF'` → Use `${SemanticTokens.Color.Foreground.BRAND}`

❌ **Don't use arbitrary spacing**: `padding: '10px'` → Use multiples of 4px from `PrimitiveTokens.Spacing`

❌ **Don't ignore typography tokens**: Define all font properties → Import from `SemanticTokens.Typography`

❌ **Don't exceed 375px width**: Use `LayoutTokens.CONTAINER_WIDTH` for content

❌ **Don't mix token and hardcoded styles**: Either all tokens or all hardcoded (prefer tokens)

### Benefits of Consistent Design System Usage

- ✅ Visual consistency across all pages
- ✅ Maintainability—update tokens once, all components update
- ✅ Type safety with TypeScript token exports
- ✅ WCAG AA/AAA accessibility built-in
- ✅ Faster development with predefined patterns

---

## Architecture Overview

### Component & State Management Flow

```
Next.js App Router
  └─> Layout.tsx (Root metadata)
       └─> Feature Pages (Home, Entry, Onboarding, Room Editor, Gallery, Settings)
            └─> Feature Components
                 └─> Emotion CSS-in-JS Styling

State Management:
  - Jotai: UI state (atoms) with localStorage persistence
  - TanStack Query: Server state, caching, API sync
  - API clients: llm.ts (ChatGPT), imageGen.ts (Image generation)
```

### Route Structure

| Route | Component | Status | Purpose |
|-------|-----------|--------|---------|
| `/` | Home (`src/app/page.tsx`) | ✅ Complete | MacOS-style desktop launcher |
| `/feature_entry` | Entry Revival | Stub | Entry/project management |
| `/onboarding` | Onboarding | Stub | User setup flow |
| `/room_editor` | Room Editor | Stub | Design space editor |
| `/gallery` | Gallery | Stub | Design collection viewer |
| `/settings` | Settings | Stub | App preferences |

### Key Components

- **Desktop** (`src/components/desktop/Desktop.tsx`): MacOS-style app launcher (203 lines)
- **MobileContainer** (`src/components/layout/MobileContainer.tsx`): 375x812px viewport wrapper for iPhone SE dimensions
- **AppIcon** (`src/components/desktop/AppIcon.tsx`): Individual app icon component

## Technology Stack

### Core
- **Framework**: Next.js 15.3.0 with App Router
- **Language**: TypeScript 5.x (strict mode enabled)
- **UI Library**: React 19.0.0

### State & Data
- **UI State**: Jotai 2.12.4 (atomic state with localStorage)
- **Server State**: TanStack Query 5.72.2 (caching, API sync)

### Styling
- **CSS-in-JS**: Emotion 11.14.0 (`@emotion/react`, `@emotion/styled`)
- **Design Tokens**: Defined in `docs/tokens.ts` and `docs/tokens.json` (version 1.1)

### UI & Components
- **Radix UI**: Accessible headless components (checkbox, toast, tooltip, etc.)
- **Lucide React**: Icon library
- **Framer Motion**: Animation library 12.7.4
- **Lottie React**: JSON-based animations 2.4.1

### Code Quality
- **ESLint**: Next.js recommended rules
- **Type Safety**: Full TypeScript with `strict: true`
- **Path Alias**: `@/*` → `src/*`

## Important Type Definitions

Located in `src/types/`:

- **Room** types: Room, RoomType, DesignStyle, RoomDetails (form input)
- **Design** types: DesignSuggestion, DesignFeedback, SavedDesign
- **LLM** types: ChatMessage, LLMResponse (in src/api/llm.ts)

## API Integration Points

Both APIs are currently stubbed and need implementation:

### ChatGPT Integration
- **File**: `src/api/llm.ts`
- **Functions**: `getDesignSuggestions()`, `refineDesignSuggestions()`
- **Environment Variable**: `OPENAI_API_KEY`

### Image Generation (Nano bananas)
- **File**: `src/api/imageGen.ts`
- **Function**: `generateDesignImage()`
- **Environment Variable**: `NANO_BANANAS_API_KEY`

### LLM Hook
- **File**: `src/hooks/useLLM.ts`
- **Purpose**: Wrapper for API calls with error handling (not yet implemented)

## Design System

Comprehensive design system in `/docs/`:

- **DESIGN_SYSTEM.md**: Complete specifications (colors, typography, spacing, components)
- **tokens.ts**: TypeScript exports (primitive and semantic tokens)
- **tokens.json**: Machine-readable format for design tools
- **Version**: 1.1 (with v1.1 updates documented)

**Current Status**: Tokens defined but not yet consumed in components. Integrate these tokens into Emotion styles as you build components.

## Environment Variables

Create `.env.local` in `/projects/ohouse-ai-app/`:

```
OPENAI_API_KEY=your_key_here
NANO_BANANAS_API_KEY=your_key_here
```

See `.env.example` for reference.

## TypeScript & Linting

- **Strict Mode**: Enabled (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **Module Resolution**: `bundler` (Next.js default)
- **Target**: ES2020
- **Path Aliases**: `@/*` maps to `./src/*`

## Code Organization Guidelines

### Directory Responsibilities

- **`src/app/`**: Next.js pages/routes (one per feature)
- **`src/components/`**: Reusable React components organized by category
  - `desktop/`: Desktop-specific (launcher, icons)
  - `layout/`: Layout wrappers (MobileContainer, etc.)
  - `features/`: Feature-specific components
  - `common/`: Shared UI components
- **`src/hooks/`**: Custom React hooks for state and logic
- **`src/api/`**: API client functions (no file I/O)
- **`src/types/`**: Centralized TypeScript type definitions
- **`src/styles/`**: Global styles and theme configuration
- **`public/`**: Static assets (images, SVGs)

### Component Patterns

- Use Emotion `styled` or `css` prop for component styling
- Consume design tokens from `docs/tokens.ts` when available
- Prefer functional components with hooks
- Keep components focused and composable

## Monorepo Structure

- **Single Active Project**: `projects/ohouse-ai-app/` is the main focus
- **Future Projects**: Add new projects in `projects/[project-name]/` with their own `package.json`
- **Shared Code**: Place reusable utilities in `shared/` if needed (currently empty)

## Known Incomplete/Placeholder Areas

1. **API Integration**: Both `src/api/llm.ts` and `src/api/imageGen.ts` are stubs—implement the API calls
2. **LLM Hook**: `src/hooks/useLLM.ts` not yet created—wrap API calls with error handling
3. **Feature Pages**: Entry, Onboarding, Room Editor, Gallery, Settings are route stubs only
   - ⚠️ **MUST use design system tokens when building these pages**—refer to section: "Design System Usage - MUST HAVE"
4. **Design Token Usage**: Tokens defined but components use inline styles—integrate tokens into Emotion as you build
   - All new components must import and use `PrimitiveTokens`, `SemanticTokens`, and `ComponentTokens` from `docs/tokens.ts`
   - Reference: "Design System Usage - MUST HAVE" section above
5. **Testing**: No Jest/testing framework set up yet
6. **Form Validation**: No form library (consider React Hook Form for complex forms)
7. **Error Handling**: Placeholder error states in API clients

## Development Notes

- **Viewport**: 375x812px (iPhone SE) via MobileContainer component—mobile-first design
- **Build Output**: `projects/ohouse-ai-app/.next/` (compiled Next.js)
- **Hot Reload**: Enabled in dev mode—changes reflect immediately
- **Dependencies**: 306 packages in node_modules (478 MB)

## Related Documentation

- **README.md**: Project overview and quick start
- **tech_stack.md**: Detailed tech stack guide (Korean)
- **docs/DESIGN_SYSTEM.md**: Complete design specifications

---

**Last Updated**: November 4, 2025
**Working Directory**: `/Users/ilwonyoon/Ohouse_ai_onGoing`
