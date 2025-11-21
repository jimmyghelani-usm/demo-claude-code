/**
 * Linear Teams Wrappers
 *
 * Uses MCP when available, falls back to GraphQL API on connection errors.
 */

import { callMCPTool } from '../../mcp-client.js';
import { ListTeamsParams, GetTeamParams } from './types.js';
import { listTeamsGraphQL } from './graphql-fallback.js';

/**
 * List teams in the Linear workspace
 *
 * @example
 * ```ts
 * const teams = await listTeams({ query: 'Engineering' });
 * ```
 */
export async function listTeams(params: ListTeamsParams = {}): Promise<any> {
  try {
    return await callMCPTool('linear-server', 'list_teams', params);
  } catch (error: any) {
    if (error.message?.includes('ETIMEDOUT') || error.message?.includes('Connection closed') || error.message?.includes('MCP_TIMEOUT')) {
      console.log('[Linear] MCP timeout, using GraphQL API fallback');
      return await listTeamsGraphQL(params);
    }
    throw error;
  }
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
