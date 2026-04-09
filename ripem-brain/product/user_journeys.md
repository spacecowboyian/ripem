# User Journeys

## Primary Personas

### The Builder (Primary iOS User)
- **Who**: Car enthusiast actively working on a project vehicle
- **Goals**: Track what they've done, remember parts used, share progress
- **Pain points**: Scattered notes, forgotten part numbers, no easy way to document
- **Platform**: iOS

### The Sharer
- **Who**: Enthusiast who loves showing off their build on social media
- **Goals**: Create compelling content from their work, grow a following
- **Pain points**: Time-consuming to create posts, no automotive-native tool
- **Platform**: iOS primary, social media secondary

### The Learner
- **Who**: Someone planning a build or researching modifications
- **Goals**: Discover what others have done with their car, get AI advice
- **Pain points**: Information is scattered across forums, YouTube, Facebook groups
- **Platform**: iOS and web

---

## Detailed User Personas

### Persona 1: The Weekend Warrior
- Does routine maintenance (oil changes, brakes, fluids)
- Changes spark plugs, filters, minor upgrades
- Wants to track what they've done for resale value or warranty
- Not very technical, doesn't use spreadsheets
- Time-pressed; wants quick entry method
- **Primary goal**: Know what's been done and when
- **Revenue segment**: Casual maintenance tracker — ad impressions (~$1.50/month)

### Persona 2: The Enthusiast Builder
- Modifying or upgrading a car (suspension, exhaust, turbo, wheels)
- Takes detailed photos, keeps receipts
- Active on forums, watches YouTube tutorials
- Comfortable with technology
- May want to share progress with friends or online
- **Primary goal**: Track all work, parts, and decisions; share build progress
- **Revenue segment**: Active builder — ads + affiliate (~$2–4/month)

### Persona 3: The Restorer
- Doing a frame-off or major restoration (years-long project)
- Needs detailed inventory of hundreds or thousands of parts
- Budgeting is critical; needs cost breakdowns
- May employ help or collaborate with others
- Wants a historical record of all work done
- **Primary goal**: Complete organizational system for complex, multi-year projects
- **Revenue segment**: Professional restorer — Enterprise tier candidate (~$20–50/month)

### Persona 4: The Content Creator
- Documenting builds for YouTube, Instagram, TikTok
- Wants to share progress and reach an audience
- Interested in community interaction and feedback
- Might monetize through sponsorships or Patreon
- **Primary goal**: Easy way to publish, build audience, engage community
- **Revenue segment**: Premium subscriber — ad-free + social posting (~$7/month)

---

## Core Journeys

### Journey 1: First Log Entry (Documenter)
1. User downloads app and creates account
2. User adds their vehicle (year, make, model)
3. After a work session, user taps "Log Session"
4. User speaks naturally: "Just swapped the front struts, used KYB Excel-G, took about 3 hours, cost me $180 for the pair"
5. AI extracts: parts (KYB Excel-G struts), time (3 hours), cost ($180), job type (suspension)
6. User reviews and confirms the log entry
7. Entry appears in build timeline

### Journey 2: AI Q&A (Learner / Builder)
1. User navigates to AI assistant
2. User asks: "What's the best intake for my build budget?"
3. AI references: user's car (e.g., 2003 Honda Civic), prior logged mods, stated budget
4. AI answers with car-specific recommendations and confidence score
5. AI cites: "Based on 2,400 logged builds for this car..."

### Journey 3: Publish and Go Viral (Sharer)
1. User completes a milestone in their build
2. AI suggests: "You've logged 12 sessions — ready to publish a build update?"
3. User taps "Publish"
4. AI auto-formats: title, description, highlight reel from logged sessions
5. Watermark is applied automatically
6. Post goes live on RipEm; user shares to Instagram/TikTok
7. Viewers see watermark → download app → discover community

### Journey 4: Parts Discovery
1. User needs a specific part
2. User opens Parts Search
3. User searches "coilovers for 2003 Civic"
4. Results show: products, prices, affiliate links, sponsored listings (ads)
5. AI surfaces what other community members used for the same car

---

## Onboarding Questionnaire Flow (12 Screens)

**Design Philosophy**: A conversation, not a form. Questions appear one-by-one. AI reacts to previous answers. User feels heard and understood.

**Source**: RipEm MVP Technical Specification v1.0 (April 2025)

| Screen | Question | Input Type | Why |
|--------|----------|-----------|-----|
| 1 | Welcome | CTA button | Set expectation: "I'm your AI garage buddy" |
| 2 | What car are you building? | Year/Make/Model dropdowns | Foundation before emotion |
| 3 | Where did you get this car? What's the story? | Free text | Captures "Dale moment" — the emotional hook |
| 4 | What's your vision for this car? | Multi-select buttons (track car, restoration, daily driver, etc.) | Determines AI recommendation type |
| 5 | How much mechanical experience do you have? | Single select (novice → professional) | AI calibrates tone and complexity |
| 6 | What's your timeline and budget? | Sliders / text | Sets expectation for realistic advice |
| 7 | What work have you already done? | Free text | Seeds the garage brain with history |
| 8 | Does your car have a name? | Free text (optional) | Emotional peak — named cars = deeper investment |
| 9 | What are you most excited about? | Free text | Sets AI's conversational focus |
| 10 | Anything to ask your AI right now? | Free text (optional) | User-controlled first conversation |
| 11 | How do you want to share your project? | Public / Private toggle | Sets discovery feed and watermark expectations |
| 12 | Summary + First AI Response | Loading → AI message | **The magic moment** |

**Target**: <10 minutes to complete, 70%+ completion rate.

### The "Dale Moment" — First AI Response Example

> "Dale's a kickass name. So the original owner was Dale? That's sick, I'm adding that to the history.
>
> Okay, so you've got a classic Celica track car project. 1972 is the perfect year for this—solid platform. Based on what you've shared, you've got mechanical chops (water pump + fluids = you know how to work). Here's what I'm thinking:
>
> With a $5K budget over 2 years and track car ambitions, the limiting factor is power. The stock 18R-C motor is... not a monster. There are some killer motor swap options:
> - 4A-GE (~180hp, tunable)
> - 20V Blacktop (200+hp, rarer)
> - 2ZZ-GE (modern, reliable)
>
> Have you ever looked into swaps? Are you trying to keep it period-correct, or willing to go modern? Either way, let's make this thing a real monster."

### Onboarding Data Structure

```json
{
  "project_id": "proj_abc123",
  "car_basics": { "year": 1972, "make": "Toyota", "model": "Celica" },
  "story": "Got it from Dale, the original owner",
  "vision": ["track_car"],
  "skill_level": "intermediate",
  "budget": { "amount": 5000, "currency": "USD" },
  "timeline": { "months": 24 },
  "work_completed": "Water pump, coolant, oil change, spark plugs",
  "car_name": "Dale",
  "primary_focus": "Motor swap",
  "initial_question": "What motor swap would work best in my budget?",
  "visibility": "public"
}
```

---

## See Also

- [product_definition.md](./product_definition.md)
- [features.md](./features.md)
- [/mvp/acceptance_criteria.md](../mvp/acceptance_criteria.md)
- [/technical/ai_prompting.md](../technical/ai_prompting.md)
