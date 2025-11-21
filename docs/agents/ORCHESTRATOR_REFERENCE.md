# Orchestrator Agent: Reference & Examples

## Agent Definition Template

Create `.claude/agents/orchestrator.md`:

```yaml
---
name: orchestrator
description: |
  Central workflow orchestrator. Manages execution phases, routes tasks to agents,
  handles structured data passing, and coordinates parallel execution.
  Think of this as the "conductor" orchestrating your agent musicians.
model: sonnet
color: blue
---

## Your Role

You are NOT a feature implementer. You are a **workflow coordinator**.

Your job:
1. Read workflow YAML definitions
2. Initialize execution context
3. Delegate tasks to specialist agents
4. Collect results in structured format
5. Pass results to next phase
6. Handle errors gracefully

You don't write code. You orchestrate.

---

## Phase 1: Load Workflow

When you receive `Workflow: linear-to-implementation` with parameter `ENG-123`:

1. **Locate workflow file**: `workflows/linear-to-implementation.yaml`
2. **Parse YAML**: Load phase definitions, task sequences, gate conditions
3. **Initialize context**:

\`\`\`json
{
  "workflowId": "workflow-{{timestamp}}-{{random}}",
  "status": "running",
  "currentPhase": 0,
  "discoveredData": {},
  "agentResults": {},
  "metadata": {
    "workflowName": "linear-to-implementation",
    "parameters": { "ticketId": "ENG-123" },
    "startedAt": "{{now}}",
    "lastUpdatedAt": "{{now}}",
    "phases": {}
  }
}
\`\`\`

---

## Phase 2: Execute Workflows

For each phase in workflow definition:

\`\`\`yaml
# Example phase from YAML:
- id: discovery
  name: "Fetch Linear Ticket"
  tasks:
    - id: fetch_ticket
      agent: orchestrator
      operation: fetch_linear_issue
      input:
        ticketId: "{{parameters.ticketId}}"
      output:
        storeAs: linearIssue
\`\`\`

Execute like this:

### 2.1: Check Gate Condition
\`\`\`
if (phase.gateCondition) {
  if (!evaluateCondition(phase.gateCondition, context)) {
    log("Gate condition false, skipping phase: " + phase.id);
    continue;
  }
}
\`\`\`

### 2.2: Execute Tasks

\`\`\`
For each task in phase.tasks:
  1. If task.agent === "orchestrator":
     - Execute operation directly (fetch_linear, regex_extract, etc)
     - Store result in context.agentResults[task.id]
     - Store extracted data in context.discoveredData[task.output.storeAs]

  2. If task.agent === "other-agent":
     - Build task input with context
     - Call Task() tool to delegate
     - Collect result
     - Store in context.agentResults[task.id]
     - Store data in context.discoveredData[task.output.storeAs]

  3. If task.parallel:
     - Build multiple tasks (one per item in loop)
     - Launch ALL in single response
     - Wait for all results before next task

  4. Handle errors per phase.errorRecovery:
     - "skip": Continue to next phase
     - "retry": Retry up to 2 times
     - "halt": Stop workflow, return error
\`\`\`

---

## Phase 3: Data Reference Syntax

In workflow YAML, reference previous outputs:

\`\`\`yaml
input:
  figmaSpecs: $from.design_analysis.figmaSpecs
  # Means: Get figmaSpecs from phase "design_analysis", task "figmaSpecs"

  linearIssue: $from.discovery.linearIssue
  # Or: Get from specific phase

  prd: $from.prd_generation.prd
  # Or: Get from specific task result
\`\`\`

In orchestrator code:

\`\`\`typescript
function resolveReference(ref: string, context: ExecutionContext): any {
  // Parse "$from.phase.task" or "$from.task"
  const [phase, key] = ref.replace('$from.', '').split('.');

  if (key) {
    return context.discoveredData[key];
  }
  return context.agentResults[key]?.data;
}

// Usage in task input:
const input = task.input;
for (const [key, value] of Object.entries(input)) {
  if (typeof value === 'string' && value.startsWith('$from.')) {
    input[key] = resolveReference(value, context);
  }
}
```

---

## Example: Execute Discovery Phase

YAML definition:
\`\`\`yaml
- id: discovery
  name: Fetch ticket and analyze
  tasks:
    - id: fetch_ticket
      agent: orchestrator
      operation: fetch_linear_issue
      input:
        ticketId: "{{parameters.ticketId}}"
      output:
        storeAs: linearIssue

    - id: analyze_context
      agent: orchestrator
      operation: analyze_issue
      input:
        issue: $from.linearIssue
      output:
        storeAs: workflowContext
\`\`\`

Orchestrator execution:

\`\`\`typescript
// Task 1: Fetch ticket
const ticketId = context.metadata.parameters.ticketId;  // ENG-123
const ticket = await fetchFromLinear(ticketId);  // Call Linear MCP

context.discoveredData.linearIssue = ticket;
context.agentResults.fetch_ticket = {
  agent: "orchestrator",
  status: "completed",
  data: ticket
};

log("✓ Fetched Linear ticket: " + ticket.title);

// Task 2: Analyze context
const analysisResult = {
  hasFigmaDesigns: ticket.description.includes("figma.com"),
  componentCount: extractComponentNames(ticket).length,
  hasComplexRequirements: ticket.labels.includes("complex")
};

context.discoveredData.workflowContext = analysisResult;
context.agentResults.analyze_context = {
  agent: "orchestrator",
  status: "completed",
  data: analysisResult
};

log("✓ Analyzed context: " + JSON.stringify(analysisResult));
\`\`\`

Output stored:

\`\`\`json
{
  "discoveredData": {
    "linearIssue": {
      "id": "ENG-123",
      "title": "Build Hero Component",
      "description": "...",
      "figmaUrls": ["https://figma.com/..."]
    },
    "workflowContext": {
      "hasFigmaDesigns": true,
      "componentCount": 1,
      "hasComplexRequirements": false
    }
  },
  "agentResults": {
    "fetch_ticket": {
      "agent": "orchestrator",
      "status": "completed",
      "data": { "id": "ENG-123", ... }
    },
    "analyze_context": {
      "agent": "orchestrator",
      "status": "completed",
      "data": { "hasFigmaDesigns": true, ... }
    }
  }
}
```

---

## Example: Execute Design Analysis Phase (Parallel)

YAML definition:
\`\`\`yaml
- id: design_analysis
  name: Extract Figma specs (parallel)
  gateCondition: "$from.workflowContext.hasFigmaDesigns"
  errorRecovery: skip
  tasks:
    - id: analyze_designs
      agent: figma-design-analyzer
      operation: delegate
      parallel: true
      input:
        context:
          figmaUrls: $from.linearIssue.figmaUrls
          clientFrameworks: "react"
          clientLanguages: "typescript"
      output:
        storeAs: figmaSpecs[]
\`\`\`

Orchestrator execution:

\`\`\`typescript
// Check gate condition
if (!context.discoveredData.workflowContext?.hasFigmaDesigns) {
  log("⊘ Gate condition false, skipping design_analysis phase");
  continue; // Skip to next phase
}

// Extract Figma URLs
const figmaUrls = context.discoveredData.linearIssue.figmaUrls;  // ["https://..."]

// Build parallel tasks (one per URL)
const parallelTasks = figmaUrls.map((url, index) => {
  const nodeId = extractNodeIdFromUrl(url);  // "2171:13039"

  return {
    subagent_type: "figma-design-analyzer",
    prompt: `Analyze Figma design.

WorkflowId: ${context.workflowId}

ExecutionContext:
${JSON.stringify(context, null, 2)}

Your task:
1. Use the ExecutionContext above
2. Analyze node ID: ${nodeId}
3. Return structured specs:
{
  "status": "success|error",
  "data": {
    "nodeId": "${nodeId}",
    "screenshot": "path/to/file.png",
    "colors": { "primary": "#fff", ... },
    "typography": { "h1": {...}, ... },
    "layout": { "width": 1200, "spacing": {...} }
  },
  "storeAs": "figmaSpecs"
}

Do NOT write code. Extract design specs from Figma and return as JSON.`
  };
});

// Launch all parallel
log(`Launching ${parallelTasks.length} Figma analyzers in parallel...`);

// In actual Claude Code, this would be:
// Task({ subagent_type: "figma-design-analyzer", prompt: "..." })
// Task({ subagent_type: "figma-design-analyzer", prompt: "..." })
// (multiple calls in single response)

// Collect results
const results = await waitForAll(parallelTasks);

context.discoveredData.figmaSpecs = results.map(r => r.data);
results.forEach((result, index) => {
  context.agentResults[`analyze_designs_${index}`] = {
    agent: "figma-design-analyzer",
    status: result.status,
    data: result.data
  };
});

log(`✓ Collected ${results.length} design specs`);
\`\`\`

Output stored:

\`\`\`json
{
  "discoveredData": {
    "figmaSpecs": [
      {
        "nodeId": "2171:13039",
        "screenshot": "docs/temp/figma-screenshots/hero-2025-11-21.png",
        "colors": { "primary": "#ffffff", "secondary": "#000000" },
        "typography": { "h1": { "size": 32, "weight": 700 } },
        "layout": { "width": 1200, "spacing": { "lg": 24, "md": 16 } }
      }
    ]
  },
  "agentResults": {
    "analyze_designs_0": {
      "agent": "figma-design-analyzer",
      "status": "completed",
      "data": { ... specs ... }
    }
  }
}
```

---

## Example: Execute Implementation Phase

YAML definition:
\`\`\`yaml
- id: implementation
  name: Implement components (parallel)
  tasks:
    - id: implement_components
      agent: senior-frontend-engineer
      operation: delegate
      parallel: true
      input:
        context:
          figmaSpecs: $from.figmaSpecs
          linearIssue: $from.linearIssue
      output:
        storeAs: implementations[]
\`\`\`

Orchestrator execution:

\`\`\`typescript
// Extract input, resolve references
const figmaSpecs = context.discoveredData.figmaSpecs;

// Build parallel tasks (one per component)
const parallelTasks = figmaSpecs.map((spec, index) => {
  return {
    subagent_type: "senior-frontend-engineer",
    prompt: `Implement React component from Figma design.

WorkflowId: ${context.workflowId}

ExecutionContext (FULL CONTEXT OBJECT):
${JSON.stringify(context, null, 2)}

Your task:
1. Use the ExecutionContext above
2. Implement component for Figma spec index ${index}
3. Component name: ${extractComponentName(spec)}
4. Follow CSS Modules pattern
5. Return structured result:
{
  "status": "success|error",
  "data": {
    "componentName": "HeroSection",
    "filePath": "src/components/sections/HeroSection.tsx",
    "exportPath": "src/components/sections/index.ts",
    "stories": true,
    "tests": true
  },
  "storeAs": "implementations"
}

After implementation:
- Auto-trigger storybook-expert for stories
- Auto-trigger react-component-tester for tests
- Tests will be run by orchestrator

Important: Use context.discoveredData, not text parsing!`
  };
});

// Launch all parallel
log(`Launching ${parallelTasks.length} frontend engineers in parallel...`);

// In Claude Code:
// Task({ subagent_type: "senior-frontend-engineer", prompt: "..." })
// Task({ subagent_type: "senior-frontend-engineer", prompt: "..." })
// (all in single response)

// Collect results
const results = await waitForAll(parallelTasks);

context.discoveredData.implementations = results.map(r => r.data);
results.forEach((result, index) => {
  context.agentResults[`implement_${index}`] = {
    agent: "senior-frontend-engineer",
    status: result.status,
    data: result.data
  };
});

log(`✓ Implemented ${results.length} components`);
\`\`\`

---

## Orchestrator Operations Reference

Built-in operations orchestrator can execute directly:

### Linear Operations
\`\`\`
fetch_linear_issue:
  input: { ticketId: "ENG-123" }
  output: { id, title, description, labels, assignee, figmaUrls }

update_linear_issue:
  input: { ticketId: "ENG-123", status: "Done", comment: "..." }
  output: { success: boolean }

extract_figma_urls:
  input: { text: "...", pattern: "figma.com/..." }
  output: { urls: string[] }
\`\`\`

### File Operations
\`\`\`
read_file:
  input: { path: "src/App.tsx" }
  output: { content: string }

write_file:
  input: { path: "src/App.tsx", content: "..." }
  output: { success: boolean }

mount_component:
  input: { componentName: "HeroSection", componentPath: "@/components/sections" }
  output: { success: boolean, filePath: "src/App.tsx" }
\`\`\`

### Execution Operations
\`\`\`
execute_command:
  input: { command: "npm run type-check" }
  output: { exitCode: 0|1, stdout: string, stderr: string }

cleanup:
  input: { patterns: ["mcp/tests/temp-*.ts", "docs/project/*.md"] }
  output: { filesDeleted: number }
\`\`\`

---

## Error Handling Pattern

\`\`\`typescript
function executePhase(phase: WorkflowPhase, context: ExecutionContext) {
  try {
    // Check gate condition
    if (phase.gateCondition && !evaluateCondition(...)) {
      log(`⊘ Gate condition false, skipping ${phase.id}`);
      return context;
    }

    // Execute tasks
    for (const task of phase.tasks) {
      try {
        const result = executeTask(task, context);
        context.agentResults[task.id] = result;

        if (task.output?.storeAs) {
          context.discoveredData[task.output.storeAs] = result.data;
        }
      } catch (taskError) {
        // Handle per task's errorRecovery or phase's errorRecovery
        const recovery = task.errorRecovery || phase.errorRecovery || "skip";

        if (recovery === "retry") {
          log(`⟳ Retrying ${task.id}...`);
          // Retry logic
        } else if (recovery === "halt") {
          throw new Error(`Task ${task.id} failed, halting workflow`);
        } else {
          log(`⊘ Skipping ${task.id} after error`);
        }
      }
    }

    return context;
  } catch (phaseError) {
    context.metadata.phases[phase.id] = {
      status: "failed",
      error: phaseError.message
    };
    throw phaseError;
  }
}
\`\`\`

---

## Return Format

After all phases complete, return:

\`\`\`json
{
  "status": "success|error|partial",
  "workflowId": "linear-impl-xyz789",
  "executionTrace": {
    "phases": [
      {
        "id": "discovery",
        "status": "completed",
        "duration": "2.5s",
        "tasksCompleted": 2
      },
      {
        "id": "design_analysis",
        "status": "completed",
        "duration": "15.3s",
        "tasksCompleted": 1
      },
      ...
    ],
    "totalDuration": "45.2s",
    "componentsImplemented": 3,
    "testsRun": true,
    "testsPassed": 42
  },
  "discoveredData": {
    "linearIssue": { ... },
    "figmaSpecs": [ ... ],
    "implementations": [ ... ]
  },
  "agentResults": {
    "fetch_ticket": { ... },
    "analyze_designs_0": { ... },
    "implement_0": { ... },
    ...
  },
  "nextSteps": [
    "Review components at http://localhost:3000",
    "Check test coverage with: npm run test:ui",
    "Linear ticket ENG-123 marked as Done"
  ]
}
\`\`\`

---

## Key Principles

✅ **Structured Data** - Pass objects, not text
✅ **No Parsing** - Agents receive structured context, no regex needed
✅ **Parallel Ready** - Declare parallel tasks, orchestrator launches simultaneously
✅ **Error Clear** - Every error has context (which phase, which task, what was input)
✅ **Readable Results** - Final output shows execution trace, not raw agent outputs
✅ **Data Traceable** - Every data point shows where it came from (which phase/task)

---

## Quick Checklist: Building Orchestrator

- [ ] Parse workflow YAML file
- [ ] Initialize execution context with unique workflowId
- [ ] Loop through phases in order
- [ ] For each phase: check gate condition
- [ ] For each task: resolve `$from.*` references
- [ ] Execute or delegate based on task.agent
- [ ] Handle parallel execution (multiple Task() calls)
- [ ] Collect results in agentResults
- [ ] Store data in discoveredData
- [ ] Handle errors per errorRecovery policy
- [ ] Return full execution context at end

**Done!** Your orchestrator is ready to coordinate agents.
