---
description: Complete workflow - Linear ticket → PRD → Figma → Implementation → Testing (use this for end-to-end ticket completion)
---

# Complete Linear → Implementation Workflow

**Use this when**: You want complete end-to-end ticket implementation (PRD + code + tests).

**For PRD only**: Use `/prd <requirements>` if you just need planning documentation.

---

You will orchestrate a complete feature implementation workflow from a Linear ticket. Follow these steps in order:

## Step 1: Fetch Linear Ticket
```typescript
import { linear } from './mcp';
const issue = await linear.getIssue({ id: '{{prompt}}' });
```

Extract:
- Title, description, labels, assignee
- Any Figma URLs in the description
- Current status and team context

## Step 2: Create PRD (Sequential - must complete first)
Use Task tool with subagent_type='prd-writer' and provide the full Linear ticket context.

**Wait for PRD completion before proceeding.**

## Step 3: Parallel Execution - Design Analysis & Planning
If Figma URLs were found in the Linear ticket:

**Launch in parallel using a single message with multiple Task calls:**
- Task tool with subagent_type='figma-design-analyzer' for each Figma URL/node
- Provide node IDs extracted from Figma URLs (format: `node-id=XXXX-XXXXX` becomes `XXXX:XXXXX`)

**Wait for all design analyses to complete before proceeding.**

## Step 4: Implementation (Sequential)
Use Task tool with subagent_type='senior-frontend-engineer' and provide:
- Complete PRD content
- All Figma design specifications (if available)
- Linear ticket context
- Explicit instruction: "After implementation, you MUST delegate to storybook-expert and react-component-tester agents in parallel"

**The senior-frontend-engineer agent will implement and automatically trigger testing agents.**

## Step 5: Verification (After Implementation)
After implementation is complete:
1. Run type checking: `npm run type-check`
2. Run all tests: `npm run test:run`
3. If interactive testing needed, use Task tool with subagent_type='playwright-dev-tester'

## Step 6: Update Linear Ticket
```typescript
await linear.updateIssue({
  id: '{{prompt}}',
  state: 'Done',
  comment: 'Implementation complete with PRD, tests, and Storybook stories. [Details]'
});
```

## Critical Execution Rules:
1. **Sequential Steps**: Steps 1, 2, 4, 5, 6 must run in order
2. **Parallel Execution**: Step 3 (Figma analyses) can run in parallel - use single message with multiple Task calls
3. **Agent Delegation**: senior-frontend-engineer MUST delegate to storybook-expert and react-component-tester
4. **No Manual Implementation**: You should delegate to agents, not implement code yourself
5. **Verify Testing**: Ensure tests are created and passing before marking complete

## Example Execution:
```
User: /implement-linear FE-424