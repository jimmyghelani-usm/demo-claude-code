# Parallel Agent Execution Guide

## Overview

The agent orchestrator supports **parallel execution** of agents when both tests and storybook documentation are needed from the same component. This allows faster workflow completion.

## When Does Parallel Execution Trigger?

Parallel execution is triggered automatically when ALL of these conditions are met:

1. **Component just created**: `senior-frontend-engineer` has just completed
2. **No errors**: The agent execution had no errors
3. **Tests needed**: Context mentions test-related keywords:
   - "test" OR "unit" OR "vitest" OR "testing library" OR "spec"
4. **Storybook needed**: Context mentions design system keywords:
   - "design system" OR "component library" OR "storybook" OR "story" OR "ui kit" OR "system"

When all conditions are true, the hook returns `parallelAgents` instead of `nextAgent`.

## Hook Decision Output

### Sequential Execution (Default)
```json
{
  "decision": undefined,
  "nextAgent": "react-component-tester",
  "nextAgentInstructions": "Write comprehensive tests...",
  "shouldContinue": false
}
```

### Parallel Execution (Pattern 1-Parallel)
```json
{
  "decision": undefined,
  "parallelAgents": [
    {
      "agent": "react-component-tester",
      "instructions": "The React component has been created. Now write comprehensive tests using Vitest + React Testing Library..."
    },
    {
      "agent": "storybook-expert",
      "instructions": "The React component has been created. Now create Storybook stories with CSF3 format, args, controls, and play functions..."
    }
  ],
  "shouldContinue": false
}
```

## How Claude Code Handles Parallel Execution

When the hook returns `parallelAgents`:

1. **Claude Code detects** the `parallelAgents` field (vs `nextAgent`)
2. **Launches both agents** simultaneously (requires Claude Code 1.2+)
3. **Both agents run independently** in separate execution contexts
4. **No interaction needed**: Agents don't wait for each other
5. **Independent work**: Tests and stories develop separately without dependencies
6. **Both complete**: When both agents finish, the hook is triggered again
7. **Final routing**: Subsequent routing rules apply based on final state

## Agent Dependency Analysis

### Why Tests and Storybook Can Run in Parallel

| Aspect | react-component-tester | storybook-expert | Can Parallel? |
|---|---|---|---|
| **Depends on implementation** | YES (needs code) | YES (needs code) | ✅ |
| **Depends on each other** | NO | NO | ✅ |
| **Testing** | Tests the code | Documents the code | ✅ |
| **Independent output** | Test files | Story files | ✅ |
| **No shared state** | Isolated tests | Isolated stories | ✅ |

Both agents:
- Work from the same created component
- Produce independent outputs (tests and stories)
- Have no dependencies on each other
- Can start immediately after component creation

### Why Other Agents Can't Run in Parallel

**react-component-tester + playwright-dev-tester**: ❌
- Tests must exist before E2E tests can verify them
- Playwright tests build on unit test insights
- Sequential execution required

**storybook-expert + playwright-dev-tester**: ❌
- E2E tests should verify actual stories work
- Playwright tests need working Storybook setup
- Sequential execution required

## Example: Complete Parallel Workflow

### User Request
```
"Create a Button component for our design system with comprehensive testing"
```

### Hook Analysis
```
Context keywords found:
- "Button" → component mentioned ✓
- "design system" → storybook needed ✓
- "comprehensive testing" → tests needed ✓
- "our" → design system mentioned ✓

Decision: PARALLEL EXECUTION
```

### Hook Decision
```json
{
  "parallelAgents": [
    {
      "agent": "react-component-tester",
      "instructions": "The React component has been created. Now write comprehensive tests using Vitest + React Testing Library. Focus on user interactions, edge cases, and accessibility."
    },
    {
      "agent": "storybook-expert",
      "instructions": "The React component has been created. Now create Storybook stories with CSF3 format, args, controls, and play functions. Include all component variants and interactive states."
    }
  ]
}
```

### Execution Timeline

```
Time: t=0
  ┌─────────────────────────────────────┐
  │ senior-frontend-engineer completes  │
  │ (created Button component)          │
  └─────────────────┬───────────────────┘
                    │
                    ▼ Hook triggered
           ┌────────────────────┐
           │ Parallel execution! │
           └─────────┬──────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
Time: t=1
  ┌──────────────────┐    ┌─────────────────┐
  │ Tester agent     │    │ Storybook agent │
  │ starts writing   │    │ starts creating │
  │ unit tests       │    │ stories         │
  └──────────────────┘    └─────────────────┘
        │                         │
        │ (both working in        │
        │  parallel, ~5-10 min)   │
        │                         │
        ▼                         ▼
Time: t=5-10
  ┌──────────────────┐    ┌─────────────────┐
  │ Tester completes │    │ Storybook       │
  │ (tests done)     │    │ completes       │
  └──────────────────┘    │ (stories done)  │
                          └─────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼ Both complete
           ┌────────────────────────┐
           │ Hook triggered again   │
           │ (both agents done)     │
           └────────────┬───────────┘
                        │
                        ▼
           No more routing rules match
           (no "playwright" or "e2e" mentioned)
                        │
                        ▼
           Workflow complete
           Component + Tests + Stories ready!
```

## Benefits of Parallel Execution

| Aspect | Sequential | Parallel | Improvement |
|---|---|---|---|
| **Time** | ~10-15 min | ~5-10 min | 33-50% faster |
| **Complexity** | Single task | Multiple tasks | ≈ same |
| **Sequencing** | Strict order | Independent work | More flexible |
| **Resource use** | One agent | Two agents | More concurrent |
| **Results quality** | Excellent | Excellent | No difference |

## Technical Implementation

### Detection Logic
```typescript
function canRunInParallel(analysis): boolean {
  // Senior engineer must have just completed
  if (!agentsRun.includes('senior-frontend-engineer')) return false;

  // No errors allowed
  if (errors.length > 0) return false;

  // Both tests AND storybook must be needed
  const needsTests = contextMentions(currentContext,
    ['test', 'unit', 'vitest', 'testing library', 'spec']);
  const needsStorybook = contextMentions(currentContext,
    ['design system', 'component library', 'storybook', 'story', 'ui kit', 'system']);

  return needsTests && needsStorybook;
}
```

### How to Trigger Parallel Execution

Say something like:

**Yes - Triggers Parallel** ✅
- "Create a Button for our design system with tests"
- "Build a Modal component with complete documentation and unit tests"
- "Create form input component, write tests and storybook stories"
- "Design system button - need tests and stories"

**No - Sequential Path** ❌
- "Create a Button component" (no tests or storybook keywords)
- "Create a Button with tests" (no storybook keyword)
- "Create Button for design system" (no tests keyword)
- "Create Modal and test it in browser" (no storybook keyword)

## Limitations and Notes

1. **Claude Code Version**: Requires Claude Code 1.2+ with concurrent subagent support
2. **Agent Independence**: Only tests + storybook can run in parallel (no other combinations)
3. **Hook Version**: This feature is in `.claude/hooks/agent-orchestrator.ts` v2+
4. **Error Handling**: Any errors prevent parallel execution; sequential is used instead
5. **Fallback**: If Claude Code doesn't support parallel agents, it falls back to sequential

## Future Enhancements

Potential expansions to parallel execution:

- [ ] Three-way parallel: tests + storybook + playwright (with proper sequencing)
- [ ] Dynamic agent selection based on more context keywords
- [ ] Weighted routing (prefer certain agents over others)
- [ ] Custom parallel patterns for specific workflows
- [ ] Performance metrics and timing optimization

## See Also

- [Agent Orchestrator Hook](./AGENT_ORCHESTRATOR_HOOK.md) - Complete hook documentation
- [Agent Routing Diagram](./AGENT_ROUTING_DIAGRAM.md) - Visual routing patterns
- [Agent Orchestrator Setup](./AGENT_ORCHESTRATOR_SETUP.md) - Setup and configuration
