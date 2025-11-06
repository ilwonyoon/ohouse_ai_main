# 📋 PRD: AI Interior Design Agent System – Full Implementation (Phase 3-7)

**Document Version:** 1.0
**Date:** 2025-11-06
**Author:** Ilwon Yoon
**Status:** Draft - Ready for Planning Phase

---

## 📌 Executive Summary

This PRD outlines the complete implementation roadmap for the **AI Interior Design Agent System** (v7), building on the foundation of **Phase 2 (Planning Layer - COMPLETE)**.

- **Scope**: Phases 3-7 implementation (Functional, Domain, Visualization, Feedback, & Execution layers)
- **Timeline**: Phased rollout (Phase 3 → Phase 7)
- **Approach**: Code-first implementation (TypeScript), not Claude Skills-based
- **Foundation**: Phase 2 codebase (consultationEngine.ts pattern)
- **Target**: Full end-to-end design workflow automation

---

## 🎯 Project Vision

**From:** User submits room photo → System offers basic consultation
**To:** User submits room photo → System delivers complete design proposal → User provides feedback → System iterates → User purchases with sourcing

**Key Outcome**: Transform interior design consultation from **manual, linear process** to **AI-driven, iterative loop** with real product sourcing.

---

## 📐 Architecture Overview

### System Layers (5-Layer Model)

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: PLANNING (Phase 2 ✅ COMPLETE)                    │
│ Intent Detection → Context Gathering → Image Analysis       │
│ → Scope Resolution                                          │
├─────────────────────────────────────────────────────────────┤
│ Layer 2: FUNCTIONAL (Phase 3 📝 THIS PRD)                   │
│ Layout Optimization → Lighting Design → Styling Definition  │
│ → Material Selection → Color Harmony                        │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: DOMAIN (Phase 4 📋 FUTURE)                         │
│ Space-Specific Coordination (LivingRoom, Kitchen,           │
│ Bedroom, Bathroom, Exterior, Garage, Backyard, Entryway)    │
├─────────────────────────────────────────────────────────────┤
│ Layer 4: EXECUTION (Phase 5 📋 FUTURE)                      │
│ Visualization (2D/3D) → Proposal Presentation               │
│ → Sourcing & Purchase                                       │
├─────────────────────────────────────────────────────────────┤
│ Layer 5: FEEDBACK (Phase 6-7 📋 FUTURE)                     │
│ User Feedback Collection → Execution Logic → Iteration      │
└─────────────────────────────────────────────────────────────┘
```

### Shared Context Model

All agents communicate through **Shared User Context**:

```typescript
{
  // Planning Layer Output (Phase 2)
  intent_label: "partial_reno" | "full_reno" | "room_refresh" | "accessory_update",
  space_types: ["kitchen", "bathroom"],
  budget: 5000,
  timeline: "6 weeks",
  family_context: { children: true, pets: false },
  visual_context: { room_image: "url", lighting: "medium" },

  // Functional Layer Output (Phase 3 - NEW)
  layout_options: [...],
  lighting_scheme: {...},
  styling_direction: {...},
  material_plan: {...},
  color_harmony: {...},

  // Domain Layer Output (Phase 4 - NEW)
  domain_proposals: [{
    space: "kitchen",
    layout: {...},
    lighting: {...},
    materials: {...}
  }],

  // Visualization Output (Phase 5 - NEW)
  visualizations: {
    "2D": "url",
    "3D": "url"
  },

  // Feedback Loop (Phase 6-7 - NEW)
  feedback_history: [...],
  revision_count: 0
}
```

---

## 🔄 Phase Breakdown

### Phase 2: Planning Layer ✅ COMPLETE

**Status**: Implemented and tested

**Components**:
- `IntentClassifier` – User goal classification (A/B/C/D)
- `ContextAgent` – Budget, timeline, constraints collection
- `ImageAnalyzer` – Room photo analysis (NOT YET - ImageAnalyzer agent needed)
- `ScopeResolver` – Multi-space project determination

**Output**: Complete user context + intent classification

**Code Location**: `src/api/consultationEngine.ts` (400+ LOC)

---

### Phase 3: Functional Layer 📝 THIS PRD

**Scope**: Implement 5 cross-space specialist agents

**Agents to Implement**:

#### 3.1 LayoutAgent
- **Role**: Optimize furniture placement and traffic flow
- **Inputs**: Room dimensions, layout type (kitchen, bedroom, etc.), constraints
- **Process**:
  - Analyze space (walls, doors, windows)
  - Generate 2-3 furniture layout options
  - Calculate traffic flow efficiency
  - Provide ergonomic recommendations
- **Outputs**:
  ```typescript
  {
    layout_id: "layout_v1",
    furniture_arrangement: [...],
    traffic_flow_score: 0.85,
    recommendations: [...]
  }
  ```
- **Success Criteria**: ≥2 layouts generated, traffic flow > 0.7

---

#### 3.2 LightingAgent
- **Role**: Design lighting balance (ambient, task, accent)
- **Inputs**: Layout, room type, usage patterns, natural light
- **Process**:
  - Map natural light sources (windows, skylights)
  - Determine lighting zones (ambient, task, accent)
  - Calculate lighting requirements (lux levels)
  - Recommend fixture types and placement
- **Outputs**:
  ```typescript
  {
    lighting_zones: [
      { zone: "ambient", fixtures: [...], lux: 300 },
      { zone: "task", fixtures: [...], lux: 500 }
    ],
    color_temp: "3000K",
    dimming_zones: [...]
  }
  ```
- **Success Criteria**: All zones defined, fixture recommendations provided

---

#### 3.3 StylingAgent
- **Role**: Define visual mood, furniture type, decor elements
- **Inputs**: User style preferences (from quiz or vision board), room type
- **Process**:
  - Define visual mood/aesthetic (modern, cozy, minimal, etc.)
  - Select furniture categories and descriptions
  - Recommend decor elements (artwork, textiles, plants)
  - Create cohesive design narrative
- **Outputs**:
  ```typescript
  {
    mood: "modern-cozy",
    furniture_style: "mid-century",
    key_pieces: [...],
    decor_elements: [...],
    design_narrative: "string"
  }
  ```
- **Success Criteria**: Complete style profile with 5+ recommendations

---

#### 3.4 MaterialAgent
- **Role**: Select cost-effective materials by durability and aesthetics
- **Inputs**: Budget, usage intensity, style direction, room type
- **Process**:
  - Identify material needs (flooring, wall, countertops, etc.)
  - Evaluate material options (price, durability, aesthetic match)
  - Create 2-3 material combination options
  - Calculate total material cost
- **Outputs**:
  ```typescript
  {
    material_options: [
      {
        name: "Option A",
        flooring: "oak hardwood",
        wall_finish: "soft white paint",
        total_cost: 3000
      }
    ]
  }
  ```
- **Success Criteria**: 3+ options generated, cost within budget

---

#### 3.5 ColorHarmonyAgent
- **Role**: Ensure color consistency across all decisions
- **Inputs**: Style direction, materials, user preferences
- **Process**:
  - Extract base colors from style + materials
  - Apply color harmony principles (complementary, analogous, triadic)
  - Define accent colors and usage
  - Verify WCAG accessibility (contrast ratios)
- **Outputs**:
  ```typescript
  {
    base_colors: ["#F5F5F5", "#2C3E50"],
    accent_colors: ["#E74C3C"],
    color_usage_map: {...},
    accessibility_score: 0.95
  }
  ```
- **Success Criteria**: Harmonized palette with accessibility > 0.8

---

### Implementation Details: Functional Layer

**File Structure**:
```
src/api/layers/
├─ functional/
│  ├─ engine.ts                    (Orchestrator)
│  ├─ agents/
│  │  ├─ layoutAgent.ts            (200 LOC)
│  │  ├─ lightingAgent.ts          (200 LOC)
│  │  ├─ stylingAgent.ts           (200 LOC)
│  │  ├─ materialAgent.ts          (200 LOC)
│  │  └─ colorHarmonyAgent.ts      (200 LOC)
│  ├─ types/
│  │  └─ functional.ts             (TypeScript types)
│  └─ __tests__/
│     └─ functionalLayer.test.ts   (50+ test cases)
```

**Entry Point**:
```typescript
// src/api/layers/functional/engine.ts
export async function executeFunctionalLayer(
  sharedContext: SharedUserContext
): Promise<FunctionalLayerOutput> {
  const layoutOutput = await layoutAgent.process(sharedContext);
  const lightingOutput = await lightingAgent.process({...sharedContext, layout: layoutOutput});
  const stylingOutput = await stylingAgent.process(sharedContext);
  const materialOutput = await materialAgent.process({...sharedContext, styling: stylingOutput});
  const colorOutput = await colorHarmonyAgent.process({...sharedContext, material: materialOutput});

  return { layoutOutput, lightingOutput, stylingOutput, materialOutput, colorOutput };
}
```

**Estimated Effort**: 40-50 hours
- Agent Implementation: 30 hours
- Testing: 15 hours
- Documentation: 5 hours

---

### Phase 4: Domain Layer 📋 FUTURE

**Scope**: Implement 8 space-specialist agents

**Agents**:
- LivingRoomAgent
- KitchenAgent
- BedroomAgent
- BathroomAgent
- ExteriorAgent
- GarageAgent
- BackyardAgent
- EntrywayAgent

**Role**: Aggregate functional outputs for specific space requirements

**Estimated Effort**: 60-80 hours

---

### Phase 5: Execution Layer 📋 FUTURE

**Scope**: Visualization + Proposal + Sourcing

**Agents**:
- VisualizationAgent (2D/3D rendering)
- ProposalPresentationAgent (carousel format)
- SourcingAgent (product matching)
- PurchaseAgent (BOM generation)

**Estimated Effort**: 80-100 hours

---

### Phase 6-7: Feedback & Iteration 📋 FUTURE

**Scope**: User feedback → Re-execution

**Agents**:
- FeedbackParserAgent
- ExecutionAgent (trigger re-runs)
- AftercareAgent (post-purchase)

**Estimated Effort**: 30-40 hours

---

## 🏗️ Implementation Strategy

### Code-First Approach (NOT Claude Skills)

**Why**:
1. Phase 2 already uses TypeScript patterns
2. Shared Context easier to manage in code
3. 12+ agents require tight integration
4. Testing & CI/CD more straightforward

**How**:
- Extend `src/api/layers/` directory structure
- Follow Phase 2 pattern (consultationEngine.ts)
- Same test approach (50+ test cases per layer)
- TypeScript strict mode throughout

---

### Testing Strategy

**Per Layer**:
- 50+ integration tests (happy path + edge cases)
- Input/output validation
- Error handling
- Shared Context consistency checks

**End-to-End**:
- Full workflow tests (Planning → Functional → Domain → Visualization → Feedback)
- Mock user scenarios (full reno, partial reno, room refresh, accessories)
- Performance benchmarks

---

## 📊 Success Metrics

### Phase 3 (Functional Layer) Completion:

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| Code Coverage | >85% | Jest/Istanbul |
| TypeScript Errors | 0 | npm run typecheck |
| Test Cases Pass Rate | 100% | npm test |
| Agent Output Validation | 100% | Schema validation |
| Documentation | Complete | README + inline comments |
| Performance | <1s per agent | Benchmark tests |

### Full System (Phase 3-7) Completion:

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| End-to-End Flow | Works for 4 scenarios | Integration tests |
| User Context Persistence | 100% fidelity | Shared Context validation |
| Design Quality | Professional | User testing |
| Iteration Loop | <30 seconds | Performance tests |
| Product Sourcing | Real catalog match | Sourcing tests |

---

## 🔗 Integration Points

### Phase 3 Integration with Phase 2

```typescript
// API Route: src/app/api/consultation/process/route.ts

const planningOutput = await executePlanningLayer(userMessage);

// NEW: Phase 3 Integration
if (planningOutput.intent_clarity === "clear" && planningOutput.budget_confirmed) {
  const functionalOutput = await executeFunctionalLayer(sharedContext);
  sharedContext = { ...sharedContext, ...functionalOutput };
}

return { response, sharedContext };
```

### Frontend Needs (Phase 3)

- Display layout options (interactive visualization)
- Show lighting scheme (diagram + description)
- Present styling direction (mood board style)
- Material comparison table
- Color palette visualization

---

## 🚀 Rollout Plan

### Week 1: Planning & Setup
- Finalize PRD (this document)
- Set up Phase 3 directory structure
- Create type definitions
- Write test suite template

### Week 2-3: LayoutAgent & LightingAgent
- Implement both agents
- 40+ tests
- Documentation

### Week 3-4: StylingAgent & MaterialAgent
- Implement both agents
- 40+ tests
- Documentation

### Week 4-5: ColorHarmonyAgent & Integration
- Implement final agent
- Full layer integration tests
- Frontend integration

### Week 5-6: Testing & Polish
- End-to-end testing
- Performance optimization
- Bug fixes

---

## 📝 Acceptance Criteria

### Phase 3 Complete When:

1. ✅ All 5 agents implemented and tested
2. ✅ 50+ test cases passing (100%)
3. ✅ TypeScript compilation: 0 errors
4. ✅ Shared Context properly updated throughout
5. ✅ API route integrated and working
6. ✅ Frontend can display functional layer outputs
7. ✅ Documentation complete
8. ✅ Git commits created and ready for push

---

## 🎓 Reference Materials

- Master Plan: `docs/Interior_ai_agents_plan/agent_skills_spec.md`
- Execution Spec: `docs/Interior_ai_agents_plan/AI_Interior_Agent_System – Execution_Spec.pdf`
- Phase 2 Implementation: `src/api/consultationEngine.ts`
- Phase 2 Tests: `src/api/__tests__/consultationEngine.test.ts`

---

## 📌 Next Steps

1. **Review & Approve PRD** (this document)
2. **Set up Phase 3 directory structure**
3. **Create LayoutAgent implementation plan**
4. **Begin Phase 3 implementation**

---

**Document Approval**: Pending

**Last Updated**: 2025-11-06
**Version**: 1.0 (Draft)
