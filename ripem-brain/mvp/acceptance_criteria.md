# Acceptance Criteria

## Phase 1 Features

### Voice Session Recording
- [ ] User can tap "Record Session" and speak freely
- [ ] Recording works without internet connectivity
- [ ] Recording can be paused and resumed
- [ ] Audio is saved locally and synced when online
- [ ] User can replay the recording

### AI Transcription
- [ ] Transcript is generated within 30 seconds of session end (when online)
- [ ] Transcription accuracy is ≥ 90% for standard speech
- [ ] Automotive terminology is correctly transcribed (e.g., "KYB", "coilovers", "struts")

### AI Extraction (Parts, Cost, Time)
- [ ] Parts mentioned in transcript are extracted with name and brand
- [ ] Cost figures are extracted with currency
- [ ] Time spent is extracted in hours/minutes
- [ ] User can edit any extracted field before saving
- [ ] Extraction completes within 15 seconds of transcription

### Build Timeline
- [ ] Sessions displayed in reverse-chronological order
- [ ] Each session shows: date, summary, part count, time, cost
- [ ] User can tap a session to view detail
- [ ] Timeline loads within 2 seconds for up to 100 sessions

---

## Phase 2 Features

### AI Chat
- [ ] User can ask a question in natural language
- [ ] Response references user's vehicle (year/make/model)
- [ ] Response references prior logged parts when relevant
- [ ] Confidence score (High / Medium / Low) is displayed with every recommendation
- [ ] Response time is under 10 seconds for 95th percentile

---

## Phase 3 Features

### Build Publishing
- [ ] User can publish a build with one tap
- [ ] AI generates title and description automatically
- [ ] Watermark is applied to all published media
- [ ] Published build is visible to other users on the discovery feed
- [ ] User cannot remove watermark on free tier

---

## Definition of Done (All Features)
- Feature works on iPhone 12 or later running iOS 16+
- No crashes during happy path
- Error states are handled gracefully (no blank screens)
- Tested by at least one person who is not the developer
