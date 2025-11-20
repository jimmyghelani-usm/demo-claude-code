/**
 * Example: Design to Linear Issues Workflow
 *
 * This example demonstrates how to use the MCP wrappers to:
 * 1. Extract design context from Figma
 * 2. Process the design data locally
 * 3. Create Linear issues for implementation
 *
 * This showcases the power of the wrapper pattern - all processing
 * happens in code, and only final results are sent back to the LLM.
 */

import { config } from 'dotenv';
import { figma, linear } from '../index.js';

// Load environment variables
config();

interface ComponentSpec {
  name: string;
  type: string;
  properties: Record<string, any>;
}

/**
 * Extract components from Figma design context
 * This processing happens locally without consuming LLM context!
 */
function extractComponents(designContext: any): ComponentSpec[] {
  // Process design context to extract component specifications
  const components: ComponentSpec[] = [];

  // Example: Parse layers and identify components
  if (designContext.layers) {
    for (const layer of designContext.layers) {
      if (layer.type === 'COMPONENT') {
        components.push({
          name: layer.name,
          type: layer.type,
          properties: {
            width: layer.width,
            height: layer.height,
            // ... more properties
          },
        });
      }
    }
  }

  return components;
}

/**
 * Main workflow: Convert Figma design to Linear issues
 */
export async function designToLinearIssues(
  figmaNodeId: string,
  linearTeam: string,
  linearProject?: string
) {
  console.log('Fetching Figma design context...');

  // Step 1: Get design context from Figma
  const designContext = await figma.getDesignContext({
    nodeId: figmaNodeId,
    clientFrameworks: 'react',
    clientLanguages: 'typescript',
  });

  console.log('Getting design variables...');

  // Step 2: Get design system variables
  const variables = await figma.getVariableDefs({
    nodeId: figmaNodeId,
  });

  console.log('Processing design locally...');

  // Step 3: Process design data locally (NO context consumption!)
  const components = extractComponents(designContext);

  console.log(`Found ${components.length} components to implement`);

  // Step 4: Create Linear issues for each component
  const issues = [];
  for (const component of components) {
    console.log(`Creating issue for ${component.name}...`);

    const issue = await linear.createIssue({
      title: `Implement ${component.name} component`,
      team: linearTeam,
      project: linearProject,
      description: `
## Component Specifications

**Type**: ${component.type}

**Properties**:
\`\`\`json
${JSON.stringify(component.properties, null, 2)}
\`\`\`

## Design Variables
\`\`\`json
${JSON.stringify(variables, null, 2)}
\`\`\`

## Figma Link
Node ID: ${figmaNodeId}
      `.trim(),
      labels: ['frontend', 'design-implementation'],
      priority: 3, // Normal priority
    });

    issues.push(issue);
  }

  console.log(`Created ${issues.length} Linear issues`);

  return {
    components,
    issues,
    variables,
  };
}

// Example usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const figmaNodeId = process.env.FIGMA_NODE_ID || '1:2';
  const linearTeam = process.env.LINEAR_TEAM || 'Engineering';
  const linearProject = process.env.LINEAR_PROJECT;

  designToLinearIssues(figmaNodeId, linearTeam, linearProject)
    .then((result) => {
      console.log('Workflow completed successfully!');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch((error) => {
      console.error('Workflow failed:', error);
      process.exit(1);
    });
}
