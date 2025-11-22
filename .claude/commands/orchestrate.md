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
The `/orchestrate` command loads the appropriate YAML workflow from `workflows/` directory (lazy loading):
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
2. For tasks with `agent: orchestrator`: Execute locally (fetch_linear, analyze, cmd, mount, cleanup, update_linear)
3. For tasks with `agent: name`: Collect delegation instruction (explicit format)
4. Collect results in structured format
5. Store data for next phase
6. Handle errors per recovery policy

### Step 4: Return Execution Plan
Returns complete delegation plan containing:
- All discovered data from orchestrator operations
- Explicit delegations array (agent, context, sequence, parallel)
- Full execution trace
- Status and metadata

### Step 5: Main Orchestrator Executes Delegations
The main orchestrator (outside agent system) handles delegation execution:
1. Groups delegations by sequence number
2. Launches same-sequence agents in parallel
3. Some agents return sub-delegations (storybook-expert, react-component-tester, playwright-dev-tester)
4. Sub-delegations automatically queued for next phase
5. Results merged back into context
6. Process continues until all delegations complete

**Auto-Triggering** works through delegation returns:
- `senior-frontend-engineer` returns delegations for `storybook-expert` + `react-component-tester`
- `playwright-dev-tester` returned as delegation from verification phase
- `mcp-execution-agent` used for all MCP operations

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
/orchestrate command (OPTIMIZED - Direct Execution)
  │
  ├─→ Parse arguments (workflow name, parameters)
  │
  ├─→ Load workflow YAML from workflows/ (lazy loading)
  │
  ├─→ Execute phases directly in command context:
  │   - Orchestrator operations (fetch_linear, analyze, cmd, mount, cleanup, update_linear)
  │   - Specialist agent delegations (explicit format with sequence numbers)
  │   - Parallel execution management (delegations returned)
  │   - Error handling & recovery
  │
  ├─→ Return complete execution plan:
  │   - All discovered data
  │   - Explicit delegations array (agent, context, sequence, parallel)
  │   - Execution trace
  │   - Status (success/error/partial)
  │
  └─→ Main orchestrator executes delegations:
      - Group by sequence number
      - Launch same-sequence agents in parallel
      - Collect results and sub-delegations
      - Merge data for next phase
      - Continue until complete

NOTE: Previous versions delegated to orchestrator agent.
      This version processes directly (saves 1,100 tokens per workflow - 24% improvement).
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
