/**
 * Playwright Capture and Inspection Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import {
  BrowserTakeScreenshotParams,
  BrowserConsoleMessagesParams,
} from './types.js';

/**
 * Take a screenshot of the current page
 *
 * @example
 * ```ts
 * await takeScreenshot({ filename: 'homepage.png', fullPage: true });
 * ```
 */
export async function takeScreenshot(params: BrowserTakeScreenshotParams = {}): Promise<any> {
  return callMCPTool('playwright', 'browser_take_screenshot', params);
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
