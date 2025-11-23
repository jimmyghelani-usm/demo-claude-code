# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vite + React + TypeScript project with two major components:

1. **Frontend Application**: A modern React app with Storybook for component development
2. **MCP Server Wrappers**: Implementation of Anthropic's code execution with MCP pattern for context-efficient AI agent workflows

## Quick Commands

### Frontend Development
```bash
npm run dev                    # Start dev server at localhost:3000
npm run build                  # TypeScript check + production build
npm run preview                # Preview production build
npm run storybook              # Start Storybook at localhost:6006
npm run build-storybook        # Build Storybook static site
```

### Testing
```bash
npm test                       # Run tests in watch mode
npm run test:run               # Run tests once (CI)
npm run test:ui                # Launch Vitest UI
npm run test:storybook         # Run Storybook component tests
```

### Code Quality
```bash
npm run lint                   # Check code quality
npm run lint:fix               # Auto-fix lint issues
npm run format                 # Format code with Prettier
npm run format:check           # Check formatting
npm run type-check             # TypeScript type checking
```

### MCP Server Wrappers
```bash
npx tsx mcp/tests/test-simple.ts              # Test MCP wrappers
npx tsx mcp/examples/design-to-linear.ts      # Run Figma → Linear workflow
npx tsx mcp/examples/browser-testing.ts       # Run Playwright + Linear workflow
cd servers && npx tsc --noEmit                    # Type-check server code
```

## Development Server Management

**CRITICAL: Always check if servers are already running before starting them.**

### Checking Running Servers

Before running `npm run dev` or `npm run storybook`, check if they're already running:

```bash
# Check if dev server is running (port 3000)
lsof -ti:3000

# Check if Storybook is running (port 6006)
lsof -ti:6006

# If either command returns a PID (process ID), the server is running
# If no output, the port is free and you can start the server
```

### Best Practices

**Before starting dev server:**
```bash
# Check first
if lsof -ti:3000 > /dev/null; then
  echo "✓ Dev server already running on port 3000"
else
  echo "Starting dev server..."
  npm run dev
fi
```

**Before starting Storybook:**
```bash
# Check first
if lsof -ti:6006 > /dev/null; then
  echo "✓ Storybook already running on port 6006"
else
  echo "Starting Storybook..."
  npm run storybook
fi
```

### Background Processes

When using `run_in_background: true` with Bash tool:
- **ALWAYS check if server is running first** to avoid spawning duplicate processes
- Use `lsof -ti:PORT` to detect running servers
- Only start in background if port is free

### Stopping Servers

If you need to stop servers:
```bash
# Kill dev server (port 3000)
kill $(lsof -ti:3000) 2>/dev/null

# Kill Storybook (port 6006)
kill $(lsof -ti:6006) 2>/dev/null
```

### Common Issues

**"Port already in use" errors:**
- Caused by trying to start a server when it's already running
- Solution: Check port first with `lsof -ti:PORT`
- If stuck: Kill the process and restart

**Multiple server instances:**
- Caused by not checking before starting in background
- Solution: Always check first, only start if needed

## Architecture

### Frontend Structure

**Component Organization:**
- Create components in appropriate directories: `src/components/ui/` for reusable UI components, `src/components/sections/` for page sections
- All reusable UI components MUST have corresponding `.stories.tsx` and `.test.tsx` files
- All components (reusable or not) MUST have `.test.tsx` files

**Import Aliases:**
- Use `@/` for all src imports: `import { Component } from '@/components/ui'`
- Configured in `vite.config.ts` and `tsconfig.app.json`

**Testing Setup:**
- Vitest with jsdom environment
- React Testing Library + jest-dom matchers
- Setup file: `src/test/setup.ts`
- Storybook integration tests via `@storybook/addon-vitest`

**Build Configuration:**
- React vendor chunk separated for better caching
- Source maps enabled for debugging
- Dev server on port 3000 (or next available)

### MCP Server Wrappers Architecture

**Critical Concept**: This implements the code execution with MCP pattern from [Anthropic's article](https://www.anthropic.com/engineering/code-execution-with-mcp), achieving **98.7% context reduction** (150,000 → 2,000 tokens).

**How It Works:**
1. Instead of exposing MCP tools directly to LLM context, tools are wrapped as TypeScript functions
2. **Agents/LLM discover tools by exploring `mcp/servers/` directory structure** (clean, only wrappers)
3. LLM writes code that calls wrappers, processes data locally, and returns only final results
4. Intermediate MCP responses never flow through LLM context

**Directory Structure:**
```
mcp/
├── mcp-client.ts           # Base client managing all MCP connections
├── index.ts                # Main exports (figma, playwright, linear)
├── servers/                # 🎯 Explore this for available MCP tools
│   ├── figma/             # 8 Figma design tools
│   ├── playwright/        # 25+ browser automation tools
│   └── linear/            # 23 project management tools
├── tests/                  # Test files (don't explore for usage)
└── examples/               # Complete workflow examples
```

**IMPORTANT for Agents - Context Efficiency:**
- **ALWAYS explore `mcp/servers/` directory** - This is the ONLY directory you should proactively explore
- This directory contains ONLY wrapper functions organized by server type - no tests, no infrastructure, just clean typed wrappers
- **DO NOT read files in `docs/` directory** unless specifically needed for your current task
- **DO NOT read README/documentation files** unless you need specific implementation details
- Import from top level: `import { figma, linear, playwright } from './mcp'`
- The `docs/` directory exists for reference but should not consume context unnecessarily

**Server Configuration** (`mcp/mcp-client.ts`):
- Manages three MCP servers: figma-desktop, playwright, linear-server
- Caches client connections for reuse
- Automatically loads `.env` file with dotenv
- Filters undefined environment variables for type safety
- Supports both stdio transport (Playwright, Linear) and HTTP transport (Figma)
- Custom `FigmaDirectClient` bypasses SDK validation for Figma Desktop

**Status:**
- ✅ **All 3 MCP Servers Working:** Figma, Playwright, and Linear fully functional
- ✅ **Figma Solution:** Custom HTTP client with SSE parsing bypasses schema validation (see `docs/mcp/setup/FIGMA_MCP_SUCCESS.md`)
- ✅ **Linear Solution:** Uses official `mcp-remote` proxy to Linear's hosted MCP server with OAuth authentication

**Type Safety:**
- Every wrapper has full TypeScript types in `types.ts`
- All parameters and return types are typed
- Runtime type guards for MCP responses

**Environment Setup:**
```bash
# Linear OAuth authentication (handled automatically by mcp-remote)
# First run will open browser for Linear authorization
# Optional: Add LINEAR_API_KEY to .env if needed for direct API access
cp .env.example .env
# Get API key from: https://linear.app/settings/api
```

**Agent Usage Guide:**

When agents need to use MCP tools:
1. **Explore `mcp/servers/` directory** - This is the ONLY directory you need to explore for available tools
2. **Import from top level**: `import { figma, playwright, linear } from './mcp'`
3. **All wrappers are typed** - Each server directory has complete TypeScript definitions

**Available MCP Servers:**
- **Figma** (`mcp/servers/figma/`) - Design extraction, screenshots, design system rules
  - `getDesignContext()`, `getVariableDefs()`, `getScreenshot()`, and 5 more tools
- **Playwright** (`mcp/servers/playwright/`) - Browser automation and testing
  - `navigate()`, `click()`, `type()`, `takeScreenshot()`, and 20+ more tools
- **Linear** (`mcp/servers/linear/`) - Project management integration
  - `getIssue()`, `listIssues()`, `createIssue()`, `updateIssue()`, and 19 more tools

**Usage Pattern:**
```typescript
import { figma, playwright, linear } from './mcp';

// Fetch Linear issue context
const issue = await linear.getIssue({ id: 'ENG-123' });

// Analyze Figma design
const design = await figma.getDesignContext({
  nodeId: '2171-13039',
  clientFrameworks: 'react',
  clientLanguages: 'typescript'
});

// Test implementation
await playwright.navigate({ url: 'http://localhost:3000' });
await playwright.click({ element: 'Login button', ref: 'button#login' });
const screenshot = await playwright.takeScreenshot({ filename: 'test.png' });

// Update Linear issue
await linear.updateIssue({
  id: 'ENG-123',
  state: 'Done',
  comment: 'Implementation complete and tested'
});
```

### MCP Execution Files (`mcp/tests/`)

> Cursor rule: When creating execution files that call MCP wrappers (`figma`, `linear`, `playwright`):
- First check for an existing reusable script in `mcp/tests/` and reuse or generalize it
- If none exists, create a reusable CLI script with arguments (not a one-off)
- Delete temporary one-off scripts after successful execution
- Import wrappers from the top level: `import { figma, linear, playwright } from './mcp'`

**Critical Rules for Creating MCP Execution Scripts:**

**1. ALWAYS Check for Reusable Scripts First:**
Before creating a new execution file in `mcp/tests/`, explore the directory to find existing reusable scripts:
```bash
# List available execution scripts
ls mcp/tests/
```

**Reusable Scripts Currently Available:**
- `get-issue.ts` - Fetch Linear issue by ID: `npx tsx mcp/tests/get-issue.ts <issue-id>`

**2. Analyze Both Server Wrappers AND Execution Scripts:**
When working with MCP:
- First explore `mcp/servers/` for available MCP wrapper functions
- Then explore `mcp/tests/` for existing execution patterns
- Reuse existing scripts when possible, adapt if needed

**3. Creating New Execution Scripts:**

**Reusable scripts** (keep in `mcp/tests/`):
- Accept command-line arguments for flexibility
- Solve general-purpose problems
- Can be used across multiple tickets/workflows
- Examples: `get-issue.ts`, future: `update-issue.ts`, `analyze-design.ts`

**One-off scripts** (temporary, must be deleted):
- Hardcoded values (specific issue IDs, node IDs)
- Ticket-specific logic
- Test/debugging purposes
- Must be deleted after successful execution

**4. One-Off Script Pattern (Always Delete After Use):**

If you must create a one-off script:
```typescript
// mcp/tests/temp-task-name.ts
import { config } from 'dotenv';
import { linear } from '../index.js';

config();

async function executeTask() {
  try {
    // ... hardcoded task-specific logic ...
    console.log('✓ Task complete');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

executeTask();
```

**CRITICAL**: After successful execution, delete the file immediately:
```bash
rm mcp/tests/temp-task-name.ts
```

**5. Reusable Script Pattern (Keep in Repository):**

Create reusable scripts with CLI arguments:
```typescript
// mcp/tests/update-issue.ts
import { config } from 'dotenv';
import { linear } from '../index.js';

config();

async function updateIssue(issueId: string, state: string, comment: string) {
  try {
    const result = await linear.updateIssue({
      id: issueId,
      state,
      comment
    });
    console.log('✓ Issue updated:', result);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

const [issueId, state, comment] = process.argv.slice(2);
if (!issueId || !state) {
  console.error('Usage: npx tsx mcp/tests/update-issue.ts <issue-id> <state> [comment]');
  process.exit(1);
}

updateIssue(issueId, state, comment || '');
```

**6. Cleanup Policy:**

Automatically delete one-off scripts in these scenarios:
- After workflow completion (e.g., `/implement-linear` command cleanup step)
- Test files prefixed with `test-*`, `analyze-*`, `extract-*`, `process-*` (unless truly reusable)
- Any file with hardcoded ticket IDs (`update-fe-431.ts`, `extract-coming-soon.ts`)

**7. Performance Note - Timeout Handling:**

All MCP calls have automatic timeout protection:
- Default timeout: 5 seconds (configurable in `mcp-client.ts`)
- Figma tool calls: 10 seconds
- Linear MCP server: Falls back to GraphQL API on timeout (expected behavior)
- Playwright: Standard 5 second timeout

If you see `[Linear] MCP timeout, using GraphQL API fallback`, this is **normal** and **working as designed**. The GraphQL fallback ensures reliable operation.

**8. Best Practices:**

✅ **DO:**
- Check `mcp/tests/` for existing scripts before creating new ones
- Use CLI arguments for reusable scripts
- Add clear usage instructions in error messages
- Delete one-off scripts after successful execution
- Keep `mcp/tests/` directory clean (only reusable utilities)

❌ **DON'T:**
- Create multiple similar scripts for the same task
- Leave hardcoded test files in the repository
- Create execution files without checking for existing patterns
- Accumulate technical debt in `mcp/tests/`

### Commands and Agents
- Cursor Commands (see `.cursor/commands/`) provide quick entry points to reuse the existing `mcp/tests` scripts (e.g., linear:get-issue).
- Claude MCP Execution Agent (see `.claude/agents/mcp-execution-agent.md`) describes how a Claude sub-agent should operate:
  - Reuse-first for `mcp/tests`
  - Create reusable CLI scripts only if missing
  - Prefer GraphQL fallback when MCP transport fails (Linear)

### ESLint Configuration

**Flat Config Format** (`eslint.config.js`):
- Base rules for all `.ts`/`.tsx` files (browser environment)
- Special rules for `vite.config.ts` and `*.config.ts` (Node.js environment)
- **Special rules for `mcp/servers/**/*` directory**:
  - Node.js globals enabled (process, __dirname, etc.)
  - `console.log` allowed (CLI tools need console output)
  - `any` types allowed (MCP responses are dynamic)

## Development Workflows

### Creating New React Components ⚠️ TESTING REQUIRED

**Implementation Flow:**
1. Create component in appropriate directory (`ui/` or `sections/`)
2. Export from directory's `index.ts`
3. Use `@/` imports for internal dependencies

**REQUIRED: Testing & Documentation (use agent delegation):**
4. **Storybook Stories** - REQUIRED for reusable UI components with props
   - Use Task tool to delegate to `storybook-expert` agent
   - Provide complete component context (props, variants, states, interactions)
   - Agent creates comprehensive stories with args/controls for interactive exploration
   - **When to include Storybook**:
     - ✅ Reusable UI components (Button, Card, Modal, Form, etc.) with props
     - ❌ Simple stateless pages/App components without props

5. **Component Tests** - REQUIRED for ALL components
   - Use Task tool to delegate to `react-component-tester` agent
   - Provide component context (file path, props, behaviors, edge cases)
   - Agent creates tests using Vitest + React Testing Library
   - Tests must cover user interactions, conditional rendering, and accessibility
   - **Every component** (reusable or not) needs test coverage

6. **E2E Testing** - CONDITIONAL for complex user flows only
   - Use Task tool to delegate to `playwright-dev-tester` agent
   - Only needed for: multi-step flows, authentication, checkout processes, integration testing
   - NOT needed for individual component implementation

**Important Notes:**
- ALL components MUST have Vitest tests
- Reusable UI components MUST also have Storybook stories with args/controls
- Delegate to testing agents in parallel when creating multiple components
- Continue with other work after delegation; don't wait for agents to complete
- The `senior-frontend-engineer` agent is configured to automatically trigger storybook-expert and react-component-tester agents

### Working with MCP Wrappers

**Usage Pattern:**
```typescript
import { figma, playwright, linear } from './servers';

// Call wrappers directly
const design = await figma.getDesignContext({ nodeId: '1:2' });

// Process data locally (NO context consumption!)
const components = design.layers
  .filter(layer => layer.type === 'COMPONENT')
  .map(extractSpecs);

// Only final results go to LLM
return components;
```

**Adding New MCP Server:**
1. Add config to `mcp/mcp-client.ts` MCP_SERVERS object
2. Create `mcp/servers/your-server/types.ts` with TypeScript interfaces
3. Create wrapper functions in `mcp/servers/your-server/*.ts` with JSDoc
4. Export from `mcp/servers/your-server/index.ts`
5. Add to `mcp/index.ts`

**Testing MCP Wrappers:**
- Run `servers/tests/test-simple.ts` to verify Linear connection
- Check examples in `servers/examples/` for workflow patterns
- All server code automatically loads `.env` via dotenv

### Storybook Integration

- Stories use CSF3 format with args and controls (for components with props)
- **Args/controls** enable interactive exploration of component props in Storybook UI
- Interaction tests defined in play functions (for interactive components)
- A11y addon enabled for accessibility testing
- Stories can be tested with `npm run test:storybook`
- **When to create stories**: Reusable UI components with props (Button, Card, Modal, Form, etc.)
- **When to skip stories**: Simple stateless pages/App components without props

## TypeScript Configuration

**Project References Structure:**
- `tsconfig.json` - Root config with references
- `tsconfig.app.json` - Application code config
- `tsconfig.node.json` - Vite/tooling config
- `mcp/tsconfig.json` - MCP server wrappers config

**Important Settings:**
- Strict mode enabled across all configs
- `@/` path alias maps to `./src/`
- ES2020 target for modern features
- JSX transform: `react-jsx` (no React import needed)

## Critical Files vs Reference Documentation

### ⚠️ IMPORTANT: Context Management

**ALWAYS EXPLORE:**
- `mcp/servers/` - **CRITICAL** - Explore this directory to discover available MCP tools/wrappers

**READ ONLY WHEN NEEDED:**
- Configuration files when modifying build/test setup
- Documentation files when you need specific implementation details

**NEVER AUTOMATICALLY READ:**
- Files in `docs/` directory - These are for reference only
- Do NOT read documentation files unless specifically relevant to current task
- Do NOT explore `docs/` for general context

### Key Configuration Files

**Frontend Configuration (read only when modifying config):**
- `vite.config.ts` - Build, dev server, and test configuration
- `eslint.config.js` - Linting rules with special server directory config
- `src/test/setup.ts` - Vitest setup with jest-dom matchers

**MCP Infrastructure (read only when debugging MCP connections):**
- `mcp/README.md` - Complete architecture documentation
- `mcp/QUICKSTART.md` - Quick start guide
- `mcp/mcp-client.ts` - Base MCP client implementation

### Reference Documentation Available (Do Not Auto-Read)

The following documentation exists for reference but should NOT be read automatically. Only read specific files when needed for your current task:

**MCP Documentation:** `docs/mcp/`
- Setup guides and success stories in `docs/mcp/setup/`
- Architecture and implementation in `docs/mcp/architecture/`

**Agent Documentation:** `docs/agents/`
- Workflow analysis and testing requirements

**Project Documentation:** `docs/project/`
- Implementation guides and Storybook documentation

## Important Constraints

**Token Efficiency - NO AUTO DOCUMENTATION:**
NEVER automatically create `.md` documentation files unless explicitly requested by the user.
Creating documentation consumes tokens unnecessarily. Only create `.md` files when:
- User explicitly asks: "document X"
- User asks: "create a guide for Y"
- Architecture decisions need formal recording

**Documentation Organization (if created):**
Only place in organized `docs/` structure:
- `docs/mcp/setup/` - MCP server setup guides, success stories, status updates
- `docs/mcp/architecture/` - MCP architecture, implementation summaries, restructure plans
- `docs/agents/` - Agent workflow analysis, testing requirements, agent coordination
- `docs/project/` - General project documentation, implementation guides, feature guides

Only `README.md` and `CLAUDE.md` should exist at the project root.

**ESLint Server Rules:**
When working in `mcp/` directory, the linter allows console.log and any types by design. Do not "fix" these - they are intentional for CLI tools and dynamic MCP responses.

**Environment Variables:**
The `.env` file is gitignored. Always use `.env.example` as reference. Linear API key is required for most MCP workflows.

**TypeScript in Servers:**
MCP response types are often dynamic. The `any` type is acceptable in wrapper return types, but parameters should be strongly typed.

**Path Aliases:**
Always use `@/` for src imports in frontend code. Do not use relative paths like `../../components`.

## Testing Strategy

**Component Tests** (Required for ALL components):
- Focus on user interactions and outcomes
- Use React Testing Library queries (getByRole, getByText)
- Test accessibility (ARIA attributes, keyboard navigation)
- Every component must have a `.test.tsx` file

**Storybook Stories** (Required for reusable UI components):
- Document all component states and variants with args/controls
- Use args to enable interactive prop exploration in Storybook UI
- Include interaction tests in play functions (for interactive components)
- Create stories for reusable components with props, skip for stateless pages

**E2E Tests with Playwright** (Conditional):
- Use for complex multi-step user flows (authentication, checkout, wizards)
- Use for integration testing across multiple pages
- Skip for individual component testing (covered by Vitest + Storybook)

**MCP Wrapper Tests:**
- Test actual MCP connections with `test-simple.ts`
- Examples serve as integration tests
- Type checking ensures wrapper signatures match usage

## Context Efficiency Note

When writing code that uses MCP wrappers, remember the pattern's purpose: **keep intermediate data out of LLM context**. Process data in TypeScript, not through multiple tool calls. This is why wrappers exist - to achieve 98.7% context savings.
