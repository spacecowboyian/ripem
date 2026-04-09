# Open Questions

These are unresolved questions that require research, user validation, or decision-making before they can be answered. Check this list before starting work in any area.

---

## Product Questions

### OQ-P1: What is the right premium price point?
**Question**: What monthly/annual price is acceptable to car enthusiasts for the premium tier?
**Why it matters**: Pricing too high reduces conversion; pricing too low reduces LTV
**Research needed**: Price sensitivity survey with target users
**Owner**: TBD
**Priority**: High (needed before Phase 3)

### OQ-P2: Should we support motorcycles and trucks from launch?
**Question**: Should RipEm support non-car vehicles (motorcycles, trucks, SUVs) in the MVP?
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

---

## Business Questions

### OQ-B1: What is the actual conversion rate from watermark to install?
**Question**: When someone sees a RipEm watermark on social media, how often do they click through and install?
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
**Research needed**: Evaluate based on team skills and requirements
**Owner**: TBD
**Priority**: High (needed for Phase 1)

---

## See Also

- [assumptions.md](./assumptions.md)
- [design_decisions.md](./design_decisions.md)
