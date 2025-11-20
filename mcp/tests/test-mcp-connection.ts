/**
 * Test MCP connection and list available tools
 */

import { config } from 'dotenv';
import { getMCPClient } from '../mcp-client.js';

config();

async function testMCPConnection() {
  console.log('Testing MCP Server Connection...\n');

  try {
    console.log('Connecting to Playwright MCP server...');
    const client = await getMCPClient('playwright');
    console.log('✓ Connected successfully\n');

    console.log('Listing available tools...');
    const toolsList = await client.listTools();
    console.log(`✓ Found ${toolsList.tools?.length || 0} tools\n`);

    if (toolsList.tools && toolsList.tools.length > 0) {
      console.log('Available Playwright MCP tools:');
      console.log('='.repeat(60));
      for (const tool of toolsList.tools) {
        console.log(`\nTool: ${tool.name}`);
        console.log(`Description: ${tool.description || 'N/A'}`);
        if (tool.inputSchema) {
          console.log(`Schema:`, JSON.stringify(tool.inputSchema, null, 2).substring(0, 200));
        }
      }
    } else {
      console.log('No tools found - server might not be properly configured');
    }

    await client.close();
  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
  }
}

testMCPConnection();
