/**
 * Test Figma MCP by making direct HTTP calls, bypassing SDK validation
 *
 * URL: https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=2171-13039&m=dev
 * File Key: zwyycynQ0MjZgvCl67Ou1A
 * Node ID: 2171-13039
 */

import { config } from 'dotenv';
import { writeFileSync } from 'fs';

config();

const FIGMA_MCP_URL = 'http://127.0.0.1:3845/mcp';

async function callFigmaTool(toolName: string, params: any) {
  console.log(`🔧 Calling Figma tool: ${toolName}`);
  console.log(`   Parameters:`, JSON.stringify(params, null, 2));

  const response = await fetch(FIGMA_MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: params,
      },
      id: Date.now(),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`MCP Error: ${data.error.message || JSON.stringify(data.error)}`);
  }

  return data.result;
}

async function testGetDesignContext() {
  try {
    console.log('🎨 Testing Figma get_design_context tool...\n');
    console.log('Target: https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components');
    console.log('Node: 2171-13039\n');

    // First, let's list available tools to confirm the server is working
    console.log('📋 Step 1: Listing available tools...');
    const listResponse = await fetch(FIGMA_MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 1,
      }),
    });

    if (listResponse.ok) {
      const listData = await listResponse.json();
      const tools = listData.result?.tools || [];
      console.log(`✓ Found ${tools.length} tools\n`);

      // Find get_design_context tool
      const designContextTool = tools.find((t: any) => t.name === 'get_design_context');
      if (designContextTool) {
        console.log('✓ get_design_context tool is available');
        console.log(`  Description: ${designContextTool.description}\n`);
      }
    }

    // Now call get_design_context
    console.log('🚀 Step 2: Calling get_design_context...\n');

    const result = await callFigmaTool('get_design_context', {
      nodeId: '2171-13039',
      clientFrameworks: 'react',
      clientLanguages: 'typescript',
    });

    console.log('\n✅ SUCCESS! Received design context from Figma\n');

    // Parse the result
    if (result.content && Array.isArray(result.content)) {
      for (const item of result.content) {
        if (item.type === 'text') {
          console.log('📄 Response content:');
          console.log('---');

          // Try to parse as JSON first
          try {
            const jsonData = JSON.parse(item.text);
            console.log(JSON.stringify(jsonData, null, 2));

            // Save to file for inspection
            writeFileSync(
              '/Users/ghelanijimmy/repos/demo-claude-code/servers/figma-design-context.json',
              JSON.stringify(jsonData, null, 2)
            );
            console.log('\n💾 Full response saved to: servers/figma-design-context.json');
          } catch {
            // Not JSON, just print as text
            console.log(item.text);
          }
          console.log('---\n');
        } else if (item.type === 'resource') {
          console.log(`📦 Resource: ${item.resource?.uri || 'unknown'}`);
          if (item.resource?.mimeType) {
            console.log(`   MIME type: ${item.resource.mimeType}`);
          }
        }
      }
    } else {
      console.log('Response:', JSON.stringify(result, null, 2));
    }

    console.log('\n🎉 Figma MCP wrapper works! Schema validation can be bypassed.\n');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);

      // Provide helpful debugging info
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Ensure Figma Desktop is running');
      console.log('   2. Check Dev Mode is enabled (Shift+D)');
      console.log('   3. Verify MCP server is enabled in the inspect panel');
      console.log('   4. Make sure the Figma file is open or accessible');
      console.log('   5. Node ID format: Use the exact ID from the URL (e.g., "2171-13039")');
    }
    process.exit(1);
  }
}

testGetDesignContext();
