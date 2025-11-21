---
description: Extract Figma designs and implement with testing (use when you have Figma URLs and want implementation)
---

# Figma Design → Implementation Workflow

Execute all steps in order. For Linear ticket workflow, use `/implement-linear <ticket-id>`.

---

## Step 1: Parse Figma URLs

Extract node IDs from provided URLs:
- Format: `node-id=XXXX-XXXXX` → `XXXX:XXXXX` (convert hyphens to colons)
- Count total URLs for parallelization

**Provided URLs**: {{prompt}}

## Step 2: Design Analysis (Parallel)

**Launch ALL figma-design-analyzer agents in SINGLE message with multiple Task calls.**

For each Figma URL:
```typescript
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze node XXXX:XXXX. Capture screenshot to docs/temp/figma-screenshots/. Extract colors, typography, layout, spacing. Return specs in response. NO markdown files.'
})
```

Wait for all analyses, collect specs from responses.

## Step 3: Implementation Planning

Review specs and determine:
1. Components to build (new vs updates)
2. Reusable patterns across designs
3. Parallel (independent) vs sequential (dependent) components

## Step 4: Implementation

**4A: Single Component**
- Launch one `senior-frontend-engineer` agent
- Pass Figma specs directly in prompt (NO file paths)
- Agent auto-triggers storybook-expert + react-component-tester

**4B: Multiple Independent Components**
- **Launch ALL senior-frontend-engineer agents in SINGLE message**
- Each gets its own Figma specs embedded in prompt
- Each auto-triggers storybook-expert + react-component-tester

Example for 3 components:
```typescript
Task({ subagent_type: 'senior-frontend-engineer', prompt: 'Implement HeroSection. Specs: [paste specs]' })
Task({ subagent_type: 'senior-frontend-engineer', prompt: 'Implement Navigation. Specs: [paste specs]' })
Task({ subagent_type: 'senior-frontend-engineer', prompt: 'Implement Footer. Specs: [paste specs]' })
```

Wait for ALL implementations and testing agents to complete.

**4D: Integrate into App (REQUIRED)**

After implementation, YOU must integrate components:

1. Read `src/App.tsx`
2. Update to import and render new component(s):
   ```typescript
   import { ComponentName } from '@/components/sections';

   function App() {
     return (
       <main>
         <ComponentName />
       </main>
     );
   }
   ```
3. Run `npm run type-check`
4. Tell user: "Component live at http://localhost:3000"

## Step 5: Verification

**5A: Unit Tests & Type Check**
```bash
npm run type-check
npm run test:run
```
Fix failures before proceeding.

**5B: Visual Testing (RECOMMENDED)**

If dev server not running:
```bash
lsof -ti:3000 || npm run dev  # Start if needed
```

Launch playwright-dev-tester:
```typescript
Task({
  subagent_type: 'playwright-dev-tester',
  model: 'haiku',
  prompt: 'Test at http://localhost:3000
           Visual verification: Compare against Figma screenshots in docs/temp/figma-screenshots/
           Take screenshots: Save to docs/temp/playwright-screenshots/
           Functional: Test interactions, responsive behavior
           Accessibility: Keyboard nav, ARIA attributes'
})
```

**Skip Playwright if**: Simple stateless component, backend-only, or config changes.

## Step 5.5: Cleanup

```bash
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md docs/project/*.json 2>/dev/null || true
rmdir docs/project/design-specs 2>/dev/null || true
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

**Keep**: Screenshots in `docs/temp/`, general docs, reusable MCP scripts.

## Critical Rules

1. **Parallelization**: Launch multiple agents in SINGLE message with multiple Task calls
2. **No file references**: Pass specs directly in prompts, not file paths
3. **Sequential steps**: 1 → 2 → 3 → 4 → 5 → 5.5 must respect order
4. **Within-step parallel**: Multiple Figma analyzers in parallel, multiple engineers in parallel
5. **Background processes**: Always check if server running first (`lsof -ti:3000`)
6. **Auto-integration**: Always mount components in App.tsx (Step 4D)
7. **Testing**: Each engineer auto-triggers storybook-expert + react-component-tester

---

**NOW BEGIN**: Parse URLs from {{prompt}} and execute all steps. Start immediately with Step 1.

ARGUMENTS: {{prompt}}
