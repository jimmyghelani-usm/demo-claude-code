/**
 * Linear Teams Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import { ListTeamsParams, GetTeamParams } from './types.js';

/**
 * List teams in the Linear workspace
 *
 * @example
 * ```ts
 * const teams = await listTeams({ query: 'Engineering' });
 * ```
 */
export async function listTeams(params: ListTeamsParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_teams', params);
}

/**
 * Retrieve details of a specific Linear team
 *
 * @example
 * ```ts
 * const team = await getTeam({ query: 'Engineering' });
 * ```
 */
export async function getTeam(params: GetTeamParams): Promise<any> {
  return callMCPTool('linear-server', 'get_team', params);
}
