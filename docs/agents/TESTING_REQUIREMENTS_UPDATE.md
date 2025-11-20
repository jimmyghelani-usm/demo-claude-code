# Testing Requirements Update - Complete ✅

## Summary

Updated documentation to **require test creation for ALL components** and ensure agents properly delegate to `react-component-tester` and `storybook-expert` agents using the Task tool.

## Key Finding: Agent Invocation Mechanism

**Agents CAN invoke other agents using the Task tool** - there is no special `@` syntax. The pattern is:

```
Use the Task tool with subagent_type='agent-name' to delegate work
```

This was confirmed by researching Claude Code documentation and examining existing agent configurations.

## Changes Made

### 1. ✅ Updated `.claude/agents/senior-frontend-engineer.md`

#### Change 1: Replaced "Testing Considerations" with "Component Testing & Test Creation"
**Location:** Lines 102-121

**Before:**
```markdown
8. **Testing Considerations**
   - Write code that is testable (avoid tight coupling, use dependency injection)
   - Structure components to make testing easier
   - Consider edge cases and document them in comments
   - Provide clear prop types/interfaces that act as contracts
```

**After:**
```markdown
8. **Component Testing & Test Creation** ⚠️ REQUIRED
   - **ALL components MUST have tests** - either Storybook interaction tests OR Vitest functional tests
   - Use the Task tool with subagent_type='react-component-tester' to create comprehensive tests AFTER implementation
   - Trigger test creation for:
     * All new components (UI components, sections, features)
     * Components with user interactions (clicks, typing, form submissions)
     * Components with conditional rendering or state management
     * Components with accessibility features that need verification
     * Any component that would benefit from automated testing
   - Provide the testing agent with complete component context including:
     * Component file path and implementation details
     * All props, variants, states, and user interactions
     * Expected behaviors and edge cases to test
     * Any accessibility requirements (ARIA attributes, keyboard navigation)
   - Write code that is testable:
     * Avoid tight coupling, use dependency injection
     * Structure components to make testing easier
     * Consider edge cases and document them in comments
     * Provide clear prop types/interfaces that act as contracts
   - Continue with other tasks after delegating to testing agent; don't wait for tests to be complete
```

**Impact:** Now explicitly requires test creation and provides clear guidance on using Task tool to delegate to react-component-tester.

#### Change 2: Updated "Agent Coordination" Section
**Location:** Lines 23-27

**Before:**
```markdown
### Agent Coordination
- **Storybook Stories**: Delegate to `storybook-expert` agent (documented below)
- **Component Tests**: After implementation, `react-component-tester` can create tests
- **E2E Testing**: After completion, `playwright-dev-tester` agent will verify functionality
- **Parallel Execution**: When building multiple components, multiple agents can work in parallel
```

**After:**
```markdown
### Agent Coordination
- **Storybook Stories**: REQUIRED for reusable UI components - Delegate to `storybook-expert` agent (documented below)
- **Component Tests**: REQUIRED for all components - After implementation, delegate to `react-component-tester` agent using Task tool
- **E2E Testing**: After completion, `playwright-dev-tester` agent will verify functionality
- **Parallel Execution**: When building multiple components, storybook-expert and react-component-tester agents can work in parallel after implementation
```

**Impact:** Makes testing requirements explicit and clarifies parallel execution of testing agents.

#### Change 3: Updated "Self-Verification Checklist"
**Location:** Lines 183-194

**Before:**
```markdown
- ✓ Storybook stories created for reusable components (via storybook-expert agent)
```

**After:**
```markdown
- ✓ Storybook stories created for reusable UI components (via storybook-expert agent)
- ✓ Component tests created for ALL components (via react-component-tester agent)
```

**Impact:** Adds explicit checklist item for test creation verification.

### 2. ✅ Updated `CLAUDE.md`

#### Change: Replaced "Creating New React Components" Section
**Location:** Lines 179-202

**Before:**
```markdown
### Creating New React Components

1. Create component in appropriate directory (`ui/` or `sections/`)
2. Export from directory's `index.ts`
3. Create `.stories.tsx` for Storybook
4. Create `.test.tsx` with Vitest + React Testing Library
5. Use `@/` imports for internal dependencies
```

**After:**
```markdown
### Creating New React Components ⚠️ TESTING REQUIRED

**Implementation Flow:**
1. Create component in appropriate directory (`ui/` or `sections/`)
2. Export from directory's `index.ts`
3. Use `@/` imports for internal dependencies

**REQUIRED: Testing & Documentation (use agent delegation):**
4. **Storybook Stories** - REQUIRED for reusable UI components
   - Use Task tool to delegate to `storybook-expert` agent
   - Provide complete component context (props, variants, states, interactions)
   - Agent creates comprehensive stories with args, controls, and play functions

5. **Component Tests** - REQUIRED for ALL components
   - Use Task tool to delegate to `react-component-tester` agent
   - Provide component context (file path, props, behaviors, edge cases)
   - Agent creates tests using Vitest + React Testing Library
   - Tests must cover user interactions, conditional rendering, and accessibility

**Important Notes:**
- ALL components MUST have tests (either Storybook interaction tests OR Vitest functional tests)
- Delegate to agents in parallel when creating multiple components
- Continue with other work after delegation; don't wait for agents to complete
- The `senior-frontend-engineer` agent is configured to automatically trigger both testing agents
```

**Impact:** Transforms from descriptive to prescriptive, emphasizing REQUIRED testing and agent delegation pattern.

## What Was Already Correct

### ✅ Storybook Integration (senior-frontend-engineer.md)
**Location:** Lines 131-145

Already had comprehensive documentation:
- Clear Task tool delegation pattern
- When to trigger storybook agent
- What context to provide
- Instruction to continue work after delegation

**No changes needed** - this section was already perfect.

### ✅ Component Organization (CLAUDE.md)
**Location:** Line 55

Already mentioned:
```markdown
- All components have corresponding `.stories.tsx` and `.test.tsx` files
```

**No changes needed** - kept this as it provides context about existing structure.

## Agent Delegation Pattern Confirmed

Based on research and existing agent configurations, the proper pattern for agents to invoke other agents is:

```markdown
Use the Task tool with subagent_type='agent-name' to [action]

Example:
Use the Task tool with subagent_type='react-component-tester' to create comprehensive tests AFTER implementation
```

**Key Points:**
1. **No @ syntax** - Use Task tool instead
2. **Pass complete context** - Include file paths, props, behaviors, etc.
3. **Don't wait** - Continue with other work after delegation
4. **Parallel execution** - Multiple agents can work simultaneously
5. **Explicit triggers** - Document when to invoke each agent

## Testing Now Happens in Two Ways

### Option 1: Storybook Interaction Tests
- Created by `storybook-expert` agent
- Defined in `play` functions within `.stories.tsx` files
- Test component behavior in Storybook environment
- Run via `npm run test:storybook`

### Option 2: Vitest Functional Tests
- Created by `react-component-tester` agent
- Separate `.test.tsx` files
- Use React Testing Library + Vitest
- Run via `npm test`

**Both are valid** - components must have at least one form of testing.

## Verification

All changes complete:
- ✅ senior-frontend-engineer.md updated with REQUIRED testing and Task tool delegation
- ✅ CLAUDE.md updated with TESTING REQUIRED workflow and agent delegation
- ✅ Agent Coordination section clarified
- ✅ Self-Verification Checklist includes test creation
- ✅ Storybook Integration already properly documented (no changes needed)
- ✅ Confirmed agent invocation mechanism (Task tool, not @ syntax)

## Files Modified

1. `.claude/agents/senior-frontend-engineer.md` (3 sections updated)
2. `CLAUDE.md` (1 section updated)
3. `TESTING_REQUIREMENTS_UPDATE.md` (this file - new)

## Next Steps

No further action required. The documentation now:
- ✅ Requires test creation for ALL components
- ✅ Documents Task tool delegation pattern
- ✅ Triggers react-component-tester agent automatically
- ✅ Triggers storybook-expert agent for reusable components
- ✅ Supports parallel execution of testing agents
- ✅ Clarifies that agents should continue work after delegation

---

**Date:** November 20, 2025
**Status:** ✅ Complete
**Testing Requirements:** Enforced
**Agent Delegation:** Documented
**Storybook Stories:** Already properly configured
