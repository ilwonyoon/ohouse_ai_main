# 🎨 Testing Moodboard Generation on the Web

**Quick Start:** Visit `http://localhost:3000/test-moodboard`

---

## 📋 What You'll See

A simple test interface with two buttons:

### Button 1: "Generate Mock Moodboard" (Test UI)
- ✅ No API calls
- ✅ Instant display (1.5 second delay for visual feedback)
- ✅ Shows exactly what the final UI will look like
- ✅ Perfect for testing the MoodboardDisplay component

**Click this to:** See the beautiful moodboard UI with sample data

### Button 2: "Generate Real Moodboard" (Test API)
- 🚀 Calls actual VisionBuilderAgent API
- ⏳ Takes 30-60 seconds (generating images with DALL-E 3)
- 🎯 Full end-to-end test
- ⚠️ Requires `.env` with `OPENAI_API_KEY`

**Click this to:** Test the complete moodboard generation pipeline

---

## 🚀 Steps to Test

### Step 1: Start Dev Server
```bash
cd /projects/ai-consultant
npm run dev
```

Expected output:
```
▲ Next.js 15.3.0
- Local:        http://localhost:3000
```

### Step 2: Navigate to Test Page
Open in browser:
```
http://localhost:3000/test-moodboard
```

### Step 3: Click "Generate Mock Moodboard"
- See the beautiful UI with sample moodboard data
- Test carousel navigation (← →)
- Test image thumbnails
- Test star rating (click stars)
- Test Download button
- Test Share button

### Step 4 (Optional): Click "Generate Real Moodboard"
- Requires OPENAI_API_KEY in `.env`
- Will call Claude 3.5 Sonnet to generate moodboard concept
- Will call DALL-E 3 to generate 6 room design images
- Takes 30-60 seconds (be patient!)
- See real AI-generated moodboard

---

## 🧪 What Gets Tested

### Mock Moodboard Tests:
- ✅ MoodboardDisplay component renders correctly
- ✅ Image carousel navigation works
- ✅ Thumbnail gallery works
- ✅ Color palette displays properly
- ✅ Design elements showcase renders
- ✅ Star rating system works
- ✅ Download/Share buttons present

### Real Moodboard Tests:
- ✅ StyleQuizResults to Moodboard conversion
- ✅ Claude narrative generation
- ✅ Color palette generation
- ✅ Design element extraction
- ✅ DALL-E 3 image generation (6 images)
- ✅ Complete moodboard assembly
- ✅ UI display of real data

---

## 📊 Sample Data

The test page uses this mock data:
- **Room Type:** Living Room
- **Style:** Modern Minimalist
- **Secondary Styles:** Minimalist, Scandinavian
- **Color Preference:** Cool (blues, grays)
- **Mood:** Serene, sophisticated
- **Images:** 3 placeholder images (mock) or 6 DALL-E images (real)

---

## 🐛 Troubleshooting

### Issue: "API endpoint not found" error
**Cause:** Real moodboard generation endpoint not implemented yet
**Solution:** Click "Generate Mock Moodboard" to test UI instead

### Issue: Images take too long
**Cause:** DALL-E 3 is generating high-quality images
**Expected:** 30-60 seconds is normal for 6 images

### Issue: DALL-E error (401, 403)
**Cause:** `OPENAI_API_KEY` not set or invalid
**Solution:**
1. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk_test_xxx...
   ```
2. Restart dev server: `npm run dev`

### Issue: Mock moodboard shows placeholder images
**This is expected!** The mock data uses placeholder URLs for quick testing

---

## 📌 What's Implemented vs Not Yet

### ✅ Implemented (Ready to Test)
- Moodboard data types (`consultation.ts`)
- Moodboard generation logic (`visionBuilderAgent.ts`)
- Image generation integration (`moodboardImageGenerator.ts`)
- Moodboard display component (`MoodboardDisplay.tsx`)
- Test page (`test-moodboard/page.tsx`)

### ⏳ Not Yet Implemented
- API route for `/api/moodboard/generate`
- Integration into ConsultationChat flow
- Frontend API wiring to chat interface
- User progression from Style Quiz → Moodboard

---

## 🔌 How to Connect to Chat

Once you want to integrate into the actual chat flow:

1. **Create API route:** `src/app/api/moodboard/generate/route.ts`
2. **Call from ConsultationChat:** Add button after style quiz completion
3. **Display in chat:** Show MoodboardDisplay in message bubble
4. **Save moodboards:** Store in user consultation context

(This is Phase 1B Frontend Integration - coming next!)

---

## 💡 Pro Tips

- **Start with mock:** Always test UI first with mock button
- **Then test real:** Once UI looks good, test with real API
- **Monitor console:** Check browser console for detailed logs
- **Rate the moodboard:** Test the 5-star rating system
- **Check network tab:** Watch DALL-E API calls in DevTools

---

## 📸 Expected Output

When you click "Generate Mock Moodboard", you should see:

```
┌─────────────────────────────────────┐
│   Modern Minimalist Living Room     │
│   A clean, sophisticated space...   │
│   [Design concept description]      │
├─────────────────────────────────────┤
│                                     │
│   [Large mood image]                │
│   ← 1/3 →  [Thumbnails]            │
│                                     │
├─────────────────────────────────────┤
│ Design Direction                    │
│ Style: Modern + Minimalist          │
│ Atmosphere: [Description]           │
├─────────────────────────────────────┤
│ Color Palette                       │
│ [Color swatches with names]         │
├─────────────────────────────────────┤
│ Key Design Elements                 │
│ [Furniture, Lighting, Textiles]     │
├─────────────────────────────────────┤
│ ★★★★★  [Download] [Share]          │
└─────────────────────────────────────┘
```

---

**Happy Testing! 🚀**

For questions or issues, check the detailed comments in:
- `src/api/visionBuilderAgent.ts` - Core generation logic
- `src/components/MoodboardDisplay.tsx` - UI component
- `src/app/test-moodboard/page.tsx` - Test page implementation
