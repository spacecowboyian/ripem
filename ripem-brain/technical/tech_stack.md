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
| Language | TBD (Node.js or Python/FastAPI) | Agent-decided; both are primary candidates |
| API style | REST over HTTPS | Simple, widely supported |
| Auth | JWT / Bearer token | Stateless, standard |
| Database | PostgreSQL (recommended) | Relational model; JSONB for AI context; vector-ready |
| Media storage | AWS S3 (presigned URLs) | Scalable object storage; no direct client access |

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

## Decisions Confirmed

- **LLM provider**: OpenRouter (all Claude calls) — not direct Anthropic
- **Transcription**: Whisper API (OpenAI) — not Apple on-device Speech
- **iOS architecture**: SwiftUI + MVVM + SQLite offline-first
- **Storage**: AWS S3 with presigned URLs
- **Database**: PostgreSQL recommended (confirm before implementation)

## Decisions Pending

- Backend language and framework (Node.js vs. Python/FastAPI)
- Hosting provider (Vercel mentioned; Railway/Render also viable for MVP)
- Vector database for semantic search (post-MVP)

## See Also

- [architecture.md](./architecture.md)
- [ios_architecture.md](./ios_architecture.md)
- [/context/design_decisions.md](../context/design_decisions.md)
- [infrastructure.md](./infrastructure.md)
