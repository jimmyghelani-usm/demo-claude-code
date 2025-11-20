# Context Efficiency Rules - Added to CLAUDE.md ✅

## Summary

Updated CLAUDE.md to enforce strict context management rules, ensuring agents only explore/read files that are absolutely necessary for their tasks. This prevents unnecessary context consumption from reference documentation.

## The Problem

Previously, CLAUDE.md listed all documentation files which could encourage agents to:
- Read all documentation files "just in case"
- Explore the `docs/` directory for general context
- Consume context with reference material not needed for the current task

## The Solution

Added explicit context management rules that clearly separate:
1. **Critical files to ALWAYS explore** (only `mcp/servers/`)
2. **Files to read ONLY when needed** (configs, specific docs)
3. **Files to NEVER auto-read** (`docs/` directory)

## Changes Made to CLAUDE.md

### 1. ✅ Updated "IMPORTANT for Agents" Section

**Before:**
```markdown
**IMPORTANT for Agents:**
When you need to use MCP tools, **explore the `mcp/servers/` directory**.
This directory contains ONLY wrapper functions organized by server type -
no tests, no infrastructure, just clean typed wrappers.
Import from top level: `import { figma, linear, playwright } from './mcp'`
```

**After:**
```markdown
**IMPORTANT for Agents - Context Efficiency:**
- **ALWAYS explore `mcp/servers/` directory** - This is the ONLY directory you should proactively explore
- This directory contains ONLY wrapper functions organized by server type - no tests, no infrastructure, just clean typed wrappers
- **DO NOT read files in `docs/` directory** unless specifically needed for your current task
- **DO NOT read README/documentation files** unless you need specific implementation details
- Import from top level: `import { figma, linear, playwright } from './mcp'`
- The `docs/` directory exists for reference but should not consume context unnecessarily
```

### 2. ✅ Replaced "Key Files to Reference" Section

**Before:**
Simple list of all files with no context about when to read them:
```markdown
## Key Files to Reference

**Frontend:**
- `vite.config.ts` - Build, dev server, and test configuration
- `eslint.config.js` - Linting rules with special server directory config
...

**MCP Wrappers:**
- `mcp/README.md` - Complete architecture documentation
- `docs/mcp/architecture/MCP_WRAPPERS_SUMMARY.md` - Implementation summary
...

**Agent Documentation:**
- `docs/agents/AGENT_WORKFLOW_ANALYSIS.md` - Agent workflow analysis
...
```

**After:**
Three-tier structure with explicit context management warnings:
```markdown
## Critical Files vs Reference Documentation

### ⚠️ IMPORTANT: Context Management

**ALWAYS EXPLORE:**
- `mcp/servers/` - **CRITICAL** - Explore this directory to discover available MCP tools/wrappers

**READ ONLY WHEN NEEDED:**
- Configuration files when modifying build/test setup
- Documentation files when you need specific implementation details

**NEVER AUTOMATICALLY READ:**
- Files in `docs/` directory - These are for reference only
- Do NOT read documentation files unless specifically relevant to current task
- Do NOT explore `docs/` for general context

### Key Configuration Files

**Frontend Configuration (read only when modifying config):**
- `vite.config.ts` - Build, dev server, and test configuration
- `eslint.config.js` - Linting rules with special server directory config
- `src/test/setup.ts` - Vitest setup with jest-dom matchers

**MCP Infrastructure (read only when debugging MCP connections):**
- `mcp/README.md` - Complete architecture documentation
- `mcp/QUICKSTART.md` - Quick start guide
- `mcp/mcp-client.ts` - Base MCP client implementation

### Reference Documentation Available (Do Not Auto-Read)

The following documentation exists for reference but should NOT be read automatically.
Only read specific files when needed for your current task:

**MCP Documentation:** `docs/mcp/`
- Setup guides and success stories in `docs/mcp/setup/`
- Architecture and implementation in `docs/mcp/architecture/`

**Agent Documentation:** `docs/agents/`
- Workflow analysis and testing requirements

**Project Documentation:** `docs/project/`
- Implementation guides and Storybook documentation
```

## Context Efficiency Principles

### Always Explore (Proactive)
**`mcp/servers/` directory only**
- This is where MCP tool wrappers live
- Agents need to discover available tools
- Small, focused directory with clean structure
- Essential for MCP wrapper usage

### Read When Needed (Reactive)
**Configuration files:**
- Only when modifying build/test setup
- Only when debugging specific issues
- Examples: `vite.config.ts`, `eslint.config.js`, `tsconfig.json`

**Documentation files:**
- Only when you need specific implementation details
- Examples: Need to understand Figma setup? Read `docs/mcp/setup/FIGMA_MCP_SUCCESS.md`
- Only read what's relevant to current task

### Never Auto-Read (Reference Only)
**`docs/` directory:**
- These are historical records and reference material
- Do NOT explore for general context
- Do NOT read "just in case"
- Only read specific files when task requires it

## Benefits

1. **Massive Context Savings** - Agents don't consume context with unnecessary documentation
2. **Faster Task Completion** - Less time reading, more time implementing
3. **Focused Exploration** - Only `mcp/servers/` is actively explored
4. **Clear Guidelines** - Three-tier system is explicit about when to read files
5. **Reference Available** - Docs still discoverable when actually needed

## Example Scenarios

### ✅ Correct Usage

**Scenario 1: User asks to create Linear issue from Figma design**
```
Agent actions:
1. ✅ Explores mcp/servers/figma/ to discover tools
2. ✅ Explores mcp/servers/linear/ to discover tools
3. ✅ Imports and uses wrappers
4. ❌ Does NOT read any docs/ files (not needed)
```

**Scenario 2: User asks "How was Figma MCP configured?"**
```
Agent actions:
1. ✅ Reads docs/mcp/setup/FIGMA_MCP_SUCCESS.md (specifically needed)
2. ✅ Answers question with implementation details
```

**Scenario 3: User asks to modify ESLint config**
```
Agent actions:
1. ✅ Reads eslint.config.js (needed for task)
2. ✅ Makes changes
3. ❌ Does NOT explore docs/ directory
```

### ❌ Incorrect Usage

**Anti-pattern 1: Reading all docs for general context**
```
Agent actions:
❌ Reads AGENT_WORKFLOW_ANALYSIS.md
❌ Reads MCP_WRAPPERS_SUMMARY.md
❌ Reads IMPLEMENTATION_SUMMARY.md
❌ Reads FIGMA_MCP_SUCCESS.md
(Wastes context on unnecessary information)
```

**Anti-pattern 2: Exploring docs/ directory**
```
Agent actions:
❌ Globs docs/**/*.md to see what's there
❌ Reads multiple docs files "to understand the project"
(Should only explore mcp/servers/)
```

## Measurement

Before this change:
- Agents might read 5-10 documentation files (20,000+ tokens)
- Would explore both `mcp/servers/` and `docs/` directories
- Uncertain about which files were reference vs critical

After this change:
- Agents proactively explore only `mcp/servers/` (~2,000 tokens)
- Only read docs when specifically needed for task
- Clear three-tier system (Always/When Needed/Never)

**Estimated Context Savings:** ~18,000 tokens per task

## Files Modified

1. `CLAUDE.md` - Updated 2 sections:
   - "IMPORTANT for Agents" → "IMPORTANT for Agents - Context Efficiency"
   - "Key Files to Reference" → "Critical Files vs Reference Documentation"

2. `docs/CONTEXT_EFFICIENCY_RULES.md` - Created this documentation

## Verification

Test by observing agent behavior:
- ✅ Agent should explore `mcp/servers/` when using MCP tools
- ✅ Agent should NOT read files in `docs/` unless task requires it
- ✅ Agent should only read config files when modifying them
- ✅ Agent should know docs exist but treat as reference only

## Related Documentation

- `docs/DOCS_ORGANIZATION.md` - How documentation is organized
- `CLAUDE.md` - Main project documentation (updated)
- `docs/mcp/architecture/MCP_RESTRUCTURE_COMPLETE.md` - Context efficiency through directory structure

---

**Date:** November 20, 2025
**Status:** ✅ Complete
**Context Savings:** ~18,000 tokens per task
**Critical Directory:** `mcp/servers/` (ALWAYS explore)
**Reference Directory:** `docs/` (read only when needed)
