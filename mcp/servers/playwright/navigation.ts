/**
 * Playwright Navigation Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import { BrowserNavigateParams, BrowserWaitForParams } from './types.js';

/**
 * Navigate to a URL
 *
 * @example
 * ```ts
 * await navigate({ url: 'https://example.com' });
 * ```
 */
export async function navigate(params: BrowserNavigateParams): Promise<any> {
  const result = await callMCPTool('playwright', 'browser_navigate', params);

  // Check if result indicates an error
  if (typeof result === 'string' && result.includes('Error:')) {
    throw new Error(`Navigation failed: ${result}`);
  }

  return result;
}

/**
 * Navigate to a URL and wait for page to load (safe navigation)
 *
 * This function navigates to a URL and automatically waits for the page
 * to load before returning. Recommended for reliable page interactions.
 *
 * @param url - The URL to navigate to
 * @param waitSeconds - Number of seconds to wait after navigation (default: 2)
 *
 * @example
 * ```ts
 * await navigateAndWait('https://example.com');
 * await navigateAndWait('https://example.com', 3);
 * ```
 */
export async function navigateAndWait(url: string, waitSeconds: number = 2): Promise<any> {
  const result = await navigate({ url });

  // Check if navigation failed
  if (typeof result === 'string' && result.includes('Error:')) {
    throw new Error(`Navigation failed: ${result}`);
  }

  // Wait for page to load
  await callMCPTool('playwright', 'browser_wait_for', { time: waitSeconds });

  return result;
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
