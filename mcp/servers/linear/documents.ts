/**
 * Linear Documents Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import { GetDocumentParams, ListDocumentsParams } from './types.js';

/**
 * Retrieve a Linear document by ID or slug
 *
 * @example
 * ```ts
 * const doc = await getDocument({ id: 'doc-123' });
 * ```
 */
export async function getDocument(params: GetDocumentParams): Promise<any> {
  return callMCPTool('linear-server', 'get_document', params);
}

/**
 * List documents in the Linear workspace
 *
 * @example
 * ```ts
 * const docs = await listDocuments({
 *   query: 'architecture',
 *   limit: 10
 * });
 * ```
 */
export async function listDocuments(params: ListDocumentsParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_documents', params);
}
