/**
 * Type definitions for Linear MCP server tools
 */

// Comments
export interface ListCommentsParams {
  issueId: string;
}

export interface CreateCommentParams {
  issueId: string;
  body: string;
  parentId?: string;
}

// Cycles
export interface ListCyclesParams {
  teamId: string;
  type?: 'current' | 'previous' | 'next';
}

// Documents
export interface GetDocumentParams {
  id: string;
}

export interface ListDocumentsParams {
  after?: string;
  before?: string;
  createdAt?: string;
  creatorId?: string;
  includeArchived?: boolean;
  initiativeId?: string;
  limit?: number;
  orderBy?: 'createdAt' | 'updatedAt';
  projectId?: string;
  query?: string;
  updatedAt?: string;
}

// Issues
export interface GetIssueParams {
  id: string;
}

export interface ListIssuesParams {
  after?: string;
  assignee?: string;
  before?: string;
  createdAt?: string;
  cycle?: string;
  delegate?: string;
  includeArchived?: boolean;
  label?: string;
  limit?: number;
  orderBy?: 'createdAt' | 'updatedAt';
  parentId?: string;
  project?: string;
  query?: string;
  state?: string;
  team?: string;
  updatedAt?: string;
}

export interface CreateIssueParams {
  title: string;
  team: string;
  assignee?: string;
  cycle?: string;
  delegate?: string;
  description?: string;
  dueDate?: string;
  labels?: string[];
  links?: Array<{ url: string; title: string }>;
  parentId?: string;
  priority?: number;
  project?: string;
  state?: string;
}

export interface UpdateIssueParams {
  id: string;
  assignee?: string;
  cycle?: string;
  delegate?: string;
  description?: string;
  dueDate?: string;
  estimate?: number;
  labels?: string[];
  links?: Array<{ url: string; title: string }>;
  parentId?: string;
  priority?: number;
  project?: string;
  state?: string;
  title?: string;
}

// Issue Statuses
export interface ListIssueStatusesParams {
  team: string;
}

export interface GetIssueStatusParams {
  id: string;
  name: string;
  team: string;
}

// Labels
export interface ListIssueLabelsParams {
  after?: string;
  before?: string;
  limit?: number;
  name?: string;
  orderBy?: 'createdAt' | 'updatedAt';
  team?: string;
}

export interface CreateIssueLabelParams {
  name: string;
  color?: string;
  description?: string;
  isGroup?: boolean;
  parentId?: string;
  teamId?: string;
}

// Projects
export interface ListProjectsParams {
  after?: string;
  before?: string;
  createdAt?: string;
  includeArchived?: boolean;
  initiative?: string;
  limit?: number;
  member?: string;
  orderBy?: 'createdAt' | 'updatedAt';
  query?: string;
  state?: string;
  team?: string;
  updatedAt?: string;
}

export interface GetProjectParams {
  query: string;
}

export interface CreateProjectParams {
  name: string;
  team: string;
  description?: string;
  labels?: string[];
  lead?: string;
  priority?: number;
  startDate?: string;
  state?: string;
  summary?: string;
  targetDate?: string;
}

export interface UpdateProjectParams {
  id: string;
  description?: string;
  labels?: string[];
  lead?: string;
  name?: string;
  priority?: number;
  startDate?: string;
  state?: string;
  summary?: string;
  targetDate?: string;
}

// Project Labels
export interface ListProjectLabelsParams {
  after?: string;
  before?: string;
  limit?: number;
  name?: string;
  orderBy?: 'createdAt' | 'updatedAt';
}

// Teams
export interface ListTeamsParams {
  after?: string;
  before?: string;
  createdAt?: string;
  includeArchived?: boolean;
  limit?: number;
  orderBy?: 'createdAt' | 'updatedAt';
  query?: string;
  updatedAt?: string;
}

export interface GetTeamParams {
  query: string;
}

// Users
export interface ListUsersParams {
  query?: string;
}

export interface GetUserParams {
  query: string;
}

// Documentation
export interface SearchDocumentationParams {
  query: string;
  page?: number;
}
