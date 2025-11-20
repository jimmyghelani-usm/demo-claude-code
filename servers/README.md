# MCP Server Wrappers

This directory implements the **code execution with MCP** pattern described in [Anthropic's engineering article](https://www.anthropic.com/engineering/code-execution-with-mcp).

## The Problem

Traditional MCP implementations expose all tool definitions directly to the LLM's context window, which:
- Consumes massive amounts of context (150,000+ tokens in some cases)
- Includes all intermediate tool responses in the conversation
- Requires multiple round-trips through the model for complex operations

## The Solution

Instead of exposing MCP tools as direct function calls, we create a **filesystem-based code API**:

```
servers/
├── figma/          # Figma design tools
├── playwright/     # Browser automation tools
├── linear/         # Project management tools
└── mcp-client.ts   # Base MCP client infrastructure
```

The LLM discovers tools by exploring this directory structure and writes TypeScript code that:
1. Imports only the needed wrapper functions
2. Executes business logic locally (filtering, transforming data)
3. Calls MCP tools through the wrappers
4. Returns processed results

**Result**: Only final results flow back to the LLM, not intermediate MCP responses.

## Benefits

| Metric | Direct MCP Tools | Code Execution Pattern |
|--------|------------------|------------------------|
| Context usage | 150,000 tokens | 2,000 tokens (98.7% savings) |
| Data filtering | Model-managed | Code-managed |
| Control flow | Sequential calls | Programming patterns |
| Latency | Multiple round-trips | Single execution pass |

## Architecture

### Base Infrastructure

**`mcp-client.ts`** - Core MCP client that:
- Manages connections to MCP servers
- Caches clients for reuse
- Provides `callMCPTool()` for making tool calls
- Handles response parsing

### Server Wrappers

Each server directory contains:
- **`types.ts`** - TypeScript type definitions for all tool parameters and responses
- **Individual tool files** - One file per tool/category with JSDoc examples
- **`index.ts`** - Exports all tools for the server

## Usage

### Basic Example

```typescript
import { figma, playwright, linear } from './servers';

// Get Figma design context
const design = await figma.getDesignContext({
  nodeId: '1:2',
  clientFrameworks: 'react',
  clientLanguages: 'typescript'
});

// Navigate browser and interact
await playwright.navigate({ url: 'https://example.com' });
await playwright.click({
  element: 'Login button',
  ref: 'button#login'
});

// Create Linear issue
const issue = await linear.createIssue({
  title: 'Implement new feature',
  team: 'Engineering',
  description: 'Based on Figma design',
  priority: 2
});
```

### Complex Workflow Example

```typescript
import { figma, linear } from './servers';

// Workflow: Extract design specs and create Linear issues
async function designToIssues(nodeId: string, teamId: string) {
  // Get design context
  const design = await figma.getDesignContext({ nodeId });

  // Get variable definitions
  const variables = await figma.getVariableDefs({ nodeId });

  // Process design locally (no context waste!)
  const components = extractComponents(design);

  // Create issues for each component
  const issues = [];
  for (const component of components) {
    const issue = await linear.createIssue({
      title: `Implement ${component.name}`,
      team: teamId,
      description: `Component specs:\n${JSON.stringify(component.specs)}`,
      labels: ['frontend', 'design-implementation']
    });
    issues.push(issue);
  }

  return issues;
}
```

## Available Tools

### Figma (`servers/figma/`)
- `getDesignContext()` - Generate UI code for nodes
- `getVariableDefs()` - Get design system variables
- `getScreenshot()` - Capture node screenshots
- `getCodeConnectMap()` - Map nodes to code components
- `addCodeConnectMap()` - Create node-to-code mappings
- `getMetadata()` - Get node structure metadata
- `createDesignSystemRules()` - Generate design system rules
- `getFigJam()` - Get FigJam content

### Playwright (`servers/playwright/`)

**Browser Management:**
- `closeBrowser()`, `resizeBrowser()`, `installBrowser()`

**Navigation:**
- `navigate()`, `navigateBack()`

**Interactions:**
- `click()`, `type()`, `hover()`, `drag()`, `selectOption()`
- `pressKey()`, `fillForm()`, `fileUpload()`

**Capture & Inspection:**
- `takeScreenshot()`, `snapshot()`, `consoleMessages()`, `networkRequests()`

**Advanced:**
- `evaluate()`, `runCode()`, `handleDialog()`, `tabs()`, `waitFor()`

### Linear (`servers/linear/`)

**Issues:**
- `getIssue()`, `listIssues()`, `createIssue()`, `updateIssue()`

**Projects:**
- `listProjects()`, `getProject()`, `createProject()`, `updateProject()`

**Teams & Users:**
- `listTeams()`, `getTeam()`, `listUsers()`, `getUser()`

**Labels & Statuses:**
- `listIssueLabels()`, `createIssueLabel()`, `listIssueStatuses()`

**Comments & Cycles:**
- `listComments()`, `createComment()`, `listCycles()`

**Documents:**
- `getDocument()`, `listDocuments()`, `searchDocumentation()`

## Configuration

MCP server configurations are defined in `mcp-client.ts`:

```typescript
const MCP_SERVERS = {
  'figma-desktop': {
    command: 'npx',
    args: ['-y', '@figma/mcp-server-figma'],
  },
  'playwright': {
    command: 'npx',
    args: ['-y', '@executeautomation/playwright-mcp-server'],
  },
  'linear-server': {
    command: 'npx',
    args: ['-y', '@linear/mcp-server-linear'],
    env: {
      LINEAR_API_KEY: process.env.LINEAR_API_KEY || '',
    },
  },
};
```

### Environment Setup

1. **Copy the example .env file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your Linear API key to `.env`:**
   ```bash
   LINEAR_API_KEY=your-linear-api-key-here
   ```

3. **Get your Linear API key:**
   - Visit https://linear.app/settings/api
   - Create a new personal API key
   - Paste it into your `.env` file

The `.env` file is automatically loaded by the MCP client using `dotenv`.

## Type Safety

All wrappers include full TypeScript types:

```typescript
interface CreateIssueParams {
  title: string;
  team: string;
  assignee?: string;
  description?: string;
  priority?: number;
  // ... more fields
}

async function createIssue(params: CreateIssueParams): Promise<any>
```

This gives you:
- Autocomplete in your editor
- Compile-time type checking
- Inline documentation
- Reduced errors

## Progressive Disclosure

The LLM discovers tools by:
1. Exploring the directory structure (`servers/figma/`, `servers/playwright/`, etc.)
2. Reading individual tool files to understand interfaces
3. Loading only needed definitions on-demand

This means the LLM doesn't need to load all 50+ tool definitions upfront!

## Adding New Servers

To add a new MCP server:

1. Add server config to `mcp-client.ts`
2. Create `servers/your-server/types.ts` with TypeScript types
3. Create wrapper functions in `servers/your-server/*.ts`
4. Export everything from `servers/your-server/index.ts`
5. Add to main `servers/index.ts`

## Best Practices

1. **Keep wrappers thin** - They should just call the MCP tool
2. **Add JSDoc examples** - Help the LLM understand usage
3. **Use descriptive types** - Better than `any` whenever possible
4. **Group related tools** - Makes discovery easier
5. **Write business logic in calling code** - Not in wrappers

## Learn More

- [Anthropic's article on code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
- [Model Context Protocol documentation](https://modelcontextprotocol.io/)
