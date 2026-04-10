# RiPeM User Journey Maps

**Status**: v1.0 — April 2026
**Author**: UX Researcher (RiPeM)
**Purpose**: Map each persona's end-to-end journey through the MVP phases. These journeys feed directly into Product Manager user stories and engineering acceptance criteria.

---

## Reading This Document

Each journey map follows the same structure:
- **Stage**: The phase or moment in the journey
- **User Action**: What the user does
- **Thoughts/Emotions**: What the user is thinking and feeling
- **Pain Points**: Where friction occurs
- **Opportunities**: Design moments to delight or retain
- **RiPeM Response**: What the app does

---

## Journey 1: Marcus (Documenter) — "From Garage Floor to Log Entry"

**Scenario**: Marcus just replaced his rear brake pads. He's done — hands are greasy, it's 7pm. He wants to record what he did before he forgets.

```
STAGE 1 — Pre-App Discovery
───────────────────────────────────────────────────────────────────────────────
User Action   : Marcus searches "app to track car maintenance" on App Store
Thoughts      : "There has to be something better than a spreadsheet"
Emotion       : Frustrated, hopeful
Pain Points   : Generic maintenance apps aren't for builders; they're for oil
                change reminders
Opportunity   : App Store screenshot should show a voice log in progress,
                not a form
RiPeM Response: N/A (App Store listing)

STAGE 2 — Download + Onboarding (Phase 1)
───────────────────────────────────────────────────────────────────────────────
User Action   : Downloads RiPeM, answers 12 onboarding questions
Thoughts      : "Why do they need to know the story of my car? Whatever, fine."
                (Screen 3)
              : "Oh — it knows my WRX. It knows the EJ25 has a head gasket issue.
                This is different." (Screen 12)
Emotion       : Skeptical → Curious → Surprised (the Dale Moment equivalent)
Pain Points   : Screen 3 (story) feels personal; Marcus isn't sentimental
              : Sliders on Screen 6 (budget/timeline) feel vague
Opportunity   : Screen 3 copy: "Even just 'bought it off a guy' works."
              : Screen 12 first response references EJ205 head gasket — shows
                the AI knows WRX culture, not just Marcus's inputs
RiPeM Response: AI first response: "2008 WRX with 80k miles — nice. That EJ205
                is solid if it's been taken care of. You mentioned brake work
                already done — I'll keep that logged. What's next?"

STAGE 3 — First Voice Log (Phase 2)
───────────────────────────────────────────────────────────────────────────────
User Action   : Taps "Log Session" after replacing rear brakes
Thoughts      : "I hope this isn't going to take forever"
Emotion       : Slightly skeptical; tired from work
Pain Points   : Finding the "Log Session" button fast (hands might be dirty)
              : Unsure how much to say — too little? Too much?
Opportunity   : Log button should be a prominent floating action button (FAB)
              : On-screen prompt: "Just tell me what you did — I'll handle
                the rest"
User Says     : "Just swapped the rear brake pads — used EBC Greenstuff, took
                about an hour, pads were like 45 bucks from RockAuto"
RiPeM Response: Extracts → Part: EBC Greenstuff brake pads (rear), Time: 1hr,
                Cost: $45, Source: RockAuto
              : Shows confirmation card: "Got it. Want me to add a maintenance
                reminder for next pad inspection in 25,000 miles?"
Emotion       : Impressed — "It got all that from one sentence"

STAGE 4 — Return Engagement (Phase 2)
───────────────────────────────────────────────────────────────────────────────
User Action   : Returns 2 weeks later, asks "When did I do my brakes?"
Thoughts      : "Let me see if this thing actually knows"
Emotion       : Testing the AI
Pain Points   : If answer is slow or generic, Marcus churns
RiPeM Response: "March 22nd — rear brake pads, EBC Greenstuff, $45 from
                RockAuto. About 1 hour of work. You're due for front pads
                based on your mileage."
Emotion       : Converted. "This is better than a spreadsheet."

STAGE 5 — Long-Term Value
───────────────────────────────────────────────────────────────────────────────
User Action   : Marcus logs regularly, asks AI maintenance questions
Key Insight   : Marcus never needs to share publicly to get full value
              : His retention loop is purely practical — the AI's memory of
                his car is the hook
Monetization  : Ad impressions during parts search
              : Upgrade trigger: "You have 3 projects' worth of mods on this
                car. Want to add a Projects slot?"
```

---

## Journey 2: Jordan (Sharer) — "From Build Session to Instagram Post"

**Scenario**: Jordan just installed coilovers on her EG Civic. She took photos and video during the install. She wants to post about it.

```
STAGE 1 — Discovery
───────────────────────────────────────────────────────────────────────────────
User Action   : Jordan sees a RiPeM watermark on an Instagram Reel — the
                post has good engagement and the build is sick
Thoughts      : "What's RiPeM? This post looks clean."
Emotion       : Curious, slightly competitive
Pain Points   : N/A — viral loop working as intended
Opportunity   : Watermark must be visually clean; small, tasteful, corner
RiPeM Response: N/A (watermark in Instagram)

STAGE 2 — Download + Onboarding (Phase 1)
───────────────────────────────────────────────────────────────────────────────
User Action   : Downloads, opens onboarding
Thoughts      : "Is this going to ask me 100 questions?"
Emotion       : Impatient but engaged — the car culture visuals feel right
Pain Points   : Screen 11 (privacy toggle) — Jordan wants to know the
                social dynamics before choosing
Opportunity   : Screen 11 should explain the watermark as a growth mechanic:
                "Public builds get shared in the Discovery feed and watermarked
                posts drive followers back to your build. Think of it as a
                free co-sign."
              : Show a preview of what a post looks like with the watermark
RiPeM Response: AI first response: "EG Civic — solid choice. Coilover install
                is a great first milestone. What are you going for —
                flush stance, track setup, or daily-able drop?"
Emotion       : "It knows what an EG is. It knows stance culture. I'm in."

STAGE 3 — Logging for Publishing (Phase 2)
───────────────────────────────────────────────────────────────────────────────
User Action   : After coilover install, logs the session by voice
Thoughts      : "I need to make sure I give it enough to write a good caption"
Emotion       : Deliberate, invested
User Says     : "Just finished the coilover install — BC Racing BR series,
                dropped it about 2 inches, looks aggressive. Took most of the
                day, maybe 6 hours. Car sits way better."
RiPeM Response: Extracts → Part: BC Racing BR coilovers, Time: 6hr, Drop: ~2"
              : "Nice. Ready to publish a build update? I can write a caption
                from your logs."

STAGE 4 — Publishing (Phase 3)
───────────────────────────────────────────────────────────────────────────────
User Action   : Taps "Publish Build Update"
Thoughts      : "I hope the caption doesn't sound like a robot wrote it"
Emotion       : Excited but anxious
RiPeM Response: AI generates caption draft:
                "Finally got the coils in. BC Racing BR series on the EG —
                sitting about 2 inches lower and it looks mean. 6 hours in
                the garage today. Next up: camber plates and a wheel fitment
                check. Drop game is underway. #RiPeM #EGCivic #StanceNation
                #BCRacing"
              : Watermark preview shown before posting
              : "Edit caption or post as-is?"
Emotion       : "The hashtags are right. The tone is right. This actually
                sounds like me."
Pain Points   : Jordan will edit the caption — she should always be able to
              : Watermark must look like a badge, not a spam tag
RiPeM Response: One-tap Instagram publish
              : Posts go live with RiPeM watermark in bottom-right corner

STAGE 5 — Discovery + Community (Phase 3)
───────────────────────────────────────────────────────────────────────────────
User Action   : Jordan checks the Discovery feed in RiPeM
Thoughts      : "Are there other EG builds here I can follow?"
Emotion       : Community-seeking
RiPeM Response: Discovery feed surfaces EG Civic builds
              : Jordan subscribes to 3 other builders
Key Insight   : Jordan's retention loop is social — community engagement
                keeps her active between build sessions
Monetization  : Upgrade trigger: "Want to post to TikTok too? Chat Pro
                includes direct TikTok publish." (Post-MVP)
              : Near-term: "Remove the watermark + post ad-free? Chat Pro
                is $6/month."
Emotion       : "I might upgrade just to remove ads from my AI convos"
```

---

## Journey 3: Devon (Learner) — "From Research Spiral to AI Clarity"

**Scenario**: Devon just bought his RX-8. He's been on forums for three weeks and is overwhelmed. He downloads RiPeM hoping the AI is better than search.

```
STAGE 1 — Discovery
───────────────────────────────────────────────────────────────────────────────
User Action   : Devon hears about RiPeM in an RX-8 Facebook group
              : Someone posts: "I've been using RiPeM to plan my build —
                the AI actually knows the Renesis"
Thoughts      : "If it actually knows the rotary, I'm interested"
Emotion       : Skeptical optimism — has been burned by generic AI before
Pain Points   : Generic car apps give generic advice; forum search is slow
Opportunity   : Positioning: "AI that knows your exact car and community data"

STAGE 2 — Download + Onboarding (Phase 1)
───────────────────────────────────────────────────────────────────────────────
User Action   : Downloads, starts onboarding
Thoughts      : "I literally just bought it. I haven't done anything."
              : Screen 7 (work completed) — "I should put 'nothing yet'"
Emotion       : Slightly self-conscious; doesn't feel like a "real" builder yet
Pain Points   : Screen 7 needs a "just got it / planning phase" option
              : Screen 6 (budget) is hard to answer when plan isn't formed yet
Opportunity   : Screen 7: Include "Just bought it — planning phase" as option
              : Screen 6: Allow "TBD / figuring it out" response
              : Screen 12 (AI first response) must prove value IMMEDIATELY
RiPeM Response: AI first response: "2004 RX-8 — you're getting into rotary
                territory. I'm going to be real with you: the Renesis has a
                reputation, but it's manageable if you know what to watch.
                First thing: compression test ASAP if you haven't done one.
                Based on 847 other RX-8 owners in our community, the top
                three issues are: (1) flooded engine cold starts, (2) apex
                seal wear, (3) oil consumption. Want a full rundown of what
                to do in the first 30 days with an RX-8?"
Emotion       : "This is the best answer I've gotten in three weeks of forum
                reading. I'm staying."

STAGE 3 — AI Deep Dive (Phase 1 + 2)
───────────────────────────────────────────────────────────────────────────────
User Action   : Devon spends 45 minutes asking the AI questions
Questions     : "What oil should I run?"
              : "How do I check apex seal compression?"
              : "What's the difference between Series 1 and 2 RX-8?"
              : "Should I get a rebuild kit or find a motor?"
Thoughts      : Testing the AI's knowledge depth
Emotion       : Progressively trusting as AI answers are specific and honest
              : AI says "I'm not confident on this one — community data
                is mixed" — Devon trusts it MORE because it admits uncertainty
Pain Points   : If Devon gets a generic answer, he churns immediately
Opportunity   : Every RX-8 answer should reference community consensus data
              : AI should offer to save questions to his "build plan"

STAGE 4 — Discovery Feed (Phase 3)
───────────────────────────────────────────────────────────────────────────────
User Action   : Devon opens Discovery feed, searches for RX-8 builds
Thoughts      : "I want to see what people are actually doing with these cars"
Emotion       : Inspired, taking notes mentally
RiPeM Response: Feed shows RX-8 builds, filterable by mod type
              : Devon can see: parts used, costs, timelines, photos
              : Can subscribe to builders to follow their progress
Key Insight   : Devon doesn't have a build to share yet — the feed is a
                passive value source. He will eventually want to share.

STAGE 5 — Transition to Documenter
───────────────────────────────────────────────────────────────────────────────
User Action   : Devon starts his first job (compression test on cold start)
Thoughts      : "I should log this"
Emotion       : Proud — this is day one of his build
RiPeM Response: AI sends a proactive nudge: "You mentioned you were going to
                do a compression test. How did it go?"
Key Insight   : Devon's transition from Learner to Documenter is triggered
                by starting work — proactive AI nudges accelerate this
              : This is the highest-value conversion in the app: a Learner
                who becomes a Documenter becomes a potential Sharer
```

---

## Cross-Persona Journey Comparison

```
PHASE          | Marcus (Documenter) | Jordan (Sharer)      | Devon (Learner)
──────────────────────────────────────────────────────────────────────────────
Phase 1        | Complete quickly;   | Complete with care;  | Most critical phase;
(Onboarding)   | Screen 12 confirms  | Screen 11 must sell  | Screen 12 must prove
               | AI knows his car    | the publishing value | AI depth immediately

Phase 2        | PRIMARY PHASE —     | Feeds Phase 3;       | May start here if
(Voice Logging)| core loop for him   | logs become content  | he begins work early

Phase 3        | Low engagement      | PRIMARY PHASE —      | SECONDARY —
(Publishing)   | (private user)      | publishing is why    | Discovery feed is
               | unless prompted     | he's here            | the draw; logging
               | by AI               |                      | comes later
──────────────────────────────────────────────────────────────────────────────
Retention      | AI memory of car    | Community + social   | AI quality + build
Mechanic       | (practical value)   | growth (social)      | inspiration (curiosity)
──────────────────────────────────────────────────────────────────────────────
Churn Risk     | Low — once he logs  | Medium — if posts    | High — if AI gives
               | 3+ sessions, habit  | don't perform well   | generic answers
               | is formed           | or watermark ugly    | in first session
──────────────────────────────────────────────────────────────────────────────
Upgrade Path   | Projects Add-on     | Chat Pro (ad-free    | Projects Add-on
               | when logging >1 car | + publishing)        | when build starts
```

---

## Emotional Arc Summary

| Persona | Entry Emotion | Onboarding Peak | First Aha Moment | Retention Emotion |
|---------|--------------|-----------------|------------------|------------------|
| Marcus  | Frustrated   | Curious         | AI knows WRX culture | Relieved / Practical |
| Jordan  | Competitive  | Excited         | AI caption sounds like her | Proud / Social |
| Devon   | Overwhelmed  | Hopeful         | AI gives RX-8 specific depth | Confident / Curious |

---

## See Also
- [personas.md](./personas.md)
- [wireframes.md](./wireframes.md)
- [../product/user_journeys.md](../product/user_journeys.md)
