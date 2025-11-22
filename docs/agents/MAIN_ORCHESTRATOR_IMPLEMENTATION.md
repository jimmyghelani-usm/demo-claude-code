# Main Orchestrator Implementation Guide

## Overview

The **main orchestrator** (outside the agent system) receives delegations from `/orchestrate` command and executes agents in parallel.

This guide explains exactly how to implement the main orchestrator to:
1. Execute delegations by sequence
2. Launch parallel agents
3. Collect sub-delegations from agents
4. Aggregate final results
5. Handle errors properly

---

## What the Orchestrator Receives

From `/orchestrate` command, the main orchestrator receives:

```typescript
{
  status: "success",
  data: {
    workflowId: "workflow-abc123",
    phasesCompleted: 2,
    executionSummary: "Fetched Linear ENG-123, analyzed 2 Figma URLs",
    discoveredData: {
      linearIssue: { id: "ENG-123", title: "..." },
      context: { hasFigma: true, components: 2, figmaUrls: [...] }
    }
  },
  storeAs: "orchestrationPlan",
  delegations: [
    {
      agent: "figma-design-analyzer",
      context: { figmaUrls: [...], linearIssue: {...} },
      parallel: true,
      sequence: 2
    },
    {
      agent: "figma-design-analyzer",
      context: { figmaUrls: [...], linearIssue: {...} },
      parallel: true,
      sequence: 2
    },
    {
      agent: "senior-frontend-engineer",
      context: { figmaSpecs: [...], linearIssue: {...}, idx: 0 },
      parallel: true,
      sequence: 3
    },
    {
      agent: "senior-frontend-engineer",
      context: { figmaSpecs: [...], linearIssue: {...}, idx: 1 },
      parallel: true,
      sequence: 3
    }
  ]
}
```

---

## Main Orchestrator Pseudocode

### Step 1: Initialize

```typescript
const orchestrationPlan = await Task("orchestrate", {
  workflow: "linear-to-implementation",
  params: { ticketId: "ENG-123" }
});

// Extract components
const { status, data, delegations } = orchestrationPlan;
const { discoveredData } = data;
const executionContext = {
  workflowId: data.workflowId,
  discoveredData: discoveredData,
  agentResults: {},
  metadata: data
};
```

### Step 2: Group Delegations by Sequence

```typescript
const delegationsBySequence = {};

for (const delegation of delegations) {
  const sequence = delegation.sequence || (data.phasesCompleted + 1);

  if (!delegationsBySequence[sequence]) {
    delegationsBySequence[sequence] = [];
  }

  delegationsBySequence[sequence].push(delegation);
}

// Sort by sequence number
const sortedSequences = Object.keys(delegationsBySequence)
  .map(Number)
  .sort((a, b) => a - b);
```

### Step 3: Execute Each Sequence (Serial Phases, Parallel Within Phase)

```typescript
for (const sequence of sortedSequences) {
  const sequenceDelegations = delegationsBySequence[sequence];

  console.log(`\nPhase ${sequence}: Launching ${sequenceDelegations.length} agents in parallel`);

  // Launch all agents in this sequence in parallel
  const phaseResults = await Promise.all(
    sequenceDelegations.map(delegation =>
      Task(delegation.agent, {
        workflowId: executionContext.workflowId,
        currentPhase: `sequence-${sequence}`,
        discoveredData: {
          ...executionContext.discoveredData,
          ...delegation.context  // Merge delegation context
        },
        metadata: executionContext.metadata
      })
    )
  );

  // Process results from this phase
  for (let i = 0; i < phaseResults.length; i++) {
    const result = phaseResults[i];
    const delegation = sequenceDelegations[i];

    // Store result
    executionContext.agentResults[`${delegation.agent}-${i}`] = result;

    // Merge discovered data
    if (result.data) {
      Object.assign(executionContext.discoveredData, {
        [result.storeAs]: result.data
      });
    }

    // Extract sub-delegations for next phase (if any)
    if (result.delegations && result.delegations.length > 0) {
      // Add to delegations for next phase
      for (const subDelegation of result.delegations) {
        subDelegation.sequence = sequence + 1;  // Next sequence
        delegations.push(subDelegation);
      }

      // Re-group delegations (now includes sub-delegations)
      // This happens automatically in next iteration
    }
  }
}

console.log("\n✅ All phases complete!");
```

### Step 4: Return Final Results

```typescript
return {
  status: "success",
  result: executionContext,
  workflow: data.workflowId,
  phasesExecuted: sortedSequences.length,
  summary: `Workflow ${data.workflowId} completed successfully`
};
```

---

## Complete Implementation Example

```typescript
async function executeWorkflow(workflowName, params) {
  console.log(`\n🚀 Starting workflow: ${workflowName}`);
  console.log(`📝 Parameters: ${JSON.stringify(params)}`);

  // Step 1: Call orchestrate command
  const orchestrationPlan = await Task("orchestrate", {
    workflow: workflowName,
    params: params
  });

  if (orchestrationPlan.status !== "success") {
    console.error("❌ Orchestration failed:", orchestrationPlan);
    return { status: "error", error: orchestrationPlan };
  }

  console.log(`\n📋 Orchestration plan created`);
  console.log(`   - Phases completed: ${orchestrationPlan.data.phasesCompleted}`);
  console.log(`   - Delegations to execute: ${orchestrationPlan.delegations.length}`);

  // Step 2: Initialize execution context
  const executionContext = {
    workflowId: orchestrationPlan.data.workflowId,
    discoveredData: { ...orchestrationPlan.data.discoveredData },
    agentResults: {},
    metadata: {
      workflow: workflowName,
      parameters: params,
      startedAt: new Date().toISOString()
    }
  };

  // Step 3: Build delegation queue with dynamic updates
  let allDelegations = [...orchestrationPlan.delegations];
  let delegationIndex = 0;
  let allResults = [];

  // Step 4: Execute delegations by sequence
  while (delegationIndex < allDelegations.length) {
    // Get current batch of delegations (all with same sequence)
    const currentSequence = allDelegations[delegationIndex].sequence;
    const currentBatch = [];

    while (
      delegationIndex < allDelegations.length &&
      allDelegations[delegationIndex].sequence === currentSequence
    ) {
      currentBatch.push(allDelegations[delegationIndex]);
      delegationIndex++;
    }

    console.log(`\n${currentBatch.length} agents parallel execution (Sequence ${currentSequence})`);

    // Execute batch in parallel
    const batchResults = await Promise.all(
      currentBatch.map((delegation, index) => {
        console.log(`  → Launching ${delegation.agent} (${index + 1}/${currentBatch.length})`);

        return Task(delegation.agent, {
          workflowId: executionContext.workflowId,
          currentPhase: `seq-${currentSequence}`,
          discoveredData: {
            ...executionContext.discoveredData,
            ...delegation.context
          },
          metadata: executionContext.metadata
        }).catch(error => ({
          status: "error",
          agent: delegation.agent,
          error: error.message
        }));
      })
    );

    // Process batch results
    for (let i = 0; i < batchResults.length; i++) {
      const result = batchResults[i];
      const delegation = currentBatch[i];

      if (result.status === "error") {
        console.error(`  ✗ ${delegation.agent} failed:`, result.error);
        // Handle error based on policy
      } else {
        console.log(`  ✓ ${delegation.agent} completed`);

        // Store result
        allResults.push({
          agent: delegation.agent,
          result: result
        });

        // Merge discovered data
        if (result.data) {
          executionContext.discoveredData[result.storeAs] = result.data;
        }

        // Add sub-delegations to queue (if any)
        if (result.delegations && result.delegations.length > 0) {
          console.log(`    └─ ${result.delegations.length} sub-delegations returned`);

          for (const subDelegation of result.delegations) {
            subDelegation.sequence = currentSequence + 1;
            allDelegations.push(subDelegation);
          }
        }
      }
    }
  }

  console.log(`\n✅ Workflow ${workflowName} completed successfully!`);
  console.log(`   - Total agents executed: ${allResults.length}`);
  console.log(`   - Phases: 1 orchestration + ${Math.max(...allDelegations.map(d => d.sequence || 0))} agent phases`);

  return {
    status: "success",
    workflowId: executionContext.workflowId,
    results: allResults,
    context: executionContext
  };
}
```

---

## Key Responsibilities of Main Orchestrator

### 1. Group Delegations by Sequence

```typescript
// Group all delegations by their sequence number
const bySequence = delegations.reduce((acc, d) => {
  const seq = d.sequence || 1;
  if (!acc[seq]) acc[seq] = [];
  acc[seq].push(d);
  return acc;
}, {});
```

**Why**: Ensures phases execute in correct order while maximizing parallelization within each phase.

### 2. Execute Sequence Phases in Series

```typescript
for (const sequence of sortedSequences) {
  // Execute all delegations in this sequence in parallel
  const results = await Promise.all(...);
}
```

**Why**: Ensures proper phase ordering. Phase 2 must complete before Phase 3 starts.

### 3. Parallelize Within Sequences

```typescript
// All delegations with same sequence number run in parallel
await Promise.all(
  delegations.map(d => Task(d.agent, { ...d.context }))
);
```

**Why**: Maximizes throughput. Multiple components can build simultaneously.

### 4. Merge Discovered Data

```typescript
// Merge agent results into context
for (const result of results) {
  executionContext.discoveredData[result.storeAs] = result.data;
}
```

**Why**: Makes data available to subsequent agents in next phase.

### 5. Extract and Queue Sub-Delegations

```typescript
// Agents may return sub-delegations
for (const result of results) {
  if (result.delegations && result.delegations.length > 0) {
    // Add to queue for next phase
    for (const subDel of result.delegations) {
      subDel.sequence = currentSequence + 1;
      allDelegations.push(subDel);
    }
  }
}
```

**Why**: Allows agents to return what comes next (storybook, tests, etc.) without executing them.

---

## Error Handling Strategy

### Per-Agent Errors

```typescript
Task(agent, context)
  .then(result => handleSuccess(result))
  .catch(error => handleAgentError(agent, error));

function handleAgentError(agent, error) {
  console.error(`${agent} failed:`, error);
  // Options:
  // 1. Skip this agent, continue with others in phase
  // 2. Retry the agent
  // 3. Halt entire workflow
  // Decision depends on workflow requirements
}
```

### Phase Errors

```typescript
// If ANY agent in phase fails
const phaseResults = await Promise.allSettled(
  delegations.map(d => Task(d.agent, d.context))
);

// Check for failures
const failures = phaseResults.filter(r => r.status === "rejected");
if (failures.length > 0) {
  // Handle phase failure based on error policy
}
```

### Graceful Degradation

```typescript
// Option: Continue with partial results
const successfulResults = phaseResults
  .filter(r => r.status === "fulfilled")
  .map(r => r.value);

if (successfulResults.length > 0) {
  // Merge successful results and continue
  // Mark failed agents in context for later reference
}
```

---

## Explicit Agent Tool Calls

When main orchestrator calls agents, use EXPLICIT format:

```typescript
// ✅ EXPLICIT - Clear what agent is being called
await Task(
  "figma-design-analyzer",  // Agent name (explicit)
  {
    workflowId: "wf-abc123",
    currentPhase: "seq-2",
    discoveredData: {
      figmaUrls: ["https://figma.com/...?node-id=123"],
      linearIssue: { id: "ENG-123" }
    },
    metadata: {
      workflow: "linear-to-implementation",
      parameters: { ticketId: "ENG-123" }
    }
  }
);

// ❌ AMBIGUOUS - Unclear what's being called
await delegateAgent(delegation.agent, delegation.context);
```

**Why**: Explicit calls remove ambiguity about which agent is being invoked and what context it receives.

---

## Context Merging Strategy

### Before Passing to Agent

```typescript
const agentContext = {
  workflowId: executionContext.workflowId,
  currentPhase: `seq-${sequence}`,
  discoveredData: {
    // Include ALL discovered data so far
    ...executionContext.discoveredData,
    // Plus delegation-specific context
    ...delegation.context
  },
  metadata: executionContext.metadata
};
```

**Principle**: Each agent receives complete context (all previous results) plus task-specific context.

### Merging Results Back

```typescript
// After agent completes
const result = await Task(agent, agentContext);

// Merge discovered data
executionContext.discoveredData[result.storeAs] = result.data;

// Store agent result for reference
executionContext.agentResults[`${agent}-${index}`] = result;
```

**Principle**: Aggregate results efficiently, making them available to next phase agents.

---

## Performance Optimization Notes

### 1. Minimize Context Size Per Delegation

```typescript
// ❌ WASTEFUL - Pass everything
delegation.context = { ...executionContext.discoveredData };

// ✅ EFFICIENT - Pass only what agent needs
delegation.context = {
  figmaUrls: executionContext.discoveredData.figmaUrls,
  linearIssue: executionContext.discoveredData.linearIssue
};
```

### 2. Batch Parallel Execution

```typescript
// ✅ GOOD - Execute all sequence 2 agents together
const phase2Results = await Promise.all([
  Task("figma-analyzer", {...}),
  Task("figma-analyzer", {...})
]);

// ❌ INEFFICIENT - Execute sequentially
await Task("figma-analyzer", {...});
await Task("figma-analyzer", {...});
```

### 3. Reuse Loaded Agent Specs

```typescript
// All figma-analyzer calls reuse same spec (~800 tokens)
// Only context differs (~1,500 tokens per call)
// Total: 800 + (1,500 × N) instead of (2,300 × N)
```

---

## Summary: Main Orchestrator Flow

```
1. Receive orchestration plan from /orchestrate command
   ↓
2. Extract delegations and group by sequence
   ↓
3. For each sequence (1, 2, 3, ...):
   ├─ Launch all same-sequence agents in parallel
   ├─ Wait for all to complete
   ├─ Collect results and merge into context
   ├─ Extract sub-delegations (if any)
   └─ Add sub-delegations to next sequence
   ↓
4. Return aggregated final results
```

---

## Example Execution Trace

```
Workflow: linear-to-implementation, Ticket: ENG-123

/orchestrate command
  ├─ Phase: discover
  │  ├─ Task: fetch_linear → ENG-123 fetched
  │  └─ Task: analyze → 2 Figma URLs found
  └─ Returns: 4 delegations

Main orchestrator
  ├─ Sequence 2: Launch 2 × figma-design-analyzer (parallel)
  │  ├─ Agent 1: URL 1 → Spec 1 + delegations for storybook, tester
  │  └─ Agent 2: URL 2 → Spec 2 + delegations for storybook, tester
  │
  ├─ Sequence 3: Launch 2 × senior-frontend-engineer (parallel)
  │  ├─ Agent 1: Spec 1 → Component 1 + delegations for stories, tests
  │  └─ Agent 2: Spec 2 → Component 2 + delegations for stories, tests
  │
  ├─ Sequence 4: Launch 6 × testing agents (parallel)
  │  ├─ Agent 1: storybook-expert (Component 1)
  │  ├─ Agent 2: storybook-expert (Component 2)
  │  ├─ Agent 3: react-component-tester (Component 1)
  │  ├─ Agent 4: react-component-tester (Component 2)
  │  ├─ Agent 5: playwright-dev-tester (Component 1 + Figma specs)
  │  └─ Agent 6: playwright-dev-tester (Component 2 + Figma specs)
  │
  └─ ✅ Workflow complete

Total token usage: ~7,500 (instead of ~20,000 with nested delegation)
Execution time: ~30 seconds (instead of ~60 seconds with sequential)
```

---

## Checklist for Main Orchestrator Implementation

- [ ] Receives delegation plan from /orchestrate command
- [ ] Groups delegations by sequence number
- [ ] Executes sequences in order (serial phases)
- [ ] Executes delegations within sequence in parallel
- [ ] Merges discovered data after each phase
- [ ] Extracts sub-delegations from agent results
- [ ] Queues sub-delegations for next sequence
- [ ] Handles agent errors gracefully
- [ ] Returns aggregated final results
- [ ] Uses explicit Task() calls with clear agent names
- [ ] Passes minimal context to each agent
- [ ] Logs execution progress for debugging
