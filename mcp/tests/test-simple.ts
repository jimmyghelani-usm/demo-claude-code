/**
 * Simple test to verify MCP wrappers are working
 *
 * Run with: npx tsx servers/test-simple.ts
 */

import { config } from 'dotenv';
import { linear } from '../index.js';

// Load environment variables
config();

async function testLinear() {
  console.log('Testing Linear MCP wrapper...\n');

  try {
    // Test 1: List teams
    console.log('1. Listing teams...');
    const teams = await linear.listTeams({ limit: 5 });
    console.log(`   ✓ Found ${teams.teams?.length || 0} teams\n`);

    if (teams.teams && teams.teams.length > 0) {
      const firstTeam = teams.teams[0];
      console.log(`   Using team: ${firstTeam.name} (${firstTeam.id})\n`);

      // Test 2: List issues for this team
      console.log('2. Listing issues...');
      const issues = await linear.listIssues({
        team: firstTeam.id,
        limit: 5,
      });
      console.log(`   ✓ Found ${issues.issues?.length || 0} issues\n`);

      // Test 3: Get current user
      console.log('3. Getting current user...');
      const user = await linear.getUser({ query: 'me' });
      console.log(`   ✓ Current user: ${user.name || 'Unknown'}\n`);

      console.log('All tests passed! ✓');
      console.log('\nThe MCP wrapper architecture is working correctly.');
      console.log('Notice how all the MCP communication happened through');
      console.log('typed functions, and only final results were returned.\n');
    } else {
      console.log('No teams found. Make sure you have access to Linear teams.');
    }
  } catch (error) {
    console.error('Test failed:', error);
    console.log('\nMake sure you have set LINEAR_API_KEY environment variable:');
    console.log('  export LINEAR_API_KEY="your-api-key"\n');
    process.exit(1);
  }
}

// Run tests
console.log('='.repeat(60));
console.log('MCP Wrapper Test Suite');
console.log('='.repeat(60));
console.log();

testLinear()
  .then(() => {
    console.log('='.repeat(60));
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
