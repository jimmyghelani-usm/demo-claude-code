/**
 * Linear Issues Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import {
  GetIssueParams,
  ListIssuesParams,
  CreateIssueParams,
  UpdateIssueParams,
} from './types.js';

/**
 * Retrieve detailed information about an issue by ID
 *
 * @example
 * ```ts
 * const issue = await getIssue({ id: 'ISS-123' });
 * ```
 */
export async function getIssue(params: GetIssueParams): Promise<any> {
  return callMCPTool('linear-server', 'get_issue', params);
}

/**
 * List issues in the Linear workspace
 *
 * @example
 * ```ts
 * const myIssues = await listIssues({ assignee: 'me' });
 * const teamIssues = await listIssues({ team: 'Engineering', state: 'In Progress' });
 * ```
 */
export async function listIssues(params: ListIssuesParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_issues', params);
}

/**
 * Create a new Linear issue
 *
 * @example
 * ```ts
 * const issue = await createIssue({
 *   title: 'Fix login bug',
 *   team: 'Engineering',
 *   description: 'Users cannot log in with SSO',
 *   priority: 1
 * });
 * ```
 */
export async function createIssue(params: CreateIssueParams): Promise<any> {
  return callMCPTool('linear-server', 'create_issue', params);
}

/**
 * Update an existing Linear issue
 *
 * @example
 * ```ts
 * await updateIssue({
 *   id: 'ISS-123',
 *   state: 'Done',
 *   assignee: 'me'
 * });
 * ```
 */
export async function updateIssue(params: UpdateIssueParams): Promise<any> {
  return callMCPTool('linear-server', 'update_issue', params);
}
