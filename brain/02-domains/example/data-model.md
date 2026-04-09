# Example domain — Data model

> **Note:** This is a placeholder file. Replace with the real data model when this domain is defined.

## Entity template

```
### [EntityName]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id    | UUID | Yes      | Primary key |
```

## Relationships

> *(Use an ERD Mermaid diagram to show relationships between entities.)*

```mermaid
erDiagram
    ENTITY_A {
        uuid id
        string name
    }
    ENTITY_B {
        uuid id
        uuid entity_a_id
    }
    ENTITY_A ||--o{ ENTITY_B : "has many"
```

## Defined entities

> *(Add entities here.)*
