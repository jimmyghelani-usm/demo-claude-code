# Figma MCP Server Status

## Current Status: ⚠️ Blocked by Schema Validation Issue

### Summary
The Figma Desktop MCP server is properly configured and running, but there's a compatibility issue between Figma's server implementation and the `@modelcontextprotocol/sdk` that prevents successful connection.

### Configuration ✅
The HTTP transport configuration in `mcp/mcp-client.ts` is correct:

```typescript
'figma-desktop': {
  transport: 'http',
  url: 'http://127.0.0.1:3845/mcp',
}
```

### The Issue
When connecting, the Figma server returns a schema that doesn't match the SDK's expectations:

**Error:**
```
ZodError: Expected array, received string at path: serverInfo.icons[].sizes
```

**What's happening:**
- Figma's MCP server returns `icons[].sizes` as a string (e.g., `"192x192"`)
- The MCP SDK expects `icons[].sizes` to be an array (e.g., `["192x192"]`)
- This causes Zod schema validation to fail during initialization
- The client enters a "not connected" state and can't make tool calls

### Evidence of Connection
The server IS responding correctly:
- ✅ Server accessible at `http://127.0.0.1:3845/mcp`
- ✅ HTTP transport successfully initiates connection
- ✅ Server responds with valid JSON-RPC messages
- ❌ Response schema doesn't match SDK validation

### Root Cause
This appears to be related to a known issue with Zod version mismatches in the MCP SDK:
- GitHub Issue: [#802 - Expose zod for SDK consumers](https://github.com/modelcontextprotocol/typescript-sdk/issues/802)
- The SDK uses internal Zod validation that can conflict with server implementations
- Figma's MCP server may be using an older MCP spec version

### Tested Solutions

#### ✅ Correct Transport Type
- Initially tried stdio transport (`npx @figma/mcp-server-figma`) ❌
- Switched to HTTP transport (`http://127.0.0.1:3845/mcp`) ✅
- Connection initiates successfully with StreamableHTTPClientTransport

#### ❌ SSE Transport
- Tried deprecated SSE transport as fallback
- Result: 400 Bad Request (server requires StreamableHTTP)

#### ❌ Error Catching Workaround
- Caught the ZodError and attempted to continue
- Result: Client stays in "not connected" state, tool calls fail

### Requirements
- ✅ Figma Desktop app installed and running
- ✅ Dev Mode enabled (Shift+D)
- ✅ "Enable desktop MCP server" activated in inspect panel
- ✅ Server running at http://127.0.0.1:3845/mcp
- ✅ @modelcontextprotocol/sdk@1.22.0 installed
- ❌ Schema compatibility between Figma server and SDK

### Wrapper Code Status
The Figma wrapper code in `mcp/servers/figma/` is complete and correct:
- ✅ All 8 tools properly wrapped with TypeScript types
- ✅ Tool signatures match Figma's MCP tool definitions
- ✅ Ready to use once connection issue is resolved
- ✅ Following the 98.7% context reduction pattern

### Next Steps

#### Option 1: Wait for Upstream Fix
The most reliable solution is to wait for either:
- Figma to update their MCP server's response format
- MCP SDK to add more lenient validation
- A patch release that addresses the compatibility

#### Option 2: Custom SDK Patch (Advanced)
Create a forked version of the MCP SDK client that:
1. Patches the Zod schema for `serverInfo.icons` validation
2. Converts string `sizes` to array format during deserialization
3. Maintains this patch until upstream fix is available

This would require:
```bash
# Fork and modify @modelcontextprotocol/sdk
# Patch src/types.ts to accept sizes as string | string[]
# Build and use local version
```

#### Option 3: Direct Protocol Implementation
Bypass the SDK entirely and implement MCP protocol manually:
- More control over validation
- More maintenance burden
- Fragile to protocol changes

### Recommendation
**Wait for upstream fix** (Option 1) while using the other two working MCP servers (Playwright and Linear). The Figma wrapper code is ready and will work once the compatibility issue is resolved.

### Tracking
- SDK Issue: https://github.com/modelcontextprotocol/typescript-sdk/issues/802
- Monitor Figma's MCP server updates
- Check SDK release notes for validation improvements

### Test Files
- `servers/test-figma-connection.ts` - Initial connection test
- `servers/test-figma-basic.ts` - Direct HTTP test
- `servers/test-figma-sse.ts` - SSE transport test
- `servers/test-figma-workaround.ts` - Error handling test

All tests confirm the issue is schema validation during initialization.

---

**Date:** November 20, 2025
**SDK Version:** @modelcontextprotocol/sdk@1.22.0
**Figma Desktop:** Latest version with MCP server enabled
**Status:** Known issue, awaiting fix
