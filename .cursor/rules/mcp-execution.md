## Rule: MCP Execution Files - Reuse First

This project uses a main orchestrator command and multi-agent pipelines. All MCP wrapper calls should follow these policies to stay aligned.

### Applies to
- `mcp/tests/**/*.ts`
- `mcp/examples/**/*.ts`
- `scripts/**/*.ts`

### Guidance
- When creating code execution files that call MCP wrappers (`figma`, `linear`, `playwright`):
  - First list existing scripts in `mcp/tests/` and reuse or generalize them
  - If no suitable script exists, create a reusable CLI script with arguments (no hardcoded IDs)
  - Delete any temporary, one-off scripts immediately after use
  - Import wrappers from the top level: `import { figma, linear, playwright } from '../index.js'`

### Orchestrator Alignment
- The `.cursor/commands/orchestrate.md` command is the entry point for end-to-end flows:
  - `linear-implementation`, `figma-to-implementation`, `prd-with-implementation`
- The orchestrator delegates MCP work to `mcp-execution-agent` (see `.claude/agents/mcp-execution-agent.md`).
- Keep execution scripts reusable so orchestrator subflows can invoke them repeatedly.

### Rationale
- Ensures reusability and avoids proliferation of near-duplicate scripts
- Keeps `mcp/tests/` clean and discoverable for future workflows

### Suggested Usage
- Prefer existing reusable scripts under `mcp/tests/`:
  - Example (Linear): `npx tsx mcp/tests/get-issue.ts <ISSUE_ID>`
- If a needed reusable script does not exist, add one under `mcp/tests/` with CLI args and usage help (no hardcoded values).

