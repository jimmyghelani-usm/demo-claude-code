/**
 * Get FigJam content for a node
 *
 * Generate UI code for a FigJam node or the currently selected FigJam node.
 * Note: This only works for FigJam files, not regular Figma design files.
 *
 * @example
 * ```ts
 * const figjam = await getFigJam({
 *   nodeId: '1:2',
 *   includeImagesOfNodes: true
 * });
 * ```
 */

import { callMCPTool } from '../mcp-client.js';
import { GetFigJamParams } from './types.js';

export async function getFigJam(
  params: GetFigJamParams = {}
): Promise<any> {
  return callMCPTool(
    'figma-desktop',
    'get_figjam',
    params
  );
}
