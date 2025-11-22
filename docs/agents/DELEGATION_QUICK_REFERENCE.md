# Agent Delegation - Quick Reference Guide

## The New Return Format

Every agent MUST return this structure:

```typescript
{
  status: "success" | "error" | "partial",
  data: {
    // Your agent-specific results
    componentName?: string,
    filePath?: string,
    // ... other fields
  },
  storeAs: "key-name",  // Where to store in discoveredData
  delegations: [        // NEW: Tell orchestrator what to do next
    // Leave empty [] if no sub-tasks
    // Add objects if you have sub-delegations
  ]
}
```

---

## For Agents WITH Sub-Tasks (e.g., senior-frontend-engineer)

### What You Do:
1. Do your main work (e.g., implement component)
2. Prepare sub-task instructions in `delegations` array
3. Return results + delegations
4. **STOP** - Don't call sub-agents yourself!

### Return Example:
```typescript
return {
  status: "success",
  data: {
    componentName: "HeroSection",
    filePath: "src/components/sections/HeroSection.tsx"
  },
  storeAs: "implementations",
  delegations: [
    {
      agent: "storybook-expert",
      context: {
        implementations: [{ componentName, filePath }]
      },
      parallel: true
    },
    {
      agent: "react-component-tester",
      context: {
        implementations: [{ componentName, filePath }]
      },
      parallel: true
    }
  ]
};
```

### Key Rules:
- ✅ Return delegation instructions
- ✅ Include only necessary context per delegation
- ✅ Set `parallel: true` if tasks can run together
- ❌ Don't call Task() yourself
- ❌ Don't pass full ExecutionContext in delegations

---

## For Leaf Agents (storybook-expert, react-component-tester, etc.)

### What You Do:
1. Do your work (e.g., create stories)
2. Return results
3. Always include `delegations: []`

### Return Example:
```typescript
return {
  status: "success",
  data: {
    componentName: "HeroSection",
    storiesFile: "src/components/sections/HeroSection.stories.tsx",
    storiesCreated: 5
  },
  storeAs: "storybookResults",
  delegations: []  // Leaf agent - no sub-delegations
};
```

### Key Rules:
- ✅ Include `delegations: []` (even though empty)
- ✅ Focus only on your task
- ❌ Don't worry about what comes next
- ❌ Don't try to delegate further

---

## For the Orchestrator

### What It Must Do:

1. **Launch agents normally** (as before)
2. **Extract delegations** from results
3. **Group by sequence** number (default: next phase)
4. **Launch parallel delegations** in one call
5. **Merge results** into discoveredData

### Pseudo-Code:
```typescript
// After phase completes
const delegations = [];
for (const result of phaseResults) {
  if (result.delegations?.length > 0) {
    delegations.push(...result.delegations);
  }
}

// Group by sequence
const bySequence = groupBy(delegations, d => d.sequence || currentPhase + 1);

// Launch next phase delegations in parallel
for (const [sequence, tasks] of Object.entries(bySequence)) {
  const delegationResults = await Promise.all(
    tasks.map(d =>
      Task(d.agent, {
        ...context,
        discoveredData: {
          ...context.discoveredData,
          ...d.context
        }
      })
    )
  );

  // Merge results
  for (const result of delegationResults) {
    context.discoveredData[result.storeAs] = result.data;
  }
}
```

---

## Parallel Agent Instantiation

### When to Use Multiple Instances of Same Agent

**USE MULTIPLE** (Good):
```
5 components to build?
→ Return 5 delegations to senior-frontend-engineer
→ Each with different component spec
→ All run in parallel
```

**USE SINGLE** (Good):
```
1 complex component with many aspects?
→ Return 1 delegation to senior-frontend-engineer
→ Agent handles all aspects cohesively
→ Runs once, completely
```

### Decision Tree:
```
Multiple independent tasks?
├─ YES: Different data, no dependencies
│   → Multiple agent instances ✅
│
└─ NO: Single task with multiple aspects
    → Single agent instance ✅
```

---

## Common Delegation Patterns

### Pattern 1: Component Implementation + Testing
```typescript
// Inside senior-frontend-engineer
delegations: [
  {
    agent: "storybook-expert",
    context: { implementations: [impl] },
    parallel: true
  },
  {
    agent: "react-component-tester",
    context: { implementations: [impl] },
    parallel: true
  },
  {
    agent: "playwright-dev-tester",
    context: { implementations: [impl], figmaSpecs: ... },
    parallel: true
  }
]
```

### Pattern 2: Multiple Components (Parallel)
```typescript
// Inside orchestrator receiving multiple delegations
// Agent 1 returns: delegations: [{ agent: "storybook", context: {impl1} }, ...]
// Agent 2 returns: delegations: [{ agent: "storybook", context: {impl2} }, ...]
// Agent 3 returns: delegations: [{ agent: "storybook", context: {impl3} }, ...]

// Orchestrator combines all and launches in parallel:
Task(storybook, {context: impl1})
Task(storybook, {context: impl2})
Task(storybook, {context: impl3})
// All run simultaneously!
```

### Pattern 3: Sequential Dependencies
```typescript
// Delegation 1 (sequence 2 - after phase 1 completes)
{
  agent: "analyzer",
  context: { data: ... },
  sequence: 2,
  parallel: false  // Optional: explicit sequential
}

// Delegation 2 (sequence 3 - after phase 2 completes)
{
  agent: "implementer",
  context: { analysis: ... },
  sequence: 3,
  parallel: false
}
```

---

## Token Comparison

### Before (Sequential with Nested Agents):
```
Agent 1 (loaded): 800 tokens
├─ ExecutionContext: 1,500 tokens
├─ Agent 2 (loaded): 800 tokens
│  └─ ExecutionContext (dup!): 1,500 tokens ← WASTE
├─ Agent 3 (loaded): 800 tokens
│  └─ ExecutionContext (dup!): 1,500 tokens ← WASTE
└─ Agent 4 (loaded): 800 tokens
   └─ ExecutionContext (dup!): 1,500 tokens ← WASTE

Total: 13,200 tokens (lots of duplication)
```

### After (Orchestrator-Managed Parallel):
```
Phase 1: Agent 1 (loaded): 800 tokens
├─ ExecutionContext: 1,500 tokens

Phase 2: All parallel delegations reuse loaded agents
├─ Agent 2 (loaded once): 800 tokens (reused 3x)
├─ ExecutionContext: 1,500 tokens (once per agent)
├─ Agent 3 (loaded once): 800 tokens (reused 3x)
├─ ExecutionContext: 1,500 tokens (once per agent)
├─ Agent 4 (loaded once): 800 tokens (reused 3x)
└─ ExecutionContext: 1,500 tokens (once per agent)

Total: 7,800 tokens (no duplication, 41% savings!)
```

---

## Checklist: Am I Delegating Correctly?

### Before Returning From Agent:

- [ ] I've completed my task
- [ ] My results are in `data` object
- [ ] `storeAs` key is set correctly
- [ ] If I have sub-tasks:
  - [ ] Each sub-task is a delegation object
  - [ ] Each has `agent`, `context`, `parallel` fields
  - [ ] Context is minimal (not full ExecutionContext)
- [ ] If I'm a leaf agent:
  - [ ] `delegations: []` is present
- [ ] Status is `"success"`, `"error"`, or `"partial"`

### For Orchestrator:

- [ ] I extract delegations from all agent results
- [ ] I group delegations by sequence number
- [ ] I launch all same-sequence delegations in Promise.all()
- [ ] I collect results from all delegations
- [ ] I merge results into discoveredData
- [ ] I handle errors per phase policy

---

## Minimal Delegation Context Example

### ❌ WRONG - Too Much Context:
```typescript
delegations: [{
  agent: "storybook-expert",
  context: {
    // Why include all this?
    workflowId: "...",
    discoveredData: { /* everything */ },
    metadata: { /* everything */ },
    implementations: [{ componentName, filePath }]
  }
}]
```

### ✅ RIGHT - Minimal Context:
```typescript
delegations: [{
  agent: "storybook-expert",
  context: {
    // Only what this agent needs
    implementations: [{ componentName, filePath }]
  }
}]
// Orchestrator will merge with full ExecutionContext
```

---

## Debugging: What If Delegations Don't Run?

### Check List:
1. Agent returned `delegations` array? (not undefined)
2. Each delegation has `agent` and `context`?
3. Orchestrator is checking for `delegations` in results?
4. Delegation sequence number is correct?
5. `parallel: true` is set if tasks are independent?

### Common Issues:
```
Issue: Delegations ignored
→ Agent didn't return delegations field
→ Orchestrator isn't checking for delegations

Issue: Only one delegation runs
→ parallel: false is set (correct if intentional)
→ sequence numbers are different

Issue: Wrong context received
→ Orchestrator didn't merge with full ExecutionContext
→ Delegation context missing required fields

Issue: Results not stored
→ storeAs key doesn't match expected key
→ discoveredData merge not working
```

---

## Performance Impact

### Execution Time:
- **Before**: Sequential (longest path = sum of all agents)
- **After**: Parallel (longest path = max(parallel agents))
- **Improvement**: 3-5x faster for multi-component workflows

### Token Usage:
- **Before**: 21K-43K tokens (duplication + redundancy)
- **After**: 16K-18K tokens (single load + reuse)
- **Improvement**: 21-57% reduction

### Code Complexity:
- **Before**: Distributed across agents
- **After**: Centralized in orchestrator
- **Trade-off**: Higher orchestrator complexity, cleaner agents

---

## Quick Decision Guide

### Question: "Should I delegate this task?"

```
├─ Is this a sub-task of my main job?
│  └─ YES → Return delegation instruction ✅
│  └─ NO  → Handle it yourself or skip
│
├─ Can this task run in parallel with others?
│  └─ YES → Set parallel: true ✅
│  └─ NO  → Set parallel: false (or skip)
│
├─ Can I do this task myself?
│  └─ YES → Do it! (Don't delegate if not needed)
│  └─ NO  → Return delegation instruction ✅
│
└─ Am I a leaf agent (no sub-tasks)?
   └─ YES → Return delegations: [] ✅
   └─ NO  → Return delegations: [...] ✅
```

---

## Examples by Agent Type

### Senior Frontend Engineer Example:
```typescript
return {
  status: "success",
  data: {
    componentName: "HeroSection",
    filePath: "src/components/sections/HeroSection.tsx",
    exportPath: "src/components/sections/index.ts"
  },
  storeAs: "implementations",
  delegations: [
    {
      agent: "storybook-expert",
      context: { implementations: [{ componentName: "HeroSection", filePath }] },
      parallel: true
    },
    {
      agent: "react-component-tester",
      context: { implementations: [{ componentName: "HeroSection", filePath }] },
      parallel: true
    }
  ]
};
```

### Storybook Expert Example:
```typescript
return {
  status: "success",
  data: {
    componentName: "HeroSection",
    storiesFile: "src/components/sections/HeroSection.stories.tsx",
    storiesCreated: 5,
    interactionTestsCreated: 2
  },
  storeAs: "storybookResults",
  delegations: []  // Leaf agent
};
```

### Figma Design Analyzer Example:
```typescript
return {
  status: "success",
  data: {
    nodeId: "2171:13039",
    screenshot: "docs/temp/figma-screenshots/hero.png",
    colors: { primary: "#ffffff", secondary: "#000000" },
    typography: { h1: { size: 32, weight: 700 } }
  },
  storeAs: "figmaSpecs",
  delegations: []  // Leaf agent
};
```

---

## Help: I'm Confused About...

**Q: Should I pass full ExecutionContext in delegations?**
A: No! Pass only what the sub-agent needs. Orchestrator merges with full context.

**Q: Can the same agent type be used multiple times?**
A: Yes! Launch multiple instances with different contexts. Orchestrator handles this.

**Q: What if a delegation fails?**
A: Orchestrator handles per-phase error policy. Delegation failures treated like agent failures.

**Q: How does the orchestrator know when to launch delegations?**
A: After agent completes and returns results with delegations array.

**Q: Can I delegate to another agent that also delegates?**
A: Yes! Agents can nest delegations (chain delegation). Orchestrator handles recursively.

**Q: Should delegations always run in parallel?**
A: No! Use `parallel: false` if sequence matters. Use `sequence: N` for explicit ordering.

---

## Transition Checklist

### Immediate:
- [ ] Understand this quick reference
- [ ] Read the full redesign document
- [ ] Review examples for your agent type

### Short Term:
- [ ] Update your agent specs
- [ ] Return delegations in your agent
- [ ] Test with simple example

### Validation:
- [ ] Delegations execute as expected
- [ ] Results merge correctly
- [ ] Token usage improves
- [ ] Parallel execution works

---

**For more details, see**: `docs/agents/AGENT_DELEGATION_REDESIGN.md`

**Agent specs updated**:
- `.claude/agents/senior-frontend-engineer.md`
- `.claude/agents/figma-design-analyzer.md`
- `.claude/agents/prd-writer.md`
- `.claude/agents/storybook-expert.md`
- `.claude/agents/react-component-tester.md`
- `.claude/agents/playwright-dev-tester.md`
- `.claude/agents/orchestrator.md`
