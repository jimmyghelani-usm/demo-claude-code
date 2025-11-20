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

import { callMCPTool } from '../mcp-client.js';
import { GetScreenshotParams, ScreenshotResult } from './types.js';

export async function getScreenshot(
  params: GetScreenshotParams = {}
): Promise<ScreenshotResult> {
  return callMCPTool<ScreenshotResult>(
    'figma-desktop',
    'get_screenshot',
    params
  );
}
