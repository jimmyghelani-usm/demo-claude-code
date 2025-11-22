---
description: Execute PRD generation with optional Figma analysis and implementation
argument-hint: <requirements> [--figma <url> ...] [--implement]
---

# PRD Generation + Optional Implementation

This command orchestrates: generate PRD → (optional) analyze Figma → (optional) implement.

## Usage

```bash
/orchestrate prd <requirements> [--figma <url> ...] [--implement]
```

**Examples:**
```bash
# PRD only
/orchestrate prd "Build OAuth 2.0 authentication flow"

# PRD + Figma analysis
/orchestrate prd "Build dashboard" --figma "https://figma.com/file/ABC/...?node-id=1:1"

# PRD + Figma + implementation
/orchestrate prd "Build dashboard" --figma "https://figma.com/file/ABC/...?node-id=1:1" --implement

# PRD + implementation (no designs)
/orchestrate prd "Build API client library" --implement
```

## Modes

| Mode | What Happens |
|------|--------------|
| **PRD only** | Generates PRD with requirements, success criteria, technical notes |
| **PRD + Figma** | PRD + analyzes designs to extract specs |
| **PRD + Implement** | PRD + implements components (no designs) |
| **PRD + Figma + Implement** | Full workflow: PRD + design analysis + implementation + tests |

## Result

- **PRD mode**: Comprehensive PRD document in response
- **With Figma**: Design specs extracted and components ready
- **With Implement**: Components live at http://localhost:3000 with tests

---

**Shortcut**: This is equivalent to `/orchestrate prd <requirements> [--figma <url> ...] [--implement]`
