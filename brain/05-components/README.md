# Components

This directory documents reusable components used in ripem.

## Structure

```
/05-components
  /shared         — Components shared across platforms
    /[component-name]
      overview.md
      api.md
      usage.md

  /ios            — iOS-only components
    /[component-name]
      overview.md
      implementation.md
      examples.md

  /web            — Web-only components
    /[component-name]
      overview.md
      implementation.md
      examples.md
```

## Conventions

- Add a subdirectory when a component is mature enough to be reused.
- Shared components are documented first; platform-specific implementations extend them.
- Keep `api.md` up to date whenever a component's public interface changes.

## Current components

> *(Add component entries here as they are documented.)*

| Component | Platforms | Description |
|-----------|-----------|-------------|
| *(none yet)* | | |
