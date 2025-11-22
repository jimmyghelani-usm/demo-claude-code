---
description: Complete workflow - Linear ticket → PRD → Figma → Implementation → Testing (use this for end-to-end ticket completion)
argument-hint: <ticket-id>
---

# Linear → Implementation Workflow

Execute all steps in order. For Figma-only workflow, use `/implement-design <figma-urls>`.

---

## Step 1: Fetch Linear Ticket

```bash
npx tsx mcp/tests/get-issue.ts {{prompt}}
```

Extract from JSON:
- Title, description, labels, assignee
- Figma URLs (if any)
- Status and team context

## Step 2: PRD (Optional - Skip by Default)

**Skip PRD unless**:
- User explicitly requests: `--with-prd`
- Ticket is ambiguous
- Formal documentation needed for review

**If needed**:
```typescript
Task({
  subagent_type: 'prd-writer',
  model: 'haiku',
  prompt: 'Create CONCISE PRD: requirements (P0/P1/P2), success criteria, technical notes. Skip personas/use cases/timelines. Return inline summary.'
})
```

## Step 3: Design Analysis (If Figma URLs Found)

**Launch ALL figma-design-analyzer agents in SINGLE message.**

For each Figma URL:
```typescript
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze node XXXX:XXXX. Capture screenshot to docs/temp/figma-screenshots/. Extract colors, typography, layout. Return specs in response. NO markdown files.'
})
```

Wait for all analyses, collect specs.

## Step 4: Implementation

**4A: Single Component**
- Launch one `senior-frontend-engineer` agent
- Pass PRD + Figma specs + Linear context in prompt (NO file paths)
- Agent auto-triggers storybook-expert + react-component-tester

**4B: Multiple Independent Components**
- **Launch ALL senior-frontend-engineer agents in SINGLE message**
- Each gets PRD + Figma specs embedded in prompt
- Each auto-triggers testing agents

Example:
```typescript
Task({ subagent_type: 'senior-frontend-engineer', prompt: 'Implement HeroSection. PRD: [paste]. Figma specs: [paste]' })
Task({ subagent_type: 'senior-frontend-engineer', prompt: 'Implement Nav. PRD: [paste]. Figma specs: [paste]' })
```

Wait for ALL implementations and testing agents.

**4D: Integrate into App (REQUIRED)**

1. Read `src/App.tsx`
2. Update to import and render:
   ```typescript
   import { ComponentName } from '@/components/sections';

   function App() {
     return <main><ComponentName /></main>;
   }
   ```
3. Run `npm run type-check`
4. Tell user: "Component live at http://localhost:3000"

## Step 5: Verification

**5A: Tests & Type Check**
```bash
npm run type-check
npm run test:run
```

**5B: Visual Testing (RECOMMENDED)**
```bash
lsof -ti:3000 || npm run dev  # Start if needed
```

```typescript
Task({
  subagent_type: 'playwright-dev-tester',
  model: 'haiku',
  prompt: 'Test at http://localhost:3000. Compare against Figma screenshots. Test interactions, responsive, a11y.'
})
```

## Step 5.5: Cleanup

```bash
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md docs/project/*.json 2>/dev/null || true
rmdir docs/project/design-specs 2>/dev/null || true
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

## Step 6: Update Linear Ticket

**When implementation successful**:

```typescript
import { linear } from './mcp';

await linear.updateIssue({
  id: '{{prompt}}',
  state: 'Done',
  comment: 'Implementation complete:
- Component: [Name]
- Tests: [X] passing
- Live: http://localhost:3000
- Screenshots: docs/temp/playwright-screenshots/'
});
```

## Critical Rules

1. **Parallelization**: Multiple agents in SINGLE message
2. **No file references**: Pass content directly in prompts
3. **Sequential steps**: 1 → 2 → 3 → 4 → 5 → 5.5 → 6
4. **Within-step parallel**: Multiple analyzers, multiple engineers
5. **Auto-integration**: Mount in App.tsx (Step 4D)
6. **Update Linear**: Mark Done when complete (Step 6)

---

**NOW BEGIN**: Fetch ticket {{prompt}} and execute all steps. Start with Step 1.

ARGUMENTS: {{prompt}}
