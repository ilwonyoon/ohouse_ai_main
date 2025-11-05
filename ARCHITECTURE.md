# AI Interior Design Consultant - Architecture & System Design

## Overview

This is an AI-powered interior design consultation chatbot built with Next.js 15, React 19, and TypeScript. The system conducts adaptive consultations with users, extracts structured metadata from conversations, and generates comprehensive briefs for downstream AI agents (Style Profiler, Designer, etc.).

## Core Philosophy

**"Just Enough Information"** - Collect the minimum viable information needed for downstream agents while respecting the user's time and emotional comfort.

The consultation adapts to different user types:
- **Exploratory Users** - Fun, visual, low-pressure experience
- **Small Refresh** - 5-8 quick questions, fast turnaround
- **Single/Multi-Room Projects** - Standard comprehensive consultation
- **Full Home Renovation** - Maximum detail gathering

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React/Next.js)                 │
│  ConsultationChat Component + useConsultationState (Jotai)  │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ┌────▼─────────┐            ┌────────▼──────────┐
    │  User Input  │            │  State Management │
    │              │            │   (Jotai Atoms)   │
    └────┬─────────┘            └───────────────────┘
         │
    ┌────▼─────────────────────────────────────┐
    │  API Layer (/api/consultation/*)        │
    │  - process (message processing)          │
    │  - brief (brief generation)              │
    │  - init (session initialization)         │
    └────┬──────────────────────────┬──────────┘
         │                          │
    ┌────▼────────────────┐    ┌───▼──────────────┐
    │ Metadata Extractor  │    │ Brief Generator  │
    │ - Pattern matching  │    │ - Template logic │
    │ - Intent detection  │    │ - Formatting     │
    │ - Data classification    │ - Validation     │
    └────┬────────────────┘    └──────────────────┘
         │
    ┌────▼──────────────────────────┐
    │ Consultation Engine            │
    │ - Phase management             │
    │ - Question generation          │
    │ - Conversion signal detection  │
    └────┬──────────────────────────┘
         │
    ┌────▼──────────────┐
    │ Data Types        │
    │ - Consultation    │
    │ - Metadata        │
    │ - Brief           │
    └───────────────────┘
```

## Key Components

### 1. **Type Definitions** (`src/types/consultation.ts`)

Complete TypeScript interfaces for all data structures:

#### Core Types:
- `ConsultationMessage` - Individual message in conversation
- `ExtractedMetadata` - Structured information extracted from messages
- `ConsultationContext` - Complete consultation session state
- `ConsultationBrief` - Final output for downstream agents

#### Metadata Categories:
- `ProjectScope` - Type and rooms of project
- `RoomMetadata` - Room details, size, light, issues
- `GoalMetadata` - Goals, emotional outcomes, pain points
- `BudgetMetadata` - Budget range, comfort level, allocation
- `TimelineMetadata` - Target date, flexibility, drivers
- `LifestyleMetadata` - Household, pets, work habits
- `ConstraintMetadata` - Physical, rental, delivery constraints
- `StyleMetadata` - Style hints, colors, formality
- `FunctionalMetadata` - Activities, storage needs, accessibility

### 2. **State Management** (`src/hooks/useConsultationState.ts`)

Jotai-based atomic state management with localStorage persistence:

```typescript
// Atoms
- consultationContextAtom     // Full consultation state
- messagesAtom               // Messages array
- metadataAtom              // Extracted metadata
- currentPhaseAtom          // Consultation phase
- userTypeAtom              // Detected user type
- isLoadingAtom             // Loading state
- errorAtom                 // Error messages

// Hook: useConsultationState()
- initializeConsultation()   // Start new session
- addMessage()              // Add message to conversation
- updatePhase()             // Change phase
- updateUserType()          // Update detected type
- mergeMetadata()           // Merge extracted metadata
- exportConsultationData()  // Get data for API
```

### 3. **Metadata Extraction** (`src/api/metadataExtractor.ts`)

Extracts structured information from user messages using pattern matching:

**Key Functions:**
- `extractMetadataFromMessage()` - Main extraction function
  - Detects project scope/intent
  - Extracts room information
  - Identifies goals and pain points
  - Extracts budget information
  - Identifies timeline drivers
  - Detects lifestyle factors
  - Finds constraints
  - Extracts style hints

**Pattern-Based Extraction:**
- Intent detection (exploratory, small_refresh, single_room, multi_room, full_home)
- Room classification (living_room, bedroom, kitchen, etc.)
- Budget range detection (under_5k, 5k_15k, 15k_30k, over_30k)
- Timeline urgency assessment
- Lifestyle factor identification
- Constraint detection

**Confidence Scoring:**
- Each extraction comes with confidence score (0-1)
- Based on completeness of extracted fields

### 4. **Consultation Engine** (`src/api/consultationEngine.ts`)

Orchestrates the conversation flow based on Claude skill:

**Key Classes/Methods:**
- `ConsultationEngine.generateNextQuestion()` - Generate adaptive questions
- `ConsultationEngine.processUserResponse()` - Analyze user messages
- `ConsultationEngine.shouldMoveToNextPhase()` - Determine phase transitions
- `ConsultationEngine.determineNextPhase()` - Route based on user type
- `ConsultationEngine.detectConversionSignal()` - Identify tire-kicker to buyer conversion

**Question Pools:**
- Intent detection questions
- Light consultation questions (5-8 quick)
- Standard consultation questions (15-25 comprehensive)
- Exploratory mode questions

**Phase Management:**
```
intent_detection → scope_clarification → light_consultation or standard_consultation → synthesis
```

### 5. **Brief Generator** (`src/api/briefGenerator.ts`)

Converts metadata into structured briefs for downstream agents:

**Brief Types:**
1. **Minimal Brief** - Small refresh projects (room, goal, budget, timeline)
2. **Standard Brief** - Large projects (comprehensive information)
3. **Exploratory Brief** - Pre-conversion tire-kickers (engagement log)
4. **Partial Brief** - Reluctant users with gaps (flexible recommendations)

**Output Formats:**
- JSON (for API consumption)
- Text (for display/documentation)

### 6. **API Endpoints**

#### `POST /api/consultation/init`
Initialize new consultation session
```json
Request: { userId: string, clientName?: string }
Response: { success: boolean, data: ConsultationContext }
```

#### `POST /api/consultation/process`
Process user message and generate response
```json
Request: {
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
  conversionSignal?: string,
  questionsAsked: number
}
```

#### `POST /api/consultation/brief`
Generate final consultation brief
```json
Request: {
  consultationId: string,
  messages: ConsultationMessage[],
  metadata: ExtractedMetadata,
  userType: ProjectScopeType,
  clientName?: string
}
Response: {
  success: boolean,
  brief: ConsultationBrief,
  briefJSON: string,
  data: { brief, briefType, summary, ... }
}
```

### 7. **UI Component** (`src/components/ConsultationChat.tsx`)

React component for chatbot UI:

**Features:**
- Message display (user/assistant)
- Auto-scrolling
- Loading indicators
- Error handling
- Real-time state updates
- Responsive design
- Emotion CSS styling

**State Integration:**
- Uses `useConsultationState` hook
- Manages local input state
- Calls API endpoints on message send
- Updates global state with responses

## Data Flow

### 1. User Sends Message
```
User Types Message
       ↓
ConsultationChat Component
       ↓
Calls /api/consultation/process
```

### 2. Message Processing
```
/api/consultation/process
       ↓
extractMetadataFromMessage()
       ↓
Pattern matching extracts structured data
       ↓
Returns ExtractedMetadata with confidence score
```

### 3. Response Generation
```
ConsultationEngine.processUserResponse()
       ↓
Updates userType if new intent detected
Checks for conversion signals
       ↓
ConsultationEngine.generateNextQuestion()
       ↓
Selects appropriate question based on phase/metadata gaps
       ↓
Returns AssistantResponse
```

### 4. State Update
```
useConsultationState hook
       ↓
Merges new metadata
Updates phase if needed
Adds assistant message
       ↓
Updates localStorage
Triggers UI re-render
```

### 5. Brief Generation (When Complete)
```
User completes consultation
       ↓
Frontend calls /api/consultation/brief
       ↓
BriefGenerator.generateBrief()
       ↓
Selects brief type based on userType + completeness
       ↓
Generates structured ConsultationBrief
       ↓
Returns JSON + formatted text
       ↓
Brief ready for Style Profiler, Designer, etc.
```

## Consultation Phases

### Phase 0: Intent Detection
- Opens with low-pressure question
- Classifies user in first 1-2 exchanges
- Routes to appropriate mode

### Phase 1-A: Exploratory Mode
- For tire-kickers ("just curious")
- Make it fun and visual
- Watch for conversion signals

### Phase 1-B: Scope Clarification
- For vague interest ("not sure")
- Gentle probing
- Route to Light or Standard

### Phase 1-C: Light Consultation
- For small projects (5-8 questions)
- Room, pain point, feeling, budget, keeping, timeline, must-haves
- Fast and conversational

### Phase 1-D: Standard Consultation
- For medium/large projects (15-25 questions)
- Comprehensive discovery
- Project context, goals, functional needs, budget, timeline, scope

### Phase 8: Synthesis
- Confirm information
- Generate brief
- Handoff to Style Profiler

## Metadata Classification

Each piece of information is classified into:

1. **ProjectScope** - Type of project and rooms involved
2. **Room** - Specific room details
3. **Goals** - What user wants to achieve
4. **Budget** - Financial parameters
5. **Timeline** - Schedule and drivers
6. **Lifestyle** - Household and behavior patterns
7. **Constraints** - Physical and practical limitations
8. **Style** - Aesthetic preferences (initial hints)
9. **Functional** - Activities and requirements

## Downstream Agent Integration

### Style Profiler Receives:
- room type
- desired feeling
- items to keep
- style hints
- color preferences

### Visualization Agent Receives:
- room type
- approximate size
- desired feeling
- must-have features

### Product Discovery Agent Receives:
- room type
- budget range
- items to keep
- must-haves
- lifestyle constraints

## Key Design Principles

✅ **Adaptive** - Question depth matches project scope
✅ **Respectful** - No pressure tactics, respects boundaries
✅ **Efficient** - Right amount of questions for project size
✅ **Inclusive** - Works with incomplete information
✅ **Conversational** - Natural language, not interrogation
✅ **Transparent** - Clear about what happens next
✅ **Conversion-Aware** - Detects and nurtures exploratory users

## Error Handling

- Try-catch blocks on API endpoints
- Validation on all inputs
- Confidence scoring on extractions
- Red flag identification for design team
- Missing information flagging

## Future Enhancements

1. **LLM Integration** - Replace pattern matching with Claude API for sophisticated extraction
2. **Image Upload** - Allow users to upload photos of current space
3. **Multi-language Support** - Internationalization
4. **Conversation Threading** - Support multiple consultations per user
5. **Preference History** - Learn from past conversations
6. **A/B Testing** - Test different questioning strategies
7. **Analytics** - Track conversion rates, engagement metrics
8. **Custom Brief Templates** - Organization-specific brief formats

## Environment Variables

```
OPENAI_API_KEY=your_key_here        # Future ChatGPT integration
NANO_BANANAS_API_KEY=your_key_here  # Future image generation
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## Development Notes

- Built with Emotion for CSS-in-JS styling
- Jotai for lightweight state management
- No heavy dependencies - lightweight and fast
- Pattern matching for metadata extraction (can upgrade to LLM later)
- localStorage persistence for sessions
- Fully typed with TypeScript strict mode

## File Structure

```
src/
├── app/
│   ├── api/consultation/
│   │   ├── init/route.ts         # Initialize session
│   │   ├── process/route.ts      # Process message
│   │   └── brief/route.ts        # Generate brief
│   ├── page.tsx                  # Main chatbot page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   └── ConsultationChat.tsx       # Chatbot UI component
├── hooks/
│   └── useConsultationState.ts    # Jotai state management
├── api/
│   ├── metadataExtractor.ts      # Extract metadata
│   ├── consultationEngine.ts     # Question generation & flow
│   └── briefGenerator.ts         # Generate briefs
├── types/
│   └── consultation.ts           # TypeScript definitions
└── styles/
    └── (global styling)
```

---

**Last Updated**: November 2025
**Status**: Foundation Complete, Ready for Enhancement
