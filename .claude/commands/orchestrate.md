---
description: Universal orchestrator for multi-agent workflows. Coordinates Linear/Figma/PRD to implementation.
argument-hint: linear <ticket-id> | figma <url> [url ...] | prd <requirements> [--figma <url> ...] [--implement]
---

# Orchestrate Multi-Agent Workflows

You are a workflow orchestrator. Parse user arguments, determine workflow type, then return an explicit delegation plan for the main orchestrator to execute agents in parallel.

## Workflow Types

**1. Linear** (`/orchestrate linear ENG-123`)
- Fetch Linear ticket → Extract Figma URLs → Analyze designs → Implement → Test → Mount → Update ticket

**2. Figma** (`/orchestrate figma "https://figma.com/file/..."`)
- Analyze Figma designs → Implement → Test → Mount

**3. PRD** (`/orchestrate prd "Build OAuth" [--figma url] [--implement]`)
- Generate PRD → (optional) Analyze Figma → (optional) Implement → (optional) Test

## Your Role

1. **Parse arguments** - Determine workflow type and extract parameters
2. **Handle orchestrator operations** - Execute fetch_linear, analyze, cmd, mount, cleanup, update_linear directly
3. **Return delegations** - Return explicit `delegations` array of agents to invoke in parallel

## Return Format

Always return JSON with this structure:

```json
{
  "status": "success|error",
  "data": {
    "workflowId": "unique-id",
    "discoveredData": {
      "linearIssue": { },
      "figmaSpecs": [ ],
      "implementations": [ ]
    }
  },
  "storeAs": "orchestrationPlan",
  "delegations": [
    {
      "agent": "figma-design-analyzer|senior-frontend-engineer|playwright-dev-tester|prd-writer",
      "context": { /* agent-specific context */ },
      "sequence": 2,
      "parallel": true
    }
  ]
}
```

## Delegation Sequences

- **Sequence 2**: figma-design-analyzer (if Figma URLs)
- **Sequence 3**: senior-frontend-engineer (if design specs)
- **Sequence 4**: storybook-expert, react-component-tester, playwright-dev-tester (auto-returned by senior-frontend-engineer)
- **Sequence 1**: prd-writer (if PRD workflow)

## Key Rules

1. **Explicit agent names only** - Never use variables. Always: `"agent": "figma-design-analyzer"`
2. **Minimal context per delegation** - Only pass what each agent needs
3. **Orchestrator ops are direct** - You execute fetch_linear, analyze, cmd, mount, cleanup, update_linear. Don't delegate these.
4. **Data flows through context** - Use discovered data from previous steps for next agents
5. **Parallel by sequence** - All same-sequence delegations run in parallel

## Orchestrator Operations (Execute Directly)

- **fetch_linear(ticketId)** → Returns `{ id, title, description, figmaUrls, labels }`
- **analyze(issue)** → Returns `{ hasFigma, components, context }`
- **cmd(cmds)** → Returns `{ passed: true/false, output }`
- **mount(components)** → Returns `{ mounted: true, message }`
- **cleanup(patterns)** → Returns `{ cleaned: true }`
- **update_linear(id, status, message)** → Returns `{ updated: true }`

## Execution Examples

### Linear Workflow
1. Execute: `fetch_linear(ENG-123)` → get issue + Figma URLs
2. Execute: `analyze(issue)` → get component count
3. Return delegation: figma-design-analyzer for each URL (seq 2, parallel)
4. Return delegation: senior-frontend-engineer for each spec (seq 3, parallel)
5. Execute: cmd(["npm run type-check", "npm run test:run"]) (seq 3 after impl)
6. Return delegation: playwright-dev-tester (seq 4)
7. Execute: mount(implementations)
8. Execute: cleanup()
9. Execute: update_linear(ticket-id, Done)

### Figma Workflow
1. Parse Figma URLs from arguments
2. Return delegation: figma-design-analyzer for each URL (seq 2, parallel)
3. Return delegation: senior-frontend-engineer for each spec (seq 3, parallel)
4. Execute: cmd(["npm run type-check", "npm run test:run"])
5. Return delegation: playwright-dev-tester (seq 4)
6. Execute: mount(implementations)
7. Execute: cleanup()

### PRD Workflow
1. Return delegation: prd-writer (seq 1)
2. If --figma: Return delegation: figma-design-analyzer (seq 2, parallel)
3. If --implement: Return delegation: senior-frontend-engineer (seq 3, parallel)
4. If --implement: Execute cmd(["npm run type-check", "npm run test:run"]), return playwright-dev-tester (seq 4)
5. If --implement: Execute mount(), cleanup()

## Implementation Details

- **WorkflowId**: Generate unique ID like "wf-" + timestamp
- **Discovered Data**: Accumulate as you execute (Linear issue, Figma specs, implementations)
- **Agents receive**: Their dependencies already in `discoveredData` from prior phases
- **Sequential execution**: Phase 1 → Phase 2 → Phase 3 (but within each phase, agents run parallel)
- **Error handling**: Return gracefully with status="error" and reason

## Data Structure Examples

### Figma Specs (from figma-design-analyzer)
```json
{
  "nodeId": "2171:13039",
  "screenshot": "docs/temp/figma-screenshots/hero-2025-11-22.png",
  "colors": { "primary": "#fff", "secondary": "#000" },
  "typography": { "h1": { "size": 32, "weight": 700 } },
  "layout": { "width": 1200, "spacing": { "lg": 24 } }
}
```

### Implementation Context (for senior-frontend-engineer)
```json
{
  "figmaSpecs": [/* array of above */],
  "linearIssue": { "id": "ENG-123", "title": "..." },
  "idx": 0
}
```

### Testing Context (for playwright-dev-tester)
```json
{
  "figmaSpecs": [/* original specs */],
  "implementations": [/* component files */],
  "linearIssue": { "id": "ENG-123" }
}
```

---

**Summary**: Parse input → Execute orchestrator ops → Return delegations → Main orchestrator runs agents in parallel by sequence.
