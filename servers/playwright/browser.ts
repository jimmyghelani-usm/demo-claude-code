/**
 * Playwright Browser Management Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import { BrowserResizeParams } from './types.js';

/**
 * Close the browser page
 *
 * @example
 * ```ts
 * await closeBrowser();
 * ```
 */
export async function closeBrowser(): Promise<any> {
  return callMCPTool('playwright', 'browser_close', {});
}

/**
 * Resize the browser window
 *
 * @example
 * ```ts
 * await resizeBrowser({ width: 1280, height: 720 });
 * ```
 */
export async function resizeBrowser(params: BrowserResizeParams): Promise<any> {
  return callMCPTool('playwright', 'browser_resize', params);
}

/**
 * Install the browser specified in config
 *
 * @example
 * ```ts
 * await installBrowser();
 * ```
 */
export async function installBrowser(): Promise<any> {
  return callMCPTool('playwright', 'browser_install', {});
}
