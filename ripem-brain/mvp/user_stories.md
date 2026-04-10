# RiPeM MVP User Stories

**Author**: ProductManager (RIP-3)
**Status**: Draft v1.0
**Date**: April 2026
**Source references**: `mvp/scope.md`, `mvp/acceptance_criteria.md`, `product/user_journeys.md`, `product/features.md`

> **Note**: UXResearcher deliverables (RIP-4) are in progress. These stories are authored from existing product brain personas and will be updated once UX wireframes are available.

---

## Personas

| Short Name | Full Description |
|------------|-----------------|
| **Weekend Warrior** | Routine maintenance tracker; not very technical; time-pressed; wants quick entry |
| **Enthusiast Builder** | Modifying/upgrading a car; active on forums; wants to track and share |
| **Restorer** | Multi-year, complex restoration; needs detailed inventory; budget-critical |
| **Content Creator** | Documents builds for social media; wants audience growth and easy publishing |

---

## Phase 1 — Onboarding + AI Garage Brain (Weeks 1–2)

**Goal**: User completes questionnaire, meets their AI buddy, feels "This app gets me."

---

### Story P1-1: Account Creation

**As a** Weekend Warrior or Enthusiast Builder,
**I want to** create an account quickly using Google or Apple sign-in,
**so that** I can start documenting my build without friction.

**Priority**: Critical — gate to everything else

**Acceptance Criteria**:
- [ ] User can register/login via Google OAuth
- [ ] User can register/login via Apple OAuth
- [ ] User can register/login via email + password as a fallback
- [ ] Auth completes in under 5 seconds on a standard connection
- [ ] Returning users are auto-logged in (persistent session)
- [ ] Failed login shows a clear, human-readable error message
- [ ] Works on iPhone 12+ running iOS 16+
- [ ] No crashes on happy path

---

### Story P1-2: Onboarding Questionnaire — Car Basics

**As an** Enthusiast Builder or Restorer,
**I want to** enter my vehicle's year, make, and model in the first screen,
**so that** the AI has the foundational context to give me car-specific advice.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] Screen 2 of onboarding presents year/make/model dropdowns (or searchable fields)
- [ ] Year range covers 1950–present
- [ ] Make and model lists filter based on year selection
- [ ] Selection is saved to `garages` table upon completion
- [ ] User can go back and change their entry before submitting
- [ ] Partial entry does not crash the app

---

### Story P1-3: Onboarding Questionnaire — The Story ("Dale Moment" Setup)

**As an** Enthusiast Builder,
**I want to** tell the app the story of how I got my car in my own words,
**so that** the AI can reference my personal history and feel like it knows me, not just my vehicle.

**Priority**: High — drives emotional engagement and retention

**Acceptance Criteria**:
- [ ] Screen 3 presents a free-text field with a conversational prompt (e.g., "Where did this car come from? What's the story?")
- [ ] Field accepts up to 500 characters
- [ ] Field is optional — user can skip
- [ ] Entry is stored in `questionnaire_responses` and passed to AI context
- [ ] Character count is visible as user types

---

### Story P1-4: Onboarding Questionnaire — Vision and Goals

**As a** Weekend Warrior or Enthusiast Builder,
**I want to** tell the app what I'm trying to achieve with this car,
**so that** the AI recommends relevant mods, maintenance schedules, and next steps for MY goals.

**Priority**: High

**Acceptance Criteria**:
- [ ] Screen 4 presents multi-select buttons: Track Car, Daily Driver, Restoration, Show Car, Weekend Cruiser, Other
- [ ] User can select one or more options
- [ ] At least one selection is required to advance
- [ ] Selection is stored in `questionnaire_responses`
- [ ] AI first response explicitly references the selected vision type

---

### Story P1-5: Onboarding Questionnaire — Skill Level

**As a** Weekend Warrior,
**I want to** indicate how mechanically experienced I am,
**so that** the AI adjusts the complexity of its explanations to match my knowledge level.

**Priority**: High

**Acceptance Criteria**:
- [ ] Screen 5 presents single-select skill options: Complete Beginner, Hobbyist, Comfortable DIYer, Experienced, Professional
- [ ] Exactly one option must be selected to advance
- [ ] Selection is stored in `questionnaire_responses`
- [ ] AI tone and vocabulary in all subsequent responses reflects skill calibration
- [ ] A beginner does not receive jargon-heavy answers without explanation

---

### Story P1-6: Onboarding Questionnaire — Budget and Timeline

**As a** Restorer,
**I want to** set my budget and project timeline upfront,
**so that** the AI gives me realistic, budget-appropriate recommendations rather than fantasy builds.

**Priority**: High

**Acceptance Criteria**:
- [ ] Screen 6 presents a budget slider or text input (in USD) and timeline input (months)
- [ ] Budget range: $0 to $100,000+
- [ ] Timeline range: 1 month to 10+ years
- [ ] Both fields are optional — user can skip
- [ ] AI first response explicitly references budget and timeline when making recommendations

---

### Story P1-7: Onboarding Questionnaire — Existing Work

**As an** Enthusiast Builder,
**I want to** describe what work I've already done on this car,
**so that** the AI's Garage Brain starts with my real history, not a blank slate.

**Priority**: High

**Acceptance Criteria**:
- [ ] Screen 7 presents a free-text field: "What work have you already completed on this car?"
- [ ] Field accepts up to 1,000 characters
- [ ] Field is optional — user can skip
- [ ] Entry is stored and indexed in AI context (seeds the Garage Brain)
- [ ] AI first response acknowledges prior work when present

---

### Story P1-8: Onboarding Questionnaire — Car Name

**As an** Enthusiast Builder or Content Creator,
**I want to** give my car a name,
**so that** the app feels personal and the AI can reference my car like a character, not just a database entry.

**Priority**: Medium — emotional engagement driver

**Acceptance Criteria**:
- [ ] Screen 8 presents a free-text field: "Does your car have a name?" (optional)
- [ ] Field accepts up to 30 characters
- [ ] If name is entered, all subsequent AI responses refer to the car by that name
- [ ] AI first response specifically calls out the name ("Dale's a kickass name")
- [ ] If skipped, AI uses make/model/year as identifier

---

### Story P1-9: Onboarding Questionnaire — Initial AI Question

**As an** Enthusiast Builder,
**I want to** ask my AI one burning question right now during onboarding,
**so that** I experience the value of the AI immediately and feel compelled to continue.

**Priority**: Medium

**Acceptance Criteria**:
- [ ] Screen 10 presents an optional free-text field: "Anything to ask your AI right now?"
- [ ] Field accepts up to 300 characters
- [ ] If filled, the first AI response incorporates and answers this question
- [ ] If left blank, AI response leads with general observations and recommendations

---

### Story P1-10: Onboarding Questionnaire — Privacy Setting

**As a** Weekend Warrior,
**I want to** choose whether my build is public or private before finishing onboarding,
**so that** I'm in control of who can see my project from day one.

**Priority**: High — legal/trust requirement

**Acceptance Criteria**:
- [ ] Screen 11 presents a Public / Private toggle with clear descriptions
- [ ] Default is Private
- [ ] Setting is stored in `projects` table
- [ ] Public projects appear in discovery feed (Phase 3)
- [ ] Private projects are never visible to other users
- [ ] User can change this setting later in project settings

---

### Story P1-11: AI First Response — The "Dale Moment"

**As an** Enthusiast Builder completing onboarding,
**I want to** receive a personalized AI response that references my car's name, story, and vision,
**so that** I immediately feel the app "gets me" and I'm excited to keep using it.

**Priority**: Critical — highest-impact moment in the entire product

**Acceptance Criteria**:
- [ ] Screen 12 shows a loading animation then displays the AI's first message
- [ ] AI response must reference: car name (if given), story (if given), vision type, skill level, and budget/timeline (if given)
- [ ] Response includes at least one actionable recommendation tailored to the user's specific vehicle
- [ ] Response time: loading completes within 10 seconds for 95th percentile
- [ ] Response is written in a warm, confident, non-robotic tone
- [ ] Response is between 150–350 words (feels substantive but not overwhelming)
- [ ] If AI call fails, fallback message is shown (not a blank screen)
- [ ] 70%+ questionnaire completion rate in beta

---

### Story P1-12: Garage Home Screen

**As an** Enthusiast Builder who has completed onboarding,
**I want to** see my garage and project dashboard,
**so that** I have a clear home base to navigate from and return to after each session.

**Priority**: High

**Acceptance Criteria**:
- [ ] Post-onboarding, user lands on a Garage Home screen
- [ ] Garage Home shows: car name/year/make/model, project vision, recent activity, quick-access log button
- [ ] Garage loads in under 2 seconds
- [ ] User can navigate to: log a session, AI chat, build timeline, settings
- [ ] Works offline (cached data)

---

## Phase 2 — Voice Logging + AI Responses (Weeks 3–4)

**Goal**: Core loop functional — user logs voice entries, AI responds with context.

---

### Story P2-1: Start a Voice Recording

**As a** Weekend Warrior who just finished changing their oil,
**I want to** tap a button and speak naturally about what I just did,
**so that** I can log the work in under 60 seconds without typing anything.

**Priority**: Critical — the core product action

**Acceptance Criteria**:
- [ ] A prominent "Log Session" button is accessible from the Garage Home screen
- [ ] Tapping the button immediately opens the recording view and begins recording
- [ ] Microphone permission request is triggered only once, with a clear explanation
- [ ] Recording works without an internet connection (offline mode)
- [ ] Visual indicator shows that recording is active (waveform or pulsing icon)
- [ ] Audio captured at 16kHz mono M4A format

---

### Story P2-2: Pause and Resume Recording

**As an** Enthusiast Builder mid-session who gets interrupted,
**I want to** pause my recording and resume it later,
**so that** I don't lose a long session just because I had to step away.

**Priority**: High

**Acceptance Criteria**:
- [ ] Pause button is visible and tappable during recording
- [ ] Pausing stops audio capture but does not discard it
- [ ] Resume button continues recording into the same session file
- [ ] Total recording time (including across pauses) is displayed
- [ ] User can pause and resume multiple times in one session

---

### Story P2-3: Stop and Save a Recording

**As a** Weekend Warrior,
**I want to** stop my recording when I'm done talking,
**so that** the session is saved and ready for AI processing.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] Stop button ends recording
- [ ] Recording is saved to local SQLite immediately after stopping
- [ ] User sees a confirmation that the session was saved locally
- [ ] Session enters a queue for upload/processing when online
- [ ] No data is lost if the app is backgrounded or closed after saving

---

### Story P2-4: Offline Recording with Auto-Sync

**As a** Weekend Warrior in a garage with no Wi-Fi,
**I want to** record voice logs offline and have them sync automatically when I get back online,
**so that** connectivity is never a barrier to logging.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] App detects offline state and enables local-only recording mode
- [ ] Unsynced sessions are visibly queued (count shown in UI)
- [ ] SyncService uploads sessions automatically when connectivity is restored
- [ ] Sync succeeds reliably at 99%+ rate (no silent drops)
- [ ] If sync fails, user is notified and can manually retry
- [ ] No duplicate entries are created if sync retries

---

### Story P2-5: AI Transcription of Voice Log

**As an** Enthusiast Builder who just recorded a session,
**I want to** see an accurate text transcript of what I said,
**so that** I can verify the AI understood me correctly before it's saved to my history.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] Transcript is generated within 30 seconds of session upload (when online)
- [ ] Transcription accuracy is ≥ 90% for standard English speech
- [ ] Automotive terminology is transcribed correctly (e.g., "KYB", "coilovers", "camber plate", "struts", "headers")
- [ ] Transcript is displayed in the session detail view
- [ ] User can edit the transcript if any word is wrong (optional inline editing)

---

### Story P2-6: AI Extraction — Parts, Cost, and Time

**As an** Enthusiast Builder,
**I want to** see the parts, costs, and time automatically extracted from my voice log,
**so that** my build inventory and cost tracker update without any manual data entry.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] Parts mentioned (name + brand) are extracted and displayed as structured fields
- [ ] Cost figures with currency are extracted
- [ ] Time spent (hours/minutes) is extracted
- [ ] Extracted data is displayed for user review before saving
- [ ] User can edit any extracted field before confirming
- [ ] User can add fields that weren't extracted
- [ ] Extraction completes within 15 seconds of transcription completing
- [ ] Unrecognized items default to a "review needed" flag rather than being silently dropped

---

### Story P2-7: Build Timeline View

**As a** Restorer with months of work already done,
**I want to** see all my log sessions in reverse-chronological order with summaries,
**so that** I have a clear record of everything I've done and when.

**Priority**: High

**Acceptance Criteria**:
- [ ] Timeline screen shows all sessions in reverse-chronological order (newest first)
- [ ] Each session card shows: date, short summary, part count, total time, total cost
- [ ] Tapping a session opens the full session detail view
- [ ] Timeline loads in under 2 seconds for up to 100 sessions
- [ ] Infinite scroll or pagination for more than 100 sessions
- [ ] Empty state shows a prompt to log the first session

---

### Story P2-8: AI Chat — Context-Aware Q&A

**As an** Enthusiast Builder who wants advice on their next mod,
**I want to** ask the AI a question and get an answer that knows my car and my history,
**so that** I get relevant advice instead of generic internet suggestions.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] AI chat is accessible from Garage Home screen
- [ ] User can type a natural language question
- [ ] Response explicitly references: user's vehicle (year/make/model)
- [ ] Response references logged parts and prior sessions when relevant to the question
- [ ] Each AI recommendation includes a confidence score: High / Medium / Low
- [ ] Response time under 10 seconds for 95th percentile
- [ ] AI never gives generic answers when project-specific context is available
- [ ] AI never fabricates parts or specs with false confidence — uncertain answers are marked Low confidence
- [ ] Push notification is sent when an AI response is ready (async model)

---

### Story P2-9: Push Notification — AI Response Ready

**As an** Enthusiast Builder who logged a session and went back to work,
**I want to** receive a push notification when the AI has processed my log,
**so that** I don't have to keep checking the app.

**Priority**: High

**Acceptance Criteria**:
- [ ] Push notification is sent when AI completes processing for a voice log session
- [ ] Notification includes session name or summary
- [ ] Tapping notification deep-links to that session's detail view
- [ ] Notification permission is requested with a clear explanation during onboarding
- [ ] If notification permission is denied, app shows an in-app banner instead

---

## Phase 3 — Instagram Publishing + Discovery Feed + Subscriptions (Weeks 5–8)

**Goal**: Growth loop active — watermark drives new user acquisition.

---

### Story P3-1: Connect Instagram Account

**As a** Content Creator,
**I want to** connect my Instagram account to RiPeM,
**so that** I can publish my build content directly without switching apps.

**Priority**: Critical — gate to publishing feature

**Acceptance Criteria**:
- [ ] Settings screen includes "Connect Instagram" option
- [ ] Tapping initiates Instagram OAuth flow in an in-app browser
- [ ] Successful OAuth stores token and displays connected account name
- [ ] If Instagram OAuth approval is unavailable, clipboard-copy fallback is offered
- [ ] User can disconnect Instagram from settings at any time
- [ ] Re-authorization is handled gracefully (expired token → prompt to reconnect)

---

### Story P3-2: AI-Generated Build Caption

**As a** Content Creator who just hit a milestone,
**I want to** get an AI-generated caption for my build update,
**so that** I don't have to spend time writing copy and can publish immediately.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] AI generates a caption based on recent log sessions and project context
- [ ] Caption includes: build milestone, key parts, project name, relevant hashtags
- [ ] Caption is displayed in an editable preview screen before publishing
- [ ] User can regenerate the caption if they don't like it
- [ ] Caption length is appropriate for Instagram (under 2,200 characters)
- [ ] Caption references the car name (if set)

---

### Story P3-3: Watermark Application

**As a** Content Creator on the free tier,
**I want** a RiPeM watermark automatically applied to all my published media,
**so that** viewers can find the app and my build gains organic visibility.

**Priority**: Critical — core to growth loop

**Acceptance Criteria**:
- [ ] Watermark is applied to all media before publishing (server-side)
- [ ] Watermark includes the RiPeM logo and a clickable URL
- [ ] Watermark position and size are consistent and non-obtrusive
- [ ] Free tier users cannot remove the watermark
- [ ] Watermark is applied before the caption preview is shown to user
- [ ] Watermark URL is trackable (UTM-tagged or short link) so new user attribution works

---

### Story P3-4: One-Tap Instagram Publish

**As a** Content Creator,
**I want to** publish my build update to Instagram with one tap after reviewing the caption and watermark,
**so that** sharing is effortless and I actually do it regularly.

**Priority**: Critical

**Acceptance Criteria**:
- [ ] "Publish to Instagram" button is visible on the caption preview screen
- [ ] Tapping triggers `POST /share/instagram/publish` and shows a loading state
- [ ] Success state: confirmation message and link to the published post
- [ ] Failure state: clear error message with retry option (no silent failure)
- [ ] Published post appears in `instagram_posts` table
- [ ] Watermark is confirmed visible in the published post

---

### Story P3-5: Discovery Feed — Browse Public Builds

**As a** Learner who wants to see what others have done with the same car,
**I want to** browse a feed of public builds from the community,
**so that** I can get inspired, learn from others, and discover great builds.

**Priority**: High

**Acceptance Criteria**:
- [ ] Discovery feed is accessible from the main navigation
- [ ] Feed shows public builds in a vertically scrollable, TikTok-style layout
- [ ] Each card shows: car name/year/make/model, build photo or thumbnail, short summary, like count
- [ ] Feed loads in under 2 seconds on first open
- [ ] Feed supports infinite scroll with pagination (no hard limit)
- [ ] Empty state shows a message encouraging users to make their build public

---

### Story P3-6: Discovery Feed — Like a Build

**As a** Learner browsing the discovery feed,
**I want to** like a build I find impressive,
**so that** I can save it for later and signal positive feedback to the creator.

**Priority**: Medium

**Acceptance Criteria**:
- [ ] Like button is visible on each discovery feed card
- [ ] Tapping like increments the like count immediately (optimistic UI)
- [ ] Like is persisted to backend via `POST /feed/like`
- [ ] User can unlike by tapping again
- [ ] Like count is accurate within 1 second of interaction

---

### Story P3-7: Discovery Feed — Subscribe to a Builder

**As a** Learner who found a builder they want to follow,
**I want to** subscribe to that builder's updates,
**so that** I see their new posts in my feed without having to search for them.

**Priority**: Medium

**Acceptance Criteria**:
- [ ] Subscribe button is accessible from a builder's public profile
- [ ] Tapping subscribe calls `POST /feed/subscribe`
- [ ] Subscribed builder's new public posts appear in the discovery feed
- [ ] User can unsubscribe from the same button
- [ ] Subscription list is accessible in user settings

---

### Story P3-8: Subscription Tier — Free Experience

**As a** Weekend Warrior using RiPeM for free,
**I want to** track one project, use voice logging, and browse the discovery feed with ads,
**so that** I get real value without paying anything.

**Priority**: Critical — baseline UX expectation

**Acceptance Criteria**:
- [ ] Free tier allows exactly 1 active project
- [ ] Voice logging and AI responses are available on free tier (async, not real-time)
- [ ] Discovery feed is available on free tier
- [ ] Instagram publishing with watermark is available on free tier
- [ ] Ads are shown only in parts/search contexts — never in AI chat or log views
- [ ] Free tier user who tries to create a second project is shown an upgrade prompt, not an error

---

### Story P3-9: Subscription Upgrade — Chat Pro

**As an** Enthusiast Builder who wants faster AI responses and no ads,
**I want to** upgrade to Chat Pro,
**so that** I get an enhanced, uninterrupted experience.

**Priority**: High

**Acceptance Criteria**:
- [ ] In-app purchase for Chat Pro ($5–7/month) is available via StoreKit
- [ ] Upgrade prompt appears in: AI chat, settings, and when user encounters ads
- [ ] Successful purchase immediately activates ad-free experience
- [ ] Subscription status is reflected in `subscriptions` table
- [ ] Cancellation and restore purchase flows are supported
- [ ] User sees their current plan clearly in account settings

---

### Story P3-10: Subscription Upgrade — Additional Projects

**As a** Restorer managing multiple vehicles,
**I want to** add more projects beyond the 1 included in the free tier,
**so that** I can track each vehicle separately without mixing up their histories.

**Priority**: High

**Acceptance Criteria**:
- [ ] Projects Add-on ($2/month each) is purchasable via StoreKit
- [ ] Each purchased add-on unlocks exactly one additional project slot
- [ ] User sees remaining project slots in project creation flow
- [ ] Downgrading removes access to additional projects (data is not deleted, just inaccessible)
- [ ] User is warned before downgrade that projects will be locked

---

### Story P3-11: Watermark Drives New User Acquisition (Growth Loop)

**As a** new user who saw a RiPeM watermark on an Instagram post,
**I want to** tap the watermark and land on a page that shows me what RiPeM is,
**so that** I can understand the product and download the app in one motion.

**Priority**: Critical — core business growth mechanism

**Acceptance Criteria**:
- [ ] Watermark URL resolves to a landing page (web or App Store)
- [ ] New installs from watermark clicks are trackable via UTM or deep link attribution
- [ ] Landing page clearly communicates RiPeM's value proposition
- [ ] App Store link is correct and the app is available for download
- [ ] Attribution data is stored so marketing can measure watermark-driven installs

---

## Cross-Phase Stories

### Story CX-1: Error Handling and Graceful Degradation

**As any** RiPeM user,
**I want to** see clear, helpful error messages whenever something goes wrong,
**so that** I'm never confused by a blank screen or a cryptic technical error.

**Priority**: High (all phases)

**Acceptance Criteria**:
- [ ] All API failures show user-readable error messages (not raw error codes)
- [ ] No blank screens on any happy-path or common error-path flow
- [ ] Errors include actionable guidance (e.g., "Check your connection and try again")
- [ ] Critical errors are logged server-side for debugging
- [ ] App does not crash on any tested error path

---

### Story CX-2: iOS Performance Baseline

**As any** RiPeM user,
**I want to** use the app without lag or slowness,
**so that** the experience feels native and polished.

**Priority**: High (all phases)

**Acceptance Criteria**:
- [ ] App works on iPhone 12 or later running iOS 16+
- [ ] All primary screens load in under 2 seconds on a standard connection
- [ ] App does not crash during happy-path user flows
- [ ] Memory usage does not cause app termination during a recording session
- [ ] AI chat response renders within 10 seconds (P95)

---

## Prioritized Backlog Summary

| Story ID | Title | Phase | Priority |
|----------|-------|-------|----------|
| P1-11 | AI First Response — The "Dale Moment" | 1 | Critical |
| P1-1 | Account Creation | 1 | Critical |
| P2-1 | Start a Voice Recording | 2 | Critical |
| P2-5 | AI Transcription of Voice Log | 2 | Critical |
| P2-6 | AI Extraction — Parts, Cost, Time | 2 | Critical |
| P2-8 | AI Chat — Context-Aware Q&A | 2 | Critical |
| P3-3 | Watermark Application | 3 | Critical |
| P3-4 | One-Tap Instagram Publish | 3 | Critical |
| P3-8 | Subscription Tier — Free Experience | 3 | Critical |
| P3-11 | Watermark Drives New User Acquisition | 3 | Critical |
| P1-2 | Onboarding — Car Basics | 1 | Critical |
| P1-4 | Onboarding — Vision and Goals | 1 | High |
| P1-5 | Onboarding — Skill Level | 1 | High |
| P1-7 | Onboarding — Existing Work | 1 | High |
| P1-10 | Onboarding — Privacy Setting | 1 | High |
| P1-12 | Garage Home Screen | 1 | High |
| P2-4 | Offline Recording with Auto-Sync | 2 | Critical |
| P2-7 | Build Timeline View | 2 | High |
| P2-9 | Push Notification — AI Response Ready | 2 | High |
| P3-1 | Connect Instagram Account | 3 | Critical |
| P3-2 | AI-Generated Build Caption | 3 | Critical |
| P3-5 | Discovery Feed — Browse Public Builds | 3 | High |
| P3-9 | Subscription Upgrade — Chat Pro | 3 | High |
| P3-10 | Subscription Upgrade — Additional Projects | 3 | High |
| P1-3 | Onboarding — The Story | 1 | High |
| P1-6 | Onboarding — Budget and Timeline | 1 | High |
| P1-8 | Onboarding — Car Name | 1 | Medium |
| P1-9 | Onboarding — Initial AI Question | 1 | Medium |
| P2-2 | Pause and Resume Recording | 2 | High |
| P2-3 | Stop and Save Recording | 2 | Critical |
| P3-6 | Discovery Feed — Like a Build | 3 | Medium |
| P3-7 | Discovery Feed — Subscribe to a Builder | 3 | Medium |
| CX-1 | Error Handling and Graceful Degradation | All | High |
| CX-2 | iOS Performance Baseline | All | High |

---

## Open Questions for UX Researcher (RIP-4)

Once UX personas and wireframes are complete, this document should be updated to:

1. Validate persona assumptions against UX research findings
2. Incorporate wireframe flows into acceptance criteria detail
3. Add edge case flows identified in wireframe reviews
4. Refine story prioritization based on validated user pain points

---

## See Also

- [`mvp/scope.md`](./scope.md) — Phase definitions and definitions of done
- [`mvp/acceptance_criteria.md`](./acceptance_criteria.md) — Feature-level acceptance criteria
- [`product/user_journeys.md`](../product/user_journeys.md) — Persona definitions and core journeys
- [`product/features.md`](../product/features.md) — Subscription tiers and feature priority tiers
