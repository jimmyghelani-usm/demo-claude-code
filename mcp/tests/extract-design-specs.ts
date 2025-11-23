import { config } from 'dotenv';
import { figma } from '../index.js';
import * as fs from 'fs';
import * as path from 'path';

config();

async function extractSpecs() {
  try {
    console.log('Fetching screenshot for node 2172-13308...');

    const screenshot = await figma.getScreenshot({
      nodeId: '2172-13308',
      format: 'png',
      scale: 1
    });

    const screenshotPath = '/Users/ghelanijimmy/repos/demo-claude-code/docs/temp/figma-screenshots/cybertruck-giveaway-2025-11-22.png';
    const dir = path.dirname(screenshotPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Handle the response properly - it might be a Buffer or string
    let buffer: Buffer;
    if (typeof screenshot === 'string') {
      buffer = Buffer.from(screenshot, 'base64');
    } else if (Buffer.isBuffer(screenshot)) {
      buffer = screenshot;
    } else {
      buffer = Buffer.from(JSON.stringify(screenshot));
    }

    fs.writeFileSync(screenshotPath, buffer);
    console.log('Screenshot saved successfully');

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

extractSpecs();
