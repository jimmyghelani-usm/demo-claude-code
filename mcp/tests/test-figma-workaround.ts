/**
 * Test Figma MCP with workaround for schema validation error
 *
 * The Figma server returns icons.sizes as a string instead of an array,
 * causing Zod validation to fail. We'll try to work around this by
 * patching the response or continuing despite the error.
 */

import { config } from 'dotenv';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

config();

async function testFigmaWorkaround() {
  try {
    console.log('🔍 Testing Figma MCP with schema validation workaround...\n');

    const transport = new StreamableHTTPClientTransport(
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

    console.log('Attempting connection (may see schema validation warnings)...');

    try {
      await client.connect(transport);
      console.log('✓ Connected successfully!\n');
    } catch (error: any) {
      // Check if it's the known Zod validation error on icons.sizes
      if (error.name === 'ZodError' && error.issues) {
        const isIconSizesError = error.issues.every((issue: any) =>
          issue.path && issue.path.includes('icons') && issue.path.includes('sizes')
        );

        if (isIconSizesError) {
          console.log('⚠️  Known schema validation issue detected (icons.sizes format)');
          console.log('    This is a compatibility issue between Figma server and MCP SDK');
          console.log('    Attempting to continue anyway...\n');

          // The connection might still work for tool calls
          // Let's try to use the client anyway
        } else {
          // Re-throw to outer catch
          console.error('❌ Unexpected connection error:', error.name || 'Unknown error');
          if (error.message) {
            console.error('   Message:', error.message);
          }
          await client.close();
          process.exit(1);
          return;
        }
      } else {
        // Re-throw to outer catch
        console.error('❌ Connection error:', error.name || 'Unknown error');
        if (error.message) {
          console.error('   Message:', error.message);
        }
        await client.close();
        process.exit(1);
        return;
      }
    }

    // Try to list tools even if initialization had issues
    console.log('Attempting to list available tools...');
    try {
      const toolsList = await client.listTools();
      console.log(`✓ Found ${toolsList.tools?.length || 0} tools\n`);

      if (toolsList.tools && toolsList.tools.length > 0) {
        console.log('Available Figma tools:');
        toolsList.tools.forEach((tool, index) => {
          console.log(`  ${index + 1}. ${tool.name}`);
          if (tool.description) {
            console.log(`     ${tool.description.slice(0, 100)}${tool.description.length > 100 ? '...' : ''}`);
          }
        });
        console.log('\n✅ Figma MCP tools are accessible!\n');
      }
    } catch (toolsError: any) {
      console.error('❌ Could not list tools:', toolsError.message);
      console.log('\n💡 The connection was established but tool listing failed.');
      console.log('   This suggests the schema validation error prevented proper initialization.\n');
    }

    await client.close();

  } catch (error: any) {
    console.error('❌ Error:', error.name || 'Unknown error');
    if (error.message) {
      console.error('   Message:', error.message);
    }

    if (error.name === 'ZodError') {
      console.log('\n📋 Validation Error Details:');
      console.log('   This is a known compatibility issue between Figma MCP server');
      console.log('   and @modelcontextprotocol/sdk version', require('../package.json').dependencies['@modelcontextprotocol/sdk']);
      console.log('\n   The issue: Figma returns icons.sizes as string, SDK expects array');
      console.log('   Tracking: https://github.com/modelcontextprotocol/typescript-sdk/issues/802\n');
    }

    process.exit(1);
  }
}

testFigmaWorkaround();
