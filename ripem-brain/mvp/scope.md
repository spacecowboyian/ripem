# MVP Scope

## 8-Week Phased Launch Plan

**Source**: RiPeM MVP Technical Specification v1.0 (April 2025)

---

## Phase 1 — Weeks 1-2: Onboarding + AI Garage Brain

**Goal**: User completes questionnaire, meets their AI buddy, feels "This app gets me."

**iOS Screens**:
- Screens 1-12 (questionnaire flow — see [/product/user_journeys.md](../product/user_journeys.md))
- Welcome → Car basics → Story → Vision → Skill level → Budget/timeline → Completed work → Car name → Jam → Question for AI → Privacy setting → Summary + First AI Response

**Backend**:
- `POST /auth/register`, `POST /auth/login`, Google+Apple OAuth
- `POST /garage/create`, `POST /project/create`
- `POST /ai/chat` (first response only)

**Database Tables**:
- `users`, `garages`, `projects`, `questionnaire_responses`, `ai_conversations`

**Definition of Done**:
- [ ] User can answer 12 questions in <10 minutes
- [ ] Onboarding completes with personalized AI first response
- [ ] First response references car name, story, and vision
- [ ] 70%+ questionnaire completion rate in beta

---

## Phase 2 — Weeks 3-4: Voice Logging + AI Responses

**Goal**: Core loop functional — user logs voice entries, AI responds with context.

**iOS**:
- `RecordEntryView` with AVFoundation (16kHz mono M4A)
- Offline recording → local SQLite → SyncService → upload when online
- Push notification when AI response is ready

**Backend**:
- `POST /log/create` (voice upload → S3 → Whisper → AI → store)
- `GET /ai/chat/{conversation_id}/response` (async poll)

**Database Tables**:
- `log_entries`, `ai_token_usage`

**Definition of Done**:
- [ ] User can record voice offline
- [ ] Sync happens reliably when online (target 99%+)
- [ ] Whisper transcription is accurate
- [ ] AI response reads garage brain (not generic)
- [ ] Users average 3+ voice logs

---

## Phase 3 — Weeks 5-8: Instagram + Discovery Feed + Subscriptions

**Goal**: Growth loop active — watermark drives new user acquisition.

**iOS**:
- Instagram OAuth + one-tap publish
- Caption preview + edit screen
- Discovery feed (swipeable TikTok-style)
- In-App Purchase for Chat Pro + Projects add-on

**Backend**:
- `POST /share/instagram/preview`, `POST /share/instagram/publish`
- `GET /feed/discovery`, `POST /feed/subscribe`, `POST /feed/like`
- `GET /subscription/status`, `POST /subscription/upgrade`

**Database Tables**:
- `instagram_posts`, `discovery_feed`, `discovery_feed_items`, `subscriptions`

**Definition of Done**:
- [ ] AI caption is well-written and auto-generated
- [ ] One-tap Instagram publish works
- [ ] Watermark visible and URL clickable in posts
- [ ] New users arrive via watermark (trackable)
- [ ] Discovery feed shows relevant builds
- [ ] Subscription tier unlock works (free → Chat Pro)

---

## What Is NOT in MVP

- Real-time voice chat (Chat Pro stretch goal, not guaranteed)
- Video generation
- TikTok/YouTube Shorts publishing
- Web app fully featured
- Advanced analytics dashboard
- Mechanics certification
- Shop inventory management
- Parts affiliate marketplace
- Community Q&A
- Collaborative projects

---

## Scope Rules

1. Each phase must be independently testable with real users
2. Features do not ship until acceptance criteria pass (see [acceptance_criteria.md](./acceptance_criteria.md))
3. Phase 2 does not begin until Phase 1 is validated with real users
4. Do not build features outside the timeline

## See Also

- [timeline.md](./timeline.md)
- [acceptance_criteria.md](./acceptance_criteria.md)
- [/technical/architecture.md](../technical/architecture.md)
