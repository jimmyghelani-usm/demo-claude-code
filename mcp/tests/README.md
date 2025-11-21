# MCP Server Tests

This directory contains test files for verifying MCP server connections and wrapper functionality.

## Test Organization

### Working Integration Tests

These tests verify the complete MCP wrapper functionality with real server connections:

- **`test-simple.ts`** - Basic Linear MCP integration test
  - Tests: `listTeams()`, `listIssues()`, `getUser()`
  - Run: `npx tsx servers/tests/test-simple.ts`
  - Status: ✅ Working

- **`test-figma-with-client.ts`** - Figma Desktop MCP integration test
  - Tests: Connection, tool listing, `get_design_context` tool
  - Run: `npx tsx servers/tests/test-figma-with-client.ts`
  - Status: ✅ Working
  - Requires: Figma Desktop app running with Dev Mode enabled

- **`test-linear-with-client.ts`** - Comprehensive Linear MCP test
  - Tests: OAuth flow, tool listing, teams, users, issues
  - Run: `npx tsx servers/tests/test-linear-with-client.ts`
  - Status: ✅ Working
  - Note: First run triggers OAuth browser authorization

### Exploratory/Debug Tests

These tests were created during development to explore different connection approaches:

#### Figma Connection Tests
- `test-figma-connection.ts` - Initial SDK connection attempt
- `test-figma-basic.ts` - Direct HTTP endpoint test
- `test-figma-sse.ts` - SSE transport exploration
- `test-figma-workaround.ts` - SDK error handling test
- `test-figma-direct.ts` - Direct HTTP implementation
- `test-figma-no-init.ts` - Direct tool call without initialization

#### Playwright Tests
- `test-playwright.ts` - Basic Playwright MCP test
- `test-playwright-basic.ts` - Simple Playwright connection
- `test-playwright-correct.ts` - Corrected Playwright test
- `test-official-playwright.ts` - Official package test

#### MCP Connection Tests
- `test-mcp-connection.ts` - General MCP connection debugging

## Quick Start

### Test Linear MCP
```bash
npx tsx servers/tests/test-simple.ts
```

### Test Figma MCP
```bash
# Make sure Figma Desktop is running with Dev Mode (Shift+D)
npx tsx servers/tests/test-figma-with-client.ts
```

### Test Linear MCP (Comprehensive)
```bash
npx tsx servers/tests/test-linear-with-client.ts
```

## Requirements

### Linear
- ✅ `mcp-remote` package (installed automatically via npx)
- ✅ OAuth authentication (browser opens on first run)
- ✅ Internet connection

### Figma
- ✅ Figma Desktop app installed and running
- ✅ Dev Mode enabled (press Shift+D)
- ✅ "Enable desktop MCP server" setting activated
- ✅ Figma file open in desktop app

### Playwright
- ✅ Browser installed (Chromium, Firefox, or WebKit)
- ✅ Playwright MCP server package

## Environment Setup

Tests automatically load environment variables from `.env` file in the project root:

```bash
# Copy example file
cp .env.example .env

# Edit .env (optional - Linear uses OAuth)
# LINEAR_API_KEY=your-key-here  # Optional for Linear
```

## Understanding Test Results

### Successful Test Output
```
✓ Client obtained
✓ Found X tools
✅ SUCCESS! Received data from server
```

### Common Issues

**"Connection refused"**
- Make sure the MCP server is running (for Figma Desktop)
- Check internet connection (for Linear remote server)

**"No teams found"**
- Verify you have workspace access
- Check OAuth authorization completed (Linear)

**"Module not found"**
- Run test from project root: `npx tsx servers/tests/test-name.ts`
- Ensure imports use `../` for parent directory

## Test File Structure

All test files follow this pattern:

```typescript
import { config } from 'dotenv';
import { getMCPClient, callMCPTool } from '../mcp-client.js';

config(); // Load .env

async function testSomething() {
  try {
    // 1. Get MCP client
    const client = await getMCPClient('server-name');

    // 2. List available tools
    const tools = await client.listTools();

    // 3. Call specific tool
    const result = await callMCPTool('server-name', 'tool_name', params);

    // 4. Verify result
    console.log('✅ SUCCESS!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testSomething();
```

## Related Documentation

- [../README.md](../README.md) - MCP wrapper architecture
- [../QUICKSTART.md](../QUICKSTART.md) - Quick start guide
- [../../docs/mcp/setup/FIGMA_MCP_SUCCESS.md](../../docs/mcp/setup/FIGMA_MCP_SUCCESS.md) - Figma implementation details
- [../../docs/mcp/setup/LINEAR_MCP_SUCCESS.md](../../docs/mcp/setup/LINEAR_MCP_SUCCESS.md) - Linear implementation details
