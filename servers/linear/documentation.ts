/**
 * Linear Documentation Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import { SearchDocumentationParams } from './types.js';

/**
 * Search Linear's documentation to learn about features and usage
 *
 * @example
 * ```ts
 * const results = await searchDocumentation({
 *   query: 'issue workflows',
 *   page: 0
 * });
 * ```
 */
export async function searchDocumentation(params: SearchDocumentationParams): Promise<any> {
  return callMCPTool('linear-server', 'search_documentation', params);
}
