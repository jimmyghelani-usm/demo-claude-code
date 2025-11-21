# Agent MCP Integration - Quick Reference

## One-Line Rule

**🚫 Never import MCP wrappers in agents → ✅ Always delegate to mcp-execution-agent**

## Request Template

Copy and paste for MCP requests:

```
Use mcp-execution-agent:

Operation: figma|linear|playwright
Task: [operation]
Arguments: {
  arg1: "value1",
  arg2: "value2"
}
Output Format: json|file|text
Reuse Script: yes|no
(Reason: Brief explanation)
```

## Common Operations

### Figma
```
getScreenshot      → Operation: figma, Task: getScreenshot
getDesignContext   → Operation: figma, Task: getDesignContext
getVariableDefs    → Operation: figma, Task: getVariableDefs
getMetadata        → Operation: figma, Task: getMetadata
```

### Linear
```
getIssue           → Operation: linear, Task: getIssue
updateIssue        → Operation: linear, Task: updateIssue
createIssue        → Operation: linear, Task: createIssue
addComment         → Operation: linear, Task: addComment
```

### Playwright
```
navigate           → Operation: playwright, Task: navigate
takeScreenshot     → Operation: playwright, Task: takeScreenshot
click              → Operation: playwright, Task: click
fillForm           → Operation: playwright, Task: fillForm
```

## Agent-Specific Patterns

### Figma Design Analyzer
```
Operation: figma
Task: getScreenshot
Arguments: {nodeId: "2172-3050", filename: "design.png"}
Output Format: file
```

### Frontend Engineer
```
Operation: figma
Task: getDesignContext
Arguments: {nodeId: "2172-3050", clientFrameworks: "react"}
Output Format: json
```

### Playwright Dev Tester
```
Operation: playwright
Task: takeScreenshot
Arguments: {filename: "page.png", fullPage: true}
Output Format: file
```

### PRD Writer
```
Operation: linear
Task: getIssue
Arguments: {id: "ENG-123"}
Output Format: json
```

## DO's and DON'Ts

### DO ✅
- Delegate to mcp-execution-agent
- Use clear operation/task/arguments
- Specify output format
- Document reason

### DON'T ❌
- Import figma, linear, or playwright
- Write execution code
- Create temporary scripts
- Bypass error handling

## Environment Setup

Required for operations to work:

```bash
# .env file needs:
FIGMA_API_KEY=your_key           # For Figma operations
LINEAR_API_KEY=your_key          # For Linear operations
# Playwright uses browser automation (no key needed)

# Figma Desktop must be running
# Dev server must be running (for Playwright)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP Timeout | Agent has retry logic, may need to wait |
| Silent failures | Check .env file for missing keys |
| Browser in use | Agent kills and restarts |
| Dev server not running | Start with `npm run dev` |
| Figma not responding | Open Figma Desktop, enable Dev Mode |

## Real-World Examples

### Example 1: Get Design for Implementation
```
Use mcp-execution-agent:

Operation: figma
Task: getDesignContext
Arguments: {
  nodeId: "2172-3050",
  clientFrameworks: "react",
  clientLanguages: "typescript"
}
Output Format: json
Reuse Script: yes
(Reason: Extract design specs for React implementation)
```

### Example 2: Verify Implementation
```
Use mcp-execution-agent:

Operation: playwright
Task: navigate
Arguments: {url: "http://localhost:3000"}
Output Format: text
Reuse Script: no

Operation: playwright
Task: takeScreenshot
Arguments: {filename: "page.png", fullPage: true}
Output Format: file
Reuse Script: no
```

### Example 3: Update Linear Issue
```
Use mcp-execution-agent:

Operation: linear
Task: updateIssue
Arguments: {
  id: "ENG-123",
  state: "In Review",
  comment: "Implementation complete"
}
Output Format: json
Reuse Script: yes
(Reason: Mark task as complete)
```

## Key Files

| File | Purpose |
|------|---------|
| `.claude/agents/mcp-execution-agent.md` | Central MCP hub - the main agent |
| `docs/mcp/MCP_AGENT_INTEGRATION_PATTERN.md` | Complete integration guide |
| `mcp/index.ts` | MCP wrapper exports |
| `mcp/servers/figma/` | Figma wrapper implementation |
| `mcp/servers/linear/` | Linear wrapper implementation |
| `mcp/servers/playwright/` | Playwright wrapper implementation |
| `mcp/tests/` | Reusable CLI scripts |

## Next Steps

1. **Update Agents**: Incorporate new mcp-execution-agent delegation pattern
2. **Create Reusable Scripts**: Build CLI scripts in `mcp/tests/` as needed
3. **Test Integration**: Verify agents can delegate and receive results
4. **Monitor Usage**: Ensure all MCP calls go through agent

---

**Pattern Status**: ✅ ACTIVE
**All agents MUST follow this pattern**
**Last Updated**: 2025-11-21
