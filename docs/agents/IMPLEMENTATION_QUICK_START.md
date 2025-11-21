# Orchestration Implementation: Quick Start Guide

## TL;DR

Your agents are well-designed but lack coordinated orchestration. Here's the fix:

1. Create an **orchestrator agent** that manages workflow phases
2. Convert **commands to YAML workflows** (declarative, not procedural)
3. Update **agents to handle structured context** (not text embedding)
4. **Auto-trigger** related agents (storybook runs after frontend implementation)

Result: Single command does entire workflow with clear data flow.

---

## What to Build (Priority Order)

### Priority 1: Orchestrator Agent (Unlocks Everything)

Create `.claude/agents/orchestrator.md`:

```yaml
---
name: orchestrator
description: |
  Central workflow orchestration agent. Manages execution phases,
  passes structured context between agents, handles routing and error recovery.
  Think of it as the "conductor" of your agent orchestra.
model: sonnet  # Need Sonnet for complexity
color: blue
---

## Mission

You are the workflow orchestration engine. You don't implement features—you coordinate agents.

### Your Responsibilities

1. **Read Workflow Definition** - YAML file specifies phases and tasks
2. **Initialize Context** - Create structured execution context
3. **Execute Phases Sequentially** - Phase 1 → Phase 2 → etc.
4. **Route Tasks to Agents** - Delegate specific tasks with structured input
5. **Collect Results** - Store in execution context
6. **Handle Dependencies** - `$from.phase.task` references
7. **Gate Conditions** - Skip phases based on discovered data
8. **Error Recovery** - Retry or skip on failures

### Execution Context Format

Every agent receives:

```json
{
  "workflowId": "unique-id-per-run",
  "currentPhase": "implementation",
  "discoveredData": {
    "linearIssue": { "id": "ENG-123", "title": "...", "description": "..." },
    "figmaSpecs": [
      { "nodeId": "2171:13039", "screenshot": "path/to/file.png", "colors": {...} }
    ],
    "prd": { "requirements": "...", "successCriteria": "..." }
  },
  "agentResults": {
    "figma-design-analyzer": {
      "status": "completed",
      "data": { ... }
    }
  },
  "metadata": {
    "startedAt": "2025-11-21T10:00:00Z",
    "lastUpdatedAt": "2025-11-21T10:05:00Z",
    "command": "orchestrate linear-implementation",
    "parameters": { "ticketId": "ENG-123" }
  }
}
```

### How to Implement

1. **Parse workflow YAML** - Read from `workflows/{name}.yaml`
2. **Initialize context** - Create empty execution context with metadata
3. **For each phase**:
   - Check gate condition (skip if false)
   - For each task in phase:
     - Build agent input with context
     - Call Task() tool to delegate to agent
     - Collect result in agentResults
4. **Return final context** - All phases, all results, execution trace

### Key Decisions

**Q: How do I pass structured data to agents?**
A: Include the full context object in the prompt:
```
Execute workflow phase: "implementation"

ExecutionContext:
{...full JSON...}

Your task: Implement components using discoveredData.figmaSpecs and discoveredData.prd
```

**Q: How do I handle parallel tasks?**
A: Launch multiple Task() calls in SINGLE response:
```
I'm launching 3 component implementations in parallel:

Task({ subagent_type: 'senior-frontend-engineer', prompt: '...context...' })
Task({ subagent_type: 'senior-frontend-engineer', prompt: '...context...' })
Task({ subagent_type: 'senior-frontend-engineer', prompt: '...context...' })
```

**Q: How do I retry on failure?**
A: Check if result has error, retry up to 2x:
```
If agentResult.error exists:
  - If retries < 2: Re-delegate to same agent
  - If retries >= 2: Check errorRecovery (skip/halt)
  - Update agentResults with final status
```

**Q: How do I reference previous outputs?**
A: In phase input, use template strings:
```
input: {
  figmaSpecs: "$from.design_analysis.figmaSpecs",
  prd: "$from.prd_generation.prd"
}
```

Replace `$from.XXX` with actual values from agentResults.

### Implementation Checklist

- [ ] Read workflow YAML file
- [ ] Initialize execution context
- [ ] Iterate through phases
- [ ] For each phase:
  - [ ] Check gate condition
  - [ ] Delegate tasks to agents
  - [ ] Collect results
  - [ ] Store in agentResults
- [ ] Handle errors per errorRecovery policy
- [ ] Return final execution context
- [ ] Log execution trace for debugging

---

## Critical: Agent Updates Required

Every agent needs to expect **structured context**, not text:

### Old Pattern (Current)
```
Agent receives:
"Implement HeroSection.
PRD: [pasted text]
Figma specs: [pasted text]"

Agent must parse: regex for hex codes, string split for colors, etc.
```

### New Pattern (Required)
```
Agent receives full ExecutionContext object.
At start of agent:

const { figmaSpecs, prd, linearIssue } = context.discoveredData;

// Now use directly:
figmaSpecs.forEach(spec => {
  const colors = spec.colors;  // Already parsed
  const layout = spec.layout;  // Already structured
});
```

### Update Steps for Each Agent

1. Update input handler to expect JSON context
2. Add line: `const { figmaSpecs, prd, linearIssue } = context.discoveredData;`
3. Remove text parsing/regex extraction
4. Return structured result: `{ status, data, storeAs }`

**Example for figma-design-analyzer:**

```md
---
name: figma-design-analyzer
---

## Critical Workflow

### 1. Receive Context
You receive:
\`\`\`json
{
  "discoveredData": {
    "figmaUrls": ["https://..."]
  }
}
\`\`\`

### 2. Return Structured Result
\`\`\`json
{
  "status": "success",
  "data": {
    "specs": [{
      "nodeId": "2171:13039",
      "screenshot": "path/to/file.png",
      "colors": {"primary": "#ffffff"},
      "typography": {"h1": {...}},
      "layout": {"width": 1200, "spacing": {...}}
    }]
  },
  "storeAs": "figmaSpecs"
}
\`\`\`
```

---

## Priority 2: First Workflow Definition

Create `workflows/linear-to-implementation.yaml`:

```yaml
name: linear-to-implementation
version: 1.0
description: Linear ticket → fully implemented components

phases:
  # DISCOVERY
  - id: discovery
    name: Fetch ticket & analyze context
    tasks:
      - id: fetch_ticket
        agent: orchestrator
        operation: fetch_linear_issue
        input:
          ticketId: "{{parameters.ticketId}}"
        output:
          storeAs: linearIssue

      - id: extract_figma_urls
        agent: orchestrator
        operation: regex_extract
        input:
          text: $from.linearIssue.description
          pattern: "figma\\.com/[^\\s]+"
        output:
          storeAs: figmaUrls

  # DESIGN ANALYSIS
  - id: design_analysis
    name: Extract Figma specs (parallel)
    gateCondition: "$exists(figmaUrls) && figmaUrls.length > 0"
    tasks:
      - id: analyze_designs
        agent: figma-design-analyzer
        operation: delegate
        parallel: true  # One per URL
        input:
          context: $from.discovery
          nodeId: "{{loop.item}}"
        output:
          storeAs: figmaSpecs[]

  # IMPLEMENTATION
  - id: implementation
    name: Implement components (parallel)
    tasks:
      - id: implement
        agent: senior-frontend-engineer
        operation: delegate
        parallel: true  # One per component
        input:
          context:
            figmaSpecs: $from.figmaSpecs
            linearIssue: $from.linearIssue
            componentIndex: "{{loop.index}}"
        output:
          storeAs: implementations[]

  # VERIFICATION
  - id: verification
    name: Run tests
    tasks:
      - id: tests
        agent: orchestrator
        operation: execute
        input:
          commands: ["npm run type-check", "npm run test:run"]

  # COMPLETION
  - id: completion
    name: Update Linear
    tasks:
      - id: update_linear
        agent: orchestrator
        operation: update_linear_issue
        input:
          ticketId: $from.linearIssue.id
          status: "Done"
          comment: "Implementation complete. Live at http://localhost:3000"
```

---

## Priority 3: Convert First Command

Create `.claude/commands/orchestrate.md`:

```yaml
---
description: Universal orchestrator - single command for all multi-agent workflows
---

# Orchestrator: Universal Workflow Engine

## Usage

Execute any defined workflow:

\`\`\`bash
/orchestrate linear-implementation ENG-123
/orchestrate figma-to-implementation https://figma.com/design/...
/orchestrate prd-with-implementation "User authentication system"
\`\`\`

## How It Works

1. Parse workflow name and parameters
2. Load workflow YAML definition
3. Initialize execution context
4. Execute phases in order:
   - Discovery (gather data)
   - Processing (analyze/generate)
   - Implementation (build)
   - Verification (test)
   - Completion (report)
5. Return results

## All Agents Auto-Coordinated

- Figma analyzer runs in parallel (one per design)
- Frontend engineers run in parallel (one per component)
- Testing auto-triggers after implementation
- Linear updates when complete

## Available Workflows

See \`workflows/\` directory:
- \`linear-to-implementation.yaml\` - Ticket → full implementation
- \`figma-to-implementation.yaml\` - Designs → full implementation
- \`prd-with-implementation.yaml\` - PRD → optional implementation

---

## Execution

\`\`\`
Use orchestrator agent:
  Workflow: {{prompt}}
  Parameters: Extracted from {{prompt}}
\`\`\`

ARGUMENTS: {{prompt}}
```

---

## Priority 4: Quick Wins (Easy Updates)

Update each agent with this header:

```yaml
---
name: agent-name
description: Agent description
model: haiku
color: blue
---

## Expected Input Format

You receive a structured ExecutionContext:

\`\`\`json
{
  "discoveredData": { ... },
  "agentResults": { ... },
  "metadata": { ... }
}
\`\`\`

## Extract Your Data

\`\`\`typescript
const { figmaSpecs, prd, linearIssue } = context.discoveredData;
\`\`\`

## Return Structured Output

\`\`\`json
{
  "status": "success|error",
  "data": { /* your result */ },
  "storeAs": "resultKey"
}
\`\`\`

[rest of agent instructions...]
```

---

## Testing the New Pattern

### Test 1: Verify Orchestrator Works
```
Input: /orchestrate linear-implementation ENG-123

Expected output:
- Fetches ticket
- Extracts Figma URLs
- Analyzes designs
- Launches implementation
- Runs tests
- Updates Linear
- Returns complete execution context
```

### Test 2: Verify Structured Data
```
Check agent results:
- agents receive context.discoveredData
- agents return { status, data, storeAs }
- no text parsing needed
- no regex extraction errors
```

### Test 3: Verify Parallel Execution
```
Check logs:
- Multiple figma-design-analyzer running simultaneously
- Multiple senior-frontend-engineer running simultaneously
- All results collected before next phase
```

---

## Implementation Timeline

**Week 1:**
- [ ] Create orchestrator agent (.claude/agents/orchestrator.md)
- [ ] Create first workflow YAML (workflows/linear-to-implementation.yaml)
- [ ] Create /orchestrate command (.claude/commands/orchestrate.md)

**Week 2:**
- [ ] Update all agents to expect structured context
- [ ] Test orchestrator with real Linear ticket
- [ ] Fix any integration issues

**Week 3:**
- [ ] Convert /implement-linear to use orchestrator (backwards compat)
- [ ] Create workflows for /implement-design, /prd
- [ ] Update CLAUDE.md with new patterns

**Week 4:**
- [ ] Gather team feedback
- [ ] Iterate on workflow definitions
- [ ] Document new patterns

---

## Key Files to Create/Update

```
New:
  .claude/agents/orchestrator.md
  .claude/commands/orchestrate.md
  workflows/
    linear-to-implementation.yaml
    figma-to-implementation.yaml
    prd-with-implementation.yaml
  docs/agents/
    ORCHESTRATION_ANALYSIS.md (done)
    ORCHESTRATION_COMPARISON.md (done)
    IMPLEMENTATION_QUICK_START.md (this file)

Update:
  .claude/agents/
    senior-frontend-engineer.md
    figma-design-analyzer.md
    react-component-tester.md
    storybook-expert.md
    playwright-dev-tester.md
    prd-writer.md
    (all agents to handle structured context)

  .claude/commands/
    implement-linear.md → use /orchestrate linear-implementation
    implement-design.md → use /orchestrate figma-to-implementation
    prd.md → use /orchestrate prd-with-implementation
```

---

## Common Questions

**Q: Do I replace current commands?**
A: Keep both initially. New `/orchestrate` alongside old commands. Deprecate old after testing.

**Q: What if an agent fails?**
A: Orchestrator catches error, logs to executionContext.agentResults, handles per errorRecovery policy.

**Q: Can I nest workflows?**
A: Not initially, but design allows it. Start with flat workflows.

**Q: How do I debug?**
A: Return full executionContext at end. Contains entire trace of all phases.

**Q: What about backwards compatibility?**
A: Current commands continue to work. New commands parallel them. Gradual migration.

---

## Next Steps

1. **Read** `ORCHESTRATION_ANALYSIS.md` for detailed architecture
2. **Read** `ORCHESTRATION_COMPARISON.md` for side-by-side examples
3. **Implement** orchestrator agent (Priority 1)
4. **Create** first workflow YAML (Priority 2)
5. **Test** with `/orchestrate linear-implementation ENG-123`
6. **Gather** feedback and iterate

**Need help?** See the example YAML workflows in ORCHESTRATION_COMPARISON.md
