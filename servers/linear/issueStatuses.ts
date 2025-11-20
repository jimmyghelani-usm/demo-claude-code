/**
 * Linear Issue Statuses Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import { ListIssueStatusesParams, GetIssueStatusParams } from './types.js';

/**
 * List available issue statuses in a Linear team
 *
 * @example
 * ```ts
 * const statuses = await listIssueStatuses({ team: 'Engineering' });
 * ```
 */
export async function listIssueStatuses(params: ListIssueStatusesParams): Promise<any> {
  return callMCPTool('linear-server', 'list_issue_statuses', params);
}

/**
 * Retrieve detailed information about an issue status
 *
 * @example
 * ```ts
 * const status = await getIssueStatus({
 *   id: 'status-123',
 *   name: 'In Progress',
 *   team: 'Engineering'
 * });
 * ```
 */
export async function getIssueStatus(params: GetIssueStatusParams): Promise<any> {
  return callMCPTool('linear-server', 'get_issue_status', params);
}
