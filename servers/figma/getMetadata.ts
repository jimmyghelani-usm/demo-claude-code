/**
 * Get metadata for a Figma node or page
 *
 * Returns metadata in XML format including node IDs, layer types, names,
 * positions, and sizes. Useful for getting an overview of structure.
 *
 * @example
 * ```ts
 * const metadata = await getMetadata({ nodeId: '0:1' });
 * console.log(metadata.xml);
 * ```
 */

import { callMCPTool } from '../mcp-client.js';
import { GetMetadataParams, MetadataResult } from './types.js';

export async function getMetadata(
  params: GetMetadataParams = {}
): Promise<MetadataResult> {
  return callMCPTool<MetadataResult>(
    'figma-desktop',
    'get_metadata',
    params
  );
}
