/**
 * Test script for Figma Remote MCP Server
 *
 * Tests the official Figma hosted MCP server at https://mcp.figma.com/mcp
 *
 * AUTHENTICATION:
 * The Figma Remote MCP server uses OAuth authentication.
 * On first run, mcp-remote will open your browser to Figma's OAuth consent page.
 *
 * First Time Setup:
 * 1. Run: npx tsx mcp/tests/test-figma-remote.ts
 * 2. Browser will open to: https://www.figma.com/oauth/authorize/...
 * 3. Click "Allow Access" to authorize the MCP server
 * 4. OAuth token will be cached by mcp-remote
 * 5. Test will complete successfully
 *
 * Subsequent Runs:
 * 1. Token is cached, browser won't open again
 * 2. Tests run normally without authentication prompts
 *
 * If you have issues with OAuth:
 * - Make sure your Figma account has access to the file
 * - Try deleting mcp-remote cache if it exists
 * - Run again to re-authenticate
 *
 * Usage:
 * npx tsx mcp/tests/test-figma-remote.ts
 *
 * This will attempt to fetch design context from the Marketing Page Components file
 */

import { config } from 'dotenv';
import { figmaRemote } from '../index.js';

config();

async function testFigmaRemote() {
  try {
    console.log('🚀 Testing Figma Remote MCP Server...\n');
    console.log('ℹ️  First run: Browser will open for OAuth authorization');
    console.log('ℹ️  Subsequent runs: OAuth token is cached, no browser needed\n');

    // Marketing Page Components file
    const fileKey = 'zwyycynQ0MjZgvCl67Ou1A';
    const nodeId = '1413-24025';

    console.log(`📁 File Key: ${fileKey}`);
    console.log(`🎯 Node ID: ${nodeId}\n`);

    // Test 1: Get Design Context
    console.log('📋 Test 1: Getting design context...');
    try {
      const context = await figmaRemote.getDesignContext({
        fileKey,
        nodeId,
        clientFrameworks: 'react',
        clientLanguages: 'typescript',
      });

      console.log('✅ Design context retrieved successfully!');
      console.log(`Response keys: ${Object.keys(context).join(', ')}`);

      if (context.code) {
        console.log(`\n📝 Code snippet (first 200 chars):\n${context.code.substring(0, 200)}...`);
      }

      if (context.metadata) {
        console.log(`\n📊 Metadata keys: ${Object.keys(context.metadata).join(', ')}`);
      }

      if (context.layers) {
        console.log(`\n🔧 Found ${context.layers.length} layers`);
      }
    } catch (error) {
      const err = error as Error;
      console.error('❌ Error getting design context:', err.message);
      console.error('Full error:', error);
    }

    // Test 2: Get Screenshot
    console.log('\n\n📸 Test 2: Getting screenshot...');
    try {
      const screenshot = await figmaRemote.getScreenshot({
        fileKey,
        nodeId,
      });

      console.log('✅ Screenshot retrieved successfully!');
      if (screenshot.screenshot) {
        const base64Length = screenshot.screenshot.length;
        console.log(`📷 Screenshot size: ${base64Length} bytes (base64)`);
        console.log(`First 100 chars: ${screenshot.screenshot.substring(0, 100)}...`);
      }
    } catch (error) {
      const err = error as Error;
      console.error('❌ Error getting screenshot:', err.message);
    }

    // Test 3: Get Variable Defs
    console.log('\n\n📚 Test 3: Getting variable definitions...');
    try {
      const variables = await figmaRemote.getVariableDefs({
        fileKey,
        nodeId,
      });

      console.log('✅ Variables retrieved successfully!');
      console.log(`Variable keys: ${Object.keys(variables.variables || {}).join(', ')}`);
    } catch (error) {
      const err = error as Error;
      console.error('❌ Error getting variables:', err.message);
    }

    // Test 4: Get Metadata
    console.log('\n\n🔍 Test 4: Getting metadata...');
    try {
      const metadata = await figmaRemote.getMetadata({
        fileKey,
        nodeId,
      });

      console.log('✅ Metadata retrieved successfully!');
      if (metadata.xml) {
        console.log(`📄 XML snippet (first 300 chars):\n${metadata.xml.substring(0, 300)}...`);
      }
    } catch (error) {
      const err = error as Error;
      console.error('❌ Error getting metadata:', err.message);
    }

    console.log('\n\n✨ Tests completed!\n');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

testFigmaRemote();
