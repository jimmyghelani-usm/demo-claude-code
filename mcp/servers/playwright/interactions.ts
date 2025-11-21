/**
 * Playwright Interaction Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import {
  BrowserClickParams,
  BrowserTypeParams,
  BrowserHoverParams,
  BrowserDragParams,
  BrowserSelectOptionParams,
  BrowserPressKeyParams,
  BrowserFillFormParams,
  BrowserFileUploadParams,
} from './types.js';

/**
 * Perform a click on a web page
 *
 * @example
 * ```ts
 * await click({
 *   element: 'Submit button',
 *   ref: 'button#submit'
 * });
 * ```
 */
export async function click(params: BrowserClickParams): Promise<any> {
  return callMCPTool('playwright', 'browser_click', params);
}

/**
 * Type text into an editable element
 *
 * @example
 * ```ts
 * await type({
 *   element: 'Email input',
 *   ref: 'input#email',
 *   text: 'user@example.com'
 * });
 * ```
 */
export async function type(params: BrowserTypeParams): Promise<any> {
  return callMCPTool('playwright', 'browser_type', params);
}

/**
 * Hover over an element on page
 *
 * @example
 * ```ts
 * await hover({
 *   element: 'Menu item',
 *   ref: '.menu-item'
 * });
 * ```
 */
export async function hover(params: BrowserHoverParams): Promise<any> {
  return callMCPTool('playwright', 'browser_hover', params);
}

/**
 * Perform drag and drop between two elements
 *
 * @example
 * ```ts
 * await drag({
 *   startElement: 'Draggable item',
 *   startRef: '.draggable',
 *   endElement: 'Drop zone',
 *   endRef: '.dropzone'
 * });
 * ```
 */
export async function drag(params: BrowserDragParams): Promise<any> {
  return callMCPTool('playwright', 'browser_drag', params);
}

/**
 * Select an option in a dropdown
 *
 * @example
 * ```ts
 * await selectOption({
 *   element: 'Country dropdown',
 *   ref: 'select#country',
 *   values: ['us']
 * });
 * ```
 */
export async function selectOption(params: BrowserSelectOptionParams): Promise<any> {
  return callMCPTool('playwright', 'browser_select_option', params);
}

/**
 * Press a key on the keyboard
 *
 * @example
 * ```ts
 * await pressKey({ key: 'Enter' });
 * await pressKey({ key: 'ArrowLeft' });
 * ```
 */
export async function pressKey(params: BrowserPressKeyParams): Promise<any> {
  return callMCPTool('playwright', 'browser_press_key', params);
}

/**
 * Fill multiple form fields
 *
 * @example
 * ```ts
 * await fillForm({
 *   fields: [
 *     { name: 'Email', type: 'textbox', ref: 'input#email', value: 'user@example.com' },
 *     { name: 'Subscribe', type: 'checkbox', ref: 'input#subscribe', value: 'true' }
 *   ]
 * });
 * ```
 */
export async function fillForm(params: BrowserFillFormParams): Promise<any> {
  return callMCPTool('playwright', 'browser_fill_form', params);
}

/**
 * Upload one or multiple files
 *
 * @example
 * ```ts
 * await fileUpload({ paths: ['/path/to/file.pdf'] });
 * ```
 */
export async function fileUpload(params: BrowserFileUploadParams): Promise<any> {
  return callMCPTool('playwright', 'browser_file_upload', params);
}
