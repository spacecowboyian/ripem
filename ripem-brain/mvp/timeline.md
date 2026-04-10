# MVP Timeline

**Source**: RiPeM MVP Technical Specification v1.0 (April 2025)

## 8-Week Build Plan

| Phase | Weeks | Focus | Deliverables |
|-------|-------|-------|--------------|
| Phase 1 | 1-2 | Onboarding + AI Garage Brain | iOS questionnaire flow (12 screens), first AI response, garage/project APIs |
| Phase 2 | 3-4 | Voice Logging + AI Responses | Voice recording UI, Whisper integration, offline sync, log entry APIs |
| Phase 3 | 5-8 | Instagram + Discovery + Subscriptions | Instagram publish, watermark, discovery feed, subscription management |

---

## Phase 1 — Weeks 1-2

| Task | Who |
|------|-----|
| iOS: Welcome + questionnaire screens (1-12) | iOS dev |
| Backend: Auth endpoints (register, login, OAuth) | Backend dev |
| Backend: Garage + Project create endpoints | Backend dev |
| Backend: First AI response (OpenRouter/Claude) | Backend + AI |
| Database: users, garages, projects, questionnaire_responses | Backend dev |

**TestFlight target**: End of Week 2

**Success Gate**: 70%+ questionnaire completion in beta

---

## Phase 2 — Weeks 3-4

| Task | Who |
|------|-----|
| iOS: RecordEntryView (AVFoundation, 16kHz M4A) | iOS dev |
| iOS: DatabaseService (SQLite) + SyncService | iOS dev |
| Backend: POST /log/create (S3 + Whisper + AI) | Backend dev |
| Backend: GET /ai/chat/{id}/response (async poll) | Backend dev |
| Backend: Push notifications (AI response ready) | Backend dev |
| Database: log_entries, ai_token_usage | Backend dev |

**Success Gate**: 99%+ sync reliability; users log 3+ entries

---

## Phase 3 — Weeks 5-8

| Task | Who |
|------|-----|
| iOS: Instagram OAuth flow | iOS dev |
| iOS: Caption preview + edit screen | iOS dev |
| iOS: Discovery feed (swipeable) | iOS dev |
| iOS: In-App Purchase (Chat Pro, Projects) | iOS dev |
| Backend: Instagram share endpoints | Backend dev |
| Backend: Discovery feed + subscribe/like | Backend dev |
| Backend: Subscription management | Backend dev |
| Database: instagram_posts, discovery_feed, subscriptions | Backend dev |

**App Store launch target**: Week 8

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| Phase 1 TestFlight beta | Week 2 | Not started |
| Phase 2 internal build | Week 4 | Not started |
| Phase 3 TestFlight beta | Week 6 | Not started |
| App Store submission | Week 7 | Not started |
| **Launch** | **Week 8** | **Not started** |

---

## Post-Launch Priorities (Week 9+)

1. Iterate onboarding based on drop-off data
2. Improve AI responses based on user feedback
3. Scale infrastructure if traffic grows
4. Add real-time chat if Chat Pro demand is high
5. Add web app if iOS is successful
6. Test questionnaire length (8 vs. 12 questions) to optimize completion rate

---

## Notes

- App Store review adds ~1-3 days per submission; submit by Week 7
- Instagram API approval — apply early; have clipboard fallback if rejected
- Offline sync conflict resolution needs early design (not last-minute)

## See Also

- [scope.md](./scope.md)
- [/technical/architecture.md](../technical/architecture.md)
- [success_metrics.md](./success_metrics.md)
