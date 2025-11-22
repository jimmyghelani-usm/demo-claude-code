# Orchestrator Architecture Clarification

## The Critical Distinction

**The Orchestrator is an AGENT, not a controller.**

This changes how the entire system works:

```
❌ WRONG (Previously Thought):
Orchestrator Agent
  └─ Calls Task() to execute other agents
  └─ Waits for results
  └─ Processes results
  └─ Returns final output

✅ CORRECT (Actual Architecture):
Main Orchestrator Controller (outside agent system)
  ├─ Calls Task(orchestrator-agent, {workflow, context})
  │   └─ Orchestrator Agent processes phases
  │   └─ Builds execution plan
  │   └─ Returns ALL delegations at once
  ├─ Main orchestrator receives complete delegation plan
  └─ Main orchestrator launches agents from delegations
     └─ Handles all parallelization
     └─ Collects results
     └─ Passes to next phase
```

---

## Flow Diagram: Correct Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Main Orchestrator (Cursor/Claude Code Context)              │
│ Responsibility: Control flow, parallelization, aggregation  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                  /orchestrate workflow-name params
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Orchestrator Agent (Sonnet - 200k context)                  │
│ Receives: workflow name, initial context                    │
│ Does: Process phases, build delegation plan                 │
│ Returns: { status, data, delegations: [...] }              │
└─────────────────────────────────────────────────────────────┘
                            ↓
         Complete delegation plan with ALL agents
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Main Orchestrator (receives plan)                           │
│ Launches Phase 2 agents (all in parallel):                  │
│  ├─ Task(figma-analyzer, delegation1)  ─┐                 │
│  ├─ Task(figma-analyzer, delegation2)  ─┤ PARALLEL        │
│  └─ Task(figma-analyzer, delegation3)  ─┘                 │
│                                                              │
│ All 3 complete, then launches Phase 3 (all in parallel):   │
│  ├─ Task(impl, delegation4)  ─┐                           │
│  └─ Task(impl, delegation5)  ─┤ PARALLEL                  │
│                                                              │
│ All 2 complete, then launches Phase 4 (all in parallel):   │
│  ├─ Task(storybook, delegation6)  ─┐                      │
│  ├─ Task(tester, delegation7)  ────┤ PARALLEL             │
│  └─ Task(playwright, delegation8)  ┘                      │
│                                                              │
│ All complete, aggregates results, done!                    │
└─────────────────────────────────────────────────────────────┘
```

---

## What This Means for Orchestrator Agent

### Orchestrator Agent DOES:
1. ✅ Load workflow YAML file
2. ✅ Initialize ExecutionContext
3. ✅ Process phases sequentially (in its own context)
4. ✅ Execute orchestrator operations (fetch_linear, analyze, etc.)
5. ✅ Collect delegation instructions from YAML phases
6. ✅ Build complete delegation plan
7. ✅ **RETURN everything at once**

### Orchestrator Agent DOES NOT:
1. ❌ Call Task() to execute other agents
2. ❌ Wait for agent results
3. ❌ Process agent results
4. ❌ Handle parallelization (main orchestrator does this)
5. ❌ Make decisions about execution order (delegations specify sequence)
6. ❌ Error recovery for agent failures (main orchestrator handles)

---

## Return Format: Critical Detail

### Orchestrator Agent Returns Single Result:

```typescript
{
  status: "success" | "error",
  data: {
    workflowId: "workflow-abc123",
    phasesCompleted: 4,  // How many phases orchestrator completed
    executionSummary: "Analyzed ENG-123, extracted 2 Figma URLs, prepared 3 component implementations",
    discoveredData: {
      // Results from orchestrator operations (fetch_linear, analyze, etc.)
      linearIssue: { id: "ENG-123", title: "...", description: "..." },
      context: { hasFigma: true, components: 2, complexity: "high" },
      // Any other data discovered during phase processing
    }
  },
  storeAs: "orchestrationPlan",
  delegations: [
    // Phase 2: Design Analysis (parallel)
    {
      agent: "figma-design-analyzer",
      context: {
        figmaUrls: ["https://figma.com/design/...?node-id=2171-13039"],
        linearIssue: "..."  // If needed by analyzer
      },
      parallel: true,
      sequence: 2  // Execute in phase 2
    },
    {
      agent: "figma-design-analyzer",
      context: {
        figmaUrls: ["https://figma.com/design/...?node-id=2172-13040"],
        linearIssue: "..."
      },
      parallel: true,
      sequence: 2
    },

    // Phase 3: Implementation (parallel)
    {
      agent: "senior-frontend-engineer",
      context: {
        figmaSpecs: "...",  // Will be available from phase 2 results
        prd: "...",
        idx: 0
      },
      parallel: true,
      sequence: 3
    },
    {
      agent: "senior-frontend-engineer",
      context: {
        figmaSpecs: "...",
        prd: "...",
        idx: 1
      },
      parallel: true,
      sequence: 3
    },

    // Phase 4: Testing & Stories (parallel)
    // When senior-frontend-engineer agents return, they include delegations
    // But wait - orchestrator isn't executing them!
    // So... how do we handle agent delegations?
  ]
}
```

---

## The Nested Delegation Problem

**Question**: If orchestrator doesn't execute agents, how does it include delegations from agents (like when senior-frontend-engineer returns its storybook-expert + react-component-tester delegations)?

**Answer**: It doesn't! There are TWO types of delegations:

### 1. Orchestrator-Level Delegations (Orchestrator Returns These)
```typescript
delegations: [
  // Orchestrator says: "You need to run these agents"
  { agent: "figma-design-analyzer", context: {...}, sequence: 2 },
  { agent: "senior-frontend-engineer", context: {...}, sequence: 3 }
]
```

### 2. Agent-Level Delegations (Agents Return These)
```typescript
// senior-frontend-engineer returns:
{
  status: "success",
  data: { /* implementation */ },
  delegations: [
    { agent: "storybook-expert", context: {...}, parallel: true },
    { agent: "react-component-tester", context: {...}, parallel: true }
  ]
}
```

**How they work together**:
1. Orchestrator agent processes phases and returns phase-level delegations
2. Main orchestrator launches phase agents (from delegations)
3. Phase agents (like senior-frontend-engineer) return results + their own delegations
4. Main orchestrator collects sub-delegations and launches them in next phase

---

## Complete Example: Linear → Implementation Workflow

### Step 1: User Calls Orchestrator
```
/orchestrate linear-implementation ENG-123
```

### Step 2: Main Orchestrator Calls Orchestrator Agent
```typescript
Task("orchestrator", {
  workflow: "linear-implementation",
  params: { ticketId: "ENG-123" },
  context: { /* initial context */ }
})
```

### Step 3: Orchestrator Agent Processes Phases

**Phase 1: Discover**
- Loads `workflows/linear-implementation.yaml`
- Executes: op: fetch_linear (gets issue ENG-123)
- Executes: op: analyze (finds 2 Figma URLs)
- Results stored in discoveredData

**Phase 2: Design** (NOT EXECUTED - delegation returned)
- YAML specifies: agent: figma-design-analyzer with Figma URLs
- Orchestrator prepares delegations (doesn't execute)

**Phase 3: Implementation** (NOT EXECUTED - delegation returned)
- YAML specifies: agent: senior-frontend-engineer
- Orchestrator prepares delegations

**Phase 4: Verification** (NOT EXECUTED - delegation returned)
- YAML specifies: agent: playwright-dev-tester (or cmd)
- Orchestrator prepares delegations

### Step 4: Orchestrator Agent Returns Complete Plan
```typescript
{
  status: "success",
  data: {
    phasesCompleted: 1,  // Only phase 1 (discovery) was executed
    discoveredData: {
      linearIssue: { id: "ENG-123", ... },
      context: { hasFigma: true, components: 2 }
    }
  },
  storeAs: "orchestrationPlan",
  delegations: [
    // From phase 2
    { agent: "figma-design-analyzer", context: {...}, sequence: 2 },
    { agent: "figma-design-analyzer", context: {...}, sequence: 2 },

    // From phase 3
    { agent: "senior-frontend-engineer", context: {...}, sequence: 3 },
    { agent: "senior-frontend-engineer", context: {...}, sequence: 3 },

    // From phase 4
    { agent: "playwright-dev-tester", context: {...}, sequence: 4 }
  ]
}
```

### Step 5: Main Orchestrator Executes Delegations

**Phase 2 (sequence: 2) - Launch Parallel:**
```typescript
Task("figma-design-analyzer", { /* delegation1 context */ })
Task("figma-design-analyzer", { /* delegation2 context */ })
// Both run in parallel
// Results: figmaSpecs[0], figmaSpecs[1]
```

**Phase 3 (sequence: 3) - Launch Parallel:**
```typescript
Task("senior-frontend-engineer", { figmaSpecs[0], ... })
Task("senior-frontend-engineer", { figmaSpecs[1], ... })
// Both run in parallel
// Each returns: { status, data, delegations: [...] }
// Agent delegations include: storybook-expert, react-component-tester, playwright-dev-tester
```

**Phase 3.5 - Collect Agent Delegations:**
```typescript
// Main orchestrator collects delegations from both senior-frontend-engineer agents
// Results: 2x storybook, 2x react-component-tester, 2x playwright from agents
// These are sub-delegations (sequence: default next)
```

**Phase 4 (sequence: 4) - Launch Agent Sub-Delegations in Parallel:**
```typescript
// Orchestrator creates next phase from agent delegations
Task("storybook-expert", { impl1 })
Task("storybook-expert", { impl2 })
Task("react-component-tester", { impl1 })
Task("react-component-tester", { impl2 })
Task("playwright-dev-tester", { impl1, figmaSpecs })
Task("playwright-dev-tester", { impl2, figmaSpecs })
// All run in parallel
```

**Phase 5 (sequence: 5) - Orchestrator's Remaining Tasks:**
```typescript
// Phase 4 in YAML might have: op: cmd, op: mount, op: update_linear
// But orchestrator already executed phase 1-3 concept
// Need to figure out where these fit
```

---

## The Key Insight

**Orchestrator agent returns a PLAN, not results from execution.**

- Orchestrator executes OPERATIONS (fetch, analyze, etc.)
- Orchestrator returns DELEGATIONS (which agents to run and in what order)
- Main orchestrator executes the plan (agents + parallelization)
- Main orchestrator handles failures and result aggregation

---

## Agent Return Format (For All Agents)

```typescript
{
  status: "success",
  data: {
    // Agent-specific results
  },
  storeAs: "key",
  delegations: [
    // Agent-level delegations (what this agent needs next)
    // If agent orchestrates other agents, return delegations
    // Otherwise, return empty array
  ]
}
```

**Orchestrator Agent ALSO Returns This Format:**
```typescript
{
  status: "success",
  data: {
    // Orchestration results (phases completed, discovered data)
  },
  storeAs: "orchestrationPlan",
  delegations: [
    // Workflow delegations (all agents needed from all phases)
  ]
}
```

---

## Comparison: Old vs New Mental Model

### OLD (Incorrect):
```
Orchestrator Agent
  ├─ Calls Task() → figma-analyzer
  ├─ Calls Task() → senior-frontend-engineer
  │  ├─ (inside) Calls Task() → storybook-expert
  │  ├─ (inside) Calls Task() → react-component-tester
  │  └─ (inside) Calls Task() → playwright-dev-tester
  └─ Calls Task() → update-linear
```

**Problems**:
- Orchestrator is acting as controller, not agent
- Nested Task() calls waste context (duplication)
- Sequential execution (can't parallelize)

### NEW (Correct):
```
Orchestrator Agent (processes phases, returns plan)
  ├─ Execute op: fetch_linear (local)
  ├─ Execute op: analyze (local)
  └─ Return delegations for all phases

Main Orchestrator (executes plan)
  ├─ Launch phase 2 agents in parallel
  ├─ Launch phase 3 agents in parallel
  │  └─ These agents return their own delegations
  ├─ Launch phase 3.x sub-agents in parallel
  └─ Continue with remaining phases
```

**Benefits**:
- Clean separation: orchestrator = planner, main = executor
- No nested Task() calls
- True parallelization at phase level
- Agent can return sub-delegations without executing them

---

## Implementation Impact

### For Orchestrator Agent:
```typescript
// DO:
- Process phases sequentially in your context
- Execute orchestrator operations
- Return complete delegation plan
- Include sequence numbers

// DON'T:
- Call Task() for other agents
- Wait for results
- Aggregate agent results (main orchestrator does this)
```

### For Main Orchestrator (Outside Agent System):
```typescript
// DO:
- Receive delegation plan from orchestrator agent
- Group delegations by sequence
- Launch same-sequence delegations in parallel
- Collect results from all agents
- Merge sub-delegations from agents
- Continue to next sequence phase

// DON'T:
- Try to parallelize within agent execution
- Make agents call other agents
- Accumulate logic in orchestrator agent
```

---

## Summary: The Three-Layer Model

### Layer 1: Agent Responsibility
- Do your specific job
- Return `{ status, data, storeAs, delegations }`
- Delegations = what you need next (if you orchestrate anything)
- Agents DON'T execute agents

### Layer 2: Orchestrator Agent Responsibility
- Coordinate workflow phases within your context
- Execute orchestrator operations (fetch, analyze, etc.)
- Build complete delegation plan (all phases + agents)
- Return everything: `{ status, data, delegations: [...] }`
- Orchestrator agent also DOESN'T execute agents

### Layer 3: Main Orchestrator Responsibility (Outside Agent System)
- Receive delegation plan
- Execute agents in parallel per sequence
- Collect results and sub-delegations
- Manage error recovery and retries
- Aggregate final output

---

## Critical Reminder

**If the orchestrator agent tries to execute Task() calls:**
- ❌ It's not following the agent pattern
- ❌ Delegations are wasted (should be returned)
- ❌ Parallelization is lost (main orchestrator should handle it)
- ❌ Context duplication occurs
- ✅ Return delegations instead!
