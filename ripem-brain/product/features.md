# Features

## Subscription Tiers

**Source**: RipEm MVP Technical Specification v1.0 (April 2025)

| Tier | Price | Key Features |
|------|-------|--------------|
| **Free** | $0 | 1 project, unlimited logs on that project, async AI responses, offline recording + sync, discovery feed, Instagram sharing (with watermark), ads shown |
| **Chat Pro** | $5-7/mo | Everything free + real-time voice chat (stretch goal), ad-free |
| **Projects Add-on** | $2/mo each | Additional projects beyond the 1 free |
| **Shop** | $20-50/mo | Unlimited projects, multi-user workspace (shop staff), higher storage, no ads, premium support |

iOS In-App Purchase (StoreKit). Subscription managed via `subscriptions` table.

---

## Feature Priority Tiers

### Tier 1 — Core MVP (8-Week Build)

| Feature | Description | Phase |
|---------|-------------|-------|
| Onboarding Questionnaire | 12-question "Car Buddy first meeting" flow | Phase 1 (Wk 1-2) |
| AI First Response | Personalized "Dale moment" after onboarding | Phase 1 (Wk 1-2) |
| Voice-to-Log | Record voice; Whisper transcription; AI contextual response | Phase 2 (Wk 3-4) |
| Offline Sync | Record offline; sync to server when online | Phase 2 (Wk 3-4) |
| AI Garage Brain | AI has full context of project history and questionnaire | Phase 1-2 |
| Instagram Auto-Share | AI-generated caption; one-tap publish; watermark | Phase 3 (Wk 5-8) |
| Discovery Feed | Browse public builds; subscribe; like | Phase 3 (Wk 5-8) |
| Subscription Management | Free/Chat Pro/Projects/Shop via In-App Purchase | Phase 3 (Wk 5-8) |

### Tier 2 — Growth (Post-MVP)

| Feature | Description |
|---------|-------------|
| Social Sharing (TikTok/YouTube) | Direct share beyond Instagram |
| Build Analytics | Views, engagement, follower stats |
| Community Q&A | Community-sourced answers |
| Real-time Voice Chat | Streaming AI chat (Chat Pro) |

### Tier 3 — Premium / Future

| Feature | Description |
|---------|-------------|
| Ad-Free Experience | No ads (Chat Pro + Shop) |
| Export Tools | Export build logs as PDF, CSV |
| Mechanic Shop Mode | Multi-user workspace (Shop tier) |
| Web App (Full) | Full-featured web access |
| Video Auto-Generation | AI auto-edits photos into video with narration |

---

## Post-MVP Roadmap

| Feature | Description |
|---------|-------------|
| TikTok/YouTube publishing | Phase 2 |
| Collaborative projects | Multiple users on same vehicle |
| Part marketplace integration | eBay, Amazon, specialty vendors |
| Cost analytics & budget forecasting | Total project cost tracking |
| Mobile-first offline mode | Full access without internet |
| Mechanics shop integration | Share history with repair providers |
| AR visualization | Visualize parts before purchase |

---

## Feature Constraints

- Ads appear ONLY in Tier 1 free experience — never interrupt AI chat or logs
- Watermark is applied automatically; cannot be removed on free tier
- Voice transcription works offline for core logging (local recording, sync when online)
- Instagram requires OAuth approval — apply early, have clipboard fallback

## See Also

- [acceptance_criteria.md](../mvp/acceptance_criteria.md)
- [/mvp/scope.md](../mvp/scope.md)
- [/technical/architecture.md](../technical/architecture.md)
