# How to Use This Brain

## Structure

The brain is divided into numbered top-level directories. The numbers indicate reading order for new contributors and agents.

```
/brain
  00-start-here   ← Read first, every time
  01-product      ← What we are building
  02-domains      ← Business rules per domain
  03-architecture ← System design
  04-platforms    ← Platform-specific guides (iOS primary, web secondary)
  05-components   ← Reusable component documentation
  06-decisions    ← Architecture Decision Records
  07-work         ← Roadmap and task tracking
  08-operations   ← Developer workflow and release process
  09-agents       ← Rules for automated agents
  10-reference    ← Quick-reference material
  11-ingestion    ← Raw input material (notes, transcripts)
  12-data         ← Structured JSON data
```

## Reading Order

### For a new human contributor
1. `00-start-here/overview.md` — orientation
2. `00-start-here/glossary.md` — key terms
3. `01-product/product-overview.md` — product context
4. `04-platforms/ios/` or `04-platforms/web/` — your platform
5. `08-operations/developer-workflow.md` — how to work day-to-day

### For an automated agent
1. `00-start-here/overview.md`
2. `09-agents/agent-instructions.md`
3. `09-agents/coding-rules.md`
4. Relevant domain docs in `02-domains/`
5. Relevant platform docs in `04-platforms/`

## Editing the Brain

- **Add new domains** by creating a subdirectory under `02-domains/[domain-name]/` with the four standard files: `overview.md`, `business-rules.md`, `workflows.md`, `data-model.md`.
- **Record decisions** by adding an ADR under `06-decisions/adr/` using the next sequential number.
- **Do not delete** existing documents. Mark them deprecated with a notice at the top of the file.
- **Keep JSON data** in `12-data/` in sync with the corresponding markdown documentation.

## Conventions

- All dates use ISO 8601 format: `YYYY-MM-DD`.
- All file names use `kebab-case`.
- Headings use sentence case (only the first word and proper nouns are capitalised).
- Diagrams are stored as Mermaid code blocks inside markdown files.
