/**
 * Linear GraphQL API Fallback
 *
 * This provides direct GraphQL API access when MCP connection fails.
 * Uses curl subprocess since Node's fetch is blocked by network extensions.
 */

import { curlGraphQL } from './curl-graphql.js';

/**
 * Make a GraphQL request to Linear API using curl
 */
async function graphqlRequest(query: string, variables?: Record<string, any>): Promise<any> {
  return curlGraphQL(query, variables);
}

/**
 * Get issue by ID using GraphQL
 */
export async function getIssueGraphQL(params: { id: string }): Promise<any> {
  const query = `
    query GetIssue($id: String!) {
      issue(id: $id) {
        id
        identifier
        title
        description
        state {
          id
          name
          type
        }
        assignee {
          id
          name
          email
        }
        team {
          id
          name
        }
        labels {
          nodes {
            id
            name
          }
        }
        createdAt
        updatedAt
      }
    }
  `;

  const data = await graphqlRequest(query, { id: params.id });
  return data.issue;
}

/**
 * List issues using GraphQL
 */
export async function listIssuesGraphQL(params: any = {}): Promise<any> {
  const query = `
    query ListIssues($first: Int, $filter: IssueFilter) {
      issues(first: $first, filter: $filter) {
        nodes {
          id
          identifier
          title
          description
          state {
            name
            type
          }
          assignee {
            name
            email
          }
          team {
            name
          }
          createdAt
          updatedAt
        }
      }
    }
  `;

  const first = params.limit || 50;
  const filter: any = {};

  if (params.team) filter.team = { name: { eq: params.team } };
  if (params.assignee === 'me') filter.assignee = { isMe: { eq: true } };
  if (params.state) filter.state = { name: { eq: params.state } };

  const data = await graphqlRequest(query, { first, filter: Object.keys(filter).length > 0 ? filter : undefined });
  return { issues: data.issues.nodes };
}

/**
 * Update issue using GraphQL
 */
export async function updateIssueGraphQL(params: any): Promise<any> {
  const mutation = `
    mutation UpdateIssue($id: String!, $input: IssueUpdateInput!) {
      issueUpdate(id: $id, input: $input) {
        success
        issue {
          id
          identifier
          title
          state {
            name
          }
        }
      }
    }
  `;

  const input: any = {};

  if (params.state) {
    // Need to get state ID first
    const statesQuery = `
      query GetStates($teamName: String!) {
        teams(filter: { name: { eq: $teamName } }) {
          nodes {
            states {
              nodes {
                id
                name
                type
              }
            }
          }
        }
      }
    `;

    // Get team from issue first if not provided
    let teamName = params.team;
    if (!teamName) {
      const issue = await getIssueGraphQL({ id: params.id });
      teamName = issue.team.name;
    }

    const statesData = await graphqlRequest(statesQuery, { teamName });
    const state = statesData.teams.nodes[0].states.nodes.find((s: any) =>
      s.name.toLowerCase() === params.state.toLowerCase() || s.type === params.state
    );

    if (state) {
      input.stateId = state.id;
    }
  }

  if (params.assignee) input.assigneeId = params.assignee;
  if (params.title) input.title = params.title;
  if (params.description) input.description = params.description;
  if (params.priority !== undefined) input.priority = params.priority;

  const data = await graphqlRequest(mutation, { id: params.id, input });
  return data.issueUpdate.issue;
}

/**
 * Create issue using GraphQL
 */
export async function createIssueGraphQL(params: any): Promise<any> {
  const mutation = `
    mutation CreateIssue($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue {
          id
          identifier
          title
          description
          state {
            name
          }
        }
      }
    }
  `;

  const input: any = {
    title: params.title,
  };

  if (params.description) input.description = params.description;
  if (params.priority !== undefined) input.priority = params.priority;

  // Need team ID
  if (params.team) {
    const teamsQuery = `
      query GetTeam($name: String!) {
        teams(filter: { name: { eq: $name } }) {
          nodes {
            id
          }
        }
      }
    `;
    const teamsData = await graphqlRequest(teamsQuery, { name: params.team });
    if (teamsData.teams.nodes.length > 0) {
      input.teamId = teamsData.teams.nodes[0].id;
    }
  }

  const data = await graphqlRequest(mutation, { input });
  return data.issueCreate.issue;
}

/**
 * List teams using GraphQL
 */
export async function listTeamsGraphQL(params: any = {}): Promise<any> {
  const query = `
    query ListTeams($first: Int) {
      teams(first: $first) {
        nodes {
          id
          name
          key
        }
      }
    }
  `;

  const first = params.limit || 50;
  const data = await graphqlRequest(query, { first });
  return { teams: data.teams.nodes };
}

/**
 * Add comment to issue using GraphQL
 */
export async function addCommentGraphQL(params: { issueId: string; body: string }): Promise<any> {
  const mutation = `
    mutation CreateComment($issueId: String!, $body: String!) {
      commentCreate(input: { issueId: $issueId, body: $body }) {
        success
        comment {
          id
          body
          createdAt
        }
      }
    }
  `;

  const data = await graphqlRequest(mutation, { issueId: params.issueId, body: params.body });
  return data.commentCreate.comment;
}
