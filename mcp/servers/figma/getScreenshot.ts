/**
 * Generate a screenshot for a Figma node
 *
 * Captures the visual representation of a node or the currently selected node.
 *
 * @example
 * ```ts
 * const screenshot = await getScreenshot({ nodeId: '1:2' });
 * // screenshot.screenshot contains base64 encoded image
 * ```
 */

import { callMCPTool } from '../../mcp-client.js';
import { GetScreenshotParams, ScreenshotResult } from './types.js';

export async function getScreenshot(
  params: GetScreenshotParams = {}
): Promise<ScreenshotResult> {
  // The Figma MCP server may return either:
  // 1) A JSON object with { screenshot: base64String }
  // 2) A standard MCP result with result.content = [{ type: 'image', data: base64, mimeType }]
  const raw = await callMCPTool<any>('figma-desktop', 'get_screenshot', params);

  // Case 1: Already in expected shape
  if (raw && typeof raw === 'object' && 'screenshot' in raw && typeof raw.screenshot === 'string') {
    return raw as ScreenshotResult;
  }

  // Case 2: Translate from content[] image payload
  if (raw && typeof raw === 'object' && Array.isArray(raw.content)) {
    const imageItem = raw.content.find(
      (c: any) => c && typeof c === 'object' && c.type === 'image' && typeof c.data === 'string'
    );
    if (imageItem) {
      return { screenshot: imageItem.data } as ScreenshotResult;
    }
  }

  // Unknown shape
  return { screenshot: '' };
}
