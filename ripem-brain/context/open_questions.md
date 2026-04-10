# Open Questions

These are unresolved questions that require research, user validation, or decision-making before they can be answered. Check this list before starting work in any area.

---

## Product Questions

### OQ-P1: What is the right premium price point?
**Question**: What monthly/annual price is acceptable to car enthusiasts for the premium tier?
**Why it matters**: Pricing too high reduces conversion; pricing too low reduces LTV. Current range: $4.99–9.99/month.
**Research needed**: Price sensitivity survey with target users
**Owner**: TBD
**Priority**: High (needed before Phase 3)

### OQ-P2: Should we support motorcycles and trucks from launch?
**Question**: Should RiPeM support non-car vehicles (motorcycles, trucks, SUVs) in the MVP?
**Why it matters**: Expands TAM but adds complexity to AI training data and UI
**Research needed**: Survey potential users to understand vehicle distribution
**Owner**: TBD
**Priority**: Medium

### OQ-P3: What is the minimum viable AI quality threshold?
**Question**: How accurate does voice extraction need to be before users find it valuable vs. frustrating?
**Why it matters**: Poor extraction could kill retention before we can improve it
**Research needed**: Prototype testing with real voice sessions
**Owner**: TBD
**Priority**: High (needed before Phase 1 launch)

### OQ-P4: Offline-first vs. sync-based?
**Question**: Should the app work fully offline (local-first with sync), or require regular connectivity?
**Why it matters**: Offline-first requires more complex engineering; always-online is simpler but limits garage use
**Research needed**: Survey target users on garage connectivity; evaluate engineering tradeoffs
**Owner**: TBD
**Priority**: High (needed before Phase 1 architecture)

### OQ-P5: Multi-vehicle support in MVP?
**Question**: How important is managing multiple cars for MVP? Or launch with one vehicle per user?
**Why it matters**: Single-vehicle keeps MVP simpler; multi-vehicle is important for Restorer and Creator personas
**Research needed**: User research on how many vehicles typical target users actively work on
**Owner**: TBD
**Priority**: Medium

### OQ-P6: Video publishing at MVP or post-MVP?
**Question**: How critical is auto-generated video for launch? Or text + photos only?
**Why it matters**: Video generation adds complexity and cost (FFmpeg, storage); may be critical for virality
**Research needed**: Evaluate cost and effort of video generation; test if photo + text posts perform adequately
**Owner**: TBD
**Priority**: Medium

---

## Business Questions

### OQ-B1: What is the actual conversion rate from watermark to install?
**Question**: When someone sees a RiPeM watermark on social media, how often do they click through and install?
**Why it matters**: The entire growth model depends on this working
**Research needed**: A/B test different watermark designs and CTAs; track attribution
**Owner**: TBD
**Priority**: High (measure from Phase 3 launch)

### OQ-B2: What is the sustainable AI cost per MAU?
**Question**: At scale, what is the AI API cost per monthly active user, and can it be covered by ad revenue + premium subscriptions?
**Why it matters**: AI costs could make the unit economics unworkable
**Research needed**: Model based on average session count + AI call volume
**Owner**: TBD
**Priority**: High (needed before Phase 2 launch)

### OQ-B3: When to introduce premium features?
**Question**: Should premium be available at launch or after proving traction?
**Why it matters**: Too early may hurt conversion trust; too late loses early revenue
**Research needed**: Evaluate competitive precedents; test with beta users
**Owner**: TBD
**Priority**: Medium

### OQ-B4: Community moderation model?
**Question**: Who moderates published content — users, AI flagging, manual review?
**Why it matters**: Community trust and safety requires clear moderation; cost and scale must be considered
**Research needed**: Evaluate AI moderation tools; define policy framework
**Owner**: TBD
**Priority**: Medium (before Phase 3)

### OQ-B5: Data privacy for AI training?
**Question**: What is the scope for opt-in data sharing for training the platform's AI models?
**Why it matters**: More data = smarter AI; privacy is a trust issue; legal compliance required
**Research needed**: Legal review; user survey on willingness to share anonymized data
**Owner**: TBD
**Priority**: Medium

### OQ-B6: Geographical focus?
**Question**: Focus on North America first, or global from day one?
**Why it matters**: North America has the largest enthusiast TAM; global adds complexity and localization cost
**Research needed**: Evaluate App Store data on car enthusiast app downloads by geography
**Owner**: TBD
**Priority**: Low (Phase 3+)

---

## Technical Questions

### OQ-T1: On-device vs. cloud transcription?
**Question**: Should voice transcription happen on-device (Apple Speech) or via cloud API (Whisper)?
**Why it matters**: On-device is faster and cheaper but may be less accurate for automotive terms
**Research needed**: Accuracy benchmark on automotive vocabulary
**Owner**: TBD
**Priority**: High (needed for Phase 1)

### OQ-T2: Which backend stack?
**Question**: What language, framework, and database should the backend use?
**Why it matters**: This affects development speed, cost, and long-term maintainability
**Research needed**: Evaluate based on team skills and requirements; options include Node.js, Python/FastAPI; PostgreSQL vs. document DB
**Owner**: TBD
**Priority**: High (needed for Phase 1)

### OQ-T3: Storage and video budget?
**Question**: What is the per-user budget for unlimited photo/video storage?
**Why it matters**: Unlimited storage is a key free-tier promise; costs must be sustainable
**Research needed**: Model expected storage per user (photos/video per session, avg. sessions/month)
**Owner**: TBD
**Priority**: High (needed for Phase 1 architecture)

### OQ-T4: AI context size limit?
**Question**: How much project history should the AI assistant have access to per conversation?
**Why it matters**: More context = better answers but higher cost and latency; token limits apply
**Research needed**: Evaluate LLM token costs; design context summarization strategy
**Owner**: TBD
**Priority**: High (needed for Phase 2)

### OQ-T5: Scaling plan for Year 1?
**Question**: What is the expected infrastructure load at 25K and 100K users?
**Why it matters**: Infrastructure decisions made at Phase 1 must scale to Phase 3 without full rebuild
**Research needed**: Model expected MAU, sessions/user, AI calls/user, storage/user
**Owner**: TBD
**Priority**: Medium

---

## See Also

- [assumptions.md](./assumptions.md)
- [design_decisions.md](./design_decisions.md)
