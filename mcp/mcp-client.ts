/**
 * Base MCP Client for making tool calls to MCP servers
 * This implements the wrapper pattern from Anthropic's article:
 * https://www.anthropic.com/engineering/code-execution-with-mcp
 *
 * Instead of exposing MCP tools directly to the LLM, we create typed
 * wrapper functions that the LLM calls. These wrappers internally
 * use MCP clients to communicate with servers, keeping intermediate
 * responses out of the LLM context.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

/**
 * Lightweight Figma MCP client that bypasses SDK validation
 * This is a workaround for the schema validation error with Figma Desktop MCP server
 */
class FigmaDirectClient {
  private url: string;
  private messageId = 1;
  private sessionId?: string;
  private initialized = false;

  constructor(url: string) {
    this.url = url;
  }

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Initialize with proper Accept headers for Streamable HTTP protocol
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'initialize',
          params: {
            protocolVersion: '2024-11-05',
            capabilities: {},
            clientInfo: {
              name: 'figma-mcp-client',
              version: '1.0.0',
            },
          },
          id: this.messageId++,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Initialization failed: HTTP ${response.status} - ${errorText}`);
      }

      // Response might be SSE stream, parse it
      const responseText = await response.text();

    // Simple SSE parser - look for data: lines
    let initData: any = null;

    if (responseText.startsWith('event:') || responseText.startsWith('data:')) {
      // Parse SSE format
      const lines = responseText.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            initData = JSON.parse(line.substring(6));
            break;
          } catch (e) {
            // Continue looking
          }
        }
      }
    } else {
      // Regular JSON
      try {
        initData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', responseText.substring(0, 200));
        throw e;
      }
    }

    if (!initData) {
      throw new Error('Failed to parse initialization response');
    }

    if (initData.error) {
      // If it's the known icons.sizes validation error, we can ignore it
      console.warn('⚠️  Initialization returned error (expected - schema mismatch):', initData.error.message);
    }

    // Extract session ID from headers if present
    const sessionHeader = response.headers.get('mcp-session-id');
    if (sessionHeader) {
      this.sessionId = sessionHeader;
    }

      // Send initialized notification
      await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.sessionId ? { 'Mcp-Session-Id': this.sessionId } : {}),
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'notifications/initialized',
          params: {},
        }),
      });

      this.initialized = true;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Figma MCP initialization timeout');
      }
      throw error;
    }
  }

  async callTool(request: { name: string; arguments?: Record<string, any> }): Promise<any> {
    await this.ensureInitialized();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for tool calls

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          ...(this.sessionId ? { 'Mcp-Session-Id': this.sessionId } : {}),
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: request.name,
            arguments: request.arguments || {},
          },
          id: this.messageId++,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response (might be SSE or JSON)
      const responseText = await response.text();
      let data: any = null;

    if (responseText.startsWith('event:') || responseText.startsWith('data:')) {
      const lines = responseText.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            data = JSON.parse(line.substring(6));
            break;
          } catch (e) {
            // Continue
          }
        }
      }
    } else {
      data = JSON.parse(responseText);
    }

    if (!data) {
      throw new Error('Failed to parse tool call response');
    }

      if (data.error) {
        throw new Error(`MCP Error ${data.error.code}: ${data.error.message || JSON.stringify(data.error)}`);
      }

      return data.result;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Figma MCP tool call timeout');
      }
      throw error;
    }
  }

  async listTools(): Promise<any> {
    await this.ensureInitialized();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          ...(this.sessionId ? { 'Mcp-Session-Id': this.sessionId } : {}),
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          params: {},
          id: this.messageId++,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response (might be SSE or JSON)
      const responseText = await response.text();
      let data: any = null;

    if (responseText.startsWith('event:') || responseText.startsWith('data:')) {
      const lines = responseText.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            data = JSON.parse(line.substring(6));
            break;
          } catch (e) {
            // Continue
          }
        }
      }
    } else {
      data = JSON.parse(responseText);
    }

    if (!data) {
      throw new Error('Failed to parse tools list response');
    }

      if (data.error) {
        throw new Error(`MCP Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      return data.result;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Figma MCP list tools timeout');
      }
      throw error;
    }
  }

  async close(): Promise<void> {
    // No-op for HTTP client
    this.initialized = false;
  }
}

interface MCPServerConfig {
  transport: 'stdio' | 'http';
  // For stdio transport
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  // For HTTP transport
  url?: string;
}

// Server configurations
const MCP_SERVERS: Record<string, MCPServerConfig> = {
  'figma-desktop': {
    transport: 'http',
    url: 'http://127.0.0.1:3845/mcp',
  },
  'playwright': {
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@playwright/mcp@latest'],
  },
  'linear-server': {
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'mcp-remote', 'https://mcp.linear.app/mcp'],
    env: {
      LINEAR_API_KEY: process.env.LINEAR_API_KEY || '',
    },
  },
};

// Client cache to reuse connections
const clientCache = new Map<string, Client>();

/**
 * Get or create an MCP client for a specific server
 */
export async function getMCPClient(serverName: keyof typeof MCP_SERVERS): Promise<Client> {
  if (clientCache.has(serverName)) {
    return clientCache.get(serverName)!;
  }

  const config = MCP_SERVERS[serverName];
  if (!config) {
    throw new Error(`Unknown MCP server: ${serverName}`);
  }

  // Special case: Use direct HTTP client for Figma to bypass schema validation
  if (serverName === 'figma-desktop' && config.transport === 'http') {
    if (!config.url) {
      throw new Error(`HTTP transport requires a URL for server: ${serverName}`);
    }
    const figmaClient = new FigmaDirectClient(config.url);
    // Cast to Client type - it implements the required interface (callTool, close)
    const client = figmaClient as unknown as Client;
    clientCache.set(serverName, client);
    return client;
  }

  let transport;

  if (config.transport === 'http') {
    // HTTP transport for other servers
    if (!config.url) {
      throw new Error(`HTTP transport requires a URL for server: ${serverName}`);
    }
    transport = new StreamableHTTPClientTransport(new URL(config.url));
  } else {
    // Stdio transport for npm package servers
    if (!config.command || !config.args) {
      throw new Error(`Stdio transport requires command and args for server: ${serverName}`);
    }

    // Merge environment variables, filtering out undefined values
    const envVars: Record<string, string> = {};
    for (const [key, value] of Object.entries(process.env)) {
      if (value !== undefined) {
        envVars[key] = value;
      }
    }
    if (config.env) {
      for (const [key, value] of Object.entries(config.env)) {
        if (value !== undefined) {
          envVars[key] = value;
        }
      }
    }

    transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env: envVars,
    });
  }

  const client = new Client(
    {
      name: `mcp-client-${serverName}`,
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  await client.connect(transport);
  clientCache.set(serverName, client);

  return client;
}

/**
 * Timeout wrapper for MCP calls (default 5 seconds)
 */
async function withTimeout<T>(promise: Promise<T>, ms: number = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('MCP_TIMEOUT')), ms)
    ),
  ]);
}

/**
 * Call an MCP tool on a specific server with automatic timeout protection
 */
export async function callMCPTool<T = any>(
  serverName: keyof typeof MCP_SERVERS,
  toolName: string,
  args: Record<string, any> = {}
): Promise<T> {
  const client = await getMCPClient(serverName);

  const result = await withTimeout(
    client.callTool({
      name: toolName,
      arguments: args,
    }),
    5000 // 5 second timeout for all MCP calls
  );

  // Parse and return the result
  if (result.content && Array.isArray(result.content) && result.content.length > 0) {
    const firstContent = result.content[0];
    if (firstContent && typeof firstContent === 'object' && 'type' in firstContent && firstContent.type === 'text' && 'text' in firstContent) {
      try {
        return JSON.parse(firstContent.text as string) as T;
      } catch {
        return firstContent.text as T;
      }
    }
  }

  return result as T;
}

/**
 * Close all MCP client connections
 */
export async function closeAllClients(): Promise<void> {
  const entries = Array.from(clientCache.entries());
  for (const [name, client] of entries) {
    await client.close();
    clientCache.delete(name);
  }
}
