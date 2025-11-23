# Agent Orchestrator Hook

Intelligent agent routing using Claude Code's SubagentStop hook to automatically determine which agent should run next based on task completion and context.

## Overview

The Agent Orchestrator Hook uses Claude Code's **SubagentStop** hook to:

1. **Monitor agent completion** - Detect when a subagent finishes
2. **Analyze context** - Parse transcript to understand what was done
3. **Route intelligently** - Determine which agent should run next
4. **Prevent infinite loops** - Stop hook chains when appropriate

## How It Works

```
Agent 1 (e.g., senior-frontend-engineer)
    ↓
    Completes task
    ↓
SubagentStop Hook Triggered
    ↓
Orchestrator reads session transcript
    ↓
Analyzes: Agents executed, Errors, Task context
    ↓
Decides: Next agent to run based on workflow
    ↓
Agent 2 (e.g., react-component-tester)
    ↓
    Starts with orchestrator's instructions
```

## Hook Configuration

The hook is configured in `.claude/claude.json`:

```json
{
  "name": "demo-claude-code",
  "description": "Claude Code project with MCP server wrappers and intelligent agent orchestration",
  "hooks": [
    {
      "event": "SubagentStop",
      "command": "npx ts-node .claude/hooks/agent-orchestrator.ts"
    }
  ]
}
```

This configuration is **automatically loaded** when Claude Code starts in this project.

## Routing Rules

The orchestrator routes to the next agent(s) based on agent execution history and context.

### Pattern 1-Parallel: senior-frontend-engineer → react-component-tester + storybook-expert (PARALLEL)
**Condition**:
- `senior-frontend-engineer` has completed
- `react-component-tester` has NOT run yet
- `storybook-expert` has NOT run yet
- Context mentions BOTH: ("test", "unit", "vitest", "testing library", OR "spec") AND ("design system", "component library", "storybook", "story", "ui kit", OR "system")

**Routes to**: Both agents in parallel
- `react-component-tester` - "Write comprehensive tests using Vitest + React Testing Library..."
- `storybook-expert` - "Create Storybook stories with CSF3 format, args, controls, and play functions..."

**Use Case**: When you need BOTH unit tests AND design system documentation. Both agents start simultaneously and work in parallel.

**Important**: Parallel execution requires Claude Code to support multiple concurrent subagents. When both agents complete (in any order), subsequent routing rules apply based on what both have done.

---

### Pattern 1a: senior-frontend-engineer → storybook-expert
**Condition**:
- `senior-frontend-engineer` has completed
- `storybook-expert` has NOT run yet
- Context mentions: design system, component library, storybook, story, ui kit, system

**Routes to**: `storybook-expert`

**Instructions**: "The React component has been created. Now create Storybook stories with CSF3 format, args, controls, and play functions. Include all component variants and interactive states."

**Use Case**: When building a design system or component library that needs documentation.

### Pattern 1b: senior-frontend-engineer → react-component-tester
**Condition**:
- `senior-frontend-engineer` has completed
- `react-component-tester` has NOT run yet
- `storybook-expert` has NOT run yet
- Context mentions: component, react, button, card, modal, form

**Routes to**: `react-component-tester`

**Instructions**: "The React component has been created. Now write comprehensive tests using Vitest + React Testing Library. Focus on user interactions, edge cases, and accessibility."

**Use Case**: When building individual components that need unit tests (default path).

### Pattern 2: react-component-tester → storybook-expert
**Condition**:
- `react-component-tester` has completed
- `storybook-expert` has NOT run yet
- Context mentions: design system, component library, storybook, story, ui kit, system

**Routes to**: `storybook-expert`

**Instructions**: "Unit tests are complete. Now create Storybook stories for this component with CSF3 format, args, controls, and play functions. Include all component variants and interactive states."

**Use Case**: When tests are done and you want to document the component for a design system.

### Pattern 3: react-component-tester → playwright-dev-tester
**Condition**:
- `react-component-tester` has completed
- `playwright-dev-tester` has NOT run yet
- Context mentions: test, vitest, testing library, playwright, e2e

**Routes to**: `playwright-dev-tester`

**Instructions**: "Unit tests are complete. Now create browser-based tests using Playwright to verify visual rendering, user interactions, and end-to-end workflows."

**Use Case**: When unit tests are done and you need browser-based E2E testing.

### Pattern 4: storybook-expert → playwright-dev-tester
**Condition**:
- `storybook-expert` has completed
- `playwright-dev-tester` has NOT run yet
- Context mentions: playwright, browser, e2e, visual testing, integration test

**Routes to**: `playwright-dev-tester`

**Instructions**: "Storybook stories are complete. Now create browser-based tests using Playwright to verify visual rendering and user interactions."

**Use Case**: When Storybook stories are done and you need browser-based testing.

### Errors Detected
**Condition**: Any errors encountered during agent execution

**Action**: Blocks completion, requires current agent to fix issues

**Decision**: `{ "decision": "block", "reason": "..." }`

## Example Workflows

### Scenario 1: Design System Component (Design → Stories → Tests)

```
1. User: "Create a Button component for our design system"
   ↓
2. senior-frontend-engineer agent is launched
   - Extracts design specifications from Figma
   - Generates React component code
   - Creates TypeScript types
   - Completes with success

   SubagentStop hook triggered
   ↓
3. Hook analyzes session transcript:
   - Agent executed: "senior-frontend-engineer" ✓
   - Agent executed: "storybook-expert" ✗
   - Context mentions: "design system" ✓
   - No errors detected ✓

   Decision: Route to storybook-expert (Pattern 1a)
   ↓
4. storybook-expert agent is launched with instructions:
   "The React component has been created. Now create Storybook stories..."
   - Creates CSF3 format stories
   - Adds args and controls for interactivity
   - Documents all component variants
   - Completes with success

   SubagentStop hook triggered
   ↓
5. Hook analyzes transcript:
   - Agent executed: "senior-frontend-engineer" ✓
   - Agent executed: "storybook-expert" ✓
   - Agent executed: "playwright-dev-tester" ✗
   - No matching routing rules (Storybook complete, no e2e mention)

   Decision: Allow normal completion
   ↓
6. User has: Component Code → Storybook Stories (ready for design system)
```

### Scenario 2: Full Component with All Tests (Design → Tests → Stories → E2E)

```
1. User: "Create a Button component with complete test coverage and documentation"
   ↓
2. senior-frontend-engineer agent is launched
   - Creates component from Figma design
   - Completes with success

   SubagentStop hook triggered
   ↓
3. Hook analyzes and routes to react-component-tester (Pattern 1b)
   - Context mentions "component" but not "design system"
   ↓
4. react-component-tester agent is launched
   - Writes comprehensive Vitest tests
   - Tests user interactions and accessibility
   - Completes with success

   SubagentStop hook triggered
   ↓
5. Hook analyzes and routes to storybook-expert (Pattern 2)
   - Context mentions "design system" + tests are done
   ↓
6. storybook-expert agent is launched
   - Creates Storybook stories with CSF3
   - Adds interactive controls
   - Completes with success

   SubagentStop hook triggered
   ↓
7. Hook analyzes and routes to playwright-dev-tester (Pattern 4)
   - Context mentions "playwright" or "e2e"
   ↓
8. playwright-dev-tester agent is launched
   - Creates Playwright E2E tests
   - Verifies visual rendering
   - Tests complete workflows
   - Completes with success

   SubagentStop hook triggered
   ↓
9. No more routing rules match

   Decision: Allow normal completion
   ↓
10. User has: Component Code → Unit Tests → Storybook → E2E Tests
```

### Scenario 3: Parallel Tests + Storybook (Design → [Tests | Stories] → E2E)

```
1. User: "Create a Button component for our design system with tests and documentation"
   ↓
2. senior-frontend-engineer agent creates component
   SubagentStop hook triggered
   ↓
3. Hook analyzes:
   - Agent executed: "senior-frontend-engineer" ✓
   - Context mentions: "design system" AND "tests" ✓
   - Context mentions: "test", "unit", "vitest" AND "design system", "button" ✓
   ↓
4. PARALLEL EXECUTION DETECTED
   Hook returns: parallelAgents = [react-component-tester, storybook-expert]
   ↓
5. BOTH AGENTS RUN IN PARALLEL:

   Task 1: react-component-tester
   - Writes Vitest tests
   - Tests user interactions
   - Finishes first (no Playwright mention)

   Task 2: storybook-expert
   - Creates Storybook stories
   - Adds CSF3 format stories
   - Finishes second

   Both finish → SubagentStop hook triggered (both agents complete)
   ↓
6. Hook analyzes final transcript:
   - Agent executed: "senior-frontend-engineer" ✓
   - Agent executed: "react-component-tester" ✓
   - Agent executed: "storybook-expert" ✓
   - Context mentions: "playwright" or "e2e" ✗
   - No more matching patterns
   ↓
7. Decision: Allow normal completion
   ↓
8. User has: Component Code + Unit Tests + Storybook Stories (all built in parallel)
```

### Scenario 4: Simple Component Testing (Design → Tests → E2E)

```
1. User: "Create a Form component and test it"
   ↓
2. senior-frontend-engineer agent creates component
   → SubagentStop hook routes to react-component-tester (Pattern 1b)
   ↓
3. react-component-tester writes unit tests
   → SubagentStop hook routes to playwright-dev-tester (Pattern 3)
   ↓
4. playwright-dev-tester creates E2E tests
   → SubagentStop hook finds no more matching routes

   Decision: Allow normal completion
   ↓
5. User has: Component Code → Unit Tests → E2E Tests
```

## Transcript Analysis

The hook reads the session transcript (JSONL format) and extracts:

```typescript
{
  lastAssistantMessage: string;  // Last response from current agent
  agentsRun: string[];            // All agents executed (senior-frontend-engineer, react-component-tester, etc)
  errors: string[];               // Any errors encountered
  tasksCompleted: string[];       // Tasks marked complete
  currentContext: string;         // Full conversation context and task description
}
```

The hook specifically looks for Task tool calls where agents were launched:
- `senior-frontend-engineer` - Component creation from design
- `react-component-tester` - Component unit testing
- `playwright-dev-tester` - Browser-based E2E testing
- `storybook-expert` - Design system documentation
- `prd-writer` - Product requirements documentation
- `Explore` - Codebase exploration agent

## Parallel vs Sequential Execution

The orchestrator supports **both parallel and sequential** agent execution:

### Sequential Execution (Default)
Most workflows use sequential execution where agents run one after another:

```json
{
  "decision": undefined,
  "nextAgent": "react-component-tester",
  "nextAgentInstructions": "...",
  "shouldContinue": false
}
```

**When to use**:
- Each agent builds on previous agent's work
- Agent dependencies exist (tests need implementation first)
- Workflows are: Design → Code → Tests → E2E → Docs

### Parallel Execution (Pattern 1-Parallel Only)
When BOTH tests and storybook documentation are needed from the start:

```json
{
  "decision": undefined,
  "parallelAgents": [
    {
      "agent": "react-component-tester",
      "instructions": "Write comprehensive tests..."
    },
    {
      "agent": "storybook-expert",
      "instructions": "Create Storybook stories..."
    }
  ],
  "shouldContinue": false
}
```

**When to use**:
- Both unit tests AND storybook stories are needed
- Agents work independently (tests don't depend on stories, vice versa)
- Faster completion when both are needed
- Requires Claude Code to support concurrent subagents

**How it works**:
1. Hook detects both test and storybook keywords in context
2. Returns `parallelAgents` array instead of `nextAgent`
3. Claude Code launches both agents simultaneously
4. Both agents run independently in parallel
5. When both complete, subsequent routing rules apply

**Important Note**: Parallel execution requires Claude Code 1.2+ with concurrent subagent support. The hook prepares the decision, but Claude Code handles the actual parallel execution. If Claude Code doesn't support parallel subagents, it will execute them sequentially.

## Decision Output

The hook returns:

```typescript
{
  // Block completion to force current agent to continue
  decision?: 'block',
  reason: 'Explanation for blocking',

  // Single next agent (sequential execution)
  nextAgent?: string,

  // Instructions for single next agent
  nextAgentInstructions?: string,

  // Multiple agents to run in parallel (Claude Code 1.2+)
  parallelAgents?: Array<{
    agent: string;           // Agent name (e.g., "react-component-tester")
    instructions: string;    // Instructions for this agent
  }>,

  // Should the agent continue (false = allow completion)
  shouldContinue?: boolean
}
```

**Note**: Use either `nextAgent` (sequential) or `parallelAgents` (parallel), not both.

## Preventing Infinite Loops

The hook checks `stop_hook_active` flag:

```typescript
if (input.stop_hook_active) {
  // Hook already triggered, don't loop
  console.log(JSON.stringify({ decision: undefined }));
}
```

## Extending the Orchestrator

To add new routing rules:

1. **Add condition** in `determineNextAgent()`:
   ```typescript
   if (someCondition) {
     return {
       nextAgent: 'new-agent',
       nextAgentInstructions: 'Do this...',
     };
   }
   ```

2. **Update rules above** to document the new route

3. **Test** the new route:
   ```bash
   npm run test -- orchestrator
   ```

## Current Agents

Agents that work with the orchestrator:

- ✅ `senior-frontend-engineer` - Creates components from design
- ✅ `react-component-tester` - Writes component tests
- ✅ `playwright-dev-tester` - Writes E2E tests
- ✅ `storybook-expert` - Creates Storybook stories
- ✅ Any custom agents you register

## Debugging

### Enable verbose logging:

```typescript
// In agent-orchestrator.ts
console.error('Analysis:', analysis);
console.error('Decision:', decision);
```

### Check transcript manually:

```bash
# Read last session transcript
cat ~/.claude/projects/[project-id]/session.jsonl | tail -50
```

### Test hook directly:

```bash
npx ts-node .claude/hooks/agent-orchestrator.ts '{"session_id":"test","transcript_path":"path/to/session.jsonl","stop_hook_active":false}'
```

## Limitations

- Hook activates only when subagent completes
- Requires subprocess communication (JSON I/O)
- No direct access to agent state (only transcript)
- Cannot directly launch agents (only signal recommendations)
- Must be enabled in editor configuration

## Future Enhancements

- [ ] Machine learning-based routing
- [ ] Context-aware prompt engineering
- [ ] Automatic test coverage analysis
- [ ] Error recovery suggestions
- [ ] Performance metrics tracking
- [ ] User preference learning

## References

- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [SubagentStop Event](https://code.claude.com/docs/en/hooks#subagent-stop)
- [Agent Coordination Patterns](./AGENT_COORDINATION.md)
