/**
 * Test Figma MCP connection using deprecated SSE transport
 * (StreamableHTTP might be too strict with validation)
 */

import { config } from 'dotenv';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
// @ts-ignore - Using deprecated SSE transport as fallback
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

// Load environment variables
config();

async function testFigmaSSE() {
  try {
    console.log('🔍 Testing Figma MCP with SSE transport...\n');
    console.log('Note: Using deprecated SSE transport as a compatibility workaround\n');

    const transport = new SSEClientTransport(
      new URL('http://127.0.0.1:3845/mcp')
    );

    const client = new Client(
      {
        name: 'figma-test-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );

    console.log('Connecting to Figma Desktop MCP server...');
    await client.connect(transport);
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

    console.log('\n✅ Figma MCP connection is working with SSE transport!\n');

    await client.close();
  } catch (error) {
    console.error('❌ Error testing Figma with SSE:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
    process.exit(1);
  }
}

testFigmaSSE();
