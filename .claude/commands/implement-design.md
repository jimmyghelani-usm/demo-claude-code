---
description: Extract Figma design specifications and implement with full testing and documentation
---

# Figma Design → Implementation Workflow

You will orchestrate a complete design implementation workflow from Figma URLs. Follow these steps:

## Step 1: Design Analysis (Parallel if multiple URLs)
**Extract node IDs from Figma URLs:**
- Format: `https://figma.com/file/ABC?node-id=XXXX-XXXXX` → node ID is `XXXX:XXXXX`
- If multiple nodes, launch analyses in parallel

**Launch figma-design-analyzer agents:**
```
Use Task tool with subagent_type='figma-design-analyzer' for each node.
```

**Provide to each agent:**
- Node ID in correct format (colon-separated)
- Framework: 'react'
- Language: 'typescript'

**Launch all analyses in parallel using a single message with multiple Task calls.**

**Wait for all design analyses to complete before proceeding.**

## Step 2: Implementation Planning
Review all extracted design specifications and:
1. Identify components to build
2. Determine if they're new components or updates to existing ones
3. Check for reusable patterns across designs
4. Plan parallel implementation if multiple independent components

## Step 3: Implementation (Sequential or Parallel)

### For Single Component:
Use Task tool with subagent_type='senior-frontend-engineer' and provide:
- Complete Figma design specifications
- Component requirements and context
- **Critical instruction**: "After implementation, you MUST delegate to storybook-expert and react-component-tester agents in parallel. Do not wait for them to complete; continue with your workflow."

### For Multiple Independent Components:
**Launch in parallel using a single message with multiple Task calls:**
- One senior-frontend-engineer agent per component
- Each receives its specific design specs and requirements
- Each must delegate to storybook-expert and react-component-tester

**The senior-frontend-engineer agents will implement and automatically trigger testing agents.**

## Step 4: Integration & Verification
After all implementations complete:
1. Run type checking: `npm run type-check`
2. Run all tests: `npm run test:run`
3. Verify Storybook stories: `npm run storybook`
4. If interactive testing needed, use Task tool with subagent_type='playwright-dev-tester'

## Step 5: Documentation
Create or update documentation:
- Component usage examples
- Design system updates if applicable
- Any breaking changes or migration notes

## Critical Execution Rules:
1. **Parallel Design Analysis**: All Figma nodes can be analyzed concurrently
2. **Parallel Implementation**: Independent components can be built concurrently
3. **Sequential Testing**: Wait for implementation before running test verification
4. **Agent Delegation**: senior-frontend-engineer MUST delegate to storybook-expert and react-component-tester
5. **No Manual Implementation**: You should delegate to agents, not implement code yourself

## Example Executions:

**Single component:**
```
User: /implement-design https://figma.com/file/ABC?node-id=2171-13039
```

**Multiple components:**
```
User: /implement-design https://figma.com/file/ABC?node-id=2171-13039 https://figma.com/file/ABC?node-id=2171-14000
```

## Figma URL Context:
- {{prompt}} will contain one or more Figma URLs
- Extract all node IDs before starting
- Ensure Figma Desktop app is running with Dev Mode enabled
- The design file must be open in Figma Desktop
