# Agent Workflow Orchestration Guide

This document defines the standard workflows for coordinating multiple agents to complete complex tasks efficiently.

## Core Principle: Parallel Execution

**When agents have no dependencies between them, launch them IN PARALLEL using a single message with multiple Task tool calls.**

This maximizes efficiency and reduces overall execution time.

## Standard Workflows

### 1. Linear Ticket → Complete Implementation

**Command**: `/implement-linear <ticket-id>`

**Steps**:
```
1. [Sequential] Fetch Linear ticket
2. [Sequential] Create PRD (prd-writer agent)
3. [Parallel] Extract Figma designs (figma-design-analyzer agents) - if Figma URLs present
4. [Sequential] Implementation (senior-frontend-engineer agent)
   └─ [Parallel - Auto] storybook-expert + react-component-tester agents
5. [Sequential] Verification (type-check, tests)
6. [Sequential] Update Linear ticket
```

**Key Points**:
- Steps 1, 2, 4, 5, 6 are sequential (must wait for previous)
- Step 3 (Figma analyses) runs in parallel if multiple URLs
- Step 4 auto-triggers parallel testing agents

### 2. Figma Design → Implementation

**Command**: `/implement-design <figma-urls>`

**Steps**:
```
1. [Parallel] Extract designs (figma-design-analyzer agents for each URL)
2. [Sequential/Parallel] Implementation
   a. Single component: One senior-frontend-engineer agent
   b. Multiple components: Multiple senior-frontend-engineer agents in parallel
   └─ [Parallel - Auto] Each engineer spawns storybook-expert + react-component-tester
3. [Sequential] Verification (type-check, tests, storybook)
```

**Key Points**:
- All Figma analyses can run concurrently
- Independent components can be built concurrently
- Each implementation auto-triggers parallel testing agents

### 3. PRD Only

**Command**: `/prd <requirements>`

**Steps**:
```
1. [Sequential] Create PRD (prd-writer agent)
2. [Recommendation] Suggest next steps based on PRD content
```

**Next Steps Recommendations**:
- If Figma URLs found → suggest `/implement-design`
- If Linear ticket context → suggest updating ticket
- If implementation needed → suggest using `senior-frontend-engineer` agent

### 4. Component Implementation (Manual Orchestration)

When manually coordinating without slash commands:

**Single Component**:
```
1. [Sequential] Implement (senior-frontend-engineer agent)
   └─ [Parallel - Auto] storybook-expert + react-component-tester agents
2. [Sequential] Verify
```

**Multiple Independent Components**:
```
1. [Parallel] Implement all components
   - One senior-frontend-engineer agent per component
   - Launch ALL engineers in single message with multiple Task calls
   - Each engineer auto-triggers storybook-expert + react-component-tester
2. [Sequential] Verify all implementations
```

## Agent Delegation Rules

### senior-frontend-engineer Agent

**MANDATORY**: After implementing or modifying any component, the senior-frontend-engineer agent MUST delegate to:
1. `storybook-expert` agent (for UI components)
2. `react-component-tester` agent (for ALL components)

**How**: Launch BOTH agents in PARALLEL using a single message with multiple Task tool calls.

**Example** (what the senior-frontend-engineer should do):
```
After implementing Button component, I'm delegating to testing agents in parallel
by sending a single message with two Task tool calls - one for storybook-expert
and one for react-component-tester.
```

### figma-design-analyzer Agent

**NEVER** implement code directly. Always recommend delegation to `senior-frontend-engineer` with the extracted specifications.

### prd-writer Agent

**NEVER** implement code directly. Always recommend next steps and appropriate agents to use.

## Parallel Execution Syntax

To launch multiple agents in parallel, send a **single message** with **multiple Task tool calls**:

```
I'm launching two agents in parallel:
1. figma-design-analyzer for node 2171:13039
2. figma-design-analyzer for node 2171:14000

[Multiple Task tool calls in one message]
```

## Sequential Execution

When one step depends on another, wait for completion before proceeding:

```
Step 1: Create PRD
[Launch prd-writer agent]
[Wait for completion]

Step 2: Extract design based on Figma URL found in PRD
[Launch figma-design-analyzer agent]
[Wait for completion]

Step 3: Implement based on design specs
[Launch senior-frontend-engineer agent with design specs]
```

## Anti-Patterns to Avoid

❌ **DON'T**: Implement code manually when agents should be delegated to
❌ **DON'T**: Launch parallel-capable agents sequentially (wastes time)
❌ **DON'T**: Skip test/story creation for components
❌ **DON'T**: Wait for test agents to complete before continuing workflow
❌ **DON'T**: Forget to pass context from one agent to the next

✅ **DO**: Delegate to appropriate specialized agents
✅ **DO**: Launch independent agents in parallel
✅ **DO**: Always create tests and stories for components
✅ **DO**: Continue workflow after delegating to test agents
✅ **DO**: Provide complete context to downstream agents

## Testing Requirements

### For ALL Components:
1. **Storybook stories** (via storybook-expert) - For UI components
2. **Vitest tests** (via react-component-tester) - For ALL components

### Triggering Tests:
- Senior frontend engineer auto-triggers these agents
- Both agents run in parallel
- Do NOT wait for completion - continue with workflow

### Verification:
- After all implementation complete, run:
  - `npm run type-check`
  - `npm run test:run`
  - `npm run storybook` (verify stories render)

## Quick Reference

| Task Type | Primary Agent | Auto-Delegates To | Parallel? |
|-----------|---------------|-------------------|-----------|
| Linear ticket → impl | prd-writer → senior-frontend-engineer | storybook-expert + react-component-tester | Partial |
| Figma → impl | figma-design-analyzer → senior-frontend-engineer | storybook-expert + react-component-tester | Yes |
| PRD only | prd-writer | N/A | N/A |
| Component impl | senior-frontend-engineer | storybook-expert + react-component-tester | Yes (for tests) |
| Multiple Figma URLs | Multiple figma-design-analyzer | N/A | Yes |
| Multiple components | Multiple senior-frontend-engineer | Each: storybook-expert + react-component-tester | Yes |
| E2E testing | playwright-dev-tester | N/A | After impl |

## Slash Commands Summary

- `/implement-linear <ticket-id>` - Complete Linear ticket workflow
- `/implement-design <figma-urls>` - Figma design to implementation
- `/prd <requirements>` - Create PRD only

Use these commands to ensure proper agent orchestration!
