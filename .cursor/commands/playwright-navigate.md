## Command: playwright:navigate

### Description
Navigate to a URL using Playwright MCP wrappers.

### Suggested Script (if missing)
Create `mcp/tests/navigate.ts`:
```ts
import { config } from 'dotenv';
import { playwright } from '../index.js';
config();

async function main(url: string) {
  const result = await playwright.navigate({ url });
  console.log(JSON.stringify(result, null, 2));
}

const [url] = process.argv.slice(2);
if (!url) {
  console.error('Usage: npx tsx mcp/tests/navigate.ts <URL>');
  process.exit(1);
}
main(url);
```

### Usage
```bash
npx tsx mcp/tests/navigate.ts <URL>
```

