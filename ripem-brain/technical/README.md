# Technical

**Purpose**: Defines the system architecture, tech stack, APIs, data models, and AI prompting for RipEm.

**For Whom**: Agents engineering the platform, designing APIs, or training models.

## Overview

RipEm is an iOS-first application with a cloud backend and an AI assistant layer. The architecture is client-server with a mobile app as the primary interface, a RESTful backend API, and integrated AI services for transcription, extraction, and Q&A.

## Key Sections

- [architecture.md](./architecture.md): System architecture and components
- [tech_stack.md](./tech_stack.md): Technology choices and rationale
- [api_spec.md](./api_spec.md): API specifications and endpoint contracts
- [data_model.md](./data_model.md): Data schema and relationships
- [ai_prompting.md](./ai_prompting.md): AI assistant prompts and instructions
- [infrastructure.md](./infrastructure.md): Deployment and infrastructure

## Quick Reference

- **Primary platform**: iOS (SwiftUI)
- **Backend**: RESTful API (stack TBD)
- **AI**: LLM-powered assistant with automotive context
- **Data**: User builds, vehicles, parts, sessions

## Navigation

- Back to Brain: [../README.md](../README.md)
- Related sections: [/product/README.md](../product/README.md), [/mvp/README.md](../mvp/README.md)
