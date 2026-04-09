# Branching strategy

## Main branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch (if used) |

## Feature branches

Name feature branches using this convention:

```
[type]/[short-description]
```

**Types:**

| Type | Use for |
|------|---------|
| `feat` | New features |
| `fix` | Bug fixes |
| `chore` | Maintenance tasks (no production code change) |
| `docs` | Documentation only |
| `refactor` | Code changes that neither fix a bug nor add a feature |
| `test` | Adding or updating tests |

**Example:** `feat/user-authentication`

## Pull request rules

> *(Define rules — e.g., require passing CI, require at least one review approval.)*

## Merge strategy

> *(Describe preferred merge strategy — squash merge, merge commit, or rebase.)*
