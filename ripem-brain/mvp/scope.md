# MVP Scope

## Phase 1 — Core Logging Loop

**Goal**: Prove that car enthusiasts will use RipEm to log their builds.

**Features**:
- [ ] User account creation (email + password)
- [ ] Add vehicle (year / make / model / trim)
- [ ] Voice session recording (offline-capable)
- [ ] AI transcription of voice to text
- [ ] AI extraction: parts, cost, time from transcript
- [ ] Manual edit of extracted data
- [ ] Build timeline view (chronological session list)
- [ ] Session detail view (transcript + extracted parts)

**Out of scope for Phase 1**:
- Publishing / sharing
- Community features
- Parts search / ads
- AI Q&A assistant

---

## Phase 2 — AI Assistant

**Goal**: Validate that the AI assistant provides genuine value over generic ChatGPT.

**Features**:
- [ ] AI chat interface (vehicle-scoped)
- [ ] System prompt with vehicle + session context
- [ ] Confidence scoring on AI responses
- [ ] Community data integration ("X other owners did this")
- [ ] Session-linked Q&A (ask about a specific session)

**Out of scope for Phase 2**:
- Publishing / sharing
- Community features
- Parts search / ads

---

## Phase 3 — Publishing + Growth Loop

**Goal**: Activate the viral watermark growth loop.

**Features**:
- [ ] Publish build (AI auto-formats content)
- [ ] Auto-watermark on published content
- [ ] Public build discovery feed
- [ ] Build search
- [ ] Social sharing (link to TikTok, Instagram, etc.)
- [ ] Parts search with ad-supported results

---

## Scope Rules

1. Each phase must be independently testable with real users
2. A feature does not ship until its acceptance criteria pass (see [acceptance_criteria.md](./acceptance_criteria.md))
3. No Phase 2 features begin until Phase 1 is validated
