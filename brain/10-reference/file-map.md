# File map

This document lists every file in the `/brain` knowledge base and its purpose.

## `/brain/00-start-here`

| File | Purpose |
|------|---------|
| `overview.md` | High-level orientation for the ripem project |
| `how-to-use-this-brain.md` | How the brain is structured and how to navigate it |
| `glossary.md` | Definitions of key terms used in the project |

## `/brain/01-product`

| File | Purpose |
|------|---------|
| `product-overview.md` | What ripem is and what problem it solves |
| `goals.md` | Strategic goals and non-goals |
| `users-and-personas.md` | User personas |
| `core-concepts.md` | Fundamental product concepts |

## `/brain/02-domains`

| File | Purpose |
|------|---------|
| `README.md` | Index of all domains |
| `[domain]/overview.md` | What the domain is and why it exists |
| `[domain]/business-rules.md` | Business rules for the domain |
| `[domain]/workflows.md` | User and system workflows |
| `[domain]/data-model.md` | Entities and relationships |

## `/brain/03-architecture`

| File | Purpose |
|------|---------|
| `system-overview.md` | High-level architecture diagram and components |
| `shared-data-models.md` | Data models shared across platforms |
| `api-contracts.md` | API endpoint definitions |
| `integrations.md` | External service integrations |
| `environments.md` | Development, staging, and production environments |

## `/brain/04-platforms/ios`

| File | Purpose |
|------|---------|
| `architecture.md` | iOS architectural pattern and layers |
| `app-structure.md` | Xcode project and feature module layout |
| `navigation.md` | Navigation strategy and deep links |
| `state-management.md` | State management approach |
| `networking.md` | HTTP client and request handling |
| `persistence.md` | On-device storage strategy |
| `ui-patterns.md` | Design system, typography, and UI conventions |
| `performance.md` | Performance goals and profiling |
| `known-issues.md` | Active known issues |

## `/brain/04-platforms/web`

| File | Purpose |
|------|---------|
| `architecture.md` | Web architectural pattern and layers |
| `app-structure.md` | Project directory layout |
| `routing.md` | Routing strategy and route map |
| `state-management.md` | State management approach |
| `api-usage.md` | HTTP client and API integration |
| `ui-patterns.md` | Design system and UI conventions |
| `known-issues.md` | Active known issues |

## `/brain/05-components`

| File | Purpose |
|------|---------|
| `README.md` | Index of all components |
| `shared/README.md` | Index of shared components |
| `ios/README.md` | Index of iOS components |
| `web/README.md` | Index of web components |

## `/brain/06-decisions/adr`

| File | Purpose |
|------|---------|
| `README.md` | ADR index and template |
| `0001-ios-primary-platform.md` | Decision: iOS as primary platform |

## `/brain/07-work/roadmap`

| File | Purpose |
|------|---------|
| `roadmap.md` | High-level roadmap |
| `milestones.md` | Detailed milestone tracking |

## `/brain/08-operations`

| File | Purpose |
|------|---------|
| `developer-workflow.md` | Day-to-day development process |
| `branching-strategy.md` | Git branching conventions |
| `testing-strategy.md` | Test levels, tools, and expectations |
| `release-process.md` | Release checklist and versioning |
| `deployment.md` | Deployment overview |
| `ios/build-and-run.md` | How to build and run the iOS app |
| `ios/testflight.md` | TestFlight distribution |
| `ios/app-store.md` | App Store submission |
| `web/build-and-deploy.md` | How to build and deploy the web app |
| `web/hosting.md` | Hosting configuration |

## `/brain/09-agents`

| File | Purpose |
|------|---------|
| `agent-instructions.md` | Rules for all automated agents |
| `coding-rules.md` | Code style and quality rules |
| `documentation-rules.md` | Rules for editing the brain |
| `ingestion-rules.md` | Process for ingesting raw notes |
| `prompts.md` | Reusable prompt templates |

## `/brain/10-reference`

| File | Purpose |
|------|---------|
| `dependencies.md` | All third-party dependencies |
| `external-services.md` | All external services |
| `conventions.md` | File naming, date format, commit messages |
| `file-map.md` | This file |

## `/brain/11-ingestion`

| Directory | Purpose |
|-----------|---------|
| `raw-notes/` | Freeform notes awaiting ingestion |
| `meeting-notes/` | Meeting notes awaiting ingestion |
| `transcripts/` | Verbatim transcripts awaiting ingestion |
| `scratch/` | Temporary working space |

## `/brain/12-data`

| File | Purpose |
|------|---------|
| `systems.json` | Structured data about technical systems |
| `domains.json` | Structured data about business domains |
| `components.json` | Structured data about components |
| `owners.json` | Structured data about domain and component owners |
