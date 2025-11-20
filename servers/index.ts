/**
 * MCP Server Wrappers
 *
 * This module implements the wrapper pattern described in Anthropic's article:
 * https://www.anthropic.com/engineering/code-execution-with-mcp
 *
 * Instead of exposing MCP tools directly to the LLM (which consumes massive
 * context and includes all intermediate responses), we provide typed wrapper
 * functions that the LLM can call. These wrappers internally use MCP clients
 * to communicate with servers, keeping intermediate responses out of the
 * LLM context.
 *
 * Benefits:
 * - 98.7% reduction in context usage (as shown in Anthropic's case study)
 * - Only final results are sent back to the LLM
 * - Progressive disclosure - tools are discovered by exploring this directory
 * - Familiar programming patterns instead of sequential tool calls
 * - Type safety with TypeScript
 *
 * @example
 * ```ts
 * // Import specific server wrappers
 * import { getDesignContext } from './servers/figma';
 * import { navigate, click } from './servers/playwright';
 * import { createIssue, listIssues } from './servers/linear';
 *
 * // Use them in your code
 * const design = await getDesignContext({ nodeId: '1:2' });
 * await navigate({ url: 'https://example.com' });
 * const issues = await listIssues({ assignee: 'me' });
 * ```
 */

export * as figma from './figma/index.js';
export * as playwright from './playwright/index.js';
export * as linear from './linear/index.js';
export { getMCPClient, callMCPTool, closeAllClients } from './mcp-client.js';
