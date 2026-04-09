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

## DD-006: Backend Language and Framework — Node.js + TypeScript + Express

**Decision**: The RipEm backend is built with Node.js, TypeScript, and Express.

**Rationale**:
- TypeScript provides type safety across API contracts, reducing integration bugs between iOS and backend
- Node.js's non-blocking I/O model is well-suited for the voice upload pipeline (upload to S3 → Whisper → OpenRouter — all async, IO-bound)
- npm ecosystem provides mature SDKs for OpenAI Whisper, AWS S3, and OAuth
- TypeScript is widely familiar to the iOS team (Swift/TypeScript interop for shared contract definitions)
- Express is minimal and well-understood; avoids unnecessary framework overhead in an MVP phase where iteration speed matters
- BullMQ (Redis-backed job queue) integrates cleanly in the Node ecosystem for async background jobs

**Alternatives considered**:
- Python/FastAPI — excellent for AI-heavy projects, but introduces language context switching overhead for a team likely anchored in JS/TS; also slower npm toolchain integration
- NestJS — more structured than Express but heavier initial setup for an 8-week MVP

**Date**: 2026-04-09

---

## DD-007: Hosting Provider — Railway

**Decision**: RipEm infrastructure is hosted on Railway for the MVP (API + PostgreSQL + Redis).

**Rationale**:
- Railway natively manages PostgreSQL and Redis alongside the API service — single platform reduces ops context switching for a small team
- Zero-config deployment from GitHub; aligns with our GitHub Actions CI/CD plan
- Significantly lower ops overhead than AWS (no VPC, IAM, RDS, ElastiCache configuration at MVP stage)
- Railway pricing is predictable and cost-effective for early-stage traffic
- Post-launch migration path to AWS is well-defined if traffic demands it

**Alternatives considered**:
- Vercel — optimized for serverless/Next.js; does not support long-running Node processes or background job workers cleanly; not suited for BullMQ/Redis worker pattern
- Render — viable, but Railway has stronger PostgreSQL+Redis native integration and simpler multi-service orchestration
- AWS (EC2 + RDS) — correct scale-out choice but adds weeks of infrastructure overhead at MVP stage

**Date**: 2026-04-09

---

## DD-008: Token-Usage Throttling for Agent Task Dispatch

**Decision**: Implement a 5,000-token threshold guardrail: when any agent task is in-flight and has consumed (or is estimated to consume) more than 5,000 tokens, no new agent tasks are dispatched until that large task completes.

**Rationale**:
- Running many concurrent agent tasks compounds token usage exponentially (context sharing, tool calls)
- A single large task (e.g., complex codebase investigation, large document synthesis) can consume >5K tokens; stacking another on top doubles costs unnecessarily
- Throttling at the scheduler/runtime level keeps individual agents simple — they don't need per-task token accounting
- Non-destructive: already-running tasks are never interrupted, only new dispatches are held

**Implementation**:
- Each agent's `runtimeConfig.heartbeat.tokenThrottleLimit` is set to `5000`
- Agent instructions enforce behavioral check: before checkout of any new task, verify no in-progress task is a known large task
- Future: Paperclip scheduler can enforce this natively using run token telemetry from `ai_token_usage` table

**Alternatives considered**:
- Per-user token caps (RipEm product level) — separate concern; addressed in free-tier monthly limits
- Reducing agent concurrent runs to 1 (already set via `maxConcurrentRuns: 1`) — helps but doesn't prevent sequential large tasks from stacking
- Hard token limits per run — too restrictive; would interrupt valid long-running tasks mid-execution

**Date**: 2026-04-09

---

> Add new decisions as they are made. Format: DD-[sequential number], title, decision, rationale, alternatives, date.
