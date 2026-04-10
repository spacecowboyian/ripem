# Business Model

## Revenue Streams

### 1. Ad-Supported Free Tier
- Ads appear **only** in the Parts & Tools Search section
- Ad formats: sponsored listings, affiliate links, product placements
- Ad inventory sold to: parts retailers, tool brands, automotive aftermarket companies
- Ads are **never** shown in: AI chat, build logs, timeline views, community feeds
- **Automotive niche CPM**: $2–5 per thousand impressions (strong vs. generic $0.50–1)
- **Projected ARPU from ads**: $1–3/month per free user

### 2. Premium Subscription ($4.99–9.99/month)
Monthly and annual subscription tiers unlocking:
- Ad-free experience across the entire app
- Direct social posting (Instagram, TikTok, Facebook, YouTube Shorts)
- Advanced build analytics (views, engagement, follower growth)
- Priority AI responses
- Build export tools (PDF, CSV, video compilation)
- Early access to new features

### 3. Additional Cars — $2/month per car
- **First car is always free** for every user (free and paid tiers)
- Each additional car costs **$2/month**
- Add-on works with any plan (Free, Premium, or Shop)
- Enables tracking multiple builds simultaneously
- Priced to be accessible while creating meaningful recurring revenue

### 3. Enterprise / Team Tier ($19.99+/month)
For professional restorers, shops, and collaborative builds:
- Multiple users per project (collaborative editing)
- Shared project management and permissions
- API access for shop/business integrations
- Custom branding for published content
- Team analytics dashboard
- Dedicated support

### 4. Affiliate Revenue
- Parts search results include affiliate links to Amazon, AutoZone, specialty shops
- Target: 5–10% commission on referred sales
- Projected revenue: $0.50–2 per active user/month

### 5. Additional Revenue Streams
- **Premium content**: Expert build guides, specialized restoration courses ($9.99–29.99)
- **Build marketplace**: Users can offer restoration services or sell build documentation
- **Sponsorships**: Brand partnerships with auto parts companies and tool manufacturers
- **Data insights**: Anonymized aggregated data (opt-in only, clearly disclosed) — e.g., "Most popular mods for 2010 Mustang GT"

## Pricing

| Tier | Price | Key Benefits |
|------|-------|-------------|
| Free | $0/mo | 1 car free · Core logging + AI assistant + community + build publishing (watermarked) |
| Additional Car | $2/mo per car | Add more project cars beyond the first free one |
| Premium | $4.99–9.99/mo | Ad-free + direct social posting + analytics + watermark removal |
| Annual | ~$49–79/yr | Premium at a discount (~30% off) |
| Shop | $19.99+/mo | Team collaboration + API access + custom branding |

> Pricing to be validated through user research. See [/context/open_questions.md](../context/open_questions.md)

## Unit Economics

**Cost per user (COGS)**
| Cost Category | Per User/Month |
|---------------|---------------|
| AI API (Claude/OpenAI) | ~$0.01–0.05 |
| Infrastructure (hosting, storage, CDN) | ~$0.50–1.50 |
| Video processing | ~$0.10–0.30 |
| Payment processing (Premium) | 2.9% + $0.30/transaction |
| **Total COGS** | **~$1–2/month** |

**Revenue per user**
| Segment | % of Users | ARPU/Month |
|---------|-----------|------------|
| Free users | 85–95% | $1.50–3 (ads + affiliate) |
| Premium users | 5–15% | ~$7 |
| **Blended ARPU** | — | **$2–4/month** |

**Key unit economics**
- **Gross margin**: 60–70%
- **CAC**: $2–5 (watermark virality-driven, very low)
- **Payback period**: 1–3 months
- **LTV**: $150–400+ per user (at $2–4 ARPU, 12+ month retention)
- **LTV:CAC ratio target**: >3:1

## User Segmentation & Monetization Paths

| Segment | Features Used | Monthly Revenue |
|---------|--------------|-----------------|
| Casual Maintenance Tracker | Voice logging, maintenance log | ~$1.50 (ads only) |
| Active Builder / Enthusiast | Voice + video + community + publishing | ~$2–4 (ads + affiliate) |
| Content Creator | Premium tier + social posting + AI narrative | ~$7 (Premium) + affiliate |
| Professional Restorer / Shop | Enterprise tier + collaboration + export | ~$20–50 (Enterprise) |

## Key Business Rules

1. Free tier must be genuinely valuable — not crippled
2. **First car is always free** — additional cars are $2/month each
3. Ads are strictly limited to parts/tools discovery contexts
4. Watermark on free-tier published content is the core viral growth mechanism
5. No selling or sharing user data with third-party advertisers
6. AI never recommends products via sponsored content; only when users search for parts/tools
7. All AI recommendations are transparent about confidence (see [/product/design_philosophy.md](../product/design_philosophy.md))

## Confidence Scoring & Transparency

The AI displays honest scoring to build user trust:
- "Only 1 person tried this, 72 thought it was bad — I don't recommend it"
- "50/50 success rate — you might get lucky, you might not"
- "89 people had success with this approach — pretty solid bet"
- "We don't know for sure, but a lot of people do this"

## Growth Revenue Model Timeline

- **Year 1**: Ad-supported with early Premium signups (mostly free users, proving engagement)
- **Year 2**: Increase Premium conversion through feature improvements and social proof
- **Year 3+**: Diversify with affiliate revenue scaling, Enterprise tier adoption, data insights licensing

## See Also

- [financial_projections.md](./financial_projections.md)
- [/product/constraints.md](../product/constraints.md)
