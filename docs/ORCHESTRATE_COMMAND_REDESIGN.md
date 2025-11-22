# Orchestrate Command Redesign: Direct LLM Instructions

## Summary

Redesigned the `/orchestrate` command from a structured data return format to direct action-oriented LLM instructions. The command now clearly tells the LLM **what to do**, not **what structure to return**.

---

## Key Insight

**Before**: "Return delegations array with explicit format..."
**After**: "Invoke agents explicitly with Task() using exact agent names..."

A command is instructions for the LLM to follow, not a specification for what the LLM should return.

---

## What Changed

### 1. Removed Return Format Section

**Before:**
```markdown
## Return Format

Always return JSON with this structure:

```json
{
  "status": "success|error",
  "data": { ... },
  "storeAs": "orchestrationPlan",
  "delegations": [...]
}
```
```

**After:**
```markdown
## Workflow Selection

Determine workflow type from first argument:
- **`linear <ticket-id>`** - Fetch Linear ticket, extract Figma URLs, analyze designs...
- **`figma <url>`** - Analyze Figma designs, implement, test, mount
- **`prd <requirements>`** - Generate PRD, optionally analyze Figma...
```

**Why**: Commands don't return data structures, they execute actions. The LLM should know what to do based on the workflow type.

### 2. Converted Sequences to Phases

**Before:**
```markdown
- **Sequence 2**: figma-design-analyzer (if Figma URLs)
- **Sequence 3**: senior-frontend-engineer (if design specs)
- **Sequence 4**: storybook-expert, react-component-tester, playwright-dev-tester
```

**After:**
```markdown
## Linear Workflow: `/orchestrate linear ENG-123`

1. Fetch Linear ticket `ENG-123` using mcp/tests/get-issue.ts
2. Parse response to extract: Issue ID, title, description, Figma URLs
3. Analyze the issue to determine component count and complexity
4. **If Figma URLs found:**
   - Task("figma-design-analyzer", { figmaUrls, linearIssue })
   - Launch in parallel for each URL
5. **Then implement using specs:**
   - Task("senior-frontend-engineer", { figmaSpecs, linearIssue, idx: 0 })
...
```

**Why**: Numbered steps are clearer than abstract sequence numbers. They tell the LLM the actual order of operations.

### 3. Direct Agent Invocation Instructions

**Before:**
```markdown
## Explicit Agent Tool Calls

- **Format (EXPLICIT)**:
```typescript
Task(
  "agent-name",  // Always: explicit string literal
  { context }
)
```
```

**After:**
```markdown
## Agent Invocation

When you invoke agents, follow this pattern exactly:

```typescript
Task(
  "agent-name",  // Always: explicit string, one of:
                 // - figma-design-analyzer
                 // - senior-frontend-engineer
                 // - playwright-dev-tester
                 // - prd-writer
  {
    // Agent-specific context, pass minimally
    figmaUrls: [...],        // for figma-design-analyzer
    figmaSpecs: [...],       // for senior-frontend-engineer
    ...
  }
)
```
```

**Why**: Give concrete agent names and the context each agent expects. This is actionable guidance, not abstract rules.

### 4. Added Terminal Commands Section

**New:**
```markdown
## Terminal Commands (Execute Directly)

- **Fetch Linear issue**: `npx tsx mcp/tests/get-issue.ts ENG-123`
- **Type check**: `npm run type-check`
- **Run tests**: `npm run test:run`
- **Mount components**: Manual App.tsx update or script
- **Cleanup**: `rm -rf mcp/tests/temp-* docs/temp/*`
- **Update Linear**: Use mcp/tests or direct API call
```

**Why**: Make it explicit that certain operations (fetch, test, mount, cleanup) are NOT delegated to agents—the orchestrator command itself handles them directly.

### 5. Simplified Key Rules

**Before**: Abstract concepts like "sequence numbering", "delegations", "data flows"

**After**: Concrete rules the LLM can follow:
```markdown
1. **Use explicit agent names ONLY** - Never variables or indirection
   - ✅ `Task("figma-design-analyzer", { ... })`
   - ❌ `Task(agents[0], { ... })`

2. **Launch agents in parallel when possible**
   - Multiple figma-design-analyzer calls → all at once
   - Multiple senior-frontend-engineer calls → all at once

3. **Pass only what each agent needs**
   - Don't duplicate data
   - figma-design-analyzer needs: figmaUrls
   - senior-frontend-engineer needs: figmaSpecs, linearIssue

4. **Execute orchestrator operations directly** (don't delegate these)
   - Fetch Linear ticket using mcp/tests/get-issue.ts
   - Run npm commands directly
   - Update Linear ticket directly
   - Mount components directly

5. **Sequential phases, parallel within phase**
   - Phase 1: Fetch + Analyze (sequential)
   - Phase 2: Design analysis (all parallel)
```

**Why**: These are patterns the LLM should follow, not data structures to return.

---

## Before vs After

### Structure

| Aspect | Before | After |
|--------|--------|-------|
| Sections | 8 | 8 |
| Lines | 149 | 166 |
| Focus | Data structure | Actions |
| Style | Specifications | Instructions |
| Tone | "Return this..." | "Do this..." |

### Content

| Section | Before | After | Change |
|---------|--------|-------|--------|
| Return Format | 15 lines | Removed | Removed (not needed) |
| Workflow Types | 5 lines | 3 lines | Simplified |
| Workflows | Inline examples (30 lines) | Step-by-step procedures (65 lines) | Detailed procedures |
| Rules | Abstract (7 lines) | Concrete (30 lines) | Much more actionable |
| Terminal Commands | Implied | Explicit section (6 lines) | Made explicit |

### Example: Linear Workflow

**Before:**
```
1. Execute: fetch_linear(ticketId) → get issue + Figma URLs
2. Execute: analyze(issue) → get component count
3. Return delegation: figma-design-analyzer for each URL (seq 2, parallel)
4. Return delegation: senior-frontend-engineer for each spec (seq 3, parallel)
5. Execute: cmd([...])
6. Return delegation: playwright-dev-tester (seq 4)
7. Execute: mount(implementations)
```

**After:**
```
1. Fetch Linear ticket ENG-123 using mcp/tests/get-issue.ts
2. Parse response to extract: Issue ID, title, description, Figma URLs
3. Analyze the issue to determine component count and complexity
4. If Figma URLs found:
   - Task("figma-design-analyzer", { figmaUrls, linearIssue })
   - Launch in parallel for each URL
   - Wait for all to complete
5. Then implement using specs:
   - Task("senior-frontend-engineer", { figmaSpecs, linearIssue, idx: 0 })
   - Task("senior-frontend-engineer", { figmaSpecs, linearIssue, idx: 1 })
   - Launch in parallel for each spec
   - Wait for all to complete
6. Run type checks and tests: npm run type-check && npm run test:run
7. Run visual tests:
   - Task("playwright-dev-tester", { figmaSpecs, implementations, linearIssue })
8. Mount components: npm run mount
9. Clean temporary files: rm -rf mcp/tests/temp-* docs/temp/*
10. Update Linear ticket: linear update ENG-123 --state Done --comment "✅ Implementation complete..."
```

**Difference**: Clear numbered actions vs. abstract "execute/delegate" terminology.

---

## Why This Matters

### 1. Clarity
- **Before**: "Return delegations array... execute orchestrator operations... structured context"
- **After**: "Do step 1, then step 2, then invoke agent X with Y, then do step 3"

### 2. Actionability
- **Before**: LLM must infer what "delegations", "sequences", "structured format" mean
- **After**: LLM has explicit numbered steps and examples

### 3. Idiomatic
- **Before**: Trying to treat a command like an agent (with return formats)
- **After**: Commands are instructions, agents return results

### 4. Debuggability
- **Before**: LLM might return unexpected structure if confused
- **After**: LLM follows numbered steps, much less ambiguity

---

## Prompt Engineering Principle

**A command should be instructions to follow, not a specification for what to return.**

Commands tell the LLM:
- What to do (numbered steps)
- What agents to invoke (explicit names)
- What context to pass (examples)
- What to handle directly (terminal commands)

Commands should NOT ask the LLM to:
- Structure return values in specific formats
- Create abstract data objects
- Invent return schemas

---

## Usage

The `/orchestrate` command now clearly instructs the LLM:

```bash
/orchestrate linear ENG-123
# → Follow Linear workflow steps 1-10, invoke agents explicitly

/orchestrate figma "https://figma.com/file/...?node-id=2171:13039"
# → Follow Figma workflow steps 1-8, invoke agents explicitly

/orchestrate prd "Build OAuth 2.0 authentication"
# → Follow PRD workflow steps 1-4, handle optional flags
```

---

## Verification

✅ Command is now purely action-oriented
✅ No ambiguity about what the LLM should do
✅ Explicit agent names and context
✅ Clear distinction between agent invocation and direct execution
✅ Numbered steps make ordering clear
✅ Removed confusing "return format" sections

---

## Commit Reference

- **Commit**: `f598d6d` - "Refactor orchestrate command as direct LLM instructions"
- **Lines Changed**: 149 → 166 lines (direct instructions are clearer)

---

## Takeaway

**Before**: "Here's a specification for what data structure to return"
**After**: "Here's what to do, step by step"

This is the correct way to structure commands for LLMs: clear actions, not data structures.
