# Ohouse AI - Multi-Project Workspace

> A workspace for prototyping multiple AI-powered design applications

## 📁 Project Structure

```
Ohouse_ai_onGoing/
├── projects/                          # All project apps
│   ├── ohouse-ai-app/                # Mobile interior design AI app (375x812px)
│   ├── feature_entry_revival/        # Entry management feature prototype
│   └── [future-projects]/            # Add new projects here
├── shared/                            # Shared utilities, types, helpers (optional)
├── docs/                              # Documentation
├── archive/                           # Legacy plans, reports, and docs (read-only reference)
├── tech_stack.md                      # Frontend tech stack reference
└── README.md                          # This file
```

Archived planning material now lives in `archive/` (see `archive/README.md` for structure).

## 🚀 Projects

### Ohouse AI (Main Project)
- **Description**: Central hub for interior design features with MacOS Desktop-style launcher
- **Architecture**: Single Next.js app with multiple feature routes
- **Features**: Entry Revival, Onboarding, Room Editor, Gallery, Settings
- **Status**: 🚀 Running on http://localhost:3002
- **Location**: `projects/ohouse-ai-app/`

**Features accessible at:**
- 🏠 Home (Desktop): `http://localhost:3002/`
- 📝 Entry Revival: `http://localhost:3002/feature_entry`
- 🎯 Onboarding: `http://localhost:3002/onboarding`
- 🎨 Room Editor: `http://localhost:3002/room_editor`
- 🖼️ Gallery: `http://localhost:3002/gallery`
- ⚙️ Settings: `http://localhost:3002/settings`

```bash
cd projects/ohouse-ai-app
npm run dev  # Already running!
```

## 🛠️ Tech Stack (All Projects)

- **Framework**: Next.js 15.3.0
- **Language**: TypeScript 5.x
- **State Management**: Jotai + TanStack Query
- **Styling**: Emotion (CSS-in-JS)
- **UI Components**: Radix UI + @bucketplace/design-system + Lucide Icons
- **Animation**: Framer Motion + Lottie React
- **Package Manager**: Yarn 3.2.0 (Node.js >= 22)

See `tech_stack.md` for full details.

## 📝 Quick Start

### Prerequisites
```bash
# Check Node.js version (needs >= 22)
node --version

# Check/Install Yarn
yarn --version
npm install -g yarn
```

### Working on a Project

```bash
# Navigate to project
cd projects/[project-name]

# Install dependencies
npm install
# or use yarn if preferred
yarn install

# Run development server
npm run dev
# or with yarn
yarn dev

# Available commands
npm run build       # Production build
npm run typecheck   # Type checking
npm run lint        # Linting
npm run lint:fix    # Auto-fix linting issues
```

## 📚 Creating a New Project

When you're ready to start a new project:

1. Create folder: `mkdir projects/[new-project-name]`
2. Initialize Next.js: `cd projects/[new-project-name] && yarn create next-app .`
3. Update `package.json` with the shared tech stack dependencies
4. Update this README with project info

## 🔗 Shared Utilities

If projects need to share code (types, utils, helpers), place them in `shared/`:

```
shared/
├── types/
├── utils/
└── hooks/
```

Then import from projects as needed.

## 🎯 Workflow

1. **Plan** flow for each project individually
2. **Build** features one by one
3. **Test** within the project's viewport
4. **Iterate** based on requirements
5. **Document** design decisions in `/docs`

---

**Ready to start?** Begin with Ohouse AI app:
```bash
cd projects/ohouse-ai-app
```
