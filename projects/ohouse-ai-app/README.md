# Ohouse AI - Multi-Feature Application

> AI-powered interior design assistant | MacOS Desktop-style launcher with multiple feature projects

## 🎯 App Overview

- **Purpose**: Central hub for interior design features (Entry Revival, Onboarding, Room Editor, etc.)
- **Structure**: MacOS Desktop-style home screen with clickable app icons
- **Architecture**: Single Next.js app with multiple feature routes
- **Tech Stack**: Next.js 15.3 + React 19 + TypeScript + Emotion + Jotai

## 🏠 Home Screen (MacOS Desktop)

Features displayed as app icons:
- 📝 **Entry Revival**: Entry management
- 🎯 **Onboarding**: User setup and preferences
- 🎨 **Room Editor**: Design space editor
- 🖼️ **Gallery**: Design collection viewer
- ⚙️ **Settings**: App preferences

## 📱 Feature Routes

- [x] **Home**: MacOS-style desktop with app icons
- [x] **Entry Revival** (`/feature_entry`): Entry management feature
- [x] **Onboarding** (`/onboarding`): User setup flow
- [x] **Room Editor** (`/room_editor`): Design editor interface
- [x] **Gallery** (`/gallery`): Design collection
- [x] **Settings** (`/settings`): App preferences
- [ ] **LLM Integration**: ChatGPT API for design suggestions
- [ ] **Image Generation**: Nano bananas integration

## 📁 Project Structure

```
projects/ohouse-ai-app/
├── src/
│   ├── app/                         # Next.js app directory (routing)
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home (MacOS Desktop)
│   │   ├── feature_entry/           # Entry Revival feature
│   │   │   └── page.tsx             # Entry management
│   │   ├── onboarding/              # Onboarding feature
│   │   │   └── page.tsx             # User setup flow
│   │   ├── room_editor/             # Room Editor feature
│   │   │   └── page.tsx             # Design editor
│   │   ├── gallery/                 # Gallery feature
│   │   │   └── page.tsx             # Design collection
│   │   └── settings/                # Settings feature
│   │       └── page.tsx             # App preferences
│   ├── components/
│   │   ├── desktop/
│   │   │   ├── Desktop.tsx          # MacOS desktop launcher
│   │   │   └── AppIcon.tsx          # App icon component
│   │   ├── layout/
│   │   │   └── MobileContainer.tsx  # 375x812 viewport wrapper
│   │   ├── common/                  # Reusable UI components
│   │   └── features/                # Feature-specific components (expandable)
│   ├── hooks/
│   │   ├── useLLM.ts                # ChatGPT integration
│   │   └── useDesignState.ts        # Jotai state management
│   ├── api/
│   │   ├── llm.ts                   # ChatGPT API client
│   │   └── imageGen.ts              # Image generation client
│   ├── types/
│   │   ├── room.ts                  # Room types
│   │   ├── design.ts                # Design types
│   │   └── llm.ts                   # LLM response types
│   └── styles/
│       ├── globals.css              # Global styles
│       └── theme.ts                 # Design tokens
├── public/                          # Static assets
├── .env.example                     # Environment template
├── next.config.ts                   # Next.js config
├── tsconfig.json                    # TypeScript config
├── .eslintrc.json                   # ESLint config
└── package.json
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or if you prefer yarn (after installing it globally)
yarn install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local and add your API keys:
# - OPENAI_API_KEY: Get from https://platform.openai.com/
# - NANO_BANANAS_API_KEY: Get from your provider (future)
```

### 3. Run Development Server
```bash
npm run dev
# Access at: http://localhost:3000
```

### 4. View Mobile Viewport
- Open http://localhost:3000 in your browser
- The app renders in a fixed 375x812px container
- On mobile devices, it uses full viewport width

## 🧪 Available Commands

```bash
# Development
npm run dev        # Start dev server with hot reload

# Build
npm run build      # Build for production
npm start          # Start production server

# Code Quality
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

## 📐 Mobile Viewport

The `MobileContainer` component enforces a 375x812px viewport:
- **Desktop**: Centered in viewport with shadow (preview mode)
- **Mobile**: Full viewport width (responsive)
- **Behavior**: Touch-optimized with safe scrolling

## 🧠 Architecture

### State Management

**Jotai (Client State)**
- UI state (navigation, modals, form inputs)
- Room details being configured
- Design selection and history
- Loading/error states

**TanStack Query (Server State)**
- API responses from ChatGPT
- Image generation results
- Caching and background sync

### Component Structure

```
MobileContainer (375x812 wrapper)
└── Page Components
    ├── Home Screen
    ├── Room Input Flow
    ├── Design Results
    └── Gallery View
```

## 🤖 LLM Integration (To Implement)

### ChatGPT Integration
- `src/api/llm.ts`: API client (currently a placeholder)
- `src/hooks/useLLM.ts`: React hook for API calls
- Requires `OPENAI_API_KEY` in `.env.local`

### Example Flow
1. User inputs room details → Room state stored in Jotai
2. Click "Get Suggestions" → Create LLM prompt
3. Call ChatGPT API → Get design recommendations
4. Display results → Store in design history

## 📸 Image Generation (Future)

Placeholder implementation in `src/api/imageGen.ts`
- Will integrate Nano bananas API
- Generate design mockups from text descriptions
- Store and display in gallery

## 🎨 Design System (TBD)

Currently using custom Emotion styles per component.
Will incrementally add:
- Color tokens
- Typography system
- Component library
- Design guidelines

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3001
```

### Clear cache & reinstall
```bash
rm -rf .next node_modules package-lock.json
npm install && npm run dev
```

### Type errors
```bash
npm run typecheck
```

### Build errors
- Check all `.env.local` variables are set
- Clear `.next` folder and rebuild
- Ensure Node.js >= 22

## 📚 Next Steps

1. **Room Input Component**: Build form for room details
2. **LLM Integration**: Implement ChatGPT API calls
3. **Design Display**: Create results screen
4. **Design System**: Add custom design tokens
5. **Image Generation**: Integrate Nano bananas API

---

**Ready to start building?** Choose a feature and create it page by page!
