/**
 * Test Figma MCP connection and available tools
 */

import { config } from 'dotenv';
import { getMCPClient, closeAllClients } from '../mcp-client.js';

// Load environment variables
config();

async function testFigmaConnection() {
  try {
    console.log('🔍 Testing Figma MCP connection...\n');

    // Check if Figma desktop server is running
    console.log('⚠️  Make sure Figma Desktop app is running with:');
    console.log('   1. Figma Desktop app open');
    console.log('   2. Dev Mode enabled (Shift+D)');
    console.log('   3. "Enable desktop MCP server" activated in inspect panel\n');

    // Connect to Figma MCP server
    console.log('Connecting to Figma MCP server...');
    const client = await getMCPClient('figma-desktop');
    console.log('✓ Connected successfully!\n');

    // List available tools
    console.log('Fetching available tools...');
    const toolsList = await client.listTools();
    console.log(`✓ Found ${toolsList.tools?.length || 0} tools\n`);

    if (toolsList.tools && toolsList.tools.length > 0) {
      console.log('Available Figma tools:');
      toolsList.tools.forEach((tool, index) => {
        console.log(`  ${index + 1}. ${tool.name}`);
        if (tool.description) {
          console.log(`     ${tool.description}`);
        }
      });
    }

    console.log('\n✅ Figma MCP connection is working!\n');

    // Close connection
    await closeAllClients();
  } catch (error) {
    console.error('❌ Error testing Figma connection:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      console.error('\n💡 Troubleshooting:');
      console.error('   - Ensure Figma Desktop app is running');
      console.error('   - Check that Dev Mode is enabled (Shift+D)');
      console.error('   - Verify "Enable desktop MCP server" is activated');
      console.error('   - Server should be running at http://127.0.0.1:3845/mcp');
    }
    process.exit(1);
  }
}

testFigmaConnection();
