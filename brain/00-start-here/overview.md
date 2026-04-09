# ripem — Overview

## What is ripem?

ripem is an **iOS-first, web-secondary** application. All product decisions, architectural choices, and implementation details are documented in this knowledge base (the "brain").

## Purpose of This Brain

The brain is the single source of truth for everyone — humans and automated agents — working on ripem. It captures:

- **Product intent** — what we are building and why
- **Domain knowledge** — the business rules and data that drive the system
- **Architecture decisions** — how the system is structured and why
- **Platform guides** — how to build for iOS and web
- **Operational runbooks** — how to develop, test, and release
- **Agent rules** — how automated agents should behave in this codebase

## Guiding Principles

1. **iOS first** — every feature is designed and built for iOS before being considered for the web.
2. **Documentation as code** — the brain lives in the repository and is versioned alongside the code.
3. **Agents read before they act** — any automated agent must consult the brain before making changes.

## Quick Links

| I want to… | Go to… |
|------------|--------|
| Understand the product | [`/brain/01-product/product-overview.md`](../01-product/product-overview.md) |
| Understand the architecture | [`/brain/03-architecture/system-overview.md`](../03-architecture/system-overview.md) |
| Build for iOS | [`/brain/04-platforms/ios/architecture.md`](../04-platforms/ios/architecture.md) |
| Build for web | [`/brain/04-platforms/web/architecture.md`](../04-platforms/web/architecture.md) |
| Follow agent rules | [`/brain/09-agents/agent-instructions.md`](../09-agents/agent-instructions.md) |
| See the full file map | [`/brain/10-reference/file-map.md`](../10-reference/file-map.md) |
