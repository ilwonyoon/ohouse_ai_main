# 📘 AI Interior Design Assistant – Agent Skills Specification (v8)
**Author:** Ilwon Yoon  
**Version:** 8.0  
**Date:** 2025-11-06  
**Purpose:** Defines responsibilities, triggers, inputs, and outputs for each agent in the AI Home Design multi-agent system (aligned with v8 architecture).

---

## 0. SYSTEM CONCEPT & ORIGIN
This system reimagines the **human interior design workflow** — from initial consultation to final proposal — as a **multi-agent ecosystem**.

Each agent corresponds to a **real-world professional role** in the design industry (e.g., stylist, layout planner, lighting designer).

All agents communicate through a **shared user context**, ensuring seamless handoff, memory retention, and adaptive learning across design iterations.

| Human Specialist Role       | AI Agent Equivalent                    | Core Objective                              |
|-----------------------------|----------------------------------------|---------------------------------------------|
| Interior Designer (general) | Intent / Context / Scope Agents        | Understand user goals & constraints         |
| Space Expert (e.g., Kitchen, Bath) | Domain Specialists                   | Deep expertise per spatial domain           |
| Layout Planner              | Layout Agent                           | Optimize space and flow                     |
| Lighting Designer           | Lighting Agent                         | Balance ambience, brightness, and mood      |
| Stylist / Decorator         | Styling Agent                          | Curate visual tone & furnishing harmony     |
| Material & Finish Consultant | Material Agent                         | Choose textures, finishes, durability       |
| Color Consultant            | Color Harmony Agent                    | Achieve coherent palette across spaces      |
| Visualizer / Renderer       | Visualization Agent                    | Produce realistic 2D/3D proposals            |
| Procurement / PM            | Sourcing / Purchase / Execution Agents | Materialize design through action           |

---

## I. AGENT STRUCTURE FORMAT
Each agent entry follows this schema:
| Field | Description |
|-------|-------------|
| 🎯 **Role** | Core responsibility |
| 🧩 **Trigger** | What activates this agent |
| 🧠 **Inputs** | Data or signal needed |
| ✅ **Completion** | Success condition |
| 🔄 **Output** | Result written to shared context |

---

## II. PLANNING AGENTS

### 1. **ImageAnalyzer**
- **Role:** Analyze user-uploaded image for room type, layout, light, clutter
- **Trigger:** User uploads valid image
- **Inputs:** JPEG, HEIC, PNG photo
- **Completion:** Key spatial metrics extracted
- **Output:**
```json
{ "room_type": "kitchen", "width": 4.2, "height": 2.8, "light_level": "medium" }
```

### 2. **StyleQuizAgent**
- **Role:** Present visual "this or that" choices to learn aesthetic preferences
- **Trigger:** No image uploaded
- **Inputs:** Interactive style quiz (5–8 visual pairs)
- **Completion:** Minimum 5 answers submitted
- **Output:**
```json
{ "preferred_styles": ["Minimal", "Japandi"], "avoid_styles": ["Bohemian"] }
```

### 3. **VisionBuilderAgent**
- **Role:** Generate moodboard-style visual summary from quiz or uploaded references
- **Trigger:** After StyleQuizAgent or optional references
- **Inputs:** Style quiz output + optional user images
- **Completion:** Visual vision summary generated
- **Output:**
```json
{ "vision_board_url": "https://...", "color_palette": ["#E5E5E5"], "furniture_cues": ["low-profile sofa"] }
```

### 4. **IntentClassifier (v2)**
- **Role:** Classify user goal (e.g., partial_reno) and clarity (clear/fuzzy)
- **Trigger:** After ImageAnalyzer or VisionBuilderAgent
- **Inputs:** Text input + image metadata OR vision summary
- **Completion:** Goal & clarity labeled
- **Output:**
```json
{ "intent_label": "room_refresh", "vision_clarity": "fuzzy", "space_type": "bedroom" }
```

### 5. **ContextAgent**
- **Role:** Gather non-visual info: budget, timeline, lifestyle, constraints
- **Trigger:** After intent classification
- **Inputs:** Form, chat-based survey
- **Completion:** All key fields populated
- **Output:** Structured context object

### 6. **ScopeResolver**
- **Role:** Assign space(s) to domain agents (single/multi-room)
- **Trigger:** After context + image or vision board
- **Inputs:** Shared context
- **Completion:** Domain agents assigned
- **Output:**
```json
{ "scope_level": "multi-space", "domains": ["living_room", "bathroom"] }
```

---

## III. FUNCTIONAL AGENTS

### LayoutAgent
- **Role:** Optimize furniture layout & circulation
- **Trigger:** After ImageAnalyzer
- **Inputs:** Room size + constraints
- **Completion:** ≥2 layouts generated
- **Output:** Layout JSON / plan

### LightingAgent
- **Role:** Design ambient, task, and accent lighting
- **Trigger:** After LayoutAgent
- **Inputs:** Layout plan + context
- **Completion:** Lighting scheme complete
- **Output:** Lighting map

### StylingAgent
- **Role:** Define visual mood, furniture, decor elements
- **Trigger:** After LightingAgent
- **Inputs:** Vision board, style profile
- **Completion:** Styling directions finalized
- **Output:** Style JSON

### MaterialAgent
- **Role:** Select cost-effective finishes by durability/aesthetic
- **Trigger:** After StylingAgent
- **Inputs:** Context + visual direction
- **Completion:** 3–4 combos ready
- **Output:** Material plan

### ColorHarmonyAgent
- **Role:** Harmonize all color decisions
- **Trigger:** After MaterialAgent
- **Inputs:** Palette, furnishings, room type
- **Completion:** Balanced scheme ready
- **Output:** Color JSON

---

## IV. DOMAIN AGENTS (SAMPLE ENTRIES)

| Agent | Space | Role |
|-------|-------|------|
| LivingRoomAgent | Living Room | Comfort, openness, media placement |
| KitchenAgent | Kitchen | Ergonomics, appliances, workflow zones |
| BedroomAgent | Bedroom | Sleep quality, storage, lighting control |
| BathroomAgent | Bathroom | Water safety, spa-feel, compact use |
| BackyardAgent | Outdoor | Zoning (grill, seating), shade, foliage |

---

## V. VISUALIZATION & EXECUTION AGENTS

### VisualizationAgent
- **Role:** Generate 2D and 3D renders
- **Trigger:** Domain agent proposal finalized
- **Completion:** 1–4 visuals generated
- **Output:** Image URLs + embed metadata

### ProposalPresentationAgent
- **Role:** Compile visuals into carousel deck
- **Trigger:** After VisualizationAgent
- **Completion:** Payload formatted
- **Output:** Proposals (carousel: image + description + price)

### FeedbackParserAgent
- **Role:** Parse likes, dislikes, comments
- **Trigger:** After proposal presentation
- **Completion:** Preference vector extracted
- **Output:**
```json
{ "likes": ["layout1"], "dislikes": ["style2"], "notes": "Prefer more natural light." }
```

### ExecutionAgent
- **Role:** Re-trigger relevant agents if dissatisfaction > threshold
- **Trigger:** FeedbackParserAgent output
- **Completion:** Revised design (v2+) delivered

---

## VI. SOURCING & POST-PURCHASE AGENTS

### SourcingAgent
- **Role:** Match real products to generated designs
- **Output:** SKU list with links, stock, dimensions

### PurchaseAgent
- **Role:** Build cart, create bill of materials
- **Output:** Final BOM with total price + vendor links

### AftercareAgent
- **Role:** Provide maintenance, warranty, tips
- **Output:** Personalized PDF manual or chatbot tips

---

## VII. AGENT SYSTEM COMPLETION PATH
| Phase | Success Criteria |
|-------|------------------|
| Planning | Image or visual reference processed, intent & clarity labeled |
| Functional | All selected design modules executed |
| Domain | Room-based proposals synthesized |
| Visualization | 2D/3D visuals complete |
| Feedback | Acceptance or vector-based revision loop |
| Execution | Purchase or resubmission finalized |