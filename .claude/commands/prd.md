---
description: Create a standalone PRD with optional implementation (for planning/review or full execution)
---

# Create Product Requirements Document with Optional Implementation

**Use this when**: You need a PRD for planning, stakeholder review, or you want PRD → implementation flow without Linear.

**For complete Linear workflow**: Use `/implement-linear <ticket-id>` which fetches ticket + PRD + implements + tests.

**For design-first workflow**: Use `/implement-design <figma-url>` if you already have Figma designs.

---

## Step 1: Create PRD

**⚡ PERFORMANCE OPTIMIZATION**: PRD agents return content in response, not files.

Use the Task tool with subagent_type='prd-writer' to create a comprehensive Product Requirements Document:

```typescript
Task({
  subagent_type: 'prd-writer',
  model: 'haiku',  // Fast and cost-effective
  prompt: 'Create CONCISE PRD with: requirements (P0/P1/P2), success criteria, technical notes.
           Skip: personas, use cases, timelines, appendices unless explicitly needed.
           Return PRD content in your response. DO NOT create markdown files.

           Requirements: {{prompt}}'
})
```

**Wait for PRD completion and collect response.**

## Step 2: Analyze PRD & Ask User for Next Steps

After the PRD is created, present options to the user:

**Ask the user using AskUserQuestion tool:**

```typescript
AskUserQuestion({
  questions: [{
    question: "How would you like to proceed with this PRD?",
    header: "Next Steps",
    multiSelect: false,
    options: [
      {
        label: "Just the PRD (done)",
        description: "Stop here - PRD is ready for review/documentation"
      },
      {
        label: "Implement from Figma",
        description: "Extract Figma designs and implement components with tests"
      },
      {
        label: "Implement directly",
        description: "Implement based on PRD without Figma (use if no designs)"
      },
      {
        label: "Update Linear ticket",
        description: "Add PRD to Linear ticket as comment"
      }
    ]
  }]
})
```

## Step 3: Execute Based on User Choice

### Option A: "Just the PRD (done)"
- Summarize PRD key points for user
- Provide PRD content from prd-writer response
- End workflow

### Option B: "Implement from Figma"
**If user chooses this and provides Figma URLs:**

1. **Extract Node IDs** from Figma URLs
2. **Launch figma-design-analyzer agents** in parallel (one per URL)
   - Use SINGLE message with multiple Task calls
   - Instruct: "MUST capture screenshot to docs/temp/figma-screenshots/"
   - Each returns specs in response (no files)
3. **Collect design specs** from all analyzer responses
4. **Launch senior-frontend-engineer agents** in parallel
   - Pass PRD requirements + Figma specs directly in prompts
   - Each agent AUTOMATICALLY triggers storybook-expert and react-component-tester
   - Verify all testing agents were triggered after completion
5. **Run verification**: `npm run type-check && npm run test:run`
6. **Visual & E2E testing (RECOMMENDED)**:
   - **Check and start dev server first**:
     ```bash
     if lsof -ti:3000 > /dev/null; then
       echo "✓ Dev server already running on port 3000"
     else
       npm run dev  # Use run_in_background: true
     fi
     ```
   - Launch playwright-dev-tester
   - Compare live implementation against Figma screenshots in docs/temp/figma-screenshots/
   - Take new screenshots to docs/temp/playwright-screenshots/
   - Verify visual accuracy and test critical user flows
7. **Run cleanup**: Remove any temporary markdown files created (keep screenshots)

### Option C: "Implement directly"
**If user chooses to implement without Figma:**

1. **Launch senior-frontend-engineer agent(s)**
   - Pass complete PRD requirements in prompt
   - If multiple independent components, launch in parallel (SINGLE message)
   - Each agent AUTOMATICALLY triggers storybook-expert and react-component-tester
   - Verify all testing agents were triggered after completion
2. **Run verification**: `npm run type-check && npm run test:run`
3. **E2E testing (conditional)**:
   - **If testing needed, check dev server first**:
     ```bash
     if lsof -ti:3000 > /dev/null; then
       echo "✓ Dev server already running"
     else
       npm run dev  # Use run_in_background: true if needed
     fi
     ```
   - If complex user flows (authentication, checkout, multi-step wizards): Launch playwright-dev-tester
   - If simple components: Skip (unit tests sufficient)
4. **Run cleanup**: Remove any temporary markdown files created

### Option D: "Update Linear ticket"
**If user chooses to update Linear ticket:**

1. **Ask for Linear ticket ID** using AskUserQuestion
2. **Create temporary update script**:
```bash
npx tsx -e "
import { config } from 'dotenv';
import { linear } from './mcp/index.js';
config();
linear.updateIssue({
  id: '<ticket-id>',
  comment: '[PRD content from prd-writer response]'
}).then(() => console.log('✓ Ticket updated')).catch(err => console.error('Error:', err));
"
```
3. **Execute and delete script** after successful update

## Step 4: Cleanup (If Implementation Occurred)
If Steps 3B or 3C were executed, run cleanup:

```bash
# Remove ticket-specific PRD files (if any accidentally created)
rm -f docs/project/prd/*.md docs/project/*-prd*.md 2>/dev/null || true

# Remove ticket-specific design spec files (but keep screenshots!)
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md 2>/dev/null || true

# Remove any JSON artifacts (but NOT screenshots)
rm -f docs/project/*.json 2>/dev/null || true

# Remove empty directories
rmdir docs/project/prd docs/project/design-specs 2>/dev/null || true

# Clean up one-off MCP test files
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/update-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

**IMPORTANT**: Do NOT delete screenshots from `docs/temp/figma-screenshots/` or `docs/temp/playwright-screenshots/` - these are permanent reference documentation.

## Critical Execution Rules:

**🔀 PARALLELIZATION FIRST**: When implementation is chosen, maximize parallel execution.

1. **PRD Creation**: Use haiku model for speed (sonnet for complex features)
2. **User Choice**: ALWAYS ask user what to do with PRD (don't assume)
3. **Figma Analysis**: Launch all figma-design-analyzer agents in parallel (SINGLE message)
   - Instruct agents to capture screenshots to docs/temp/figma-screenshots/
4. **Implementation**: Launch all senior-frontend-engineer agents in parallel if multiple components
5. **Testing Auto-Trigger**: Each engineer AUTOMATICALLY triggers storybook-expert and react-component-tester
   - Verify all testing agents were triggered after implementation completes
6. **Visual Testing**: If Figma designs exist, STRONGLY RECOMMEND playwright-dev-tester
   - Compare live implementation against Figma screenshots
   - Save new screenshots to docs/temp/playwright-screenshots/
7. **No Markdown Files**: All agents return content in responses (screenshots are images, not markdown)
8. **Background Processes**: ALWAYS check if server running first (`lsof -ti:3000`), then use `run_in_background: true` only if needed
9. **Cleanup Always**: Run cleanup after implementation to remove temporary markdown files (keep screenshots)

## Example Execution (PRD Only):
```
User: /prd Create a user authentication system with OAuth support
⏺ [Launches prd-writer agent with haiku model]
  prd-writer: [Returns PRD content in response: Requirements (P0/P1/P2), success criteria, technical notes]
⏺ [Asks user: How would you like to proceed?]
  User: [Selects "Just the PRD (done)"]
  Assistant: [Provides PRD summary and ends workflow]
Time: ~30 seconds total
```

## Example Execution (PRD → Figma → Implementation):
```
User: /prd Implement dashboard with these Figma designs: [2 URLs]
⏺ [Launches prd-writer agent with haiku model]
  prd-writer: [Returns PRD content in response]
⏺ [Asks user: How would you like to proceed?]
  User: [Selects "Implement from Figma"]

  Assistant: [PARALLEL LAUNCH - 2 figma-design-analyzer agents]:
    • Analyzer for node 1413:14114 - returns specs in response
    • Analyzer for node 1413:15016 - returns specs in response
  [Waits for both responses]

  Assistant: [PARALLEL LAUNCH - 2 senior-frontend-engineer agents]:
    • Engineer for Dashboard (PRD + Figma specs embedded)
    • Engineer for Sidebar (PRD + Figma specs embedded)
  [Each triggers storybook-expert and react-component-tester = 6 agents total]

  Assistant: [Runs type-check and tests]
  Assistant: [Runs cleanup]

Total agents: 1 PRD + 2 Figma + 2 Engineers + 4 Testing = 9 agents
Time: ~2-3 minutes total
```

## Example Execution (PRD → Direct Implementation):
```
User: /prd Add dark mode toggle to application settings
⏺ [Launches prd-writer agent with haiku model]
  prd-writer: [Returns PRD content in response]
⏺ [Asks user: How would you like to proceed?]
  User: [Selects "Implement directly"]

  Assistant: [Launches senior-frontend-engineer agent]:
    • Implements DarkModeToggle component (PRD requirements embedded)
    • Auto-triggers storybook-expert and react-component-tester

  Assistant: [Runs type-check and tests]
  Assistant: [Optionally launches playwright-dev-tester for E2E]
  Assistant: [Runs cleanup]

Total agents: 1 PRD + 1 Engineer + 2 Testing + (1 E2E optional) = 4-5 agents
Time: ~1-2 minutes total
```

---

**NOW BEGIN THE WORKFLOW**:
1. Create PRD based on requirements: {{prompt}}
2. Ask user how to proceed
3. Execute chosen path
4. Run cleanup if implementation occurred

ARGUMENTS: {{prompt}}
