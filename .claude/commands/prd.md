---
description: Create a PRD (Product Requirements Document)
---

# Create Product Requirements Document

## Step 1: Create PRD
Use the Task tool with subagent_type='prd-writer' to create a comprehensive Product Requirements Document based on the following requirements:

{{prompt}}

**Wait for PRD completion.**

## Step 2: Analyze PRD Output & Recommend Next Steps
After the PRD is created:

1. **Check for Figma URLs** in the PRD or user context
   - If found, recommend: "Use /implement-design <figma-url> to extract design specs and implement"

2. **Check for Linear ticket references**
   - If this came from a Linear ticket, recommend updating it with the PRD

3. **Implementation Planning**
   - If implementation is needed, recommend: "Use Task tool with subagent_type='senior-frontend-engineer' to implement, providing the complete PRD context"
   - Remind: "The senior-frontend-engineer agent will automatically delegate to storybook-expert and react-component-tester"

4. **Suggest Complete Workflow**
   - For future similar tasks, suggest: "Use /implement-linear <ticket-id> for end-to-end workflow from Linear ticket to tested implementation"

## Next Steps Cheat Sheet:
- **Have Figma designs?** → `/implement-design <figma-url>`
- **Have Linear ticket?** → `/implement-linear <ticket-id>`
- **Just need implementation?** → Delegate to `senior-frontend-engineer` with PRD context
- **Need design extraction?** → Delegate to `figma-design-analyzer` first
- **Need testing?** → `senior-frontend-engineer` will auto-delegate to testing agents
