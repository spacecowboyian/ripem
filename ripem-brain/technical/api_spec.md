# API Specification

## Conventions

- All APIs use JSON over HTTPS
- Authentication via Bearer token in the `Authorization` header
- Error responses follow standard envelope: `{ "error": { "code": "...", "message": "..." } }`
- All dates are ISO 8601 strings in UTC
- Pagination uses cursor-based approach: `{ "data": [...], "cursor": "...", "hasMore": true }`

## Authentication

### POST /auth/register
Create a new user account.

### POST /auth/login
Authenticate and receive a Bearer token.

### POST /auth/refresh
Refresh an expired token.

---

## Vehicles

### POST /vehicles
Add a vehicle to the user's garage.

**Request**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| year | integer | yes | Vehicle year |
| make | string | yes | Vehicle make (e.g., Honda) |
| model | string | yes | Vehicle model (e.g., Civic) |
| trim | string | no | Trim level |
| nickname | string | no | User-defined nickname |

### GET /vehicles
List all vehicles in the user's garage.

### GET /vehicles/:id
Get a specific vehicle.

---

## Build Sessions

### POST /vehicles/:id/sessions
Log a new build session.

**Request**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| audio_url | string | no | URL of voice recording |
| transcript | string | no | Pre-transcribed text |
| notes | string | no | Manual notes |

### GET /vehicles/:id/sessions
Get all sessions for a vehicle (build timeline).

---

## AI Assistant

### POST /ai/chat
Send a message to the AI assistant.

**Request**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| message | string | yes | User's question or message |
| vehicle_id | string | no | Vehicle context |
| session_id | string | no | Session context |

---

## Builds (Publishing)

### POST /builds
Publish a build.

### GET /builds
Discover public builds (feed).

### GET /builds/:id
Get a specific build.

---

> Endpoints are defined as features are built. See [/mvp/scope.md](../mvp/scope.md) for priority order.
