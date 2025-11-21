# Agent Workflow Diagram

## Current vs Improved Workflow

### BEFORE (Current State)

```
User Request
     ↓
  [Agent]  ← Isolated, no MCP wrapper knowledge
     ↓
  Result   ← No coordination with other agents
```

**Problems:**
- Agents don't know about MCP server wrappers
- No coordination between agents
- Manual workflow orchestration required
- Linear integration missing


### AFTER (Improved State)

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER REQUEST                               │
│              "Implement feature from Linear issue"              │
└────────────────────────┬────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: FETCH CONTEXT                         │
│                                                                  │
│   ┌──────────────────────────────────────────────────┐         │
│   │  Linear MCP Wrapper (servers/linear/)            │         │
│   │  • getIssue(issueId)                             │         │
│   │  • Extract: title, description, Figma URLs       │         │
│   └──────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                 STEP 2: CREATE/UPDATE PRD                        │
│                                                                  │
│   ┌──────────────────────────────────────────────────┐         │
│   │  prd-writer Agent                                │         │
│   │  • Receives Linear context                       │         │
│   │  • Creates comprehensive PRD                     │         │
│   │  • Detects Figma URLs                            │         │
│   │  • Outputs: /requirements/[feature]-prd.md       │         │
│   └──────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         ↓
              ┌──────────┴──────────┐
              │ Has Figma URL?      │
              └──────────┬──────────┘
                         ↓
              ┌──────────┴──────────┐
              │         YES         │
              └──────────┬──────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                STEP 3: ANALYZE DESIGN (if applicable)            │
│                                                                  │
│   ┌──────────────────────────────────────────────────┐         │
│   │  figma-design-analyzer Agent                     │         │
│   │  • Uses Figma MCP Wrapper (servers/figma/)       │         │
│   │  • getDesignContext(nodeId)                      │         │
│   │  • getVariableDefs(nodeId)                       │         │
│   │  • Extracts ALL specifications                   │         │
│   │  • Outputs: Complete design blueprint            │         │
│   └──────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              STEP 4: PARALLEL IMPLEMENTATION                     │
│                                                                  │
│   ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│   │ senior-frontend- │  │ storybook-expert │  │   react-    │ │
│   │    engineer      │  │                  │  │  component- │ │
│   │                  │  │                  │  │   tester    │ │
│   │ • Receives       │  │ • Creates        │  │             │ │
│   │   design specs   │  │   stories        │  │ • Writes    │ │
│   │ • Implements     │  │ • Adds controls  │  │   tests     │ │
│   │   components     │  │ • Play functions │  │             │ │
│   │ • Knows about    │  │                  │  │             │ │
│   │   MCP wrappers   │  │                  │  │             │ │
│   └────────┬─────────┘  └────────┬─────────┘  └──────┬──────┘ │
│            └────────────┬─────────┴────────────────────┘        │
└─────────────────────────┼────────────────────────────────────────┘
                          ↓
                   ┌──────────────┐
                   │ ALL COMPLETE │
                   └──────┬───────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                  STEP 5: END-TO-END TESTING                      │
│                                                                  │
│   ┌──────────────────────────────────────────────────┐         │
│   │  playwright-dev-tester Agent                     │         │
│   │  • Uses Playwright MCP Wrapper                   │         │
│   │    (servers/playwright/)                         │         │
│   │  • navigate(), click(), type()                   │         │
│   │  • takeScreenshot(), verify flows                │         │
│   │  • Outputs: Test report with evidence            │         │
│   └──────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         ↓
              ┌──────────┴──────────┐
              │  All Tests Pass?    │
              └──────────┬──────────┘
                    YES  │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              STEP 6: UPDATE LINEAR TICKET                        │
│                                                                  │
│   ┌──────────────────────────────────────────────────┐         │
│   │  Linear MCP Wrapper (servers/linear/)            │         │
│   │  • updateIssue(id, { state: 'Done' })            │         │
│   │  • createComment(issueId, testReport)            │         │
│   │  • Outputs: Ticket updated with results          │         │
│   └──────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         ↓
                  ┌──────────────┐
                  │   COMPLETE   │
                  └──────────────┘
```

## Agent-to-Agent Communication Matrix

| Agent                        | Calls/Uses                               | Called By                | MCP Wrappers Used      |
|------------------------------|------------------------------------------|--------------------------|------------------------|
| **prd-writer**               | figma-design-analyzer (if Figma URL)     | User/Command             | Linear (fetch issue)   |
| **figma-design-analyzer**    | senior-frontend-engineer                 | prd-writer               | Figma (all tools)      |
| **senior-frontend-engineer** | storybook-expert, react-component-tester | figma-design-analyzer    | None (receives specs)  |
| **storybook-expert**         | -                                        | senior-frontend-engineer | None                   |
| **react-component-tester**   | -                                        | senior-frontend-engineer | None                   |
| **playwright-dev-tester**    | Linear (optional update)                 | After implementation     | Playwright (all tools) |

## Parallel Execution Points

### Parallel Group 1: Implementation Phase
```
senior-frontend-engineer ─┐
                          ├─→ [All execute simultaneously]
storybook-expert         ─┤
                          │
react-component-tester   ─┘
```

**Why Parallel:**
- Each works on different aspects (code, stories, tests)
- No dependencies between them
- Significantly faster completion

**When NOT to Parallelize:**
- Design analysis must complete before implementation
- E2E testing must wait for implementation
- Linear update must wait for all verifications

## MCP Wrapper Usage Map

```
┌─────────────────────────────────────────────────────────┐
│                    MCP Server Wrappers                   │
│                   (servers/index.ts)                     │
└────────────┬───────────────┬──────────────┬─────────────┘
             │               │              │
    ┌────────▼─────┐  ┌─────▼──────┐  ┌───▼──────────┐
    │   Figma      │  │   Linear   │  │  Playwright  │
    │   Wrappers   │  │  Wrappers  │  │   Wrappers   │
    └────────┬─────┘  └─────┬──────┘  └───┬──────────┘
             │               │              │
             │               │              │
    Used by: │      Used by: │     Used by: │
    • figma- │      • Main   │     • playwright-
      design-│        Claude │       dev-tester
      analyzer       Code    │
                     • prd-  │
                       writer│
                     • Any   │
                       agent │
```

## Decision Tree for Agent Selection

```
START: User Request
    │
    ├─→ Has Linear Issue ID?
    │   ├─ YES → Fetch with Linear MCP wrapper
    │   └─ NO  → Continue
    │
    ├─→ Needs Requirements Doc?
    │   ├─ YES → Launch prd-writer agent
    │   └─ NO  → Continue
    │
    ├─→ Has Figma URL?
    │   ├─ YES → Launch figma-design-analyzer agent
    │   │        (Uses Figma MCP wrapper)
    │   └─ NO  → Continue
    │
    ├─→ Needs Implementation?
    │   ├─ YES → Launch senior-frontend-engineer agent
    │   │        • If reusable components → Add storybook-expert
    │   │        • If complex logic → Add react-component-tester
    │   └─ NO  → Continue
    │
    ├─→ Needs Testing?
    │   ├─ YES → Launch playwright-dev-tester agent
    │   │        (Uses Playwright MCP wrapper)
    │   └─ NO  → Continue
    │
    └─→ Update Linear?
        ├─ YES → Use Linear MCP wrapper to update status
        └─ NO  → Complete
```

## Example: Complete Feature Implementation

**User:** "Implement the new dashboard from Linear issue ENG-456"

**Execution Flow:**

```
1. Fetch Context
   └─ linear.getIssue('ENG-456')
   └─ Extract: "Build dashboard with charts from Figma"
   └─ Figma URL found: https://figma.com/file/abc123

2. Create PRD
   └─ Launch: prd-writer agent
   └─ Input: Linear issue context
   └─ Output: /requirements/dashboard-prd.md
   └─ Detected: Figma URL present

3. Analyze Design
   └─ Launch: figma-design-analyzer agent
   └─ figma.getDesignContext(nodeId)
   └─ figma.getVariableDefs(nodeId)
   └─ Output: Complete design specifications

4. Implement (PARALLEL)
   ├─ senior-frontend-engineer
   │  └─ Build Dashboard.tsx, ChartWidget.tsx
   │
   ├─ storybook-expert
   │  └─ Create Dashboard.stories.tsx
   │
   └─ react-component-tester
      └─ Create Dashboard.test.tsx

5. E2E Test
   └─ Launch: playwright-dev-tester agent
   └─ playwright.navigate('localhost:3000/dashboard')
   └─ playwright.takeScreenshot()
   └─ Verify: Charts render, interactions work
   └─ Output: Test report ✅ All Pass

6. Update Linear
   └─ linear.updateIssue('ENG-456', { state: 'Done' })
   └─ linear.createComment('ENG-456', testReport)
   └─ Ticket marked as Done with full context
```

**Result:**
- ✅ Complete feature implementation
- ✅ Design specifications followed exactly
- ✅ Stories created for component library
- ✅ Tests written and passing
- ✅ E2E verification complete
- ✅ Linear ticket updated automatically
- ⏱️ Time saved: ~40% due to parallel execution

## Benefits of Improved Workflow

| Aspect                 | Before              | After                       | Improvement                          |
|------------------------|---------------------|-----------------------------|--------------------------------------|
| **MCP Integration**    | Manual              | Automatic                   | Agents know when/how to use wrappers |
| **Agent Coordination** | Sequential          | Parallel where possible     | 40% faster                           |
| **Linear Integration** | Manual updates      | Automated fetch & update    | End-to-end automation                |
| **Design Workflow**    | Ad-hoc              | Figma → Analyzer → Engineer | Systematic & accurate                |
| **Testing**            | Manual trigger      | Automatic after impl        | Consistent quality gate              |
| **Context Efficiency** | Lost between agents | Preserved & passed          | Better continuity                    |
