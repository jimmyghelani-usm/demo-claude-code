# MCP Directory Restructure Plan

## Current Structure (❌ Context-Heavy)

```
servers/
├── mcp-client.ts          # Core infrastructure
├── tests/                 # 15 test files
│   └── [many test files]
├── figma/                 # Figma wrappers
├── playwright/            # Playwright wrappers
├── linear/                # Linear wrappers
├── examples/              # Example workflows
├── index.ts               # Main exports
├── README.md
└── QUICKSTART.md
```

**Problem:** When agents explore `servers/`, they see tests, infrastructure, examples - too much noise!

## New Structure (✅ Context-Efficient)

```
mcp/
├── mcp-client.ts          # Core MCP client infrastructure
├── index.ts               # Main exports: { figma, playwright, linear }
├── README.md              # Main documentation
├── QUICKSTART.md          # Quick start guide
│
├── servers/               # ⭐ CLEAN - Only wrapper directories
│   ├── figma/            # Figma MCP wrappers
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── [tool files]
│   ├── playwright/       # Playwright MCP wrappers
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── [tool files]
│   └── linear/           # Linear MCP wrappers
│       ├── index.ts
│       ├── types.ts
│       └── [tool files]
│
├── tests/                # All test files isolated
│   ├── README.md
│   ├── test-simple.ts
│   ├── test-figma-with-client.ts
│   ├── test-linear-with-client.ts
│   └── [other test files]
│
└── examples/             # Example workflows
    ├── design-to-linear.ts
    └── browser-testing.ts
```

## Benefits

### 1. Context Efficiency
**Before:**
```typescript
// Agent exploring servers/ sees:
servers/
├── mcp-client.ts     ← Infrastructure (not needed for wrapper usage)
├── tests/            ← 15 test files (not needed)
├── figma/            ← Wrapper ✓
├── playwright/       ← Wrapper ✓
├── linear/           ← Wrapper ✓
└── examples/         ← Examples (nice but optional)
```

**After:**
```typescript
// Agent exploring mcp/servers/ sees ONLY:
mcp/servers/
├── figma/            ← Clean! Just wrappers
├── playwright/       ← Clean! Just wrappers
└── linear/           ← Clean! Just wrappers
```

### 2. Clear Purpose
- `mcp/` - MCP integration layer
- `mcp/servers/` - MCP server wrappers ONLY (clean exploration)
- `mcp/tests/` - Testing infrastructure (isolated)
- `mcp/examples/` - Usage examples (isolated)

### 3. Import Simplicity
```typescript
// Stays the same from project root
import { figma, playwright, linear } from './mcp/index.js';

// From within mcp/ directory
import { figma, playwright, linear } from './index.js';
```

## Migration Steps

1. ✅ Create `mcp/` directory
2. ✅ Move `servers/mcp-client.ts` → `mcp/mcp-client.ts`
3. ✅ Move `servers/index.ts` → `mcp/index.ts`
4. ✅ Move `servers/README.md` → `mcp/README.md`
5. ✅ Move `servers/QUICKSTART.md` → `mcp/QUICKSTART.md`
6. ✅ Move `servers/figma/` → `mcp/servers/figma/`
7. ✅ Move `servers/playwright/` → `mcp/servers/playwright/`
8. ✅ Move `servers/linear/` → `mcp/servers/linear/`
9. ✅ Move `servers/tests/` → `mcp/tests/`
10. ✅ Move `servers/examples/` → `mcp/examples/`
11. ✅ Update all import paths in moved files
12. ✅ Update documentation references
13. ✅ Update CLAUDE.md
14. ✅ Update agent files
15. ✅ Test everything works

## Import Path Updates

### Files in `mcp/` root
```typescript
// mcp/index.ts
export * as figma from './servers/figma/index.js';
export * as playwright from './servers/playwright/index.js';
export * as linear from './servers/linear/index.js';
```

### Files in `mcp/servers/*/`
```typescript
// mcp/servers/figma/index.ts
import { callMCPTool } from '../../mcp-client.js';  // Up two levels
```

### Test files in `mcp/tests/`
```typescript
// mcp/tests/test-simple.ts
import { linear } from '../index.js';  // Up one level to mcp/index.ts
import { getMCPClient } from '../mcp-client.js';  // Up one level
```

### Example files in `mcp/examples/`
```typescript
// mcp/examples/design-to-linear.ts
import { figma, linear } from '../index.js';  // Up one level
```

### External files (like agents)
```typescript
// From project root
import { figma, playwright, linear } from './mcp/index.js';
```

## CLAUDE.md Updates

Add this section to CLAUDE.md:

```markdown
### MCP Server Wrappers Architecture

**Directory Structure:**
```
mcp/
├── mcp-client.ts          # Core MCP client (don't explore this)
├── index.ts               # Main exports
├── servers/               # 🎯 EXPLORE THIS for available tools
│   ├── figma/            # Figma MCP wrappers
│   ├── playwright/       # Playwright MCP wrappers
│   └── linear/           # Linear MCP wrappers
├── tests/                # Test files (don't explore for usage)
└── examples/             # Usage examples (helpful reference)
```

**IMPORTANT for Agents:**
- When you need to use MCP tools, **explore `mcp/servers/` directory**
- This directory contains ONLY wrapper functions organized by server type
- Each server directory has clean, typed wrapper functions
- Import from top level: `import { figma, linear, playwright } from './mcp'`

**Available MCP Servers:**
1. **Figma** (`mcp/servers/figma/`) - 8 design tools
2. **Playwright** (`mcp/servers/playwright/`) - 25+ browser automation tools
3. **Linear** (`mcp/servers/linear/`) - 23 project management tools

**Usage Pattern:**
```typescript
import { figma, playwright, linear } from './mcp';

// Use typed wrapper functions
const design = await figma.getDesignContext({ nodeId: '1:2' });
const issues = await linear.listIssues({ team: 'ENG' });
await playwright.navigate({ url: 'http://localhost:3000' });
```
```

## Testing Commands After Migration

```bash
# Test Linear
npx tsx mcp/tests/test-simple.ts

# Test Figma
npx tsx mcp/tests/test-figma-with-client.ts

# Test Linear comprehensive
npx tsx mcp/tests/test-linear-with-client.ts

# Test example workflow
npx tsx mcp/examples/design-to-linear.ts
```

## Documentation Files to Update

- [x] `mcp/README.md` - Update paths in examples
- [x] `mcp/QUICKSTART.md` - Update test command paths
- [x] `CLAUDE.md` - Add MCP server exploration guidance
- [x] `MCP_WRAPPERS_SUMMARY.md` - Update all paths
- [x] `FIXES_SUMMARY.md` - Update test paths
- [x] `FIGMA_MCP_SUCCESS.md` - Update test file paths
- [x] `LINEAR_MCP_SUCCESS.md` - Update test file paths
- [x] All agent `.md` files - Add MCP usage examples

## Rollback Plan

If issues arise:
```bash
# Git has everything - simply revert
git checkout servers/
git clean -fd servers/
```

All import paths are relative, so rollback is safe and easy.
