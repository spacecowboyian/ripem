# Tech Stack

## iOS

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | Swift | Native iOS, best performance |
| UI Framework | SwiftUI | Modern declarative UI, Apple-recommended |
| Async | async/await | Native Swift concurrency |
| Networking | URLSession / async | Standard, no unnecessary dependencies |
| Local storage | CoreData or SwiftData | Apple-native persistence |
| Voice capture | AVFoundation | Native audio recording |
| Offline sync | TBD | Requires evaluation |

> **Note**: The original business plan proposed React Native (iOS/Android cross-platform). The current decision (DD-001) is iOS-first with SwiftUI for superior native audio/camera quality. React Native remains an option to revisit if Android support becomes a priority. See [/context/design_decisions.md](../context/design_decisions.md).

## Backend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | TBD | To be decided — Node.js or Python (FastAPI) are primary candidates |
| API style | REST over HTTPS | Simple, widely supported |
| Auth | JWT / Bearer token | Stateless, standard |
| Database | TBD — PostgreSQL preferred | Structured data; strong relational model for builds/parts/sessions |
| Media storage | TBD (S3-compatible) | Scalable object storage |
| Vector database | TBD | For semantic search and AI context retrieval at scale |

## AI Layer

| Capability | Technology | Rationale |
|------------|-----------|-----------|
| Voice transcription | Whisper (OpenAI) or Apple Speech | Accuracy on automotive terminology |
| AI Q&A / Chat | Claude (Anthropic) primary; OpenAI as fallback | Context-aware conversation; cost/redundancy |
| Data extraction | LLM with structured output | Parts, costs, time from voice logs |
| Content generation | LLM | Auto-format build posts |
| Video processing | FFmpeg | Auto-edit photos into video with narration |

## Decisions Pending

- Backend language and framework (Node.js vs. Python/FastAPI)
- Database technology (PostgreSQL preferred; confirm)
- AI vendor (Claude primary; OpenAI secondary — confirm)
- Offline sync strategy
- Vector database selection for semantic search

> Record decisions as they are made in [/context/design_decisions.md](../context/design_decisions.md)

## See Also

- [architecture.md](./architecture.md)
- [infrastructure.md](./infrastructure.md)
