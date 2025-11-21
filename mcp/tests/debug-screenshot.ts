import { config } from 'dotenv';
import { figma } from '../index.js';

config();

function parseNodeId(input: string): string | null {
  try {
    if (/^\d+:\d+$/.test(input)) return input;
    const url = new URL(input);
    const nodeIdParam = url.searchParams.get('node-id');
    if (nodeIdParam && /^\d+-\d+$/.test(nodeIdParam)) {
      const [a, b] = nodeIdParam.split('-');
      return `${a}:${b}`;
    }
    return null;
  } catch {
    if (/^\d+-\d+$/.test(input)) {
      const [a, b] = input.split('-');
      return `${a}:${b}`;
    }
    return null;
  }
}

async function main() {
  const input = process.argv[2];
  const nodeId = input ? parseNodeId(input) : undefined;

  const res = await figma.getScreenshot(nodeId ? { nodeId } : {} as any).catch((e: any) => ({ error: String(e) }));
  console.log(JSON.stringify(res));
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
