/**
 * Test official Microsoft Playwright MCP server
 */

import { config } from 'dotenv';
import { getMCPClient } from '../mcp-client.js';

config();

async function testOfficialPlaywright() {
  console.log('='.repeat(60));
  console.log('Testing Official Microsoft Playwright MCP Server');
  console.log('='.repeat(60));
  console.log();

  try {
    console.log('Connecting to @playwright/mcp server...');
    const client = await getMCPClient('playwright');
    console.log('✓ Connected successfully\n');

    console.log('Listing available tools...');
    const toolsList = await client.listTools();
    console.log(`✓ Found ${toolsList.tools?.length || 0} tools\n`);

    if (toolsList.tools && toolsList.tools.length > 0) {
      console.log('Available tools from official Playwright MCP:');
      console.log('='.repeat(60));
      for (const tool of toolsList.tools) {
        console.log(`\n📦 ${tool.name}`);
        console.log(`   ${tool.description || 'No description'}`);
      }
      console.log();
    }

    await client.close();
    console.log('='.repeat(60));
    console.log('✅ Official Playwright MCP server is working!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testOfficialPlaywright();
