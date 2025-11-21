/**
 * Create design system rules for the repository
 *
 * Generates design system rules based on the current Figma file.
 *
 * @example
 * ```ts
 * const rules = await createDesignSystemRules({
 *   clientFrameworks: 'react',
 *   clientLanguages: 'typescript'
 * });
 * ```
 */

import { callMCPTool } from '../../mcp-client.js';
import { CreateDesignSystemRulesParams } from './types.js';

export async function createDesignSystemRules(
  params: CreateDesignSystemRulesParams = {}
): Promise<any> {
  return callMCPTool(
    'figma-desktop',
    'create_design_system_rules',
    params
  );
}
