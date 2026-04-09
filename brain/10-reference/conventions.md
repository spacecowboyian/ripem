# Conventions

This document consolidates conventions used throughout the ripem project.

## File naming

| Context | Convention | Example |
|---------|-----------|---------|
| Brain documents | `kebab-case.md` | `product-overview.md` |
| ADRs | `XXXX-kebab-case.md` | `0001-ios-primary-platform.md` |
| Swift files | `PascalCase.swift` | `UserViewModel.swift` |
| Web component files | `PascalCase.tsx` | `UserCard.tsx` |
| Web utility files | `camelCase.ts` | `formatDate.ts` |

## Date format

All dates: `YYYY-MM-DD` (ISO 8601).

## Version format

Semantic versioning: `MAJOR.MINOR.PATCH`.

## Branch naming

`[type]/[short-description]` — see [`/brain/08-operations/branching-strategy.md`](../08-operations/branching-strategy.md).

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Types:** `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`

**Example:** `feat(auth): add biometric login for iOS`

## Code style

See [`/brain/09-agents/coding-rules.md`](../09-agents/coding-rules.md).
