/**
 * Linear Cycles Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import { ListCyclesParams } from './types.js';

/**
 * Retrieve cycles for a specific Linear team
 *
 * @example
 * ```ts
 * const currentCycle = await listCycles({
 *   teamId: 'team-123',
 *   type: 'current'
 * });
 * ```
 */
export async function listCycles(params: ListCyclesParams): Promise<any> {
  return callMCPTool('linear-server', 'list_cycles', params);
}
