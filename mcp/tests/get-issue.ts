/**
 * Helper script to fetch a Linear issue by ID
 * Usage: npx tsx mcp/tests/get-issue.ts <issue-id>
 */

import { config } from 'dotenv';
import { linear } from '../index.js';

// Load environment variables
config();

async function getIssue(issueId: string) {
  try {
    const issue = await linear.getIssue({ id: issueId });
    console.log(JSON.stringify(issue, null, 2));
  } catch (error) {
    console.error('Error fetching issue:', error);
    process.exit(1);
  }
}

const issueId = process.argv[2];
if (!issueId) {
  console.error('Usage: npx tsx mcp/tests/get-issue.ts <issue-id>');
  process.exit(1);
}

getIssue(issueId);
