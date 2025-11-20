# Quick Start Guide

Get started with MCP wrappers in 5 minutes!

## Setup

1. **Install dependencies** (already done if you're reading this!)
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example .env file
   cp .env.example .env

   # Edit .env and add your Linear API key
   # Get your API key from: https://linear.app/settings/api
   ```

3. **Verify setup**
   ```bash
   npx tsx mcp/tests/test-simple.ts
   ```

## Basic Usage

### Import wrappers

```typescript
import { figma, playwright, linear } from './mcp';
```

### Use in your code

```typescript
// Get Figma design
const design = await figma.getDesignContext({ nodeId: '1:2' });

// Automate browser
await playwright.navigate({ url: 'https://example.com' });
await playwright.click({ element: 'button', ref: '#login' });

// Manage Linear issues
const issues = await linear.listIssues({ assignee: 'me' });
```

## Key Concepts

### 1. Typed Functions
Every wrapper has full TypeScript types:
```typescript
// TypeScript knows all parameters and return types!
const issue = await linear.createIssue({
  title: 'Bug fix',        // ✓ required
  team: 'Engineering',     // ✓ required
  priority: 2,             // ✓ optional with type checking
  invalidField: 'oops'     // ✗ TypeScript error!
});
```

### 2. Local Processing
Process data in code, not through the LLM:
```typescript
// Get data from MCP
const design = await figma.getDesignContext({ nodeId: '1:2' });

// Process locally (NO context consumption!)
const components = design.layers
  .filter(layer => layer.type === 'COMPONENT')
  .map(layer => ({
    name: layer.name,
    specs: extractSpecs(layer)
  }));

// Only final result goes back to LLM
return components;
```

### 3. Composable Workflows
Mix tools from different servers:
```typescript
async function designToImplementation(nodeId: string) {
  // 1. Get design from Figma
  const design = await figma.getDesignContext({ nodeId });

  // 2. Create implementation task in Linear
  const issue = await linear.createIssue({
    title: `Implement ${design.name}`,
    team: 'Engineering',
    description: generateSpecs(design)
  });

  // 3. Test the implementation
  await playwright.navigate({ url: 'http://localhost:3000' });
  const testResult = await runTests();

  // 4. Update issue with results
  await linear.updateIssue({
    id: issue.id,
    description: issue.description + '\n\n' + testResult.summary
  });
}
```

## Examples

### Example 1: List My Issues
```typescript
import { linear } from './mcp';

const myIssues = await linear.listIssues({
  assignee: 'me',
  state: 'In Progress'
});

console.log(`You have ${myIssues.length} in-progress issues`);
```

### Example 2: Screenshot a Page
```typescript
import { playwright } from './mcp';

await playwright.navigate({ url: 'https://example.com' });
await playwright.waitFor({ time: 2 });
await playwright.takeScreenshot({
  filename: 'homepage.png',
  fullPage: true
});
```

### Example 3: Get Design Variables
```typescript
import { figma } from './mcp';

const variables = await figma.getVariableDefs({
  nodeId: '1:2'
});

// Use variables in your code
const primaryColor = variables['color/primary'];
```

## Advanced: Creating Complex Workflows

```typescript
import { figma, playwright, linear } from './mcp';

async function fullWorkflow() {
  // 1. Extract design specs
  console.log('Fetching design...');
  const design = await figma.getDesignContext({ nodeId: '1:2' });
  const variables = await figma.getVariableDefs({ nodeId: '1:2' });

  // 2. Process locally
  console.log('Processing design...');
  const components = extractComponents(design);
  const specs = generateSpecs(components, variables);

  // 3. Create issues
  console.log('Creating Linear issues...');
  const issues = await Promise.all(
    components.map(comp =>
      linear.createIssue({
        title: `Implement ${comp.name}`,
        team: 'Engineering',
        description: specs[comp.name]
      })
    )
  );

  // 4. Test implementation
  console.log('Testing implementation...');
  await playwright.navigate({ url: 'http://localhost:3000' });
  const testResults = await runTests();

  // 5. Update issues with results
  console.log('Updating issues...');
  for (let i = 0; i < issues.length; i++) {
    await linear.updateIssue({
      id: issues[i].id,
      state: testResults[i].passed ? 'Done' : 'In Progress'
    });
  }

  console.log('Workflow complete!');
}
```

## Why This Pattern?

Traditional MCP approach:
- 150,000 tokens consumed
- Every tool call goes through LLM
- Intermediate results in context
- Multiple round-trips

Wrapper pattern:
- 2,000 tokens consumed (98.7% savings!)
- Tools called directly from code
- Only final results in context
- Single execution pass

## Next Steps

1. Read the full [README](./README.md) for architecture details
2. Explore [examples](./examples/) for complete workflows
3. Check out individual server documentation:
   - [Figma tools](./figma/)
   - [Playwright tools](./playwright/)
   - [Linear tools](./linear/)

## Troubleshooting

### MCP server not connecting
```bash
# Make sure MCP servers are installed
npx @figma/mcp-server-figma --version
npx @executeautomation/playwright-mcp-server --version
npx @linear/mcp-server-linear --version
```

### TypeScript errors
```bash
# Rebuild TypeScript
cd servers
npx tsc --noEmit
```

### Linear API key issues
```bash
# Verify your API key is set
echo $LINEAR_API_KEY

# Get a new key at: https://linear.app/settings/api
```

## Getting Help

- Check the [main README](./README.md)
- Review [examples](./examples/)
- Read [Anthropic's article](https://www.anthropic.com/engineering/code-execution-with-mcp)
