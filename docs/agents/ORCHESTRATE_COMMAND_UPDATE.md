# Updated `/orchestrate` Command Specification

## Current State (BEFORE OPTIMIZATION)

**File**: `.cursor/commands/orchestrate.md`

```yaml
---
name: orchestrate
description: Universal orchestrator for multi-agent workflows
arguments:
  - name: workflow
    description: "Workflow name"
    required: true
  - name: params
    description: "Parameters for the workflow"
    required: true
context:
  - ".claude/agents/orchestrator.md"           # ← Loads orchestrator agent
  - ".claude/agents/mcp-execution-agent.md"
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
  - ".claude/agents/prd-writer.md"
prompt: |
  Universal Orchestrator: Execute Multi-Agent Workflows

  - You are coordinating a complete workflow using the orchestrator agent spec.
  - Load only the requested workflow YAML (lazy loading).
  - Execute phases sequentially; within a phase, launch parallel tasks in a single combined response.
  - Delegate MCP execution to mcp-execution-agent (reuse-first, scripts under mcp/tests/).

  Workflows:
  - linear-implementation: "/orchestrate linear-implementation <TICKET_ID>"
  - figma-to-implementation: "/orchestrate figma-to-implementation <FIGMA_URLS...>"
  - prd-with-implementation: "/orchestrate prd-with-implementation <REQUIREMENTS> [--figma ...] [--implement]"

  Critical Rules:
  - Lazy load only the needed workflow definition
  - Parallelize within a phase using a single combined response
  - Pass structured context, not file paths (except screenshot paths)
  - Delegate all MCP wrapper invocations to mcp-execution-agent
  - Keep outputs concise and actionable

  NOW BEGIN: Execute workflow "{{workflow}}" with params: {{params}}.
---
```

---

## New State (AFTER OPTIMIZATION)

**File**: `.cursor/commands/orchestrate.md` (UPDATED)

```yaml
---
name: orchestrate
description: Universal orchestrator for multi-agent workflows
arguments:
  - name: workflow
    description: "Workflow name (linear-implementation | figma-to-implementation | prd-with-implementation)"
    required: true
  - name: params
    description: "Parameters for the workflow (e.g., ticket id or figma urls)"
    required: true
context:
  - ".claude/agents/mcp-execution-agent.md"         # ← Removed orchestrator.md
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
  - ".claude/agents/prd-writer.md"
prompt: |
  Workflow Orchestrator: Execute Multi-Agent Workflows

  You are a workflow orchestrator. Process the requested workflow directly (do NOT delegate to orchestrator agent).

  ## Your Responsibilities

  1. **Load Workflow YAML** (Lazy Loading)
     - Read: workflows/{workflow}.yaml
     - Parse phases from YAML
     - Initialize ExecutionContext with workflow metadata

  2. **Process Phases Sequentially**
     - For each phase:
       - Check gate condition (skip if false)
       - Resolve $from.* references
       - Execute orchestrator operations OR collect delegations
       - Update context with results

  3. **Execute Orchestrator Operations** (In Your Context)
     - op: fetch_linear → Fetch Linear issue by ID
     - op: analyze → Analyze context (extract URLs, complexity, etc.)
     - op: cmd → Execute commands: {cmds: ["npm run test:run"]}
     - op: mount → Mount components in App.tsx
     - op: cleanup → Delete temp files: {patterns: [...]}
     - op: update_linear → Update Linear issue with status

  4. **Collect Agent Delegations** (Don't Execute)
     - When phase has agent: tasks in YAML
     - Don't call Task() yourself
     - Prepare delegation instructions with:
       - agent: agent name
       - context: minimal context needed
       - parallel: true/false
       - sequence: phase number (for ordering)

  5. **Return Complete Execution Plan**
     - Return ALL delegations from ALL phases
     - Include sequence numbers for ordering
     - Main orchestrator will execute delegations in parallel

  ## Return Format

  Always return structured result:

  ```json
  {
    "status": "success",
    "data": {
      "workflowId": "unique-id",
      "phasesCompleted": 2,
      "executionSummary": "Fetched Linear issue ENG-123, analyzed 2 Figma URLs",
      "discoveredData": {
        "linearIssue": { "id": "ENG-123", "title": "..." },
        "context": { "hasFigma": true, "components": 2 }
      }
    },
    "storeAs": "orchestrationPlan",
    "delegations": [
      {
        "agent": "figma-design-analyzer",
        "context": { "figmaUrls": ["..."], "linearIssue": "..." },
        "parallel": true,
        "sequence": 2
      },
      {
        "agent": "senior-frontend-engineer",
        "context": { "figmaSpecs": "...", "prd": "...", "idx": 0 },
        "parallel": true,
        "sequence": 3
      }
    ]
  }
  ```

  ## Data References in YAML

  Reference previous outputs using $from syntax:

  ```yaml
  in: {specs: "$from.figmaSpecs"}       # From discoveredData
  in: {issue: "$from.linearIssue"}      # From discoveredData
  in: {results: "$from.design_phase"}   # From specific phase
  ```

  Resolve by:
  - If value starts with "$from.KEY": look in discoveredData[KEY]
  - If value starts with "$from.PHASE.KEY": look in agentResults[PHASE][KEY]

  ## Workflow Phase Structure (YAML Format)

  ```yaml
  name: workflow-name
  phases:
    - id: discover
      tasks:
        - id: fetch
          op: fetch_linear
          in: {ticketId: "{{p.ticketId}}"}
          out: linearIssue

    - id: design
      gate: "$from.context.hasFigma"
      error: skip
      tasks:
        - id: analyze
          agent: figma-design-analyzer
          parallel: true
          in: {urls: "$from.linearIssue.figmaUrls"}
          out: "figmaSpecs[]"

    - id: implementation
      tasks:
        - id: build
          agent: senior-frontend-engineer
          parallel: true
          in: {specs: "$from.figmaSpecs[{{loop}}]", idx: "{{loop}}"}
          out: "impls[]"
  ```

  ## Critical Rules

  - ✅ Load ONLY the requested workflow YAML (lazy loading)
  - ✅ Execute orchestrator operations in your context
  - ✅ Collect delegations, return them to main orchestrator
  - ✅ Include sequence numbers for phase ordering
  - ✅ Pass minimal context to delegations (not full ExecutionContext)
  - ✅ Resolve $from.* references before passing to agents
  - ❌ Don't call Task() to execute agents
  - ❌ Don't wait for agent results
  - ❌ Don't aggregate agent results

  ## Example: linear-implementation Workflow

  ```yaml
  name: linear-implementation
  phases:
    # Phase 1: Discover
    - id: discover
      tasks:
        - id: fetch
          op: fetch_linear
          in: {ticketId: "{{p.ticketId}}"}
          out: linearIssue

        - id: analyze
          op: analyze
          in: {issue: "$from.linearIssue"}
          out: context

    # Phase 2: Design (Delegate to figma-design-analyzer)
    - id: design
      gate: "$from.context.hasFigma"
      error: skip
      tasks:
        - id: analyze
          agent: figma-design-analyzer
          parallel: true
          in: {urls: "$from.context.figmaUrls"}
          out: "figmaSpecs[]"

    # Phase 3: Implementation (Delegate to senior-frontend-engineer)
    - id: implementation
      tasks:
        - id: build
          agent: senior-frontend-engineer
          parallel: true
          in: {specs: "$from.figmaSpecs[{{loop}}]", idx: "{{loop}}"}
          out: "impls[]"

    # Phase 4: Verification (Multiple operations + delegations)
    - id: verification
      tasks:
        - id: type_check
          op: cmd
          in: {cmds: ["npm run type-check"]}

        - id: test
          op: cmd
          in: {cmds: ["npm run test:run"]}

        - id: visual
          agent: playwright-dev-tester
          in: {implementations: "$from.impls", figmaSpecs: "$from.figmaSpecs"}
          out: visualResults

    # Phase 5: Integration
    - id: integration
      tasks:
        - id: mount
          op: mount
          in: {components: "$from.impls"}

    # Phase 6: Completion
    - id: completion
      tasks:
        - id: update
          op: update_linear
          in: {id: "$from.linearIssue.id", state: "Done"}
  ```

  ## Workflow Support

  - **linear-implementation**: Linear ticket → Figma designs → Components → Testing
    - Parameters: ticketId (e.g., "ENG-123")
    - File: workflows/linear-implementation.yaml

  - **figma-to-implementation**: Figma designs → Components → Testing
    - Parameters: figmaUrls (one or more URLs)
    - File: workflows/figma-to-implementation.yaml

  - **prd-with-implementation**: Requirements → PRD → (Optional: Figma) → Components → Testing
    - Parameters: requirements + optional figmaUrls
    - File: workflows/prd-with-implementation.yaml

  ## Execution Steps

  1. Receive workflow "{{workflow}}" with params {{params}}
  2. Lazy-load workflows/{{workflow}}.yaml
  3. Process each phase:
     - Execute operations (fetch, analyze, cmd, mount, cleanup, update_linear)
     - Collect delegations (for figma-analyzer, impl, testers, etc.)
     - Update context with results
     - Handle errors per phase policy
  4. Build delegations list with sequence numbers
  5. Return { status, data, storeAs, delegations: [...] }
  6. Main orchestrator handles all parallelization and agent execution

  ---

  NOW BEGIN: Execute workflow "{{workflow}}" with params: {{params}}.
---
```

---

## Key Changes Explained

### 1. Removed Orchestrator Agent from Context

**Before**:
```yaml
context:
  - ".claude/agents/orchestrator.md"  # ← Gone!
```

**After**:
```yaml
context:
  # orchestrator.md removed - logic now in this command
```

**Why**: Orchestration logic is now IN the command, not in a separate agent.

---

### 2. Expanded Prompt with Full Orchestration Logic

**Before** (minimal):
```
Use orchestrator agent to execute workflow
```

**After** (comprehensive):
```
Your Responsibilities:
1. Load workflow YAML
2. Process phases sequentially
3. Execute orchestrator operations
4. Collect agent delegations
5. Return complete execution plan
```

**Why**: Command now contains all logic needed to orchestrate workflows.

---

### 3. Added Orchestrator Operations Documentation

**New section** explains what the command can execute directly:

```
op: fetch_linear → Fetch Linear issue
op: analyze → Analyze context
op: cmd → Execute commands
op: mount → Mount components in App.tsx
op: cleanup → Delete temp files
op: update_linear → Update Linear issue
```

**Why**: Makes it clear what's executed locally vs delegated.

---

### 4. Added Delegation Collection Instructions

**New section** explains what the command should return:

```
When phase has agent: tasks in YAML
Don't call Task() yourself
Prepare delegation instructions and return
```

**Why**: Makes it crystal clear that command returns delegations, doesn't execute agents.

---

### 5. Added Complete Return Format

**New section** shows exact format:

```json
{
  "status": "success",
  "data": { /* discovered data */ },
  "delegations": [ /* agent delegations */ ]
}
```

**Why**: Clear contract for what main orchestrator expects.

---

### 6. Added Full YAML Examples

**New section** shows complete workflow structure:

```yaml
phases:
  - id: discover
    tasks:
      - op: fetch_linear
      - op: analyze
  - id: design
    tasks:
      - agent: figma-design-analyzer
```

**Why**: Helps understand phase structure and YAML format.

---

## What DOESN'T Change

✅ Workflow YAML files stay the same
✅ Agent return format stays the same
✅ Delegation format stays the same
✅ Main orchestrator execution stays the same
✅ All agent specs stay the same (orchestrator.md just deprecated)

---

## Token Impact of This Change

### Current `/orchestrate` Command
```
- Loads orchestrator.md spec: 800 tokens
- Prompt to use orchestrator agent: 200 tokens
Total context: 1,000 tokens

Then calls Task(orchestrator-agent, ...)
Total infrastructure: 4,500 tokens
```

### New `/orchestrate` Command
```
- Includes orchestration logic inline: 1,200 tokens
- Expanded prompt: 600 tokens
Total context: 1,800 tokens

Runs orchestration directly (no Task() call)
Total infrastructure: 3,400 tokens

SAVINGS: 1,100 tokens per workflow execution (24%)
```

---

## Implementation: What Needs to Change

### File Changes Required

1. **Update `.cursor/commands/orchestrate.md`**
   - Remove orchestrator.md from context
   - Replace minimal prompt with comprehensive prompt (from this doc)
   - Add all orchestration logic to the prompt

2. **Mark `.claude/agents/orchestrator.md` as Deprecated**
   - Add deprecation notice at top
   - Update to say "see /orchestrate command"
   - Keep file for reference/history

3. **No changes needed** for:
   - Workflow YAML files
   - Agent specification files
   - Agent return formats
   - Main orchestrator behavior

---

## Validation Checklist

After updating the command, validate:

- [ ] Workflow YAML loads correctly
- [ ] Orchestrator operations execute (fetch, analyze, etc.)
- [ ] Delegations are collected properly
- [ ] Sequence numbers are set correctly
- [ ] Return format matches expected structure
- [ ] Token usage decreases by ~1,100
- [ ] Execution time improves
- [ ] Results are identical to old approach

---

## Rollback Plan

If issues occur, rollback is simple:

1. Restore old `/orchestrate.md` command
2. Put orchestrator.md back in context
3. Revert prompt to use orchestrator agent
4. Everything works as before

**Effort**: 5 minutes
**Risk**: Very low (can always go back)

---

## Summary

The updated `/orchestrate.md` command:
- ✅ Includes full orchestration logic
- ✅ Processes phases directly
- ✅ Executes local operations
- ✅ Collects and returns delegations
- ✅ No longer needs orchestrator agent

**Result**: 24% infrastructure overhead reduction, simpler architecture, faster execution.
