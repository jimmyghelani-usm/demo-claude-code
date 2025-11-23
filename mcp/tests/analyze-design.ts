import { config } from 'dotenv';
import { figma } from '../index.js';

config();

async function analyzeDesign() {
  try {
    console.log('Fetching design context for node 2172-13308...');
    
    const design = await figma.getDesignContext({
      nodeId: '2172-13308',
      clientFrameworks: 'react',
      clientLanguages: 'typescript'
    });

    console.log('\n=== DESIGN CONTEXT RETRIEVED ===\n');
    console.log(JSON.stringify(design, null, 2));
    
  } catch (error) {
    console.error('Error fetching design:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

analyzeDesign();
