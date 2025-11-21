---
description: Create a standalone PRD with optional implementation (for planning/review or full execution)
---

# PRD Creation with Optional Implementation

Use for planning/review without Linear. For Linear workflow, use `/implement-linear <ticket-id>`.

---

## Step 1: Create PRD

```typescript
Task({
  subagent_type: 'prd-writer',
  model: 'haiku',
  prompt: 'Create CONCISE PRD: requirements (P0/P1/P2), success criteria, technical notes. Skip personas/use cases/timelines. Return content in response. NO markdown files.

           Requirements: {{prompt}}'
})
```

Wait for PRD, collect response.

## Step 2: Ask User for Next Steps

```typescript
AskUserQuestion({
  questions: [{
    question: "How would you like to proceed with this PRD?",
    header: "Next Steps",
    multiSelect: false,
    options: [
      { label: "Just the PRD (done)", description: "Stop here - PRD ready for review" },
      { label: "Implement from Figma", description: "Extract Figma designs and implement" },
      { label: "Implement directly", description: "Implement based on PRD (no Figma)" },
      { label: "Update Linear ticket", description: "Add PRD to Linear as comment" }
    ]
  }]
})
```

## Step 3: Execute Based on Choice

### A: "Just the PRD (done)"
- Summarize key points
- Provide PRD content from response
- End workflow

### B: "Implement from Figma"
1. Extract node IDs from Figma URLs
2. Launch figma-design-analyzer agents (parallel)
3. Pass PRD + Figma specs to senior-frontend-engineer agents (parallel)
4. Integrate in App.tsx (Step 4D from implement-design)
5. Run tests (`npm run type-check`, `npm run test:run`)
6. Launch playwright-dev-tester for visual verification
7. Cleanup temp files

### C: "Implement directly"
1. Pass PRD to senior-frontend-engineer agent
2. Agent auto-triggers testing agents
3. Integrate in App.tsx
4. Run tests
5. Cleanup

### D: "Update Linear ticket"
Ask user for ticket ID, then:
```typescript
import { linear } from './mcp';

await linear.createComment({
  issueId: '[TICKET-ID]',
  body: '[PRD CONTENT]'
});
```

## Critical Rules

1. **PRD content in response** - No markdown files
2. **User choice required** - Always ask before implementing
3. **Parallelization** - Multiple agents in single message
4. **Auto-integration** - Mount components in App.tsx if implementing
5. **Pass content directly** - Embed PRD/specs in prompts, not file paths

---

**NOW BEGIN**: Create PRD for {{prompt}}, then ask user for next steps.

ARGUMENTS: {{prompt}}
