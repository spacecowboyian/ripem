# Shared data models

This document defines data models that are used across more than one platform or domain.

## Conventions

- All identifiers are UUIDs.
- All timestamps are ISO 8601 strings in UTC.
- All amounts are stored as integers in the smallest currency unit (e.g., cents).

## Models

> *(Define shared models here. Domain-specific models belong in the relevant domain's `data-model.md`.)*

### Model template

```
### [ModelName]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id    | UUID | Yes      | Primary key |
```
