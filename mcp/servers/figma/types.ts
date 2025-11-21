/**
 * Type definitions for Figma MCP server tools
 */

export interface GetDesignContextParams {
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
  forceCode?: boolean;
}

export interface GetVariableDefsParams {
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
}

export interface GetScreenshotParams {
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
}

export interface GetCodeConnectMapParams {
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
}

export interface AddCodeConnectMapParams {
  source: string;
  componentName: string;
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
}

export interface GetMetadataParams {
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
}

export interface CreateDesignSystemRulesParams {
  clientFrameworks?: string;
  clientLanguages?: string;
}

export interface GetFigJamParams {
  nodeId?: string;
  clientFrameworks?: string;
  clientLanguages?: string;
  includeImagesOfNodes?: boolean;
}

export interface DesignContextResult {
  code?: string;
  metadata?: any;
  layers?: any[];
}

export interface VariableDefsResult {
  variables: Record<string, string>;
}

export interface ScreenshotResult {
  screenshot: string; // base64 encoded image
}

export interface CodeConnectMapResult {
  [nodeId: string]: {
    codeConnectSrc: string;
    codeConnectName: string;
  };
}

export interface MetadataResult {
  xml: string;
}
