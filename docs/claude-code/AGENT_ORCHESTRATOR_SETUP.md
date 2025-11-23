# Agent Orchestrator Setup Guide

This guide explains how the agent orchestrator system is configured and working in this project.

## What Was Fixed

The agent orchestrator hook implementation now addresses the two key gaps identified:

### 1. Agent-Based Orchestration (Not MCP Tool-Based)

**Before**: The orchestrator tracked MCP tool usage (figma, playwright, test tools)
**After**: The orchestrator now tracks AGENT execution (senior-frontend-engineer, react-component-tester, etc.)

**Key Changes in `.claude/hooks/agent-orchestrator.ts`**:
- `analyzeTranscript()` now extracts `agentsRun` instead of `toolsUsed`
- Looks for Task tool calls that launch agents
- Tracks which agents have been executed in the session
- Routes based on agent execution history, not tool usage

### 2. Project Configuration Registration

**Before**: Hook was created but not registered in project configuration
**After**: Hook is now registered in `.claude/claude.json`

**Created `.claude/claude.json`**:
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

## How It Works

### Workflow Example

```
1. User asks: "Create a Button component from Figma"
   ↓
2. Claude Code launches: senior-frontend-engineer agent
   - Agent extracts design specs
   - Agent generates React code
   - Agent completes
   ↓
3. SubagentStop hook is triggered
   ↓
4. Hook reads session transcript and analyzes:
   - Which agents have run? ["senior-frontend-engineer"]
   - Are there errors? No
   - What is the task context? "component", "button", etc.
   ↓
5. Hook makes routing decision:
   - "senior-frontend-engineer ran but react-component-tester didn't"
   - "Context mentions 'component'"
   - Decision: Route to react-component-tester
   ↓
6. Hook signals Claude Code to launch: react-component-tester agent
   - With instructions: "Now write comprehensive tests..."
   ↓
7. Process repeats until no more agents need to run
```

## Agent Routing Rules

The orchestrator implements these routing patterns:

### Pattern 1a: Component Creation → Storybook (Design System Path)
- **Trigger**: `senior-frontend-engineer` has run, `storybook-expert` hasn't
- **Context Requirements**: Mentions "design system", "component library", "storybook", "ui kit", or "system"
- **Routes To**: `storybook-expert`
- **Instructions**: Create Storybook stories with CSF3 format, args, controls, and play functions
- **Use Case**: Building a design system or shared component library that needs documentation first

### Pattern 1b: Component Creation → Testing (Component Testing Path)
- **Trigger**: `senior-frontend-engineer` has run, `react-component-tester` and `storybook-expert` haven't
- **Context Requirements**: Mentions "component", "react", "button", "card", "modal", or "form"
- **Routes To**: `react-component-tester`
- **Instructions**: Write comprehensive tests using Vitest + React Testing Library
- **Use Case**: Building individual components that need unit tests first

### Pattern 2: Unit Testing → Storybook (Stories After Tests)
- **Trigger**: `react-component-tester` has run, `storybook-expert` hasn't
- **Context Requirements**: Mentions "design system", "component library", "storybook", "ui kit", or "system"
- **Routes To**: `storybook-expert`
- **Instructions**: Create Storybook stories documenting the component
- **Use Case**: After unit tests are complete, document component for design system

### Pattern 3: Unit Testing → Browser Testing (E2E Path)
- **Trigger**: `react-component-tester` has run, `playwright-dev-tester` hasn't
- **Context Requirements**: Mentions "test", "vitest", "testing library", "playwright", or "e2e"
- **Routes To**: `playwright-dev-tester`
- **Instructions**: Create browser-based tests using Playwright
- **Use Case**: After unit tests, run E2E tests in a real browser

### Pattern 4: Storybook → Browser Testing (E2E After Documentation)
- **Trigger**: `storybook-expert` has run, `playwright-dev-tester` hasn't
- **Context Requirements**: Mentions "playwright", "browser", "e2e", "visual testing", or "integration test"
- **Routes To**: `playwright-dev-tester`
- **Instructions**: Create browser-based tests using Playwright
- **Use Case**: After Storybook documentation, run E2E tests

### Error Handling
- **Trigger**: Any errors detected during agent execution
- **Action**: Block completion and require the current agent to fix issues
- **Return**: `{ "decision": "block", "reason": "..." }`

## Files Modified/Created

### Created
- **`.claude/claude.json`** - Project configuration with hook registration
- **`docs/claude-code/AGENT_ORCHESTRATOR_SETUP.md`** - This file

### Modified
- **`.claude/hooks/agent-orchestrator.ts`** - Updated to track agent execution instead of MCP tools
  - `analyzeTranscript()` now extracts `agentsRun` (agent execution history)
  - `determineNextAgent()` now routes based on agent execution patterns
  - Added `contextMentions()` helper function for flexible keyword matching

- **`docs/claude-code/AGENT_ORCHESTRATOR_HOOK.md`** - Updated documentation
  - Hook Configuration section now shows claude.json setup
  - Routing Rules updated to be agent-based
  - Example Workflow updated to show agent-to-agent routing
  - Transcript Analysis explains agent detection mechanism

## Agent Detection Mechanism

The orchestrator identifies agents by searching the session transcript for Task tool usage:

```typescript
// When a Task tool is used with these subagent_types:
if (entry.type === 'tool_use' && entry.tool_name === 'Task') {
  if (result.includes('senior-frontend-engineer')) {
    agentsRun.push('senior-frontend-engineer');
  } else if (result.includes('react-component-tester')) {
    agentsRun.push('react-component-tester');
  }
  // ... etc for other agents
}
```

The following agents are recognized:
- `senior-frontend-engineer` - React/TypeScript component development
- `react-component-tester` - Vitest + React Testing Library tests
- `playwright-dev-tester` - Playwright browser automation tests
- `storybook-expert` - Storybook stories with CSF3 format
- `prd-writer` - Product requirements documentation
- `Explore` - Codebase exploration

## Testing the Hook

To test the orchestrator hook directly:

```bash
# Simulate a hook call with a test transcript
npx ts-node .claude/hooks/agent-orchestrator.ts \
  '{"session_id":"test","transcript_path":"/path/to/session.jsonl","stop_hook_active":false}'
```

The hook outputs JSON with routing decisions:

```json
{
  "decision": undefined,
  "nextAgent": "react-component-tester",
  "nextAgentInstructions": "The React component has been created...",
  "shouldContinue": false
}
```

## Integration with Claude Code

Claude Code automatically:
1. Reads `.claude/claude.json` on startup
2. Registers the SubagentStop hook
3. Triggers the hook when any subagent completes
4. Parses the hook's JSON output to determine next steps
5. Launches the recommended next agent if `nextAgent` is specified

This seamless integration enables multi-agent workflows where each agent:
- Completes its specific task
- Hands off to the next agent in the workflow
- Maintains context across the entire session
- Builds on work from previous agents

## See Also

- [Agent Orchestrator Hook Documentation](./AGENT_ORCHESTRATOR_HOOK.md) - Complete technical reference
- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks) - Official Claude Code hooks guide
