# Agent instructions

These instructions apply to **all automated agents** (GitHub Copilot, other AI coding assistants, CI bots) working in the ripem repository.

## Before you do anything

1. Read [`/brain/00-start-here/overview.md`](../00-start-here/overview.md).
2. Read [`/brain/00-start-here/how-to-use-this-brain.md`](../00-start-here/how-to-use-this-brain.md).
3. Read this file in full.
4. Read [`coding-rules.md`](./coding-rules.md) before writing any code.
5. Read [`documentation-rules.md`](./documentation-rules.md) before editing the brain.

## Core rules

- **Never assume.** If information is not in the brain, ask before proceeding.
- **Never skip the brain.** Do not write code based on guesses about the architecture or conventions.
- **iOS first.** If a change affects both platforms, implement iOS first.
- **Minimal changes.** Make the smallest change that fully solves the problem.
- **No secrets in code.** Never commit credentials, tokens, or secrets to the repository.
- **Document changes.** If a decision is made during your work, record it as an ADR in [`/brain/06-decisions/adr/`](../06-decisions/adr/).

## Scope awareness

Before making any change, identify:
1. Which domain(s) the change belongs to.
2. Which platform(s) are affected.
3. Whether any business rules (in `02-domains/`) are relevant.
4. Whether any architecture decisions (in `06-decisions/`) are relevant.

## When to stop and ask

Stop and ask a human if:
- The task requires a decision not already documented in the brain.
- You are unsure which approach is consistent with the existing architecture.
- A change would affect more than one domain.
- A change would affect the public API.
