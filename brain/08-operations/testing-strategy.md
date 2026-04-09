# Testing strategy

## Philosophy

- Tests should give confidence that the product works, not just that the code executes.
- Prefer testing behaviour over implementation details.

## Test levels

| Level | Scope | Tools |
|-------|-------|-------|
| Unit | Individual functions and classes | XCTest (iOS), Jest/Vitest (web) |
| Integration | Interactions between modules | XCTest, testing library |
| UI / E2E | Full user flows | XCUITest (iOS), Playwright/Cypress (web) |

## Coverage expectations

> *(Define coverage targets — e.g., "all business logic must have unit tests".)*

## Running tests

### iOS
> *(Describe how to run iOS tests — e.g., `xcodebuild test`.)*

### Web
> *(Describe how to run web tests — e.g., `npm test`.)*

## CI

> *(Describe how tests run in CI and what must pass before merging.)*
