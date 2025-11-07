# Image Generation API Selection for Moodboard Agent

**Date:** 2025-11-07
**Task:** 1.5.2 - Research and recommend image generation API
**Decision Required:** Which API for Agent 1.5?

---

## 🎯 Requirements Analysis

For VisionBuilderAgent moodboard generation, we need:
1. **Interior design quality** - Realistic room renders
2. **Style control** - Follow specific design styles
3. **Integration ease** - Minimal setup + API key management
4. **Cost efficiency** - Reasonable per-image pricing
5. **Speed** - <60s per image acceptable
6. **Customization** - Control composition, colors, elements

---

## 📊 API Comparison Matrix

| Feature | DALL-E 3 | Stable Diffusion | Hugging Face Free | Replicate API |
|---------|----------|------------------|-------------------|---------------|
| **API Key Required** | ✅ OpenAI (paid) | ✅ Free HF token | ✅ FREE Hugging Face | ⚠️ Replicate (free tier) |
| **Integration** | ✅ OpenAI SDK | ✅ Transformers lib | ✅ Inference API | ✅ REST API |
| **Interior Design Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Style Control** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Setup Time** | <10 min | <5 min | <2 min ✅ | <5 min |
| **Cost per Image** | ~$0.08 | FREE/$0.003-0.02 | FREE ✅ | FREE/1 credit |
| **Speed** | 10-30s | 5-15s | 30-60s | 5-15s |
| **Rate Limits** | 500 req/min | Depends | 2 concurrent | Free tier limited |
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Best For** | Production | Max control | **FREE option** | **FREE + quality** |

---

## 🔍 DETAILED EVALUATION

### 1. DALL-E 3 (OpenAI)

**Pros:**
- ✅ Zero additional setup - uses existing OpenAI API key
- ✅ Excellent interior design renders
- ✅ Great at following detailed prompts
- ✅ Simple REST API integration
- ✅ Consistent quality
- ✅ Built-in safety filters
- ✅ 1024x1024 images standard

**Cons:**
- ⚠️ Higher cost ($0.08 per image)
- ⚠️ Slower generation (10-30s)
- ⚠️ Less customization than Stable Diffusion
- ⚠️ Limited to OpenAI's aesthetic style

**Cost Estimate (for 1 moodboard = 8 images):**
- Per moodboard: ~$0.64
- Per user session: ~$2-3 (average 4-5 moodboards)

**Integration Complexity:** ⭐ SIMPLE
```typescript
// One API call with OpenAI SDK
const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: "Modern minimalist living room with...",
  size: "1024x1024",
  quality: "hd",
});
```

---

### 2. Stable Diffusion

**Pros:**
- ✅ Most customizable (control every aspect)
- ✅ Cheapest option (~$0.003-0.02 per image)
- ✅ Can self-host on GPU (no ongoing API costs)
- ✅ Excellent for specific interior design styles
- ✅ Fast generation (5-15s)

**Cons:**
- ⚠️ Complex integration (self-host or third-party API)
- ⚠️ Quality varies by model selection
- ⚠️ Requires prompt engineering expertise
- ⚠️ Self-hosting needs GPU infrastructure
- ⚠️ Third-party APIs add complexity & cost

**Cost Estimate (for 1 moodboard = 8 images):**
- Self-hosted: $0 per image (but GPU + infra costs)
- Via API: ~$0.10-0.80 per image

**Integration Complexity:** ⭐⭐⭐ MODERATE-HIGH
```typescript
// Requires Replicate API, Hugging Face, or self-hosting
// Multiple SDK options, more setup needed
```

---

### 3. Midjourney

**Pros:**
- ✅ Best output quality for interior design
- ✅ Impressive visual results
- ✅ Great community for design inspiration
- ✅ Excellent style control

**Cons:**
- ⚠️ Most expensive (~$0.30-0.65 per image)
- ⚠️ Discord bot integration (not traditional API)
- ⚠️ Complex async handling
- ⚠️ Subscription model ($30/month minimum)
- ⚠️ Rate limiting strict
- ⚠️ Hard to automate

**Cost Estimate (for 1 moodboard = 8 images):**
- $30/month subscription (~$1/image for heavy use)
- Or $0.30-0.65 per image on pay-as-you-go

**Integration Complexity:** ⭐⭐⭐⭐ VERY HIGH
```typescript
// Requires Discord.js library
// Webhook management
// Async polling for image generation
// Complex error handling
```

---

## 🎯 RECOMMENDATION

### **PRIMARY CHOICE: DALL-E 3** ✅

**Why:**
1. **Zero friction integration** - Already have OpenAI API key
2. **Excellent interior design quality** - Trained on millions of professional designs
3. **Reliable & fast** - 10-30s per image is acceptable
4. **Reasonable cost** - ~$0.08 per image fits project budget
5. **Battle-tested** - Large production deployments using this
6. **Future-proof** - OpenAI continuously improving models

**Implementation Path:**
```
Week 1: Use DALL-E 3 for MVP
Week 2-3: Optional - Add Stable Diffusion fallback for cost savings
Future: Monitor new APIs (Claude Vision API improvements, etc.)
```

### **ALTERNATIVE 1: Hugging Face Inference API (100% FREE)**

**Setup:**
```typescript
// Get free API token from https://huggingface.co/settings/tokens
// No payment, totally free
const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// Call Stable Diffusion via Hugging Face (free tier)
const response = await fetch(
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
  {
    headers: { Authorization: `Bearer ${HF_TOKEN}` },
    method: "POST",
    body: JSON.stringify({ inputs: "modern minimalist living room..." }),
  }
);
```

**Pros:**
- ✅ **100% FREE** - No payment required
- ✅ Very easy signup (just Hugging Face account)
- ✅ Good quality for interior design
- ✅ Can use Stable Diffusion models
- ✅ No credit card needed

**Cons:**
- ⚠️ Slower (30-60s for free tier)
- ⚠️ Limited concurrent requests (2)
- ⚠️ Can be rate-limited during heavy usage
- ⚠️ Queue times during peak hours

**Cost:** **FREE** 🎉

---

### **ALTERNATIVE 2: Replicate API (FREE Tier + Paid)**

**Setup:**
```typescript
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Free tier: 1 concurrent, 1 image per minute
const output = await replicate.run(
  "stability-ai/sdxl:a8453e0e-6f3b-4d6c-8a27-51b63cfaf5e9",
  {
    input: {
      prompt: "modern minimalist living room...",
      negative_prompt: "blurry, low quality",
    },
  }
);
```

**Pros:**
- ✅ Free tier available (generous for single user)
- ✅ Higher quality than Hugging Face free
- ✅ Easy integration (REST API)
- ✅ Supports SDXL (better quality)
- ✅ No setup needed, just API key

**Cons:**
- ⚠️ Free tier has limits (1 concurrent, can run ~30/month)
- ⚠️ Paid after free credits ($0.000525 per image)
- ⚠️ Requires credit card to sign up

**Cost:** **FREE** (with limits) or ~$0.0005/image

---

### **RECOMMENDATION: FREE OPTION**

#### **Best for Development/Testing: Hugging Face Inference API** ✅
- Sign up: https://huggingface.co/join (completely free)
- No credit card required
- Perfect for prototyping
- Good enough quality for moodboards

#### **Best for Production: Replicate API (free tier)**
- Sign up: https://replicate.com (requires credit card)
- More reliable than Hugging Face free
- Higher quality images
- Cheap if you exceed free tier

---

### **COMPARISON: Which to Use?**

| Use Case | Recommendation |
|----------|-----------------|
| **Want to test right now** | Hugging Face (instant, no CC) |
| **Need better quality** | Replicate (free tier, needs CC) |
| **Have lots of users** | DALL-E 3 ($0.08/image) |
| **Want maximum control** | Stable Diffusion self-hosted |

---

### **NOT RECOMMENDED: Midjourney**

- Too expensive for user-facing feature
- API integration too complex
- Subscription model doesn't fit our architecture

---

## 📋 IMPLEMENTATION PLAN

### Phase 1 (Task 1.5.4): DALL-E 3 Integration
```typescript
// Use existing OpenAI client
// No new dependencies needed
// Add prompt generation for interior design
// Implement error handling & retries
```

### Phase 2 (Future): Add Fallback to Stable Diffusion
```typescript
// If DALL-E rate limited or fails
// Switch to Stable Diffusion via Replicate
// User gets images anyway, just slower
```

### Phase 3 (Future): Cost Optimization
```typescript
// Monitor API usage costs
// If >$1000/month, consider Stable Diffusion self-hosting
// Implement caching for repeated prompts
```

---

## ⚡ QUICK DECISION

**Current Implementation:** **DALL-E 3** via OpenAI
**Cost:** ~$0.08 per image

**For FREE Alternative:** Use **Hugging Face Inference API**
- Sign up: https://huggingface.co/join (NO credit card needed)
- Get API key
- Replace in `moodboardImageGenerator.ts` with Hugging Face code

**Free Alternative Benefits:**
- ✅ Zero cost
- ✅ Easy to set up (2 minutes)
- ✅ Good enough quality for prototyping
- ✅ Can switch to DALL-E later if needed

---

## 🔧 How to Switch to Hugging Face (FREE)

If you want to use the free option instead of DALL-E 3:

1. **Sign up for free:** https://huggingface.co/join
2. **Get API token:** Settings → Access Tokens → Create new token
3. **Update `.env`:**
   ```
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
   ```
4. **Update `moodboardImageGenerator.ts`:**
   ```typescript
   // Replace the DALL-E 3 code with Hugging Face code
   // (detailed implementation in HUGGING_FACE_INTEGRATION.md)
   ```

**Decision Maker:** AI Consultant Agent
**Current Setup:** DALL-E 3 (can switch to free Hugging Face anytime)
**Flexibility:** ✅ High (can add multiple image APIs, user can choose)
