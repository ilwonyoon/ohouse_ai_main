# Initial Consultation Skill - Overview

## Purpose

This skill teaches an AI assistant how to conduct adaptive, scope-aware initial consultations for interior design projects. It handles users ranging from casual explorers to committed renovation clients, gathering "just enough" information for downstream agents (Style Profiler, Visualization, Product Discovery) to create value.

## Core Philosophy

**"Just Enough Information"** - Get the minimum viable details needed for the next step, while:
- Respecting user time and emotional comfort
- Adapting to project scope (small refresh vs. full renovation)
- Handling incomplete information gracefully
- Converting exploratory users gently

## User Types Handled

1. **Exploratory Users** - "Just curious, trying the app" → Fun, visual, low-pressure experience
2. **Small Refresh** - "Freshen up my living room" → 5-8 quick questions
3. **Single Room Makeover** - "Redo my bedroom" → Standard consultation
4. **Multi-Room Renovation** - "Renovating whole apartment" → Comprehensive consultation
5. **Full Home Renovation** - "Starting from scratch" → Maximum detail

## Skill Structure

### Phase 0: Intent Detection & Scope Qualification ⭐ CRITICAL
- Opens with low-pressure question
- Classifies user intent in first 1-2 exchanges
- Routes to appropriate consultation mode

### Phase 1-A: EXPLORATORY MODE (Tire-Kickers)
- Make it fun and visual
- Show quick transformations
- No interrogation
- Watch for conversion signals
- Gentle transition to real consultation when ready

### Phase 1-B: SCOPE CLARIFICATION (Vague Interest)
- Probe gently to understand project size
- Route to Light or Standard consultation

### Phase 1-C: LIGHT CONSULTATION (Small Projects)
- **5-8 questions only**
- Room, pain point, desired feeling, budget, keepables, timeline, must-haves
- Fast and conversational
- Outputs minimal brief

### Phase 1-D: STANDARD CONSULTATION (Medium/Large Projects)
- Comprehensive discovery
- Project context and goals
- Full functional requirements
- Detailed budget discussion
- Complete scope and timeline
- Outputs full brief

### Phases 2-7: Detailed Consultation Components
(Used for Phase 1-D Standard Consultation)
- Rapport building
- Project context discovery
- Functional requirements
- Budget discovery (with sensitivity)
- Scope and timeline definition
- Additional discovery questions (optional)

### Phase 8: Synthesis & Confirmation
Four different brief templates:
- **Template A:** Minimal Brief (small refresh)
- **Template B:** Standard Brief (medium/large projects)
- **Template C:** Exploratory Engagement Log (tire-kickers who haven't converted)
- **Template D:** Partial Information Brief (reluctant users with gaps)

## Key Features

### ✅ Adaptive Questioning
- Adjusts depth based on project scope
- Reads user energy and engagement
- Skips or simplifies questions when appropriate

### ✅ Reluctance Handling
- Normalizes "I don't know" responses
- Moves on gracefully when user deflects
- Works with incomplete information
- No pressure tactics

### ✅ Conversion Strategy
- Detects conversion signals from exploratory users
- Transitions smoothly from exploration to consultation
- Never forces commitment

### ✅ Output Flexibility
- Multiple brief formats for different scenarios
- Clearly flags missing information for design team
- Provides recommendations even with gaps

## What Information Gets Gathered

### Minimal (Small Projects):
- Room type
- Main pain point
- Desired feeling
- Budget range (if shared)
- Items to keep
- Must-haves

### Standard (Medium/Large Projects):
- All above, PLUS:
- Project catalyst and goals
- Who uses the space
- Lifestyle factors (kids, pets, WFH)
- Activities in space
- Physical constraints
- Timeline drivers
- Emotional stakes

### For Downstream Agents

**Style Profiler needs:**
- Room type
- Desired feeling
- Items to keep
- Any style hints from conversation

**Visualization needs:**
- Room type
- Approximate size/layout
- Desired feeling
- Must-have features

**Product Discovery needs:**
- Room type
- Budget range
- Items to keep
- Must-haves
- Lifestyle constraints (pets, kids, durability needs)

## Success Metrics

### For Exploratory Users:
- Engagement created (viewed examples, tried tool)
- Positive experience (fun, no pressure)
- Conversion achieved (if applicable)
- Return intent (saved for later)

### For Real Projects:
- Information completeness (enough for next steps)
- User comfort (didn't feel interrogated)
- Time efficiency (appropriate to scope)
- Handoff quality (design team has what they need)

## Common Scenarios Handled

1. **The Tire-Kicker** - Converts exploration into engagement
2. **The Budget-Hesitant** - Works around budget sensitivity
3. **The Overwhelmed** - Simplifies and reassures
4. **The Rushed** - Speeds up to essentials
5. **The Vague** - Clarifies scope without frustration
6. **The Partner Disagreement** - Navigates differing priorities
7. **The Unrealistic Expectations** - Educates kindly
8. **The Time-Pressured** - Adjusts strategy for deadlines

## Critical Success Principles

### DO:
✅ Listen more than talk
✅ Adapt to user energy and engagement level
✅ Normalize uncertainty
✅ Make it feel easy and fun (especially for small projects)
✅ Work with what you have
✅ Celebrate what they DO share
✅ Keep momentum toward next step

### DON'T:
❌ Over-interrogate for small projects
❌ Push reluctant users
❌ Make them feel bad for not knowing
❌ Assume everyone wants comprehensive consultation
❌ Let perfect be the enemy of good (useful output with gaps is better than nothing)

## Integration Points

**Upstream:** User enters app → Intent detection
**Downstream:** 
- Style Profiler agent (receives brief, conducts visual style discovery)
- Visualization agent (creates mockups based on brief + style profile)
- Product Discovery agent (sources items based on brief + style profile)

## File Location

`/mnt/user-data/outputs/initial-consultation-skill/SKILL.md`

Complete skill with examples, templates, and detailed guidance for every scenario.
