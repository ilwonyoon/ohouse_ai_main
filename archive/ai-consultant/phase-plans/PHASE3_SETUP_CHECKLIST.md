# ✅ Phase 3 Setup Checklist – Functional Layer Implementation

**Date**: 2025-11-06
**Status**: Ready to Execute

---

## 📋 Pre-Implementation Checklist

### 1. Directory Structure Setup

- [ ] Create `src/api/layers/` directory
- [ ] Create `src/api/layers/functional/` subdirectory
- [ ] Create `src/api/layers/functional/agents/` subdirectory
- [ ] Create `src/api/layers/functional/types/` subdirectory
- [ ] Create `src/api/layers/functional/__tests__/` subdirectory
- [ ] Create `src/api/layers/shared/` for Shared Context

### 2. Type Definitions

- [ ] Create `src/api/layers/functional/types/functional.ts`
  - [ ] `LayoutOutput` interface
  - [ ] `LightingOutput` interface
  - [ ] `StylingOutput` interface
  - [ ] `MaterialOutput` interface
  - [ ] `ColorHarmonyOutput` interface
  - [ ] `FunctionalLayerOutput` interface (aggregated)

- [ ] Update `src/api/layers/shared/context.ts`
  - [ ] Extend `SharedUserContext` with functional fields
  - [ ] Add validation functions

### 3. Phase 2 Code Review

- [ ] Review `src/api/consultationEngine.ts` patterns
- [ ] Study test patterns in `src/api/__tests__/consultationEngine.test.ts`
- [ ] Understand Shared Context flow
- [ ] Review OpenAI integration in `src/api/openai.ts`

### 4. Agent Skeleton Files

Create empty agent files (will be implemented):

- [ ] `src/api/layers/functional/agents/layoutAgent.ts`
- [ ] `src/api/layers/functional/agents/lightingAgent.ts`
- [ ] `src/api/layers/functional/agents/stylingAgent.ts`
- [ ] `src/api/layers/functional/agents/materialAgent.ts`
- [ ] `src/api/layers/functional/agents/colorHarmonyAgent.ts`

### 5. Orchestrator Setup

- [ ] Create `src/api/layers/functional/engine.ts`
  - [ ] Import all 5 agents
  - [ ] Implement `executeFunctionalLayer()` function
  - [ ] Handle agent sequencing (Layout → Lighting → Styling → Material → Color)
  - [ ] Manage Shared Context flow between agents

### 6. Test Suite Template

- [ ] Create `src/api/layers/functional/__tests__/functionalLayer.test.ts`
  - [ ] Test setup (mock data, fixtures)
  - [ ] Template for testing each agent
  - [ ] Integration test template
  - [ ] Shared Context validation tests

### 7. API Route Integration

- [ ] Review `src/app/api/consultation/process/route.ts`
- [ ] Plan where to call `executeFunctionalLayer()`
- [ ] Determine trigger conditions (when to activate Phase 3)
- [ ] Plan response structure

### 8. Documentation Files

- [ ] Create `PHASE3_IMPLEMENTATION_NOTES.md` (progress tracking)
- [ ] Create `PHASE3_API_REFERENCE.md` (agent specs)
- [ ] Create `PHASE3_TESTING_GUIDE.md` (how to test each agent)

---

## 📐 Key Design Decisions to Confirm

### 1. Agent Trigger Strategy

**Question**: When does each agent run?

**Options**:
- **Sequential** (A→B→C→D→E): Each agent waits for previous output
- **Parallel with Dependencies** (Layout in parallel, then Lighting uses Layout)
- **On-Demand** (Only run agents user needs)

**Recommendation**: **Sequential** for Phase 3 (cleaner, easier to debug)

**Confirm**: [ ]

---

### 2. LLM Integration

**Question**: Should each agent call OpenAI independently or use shared prompt?

**Options**:
- **Independent**: Each agent has its own system prompt
- **Shared**: All agents use phase-aware context prompt
- **Hybrid**: Core agents shared, specialized agents independent

**Recommendation**: **Hybrid** (LayoutAgent uses space analysis, others use shared prompt)

**Confirm**: [ ]

---

### 3. Error Handling

**Question**: If one agent fails, what happens?

**Options**:
- **Fail Fast**: Stop entire layer
- **Graceful Degradation**: Skip failed agent, continue with defaults
- **Retry Logic**: Attempt 3 times before failing

**Recommendation**: **Fail Fast** for Phase 3 (ensure quality)

**Confirm**: [ ]

---

### 4. Output Validation

**Question**: How strict should output validation be?

**Options**:
- **Strict**: Reject any non-conforming output
- **Lenient**: Accept and try to normalize
- **Logged**: Accept but log warnings

**Recommendation**: **Strict** (same as Phase 2)

**Confirm**: [ ]

---

## 🔄 Data Flow Verification

### Phase 2 → Phase 3 Bridge

**Input to Phase 3** (from Phase 2 SharedContext):
```typescript
{
  intent_label: string,
  space_types: string[],
  budget: number,
  timeline: string,
  visual_context: { room_image: string, lighting: string },
  // ... other planning outputs
}
```

**Output from Phase 3** (adds to SharedContext):
```typescript
{
  layout_options: LayoutOutput[],
  lighting_scheme: LightingOutput,
  styling_direction: StylingOutput,
  material_plan: MaterialOutput,
  color_harmony: ColorHarmonyOutput
}
```

**Verification**:
- [ ] Input types defined
- [ ] Output types defined
- [ ] Serialization working (JSON-safe)
- [ ] No circular references

---

## 🧪 Testing Infrastructure

### Test Data Fixtures

- [ ] Create sample `sharedContext` fixture for testing
- [ ] Create kitchen scenario
- [ ] Create bedroom scenario
- [ ] Create bathroom scenario
- [ ] Create multi-room scenario

### Mock OpenAI Responses

- [ ] Create mock layout responses
- [ ] Create mock lighting responses
- [ ] Create mock styling responses
- [ ] Create mock material responses
- [ ] Create mock color responses

### Test Categories

- [ ] Unit tests (each agent individually)
- [ ] Integration tests (agent → agent handoff)
- [ ] Schema validation tests
- [ ] Error handling tests
- [ ] Performance tests (all agents complete < 10s)

---

## 📚 Documentation Checklist

### README Files

- [ ] Create `src/api/layers/functional/README.md`
  - [ ] Overview of Functional Layer
  - [ ] Agent responsibilities
  - [ ] Data flow diagram
  - [ ] Quick start guide

### Agent Specs

- [ ] Document each agent's:
  - [ ] Purpose & role
  - [ ] Inputs & outputs
  - [ ] Dependencies
  - [ ] Error cases

### API Reference

- [ ] `executeFunctionalLayer()` signature
- [ ] Return types
- [ ] Error handling
- [ ] Usage examples

---

## 🚀 Implementation Order

**Week 1: Foundation**
1. Create directory structure
2. Define type system
3. Create orchestrator skeleton
4. Set up test infrastructure

**Week 2: LayoutAgent**
1. Implement LayoutAgent
2. Write 10+ tests
3. Integrate with orchestrator
4. Document

**Week 3: LightingAgent + StylingAgent**
1. Implement both agents
2. Write 20+ tests
3. Verify orchestrator flow
4. Document

**Week 4: MaterialAgent + ColorHarmonyAgent**
1. Implement both agents
2. Write 20+ tests
3. Full layer integration tests
4. Document

**Week 5: Polish & Integration**
1. API route integration
2. Frontend preparation
3. End-to-end testing
4. Performance optimization

---

## ✨ Success Criteria (Phase 3 Complete)

### Code Quality
- [ ] 0 TypeScript errors (`npm run typecheck`)
- [ ] 0 ESLint warnings (`npm run lint`)
- [ ] >85% test coverage
- [ ] All tests passing (`npm test`)

### Functionality
- [ ] All 5 agents working
- [ ] Orchestrator proper sequencing
- [ ] Shared Context properly updated
- [ ] All outputs validate against schema

### Integration
- [ ] Works with Phase 2 outputs
- [ ] API route successfully calls Phase 3
- [ ] Frontend can display outputs
- [ ] No breaking changes to existing code

### Documentation
- [ ] README complete
- [ ] API reference complete
- [ ] Implementation notes recorded
- [ ] Code comments added

### Git
- [ ] Clean commit history
- [ ] Feature branch work
- [ ] PR review ready
- [ ] Ready to merge to main

---

## 🎯 Next Action Items

1. **Review this checklist** with yourself
2. **Confirm design decisions** (sections marked with ✓)
3. **Create directory structure** (use provided template)
4. **Start Week 1 tasks**

---

**Last Updated**: 2025-11-06
**Ready to Start**: YES ✅
**Estimated Completion**: 5 weeks
**Total Effort**: 40-50 hours
