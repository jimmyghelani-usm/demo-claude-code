# Agent Delegation Architecture Redesign

## Executive Summary

**Current Problem**: Agents spawn sub-agents during execution, wasting tokens by:
1. Repeating agent specs and instructions
2. Duplicating context handling logic
3. Running agents sequentially when they could run in parallel
4. Losing orchestration visibility over multi-stage workflows

**Solution**: Agents return structured **delegation context** to the orchestrator, which:
1. Manages all sub-agent spawning
2. Runs agents in parallel at the phase level
3. Passes complete context only once
4. Removes agent-to-agent overhead
5. Maintains clean separation of concerns

**Context Savings**: ~40-60% reduction in token usage per multi-stage workflow by eliminating duplicate agent context and enabling true parallelization.

---

## Current Architecture (PROBLEMATIC)

### Sequential Delegation Overhead

```
User → Orchestrator
  ↓
Orchestrator calls senior-frontend-engineer
  ↓
senior-frontend-engineer (haiku model):
  - Receives ExecutionContext (~1,500 tokens)
  - Implements component
  - Calls Task() → storybook-expert (haiku loaded again ~800 tokens)
    - Receives ExecutionContext again (~1,500 tokens)  ← DUPLICATE
    - Creates stories
    - Returns results
  - Calls Task() → react-component-tester (haiku loaded again ~800 tokens)
    - Receives ExecutionContext again (~1,500 tokens)  ← DUPLICATE
    - Writes tests
    - Returns results
  - Calls Task() → playwright-dev-tester (haiku loaded again ~800 tokens)
    - Receives ExecutionContext again (~1,500 tokens)  ← DUPLICATE
    - Verifies visually
    - Returns results
  - Returns implementation results
  ↓
Orchestrator receives all results and continues

TOTAL OVERHEAD: 4-5x context loading + sequential execution
```

**Problems**:
- ❌ Agents receive full ExecutionContext 3+ times
- ❌ Sub-agents load their full instruction specs (800-1000 tokens each)
- ❌ Sequential execution prevents parallelization
- ❌ Orchestrator can't see delegation flow
- ❌ Error recovery difficult (which agent failed?)

---

## Proposed Architecture (OPTIMIZED)

### Parallel Delegation with Context Return

**KEY PRINCIPLE**: Orchestrator is itself an agent. It receives requests, processes phases, and **returns delegation instructions to the MAIN orchestrator** (the higher-level agent that called it). It does NOT directly execute Task() calls.

```
Main Orchestrator (Sonnet - context manager)
  ↓
Orchestrator Agent (receives workflow + context):
  1. Loads YAML workflow
  2. Executes phases sequentially:
     - Phase 1: Analyze requirements → Returns: {status, data, delegations: [agents needed]}
     - Phase 2: Design → Returns: {status, data, delegations: [agents needed]}
     - Phase 3: Implementation → Returns: {status, data, delegations: [agents needed]}
     - Phase 4: Testing → Returns: {status, data, delegations: [agents needed]}
  3. Returns COMPLETE execution plan with ALL delegations:
     {
       status: "success",
       data: { /* execution results */ },
       delegations: [
         { agent: "figma-design-analyzer", context: {...} },
         { agent: "senior-frontend-engineer", context: {...} },
         { agent: "senior-frontend-engineer", context: {...} },  // Multiple instances
         { agent: "storybook-expert", context: {...} },
         { agent: "react-component-tester", context: {...} },
         { agent: "playwright-dev-tester", context: {...} }
       ]
     }
  ↓
Main Orchestrator receives delegation plan and launches:
  ├─ Task() → figma-design-analyzer (~1,500 tokens)
  ├─ Task() → senior-frontend-engineer (~1,500 tokens) ── 1st instance
  ├─ Task() → senior-frontend-engineer (~1,500 tokens) ── 2nd instance
  ├─ Task() → storybook-expert (~1,500 tokens)
  ├─ Task() → react-component-tester (~1,500 tokens)
  └─ Task() → playwright-dev-tester (~1,500 tokens)
     (All coordinated by Main Orchestrator, which handles parallelization)

TOTAL OVERHEAD: Single orchestrator agent + delegations returned, parallelization by main controller
```

**Benefits**:
- ✅ Orchestrator agent returns plan instead of executing agents (clean separation)
- ✅ Main orchestrator handles all parallelization (true parallel execution)
- ✅ Each agent loaded once for each delegation
- ✅ No context duplication (each agent gets context once)
- ✅ Error recovery explicit (orchestrator agent can't control execution failures)
- ✅ 40-60% context reduction through smart delegation

---

## Return Format Specification

### All Agents Must Return This Structure

```typescript
{
  // Required
  status: "success" | "error" | "partial",
  data: {
    // Agent-specific results
    [key: string]: any
  },
  storeAs: "key-in-discovered-data",  // Where to store results

  // NEW: Delegation instructions for orchestrator
  delegations?: [
    {
      agent: "storybook-expert",
      context: {
        // Minimal context for this sub-task
        componentName: "HeroSection",
        filePath: "src/components/sections/HeroSection.tsx",
        // Include only what this agent needs
      },
      parallel: true,  // Can run alongside other delegations
      sequence: 1      // Phase where this should run (optional)
    },
    {
      agent: "react-component-tester",
      context: {
        componentName: "HeroSection",
        filePath: "src/components/sections/HeroSection.tsx",
      },
      parallel: true
    }
  ],

  // Optional: recovery guidance
  error?: {
    message: string,
    recovery: "retry" | "skip" | "halt",
    delegations_completed?: string[]
  }
}
```

---

## Agent-Specific Changes

### 1. senior-frontend-engineer.md

**Current Pattern** (PROBLEMATIC):
```typescript
// Inside senior-frontend-engineer agent
await Task('storybook-expert', { context, componentName, filePath });
await Task('react-component-tester', { context, componentName, filePath });
await Task('playwright-dev-tester', { context, figmaSpecs, implementations });
```

**New Pattern** (OPTIMIZED):
```typescript
// Inside senior-frontend-engineer agent
const implementation = {
  componentName: "HeroSection",
  filePath: "src/components/sections/HeroSection.tsx",
  exportPath: "src/components/sections/index.ts",
  stories: false,  // Not created yet
  tests: false     // Not created yet
};

// Return delegation instructions instead of calling agents
return {
  status: "success",
  data: {
    componentName: implementation.componentName,
    filePath: implementation.filePath,
    exportPath: implementation.exportPath,
    description: "Responsive hero section with CTA button"
  },
  storeAs: "implementations",

  // NEW: Orchestrator will handle these delegations
  delegations: [
    {
      agent: "storybook-expert",
      context: {
        implementations: [implementation]  // Pass only what's needed
      },
      parallel: true
    },
    {
      agent: "react-component-tester",
      context: {
        implementations: [implementation]
      },
      parallel: true
    },
    {
      agent: "playwright-dev-tester",
      context: {
        implementations: [implementation],
        figmaSpecs: context.discoveredData.figmaSpecs
      },
      parallel: true
    }
  ]
};
```

**Changes**:
- ❌ Remove all `Task()` calls to storybook-expert, react-component-tester, playwright-dev-tester
- ✅ Return `delegations` array in response
- ✅ Let orchestrator manage sub-agent execution
- ✅ Focus ONLY on component implementation

---

### 2. figma-design-analyzer.md

**Current Pattern** (if delegating):
```typescript
// Inside figma-design-analyzer
// (Currently doesn't delegate, but could in future)
```

**New Pattern**:
```typescript
// Always return delegation format for consistency
return {
  status: "success",
  data: {
    nodeId: "2171:13039",
    screenshot: "docs/temp/figma-screenshots/hero.png",
    colors: { /* ... */ },
    typography: { /* ... */ },
    layout: { /* ... */ }
  },
  storeAs: "figmaSpecs",

  delegations: []  // No delegations for this agent
};
```

---

### 3. prd-writer.md

**Current Pattern** (if delegating):
```typescript
// Inside prd-writer
// Could eventually delegate to figma-design-analyzer and senior-frontend-engineer
```

**New Pattern**:
```typescript
return {
  status: "success",
  data: {
    requirements: "...",
    successCriteria: "...",
    technicalNotes: "...",
    estimatedComplexity: "high"
  },
  storeAs: "prd",

  delegations: []  // PRD writer focuses only on PRD creation
};
```

---

### 4. storybook-expert.md

**No Changes Required**:
- Already a leaf agent (no sub-delegations)
- Continues to receive ExecutionContext from orchestrator
- Returns standard format (no delegations needed)

```typescript
return {
  status: "success",
  data: {
    componentName: "HeroSection",
    storiesFile: "src/components/sections/HeroSection.stories.tsx",
    storiesCreated: 5,
    interactionTestsCreated: 3
  },
  storeAs: "storybookResults",
  delegations: []  // Leaf agent
};
```

---

### 5. react-component-tester.md

**No Changes Required**:
- Already a leaf agent (no sub-delegations)
- Continues to receive ExecutionContext from orchestrator
- Returns standard format

```typescript
return {
  status: "success",
  data: {
    componentName: "HeroSection",
    testFile: "src/components/sections/HeroSection.test.tsx",
    testsCreated: 8,
    testsPassing: 8
  },
  storeAs: "testResults",
  delegations: []  // Leaf agent
};
```

---

### 6. playwright-dev-tester.md

**No Changes Required**:
- Already a leaf agent (no sub-delegations)
- Continues to receive ExecutionContext from orchestrator
- Returns standard format

```typescript
return {
  status: "success",
  data: {
    visualTestsRun: 3,
    visualDifferencesFound: 0,
    a11yIssuesFound: 0,
    responseiveTestsRun: 3,
    screenshotsCreated: 6
  },
  storeAs: "visualTestResults",
  delegations: []  // Leaf agent
};
```

---

## Orchestrator Changes

### New Responsibility: Delegation Manager

**After collecting phase results, the orchestrator must:**

```typescript
// 1. Extract delegations from all results
const delegations = [];
for (const result of phaseResults) {
  if (result.delegations?.length > 0) {
    delegations.push(...result.delegations);
  }
}

// 2. Group delegations by sequence number (or use defaults)
const delegationsByPhase = groupBy(delegations, d => d.sequence || currentPhase + 1);

// 3. For next phase, launch all delegations in parallel
if (delegations.length > 0) {
  const nextPhaseResults = await Promise.all(
    delegations.map(d =>
      Task(d.agent, {
        ...context,
        discoveredData: {
          ...context.discoveredData,
          ...d.context  // Merge delegation-specific context
        }
      })
    )
  );

  // 4. Store delegation results in context
  context.agentResults[`delegations_${currentPhase}`] = nextPhaseResults;

  // 5. Update discoveredData with delegation results
  for (const result of nextPhaseResults) {
    context.discoveredData[result.storeAs] = result.data;
  }
}
```

---

## Token Savings Breakdown

### Example: Linear → Implementation → Testing

**Current Architecture**:
```
Phase 1: Discover (orchestrator)
  ~500 tokens

Phase 2: Design Analysis (parallel)
  figma-design-analyzer: 1,500 tokens (context) + 800 (spec) = 2,300
  × 2 designs = 4,600 tokens

Phase 3: Implementation (parallel)
  senior-frontend-engineer: 1,500 (context) + 800 (spec) = 2,300
  × 2 components = 4,600 tokens

  WITHIN senior-frontend-engineer:
    storybook-expert call: 1,500 (context dup!) + 800 (spec) = 2,300 × 2 = 4,600
    react-component-tester call: 1,500 (context dup!) + 800 (spec) = 2,300 × 2 = 4,600
    playwright-dev-tester call: 1,500 (context dup!) + 800 (spec) = 2,300 × 1 = 2,300

TOTAL: 500 + 4,600 + 4,600 + 4,600 + 4,600 + 2,300 = 21,200 tokens
```

**New Architecture**:
```
Phase 1: Discover (orchestrator)
  ~500 tokens

Phase 2: Design Analysis (parallel)
  figma-design-analyzer: 1,500 (context) + 800 (spec) = 2,300
  × 2 designs = 4,600 tokens

Phase 3: Implementation (parallel)
  senior-frontend-engineer: 1,500 (context) + 800 (spec) = 2,300
  × 2 components = 4,600 tokens

Phase 4: Testing & Stories (parallel) ← NOW PARALLEL, NOT NESTED
  storybook-expert: 1,500 (context) + 800 (spec) = 2,300  ← ONCE, reused 2x
  react-component-tester: 1,500 (context) + 800 (spec) = 2,300  ← ONCE, reused 2x
  playwright-dev-tester: 1,500 (context) + 800 (spec) = 2,300  ← ONCE

TOTAL: 500 + 4,600 + 4,600 + 2,300 + 2,300 + 2,300 = 16,600 tokens

SAVINGS: 21,200 - 16,600 = 4,600 tokens (21.7% reduction)

WITH MULTIPLE COMPONENTS: savings scale to 40-60% as parallelization becomes more effective
```

---

## Implementation Checklist

### Phase 1: Update Agent Specs
- [ ] `senior-frontend-engineer.md` - Add delegations return
- [ ] `figma-design-analyzer.md` - Document delegation format (empty array)
- [ ] `prd-writer.md` - Document delegation format (empty array)
- [ ] `storybook-expert.md` - Document delegation format (empty array)
- [ ] `react-component-tester.md` - Document delegation format (empty array)
- [ ] `playwright-dev-tester.md` - Document delegation format (empty array)

### Phase 2: Update Orchestrator
- [ ] Add delegation extraction logic
- [ ] Add delegation grouping by sequence
- [ ] Add parallel delegation launching
- [ ] Add delegation result collection
- [ ] Add delegation context merging

### Phase 3: Update Workflow YAMLs
- [ ] `workflows/linear-implementation.yaml` - Update task completion markers
- [ ] `workflows/figma-to-implementation.yaml` - Update task completion markers
- [ ] `workflows/prd-with-implementation.yaml` - Update task completion markers

### Phase 4: Testing & Validation
- [ ] Test single component workflow
- [ ] Test parallel component workflow (3+ components)
- [ ] Measure token usage before/after
- [ ] Verify error handling in delegations
- [ ] Test mixed delegation scenarios

---

## Backward Compatibility

**Agents can return both old and new formats during transition:**

```typescript
return {
  status: "success",
  data: { /* ... */ },
  storeAs: "key",
  delegations: [],  // NEW: added, orchestrator will handle

  // OLD: will be ignored by updated orchestrator
  // context: { /* ... */ }
};
```

**Orchestrator should handle:**
- Agents returning no `delegations` key → treat as empty array
- Agents returning `delegations: []` → no sub-delegations
- Agents returning `delegations: [{...}]` → queue for next phase

---

## Key Principles

1. **Agents are task-focused**: Implement/analyze/test, then return results + delegation instructions
2. **Orchestrator is coordination-focused**: Manage phases, parallelize tasks, handle delegations
3. **Context flows down, results flow up**: Each agent gets ExecutionContext once
4. **Delegations are metadata**: Agents describe what to do next, orchestrator executes
5. **Parallelization is automatic**: Orchestrator groups delegations by sequence and runs in parallel

---

## Decision Points for Future Agents

When creating a new agent, decide:

1. **Does it spawn sub-agents?**
   - YES → Return `delegations` array
   - NO → Return `delegations: []`

2. **What context does a delegation need?**
   - Include ONLY what that agent needs
   - Inherit full ExecutionContext from orchestrator automatically

3. **Can delegations run in parallel?**
   - Set `parallel: true` (default)
   - Set `parallel: false` if strict sequence needed

4. **When should delegations run?**
   - Default: next phase
   - Specify `sequence: N` if different

---

## Example: Updated Linear → Implementation Workflow

### Before (Current)
```
linear-implementation.yaml:
  Phase: implementation
    Task: senior-frontend-engineer
      - Implements component
      - INSIDE: calls storybook-expert
      - INSIDE: calls react-component-tester
      - INSIDE: calls playwright-dev-tester
      - Returns when all sub-agents complete
```

### After (Optimized)
```
linear-implementation.yaml:
  Phase: implementation
    Task: senior-frontend-engineer
      - Implements component
      - Returns with delegations: [storybook, tester, playwright]

  Phase: testing (implicit, created from delegations)
    Task: storybook-expert (from delegation)
    Task: react-component-tester (from delegation)
    Task: playwright-dev-tester (from delegation)
      - All run in parallel
      - Return results
```

The workflow definition doesn't change; the orchestrator automatically handles delegations!

---

## Parallel Agent Instantiation Strategies

### When to Use Multiple Agent Instances of the Same Type

#### Scenario 1: Multiple Independent Components
```
Components to build: HeroSection, FeatureCards, TestimonialSection

Strategy: Launch 3 instances of senior-frontend-engineer in parallel
```typescript
delegations: [
  {
    agent: "senior-frontend-engineer",
    context: { figmaSpecs: [specs[0]], idx: 0 },
    parallel: true
  },
  {
    agent: "senior-frontend-engineer",
    context: { figmaSpecs: [specs[1]], idx: 1 },
    parallel: true
  },
  {
    agent: "senior-frontend-engineer",
    context: { figmaSpecs: [specs[2]], idx: 2 },
    parallel: true
  }
]
```

**Benefits**:
- ✅ 3 components built in parallel (not sequential)
- ✅ Each agent handles one spec completely
- ✅ No contention or synchronization needed
- ✅ Context overhead: 1,500 tokens × 3 = 4,500 tokens (still efficient)

---

#### Scenario 2: Single Large Component (Multiple Aspects)

**Example**: Complex component like "ProductDetailPage" that needs:
- Design system token extraction
- Component structure analysis
- Accessibility audit
- Performance profiling

**Strategy: Single agent instance** (don't split)
```typescript
// ❌ WRONG - Over-parallelization
delegations: [
  { agent: "senior-frontend-engineer", context: { task: "structure" } },
  { agent: "senior-frontend-engineer", context: { task: "accessibility" } },
  { agent: "senior-frontend-engineer", context: { task: "performance" } }
]
// Results: Duplicated work, conflicting code, merge nightmares

// ✅ RIGHT - Single agent handles all aspects
delegations: [
  {
    agent: "senior-frontend-engineer",
    context: {
      figmaSpecs: [largeComponentSpec],
      focusAreas: ["structure", "accessibility", "performance"]
    },
    parallel: false  // Run after previous phase completes
  }
]
```

**Why**:
- Single component needs cohesive implementation
- Multiple parallel attempts = duplicate code
- Coordination between agents = hidden complexity

---

#### Scenario 3: Designing Which Agents to Parallelize

**Decision Tree**:

```
Are there multiple INDEPENDENT tasks?
├─ YES: Same agent type, different data
│   └─ Example: 5 components to build
│       └─ Launch 5 × senior-frontend-engineer in parallel ✅
│
├─ PARTIALLY: Different agent types
│   └─ Example: figma-design-analyzer + prd-writer
│       └─ Launch both in parallel (different agents) ✅
│
└─ NO: Single task with multiple aspects
    └─ Example: One complex component, multiple concerns
        └─ Launch 1 × senior-frontend-engineer sequentially ✅
```

---

### Orchestrator's Parallel Launch Pattern

**How to invoke multiple instances of the same agent:**

```typescript
// In orchestrator, when collecting delegations:
const delegations = [
  {
    agent: "storybook-expert",
    context: { implementations: [impl1] },
    parallel: true,
    id: "storybook-1"
  },
  {
    agent: "storybook-expert",
    context: { implementations: [impl2] },
    parallel: true,
    id: "storybook-2"
  },
  {
    agent: "storybook-expert",
    context: { implementations: [impl3] },
    parallel: true,
    id: "storybook-3"
  }
];

// Launch all in parallel (same agent type, different contexts)
const results = await Promise.all(
  delegations.map(d =>
    Task(d.agent, {
      ...context,
      discoveredData: { ...context.discoveredData, ...d.context },
      delegationId: d.id  // For tracking results
    })
  )
);

// Collect results by delegation ID
const collectedResults = {};
for (const result of results) {
  collectedResults[result.delegationId] = result.data;
}
```

**Key Points**:
- ✅ Each Task() call is independent
- ✅ All execute simultaneously
- ✅ Orchestrator collects results in any order
- ✅ No coordination needed between agents
- ✅ Each agent gets fresh ExecutionContext

---

### Practical Guidelines

#### When parallel instances are GOOD:
- ✅ Different input data (different designs, different components, different issues)
- ✅ No dependencies between instances
- ✅ Results can be merged trivially (array.push())
- ✅ Token cost is linear (1 load + N × execution)

**Examples**:
```
5 components → 5 × senior-frontend-engineer instances
5 Figma designs → 5 × figma-design-analyzer instances
5 test plans → 5 × react-component-tester instances
```

#### When parallel instances are BAD:
- ❌ Same task, duplicated work
- ❌ Dependencies between instances (one needs another's output)
- ❌ Shared state/resources (file system conflicts)
- ❌ Coordination overhead > parallelization benefit

**Examples**:
```
One component with 5 aspects → 1 × senior-frontend-engineer (not 5)
Single design file, 5 analyses → 1 × figma-design-analyzer (not 5)
```

---

### Token Cost Analysis: Single vs. Multiple Agents

#### Multiple Components (Parallel Instances)

**Components to build**: 5 independent components

**Approach 1: Sequential with nested sub-agents (CURRENT)**
```
Component 1:
  senior-frontend-engineer: 1,500 (context) + 800 (spec)
    → storybook-expert: 1,500 + 800 = 2,300
    → react-component-tester: 1,500 + 800 = 2,300
    → playwright-dev-tester: 1,500 + 800 = 2,300
  Subtotal: 8,600 tokens

Component 2-5: 8,600 × 4 = 34,400 tokens

TOTAL: 43,000 tokens
```

**Approach 2: Parallel with delegation (OPTIMIZED)**
```
Phase: Implementation (parallel)
  5 × senior-frontend-engineer: (1,500 + 800) × 5 = 11,500 tokens

Phase: Testing (parallel)
  5 × storybook-expert: (1,500 + 800) × 1 = 2,300 tokens (reused)
  5 × react-component-tester: (1,500 + 800) × 1 = 2,300 tokens (reused)
  5 × playwright-dev-tester: (1,500 + 800) × 1 = 2,300 tokens (reused)

TOTAL: 18,400 tokens

SAVINGS: 43,000 - 18,400 = 24,600 tokens (57% reduction!)
```

---

### Orchestrator Scaling Patterns

#### Pattern 1: Homogeneous Parallelization
```typescript
// Multiple instances of SAME agent, different data
const delegations = implementations.map((impl, idx) => ({
  agent: "senior-frontend-engineer",
  context: { figmaSpecs: [specs[idx]], idx },
  parallel: true,
  id: `impl-${idx}`
}));

// Result: N agents running simultaneously
```

#### Pattern 2: Heterogeneous Parallelization
```typescript
// Multiple DIFFERENT agents, no dependencies
const delegations = [
  { agent: "figma-design-analyzer", context: { ... }, parallel: true },
  { agent: "prd-writer", context: { ... }, parallel: true },
  { agent: "mcp-execution-agent", context: { ... }, parallel: true }
];

// Result: 3 different agent types running simultaneously
```

#### Pattern 3: Mixed Delegation
```typescript
// Some parallel, some sequential
const delegations = [
  // Phase 1: Parallel implementations
  { agent: "senior-frontend-engineer", context: { idx: 0 }, parallel: true, sequence: 1 },
  { agent: "senior-frontend-engineer", context: { idx: 1 }, parallel: true, sequence: 1 },
  { agent: "senior-frontend-engineer", context: { idx: 2 }, parallel: true, sequence: 1 },

  // Phase 2: Wait for implementations, then run tests in parallel
  { agent: "react-component-tester", context: { idx: 0 }, parallel: true, sequence: 2 },
  { agent: "react-component-tester", context: { idx: 1 }, parallel: true, sequence: 2 },
  { agent: "react-component-tester", context: { idx: 2 }, parallel: true, sequence: 2 }
];

// Orchestrator groups by sequence and runs each group in parallel
```

---

## Next Steps

1. **Review this document** with the team
2. **Update agent specs** using Phase 1 checklist
3. **Implement orchestrator changes** using Phase 2 checklist
4. **Test with example workflow** (start with single component)
5. **Test parallel instantiation** (start with 2 components)
6. **Measure improvements** (token usage, execution time)
7. **Scale to production** (multi-component workflows with parallel agents)
