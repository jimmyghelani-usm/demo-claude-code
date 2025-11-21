import { config } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { figma } from '../index.js';

config();

async function main() {
  const outDir = path.resolve(process.cwd(), 'docs/temp/figma-screenshots');
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `selection-${Date.now()}.png`);

  const screenshot = await figma.getScreenshot(); // rely on current selection in Figma Desktop
  if (!screenshot?.screenshot) {
    console.error('No screenshot data received from Figma MCP for current selection');
    process.exit(2);
  }

  await fs.writeFile(outPath, Buffer.from(screenshot.screenshot, 'base64'));
  console.log(JSON.stringify({ ok: true, path: outPath }));
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
