/**
 * Playwright Capture and Inspection Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import {
  BrowserTakeScreenshotParams,
  BrowserConsoleMessagesParams,
} from './types.js';

/**
 * Take a screenshot of the current page
 *
 * The Playwright MCP server saves screenshots to a temporary directory
 * and returns the file path in the result string.
 *
 * @returns A string containing the result message with the file path
 *
 * @example
 * ```ts
 * const result = await takeScreenshot({ filename: 'homepage.png', fullPage: true });
 * // Returns: "### Result\nTook the full page screenshot and saved it as /path/to/file.png"
 * ```
 */
export async function takeScreenshot(params: BrowserTakeScreenshotParams = {}): Promise<any> {
  const result = await callMCPTool('playwright', 'browser_take_screenshot', params);

  // Check for errors
  if (typeof result === 'string' && result.includes('Error:')) {
    throw new Error(`Screenshot failed: ${result}`);
  }

  return result;
}

/**
 * Capture accessibility snapshot of the current page
 *
 * @example
 * ```ts
 * const snapshot = await snapshot();
 * ```
 */
export async function snapshot(): Promise<any> {
  return callMCPTool('playwright', 'browser_snapshot', {});
}

/**
 * Get all console messages
 *
 * @example
 * ```ts
 * const messages = await consoleMessages();
 * const errors = await consoleMessages({ onlyErrors: true });
 * ```
 */
export async function consoleMessages(params: BrowserConsoleMessagesParams = {}): Promise<any> {
  return callMCPTool('playwright', 'browser_console_messages', params);
}

/**
 * Get all network requests since loading the page
 *
 * @example
 * ```ts
 * const requests = await networkRequests();
 * ```
 */
export async function networkRequests(): Promise<any> {
  return callMCPTool('playwright', 'browser_network_requests', {});
}
