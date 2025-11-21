/**
 * Get design context for a Figma node
 *
 * Generates UI code for a given node or the currently selected node
 * in the Figma desktop app.
 *
 * @example
 * ```ts
 * const context = await getDesignContext({ nodeId: '1:2' });
 * console.log(context.code);
 * ```
 */

import { callMCPTool } from '../../mcp-client.js';
import { GetDesignContextParams, DesignContextResult } from './types.js';

export async function getDesignContext(
  params: GetDesignContextParams = {}
): Promise<DesignContextResult> {
  return callMCPTool<DesignContextResult>(
    'figma-desktop',
    'get_design_context',
    params
  );
}
