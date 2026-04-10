# Infrastructure

## Environments

| Environment | Purpose | Notes |
|-------------|---------|-------|
| Development | Local development | Each engineer runs locally |
| Staging | Pre-production testing | Mirrors production config |
| Production | Live app | iOS App Store + web |

## Hosting

**Decision**: **Railway** (DD-007)

- API server: Railway service (Node.js + TypeScript + Express)
- Database: Railway-managed PostgreSQL
- Job queue: Railway-managed Redis (BullMQ)
- All environments (dev, staging, prod) on Railway
- Scale-out path: migrate to AWS if required post-launch

Alternatives evaluated: Vercel (optimized for Next.js/serverless, not long-running Node processes or background job workers), Render (similar to Railway but Railway has better PostgreSQL+Redis native support), AWS (overkill ops complexity for MVP stage).

## Media Storage

- **AWS S3**: Voice recordings, build photos
- **Presigned URLs**: iOS uploads directly to S3; no direct bucket access from client
- **CDN**: CloudFront or equivalent for photo delivery

## AI Infrastructure

| Service | Provider | Notes |
|---------|----------|-------|
| LLM | OpenRouter → Claude | All calls go through OpenRouter |
| Transcription | Whisper API (OpenAI) | 16kHz mono M4A input |
| Cost tracking | `ai_token_usage` table | Required from Day 1 |
| Rate limiting | Per-user caps | Free tier: ~10 logs/month |

## Authentication

- **OAuth**: Google (`id_token`), Apple (`identity_token`)
- **Email/Password**: bcrypt hashed passwords
- **JWT**: Bearer tokens with refresh tokens (expires in 3600s)
- **iOS Keychain**: Secure token storage on device

## CI/CD

- Source control: GitHub
- CI: GitHub Actions
- Deployment: TBD (matches hosting decision)

## Monitoring (MVP Required)

- **Error tracking**: TBD (Sentry recommended)
- **AI cost monitoring**: `ai_token_usage` table + dashboard
- **Analytics events**: `analytics_events` table

## Security Requirements

- All data encrypted in transit (HTTPS/TLS)
- All data encrypted at rest
- No credentials in code or version control
- Rate limiting on all API endpoints (100/hr free, 500/hr Chat Pro, 5000/hr Shop)
- GDPR-compliant soft deletes (`deleted_at` field)
- User data private by default unless user opts in to public

## Deployment Checklist (Pre-Launch, Week 7)

- [ ] Database migrations tested on staging
- [ ] API rate limiting configured
- [ ] Whisper API quota provisioned
- [ ] Instagram OAuth app approved
- [ ] S3 buckets configured with presigned URLs
- [ ] Analytics events logging
- [ ] Error handling robust
- [ ] AI token cost monitoring active

## Launch Day (Week 8)

- TestFlight beta with 100 users
- Monitor: crash rates, sync failures, AI response quality, onboarding completion

## See Also

- [architecture.md](./architecture.md)
- [tech_stack.md](./tech_stack.md)
