# Data Model

## Overview

Complete information architecture for RipEm MVP. Covers entity relationships, full SQL schema, data flow diagrams, AI context retrieval, and query patterns.

**Source**: RipEm MVP Technical Specification v1.0 (April 2025)

---

## Core Entity Relationships

```
User
  └── Subscription (billing, feature access)
  └── Garage (collection of projects)
       └── Project (individual car)
            ├── Questionnaire Data (onboarding)
            ├── Log Entry (voice entry + transcript)
            │    ├── AI Response
            │    ├── Photos
            │    └── Instagram Post (if shared)
            ├── Conversation (AI chat history)
            ├── Goals (planned modifications)
            └── Settings (privacy, preferences)
  └── Discovery (subscriptions, likes, algorithm prefs)
```

---

## Database Schema

### Table: `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  auth_type ENUM('email', 'google', 'apple') NOT NULL,
  password_hash VARCHAR(255) NULLABLE,
  display_name VARCHAR(100),
  avatar_url VARCHAR(500),
  bio TEXT NULLABLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULLABLE,

  INDEX (email),
  INDEX (created_at)
);
```

### Table: `garages`

```sql
CREATE TABLE garages (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  garage_name VARCHAR(100) NULLABLE,
  garage_description TEXT NULLABLE,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id),
  INDEX (user_id),
  INDEX (is_public)
);
```

### Table: `projects`

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  garage_id UUID NOT NULL REFERENCES garages(id) ON DELETE CASCADE,

  -- Car Basics
  year INT NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  vin VARCHAR(17) NULLABLE,
  car_name VARCHAR(100) NOT NULL,  -- "Dale", "The Beast", etc.

  -- Story & Vision
  origin_story TEXT NULLABLE,
  vision JSONB NOT NULL,           -- ["track_car", "custom_build"]
  vision_detail TEXT NULLABLE,

  -- Calibration
  skill_level ENUM('novice', 'intermediate', 'advanced', 'professional') NOT NULL,

  -- Budget & Timeline
  budget_amount DECIMAL(10, 2) NOT NULL,
  timeline_months INT NOT NULL,
  timeline_start_date DATE NOT NULL,

  -- Current State
  work_completed TEXT NULLABLE,
  primary_focus TEXT NULLABLE,

  -- Status
  is_public BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX (garage_id),
  INDEX (is_public),
  INDEX (created_at DESC),
  INDEX (year, make, model)
);
```

### Table: `questionnaire_responses`

```sql
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  response_json JSONB NOT NULL,   -- full questionnaire data

  -- Key fields extracted for quick access
  skill_level ENUM('novice', 'intermediate', 'advanced', 'professional'),
  vision_primary ENUM('track_car', 'street_driver', 'restoration', 'custom', 'restomod', 'offroad'),
  budget_amount DECIMAL(10, 2),
  timeline_months INT,
  car_name VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(project_id),
  INDEX (project_id)
);
```

### Table: `log_entries`

```sql
CREATE TABLE log_entries (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Voice & Transcription
  voice_recording_url VARCHAR(500) NULLABLE,
  voice_duration_seconds INT NULLABLE,
  transcript TEXT NOT NULL,
  transcript_confidence FLOAT NULLABLE,

  -- Entry Metadata
  entry_title VARCHAR(200),
  entry_summary TEXT NULLABLE,

  -- AI Response
  ai_response TEXT NOT NULL,
  ai_response_tokens INT NULLABLE,

  -- Photos
  photo_urls JSONB,               -- ["s3://...", ...]

  -- Status & Engagement
  is_public BOOLEAN DEFAULT TRUE,
  is_shared BOOLEAN DEFAULT FALSE,
  likes INT DEFAULT 0,
  shares INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX (project_id),
  INDEX (created_at DESC),
  INDEX (is_public),
  FULLTEXT INDEX (transcript, ai_response)
);
```

### Table: `instagram_posts`

```sql
CREATE TABLE instagram_posts (
  id UUID PRIMARY KEY,
  log_entry_id UUID NOT NULL REFERENCES log_entries(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id),

  instagram_post_id VARCHAR(100) NULLABLE,
  instagram_post_url VARCHAR(500) NULLABLE,
  caption_generated TEXT NOT NULL,
  caption_actual TEXT NULLABLE,

  watermark_text VARCHAR(100) NOT NULL,
  watermark_url VARCHAR(500) NOT NULL,

  post_status ENUM('draft', 'scheduled', 'posted', 'failed') DEFAULT 'draft',
  posted_at TIMESTAMP NULLABLE,

  instagram_likes INT DEFAULT 0,
  instagram_comments INT DEFAULT 0,
  instagram_shares INT DEFAULT 0,
  watermark_clicks INT DEFAULT 0,

  last_sync_at TIMESTAMP NULLABLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX (project_id),
  INDEX (post_status),
  INDEX (posted_at DESC)
);
```

### Table: `ai_conversations`

```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  conversation_title VARCHAR(200) NULLABLE,

  -- Messages stored as JSONB array
  messages JSONB NOT NULL,
  -- [
  --   { "role": "user", "content": "...", "timestamp": "...", "source": "text"|"voice_log" },
  --   { "role": "assistant", "content": "...", "timestamp": "...", "tokens_used": 342 }
  -- ]

  context_summary TEXT NULLABLE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_message_at TIMESTAMP,

  INDEX (project_id),
  INDEX (last_message_at DESC),
  INDEX (is_active)
);
```

### Table: `goals`

```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  goal_title VARCHAR(200) NOT NULL,
  goal_description TEXT NULLABLE,
  goal_category ENUM('engine', 'suspension', 'brakes', 'interior', 'exterior', 'other') NOT NULL,

  estimated_cost DECIMAL(10, 2) NULLABLE,
  estimated_duration_hours INT NULLABLE,
  priority INT DEFAULT 0,         -- 0=low, 1=medium, 2=high

  status ENUM('planning', 'in_progress', 'completed', 'postponed') DEFAULT 'planning',
  target_completion_date DATE NULLABLE,

  ai_suggestions JSONB NULLABLE,  -- ["Option 1: 4A-GE", "Option 2: 2ZZ-GE"]

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULLABLE,

  INDEX (project_id),
  INDEX (status),
  INDEX (priority DESC)
);
```

### Table: `subscriptions`

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  subscription_type ENUM('free', 'chat_pro', 'shop') NOT NULL,
  extra_projects_count INT DEFAULT 0,

  billing_cycle_start TIMESTAMP,
  billing_cycle_end TIMESTAMP,
  renewal_date TIMESTAMP NULLABLE,
  auto_renew BOOLEAN DEFAULT TRUE,

  status ENUM('active', 'paused', 'cancelled', 'past_due') DEFAULT 'active',

  platform ENUM('ios', 'android', 'web') NOT NULL,
  app_receipt_data JSONB NULLABLE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMP NULLABLE,

  INDEX (user_id),
  INDEX (status),
  INDEX (renewal_date),
  UNIQUE(user_id)
);
```

### Table: `discovery_feed`

```sql
CREATE TABLE discovery_feed (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  subscribed_garage_ids JSONB NOT NULL,
  liked_entry_ids JSONB NOT NULL,

  preferred_car_types JSONB,
  preferred_project_types JSONB,

  last_feed_algorithm_run TIMESTAMP,
  algorithm_version VARCHAR(20),   -- "v1", "v2", etc.

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id),
  INDEX (user_id)
);
```

### Table: `discovery_feed_items`

```sql
CREATE TABLE discovery_feed_items (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  log_entry_id UUID NOT NULL REFERENCES log_entries(id) ON DELETE CASCADE,

  feed_rank INT NOT NULL,
  ranking_reason ENUM(
    'subscribed_garage',
    'similar_car_type',
    'similar_project_type',
    'popular_trending',
    'serendipitous'
  ) NOT NULL,

  shown_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  clicked_at TIMESTAMP NULLABLE,
  liked_at TIMESTAMP NULLABLE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX (user_id, feed_rank),
  INDEX (log_entry_id),
  INDEX (created_at DESC)
);
```

### Table: `analytics_events`

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),

  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,

  app_version VARCHAR(20),
  platform ENUM('ios', 'android', 'web') NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX (user_id),
  INDEX (event_type),
  INDEX (created_at DESC)
);
```

### Table: `ai_token_usage`

```sql
CREATE TABLE ai_token_usage (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  project_id UUID NULLABLE REFERENCES projects(id),

  request_type ENUM(
    'onboarding_response',
    'log_ai_response',
    'instagram_caption',
    'chat_response',
    'real_time_chat'
  ) NOT NULL,

  input_tokens INT NOT NULL,
  output_tokens INT NOT NULL,
  total_tokens INT NOT NULL,
  estimated_cost_usd DECIMAL(10, 4),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX (user_id),
  INDEX (created_at DESC)
);
```

---

## Data Flow Diagrams

### Flow 1: Onboarding → AI Response

```
User completes questionnaire
  → POST /api/garage/create
  → Insert into projects + questionnaire_responses
  → Build LLM prompt from project context
  → Send to OpenRouter (Claude)
  → Insert into ai_conversations
  → Return "Dale's a kickass name..." to iOS app
```

### Flow 2: Voice Log → Transcription → AI Response

```
User records voice (offline)
  → App stores locally
  → User comes online → Sync triggers
  → POST /api/log/create with audio
  → Upload to S3
  → Whisper API transcription
  → Fetch project + questionnaire + prior entries for context
  → Send to OpenRouter → AI response
  → Insert into log_entries + ai_conversations + ai_token_usage
  → Push notification: "Your buddy has responded"
```

### Flow 3: Share to Instagram

```
User taps "Share to Instagram"
  → Fetch log_entry + project
  → LLM: generate Instagram caption
  → Generate watermark URL with tracking params
  → Insert into instagram_posts (status='draft')
  → Show user caption preview
  → User approves → POST to Instagram API
  → Update instagram_posts status='posted'
```

### Flow 4: Discovery Feed

```
User opens discovery tab
  → Query discovery_feed for user preferences
  → Query recent public log_entries (last 7 days)
  → Rank by algorithm:
      30% subscribed garages
      30% similar car type
      25% similar project type / trending
      15% serendipitous
  → Paginate (20 per page)
  → Insert into discovery_feed_items
  → Return to app
```

---

## AI Context Retrieval Pattern

```javascript
const context = {
  user: { name, skill_level, num_projects },
  project: { year, make, model, car_name, vision, origin_story, work_completed },
  questionnaire: questionnaire_responses.response_json,
  recent_entries: last 5 log_entries (timestamp, transcript, ai_response),
  conversation_history: ai_conversations.messages.slice(-10),
  goals: active goals (status != 'completed', limit 5)
};

const llm_prompt = `
System: [Car Buddy System Prompt]
Context: ${JSON.stringify(context)}
Current Request: [user's message/log/question]
`;
```

---

## Key Query Patterns

### Get Project's Full Garage Brain

```sql
SELECT
  p.*,
  qr.response_json,
  count(le.id) as total_entries
FROM projects p
LEFT JOIN questionnaire_responses qr ON p.id = qr.project_id
LEFT JOIN log_entries le ON p.id = le.project_id
WHERE p.id = $1
GROUP BY p.id, qr.response_json;
```

### Get Recent Entries for AI Context

```sql
SELECT id, transcript, ai_response, created_at
FROM log_entries
WHERE project_id = $1
ORDER BY created_at DESC
LIMIT 5;
```

### Get Discovery Feed

```sql
SELECT le.id, le.transcript, le.created_at,
  p.car_name, p.year, p.make, p.model,
  g.id as garage_id, u.display_name
FROM log_entries le
JOIN projects p ON le.project_id = p.id
JOIN garages g ON p.garage_id = g.id
JOIN users u ON g.user_id = u.id
WHERE p.is_public = TRUE
  AND le.is_public = TRUE
  AND le.created_at > NOW() - INTERVAL '7 days'
ORDER BY le.likes DESC
LIMIT 20;
```

---

## Storage Estimates (MVP, 10K users)

| Table | Est. Rows | Size |
|-------|-----------|------|
| users | 10,000 | 2 MB |
| garages | 10,000 | 1 MB |
| projects | 15,000 | 5 MB |
| log_entries | 100,000 | 500 MB |
| ai_conversations | 50,000 | 100 MB |
| instagram_posts | 50,000 | 25 MB |
| discovery_feed_items | 200,000 | 50 MB |
| analytics_events | 1,000,000 | 200 MB |
| **Total** | | **~900 MB** |

---

## Cost Management

Track every LLM call:

```sql
INSERT INTO ai_token_usage (user_id, project_id, request_type,
  input_tokens, output_tokens, estimated_cost_usd)
VALUES ($1, $2, 'log_ai_response', 342, 156, 0.0248);
```

Free tier: throttle if abusing. Premium: show usage in dashboard.

---

## Migration Strategy

- **Week 1**: Deploy schema, test with 100 internal users, iterate on real data patterns
- **Post-Launch**: Add vector embeddings for semantic search, read replicas if needed, partition `log_entries` by date if >10M rows

## See Also

- [api_spec.md](./api_spec.md)
- [architecture.md](./architecture.md)
- [ai_prompting.md](./ai_prompting.md)
