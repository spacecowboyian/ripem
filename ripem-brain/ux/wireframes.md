# RipEm Wireframe Flows

**Status**: v1.0 — April 2026
**Author**: UX Researcher (RipEm)
**Purpose**: Structured screen-by-screen wireframe flows for all three MVP phases. These flows are the primary input for Product Manager user stories and iOS engineering specs.

**Format**: Each screen is described with layout, components, copy, and interaction notes. Flows use ASCII-style flow diagrams to show navigation paths.

---

## Phase 1: 12-Screen Onboarding Questionnaire

**Goal**: User completes questionnaire, meets their AI buddy, feels "This app gets me."
**Target**: <10 minutes, 70%+ completion rate.
**Design Philosophy**: A conversation, not a form. One question per screen. AI feels present throughout.

### Flow Diagram

```
[Screen 1: Welcome]
        │
        ▼
[Screen 2: Car Basics]
        │
        ▼
[Screen 3: Story]
        │
        ▼
[Screen 4: Vision]
        │
        ▼
[Screen 5: Skill Level]
        │
        ▼
[Screen 6: Budget + Timeline]
        │
        ▼
[Screen 7: Work Completed]
        │
        ▼
[Screen 8: Car Name] ──── skip ────▶
        │                           │
        ▼                           │
[Screen 9: Excitement Focus]  ◀─────┘
        │
        ▼
[Screen 10: First Question for AI] ──── skip ────▶
        │                                          │
        ▼                                          │
[Screen 11: Privacy Toggle]  ◀────────────────────┘
        │
        ▼
[Screen 12: Summary + AI First Response]
        │
        ▼
[Home / Garage View]
```

---

### Screen 1: Welcome

```
┌─────────────────────────────────────┐
│                                     │
│         [RipEm wordmark logo]       │
│                                     │
│   "Your AI garage buddy is ready."  │
│                                     │
│   Let's set up your garage. Takes   │
│   less than 10 minutes.             │
│                                     │
│                                     │
│   ┌─────────────────────────────┐   │
│   │      Let's Get Started      │   │
│   └─────────────────────────────┘   │
│                                     │
│   Already have an account? Sign in  │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Logo, hero copy, primary CTA button, sign-in link
**Interaction**: Tap CTA → Screen 2
**Notes**:
- No login gate here — account creation happens after Screen 12 (or via Apple/Google OAuth on Screen 12)
- Background should feel garage-adjacent: dark, textured, automotive

---

### Screen 2: Car Basics

```
┌─────────────────────────────────────┐
│  ←                         1 of 12  │
│                                     │
│   "What car are you building?"      │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  Year         ▼             │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  Make         ▼             │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  Model        ▼             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Progress indicator (1 of 12), back arrow, three cascading dropdowns (Year → Make → Model), Next CTA
**Interaction**: Year selection populates Make list; Make selection populates Model list; Next → Screen 3
**Notes**:
- This is the foundation screen — all subsequent AI behavior is anchored here
- If car not found, offer "Enter manually" fallback
- Progress bar shown as step count, not percentage (less intimidating)

---

### Screen 3: Story

```
┌─────────────────────────────────────┐
│  ←                         2 of 12  │
│                                     │
│   "Where did you get this car?      │
│    What's the story?"               │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │  Type anything — even       │   │
│   │  "bought it off Craigslist" │   │
│   │  works.                     │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
│                                     │
│         Skip for now →              │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Progress indicator, free-text area, Next CTA, Skip option
**Interaction**: Free text input; Next or Skip → Screen 4
**Notes**:
- This is the "Dale Moment" seed — the story becomes the emotional hook in Screen 12's AI response
- Placeholder copy lowers the bar deliberately ("even 'bought it off Craigslist' works")
- Skip is available but soft-discouraged (small, below the CTA)
- Persona note: Marcus (Documenter) may skip; Devon (Learner) may skip; Jordan (Sharer) will likely fill it in

---

### Screen 4: Vision

```
┌─────────────────────────────────────┐
│  ←                         3 of 12  │
│                                     │
│   "What's your vision for           │
│    this car?"                       │
│                                     │
│   ┌──────────────┐ ┌─────────────┐  │
│   │  🏁 Track Car│ │ 🔧 Restorat.│  │
│   └──────────────┘ └─────────────┘  │
│   ┌──────────────┐ ┌─────────────┐  │
│   │  🚗 Daily    │ │ 📸 Content  │  │
│   │   Driver     │ │   Creator   │  │
│   └──────────────┘ └─────────────┘  │
│   ┌──────────────┐ ┌─────────────┐  │
│   │  🎨 Show Car │ │ ✨ Just Vibes│ │
│   └──────────────┘ └─────────────┘  │
│                                     │
│   Select all that apply             │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components**: Multi-select button grid (6 options), Next CTA
**Interaction**: Tap to toggle selection (highlighted when selected); Next → Screen 5
**Options**: Track Car, Restoration, Daily Driver, Content Creator, Show Car, Just Vibes
**Notes**:
- Multi-select (not single) — many builds serve multiple purposes
- Vision selection calibrates AI recommendation type throughout the app
- "Just Vibes" is an intentional inclusion — lowers barrier for casual users

---

### Screen 5: Skill Level

```
┌─────────────────────────────────────┐
│  ←                         4 of 12  │
│                                     │
│   "How much mechanical              │
│    experience do you have?"         │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  🔰 Novice                  │   │
│   │  Just starting out          │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────────┐│
│   │  🔧 Weekend Warrior          ←  ││ (selected)
│   │  Maintenance + minor mods    ←  ││
│   └─────────────────────────────────┘│
│   ┌─────────────────────────────┐   │
│   │  ⚙️  Enthusiast Builder      │   │
│   │  Mods, tuning, builds       │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │  🏆 Professional            │   │
│   │  Full builds, fabrication   │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components**: Single-select list (radio-style), Next CTA
**Interaction**: Tap to select one; Next → Screen 6
**Notes**:
- AI uses this to calibrate response complexity and tone
- Novice → simpler explanations, more warnings
- Professional → technical depth, fewer disclaimers
- Shown in list format (not grid) so descriptions fit

---

### Screen 6: Budget + Timeline

```
┌─────────────────────────────────────┐
│  ←                         5 of 12  │
│                                     │
│   "What's your budget and           │
│    timeline for this build?"        │
│                                     │
│   Budget                            │
│   ┌─────────────────────────────┐   │
│   │  $  [ 5,000          ]      │   │
│   └─────────────────────────────┘   │
│                                     │
│   Timeline                          │
│   ────────────────────────●─────    │
│   6 mo   1 yr   2 yr  [3 yr]  5+   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │      Not sure yet           │   │  ← secondary option
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components**: Dollar text input, timeline slider, "Not sure yet" fallback button, Next CTA
**Interaction**: Type budget or leave blank; drag slider for timeline; Next or "Not sure yet" → Screen 7
**Notes**:
- "Not sure yet" bypasses both fields — Devon (Learner) persona will use this often
- Budget + timeline inform AI recommendations (realistic advice, not aspirational)
- Slider labels are human-readable durations, not raw months

---

### Screen 7: Work Completed

```
┌─────────────────────────────────────┐
│  ←                         6 of 12  │
│                                     │
│   "What work have you already       │
│    done on this car?"               │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │  e.g. "Oil change, new      │   │
│   │  spark plugs, strut bars"   │   │
│   │                             │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │   Just got it — nothing yet │   │  ← prominent option
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components**: Free-text area, "Just got it" button (prominent), Next CTA
**Interaction**: Free text or "Just got it" → Screen 8
**Notes**:
- "Just got it — nothing yet" is styled as a clear button (not a tiny link) — crucial for Devon (Learner) persona
- Text entered here seeds the AI garage brain as the first log entries
- AI will reference this during Screen 12 response

---

### Screen 8: Car Name

```
┌─────────────────────────────────────┐
│  ←                         7 of 12  │
│                                     │
│   "Does your car have a name?"      │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  e.g. Dale, Black Betty...  │   │
│   └─────────────────────────────┘   │
│                                     │
│   "Named cars get into trouble."    │
│              — RipEm                │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
│                                     │
│         Skip — it's nameless        │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Single text field, playful sub-copy, Next CTA, Skip link
**Interaction**: Enter name or skip → Screen 9
**Notes**:
- This is the emotional peak of onboarding — the car name creates a named identity in the AI
- Tone is warm and playful, not corporate
- The AI will use the car name throughout the app ("What's Dale been up to?")
- Skip is available — Marcus (Documenter) may skip; Jordan (Sharer) will likely name it

---

### Screen 9: Excitement Focus

```
┌─────────────────────────────────────┐
│  ←                         8 of 12  │
│                                     │
│   "What are you most excited        │
│    about with this build?"          │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │  Tell me what's got you     │   │
│   │  fired up about this car.   │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
│                                     │
│         Skip for now →              │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Free-text area, Next CTA, Skip
**Interaction**: Text input or skip → Screen 10
**Notes**:
- Sets AI's conversational focus area — AI will prioritize these topics in future responses
- Also used to personalize Screen 12's first response
- Copy should feel like a conversation between enthusiasts, not a form field label

---

### Screen 10: First Question for AI

```
┌─────────────────────────────────────┐
│  ←                         9 of 12  │
│                                     │
│   "Anything you want to ask your    │
│    AI right now?"                   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │  Ask anything — specs,      │   │
│   │  mods, where to start...    │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
│                                     │
│         Skip — surprise me          │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Free-text area, Next CTA, Skip
**Interaction**: Text input or skip → Screen 11
**Notes**:
- Optional but high-value — Devon (Learner) will almost always fill this in
- "Skip — surprise me" copy is intentional: if skipped, AI generates an opening question based on prior inputs
- Sets user expectation: the AI is ready and waiting

---

### Screen 11: Privacy Toggle

```
┌─────────────────────────────────────┐
│  ←                        10 of 12  │
│                                     │
│   "How do you want to share         │
│    your project?"                   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  🌍 Public                  │   │
│   │  Appear in Discovery feed   │   │
│   │  Watermarked posts drive    │   │
│   │  followers to your build    │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  🔒 Private                 │   │
│   │  Just for me — no feed,     │   │
│   │  no watermark               │   │
│   └─────────────────────────────┘   │
│                                     │
│   [Public selected by default]      │
│                                     │
│   ┌─────────────────────────────┐   │
│   │           Next →            │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components**: Two large toggle cards (Public / Private), Next CTA
**Interaction**: Tap to select one (Public default) → Screen 12
**Notes**:
- Public is default — optimizes for the viral watermark growth loop
- Copy explicitly explains the value of Public ("watermarked posts drive followers to your build")
- Private is not hidden or stigmatized — Marcus (Documenter) may prefer it
- This choice can be changed later from profile settings

---

### Screen 12: Summary + First AI Response

```
┌─────────────────────────────────────┐
│  ←                        11 of 12  │
│                                     │
│   [Animated loading state]          │
│   "Setting up your garage..."       │
│                                     │
│        ── transitions to ──         │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  🤖 Your AI Garage Buddy    │   │
│   │                             │   │
│   │  [Personalized first        │   │
│   │   response — references     │   │
│   │   car name, story, vision,  │   │
│   │   and answered question]    │   │
│   │                             │   │
│   │  ── ── ── ── ── ── ── ──   │   │
│   │                             │   │
│   │  [Follow-up question        │   │
│   │   from AI to continue       │   │
│   │   the conversation]         │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │     Enter My Garage →       │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Loading animation, AI chat bubble with first response, CTA to enter garage
**Interaction**: Loading (2–4s) → AI response appears with typewriter effect → CTA → Home/Garage
**Notes**:
- This is "The Dale Moment" — the highest-stakes screen in the entire onboarding
- AI response MUST reference: car name (if given), story (if given), vision selection, skill level, first question (if given)
- Response should end with a follow-up question to signal the AI wants to keep talking
- If user skipped story/name, AI leads with car model specifics and community data
- Account creation (Apple/Google OAuth) happens here if not already done

---

## Phase 2: Voice Logging + AI Response Flow

**Goal**: Core loop functional — user logs voice entries, AI responds with context.
**Primary Persona**: Marcus (Documenter), but used by all three personas.

### Flow Diagram

```
[Home / Garage View]
        │
        ▼
[Tap "Log Session" FAB]
        │
        ▼
[Record Screen]
   │         │
   ▼         ▼
[Stop]    [Cancel]
   │
   ▼
[Review Transcription]
   │           │
   ▼           ▼
[Confirm]   [Edit]
   │           │
   └─────┬─────┘
         ▼
[Processing → AI Response]
         │
         ▼
[Log Entry Saved + AI Reply]
         │
         ▼
[Back to Garage]
```

---

### Screen: Home / Garage View

```
┌─────────────────────────────────────┐
│  RipEm          [search]  [profile] │
│                                     │
│  [Car name + photo header]          │
│  "Dale" — 1972 Toyota Celica        │
│                                     │
│  ┌── Recent Logs ──────────────┐    │
│  │ Mar 22 — Rear brake pads    │    │
│  │ Mar 10 — Oil change         │    │
│  │ Feb 28 — Spark plugs        │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌── AI ──────────────────────┐     │
│  │  "What did you work on     │     │
│  │   this weekend?"           │     │
│  └─────────────────────────────┘    │
│                                     │
│  [Discovery] [Garage] [AI] [Profile]│
│                          ●          │
│                                     │
│              ╔═══╗                  │
│              ║ + ║  ← FAB           │
│              ╚═══╝                  │
└─────────────────────────────────────┘
```

**Components**: Car header, recent logs list, AI greeting card, bottom nav, floating action button (FAB)
**Interaction**: Tap FAB → Record Screen
**Notes**:
- FAB is the primary entry to voice logging — must be large, accessible with one thumb
- AI greeting card is personalized and contextual ("You haven't logged in 5 days — what's up?")
- Bottom nav: Discovery | Garage (home) | AI Chat | Profile

---

### Screen: Record

```
┌─────────────────────────────────────┐
│  ✕  Cancel                          │
│                                     │
│                                     │
│         [Animated mic waveform]     │
│                                     │
│         "Listening..."              │
│                                     │
│   "Just tell me what you did —      │
│    I'll handle the details."        │
│                                     │
│                                     │
│                                     │
│         ●                           │
│      [Stop]                         │
│                                     │
│   ──── or type instead ────         │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Cancel (X), mic waveform animation, instructional copy, Stop button, "type instead" fallback
**Interaction**: Tap Stop → Review Transcription; Tap Cancel → Back to Garage
**Notes**:
- Recording starts immediately on screen open (no extra tap needed)
- Waveform animation gives visual confirmation that mic is active
- "Type instead" is available for quiet environments or dirty hands preference
- Screen stays active if phone locks during recording (background audio permission)

---

### Screen: Review Transcription

```
┌─────────────────────────────────────┐
│  ←  Back                            │
│                                     │
│   "Here's what I heard:"            │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  "Just swapped the rear     │   │
│   │  brake pads — used EBC      │   │
│   │  Greenstuff, took about an  │   │
│   │  hour, cost $45 from        │   │
│   │  RockAuto."                 │   │
│   │                    [Edit]   │   │
│   └─────────────────────────────┘   │
│                                     │
│   "I extracted:"                    │
│   ┌─────────────────────────────┐   │
│   │  Part:  EBC Greenstuff pads │   │
│   │  Time:  1 hour              │   │
│   │  Cost:  $45                 │   │
│   │  Where: RockAuto            │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │       Looks Good →          │   │
│   └─────────────────────────────┘   │
│                                     │
│      Re-record    |    Edit fields  │
└─────────────────────────────────────┘
```

**Components**: Transcription text (editable), extracted data card, primary confirm CTA, secondary re-record / edit-fields options
**Interaction**: Confirm → Processing; Edit → editable fields; Re-record → Record screen
**Notes**:
- Extracted data card shows what the AI parsed — gives user confidence in accuracy
- "Looks Good" is the primary CTA — fast path for Marcus (Documenter)
- Edit fields allows manual correction without re-recording
- Unknown fields are omitted from the card (not shown as empty)

---

### Screen: Processing + AI Response

```
┌─────────────────────────────────────┐
│                                     │
│   ✓  Log saved                      │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  🤖                         │   │
│   │  "EBC Greenstuff — solid    │   │
│   │  choice for street use.     │   │
│   │  Based on your EJ205, you   │   │
│   │  should be good for 30–40k  │   │
│   │  miles on those pads.       │   │
│   │                             │   │
│   │  Want me to set a mileage   │   │
│   │  reminder for brake         │   │
│   │  inspection?"               │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌──────────────┐ ┌─────────────┐  │
│   │  Yes, remind │ │  No thanks  │  │
│   └──────────────┘ └─────────────┘  │
│                                     │
│   ┌─────────────────────────────┐   │
│   │       Back to Garage        │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Success confirmation, AI response bubble, action buttons (reminder yes/no), return CTA
**Interaction**: Yes → reminder created; No → dismissed; Back to Garage → Home
**Notes**:
- AI response is car-specific and log-specific (not generic)
- Response appears with a short loading state then typewriter effect
- Action buttons turn the AI response into a useful next action
- Success confirmation ("Log saved") is small and non-intrusive — the AI response is the hero

---

## Phase 3: Build Publishing + Discovery Feed

**Goal**: Growth loop active — watermark drives new user acquisition.
**Primary Persona**: Jordan (Sharer), with Devon (Learner) in Discovery.

### Flow Diagram

```
[Garage View]
      │
      ├──── [AI Prompt: "Ready to publish?"]
      │                │
      │                ▼
      └──────── [Publish Build Update]
                       │
                       ▼
               [Select Logs to Include]
                       │
                       ▼
               [AI Caption Preview]
                  │         │
                  ▼         ▼
              [Edit]     [Approve]
                  │         │
                  └────┬────┘
                       ▼
               [Platform Select]
                  │         │
                  ▼         ▼
           [Instagram]  [RipEm Feed]
                  │         │
                  └────┬────┘
                       ▼
               [Watermark Preview + Confirm]
                       │
                       ▼
               [Published Confirmation]
                       │
                       ▼
               [Back to Garage or Discovery]


[Discovery Feed] ─── (separate entry point from bottom nav)
      │
      ▼
[Feed: Swipeable Build Cards]
      │
      ▼
[Build Detail View]
      │
      ├── Subscribe to Builder
      ├── Like Post
      └── Share / Open in App
```

---

### Screen: Publish Trigger (AI Prompt)

```
┌─────────────────────────────────────┐
│  RipEm          [search]  [profile] │
│                                     │
│  [Car header]                       │
│  "Dale" — 1972 Toyota Celica        │
│                                     │
│  ┌── AI ──────────────────────┐     │
│  │  "You've logged 8 sessions │     │
│  │  since your last update.   │     │
│  │  Ready to publish a build  │     │
│  │  update?"                  │     │
│  │                            │     │
│  │  ┌──────────┐ ┌─────────┐  │     │
│  │  │ Publish! │ │Not yet  │  │     │
│  │  └──────────┘ └─────────┘  │     │
│  └────────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

**Components**: AI prompt card with session count, two action buttons inline
**Interaction**: "Publish!" → Select Logs screen; "Not yet" → dismisses card
**Notes**:
- AI proactively surfaces the publish prompt after a configurable number of sessions (default: 5+)
- Copy references actual session count for credibility
- "Not yet" is non-punitive — the prompt will reappear after more sessions

---

### Screen: Select Logs to Include

```
┌─────────────────────────────────────┐
│  ←  Cancel                          │
│                                     │
│   "Which sessions should I          │
│    include in this update?"         │
│                                     │
│   ☑  Mar 22 — Rear brake pads       │
│   ☑  Mar 10 — Oil change            │
│   ☑  Feb 28 — Spark plugs           │
│   ☐  Feb 14 — Coolant flush         │
│   ☐  Feb 01 — Battery replacement   │
│                                     │
│   [Select all]        [Clear all]   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │    Generate Caption →       │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Checklist of recent logs, select/clear all, Generate CTA
**Interaction**: Toggle sessions; Generate → AI Caption Preview
**Notes**:
- Recent sessions pre-selected by default (most likely to be "this build update")
- User can deselect older sessions or select further back
- At least one session must be selected to proceed

---

### Screen: AI Caption Preview

```
┌─────────────────────────────────────┐
│  ←  Back                            │
│                                     │
│   "Here's your build update:"       │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  Finally got the coils in.  │   │
│   │  BC Racing BR series on the │   │
│   │  EG — sitting about 2       │   │
│   │  inches lower. 6 hours in   │   │
│   │  the garage today. Next up: │   │
│   │  camber plates and a wheel  │   │
│   │  fitment check. Drop game   │   │
│   │  is underway.               │   │
│   │                             │   │
│   │  #RipEm #EGCivic #BCRacing  │   │
│   │  #StanceNation              │   │
│   │                    [Edit]   │   │
│   └─────────────────────────────┘   │
│                                     │
│   📷 Add photos / video             │
│                                     │
│   ┌─────────────────────────────┐   │
│   │       Next: Choose Where →  │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Components**: AI-generated caption (editable), hashtag block, media picker, Next CTA
**Interaction**: Edit caption inline; Add photos; Next → Platform Select
**Notes**:
- Caption is always editable — Jordan (Sharer) will customize it
- Hashtags are AI-generated from build context (car make, mod type, community tags)
- Media picker pulls from camera roll or prompts to take new photo
- Caption tone matches the user's build style (detected from voice logs)

---

### Screen: Platform Select + Watermark Preview

```
┌─────────────────────────────────────┐
│  ←  Back                            │
│                                     │
│   "Where do you want to post?"      │
│                                     │
│   ☑  RipEm Discovery Feed           │
│   ☑  Instagram (connected)          │
│   ☐  Copy to Clipboard              │
│                                     │
│   ── Watermark Preview ──           │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │   [Photo thumbnail]         │   │
│   │                             │   │
│   │                   [RipEm ↗] │   │  ← watermark
│   └─────────────────────────────┘   │
│                                     │
│   Watermark links viewers to your   │
│   build. Tap to preview.            │
│                                     │
│   ┌─────────────────────────────┐   │
│   │          Post Now →         │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components**: Platform checklist, watermark preview on photo thumbnail, Post CTA
**Interaction**: Toggle platforms; tap watermark to preview; Post Now → Published Confirmation
**Notes**:
- RipEm Discovery Feed is always an option (can't be unchecked if Public mode)
- Instagram requires OAuth — if not connected, tapping it triggers auth flow
- Watermark shown in context on actual photo (bottom-right, tasteful)
- "Watermark links viewers to your build" — frames watermark as a feature, not a cost

---

### Screen: Published Confirmation

```
┌─────────────────────────────────────┐
│                                     │
│              🎉                     │
│                                     │
│   "Build update posted!"            │
│                                     │
│   Shared to:                        │
│   ✓ RipEm Discovery Feed            │
│   ✓ Instagram                       │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  View on Instagram →        │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  Back to Garage             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ── Your AI is watching ──         │
│   "I'll let you know when           │
│    people engage with your post."   │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Success icon, sharing summary, View on Instagram CTA, Back to Garage CTA, AI follow-up teaser
**Interaction**: View on Instagram → opens Instagram app; Back to Garage → Home
**Notes**:
- Celebration moment — emotionally rewarding for Jordan (Sharer)
- AI teaser at bottom sets expectation for engagement notifications
- "View on Instagram" deeplinks to the actual post

---

### Screen: Discovery Feed

```
┌─────────────────────────────────────┐
│  Discover         [filter] [search] │
│                                     │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │  [Build photo full-width]   │    │
│  │                             │    │
│  │  Jordan's EG Civic          │    │
│  │  @jordan_builds  • 2h ago   │    │
│  │                             │    │
│  │  "Finally got the coils in. │    │
│  │   BC Racing BR series..."   │    │
│  │                             │    │
│  │  ♡ 42   💬 7   ↗ Share      │    │
│  │                [+ Follow]   │    │
│  └─────────────────────────────┘    │
│                                     │
│       ↓ Swipe for next build        │
│                                     │
└─────────────────────────────────────┘
```

**Components**: Filter bar, full-width build card (photo + caption excerpt + actions), swipe navigation
**Interaction**: Swipe up → next build; Tap photo → Build Detail; Tap Follow → subscribe
**Notes**:
- TikTok-style vertical swipe feed
- Filter by: car make, mod type, skill level, following only
- Like, comment, share, follow — all inline on card
- Devon (Learner) lives here — filtering by RX-8 or rotary builds is critical

---

### Screen: Build Detail View

```
┌─────────────────────────────────────┐
│  ←  Back           ↗ Share          │
│                                     │
│  [Build photo gallery — swipeable]  │
│                                     │
│  Jordan's EG Civic                  │
│  @jordan_builds  • + Follow         │
│                                     │
│  "Finally got the coils in. BC      │
│   Racing BR series on the EG —      │
│   sitting about 2 inches lower..."  │
│                                     │
│  ── Build Details ──                │
│  🚗  1995 Honda Civic EG hatch      │
│  🔧  Coilovers: BC Racing BR        │
│  💰  $650 installed                 │
│  ⏱  6 hours                        │
│                                     │
│  [Comments section]                 │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  Ask AI about this mod →    │    │  ← AI shortcut
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Components**: Photo gallery, builder info + follow, full caption, structured build details, comments, AI shortcut CTA
**Interaction**: Tap "Ask AI about this mod" → AI Chat with this mod pre-loaded as context
**Notes**:
- Structured build details are auto-extracted from the original log entry
- "Ask AI about this mod" is a key Learner retention feature — Devon can ask "Would BC Racing BR coilovers work on my RX-8?"
- AI shortcut pre-loads the mod context so Devon doesn't have to re-explain

---

## Navigation + Global Components

### Bottom Navigation Bar

```
[🔍 Discover]  [🏠 Garage]  [🤖 AI Chat]  [👤 Profile]
```

- **Discover**: Discovery feed
- **Garage**: Home / log view (default tab)
- **AI Chat**: Direct AI conversation
- **Profile**: Settings, subscription, build history

### Floating Action Button (FAB)

- Shown on Garage tab only
- Large, thumb-accessible, bottom-right
- Tap → opens Record screen immediately
- Long-press → shows options (Voice Log, Text Log, Add Part)

### AI Nudge Cards

Appear on Garage home, contextual and rotated:
- "You haven't logged in 5 days — what's up?"
- "You've logged 8 sessions — ready to publish?"
- "When did you last change your oil?" (maintenance reminder)
- "3 new RX-8 builds in the Discovery feed — check them out"

---

## See Also

- [personas.md](./personas.md)
- [journey_maps.md](./journey_maps.md)
- [../product/user_journeys.md](../product/user_journeys.md)
- [../mvp/scope.md](../mvp/scope.md)
- [../product/features.md](../product/features.md)
