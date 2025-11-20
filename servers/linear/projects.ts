/**
 * Linear Projects Wrappers
 */

import { callMCPTool } from '../mcp-client.js';
import {
  ListProjectsParams,
  GetProjectParams,
  CreateProjectParams,
  UpdateProjectParams,
} from './types.js';

/**
 * List projects in the Linear workspace
 *
 * @example
 * ```ts
 * const projects = await listProjects({
 *   team: 'Engineering',
 *   state: 'started'
 * });
 * ```
 */
export async function listProjects(params: ListProjectsParams = {}): Promise<any> {
  return callMCPTool('linear-server', 'list_projects', params);
}

/**
 * Retrieve details of a specific project
 *
 * @example
 * ```ts
 * const project = await getProject({ query: 'Q1 2024 Goals' });
 * ```
 */
export async function getProject(params: GetProjectParams): Promise<any> {
  return callMCPTool('linear-server', 'get_project', params);
}

/**
 * Create a new project in Linear
 *
 * @example
 * ```ts
 * const project = await createProject({
 *   name: 'Q2 2024 Goals',
 *   team: 'Engineering',
 *   description: 'Our goals for Q2',
 *   targetDate: '2024-06-30'
 * });
 * ```
 */
export async function createProject(params: CreateProjectParams): Promise<any> {
  return callMCPTool('linear-server', 'create_project', params);
}

/**
 * Update an existing Linear project
 *
 * @example
 * ```ts
 * await updateProject({
 *   id: 'proj-123',
 *   state: 'completed'
 * });
 * ```
 */
export async function updateProject(params: UpdateProjectParams): Promise<any> {
  return callMCPTool('linear-server', 'update_project', params);
}
