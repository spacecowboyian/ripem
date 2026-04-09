# Release process

## Overview

> *(Describe the overall release process at a high level.)*

## Versioning

ripem follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

| Part | Increment when |
|------|---------------|
| MAJOR | Breaking changes |
| MINOR | New backwards-compatible features |
| PATCH | Backwards-compatible bug fixes |

## Release checklist

- [ ] All planned features merged to `main`
- [ ] All tests passing in CI
- [ ] Release notes written
- [ ] Version number bumped
- [ ] iOS: see [`testflight.md`](./ios/testflight.md) and [`app-store.md`](./ios/app-store.md)
- [ ] Web: see [`build-and-deploy.md`](./web/build-and-deploy.md)
