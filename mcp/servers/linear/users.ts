/**
 * Linear Users Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import { ListUsersParams, GetUserParams } from './types.js';

/**
 * Retrieve users in the Linear workspace
 *
 * @example
 * ```ts
 * const users = await listUsers({ query: 'john' });
 * ```
 */
export async function listUsers(params: ListUsersParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_users', params);
}

/**
 * Retrieve details of a specific Linear user
 *
 * @example
 * ```ts
 * const user = await getUser({ query: 'me' });
 * const user = await getUser({ query: 'john@example.com' });
 * ```
 */
export async function getUser(params: GetUserParams): Promise<any> {
  return callMCPTool('linear-server', 'get_user', params);
}
