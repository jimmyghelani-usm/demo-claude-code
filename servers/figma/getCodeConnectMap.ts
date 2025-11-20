/**
 * Get code connect mapping for Figma nodes
 *
 * Returns a mapping of node IDs to their corresponding code components.
 *
 * @example
 * ```ts
 * const map = await getCodeConnectMap({ nodeId: '1:2' });
 * // { '1:2': { codeConnectSrc: 'components/Button.tsx', codeConnectName: 'Button' } }
 * ```
 */

import { callMCPTool } from '../mcp-client.js';
import { GetCodeConnectMapParams, CodeConnectMapResult } from './types.js';

export async function getCodeConnectMap(
  params: GetCodeConnectMapParams = {}
): Promise<CodeConnectMapResult> {
  return callMCPTool<CodeConnectMapResult>(
    'figma-desktop',
    'get_code_connect_map',
    params
  );
}
