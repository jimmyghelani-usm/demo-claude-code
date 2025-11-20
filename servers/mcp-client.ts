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
import { config } from 'dotenv';

// Load environment variables from .env file
config();

interface MCPServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

// Server configurations
const MCP_SERVERS: Record<string, MCPServerConfig> = {
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

  const transport = new StdioClientTransport({
    command: config.command,
    args: config.args,
    env: envVars,
  });

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
 * Call an MCP tool on a specific server
 */
export async function callMCPTool<T = any>(
  serverName: keyof typeof MCP_SERVERS,
  toolName: string,
  args: Record<string, any> = {}
): Promise<T> {
  const client = await getMCPClient(serverName);

  const result = await client.callTool({
    name: toolName,
    arguments: args,
  });

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
  for (const [name, client] of clientCache.entries()) {
    await client.close();
    clientCache.delete(name);
  }
}
