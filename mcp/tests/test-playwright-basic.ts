/**
 * Test basic Playwright MCP wrapper functionality with localhost:3000
 */

import { config } from 'dotenv';
import { playwright } from '../index.js';

// Load environment variables
config();

async function testPlaywrightBasic() {
  console.log('='.repeat(60));
  console.log('Testing Playwright MCP Wrapper - Basic Functions');
  console.log('='.repeat(60));
  console.log();

  try {
    // Test 1: Navigate to localhost:3000
    console.log('1. Navigating to localhost:3000...');
    const navResult = await playwright.navigate({ url: 'http://localhost:3000' });
    console.log('   ✓ Navigation successful');
    console.log('   Result:', JSON.stringify(navResult).substring(0, 200));
    console.log();

    // Test 2: Wait for page to load
    console.log('2. Waiting 2 seconds for page to load...');
    await playwright.waitFor({ time: 2 });
    console.log('   ✓ Wait complete\n');

    // Test 3: Get console messages
    console.log('3. Getting console messages...');
    const consoleMessages = await playwright.consoleMessages();
    console.log('   ✓ Console messages retrieved');
    if (Array.isArray(consoleMessages)) {
      console.log(`   Found ${consoleMessages.length} messages`);
      if (consoleMessages.length > 0) {
        console.log('   First few messages:', consoleMessages.slice(0, 3));
      }
    } else {
      console.log('   Response:', JSON.stringify(consoleMessages).substring(0, 300));
    }
    console.log();

    // Test 4: Get network requests
    console.log('4. Getting network requests...');
    const networkRequests = await playwright.networkRequests();
    console.log('   ✓ Network requests retrieved');
    if (Array.isArray(networkRequests)) {
      console.log(`   Found ${networkRequests.length} requests`);
      if (networkRequests.length > 0) {
        console.log('   Sample requests:', networkRequests.slice(0, 3).map(r => r.url || r));
      }
    } else {
      console.log('   Response:', JSON.stringify(networkRequests).substring(0, 300));
    }
    console.log();

    // Test 5: Take screenshot
    console.log('5. Taking screenshot...');
    const screenshotResult = await playwright.takeScreenshot({
      filename: 'test-screenshot.png',
    });
    console.log('   ✓ Screenshot command executed');
    console.log('   Result:', JSON.stringify(screenshotResult).substring(0, 300));
    console.log();

    // Test 6: Navigate back
    console.log('6. Testing navigation back...');
    await playwright.navigateBack();
    console.log('   ✓ Navigate back successful\n');

    // Test 7: List tabs
    console.log('7. Listing browser tabs...');
    const tabs = await playwright.tabs({ action: 'list' });
    console.log('   ✓ Tabs listed');
    console.log('   Tabs:', JSON.stringify(tabs).substring(0, 200));
    console.log();

    // Test 8: Close browser
    console.log('8. Closing browser...');
    await playwright.closeBrowser();
    console.log('   ✓ Browser closed\n');

    console.log('='.repeat(60));
    console.log('✅ Playwright MCP wrapper is working!');
    console.log('='.repeat(60));
    console.log();
    console.log('Working features:');
    console.log('✓ Navigation to localhost:3000');
    console.log('✓ Wait for page load');
    console.log('✓ Console message retrieval');
    console.log('✓ Network request monitoring');
    console.log('✓ Screenshot capture');
    console.log('✓ Browser back navigation');
    console.log('✓ Tab management');
    console.log();
    console.log('Your localhost:3000 is accessible via Playwright MCP wrapper!');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack:', error.stack);
    }
    console.log('\nMake sure:');
    console.log('- Dev server is running: npm run dev');
    console.log('- Port 3000 is accessible');
    process.exit(1);
  }
}

// Run tests
testPlaywrightBasic()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
