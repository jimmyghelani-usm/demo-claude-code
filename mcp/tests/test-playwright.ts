/**
 * Test Playwright MCP wrapper with localhost:3000
 */

import { config } from 'dotenv';
import { playwright } from '../index.js';

// Load environment variables
config();

async function testPlaywright() {
  console.log('='.repeat(60));
  console.log('Testing Playwright MCP Wrapper with localhost:3000');
  console.log('='.repeat(60));
  console.log();

  try {
    // Test 1: Navigate to localhost:3000
    console.log('1. Navigating to localhost:3000...');
    await playwright.navigate({ url: 'http://localhost:3000' });
    console.log('   ✓ Navigation successful\n');

    // Test 2: Wait for page to load
    console.log('2. Waiting for page to load...');
    await playwright.waitFor({ time: 2 });
    console.log('   ✓ Page loaded\n');

    // Test 3: Take a screenshot
    console.log('3. Taking screenshot...');
    await playwright.takeScreenshot({
      filename: 'localhost-3000.png',
      fullPage: true,
    });
    console.log('   ✓ Screenshot saved as localhost-3000.png\n');

    // Test 4: Get page snapshot (accessibility tree)
    console.log('4. Getting page snapshot...');
    const snapshot = await playwright.snapshot();
    console.log('   ✓ Snapshot retrieved');
    console.log('   Preview of snapshot:');
    const snapshotStr = JSON.stringify(snapshot, null, 2);
    const preview = snapshotStr.substring(0, 500);
    console.log('   ' + preview + '...\n');

    // Test 5: Get console messages
    console.log('5. Getting console messages...');
    const consoleMessages = await playwright.consoleMessages();
    console.log('   ✓ Console messages retrieved');
    console.log(`   Found ${consoleMessages.length || 0} console messages\n`);

    // Test 6: Get network requests
    console.log('6. Getting network requests...');
    const networkRequests = await playwright.networkRequests();
    console.log('   ✓ Network requests retrieved');
    console.log(`   Found ${networkRequests.length || 0} network requests\n`);

    // Test 7: Evaluate JavaScript
    console.log('7. Evaluating JavaScript (get page title)...');
    const title = await playwright.evaluate({
      function: '() => document.title',
    });
    console.log(`   ✓ Page title: "${title}"\n`);

    // Test 8: Close browser
    console.log('8. Closing browser...');
    await playwright.closeBrowser();
    console.log('   ✓ Browser closed\n');

    console.log('='.repeat(60));
    console.log('All Playwright tests passed! ✓');
    console.log('='.repeat(60));
    console.log();
    console.log('Summary:');
    console.log('- Successfully navigated to localhost:3000');
    console.log('- Captured full-page screenshot');
    console.log('- Retrieved page accessibility snapshot');
    console.log('- Collected console messages and network requests');
    console.log('- Executed JavaScript to get page title');
    console.log();
    console.log('The Playwright MCP wrapper is working correctly!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.log('\nMake sure:');
    console.log('- Dev server is running: npm run dev');
    console.log('- Port 3000 is accessible');
    console.log('- Playwright MCP server is installed');
    process.exit(1);
  }
}

// Run tests
testPlaywright()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
