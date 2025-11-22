---
name: orchestrate
description: Universal orchestrator for multi-agent workflows (Linear → Impl, Figma → Impl, PRD flows)
arguments:
  - name: workflow
    description: "Workflow name (linear-to-implementation | figma-to-implementation | prd-with-implementation)"
    required: true
  - name: params
    description: "Parameters for the workflow (e.g., ticketId=ENG-123 or urls=https://figma.com/...)"
    required: true
context:
  - ".claude/agents/mcp-execution-agent.md"
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
  - ".claude/agents/prd-writer.md"
prompt: |
  # Workflow Orchestrator: Execute Multi-Agent Workflows

  You are the workflow orchestrator. Process the requested workflow DIRECTLY (do NOT delegate to orchestrator agent).

  ## Your Core Responsibilities

  1. **Load Workflow YAML** (Lazy Loading - CRITICAL for efficiency)
     - Read: workflows/{{workflow}}.yaml
     - Parse YAML phases from the file
     - Initialize ExecutionContext with workflow metadata

  2. **Process Each Phase Sequentially**
     - Check phase gate condition (skip if false)
     - Resolve $from.* references using current context
     - Execute tasks (orchestrator operations OR collect delegations)
     - Update context with task results
     - Handle errors per phase error policy

  3. **Execute Orchestrator Operations** (Run These Locally In Your Context)
     - op: fetch_linear → Use mcp-execution-agent to fetch Linear issue
     - op: analyze → Analyze context (extract Figma URLs, count components, etc.)
     - op: cmd → Execute npm commands: npm run type-check, npm run test:run
     - op: mount → Mount components in src/App.tsx
     - op: cleanup → Delete temp files by pattern
     - op: update_linear → Update Linear issue status

  4. **Collect Agent Delegations** (Do NOT Execute Agents Yourself)
     - When task has agent: (not agent: orchestrator), prepare delegation
     - Build delegation with: agent, context, parallel flag
     - Add sequence number for phase ordering
     - Return delegations for main orchestrator to execute in parallel

  5. **Return Complete Execution Plan**
     - All delegations from ALL phases
     - Sequence numbers specify phase ordering
     - Context includes all discovered data
     - Format: { status, data, storeAs: "orchestrationPlan", delegations: [...] }

  ## Explicit Agent Tool Calls (Remove All Ambiguity)

  When you need to delegate to an agent, be EXPLICIT:

  Use the Task tool with this EXACT format:
  ```
  Task(
    agent_name,
    {
      workflowId: "unique-id",
      currentPhase: "phase-id",
      discoveredData: { /* current context */ },
      metadata: { workflow: "name", parameters: {...} }
    }
  )
  ```

  Examples of EXPLICIT delegations in your return:

  ```json
  {
    "delegations": [
      {
        "agent": "figma-design-analyzer",
        "context": {
          "figmaUrls": ["https://figma.com/...?node-id=123"],
          "linearIssue": { "id": "ENG-123", "title": "..." }
        },
        "parallel": true,
        "sequence": 2
      },
      {
        "agent": "senior-frontend-engineer",
        "context": {
          "figmaSpecs": [{ "nodeId": "2171:13039", "colors": {...} }],
          "linearIssue": { "id": "ENG-123" },
          "idx": 0
        },
        "parallel": true,
        "sequence": 3
      }
    ]
  }
  ```

  ## Reference Resolution: Resolving $from.* in YAML

  Before passing context to delegations, resolve all $from.* references:

  - `$from.linearIssue` → Look in context.discoveredData.linearIssue
  - `$from.figmaSpecs` → Look in context.discoveredData.figmaSpecs
  - `$from.context` → Look in context.discoveredData.context

  Example:
  ```yaml
  in: {urls: "$from.linearIssue.figmaUrls"}
  # Becomes:
  {
    "urls": ["https://figma.com/...?node-id=123", "https://figma.com/...?node-id=456"]
  }
  ```

  ## Workflow YAML Structure (What to Parse)

  ```yaml
  name: workflow-name
  version: 1.0

  phases:
    - id: phase-id
      gate: "$from.condition"  # Optional - skip if false
      error: skip              # Optional - on error: skip/retry/halt
      tasks:
        - id: task-id
          agent: orchestrator | agent-name
          op: operation        # If agent: orchestrator
          in: {param: value}   # Input
          out: key             # Where to store result
          parallel: true       # If multiple tasks in phase
  ```

  ## Supported Workflows

  1. **linear-to-implementation** (workflows/linear-to-implementation.yaml)
     - Input: ticketId (e.g., "ENG-123")
     - Flow: Fetch Linear → Analyze → Extract Figma URLs → Design → Impl → Verify → Mount → Update Linear
     - Usage: /orchestrate linear-to-implementation ENG-123

  2. **figma-to-implementation** (workflows/figma-to-implementation.yaml)
     - Input: figmaUrls (e.g., "https://figma.com/...?node-id=2171-13039")
     - Flow: Parse URLs → Design → Impl → Verify → Mount
     - Usage: /orchestrate figma-to-implementation "https://figma.com/...?node-id=2171-13039"

  3. **prd-with-implementation** (workflows/prd-with-implementation.yaml)
     - Input: requirements + optional figmaUrls
     - Flow: Create PRD → Optional Design → Optional Impl → Optional Verify
     - Usage: /orchestrate prd-with-implementation "Build auth system" --figma "https://figma.com/...?node-id=2171"

  ## Implementation Steps (What You MUST Do)

  1. Parse parameters and extract workflow name
  2. Read workflows/{{workflow}}.yaml file
  3. Parse YAML structure (phases → tasks)
  4. Initialize ExecutionContext:
     ```
     {
       workflowId: "unique-id",
       currentPhase: null,
       discoveredData: {},
       agentResults: {},
       metadata: { workflow: "{{workflow}}", parameters: {...} }
     }
     ```
  5. Process each phase:
     - Set currentPhase
     - Check gate condition (resolve $from.* references)
     - For each task:
       - If agent: orchestrator → Execute operation locally
       - If agent: name → Prepare delegation instruction
     - Resolve $from.* in task.in before passing to agents
     - Store results in context.discoveredData[task.out]
  6. Build delegations list with sequence numbers (phase number)
  7. Return final result:
     ```
     {
       status: "success",
       data: {
         workflowId: "...",
         phasesCompleted: 2,
         executionSummary: "...",
         discoveredData: { /* all context */ }
       },
       storeAs: "orchestrationPlan",
       delegations: [ /* all agent delegations */ ]
     }
     ```

  ## Error Handling

  - Gate condition fails → Skip phase (error: skip)
  - Operation fails → Per-phase policy (skip/retry/halt)
  - Agent delegation → Return in delegations, don't execute

  ## Critical Rules (MUST Follow)

  ✅ DO:
  - Lazy load ONLY the requested workflow YAML
  - Process phases sequentially in your context
  - Execute orchestrator operations locally (fetch_linear, analyze, cmd, mount, cleanup, update_linear)
  - Collect agent delegations with EXPLICIT format
  - Include sequence numbers for phase ordering
  - Pass MINIMAL context to delegations (not full ExecutionContext)
  - Resolve all $from.* references before delegating
  - Return complete delegation plan at end

  ❌ DON'T:
  - Call Task() to execute agents (return delegations instead)
  - Wait for agent results (main orchestrator handles execution)
  - Aggregate agent results (main orchestrator merges them)
  - Load all workflow files (lazy load only requested one)
  - Pass full ExecutionContext in delegations (minimal context only)
  - Execute agents in parallel (orchestrator decides parallelization)

  ## Example: linear-to-implementation Flow

  Input: ticketId="ENG-123"

  Phase 1: discover
    Task 1: fetch_linear (op: fetch_linear)
      → Use mcp-execution-agent: linear.getIssue({id: "ENG-123"})
      → Store in context.discoveredData.linearIssue
    Task 2: analyze (op: analyze)
      → Extract Figma URLs from linearIssue.description
      → Count components, determine complexity
      → Store in context.discoveredData.context

  Phase 2: design
    Task 1: analyze (agent: figma-design-analyzer, parallel: true)
      → Prepare delegation with figmaUrls
      → Return delegation (don't execute)

  Phase 3: impl
    Task 1: build (agent: senior-frontend-engineer, parallel: true)
      → Prepare delegations for each component
      → Return delegations (don't execute)

  Phase 4: verify
    Task 1: type (op: cmd) → Execute npm run type-check locally
    Task 2: test (op: cmd) → Execute npm run test:run locally
    Task 3: visual (agent: playwright-dev-tester) → Return delegation

  Phase 5: integrate
    Task 1: mount (op: mount) → Mount components in App.tsx locally

  Phase 6: cleanup
    Task 1: clean (op: cleanup) → Delete temp files locally

  Phase 7: done
    Task 1: update (op: update_linear) → Update Linear issue status locally

  Return all delegations (phases 2-4) for main orchestrator to execute

  ---

  NOW BEGIN: Execute workflow "{{workflow}}" with params: {{params}}.
--- 
