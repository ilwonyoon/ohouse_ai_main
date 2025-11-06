# 📋 UNIFIED NUMBERING SYSTEM - Quick Reference

This guide explains the **SINGLE NUMBERING SYSTEM** used in **UNIFIED_MASTER_PRD.md**

---

## Numbering Hierarchy

### Level 1: PHASES (Highest)
**Format:** `Phase N` (where N = 1-6)
**Scope:** Major architectural layers of the system
**Duration:** 2-6 weeks each

```
Phase 1: Planning & Consultation Layer
Phase 2: Functional Design Layer
Phase 3: Domain Specialization Layer
Phase 4: Visualization Layer
Phase 5: Iteration Layer
Phase 6: E-Commerce Layer
```

---

### Level 2: AGENTS (Within Phases)
**Format:** `Agent N.M` (where N = phase, M = agent number)
**Scope:** Individual AI agents with specific responsibilities
**Duration:** 4-50 hours each

**Example - Phase 1B Agents:**
```
Agent 1.1: IntentClassifier v2          ✅ DONE (9 hours)
Agent 1.2: ContextAgent Enhancement    🔴 TODO (17 hours)
Agent 1.3: ImageAnalyzer               🔴 TODO (33 hours)
Agent 1.4: StyleQuizAgent              🔴 TODO (27 hours)
Agent 1.5: VisionBuilderAgent          🔴 TODO (28 hours)
Agent 1.6: ScopeResolver               🔴 TODO (17 hours)
```

**Example - Phase 2 Agents:**
```
Agent 2.1: LayoutAgent                 ⏳ TODO
Agent 2.2: LightingAgent               ⏳ TODO
Agent 2.3: StylingAgent                ⏳ TODO
Agent 2.4: MaterialAgent               ⏳ TODO
Agent 2.5: ColorHarmonyAgent           ⏳ TODO
```

---

### Level 3: TASKS (Within Agents)
**Format:** `Agent N.M.K` or `Task N.K` (where N = phase, M = agent, K = task)
**Scope:** Specific implementation subtasks
**Duration:** 1-10 hours each

**Example - Agent 1.1 Tasks:**
```
Task 1.1.1: Image metadata integration       (2 hours)
Task 1.1.2: Vision clarity scoring           (3 hours)
Task 1.1.3: Hybrid intent analysis           (2 hours)
Task 1.1.4: Test coverage                    (2 hours)
```

**Example - Phase 1B Frontend Tasks:**
```
Task 2.A: API Route Updates                  (6 hours)
Task 2.B: ConsultationChat Component         (12 hours)
Task 2.C: MetadataPanel Updates              (8 hours)
Task 2.D: New UI Components          ✅ DONE (12 hours)
Task 2.E: State Management                   (5 hours)
Task 2.F: Testing & Validation               (10 hours)
```

---

## OLD vs NEW Numbering (Mapping)

### S1.1 → Agent 1.1
- **Old:** "S1.1: IntentClassifier v2 Enhancement"
- **New:** "Agent 1.1: IntentClassifier v2"
- **Status:** ✅ COMPLETE

### S1.2 → Agent 1.2
- **Old:** "S1.2: ContextAgent Enhancement"
- **New:** "Agent 1.2: ContextAgent (Enhancement)"
- **Status:** 🔴 TODO

### S1.3 → Agent 1.3
- **Old:** "S1.3: ImageAnalyzer Implementation"
- **New:** "Agent 1.3: ImageAnalyzer"
- **Status:** 🔴 TODO

### S2.A → Task 2.A
- **Old:** "S2.A: API Route Updates"
- **New:** "Task 2.A: API Route Updates"
- **Status:** 🔴 TODO

### S2.D → Task 2.D
- **Old:** "S2.D: New UI Components"
- **New:** "Task 2.D: New UI Components"
- **Status:** ✅ COMPLETE

---

## Current Status Dashboard

### Phase 1: Planning & Consultation Layer

#### Part A: Consultation Engine
```
Status: ✅ COMPLETE
Commit: 4253238
Code: src/api/consultationEngine.ts (1,063 LOC)
Time: ~40 hours
```

#### Part B: Planning Layer Completion
```
Status: 🟨 IN PROGRESS (27/187 hours = 14% complete)
Timeline: 4 weeks remaining
```

**Completed (27 hours):**
- ✅ Agent 1.1: IntentClassifier v2 (9 hours)
- ✅ Task 2.D: UI Components (12 hours)
- ✅ Documentation & Setup (6 hours)

**Remaining (160 hours):**
- 🔴 Agent 1.2: ContextAgent (17 hours)
- 🔴 Agent 1.3: ImageAnalyzer (33 hours)
- 🔴 Agent 1.4: StyleQuizAgent (27 hours)
- 🔴 Agent 1.5: VisionBuilderAgent (28 hours)
- 🔴 Agent 1.6: ScopeResolver (17 hours)
- 🔴 Task 2.A: API Routes (6 hours)
- 🔴 Task 2.B: Chat Component (12 hours)
- 🔴 Task 2.C: MetadataPanel (8 hours)
- 🔴 Task 2.E: State Management (5 hours)
- 🔴 Task 2.F: Testing (10 hours)

---

## How to Use This System

### When Reading UNIFIED_MASTER_PRD.md:
1. Look for **Phase N** headers (top-level sections)
2. Under each phase, find **Agent N.M** subsections
3. Within each agent, find **Task N.M.K** checklist items
4. Check status emoji: ✅ 🟨 🔴 ⏳

### When Planning Work:
1. Pick next **Agent N.M** to work on
2. Break it into **Task N.M.K** subtasks
3. Estimate hours per task
4. Track progress against UNIFIED_MASTER_PRD.md

### When Communicating:
- Always use: **Agent 1.3** (not "S1.3" or "ImageAnalyzer")
- Always use: **Task 2.A** (not "S2.A" or "API Route Updates")
- Reference status: "Agent 1.2 is 🔴 TODO, starts after Agent 1.1 ✅"

### When Committing to GitHub:
```
feat: Agent 1.3 ImageAnalyzer - Computer vision integration
fix: Task 2.A API Route Updates - Phase parameter passing
docs: Task 2.F Testing & Validation - E2E flow tests
```

---

## Phase Completion Timeline

```
NOW:         Phase 1B IN PROGRESS (27/187 hours)
Week 1-4:    Phase 1B completion (160 hours remaining)
Week 5-6:    Phase 2 Functional Design (40-50 hours)
Week 7-9:    Phase 3 Domain Specialization (60-80 hours)
Week 10-13:  Phase 4 Visualization (80-100 hours)
Week 14-16:  Phase 5 Iteration (30-40 hours)
Week 17-20:  Phase 6 E-Commerce (30-40 hours)
```

---

## Key Reference Points

**Single Source of Truth:** UNIFIED_MASTER_PRD.md
**Progress Tracking:** ../phase-plans/PHASE1_IMPLEMENTATION_PROGRESS.md
**Previous Work:** 4253238 (Phase 1A complete)

---

**Last Updated:** 2025-11-06
**Valid Until:** Until UNIFIED_MASTER_PRD.md v3.0+
