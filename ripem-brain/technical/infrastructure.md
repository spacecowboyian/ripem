# Infrastructure

## Environments

| Environment | Purpose | Notes |
|-------------|---------|-------|
| Development | Local development | Each engineer runs locally |
| Staging | Pre-production testing | Mirrors production config |
| Production | Live app | iOS App Store + web |

## Hosting (To Be Decided)

Options under consideration:
- AWS (EC2, RDS, S3, CloudFront)
- GCP (Cloud Run, Cloud SQL, GCS)
- Railway / Render (simpler DevOps for early stage)

> Decision to be recorded in [/context/design_decisions.md](../context/design_decisions.md) when made.

## CI/CD

- Source control: GitHub
- CI: GitHub Actions
- Deployment: TBD

## Media Storage

- Voice recordings stored in S3-compatible object storage
- Build photos stored with CDN-backed delivery
- Generated watermarked content stored at publish time

## AI Infrastructure

- LLM API calls go through a managed provider (OpenAI, Anthropic, or similar)
- Transcription: Whisper API or Apple on-device Speech
- Rate limiting and cost monitoring required from Day 1

## Monitoring (To Be Defined)

- Error tracking: TBD
- Performance monitoring: TBD
- Cost monitoring for AI API usage: Required

## Security Requirements

- All data encrypted in transit (HTTPS/TLS)
- All data encrypted at rest
- No credentials in code or version control
- User data access controlled by authenticated sessions

## See Also

- [architecture.md](./architecture.md)
- [tech_stack.md](./tech_stack.md)
