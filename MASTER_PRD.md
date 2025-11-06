# 🏗️ MASTER PRD: AI Interior Design Agent System
## Complete Implementation Roadmap (Phase 1-6)

**Document Version:** 1.0
**Date:** 2025-11-06
**Author:** Ilwon Yoon
**Status:** ACTIVE - Ready for Phased Implementation
**Total Estimated Effort:** 17-24 weeks | ~12,000 LOC
**Current System Completion:** 14% (~2,966 LOC implemented)

---

## 📌 Executive Summary

This PRD outlines the **complete implementation roadmap** for the AI Interior Design Agent System, based on the master plan (`Interior_ai_agents_plan/`). The system consists of **28+ specialized agents** organized into **6 implementation phases**, progressing from consultation → design generation → e-commerce fulfillment.

### Current State
- ✅ Phase 1 (Consultation): **50% Complete** (3/6 planning agents)
- ❌ Phase 2-6: **0% Complete** (24+ agents not implemented)

### System Goal
Transform interior design from **manual linear consultation** to **AI-driven, iterative design workflow** with real product sourcing and purchase integration.

---

## 🎯 Vision Statement

**From:** User submits room photo → System offers consultation
**To:** User submits photo → AI generates design proposal → User iterates → User purchases with sourced products

**Key Outcome:** Reduce design turnaround from weeks to hours, make professional design accessible to all.

---

## 📐 System Architecture (6 Phases)

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Planning & Consultation (Currently 50% Done)                  │
│ 6 Agents | Intent detection → Context gathering → User profiling       │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Functional Design (0% Done) ⭐ CRITICAL BLOCKER               │
│ 5 Agents | Layout → Lighting → Styling → Materials → Color Harmony     │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Domain Specialization (0% Done)                               │
│ 8+ Agents | Room-specific coordination (Kitchen, Bedroom, etc)         │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Visualization & Presentation (0% Done)                        │
│ 3 Agents | 2D/3D rendering → Carousel presentation → Feedback loop     │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: Iteration & Refinement (0% Done)                              │
│ 2 Agents | Feedback parsing → Smart re-execution                       │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 6: E-Commerce Integration (0% Done)                              │
│ 4 Agents | Sourcing → Purchase → Aftercare                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 PHASE 1: PLANNING & CONSULTATION LAYER
**Status:** 🟡 50% Complete | **Estimated Remaining:** 2-3 weeks | **LOC:** 1,500 additional
**Current Implementation:** consultationEngine.ts (1,063 LOC) + supporting files

### Phase 1 Purpose
Collect user intent, context, and visual reference data to build comprehensive user profile for downstream design agents.

### Phase 1 Agents (6 Total)

#### 1.1 IntentClassifier v2
**Status:** 🟢 PARTIALLY IMPLEMENTED (70%)
**File:** `src/api/consultationEngine.ts::detectIntentSignals()`
**What's Done:**
- ✅ Signal pattern detection (Type A-D: Exploratory → Large Project)
- ✅ Confidence scoring
- ✅ Conversion signal detection

**What's Missing:**
- ❌ Image metadata integration (tie visual cues to intent)
- ❌ Vision clarity scoring (clear intent vs fuzzy intent)
- ❌ Hybrid analysis (text + image combined classification)

**Tasks:**
- [ ] 1.1.1: Add image metadata parsing to `detectIntentSignals()` (~2 hours)
- [ ] 1.1.2: Implement vision clarity scoring logic (~3 hours)
- [ ] 1.1.3: Write 10+ test cases for image-based intent detection (~4 hours)
- [ ] 1.1.4: Document intent confidence thresholds (~1 hour)

**Success Criteria:**
- [ ] Intent classification works for text-only AND image+text scenarios
- [ ] Confidence score ranges 0.0-1.0
- [ ] Vision clarity = "clear" | "emerging" | "vague"
- [ ] 0 TypeScript errors

---

#### 1.2 ContextAgent
**Status:** 🟢 PARTIALLY IMPLEMENTED (80%)
**File:** `src/api/consultationEngine.ts::generatePhase1cQuestion()` + `generatePhase1dQuestion()`
**What's Done:**
- ✅ Question generation for budget, timeline, room, pain points
- ✅ Metadata extraction from user responses
- ✅ Phase routing based on context

**What's Missing:**
- ❌ Form-based survey interface (structured input)
- ❌ Visual context integration (images + answers)
- ❌ Family/pet context handling (constraints collection)
- ❌ Accessibility requirements (mobility, sensory)

**Tasks:**
- [ ] 1.2.1: Design Context API schema (form input structure) (~2 hours)
- [ ] 1.2.2: Implement form-based survey mode in ContextAgent (~6 hours)
- [ ] 1.2.3: Add family/pet/accessibility context extraction (~4 hours)
- [ ] 1.2.4: Write 15+ test cases for all context scenarios (~5 hours)
- [ ] 1.2.5: Create context validation schema (~2 hours)

**Success Criteria:**
- [ ] Chat-based AND form-based context collection both work
- [ ] All context fields populated or explicitly optional
- [ ] Family/pet/accessibility constraints captured
- [ ] Context object validates against schema

---

#### 1.3 ImageAnalyzer
**Status:** 🔴 NOT IMPLEMENTED (0%)
**File:** New - `src/api/layers/planning/agents/imageAnalyzer.ts`
**Purpose:** Analyze uploaded room photos for spatial facts

**Tasks:**
- [ ] 1.3.1: Research computer vision options (OpenAI Vision / Google Vision / custom) (~3 hours)
- [ ] 1.3.2: Design ImageAnalyzer spec (input/output schema) (~2 hours)
- [ ] 1.3.3: Implement image upload + processing endpoint (~8 hours)
- [ ] 1.3.4: Integrate computer vision API (~6 hours)
- [ ] 1.3.5: Extract spatial metrics (room type, dimensions, lighting, clutter) (~6 hours)
- [ ] 1.3.6: Write 10+ test cases (mock images, edge cases) (~6 hours)
- [ ] 1.3.7: Document expected image formats + API (~2 hours)

**Input:**
- JPEG, PNG, HEIC photo of room

**Output:**
```json
{
  "room_type": "kitchen",
  "dimensions": {"width": 4.2, "height": 2.8},
  "light_level": "medium",
  "clutter_level": "low",
  "visible_features": ["hardwood_floors", "natural_window"],
  "color_palette_detected": ["#8B7355", "#E8E8E8"],
  "confidence": 0.82
}
```

**Success Criteria:**
- [ ] Correctly identifies room type
- [ ] Estimates dimensions ±0.5m accuracy
- [ ] Detects lighting conditions
- [ ] Returns confidence score
- [ ] Handles dark/bright/blurry images gracefully

---

#### 1.4 StyleQuizAgent
**Status:** 🔴 NOT IMPLEMENTED (0%)
**File:** New - `src/api/layers/planning/agents/styleQuizAgent.ts`
**Purpose:** Learn user aesthetic preferences through visual "this or that" choices

**Tasks:**
- [ ] 1.4.1: Design style quiz flow (5-8 visual pairs) (~3 hours)
- [ ] 1.4.2: Create/curate reference image library (100+ style images) (~10 hours)
- [ ] 1.4.3: Implement quiz UI component (~8 hours)
- [ ] 1.4.4: Build style preference extraction logic (~6 hours)
- [ ] 1.4.5: Implement style classification (modern, cozy, minimal, etc) (~4 hours)
- [ ] 1.4.6: Write 8+ test cases (quiz completion, style extraction) (~4 hours)
- [ ] 1.4.7: Document style taxonomy (~2 hours)

**Input:**
- User selects from visual pairs (5-8 choices minimum)

**Output:**
```json
{
  "preferred_styles": ["modern", "japandi"],
  "avoid_styles": ["bohemian"],
  "key_elements": ["clean_lines", "natural_materials"],
  "color_preference": "neutral_warm",
  "confidence": 0.78
}
```

**Success Criteria:**
- [ ] Quiz requires ≥5 completed pairs
- [ ] Style extraction returns 2-3 primary styles
- [ ] Avoidance list captured
- [ ] UI is intuitive and mobile-friendly

---

#### 1.5 VisionBuilderAgent
**Status:** 🔴 NOT IMPLEMENTED (0%)
**File:** New - `src/api/layers/planning/agents/visionBuilderAgent.ts`
**Purpose:** Generate visual moodboard from quiz results or reference images

**Tasks:**
- [ ] 1.5.1: Design VisionBuilder spec (moodboard format) (~2 hours)
- [ ] 1.5.2: Research image generation options (Stable Diffusion / Midjourney / Pinterest API) (~3 hours)
- [ ] 1.5.3: Implement moodboard generation logic (~8 hours)
- [ ] 1.5.4: Integrate image generation API (~6 hours)
- [ ] 1.5.5: Extract color palette from moodboard (~4 hours)
- [ ] 1.5.6: Extract key design elements (~4 hours)
- [ ] 1.5.7: Write 6+ test cases (~4 hours)
- [ ] 1.5.8: Create moodboard UI display (~6 hours)

**Input:**
- Style quiz output OR user-provided reference images (3-5 photos)

**Output:**
```json
{
  "vision_board_url": "https://...",
  "color_palette": ["#D4A574", "#2C3E50", "#E8D5C4"],
  "furniture_cues": ["mid-century_sofa", "natural_wood_table"],
  "mood": "warm_modern",
  "design_elements": {
    "primary": "clean_lines",
    "secondary": "natural_textures"
  }
}
```

**Success Criteria:**
- [ ] Moodboard generated within 30 seconds
- [ ] Color palette extracted (3-5 colors)
- [ ] Design elements identified
- [ ] Moodboard UI displays on mobile + desktop

---

#### 1.6 ScopeResolver
**Status:** 🟡 PARTIALLY IMPLEMENTED (60%)
**File:** `src/api/consultationEngine.ts::determineNextPhase()`
**What's Done:**
- ✅ Single vs multi-room determination
- ✅ Project size classification
- ✅ Phase routing logic

**What's Missing:**
- ❌ Multi-domain agent assignment (which domain agents to activate)
- ❌ Explicit domain mapping (kitchen+bathroom → 2 agents)
- ❌ Constraint-based routing (budget affects scope)
- ❌ Sequential vs parallel execution decision

**Tasks:**
- [ ] 1.6.1: Design domain agent assignment schema (~2 hours)
- [ ] 1.6.2: Implement multi-room mapping logic (~4 hours)
- [ ] 1.6.3: Add constraint-based scope calculation (~3 hours)
- [ ] 1.6.4: Determine execution strategy (sequential vs parallel) (~2 hours)
- [ ] 1.6.5: Write 12+ test cases (single/multi/mixed scenarios) (~6 hours)
- [ ] 1.6.6: Document scope decision tree (~2 hours)

**Output:**
```json
{
  "scope_level": "multi-space",
  "domains": ["kitchen", "bathroom"],
  "execution_mode": "parallel",
  "estimated_complexity": "high"
}
```

**Success Criteria:**
- [ ] Correctly assigns 1-8 domain agents based on user input
- [ ] Parallel execution chosen when appropriate (multi-room)
- [ ] Budget constraints affect scope
- [ ] All room types properly mapped to domain agents

---

### Phase 1 Success Criteria (Completion Checkpoint)

**Phase 1 Complete When:**
- ✅ All 6 agents implemented and tested
- ✅ 50+ comprehensive test cases passing
- ✅ SharedUserContext properly populated with:
  - intent_label, vision_clarity, space_types
  - budget, timeline, goals
  - visual_context (image data OR vision board)
  - domain assignments
- ✅ 0 TypeScript errors
- ✅ Full documentation written

**Deliverable:** Complete user profile ready for design agents to consume

---

## 📋 PHASE 2: FUNCTIONAL DESIGN LAYER ⭐ CRITICAL
**Status:** 🔴 0% Complete | **Estimated Time:** 4-6 weeks | **LOC:** 3,000
**Estimated Start:** After Phase 1 complete (week 3-4)
**Priority:** 🔴 CRITICAL BLOCKER - Cannot proceed to Phase 3 without this

### Phase 2 Purpose
Generate cross-space design recommendations: layout → lighting → styling → materials → colors

### Phase 2 Agents (5 Total - Sequential Pipeline)

#### 2.1 LayoutAgent
**Status:** 🔴 NOT IMPLEMENTED
**Estimated Effort:** 8-10 hours | **LOC:** 400
**Purpose:** Optimize furniture placement and circulation flow

**Input from SharedContext:**
```json
{
  "room_type": "kitchen",
  "dimensions": {"width": 4.2, "height": 2.8},
  "constraints": ["island_preferred", "minimize_traffic_through_prep"],
  "user_style": "modern"
}
```

**Tasks:**
- [ ] 2.1.1: Design LayoutAgent spec (space analysis, furniture database) (~2 hours)
- [ ] 2.1.2: Implement room dimension analysis (~3 hours)
- [ ] 2.1.3: Build furniture placement algorithm (~6 hours)
- [ ] 2.1.4: Calculate traffic flow efficiency (~4 hours)
- [ ] 2.1.5: Generate 2-3 layout variations (~4 hours)
- [ ] 2.1.6: Write 10+ test cases (~5 hours)
- [ ] 2.1.7: Create layout visualization format (~3 hours)

**Output:**
```json
{
  "layout_options": [
    {
      "id": "layout_v1",
      "furniture_arrangement": [...],
      "traffic_flow_score": 0.87,
      "pros": ["good_natural_light_flow"],
      "cons": ["limited_storage"]
    }
  ]
}
```

**Success Criteria:**
- [ ] ≥2 layout options generated
- [ ] Traffic flow score 0.0-1.0
- [ ] Each layout includes pros/cons
- [ ] Layouts respect user constraints

---

#### 2.2 LightingAgent
**Status:** 🔴 NOT IMPLEMENTED
**Estimated Effort:** 8-10 hours | **LOC:** 400
**Purpose:** Design lighting zones (ambient, task, accent)

**Dependencies:** Requires LayoutAgent output

**Tasks:**
- [ ] 2.2.1: Design LightingAgent spec (lighting zones, lux calculations) (~2 hours)
- [ ] 2.2.2: Implement zone identification (~3 hours)
- [ ] 2.2.3: Build fixture recommendation engine (~6 hours)
- [ ] 2.2.4: Calculate lux requirements per zone (~4 hours)
- [ ] 2.2.5: Generate lighting schemes (warm/neutral/cool) (~4 hours)
- [ ] 2.2.6: Write 8+ test cases (~4 hours)
- [ ] 2.2.7: Create lighting diagram format (~2 hours)

**Output:**
```json
{
  "lighting_zones": [
    {
      "zone": "ambient",
      "fixtures": ["recessed_lights_6x"],
      "lux": 300,
      "color_temp": "3000K"
    }
  ],
  "dimming_zones": ["ambient", "accent"]
}
```

**Success Criteria:**
- [ ] All lighting zones defined
- [ ] Fixture recommendations practical (available products)
- [ ] Lux calculations scientifically sound
- [ ] Dimming zones identified

---

#### 2.3 StylingAgent
**Status:** 🔴 NOT IMPLEMENTED
**Estimated Effort:** 8-10 hours | **LOC:** 400
**Purpose:** Define visual mood, furniture type, decor elements

**Dependencies:** Requires user style preferences (from Phase 1)

**Tasks:**
- [ ] 2.3.1: Design StylingAgent spec (mood, furniture taxonomy, decor elements) (~2 hours)
- [ ] 2.3.2: Build furniture style database (100+ pieces) (~8 hours)
- [ ] 2.3.3: Implement mood-to-furniture mapping (~4 hours)
- [ ] 2.3.4: Generate decor element recommendations (~4 hours)
- [ ] 2.3.5: Create design narrative/story (~3 hours)
- [ ] 2.3.6: Write 8+ test cases (~4 hours)
- [ ] 2.3.7: Design UI for showing style options (~3 hours)

**Output:**
```json
{
  "mood": "modern_cozy",
  "furniture_style": "mid-century_modern",
  "key_pieces": [
    {"type": "sofa", "description": "neutral_mid-century", "style": "..."}
  ],
  "decor_elements": ["geometric_artwork", "natural_plants"],
  "design_narrative": "Warm modern home with..."
}
```

**Success Criteria:**
- [ ] Mood matches user style preferences
- [ ] Furniture recommendations specific + discoverable
- [ ] Decor elements cohesive with overall design
- [ ] Design narrative compelling for user

---

#### 2.4 MaterialAgent
**Status:** 🔴 NOT IMPLEMENTED
**Estimated Effort:** 8-10 hours | **LOC:** 400
**Purpose:** Select materials: flooring, walls, countertops, etc.

**Dependencies:** Requires styling output (aesthetic direction)

**Tasks:**
- [ ] 2.4.1: Design MaterialAgent spec (material categories, options, pricing) (~2 hours)
- [ ] 2.4.2: Build material database (200+ options with costs) (~10 hours)
- [ ] 2.4.3: Implement durability scoring (~3 hours)
- [ ] 2.4.4: Generate material combinations (3-4 options) (~4 hours)
- [ ] 2.4.5: Calculate total material cost per option (~3 hours)
- [ ] 2.4.6: Implement cost-vs-durability trade-off logic (~3 hours)
- [ ] 2.4.7: Write 8+ test cases (~4 hours)
- [ ] 2.4.8: Create material comparison UI (~4 hours)

**Output:**
```json
{
  "material_options": [
    {
      "name": "Option A - Budget Friendly",
      "flooring": "laminate_oak",
      "walls": "matte_paint_white",
      "countertops": "quartz_white",
      "total_cost": 3200,
      "durability_rating": 7,
      "pros": ["affordable", "easy_maintain"],
      "cons": ["less_premium_feel"]
    }
  ]
}
```

**Success Criteria:**
- [ ] 3-4 material options generated
- [ ] Options range budget to premium
- [ ] Cost calculations accurate (±5%)
- [ ] Durability ratings realistic
- [ ] All options within user budget

---

#### 2.5 ColorHarmonyAgent
**Status:** 🔴 NOT IMPLEMENTED
**Estimated Effort:** 8-10 hours | **LOC:** 400
**Purpose:** Ensure color consistency across all decisions

**Dependencies:** Requires all above agents (styling, materials)

**Tasks:**
- [ ] 2.5.1: Design ColorHarmonyAgent spec (color theory, harmony rules) (~2 hours)
- [ ] 2.5.2: Implement color harmony algorithms (complementary, analogous, triadic) (~5 hours)
- [ ] 2.5.3: Build accent color generation logic (~4 hours)
- [ ] 2.5.4: Implement WCAG accessibility check (contrast ratios) (~4 hours)
- [ ] 2.5.5: Generate color usage map (~3 hours)
- [ ] 2.5.6: Write 8+ test cases (harmony rules, accessibility) (~4 hours)
- [ ] 2.5.7: Create color palette visualization UI (~4 hours)

**Output:**
```json
{
  "base_colors": ["#F5F5F5", "#2C3E50"],
  "accent_colors": ["#E74C3C"],
  "color_usage_map": {
    "primary": "#F5F5F5",
    "secondary": "#2C3E50",
    "accent": "#E74C3C"
  },
  "accessibility_score": 0.95,
  "harmony_type": "complementary"
}
```

**Success Criteria:**
- [ ] Color palette harmonious (theory-based)
- [ ] WCAG accessibility score ≥0.8
- [ ] Color usage clear (primary/secondary/accent)
- [ ] Palette matches user aesthetic

---

### Phase 2 Architecture: Functional Layer Orchestrator

**File:** New - `src/api/layers/functional/engine.ts`

```typescript
export async function executeFunctionalLayer(
  sharedContext: SharedUserContext
): Promise<FunctionalLayerOutput> {
  // Sequential execution: each agent waits for previous output
  const layout = await layoutAgent.execute(sharedContext);
  const lighting = await lightingAgent.execute({...sharedContext, layout});
  const styling = await stylingAgent.execute({...sharedContext, layout, lighting});
  const materials = await materialAgent.execute({...sharedContext, styling});
  const colors = await colorHarmonyAgent.execute({...sharedContext, materials});

  return { layout, lighting, styling, materials, colors };
}
```

**Key Design:**
- Sequential pipeline (order matters)
- Each agent adds output to context
- LLM calls minimized (use templates where possible)
- All results validated against TypeScript schemas

---

### Phase 2 Success Criteria

**Phase 2 Complete When:**
- ✅ All 5 agents implemented and tested
- ✅ 50+ test cases passing (all scenarios)
- ✅ Sequential pipeline working correctly
- ✅ FunctionalLayerOutput properly typed
- ✅ Integration with Phase 1 complete
- ✅ 0 TypeScript errors
- ✅ Performance: All 5 agents complete in <10 seconds

**Deliverable:** Complete design recommendations (layout, lighting, style, materials, colors) ready for domain agents

---

## 📋 PHASE 3: DOMAIN SPECIALIZATION LAYER
**Status:** 🔴 0% Complete | **Estimated Time:** 6-8 weeks | **LOC:** 4,000
**Estimated Start:** After Phase 2 complete (week 8-9)
**Priority:** 🟡 HIGH

### Phase 3 Purpose
Apply room-specific expertise: aggregate functional outputs + add domain constraints → room-specific proposals

### Phase 3 Agents (8 Total)

Each domain agent follows same pattern:
1. Read shared context (functional outputs)
2. Apply domain-specific constraints
3. Generate room-specific proposal
4. Write to domain_proposals array

#### 3.1 - 3.8 Domain Agents (LivingRoomAgent, KitchenAgent, BedroomAgent, BathroomAgent, BackyardAgent, EntrywayAgent, GarageAgent, HomeOfficeAgent)

**Estimated Effort Each:** 4-6 hours | **LOC per agent:** 300-400

**Example: KitchenAgent**
- Specialization: Kitchen ergonomics, workflow zones, appliance placement
- Constraints: "Work triangle" (sink, stove, fridge), ergonomic heights
- Output: Kitchen-specific proposal with zone definitions

**Tasks per Domain Agent:**
- [ ] Design agent spec (~1 hour)
- [ ] Implement domain constraints (~2 hours)
- [ ] Build proposal generation logic (~2 hours)
- [ ] Write 6+ test cases (~3 hours)
- [ ] Create domain-specific UI display (~2 hours)

---

### Phase 3 Architecture: Domain Agent Orchestration

**File:** New - `src/api/layers/domain/engine.ts`

```typescript
export async function executeDomainLayer(
  sharedContext: SharedUserContext,
  domains: string[]
): Promise<DomainLayerOutput> {
  // Parallel execution for all assigned domains
  const proposals = await Promise.all(
    domains.map(domain => domainAgents[domain].execute(sharedContext))
  );

  return { domain_proposals: proposals };
}
```

**Key Design:**
- Parallel execution (one agent per room)
- Shared context reading (no mutation)
- Each agent generates independent proposal
- Cross-room consistency checks (Phase 5)

---

### Phase 3 Success Criteria

**Phase 3 Complete When:**
- ✅ All 8 domain agents implemented
- ✅ 48+ test cases passing (6 per agent)
- ✅ Parallel execution working
- ✅ Domain-specific proposals generate correctly
- ✅ Multi-room projects supported
- ✅ 0 TypeScript errors

**Deliverable:** Room-specific design proposals ready for visualization

---

## 📋 PHASE 4: VISUALIZATION & PRESENTATION LAYER
**Status:** 🔴 0% Complete | **Estimated Time:** 2-3 weeks | **LOC:** 1,500
**Estimated Start:** After Phase 3 complete (week 15-16)
**Priority:** 🟡 HIGH

### Phase 4 Purpose
Convert design proposals into visual + textual presentations

### Phase 4 Agents (3 Total)

#### 4.1 VisualizationAgent
**Estimated Effort:** 10-12 hours | **LOC:** 500
**Purpose:** Generate 2D floor plans + 3D renders

**Tasks:**
- [ ] 4.1.1: Research visualization options (Stable Diffusion / 3D engines) (~4 hours)
- [ ] 4.1.2: Design visualization spec (~2 hours)
- [ ] 4.1.3: Implement 2D floor plan generation (~6 hours)
- [ ] 4.1.4: Integrate 3D rendering API (~8 hours)
- [ ] 4.1.5: Handle render failures gracefully (~3 hours)
- [ ] 4.1.6: Write 5+ test cases (~4 hours)

**Output:**
```json
{
  "visualizations": [
    {
      "proposal_id": "kitchen_v1",
      "2d_plan_url": "https://...",
      "3d_render_url": "https://...",
      "generation_time": 25
    }
  ]
}
```

---

#### 4.2 ProposalPresentationAgent
**Estimated Effort:** 6-8 hours | **LOC:** 400
**Purpose:** Format proposals for carousel display

**Tasks:**
- [ ] 4.2.1: Design carousel data structure (~2 hours)
- [ ] 4.2.2: Generate proposal descriptions (~3 hours)
- [ ] 4.2.3: Create pricing summaries (~2 hours)
- [ ] 4.2.4: Build carousel UI component (~8 hours)
- [ ] 4.2.5: Write 5+ test cases (~3 hours)

**Output:**
```json
{
  "carousel_slides": [
    {
      "proposal_id": "kitchen_v1",
      "title": "Modern Minimalist Kitchen",
      "description": "Clean lines with...",
      "2d_image": "url",
      "3d_image": "url",
      "estimated_cost": 4200,
      "pros": [...],
      "cons": [...]
    }
  ]
}
```

---

#### 4.3 FeedbackParserAgent
**Estimated Effort:** 6-8 hours | **LOC:** 400
**Purpose:** Parse user reactions (like/dislike/comment)

**Tasks:**
- [ ] 4.3.1: Design feedback schema (~1 hour)
- [ ] 4.3.2: Implement sentiment extraction (~4 hours)
- [ ] 4.3.3: Build preference vector calculation (~3 hours)
- [ ] 4.3.4: Write 8+ test cases (~4 hours)

**Output:**
```json
{
  "likes": ["layout_spacious", "color_palette"],
  "dislikes": ["storage_limited"],
  "comments": "Love the lighting! More natural wood please",
  "preference_vector": {...},
  "satisfaction_score": 0.65
}
```

---

### Phase 4 Success Criteria

**Phase 4 Complete When:**
- ✅ 2D floor plans generate for all proposals
- ✅ 3D renders generate (≥60% success rate)
- ✅ Carousel UI functional on mobile + desktop
- ✅ Feedback parsing captures sentiment accurately
- ✅ All outputs properly typed
- ✅ 0 TypeScript errors

**Deliverable:** User-facing visual proposals + feedback collection system

---

## 📋 PHASE 5: ITERATION & REFINEMENT LAYER
**Status:** 🔴 0% Complete | **Estimated Time:** 3-4 weeks | **LOC:** 2,000
**Estimated Start:** After Phase 4 complete (week 18-19)
**Priority:** 🟡 HIGH

### Phase 5 Purpose
Handle user feedback → intelligent re-execution of relevant agents → refined proposals

### Phase 5 Agents (2 Total)

#### 5.1 ExecutionAgent
**Estimated Effort:** 10-12 hours | **LOC:** 800
**Purpose:** Smart re-triggering of agents based on feedback

**Key Logic:**
- IF feedback = "layout too cramped" → re-run LayoutAgent + downstream agents
- IF feedback = "colors too cold" → re-run ColorHarmonyAgent only
- IF feedback = "want more storage" → re-run StylingAgent + MaterialAgent

**Tasks:**
- [ ] 5.1.1: Design feedback-to-agent mapping (~3 hours)
- [ ] 5.1.2: Implement feedback classification (~4 hours)
- [ ] 5.1.3: Build agent re-trigger orchestration (~6 hours)
- [ ] 5.1.4: Track revision history (~3 hours)
- [ ] 5.1.5: Write 12+ test cases (various feedback scenarios) (~6 hours)

**Output:**
```json
{
  "revision_v2": {
    "triggered_agents": ["ColorHarmonyAgent", "StylingAgent"],
    "feedback_addressed": ["colors_too_cold"],
    "new_proposals": [...]
  }
}
```

---

#### 5.2 FeedbackIterationAgent (Implicit in ExecutionAgent)
**Purpose:** Manage multi-round revision loop

**Key Constraints:**
- Max 3 iterations per proposal
- Track all feedback history
- Ensure improvements in each iteration

---

### Phase 5 Success Criteria

**Phase 5 Complete When:**
- ✅ ExecutionAgent correctly identifies agents to re-run
- ✅ Revisions generated within 30 seconds
- ✅ Iteration history tracked accurately
- ✅ Max 3 iterations enforced
- ✅ Each iteration improves satisfaction score
- ✅ 0 TypeScript errors

**Deliverable:** Complete iteration loop - users can refine designs

---

## 📋 PHASE 6: E-COMMERCE INTEGRATION LAYER
**Status:** 🔴 0% Complete | **Estimated Time:** 3-4 weeks | **LOC:** 2,000
**Estimated Start:** After Phase 5 complete (week 22-23)
**Priority:** 🟠 MEDIUM (MVP could work without this)

### Phase 6 Purpose
Transform approved designs into purchasable products → shopping cart → checkout

### Phase 6 Agents (4 Total)

#### 6.1 SourcingAgent
**Estimated Effort:** 8-10 hours | **LOC:** 600
**Purpose:** Match furniture/materials to real products in catalog

**Key Task:** For each furniture piece + material recommendation:
1. Search product database
2. Find matching SKU
3. Return with price + stock + dimensions

**Tasks:**
- [ ] 6.1.1: Design product database schema (~2 hours)
- [ ] 6.1.2: Build product database (1,000+ SKUs) (~16 hours)
- [ ] 6.1.3: Implement product matching algorithm (~6 hours)
- [ ] 6.1.4: Add stock + inventory tracking (~4 hours)
- [ ] 6.1.5: Write 8+ test cases (~4 hours)

**Output:**
```json
{
  "sourced_items": [
    {
      "design_element": "kitchen_island",
      "matched_sku": "SKU_12345",
      "product_name": "Modern Oak Kitchen Island",
      "price": 1200,
      "vendor": "IKEA",
      "link": "https://...",
      "in_stock": true,
      "match_confidence": 0.92
    }
  ],
  "total_sourced_cost": 4150
}
```

---

#### 6.2 PurchaseAgent
**Estimated Effort:** 6-8 hours | **LOC:** 500
**Purpose:** Build shopping cart + generate Bill of Materials

**Tasks:**
- [ ] 6.2.1: Design BOM structure (~2 hours)
- [ ] 6.2.2: Implement cart building logic (~4 hours)
- [ ] 6.2.3: Integrate payment processing (~8 hours)
- [ ] 6.2.4: Generate BOM PDF (~3 hours)
- [ ] 6.2.5: Write 6+ test cases (~3 hours)

**Output:**
```json
{
  "bill_of_materials": {
    "items": [...],
    "total_quantity": 47,
    "total_cost": 4150,
    "vendors": ["IKEA", "Wayfair", "Local Artisan"],
    "delivery_estimate": "3-4 weeks"
  },
  "cart_id": "cart_xyz",
  "checkout_url": "https://..."
}
```

---

#### 6.3 AftercareAgent
**Estimated Effort:** 4-6 hours | **LOC:** 400
**Purpose:** Post-purchase care guide + warranty info

**Tasks:**
- [ ] 6.3.1: Design aftercare content structure (~1 hour)
- [ ] 6.3.2: Create warranty database (~4 hours)
- [ ] 6.3.3: Generate personalized care guides (~3 hours)
- [ ] 6.3.4: Create PDF generation (~2 hours)
- [ ] 6.3.5: Write 4+ test cases (~2 hours)

**Output:**
```json
{
  "aftercare_guide_pdf": "https://...",
  "maintenance_schedule": {...},
  "warranty_items": [...]
}
```

---

### Phase 6 Success Criteria

**Phase 6 Complete When:**
- ✅ SourcingAgent matches ≥80% of design items
- ✅ BOM generates with ≤5% cost variance
- ✅ Cart integration functional
- ✅ Payment processing secure
- ✅ Aftercare guides personalized + downloadable
- ✅ 0 TypeScript errors

**Deliverable:** Complete e-commerce integration - users can purchase designs

---

## 🎯 IMPLEMENTATION ROADMAP

### Timeline Overview

```
Week 1-3:   Phase 1 Completion (Planning Layer)
            ├─ Complete IntentClassifier (1 week)
            ├─ Complete ContextAgent (1 week)
            └─ Implement ImageAnalyzer, StyleQuiz, VisionBuilder (1 week)

Week 4-9:   Phase 2 Implementation (Functional Layer) ⭐ CRITICAL
            ├─ LayoutAgent + LightingAgent (2 weeks)
            ├─ StylingAgent + MaterialAgent (2 weeks)
            └─ ColorHarmonyAgent + Integration (1 week)

Week 10-16: Phase 3 Implementation (Domain Layer)
            ├─ KitchenAgent + BedroomAgent (2 weeks)
            ├─ BathroomAgent + LivingRoomAgent (2 weeks)
            └─ 4 remaining agents + Integration (2 weeks)

Week 17-19: Phase 4 Implementation (Visualization)
            ├─ VisualizationAgent (1 week)
            ├─ ProposalPresentationAgent (1 week)
            └─ FeedbackParserAgent + Integration (1 week)

Week 20-22: Phase 5 Implementation (Iteration)
            └─ ExecutionAgent + Feedback loop (3 weeks)

Week 23-24: Phase 6 Implementation (E-Commerce)
            └─ SourcingAgent + PurchaseAgent + AftercareAgent (2 weeks)
```

### Gantt Chart (Simplified)

```
Phase 1 (Planning)       ========
Phase 2 (Functional)              ============
Phase 3 (Domain)                           ==================
Phase 4 (Visualization)                                    ========
Phase 5 (Iteration)                                            ======
Phase 6 (E-Commerce)                                                ====
MVP Milestone (Phases 1-4)                                    ↓
```

**MVP Achieved at:** Week 19 (functional design + visualization)

---

## 📊 EFFORT & RESOURCE ALLOCATION

### By Phase

| Phase | Agents | Tasks | Est. Hours | Est. LOC | Start Week | Duration |
|-------|--------|-------|-----------|----------|-----------|----------|
| 1 | 6 | 28 | 80-100 | 1,500 | Week 1 | 3 weeks |
| 2 | 5 | 35 | 120-150 | 3,000 | Week 4 | 6 weeks |
| 3 | 8 | 40 | 120-160 | 4,000 | Week 10 | 7 weeks |
| 4 | 3 | 15 | 40-50 | 1,500 | Week 17 | 3 weeks |
| 5 | 2 | 20 | 50-60 | 2,000 | Week 20 | 3 weeks |
| 6 | 4 | 20 | 40-50 | 2,000 | Week 23 | 2 weeks |
| **TOTAL** | **28+** | **158** | **450-570 hours** | **~14,000** | - | **24 weeks** |

### Team Composition (Recommended)

- **Backend Engineer**: 1 FTE (phases 1-2)
- **AI/ML Engineer**: 0.5 FTE (LLM integrations)
- **Full-Stack Engineer**: 1 FTE (phases 3-4)
- **Frontend Engineer**: 0.5 FTE (UI components)
- **QA/Test Engineer**: 0.5 FTE (test suites)

**Total:** 3.5 FTE for 24 weeks

---

## ✅ SUCCESS METRICS

### Per Phase

| Phase | Completion Metric | Target | Measurement |
|-------|-------------------|--------|-------------|
| 1 | Test Coverage | >85% | Jest coverage report |
| 1 | TypeScript | 0 errors | `npm run typecheck` |
| 2 | Agent Pipeline | <10s total | Perf benchmark |
| 2 | Design Quality | Professional | Design review |
| 3 | Multi-room Support | All 4 main rooms | Test scenarios |
| 4 | Visualization Success | >80% render success | Generation stats |
| 5 | Iteration Improvement | >0.1 satisfaction gain/iteration | Score tracking |
| 6 | Sourcing Match Rate | >80% of items | Source verification |

### Overall System

- ✅ **28+ agents** fully functional
- ✅ **50+ test cases per phase** passing
- ✅ **0 TypeScript errors** in entire system
- ✅ **MVP** complete (Phases 1-4) by Week 19
- ✅ **Full system** complete by Week 24
- ✅ **User feedback** indicates professional-quality designs
- ✅ **Production deployment** ready

---

## 🚀 CRITICAL PATHS & BLOCKERS

### Critical Path Dependencies

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
  ↓        ↓ BLOCKER
  Must complete before any design output possible
```

### High-Risk Items

1. **Computer Vision (Phase 1.3)**: ImageAnalyzer complex
   - Mitigation: Use off-the-shelf API (OpenAI Vision)
   - Fallback: Text-only mode

2. **LLM Cost Management (Phases 2-5)**: Many LLM calls
   - Mitigation: Implement prompt caching, use templates
   - Fallback: Use rule-based agents where possible

3. **3D Rendering (Phase 4.1)**: Quality & performance
   - Mitigation: Use proven service (e.g., Stable Diffusion)
   - Fallback: High-quality 2D plans only

4. **Product Database (Phase 6.1)**: 1,000+ SKU database
   - Mitigation: Partner with furniture retailers (API access)
   - Fallback: Manual curated list (100 items)

---

## 🎯 ACCEPTANCE CRITERIA (FINAL)

**System Complete When:**

- ✅ All 6 phases implemented
- ✅ All 28+ agents fully functional
- ✅ 150+ comprehensive test cases (all passing)
- ✅ 0 TypeScript compilation errors
- ✅ Full documentation (README + inline comments)
- ✅ 4 main scenarios tested end-to-end:
  1. Full home renovation (all 8 rooms)
  2. Partial renovation (kitchen + bathroom)
  3. Room refresh (single room)
  4. Accessory shopping (styling only)
- ✅ MVP deployment to staging
- ✅ User testing (10+ users) shows satisfaction >0.7
- ✅ Performance: All phases complete in <2 minutes total
- ✅ Mobile responsive (iOS + Android)
- ✅ Production deployment ready

---

## 📝 PROGRESS TRACKING

This document will be updated weekly with:
- [ ] Completed tasks
- [ ] Blocked items
- [ ] Updated estimates
- [ ] Timeline adjustments

**Last Updated:** 2025-11-06
**Next Update:** 2025-11-13

---

## 📞 SUPPORT & ESCALATION

**Technical Questions:** See inline documentation + test cases
**Blocked Issues:** Escalate to team lead
**Scope Changes:** Document in "SCOPE_CHANGES.md"

---

## 🎉 CONCLUSION

This PRD provides a **comprehensive, phased roadmap** for building the complete AI Interior Design Agent System. By following this plan:

- ✅ **Clear phases** (6 total)
- ✅ **Actionable tasks** (158 tasks)
- ✅ **Realistic timelines** (24 weeks)
- ✅ **Measurable success** (specific criteria)
- ✅ **Manageable scope** (can be adjusted)

**Ready to begin Phase 1.** Let's build the future of interior design! 🚀

---

**Document Version:** 1.0
**Status:** APPROVED FOR IMPLEMENTATION
**Author:** Ilwon Yoon
**Date:** 2025-11-06
