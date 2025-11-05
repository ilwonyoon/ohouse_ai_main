# AI Interior Design Consultant

An intelligent chatbot that conducts adaptive initial consultations for interior design projects. Gathers structured metadata through natural conversation and generates comprehensive briefs for downstream AI agents (Style Profiler, Designer, etc.).

## 🎯 What This Does

This application implements an **AI-powered consultation system** that:

1. **Conducts Adaptive Consultations** - Asks appropriate questions based on project scope
2. **Extracts Structured Metadata** - Converts conversation into categorized information
3. **Detects User Intent** - Routes exploratory users vs. committed buyers differently
4. **Generates Briefs** - Creates structured output for downstream AI agents
5. **Manages Conversation State** - Maintains consultation context with localStorage persistence

### Key Features

✨ **Smart Intent Detection** - Automatically detects if user is exploring vs. ready to project
✨ **Scope-Aware Questioning** - 5-8 questions for small projects, 15-25 for large renovations
✨ **Metadata Classification** - Automatically categorizes goals, budget, timeline, lifestyle, constraints
✨ **Multiple Brief Types** - Generates minimal, standard, exploratory, or partial briefs
✨ **Conversion Tracking** - Detects when exploratory users become committed buyers
✨ **Error Resilience** - Works with incomplete information, flags gaps for design team

## 🏗️ Architecture

```
User Input → Message Processing → Metadata Extraction → Question Generation
                                        ↓
                              Consultation Engine
                                        ↓
                              Brief Generation & Handoff
```

**Core Components:**
- **Type System** (`consultation.ts`) - Complete TypeScript interfaces
- **State Management** (`useConsultationState`) - Jotai atoms with localStorage
- **Metadata Extractor** (`metadataExtractor.ts`) - Pattern-based information extraction
- **Consultation Engine** (`consultationEngine.ts`) - Adaptive question flow
- **Brief Generator** (`briefGenerator.ts`) - Structured output generation
- **Chat UI** (`ConsultationChat.tsx`) - React component with real-time updates
- **API Routes** (`/api/consultation/*`) - Endpoints for processing and brief generation

See **ARCHITECTURE.md** for detailed system design.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 22
- Yarn 3.2.0

### Installation

```bash
# Clone and setup
cd projects/ai-consultant
yarn install
```

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
yarn build
yarn start
```

### Type Checking & Linting

```bash
yarn typecheck
yarn lint
yarn lint:fix
```

## 📝 How It Works

### 1. User Initiates Consultation
```
User: "Hi, I want to refresh my living room"
↓
Intent Detection: "small_refresh" scope detected
↓
Phase: "light_consultation" (5-8 questions mode)
```

### 2. Metadata Extraction
```
Message → Pattern Matching → Extracted Metadata
{
  projectScope: { type: "small_refresh", rooms: ["living_room"] },
  goals: { emotional_outcome: "cozy", pain_points: ["dark", "cluttered"] },
  budget: { range: "5k_15k", comfort_level: "flexible" }
  ...
}
```

### 3. Adaptive Questions
```
Engine determines gaps in metadata
↓
Generates contextual follow-up question
↓
"How do you want it to feel when we're done?"
```

### 4. Brief Generation
```
After consultation complete:
↓
Analyzes collected metadata
↓
Generates ConsultationBrief
{
  briefType: "minimal",
  executiveSummary: "Quick project summary...",
  projectContext: {...},
  functionalRequirements: {...},
  budget: {...},
  ...
}
```

## 📊 Metadata Categories

All user information is automatically classified into:

- **ProjectScope** - Type (exploratory, small_refresh, single_room, multi_room, full_home)
- **Room** - Room details, size, light, existing pieces
- **Goals** - Emotional outcomes, pain points, must-haves
- **Budget** - Total amount, range, comfort level, allocation
- **Timeline** - Target date, flexibility, drivers (baby, moving, event)
- **Lifestyle** - Household, pets, work from home, entertaining frequency
- **Constraints** - Ownership (rented/owned), physical limitations, architectural features
- **Style** - Style hints, color preferences, formality level
- **Functional** - Primary activities, storage needs, accessibility needs

Each metadata field has a confidence score indicating extraction quality.

## 🔌 API Endpoints

### Initialize Consultation
```bash
POST /api/consultation/init
Body: { userId: string, clientName?: string }
Response: { success: boolean, data: ConsultationContext }
```

### Process Message
```bash
POST /api/consultation/process
Body: {
  userMessage: string,
  consultationId: string,
  previousMetadata?: ExtractedMetadata,
  currentPhase?: ConsultationPhase,
  messages?: ConsultationMessage[]
}
Response: {
  success: boolean,
  extractedMetadata: ExtractedMetadata,
  assistantResponse: ConsultantResponse,
  nextPhase: ConsultationPhase,
  shouldTransition: boolean,
  conversionSignal?: string
}
```

### Generate Brief
```bash
POST /api/consultation/brief
Body: {
  consultationId: string,
  messages: ConsultationMessage[],
  metadata: ExtractedMetadata,
  userType: ProjectScopeType,
  clientName?: string
}
Response: {
  success: boolean,
  brief: ConsultationBrief,
  briefJSON: string
}
```

## 🎨 UI Components

### ConsultationChat Component

Main chatbot interface with:
- Real-time message updates
- Auto-scrolling
- Loading indicators
- Error handling
- Responsive design
- Emotion CSS styling

```tsx
<ConsultationChat
  userId="user_123"
  onBriefGenerated={(brief) => console.log(brief)}
/>
```

## 📋 Consultation Phases

1. **Intent Detection** - Classify user type in first exchange
2. **Scope Clarification** - Clarify project size if vague
3. **Light Consultation** - 5-8 questions for small projects
4. **Standard Consultation** - 15-25 questions for large projects
5. **Exploratory Mode** - Fun, visual mode for tire-kickers
6. **Synthesis** - Confirm information and generate brief

## 🔄 State Management

Using **Jotai** with localStorage persistence:

```typescript
const {
  context,           // Full consultation state
  messages,          // Conversation messages
  metadata,          // Extracted metadata
  currentPhase,      // Current consultation phase
  userType,          // Detected user type

  // Actions
  initializeConsultation,
  addMessage,
  updatePhase,
  mergeMetadata,
  exportConsultationData
} = useConsultationState();
```

## 📤 Downstream Integration

Generated briefs are ready for:

- **Style Profiler Agent** - Conducts visual style discovery
- **Visualization Agent** - Creates mockups and renderings
- **Product Discovery Agent** - Sources furniture and items
- **Designer Agent** - Creates complete design plan

Each downstream agent receives only relevant metadata:

```typescript
// For Style Profiler
{
  room_type, desired_feeling, items_to_keep, style_hints, color_preferences
}

// For Product Discovery
{
  room_type, budget_range, items_to_keep, must_haves, lifestyle_constraints
}

// For Visualization
{
  room_type, size, desired_feeling, must_have_features
}
```

## 🎓 Key Design Principles

✅ **Adaptive** - Question depth matches project scope
✅ **Respectful** - No pressure tactics, respects "I don't know" responses
✅ **Efficient** - Right amount of questions for project size
✅ **Inclusive** - Works with incomplete information
✅ **Conversational** - Natural language, not interrogation
✅ **Transparent** - Clear about next steps
✅ **Data-Driven** - All extractions have confidence scores

## 🚀 Future Enhancements

- **LLM Integration** - Use Claude API for sophisticated extraction
- **Image Upload** - Allow photo of current space
- **Multi-language** - Support international users
- **Conversation Threading** - Multiple consultations per user
- **Analytics** - Track conversion rates and patterns
- **Custom Templates** - Organization-specific brief formats
- **A/B Testing** - Test different questioning strategies

## 📦 Project Structure

```
src/
├── app/
│   ├── api/consultation/
│   │   ├── init/route.ts         # Initialize session
│   │   ├── process/route.ts      # Process message
│   │   └── brief/route.ts        # Generate brief
│   ├── page.tsx                  # Main chatbot page
│   ├── layout.tsx                # Root layout
│   └── globals.css
├── components/
│   └── ConsultationChat.tsx       # Chatbot UI
├── hooks/
│   └── useConsultationState.ts    # State management
├── api/
│   ├── metadataExtractor.ts      # Extract metadata
│   ├── consultationEngine.ts     # Question flow
│   └── briefGenerator.ts         # Generate briefs
├── types/
│   └── consultation.ts           # TypeScript definitions
└── ARCHITECTURE.md               # Detailed system design
```

## 💻 Technology Stack

- **Next.js 15.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Emotion 11** - CSS-in-JS styling
- **Jotai 2.12** - Lightweight state management
- **TanStack Query 5.72** - Server state (prepared for use)

## 📖 Documentation

- **ARCHITECTURE.md** - Detailed system design and data flow
- **Claude skill files** - Original skill specifications in `/Claude skill` folder

## 🔧 Environment Variables

Create `.env.local`:

```
OPENAI_API_KEY=your_key_here
NANO_BANANAS_API_KEY=your_key_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

See `.env.example` for template.

## 👥 Integration with Ohouse AI Monorepo

This project is part of the larger Ohouse AI initiative:
- Shares design system tokens from `/docs`
- Follows monorepo structure conventions
- Can integrate with other design agents

See main `README.md` for full monorepo context.

## 📝 License

Part of Ohouse AI project.

---

**Questions?** Check ARCHITECTURE.md for detailed technical documentation.
