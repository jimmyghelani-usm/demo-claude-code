# Agent Orchestration & Optimization

This directory contains analysis and guides for optimizing your agent system's orchestration and data flow.

## Start Here

**New to this?** Read in this order:

1. **[ORCHESTRATION_COMPARISON.md](ORCHESTRATION_COMPARISON.md)** ⭐ START HERE
   - Before/after comparison of current vs. proposed system
   - Visual examples showing the difference
   - 10-minute read to understand the problem

2. **[ORCHESTRATION_ANALYSIS.md](ORCHESTRATION_ANALYSIS.md)** - Deep Dive
   - Complete architectural analysis
   - Gaps in current system identified
   - Benefits of new architecture
   - Detailed roadmap (30-minute read)

3. **[IMPLEMENTATION_QUICK_START.md](IMPLEMENTATION_QUICK_START.md)** - Get Started
   - What to build (priority order)
   - Implementation timeline
   - Key files to create/update
   - Common questions answered (15-minute read)

4. **[ORCHESTRATOR_REFERENCE.md](ORCHESTRATOR_REFERENCE.md)** - Reference
   - Concrete code examples
   - Phase execution walkthrough
   - Error handling patterns
   - (Keep as reference while building)

---

## TL;DR: The Problem & Solution

### Current State ❌
```
Commands are bash scripts with procedural steps.
Data is embedded as text in prompts.
Agents parse text to extract data.
No clear separation between workflow logic and agent work.
```

### Proposed State ✅
```
Commands define YAML workflows.
Data is structured JSON objects.
Agents receive context directly.
Clear separation: orchestrator handles flow, agents focus on work.
```

---

## Key Documents by Use Case

### I want to understand the gaps
→ Read: **ORCHESTRATION_ANALYSIS.md** (Part 2: Current State Analysis)

### I want to see side-by-side examples
→ Read: **ORCHESTRATION_COMPARISON.md** (Before & After section)

### I want to start implementing
→ Read: **IMPLEMENTATION_QUICK_START.md** (Priority Order section)

### I need reference code
→ Read: **ORCHESTRATOR_REFERENCE.md** (Examples & operations)

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Create orchestrator agent
- [ ] Create first workflow YAML
- [ ] Create `/orchestrate` command
- **Result:** Single command runs entire workflow

### Phase 2: Integration (Week 2)
- [ ] Update agents to handle structured context
- [ ] Test with real Linear ticket
- [ ] Fix integration issues
- **Result:** Agents receive proper data structures

### Phase 3: Expansion (Week 3)
- [ ] Convert other commands to orchestrator pattern
- [ ] Create workflow definitions
- [ ] Update CLAUDE.md
- **Result:** All workflows use new pattern

### Phase 4: Polish (Week 4)
- [ ] Gather team feedback
- [ ] Refine workflow definitions
- [ ] Document patterns
- **Result:** Team-ready orchestration system

---

## What Gets Created

### New Files
```
.claude/agents/orchestrator.md              # New orchestration agent
.claude/commands/orchestrate.md             # New command

workflows/                                  # New directory
  linear-to-implementation.yaml
  figma-to-implementation.yaml
  prd-with-implementation.yaml
```

### Updated Files
```
.claude/agents/
  - senior-frontend-engineer.md
  - figma-design-analyzer.md
  - react-component-tester.md
  - storybook-expert.md
  - playwright-dev-tester.md
  - prd-writer.md
  (all updated to handle structured context)
```

---

## Core Concepts

### Execution Context
Every agent receives the same structured object containing:
- Discovered data (figma specs, linear issue, prd)
- Results from previous phases
- Workflow metadata

**Example:**
```json
{
  "workflowId": "abc-123",
  "discoveredData": {
    "linearIssue": { ... },
    "figmaSpecs": [ ... ],
    "prd": { ... }
  },
  "agentResults": { ... }
}
```

### Workflow Phases
Each workflow defines phases that execute sequentially:
1. **Discovery** - Gather initial data
2. **Analysis** - Process and analyze
3. **Implementation** - Build components
4. **Verification** - Test and validate
5. **Completion** - Report results

Each phase can:
- Have gate conditions (skip if condition false)
- Run tasks in parallel
- Reference outputs from previous phases
- Define error recovery strategy

### Structured Data Passing
Instead of embedding text in prompts:
```
// Current (text embedding)
prompt: "PRD: [pasted text]\nFigma specs: [pasted text]"

// Proposed (structured passing)
context: { prd: {structured}, figmaSpecs: {structured} }
```

**Benefits:**
- No text parsing needed
- Type-safe data access
- Reduced LLM context usage
- Clearer data contracts

---

## Comparison: Current vs. Proposed

| Aspect | Current | Proposed |
|--------|---------|----------|
| **Entry point** | `/implement-linear` (bash steps) | `/orchestrate linear-implementation` (workflow YAML) |
| **Data flow** | Text embedding in prompts | Structured context objects |
| **Parallelization** | Manual in command | Declared in YAML |
| **Phase ordering** | Hardcoded steps | Dependency graph |
| **Error handling** | Scattered try-catch | Centralized with recovery |
| **Agent coupling** | High (agents depend on command logic) | Low (agents focus on inputs/outputs) |
| **Workflow testing** | Hard (embedded in commands) | Easy (YAML is testable) |
| **Context passing** | Implicit (parse from prompt text) | Explicit (structured object) |

---

## FAQ

**Q: Do I have to implement all of this?**
A: Start with orchestrator + one workflow. Others are optional but recommended.

**Q: Can I keep existing commands?**
A: Yes. New orchestrator works alongside old commands. Deprecate gradually.

**Q: What's the learning curve?**
A: Low. Main concept: workflows are YAML, agents receive structured context. That's it.

**Q: How much time does this take?**
A: Phase 1 (orchestrator + 1 workflow): 4-6 hours
Phase 2 (update agents): 4-6 hours
Phase 3 (convert other commands): 2-4 hours

**Q: What about backwards compatibility?**
A: Keep old commands initially. New orchestrator is parallel. No breaking changes.

**Q: Will this work with my current agents?**
A: With minor updates, yes. Agents need to expect structured context instead of text.

---

## Next Steps

1. **Read ORCHESTRATION_COMPARISON.md** (10 min)
   → Understand the problem and solution

2. **Read ORCHESTRATION_ANALYSIS.md** (30 min)
   → Learn the full architecture

3. **Read IMPLEMENTATION_QUICK_START.md** (15 min)
   → See what to build and in what order

4. **Start with Priority 1: Create Orchestrator Agent**
   → Use ORCHESTRATOR_REFERENCE.md as reference

5. **Test with real Linear ticket**
   → `/orchestrate linear-implementation ENG-123`

6. **Gather feedback and iterate**

---

## Support

### Understanding the Architecture
→ See **ORCHESTRATION_ANALYSIS.md** (Part 3: Proposed Architecture)

### Seeing Examples
→ See **ORCHESTRATION_COMPARISON.md** (Side-by-Side Examples)

### Building the Code
→ See **ORCHESTRATOR_REFERENCE.md** (Phase Execution Examples)

### Troubleshooting
→ See **IMPLEMENTATION_QUICK_START.md** (Common Questions section)

---

## Key Files Reference

- **ORCHESTRATION_ANALYSIS.md**: What needs to change and why (architecture deep-dive)
- **ORCHESTRATION_COMPARISON.md**: Before & after examples (visualization)
- **IMPLEMENTATION_QUICK_START.md**: What to build and when (roadmap)
- **ORCHESTRATOR_REFERENCE.md**: How to build it (code examples)
- **README.md**: This file (orientation and navigation)

---

## Key Principles

✅ **Workflows as Data** - YAML definitions instead of scattered code
✅ **Structured Context** - Agents receive objects, not parsed text
✅ **Clear Data Flow** - Every piece of data traces back to its source
✅ **Parallel Ready** - Tasks declared as parallel, orchestrator handles it
✅ **Error Clear** - Centralized error handling with recovery strategies
✅ **Agent Focus** - Agents focus on their job, orchestrator handles routing
✅ **Testability** - Workflow logic is separate from agent logic

---

**Ready to start?** Open **ORCHESTRATION_COMPARISON.md** now.
