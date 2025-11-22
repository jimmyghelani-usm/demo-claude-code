---
description: Execute Figma → Implementation workflow
argument-hint: <figma-url> [figma-url2 ...]
---

# Figma → Implementation

This command orchestrates: analyze Figma designs → implement components → run tests → mount components.

## Usage

```bash
/orchestrate figma <url> [url2 url3 ...]
```

**Examples:**
```bash
/orchestrate figma "https://figma.com/file/ABC123/...?node-id=2171:13039"

/orchestrate figma "https://figma.com/file/ABC/...?node-id=1:1" "https://figma.com/file/DEF/...?node-id=2:2"
```

## What Happens

1. Analyzes Figma designs in parallel (figma-design-analyzer)
2. Implements components in parallel (senior-frontend-engineer)
3. Auto-triggers Storybook + component tests (sub-delegations)
4. Runs visual tests (playwright-dev-tester)
5. Mounts components in App.tsx
6. Cleans up temporary files

## Result

All components live at http://localhost:3000 with full test coverage.

---

**Shortcut**: This is equivalent to `/orchestrate figma <url> [url2 ...]`
