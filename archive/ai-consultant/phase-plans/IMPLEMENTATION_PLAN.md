# Phase 2: Claude Skill 완벽 구현 계획

## 목표
Claude Skill의 모든 요구사항을 코드에 정확하게 반영하여, 챗봇이 SKILL.md의 의도대로 대화를 진행하도록 함.

---

## Phase 2 개선 계획: 4가지 핵심 구현

### 1. 사용자 메시지 텍스트 기반 Intent 분석
**파일:** `src/api/consultationEngine.ts`

**구현 내용:**
- 사용자의 첫 메시지에서 Intent Signals 패턴 매칭
- Type A-D 신호 감지:
  - Type A (Exploratory): "Just looking", "Just checking", "Curious", "Surprise me" 등
  - Type B (Vague): "needs help" (but vague), "feels outdated", room mentioned but unclear
  - Type C (Small Project): Specific room + small scope 신호
  - Type D (Large Project): Multi-room, "just moved", budget/timeline 언급

**수정 함수:**
- `classifyUserIntent(userMessage: string, metadata: ExtractedMetadata): UserIntentType`
  - 기존: metadata만 분석
  - 개선: userMessage의 텍스트 패턴 매칭 추가

**새로운 헬퍼 함수:**
- `detectIntentSignals(message: string): { type: UserIntentType, confidence: number, signals: string[] }`
  - 정확한 신호 감지와 추적

---

### 2. Conversion Signal 패턴 인식
**파일:** `src/api/consultationEngine.ts`

**구현 내용:**
- Exploratory 사용자가 real project로 전환하는 신호 감지:
  - "Actually, I do need help with..."
  - "How much would something like this cost?"
  - "My [room] has [specific problem]..."
  - "Could you do that for me?"
  - Specific questions about process, pricing, timeline

**새로운 함수:**
- `detectConversionSignals(userMessage: string): { hasSignal: boolean, signals: string[], suggestedPhase: ConsultationPhase }`
  - Conversion 신호를 감지하고 다음 Phase를 제안

**통합:**
- `processUserResponse()` 메서드 개선:
  - 매 메시지마다 conversion signal 확인
  - Signal 감지 시 자동 phase transition

---

### 3. 선택지 기반 질문 UI (Assistant Response 포맷)
**파일:** `src/types/consultation.ts` + `src/api/openai.ts`

**구현 내용:**
- ConsultantResponse 타입 확장:
  ```typescript
  {
    id: string;
    conversationalMessage: string;
    nextPhase?: ConsultationPhase;

    // NEW: UI 렌더링 힌트
    questionType: "open_ended" | "multiple_choice" | "range_selection" | "free_text";
    suggestedAnswers?: string[];  // MCQ용 선택지
    answerOptions?: {
      id: string;
      label: string;
      nextPhaseIfSelected?: ConsultationPhase;
    }[];
  }
  ```

**Phase별 Question Format:**
- Phase 1-B (Scope Clarification):
  ```
  "Are you thinking:
  1. Small refresh - new decor, maybe paint, keep most furniture
  2. Makeover - new furniture, change the look significantly
  3. Full renovation - everything new, maybe structural changes
  4. Not sure yet - just exploring ideas"
  ```
  → `questionType: "multiple_choice"` + `suggestedAnswers: ["Small refresh", "Makeover", "Full renovation", "Not sure"]`

- Phase 5 (Budget Discovery):
  ```
  "Budget range:
  - Under $5,000
  - $5,000-$15,000
  - $15,000-$30,000
  - Over $30,000"
  ```
  → `questionType: "range_selection"` + `answerOptions: [...]`

**OpenAI 프롬프트 개선:**
- System prompt에 question format 지침 추가
- "When asking for multiple choice, format the response with numbered options"

---

### 4. Phase 자동 전환 로직
**파일:** `src/api/consultationEngine.ts`

**구현 내용:**

#### 4-1. Intent Detection 기반 즉시 라우팅
```
User Response Analysis
├─ Type A (Exploratory) → PHASE 1-A
├─ Type B (Vague) → PHASE 1-B
├─ Type C (Small) → PHASE 1-C
└─ Type D (Large) → PHASE 1-D → PHASE 2
```

#### 4-2. Conversion Signal 기반 자동 전환
```
PHASE 1-A (Exploratory)
└─ Detect Conversion Signal?
   ├─ YES + Small Scope → Auto to PHASE 1-C
   ├─ YES + Large Scope → Auto to PHASE 1-D
   └─ NO → Stay in 1-A or exit gracefully
```

#### 4-3. Phase 내 진행 로직
```
PHASE 1-C (Light Consultation)
├─ Question counter (5-8 max)
├─ Topic tracking (room, pain_point, feeling, keeping, budget, timeline, must_haves)
└─ All 7 answered? → Auto to PHASE 8 (Synthesis)

PHASE 1-D (Standard Consultation)
├─ Question counter (15-25)
├─ Track answered categories
├─ Essential answered? → Can move to 2
└─ Phase 2-7 progression → Sequential or adaptive
```

#### 4-4. 새로운 메서드
- `determineNextPhase(currentPhase, userResponse, metadata): ConsultationPhase`
  - 현재 phase와 사용자 응답을 보고 다음 phase 결정

- `shouldAutoTransitionPhase(currentPhase, answeredTopics, metadata): boolean`
  - Phase 자동 전환 여부 판단

- `getPhaseRequirements(phase): { essential: string[], optional: string[] }`
  - 각 phase의 필수/선택 질문 정의

---

## 구현 순서 (Todo List)

### Step 1: Type 정의 및 헬퍼 함수 (consultationEngine.ts)
- [ ] Intent signal patterns 상수 정의
- [ ] Conversion signal patterns 상수 정의
- [ ] `detectIntentSignals()` 함수 구현
- [ ] `detectConversionSignals()` 함수 구현
- [ ] Phase requirements 정의

### Step 2: Intent Classification 개선
- [ ] `classifyUserIntent()` 개선 (텍스트 분석 추가)
- [ ] Intent confidence 추적

### Step 3: Phase Transition 로직
- [ ] `determineNextPhase()` 재구현
- [ ] `shouldAutoTransitionPhase()` 구현
- [ ] Phase 전환 트리거 포인트 정의

### Step 4: Question Format & UI Hints
- [ ] ConsultantResponse 타입 확장 (questionType, answerOptions)
- [ ] OpenAI 프롬프트에 format 지침 추가

### Step 5: OpenAI 프롬프트 개선
- [ ] System prompt에 SKILL.md 컨텍스트 추가
- [ ] Phase별 프롬프트 템플릿 추가
- [ ] 질문 형식 가이드라인 추가

### Step 6: 통합 테스트
- [ ] Intent detection 테스트 (A, B, C, D types)
- [ ] Conversion signal detection 테스트
- [ ] Phase transition flow 테스트
- [ ] Metadata 수집 동작 테스트

---

## 파일 수정 계획

### 새로 생성할 파일
1. `src/api/intentDetector.ts` (선택사항 - 분리)
   - Intent detection 로직 별도 파일로 분리 가능

### 수정할 파일
1. **src/types/consultation.ts**
   - ConsultantResponse 타입 확장
   - Intent signal types 추가

2. **src/api/consultationEngine.ts**
   - Intent signals/conversion signals 상수
   - detectIntentSignals() 함수
   - detectConversionSignals() 함수
   - classifyUserIntent() 개선
   - determineNextPhase() 재구현
   - Phase transition 로직 강화

3. **src/api/openai.ts**
   - System prompt 개선
   - Phase별 프롬프트 템플릿
   - Question format 지침

4. **src/app/api/consultation/process/route.ts**
   - Conversion signal 처리 로직 (만약 backend에서 처리한다면)

---

## 각 Phase에서 구현할 구체적 내용

### Phase 0: Intent Detection
```typescript
generatePhase0Question(metadata: ExtractedMetadata, userMessage: string)
// 사용자의 첫 메시지 분석
// Intent signals 감지
// Type A-D 분류
// 다음 Phase 즉시 결정
```

### Phase 1-A: Exploratory
```typescript
generatePhase1aQuestion(metadata: ExtractedMetadata, questionNumber: number)
// Q1: Magic wand room selection
// Q2: Photo + feeling hook
// Per message: Check for conversion signals
// On conversion: Auto-transition to 1-C or 1-D
```

### Phase 1-B: Scope Clarification
```typescript
generatePhase1bQuestion(metadata: ExtractedMetadata)
// Q1: Multiple choice scope level
// Parse answer → route to 1-C or 1-D
```

### Phase 1-C: Light Consultation
```typescript
generatePhase1cQuestion(metadata: ExtractedMetadata)
// Track: room, pain_point, feeling, keeping, budget, timeline, must_haves
// Question counter: 5-8 max
// Auto-transition to Phase 8 when complete
```

### Phase 1-D: Standard Consultation → Phases 2-8
```typescript
generatePhase1dQuestion(metadata: ExtractedMetadata)
// Essential questions first
// Then optional based on engagement
// Auto-progress through Phases 2-7
// Finally Phase 8: Synthesis
```

---

## Success Criteria

✅ Intent detection이 SKILL.md의 신호를 90% 이상 정확하게 감지
✅ Conversion signals를 실시간으로 감지하여 자동 phase transition
✅ Small project는 5-8분, Large project는 20-30분 내 완료
✅ MetadataPanel에 실제 수집된 데이터가 점진적으로 채워짐
✅ 챗봇 응답이 SKILL.md의 의도와 일치
✅ 사용자 경험이 자연스럽고 흐름이 끊기지 않음

---

## 구현 시작 준비

이 계획에 따라 **Step 1부터 Step 6까지** 순차적으로 진행할 예정.

각 Step 완료 후:
1. 코드 변경사항 정리
2. 테스트 (가능한 범위)
3. TodoList 업데이트

준비 완료?
