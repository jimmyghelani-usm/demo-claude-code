/**
 * Get variable definitions for a Figma node
 *
 * Returns reusable design variables like colors, fonts, sizes, and spacings.
 *
 * @example
 * ```ts
 * const variables = await getVariableDefs({ nodeId: '1:2' });
 * console.log(variables); // { 'icon/default/secondary': '#949494', ... }
 * ```
 */

import { callMCPTool } from '../../mcp-client.js';
import { GetVariableDefsParams, VariableDefsResult } from './types.js';

export async function getVariableDefs(
  params: GetVariableDefsParams = {}
): Promise<VariableDefsResult> {
  return callMCPTool<VariableDefsResult>(
    'figma-desktop',
    'get_variable_defs',
    params
  );
}
