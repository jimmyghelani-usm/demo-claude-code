# Before & After: Orchestration Patterns

## Example: Linear Ticket → Implementation

### CURRENT PATTERN (Procedural Command)

**File: `.claude/commands/implement-linear.md`**

```bash
# Step 1: Fetch Linear Ticket
npx tsx mcp/tests/get-issue.ts {{prompt}}
# Result: JSON string that must be parsed

# Step 2: Extract from JSON (by user/orchestrator)
- Title, description, labels, assignee
- Figma URLs (regex search in text)
- Status and team context

# Step 3: PRD (Optional - Skip by Default)
Task({
  subagent_type: 'prd-writer',
  model: 'haiku',
  prompt: 'Create CONCISE PRD: requirements...'
})

# Step 4: Design Analysis (If Figma URLs Found)
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze node XXXX:XXXX. Extract colors, typography...'
})

# Step 5: Implementation
Task({
  subagent_type: 'senior-frontend-engineer',
  model: 'haiku',
  prompt: 'Implement component. PRD: [paste]. Figma specs: [paste]'
})
```

**Problems:**
```
❌ Step 1: Bash script to fetch data
❌ Step 2: Manual parsing of JSON response
❌ Step 3: "Optional - Skip" means unclear workflow
❌ Step 4: Hardcoded figma-design-analyzer
❌ Step 5: Data embedded as text in prompt
   ↳ Agent receives: "Implement component. PRD: [500 chars]. Figma specs: [500 chars]"
   ↳ Agent must re-parse all this text
❌ No parallel execution declared
❌ No structured error handling
❌ Can't reuse data across steps
❌ Hard to see what data is available to each agent
```

---

### PROPOSED PATTERN (Orchestrator Command)

**File: `.claude/commands/orchestrate.md`**

```yaml
---
description: |
  Universal orchestrator for Linear → Implementation workflows.
  Automatically handles discovery, design analysis, PRD generation,
  parallel implementation, and verification.
---

# Linear → Implementation Orchestrator

Execute end-to-end: Linear ticket → PRD → Figma specs → Implementation → Testing

## Usage

```bash
/orchestrate linear-implementation ENG-123
```

## What Happens

This orchestrator runs the workflow defined in `workflows/linear-to-implementation.yaml`:

1. **Discovery Phase**: Fetch Linear ticket, extract context
2. **Analysis Phase**: If Figma URLs found, analyze designs (parallel)
3. **PRD Phase**: Generate PRD if needed
4. **Implementation Phase**: Run all component implementations in parallel
5. **Verification Phase**: Run tests and visual verification in parallel
6. **Completion Phase**: Update Linear ticket with results

## All Phases Auto-Run

The orchestrator determines which phases to run based on discovered data:
- Figma URLs detected? → Run figma-design-analyzer
- Complex requirements? → Generate PRD
- Multiple components? → Parallel implementation

You don't need to specify each step manually.

## Result

All components are:
- ✓ Implemented with clean code
- ✓ Tested with unit + visual tests
- ✓ Mounted in App.tsx
- ✓ Documented in Linear ticket
- ✓ Live at http://localhost:3000
```

**File: `workflows/linear-to-implementation.yaml`**

```yaml
name: linear-to-implementation
version: 1.0
description: Convert Linear ticket to fully implemented & tested components

phases:
  # PHASE 1: DISCOVERY
  - id: discovery
    name: "Discovery - Fetch Ticket & Analyze"
    type: discovery
    tasks:
      - id: fetch_ticket
        agent: orchestrator
        operation: execute
        input:
          ticketId: "{{parameters.ticketId}}"
        output:
          storeAs: linearIssue
          schema:
            id: string
            title: string
            description: string
            figmaUrls: string[] # auto-extracted

      - id: analyze_context
        agent: orchestrator
        operation: execute
        input:
          issueData: $from.linearIssue
        output:
          storeAs: workflowContext
          includes:
            - hasFigmaDesigns: boolean
            - hasComplexRequirements: boolean
            - componentCount: number
            - suggestedPRD: boolean

  # PHASE 2: DESIGN ANALYSIS (Parallel if multiple designs)
  - id: design_analysis
    name: "Design Analysis - Extract Specs from Figma"
    type: processing
    gateCondition: workflowContext.hasFigmaDesigns === true
    errorRecovery: skip # Continue without designs if this fails
    tasks:
      - id: analyze_designs
        agent: figma-design-analyzer
        operation: delegate
        parallel: true # Multiple designs analyzed simultaneously
        input:
          context:
            figmaUrls: $from.linearIssue.figmaUrls
            clientFrameworks: "react"
            clientLanguages: "typescript"
        output:
          storeAs: figmaSpecs
          schema:
            nodeId: string
            screenshot: string # file path
            colors: object
            typography: object
            layout: object

  # PHASE 3: PRD GENERATION (Optional)
  - id: prd_generation
    name: "PRD Generation - Document Requirements"
    type: processing
    gateCondition: workflowContext.suggestedPRD === true
    errorRecovery: skip # Continue without PRD if skipped
    tasks:
      - id: generate_prd
        agent: prd-writer
        operation: delegate
        input:
          context:
            issueTitle: $from.linearIssue.title
            issueDescription: $from.linearIssue.description
            figmaSpecs: $from.figmaSpecs
        output:
          storeAs: prd
          schema:
            requirements: string
            successCriteria: string
            technicalNotes: string

  # PHASE 4: IMPLEMENTATION (Parallel - one task per component)
  - id: implementation
    name: "Implementation - Build Components"
    type: implementation
    gateCondition: workflowContext.componentCount > 0
    tasks:
      - id: implement_components
        agent: senior-frontend-engineer
        operation: delegate
        parallel: true # Each component independently
        input:
          context:
            figmaSpecs: $from.figmaSpecs
            prd: $from.prd
            linearIssue: $from.linearIssue
            componentIndex: "{{loop.index}}" # For multiple components
        output:
          storeAs: implementationResults[{{loop.index}}]
          schema:
            componentName: string
            filePath: string
            exportPath: string
            stories: boolean
            tests: boolean

      # Testing is auto-triggered by senior-frontend-engineer
      # (declared in agent metadata as auto-delegates)

  # PHASE 5: VERIFICATION (Parallel)
  - id: verification
    name: "Verification - Test & Visual Check"
    type: verification
    tasks:
      - id: run_tests
        agent: orchestrator
        operation: execute
        input:
          commands:
            - "npm run type-check"
            - "npm run test:run"

      - id: visual_verification
        agent: playwright-dev-tester
        operation: delegate
        parallel: true
        input:
          context:
            figmaSpecs: $from.figmaSpecs
            components: $from.implementationResults
        output:
          storeAs: verificationResults
          includes:
            - screenshotComparisons: object
            - a11yIssues: string[]
            - responsiveIssues: string[]

  # PHASE 6: INTEGRATION
  - id: integration
    name: "Integration - Mount in App.tsx"
    type: implementation
    tasks:
      - id: mount_components
        agent: orchestrator
        operation: execute
        input:
          components: $from.implementationResults
          targetFile: "src/App.tsx"

  # PHASE 7: COMPLETION
  - id: completion
    name: "Completion - Report Results"
    type: verification
    tasks:
      - id: update_linear
        agent: orchestrator
        operation: execute
        input:
          ticketId: $from.linearIssue.id
          status: "Done"
          comment: |
            Implementation complete:
            - Components: {{implementationResults.length}}
            - Tests: All passing
            - Live: http://localhost:3000
            - Screenshots: docs/temp/playwright-screenshots/

      - id: cleanup
        agent: orchestrator
        operation: execute
        input:
          commands:
            - "rm -f mcp/tests/temp-*.ts"
            - "rm -f docs/project/*-design-spec*.md"
```

**Data Flow:**

```
Linear Ticket (JSON)
  ↓ [fetch_ticket - discovery]
  ↓ Structured: { id, title, description, figmaUrls }

  ├─→ [analyze_designs - parallel] → figmaSpecs (STRUCTURED)
  │   ├─→ [generate_prd - optional] → prd (STRUCTURED)
  │   └─→ [implement_components - parallel] → implementations
  │       ├─→ [auto: storybook-expert] (triggered by senior-frontend-engineer)
  │       ├─→ [auto: react-component-tester] (triggered by senior-frontend-engineer)
  │       └─→ [visual_verification - parallel] → screenshots

  └─→ [mount_components] → App.tsx
      └─→ [update_linear] → Mark Done
```

**Benefits:**

✅ **Single command** - `/orchestrate linear-implementation ENG-123`
✅ **Automatic phases** - Determines which steps to run based on data
✅ **Parallel execution** - Multiple components implemented simultaneously
✅ **Structured data** - No text parsing or regex extraction
✅ **Clear dependencies** - `$from.figmaSpecs` shows where data comes from
✅ **Gate conditions** - Skip phases if data isn't available
✅ **Error recovery** - Define what to do if phase fails
✅ **Agent auto-triggering** - Testing agents auto-run after implementation
✅ **Type safety** - Each agent knows exactly what data structure it gets
✅ **Testable** - Workflow is data, can be validated independently

---

## Side-by-Side: Data Handling

### CURRENT: Text Embedding

```typescript
// Command prepares data as text
const prd = "P0 Requirements:\n- Build UI\n- Add auth\n...";
const figmaSpecs = "Colors:\n- Primary: #ffffff\n- Secondary: #000000\n...";

// Data embedded in prompt
const prompt = `
  Implement component.

  PRD:
  ${prd}

  Figma Specs:
  ${figmaSpecs}
`;

// Agent receives as text, must parse:
// ❌ Regex for hex colors
// ❌ String splitting for requirements
// ❌ Error-prone extraction
```

### PROPOSED: Structured Context

```typescript
// Orchestrator prepares structured data
const executionContext = {
  workflowId: "linear-impl-abc123",
  phase: "implementation",
  discoveredData: {
    prd: {
      requirements: ["Build UI", "Add auth"],
      successCriteria: "...",
      technicalNotes: "..."
    },
    figmaSpecs: {
      colors: { primary: "#ffffff", secondary: "#000000" },
      typography: { h1: { size: 32, weight: 700 } },
      layout: { width: 1200, spacing: { lg: 24, md: 16 } }
    }
  }
};

// Agent receives structured object
const { prd, figmaSpecs } = context.discoveredData;

// ✅ Direct access: prd.requirements[0]
// ✅ Type-safe: figmaSpecs.colors.primary
// ✅ No parsing needed
// ✅ Error-free data extraction
```

---

## Key Differences

| Aspect | Current | Proposed |
|--------|---------|----------|
| **Command entry point** | Bash steps in markdown | Workflow YAML definition |
| **Data transport** | Embedded text in prompts | Structured context objects |
| **Agent input** | Unstructured text ("PRD:\n...") | Typed schema objects |
| **Parallelization** | Manual coordination | Declared in workflow YAML |
| **Phase ordering** | Hardcoded steps 1→2→3 | Dependency graph with gates |
| **Error handling** | Try-catch scattered | Centralized with recovery |
| **Data reuse** | Copy-paste into each prompt | Reference via `$from.phase` |
| **Agent discovery** | Hardcoded task type | Self-declared capabilities |
| **Workflow versioning** | Implicit in command file | Explicit in YAML (v1.0) |
| **Execution tracing** | Read command markdown | View execution context in logs |

---

## Migration Path: Current → Proposed

### Step 1: Implement Orchestrator Agent
```
Create `.claude/agents/orchestrator.md`
- Manages execution context
- Routes between phases
- Handles data passing
```

### Step 2: Convert First Workflow
```
Create `workflows/linear-to-implementation.yaml`
- Extract from `/implement-linear.md` logic
- Define as declarative phases
- Test with real ticket
```

### Step 3: Update Commands Incrementally
```
/orchestrate linear-implementation → uses new workflow
/implement-linear → kept for backwards compatibility
/implement-design → converts to orchestrator pattern
/prd → converts to orchestrator pattern
```

### Step 4: Update All Agents
```
Add metadata to each agent:
  provides: { ... }
  requires: { ... }
  autoTriggered: true/false
```

### Step 5: Decommission Old Commands (Optional)
```
Once stable:
- Keep /orchestrate (new pattern)
- Archive old commands
- Update documentation
```

---

## Execution Trace Examples

### Current: Hard to Debug
```
Step 3 failed. Where did it fail?
- In figma-design-analyzer response parsing?
- In prompt construction?
- In agent execution?
- Nobody knows!
```

### Proposed: Clear Context Trail
```json
{
  "workflowId": "linear-impl-xyz789",
  "phase": "design_analysis",
  "task": "analyze_designs",
  "status": "RUNNING",
  "input": {
    "context": { "figmaUrls": ["..."], "clientFrameworks": "react" }
  },
  "output": {
    "storeAs": "figmaSpecs",
    "status": "PENDING"
  }
}

✓ Instantly clear what phase failed
✓ See exact input given to agent
✓ See where output will be stored
✓ Easy to retry from this point
```

---

## Quick Reference: New Workflow Syntax

### Define a Workflow
```yaml
name: my-workflow
phases:
  - id: discovery
    tasks:
      - id: fetch_data
        agent: my-agent
        input: { ... }
        output: { storeAs: data }
```

### Reference Previous Output
```yaml
input:
  data: $from.discovery.data  # From discovery phase
  # or
  data: $from.fetch_data      # From specific task
```

### Parallel Execution
```yaml
- id: process_items
  agent: my-agent
  parallel: true  # Run multiple times, one per item
  input:
    item: "{{loop.item}}"
```

### Conditional Phases
```yaml
gateCondition: data.figmaUrls.length > 0
errorRecovery: skip  # or: retry, halt
```

---

## Next Steps

1. Read `ORCHESTRATION_ANALYSIS.md` for detailed architecture
2. Review `workflows/` directory structure
3. Implement orchestrator agent (sample code available)
4. Test with one workflow (recommend: `/orchestrate linear-implementation`)
5. Gather feedback and iterate

**Questions?** See ORCHESTRATION_ANALYSIS.md for detailed explanations.
