/**
 * Test Figma MCP by calling tools directly without initialization
 * Some MCP servers allow direct tool calls without the init handshake
 */

import { config } from 'dotenv';
import { writeFileSync } from 'fs';

config();

const FIGMA_MCP_URL = 'http://127.0.0.1:3845/mcp';

async function testDirectToolCall() {
  try {
    console.log('🎨 Testing direct tool call to Figma MCP (no init)...\n');
    console.log('Target: Marketing-Page-Components');
    console.log('Node: 2171-13039\n');

    // Try calling get_design_context directly
    console.log('🚀 Calling get_design_context directly...\n');

    const response = await fetch(FIGMA_MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'get_design_context',
          arguments: {
            nodeId: '2171-13039',
            clientFrameworks: 'react',
            clientLanguages: 'typescript',
          },
        },
        id: 1,
      }),
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Content-Type: ${response.headers.get('content-type')}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP ${response.status}:`);
      console.error(errorText);
      process.exit(1);
    }

    // Check if it's JSON or SSE
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      console.log('✅ Got JSON response!');

      if (data.error) {
        console.error('❌ MCP Error:', data.error);
        process.exit(1);
      }

      if (data.result) {
        console.log('\n📄 Design context result received!\n');

        if (data.result.content) {
          for (const item of data.result.content) {
            if (item.type === 'text' && item.text) {
              const preview = item.text.substring(0, 500);
              console.log('Content preview:');
              console.log('---');
              console.log(preview);
              if (item.text.length > 500) {
                console.log('...\n(truncated)\n');
              }
              console.log('---\n');

              // Save full response
              writeFileSync(
                '/Users/ghelanijimmy/repos/demo-claude-code/servers/figma-design-context.txt',
                item.text
              );
              console.log(`💾 Saved to: servers/figma-design-context.txt`);
              console.log(`   Size: ${(item.text.length / 1024).toFixed(2)} KB\n`);
            }
          }
        }

        console.log('\n🎉 Direct tool call works! No initialization needed!\n');
      }
    } else {
      console.log('⚠️  Got SSE stream, need to parse events...');
      const text = await response.text();
      console.log('Raw response (first 500 chars):');
      console.log(text.substring(0, 500));
    }

  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
    process.exit(1);
  }
}

testDirectToolCall();
