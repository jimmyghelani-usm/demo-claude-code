# MCP Agent Integration Pattern

**Status: ACTIVE** | Last Updated: 2025-11-21

## Overview

All Claude agents in this project use a **centralized MCP execution pattern** through the `mcp-execution-agent`. This ensures:

- ✅ **Context Efficiency**: MCP data processing happens locally, not in agent context (98.7% reduction)
- ✅ **Consistency**: All agents use the same interface for MCP operations
- ✅ **Reusability**: CLI scripts are built once in `mcp/tests/` and reused across agents
- ✅ **Reliability**: Centralized error handling, timeouts, retry logic
- ✅ **Maintainability**: Single source of truth for MCP wrapper management

## Core Principle

**Never import MCP wrappers directly in agents. Always delegate to `mcp-execution-agent`.**

```typescript
// ❌ WRONG - Direct import in agents
import { figma, linear, playwright } from './mcp';
const result = await figma.getScreenshot({ nodeId: '123' });

// ✅ RIGHT - Delegate to mcp-execution-agent
// Use mcp-execution-agent with:
// Operation: figma
// Task: getScreenshot
// Arguments: {nodeId: "123", filename: "design.png"}
```

## Agent Responsibilities

### Requesting Agents
- **figma-design-analyzer**
- **senior-frontend-engineer**
- **playwright-dev-tester**
- **prd-writer**
- **mcp-wrapper-builder** (for testing)

**Responsibilities:**
- Identify what MCP operation is needed
- Craft request with clear operation/task/arguments
- Delegate to `mcp-execution-agent`
- Wait for results
- Process/analyze results in agent context
- Continue with next task

### MCP Execution Agent
- **Central hub for all MCP wrapper calls**

**Responsibilities:**
- Receive operation requests from other agents
- Map operations to correct MCP wrapper (figma/linear/playwright)
- Check for existing CLI scripts in `mcp/tests/`
- Reuse existing scripts when possible
- Create reusable CLI scripts for new operations
- Handle argument normalization
- Execute MCP calls with proper error handling
- Process results and return to requesting agent
- Clean up temporary files

## Request Format

Agents request MCP operations using this structure:

```
Use mcp-execution-agent:

Operation: figma|linear|playwright
Task: [operation name]
Arguments: {
  key1: "value1",
  key2: "value2"
}
Output Format: json|file|text
Reuse Script: yes|no
(Reason: Brief explanation of why this operation is needed)
```

### Complete Example Request

```
Use mcp-execution-agent to extract design specifications:

Operation: figma
Task: getDesignContext
Arguments: {
  nodeId: "2172-3050",
  clientFrameworks: "react",
  clientLanguages: "typescript"
}
Output Format: json
Reuse Script: no
(Reason: Extract complete design specs for referral page implementation)

Also:

Operation: figma
Task: getScreenshot
Arguments: {
  nodeId: "2172-3050",
  filename: "figma-design-ref.png"
}
Output Format: file
Reuse Script: no
(Reason: Capture visual design for comparison)
```

## Available Operations

### Figma Operations

| Operation | Purpose | Example Request |
|-----------|---------|-----------------|
| `getScreenshot` | Capture design frame | `nodeId: "2172-3050", filename: "design.png"` |
| `getDesignContext` | Extract design data, code | `nodeId: "2172-3050", clientFrameworks: "react"` |
| `getVariableDefs` | Get design tokens/variables | `nodeId: "2172-3050"` |
| `getMetadata` | Get layer structure | `nodeId: "2172-3050"` |
| `getCodeConnectMap` | Get component mappings | `nodeId: "2172-3050"` |
| `addCodeConnectMap` | Add code connection | `nodeId: "...", componentName: "Button"` |
| `createDesignSystemRules` | Create design system | `clientFrameworks: "react"` |
| `getFigJam` | Get FigJam data | `nodeId: "2172-3050"` |

### Linear Operations

| Operation | Purpose | Example Request |
|-----------|---------|-----------------|
| `getIssue` | Fetch issue details | `id: "ENG-123"` |
| `listIssues` | List issues (filtered) | `status: "In Progress"` |
| `createIssue` | Create new issue | `title: "...", description: "..."` |
| `updateIssue` | Update issue state/data | `id: "ENG-123", state: "Done"` |
| `deleteIssue` | Delete issue | `id: "ENG-123"` |
| `addComment` | Add issue comment | `id: "ENG-123", comment: "text"` |
| `archiveIssue` | Archive issue | `id: "ENG-123"` |

### Playwright Operations

| Operation | Purpose | Example Request |
|-----------|---------|-----------------|
| `navigate` | Navigate to URL | `url: "http://localhost:3000"` |
| `click` | Click element | `element: "Submit", ref: "button#submit"` |
| `type` | Type text | `element: "Email", ref: "input#email", text: "user@test.com"` |
| `fillForm` | Fill form fields | `formData: {email: "...", password: "..."}` |
| `takeScreenshot` | Capture page | `filename: "page.png", fullPage: true` |
| `waitFor` | Wait for element | `element: "Success", timeout: 5000` |
| `getAllElements` | Get all page elements | `{}` |
| `consoleMessages` | Get console logs | `{}` |

## Usage Patterns by Agent

### Pattern 1: Figma Design Analyzer

**Task**: Extract design specifications

```
Use mcp-execution-agent:

Operation: figma
Task: getScreenshot
Arguments: {nodeId: "2172-3050", filename: "figma-design.png"}
Output Format: file
Reuse Script: no

Operation: figma
Task: getDesignContext
Arguments: {nodeId: "2172-3050", clientFrameworks: "react", clientLanguages: "typescript"}
Output Format: json
Reuse Script: no

Operation: figma
Task: getVariableDefs
Arguments: {nodeId: "2172-3050"}
Output Format: json
Reuse Script: no
```

### Pattern 2: Frontend Engineer Implementation

**Task**: Get design context before implementing

```
Use mcp-execution-agent:

Operation: figma
Task: getDesignContext
Arguments: {nodeId: "2172-3050", clientFrameworks: "react", clientLanguages: "typescript"}
Output Format: json
Reuse Script: yes
(Reason: Reusable for any React component implementation)

Operation: linear
Task: getIssue
Arguments: {id: "ENG-123"}
Output Format: json
Reuse Script: yes
(Reason: Fetch issue context before starting)
```

### Pattern 3: Playwright Dev Tester

**Task**: Verify implementation against Figma

```
Use mcp-execution-agent:

Operation: playwright
Task: navigate
Arguments: {url: "http://localhost:3000"}
Output Format: text
Reuse Script: no

Operation: playwright
Task: takeScreenshot
Arguments: {filename: "app-screenshot.png", fullPage: true}
Output Format: file
Reuse Script: no

Operation: figma
Task: getScreenshot
Arguments: {nodeId: "2172-3050", filename: "figma-ref.png"}
Output Format: file
Reuse Script: no
(Reason: Get design screenshot for visual comparison)
```

### Pattern 4: PRD Writer

**Task**: Fetch Linear issue and Figma design context

```
Use mcp-execution-agent:

Operation: linear
Task: getIssue
Arguments: {id: "ENG-123"}
Output Format: json
Reuse Script: yes

Operation: figma
Task: getScreenshot
Arguments: {nodeId: "2172-3050", filename: "design-ref.png"}
Output Format: file
Reuse Script: yes
(Reason: Capture design reference for PRD documentation)
```

## Script Lifecycle

### Reusable Scripts (Kept in `mcp/tests/`)

General-purpose CLI scripts that solve common problems:

```typescript
// mcp/tests/get-issue.ts
// Usage: npx tsx mcp/tests/get-issue.ts ENG-123
// Returns: JSON issue data
// Reused by: multiple agents across different tickets
```

**Examples:**
- `get-issue.ts` - Fetch Linear issue
- `update-issue.ts` - Update Linear issue
- `compare-designs.ts` - Compare Figma designs
- `get-design-context.ts` - Extract Figma context

**Characteristics:**
- Accept CLI arguments
- Print structured JSON
- Show usage help
- Reusable across multiple tickets/workflows

### One-Off Execution (Deleted After Use)

Temporary execution for specific requests:

```typescript
// Temporary - generated for this request only
// Hardcoded values or inline execution
// Deleted immediately after successful execution
```

**Examples:**
- Update specific Linear issue with implementation status
- Take screenshot of specific component
- Test specific Figma node

**Characteristics:**
- No CLI arguments
- Hardcoded specific IDs
- Immediate deletion after use
- Not committed to repository

## Error Handling

### MCP Timeout Issues

| Server | Issue | Handling |
|--------|-------|----------|
| **Figma** | MCP server unresponsive | Retry up to 2x with exponential backoff |
| **Linear** | MCP timeout | Fall back to GraphQL API |
| **Playwright** | Browser not responding | Kill existing process, restart browser |

### Silent Failures

**Detection:**
- Log all MCP calls with request/response
- Check if response is error string vs. object
- Validate response structure

**Resolution:**
- Throw proper Error objects instead of returning error strings
- Provide actionable error messages
- Include troubleshooting steps

### Common Issues

```
Problem: "Browser is already in use"
Solution:
  pkill -f "mcp-chrome"
  sleep 2
  Retry operation

Problem: "Dev server not responding"
Solution:
  Check: lsof -ti:3000
  If empty: npm run dev
  If running: verify localhost:3000 in browser

Problem: "Figma Desktop not running"
Solution:
  1. Open Figma Desktop app
  2. Enable Dev Mode (Shift+D)
  3. Enable "Enable desktop MCP server" setting
  4. Retry operation
```

## Quality Checklist for Requests

Before delegating to `mcp-execution-agent`, verify:

- [ ] Clear operation (figma|linear|playwright)
- [ ] Specific task name
- [ ] All required arguments provided
- [ ] Output format specified (json|file|text)
- [ ] Reuse script flag set (yes|no)
- [ ] Reason documented (why this operation is needed)

## Examples

### Example 1: Complete Figma Analysis Request

```
Use mcp-execution-agent to analyze the referral page design:

Operation: figma
Task: getScreenshot
Arguments: {nodeId: "2172-3050", filename: "referral-page-design.png"}
Output Format: file
Reuse Script: no

Operation: figma
Task: getDesignContext
Arguments: {nodeId: "2172-3050", clientFrameworks: "react", clientLanguages: "typescript"}
Output Format: json
Reuse Script: no

Operation: figma
Task: getVariableDefs
Arguments: {nodeId: "2172-3050"}
Output Format: json
Reuse Script: no

(Reason: Extract complete design specs including screenshot, design context,
and design tokens for pixel-perfect React implementation)
```

### Example 2: Visual Verification Request

```
Use mcp-execution-agent to verify implementation:

Operation: playwright
Task: navigate
Arguments: {url: "http://localhost:3000"}
Output Format: text
Reuse Script: no

Operation: playwright
Task: takeScreenshot
Arguments: {filename: "app-implementation.png", fullPage: true}
Output Format: file
Reuse Script: no

Operation: figma
Task: getScreenshot
Arguments: {nodeId: "2172-3050", filename: "figma-design.png"}
Output Format: file
Reuse Script: no

(Reason: Compare visual implementation against Figma design to verify
accuracy of colors, spacing, typography, and layout)
```

### Example 3: Linear Issue Update Request

```
Use mcp-execution-agent to update Linear issue:

Operation: linear
Task: updateIssue
Arguments: {
  id: "ENG-456",
  state: "In Review",
  comment: "Implementation complete - referral page all sections built and tested.
  Ready for visual design verification."
}
Output Format: json
Reuse Script: yes

(Reason: Update Linear issue to reflect implementation progress)
```

## Best Practices

### DO ✅

- ✅ Always delegate MCP operations to `mcp-execution-agent`
- ✅ Use clear, specific operation requests
- ✅ Provide all required arguments
- ✅ Document reason for each operation
- ✅ Let `mcp-execution-agent` handle error handling
- ✅ Reuse existing CLI scripts when possible
- ✅ Keep `mcp/tests/` clean (delete one-offs)
- ✅ Process results in agent context after delegation

### DON'T ❌

- ❌ Don't import MCP wrappers directly
- ❌ Don't write execution code yourself
- ❌ Don't create temporary test files
- ❌ Don't handle MCP timeouts manually
- ❌ Don't accumulate one-off scripts
- ❌ Don't process MCP data in wrapper calls
- ❌ Don't bypass error handling

## Integration Points

### From Other Agents

Requesting agents include clear MCP operation requests in their prompts:

```
REQUESTING AGENT PROMPT:
"Use mcp-execution-agent to:
1. Get Figma screenshot (nodeId: 2172-3050)
2. Extract design context
3. Return analysis"

MCP-EXECUTION-AGENT PROCESSES:
- Checks mcp/tests/ for existing scripts
- Generates execution code if needed
- Runs MCP operations
- Returns results to requesting agent

REQUESTING AGENT CONTINUES:
- Receives MCP results
- Analyzes in agent context
- Completes its task
- Returns final output
```

## Maintenance

### Adding New Operations

1. **Identify Need**: New workflow requires MCP operation
2. **Check Wrappers**: Verify wrapper exists in `mcp/servers/`
3. **Create Script**: If reusable, create CLI script in `mcp/tests/`
4. **Document**: Add to this guide
5. **Test**: Verify with `mcp-execution-agent`

### Troubleshooting

For issues with MCP execution:

1. Check `.env` file for required API keys
2. Verify MCP servers are running (Figma Desktop, dev server, etc.)
3. Review timeout settings in `mcp/mcp-client.ts`
4. Check browser state for Playwright issues
5. Review recent changes in `mcp/servers/`

## References

- **MCP Execution Agent**: `.claude/agents/mcp-execution-agent.md`
- **MCP Architecture**: `docs/mcp/architecture/`
- **Available Wrappers**: `mcp/servers/*/`
- **CLI Scripts**: `mcp/tests/`
- **Configuration**: `CLAUDE.md` - MCP Server Wrappers Architecture

---

**Last Updated:** 2025-11-21
**Pattern Version:** 1.0 (Stable)
**All agents MUST follow this pattern**
