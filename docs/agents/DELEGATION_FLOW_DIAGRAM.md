# Delegation Flow Diagram - Complete Architecture

## The Complete Three-Level Delegation Flow

```
LEVEL 0: Main Agent (Orchestrator Controller)
═══════════════════════════════════════════════════════════════════════════

Call: Task("orchestrator", { workflow: "linear-implementation", ticketId: "ENG-123" })
                              ↓


LEVEL 1: Orchestrator Agent (Sonnet - Plans entire workflow)
═══════════════════════════════════════════════════════════════════════════

Receives: workflow name, parameters, context
  ├─ Loads workflow YAML
  ├─ Processes phases sequentially in its own context
  ├─ Executes operations: fetch_linear, analyze, etc.
  └─ Builds list of TOP-LEVEL AGENTS needed from all phases

Returns to Main Agent:
{
  status: "success",
  data: { /* discovered data from orchestrator operations */ },
  delegations: [
    // Phase 2 - DESIGNER AGENTS
    { agent: "figma-design-analyzer", context: {...}, sequence: 2 },
    { agent: "figma-design-analyzer", context: {...}, sequence: 2 },

    // Phase 3 - IMPLEMENTER AGENTS
    { agent: "senior-frontend-engineer", context: {...}, sequence: 3 },
    { agent: "senior-frontend-engineer", context: {...}, sequence: 3 }
  ]
}
                              ↓


LEVEL 0: Main Agent Executes Delegations (Groups by sequence)
═══════════════════════════════════════════════════════════════════════════

Sequence 2 - Launch in parallel:
  Task("figma-design-analyzer", delegation1)  ┐
  Task("figma-design-analyzer", delegation2)  ├─ Both parallel
                                               ┘

  Collect results:
  [
    { status: "success", data: {specs1}, delegations: [] },
    { status: "success", data: {specs2}, delegations: [] }
  ]

Sequence 3 - Launch in parallel:
  Task("senior-frontend-engineer", delegation1)  ┐
  Task("senior-frontend-engineer", delegation2)  ├─ Both parallel
                                                   ┘

  Collect results + sub-delegations:
  [
    {
      status: "success",
      data: {impl1},
      delegations: [
        // LEVEL 2 DELEGATIONS - Returned by senior-frontend-engineer
        { agent: "storybook-expert", context: {impl1}, parallel: true },
        { agent: "react-component-tester", context: {impl1}, parallel: true },
        { agent: "playwright-dev-tester", context: {impl1}, parallel: true }
      ]
    },
    {
      status: "success",
      data: {impl2},
      delegations: [
        // LEVEL 2 DELEGATIONS - Returned by senior-frontend-engineer
        { agent: "storybook-expert", context: {impl2}, parallel: true },
        { agent: "react-component-tester", context: {impl2}, parallel: true },
        { agent: "playwright-dev-tester", context: {impl2}, parallel: true }
      ]
    }
  ]

Extract all sub-delegations:
  [
    { agent: "storybook-expert", context: {impl1} },
    { agent: "react-component-tester", context: {impl1} },
    { agent: "playwright-dev-tester", context: {impl1} },
    { agent: "storybook-expert", context: {impl2} },
    { agent: "react-component-tester", context: {impl2} },
    { agent: "playwright-dev-tester", context: {impl2} }
  ]


LEVEL 1: Sub-Delegations (from agents) - Launch in parallel:
═══════════════════════════════════════════════════════════════════════════

Task("storybook-expert", {impl1})  ┐
Task("storybook-expert", {impl2})  │
Task("react-component-tester", {impl1})  │
Task("react-component-tester", {impl2})  ├─ All 6 parallel
Task("playwright-dev-tester", {impl1})   │
Task("playwright-dev-tester", {impl2})  ┘

Each returns:
{
  status: "success",
  data: { /* test/story results */ },
  delegations: []  // Leaf agents - no further delegations
}

Collect all results and merge into final output
```

---

## The Key Insight: Multi-Level Delegation

### Level 0: Main Agent
- Calls orchestrator agent once
- Receives complete delegation plan
- Launches agents from delegations

### Level 1: Top-Level Agents (from orchestrator delegations)
- Receive context
- Do their work
- **Return delegations for Level 2 agents**
- Main agent launches these delegations

### Level 2: Sub-Agents (from top-level delegations)
- Receive context
- Do their work
- Return results (no further delegations)

---

## Example Walkthrough: Linear → Implementation

### Step 1: Main Agent Calls Orchestrator

```typescript
// Main agent
const orchestrationResult = await Task("orchestrator", {
  workflow: "linear-implementation",
  params: { ticketId: "ENG-123" },
  context: { /* initial */ }
});

console.log(orchestrationResult);
// {
//   status: "success",
//   delegations: [
//     { agent: "figma-design-analyzer", ... },
//     { agent: "senior-frontend-engineer", ... },
//     { agent: "senior-frontend-engineer", ... }
//   ]
// }
```

### Step 2: Orchestrator Agent Processes Workflow

**Inside orchestrator agent's context:**

```typescript
// Load workflow
const workflow = YAML.parse(readFile("workflows/linear-implementation.yaml"));

// Phase 1: Discover (executed in orchestrator's context)
const issue = fetchLinear("ENG-123");  // operation: op: fetch_linear
const context = analyzeIssue(issue);   // operation: op: analyze

// Phase 2: Design (NOT executed, prepare delegations)
const phase2Delegations = [];
for (const url of context.figmaUrls) {
  phase2Delegations.push({
    agent: "figma-design-analyzer",
    context: { figmaUrls: [url], issue },
    sequence: 2
  });
}

// Phase 3: Implementation (NOT executed, prepare delegations)
const phase3Delegations = [];
for (let i = 0; i < context.figmaSpecs.length; i++) {
  phase3Delegations.push({
    agent: "senior-frontend-engineer",
    context: { figmaSpecs: [context.figmaSpecs[i]], idx: i },
    sequence: 3
  });
}

// Return everything at once
return {
  status: "success",
  data: { issue, context },
  delegations: [...phase2Delegations, ...phase3Delegations]
};
```

### Step 3: Main Agent Launches Phase 2

```typescript
// Main agent received delegations
// Group by sequence
const bySequence = groupBy(delegations, d => d.sequence);

// Launch sequence 2 agents
const phase2Results = await Promise.all([
  Task("figma-design-analyzer", phase2Delegations[0]),
  Task("figma-design-analyzer", phase2Delegations[1])
]);

// Results:
// [
//   { status: "success", data: {spec1}, delegations: [] },
//   { status: "success", data: {spec2}, delegations: [] }
// ]
```

### Step 4: Main Agent Launches Phase 3

```typescript
// Phase 3 delegations (updated with phase 2 results)
const phase3Delegations = [
  {
    agent: "senior-frontend-engineer",
    context: { figmaSpecs: [spec1], ...etc },
    sequence: 3
  },
  {
    agent: "senior-frontend-engineer",
    context: { figmaSpecs: [spec2], ...etc },
    sequence: 3
  }
];

// Launch
const phase3Results = await Promise.all([
  Task("senior-frontend-engineer", phase3Delegations[0]),
  Task("senior-frontend-engineer", phase3Delegations[1])
]);

// Results include delegations:
// [
//   {
//     status: "success",
//     data: {impl1},
//     delegations: [
//       { agent: "storybook-expert", context: {impl1} },
//       { agent: "react-component-tester", context: {impl1} },
//       { agent: "playwright-dev-tester", context: {impl1} }
//     ]
//   },
//   {
//     status: "success",
//     data: {impl2},
//     delegations: [
//       { agent: "storybook-expert", context: {impl2} },
//       { agent: "react-component-tester", context: {impl2} },
//       { agent: "playwright-dev-tester", context: {impl2} }
//     ]
//   }
// ]
```

### Step 5: Main Agent Launches Phase 3.x (Sub-Delegations)

```typescript
// Extract sub-delegations from phase 3 results
const subDelegations = [];
for (const result of phase3Results) {
  if (result.delegations) {
    subDelegations.push(...result.delegations);
  }
}

// Launch all sub-agents in parallel
const subResults = await Promise.all(
  subDelegations.map(d => Task(d.agent, d.context))
);

// Results - all leaf agents (no further delegations):
// [
//   { status: "success", data: {stories1}, delegations: [] },
//   { status: "success", data: {tests1}, delegations: [] },
//   { status: "success", data: {vtest1}, delegations: [] },
//   { status: "success", data: {stories2}, delegations: [] },
//   { status: "success", data: {tests2}, delegations: [] },
//   { status: "success", data: {vtest2}, delegations: [] }
// ]
```

### Step 6: Final Aggregation

```typescript
// Merge all results
const finalOutput = {
  implementations: [impl1, impl2],
  stories: [stories1, stories2],
  tests: [tests1, tests2],
  visualTests: [vtest1, vtest2],
  success: true
};

return finalOutput;
```

---

## The Three Delegation Levels in Detail

### Level 1: Orchestrator Delegations (from orchestrator agent)

**Purpose**: Which top-level agents to run
**Specified by**: Orchestrator agent after processing workflow phases
**Example**: "Run figma-design-analyzer twice, then senior-frontend-engineer twice"

```typescript
{
  agent: "figma-design-analyzer",
  context: { figmaUrls: [...], issue: {...} },
  sequence: 2  // Which phase
}
```

### Level 2: Agent Delegations (from top-level agents)

**Purpose**: What sub-agents this agent needs
**Specified by**: Top-level agents (like senior-frontend-engineer)
**Example**: "I need storybook-expert, react-component-tester, playwright-dev-tester"

```typescript
{
  agent: "storybook-expert",
  context: { implementations: [{...}] },
  parallel: true  // Can run alongside others
}
```

### Level 3: Leaf Agent Delegations (from leaf agents)

**Purpose**: None - no further delegations
**Specified by**: All leaf agents
**Example**: `delegations: []`

```typescript
{
  agent: "storybook-expert",
  context: { implementations: [{...}] },
  parallel: true,
  delegations: []  // No further delegations
}
```

---

## Data Flow Through Levels

```
ORCHESTRATOR AGENT
┌─────────────────────────────────────────────────────┐
│ Processes phases in its context:                    │
│ - Phase 1: Discover (executed locally)              │
│ - Phase 2: Design (prepares delegations)            │
│ - Phase 3: Impl (prepares delegations)              │
│                                                     │
│ Returns:                                            │
│ {                                                   │
│   data: { issue, specs },                           │
│   delegations: [                                    │
│     { agent: figma, context: {url1} },              │
│     { agent: figma, context: {url2} },              │
│     { agent: impl, context: {spec1} },              │
│     { agent: impl, context: {spec2} }               │
│   ]                                                 │
│ }                                                   │
└─────────────────────────────────────────────────────┘
          ↓ (Main agent receives this)

MAIN AGENT
┌─────────────────────────────────────────────────────┐
│ Launches phase 2 (in parallel):                     │
│ - figma-design-analyzer x2                          │
│                                                     │
│ Each returns: { data: {spec}, delegations: [] }     │
│                                                     │
│ Launches phase 3 (in parallel):                     │
│ - senior-frontend-engineer x2                       │
│                                                     │
│ Each returns:                                       │
│ {                                                   │
│   data: {impl},                                     │
│   delegations: [                                    │
│     { agent: storybook, context: {...} },           │
│     { agent: tester, context: {...} },              │
│     { agent: playwright, context: {...} }           │
│   ]                                                 │
│ }                                                   │
│                                                     │
│ Extracts sub-delegations, launches in parallel:     │
│ - storybook-expert x2                               │
│ - react-component-tester x2                         │
│ - playwright-dev-tester x2                          │
│                                                     │
│ Each leaf agent returns: { data: {...}, delegations: [] }
└─────────────────────────────────────────────────────┘
          ↓ (Aggregates final results)

FINAL OUTPUT
```

---

## Key Characteristics of Each Level

### Orchestrator Agent (Level 1)
- ✅ Receives workflow name + parameters
- ✅ Processes all phases in its context
- ✅ Executes local operations
- ✅ Returns complete delegation plan
- ❌ Does NOT call Task() to execute agents
- ❌ Does NOT wait for results
- Delegation count: Moderate (one per agent needed)
- Sequence required: YES (specifies which phase)

### Top-Level Agents (Level 2)
- ✅ Receive context from main agent
- ✅ Do their job (analyze, implement, etc.)
- ✅ Return results + sub-delegations
- ❌ Do NOT call Task() to execute sub-agents
- ❌ Do NOT wait for sub-agent results
- Delegation count: Small (sub-agents needed)
- Sequence required: Optional (defaults to next phase)

### Leaf Agents (Level 3)
- ✅ Receive context from main agent
- ✅ Do their job (create stories, tests, etc.)
- ✅ Return results
- ✅ Return empty delegations array
- ❌ No further delegations possible
- Delegation count: Zero (always empty)
- Sequence required: N/A

---

## Parallelization at Each Level

### Level 1: Multiple Orchestrator Delegations
```
Main agent launches:
- Task(figma-analyzer, del1)  ┐
- Task(figma-analyzer, del2)  ├─ In parallel (same sequence)
- Task(figma-analyzer, del3)  ┘
```

### Level 2: Multiple Top-Level Agents
```
Main agent launches:
- Task(impl, del4)  ┐
- Task(impl, del5)  ├─ In parallel (same sequence)
```

### Level 3: Multiple Sub-Delegations
```
Main agent launches:
- Task(storybook, sub1)        ┐
- Task(storybook, sub2)        │
- Task(tester, sub3)           ├─ All in parallel
- Task(tester, sub4)           │
- Task(playwright, sub5)       ┘
- Task(playwright, sub6)
```

---

## Error Handling at Each Level

### Orchestrator Agent Failure
```
Task("orchestrator", {...}) → error
  → Main agent catches and decides recovery
  → Retry orchestrator, skip, or halt
```

### Top-Level Agent Failure
```
Task(figma-analyzer, del1) → error
  → Main agent catches
  → Other parallel tasks (del2, del3) continue
  → Main agent decides: retry, skip, or halt
  → Sub-delegations from this agent don't execute
```

### Sub-Agent Failure
```
Task(storybook, sub1) → error
  → Main agent catches
  → Other parallel tasks continue
  → Main agent decides: retry, skip, or halt
```

---

## Comparison: Nested vs. Delegation

### WRONG: Nested Agents (Old)
```
Agent A calls Task(Agent B)
  └─ Agent B calls Task(Agent C)
      └─ Agent C returns
    └─ Agent B returns
  └─ Agent A returns
```
Problems: Sequential, context duplication, hidden flow

### RIGHT: Delegation (New)
```
Agent A returns delegations: [Agent B, Agent C]
  ↓
Main agent launches B, C in parallel
  ├─ Agent B returns delegations: [Agent D, E]
  ├─ Agent C returns delegations: [Agent F]
  ↓
Main agent launches D, E, F in parallel
  └─ All return (no further delegations)
```
Benefits: Parallel, no duplication, explicit flow

---

## Summary: The Three Levels

1. **Orchestrator Agent** - Plans what to execute, returns delegations
2. **Main Agent** - Executes delegations in parallel, collects results
3. **Delegations** - Instructions for what agents to run and when

**The flow**: Orchestrator → Delegations → Main Agent → Parallel Execution → Results

**The key**: Every agent returns what it did + what comes next, never executes other agents.
