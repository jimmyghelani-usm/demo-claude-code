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

## Architecture

### Frontend Structure

**Component Organization:**
- `src/components/ui/` - Reusable UI components (Button, IconButton)
- `src/components/sections/` - Page sections (HeroSection, FAQSection, HowItWorksSection)
- All components have corresponding `.stories.tsx` and `.test.tsx` files

**Import Aliases:**
- Use `@/` for all src imports: `import { Button } from '@/components/ui'`
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
4. **Storybook Stories** - REQUIRED for reusable UI components
   - Use Task tool to delegate to `storybook-expert` agent
   - Provide complete component context (props, variants, states, interactions)
   - Agent creates comprehensive stories with args, controls, and play functions

5. **Component Tests** - REQUIRED for ALL components
   - Use Task tool to delegate to `react-component-tester` agent
   - Provide component context (file path, props, behaviors, edge cases)
   - Agent creates tests using Vitest + React Testing Library
   - Tests must cover user interactions, conditional rendering, and accessibility

**Important Notes:**
- ALL components MUST have tests (either Storybook interaction tests OR Vitest functional tests)
- Delegate to agents in parallel when creating multiple components
- Continue with other work after delegation; don't wait for agents to complete
- The `senior-frontend-engineer` agent is configured to automatically trigger both testing agents

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

- Stories use CSF3 format with args and controls
- Interaction tests defined in play functions
- A11y addon enabled for accessibility testing
- Stories can be tested with `npm run test:storybook`

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

**Documentation Organization:**
NEVER create markdown documentation files at the project root. Always place them in the organized `docs/` directory structure:
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

**Component Tests:**
- Focus on user interactions and outcomes
- Use React Testing Library queries (getByRole, getByText)
- Test accessibility (ARIA attributes, keyboard navigation)

**Storybook Stories:**
- Document all component states and variants
- Include interaction tests in play functions
- Use args for interactive controls

**MCP Wrapper Tests:**
- Test actual MCP connections with `test-simple.ts`
- Examples serve as integration tests
- Type checking ensures wrapper signatures match usage

## Context Efficiency Note

When writing code that uses MCP wrappers, remember the pattern's purpose: **keep intermediate data out of LLM context**. Process data in TypeScript, not through multiple tool calls. This is why wrappers exist - to achieve 98.7% context savings.
