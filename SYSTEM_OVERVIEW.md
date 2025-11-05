# AI Interior Design Consultant - System Overview

## 🎯 Project Mission

Build an **intelligent chatbot system** that conducts adaptive initial consultations for interior design projects, automatically extracting and categorizing user information into structured metadata, then generating comprehensive briefs for downstream AI agents.

## ✨ What Makes This System Special

### 1. **Adaptive Intelligence**
- Automatically detects user intent in first exchange
- Routes exploratory users differently from committed buyers
- Adjusts question depth based on project scope
- Generates 5-8 questions for small projects, 15-25 for large renovations

### 2. **Metadata Classification System**
Converts natural conversation into 9 metadata categories:
```
ProjectScope → Room → Goals → Budget → Timeline
       ↓
    Lifestyle → Constraints → Style → Functional
```

Each category has subcategories and a confidence score.

### 3. **Brief Generation Intelligence**
Produces 4 different brief types based on:
- User type (exploratory, small_refresh, single_room, multi_room, full_home)
- Data completeness (% of metadata fields filled)
- Project scope assessment

Ready for handoff to Style Profiler, Designer, and other AI agents.

### 4. **Conversion Tracking**
Detects when exploratory users ("just curious") show interest in real projects:
- Monitors for conversion signals in messages
- Smooth transition from fun exploration to serious consultation
- Tracks confidence levels throughout conversation

## 🏗️ System Architecture

### Layer 1: User Interface
```
ConsultationChat Component (React)
├── Real-time message updates
├── Loading indicators
├── Error handling
└── Emotion CSS styling
```

### Layer 2: State Management
```
Jotai Atoms + localStorage
├── consultationContextAtom (full state)
├── messagesAtom (conversation)
├── metadataAtom (extracted info)
├── currentPhaseAtom (consultation phase)
└── userTypeAtom (detected user type)
```

### Layer 3: Processing Pipeline
```
User Message
    ↓
[API: /api/consultation/process]
    ↓
[Metadata Extractor] → Pattern matching → ExtractedMetadata
    ↓
[Consultation Engine] → Phase logic → Next question
    ↓
[State Update] → Jotai merge → UI re-render
```

### Layer 4: Output Generation
```
When Consultation Complete
    ↓
[API: /api/consultation/brief]
    ↓
[Brief Generator] → Type selection → Structure generation
    ↓
[ConsultationBrief] (JSON) → Downstream agents
```

## 📊 Data Model

### ConsultationContext
```typescript
{
  id: string                           // Unique session ID
  userId: string                       // User identifier
  messages: ConsultationMessage[]      // All messages
  metadata: ExtractedMetadata          // Merged metadata
  phase: ConsultationPhase             // Current phase
  userType: ProjectScopeType           // Detected type
  isActive: boolean                    // Session active?
  completionStatus: string             // Progress state
  conversationQualityScore: number     // 0-1 score
}
```

### ExtractedMetadata
```typescript
{
  projectScope?: ProjectScope          // Type & rooms
  room?: RoomMetadata                  // Room details
  goals?: GoalMetadata                 // Emotional & functional
  budget?: BudgetMetadata              // Financial params
  timeline?: TimelineMetadata          // Schedule
  lifestyle?: LifestyleMetadata        // Household patterns
  constraints?: ConstraintMetadata     // Limitations
  style?: StyleMetadata                // Aesthetic hints
  functional?: FunctionalMetadata      // Activities & needs
  confidence: number                   // 0-1 quality score
  rawKeywords: string[]                // Extracted keywords
}
```

### ConsultationBrief
```typescript
{
  id: string
  briefType: "minimal" | "standard" | "exploratory" | "partial"
  executiveSummary: string
  projectContext: { spark, goals, emotionalOutcome, successDefinition }
  functionalRequirements: { rooms, primaryUsers, activities, mustHaves, constraints }
  budget: { total?, range?, allocation?, priorities }
  timeline: { targetDate?, flexibility, drivers }
  lifestyle: { household, lifestyle_factors, maintenance }
  designHints: { styleDirections, colorPreferences, formality, displayPreference }
  missingInformation: string[]
  redFlags: string[]
  specialConsiderations: string[]
  fullMetadata: ExtractedMetadata
}
```

## 🔄 Consultation Flow

```
┌─────────────────────────────────────────┐
│  Phase 0: Intent Detection               │
│  "What brings you here today?"           │
│  → Classify: exploratory vs. project     │
└────────┬────────────────────────────────┘
         │
    ┌────▼────────────────────────────────┐
    │  Route Based on Intent               │
    └────┬──────────┬──────────┬──────────┘
         │          │          │
    ┌────▼──┐  ┌────▼──┐  ┌───▼────┐
    │  Explore   │  Scope  │  Light  │
    │  Mode      │ Clarify │ Consult │
    │ (Fun,      │ (Quick) │(5-8 Q's)│
    │ Visual)    │         │         │
    └────┬──┘  └────┬──┘  └───┬────┘
         │          │          │
         │    ┌─────▼─────┐    │
         │    │ Standard   │    │
         │    │ Consult    │    │
         │    │ (15-25 Q's)│    │
         │    └─────┬─────┘    │
         │          │          │
         └──────┬───┴──────────┘
              │
         ┌────▼──────────────┐
         │  Phase 8: Synthesis │
         │  Generate Brief     │
         │  Handoff to agents  │
         └────────────────────┘
```

## 💬 Example Conversation Flow

### User: Exploratory (Tire-Kicker)
```
User: "Just curious what this does"
  → Intent: exploratory
  → Phase: Exploratory Mode
  → Question: "If you could wave a magic wand and transform any room, which would it be?"
  → Show visual examples
  → Watch for conversion signals
```

### User: Small Project
```
User: "I want to refresh my living room"
  → Intent: small_refresh
  → Phase: Light Consultation
  → Metadata extracted: room=living_room, scope=refresh
  → Questions (5-8):
     1. "What's the main thing bothering you about it?"
     2. "How do you want it to feel?"
     3. "Any furniture you're keeping?"
     4. "Budget?"
     5. "Timeline?"
  → Brief generated: Minimal Brief
  → Handed to Style Profiler
```

### User: Large Project
```
User: "Renovating my whole apartment"
  → Intent: multi_room
  → Phase: Standard Consultation
  → Questions (15-25):
     - Project spark and motivation
     - Desired feeling and success definition
     - Who uses the space
     - Activities and pain points
     - Budget discussion
     - Timeline and constraints
     - Lifestyle factors
     - Special considerations
  → Brief generated: Standard Brief
  → Comprehensive handoff to design team
```

## 🔌 API Integration

### Client-Side Usage
```typescript
// Initialize consultation
const response = await fetch('/api/consultation/init', {
  method: 'POST',
  body: JSON.stringify({ userId: 'user_123' })
});

// Process user message
const response = await fetch('/api/consultation/process', {
  method: 'POST',
  body: JSON.stringify({
    userMessage: "I want to redo my bedroom",
    consultationId: 'consultation_123',
    currentPhase: 'intent_detection',
    previousMetadata: {...}
  })
});

// Generate brief when done
const response = await fetch('/api/consultation/brief', {
  method: 'POST',
  body: JSON.stringify({
    consultationId: 'consultation_123',
    metadata: {...},
    userType: 'single_room'
  })
});
```

## 📤 Downstream Integration

### Style Profiler Agent Needs:
```json
{
  "room_type": "bedroom",
  "desired_feeling": "cozy and peaceful",
  "items_to_keep": ["grandmother's armchair"],
  "style_hints": ["modern", "minimalist"],
  "color_preferences": ["warm neutrals"]
}
```

### Product Discovery Agent Needs:
```json
{
  "room_type": "bedroom",
  "budget_range": "5k_15k",
  "items_to_keep": ["existing bed frame"],
  "must_haves": ["large nightstands", "desk for WFH"],
  "lifestyle_constraints": ["pet-friendly", "durable"]
}
```

### Visualization Agent Needs:
```json
{
  "room_type": "bedroom",
  "approximate_size": "large",
  "desired_feeling": "cozy",
  "must_have_features": ["reading nook", "home office area"]
}
```

## 🎓 Key Features Explained

### 1. Intent Detection
```
Messages analyzed for:
- Explicit statements ("I want to...")
- Scope indicators ("whole apartment", "just paint", "refresh")
- Confidence level ("definitely" vs "maybe")
- User energy level (enthusiastic vs. exploratory)

Output: ProjectScopeType (exploratory | small_refresh | single_room | multi_room | full_home)
```

### 2. Metadata Extraction
```
Each user message processed by patterns:
- Room detection (living_room, bedroom, kitchen, etc.)
- Goal keywords (cozy, modern, organized, functional)
- Budget indicators (numbers, ranges like "5k")
- Timeline signals (urgent, flexible, specific date)
- Lifestyle mentions (kids, pets, WFH, entertaining)
- Constraint identification (rental, narrow doorway, etc.)

Output: ExtractedMetadata with confidence score
```

### 3. Phase Management
```
Determines next phase based on:
- Current phase
- Metadata completeness
- User type detected
- Information gaps

Transitions automatically when conditions met
```

### 4. Question Pooling
```
Question pools organized by:
- Phase (intent_detection, light_consultation, standard_consultation)
- Topic (room, goals, budget, timeline, lifestyle)
- Context (exploratory, small project, large project)

Engine selects appropriate question based on gaps
```

### 5. Brief Generation
```
Brief type selection logic:
- Exploratory → "exploratory" brief (engagement log)
- Small project + complete data → "minimal" brief
- Large project + complete data → "standard" brief
- Incomplete data → "partial" brief

Each includes red flags and missing information flags
```

## 🚀 Performance Characteristics

### Message Processing
- Average: <500ms (local pattern matching)
- Includes: Extraction + Phase logic + Question generation
- Upgradeable to Claude API for sophisticated extraction

### State Management
- Atomic updates with Jotai
- localStorage persistence (automatic)
- No database required for current implementation

### Brief Generation
- <100ms for brief synthesis
- JSON and text format generation
- Red flag identification included

## 🔐 Data Flow & Privacy

```
User Message
    ↓
[Browser Memory + localStorage]
    ↓
[API Processing] (stateless)
    ↓
[Response Back to Browser]
    ↓
[State Update] (localStorage)

Note: Can be connected to database for persistence
```

## 🛠️ Technology Choices

### Why These Technologies?

1. **Next.js 15** - Modern React framework with App Router
2. **TypeScript 5** - Type safety and developer experience
3. **Jotai** - Lightweight atomic state (vs. Redux complexity)
4. **Emotion CSS** - Component-scoped styling
5. **Pattern Matching** - Fast, explainable extraction (vs. black-box LLM)

### Upgrade Path

1. Add Claude API for extraction sophistication
2. Add database (Supabase/Firebase) for persistence
3. Add image uploads for visual reference
4. Add conversation threading for multiple sessions
5. Add analytics dashboard

## 📈 Success Metrics

### For System:
- Extraction confidence score (target: >0.8)
- Phase transition accuracy (target: 95%)
- Brief generation quality (manual review)

### For Conversion:
- Exploratory → Consultation conversion rate
- User satisfaction (NPS)
- Time to brief generation

### For Agents:
- Downstream agent satisfaction with brief quality
- Information sufficiency rating
- Red flag accuracy

## 🎓 Design Principles

✅ **Adaptive** - Right questions for project size
✅ **Respectful** - No pressure, respects boundaries
✅ **Efficient** - Minimal questions, maximum value
✅ **Inclusive** - Works with incomplete info
✅ **Transparent** - Clear about next steps
✅ **Data-Driven** - Confidence scores on everything
✅ **Extensible** - Easy to upgrade with LLM

## 🔮 Future Vision

### Near Term (1-2 months)
- Claude API integration for extraction
- Image upload capability
- Conversation threading

### Medium Term (3-6 months)
- Integration with Style Profiler agent
- Real-time brief generation
- A/B testing framework

### Long Term (6-12 months)
- Multi-user support with auth
- Custom brief templates
- Analytics dashboard
- Mobile app

## 📚 Documentation

- **ARCHITECTURE.md** - Technical deep dive
- **README.md** - Quick start and feature overview
- **Claude skill files** - Original specification documents
- **Code comments** - Inline documentation

## ✅ Implementation Status

### ✓ Complete
- Type system (all metadata structures)
- State management (Jotai atoms)
- Metadata extraction (pattern-based)
- Consultation engine (question flow)
- Brief generator (4 brief types)
- Chat UI component
- API endpoints (3 routes)
- Documentation

### ⏳ Not Yet Implemented
- Claude API integration (planned)
- Image upload (planned)
- Database persistence (optional)
- Multi-user support (optional)
- Analytics (optional)

### 🚀 Ready to Start
- Integration with Style Profiler agent
- Testing with real conversations
- Performance optimization
- UI/UX refinement

---

**Last Updated**: November 2025
**Status**: Foundation Complete, Ready for Enhancement

For technical details, see ARCHITECTURE.md
For quick start, see README.md
