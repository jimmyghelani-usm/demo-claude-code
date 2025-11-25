---
description: Orchestrate multi-agent workflows. Parse arguments and execute Linear/Figma/PRD workflows.
argument-hint: linear <ticket-id> | figma <url> [url ...] | prd <requirements> [--figma <url> ...] [--implement] | prompt
---

## Your Job

Orchestrate multi-agent workflows. Parse arguments, invoke agents in correct sequence, run tests, cleanup.

## 🔒 CRITICAL: MCP Wrapper Enforcement

**ALL external tool usage MUST go through local MCP wrappers, NEVER direct API calls.**

### MCP Wrapper Locations
- **Figma**: `mcp/servers/figma/` + `mcp/tests/figma/`
- **Playwright**: `mcp/servers/playwright/` + `mcp/tests/playwright/`
- **Linear**: `mcp/servers/linear/` + `mcp/tests/linear/`

### Non-Negotiable Rules for All Agents

1. **figma-design-analyzer** MUST:
   - Use reusable scripts from `mcp/tests/figma/`
   - Call `figma.*` wrapper functions from `mcp/servers/figma/`
   - Never write direct Figma API calls
   - Example: `import { figma } from '@mcp'; await figma.getDesignContext(...)`

2. **senior-frontend-engineer** MUST:
   - Never write direct Playwright code
   - Use MCP wrappers for any browser interaction
   - Call `mcp-execution-agent` or reuse scripts for Figma/Linear context
   - Example: Split large designs among multiple senior-frontend-engineer instances

3. **playwright-dev-tester** MUST:
   - Use reusable test scripts from `mcp/tests/playwright/`
   - Call `playwright.*` wrapper functions from `mcp/servers/playwright/`
   - Never write native Playwright code directly
   - Example: `import { playwright } from '@mcp'; await playwright.navigate(...)`

4. **All Agents** MUST:
   - Organize scripts by MCP client: `mcp/tests/figma/`, `mcp/tests/linear/`, `mcp/tests/playwright/`
   - Reuse existing scripts before creating new ones
   - Follow pattern from `mcp/tests/get-issue.ts` (CLI args, no hardcoding)
   - Delete one-off scripts after use (keep only reusable ones)
   - Never create direct API client instances

### Enforcement: How This Works

- **figma-design-analyzer** calls `figma.getDesignContext()` from wrapper
- **playwright-dev-tester** calls `playwright.navigate()`, `playwright.click()` etc from wrapper
- **senior-frontend-engineer** uses results from other agents' MCP calls
- Test scripts live in `mcp/tests/[client-type]/` for reuse

### Code Organization
```
mcp/tests/
├── figma/
│   ├── analyze-design.ts (reusable)
│   ├── extract-specs.ts (reusable)
│   └── get-details.ts (reusable)
├── linear/
│   ├── get-issue.ts (reusable)
│   └── update-issue.ts (reusable)
├── playwright/
│   ├── test-component.ts (reusable)
│   ├── screenshot.ts (reusable)
│   └── verify-flow.ts (reusable)
└── README.md (document all reusable scripts)
```

## 🚀 Parallel senior-frontend-engineer Execution

The `senior-frontend-engineer` agent should scale horizontally for complex tasks.

### When to Run Multiple Instances

**Analyze design/requirement complexity:**
- **Small** (1-3 components): 1 instance
- **Medium** (4-7 components): 2 instances (run in parallel)
- **Large** (8+ components): 3-4 instances (run in parallel)

**Each instance should get a balanced subset:**
- Component A, Component B (Instance 1)
- Component C, Component D (Instance 2)
- Component E, Component F (Instance 3)

### How to Execute

Instead of:
```
Task("senior-frontend-engineer", { figmaSpecs, allComponents })
```

For complex designs, run in parallel:
```
Task("senior-frontend-engineer", { figmaSpecs, components: [A, B] })
Task("senior-frontend-engineer", { figmaSpecs, components: [C, D] })
Task("senior-frontend-engineer", { figmaSpecs, components: [E, F] })
```

### Benefits

- **Speed**: 8 components in 2 agents ~40% faster than 1 agent
- **Scalability**: Each agent independently implements its assigned components
- **Parallelization**: Claude Code handles concurrent subagent execution
- **Clarity**: Each agent has clear scope (specific components to build)

### Example: Large Figma Design

```
Input: Design with 10 components

Analysis: Large design (10 components) → Run 2 parallel instances

Parallel Execution:
├─ Task("senior-frontend-engineer", {
│  ├─ figmaSpecs: [...],
│  ├─ assignedComponents: ["Button", "Card", "Modal", "Input", "Switch"]
│  └─ })
│
└─ Task("senior-frontend-engineer", {
   ├─ figmaSpecs: [...],
   ├─ assignedComponents: ["Header", "Footer", "Sidebar", "Dropdown", "Badge"]
   └─ })

Result: Both agents complete ~50% faster
```

## Agent Flow Analysis

Each workflow type requires a specific sequence of agents. Before starting, analyze which agents MUST run for the given workflow and communicate this to the LLM.

### Agent Dependency Map

#### Figma Flow (Design → Code → Tests → Stories → Visual Verification)
**All agents that MUST run:**
1. ✅ **figma-design-analyzer** - Extract design specifications from Figma
2. ✅ **senior-frontend-engineer** - Generate React component code
3. ✅ **storybook-expert** - Create component documentation/stories
4. ✅ **react-component-tester** - Write unit tests
5. ✅ **playwright-dev-tester** - Visual verification against Figma design

**Execution order:**
```
Figma URLs
    ↓
figma-design-analyzer (analyze design, uses mcp/servers/figma/)
    ↓
[senior-frontend-engineer x1-4] (parallel instances based on complexity)
    ↓
[storybook-expert | react-component-tester] (parallel)
    ↓
playwright-dev-tester (visual parity check using mcp/servers/playwright/)
```

**Rationale:**
- Design must be analyzed first (figma-design-analyzer via MCP)
- Implementation uses analysis results (multiple senior-frontend-engineer instances)
- Scale senior-frontend-engineer: 1 small, 2 medium, 3-4 large designs
- Stories and tests can work in parallel (independent of each other)
- playwright-dev-tester DOES NOT write test files - only compares screenshots against Figma
- All agents use local MCP wrappers, never direct API calls
- **NO E2E test files created** - Visual verification only

#### Linear Flow (Ticket → Design → Code → Tests → Stories → Visual Verification)
**All agents that MUST run:**
1. ✅ **mcp-execution-agent** - Fetch Linear ticket context
2. ✅ **figma-design-analyzer** - Extract Figma designs from ticket
3. ✅ **senior-frontend-engineer** - Implement based on ticket + design
4. ✅ **storybook-expert** - Document components
5. ✅ **react-component-tester** - Write unit tests
6. ✅ **playwright-dev-tester** - Visual verification against Figma design

**Execution order:**
```
Linear Ticket ID
    ↓
mcp-execution-agent (fetch ticket + extract Figma URLs)
    ↓
figma-design-analyzer (analyze designs, uses mcp/servers/figma/)
    ↓
[senior-frontend-engineer x1-4] (parallel instances based on complexity)
    ↓
[storybook-expert | react-component-tester] (parallel)
    ↓
playwright-dev-tester (visual parity check using mcp/servers/playwright/)
```

**Rationale:**
- Ticket provides context (mcp-execution-agent)
- Designs extracted from ticket links (figma-design-analyzer via MCP)
- Implementation combines ticket requirements + design (multiple instances)
- Scale senior-frontend-engineer: 1 small, 2 medium, 3-4 large designs
- Stories and tests in parallel
- playwright-dev-tester DOES NOT write test files - only compares screenshots against Figma
- All agents use local MCP wrappers, never direct API calls
- **NO E2E test files created** - Visual verification only

#### PRD Flow (Requirements → [Code] → [Tests] → [Stories] → [Visual Verification])
**All agents that MUST run (when --implement flag used):**
1. ✅ **prd-writer** - Create/refine product requirements
2. ✅ **senior-frontend-engineer** - Implement based on PRD (if --implement)
3. ✅ **storybook-expert** - Document (if --implement)
4. ✅ **react-component-tester** - Test (if --implement)
5. ✅ **playwright-dev-tester** - Visual verification (if --implement)

**Optional agents (conditional):**
- **figma-design-analyzer** - If --figma URLs provided

**Execution order (with --implement):**
```
PRD Requirements [+ optional Figma URLs]
    ↓
prd-writer (create PRD)
    ↓
[figma-design-analyzer] (optional, if --figma provided, uses mcp/servers/figma/)
    ↓
[senior-frontend-engineer x1-4] (parallel instances based on complexity)
    ↓
[storybook-expert | react-component-tester] (parallel)
    ↓
playwright-dev-tester (visual parity check using mcp/servers/playwright/)
```

**Execution order (without --implement):**
```
PRD Requirements
    ↓
prd-writer (create PRD only)
    ↓
(Stop - no implementation agents run)
```

**Rationale:**
- PRD must be written first
- Implementation is optional (--implement flag)
- Design analysis only if Figma URLs provided (uses MCP)
- If implementing, scale senior-frontend-engineer: 1 small, 2 medium, 3-4 large
- Same sequence as other flows
- Stories and tests in parallel
- playwright-dev-tester DOES NOT write test files - only compares screenshots against Figma
- All agents use local MCP wrappers, never direct API calls
- **NO E2E test files created** - Visual verification only

## Workflow Types

**linear <ticket-id>**
1. Task("mcp-execution-agent", { operation: "linear", taskId })
2. Fetch Linear ticket → extract Figma URLs, title, description
3. Task("figma-design-analyzer", { figmaUrls, linearIssue }) [parallel]
4. Task("senior-frontend-engineer", { figmaSpecs, linearIssue }) [parallel]
5. Task("storybook-expert", { components, requirements }) [after impl]
6. Task("react-component-tester", { components, testPaths }) [after impl]
7. Run: `npm run type-check && npm run test:run`
8. Task("playwright-dev-tester", { figmaSpecs, implementations }) [visual verification only - NO test files]
9. Cleanup: `rm -rf mcp/tests/temp-* docs/temp/*`

**figma <url> [url2 ...]**
1. Parse URLs → extract node IDs
2. Task("figma-design-analyzer", { figmaUrls }) [parallel]
3. Task("senior-frontend-engineer", { figmaSpecs }) [parallel]
4. Task("storybook-expert", { components, requirements }) [after impl]
5. Task("react-component-tester", { components, testPaths }) [after impl]
6. Run: `npm run type-check && npm run test:run`
7. Task("playwright-dev-tester", { figmaSpecs, implementations }) [visual verification only - NO test files]
8. Cleanup: `rm -rf mcp/tests/temp-* docs/temp/*`

**prd <requirements> [--figma <url>] [--implement]**
1. Task("prd-writer", { requirements })
2. If --figma: Task("figma-design-analyzer", { figmaUrls }) [parallel]
3. If --implement: Task("senior-frontend-engineer", { figmaSpecs or prdContent }) [parallel]
4. If --implement:
   - Task("storybook-expert", { components, requirements }) [after impl]
   - Task("react-component-tester", { components, testPaths }) [after impl]
5. Run: `npm run type-check && npm run test:run`
6. If --implement: Task("playwright-dev-tester", { implementations }) [visual verification only - NO test files]
7. Cleanup: `rm -rf mcp/tests/temp-* docs/temp/*`

**prompt**
1. based on user input, determine which agents to run
2. agents that can be run are either figma-design-analyzer, senior-frontend-engineer, storybook-expert, react-component-tester or playwright-dev-tester
3. Run as many agents as you need from the above list in any order and in parallel
4. Try and orchestrate the flow as much as possible

## Key Rules

- Use explicit agent names only: `Task("figma-design-analyzer", {...})`
- Launch multiple calls in parallel when possible
- Pass only what each agent needs
- Sequential phases: Fetch → Analyze → Implement → Test → Cleanup
- Parallel within phase: Multiple designs/components at once

## Required Agents Summary

### Figma Workflow
**All agents that MUST run (non-optional):**
- ✅ figma-design-analyzer
- ✅ senior-frontend-engineer
- ✅ storybook-expert
- ✅ react-component-tester
- ✅ playwright-dev-tester

**Total: 5 agents**

### Linear Workflow
**All agents that MUST run (non-optional):**
- ✅ mcp-execution-agent
- ✅ figma-design-analyzer
- ✅ senior-frontend-engineer
- ✅ storybook-expert
- ✅ react-component-tester
- ✅ playwright-dev-tester

**Total: 6 agents**

### PRD Workflow (with --implement)
**All agents that MUST run (non-optional):**
- ✅ prd-writer
- ✅ senior-frontend-engineer
- ✅ storybook-expert
- ✅ react-component-tester
- ✅ playwright-dev-tester

**Optional agents (conditional):**
- ⚠️ figma-design-analyzer (only if --figma URLs provided)

**Total: 5 agents minimum, 6 with Figma design**

### PRD Workflow (without --implement)
**All agents that MUST run (non-optional):**
- ✅ prd-writer

**Total: 1 agent**

### Prompt workflow
**All agents that must run (non-optional):**
- Depends on user input; can be any of:
  - figma-design-analyzer
  - senior-frontend-engineer
  - storybook-expert
  - react-component-tester
  - playwright-dev-tester

## Communication Protocol for Orchestration

When starting an orchestration flow, you MUST:

1. **Identify workflow type** from command arguments (linear, figma, or prd)
2. **Communicate required agents** to the user before starting:
   ```
   Orchestrating [WORKFLOW TYPE] flow
   Agents that will run: [list of agents]
   Total agents: [N]
   Estimated time: [estimate]
   ```
3. **Show execution plan** with parallel groups:
   ```
   Phase 1 (Fetch/Analyze):
   - Agent A [parallel]
   - Agent B [parallel]

   Phase 2 (Implement):
   - Agent C [sequential]

   Phase 3 (Test):
   - Agent D [parallel]
   - Agent E [parallel]
   ```
4. **Execute agents** in the correct order
5. **Report completion** with results from each agent
6. **Cleanup** temporary files

## Example Communication

```
🚀 Orchestrating Figma workflow

Required agents to run:
1. figma-design-analyzer - Extract design specs
2. senior-frontend-engineer - Generate component code
3. storybook-expert - Create component stories
4. react-component-tester - Write unit tests
5. playwright-dev-tester - Create E2E tests

Total: 5 agents
Estimated time: 15-20 minutes

Execution plan:
├─ Phase 1: Analyze design
│  └─ figma-design-analyzer
├─ Phase 2: Implement
│  └─ senior-frontend-engineer
├─ Phase 3: Document & Test (parallel)
│  ├─ storybook-expert
│  └─ react-component-tester
└─ Phase 4: E2E Testing
   └─ playwright-dev-tester

Starting execution...
```
