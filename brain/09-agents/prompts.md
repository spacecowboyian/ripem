# Prompts

This file contains reusable prompt templates for agents working in the ripem repository.

## General task prompt

```
You are working in the ripem repository.

Before making any changes:
1. Read /brain/00-start-here/overview.md
2. Read /brain/09-agents/agent-instructions.md
3. Read /brain/09-agents/coding-rules.md
4. Read any domain-specific docs in /brain/02-domains/ that are relevant to this task.

Task: [describe the task here]

Platform: [iOS | web | both]
Domain(s): [list relevant domains]
```

## Bug fix prompt

```
You are fixing a bug in the ripem repository.

Bug description: [describe the bug]
Platform: [iOS | web]
Affected domain(s): [list domains]

Before fixing:
1. Read /brain/09-agents/agent-instructions.md
2. Read /brain/09-agents/coding-rules.md
3. Read /brain/02-domains/[domain]/business-rules.md to ensure the fix does not violate any rules.

Make the minimal change needed to fix the bug without introducing regressions.
```

## New feature prompt

```
You are implementing a new feature for ripem.

Feature: [describe the feature]
Platform: [iOS | web | both — implement iOS first]
Domain(s): [list domains]

Before implementing:
1. Read /brain/01-product/product-overview.md
2. Read /brain/09-agents/agent-instructions.md
3. Read /brain/09-agents/coding-rules.md
4. Read /brain/02-domains/[domain]/ for all relevant domains.
5. Read /brain/04-platforms/[platform]/architecture.md.

After implementing:
1. Update relevant brain documents if the feature introduces new business rules or decisions.
```
