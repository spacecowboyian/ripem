# ADR-0001: Use iOS as the primary platform

**Date:** 2026-04-09
**Status:** Accepted

## Context

ripem must be built for at least two platforms: iOS and web. A decision is needed about which platform receives design and development priority, and how the secondary platform is approached.

## Decision

iOS is the primary platform. All features are designed and built for iOS first. The web experience is secondary and derives from the iOS design. Web feature parity is a goal, not a guarantee.

## Consequences

- iOS development begins before web development.
- Design decisions are made with the iOS form factor and interaction model in mind.
- Web adaptations may lag behind iOS and may differ in interaction patterns where appropriate.
- All platform documentation in the brain reflects this priority (see [`/brain/04-platforms/`](../../04-platforms/)).
