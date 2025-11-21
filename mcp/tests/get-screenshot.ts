import { config } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { figma } from '../index.js';

config();

function parseNodeId(input: string): string | null {
  try {
    // If it's already in A:B form
    if (/^\d+:\d+$/.test(input)) return input;
    // Extract from Figma URL param node-id=AAAA-BBBB
    const url = new URL(input);
    const nodeIdParam = url.searchParams.get('node-id');
    if (nodeIdParam && /^\d+-\d+$/.test(nodeIdParam)) {
      const [a, b] = nodeIdParam.split('-');
      return `${a}:${b}`;
    }
    return null;
  } catch {
    // Maybe it's a raw 1234-5678
    if (/^\d+-\d+$/.test(input)) {
      const [a, b] = input.split('-');
      return `${a}:${b}`;
    }
    return null;
  }
}

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: npx tsx mcp/tests/get-screenshot.ts <figma-url|node-id>');
    process.exit(1);
  }

  const nodeId = parseNodeId(input);
  if (!nodeId) {
    console.error('Could not parse node id from input');
    process.exit(1);
  }

  const outDir = path.resolve(process.cwd(), 'docs/temp/figma-screenshots');
  await fs.mkdir(outDir, { recursive: true });
  const fileBase = `node-${nodeId.replace(':', '-')}-${new Date().toISOString().slice(0,10)}`;
  const outPath = path.join(outDir, `${fileBase}.png`);

  const screenshot = await figma.getScreenshot({ nodeId });
  if (!screenshot?.screenshot) {
    console.error('No screenshot data received from Figma MCP');
    process.exit(2);
  }

  await fs.writeFile(outPath, Buffer.from(screenshot.screenshot, 'base64'));

  console.log(JSON.stringify({ ok: true, nodeId, path: outPath }));
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
