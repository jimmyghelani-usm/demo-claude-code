## Command: figma:get-design-context

### Description
Fetch Figma design context via MCP wrappers.

### Suggested Script (if missing)
Create `mcp/tests/get-design-context.ts`:
```ts
import { config } from 'dotenv';
import { figma } from '../index.js';
config();

async function main(nodeId: string) {
  const result = await figma.getDesignContext({
    nodeId,
    clientFrameworks: 'react',
    clientLanguages: 'typescript'
  });
  console.log(JSON.stringify(result, null, 2));
}

const [nodeId] = process.argv.slice(2);
if (!nodeId) {
  console.error('Usage: npx tsx mcp/tests/get-design-context.ts <NODE_ID>');
  process.exit(1);
}
main(nodeId);
```

### Usage
```bash
npx tsx mcp/tests/get-design-context.ts <NODE_ID>
```

