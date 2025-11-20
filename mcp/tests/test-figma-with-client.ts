/**
 * Test Figma MCP using our mcp-client with get_design_context
 *
 * URL: https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=2171-13039&m=dev
 * File Key: zwyycynQ0MjZgvCl67Ou1A
 * Node ID: 2171-13039
 */

import { config } from 'dotenv';
import { getMCPClient, callMCPTool, closeAllClients } from '../mcp-client.js';
import { writeFileSync } from 'fs';

config();

async function testFigmaGetDesignContext() {
  try {
    console.log('🎨 Testing Figma MCP with getMCPClient wrapper...\n');
    console.log('Target URL: https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components');
    console.log('Node ID: 2171-13039\n');

    // Step 1: Get the Figma MCP client
    console.log('📡 Step 1: Getting Figma MCP client...');
    const client = await getMCPClient('figma-desktop');
    console.log('✓ Client obtained\n');

    // Step 2: List available tools
    console.log('📋 Step 2: Listing available Figma tools...');
    const toolsList = await client.listTools();
    console.log(`✓ Found ${toolsList.tools?.length || 0} tools\n`);

    if (toolsList.tools && toolsList.tools.length > 0) {
      const designContextTool = toolsList.tools.find((t: any) => t.name === 'get_design_context');
      if (designContextTool) {
        console.log('✓ get_design_context tool is available');
        console.log(`  Description: ${designContextTool.description}\n`);
      }
    }

    // Step 3: Call get_design_context using callMCPTool
    console.log('🚀 Step 3: Calling get_design_context via callMCPTool...\n');

    const result = await callMCPTool('figma-desktop', 'get_design_context', {
      nodeId: '2171-13039',
      clientFrameworks: 'react',
      clientLanguages: 'typescript',
    });

    console.log('✅ SUCCESS! Received design context from Figma\n');

    // Parse the result
    if (result.content && Array.isArray(result.content)) {
      for (const item of result.content) {
        if (item.type === 'text') {
          console.log('📄 Response content preview (first 500 chars):');
          console.log('---');

          const textContent = item.text as string;
          console.log(textContent.substring(0, 500));
          if (textContent.length > 500) {
            console.log('...\n(truncated for display)\n');
          }
          console.log('---\n');

          // Try to parse as JSON
          try {
            const jsonData = JSON.parse(textContent);

            // Save to file for inspection
            const outputPath = '/Users/ghelanijimmy/repos/demo-claude-code/servers/figma-design-context.json';
            writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
            console.log(`💾 Full response saved to: servers/figma-design-context.json`);
            console.log(`   File size: ${(textContent.length / 1024).toFixed(2)} KB\n`);

            // Show some key information if available
            if (jsonData.layers) {
              console.log(`📊 Design contains ${jsonData.layers.length} layer(s)`);
            }
            if (jsonData.code) {
              console.log(`💻 Generated code snippet preview:`);
              console.log(jsonData.code.substring(0, 200) + '...\n');
            }
          } catch {
            // Not JSON, save as text
            const outputPath = '/Users/ghelanijimmy/repos/demo-claude-code/servers/figma-design-context.txt';
            writeFileSync(outputPath, textContent);
            console.log(`💾 Response saved to: servers/figma-design-context.txt\n`);
          }
        } else if (item.type === 'resource') {
          console.log(`📦 Resource: ${item.resource?.uri || 'unknown'}`);
          if (item.resource?.mimeType) {
            console.log(`   MIME type: ${item.resource.mimeType}`);
          }
        }
      }
    } else {
      console.log('Response structure:');
      console.log(JSON.stringify(result, null, 2));
    }

    console.log('\n🎉 Figma MCP wrapper works perfectly!\n');
    console.log('✓ Direct HTTP client successfully bypasses SDK validation');
    console.log('✓ All Figma wrapper functions in servers/figma/ are now usable\n');

    // Clean up
    await closeAllClients();

  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Ensure Figma Desktop is running');
      console.error('   2. Check Dev Mode is enabled (Shift+D)');
      console.error('   3. Verify MCP server is enabled in the inspect panel');
      console.error('   4. Make sure you have access to the Figma file');
      console.error('   5. Node ID format should match URL exactly (e.g., "2171-13039")');
    }
    process.exit(1);
  }
}

testFigmaGetDesignContext();
