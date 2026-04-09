# API contracts

This document defines the contracts between the client applications (iOS, web) and the backend API.

## Conventions

- All APIs use JSON over HTTPS.
- Authentication is via Bearer token in the `Authorization` header.
- Error responses follow a standard envelope: `{ "error": { "code": "...", "message": "..." } }`.
- All dates are ISO 8601 strings in UTC.

## Endpoints

> *(Document API endpoints here as they are defined.)*

### Endpoint template

```
### [METHOD] /path/to/endpoint

**Description:** What this endpoint does.

**Request**
| Field | Type | Required | Description |
|-------|------|----------|-------------|

**Response**
| Field | Type | Description |
|-------|------|-------------|

**Error codes**
| Code | Meaning |
|------|---------|
```
