# Tech Stack

## iOS

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | Swift | Native iOS, best performance |
| UI Framework | SwiftUI | Modern declarative UI, Apple-recommended |
| Async | Combine + async/await | Native Swift concurrency |
| Networking | URLSession | Standard, no unnecessary dependencies |
| Local storage | SQLite (via SQLite.swift) | Offline-first sync; lighter than CoreData for this use case |
| Voice capture | AVFoundation | Native audio recording (16kHz mono M4A for Whisper) |
| Offline sync | Custom SyncService (Reachability-triggered) | See [ios_architecture.md](./ios_architecture.md) |
| Architecture | MVVM + Redux-style AppStore | Clean separation; see [ios_architecture.md](./ios_architecture.md) |
| Min iOS | iOS 15.0 | |

> **Decision**: iOS-first with SwiftUI for superior native audio/camera quality. React Native remains an option if Android support becomes a priority.

## Backend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | **Node.js + TypeScript** | Type safety across API contracts; excellent async I/O for voice upload pipeline; npm ecosystem for OpenRouter/Whisper; strong match with iOS-team JS/TS familiarity; see DD-006 |
| Framework | **Express** | Minimal, well-understood, fast to iterate; avoids framework overhead in MVP phase |
| API style | REST over HTTPS | Simple, widely supported |
| Auth | JWT / Bearer token | Stateless, standard; refresh tokens with 3600s expiry |
| Database | **PostgreSQL on Railway** | Relational model; JSONB for AI context; vector-ready; Railway-managed removes ops overhead; see DD-007 |
| Media storage | AWS S3 (presigned URLs) | Scalable object storage; no direct client access |
| Background jobs | **Node.js worker threads / BullMQ (Redis)** | Async voice→Whisper→AI pipeline; decoupled from HTTP request cycle |

## AI Layer

| Capability | Technology | Notes |
|------------|-----------|-------|
| Voice transcription | Whisper API (OpenAI) | Accuracy on automotive terminology; 16kHz mono input |
| LLM (all calls) | OpenRouter → Claude | All LLM calls route through OpenRouter |
| Instagram caption generation | OpenRouter → Claude | ~300 tokens per share |
| Onboarding AI response | OpenRouter → Claude | ~1000 tokens per user (one-time) |
| Voice log AI responses | OpenRouter → Claude | ~500 input + ~400 output per log |
| Real-time chat (premium) | OpenRouter → Claude (streaming) | Chat Pro tier only |

**Token Cost Strategy**:
- Free tier capped at ~10 logs/month
- Track every call in `ai_token_usage` table
- Ads cover free tier LLM costs
- Premium subscriptions ($5-7/mo) cover Chat Pro usage

## Frontend (Web — Secondary)

| Layer | Technology |
|-------|-----------|
| Framework | React / TypeScript |
| Purpose | Web access to garage + AI chat (secondary to iOS MVP) |

## Authentication

| Provider | Method |
|----------|--------|
| Email/Password | bcrypt hash |
| Google OAuth | id_token exchange |
| Apple OAuth | identity_token + user_identifier |

## Decisions Confirmed (Updated)

- **Backend language**: Node.js + TypeScript + Express (DD-006)
- **Hosting**: Railway for MVP — API, PostgreSQL, Redis all on one platform (DD-007)
- **LLM provider**: OpenRouter (all Claude calls) — not direct Anthropic
- **Transcription**: Whisper API (OpenAI) — not Apple on-device Speech
- **iOS architecture**: SwiftUI + MVVM + SQLite offline-first
- **Storage**: AWS S3 with presigned URLs
- **Database**: PostgreSQL on Railway

## Decisions Pending

- Vector database for semantic search (post-MVP)
- CDN provider for photo delivery (CloudFront or Railway CDN — decide at Phase 3)

## See Also

- [architecture.md](./architecture.md)
- [ios_architecture.md](./ios_architecture.md)
- [/context/design_decisions.md](../context/design_decisions.md)
- [infrastructure.md](./infrastructure.md)
