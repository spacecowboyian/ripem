# Risk Analysis

## Risk Register

### R1: Cold-Start Problem (HIGH PROBABILITY, HIGH IMPACT)
**Risk**: Without existing builds in the app, new users find an empty community with nothing to discover.

**Mitigation**:
- Seed 20–50 power builders before public launch (see [user_acquisition.md](./user_acquisition.md))
- Import / recreate existing builds for beta users
- Consider allowing retrospective logging (past builds)

---

### R2: AI Cost Scaling (MEDIUM PROBABILITY, HIGH IMPACT)
**Risk**: AI API costs (transcription + chat + extraction) scale with usage and could exceed revenue at early user numbers.

**Mitigation**:
- Monitor cost per MAU from Day 1
- Set rate limits on free tier AI usage
- Cache common responses where appropriate
- Evaluate on-device options (Apple Speech for transcription)

---

### R3: Apple App Store Dependency (LOW PROBABILITY, HIGH IMPACT)
**Risk**: App Store policy changes, rejection, or removal could cut off primary distribution channel.

**Mitigation**:
- Maintain web experience as a secondary channel
- Follow App Store guidelines strictly
- No features that violate Apple's policies (e.g., alternative payment)

---

### R4: Voice Transcription Accuracy (MEDIUM PROBABILITY, MEDIUM IMPACT)
**Risk**: Automotive terminology (part names, brands, model numbers) transcribed incorrectly, leading to bad data.

**Mitigation**:
- Fine-tune transcription model on automotive vocabulary
- Always allow user to edit extracted data before saving
- Accept feedback on bad extractions to improve model

---

### R5: User Data Privacy (LOW PROBABILITY, HIGH IMPACT)
**Risk**: Build data, location data, and purchase history are sensitive. A breach would damage trust catastrophically.

**Mitigation**:
- Encrypt all data at rest and in transit
- Minimize data collection (collect only what's needed)
- GDPR and CCPA compliance from Day 1
- Regular security audits

---

### R6: Competition from Big Tech (LOW PROBABILITY, HIGH IMPACT)
**Risk**: Google, Apple, or a well-funded startup builds a competing product.

**Mitigation**:
- Move fast; build community lock-in before competition arrives
- Data flywheel moat (build history is hard to migrate)
- Community and social graph are sticky

---

## Risk Priority Matrix

| Risk | Probability | Impact | Priority |
|------|------------|--------|----------|
| Cold-start problem | High | High | 🔴 Critical |
| AI cost scaling | Medium | High | 🟠 High |
| Transcription accuracy | Medium | Medium | 🟡 Medium |
| App Store dependency | Low | High | 🟡 Medium |
| User data privacy | Low | High | 🟡 Medium |
| Big tech competition | Low | High | 🟢 Monitor |

## See Also

- [competitive_analysis.md](./competitive_analysis.md)
- [/context/open_questions.md](../context/open_questions.md)
