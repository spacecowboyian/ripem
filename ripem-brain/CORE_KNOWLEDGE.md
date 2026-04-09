# RipEm Core Knowledge Index

This is the semantic hub for all RipEm knowledge. Agents should read this to understand the full landscape, then drill into specific directories.

## Essential Context

**What is RipEm?**
RipEm is an AI-powered platform for car enthusiasts to track, document, and share vehicle build projects. Think: "helpful mechanic in your pocket" that knows your car, your budget, your project history, and what thousands of others with the same car have done.

**Three User Entry Points**:
1. **Documenters** - Just want easy voice-based maintenance logging
2. **Sharers** - Want to publish builds; AI auto-creates posts/videos with watermark
3. **Learners** - Want to discover other builds and learn from community

**Core Features**:
1. **Voice-to-Log**: Transcribe and auto-extract parts, costs, time
2. **Intelligent AI Assistant**: Context-aware Q&A about YOUR specific car and project
3. **Build Publishing + Discovery**: Auto-watermarked content drives viral growth

---

## Knowledge Map

### Product Knowledge (`/product/`)
- What RipEm does and why it matters
- Feature specs and user journeys
- Design philosophy: honest, context-driven, community-first
- *Use case*: Agents building product, designing features, or explaining to users

### Business Knowledge (`/business/`)
- How RipEm makes money (freemium + ads)
- Market opportunity (15M+ car enthusiasts, $X TAM)
- Go-to-market strategy (seed power users in Facebook groups, viral watermark loop)
- Financial projections and investor Q&A
- *Use case*: Agents supporting fundraising, pricing decisions, or market analysis

### Technical Knowledge (`/technical/`)
- System architecture (mobile app, cloud backend, AI assistant layer)
- Tech stack decisions and rationale
- API specifications and data models
- AI prompting instructions (how the assistant thinks)
- *Use case*: Agents engineering the platform, designing APIs, or training models

### MVP Knowledge (`/mvp/`)
- Phase 1, 2, 3 scope (what ships when)
- Acceptance criteria per feature
- Timeline and milestones
- Success metrics and KPIs
- *Use case*: Agents managing development, tracking progress, prioritizing features

### Naming Knowledge (`/naming/`)
- Why "RipEm" (TikTok energy, RPM metaphor, "rip 'ems" social vibes)
- Naming brainstorm history and alternatives explored
- Brand guidelines (voice, tone, visual identity)
- *Use case*: Agents writing marketing copy, defining brand voice, or reviewing naming decisions

### Strategy Knowledge (`/strategy/`)
- Growth loops (watermark virality, community discovery, build sharing)
- User acquisition playbook (niche Facebook groups, influencer seeding)
- Retention mechanics (notifications, social features, community engagement)
- Competitive positioning and risk mitigation
- *Use case*: Agents optimizing growth, analyzing competition, or mitigating risks

### Content Library (`/content/`)
- Sample builds and project examples
- Marketing messaging and taglines
- Onboarding narratives
- FAQs
- *Use case*: Agents writing marketing, designing onboarding, or creating examples

### Glossary (`/glossary/`)
- Automotive terms (RPM, displacement, turbo, etc.)
- RipEm product terms (Build Blog, Watermark, etc.)
- Business terms (TAM, CAC, LTV, etc.)
- Technical terms (API, backend, transcription, etc.)
- *Use case*: Agents ensuring consistent terminology and understanding context

### Context & Evolution (`/context/`)
- Original brainstorm summary
- Key design decisions and rationale
- Core assumptions and hypotheses
- Open questions for future research
- *Use case*: Agents understanding "why" decisions were made and what still needs validation

---

## Agent Operating Instructions

1. **Discovery**: Start with README.md to orient yourself
2. **Deep Dive**: Navigate to the directory relevant to your task
3. **Reference**: Use /glossary/ for terminology
4. **Decisions**: Check /context/design_decisions.md to understand why things are the way they are
5. **Future Work**: Check /context/open_questions.md to identify gaps

---

## Critical Knowledge Nodes

### The Business Model
Free app with ad-supported monetization. Ads appear ONLY when searching for parts/tools—never in AI chat or project logs. Premium tier unlocks ad-free, direct social posting, and advanced analytics.

### The Growth Loop
1. User documents project via voice
2. AI extracts metadata and suggests publishing
3. User publishes build (auto-watermarked)
4. Watermark drives viewers back to app
5. Watermark + app virality loop creates network effect

### The AI Differentiation
RipEm's AI isn't generic ChatGPT. It's specialized:
- Understands automotive context (RPM, displacement, tuning)
- Knows user's specific car and project history
- References community consensus data ("10,000 other Civic owners did X")
- Speaks with confidence scoring (unsure answers are marked as such)
- Never sells (honest advice only)

### The Naming
"RipEm" captures:
- TikTok-style two-syllable rhythm ("rip 'ems")
- RPM energy (revolutions = progress momentum)
- Conversational vibes ("Did you see that build on RipEm?")
- Car culture native (no forced terminology)

---

## Quick Links
- Latest business plan: `/business/README.md`
- MVP scope: `/mvp/scope.md`
- Technical architecture: `/technical/architecture.md`
- Competitive analysis: `/strategy/competitive_analysis.md`
- Open questions: `/context/open_questions.md`
