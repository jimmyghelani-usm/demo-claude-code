/**
 * Test Playwright MCP with correct tool names
 */

import { config } from 'dotenv';
import { callMCPTool } from '../mcp-client.js';

config();

async function testPlaywrightCorrect() {
  console.log('='.repeat(60));
  console.log('Testing Playwright with Correct Tool Names');
  console.log('='.repeat(60));
  console.log();

  try {
    // Test 1: Navigate
    console.log('1. Navigating to localhost:3000...');
    const navResult = await callMCPTool('playwright', 'playwright_navigate', {
      url: 'http://localhost:3000',
    });
    console.log('   ✓ Navigation successful');
    console.log('   ', navResult);
    console.log();

    // Test 2: Get visible text
    console.log('2. Getting visible page text...');
    const text = await callMCPTool('playwright', 'playwright_get_visible_text', {});
    console.log('   ✓ Page text retrieved');
    console.log('   Preview:', typeof text === 'string' ? text.substring(0, 200) : text);
    console.log();

    // Test 3: Take screenshot
    console.log('3. Taking screenshot...');
    const screenshot = await callMCPTool('playwright', 'playwright_screenshot', {
      name: 'localhost-test',
    });
    console.log('   ✓ Screenshot taken');
    console.log('   ', screenshot);
    console.log();

    // Test 4: Get console logs
    console.log('4. Getting console logs...');
    const logs = await callMCPTool('playwright', 'playwright_console_logs', {
      type: 'all',
    });
    console.log('   ✓ Console logs retrieved');
    console.log('   Logs:', JSON.stringify(logs).substring(0, 300));
    console.log();

    // Test 5: Evaluate JavaScript
    console.log('5. Evaluating JavaScript (get title)...');
    const title = await callMCPTool('playwright', 'playwright_evaluate', {
      script: 'document.title',
    });
    console.log('   ✓ JavaScript evaluated');
    console.log('   Page title:', title);
    console.log();

    // Test 6: Get HTML
    console.log('6. Getting page HTML...');
    const html = await callMCPTool('playwright', 'playwright_get_visible_html', {});
    console.log('   ✓ HTML retrieved');
    console.log('   Length:', typeof html === 'string' ? html.length : 'N/A');
    console.log('   Preview:', typeof html === 'string' ? html.substring(0, 150) : html);
    console.log();

    // Test 7: Close browser
    console.log('7. Closing browser...');
    await callMCPTool('playwright', 'playwright_close', {});
    console.log('   ✓ Browser closed');
    console.log();

    console.log('='.repeat(60));
    console.log('✅ SUCCESS! Playwright MCP is working correctly!');
    console.log('='.repeat(60));
    console.log();
    console.log('Verified functionality:');
    console.log('✓ Navigate to localhost:3000');
    console.log('✓ Get visible page text');
    console.log('✓ Take screenshots');
    console.log('✓ Get console logs');
    console.log('✓ Execute JavaScript');
    console.log('✓ Get page HTML');
    console.log();
    console.log('🎯 Your localhost:3000 is fully accessible via Playwright MCP!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testPlaywrightCorrect();
