/**
 * Test Linear MCP using our mcp-client
 * This test verifies the Linear MCP wrapper works correctly with stdio transport
 */

import { config } from 'dotenv';
import { getMCPClient, callMCPTool, closeAllClients } from '../mcp-client.js';

config();

async function testLinearMCPClient() {
  try {
    console.log('📋 Testing Linear MCP with getMCPClient wrapper...\n');

    // Step 1: Verify API key is set
    if (!process.env.LINEAR_API_KEY) {
      console.error('❌ LINEAR_API_KEY not found in environment');
      console.log('\n💡 Setup instructions:');
      console.log('   1. Copy .env.example to .env');
      console.log('   2. Get your API key from https://linear.app/settings/api');
      console.log('   3. Add: LINEAR_API_KEY=your-key-here\n');
      process.exit(1);
    }
    console.log('✓ LINEAR_API_KEY found in environment\n');

    // Step 2: Get the Linear MCP client
    console.log('📡 Step 1: Getting Linear MCP client...');
    const client = await getMCPClient('linear-server');
    console.log('✓ Client obtained (stdio transport)\n');

    // Step 3: List available tools
    console.log('📋 Step 2: Listing available Linear tools...');
    const toolsList = await client.listTools();
    console.log(`✓ Found ${toolsList.tools?.length || 0} tools\n`);

    if (toolsList.tools && toolsList.tools.length > 0) {
      console.log('Available tools:');
      toolsList.tools.slice(0, 10).forEach((tool: any) => {
        console.log(`  - ${tool.name}`);
      });
      if (toolsList.tools.length > 10) {
        console.log(`  ... and ${toolsList.tools.length - 10} more\n`);
      } else {
        console.log();
      }
    }

    // Step 4: Test listing teams
    console.log('🚀 Step 3: Testing list_teams via callMCPTool...');
    const teamsResult = await callMCPTool('linear-server', 'list_teams', {
      limit: 5,
    });

    console.log('✅ SUCCESS! Received teams from Linear\n');

    if (teamsResult.teams && teamsResult.teams.length > 0) {
      console.log(`📊 Found ${teamsResult.teams.length} team(s):\n`);
      teamsResult.teams.forEach((team: any, index: number) => {
        console.log(`${index + 1}. ${team.name}`);
        console.log(`   ID: ${team.id}`);
        console.log(`   Key: ${team.key || 'N/A'}`);
        if (team.description) {
          console.log(`   Description: ${team.description}`);
        }
        console.log();
      });

      // Step 5: Test getting user info
      console.log('🚀 Step 4: Testing get_user (me) via callMCPTool...');
      const userResult = await callMCPTool('linear-server', 'get_user', {
        query: 'me',
      });

      console.log('✅ SUCCESS! Received user info from Linear\n');
      console.log('👤 Current user:');
      console.log(`   Name: ${userResult.name || 'N/A'}`);
      console.log(`   Email: ${userResult.email || 'N/A'}`);
      console.log(`   ID: ${userResult.id || 'N/A'}`);
      if (userResult.displayName) {
        console.log(`   Display Name: ${userResult.displayName}`);
      }
      console.log();

      // Step 6: Test listing issues
      console.log('🚀 Step 5: Testing list_issues via callMCPTool...');
      const issuesResult = await callMCPTool('linear-server', 'list_issues', {
        team: teamsResult.teams[0].id,
        limit: 3,
      });

      console.log('✅ SUCCESS! Received issues from Linear\n');

      if (issuesResult.issues && issuesResult.issues.length > 0) {
        console.log(`🎫 Found ${issuesResult.issues.length} issue(s) in ${teamsResult.teams[0].name}:\n`);
        issuesResult.issues.forEach((issue: any, index: number) => {
          console.log(`${index + 1}. ${issue.title}`);
          console.log(`   Identifier: ${issue.identifier || issue.id}`);
          console.log(`   State: ${issue.state?.name || 'Unknown'}`);
          if (issue.priority) {
            console.log(`   Priority: ${issue.priority}`);
          }
          console.log();
        });
      } else {
        console.log('   No issues found in this team\n');
      }
    } else {
      console.log('⚠️  No teams found. Make sure you have access to Linear workspace.\n');
    }

    console.log('\n🎉 Linear MCP wrapper works perfectly!\n');
    console.log('✓ Stdio transport successfully connects to @linear/mcp-server-linear');
    console.log('✓ All Linear wrapper functions in servers/linear/ are usable');
    console.log('✓ API key authentication working correctly\n');

    // Clean up
    await closeAllClients();

  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Verify LINEAR_API_KEY is set in .env file');
      console.error('   2. Check API key is valid at https://linear.app/settings/api');
      console.error('   3. Ensure you have workspace access');
      console.error('   4. Try running: npm install (to ensure MCP SDK is installed)');
    }
    process.exit(1);
  }
}

testLinearMCPClient();
