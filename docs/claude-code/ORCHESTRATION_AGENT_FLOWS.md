# Orchestration Agent Flows

This document provides a comprehensive overview of all agent workflows that the `/orchestrate` command executes. Use this as a reference for understanding required agents for each workflow type.

## Quick Reference: Required Agents by Workflow

### Figma Workflow
**Command**: `/orchestrate figma <url> [url2 ...]`

**Agents that MUST run (non-optional):**
```
1. figma-design-analyzer
2. senior-frontend-engineer
3. storybook-expert
4. react-component-tester
5. playwright-dev-tester
```

**Total: 5 agents**

**Execution phases:**
- Phase 1: Analyze design specs from Figma
- Phase 2: Generate component implementation
- Phase 3: Create stories + tests (parallel)
- Phase 4: Create E2E tests

---

### Linear Workflow
**Command**: `/orchestrate linear <ticket-id>`

**Agents that MUST run (non-optional):**
```
1. mcp-execution-agent (fetch ticket)
2. figma-design-analyzer (extract Figma from ticket)
3. senior-frontend-engineer (implement)
4. storybook-expert (document)
5. react-component-tester (test)
6. playwright-dev-tester (E2E)
```

**Total: 6 agents**

**Execution phases:**
- Phase 1: Fetch ticket details from Linear + extract Figma URLs
- Phase 2: Analyze design specs from extracted Figma
- Phase 3: Generate component implementation based on ticket + design
- Phase 4: Create stories + tests (parallel)
- Phase 5: Create E2E tests

---

### PRD Workflow (with --implement)
**Command**: `/orchestrate prd "<requirements>" --implement [--figma <url> ...]`

**Agents that MUST run (non-optional):**
```
1. prd-writer (create PRD)
2. senior-frontend-engineer (implement)
3. storybook-expert (document)
4. react-component-tester (test)
5. playwright-dev-tester (E2E)
```

**Optional agents (conditional):**
```
- figma-design-analyzer (only if --figma URLs provided)
```

**Total: 5 agents minimum, 6 with Figma**

**Execution phases:**
- Phase 1: Write/refine PRD from requirements
- Phase 2 (optional): Analyze design specs (if --figma provided)
- Phase 3: Generate implementation based on PRD (+ design if available)
- Phase 4: Create stories + tests (parallel)
- Phase 5: Create E2E tests

---

### PRD Workflow (without --implement)
**Command**: `/orchestrate prd "<requirements>"`

**Agents that MUST run (non-optional):**
```
1. prd-writer (create PRD only)
```

**Total: 1 agent**

**Execution phases:**
- Phase 1: Write/refine PRD from requirements
- (No implementation, testing, or documentation phases)

---

## Detailed Agent Flow Diagrams

### Figma Workflow Flow

```
USER INPUT: Figma URL(s)
    │
    ▼
┌──────────────────────────┐
│ figma-design-analyzer    │
│ - Parse Figma URLs       │
│ - Extract design specs   │
│ - Generate code samples  │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ senior-frontend-engineer │
│ - Write React component  │
│ - Add TypeScript types   │
│ - Create component files │
└──────────┬───────────────┘
           │
           ├─────────────────────────────┐
           │                             │
           ▼                             ▼
    ┌────────────────┐        ┌──────────────────┐
    │storybook-expert│        │react-component-  │
    │                │        │tester            │
    │- Create CSF3   │        │                  │
    │  stories       │        │- Write tests     │
    │- Add args &    │        │- Add accessibility
    │  controls      │        │- Edge cases      │
    └────────┬───────┘        └────────┬─────────┘
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
         ┌──────────────────────────┐
         │ playwright-dev-tester    │
         │ - Create browser tests   │
         │ - Verify visual rendering
         │ - Test user workflows    │
         └──────────────────────────┘
                    │
                    ▼
          ✅ Workflow Complete
     (Component + Docs + Tests + E2E)
```

### Linear Workflow Flow

```
USER INPUT: Linear Ticket ID
    │
    ▼
┌──────────────────────────┐
│ mcp-execution-agent      │
│ - Fetch ticket details   │
│ - Extract Figma URLs     │
│ - Get requirements       │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ figma-design-analyzer    │
│ - Parse extracted Figma  │
│ - Extract design specs   │
│ - Combine with ticket    │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ senior-frontend-engineer │
│ - Implement from ticket  │
│   + design specs         │
│ - Write React component  │
└──────────┬───────────────┘
           │
           ├─────────────────────────────┐
           │                             │
           ▼                             ▼
    ┌────────────────┐        ┌──────────────────┐
    │storybook-expert│        │react-component-  │
    │ (parallel)     │        │tester (parallel) │
    └────────┬───────┘        └────────┬─────────┘
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
         ┌──────────────────────────┐
         │ playwright-dev-tester    │
         │ - Create E2E tests       │
         │ - Verify implementation  │
         └──────────────────────────┘
                    │
                    ▼
          ✅ Workflow Complete
   (Ticket → Docs + Tests + E2E)
```

### PRD Workflow Flow (with --implement)

```
USER INPUT: PRD Requirements [+ optional Figma URLs]
    │
    ▼
┌──────────────────────────┐
│ prd-writer               │
│ - Create/refine PRD      │
│ - Document requirements  │
│ - Define specifications  │
└──────────┬───────────────┘
           │
     [Optional path if --figma]
           │
           ▼
    (Optional) ┌──────────────────────────┐
               │ figma-design-analyzer    │
               │ - Extract design specs   │
               └──────────┬───────────────┘
                          │
                          ▼
┌──────────────────────────────────────────┐
│ senior-frontend-engineer                 │
│ - Implement from PRD + optional design   │
│ - Write React component                  │
└──────────┬───────────────────────────────┘
           │
           ├─────────────────────────────┐
           │                             │
           ▼                             ▼
    ┌────────────────┐        ┌──────────────────┐
    │storybook-expert│        │react-component-  │
    │ (parallel)     │        │tester (parallel) │
    └────────┬───────┘        └────────┬─────────┘
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
         ┌──────────────────────────┐
         │ playwright-dev-tester    │
         │ - Create E2E tests       │
         └──────────────────────────┘
                    │
                    ▼
          ✅ Workflow Complete
   (Requirements → Code + Docs + Tests + E2E)
```

### PRD Workflow Flow (without --implement)

```
USER INPUT: PRD Requirements
    │
    ▼
┌──────────────────────────┐
│ prd-writer               │
│ - Create/refine PRD      │
│ - Document requirements  │
│ - Define specifications  │
└──────────┬───────────────┘
           │
           ▼
        ✅ Complete
     (PRD document only)
  [No implementation agents run]
```

## Agent Responsibilities

### figma-design-analyzer
- **Purpose**: Extract design specifications from Figma files
- **Input**: Figma URLs with node IDs
- **Output**: Design specs, component architecture, visual guidelines
- **Workflows**: Figma, Linear (when ticket has Figma), PRD (optional with --figma)
- **Dependencies**: None (runs first in most flows)

### mcp-execution-agent
- **Purpose**: Fetch context from Linear tickets and extract metadata
- **Input**: Linear ticket ID
- **Output**: Ticket details, description, Figma URLs, requirements
- **Workflows**: Linear only
- **Dependencies**: None (runs first in Linear workflow)

### senior-frontend-engineer
- **Purpose**: Generate React component code from specifications
- **Input**: Design specs OR ticket requirements (+ optional design)
- **Output**: React component, TypeScript types, implementation files
- **Workflows**: Figma, Linear, PRD (with --implement)
- **Dependencies**: figma-design-analyzer, mcp-execution-agent, or prd-writer

### storybook-expert
- **Purpose**: Create Storybook stories for component documentation
- **Input**: Component implementation, design specifications
- **Output**: CSF3 format stories, interactive controls, documentation
- **Workflows**: Figma, Linear, PRD (with --implement)
- **Dependencies**: senior-frontend-engineer (needs implemented component)

### react-component-tester
- **Purpose**: Write unit tests for components
- **Input**: Component implementation, design specifications
- **Output**: Vitest test suites, React Testing Library tests
- **Workflows**: Figma, Linear, PRD (with --implement)
- **Dependencies**: senior-frontend-engineer (needs implemented component)

### playwright-dev-tester
- **Purpose**: Create E2E browser tests
- **Input**: Component implementation, test specifications
- **Output**: Playwright test suites, browser automation tests
- **Workflows**: Figma, Linear, PRD (with --implement)
- **Dependencies**: react-component-tester and storybook-expert (both should complete)

### prd-writer
- **Purpose**: Create or refine product requirements documents
- **Input**: User requirements/description
- **Output**: Structured PRD document with specifications
- **Workflows**: PRD only
- **Dependencies**: None (runs first in PRD workflow)

## Parallel vs Sequential Execution

### Sequential Phases
These agents must run sequentially (one after another):
- `figma-design-analyzer` → `senior-frontend-engineer`
- `mcp-execution-agent` → `figma-design-analyzer` → `senior-frontend-engineer`
- `prd-writer` → `senior-frontend-engineer` (or `figma-design-analyzer` if --figma)

### Parallel Within Phase
These agents can run simultaneously (they don't depend on each other):
- `storybook-expert` + `react-component-tester` (both after implementation)
- `figma-design-analyzer` + `senior-frontend-engineer` can sometimes run in parallel if Figma specs are cached

## Communication Protocol

When executing an orchestration workflow, follow this pattern:

```
1. Announce workflow type and total agents
   "Orchestrating [WORKFLOW] workflow"
   "Total agents: [N]"

2. List all required agents
   "Required agents to run:
    1. Agent A - Purpose
    2. Agent B - Purpose
    ..."

3. Show execution plan
   "Execution plan:
    Phase 1: Agent A, Agent B (parallel)
    Phase 2: Agent C (sequential)
    ..."

4. Execute agents in order, reporting progress
   "✓ Agent A complete"
   "✓ Agent B complete"
   "Running Phase 2..."

5. Report final results
   "✅ Workflow complete"
   "Deliverables: [list outputs]"
```

## Advanced: Adding New Agents to Flows

To add a new agent to a workflow:

1. **Update Agent Dependency Map** in `.claude/commands/orchestrate.md`
2. **Add to Required Agents Summary** in the same file
3. **Update flow diagrams** in this document
4. **Add agent responsibility section** above
5. **Define execution phase** (sequential or parallel)
6. **Update execution workflow steps** in orchestrate.md

Example: Adding `accessibility-auditor` to all flows:
- Figma: After playwright-dev-tester (runs E2E tests first)
- Linear: After playwright-dev-tester
- PRD: After playwright-dev-tester
- New total: 6 agents (Figma/Linear), 6 agents (PRD with --implement)

## See Also

- [Orchestrate Command](../commands/orchestrate.md) - Command documentation
- [Agent Orchestrator Hook](./AGENT_ORCHESTRATOR_HOOK.md) - SubagentStop hook for agent routing
- [Agent Routing Diagram](./AGENT_ROUTING_DIAGRAM.md) - Visual routing patterns
- [Parallel Agent Execution](./PARALLEL_AGENT_EXECUTION.md) - Parallel execution details
