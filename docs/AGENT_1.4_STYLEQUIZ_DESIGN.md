# Agent 1.4: StyleQuizAgent - Design Document
## Task 1.4.1: Style Quiz Structure Design

**Date:** 2025-11-07
**Author:** Claude Code
**Status:** IN PROGRESS
**Duration:** 4 hours

---

## Overview

The StyleQuizAgent extracts user visual style preferences through an interactive "this or that" quiz. Users see paired images representing different design aesthetics and choose which they prefer. The system learns their patterns and builds a comprehensive style profile.

---

## Quiz Structure

### Overall Strategy

```
Quiz Flow:
┌─────────────────────────────────────────┐
│ 1. Intro & Explanation                  │
│    "Let's discover your style..."       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. Core Quiz (20-25 questions)          │
│    "Which appeals to you more?"         │
│    [Image A] vs [Image B]               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Style Refinement (10-15 questions)   │
│    Context-specific style pairs         │
│    (For rooms they're designing)        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Results & Summary                    │
│    "Your primary style: Modern"         │
│    "Secondary influences: Minimalist"   │
│    Style score breakdown                │
└─────────────────────────────────────────┘
```

---

## Question Design

### Question Type: Binary Choice

Each question shows exactly 2 images and asks user to choose one.

```typescript
interface StyleQuizQuestion {
  id: string;
  question: string;           // "Which appeals to you more?"
  description?: string;        // Optional context
  imageA: {
    url: string;
    style: StyleCategory;      // Primary style represented
    secondaryStyles?: StyleCategory[];
    description: string;       // "Modern minimalist living room"
  };
  imageB: {
    url: string;
    style: StyleCategory;
    secondaryStyles?: StyleCategory[];
    description: string;
  };
  category?: string;           // "color", "furniture", "lighting", "overall"
  difficulty?: "easy" | "medium" | "hard";  // Easy = obvious, Hard = subtle
  weight?: number;             // Default 1, Higher = more impactful on scoring
}
```

### Question Categories

Questions are organized by design aspect:

```
1. Overall Style (4 questions)
   └─ Broad aesthetic direction
   └─ Examples: Modern vs Traditional, Minimalist vs Maximalist

2. Color Palettes (4 questions)
   └─ Color preference patterns
   └─ Examples: Warm vs Cool, Bold vs Neutral, Mono vs Multi-color

3. Materials & Textures (4 questions)
   └─ Surface preferences
   └─ Examples: Natural vs Synthetic, Matte vs Glossy, Rough vs Smooth

4. Furniture & Forms (4 questions)
   └─ Furniture style preferences
   └─ Examples: Angular vs Curved, Ornate vs Simple, Heavy vs Light

5. Lighting & Atmosphere (3 questions)
   └─ Ambient mood preferences
   └─ Examples: Bright vs Cozy, Cool-toned vs Warm-toned

6. Room-Specific Refinement (Variable, 10-15 questions)
   └─ For their specific room type (living room, bedroom, kitchen, etc.)
   └─ Examples: Living room Modern vs Living room Rustic
```

---

## 19 Design Styles Covered

```
1. Modern (contemporary, clean lines, minimalist approach)
2. Contemporary (current trends, mixed materials, eclectic)
3. Traditional (classic, formal, ornate, historical)
4. Transitional (blend of modern + traditional)
5. Minimalist (extreme simplicity, essential elements only)
6. Maximalist (bold, layered, collected looks, pattern-heavy)
7. Rustic (natural, weathered, farmhouse elements)
8. Farmhouse (rural aesthetic, vintage, country)
9. Scandinavian (light woods, functional, hygge, cozy)
10. Industrial (exposed brick, metal, warehouse vibes)
11. Bohemian (eclectic, global, artistic, laid-back)
12. Eclectic (mixed styles, collected, personal)
13. Mid-Century Modern (1950s-60s influence, iconic furniture)
14. Victorian (ornate, heavy fabrics, historical period)
15. Coastal (beachy, nautical, light, breezy)
16. Southwest (earth tones, patterns, cultural elements)
17. Asian-Inspired (zen, natural materials, balance)
18. Art Deco (geometric, bold colors, luxe, 1920s-30s)
19. Glam (luxurious, bold, metallic, statement pieces)
20. Gothic (dark, moody, dramatic, statement)

Note: Could expand to 25-30 styles based on image library
```

---

## Quiz Progression Strategy

### Adaptive Difficulty

```
Questions are not random - they follow a strategy:

1. Warm-up (Q1-3): Easy, obvious style contrasts
   └─ User gets comfortable with format
   └─ Clear preference emerges

2. Main Assessment (Q4-15): Medium difficulty
   └─ Distinguish between similar styles
   └─ Examples: Modern vs Contemporary, Minimalist vs Scandinavian

3. Refinement (Q16-25): Harder, nuanced choices
   └─ User's secondary influences
   └─ Room-specific preferences

4. Validation (Q26-30): Re-test earlier answers
   └─ Confirm consistency
   └─ Catch contradictions
```

### Weighted Scoring

```
Each answer contributes to style scores:

Basic scoring:
- User chooses Image A (Modern) → Modern +2, Contemporary +1
- User chooses Image B (Rustic) → Rustic +2, Farmhouse +1

Weighted questions (harder questions count more):
- Easy question weight: 1x
- Medium question weight: 1.5x
- Hard question weight: 2x

Room-specific weighting:
- Questions for user's room type: 2x multiplier
- General questions: 1x multiplier
```

---

## Data Structures

### Quiz Session

```typescript
interface StyleQuizSession {
  id: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;

  // Progress tracking
  currentQuestionIndex: number;
  totalQuestions: number;  // Will vary (20-30)

  // User's answers
  responses: StyleQuizResponse[];

  // Extracted metadata
  extractedMetadata?: Partial<ExtractedMetadata>;
}

interface StyleQuizResponse {
  questionId: string;
  chosenImageId: "imageA" | "imageB";
  responseTime: number;  // milliseconds (shows confidence)
  timestamp: Date;
}
```

### Results Structure

```typescript
interface StyleQuizResults {
  sessionId: string;

  // Primary style with score
  primaryStyle: {
    style: StyleCategory;
    score: number;  // 0-100
    confidence: number;  // 0-1
  };

  // Ranked styles
  styleRanking: Array<{
    style: StyleCategory;
    score: number;
    percentage: number;  // Of total score
    description: string;
  }>;

  // Detailed insights
  insights: {
    colorPreference: "warm" | "cool" | "neutral" | "mixed";
    colorBoldness: "neutral" | "bold" | "vibrant";
    formality: "casual" | "balanced" | "formal";
    patterns: "minimal" | "moderate" | "bold";
    ornamentation: "minimal" | "moderate" | "ornate";
    materials: {
      natural: number;  // Percentage preference
      synthetic: number;
      mixed: number;
    };
  };

  // Room-specific results (if applicable)
  roomSpecificInsights?: {
    [roomType: string]: {
      bestStyles: StyleCategory[];
      avoidStyles: StyleCategory[];
      recommendations: string[];
    };
  };

  // Generated profile
  profile: string;  // "You love clean lines and minimalist design with
                    //  warm earth tones. You prefer natural materials
                    //  and functional beauty over ornate details."

  // User feedback for refinement
  followUpQuestions?: string[];  // "Want to explore bold colors?"
}
```

---

## Quiz Flow Implementation

### Phase 1: Initialization (Component Mount)

```
1. Load quiz configuration
2. Get user's room type from context (if available)
3. Build question set:
   - 4 questions: Overall Style
   - 4 questions: Color Palettes
   - 4 questions: Materials & Textures
   - 4 questions: Furniture & Forms
   - 3 questions: Lighting & Atmosphere
   - 5-8 questions: Room-specific (if room type known)
   Total: 24-28 questions
4. Shuffle question order (with constraints)
5. Display Intro screen
```

### Phase 2: Question Loop

```
For each question:
1. Display question with 2 images
2. Show progress bar (Q 5/28)
3. Wait for user selection
4. Record response with timestamp
5. Show brief feedback or move to next
6. Update style score bar on side (optional)
```

### Phase 3: Results

```
1. Calculate final scores for all 19 styles
2. Rank styles by score
3. Generate insights and descriptions
4. Create style profile text
5. Display results with:
   - Primary style (highlighted)
   - Style ranking (chart/bar)
   - Color/Material/Formality breakdown
   - Room-specific recommendations
6. Option to:
   - See more details
   - Retake quiz
   - Continue to next step
```

---

## Image Library Requirements

### Total: 50-60 images needed

Distribution by style:
```
Modern: 5-6 images
Contemporary: 5-6 images
Traditional: 5-6 images
Transitional: 3-4 images
Minimalist: 5-6 images
Maximalist: 3-4 images
Rustic: 4-5 images
Farmhouse: 4-5 images
Scandinavian: 5-6 images
Industrial: 4-5 images
Bohemian: 4-5 images
Eclectic: 3-4 images
Mid-Century Modern: 4-5 images
Victorian: 3-4 images
Coastal: 4-5 images
Southwest: 3-4 images
Asian-Inspired: 4-5 images
Art Deco: 3-4 images
Glam: 3-4 images
Gothic: 2-3 images
```

### Image Selection Criteria

Each image should:
- Be representative of the style
- Show clear room design (not just furniture or decor)
- Have good image quality (high resolution)
- Be distinct enough to create good contrasts
- Include multiple room types (living rooms, bedrooms, kitchens, etc.)
- Represent different color palettes within each style

### Pairing Strategy

Pairs should be:
1. **Clear contrasts**: Modern vs Rustic (very different)
2. **Subtle contrasts**: Modern vs Contemporary (similar but distinct)
3. **Style blends**: Scandinavian + Minimalist (shows overlap)
4. **Room-specific**: "Modern Bedroom" vs "Rustic Bedroom"

---

## Scoring Algorithm

### Detailed Scoring Example

```
Question 1: Modern living room vs Rustic living room
User chooses: Modern

Modern gets:
- Base: +2 points
- Question weight: 1x (easy question)
- Room weight: 2x (living room, their room type)
- Final: 2 × 1 × 2 = +4 points

Contemporary gets (secondary style in Modern image):
- Base: +1 point
- Multipliers same as above
- Final: 1 × 1 × 2 = +2 points

Rustic gets (if shown in image as contrast):
- Base: -0.5 point (not chosen)
- Final: -0.5 × 1 × 2 = -1 point

Confidence tracking:
- Response time < 2 seconds: High confidence
- Response time 2-5 seconds: Medium confidence
- Response time > 5 seconds: Low confidence
```

### Final Scoring

```
Total possible points per style:
Sum of (weights × multipliers) for questions mentioning that style

Percentage score:
(Actual points / Maximum possible points) × 100

Confidence score:
(Average response confidence across all relevant questions)
```

---

## Next Steps (Tasks 1.4.2-1.4.5)

### Task 1.4.2: Image Library Curation
- Find/source 50-60 representative images
- Organize by style category
- Create image manifest (URL, style, description)

### Task 1.4.3: UI Component
- Build StyleQuizComponent with:
  - Intro screen
  - Question display (image pair + progress)
  - Results screen with visualizations
  - Responsive design

### Task 1.4.4: Scoring Logic
- Implement calculateStyleScores()
- Build style ranking algorithm
- Generate insights and profile text

### Task 1.4.5: Style Classification
- Define 19+ style categories
- Build style taxonomy with relationships
- Create style descriptions and characteristics

---

## TypeScript Types Overview

```typescript
// In src/types/consultation.ts

export interface StyleQuizQuestion {
  // (detailed above)
}

export interface StyleQuizSession {
  // (detailed above)
}

export interface StyleQuizResponse {
  // (detailed above)
}

export interface StyleQuizResults {
  // (detailed above)
}

export interface StylePreference {
  style: StyleCategory;
  score: number;
  confidence: number;
}
```

---

## Success Criteria

✅ Quiz can ask 20-28 questions with image pairs
✅ Each style clearly represented in image library
✅ Scoring calculates accurate style rankings
✅ Results provide actionable style insights
✅ Supports room-specific style refinement
✅ Fast, responsive UI with progress tracking
✅ Can be retaken to refine preferences

---

## Files to Create/Modify

1. **src/types/consultation.ts** - Add quiz types
2. **src/api/styleQuizBuilder.ts** - Quiz generation + scoring
3. **src/components/StyleQuizComponent.tsx** - Main UI
4. **docs/STYLE_IMAGE_LIBRARY.md** - Image manifest
5. **public/images/styles/** - Style reference images

---

**Status:** Design complete, ready for Task 1.4.2 (Image Library)
