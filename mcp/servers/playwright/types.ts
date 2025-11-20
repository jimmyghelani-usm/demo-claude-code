/**
 * Type definitions for Playwright MCP server tools
 */

export interface BrowserResizeParams {
  width: number;
  height: number;
}

export interface BrowserConsoleMessagesParams {
  onlyErrors?: boolean;
}

export interface BrowserHandleDialogParams {
  accept: boolean;
  promptText?: string;
}

export interface BrowserEvaluateParams {
  function: string;
  element?: string;
  ref?: string;
}

export interface BrowserFileUploadParams {
  paths?: string[];
}

export interface BrowserFillFormParams {
  fields: Array<{
    name: string;
    type: 'textbox' | 'checkbox' | 'radio' | 'combobox' | 'slider';
    ref: string;
    value: string;
  }>;
}

export interface BrowserPressKeyParams {
  key: string;
}

export interface BrowserTypeParams {
  element: string;
  ref: string;
  text: string;
  slowly?: boolean;
  submit?: boolean;
}

export interface BrowserNavigateParams {
  url: string;
}

export interface BrowserRunCodeParams {
  code: string;
}

export interface BrowserTakeScreenshotParams {
  element?: string;
  ref?: string;
  filename?: string;
  fullPage?: boolean;
  type?: 'png' | 'jpeg';
}

export interface BrowserClickParams {
  element: string;
  ref: string;
  button?: 'left' | 'right' | 'middle';
  doubleClick?: boolean;
  modifiers?: Array<'Alt' | 'Control' | 'ControlOrMeta' | 'Meta' | 'Shift'>;
}

export interface BrowserDragParams {
  startElement: string;
  startRef: string;
  endElement: string;
  endRef: string;
}

export interface BrowserHoverParams {
  element: string;
  ref: string;
}

export interface BrowserSelectOptionParams {
  element: string;
  ref: string;
  values: string[];
}

export interface BrowserTabsParams {
  action: 'list' | 'new' | 'close' | 'select';
  index?: number;
}

export interface BrowserWaitForParams {
  text?: string;
  textGone?: string;
  time?: number;
}
