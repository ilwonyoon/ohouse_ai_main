# 📋 NEXT STEPS ROADMAP - Phase 1B Completion + Agent 1.5

**Document:** NEXT_STEPS_ROADMAP.md
**Created:** 2025-11-07
**Status:** PLANNING & IMPLEMENTATION GUIDE
**Target Completion:** Phase 1B (2 weeks), Agent 1.5 (1 week)

---

## 🎯 IMMEDIATE NEXT STEPS (This Week)

### 1. **CONTINUE Phase 1B Frontend Integration** ✅ ACTIVE
**Status:** CI/CD complete, ready to integrate agents

#### 1A: API Route Enhancement (6 hours)
- **File:** `src/app/api/consultation/process/route.ts`
- **Tasks:**
  - [ ] Accept `phase` parameter from frontend
  - [ ] Route requests through appropriate Agent
  - [ ] Detect conversation signals (intent, constraints, style)
  - [ ] Track metadata extraction progress
- **Depends on:** Agent 1.4 (StyleQuizAgent) ✅ COMPLETE
- **Next:** Required before frontend can use agents

#### 1B: ConsultationChat Component Integration (8-12 hours)
- **File:** `src/components/ConsultationChat.tsx`
- **Current State:** Exists, handles streaming responses
- **What to add:**
  - [ ] Display style quiz questions (from Agent 1.4)
  - [ ] Handle image upload for analysis (Agent 1.3)
  - [ ] Show analysis results in chat
  - [ ] Display metadata extraction progress
  - [ ] Render different question types based on phase
- **Key Integration Points:**
  - Connect to `useConsultationState` hook
  - Use `useStreamingResponse` for API calls
  - Call `/api/consultation/process` endpoint
- **Expected Output:** Full chat interface that works with all Phase 1 agents

#### 1C: MetadataPanel Display (6-8 hours)
- **File:** `src/components/MetadataPanel.tsx` (new or update)
- **Purpose:** Show real-time metadata extraction
- **Display Elements:**
  - Current phase name
  - Progress indicator (% complete)
  - Extracted metadata summary
  - Image analysis results
  - Style quiz answers summary
- **Design:** Sidebar that updates as user interacts

### 2. **Test Image Analyzer in Chat** ⚠️ CRITICAL PATH
**When Can You Test?**
- ✅ **NOW** - Locally (without UI integration)
- ⚠️ **After Step 1A** - Via API endpoint
- ⚠️ **After Step 1B** - Full chat UI integration

**How to Test Locally (Right Now):**

```bash
# 1. In Node.js or browser console:
cd /projects/ai-consultant

# 2. Run the test suite that validates imageAnalyzer
npm run test

# 3. Or manually test with this code:
import { createImageAnalysisPrompt } from './src/api/imageAnalyzer';
const prompt = createImageAnalysisPrompt();
console.log(prompt); // See what the analyzer asks Claude

# 4. Or call Claude directly with an image:
# - Create a small test image
# - Use Claude Vision API (requires OPENAI_API_KEY)
# - Pass image + prompt to get analysis
```

**How to Test via API (After Step 1A):**
```bash
# POST /api/consultation/image-analysis
{
  "imageUrl": "https://example.com/room.jpg",
  "imageBase64": "..." // or base64 encoded image
}
```

**How to Test Full Chat (After Step 1B):**
- Click "Upload Image" in chat
- Choose room photo
- Watch analysis appear in real-time
- See extracted metadata in sidebar

---

## 📅 PHASE 1B COMPLETION TIMELINE

### Week 1 (This Week: Nov 7-13)
- **Task 1A:** API Route Enhancement (6h)
- **Task 1B:** Chat Component Integration (12h)
- **Total:** ~18 hours
- **Goal:** Chat interface fully integrated with Phase 1 agents

### Week 2 (Nov 14-20)
- **Task 1C:** MetadataPanel Display (8h)
- **Task 1D:** Testing & Bug Fixes (10h)
- **Task 1E:** Documentation & Deploy Prep (4h)
- **Total:** ~22 hours
- **Milestone:** Phase 1B COMPLETE ✅

**Phase 1B Total:** ~40 hours (within estimate)

---

## 🎨 AGENT 1.5: VisionBuilderAgent (AFTER Phase 1B)

**Status:** NOT STARTED (scheduled for Week 3+)
**Timeline:** 28 hours (3.5 days if 8h/day)
**Target:** Mid-November

### What It Does
Generates moodboards (visual mood + design inspiration boards) from:
- User style preferences (from Agent 1.4 quiz)
- Room analysis (from Agent 1.3)
- Design direction (from Agent 1.2)

### 1.5 Tasks Breakdown

#### Task 1.5.1: Design Moodboard Structure (2h)
- [ ] Define moodboard data model
- [ ] Color palette structure
- [ ] Design elements layout
- [ ] Reference images organization
- **Deliverable:** TypeScript types for moodboard

#### Task 1.5.2: Research Image Generation APIs (3h)
- [ ] Evaluate: DALL-E, Stable Diffusion, Midjourney
- [ ] Check cost/rate limits
- [ ] Integration complexity
- [ ] Quality comparison
- **Recommendation:** DALL-E (easiest integration with OpenAI)

#### Task 1.5.3: Implement Moodboard Generation (10h)
- [ ] Create prompt templates for style + room
- [ ] Logic to select 5-8 reference images
- [ ] Combine with user preferences
- [ ] Format as moodboard structure
- **Output:** Structured moodboard data (no images yet)

#### Task 1.5.4: Integrate Image Generation API (8h)
- [ ] Setup DALL-E API calls
- [ ] Batch image generation
- [ ] Error handling & retry logic
- [ ] Cache generated images
- **Output:** Generate 5-8 styled room images

#### Task 1.5.5: Extract Colors & Elements (3h)
- [ ] Color extraction from generated images
- [ ] Design element identification
- [ ] Palette harmonization
- [ ] Text descriptions per image
- **Output:** Rich moodboard metadata

#### Task 1.5.6: Moodboard UI Component (2h)
- [ ] Carousel/grid display
- [ ] Image preview modal
- [ ] Download moodboard as PDF
- [ ] Share functionality
- **Output:** Beautiful moodboard display in chat

### 1.5 Implementation Order
1. ✅ Task 1.5.1 → Complete data model
2. ✅ Task 1.5.2 → Decide on API (recommend DALL-E)
3. ✅ Task 1.5.3 → Generate moodboard structure (no images)
4. ✅ Task 1.5.4 → Connect image API
5. ✅ Task 1.5.5 → Extract metadata
6. ✅ Task 1.5.6 → Build UI component
7. ✅ Test end-to-end with user style quiz

---

## 🔍 TESTING STRATEGY FOR IMAGE ANALYZER

### Local Testing (NOW - No API)
```javascript
// 1. Import the prompt builder
import { createImageAnalysisPrompt } from '@/api/imageAnalyzer';

// 2. See what analysis questions Claude will receive
const prompt = createImageAnalysisPrompt();
console.log(prompt);

// 3. Validate response parsing
import { parseImageAnalysisResponse } from '@/api/imageAnalyzer';
const mockResponse = { /* mock Claude response */ };
const result = parseImageAnalysisResponse(mockResponse);
```

### API Testing (After Step 1A)
```bash
# Test with curl
curl -X POST http://localhost:3000/api/consultation/image-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "iVBORw0KG..." // base64 image data
  }'

# Expected Response:
{
  "roomAnalysis": { ... },
  "visualAnalysis": { ... },
  "styleAnalysis": { ... },
  "issueAnalysis": { ... },
  "metadata": { ... }
}
```

### Integration Testing (After Step 1B)
1. Open app in browser
2. Navigate to consultation chat
3. Click "Upload Room Image"
4. Select test image (living room, bedroom, kitchen, etc.)
5. Verify:
   - ✅ Image displays in chat
   - ✅ Analysis shows room type detection
   - ✅ Colors extracted and shown
   - ✅ Style identified
   - ✅ Issues flagged
   - ✅ Metadata panel updates

### Test Images to Try
- **Living Room:** Complex space, multiple styles
- **Bedroom:** Evaluate lighting, colors
- **Kitchen:** Identify layout, appliances
- **Small Space:** Test size estimation
- **Outdated Design:** Check issue detection

---

## 🚀 DEPLOYMENT CHECKLIST (Phase 1B Complete)

Before going live, verify:
- [ ] All Phase 1 agents integrated (1.1-1.4)
- [ ] Image analyzer works with real images
- [ ] Chat UI fully functional
- [ ] Metadata extracted correctly
- [ ] API routes secured
- [ ] Error handling graceful
- [ ] Performance acceptable (<2s response)
- [ ] CI/CD pipeline green ✅ (already done)
- [ ] Tests passing (82/82) ✅ (already done)
- [ ] Documentation updated

---

## 📊 PROGRESS TRACKING

### Current Status
- ✅ **Agent 1.1:** IntentClassifier v2 - COMPLETE
- ✅ **Agent 1.2:** ContextAgent - COMPLETE
- ✅ **Agent 1.3:** ImageAnalyzer - COMPLETE (logic only)
- ✅ **Agent 1.4:** StyleQuizAgent - COMPLETE
- 🟨 **Frontend Integration:** IN PROGRESS
  - ⏳ Task 1A: API routes (Start today)
  - ⏳ Task 1B: Chat component (Follow Task 1A)
  - ⏳ Task 1C: Metadata panel (Follow Task 1B)
- ⏳ **Agent 1.5:** VisionBuilderAgent - QUEUED (after Phase 1B)

### Time Investment
- **Phase 1A:** ~40 hours (DONE)
- **Phase 1B Agents:** ~50 hours (DONE)
- **Phase 1B Frontend:** ~40 hours (IN PROGRESS - estimate)
- **Agent 1.5:** ~28 hours (QUEUED)
- **Total Phase 1:** ~158 hours target (on track for 2-week completion)

---

## 💡 KEY DECISIONS FOR TEAM

### 1. Image Generation API Choice (for Agent 1.5)
**Recommendation:** DALL-E (via OpenAI)
- ✅ Easiest integration (same API key as LLM)
- ✅ High quality output
- ✅ Consistent style control
- ✅ Good pricing (~$0.08 per image)
- ⚠️ Limited customization vs Stable Diffusion

**Alternative:** Stable Diffusion (self-hosted or via API)
- ✅ More customization
- ✅ Lower cost at scale
- ⚠️ More complex integration

### 2. Moodboard Delivery Format
**Recommendation:** Interactive web carousel + downloadable PDF
- Web: Swipeable gallery with metadata
- PDF: 8-page document (1 style image per page + 1 summary)

### 3. Performance Optimization
**Current Concern:** Image analysis + generation could be slow
- Recommendation: Async job queue for image generation
  - Immediate: Return analysis results
  - Background: Generate images (30-60s)
  - Real-time: WebSocket updates when images ready

---

## 📝 NOTES FOR NEXT LLM

If you take over this project later:
1. Read `UNIFIED_MASTER_PRD.md` for full system vision
2. Read `CI/CD_SETUP` section (just completed) for deployment
3. Check GitHub Actions workflow status (`.github/workflows/push.yml`)
4. Current phase: **Phase 1B Frontend Integration** (NOT Agent 1.5 yet)
5. ImageAnalyzer logic is READY but needs chat UI + API integration
6. Next critical tasks are **Tasks 1A, 1B, 1C** (API routes → Chat UI → Metadata)

---

**Document Created:** 2025-11-07
**Next Review Date:** 2025-11-13 (end of Phase 1B)
