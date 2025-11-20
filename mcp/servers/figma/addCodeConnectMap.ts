/**
 * Map a Figma node to a code component
 *
 * Creates a connection between a Figma design node and its corresponding
 * code component in your codebase.
 *
 * @example
 * ```ts
 * await addCodeConnectMap({
 *   source: 'src/components/Button.tsx',
 *   componentName: 'Button',
 *   nodeId: '1:2'
 * });
 * ```
 */

import { callMCPTool } from '../../mcp-client.js';
import { AddCodeConnectMapParams } from './types.js';

export async function addCodeConnectMap(
  params: AddCodeConnectMapParams
): Promise<void> {
  await callMCPTool(
    'figma-desktop',
    'add_code_connect_map',
    params
  );
}
