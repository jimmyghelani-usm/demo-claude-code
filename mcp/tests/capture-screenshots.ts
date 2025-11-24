#!/usr/bin/env node
/**
 * Capture Screenshots with Playwright MCP Wrapper
 *
 * Reusable CLI script to capture screenshots of a web page.
 *
 * Usage:
 *   npx tsx mcp/tests/capture-screenshots.ts <url> [output-prefix]
 *
 * Examples:
 *   npx tsx mcp/tests/capture-screenshots.ts http://localhost:3000
 *   npx tsx mcp/tests/capture-screenshots.ts http://localhost:3000 homepage
 */

import { config } from 'dotenv';
import { playwright } from '../index.js';

config();

async function captureScreenshots(url: string, prefix: string = 'screenshot') {
  try {
    console.log(`\n🌐 Navigating to ${url}...`);

    // Navigate to the URL and wait for page load
    await playwright.navigate({ url });
    console.log('✓ Navigation complete');

    // Wait a bit for any dynamic content to load
    await playwright.waitFor({ time: 2 });
    console.log('✓ Page loaded');

    // Capture viewport screenshot (hero/above-fold section)
    console.log('\n📸 Capturing viewport screenshot...');
    const viewportResult = await playwright.takeScreenshot({
      filename: `${prefix}-viewport.png`,
      fullPage: false,
      type: 'png'
    });
    console.log(viewportResult);

    // Capture full page screenshot
    console.log('\n📸 Capturing full page screenshot...');
    const fullPageResult = await playwright.takeScreenshot({
      filename: `${prefix}-fullpage.png`,
      fullPage: true,
      type: 'png'
    });
    console.log(fullPageResult);

    console.log('\n✅ Screenshot capture complete!');
    console.log('\nSummary:');
    console.log('- Viewport screenshot: Captures above-the-fold content (hero section)');
    console.log('- Full page screenshot: Captures entire scrollable page');

  } catch (error) {
    console.error('\n❌ Error capturing screenshots:', error);
    process.exit(1);
  }
}

// Parse CLI arguments
const [url, prefix] = process.argv.slice(2);

if (!url) {
  console.error('Usage: npx tsx mcp/tests/capture-screenshots.ts <url> [output-prefix]');
  console.error('\nExamples:');
  console.error('  npx tsx mcp/tests/capture-screenshots.ts http://localhost:3000');
  console.error('  npx tsx mcp/tests/capture-screenshots.ts http://localhost:3000 homepage');
  process.exit(1);
}

captureScreenshots(url, prefix);
