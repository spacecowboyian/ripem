# iOS — App structure

## Project layout

> *(Describe the top-level directory structure of the Xcode project or Swift Package.)*

```
/ios
  /App          — Entry point, app delegate, scene delegate
  /Features     — Feature modules (one directory per feature)
  /Shared       — Shared utilities, extensions, design system
  /Resources    — Assets, localisation files
  /Tests        — Unit and integration tests
  /UITests      — UI tests
```

## Feature module structure

> *(Describe the internal structure of a feature module.)*

```
/Features/[FeatureName]
  /Views
  /ViewModels
  /Models
  /Services
```

## Naming conventions

> *(Document file and type naming conventions specific to iOS.)*
