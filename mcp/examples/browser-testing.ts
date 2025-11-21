/**
 * Example: Browser Testing Workflow with Playwright
 *
 * This example demonstrates how to use Playwright wrappers to:
 * 1. Navigate to a website
 * 2. Interact with elements
 * 3. Capture screenshots and console logs
 * 4. Report issues to Linear if tests fail
 *
 * All browser interactions happen through typed wrappers!
 */

import {config} from 'dotenv';
import {linear, playwright} from '../index.js';

// Load environment variables
config();

interface TestResult {
  testName: string;
  passed: boolean;
  error?: string;
  screenshot?: string;
}

/**
 * Test a login form
 */
async function testLoginForm(url: string): Promise<TestResult> {
  try {
    console.log(`Navigating to ${url}...`);
    await playwright.navigate({ url });

    console.log('Waiting for page to load...');
    await playwright.waitFor({ time: 2 });

    console.log('Taking initial screenshot...');
    await playwright.takeScreenshot({
      filename: 'login-initial.png',
    });

    console.log('Getting page snapshot...');
    await playwright.snapshot();

    // Process snapshot locally to find login form
    console.log('Finding login form elements...');

    console.log('Filling login form...');
    await playwright.fillForm({
      fields: [
        {
          name: 'Email',
          type: 'textbox',
          ref: 'input[type="email"]',
          value: 'test@example.com',
        },
        {
          name: 'Password',
          type: 'textbox',
          ref: 'input[type="password"]',
          value: 'password123',
        },
      ],
    });

    console.log('Clicking submit button...');
    await playwright.click({
      element: 'Submit button',
      ref: 'button[type="submit"]',
    });

    console.log('Waiting for navigation...');
    await playwright.waitFor({ time: 3 });

    console.log('Checking for error messages...');
    await playwright.snapshot();

    console.log('Taking final screenshot...');
    await playwright.takeScreenshot({
      filename: 'login-result.png',
    });

    console.log('Getting console messages...');
    await playwright.consoleMessages();

    return {
      testName: 'Login Form Test',
      passed: true,
    };
  } catch (error) {
    return {
      testName: 'Login Form Test',
      passed: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Report test failure to Linear
 */
async function reportTestFailure(
  testResult: TestResult,
  team: string,
  url: string
): Promise<unknown> {
  console.log(`Reporting test failure to Linear...`);
  
  return await linear.createIssue({
      title: `Test Failed: ${testResult.testName}`,
      team,
      description: `
## Test Details

**Test Name**: ${testResult.testName}
**URL**: ${url}
**Status**: ❌ Failed

## Error

\`\`\`
${testResult.error}
\`\`\`

## Screenshots

${testResult.screenshot ? `Screenshot saved: ${testResult.screenshot}` : 'No screenshot available'}

## Next Steps

- [ ] Investigate the failure
- [ ] Fix the issue
- [ ] Re-run the test
    `.trim(),
      labels: ['bug', 'testing'],
      priority: 2, // High priority
  });
}

/**
 * Main testing workflow
 */
export async function runBrowserTests(
  url: string,
  linearTeam: string
): Promise<void> {
  console.log('Starting browser tests...');

  // Run login test
  const loginResult = await testLoginForm(url);

  // Report results
  if (!loginResult.passed) {
    console.log('Test failed, creating Linear issue...');
    const issue = await reportTestFailure(loginResult, linearTeam, url);
    console.log(`Created issue: ${issue.id}`);
  } else {
    console.log('All tests passed! ✓');
  }

  // Close browser
  console.log('Closing browser...');
  await playwright.closeBrowser();
}

// Example usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.env.TEST_URL || 'https://example.com/login';
  const linearTeam = process.env.LINEAR_TEAM || 'Engineering';

  runBrowserTests(url, linearTeam)
    .then(() => {
      console.log('Testing workflow completed!');
    })
    .catch((error) => {
      console.error('Testing workflow failed:', error);
      process.exit(1);
    });
}
