# Phase 2 Frontend Integration Plan

## Overview
This document outlines the remaining work to fully integrate the Phase 2 Claude Skill implementation into the frontend. All backend logic is complete and tested—this plan focuses on connecting it to the UI layer.

**Status**: Backend ✅ Complete | Frontend ⏳ Pending Integration

---

## What's Already Done (Backend)

✅ Intent detection (Types A-D) with confidence scoring
✅ Conversion signal recognition
✅ Phase transition logic with auto-advancement
✅ Phase-aware OpenAI prompts
✅ Type-safe response format with answer options
✅ Comprehensive test suite (50+ test cases)

---

## Integration Todo List

### Phase A: Update API Route Handler
**File**: `src/app/api/consultation/process/route.ts`

- [ ] Import enhanced functions from consultationEngine
  ```typescript
  import {
    detectIntentSignals,
    detectConversionSignals,
    consultationEngine
  } from "@/api/consultationEngine";
  ```

- [ ] Pass phase parameter to OpenAI response generation
  ```typescript
  const response = await generateConsultantResponse(
    userMessage,
    conversationHistory,
    currentPhase  // NEW: add phase context
  );
  ```

- [ ] Use classifyUserIntent with message text
  ```typescript
  const intent = consultationEngine.classifyUserIntent(
    metadata,
    userMessage  // NEW: analyze message text too
  );
  ```

- [ ] Check for auto-transition
  ```typescript
  const transition = consultationEngine.shouldAutoTransitionPhase(
    currentPhase,
    metadata
  );

  if (transition.shouldTransition) {
    nextPhase = transition.nextPhase;
  }
  ```

- [ ] Detect conversion signals for logging/analytics
  ```typescript
  const conversionResult = detectConversionSignals(userMessage);
  if (conversionResult.hasSignal) {
    logger.info("Conversion signal detected", {
      signals: conversionResult.signals,
      suggestedPhase: conversionResult.suggestedPhase
    });
  }
  ```

### Phase B: Update ConsultationChat Component
**File**: `src/components/ConsultationChat.tsx`

- [ ] Handle phase-aware responses
  ```typescript
  // Get current phase from state
  const { currentPhase } = useConsultationState();

  // Pass to API
  const response = await processUserMessage(
    userMessage,
    currentPhase
  );
  ```

- [ ] Render question type hints
  ```typescript
  if (response.questionType === "multiple_choice") {
    return <MultipleChoiceQuestion options={response.answerOptions} />;
  } else if (response.questionType === "range_selection") {
    return <RangeSelector options={response.answerOptions} />;
  } else {
    return <OpenEndedQuestion />;
  }
  ```

- [ ] Handle answer option selection with phase routing
  ```typescript
  const handleOptionSelected = (option: AnswerOption) => {
    // Send user's choice as message
    sendMessage(option.label);

    // If option has next phase, transition
    if (option.nextPhaseIfSelected) {
      updatePhase(option.nextPhaseIfSelected);
    }
  };
  ```

- [ ] Display conversion signals (optional UI feedback)
  ```typescript
  // Show toast/notification when conversion detected
  if (response.processingData?.conversionSignals?.length > 0) {
    toast.info("Great! Let's discuss your project in detail");
  }
  ```

### Phase C: Update MetadataPanel
**File**: `src/components/MetadataPanel.tsx`

- [ ] Display current phase name
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

- [ ] Show phase progress indicator
  ```typescript
  // Phase 1-A → 1-B → 1-C/1-D → 8
  // Visual progress bar showing current position
  ```

- [ ] Display questions asked count
  ```typescript
  <div>Questions Asked: {questionsAsked}/8 or /25</div>
  ```

- [ ] Update phase-specific metadata fields
  ```typescript
  // Light Consultation shows: room, pain_point, feeling, keeping, budget, timeline, must_haves
  // Standard Consultation shows: all of above + lifestyle, constraints, style
  ```

### Phase D: Create UI Components (New)
**File**: `src/components/QuestionRenderer.tsx` (NEW)

- [ ] Create `QuestionRenderer` component
  ```typescript
  interface QuestionRendererProps {
    response: ConsultantResponse;
    onAnswerSelected?: (option: AnswerOption) => void;
  }

  export function QuestionRenderer({ response, onAnswerSelected }: QuestionRendererProps) {
    switch (response.questionType) {
      case "multiple_choice":
        return <MultipleChoiceQuestion ... />;
      case "range_selection":
        return <RangeSelector ... />;
      case "free_text":
        return <FreeTextQuestion ... />;
      default:
        return <OpenEndedQuestion ... />;
    }
  }
  ```

- [ ] Create `MultipleChoiceQuestion` component
  ```typescript
  // Render answer options as buttons
  // Track selection
  // Optional: show selected state
  ```

- [ ] Create `RangeSelector` component
  ```typescript
  // For budget, timeline options
  // Radio buttons or select dropdown
  // Show clear, human-readable labels
  ```

### Phase E: Update State Management
**File**: `src/hooks/useConsultationState.ts`

- [ ] Add phase change handler
  ```typescript
  const updatePhaseFromResponse = (nextPhase?: ConsultationPhase) => {
    if (nextPhase) {
      updatePhase(nextPhase);
    }
  };
  ```

- [ ] Track questions asked count
  ```typescript
  const questionsAsked = messages.filter(m => m.role === "assistant").length;
  ```

- [ ] Expose in hook return
  ```typescript
  return {
    // ... existing
    updatePhaseFromResponse,
    questionsAsked
  };
  ```

### Phase F: Testing & Validation
**Files**: Various

- [ ] Test exploratory user flow
  - User: "Just looking"
  - Bot: Shows exploratory-style questions (fun, visual)
  - User: "Actually, how much would this cost?"
  - Bot: Detects conversion, transitions to consultation mode

- [ ] Test small project flow
  - User: "My bedroom needs a refresh"
  - Bot: Asks 5-8 focused questions
  - Bot: Auto-transitions to synthesis after covering essentials

- [ ] Test large project flow
  - User: "We just moved and need to renovate everything"
  - Bot: Asks 15-25 comprehensive questions
  - Bot: Explores lifestyle, constraints in detail

- [ ] Test question rendering
  - [ ] Multiple choice questions render as buttons
  - [ ] Range selection renders as appropriate UI
  - [ ] Phase routing works when option selected

- [ ] Test metadata display
  - [ ] MetadataPanel updates in real-time
  - [ ] Phase indicator shows correct phase
  - [ ] Progress bar advances correctly

---

## Integration Checklist

### API Integration
- [ ] Update process/route.ts with phase parameter
- [ ] Pass userMessage to classifyUserIntent
- [ ] Implement shouldAutoTransitionPhase check
- [ ] Log conversion signals
- [ ] Test API responses include answerOptions

### UI Components
- [ ] Create QuestionRenderer component
- [ ] Create MultipleChoiceQuestion component
- [ ] Create RangeSelector component
- [ ] Wire into ConsultationChat
- [ ] Style components per design system

### State Management
- [ ] Add questionsAsked tracking
- [ ] Add updatePhaseFromResponse handler
- [ ] Update MetadataPanel with phase display
- [ ] Handle phase transitions in UI

### Testing
- [ ] Exploratory → Conversion → Small Project flow
- [ ] Small Project auto-transition (5-8 questions)
- [ ] Large Project flow (15-25 questions)
- [ ] Question rendering by type
- [ ] Metadata panel updates
- [ ] Phase indicator accuracy

### Deployment
- [ ] Test in development
- [ ] Verify no regressions
- [ ] Check TypeScript compilation
- [ ] Test on mobile (iPhone SE, 375px)
- [ ] Ready for production

---

## Estimated Effort

| Phase | Task | Est. Time | Priority |
|-------|------|-----------|----------|
| A | API route updates | 1-2 hours | Critical |
| B | ConsultationChat updates | 2-3 hours | Critical |
| C | MetadataPanel updates | 1-2 hours | High |
| D | New UI components | 2-3 hours | High |
| E | State management | 1 hour | Medium |
| F | Testing | 2-3 hours | Critical |

**Total Estimated Time**: 9-14 hours

---

## Code References

### Files to Modify
1. `src/app/api/consultation/process/route.ts` - API handler
2. `src/components/ConsultationChat.tsx` - Main chat component
3. `src/components/MetadataPanel.tsx` - Metadata display
4. `src/hooks/useConsultationState.ts` - State management

### Files to Create
1. `src/components/QuestionRenderer.tsx` - Question type dispatcher
2. `src/components/MultipleChoiceQuestion.tsx` - MCQ component
3. `src/components/RangeSelector.tsx` - Range selection component

### Backend Files (Already Complete)
- `src/api/consultationEngine.ts` ✅
- `src/api/openai.ts` ✅
- `src/types/consultation.ts` ✅
- `src/api/__tests__/consultationEngine.test.ts` ✅

---

## Key Implementation Notes

### 1. Phase Parameter Flow
```
User Message
    ↓
process/route.ts (pass currentPhase)
    ↓
generateConsultantResponse(message, history, phase)
    ↓
LLM returns phase-aware response
    ↓
ConsultationChat displays with question type
    ↓
MetadataPanel shows phase progress
```

### 2. Auto-Transition Example
```
Light Consultation (5-8 questions max):
- Q1: Which room? → Answered (metadata.room)
- Q2: What's the problem? → Answered (metadata.goals.pain_points)
- Q3: How should it feel? → Answered (metadata.goals.emotional_outcome)
- Q4: Budget? → Answered (metadata.budget)
- ...
- After Q5-8 and all essentials covered → Auto-transition to Phase 8 (Synthesis)
```

### 3. Question Type Rendering
```typescript
// Backend returns structured response
{
  conversationalMessage: "Are you thinking...",
  questionType: "multiple_choice",
  answerOptions: [
    {
      id: "1",
      label: "Small refresh",
      nextPhaseIfSelected: "phase_1c_light_consultation"
    },
    {
      id: "2",
      label: "Full renovation",
      nextPhaseIfSelected: "phase_1d_standard_consultation"
    }
  ]
}

// Frontend renders appropriate UI
// User selects → sent as message + phase routing
```

### 4. Design System Compliance
- Use tokens from `docs/tokens.ts` for all styling
- Button styling: `ComponentTokens.Button`
- Spacing: `PrimitiveTokens.Spacing`
- Typography: `SemanticTokens.Typography`
- Colors: `SemanticTokens.Color`

---

## Success Criteria

✅ Intent detection works end-to-end
✅ Users are routed to correct consultation flow
✅ Conversion signals trigger UI feedback
✅ Small projects complete in 5-8 exchanges
✅ Large projects allow 15-25 questions
✅ Question type hints render correctly
✅ MetadataPanel displays real-time progress
✅ Auto-transitions happen at right times
✅ All TypeScript compiles without errors
✅ Mobile-responsive (375px viewport)
✅ No regressions in existing functionality

---

## FAQ

**Q: Do I need to use the new components?**
A: Not required—you can inline the logic in ConsultationChat. But separate components make it more maintainable.

**Q: Can I test this without full integration?**
A: Yes! The test suite (`src/api/__tests__/consultationEngine.test.ts`) validates all backend logic independently.

**Q: What if I don't want auto-transitions?**
A: Simply don't call `shouldAutoTransitionPhase()`. It's opt-in.

**Q: How do I debug intent detection?**
A: Check the logs—`classifyUserIntent()` logs confidence and signals.

**Q: Can I customize the prompts?**
A: Yes! The `generateSystemPrompt(phase)` function is configurable. Modify it for your needs.

---

## Related Documents

- **IMPLEMENTATION_SUMMARY.md** - What was built in Phase 2
- **../references/CHANGES_REFERENCE.md** - Technical reference guide
- **IMPLEMENTATION_PLAN.md** - Original design specification
- **src/api/__tests__/consultationEngine.test.ts** - Test examples

---

## Next Meeting Points

1. **API Integration Complete** → Review process/route.ts changes
2. **UI Components Done** → Review component structure
3. **Testing Phase** → Validate flows work end-to-end
4. **Deployment Ready** → Final checks before production

---

**Last Updated**: 2025-11-05
**Backend Status**: ✅ Complete
**Frontend Status**: ⏳ Ready for integration
