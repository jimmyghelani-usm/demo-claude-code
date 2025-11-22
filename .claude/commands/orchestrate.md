---
description: |
  Universal orchestrator for all multi-agent workflows. Single command for complete end-to-end execution.
  Usage: /orchestrate workflow-name [arguments]
---

# Universal Orchestrator: Execute Multi-Agent Workflows

The orchestrator automates entire workflows: discovery → analysis → implementation → testing → completion.

## Available Workflows

### 1. Linear → Implementation
```bash
/orchestrate linear-implementation ENG-123
```
Converts Linear ticket to fully implemented, tested components.

**What it does:**
1. Fetches Linear ticket
2. Extracts Figma URLs from description
3. Analyzes Figma designs (parallel)
4. Implements components (parallel)
5. Runs type-check and tests
6. Visual verification against Figma
7. Mounts components in App.tsx
8. Updates Linear ticket as Done

### 2. Figma → Implementation
```bash
/orchestrate figma-to-implementation "https://figma.com/file/..." "https://figma.com/file/..."
```
Converts Figma design URLs to fully implemented, tested components.

**What it does:**
1. Parses Figma URLs
2. Analyzes designs (parallel)
3. Implements components (parallel)
4. Runs type-check and tests
5. Visual verification
6. Mounts components in App.tsx

### 3. PRD with Optional Implementation
```bash
/orchestrate prd-with-implementation "Build user authentication system"
```
Creates PRD and optionally implements based on requirements.

**What it does:**
1. Generates comprehensive PRD
2. (Optional) Analyzes Figma designs if URLs provided
3. (Optional) Implements components
4. (Optional) Runs tests and mounts components

**Options:**
```bash
# With Figma designs
/orchestrate prd-with-implementation "requirements" --figma "url1" "url2"

# With implementation
/orchestrate prd-with-implementation "requirements" --implement

# With both
/orchestrate prd-with-implementation "requirements" --figma "url" --implement
```

---

## How It Works

### Step 1: Load Workflow Definition
The orchestrator loads the appropriate YAML workflow from `workflows/` directory:
- `workflows/linear-to-implementation.yaml`
- `workflows/figma-to-implementation.yaml`
- `workflows/prd-with-implementation.yaml`

### Step 2: Initialize Execution Context
Creates structured context object containing:
- Unique workflow ID
- Parameters passed by user
- Empty discoveredData (filled as workflow progresses)
- Empty agentResults (tracks all agent outputs)
- Metadata (workflow name, start time, etc)

### Step 3: Execute Phases Sequentially
For each phase defined in workflow:
1. Check gate condition (skip if false)
2. Execute or delegate each task
3. Collect results in structured format
4. Store data for next phase
5. Handle errors per recovery policy

### Step 4: Automatic Agent Triggering
Some agents auto-trigger based on previous results:
- `senior-frontend-engineer` auto-triggers `storybook-expert` + `react-component-tester`
- `playwright-dev-tester` triggered by verification phase
- `mcp-execution-agent` handles all MCP operations

### Step 5: Return Complete Results
Returns structured execution context containing:
- Full trace of all phases
- All discovered data
- All agent results
- Completion status

---

## Execution Examples

### Example 1: Linear Ticket to Components

```bash
/orchestrate linear-implementation ENG-123
```

**Automatic Flow:**
```
Discovery Phase
└─ Fetch ticket ENG-123 from Linear
└─ Extract Figma URLs from description

Design Analysis Phase (Parallel)
├─ figma-design-analyzer on design 1
├─ figma-design-analyzer on design 2
└─ (both run simultaneously)

Implementation Phase (Parallel)
├─ senior-frontend-engineer on component 1
│  └─ (auto-triggers storybook-expert)
│  └─ (auto-triggers react-component-tester)
├─ senior-frontend-engineer on component 2
│  └─ (auto-triggers storybook-expert)
│  └─ (auto-triggers react-component-tester)
└─ (both implementations run simultaneously)

Verification Phase
├─ npm run type-check
├─ npm run test:run
└─ playwright-dev-tester (visual comparison vs Figma)

Integration Phase
└─ Mount components in src/App.tsx

Cleanup Phase
└─ Delete temporary files

Completion Phase
├─ Update Linear ticket: Status = Done
├─ Add comment with results
└─ Log completion

RESULT: All components live at http://localhost:3000 ✅
```

### Example 2: Figma URLs to Components

```bash
/orchestrate figma-to-implementation "https://figma.com/design/..." "https://figma.com/design/..."
```

**Same automatic flow as Linear, but starting from Figma URLs directly**

### Example 3: PRD Only

```bash
/orchestrate prd-with-implementation "Build OAuth 2.0 authentication flow"
```

**Output:** Comprehensive PRD with requirements, success criteria, technical notes

**Optional:** Add `--implement` flag to auto-implement after PRD

---

## What's Automated

### Discovery
- ✅ Fetch data from Linear/Figma
- ✅ Extract and organize information
- ✅ Analyze context (complexity, component count, etc)

### Parallelization
- ✅ Multiple Figma designs analyzed simultaneously
- ✅ Multiple components implemented simultaneously
- ✅ Multiple tests run simultaneously

### Agent Coordination
- ✅ Structured context passed to all agents
- ✅ Agent auto-triggering (testing after implementation)
- ✅ Data dependencies managed (figmaSpecs → implementation)

### Error Handling
- ✅ Centralized error recovery
- ✅ Skip non-critical phases on failure
- ✅ Retry logic for transient failures

### Cleanup
- ✅ Temporary files deleted
- ✅ Stale data removed
- ✅ Final report generated

---

## Data Flow Example

**Linear → Implementation workflow data flow:**

```
Linear Ticket (JSON)
  │
  ├─→ [Discovery]
  │   └─ Extract: {id, title, description, figmaUrls[]}
  │
  ├─→ [Design Analysis] (Parallel if multiple URLs)
  │   ├─ figmaSpecs[0] = {colors, typography, layout, screenshot}
  │   ├─ figmaSpecs[1] = {colors, typography, layout, screenshot}
  │   └─ figmaSpecs[2] = {colors, typography, layout, screenshot}
  │
  ├─→ [Implementation] (Parallel - one per figmaSpec)
  │   ├─ Component1 built using figmaSpecs[0]
  │   ├─ Component2 built using figmaSpecs[1]
  │   └─ Component3 built using figmaSpecs[2]
  │
  ├─→ [Verification]
  │   ├─ All type checks pass
  │   ├─ All tests pass (42/42)
  │   └─ Visual verification complete
  │
  ├─→ [Integration]
  │   └─ All components mounted in App.tsx
  │
  └─→ [Completion]
      └─ Linear ticket updated: Done ✅
```

---

## Expected Duration

| Workflow | Duration | Notes |
|----------|----------|-------|
| Single component | 3-5 min | Linear → Design → Impl → Tests |
| Multiple components (3) | 5-8 min | Parallel execution speeds this up |
| With PRD generation | +2-3 min | PRD creation adds overhead |

---

## Troubleshooting

**If phase fails:**
- Check execution context returned for detailed error
- See which phase failed and which task
- Errors are descriptive with full input context

**If agents don't coordinate:**
- Verify agents received structured context (not text)
- Check ExecutionContext object matches schema
- See agent logs for parsing errors

**If parallelization doesn't work:**
- Verify workflow YAML has `parallel: true`
- Check that orchestrator launched all Task() calls in single response
- Monitor agent result collection

**If tests fail:**
- Run `npm run type-check` manually for details
- Run `npm run test:ui` to see which tests failed
- Visual tests in `docs/temp/playwright-screenshots/`

---

## Advanced Usage

### Custom Workflows

Create new workflow in `workflows/`:
```yaml
name: my-custom-workflow
version: 1.0
phases:
  - id: discovery
    tasks: [...]
  - id: implementation
    tasks: [...]
```

Then use:
```bash
/orchestrate my-custom-workflow [arguments]
```

### Conditional Phases

Use gate conditions to conditionally run phases:
```yaml
gateCondition: "$from.workflowContext.hasFigmaDesigns"
```

Only runs if Figma designs were discovered.

### Error Recovery

Define what happens if phase fails:
```yaml
errorRecovery: skip  # Skip this phase, continue to next
errorRecovery: retry # Retry up to 2 times
errorRecovery: halt  # Stop entire workflow
```

---

## Architecture

```
/orchestrate command
  │
  ├─→ Parse arguments (workflow name, parameters)
  │
  ├─→ Load workflow YAML from workflows/
  │
  ├─→ Delegate to orchestrator agent:
  │   "Workflow: linear-to-implementation
  │    Parameters: {ticketId: ENG-123}
  │    Context: [full ExecutionContext]"
  │
  ├─→ Orchestrator executes phases:
  │   - Orchestrator operations (fetch, mount, execute)
  │   - Specialist agent delegations (figma, implementation, testing)
  │   - Parallel execution management
  │   - Error handling & recovery
  │
  └─→ Return complete execution context
     - All discovered data
     - All agent results
     - Execution trace
     - Status (success/error/partial)
```

---

## Next Steps

**Get started:**
```bash
# Try the workflow with a real Linear ticket
/orchestrate linear-to-implementation ENG-123

# Or start with Figma designs
/orchestrate figma-to-implementation "https://figma.com/file/..."

# Or just generate a PRD
/orchestrate prd-with-implementation "Build auth system"
```

**Monitor results:**
- Components live at: `http://localhost:3000`
- Design screenshots: `docs/temp/figma-screenshots/`
- Test screenshots: `docs/temp/playwright-screenshots/`
- Linear ticket: Automatically updated as Done

---

All workflows are **declarative** (YAML), **type-safe** (structured context), and **parallelizable** (multi-agent coordination).

**Ready? Try:** `/orchestrate linear-implementation [ticket-id]`
