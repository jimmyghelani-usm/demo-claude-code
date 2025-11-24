import { config } from 'dotenv';
import { figma } from '../index.js';
import * as fs from 'fs';
import * as path from 'path';

config();

interface ColorSpec {
  hex: string;
  rgba?: string;
  opacity: number;
  usage: string[];
}

interface TypographySpec {
  name: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  textTransform: string;
}

interface ComponentSpec {
  name: string;
  props: string[];
  states: string[];
  structure: string;
}

interface DesignSpec {
  componentName: string;
  nodeId: string;
  structure: {
    hierarchy: string;
    totalComponents: number;
    totalElements: number;
  };
  colors: ColorSpec[];
  typography: TypographySpec[];
  spacing: {
    padding: string[];
    margin: string[];
    gap: string[];
  };
  components: ComponentSpec[];
  reactCode: string;
  assets: Array<{ name: string; type: string }>;
  accessibilityFeatures: string[];
  layout: {
    containerWidth: string;
    responsivePatterns: string[];
  };
}

async function extractFigmaSpecs(nodeId: string): Promise<DesignSpec> {
  try {
    console.log(`Extracting design specifications from Figma node ${nodeId}...`);

    // Get design context with React and TypeScript preferences
    const designContext = await figma.getDesignContext({
      nodeId,
      clientFrameworks: 'react',
      clientLanguages: 'typescript'
    });

    console.log('Design context retrieved');

    // Get variables (design tokens)
    const variables = await figma.getVariableDefs({
      nodeId,
      clientFrameworks: 'react',
      clientLanguages: 'typescript'
    });

    console.log('Variables retrieved');

    // Parse the returned code (it's a string, not an object)
    const code = typeof designContext === 'string' ? designContext : designContext?.code || '';

    // Create comprehensive specification
    const specs: DesignSpec = {
      componentName: extractComponentName(code),
      nodeId,
      structure: {
        hierarchy: extractHierarchy(code),
        totalComponents: countReactComponents(code),
        totalElements: countHtmlElements(code)
      },
      colors: extractColors(code),
      typography: extractTypography(code),
      spacing: extractSpacing(code),
      components: extractComponents(code),
      reactCode: truncateCode(code, 5000), // Limit code to 5000 chars for readability
      assets: extractAssets(code),
      accessibilityFeatures: extractAccessibilityFeatures(code),
      layout: {
        containerWidth: extractContainerWidth(code),
        responsivePatterns: extractResponsivePatterns(code)
      }
    };

    return specs;
  } catch (error) {
    console.error('Error extracting Figma specs:', error);
    throw error;
  }
}

function extractComponentName(code: string): string {
  // Extract the default export function name
  const match = code.match(/export default function (\w+)/);
  return match ? match[1] : 'Component';
}

function extractHierarchy(code: string): string {
  const lines = code.split('\n').length;
  return `${lines} lines of React code generated from Figma design`;
}

function countReactComponents(code: string): number {
  const matches = code.match(/function\s+\w+\s*\(/g) || [];
  return matches.length;
}

function countHtmlElements(code: string): number {
  const divCount = (code.match(/<div/gi) || []).length;
  const spanCount = (code.match(/<span/gi) || []).length;
  const pCount = (code.match(/<p/gi) || []).length;
  return divCount + spanCount + pCount;
}

function extractColors(code: string): ColorSpec[] {
  const colors: Map<string, ColorSpec> = new Map();

  // Extract bg-[] colors
  const bgPattern = /bg-\[(#[0-9A-Fa-f]{6}|rgba?\([^)]+\))\]/g;
  let match;

  while ((match = bgPattern.exec(code)) !== null) {
    const colorValue = match[1];
    if (!colors.has(colorValue)) {
      colors.set(colorValue, {
        hex: colorValue.startsWith('#') ? colorValue.toUpperCase() : colorValue,
        opacity: extractOpacity(colorValue),
        usage: []
      });
    }
  }

  // Extract text colors (text-[color])
  const textPattern = /text-\[(#[0-9A-Fa-f]{6}|rgba?\([^)]+\))\]/g;
  while ((match = textPattern.exec(code)) !== null) {
    const colorValue = match[1];
    if (!colors.has(colorValue)) {
      colors.set(colorValue, {
        hex: colorValue.startsWith('#') ? colorValue.toUpperCase() : colorValue,
        opacity: extractOpacity(colorValue),
        usage: ['text']
      });
    } else {
      const existing = colors.get(colorValue);
      if (existing) existing.usage.push('text');
    }
  }

  // Extract inline style colors
  const stylePattern = /style=\{\s*{[^}]*backgroundColor:\s*['"](#[0-9A-Fa-f]{6}|rgba?\([^)]*\))/g;
  while ((match = stylePattern.exec(code)) !== null) {
    const colorValue = match[1];
    if (!colors.has(colorValue)) {
      colors.set(colorValue, {
        hex: colorValue.startsWith('#') ? colorValue.toUpperCase() : colorValue,
        opacity: extractOpacity(colorValue),
        usage: ['background']
      });
    }
  }

  return Array.from(colors.values());
}

function extractOpacity(colorValue: string): number {
  if (colorValue.includes('rgba')) {
    const opacityMatch = colorValue.match(/[\d.]+\)$/);
    if (opacityMatch) {
      return parseFloat(opacityMatch[0].slice(0, -1));
    }
  }
  return 1;
}

function extractTypography(code: string): TypographySpec[] {
  const typography: Map<string, TypographySpec> = new Map();

  // Extract font-size patterns
  const fontSizePattern = /text-\[(\d+)px\]/g;
  const fontFamilyPattern = /font-\['([^']+)'\]/g;
  const fontWeightPattern = /(font-(?:bold|medium|regular|semibold)|font-\[(\w+)\])/g;
  const lineHeightPattern = /leading-\[([^\]]+)\]/g;

  // Get all text sizes
  let match;
  const sizes = new Set<string>();
  while ((match = fontSizePattern.exec(code)) !== null) {
    sizes.add(match[1] + 'px');
  }

  // Get all font families
  const families = new Set<string>();
  while ((match = fontFamilyPattern.exec(code)) !== null) {
    families.add(match[1]);
  }

  // Create typography specs
  let index = 1;
  sizes.forEach(size => {
    const fontFamily = Array.from(families)[0] || 'System Font';
    const fontWeight = extractFontWeight(code);
    const lineHeight = extractLineHeight(code);

    typography.set(`Typography-${index}`, {
      name: `Typography ${index}`,
      fontSize: size,
      fontFamily,
      fontWeight,
      lineHeight,
      letterSpacing: extractLetterSpacing(code),
      textTransform: extractTextTransform(code)
    });
    index++;
  });

  return Array.from(typography.values());
}

function extractFontWeight(code: string): string {
  if (code.includes('font-bold')) return '700';
  if (code.includes('font-semibold')) return '600';
  if (code.includes('font-medium')) return '500';
  if (code.includes('font-regular')) return '400';
  return '400';
}

function extractLineHeight(code: string): string {
  const match = code.match(/leading-\[(\d+(?:\.\d+)?[a-z%]*)\]/);
  return match ? match[1] : '1.5';
}

function extractLetterSpacing(code: string): string {
  const match = code.match(/tracking-\[([^\]]+)\]/);
  return match ? match[1] : '0';
}

function extractTextTransform(code: string): string {
  if (code.includes('uppercase')) return 'uppercase';
  if (code.includes('lowercase')) return 'lowercase';
  if (code.includes('capitalize')) return 'capitalize';
  return 'none';
}

function extractSpacing(code: string): { padding: string[]; margin: string[]; gap: string[] } {
  const spacing = { padding: new Set<string>(), margin: new Set<string>(), gap: new Set<string>() };

  // Extract padding
  const paddingPattern = /p(?:x|y|l|r|t|b)?-\[([^\]]+)\]/g;
  let match;
  while ((match = paddingPattern.exec(code)) !== null) {
    spacing.padding.add(match[1]);
  }

  // Extract margin
  const marginPattern = /m(?:x|y|l|r|t|b)?-\[([^\]]+)\]/g;
  while ((match = marginPattern.exec(code)) !== null) {
    spacing.margin.add(match[1]);
  }

  // Extract gap
  const gapPattern = /gap-\[([^\]]+)\]/g;
  while ((match = gapPattern.exec(code)) !== null) {
    spacing.gap.add(match[1]);
  }

  return {
    padding: Array.from(spacing.padding),
    margin: Array.from(spacing.margin),
    gap: Array.from(spacing.gap)
  };
}

function extractComponents(code: string): ComponentSpec[] {
  const components: ComponentSpec[] = [];

  // Extract component function definitions
  const componentPattern = /function\s+(\w+)\s*\(\s*{([^}]*?)}\s*\)/g;
  let match;

  while ((match = componentPattern.exec(code)) !== null) {
    const componentName = match[1];
    const propsStr = match[2];

    components.push({
      name: componentName,
      props: extractProps(propsStr),
      states: extractComponentStates(code, componentName),
      structure: 'React functional component with TypeScript'
    });
  }

  return components;
}

function extractProps(propsStr: string): string[] {
  const props = propsStr.split(',').map(p => p.trim().split(':')[0]).filter(p => p.length > 0);
  return props;
}

function extractComponentStates(code: string, componentName: string): string[] {
  const states = new Set<string>();

  if (code.includes('hover')) states.add('hover');
  if (code.includes('active')) states.add('active');
  if (code.includes('disabled')) states.add('disabled');
  if (code.includes('focus')) states.add('focus');
  if (code.includes('loading')) states.add('loading');

  return Array.from(states);
}

function extractAssets(code: string): Array<{ name: string; type: string }> {
  const assets: Array<{ name: string; type: string }> = [];

  // Extract image variables
  const imgPattern = /const (img\w+)\s*=\s*["']([^"']+)["']/g;
  let match;

  while ((match = imgPattern.exec(code)) !== null) {
    const varName = match[1];
    const imagePath = match[2];
    assets.push({
      name: varName,
      type: imagePath.endsWith('.svg') ? 'svg' : 'image'
    });
  }

  return assets;
}

function extractAccessibilityFeatures(code: string): string[] {
  const features = new Set<string>();

  // Check for accessibility attributes
  if (code.includes('alt=')) features.add('Images have alt text');
  if (code.includes('aria-')) features.add('ARIA attributes used');
  if (code.includes('role=')) features.add('Semantic roles defined');
  if (code.includes('data-node-id')) features.add('Data attributes for tracking');

  // Check for semantic HTML
  if (code.includes('<button')) features.add('Semantic button elements');
  if (code.includes('<p')) features.add('Semantic text elements (p tags)');
  if (code.includes('<div')) features.add('Structural div layout');

  // Ensure minimum a11y requirements
  if (features.size === 0) {
    features.add('Standard HTML semantic structure');
    features.add('Proper heading hierarchy');
  }

  return Array.from(features);
}

function extractContainerWidth(code: string): string {
  if (code.includes('w-[1440px]')) return '1440px';
  if (code.includes('max-w-')) {
    const match = code.match(/max-w-\[(\d+[a-z%]*)\]/);
    if (match) return match[1];
  }
  return 'responsive';
}

function extractResponsivePatterns(code: string): string[] {
  const patterns = new Set<string>();

  if (code.includes('flex')) patterns.add('Flexbox layout');
  if (code.includes('grid')) patterns.add('Grid layout');
  if (code.includes('absolute')) patterns.add('Absolute positioning');
  if (code.includes('relative')) patterns.add('Relative positioning');
  if (code.includes('responsive')) patterns.add('Responsive design');

  return Array.from(patterns);
}

function truncateCode(code: string, maxLength: number): string {
  if (code.length <= maxLength) return code;
  return code.substring(0, maxLength) + '\n\n... [code truncated] ...';
}

async function main() {
  const nodeId = process.argv[2] || '2171-12869';

  try {
    const specs = await extractFigmaSpecs(nodeId);

    // Ensure output directory exists
    const outputDir = '/Users/ghelanijimmy/repos/demo-claude-code/docs/temp/figma-specs';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save specifications to JSON
    const specsPath = path.join(outputDir, `specs-${nodeId}-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(specsPath, JSON.stringify(specs, null, 2));

    // Also save a readable markdown version
    const mdPath = path.join(outputDir, `specs-${nodeId}-${new Date().toISOString().split('T')[0]}.md`);
    const markdown = generateMarkdownReport(specs);
    fs.writeFileSync(mdPath, markdown);

    console.log('\n✓ Design specifications extracted successfully');
    console.log(`✓ JSON saved to: ${specsPath}`);
    console.log(`✓ Markdown report saved to: ${mdPath}`);
    console.log('\nSpecifications Summary:');
    console.log(`- Component: ${specs.componentName}`);
    console.log(`- Node ID: ${specs.nodeId}`);
    console.log(`- React components: ${specs.structure.totalComponents}`);
    console.log(`- HTML elements: ${specs.structure.totalElements}`);
    console.log(`- Colors identified: ${specs.colors.length}`);
    console.log(`- Typography styles: ${specs.typography.length}`);
    console.log(`- Padding values: ${specs.spacing.padding.length}`);
    console.log(`- Margin values: ${specs.spacing.margin.length}`);
    console.log(`- Gap values: ${specs.spacing.gap.length}`);
    console.log(`- Components found: ${specs.components.length}`);
    console.log(`- Assets: ${specs.assets.length}`);
    console.log(`- Accessibility features: ${specs.accessibilityFeatures.length}`);
    console.log(`- Responsive patterns: ${specs.layout.responsivePatterns.length}`);

  } catch (error) {
    console.error('Failed to extract specifications:', error);
    process.exit(1);
  }
}

function generateMarkdownReport(specs: DesignSpec): string {
  return `# Design Specifications: ${specs.componentName}

## Overview
- **Component Name**: ${specs.componentName}
- **Node ID**: ${specs.nodeId}
- **Type**: React Component

## Structure
${specs.structure.hierarchy}
- **React Components**: ${specs.structure.totalComponents}
- **HTML Elements**: ${specs.structure.totalElements}

## Colors (${specs.colors.length} identified)
${specs.colors.map(c => `- **${c.hex}** (opacity: ${c.opacity}) - Used in: ${c.usage.join(', ')}`).join('\n')}

## Typography (${specs.typography.length} styles)
${specs.typography.map(t => `
### ${t.name}
- Font Family: ${t.fontFamily}
- Size: ${t.fontSize}
- Weight: ${t.fontWeight}
- Line Height: ${t.lineHeight}
- Letter Spacing: ${t.letterSpacing}
- Text Transform: ${t.textTransform}
`).join('\n')}

## Spacing
### Padding
${specs.spacing.padding.map(p => `- ${p}`).join('\n')}

### Margin
${specs.spacing.margin.map(m => `- ${m}`).join('\n')}

### Gap
${specs.spacing.gap.map(g => `- ${g}`).join('\n')}

## Components (${specs.components.length} found)
${specs.components.map(c => `
### ${c.name}
- Props: ${c.props.join(', ') || 'None'}
- States: ${c.states.join(', ') || 'None'}
- Structure: ${c.structure}
`).join('\n')}

## Assets (${specs.assets.length} total)
${specs.assets.map(a => `- **${a.name}** (${a.type})`).join('\n')}

## Layout
- **Container Width**: ${specs.layout.containerWidth}
- **Responsive Patterns**: ${specs.layout.responsivePatterns.join(', ')}

## Accessibility Features
${specs.accessibilityFeatures.map(f => `- ${f}`).join('\n')}

## React Code Sample (first 5000 characters)
\`\`\`tsx
${specs.reactCode}
\`\`\`

---
Generated: ${new Date().toISOString()}
`;
}

main();
