# Design Decisions

This document records key decisions made during RipEm's design and development. For each decision: what was decided, why, and what was considered but rejected.

---

## DD-001: iOS First

**Decision**: RipEm is iOS-first. The web experience is secondary.

**Rationale**:
- Target users (car enthusiasts) are predominantly on mobile
- Voice recording and camera integration are native iOS strengths
- Focus on one platform enables faster, higher-quality execution
- Web can be added later without changing the core product

**Alternatives considered**: Cross-platform (React Native, Flutter) — rejected due to reduced native audio/camera quality.

**Date**: Project inception

---

## DD-002: Voice-First Logging

**Decision**: The primary input method for session logging is voice, not text.

**Rationale**:
- Target use case: user in a garage with dirty hands, just finished a session
- Typing is slow and friction-heavy in this context
- Voice is natural and fast — "talk about what you just did"
- AI extraction handles structuring the unstructured input

**Alternatives considered**: Photo-first, text-first — both rejected as secondary inputs, not primary.

**Date**: Project inception

---

## DD-003: Ads Only in Parts Search

**Decision**: Advertising is restricted exclusively to the parts/tools search context. No ads in AI chat, build logs, or community feeds.

**Rationale**:
- Trust is the core asset. Ads in the AI would destroy the "honest mechanic" persona.
- Parts search is contextually appropriate for commercial content
- Users expect sponsored results when searching for products

**Alternatives considered**: Ads in community feed — rejected as too intrusive and trust-destroying.

**Date**: Business model definition

---

## DD-004: Watermark on Free Tier

**Decision**: All published content from free-tier users carries a RipEm watermark that cannot be removed.

**Rationale**:
- The watermark is the primary viral growth mechanism
- Every published build becomes organic marketing
- This is industry standard (Canva, CapCut, etc.)
- Premium users can disable the watermark

**Alternatives considered**: Opt-in watermark — rejected because viral coefficient depends on consistent presence.

**Date**: Business model definition

---

## DD-005: Confidence Scoring in AI

**Decision**: All AI recommendations include a confidence score (High / Medium / Low).

**Rationale**:
- Honest AI is a core brand value
- Users need to know when to trust the AI and when to verify independently
- Automotive advice can have safety implications — uncertainty must be disclosed

**Alternatives considered**: No confidence score — rejected due to trust and safety concerns.

**Date**: AI design phase

---

> Add new decisions as they are made. Format: DD-[sequential number], title, decision, rationale, alternatives, date.
