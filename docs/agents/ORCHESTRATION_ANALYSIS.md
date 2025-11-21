# Agent Orchestration Analysis & Optimization Plan

## Executive Summary

Your current agent setup has good foundational structure but lacks a **unified orchestration layer** for seamless data flow and cross-agent communication. This document identifies the gaps and proposes a standardized orchestration pattern inspired by industry best practices.

---

## Part 1: Analysis of External Examples (VoltAgent Patterns)

### Key Insights from Frontend-Developer Agent

**Pattern 1: Three-Phase Execution Model**
```
Phase 1: Context Discovery
  ↓ (Centralized context gathering)
Phase 2: Autonomous Execution
  ↓ (Specialists work independently with context)
Phase 3: Handoff & Reporting
  ↓ (Update central knowledge base)
```

**Pattern 2: Structured Data Interchange**
- Agents communicate via **structured JSON messages**, not free-form prompts
- Central `context-manager` agent acts as knowledge repository
- Agents query context, receive structured data, process locally
- Only final results flow back to orchestrator

**Pattern 3: Cross-Agent Collaboration**
```
frontend-developer receives:
├── UI specs (from ui-designer agent)
├── API contracts (from backend-developer agent)
├── Security requirements (from security-auditor agent)
└── Database schema (from database-optimizer agent)
```
- Multiple agents contribute data to a single implementation task
- Data merges at orchestration level before hand-off to specialist

**Pattern 4: Smart Sequencing**
- "Leverage context data before asking users"
- Agents upfront gather all needed context
- Reduces back-and-forth communication
- Enables parallel execution where possible

---

## Part 2: Current State Analysis

### What You Have (✅ Strengths)

| Component | Status | Notes |
|-----------|--------|-------|
| Role-specific agents | ✅ | 10 agents with clear responsibilities |
| Parallel execution | ✅ | Multiple agents in single message supported |
| MCP centralization | ✅ | mcp-execution-agent gates all MCP calls |
| Procedural workflows | ✅ | 3 commands structure end-to-end flows |
| Data embedding | ✅ | Specs passed directly in prompts |

### What's Missing (❌ Gaps)

| Gap | Impact | Severity |
|-----|--------|----------|
| **No structured inter-agent messaging** | Agents can't discover available data without manual prompting | HIGH |
| **No central context/memory system** | Each agent starts from scratch, no cross-command state | HIGH |
| **Linear procedural commands** | Commands are step-by-step bash scripts, not orchestrator patterns | MEDIUM |
| **No agent-to-agent data passing** | All data flows through commands, never agent-to-agent | MEDIUM |
| **No progress/status tracking** | Hard to see what happened in multi-agent workflows | MEDIUM |
| **No dynamic agent routing** | Commands hardcode agent order, can't adapt | LOW |
| **No workflow memory/resumption** | Can't pause and resume workflows cleanly | LOW |

### Specific Problem: Current Command Flow

**Current `/implement-linear` pattern:**
```
User Input
  ↓
Command reads Linear ticket (bash)
  ↓
Command extracts design URLs (bash)
  ↓
Command launches figma-design-analyzer (hardcoded sequence)
  ↓
Command collects specs (text parsing)
  ↓
Command launches senior-frontend-engineer (hardcoded sequence)
  ↓
... (repeats for each step)
```

**Problems:**
- Orchestration logic lives in command markdown, hard to update
- Data passing is string-based (markdown parsing, text regex)
- No way for agents to request data from other agents
- Can't dynamically route based on what agents need

---

## Part 3: Proposed Orchestration Architecture

### New Architecture: Orchestrator + Structured Data Layer

```
┌─────────────────────────────────────────────────┐
│         ORCHESTRATOR AGENT                      │
│  (Central controller, workflow manager)         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │   Execution Context (Structured Data)     │  │
│  │  ─────────────────────────────────────── │  │
│  │  - workflowId, status, phase             │  │
│  │  - discoveredData (figma specs, etc)     │  │
│  │  - results from each agent               │  │
│  │  - errors & fallbacks                    │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │   Workflow Engine                         │  │
│  │  ─────────────────────────────────────── │  │
│  │  - Phase orchestration (discovery →      │  │
│  │    implementation → verification)        │  │
│  │  - Conditional routing                   │  │
│  │  - Parallel/sequential execution         │  │
│  │  - Error handling & recovery             │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │   Agent Interface Layer                   │  │
│  │  ─────────────────────────────────────── │  │
│  │  - Task delegation with context          │  │
│  │  - Result collection                     │  │
│  │  - Structured data passing               │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
        ↓         ↓         ↓         ↓
   Agent       Agent     Agent     Agent
   (figma)   (design)  (frontend) (test)
```

### Key Components

#### 1. **Execution Context** (Structured State)
```typescript
interface ExecutionContext {
  workflowId: string;
  status: 'initialization' | 'discovery' | 'implementation' | 'verification' | 'complete';
  phase: number;

  // Discovered data (available to all agents)
  discoveredData: {
    linearIssue?: {
      id: string;
      title: string;
      description: string;
      figmaUrls?: string[];
    };
    figmaSpecs?: {
      nodeId: string;
      screenshot: string;
      colors: Record<string, string>;
      typography: Record<string, string>;
      layout: {
        width: number;
        height: number;
        spacing: Record<string, number>;
      };
    }[];
    prd?: {
      requirements: string;
      successCriteria: string;
      technicalNotes: string;
    };
  };

  // Agent results
  agentResults: Record<string, {
    agent: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    data: any;
    error?: string;
  }>;

  // Workflow metadata
  metadata: {
    startedAt: Date;
    lastUpdatedAt: Date;
    command: string; // which command triggered this
    parameters: Record<string, any>;
  };
}
```

#### 2. **Workflow Phases**

Each command defines phases that execute in order:

```typescript
interface WorkflowPhase {
  name: string;
  type: 'discovery' | 'processing' | 'implementation' | 'verification';
  tasks: Task[];
  gateConditions?: (context: ExecutionContext) => boolean;
  errorRecovery?: 'skip' | 'retry' | 'halt';
}

interface Task {
  id: string;
  agent: string;
  operation: 'delegate' | 'execute' | 'validate';
  input: {
    prompt: string;
    context: ExecutionContext;
    expectations?: string[]; // what data we expect back
  };
  output: {
    format: 'json' | 'text' | 'structured';
    storeAs: string; // key in discoveredData or agentResults
  };
  parallel?: boolean;
  timeout?: number;
}
```

#### 3. **Agent Discovery & Self-Registration**

Agents can declare what data they need and what they produce:

```typescript
// In each agent metadata
interface AgentSignature {
  name: string;
  version: string;

  provides: {
    // What this agent can produce
    figmaSpecs: 'extracted design specs from Figma';
    screenshot: 'visual screenshot of design';
  };

  requires: {
    // What this agent needs as input
    nodeId: 'Figma node ID (format: XXXX:XXXX)';
    clientFrameworks?: 'target framework (react, vue, etc)';
  };

  outputs: {
    // Structure of what's returned
    screenshot: { type: 'file', path: 'string' };
    specs: { type: 'json', schema: '...' };
  };
}
```

---

## Part 4: Improved Workflow Examples

### Example 1: Figma → Implementation (Optimized)

**Current (procedural):**
```
Step 1: Parse URLs
Step 2: [HARDCODED] Launch figma-design-analyzer
Step 3: [HARDCODED] Parse response text
Step 4: [HARDCODED] Launch senior-frontend-engineer
... etc
```

**Optimized (orchestrator-driven):**
```yaml
workflow: "figma-to-implementation"
phases:
  - name: "discovery"
    tasks:
      - id: "parse_urls"
        agent: "orchestrator"
        operation: "execute"

      - id: "analyze_designs"
        agent: "figma-design-analyzer"
        operation: "delegate"
        parallel: true  # Multiple designs in parallel
        input:
          context: { figmaUrls: [array] }
        output:
          storeAs: "figmaSpecs"

  - name: "implementation"
    gateCondition: "figmaSpecs not empty"
    tasks:
      - id: "implement_components"
        agent: "senior-frontend-engineer"
        operation: "delegate"
        parallel: true  # Each component in parallel
        input:
          context: { figmaSpecs: $from.discovery.figmaSpecs }
        output:
          storeAs: "implementationResults"

      - id: "auto_test"
        agent: [storybook-expert, react-component-tester]
        operation: "delegate"
        parallel: true
        # Auto-triggered by senior-frontend-engineer result

  - name: "verification"
    tasks:
      - id: "visual_test"
        agent: "playwright-dev-tester"
        operation: "delegate"
        input:
          context: { figmaSpecs: $from.discovery.figmaSpecs }

  - name: "integration"
    tasks:
      - id: "mount_app"
        agent: "orchestrator"
        operation: "execute"
        # Mount all components in App.tsx
```

**Benefits:**
- Workflow is data-driven YAML, not bash procedures
- Agents receive structured context, not text prompts
- Parallel execution declared explicitly
- Gate conditions make logic clear
- Easy to add new agents or modify sequence

### Example 2: Linear → Implementation (Optimized)

**Old flow:**
- Fetch Linear → Parse JSON to text → Embed in prompt → Agent receives as text → Parses again

**New flow:**
- Fetch Linear → Structured context object → Agents access directly

---

## Part 5: Implementation Roadmap

### Phase 1: Core Orchestrator Agent (Week 1)
- [ ] Create `orchestrator` agent with structured execution context
- [ ] Implement workflow phase engine
- [ ] Add task delegation with context passing
- [ ] Handle parallel execution and sequencing

### Phase 2: Update Command Syntax (Week 1-2)
- [ ] Convert 3 existing commands to new format
- [ ] Create workflow YAML definitions
- [ ] Test backwards compatibility

### Phase 3: Agent Self-Registration (Week 2)
- [ ] Define agent signature interface
- [ ] Update each agent with metadata
- [ ] Add agent discovery in orchestrator

### Phase 4: Data Passing & Memory (Week 2-3)
- [ ] Structured data objects vs. text embedding
- [ ] Cross-workflow state persistence (if needed)
- [ ] Error recovery & retry logic

### Phase 5: Advanced Routing (Week 3)
- [ ] Conditional agent selection
- [ ] Dynamic parallelization based on dependencies
- [ ] Fallback agents and strategies

---

## Part 6: Benefits of New Architecture

### For Users
✅ **Clearer workflows** - See exactly what agents are running and in what order
✅ **Better error messages** - Structured errors vs. text parsing failures
✅ **Resumable workflows** - Can pause and continue (future)
✅ **Progress tracking** - Real-time visibility into multi-agent execution

### For Developers
✅ **Workflow as data** - YAML definitions instead of bash scripts
✅ **Agent reusability** - Agents focused on inputs/outputs, not workflow logic
✅ **Type safety** - Structured context prevents data mismatches
✅ **Testing** - Easy to test orchestration logic in isolation
✅ **Composability** - Build complex workflows from simple building blocks

### For System
✅ **Context efficiency** - Data processed locally by agents, not in LLM context
✅ **Parallel execution** - Better resource utilization
✅ **Error recovery** - Automatic retries and fallbacks
✅ **Maintainability** - Centralized workflow logic vs. scattered in commands

---

## Part 7: Specific Recommendations

### Immediate Actions (Quick Wins)

1. **Create Orchestrator Agent**
   - Port `/implement-linear` workflow to orchestrator
   - Pass structured context instead of embedded text
   - Test with real Linear ticket

2. **Update Agents' Input Handlers**
   - All agents should expect structured context object
   - Parse context at start: `const { figmaSpecs, prd } = context.discoveredData`
   - Return structured output (not raw text)

3. **Create Workflow Definitions**
   ```yaml
   # workflows/figma-to-implementation.yaml
   name: figma-to-implementation
   description: Convert Figma designs to React components
   phases: [...]
   ```

### Medium-Term (Architecture)

4. **Agent Registry System**
   - Store agent signatures in `.claude/agents/registry.json`
   - Orchestrator auto-discovers available agents
   - Agents declare dependencies and outputs

5. **Context Persistence**
   - Save execution context to JSON files
   - Allow workflows to resume from checkpoints
   - Enable cross-workflow state passing

6. **Enhanced Error Handling**
   - Structured error types (ValidationError, TimeoutError, etc)
   - Automatic retry logic with exponential backoff
   - Fallback agent strategies

### Long-Term (Maturity)

7. **Workflow Composition**
   - Combine workflows into meta-workflows
   - Share patterns across teams
   - Version workflows

8. **Agent Learning**
   - Track agent performance metrics
   - Optimize agent selection based on success rates
   - Route to best agent for task type

---

## Part 8: Example: New Orchestrator Command

```yaml
---
description: Universal orchestrator for all workflows (Linear → PRD → Design → Implementation → Test)
---

# Orchestrator Pattern: Unified Workflow Engine

## When to Use

Use this orchestrator for any multi-step workflow:
- Linear ticket to implementation
- Figma designs to components
- PRD creation with implementation
- Any multi-agent task

## Usage

```bash
# Run with workflow definition
/orchestrate figma-to-implementation --urls "https://figma.com/..."
/orchestrate linear-to-implementation --ticket "ENG-123"
/orchestrate prd-with-implementation --requirements "Build auth..."
```

## How It Works

1. **Initialize** - Create execution context with parameters
2. **Discover** - Run discovery phase (fetch data, analyze)
3. **Process** - Process discovered data (optional PRD generation)
4. **Implement** - Parallel agent execution with context
5. **Verify** - Test and validate
6. **Complete** - Final reporting

## Workflow Definition (YAML)

See `workflows/` directory for available definitions.

Each workflow specifies:
- Phases and their order
- Tasks and which agents run them
- Gate conditions (if X discovered, then run Y)
- Parallel execution strategy
- Error handling & recovery

## Agent Context Format

All agents receive:
```json
{
  "workflowId": "abc123",
  "phase": "implementation",
  "discoveredData": {
    "linearIssue": { ... },
    "figmaSpecs": [ ... ],
    "prd": { ... }
  },
  "metadata": { ... }
}
```

Agents parse context at start:
```typescript
const { figmaSpecs, prd, linearIssue } = context.discoveredData;
```

## Result Format

Agents return structured results:
```json
{
  "status": "success|error",
  "data": { ... specific to agent ... },
  "storeAs": "implementationResults",
  "next": "verification"
}
```

## New Agent Signatures

Update all agents with:
```typescript
// In agent metadata
provides: {
  componentCode: "React component implementation",
  stories: "Storybook stories"
}

requires: {
  figmaSpecs: "Design specifications from Figma",
  prd: "(optional) Product requirements"
}
```

## Custom Workflow Creation

Create new workflows in `workflows/` directory:
```yaml
name: custom-workflow
phases:
  - name: discovery
    tasks: [...]
  - name: implementation
    tasks: [...]
```

Then use:
```bash
/orchestrate custom-workflow --input "..."
```
```

---

## Summary: What Changes

| Current | → | Optimized |
|---------|---|-----------|
| **Commands** are bash scripts | → | Commands define **workflow YAML** |
| **Data** embedded in text prompts | → | **Structured context objects** |
| **Agents** receive text, parse it | → | Agents receive structured data |
| **Sequencing** hardcoded in commands | → | **Phases declare dependencies** |
| **Parallelization** manual | → | **Automatic based on declarations** |
| **Error handling** scattered | → | **Centralized in orchestrator** |
| **Agent discovery** manual | → | **Self-registering via signatures** |

---

## Next Steps

1. **Review** this analysis with the team
2. **Pilot** orchestrator with one workflow (`/implement-linear`)
3. **Test** structured data passing vs. text embedding
4. **Refactor** commands to use new pattern
5. **Document** for team usage
