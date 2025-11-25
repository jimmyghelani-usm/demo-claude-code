# Vite + React + TypeScript Project

A modern React application built with Vite, TypeScript, and best practices for code quality and testing.

## Features

- **Vite** - Lightning-fast builds and HMR
- **React 18** - Latest React with TypeScript
- **TypeScript** - Strict mode with comprehensive type checking
- **ESLint** - Modern flat config with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **Vitest** - Fast unit testing with React Testing Library
- **Path Aliases** - Clean imports with `@/` alias

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Available Scripts

#### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:3000` with hot module replacement.

#### Building

```bash
npm run build
```

Type checks and builds the project for production. Output is in the `dist/` directory.

```bash
npm run preview
```

Preview the production build locally.

#### Testing

```bash
npm run test
```

Runs tests in watch mode.

```bash
npm run test:run
```

Runs tests once (useful for CI).

```bash
npm run test:ui
```

Launches the Vitest UI for interactive test debugging.

#### Code Quality

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

```bash
npm run lint:fix
```

Automatically fixes ESLint issues where possible.

```bash
npm run format
```

Formats code with Prettier.

```bash
npm run format:check
```

Checks if code is formatted correctly.

```bash
npm run type-check
```

Type checks the code without emitting files.

## Project Structure

```
demo-claude-code/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── test/           # Test setup and utilities
│   │   └── setup.ts    # Vitest setup file
│   ├── App.tsx         # Main App component
│   ├── App.test.tsx    # App component tests
│   ├── main.tsx        # Application entry point
│   ├── App.css         # App styles
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript project references
├── tsconfig.app.json   # App TypeScript config
├── tsconfig.node.json  # Node/tooling TypeScript config
├── eslint.config.js    # ESLint flat config
├── .prettierrc         # Prettier configuration
└── package.json        # Project dependencies and scripts
```

## Configuration Details

### Vite

- **Port**: Development server runs on port 3000
- **Build**: Optimized production builds with code splitting
- **HMR**: Hot module replacement enabled
- **Source Maps**: Enabled for debugging
- **Code Splitting**: React vendor chunk separated for better caching

### TypeScript

- **Strict Mode**: All strict type checking options enabled
- **Path Aliases**: `@/` maps to `./src/`
- **Target**: ES2020 for modern browser features
- **JSX**: `react-jsx` for automatic JSX transform

### ESLint

- **Config Format**: Modern flat config (ESLint 9+)
- **Rules**: Recommended rules for JavaScript, TypeScript, React, and React Hooks
- **React Refresh**: Enforces best practices for HMR
- **No Unused Vars**: Enforced with `_` prefix exceptions

### Prettier

- **Style**: Single quotes, no semicolons
- **Line Width**: 80 characters
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 compatible

### Vitest

- **Environment**: jsdom for DOM testing
- **Globals**: Enabled for cleaner test syntax
- **Setup**: Automatic cleanup and jest-dom matchers
- **UI**: Interactive test UI available

## Tips

- Use `@/` for imports: `import { Component } from '@/components/Component'`
- Run `npm run lint:fix && npm run format` before committing
- All tests must pass before building
- TypeScript strict mode helps catch bugs early

## License

ISC

## Claude Agents and Commands

This repo includes a full Claude Code setup in `.claude/` with reusable agents and orchestrated commands.

### Agents (`.claude/agents/`)
- **senior-frontend-engineer**: Implement or refactor React + TypeScript UI. Always delegates to testing agents after implementation.
- **storybook-expert**: Create/maintain Storybook CSF3 stories with args/controls and interaction tests (`storybook/test`).
- **react-component-tester**: Write Vitest + React Testing Library tests for all components (interaction, conditional paths, a11y).
- **playwright-dev-tester**: E2E checks, screenshots, and visual verification against Figma using Playwright MCP wrappers.
- **figma-design-analyzer**: Extract Figma specs via MCP (colors, typography, spacing) and capture mandatory screenshots.
- **prd-writer**: Generate concise PRDs (requirements P0/P1/P2, success criteria, technical notes).
- **mcp-wrapper-builder**: Create/modify MCP wrappers following the 98.7% context-reduction pattern.
- **vite-react-tooling**: Optimize and troubleshoot Vite/TypeScript/ESLint tooling.
- **claude-code-configurator**: Update anything under `.claude` (agents, commands, hooks, skills).

Key principle: implementation agents must trigger testing agents (stories + tests) automatically and in parallel.

### Commands (`.claude/commands/`)

#### `/orchestrate` - Multi-Agent Workflow Orchestrator

The orchestrate command is the central hub for coordinating complex multi-agent workflows. It intelligently routes work to specialized agents based on your input type (Linear ticket, Figma design, PRD requirements, or custom prompt).

**Available Workflow Types:**

##### 1. Linear Ticket Workflow
Fetch a Linear ticket, analyze attached designs, implement, test, and update the ticket.

```bash
/orchestrate linear FE-123
```

**What happens:**
- Fetches Linear ticket context (title, description, Figma URLs)
- Analyzes Figma designs attached to ticket
- Implements components with multiple parallel engineers (scaled by complexity)
- Creates Storybook stories and unit tests in parallel
- Runs visual verification against Figma
- Type checks and runs all tests
- Updates Linear ticket with completion status

**Agents involved (6):** mcp-execution-agent → figma-design-analyzer → senior-frontend-engineer (1-4 parallel) → storybook-expert + react-component-tester (parallel) → playwright-dev-tester

---

##### 2. Figma Design Workflow
Analyze one or more Figma designs and implement them directly.

```bash
/orchestrate figma https://figma.com/file/ABC?node-id=1413-14114
```

**Multiple designs:**
```bash
/orchestrate figma https://figma.com/file/ABC?node-id=1413-14114 https://figma.com/file/ABC?node-id=1413-15016
```

**What happens:**
- Extracts design specifications from all provided Figma URLs
- Implements components with parallel engineers (scaled by design complexity)
- Creates comprehensive Storybook documentation
- Writes unit tests for all components
- Performs visual verification against original designs
- Validates implementation with type checking and test runs

**Agents involved (5):** figma-design-analyzer → senior-frontend-engineer (1-4 parallel) → storybook-expert + react-component-tester (parallel) → playwright-dev-tester

---

##### 3. PRD Workflow
Create a Product Requirements Document, optionally with Figma reference and immediate implementation.

**Basic PRD creation:**
```bash
/orchestrate prd Add dark mode toggle with system preference detection and manual override
```

**PRD with Figma reference:**
```bash
/orchestrate prd Implement new checkout flow --figma https://figma.com/file/ABC?node-id=2171-13039
```

**PRD with immediate implementation:**
```bash
/orchestrate prd Create responsive navigation menu with mobile drawer --implement
```

**PRD with Figma + implementation:**
```bash
/orchestrate prd Build product card grid with filters --figma https://figma.com/file/ABC?node-id=1413-14114 --implement
```

**What happens (basic):**
- Analyzes requirements and asks clarifying questions
- Creates structured PRD with P0/P1/P2 priorities and success criteria
- Stops and asks for next steps

**What happens (with --implement):**
- Creates PRD as above
- Optionally analyzes Figma designs (if --figma provided)
- Implements components with parallel engineers
- Creates documentation and tests
- Runs validation checks

**Agents involved:**
- Basic: prd-writer (1 agent)
- With --implement: prd-writer → [figma-design-analyzer] → senior-frontend-engineer (1-4 parallel) → storybook-expert + react-component-tester (parallel) → playwright-dev-tester (5-6 agents)

---

##### 4. Prompt Workflow (Flexible)
Use natural language to orchestrate custom agent combinations.

```bash
/orchestrate prompt
```

Then provide instructions like:
- "Analyze these three Figma designs and create a component library"
- "Implement the hero section and navigation, then test them"
- "Create Storybook stories for all components in src/components/ui"
- "Run visual tests on the checkout flow"

**What happens:**
- Analyzes your prompt to determine required agents
- Selects from: figma-design-analyzer, senior-frontend-engineer, storybook-expert, react-component-tester, playwright-dev-tester
- Orchestrates agents in optimal order with parallelization
- Adapts to your specific needs

**Agents involved:** Variable based on prompt (1-5+ agents)

---

**Key Features:**
- **Intelligent Scaling**: Automatically runs 1-4 parallel frontend engineers based on design complexity
- **Parallel Execution**: Independent agents run simultaneously for maximum speed
- **Context Efficiency**: Uses MCP wrappers (98.7% context reduction) for all external tool calls
- **Full Coverage**: Every workflow includes implementation, documentation (stories), and tests
- **Visual Verification**: Playwright agent compares implementations against Figma designs
- **Type Safety**: Validates TypeScript compilation before completing

**Alternative Commands (Legacy):**
- **/implement-linear <ticket-id>**: Equivalent to `/orchestrate linear <ticket-id>`
- **/implement-design <figma-urls>**: Equivalent to `/orchestrate figma <url> [url ...]`
- **/prd <requirements>**: Equivalent to `/orchestrate prd <requirements>`

Notes:
- Agents return content in responses, not files. Screenshots are the exception and must be saved.
- Figma screenshots go to `docs/temp/figma-screenshots/`; Playwright screenshots go to `docs/temp/playwright-screenshots/`.

## MCP Server Wrappers (Code Execution with MCP)

This project implements Anthropic’s “code execution with MCP” pattern, achieving a ~98.7% context reduction by wrapping tools as typed functions and keeping intermediate MCP responses out of LLM context.

Import pattern:
```ts
import { figma, playwright, linear } from './mcp';
```

### Servers and Tools
- **Figma** (`mcp/servers/figma/`)
  - Tools: `getDesignContext`, `getVariableDefs`, `getScreenshot`, `getCodeConnectMap`, `addCodeConnectMap`, `getMetadata`, `createDesignSystemRules`, `getFigJam`
  - Requirements: Figma Desktop running, Dev Mode enabled, Desktop MCP server enabled, Node ID from URL (`node-id=XXXX-XXXXX` → `XXXX:XXXXX`)
- **Playwright** (`mcp/servers/playwright/`)
  - Categories: `browser` (launch/close), `navigation` (navigate, back), `interactions` (click, type, fillForm), `capture` (takeScreenshot, snapshot, consoleMessages), `advanced` (waitFor, evaluate)
- **Linear** (`mcp/servers/linear/`)
  - Areas: `issues`, `comments`, `documents`, `projects`, `labels`, `teams`, `users`, `cycles`, `issueStatuses`, plus helper `documentation` and GraphQL fallback

### Usage Examples
```ts
// Figma
const design = await figma.getDesignContext({ nodeId: '1413:14114', clientFrameworks: 'react', clientLanguages: 'typescript' });
const screenshot = await figma.getScreenshot({ nodeId: '1413:14114', filename: 'docs/temp/figma-screenshots/hero-<date>.png' });

// Playwright
await playwright.navigate({ url: 'http://localhost:3000' });
await playwright.click({ element: 'Login button', ref: 'button#login' });
await playwright.takeScreenshot({ filename: 'docs/temp/playwright-screenshots/login-<date>.png', fullPage: true });

// Linear
const issue = await linear.getIssue({ id: 'ENG-123' });
await linear.createComment({ issueId: 'ENG-123', body: 'Implementation complete with tests.' });
```

### Environment & Transport
- Figma uses an HTTP client with SSE parsing to bypass schema validation for the desktop MCP (`http://127.0.0.1:3845/mcp`).
- Linear uses `mcp-remote` over stdio; set `LINEAR_API_KEY` in `.env` (see `mcp/mcp-client.ts`).
- Playwright uses the official MCP server via `npx @playwright/mcp`.

### Helpful Scripts
- Fetch a Linear issue:
  ```bash
  npx tsx mcp/tests/get-issue.ts ENG-123
  ```

## Dev Server & Testing Tips
- Always check if servers are already running before starting new ones:
  ```bash
  lsof -ti:3000 # dev server
  lsof -ti:6006 # storybook
  ```
- Recommended verification after implementations:
  ```bash
  npm run type-check && npm run test:run
  ```
