/**
 * Linear Comments Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import { ListCommentsParams, CreateCommentParams } from './types.js';

/**
 * List comments for a specific Linear issue
 *
 * @example
 * ```ts
 * const comments = await listComments({ issueId: 'ISS-123' });
 * ```
 */
export async function listComments(params: ListCommentsParams): Promise<any> {
  return callMCPTool('linear-server', 'list_comments', params);
}

/**
 * Create a comment on a specific Linear issue
 *
 * @example
 * ```ts
 * await createComment({
 *   issueId: 'ISS-123',
 *   body: 'Great work on this!'
 * });
 * ```
 */
export async function createComment(params: CreateCommentParams): Promise<any> {
  return callMCPTool('linear-server', 'create_comment', params);
}
