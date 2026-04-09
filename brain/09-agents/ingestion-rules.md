# Ingestion rules

Ingestion is the process of converting raw material (notes, transcripts, meeting notes) into structured brain documents.

## Source material

Raw material is placed in the appropriate subdirectory of `/brain/11-ingestion/`:

| Directory | Contents |
|-----------|----------|
| `raw-notes` | Freeform notes |
| `meeting-notes` | Notes from meetings |
| `transcripts` | Verbatim transcripts |
| `scratch` | Temporary working space |

## Ingestion steps

1. Place the raw material in the appropriate `11-ingestion/` subdirectory.
2. Review the material and identify:
   - New or updated product information → `01-product/`
   - New business rules → `02-domains/[domain]/business-rules.md`
   - New architectural decisions → `06-decisions/adr/`
   - New operational information → `08-operations/`
3. Write or update the relevant brain documents.
4. Do not delete the raw material after ingestion; it is a record of the original source.

## Naming conventions for ingested files

Raw files should be named: `YYYY-MM-DD-short-description.md`

Example: `2026-04-09-initial-product-discussion.md`
