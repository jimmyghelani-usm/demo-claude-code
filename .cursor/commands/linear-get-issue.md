## Command: linear:get-issue

### Description
Fetch a Linear issue via MCP wrappers (reusing existing `mcp/tests/get-issue.ts`).

### Usage
```bash
npx tsx mcp/tests/get-issue.ts <ISSUE_ID>
```

### Notes
- Reuse-first: do not create new one-off scripts.
- If you truly need a new script, add a reusable CLI script to `mcp/tests/` (no hardcoded values). 

