import { config } from 'dotenv';
import { figma } from '../index.js';

config();

function extractNodeId(input: string): string {
  // Accept either a full Figma URL with node-id or a raw node id (e.g., 2172:3290 or 2172-3290)
  try {
    if (input.includes('node-id=')) {
      const url = new URL(input);
      const raw = url.searchParams.get('node-id') || '';
      if (!raw) {
        throw new Error('Missing node-id query param in URL');
      }
      return raw.replace('-', ':');
    }
    // raw node id
    if (/^\d+[:-]\d+$/.test(input)) {
      return input.replace('-', ':');
    }
  } catch {
    // ignore and try regex extraction below
  }
  const match = input.match(/node-id=([0-9]+)-([0-9]+)/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }
  throw new Error(
    'Provide a Figma URL containing node-id or a node id like 2172:3290'
  );
}

async function main(): Promise<void> {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      'Usage: npx tsx mcp/tests/get-figma-details.ts <figma-url-or-node-id>'
    );
    process.exit(1);
  }
  const nodeId = extractNodeId(arg);

  try {
    const design = await figma.getDesignContext({
      nodeId,
      clientFrameworks: 'react',
      clientLanguages: 'typescript',
    });

    let variables: unknown = null;
    try {
      variables = await figma.getVariableDefs({ nodeId });
    } catch (_err) {
      // optional
    }

    let metadata: unknown = null;
    try {
      metadata = await figma.getMetadata({ nodeId });
    } catch (_err) {
      // optional
    }

    console.log(
      JSON.stringify({ nodeId, design, variables, metadata }, null, 2)
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error('Error:', message);
    console.error(
      'Hints: Ensure Figma Desktop is running with Dev Mode and "Enable desktop MCP server" enabled, and the target file is open.'
    );
    process.exit(1);
  }
}

main();

