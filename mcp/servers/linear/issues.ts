/**
 * Linear Issues Wrappers
 *
 * Uses MCP when available, falls back to GraphQL API on connection errors.
 */

import { callMCPTool } from '../../mcp-client.js';
import {
  GetIssueParams,
  ListIssuesParams,
  CreateIssueParams,
  UpdateIssueParams,
} from './types.js';
import {
  getIssueGraphQL,
  listIssuesGraphQL,
  createIssueGraphQL,
  updateIssueGraphQL,
} from './graphql-fallback.js';

/**
 * Retrieve detailed information about an issue by ID
 *
 * @example
 * ```ts
 * const issue = await getIssue({ id: 'ISS-123' });
 * ```
 */
export async function getIssue(params: GetIssueParams): Promise<any> {
  try {
    return await callMCPTool('linear-server', 'get_issue', params);
  } catch (error: any) {
    // Fall back to GraphQL API if MCP fails
    if (error.message?.includes('ETIMEDOUT') || error.message?.includes('Connection closed') || error.message?.includes('MCP_TIMEOUT')) {
      console.log('[Linear] MCP timeout, using GraphQL API fallback');
      return await getIssueGraphQL(params);
    }
    throw error;
  }
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
  try {
    return await callMCPTool('linear-server', 'list_issues', params);
  } catch (error: any) {
    if (error.message?.includes('ETIMEDOUT') || error.message?.includes('Connection closed') || error.message?.includes('MCP_TIMEOUT')) {
      console.log('[Linear] MCP timeout, using GraphQL API fallback');
      return await listIssuesGraphQL(params);
    }
    throw error;
  }
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
  try {
    return await callMCPTool('linear-server', 'create_issue', params);
  } catch (error: any) {
    if (error.message?.includes('ETIMEDOUT') || error.message?.includes('Connection closed') || error.message?.includes('MCP_TIMEOUT')) {
      console.log('[Linear] MCP timeout, using GraphQL API fallback');
      return await createIssueGraphQL(params);
    }
    throw error;
  }
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
  try {
    return await callMCPTool('linear-server', 'update_issue', params);
  } catch (error: any) {
    if (error.message?.includes('ETIMEDOUT') || error.message?.includes('Connection closed') || error.message?.includes('MCP_TIMEOUT')) {
      console.log('[Linear] MCP timeout, using GraphQL API fallback');
      return await updateIssueGraphQL(params);
    }
    throw error;
  }
}
