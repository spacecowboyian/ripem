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

## Backend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | TBD | To be decided |
| API style | REST over HTTPS | Simple, widely supported |
| Auth | JWT / Bearer token | Stateless, standard |
| Database | TBD | To be decided |
| Media storage | TBD (S3-compatible) | Scalable object storage |

## AI Layer

| Capability | Technology | Rationale |
|------------|-----------|-----------|
| Voice transcription | Whisper (OpenAI) or Apple Speech | Accuracy on automotive terminology |
| AI Q&A / Chat | LLM (GPT-4 class or similar) | Context-aware conversation |
| Data extraction | LLM with structured output | Parts, costs, time from voice logs |
| Content generation | LLM | Auto-format build posts |

## Decisions Pending

- Backend language and framework
- Database technology (relational vs. document)
- AI vendor (OpenAI, Anthropic, self-hosted)
- Offline sync strategy

> Record decisions as they are made in [/context/design_decisions.md](../context/design_decisions.md)

## See Also

- [architecture.md](./architecture.md)
- [infrastructure.md](./infrastructure.md)
