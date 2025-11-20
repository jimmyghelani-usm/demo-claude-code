/**
 * Playwright Navigation Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import { BrowserNavigateParams } from './types.js';

/**
 * Navigate to a URL
 *
 * @example
 * ```ts
 * await navigate({ url: 'https://example.com' });
 * ```
 */
export async function navigate(params: BrowserNavigateParams): Promise<any> {
  return callMCPTool('playwright', 'browser_navigate', params);
}

/**
 * Go back to the previous page
 *
 * @example
 * ```ts
 * await navigateBack();
 * ```
 */
export async function navigateBack(): Promise<any> {
  return callMCPTool('playwright', 'browser_navigate_back', {});
}
