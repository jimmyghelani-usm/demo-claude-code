# Agent Orchestrator Routing Diagram

This document visualizes how agents are routed based on execution history and context.

## Agent Routing Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         senior-frontend-engineer                             │
│                  (Creates component from design specs)                       │
└──────────────────────────────┬──────────────────────────────────────────────┘
                               │
                    SubagentStop Hook Triggered
                               │
                ┌──────────────────────────────────┐
                │  Check Context Keywords           │
                └──────────────────────────────────┘
                               │
                 ┌─────────────┴──────────────┐
                 │                            │
     Design System Mentioned?          Regular Component?
            (Pattern 1a)                 (Pattern 1b)
                 │                            │
                 ▼                            ▼
        ┌──────────────────┐        ┌──────────────────────┐
        │storybook-expert  │        │react-component-tester│
        │(Create Stories)  │        │(Write Unit Tests)    │
        └────────┬─────────┘        └──────────┬───────────┘
                 │                             │
          SubagentStop Hook           SubagentStop Hook
                 │                             │
           No Match                  ┌─────────┴─────────┐
           (Stop)                    │                   │
                 │          Storybook Mentioned?    Playwright Mentioned?
                 │          (Pattern 2)              (Pattern 3)
                 │                   │                   │
            Return                   ▼                   ▼
          Component +           ┌────────────┐    ┌──────────────────┐
          Storybook              │storybook-  │    │playwright-dev-   │
                                 │expert      │    │tester            │
                                 │(Docs)      │    │(E2E Tests)       │
                                 └─────┬──────┘    └────────┬─────────┘
                                       │                    │
                                SubagentStop           SubagentStop
                                Hook                   Hook
                                       │                    │
                              ┌────────┴──────────┐         │
                              │                   │         │
                         Playwright            No Match    No Match
                         Mentioned?            (Stop)      (Stop)
                         (Pattern 4)                │          │
                              │            Return          Return
                              ▼            Component +     Component +
                         ┌─────────────┐   Storybook      Tests +
                         │playwright-  │                  Playwright
                         │dev-tester   │
                         │(E2E Tests)  │
                         └─────┬───────┘
                               │
                         SubagentStop
                         Hook
                               │
                         No Match
                         (Stop)
                               │
                         Return
                    Component + Stories +
                         Playwright

```

## Routing Decision Matrix

| Current Agent | Next Agent(s) Possible | Condition(s) | Pattern |
|---|---|---|---|
| **senior-frontend-engineer** | storybook-expert | "design system", "component library", "ui kit" | 1a |
| **senior-frontend-engineer** | react-component-tester | "component", "react", "button", "card", "modal", "form" | 1b |
| **react-component-tester** | storybook-expert | "design system", "component library", "storybook" | 2 |
| **react-component-tester** | playwright-dev-tester | "test", "vitest", "testing library", "e2e" | 3 |
| **storybook-expert** | playwright-dev-tester | "playwright", "browser", "e2e", "visual testing" | 4 |
| **Any Agent** | (Error Recovery) | Error detected | Block |

## Workflow Examples

### Workflow A: Design System Development
```
Input: "Create Button for design system"
                ↓
        senior-frontend-engineer
                ↓
        Check: "design system" mentioned ✓
                ↓
        Route to: storybook-expert (Pattern 1a)
                ↓
        storybook-expert (creates stories)
                ↓
        No more matching patterns
                ↓
Output: Component + Storybook Stories
```

### Workflow B: Component with Tests
```
Input: "Create Form component and test it"
                ↓
        senior-frontend-engineer
                ↓
        Check: "design system" ✗, "component" ✓
                ↓
        Route to: react-component-tester (Pattern 1b)
                ↓
        react-component-tester (writes tests)
                ↓
        Check: "design system" ✗, "e2e" ✓
                ↓
        Route to: playwright-dev-tester (Pattern 3)
                ↓
        playwright-dev-tester (creates E2E tests)
                ↓
        No more matching patterns
                ↓
Output: Component + Unit Tests + E2E Tests
```

### Workflow C: Complete Design System Component
```
Input: "Create Button for design system with full test coverage"
                ↓
        senior-frontend-engineer
                ↓
        Check: "design system" ✓
                ↓
        Route to: storybook-expert (Pattern 1a)
                ↓
        storybook-expert (creates stories)
                ↓
        Check: "design system" ✓, "test" ✓
                ↓
        Route to: react-component-tester (Pattern 2)
                ↓
        react-component-tester (writes tests)
                ↓
        Check: "e2e" ✓
                ↓
        Route to: playwright-dev-tester (Pattern 3)
                ↓
        playwright-dev-tester (creates E2E tests)
                ↓
        No more matching patterns
                ↓
Output: Component + Storybook + Unit Tests + E2E Tests
```

## Context Keywords

Keywords that trigger agent routing:

### Design System Keywords (Patterns 1a, 2)
- "design system"
- "component library"
- "storybook"
- "story"
- "ui kit"
- "system"

### Component Keywords (Pattern 1b)
- "component"
- "react"
- "button"
- "card"
- "modal"
- "form"

### Testing Keywords (Patterns 2, 3)
- "test"
- "vitest"
- "testing library"
- "playwright"
- "e2e"

### Browser Testing Keywords (Patterns 3, 4)
- "test"
- "vitest"
- "testing library"
- "playwright"
- "e2e"
- "browser"
- "visual testing"
- "integration test"

## Notes

1. **Context matters**: The same agent can route to different next agents based on what keywords appear in the conversation
2. **No loops**: Once an agent has run, it won't be routed to again
3. **Flexible order**: The orchestrator allows multiple valid paths based on use case
4. **Error handling**: Any errors block completion and require the current agent to fix issues
5. **Smart defaults**: If no routing rules match, the workflow completes normally
