/**
 * Playwright Advanced Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import {
  BrowserEvaluateParams,
  BrowserRunCodeParams,
  BrowserHandleDialogParams,
  BrowserTabsParams,
  BrowserWaitForParams,
} from './types.js';

/**
 * Evaluate JavaScript expression on page or element
 *
 * @example
 * ```ts
 * await evaluate({
 *   function: '() => document.title'
 * });
 * ```
 */
export async function evaluate(params: BrowserEvaluateParams): Promise<any> {
  return callMCPTool('playwright', 'browser_evaluate', params);
}

/**
 * Run Playwright code snippet
 *
 * @example
 * ```ts
 * await runCode({
 *   code: "await page.getByRole('button', { name: 'Submit' }).click();"
 * });
 * ```
 */
export async function runCode(params: BrowserRunCodeParams): Promise<any> {
  return callMCPTool('playwright', 'browser_run_code', params);
}

/**
 * Handle a dialog
 *
 * @example
 * ```ts
 * await handleDialog({ accept: true });
 * await handleDialog({ accept: true, promptText: 'Hello' });
 * ```
 */
export async function handleDialog(params: BrowserHandleDialogParams): Promise<any> {
  return callMCPTool('playwright', 'browser_handle_dialog', params);
}

/**
 * List, create, close, or select a browser tab
 *
 * @example
 * ```ts
 * await tabs({ action: 'list' });
 * await tabs({ action: 'new' });
 * await tabs({ action: 'select', index: 1 });
 * await tabs({ action: 'close', index: 0 });
 * ```
 */
export async function tabs(params: BrowserTabsParams): Promise<any> {
  return callMCPTool('playwright', 'browser_tabs', params);
}

/**
 * Wait for text to appear or disappear or a specified time to pass
 *
 * @example
 * ```ts
 * await waitFor({ text: 'Loading complete' });
 * await waitFor({ textGone: 'Loading...' });
 * await waitFor({ time: 2 });
 * ```
 */
export async function waitFor(params: BrowserWaitForParams): Promise<any> {
  return callMCPTool('playwright', 'browser_wait_for', params);
}
