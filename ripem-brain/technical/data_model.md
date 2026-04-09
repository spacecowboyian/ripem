# Data Model

## Core Entities

### User
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| email | string | User email (unique) |
| username | string | Display name |
| created_at | timestamp | Account creation |
| subscription_tier | enum | free / premium |

### Vehicle
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Owner (FK → User) |
| year | integer | Vehicle year |
| make | string | Manufacturer |
| model | string | Model name |
| trim | string | Trim level |
| nickname | string | User-defined name |
| created_at | timestamp | When added |

### BuildSession
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| vehicle_id | UUID | FK → Vehicle |
| user_id | UUID | FK → User |
| recorded_at | timestamp | When session occurred |
| audio_url | string | Voice recording (nullable) |
| transcript | text | Raw transcription |
| notes | text | Manual notes |
| created_at | timestamp | When logged |

### Part
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | FK → BuildSession |
| name | string | Part name |
| brand | string | Brand/manufacturer |
| part_number | string | Part number |
| cost | decimal | Cost |
| currency | string | ISO currency code |
| installed_at | timestamp | When installed |

### Build (Published)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| vehicle_id | UUID | FK → Vehicle |
| user_id | UUID | FK → User |
| title | string | Build title |
| description | text | Build description |
| is_public | boolean | Published visibility |
| watermark_url | string | Watermark asset URL |
| published_at | timestamp | When published |

## Relationships

```
User (1) → (many) Vehicle
Vehicle (1) → (many) BuildSession
BuildSession (1) → (many) Part
Vehicle (1) → (many) Build (published)
```

## See Also

- [api_spec.md](./api_spec.md)
- [architecture.md](./architecture.md)
