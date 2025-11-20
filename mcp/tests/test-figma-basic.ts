/**
 * Test Figma MCP server with direct HTTP check
 */

import { config } from 'dotenv';

// Load environment variables
config();

async function testFigmaServer() {
  try {
    console.log('🔍 Testing Figma Desktop MCP server...\n');

    // Check if the server is responding
    console.log('Checking if server is accessible at http://127.0.0.1:3845/mcp...');

    const response = await fetch('http://127.0.0.1:3845/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: {
            name: 'test-client',
            version: '1.0.0',
          },
        },
        id: 1,
      }),
    });

    if (!response.ok) {
      console.error(`❌ HTTP ${response.status}: ${response.statusText}`);
      console.error('💡 Make sure:');
      console.error('   - Figma Desktop app is running');
      console.error('   - Dev Mode is enabled (Shift+D)');
      console.error('   - "Enable desktop MCP server" is activated in the inspect panel');
      process.exit(1);
      return;
    }

    const data = await response.json();
    console.log('✓ Server is responding!\n');
    console.log('Server response:');
    console.log(JSON.stringify(data, null, 2));

    if (data.result) {
      console.log('\n✅ Figma Desktop MCP server is running!');
      console.log(`Server name: ${data.result.serverInfo?.name || 'Unknown'}`);
      console.log(`Server version: ${data.result.serverInfo?.version || 'Unknown'}`);

      // Try to list tools
      console.log('\n🔧 Attempting to list available tools...');
      const toolsResponse = await fetch('http://127.0.0.1:3845/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          params: {},
          id: 2,
        }),
      });

      if (toolsResponse.ok) {
        const toolsData = await toolsResponse.json();
        console.log(`✓ Found ${toolsData.result?.tools?.length || 0} tools\n`);

        if (toolsData.result?.tools) {
          console.log('Available tools:');
          toolsData.result.tools.forEach((tool: any, index: number) => {
            console.log(`  ${index + 1}. ${tool.name}`);
            if (tool.description) {
              console.log(`     ${tool.description}`);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('❌ Error testing Figma server:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      console.error('\n💡 Make sure:');
      console.error('   - Figma Desktop app is running');
      console.error('   - Dev Mode is enabled (Shift+D)');
      console.error('   - "Enable desktop MCP server" is activated in the inspect panel');
    }
    process.exit(1);
  }
}

testFigmaServer();
