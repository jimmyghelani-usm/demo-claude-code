---
description: Universal orchestrator for multi-agent workflows. Coordinates Linear/Figma/PRD to implementation.
argument-hint: linear <ticket-id> | figma <url> [url ...] | prd <requirements> [--figma <url> ...] [--implement]
---

# Execute Multi-Agent Workflow

You are executing a workflow orchestrator. Parse the user's arguments to determine which workflow to execute, then follow the steps below. Invoke agents explicitly with Task() using exact agent names as string literals.

## Workflow Selection

Determine workflow type from first argument:
- **`linear <ticket-id>`** - Fetch Linear ticket, extract Figma URLs, analyze designs, implement, test, mount, update ticket
- **`figma <url> [url2 ...]`** - Analyze Figma designs, implement, test, mount
- **`prd <requirements>`** - Generate PRD, optionally analyze Figma (--figma), optionally implement (--implement)

## Linear Workflow: `/orchestrate linear ENG-123`

1. Fetch Linear ticket `ENG-123` using mcp/tests/get-issue.ts
2. Parse response to extract:
   - Issue ID, title, description, labels
   - Figma URLs (if any) from description
3. Analyze the issue to determine component count and complexity
4. **If Figma URLs found:**
   - Task("figma-design-analyzer", { figmaUrls, linearIssue })
   - Launch in parallel for each URL
   - Wait for all to complete
5. **Then implement using specs:**
   - Task("senior-frontend-engineer", { figmaSpecs, linearIssue, idx: 0 })
   - Task("senior-frontend-engineer", { figmaSpecs, linearIssue, idx: 1 })
   - Launch in parallel for each spec
   - Wait for all to complete
6. Run type checks and tests: `npm run type-check && npm run test:run`
7. **Run visual tests:**
   - Task("playwright-dev-tester", { figmaSpecs, implementations, linearIssue })
8. Mount components: `npm run mount` (or manual App.tsx update)
9. Clean temporary files: `rm -rf mcp/tests/temp-* docs/temp/*`
10. Update Linear ticket: `linear update ENG-123 --state Done --comment "✅ Implementation complete. Live at http://localhost:3000"`

## Figma Workflow: `/orchestrate figma "https://figma.com/file/...?node-id=2171:13039"`

1. Parse Figma URLs from arguments
2. Extract node IDs from each URL
3. **Analyze all designs in parallel:**
   - Task("figma-design-analyzer", { figmaUrls: ["url1"], ... })
   - Task("figma-design-analyzer", { figmaUrls: ["url2"], ... })
   - Launch all at once, wait for all to complete
4. **Implement all components in parallel:**
   - Task("senior-frontend-engineer", { figmaSpecs, idx: 0 })
   - Task("senior-frontend-engineer", { figmaSpecs, idx: 1 })
   - Launch all at once, wait for all to complete
5. Run type checks and tests: `npm run type-check && npm run test:run`
6. **Run visual tests:**
   - Task("playwright-dev-tester", { figmaSpecs, implementations })
7. Mount components: `npm run mount`
8. Clean temporary files: `rm -rf mcp/tests/temp-* docs/temp/*`

## PRD Workflow: `/orchestrate prd "Build OAuth 2.0 authentication"`

1. **Generate PRD (always first):**
   - Task("prd-writer", { requirements: "Build OAuth 2.0 authentication" })
   - Wait for completion

2. **If `--figma <url>` flag present:**
   - Parse Figma URLs from remaining arguments
   - Task("figma-design-analyzer", { figmaUrls: [...], ... })
   - Launch all in parallel, wait for completion

3. **If `--implement` flag present:**
   - **If Figma specs available from step 2:**
     - Task("senior-frontend-engineer", { figmaSpecs, idx: 0 })
     - Launch in parallel for each spec
   - **Else (no Figma, just PRD):**
     - Task("senior-frontend-engineer", { prdContent, idx: 0 })
     - Still implement but use PRD as guide
   - Wait for all implementations to complete

4. **If implemented in step 3, then test:**
   - Run: `npm run type-check && npm run test:run`
   - Task("playwright-dev-tester", { implementations, figmaSpecs: [] })
   - Mount components: `npm run mount`
   - Clean temporary files

## Key Rules

1. **Use explicit agent names ONLY** - Never variables or indirection
   - ✅ `Task("figma-design-analyzer", { ... })`
   - ❌ `Task(agents[0], { ... })`
   - ❌ `Task(delegation.agent, { ... })`

2. **Launch agents in parallel when possible**
   - Multiple figma-design-analyzer calls → all at once
   - Multiple senior-frontend-engineer calls → all at once
   - Multiple playwright-dev-tester calls → all at once

3. **Pass only what each agent needs**
   - Don't duplicate data
   - figma-design-analyzer needs: figmaUrls
   - senior-frontend-engineer needs: figmaSpecs, linearIssue (if any)
   - playwright-dev-tester needs: implementations, figmaSpecs (for visual comparison)

4. **Execute orchestrator operations directly** (don't delegate these)
   - Fetch Linear ticket using mcp/tests/get-issue.ts
   - Run npm commands directly
   - Update Linear ticket directly
   - Mount components directly
   - Only delegate to agents for analysis/implementation/testing

5. **Sequential phases, parallel within phase**
   - Phase 1: Fetch + Analyze (sequential, one after another)
   - Phase 2: Design analysis (all parallel)
   - Phase 3: Implementation (all parallel)
   - Phase 4: Testing (all parallel)
   - Phase 5: Mount + Cleanup (sequential)

## Agent Invocation

When you invoke agents, follow this pattern exactly:

```typescript
Task(
  "agent-name",  // Always: explicit string, one of:
                 // - figma-design-analyzer
                 // - senior-frontend-engineer
                 // - playwright-dev-tester
                 // - prd-writer
  {
    // Agent-specific context, pass minimally
    figmaUrls: [...],        // for figma-design-analyzer
    figmaSpecs: [...],       // for senior-frontend-engineer
    linearIssue: { ... },    // for context
    implementations: [...],  // for playwright-dev-tester
    requirements: "...",     // for prd-writer
    idx: 0                   // for parallelization tracking
  }
)
```

## Terminal Commands (Execute Directly)

- **Fetch Linear issue**: `npx tsx mcp/tests/get-issue.ts ENG-123`
- **Type check**: `npm run type-check`
- **Run tests**: `npm run test:run`
- **Mount components**: Manual App.tsx update or script
- **Cleanup**: `rm -rf mcp/tests/temp-* docs/temp/*`
- **Update Linear**: Use mcp/tests or direct API call

## Control Flow

```
Parse arguments
  ↓
Determine workflow type (linear / figma / prd)
  ↓
Execute workflow steps (see above)
  ├─ Orchestrator operations (direct)
  ├─ Agent invocations (explicit Task calls)
  └─ Terminal commands (direct)
  ↓
Report completion
```

---

**Summary**: Parse input → Execute steps → Invoke agents explicitly with Task() → Complete workflow.
