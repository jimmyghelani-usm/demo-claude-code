# MCP Wrapper Examples

This directory contains example workflows demonstrating the power of the MCP wrapper pattern.

## Examples

### 1. Design to Linear Issues (`design-to-linear.ts`)

Converts Figma designs into Linear implementation tasks.

**Workflow:**
1. Fetch design context from Figma
2. Extract design variables
3. Process design data locally (no context waste!)
4. Create Linear issues for each component

**Usage:**
```bash
export FIGMA_NODE_ID="1:2"
export LINEAR_TEAM="Engineering"
export LINEAR_PROJECT="Q1 2024"

npx tsx examples/design-to-linear.ts
```

**Key Benefit:** All design processing happens in code, keeping intermediate data out of the LLM context.

### 2. Browser Testing (`browser-testing.ts`)

Automated browser testing with failure reporting to Linear.

**Workflow:**
1. Navigate to website using Playwright
2. Interact with form elements
3. Capture screenshots and console logs
4. Report failures to Linear automatically

**Usage:**
```bash
export TEST_URL="https://example.com/login"
export LINEAR_TEAM="Engineering"

npx tsx examples/browser-testing.ts
```

**Key Benefit:** Complex browser interactions and assertions happen in code, only results go to the LLM.

## Running Examples

### Prerequisites

```bash
# Install dependencies
npm install

# Set up environment variables
export LINEAR_API_KEY="your-linear-api-key"
```

### Run an example

```bash
npx tsx examples/design-to-linear.ts
```

## Creating Your Own Workflows

The wrapper pattern makes it easy to create complex workflows:

```typescript
import { figma, playwright, linear } from '../index.js';

async function myWorkflow() {
  // Step 1: Get data from Figma
  const design = await figma.getDesignContext({ nodeId: '1:2' });

  // Step 2: Process locally (no context consumption!)
  const processedData = processDesign(design);

  // Step 3: Test in browser
  await playwright.navigate({ url: 'https://example.com' });
  const testResult = await runTests();

  // Step 4: Create issue if needed
  if (!testResult.passed) {
    await linear.createIssue({
      title: 'Test failed',
      team: 'Engineering',
      description: processedData.summary
    });
  }
}
```

## Benefits Demonstrated

1. **Context Efficiency**: Processing happens in code, not through LLM
2. **Type Safety**: Full TypeScript types for all operations
3. **Composability**: Mix and match tools from different servers
4. **Error Handling**: Standard try/catch patterns
5. **Testability**: Easy to test workflows independently

## Learn More

See the main [README](../README.md) for architecture details and the full API reference.
