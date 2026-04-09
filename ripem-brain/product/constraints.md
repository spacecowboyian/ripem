# Constraints

## Product Constraints

### What RipEm Is NOT
- Not a generic project management tool (it's automotive-specific)
- Not a social network (community is secondary to the build log)
- Not a parts marketplace (parts search is a discovery layer, not a store)
- Not a generic AI chatbot (it must always be car and project context-aware)

### Hard Boundaries
- Ads are **never** shown in AI chat or project log views
- Watermark on free-tier published content is non-negotiable (it's the growth engine)
- Voice logging must work without internet for core functionality
- The AI must disclose confidence levels — it cannot present uncertain answers as facts

## Technical Constraints

- iOS is the primary platform; web is secondary
- All AI interactions must be context-scoped (car + project + community data)
- Offline-first logging: voice capture works without connectivity
- Data must be exportable (user data ownership)

## Business Constraints

- Free tier must be genuinely useful — not crippled to force upgrades
- Premium tier pricing must be accessible to hobbyist budgets
- Ad inventory is limited to parts/tools search contexts only
- No selling or sharing user data with third-party advertisers

## Regulatory Constraints

- User data privacy compliance (GDPR, CCPA)
- App Store guidelines for iOS
- Content moderation requirements for user-published builds

## See Also

- [design_philosophy.md](./design_philosophy.md)
- [/business/business_model.md](../business/business_model.md)
