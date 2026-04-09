# Product Definition

## What is RipEm?

RipEm is an AI-powered platform for car enthusiasts to track, document, and share vehicle build projects. Think: "helpful mechanic in your pocket" that knows your car, your budget, your project history, and what thousands of others with the same car have done.

## Problem Statement

Car enthusiasts lack a dedicated, intelligent tool to document their builds. They resort to spreadsheets, random photos, scattered Facebook posts, and memory. There's no single place to log work done, parts installed, costs tracked, and share progress with the community in a compelling way.

## Solution

RipEm combines three powerful capabilities:
1. **Voice-to-Log**: Speak naturally after a work session; AI transcribes and extracts parts, costs, and time automatically.
2. **Intelligent AI Assistant**: Ask questions about YOUR specific car and project. Get answers informed by your history and community consensus.
3. **Build Publishing + Discovery**: Publish your build with one tap. AI auto-formats content. Watermark drives viral growth back to the app.

## Platform Priority

| Platform | Priority | Notes |
|----------|----------|-------|
| iOS | Primary | All features are designed and built here first |
| Web | Secondary | Feature parity is a goal, not a guarantee |

## Information Architecture

Every vehicle project in RipEm stores five categories of information:

### Project Details
- Vehicle make, model, year, VIN
- Purchase date, current status (active, archived, sold)
- Location/storage info
- Overall project goals and scope

### Parts Inventory
- All parts (installed, in-progress, needed)
- Part name, part number, supplier/source
- Cost, purchase date, warranty info
- Installation date and notes
- Current location (installed, on shelf, in storage)

### Work History & Maintenance
- Log entries (voice-transcribed or typed)
- Date, time spent, description of work
- Tools used, parts involved
- Before/after photos and videos
- Costs incurred

### Timeline & Scheduling
- Maintenance schedule (oil changes, inspections, etc.)
- Upcoming tasks and deadlines
- Work history (when things were done, how often)

### Resources & Tools
- Tools commonly used on this project
- Preferred suppliers and vendors
- Reference documents, manuals, links

## Three User Entry Points

1. **Documenters** - Just want easy voice-based maintenance logging
2. **Sharers** - Want to publish builds; AI auto-creates posts/videos with watermark
3. **Learners** - Want to discover other builds and learn from community

## Status

> Early development. See [/mvp/scope.md](../mvp/scope.md) for current phase and scope.
