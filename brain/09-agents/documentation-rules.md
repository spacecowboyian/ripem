# Documentation rules

These rules apply to all edits made to the `/brain` knowledge base.

## General

- Use Markdown for all documentation.
- File names use `kebab-case`.
- Headings use sentence case.
- Dates use ISO 8601 format: `YYYY-MM-DD`.
- Diagrams are written as Mermaid code blocks inside markdown.

## Structure rules

- Do not rename or delete existing directories.
- Do not move files between directories without updating all internal links.
- When a document is no longer accurate, mark it deprecated with a notice at the top rather than deleting it.

## Content rules

- Write in plain, direct language.
- Use second person ("you") when addressing contributors or agents.
- Use tables for structured comparative information.
- Use numbered lists for ordered steps; use bullet lists for unordered items.
- Do not duplicate information — link to the canonical source instead.

## Adding new content

- New domains: create a subdirectory in `02-domains/` with the four standard files.
- New ADRs: add a file in `06-decisions/adr/` with the next sequential number and update the ADR index.
- New components: add a subdirectory under `05-components/[platform]/` with the three standard files.
- Always update `10-reference/file-map.md` when adding new sections.

## Review

- All brain edits should be reviewed in the same pull request as the associated code change, where applicable.
