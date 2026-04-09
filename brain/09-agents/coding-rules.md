# Coding rules

These rules apply to all code written in the ripem repository, by humans or agents.

## General

- Follow the style of the surrounding code.
- Prefer clarity over cleverness.
- Do not add comments unless they explain *why*, not *what*.
- Remove dead code; do not comment it out.
- All files must end with a newline.

## iOS (Swift / SwiftUI)

- Follow the [Swift API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/).
- Use `async/await` for asynchronous code; avoid callback pyramids.
- Use `@MainActor` for UI updates.
- Do not force-unwrap optionals (`!`) except in tests.
- Use `guard` for early exits.
- Prefer value types (`struct`) over reference types (`class`) where appropriate.

## Web (JavaScript / TypeScript)

- Use TypeScript; do not use `any`.
- Use `const` by default; use `let` only when reassignment is needed.
- Prefer named exports over default exports.
- Handle errors explicitly; do not swallow `catch` blocks.

## Tests

- Every new function or class should have at least one unit test.
- Test file names mirror the file being tested with a `.test` or `Spec` suffix.
- Tests must not depend on network access or external services (use mocks).

## Security

- Never store credentials or secrets in code or committed config files.
- Validate all user input before using it.
- Use parameterised queries for any database access.
- Do not log sensitive user data.

## Dependencies

- Do not add a new dependency without documenting it in [`/brain/10-reference/dependencies.md`](../10-reference/dependencies.md).
- Prefer well-maintained, widely-used packages.
- Check for known vulnerabilities before adding a new dependency.
