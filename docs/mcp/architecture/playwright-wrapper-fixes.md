# Playwright MCP Wrapper Fixes

## Issues Identified

### 1. Timeout Issues
**Problem**: The default 5-second timeout was too short for Playwright browser operations, causing MCP_TIMEOUT errors.

**Root Cause**:
- Browser startup takes time
- Page navigation and loading can be slow
- Screenshot capture requires page to be fully rendered

**Solution**: Increased timeout for Playwright MCP calls from 5s to 30s in `mcp/mcp-client.ts`:

```typescript
// Before
const timeoutMs = serverName === 'figma-desktop' ? 15000 : 5000;

// After
let timeoutMs = 5000;
if (serverName === 'figma-desktop') {
  timeoutMs = 15000;
} else if (serverName === 'playwright') {
  timeoutMs = 30000;  // Increased for browser operations
}
```

### 2. Silent Failures
**Problem**: Navigation and screenshot errors were not being detected, returning string error messages instead of throwing exceptions.

**Root Cause**: MCP server returns errors as strings like `"### Result\nError: ..."` instead of structured error objects.

**Solution**: Added error detection in wrapper functions:

```typescript
// navigation.ts
export async function navigate(params: BrowserNavigateParams): Promise<any> {
  const result = await callMCPTool('playwright', 'browser_navigate', params);

  // Check if result indicates an error
  if (typeof result === 'string' && result.includes('Error:')) {
    throw new Error(`Navigation failed: ${result}`);
  }

  return result;
}
```

### 3. Screenshot Format Misunderstanding
**Problem**: Code assumed screenshots would return base64 data, but Playwright MCP server saves files to a temp directory and returns the file path as a string.

**Root Cause**: Incorrect assumption about the MCP server's behavior.

**Actual Behavior**:
```typescript
const result = await takeScreenshot({ filename: 'test.png' });
// Returns:
// "### Result\nTook the full page screenshot and saved it as /var/folders/.../test.png"
```

**Solution**:

1. Updated `takeScreenshot()` documentation to clarify behavior
2. Created utility functions in `mcp/servers/playwright/utils.ts`:
   - `extractScreenshotPath()` - Extract file path from result string
   - `copyScreenshot()` - Copy screenshot from temp to destination
   - `readScreenshot()` - Read screenshot as Buffer

### 4. Browser Isolation Issues
**Problem**: Multiple MCP server instances trying to use the same browser cache directory.

**Root Cause**: MCP client was creating new server instances without reusing connections.

**Solution**: The existing client cache in `mcp-client.ts` handles this, but users must ensure old instances are closed before starting new ones.

## New Features Added

### 1. Safe Navigation with Wait
Added `navigateAndWait()` function that combines navigation with automatic page load waiting:

```typescript
// Before: Manual navigation + wait
await navigate({ url: 'https://example.com' });
await waitFor({ time: 2 });

// After: Single call
await navigateAndWait('https://example.com', 2);
```

### 2. Screenshot Utilities
New utility functions for working with Playwright screenshots:

```typescript
import { copyScreenshot, extractScreenshotPath } from './mcp';

const result = await playwright.takeScreenshot({ filename: 'test.png' });

// Extract path
const tempPath = extractScreenshotPath(result);

// Copy to output directory
await copyScreenshot(result, '/path/to/output/test.png');
```

## Testing Results

Ran 3 consecutive tests to verify reliability:

```
============================================================
SUMMARY
============================================================

Passed: 3/3
Failed: 0/3

✅ All tests passed! Playwright wrapper is working reliably.
```

All screenshots:
- Successfully captured
- Consistent file size (16,667 bytes for example.com)
- Valid PNG format (1280x720 resolution)
- No blank pages or failures

## Usage Recommendations

### For Navigation
```typescript
// Use navigateAndWait() for reliable page loading
await playwright.navigateAndWait('https://example.com', 2);

// Or manually handle
await playwright.navigate({ url: 'https://example.com' });
await playwright.waitFor({ time: 2 });
```

### For Screenshots
```typescript
import { playwright } from './mcp';
import { copyScreenshot } from './mcp';

// Take screenshot
const result = await playwright.takeScreenshot({
  filename: 'page.png',
  fullPage: true
});

// Copy to output directory
await copyScreenshot(result, '/path/to/output/page.png');
```

### Error Handling
All wrapper functions now throw errors for failures:

```typescript
try {
  await playwright.navigate({ url: 'https://invalid-url.com' });
} catch (error) {
  console.error('Navigation failed:', error.message);
}
```

## Files Modified

1. `mcp/mcp-client.ts` - Increased Playwright timeout to 30s
2. `mcp/servers/playwright/navigation.ts` - Added error detection and `navigateAndWait()`
3. `mcp/servers/playwright/capture.ts` - Updated `takeScreenshot()` with proper documentation
4. `mcp/servers/playwright/utils.ts` - NEW: Screenshot utility functions
5. `mcp/servers/playwright/index.ts` - Export new utilities

## Breaking Changes

None - all changes are backward compatible. The `takeScreenshot()` function still returns the same format, we just added utilities to work with it more easily.
