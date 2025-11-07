# 🏗️ UNIFIED MASTER PRD: AI Interior Design Agent System
## Complete Implementation Roadmap with Clear Numbering

**Document Version:** 2.1 (UNIFIED - SINGLE SOURCE OF TRUTH)
**Date:** 2025-11-07
**Author:** Ilwon Yoon
**Status:** ACTIVE - Phase 1B In Progress
**Total Estimated Effort:** 20-26 weeks | ~14,000 LOC
**Current System Completion:** 25% (~3,500 LOC implemented)
**Note:** This is the ONLY PRD document for the project. All progress tracked here exclusively.

---

## 📌 Executive Summary

This is the **SINGLE SOURCE OF TRUTH** for the AI Interior Design Agent System implementation. All work is organized into **6 phases** with clear dependencies and task breakdown.

### Numbering Convention
- **Phase N**: Major architectural layer (1-6)
- **Agent N.M**: Individual agents within each phase
- **Task N.M.K**: Specific implementation tasks within each agent

### Current Status
- ✅ **Phase 1 (Part A)**: Consultation Engine - **COMPLETE** (4253238 commit)
- 🟨 **Phase 1 (Part B)**: Planning Layer Completion - **IN PROGRESS** (50+ hours done, 150 hours remaining)
  - Core LLM integration & UI complete
  - Next: Agent 1.2 (ContextAgent) - Form-based context collection
- ⏳ **Phase 2-6**: Design through E-Commerce - **NOT STARTED**

---

## 🎯 System Vision

**Goal**: Transform interior design from manual consultation to AI-driven iterative workflow

**User Journey**:
1. User uploads room photo
2. AI analyzes intent & context
3. AI generates design proposal (layout, lighting, styling, colors, materials)
4. User provides feedback
5. AI iterates design
6. User purchases with sourced products & links

**Business Impact**: Reduce design time from weeks to hours, make professional design accessible

---

## 📐 System Architecture

### Layer Overview (6 Phases)

```
┌──────────────────────────────────────────────────────────────┐
│ PHASE 1: PLANNING & CONSULTATION (20% DONE - 50/270 hours)   │
│ Collect intent, context, visual data → Build user profile    │
├──────────────────────────────────────────────────────────────┤
│ PHASE 2: FUNCTIONAL DESIGN (0% DONE - 40-50 hours)           │
│ Layout → Lighting → Styling → Materials → Color Harmony      │
├──────────────────────────────────────────────────────────────┤
│ PHASE 3: DOMAIN SPECIALIZATION (0% DONE - 60-80 hours)       │
│ Kitchen, Bedroom, Bathroom, etc. - Room-specific rules       │
├──────────────────────────────────────────────────────────────┤
│ PHASE 4: VISUALIZATION (0% DONE - 80-100 hours)              │
│ 2D/3D rendering → Carousel presentation → Feedback           │
├──────────────────────────────────────────────────────────────┤
│ PHASE 5: ITERATION & REFINEMENT (0% DONE - 30-40 hours)      │
│ Feedback parsing → Smart re-execution → Refinement           │
├──────────────────────────────────────────────────────────────┤
│ PHASE 6: E-COMMERCE INTEGRATION (0% DONE - 30-40 hours)      │
│ Product sourcing → Purchase links → Aftercare                │
└──────────────────────────────────────────────────────────────┘
```

### Shared Context Flow
All agents communicate through **Shared User Context**:
```
Phase 1 Output (User Profile)
  ↓
Phase 2 Output (Design Specs)
  ↓
Phase 3 Output (Room-Specific Adjustments)
  ↓
Phase 4 Output (Visualizations)
  ↓
Phase 5 Input (User Feedback) → Phase 2/3 Re-execution
  ↓
Phase 6 Output (Sourced Products + Purchase Links)
```

---

## 📋 PHASE 1: PLANNING & CONSULTATION LAYER

**Status:** 🟨 20% Complete (50/270 hours)
**Timeline:** Currently in progress
**Next Milestone:** Phase 1 completion = Phase 2 blocker removed

### Purpose
Collect user intent, context preferences, and visual references to build comprehensive profile for design agents.

### Phase 1 Structure

#### Part A: CONSULTATION ENGINE (COMPLETE ✅)
**Commit:** 4253238
**Status:** ✅ DONE
**Components:**
- consultationEngine.ts (1,063 LOC) - Core consultation flow
- Phase 0: Intent detection
- Phase 1-A: Exploratory mode
- Phase 1-B: Scope clarification
- Phase 1-C: Light consultation (5-8 questions)
- Phase 1-D: Standard consultation (25+ questions)
- Phase 8: Synthesis & brief

**What it does:**
- Classifies user intent (Type A-D: Exploratory → Large Project)
- Detects conversion signals (when user moves from "just browsing" to "let's do this")
- Routes to appropriate consultation depth
- Generates context questions (budget, timeline, goals, etc.)
- Handles phase transitions

---

#### Part B: PLANNING LAYER COMPLETION (IN PROGRESS 🟨)
**Status:** 20% Complete (50 hours done, 160 hours remaining)
**Timeline:** 4 weeks

### Part B Agents (6 Total)

#### Agent 1.1: IntentClassifier v2 ✅ COMPLETE
**Status:** 🟢 IMPLEMENTED
**Commit:** 853fadb
**LOC:** ~150
**Time:** 9 hours

**Purpose:** Enhance intent detection with image + text analysis

**What was implemented:**
- ✅ ImageMetadata type system
- ✅ Vision clarity scoring (clear | emerging | vague)
- ✅ Hybrid text + image signal detection
- ✅ 11 comprehensive test cases
- ✅ Confidence boosting from visual cues

**Files:**
- src/types/consultation.ts (ImageMetadata interface)
- src/api/consultationEngine.ts (detectIntentSignals enhancement)
- src/api/__tests__/consultationEngine.test.ts (11 new tests)

---

#### Agent 1.2: ContextAgent (Enhancement) ✅ COMPLETE
**Status:** 🟢 IMPLEMENTED
**Commit:** b496563
**Actual Time:** 17 hours
**Priority:** HIGH

**Purpose:** Enhance context collection with form-based surveys

**What was implemented:**
- ✅ 1.2.1: Design context form schema (2 hours) - ContextFormField, ContextFormSection, ContextFormSchema types
- ✅ 1.2.2: Implement form survey mode (5 hours) - ContextFormRenderer with 4-section navigation
- ✅ 1.2.3: Add family/pet/accessibility context extraction (5 hours) - Enhanced metadata extraction with lifecycle enrichment
- ✅ 1.2.4: Context validation & error handling (5 hours) - Form validation and confidence scoring

**Deliverable:** Form-based context collection with validation ✅
- 4 Sections: Living Space, Household, Functionality, Constraints
- 8 Input Types: text, number, checkbox, radio, select, range, date, textarea
- Metadata extraction with children age mapping, pet behavior inference
- Accessibility needs tracking
- 25/25 tests passing

---

#### Agent 1.3: ImageAnalyzer (NEW)
**Status:** 🔴 NOT STARTED
**Estimated:** 33 hours
**Priority:** HIGH (blocks Phase 2)

**Purpose:** Extract metadata from room images via computer vision

**What needs to be done:**
- [ ] 1.3.1: Research & select vision API (OpenAI Vision, Google Vision, custom) (3 hours)
- [ ] 1.3.2: Design image analysis schema (3 hours)
- [ ] 1.3.3: Implement image upload endpoint (6 hours)
- [ ] 1.3.4: Integrate vision API calls (10 hours)
- [ ] 1.3.5: Extract room metadata (dimensions, lighting, colors, issues) (8 hours)
- [ ] 1.3.6: Error handling & validation (3 hours)

**Deliverable:** Automated room image analysis returning:
- Room type detection
- Dominant colors
- Lighting level assessment
- Space size estimation
- Visible design issues
- Style indicators

---

#### Agent 1.4: StyleQuizAgent (NEW)
**Status:** 🔴 NOT STARTED
**Estimated:** 27 hours
**Priority:** MEDIUM

**Purpose:** Extract visual style preferences through interactive quiz

**What needs to be done:**
- [ ] 1.4.1: Design style quiz structure "this or that" (4 hours)
- [ ] 1.4.2: Curate style reference image library (50+ images) (8 hours)
- [ ] 1.4.3: Implement quiz UI component (8 hours)
- [ ] 1.4.4: Style preference extraction logic (5 hours)
- [ ] 1.4.5: Style classification taxonomy (15+ styles) (2 hours)

**Deliverable:** Interactive style quiz that learns user preferences

---

#### Agent 1.5: VisionBuilderAgent (NEW)
**Status:** 🔴 NOT STARTED
**Estimated:** 28 hours
**Priority:** MEDIUM

**Purpose:** Generate moodboards from style preferences

**What needs to be done:**
- [ ] 1.5.1: Design moodboard structure (2 hours)
- [ ] 1.5.2: Research image generation APIs (Stable Diffusion, Midjourney, DALL-E) (3 hours)
- [ ] 1.5.3: Implement moodboard generation logic (10 hours)
- [ ] 1.5.4: Integrate image generation API (8 hours)
- [ ] 1.5.5: Extract colors & design elements (3 hours)
- [ ] 1.5.6: Moodboard UI display component (2 hours)

**Deliverable:** AI-generated moodboards reflecting user style + visual references

---

#### Agent 1.6: ScopeResolver (Enhancement)
**Status:** 🟡 PARTIALLY DONE (40%)
**Estimated:** 17 hours remaining
**Priority:** HIGH

**Purpose:** Determine project scope and execution strategy

**What's done:**
- ✅ Phase routing logic (determineNextPhase)
- ✅ Single-room detection

**What needs to be done:**
- [ ] 1.6.1: Multi-room project detection (3 hours)
- [ ] 1.6.2: Space assignment to domain agents (5 hours)
- [ ] 1.6.3: Constraint-based routing (kitchen special rules, etc.) (5 hours)
- [ ] 1.6.4: Parallel vs sequential execution decision (2 hours)
- [ ] 1.6.5: Test coverage (2 hours)

**Deliverable:** Intelligent scope resolver for single/multi-room projects

---

### Part B Frontend Integration (6 Tasks)

#### Task 2.A: API Route Updates
**Status:** 🔴 NOT STARTED
**Estimated:** 6 hours
**Depends on:** Agent 1.1 ✅

**What needs to be done:**
- [ ] 2.A.1: Update /api/consultation/process route (2 hours)
- [ ] 2.A.2: Pass phase parameter through API (2 hours)
- [ ] 2.A.3: Detect conversion signals in responses (2 hours)

**Files:** src/app/api/consultation/process/route.ts

---

#### Task 2.B: ConsultationChat Component
**Status:** 🔴 NOT STARTED
**Estimated:** 12 hours
**Depends on:** Task 2.A

**What needs to be done:**
- [ ] 2.B.1: Render different question types (4 hours)
- [ ] 2.B.2: Handle option selection & submission (4 hours)
- [ ] 2.B.3: Display signals/intent indicators (4 hours)

**Files:** src/components/ConsultationChat.tsx (update existing)

---

#### Task 2.C: MetadataPanel Updates
**Status:** 🔴 NOT STARTED
**Estimated:** 8 hours
**Depends on:** Task 2.B

**What needs to be done:**
- [ ] 2.C.1: Display current phase name (2 hours)
- [ ] 2.C.2: Add progress indicator (3 hours)
- [ ] 2.C.3: Show questions answered count (3 hours)

**Files:** src/components/MetadataPanel.tsx (update existing)

---

#### Task 2.D: New UI Components ✅ COMPLETE
**Status:** 🟢 IMPLEMENTED
**Commit:** f19d403
**LOC:** ~465
**Time:** 12 hours

**Purpose:** Reusable question input components

**What was implemented:**
- ✅ MultipleChoiceQuestion (120 LOC)
- ✅ RangeSelector (160 LOC)
- ✅ OpenEndedQuestion (185 LOC)
- ✅ Index exports for clean imports

**Files:**
- src/components/questions/MultipleChoiceQuestion.tsx
- src/components/questions/RangeSelector.tsx
- src/components/questions/OpenEndedQuestion.tsx
- src/components/questions/index.ts

---

#### Task 2.E: State Management
**Status:** 🔴 NOT STARTED
**Estimated:** 5 hours
**Depends on:** Task 2.A

**What needs to be done:**
- [ ] 2.E.1: Track questions asked count (2 hours)
- [ ] 2.E.2: Handle phase change events (2 hours)
- [ ] 2.E.3: Export consultation state hook (1 hour)

**Files:** src/hooks/useConsultationState.ts (update existing)

---

#### Task 2.F: Testing & Validation
**Status:** 🔴 NOT STARTED
**Estimated:** 10 hours
**Depends on:** All 2.B-E complete

**What needs to be done:**
- [ ] 2.F.1: End-to-end flow testing (5 hours)
- [ ] 2.F.2: Phase transition validation (3 hours)
- [ ] 2.F.3: Signal detection verification (2 hours)

**Deliverable:** Complete test suite for Phase 1B frontend integration

---

## 📊 PHASE 1B: CURRENT PROGRESS

### Completed (67+ hours)
- ✅ Agent 1.1: IntentClassifier v2 (9 hours) - Commit: 853fadb
- ✅ Task 2.D: UI Components (12 hours) - Commit: f19d403
- ✅ Consultation Engine Foundation (15 hours) - Commit: 4253238
- ✅ LLM Integration & Core Components (16 hours) - Commits: 821f6b0, e7193c9
  - ConsultationChat component with streaming support
  - useConsultationState hook with Jotai state management
  - Message persistence and staggered display
  - Greeting message system (Codex fixes)
  - Metadata panel integration
  - Token counter display
- ✅ Agent 1.2: ContextAgent (17 hours) - Commit: b496563 ⭐ NEW
  - Form schema types and builder
  - ContextFormRenderer component
  - Metadata extraction with family/pet/accessibility
  - Validation and error handling

### Recent Fixes by Codex (Session Nov 7)
- ✅ Fixed disappearing chat bubble bug - messages now persist correctly
- ✅ Tweaked greeting message - clearer, more concise language
- ✅ Fixed Emotion CSS-in-JS pragma issues in multiple components
- ✅ Fixed route accessibility at /ai-consultation
- ✅ Implemented Agent 1.2: ContextAgent (form-based context collection) - COMPLETE

### Remaining (133 hours)
- ⏳ Agent 1.3: ImageAnalyzer (33 hours)
- ⏳ Agent 1.4: StyleQuizAgent (27 hours)
- ⏳ Agent 1.5: VisionBuilderAgent (28 hours)
- ⏳ Agent 1.6: ScopeResolver (17 hours)
- ⏳ Task 2.A-C, 2.E-F: Frontend & Integration (41 hours)

**Completion Rate:** 67/200 hours (33.5%)
**Timeline:** 3.5 weeks remaining at current pace
**Critical Next Step:** Agent 1.3 - ImageAnalyzer for room photo analysis

---

## 🔄 DEPENDENCY GRAPH

```
Agent 1.1 ✅
    ↓
Task 2.A
    ↓
Task 2.B, 2.E
    ↓
Task 2.C
    ↓
Task 2.F

Agent 1.2 (independent)
Agent 1.3 (independent) → blocks Phase 2
Agent 1.4 → Agent 1.5
Agent 1.6 (mostly independent)
```

**Critical Path:** Agent 1.1 → 1.3 → Phase 2
**Parallel Work:** Agents 1.2, 1.4-1.6 can run simultaneously

---

## 📋 PHASE 2: FUNCTIONAL DESIGN LAYER

**Status:** 🔴 NOT STARTED (0% - 40-50 hours)
**Blocker:** Phase 1B completion required
**Timeline:** Weeks 5-6

### Purpose
Generate design specifications across functional dimensions

### Agents (5 Total)

#### Agent 2.1: LayoutAgent
- Furniture arrangement optimization
- Traffic flow analysis
- Space utilization

#### Agent 2.2: LightingAgent
- Lighting zone definition
- Fixture type & placement
- Lux level calculation

#### Agent 2.3: StylingAgent
- Mood & aesthetic definition
- Furniture category selection
- Decor element recommendations

#### Agent 2.4: MaterialAgent
- Material selection by durability
- Cost calculation within budget
- Option generation

#### Agent 2.5: ColorHarmonyAgent
- Color palette generation
- Harmony principles application
- WCAG accessibility validation

---

## 📋 PHASE 3: DOMAIN SPECIALIZATION LAYER

**Status:** 🔴 NOT STARTED (0% - 60-80 hours)
**Blocker:** Phase 2 completion required
**Timeline:** Weeks 7-9

### Purpose
Apply room-specific rules and coordination

### Agents (8 Total)
- KitchenAgent
- BedroomAgent
- BathroomAgent
- LivingRoomAgent
- ExteriorAgent
- GarageAgent
- BackyardAgent
- EntrywayAgent

---

## 📋 PHASE 4: VISUALIZATION LAYER

**Status:** 🔴 NOT STARTED (0% - 80-100 hours)
**Blocker:** Phase 3 completion required
**Timeline:** Weeks 10-13

### Purpose
Create visual design proposals and presentation

### Agents (3 Total)
- VisualizationAgent (2D/3D rendering)
- ProposalPresentationAgent (carousel format)
- FeedbackUIAgent (interaction design)

---

## 📋 PHASE 5: ITERATION LAYER

**Status:** 🔴 NOT STARTED (0% - 30-40 hours)
**Blocker:** Phase 4 completion required
**Timeline:** Weeks 14-16

### Purpose
Enable user feedback and smart re-execution

### Agents (2 Total)
- FeedbackParserAgent (understand changes)
- ExecutionAgent (re-run affected agents)

---

## 📋 PHASE 6: E-COMMERCE LAYER

**Status:** 🔴 NOT STARTED (0% - 30-40 hours)
**Blocker:** Phase 5 completion required
**Timeline:** Weeks 17-20

### Purpose
Real product sourcing and purchase integration

### Agents (4 Total)
- SourcingAgent (product matching)
- PurchaseAgent (purchase link generation)
- BudgetOptimizationAgent (cost management)
- AftercareAgent (post-purchase support)

---

## ✨ QUALITY STANDARDS

### Code
- TypeScript strict mode enabled
- 0 compilation errors
- >85% test coverage
- ESLint compliant

### Testing
- 50+ test cases per layer minimum
- Unit + integration tests
- Edge case coverage
- Performance benchmarks

### Documentation
- README per component/agent
- Inline code comments
- API documentation
- Architecture diagrams

### Git
- Atomic commits (one feature per commit)
- Clear commit messages
- Feature branches (as needed)
- Weekly push to GitHub

---

## 🎯 SUCCESS CRITERIA

| Phase | Completion | Test Coverage | TypeScript | Documentation |
|-------|------------|---------------|------------|---|
| 1A | ✅ DONE | 50+ cases | 0 errors | Complete |
| 1B | 20% | 11 new cases | 0 errors | In progress |
| 2-6 | 0% | TBD | TBD | TBD |

---

## 🚀 IMMEDIATE NEXT STEPS

### This Week
1. [ ] Task 2.A: API Route Updates (6 hours)
2. [ ] Agent 1.2: ContextAgent Enhancement (17 hours)
3. [ ] Agent 1.3: ImageAnalyzer Implementation (start, ~8 hours this week)

### This Month (4 weeks)
- Complete Phase 1B (187 hours total)
- Prepare Phase 2 implementation specs
- Team alignment on image APIs choice

### Next Month (Weeks 5-6)
- Phase 2: Functional Design Layer (40-50 hours)
- Complete functional design workflow

---

## 📞 KEY REFERENCES

### Documentation
- `archive/ai-consultant/phase-plans/PHASE1_IMPLEMENTATION_PROGRESS.md` - Current progress tracking
- `archive/ai-consultant/prd/PRD_PHASE3_TO_7.md` - Phase 3-7 detailed specs
- Interior_ai_agents_plan/ - Master plan from planning phase

### Code
- src/api/consultationEngine.ts - Phase 1A implementation
- src/components/questions/ - Phase 1B UI components

### Git Commits
- ✅ 4253238: Phase 1A complete
- ✅ 853fadb: Agent 1.1 complete
- ✅ f19d403: Task 2.D complete
- ✅ 3837eea: Planning documentation

---

## 📈 METRICS & MONITORING

### Lines of Code
- Phase 1A: 1,063 LOC (consultationEngine)
- Phase 1B: 465 LOC (UI components) + ~150 LOC (Agent 1.1) = 615 LOC so far
- Target Phase 1B: 1,500 LOC total
- Target Full System: 14,000 LOC

### Time Investment
- Phase 1A: ~40 hours (completed)
- Phase 1B: 27 hours done, 160 hours remaining (4 weeks)
- Phase 2-6: ~300-400 hours (12-16 weeks)

### Team Velocity
- Week 1: 27 hours of implementation
- Target: 40-50 hours/week = 4-6 weeks for Phase 1B

---

## 🎓 ARCHITECTURE DECISIONS

### Why Code-First (Not Claude Skills)
1. Phase 1A already uses this pattern ✅
2. 12+ agents require tight integration
3. Shared Context easier to manage
4. Testing & CI/CD more straightforward
5. TypeScript strict mode enables safety

### Why Phased Approach
1. Clear blockers/dependencies
2. Parallel work possible in some phases
3. Testable increments
4. Rollback-friendly
5. Team coordination easier

### Why Sequential Agents in Phase 2
1. Later agents depend on earlier outputs
2. Clean dependency chain
3. Easier debugging
4. Reduces LLM API calls

---

**Last Updated:** 2025-11-06
**Version:** 2.0 (UNIFIED)
**Status:** READY FOR EXECUTION ✅
**Confidence Level:** HIGH
