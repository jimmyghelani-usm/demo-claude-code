/**
 * Curl-based Linear GraphQL client
 *
 * Uses curl subprocess since Node's fetch is blocked by network extensions
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from 'dotenv';

config();

const execAsync = promisify(exec);
const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

/**
 * Make a GraphQL request using curl
 */
export async function curlGraphQL(query: string, variables?: Record<string, any>): Promise<any> {
  if (!LINEAR_API_KEY) {
    throw new Error('LINEAR_API_KEY not found in environment variables');
  }

  const payload = JSON.stringify({ query, variables });
  const escapedPayload = payload.replace(/'/g, "'\\''"); // Escape single quotes for shell

  const curlCommand = `curl -s -X POST https://api.linear.app/graphql \\
    -H "Content-Type: application/json" \\
    -H "Authorization: ${LINEAR_API_KEY}" \\
    -d '${escapedPayload}'`;

  try {
    const { stdout, stderr } = await execAsync(curlCommand);

    if (stderr) {
      console.error('[Linear curl] stderr:', stderr);
    }

    const result = JSON.parse(stdout);

    if (result.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('JSON')) {
      console.error('[Linear curl] Invalid JSON response:', error);
    }
    throw error;
  }
}
