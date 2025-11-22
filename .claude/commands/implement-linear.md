---
description: Execute Linear ticket → Implementation workflow
argument-hint: <ticket-id>
---

# Linear → Implementation

This command orchestrates a complete workflow: fetch Linear ticket → analyze Figma designs → implement components → run tests → mount components → update ticket status.

## Usage

```bash
/orchestrate linear <ticket-id>
```

**Example:**
```bash
/orchestrate linear ENG-123
```

## What Happens

1. Fetches Linear ticket `ENG-123`
2. Extracts Figma URLs from description
3. Analyzes designs in parallel (figma-design-analyzer)
4. Implements components in parallel (senior-frontend-engineer)
5. Auto-triggers Storybook + component tests (sub-delegations)
6. Runs visual tests (playwright-dev-tester)
7. Mounts components in App.tsx
8. Updates Linear ticket as Done

## Result

All components live at http://localhost:3000 with full test coverage and Linear ticket updated.

---

**Shortcut**: This is equivalent to `/orchestrate linear <ticket-id>`
