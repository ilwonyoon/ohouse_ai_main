# 📋 Integrated Phase 1 Task List
## Backend + Frontend Integration (Parallel Execution)

**Document Version:** 1.0
**Date:** 2025-11-06
**Status:** READY FOR EXECUTION
**Total Tasks:** 60+ | **Estimated Duration:** 3-4 weeks
**Parallel Streams:** 2 (Backend Completion + Frontend Integration)

---

## 📊 Overview

This document combines:
1. **MASTER_PRD Phase 1 Backend Completion** (5 agents + improvements)
2. **PHASE2_FRONTEND_INTEGRATION_PLAN** (Phase A-F frontend work)

Both streams run **in parallel** with clear dependencies and checkpoints.

---

## 🎯 Phase 1 Vision

**Goal:** Complete user consultation system that:
- ✅ Detects user intent accurately
- ✅ Gathers complete context
- ✅ Analyzes visual input (images)
- ✅ Routes to appropriate consultation depth
- ✅ Displays results in intuitive UI
- ✅ Tracks progress visually

---

## 🔄 Stream 1: BACKEND COMPLETION (MASTER_PRD Phase 1)

**Status:** 🟡 50% Complete | **Work Remaining:** 2-3 weeks
**Current Implementation:** `src/api/consultationEngine.ts` (1,063 LOC)

### S1.1: IntentClassifier v2 Enhancement
**Status:** 🟢 PARTIALLY DONE (70%)
**Priority:** 🔴 HIGH (Blocks all downstream)
**Estimated Effort:** 9 hours

**What's Done:**
- ✅ Signal pattern detection (Type A-D)
- ✅ Confidence scoring
- ✅ Conversion signal detection

**What's Needed:**

- [ ] **S1.1.1** Image metadata integration (2 hours)
  - Add parameters: `imageMetadata?: {color_palette, room_type, lighting}`
  - Modify `detectIntentSignals()` to accept image data
  - Combine text + image signals for better accuracy
  - **File:** `src/api/consultationEngine.ts::detectIntentSignals()`
  - **Success:** Intent classification works for image+text
  - **Test:** 5+ test cases with images

- [ ] **S1.1.2** Vision clarity scoring (3 hours)
  - Add `vision_clarity: "clear" | "emerging" | "vague"` scoring
  - Logic: confidence + metadata coverage → clarity score
  - **File:** Same function
  - **Success:** Clarity score ranges 0-1
  - **Test:** Test all 3 clarity levels

- [ ] **S1.1.3** Hybrid intent analysis (2 hours)
  - Update function signature: `detectIntentSignals(message: string, imageMetadata?: ImageMetadata)`
  - Merge text + image signals (weighted)
  - **Success:** Both sources improve accuracy
  - **Test:** 5+ scenarios (text-only, image-only, both)

- [ ] **S1.1.4** Test coverage (2 hours)
  - Write 10+ tests for image-based detection
  - Test edge cases (poor image quality, ambiguous intent)
  - **Success:** 100% test pass rate, >85% coverage

**Definition of Done (S1.1):**
- ✅ Function handles text + image inputs
- ✅ Clarity score calculated correctly
- ✅ Confidence in range [0.0-1.0]
- ✅ All 10+ tests passing
- ✅ 0 TypeScript errors
- ✅ Code documented

---

### S1.2: ContextAgent Enhancement
**Status:** 🟢 PARTIALLY DONE (80%)
**Priority:** 🟡 HIGH
**Estimated Effort:** 17 hours

**What's Done:**
- ✅ Question generation (budget, timeline, room)
- ✅ Metadata extraction from responses
- ✅ Phase routing logic

**What's Needed:**

- [ ] **S1.2.1** Form-based survey API (2 hours)
  - Design schema for structured context input
  - Create form data structure (budget tiers, timeline options)
  - **File:** New `src/api/layers/planning/types/contextSchema.ts`
  - **Success:** Schema clear and type-safe
  - **Output:**
  ```typescript
  interface ContextFormInput {
    room: string;
    budget: number;
    timeline: string;
    painPoints: string[];
    goals: string[];
    familyContext?: { children: boolean; pets: boolean };
    accessibility?: string[];
  }
  ```

- [ ] **S1.2.2** Implement form survey mode (6 hours)
  - Add mode selection: `chat` vs `form`
  - Implement form data extraction → metadata conversion
  - **File:** `src/api/consultationEngine.ts` + new `src/api/layers/planning/agents/contextAgent.ts`
  - **Success:** Both chat and form modes work
  - **Test:** 8+ test cases (all form combinations)

- [ ] **S1.2.3** Family/pet/accessibility context (4 hours)
  - Add extraction logic for family composition
  - Add pet constraints (allergies, shedding)
  - Add accessibility requirements (mobility, sensory, cognitive)
  - **Success:** All context types captured
  - **Test:** 6+ scenarios

- [ ] **S1.2.4** Context validation (3 hours)
  - Create validation schema (Zod or ts-validator)
  - Ensure required fields populated
  - **File:** `src/api/layers/planning/validation/contextValidator.ts`
  - **Success:** Invalid data rejected with clear errors

- [ ] **S1.2.5** Comprehensive tests (2 hours)
  - 15+ test cases (all field combinations)
  - Edge cases (missing fields, invalid values)
  - **Success:** 100% pass rate

**Definition of Done (S1.2):**
- ✅ Chat AND form input both supported
- ✅ Family/pet/accessibility captured
- ✅ Validation working
- ✅ 15+ tests passing
- ✅ 0 TypeScript errors

---

### S1.3: ImageAnalyzer Implementation
**Status:** 🔴 NOT IMPLEMENTED (0%)
**Priority:** 🔴 CRITICAL
**Estimated Effort:** 33 hours

**What's Needed:**

- [ ] **S1.3.1** Research & API selection (3 hours)
  - Research options: OpenAI Vision vs Google Vision vs Custom
  - **Decision Point:** Which API to use?
  - Pros/cons analysis
  - **Success:** API chosen and API key sourced

- [ ] **S1.3.2** ImageAnalyzer spec design (2 hours)
  - Define input schema (image formats, size limits)
  - Define output schema (room_type, dimensions, lighting_level, clutter, colors)
  - **File:** `src/api/layers/planning/types/imageAnalysis.ts`
  - **Success:** Schema clear and documented

- [ ] **S1.3.3** Image upload endpoint (8 hours)
  - Create new API route: `POST /api/upload/room-image`
  - Handle file validation (format, size)
  - Return signed URL or base64
  - **File:** `src/app/api/upload/room-image/route.ts` (NEW)
  - **Success:** Endpoint receives images, validates, returns URL

- [ ] **S1.3.4** Computer Vision API integration (6 hours)
  - Call vision API with image
  - Parse response
  - Extract structured data
  - **File:** `src/api/layers/planning/agents/imageAnalyzer.ts` (NEW)
  - **Success:** API returns room analysis data

- [ ] **S1.3.5** Spatial metric extraction (6 hours)
  - Extract room type from image
  - Estimate dimensions (or ask user for confirmation)
  - Assess lighting level (dark/medium/bright)
  - Detect clutter level (low/medium/high)
  - **Success:** All metrics extracted with confidence scores

- [ ] **S1.3.6** Color palette extraction (4 hours)
  - Identify dominant colors in room
  - Return 3-5 colors with hex values
  - **Success:** Color palette realistic and useful

- [ ] **S1.3.7** Error handling (2 hours)
  - Handle image upload failures
  - Handle vision API failures
  - Graceful fallback (text-only mode)
  - **Success:** System doesn't crash on bad images

- [ ] **S1.3.8** Test coverage (2 hours)
  - 10+ test cases (various room types, lighting, quality)
  - Mock vision API responses
  - **Success:** 100% pass rate

**Definition of Done (S1.3):**
- ✅ ImageAnalyzer fully implemented
- ✅ Uploads work, images analyzed
- ✅ All metrics extracted correctly
- ✅ 10+ tests passing
- ✅ Fallback to text-only works
- ✅ 0 TypeScript errors

---

### S1.4: StyleQuizAgent Implementation
**Status:** 🔴 NOT IMPLEMENTED (0%)
**Priority:** 🟡 HIGH
**Estimated Effort:** 27 hours

**What's Needed:**

- [ ] **S1.4.1** Style quiz flow design (3 hours)
  - Define 5-8 visual pairs (this or that)
  - Determine minimum required answers (5+)
  - Design progression
  - **File:** `src/api/layers/planning/config/styleQuizConfig.ts` (NEW)
  - **Success:** Quiz structure clear

- [ ] **S1.4.2** Reference image library (10 hours)
  - Curate 50+ style images (modern, cozy, minimal, bohemian, etc.)
  - Organize by style category
  - Store references
  - **File:** Image storage (local or cloud) + `styleImages.ts` index
  - **Success:** Image library ready for quiz

- [ ] **S1.4.3** Quiz UI component (8 hours)
  - Build React component for visual pairs
  - Display left/right images
  - Handle selection
  - Progress indicator
  - **File:** `src/components/StyleQuiz.tsx` (NEW)
  - **Success:** UI is intuitive, mobile-friendly

- [ ] **S1.4.4** Style preference extraction (6 hours)
  - Analyze user selections
  - Map to style categories (modern, cozy, minimal, etc.)
  - Identify patterns
  - **File:** `src/api/layers/planning/agents/styleQuizAgent.ts` (NEW)
  - **Success:** Extracts 2-3 primary styles + avoid styles

- [ ] **S1.4.5** Style classification (4 hours)
  - Define style taxonomy (15+ styles)
  - Implement classification logic
  - **File:** `src/api/layers/planning/config/styleTaxonomy.ts` (NEW)
  - **Success:** All styles properly classified

- [ ] **S1.4.6** Test coverage (2 hours)
  - 8+ test cases (various selection patterns)
  - **Success:** 100% pass rate

**Definition of Done (S1.4):**
- ✅ Quiz fully functional
- ✅ 50+ images curated
- ✅ Style extraction accurate
- ✅ UI intuitive + mobile-friendly
- ✅ 8+ tests passing
- ✅ 0 TypeScript errors

---

### S1.5: VisionBuilderAgent Implementation
**Status:** 🔴 NOT IMPLEMENTED (0%)
**Priority:** 🟡 HIGH
**Estimated Effort:** 28 hours

**What's Needed:**

- [ ] **S1.5.1** VisionBuilder spec design (2 hours)
  - Define moodboard format
  - Input: quiz output OR user images
  - Output: vision board URL + color palette + design elements
  - **File:** `src/api/layers/planning/types/visionBuilder.ts` (NEW)
  - **Success:** Spec clear

- [ ] **S1.5.2** Image generation research (3 hours)
  - Research options: Stable Diffusion, Midjourney, Dall-E, or Pinterest API
  - **Decision Point:** Which service?
  - Evaluate cost, quality, speed
  - **Success:** Service chosen

- [ ] **S1.5.3** Moodboard generation logic (8 hours)
  - Create prompt from style preferences
  - Call image generation API
  - Compile moodboard (grid of images)
  - **File:** `src/api/layers/planning/agents/visionBuilderAgent.ts` (NEW)
  - **Success:** Moodboards generate in <30 seconds

- [ ] **S1.5.4** Image generation API integration (6 hours)
  - Handle API calls
  - Manage API keys securely
  - Rate limiting
  - **Success:** API integration solid

- [ ] **S1.5.5** Color palette extraction from moodboard (4 hours)
  - Analyze generated images
  - Extract dominant colors (3-5)
  - Return hex values
  - **File:** Utility function in imageAnalyzer or visionBuilder
  - **Success:** Accurate color extraction

- [ ] **S1.5.6** Design element extraction (4 hours)
  - Identify key design elements from moodboard
  - Extract furniture cues, textures, patterns
  - **Success:** Elements descriptive + useful

- [ ] **S1.5.7** Moodboard UI display (6 hours)
  - Build React component to display moodboard
  - Show color palette
  - Show design elements
  - Mobile responsive
  - **File:** `src/components/MoodboardDisplay.tsx` (NEW)
  - **Success:** UI beautiful and functional

- [ ] **S1.5.8** Test coverage (2 hours)
  - 6+ test cases
  - Mock image generation API
  - **Success:** 100% pass rate

**Definition of Done (S1.5):**
- ✅ VisionBuilder fully implemented
- ✅ Moodboards generate quickly
- ✅ Color palette extracted accurately
- ✅ Design elements identified
- ✅ Moodboard UI responsive
- ✅ 6+ tests passing
- ✅ 0 TypeScript errors

---

### S1.6: ScopeResolver Enhancement
**Status:** 🟡 PARTIALLY DONE (60%)
**Priority:** 🟡 HIGH
**Estimated Effort:** 17 hours

**What's Done:**
- ✅ Single vs multi-room determination
- ✅ Project size classification
- ✅ Phase routing logic

**What's Needed:**

- [ ] **S1.6.1** Domain agent assignment schema (2 hours)
  - Define which domain agents to activate
  - Map user input → agent list
  - **File:** `src/api/layers/planning/types/scopeResolver.ts`
  - **Success:** Schema clear

- [ ] **S1.6.2** Multi-room mapping logic (4 hours)
  - Input: room list (kitchen, bedroom, bathroom, etc.)
  - Output: corresponding domain agents to activate
  - Handle overlapping needs
  - **File:** `src/api/consultationEngine.ts` + new agent
  - **Success:** All room types map correctly

- [ ] **S1.6.3** Constraint-based scope (3 hours)
  - Budget affects scope (low budget = fewer rooms)
  - Timeline affects scope (short timeline = fewer rooms)
  - User intent affects scope
  - **Success:** Constraints respected

- [ ] **S1.6.4** Execution strategy determination (2 hours)
  - Decide: sequential vs parallel domain execution
  - Single room = no parallelization needed
  - Multi-room = parallel execution
  - **Success:** Strategy chosen correctly

- [ ] **S1.6.5** Comprehensive tests (4 hours)
  - 12+ test cases (single/multi/edge cases)
  - Constraint scenarios
  - **Success:** 100% pass rate

- [ ] **S1.6.6** Documentation (2 hours)
  - Document scope decision logic
  - Document domain mappings
  - **Success:** Clear + complete

**Definition of Done (S1.6):**
- ✅ Multi-room assignment works
- ✅ Constraints respected
- ✅ Execution strategy chosen correctly
- ✅ 12+ tests passing
- ✅ 0 TypeScript errors

---

## 📊 Stream 1 Summary

| Agent | Status | Hours | Dependencies | Blocker? |
|-------|--------|-------|--------------|----------|
| IntentClassifier v2 | 🟡 70% | 9 | None | 🔴 YES |
| ContextAgent | 🟡 80% | 17 | IntentClassifier | 🟡 Partial |
| ImageAnalyzer | 🔴 0% | 33 | None | 🟡 Partial |
| StyleQuizAgent | 🔴 0% | 27 | None | 🟡 Partial |
| VisionBuilderAgent | 🔴 0% | 28 | StyleQuizAgent | 🔴 NO |
| ScopeResolver | 🟡 60% | 17 | All above | 🟡 Partial |
| **TOTAL** | | **131 hours** | | |

---

---

## 🔄 Stream 2: FRONTEND INTEGRATION (PHASE2_FRONTEND_INTEGRATION_PLAN)

**Status:** 🔴 0% Complete | **Work Remaining:** 3-4 weeks
**Depends On:** Stream 1 Backend completion

### S2.A: API Route Handler Update
**File:** `src/app/api/consultation/process/route.ts`
**Priority:** 🔴 HIGH
**Estimated Effort:** 6 hours

- [ ] **S2.A.1** Import enhanced consultationEngine functions (1 hour)
  ```typescript
  import {
    detectIntentSignals,
    detectConversionSignals,
    consultationEngine
  } from "@/api/consultationEngine";
  ```
  - **Success:** All functions imported correctly
  - **File:** Modify route handler

- [ ] **S2.A.2** Pass phase parameter to OpenAI (1 hour)
  ```typescript
  const response = await generateConsultantResponse(
    userMessage,
    conversationHistory,
    currentPhase  // NEW
  );
  ```
  - **Success:** Phase context passed to LLM

- [ ] **S2.A.3** Use classifyUserIntent with message (1 hour)
  ```typescript
  const intent = consultationEngine.classifyUserIntent(
    metadata,
    userMessage  // NEW: text analysis
  );
  ```
  - **Success:** Intent detection includes text analysis

- [ ] **S2.A.4** Implement auto-transition check (1.5 hours)
  ```typescript
  const transition = consultationEngine.shouldAutoTransitionPhase(
    currentPhase,
    metadata
  );
  if (transition.shouldTransition) {
    nextPhase = transition.nextPhase;
  }
  ```
  - **Success:** Phase advances automatically when ready

- [ ] **S2.A.5** Log conversion signals (1 hour)
  ```typescript
  const conversionResult = detectConversionSignals(userMessage);
  if (conversionResult.hasSignal) {
    logger.info("Conversion signal detected", {...});
  }
  ```
  - **Success:** Signals logged for analytics

- [ ] **S2.A.6** Test API route integration (0.5 hour)
  - 5+ test cases
  - **Success:** 100% pass rate

**Definition of Done (S2.A):**
- ✅ All imports working
- ✅ Phase parameter passed through
- ✅ Auto-transition functional
- ✅ Signals logged
- ✅ 5+ tests passing

---

### S2.B: ConsultationChat Component Update
**File:** `src/components/ConsultationChat.tsx`
**Priority:** 🟡 HIGH
**Estimated Effort:** 12 hours

- [ ] **S2.B.1** Get currentPhase from state (1 hour)
  ```typescript
  const { currentPhase } = useConsultationState();
  ```
  - **Success:** Phase available in component

- [ ] **S2.B.2** Pass phase to API calls (1.5 hours)
  ```typescript
  const response = await processUserMessage(userMessage, currentPhase);
  ```
  - **Success:** Phase sent with every message

- [ ] **S2.B.3** Render question type hints (4 hours)
  ```typescript
  if (response.questionType === "multiple_choice") {
    return <MultipleChoiceQuestion options={response.answerOptions} />;
  } else if (response.questionType === "range_selection") {
    return <RangeSelector options={response.answerOptions} />;
  } else {
    return <OpenEndedQuestion />;
  }
  ```
  - **File:** May need new components (MultipleChoiceQuestion, RangeSelector)
  - **Success:** Question types render correctly

- [ ] **S2.B.4** Handle answer option selection (3 hours)
  ```typescript
  const handleOptionSelected = (option: AnswerOption) => {
    sendMessage(option.label);
    if (option.nextPhaseIfSelected) {
      updatePhase(option.nextPhaseIfSelected);
    }
  };
  ```
  - **Success:** Options clickable, phase updates

- [ ] **S2.B.5** Display conversion signals (2 hours)
  ```typescript
  if (response.processingData?.conversionSignals?.length > 0) {
    toast.info("Great! Let's discuss your project in detail");
  }
  ```
  - **Success:** Toast shows when conversion detected

- [ ] **S2.B.6** Component tests (0.5 hour)
  - 6+ test cases
  - **Success:** 100% pass rate

**Definition of Done (S2.B):**
- ✅ Phase context available
- ✅ Question types render
- ✅ Option selection works
- ✅ Conversion signals displayed
- ✅ 6+ tests passing

---

### S2.C: MetadataPanel Update
**File:** `src/components/MetadataPanel.tsx`
**Priority:** 🟡 HIGH
**Estimated Effort:** 8 hours

- [ ] **S2.C.1** Display phase name (2 hours)
  ```typescript
  const phaseNames = {
    "phase_0_intent_detection": "Intent Detection",
    "phase_1a_exploratory_mode": "Exploratory Mode",
    "phase_1c_light_consultation": "Quick Consultation",
    "phase_1d_standard_consultation": "Detailed Consultation",
    "phase_8_synthesis": "Finalizing Brief"
  };
  return <div>{phaseNames[currentPhase]}</div>;
  ```
  - **Success:** Phase name displays correctly

- [ ] **S2.C.2** Show phase progress indicator (2 hours)
  - Visual progress bar (Phase 0 → 1A → 1C/1D → 8)
  - Current position highlighted
  - **Success:** Progress clear to user

- [ ] **S2.C.3** Display questions asked count (1.5 hours)
  ```typescript
  <div>Questions Asked: {questionsAsked}/8 or /25</div>
  ```
  - Depends on phase (light vs standard)
  - **Success:** Count accurate + updates

- [ ] **S2.C.4** Update phase-specific metadata fields (2 hours)
  - Show different fields per phase
  - Phase 0: intent_label, confidence
  - Phase 1-C: budget, room, pain_points
  - Phase 1-D: all fields
  - **Success:** Right fields per phase

- [ ] **S2.C.5** Component tests (0.5 hour)
  - 5+ test cases
  - **Success:** 100% pass rate

**Definition of Done (S2.C):**
- ✅ Phase name displays
- ✅ Progress indicator works
- ✅ Questions count accurate
- ✅ Phase-specific fields show
- ✅ 5+ tests passing

---

### S2.D: New UI Components
**Priority:** 🟡 HIGH
**Estimated Effort:** 12 hours

**Components Needed:**

- [ ] **S2.D.1** MultipleChoiceQuestion component (4 hours)
  - Display options as buttons/cards
  - Handle selection
  - **File:** `src/components/questions/MultipleChoiceQuestion.tsx` (NEW)
  - **Success:** Renders nicely, clickable

- [ ] **S2.D.2** RangeSelector component (4 hours)
  - Slider for range input (e.g., budget 1000-10000)
  - Display selected value
  - **File:** `src/components/questions/RangeSelector.tsx` (NEW)
  - **Success:** Slider works, value displayed

- [ ] **S2.D.3** OpenEndedQuestion component (2 hours)
  - Text input for open questions
  - **File:** `src/components/questions/OpenEndedQuestion.tsx` (NEW)
  - **Success:** Input functional

- [ ] **S2.D.4** Style Quiz component (2 hours) [May be done in Stream 1]
  - Visual pairs for style selection
  - **File:** `src/components/StyleQuiz.tsx`
  - **Success:** Quiz works + collects data

**Definition of Done (S2.D):**
- ✅ All 4 components implemented
- ✅ Components styled + responsive
- ✅ Components handle data correctly

---

### S2.E: State Management Update
**File:** `src/hooks/useConsultationState.ts`
**Priority:** 🟡 HIGH
**Estimated Effort:** 5 hours

- [ ] **S2.E.1** Add questionsAsked tracking (2 hours)
  ```typescript
  const [questionsAsked, setQuestionsAsked] = useState(0);
  ```
  - Increment on each question
  - Reset on phase change
  - **Success:** Count accurate

- [ ] **S2.E.2** Add phase change handler (2 hours)
  ```typescript
  const handlePhaseChange = (newPhase: ConsultationPhase) => {
    setCurrentPhase(newPhase);
    setQuestionsAsked(0);
    // Other updates
  };
  ```
  - **Success:** Phase changes work, state updates

- [ ] **S2.E.3** Export necessary functions (1 hour)
  ```typescript
  export {
    currentPhase,
    updatePhase,
    questionsAsked,
    handlePhaseChange,
    metadata,
    updateMetadata
  };
  ```
  - **Success:** All needed state accessible

**Definition of Done (S2.E):**
- ✅ questionsAsked tracked
- ✅ Phase changes handled
- ✅ All state properly exported
- ✅ No TypeScript errors

---

### S2.F: Testing & Validation
**Priority:** 🟡 HIGH
**Estimated Effort:** 10 hours

- [ ] **S2.F.1** Test exploratory → conversion flow (2 hours)
  - User starts exploratory
  - Conversion signal detected
  - Phase changes to light consultation
  - **Success:** Flow works seamlessly

- [ ] **S2.F.2** Test small project auto-transition (2 hours)
  - User in phase 1-C (5-8 questions)
  - Questions asked reaches limit
  - Phase advances to synthesis
  - **Success:** Auto-transition works

- [ ] **S2.F.3** Test large project flow (2 hours)
  - User in phase 1-D (15-25 questions)
  - All questions answered
  - Phase advances to synthesis
  - **Success:** Large project flow works

- [ ] **S2.F.4** Test question rendering (2 hours)
  - Open-ended questions render correctly
  - Multiple choice questions render with options
  - Range selectors work
  - **Success:** All question types display properly

- [ ] **S2.F.5** Test metadata display (2 hours)
  - MetadataPanel shows correct phase
  - Progress indicator updates
  - Question count accurate
  - **Success:** UI reflects state correctly

**Definition of Done (S2.F):**
- ✅ All flows tested end-to-end
- ✅ UI renders correctly
- ✅ State synchronization verified
- ✅ Mobile responsive verified

---

## 📊 Stream 2 Summary

| Phase | Component | Hours | Status |
|-------|-----------|-------|--------|
| A | API Route Handler | 6 | 🔴 TODO |
| B | ConsultationChat | 12 | 🔴 TODO |
| C | MetadataPanel | 8 | 🔴 TODO |
| D | New UI Components | 12 | 🔴 TODO |
| E | State Management | 5 | 🔴 TODO |
| F | Testing & Validation | 10 | 🔴 TODO |
| **TOTAL** | | **53 hours** | |

---

## 🔄 EXECUTION STRATEGY

### Parallel Execution

```
WEEK 1:
  Stream 1:
    ├─ S1.1: IntentClassifier enhancement (start immediately)
    └─ S1.3: ImageAnalyzer research + spec
  Stream 2:
    ├─ S2.A: API route updates (once S1.1 done)
    └─ S2.B: ConsultationChat prep (in parallel)

WEEK 2:
  Stream 1:
    ├─ S1.2: ContextAgent completion
    ├─ S1.3: ImageAnalyzer implementation
    └─ S1.4: StyleQuizAgent start
  Stream 2:
    ├─ S2.B: ConsultationChat implementation
    ├─ S2.C: MetadataPanel updates
    └─ S2.D: UI components start

WEEK 3:
  Stream 1:
    ├─ S1.4: StyleQuizAgent completion
    ├─ S1.5: VisionBuilderAgent start
    └─ S1.6: ScopeResolver enhancement
  Stream 2:
    ├─ S2.D: UI components completion
    ├─ S2.E: State management
    └─ S2.F: Testing start

WEEK 4:
  Stream 1:
    └─ S1.5: VisionBuilderAgent completion
  Stream 2:
    └─ S2.F: Testing completion

  INTEGRATION: Both streams merge for final integration + testing
```

### Critical Checkpoints

1. **Checkpoint 1 (End Week 1):**
   - ✅ S1.1 complete (IntentClassifier)
   - ✅ S2.A done (API route)
   - ✅ Both communicate correctly

2. **Checkpoint 2 (End Week 2):**
   - ✅ S1.2, S1.3, S1.4 complete (Context, Image, Quiz)
   - ✅ S2.B, S2.C done (Chat, MetadataPanel)
   - ✅ UI showing phase info correctly

3. **Checkpoint 3 (End Week 3):**
   - ✅ S1.5, S1.6 complete (Vision, Scope)
   - ✅ S2.D, S2.E done (Components, State)
   - ✅ All components integrated

4. **Checkpoint 4 (End Week 4):**
   - ✅ S2.F complete (All tests passing)
   - ✅ Full end-to-end working
   - ✅ Ready to commit + push

---

## 📈 Progress Tracking

This document will be updated **daily** with:
- [ ] Completed tasks (mark with ✅)
- [ ] Current work-in-progress
- [ ] Blocked items (with reason)
- [ ] Adjustments to estimates

**Update Format:**
```
Date: YYYY-MM-DD
Completed Today: [list tasks with checkmarks]
In Progress: [current work]
Blocked: [issues preventing progress]
Tomorrow: [planned work]
Updated Estimates: [any changes to hours/timeline]
```

---

## 🎯 Definition of Done (Full Phase 1)

**Phase 1 Complete When:**

### Backend (Stream 1)
- ✅ All 6 agents fully implemented
- ✅ 60+ comprehensive test cases (all passing)
- ✅ SharedUserContext properly populated:
  - intent_label, vision_clarity, space_types
  - budget, timeline, goals
  - visual_context (image data OR vision board)
  - domain assignments
- ✅ 0 TypeScript errors
- ✅ Full documentation written
- ✅ Code review passed

### Frontend (Stream 2)
- ✅ All API routes updated
- ✅ All components implemented
- ✅ State management working
- ✅ UI responsive (mobile + desktop)
- ✅ All flows tested end-to-end
- ✅ 30+ integration test cases passing
- ✅ No console errors
- ✅ Code review passed

### Integration
- ✅ Backend + Frontend communicate correctly
- ✅ End-to-end flow works: User input → API → UI → Phase advance
- ✅ All 4 main scenarios tested:
  1. Exploratory → conversion → small project
  2. Direct small project entry
  3. Large project entry
  4. Image upload analysis
- ✅ Performance acceptable (<2s per API call)
- ✅ Ready to commit + push to GitHub

---

## 🚀 Next Steps

1. **Review this document** - Make sure strategy is clear
2. **Confirm start date** - When do we begin?
3. **Daily standups** - Brief updates on progress
4. **Weekly checkpoints** - Review progress against estimates
5. **Adjust as needed** - Change plans if blockers arise

---

**Document Status:** READY FOR EXECUTION
**Created:** 2025-11-06
**Updated:** (Daily - to be tracked)
**Version:** 1.0
