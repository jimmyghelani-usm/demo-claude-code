## Command: linear:update-issue

### Description
Update a Linear issue via MCP wrappers (create or reuse a reusable CLI script in `mcp/tests/`).

### Suggested Script (if missing)
Create `mcp/tests/update-issue.ts`:
```ts
import { config } from 'dotenv';
import { linear } from '../index.js';
config();

async function updateIssue(issueId: string, state: string, comment: string) {
  const result = await linear.updateIssue({ id: issueId, state, comment });
  console.log(JSON.stringify(result, null, 2));
}

const [issueId, state, comment] = process.argv.slice(2);
if (!issueId || !state) {
  console.error('Usage: npx tsx mcp/tests/update-issue.ts <issue-id> <state> [comment]');
  process.exit(1);
}
updateIssue(issueId, state, comment || '');
```

### Usage
```bash
npx tsx mcp/tests/update-issue.ts <ISSUE_ID> <STATE> [COMMENT]
```

### Notes
- Reuse-first: prefer enhancing existing scripts over adding new ones.

