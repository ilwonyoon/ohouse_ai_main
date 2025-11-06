# 🧪 AI Consultant Testing Checklist

## Browser Testing Guide

Since server-side testing cannot validate React client-side rendering, follow these steps to manually test the application:

### Step 1: Clear Browser Data
1. Open http://localhost:3000/ai-consultation
2. Press F12 to open DevTools
3. Go to **Application** tab → **Local Storage**
4. Delete `consultation_context` key if it exists
5. Refresh the page

### Step 2: Check Greeting Message
**Expected Result:** Within 1-2 seconds of page load, the greeting message should appear:

```
Hi! 👋 I'm your AI interior design consultant.

Here's what we'll do together:
1. Learn about your space - Room size, layout, natural light, current furniture
2. Understand your goals - What look do you want? What problems are you solving?
3. Explore your lifestyle - How do you live in this space? Entertaining? Kids? WFH?
4. Collect inspiration - Colors, styles, materials you love
5. Build your brief - A detailed design roadmap for professional designers

Let's start! Tell me about the space you'd like to transform. 🏠
```

**How to verify:**
- Message appears in the chat area (left side of screen on desktop)
- Message has light gray background (assistant message styling)
- Message appears above the input field

### Step 3: Monitor Console Logs
1. Open DevTools Console (F12 → Console tab)
2. You should see these logs in order:
   ```
   ⏳ Context still loading from localStorage...
   🟢 Initializing consultation...
   🟡 Creating new consultation and adding greeting...
   🟢 Context created, now adding greeting message...
   ```

### Step 4: Test Input Field
1. Type a message: "I want to redesign my living room"
2. Click "Send" button
3. **Expected:**
   - ✅ Your message appears in chat with darker background
   - ✅ Loading indicator (bouncing dots) appears
   - ✅ AI response streams in real-time
   - ✅ Messages display in logical 150-300 character chunks (staggered display)

### Step 5: Test Metadata Panel (Desktop Only)
1. Look at right side of screen (only visible on screens > 1024px wide)
2. **Expected:**
   - ✅ "Project Metadata" header
   - ✅ "Overall Completion" progress bar
   - ✅ Room information section (📍)
   - ✅ Goals & Vision section (🎯)
   - ✅ Budget & Timeline section (💰)
   - As you chat, these sections should populate with data

### Step 6: Test Token Counter
1. Send a message to the AI
2. Look at the bottom of the chat
3. **Expected:** Display like "📊 Tokens: 1,234 | Cost: $0.05" appears

### Step 7: Test localStorage Persistence
1. Open http://localhost:3000/ai-consultation
2. Send a message and get a response
3. Refresh the page (Ctrl+R or Cmd+R)
4. **Expected:**
   - ✅ Console shows "🔵 Context exists with messages, resuming..."
   - ✅ Previous messages are still visible
   - ✅ NO new greeting message (because consultation already started)

### Step 8: Test Fresh Consultation
1. Open DevTools → Application → Local Storage
2. Delete `consultation_context`
3. Refresh page
4. **Expected:** Greeting message appears again

---

## Troubleshooting

### Issue: Greeting message not appearing
**Checklist:**
- [ ] Did you wait 2-3 seconds after page load?
- [ ] Did you clear localStorage before testing?
- [ ] Are you looking at the chat area (not the metadata panel)?
- [ ] Open DevTools → Console and check for errors (red messages)
- [ ] Check if console shows the initialization logs

### Issue: No styling visible
**Checklist:**
- [ ] Are Emotion CSS classes in the DOM? (DevTools → Elements, search for `css-`)
- [ ] Is the page responsive? Try resizing the browser window
- [ ] Are colors showing? (Background should be light, buttons gray)

### Issue: Chat doesn't respond to messages
**Checklist:**
- [ ] Is the API key valid? (Check .env.local file)
- [ ] Did you get a loading indicator after clicking Send?
- [ ] Check DevTools → Network tab for API calls to `/api/consultation/stream`
- [ ] Check browser console for errors

---

## Expected Feature Behavior

### ✅ Greeting Message (PRIORITY)
- [ ] Appears on fresh load
- [ ] Contains welcome text and 5-step process
- [ ] Disappears from localStorage persistence test
- [ ] Styled as assistant message (gray background)

### ✅ Styling
- [ ] Colors visible (layout has background gradient)
- [ ] Input field has rounded corners
- [ ] Send button is gray
- [ ] Messages have padding and rounded corners
- [ ] Metadata panel appears on desktop (right side)

### ✅ Chat Functionality
- [ ] Input field accepts text
- [ ] Send button works
- [ ] User messages appear (darker background)
- [ ] AI responses stream (start quickly, build character by character)
- [ ] Loading indicator (bouncing dots) shows during streaming

### ✅ Message Splitting (After AI Response)
- [ ] Long responses split into multiple message bubbles
- [ ] Each bubble appears with a delay (reader-friendly timing)
- [ ] Short responses (<150 chars) appear as single bubble

### ✅ Metadata Panel (Desktop)
- [ ] Shows "Project Metadata" header
- [ ] Progress bar updates as you provide info
- [ ] Displays collected room, goals, and budget info
- [ ] Hidden on mobile (<1024px width)

### ✅ Token Counter
- [ ] Appears after first AI response
- [ ] Shows token count and estimated cost
- [ ] Updates with each response
- [ ] Format: "📊 Tokens: XXXX | Cost: $X.XX"

---

## Performance Targets

- **Page Load:** < 2 seconds
- **Greeting Message:** < 2 seconds after page load
- **AI Response Start:** < 2 seconds after sending message
- **Styling:** All CSS classes injected by page load

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## Test Results

| Feature | Status | Date Tested | Notes |
|---------|--------|-------------|-------|
| Greeting Message | ⏳ Pending | - | Needs manual browser test |
| Input/Send | ⏳ Pending | - | Needs manual browser test |
| Streaming | ✅ Verified | 11/6 | API endpoint working via curl |
| Styling | ✅ Verified | 11/6 | Emotion CSS classes in DOM |
| Metadata Panel | ⏳ Pending | - | Needs manual browser test |
| localStorage Persistence | ⏳ Pending | - | Needs manual browser test |

---

**Last Updated:** 2025-11-06
**Testing Status:** ⏳ Awaiting manual browser verification
