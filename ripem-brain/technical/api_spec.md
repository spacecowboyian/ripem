# API Specification

## Conventions

- **Base URL**: `https://api.ripem.app/v1`
- All APIs use JSON over HTTPS
- Authentication via `Authorization: Bearer <token>` (JWT)
- Error responses: `{ "error": "error_code", "message": "...", "details": {} }`
- All dates are ISO 8601 strings in UTC
- Pagination: `page` + `limit` params; responses include `pagination.has_next`

**Source**: RipEm MVP Technical Specification v1.0 (April 2025)

---

## Authentication

### POST /auth/register
```json
// Request
{ "email": "user@example.com", "password": "...", "display_name": "Mike" }
// Response 200
{ "user_id": "...", "auth_token": "...", "refresh_token": "..." }
```

### POST /auth/login
```json
// Request
{ "email": "...", "password": "..." }
// Response 200
{ "user_id": "...", "auth_token": "...", "refresh_token": "...", "expires_in": 3600 }
```

### POST /auth/oauth/google
```json
// Request
{ "id_token": "google_id_token" }
// Response 200
{ "user_id": "...", "auth_token": "...", "is_new_user": false }
```

### POST /auth/oauth/apple
```json
// Request
{ "identity_token": "...", "user_identifier": "..." }
```

### POST /auth/refresh
```json
// Request
{ "refresh_token": "..." }
// Response 200
{ "auth_token": "new_token", "expires_in": 3600 }
```

---

## Garage & Project Endpoints

### POST /garage/create
Create user's garage (once per user, during onboarding).
```json
// Request
{ "garage_name": "Mike's Garage", "garage_description": "..." }
// Response 201
{ "garage_id": "...", "user_id": "...", "created_at": "..." }
```

### GET /garage/{garage_id}
Get garage summary with all projects.
```json
// Response 200
{
  "garage_id": "...",
  "projects": [
    { "project_id": "...", "car_name": "Dale", "year": 1972, "make": "Toyota",
      "model": "Celica", "vision": ["track_car"], "total_entries": 12 }
  ]
}
```

### POST /project/create
Create new car project (called during onboarding).
```json
// Request
{
  "garage_id": "...", "year": 1972, "make": "Toyota", "model": "Celica",
  "car_name": "Dale", "origin_story": "Got from Dale, the original owner",
  "vision": ["track_car"], "skill_level": "intermediate",
  "budget_amount": 5000, "timeline_months": 24,
  "work_completed": "Water pump, coolant, oil change",
  "primary_focus": "Motor swap", "is_public": true
}
// Response 201
{ "project_id": "...", "garage_id": "...", "car_name": "Dale", "created_at": "..." }
```

### GET /project/{project_id}
Full project details including goals and entry count.

### PUT /project/{project_id}
Update project details.

### DELETE /project/{project_id}
Soft delete project.

---

## Log Entry Endpoints

### POST /log/create
Create voice log entry with transcription + AI response. (multipart/form-data)
```
voice_file: [binary]
project_id: "proj_abc123"
photos: [file1.jpg, file2.jpg]  (optional)
```
**Processing**: Upload to S3 → Whisper transcription → AI context build → OpenRouter → store
```json
// Response 201
{
  "log_entry_id": "...", "transcript": "Just installed a new exhaust...",
  "ai_response": "That's sick! New exhaust improves flow...",
  "voice_recording_url": "https://s3.amazonaws.com/...",
  "photo_urls": ["..."]
}
```

### GET /log/{log_entry_id}
Get single log entry with transcript, AI response, photos, likes.

### GET /project/{project_id}/logs
Get paginated logs for a project. Query params: `page`, `limit` (max 100), `sort`.

### PUT /log/{log_entry_id}
Update log entry (transcript, photos).

### DELETE /log/{log_entry_id}
Delete log entry.

---

## AI Chat Endpoints

### POST /ai/chat
Send message to AI (async response).
```json
// Request
{ "project_id": "...", "message": "Should I do a motor swap?", "message_type": "text" }
// Response 201
{ "conversation_id": "...", "message_id": "...", "status": "processing", "estimated_wait_seconds": 8 }
```

### GET /ai/chat/{conversation_id}/response
Poll for AI response.
```json
// Response (not ready)
{ "status": "processing", "estimated_wait_seconds": 5 }
// Response (ready)
{ "status": "complete", "response": "Here are your motor swap options...", "response_tokens": 342 }
```

### GET /ai/chat/{project_id}/history
Get conversation history. Returns array of conversations with full messages.

---

## Instagram Share Endpoints

### POST /share/instagram/preview
Generate caption + watermark for log entry.
```json
// Response 200
{
  "caption": "Just upgraded Dale's exhaust...\n\nTracking on RipEm. [link]",
  "watermark_url": "https://ripem.app/dale?src=instagram&utm_campaign=...",
  "preview_image_url": "https://s3.amazonaws.com/preview.jpg"
}
```

### POST /share/instagram/publish
Publish to Instagram.
```json
// Request
{ "log_entry_id": "...", "caption": "...", "instagram_oauth_token": "..." }
// Response 201
{ "instagram_post_id": "...", "instagram_post_url": "...", "posted_at": "..." }
```

### GET /share/instagram/{post_id}
Get Instagram post metrics (likes, comments, watermark clicks).

---

## Discovery Feed Endpoints

### GET /feed/discovery
Get personalized discovery feed. Query: `page`, `limit`.
```json
// Response 200
{
  "feed_items": [
    {
      "log_entry_id": "...", "project_id": "...", "car_name": "The Beast",
      "year": 1987, "make": "Chevrolet", "model": "Iroc-Z",
      "user_name": "John", "transcript_preview": "...",
      "likes": 12, "is_liked_by_current_user": false,
      "ranking_reason": "similar_car_type"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "has_next": true }
}
```

### POST /feed/subscribe
Subscribe to a garage. Request: `{ "garage_id": "..." }`

### DELETE /feed/subscribe/{garage_id}
Unsubscribe.

### GET /feed/subscribed
List subscribed garages.

### POST /feed/like
Like a log entry. Request: `{ "log_entry_id": "..." }`

### DELETE /feed/like/{log_entry_id}
Unlike.

---

## Subscription Endpoints

### GET /subscription/status
```json
// Response 200
{
  "subscription_type": "free",
  "status": "active",
  "renewal_date": "2025-05-09",
  "features": { "extra_projects": 0, "chat_pro": false, "shop_tier": false }
}
```

### POST /subscription/upgrade
Initiate iOS In-App Purchase upgrade.
```json
// Request
{ "subscription_type": "chat_pro", "app_receipt": "base64_encoded" }
// Response 201
{ "subscription_id": "...", "subscription_type": "chat_pro", "status": "active" }
```

---

## User Profile Endpoints

### GET /user/profile
### PUT /user/profile
Update display name, bio, avatar.

### POST /user/settings
Update notification preferences and privacy settings.

---

## Utility Endpoints

### GET /health
```json
{ "status": "healthy", "timestamp": "..." }
```

### POST /analytics/event
Track client-side events.
```json
// Request
{ "event_type": "voice_log_created", "event_data": { "project_id": "..." }, "platform": "ios", "app_version": "1.0.0" }
```

---

## Error Responses

```json
{
  "error": "error_code",
  "message": "Human-readable message",
  "details": { "field": "detail" }
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

---

## Rate Limiting

| Tier | Limit |
|------|-------|
| Free | 100 requests/hour |
| Chat Pro | 500 requests/hour |
| Shop | 5,000 requests/hour |

---

## Pagination

All list endpoints support `page` (default: 1) and `limit` (default: 20, max: 100).

## See Also

- [data_model.md](./data_model.md)
- [architecture.md](./architecture.md)
- [/mvp/scope.md](../mvp/scope.md)
