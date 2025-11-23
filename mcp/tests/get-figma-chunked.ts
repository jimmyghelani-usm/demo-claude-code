import { config } from 'dotenv';
import { figma } from '../index.js';
import * as fs from 'fs';
import * as path from 'path';

config();

interface ChunkResult {
  nodeId: string;
  success: boolean;
  size?: number;
  error?: string;
  data?: unknown;
}

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

async function fetchNodeData(
  nodeId: string,
  frameworks: string = 'react',
  languages: string = 'typescript'
): Promise<ChunkResult> {
  try {
    const design = await figma.getDesignContext({
      nodeId,
      clientFrameworks: frameworks,
      clientLanguages: languages,
    });

    const dataStr = JSON.stringify(design);
    const sizeInBytes = Buffer.byteLength(dataStr, 'utf8');

    return {
      nodeId,
      success: true,
      size: sizeInBytes,
      data: design,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    return {
      nodeId,
      success: false,
      error: errorMessage,
    };
  }
}

async function saveChunk(
  filename: string,
  data: unknown,
  nodeId: string
): Promise<string> {
  // Ensure temp directory exists
  const tempDir = path.join(process.cwd(), 'docs', 'temp', 'figma-chunks');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const filepath = path.join(tempDir, filename);
  fs.writeFileSync(
    filepath,
    JSON.stringify(
      {
        nodeId,
        timestamp: new Date().toISOString(),
        data,
      },
      null,
      2
    )
  );

  return filepath;
}

async function main(): Promise<void> {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      'Usage: npx tsx mcp/tests/get-figma-chunked.ts <figma-url-or-node-id> [frameworks] [languages]'
    );
    process.exit(1);
  }

  const nodeId = extractNodeId(arg);
  const frameworks = process.argv[3] || 'react';
  const languages = process.argv[4] || 'typescript';

  console.log(`📦 Fetching Figma design for node: ${nodeId}`);
  console.log(`   Framework: ${frameworks}, Language: ${languages}`);
  console.log('');

  const result = await fetchNodeData(nodeId, frameworks, languages);

  if (!result.success) {
    console.error(`❌ Failed to fetch design context:`);
    console.error(`   Error: ${result.error}`);
    console.error('');
    console.error(
      'Hints: Ensure Figma Desktop is running with Dev Mode and "Enable desktop MCP server" enabled,'
    );
    console.error('and the target file is open.');
    process.exit(1);
  }

  if (!result.data) {
    console.error('❌ No data returned from Figma');
    process.exit(1);
  }

  const sizeInMB = (result.size || 0) / (1024 * 1024);
  console.log(`✅ Design context fetched successfully`);
  console.log(`   Size: ${sizeInMB.toFixed(2)} MB (${result.size} bytes)`);
  console.log('');

  // If size is large (>5MB), recommend chunking
  if ((result.size || 0) > 5 * 1024 * 1024) {
    console.log('⚠️  Large design file detected!');
    console.log('');
    console.log('CHUNKING STRATEGY:');
    console.log(
      '1. Extract child node IDs from the design metadata/layers'
    );
    console.log('2. Fetch each child node separately with getDesignContext()');
    console.log('3. Process and save chunks to docs/temp/figma-chunks/');
    console.log('4. Analyze chunk metadata to understand structure');
    console.log('5. Combine chunks only when needed for implementation');
    console.log('');
    console.log('NEXT STEP:');
    console.log('Pass chunk node IDs to agents separately for analysis');
    console.log('');
  }

  // Save the complete design to a chunk file
  const chunkPath = await saveChunk(
    `design-${nodeId.replace(':', '-')}.json`,
    result.data,
    nodeId
  );

  console.log(`📄 Design saved to: ${chunkPath}`);
  console.log('');
  console.log('JSON Output:');
  console.log(JSON.stringify(result.data, null, 2));
}

main();
