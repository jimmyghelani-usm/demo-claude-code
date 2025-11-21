/**
 * Linear Labels Wrappers
 */

import { callMCPTool } from '../../mcp-client.js';
import {
  ListIssueLabelsParams,
  CreateIssueLabelParams,
  ListProjectLabelsParams,
} from './types.js';

/**
 * List available issue labels in the Linear workspace
 *
 * @example
 * ```ts
 * const labels = await listIssueLabels({ team: 'Engineering' });
 * ```
 */
export async function listIssueLabels(params: ListIssueLabelsParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_issue_labels', params);
}

/**
 * Create a new Linear issue label
 *
 * @example
 * ```ts
 * await createIssueLabel({
 *   name: 'critical',
 *   color: '#ff0000',
 *   description: 'Critical issues'
 * });
 * ```
 */
export async function createIssueLabel(params: CreateIssueLabelParams): Promise<any> {
  return callMCPTool('linear-server', 'create_issue_label', params);
}

/**
 * List available project labels in the Linear workspace
 *
 * @example
 * ```ts
 * const labels = await listProjectLabels({ limit: 20 });
 * ```
 */
export async function listProjectLabels(params: ListProjectLabelsParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_project_labels', params);
}
