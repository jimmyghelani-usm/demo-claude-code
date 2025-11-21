---
description: Extract Figma designs and implement with testing (use when you have Figma URLs and want implementation)
---

# Figma Design → Implementation Workflow

**Use this when**: You have Figma design URLs and want to extract specs + implement + test.

**For complete Linear workflow**: Use `/implement-linear <ticket-id>` if starting from a Linear ticket.

---

You will orchestrate a complete design implementation workflow from Figma URLs. Follow these steps in order:

## Step 1: Parse Figma URLs
Extract node IDs from all provided Figma URLs:
- Format: `https://figma.com/file/ABC?node-id=XXXX-XXXXX` → node ID is `XXXX:XXXXX`
- Convert hyphens to colons in node IDs
- Count total URLs for parallelization planning

**Provided URLs**: {{prompt}}

## Step 2: Design Analysis (Parallel if Multiple URLs)

**⚡ PERFORMANCE OPTIMIZATION**: Agents return design specs as structured context, not files.

**CRITICAL: Launch ALL Figma analyzers in parallel using a SINGLE message with multiple Task calls**

For each unique Figma URL/node:
- Extract node ID from URL
- Create one Task call with subagent_type='figma-design-analyzer'
- **Instruct**: "Return design specs as structured summary in your response. Do NOT create markdown files."

Example for 2 Figma URLs:
```typescript
// Single message with 2 Task calls - NO FILE CREATION
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze desktop component (node 1413:13771).
           Extract: colors (hex), typography (sizes/weights), layout dimensions, spacing.
           Return structured summary in response. DO NOT create MD files.'
})
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze mobile component (node 1413:17052).
           Extract: colors, typography, dimensions, touch targets (44px).
           Return structured summary in response. DO NOT create MD files.'
})
```

**Wait for ALL design analyses, collect responses, pass to implementation.**

## Step 3: Implementation Planning
Review all extracted design specifications and:
1. Identify components to build (new vs updates to existing)
2. Check for reusable patterns across designs
3. Determine if components are independent (parallel) or dependent (sequential)
4. Plan component integration into existing pages

## Step 4: Implementation (Parallel if Multiple Components)

**4A: Analyze Implementation Scope**
Review Figma specs to determine if work can be parallelized:
- **Single component**: Use one senior-frontend-engineer agent
- **Multiple independent components**: Use multiple senior-frontend-engineer agents in parallel

**4B: Single Component Implementation**
If implementing one cohesive component:
- Use Task tool with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include Figma specs from analyzer responses
- **No file references**: Copy actual specifications into prompt, not file paths
- Instruction: "After implementation, delegate to storybook-expert and react-component-tester in parallel"

**4C: Parallel Component Implementation**
If implementing multiple independent components:

**CRITICAL: Launch ALL senior-frontend-engineer agents in parallel using a SINGLE message with multiple Task calls**

For each independent component:
- Create one Task call with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include relevant Figma specs in the prompt (copy actual text from agent responses)
- **No file references**: Embed specifications directly, not file paths
- Each agent will auto-trigger its own storybook-expert and react-component-tester

Example for 3 components:
```typescript
// Single message with 3 Task calls - Pass actual specs in prompts
Task({
  subagent_type: 'senior-frontend-engineer',
  prompt: 'Implement HeroSection. Specs: [Copy Figma colors/typography/layout here]'
})
Task({
  subagent_type: 'senior-frontend-engineer',
  prompt: 'Implement Navigation. Specs: [Copy Figma specs here]'
})
Task({
  subagent_type: 'senior-frontend-engineer',
  prompt: 'Implement Footer. Specs: [Copy Figma specs here]'
})
```

**Wait for ALL implementations and their testing agents to complete before proceeding.**

## Step 5: Verification (After Implementation)
After implementation is complete:
1. Run type checking: `npm run type-check`
2. Run all tests: `npm run test:run`
3. **If dev server needed**: Start in background: `npm run dev` (run_in_background: true)
4. **If interactive E2E testing needed**: Use Task tool with subagent_type='playwright-dev-tester'
   - Provide URL (e.g., http://localhost:3000)
   - Specify user flows to test
   - Agent will return test results in response (no MD files)

## Step 5.5: Cleanup (Remove Temporary Documentation)
**CRITICAL**: Clean up any markdown/documentation files that agents may have accidentally created:

```bash
# Remove ticket-specific design spec files
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md 2>/dev/null || true

# Remove any JSON/PNG artifacts from Figma analysis
rm -f docs/project/*.json docs/project/*.png 2>/dev/null || true

# Remove empty directories
rmdir docs/project/design-specs 2>/dev/null || true

# Clean up one-off MCP test files (keep only reusable scripts)
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

**Why**: Agents should return specs in their responses, not create files. This cleanup ensures:
- No context pollution from stale documentation
- Specs are passed directly between agents (98.7% context reduction)
- Only essential documentation remains
- Only reusable MCP execution scripts remain in `mcp/tests/`

**Keep**: Do NOT delete:
- General documentation: `docs/mcp/`, `docs/agents/`, `docs/project/LANDING_PAGE_README.md`, `STORYBOOK_GUIDE.md`
- Reusable MCP scripts: `mcp/tests/get-issue.ts`, `mcp/tests/README.md`

## Step 6: Documentation (Optional - Only if User Requests)
**Skip by default** to save time. Only create if explicitly requested:
- Component usage examples
- Design system updates
- Breaking changes or migration notes

## Critical Execution Rules:

**🔀 PARALLELIZATION FIRST**: Always maximize parallel execution. Whenever you have multiple independent tasks, launch ALL agents in a SINGLE message with multiple Task calls.

1. **Sequential Steps**: Steps 1, 2 (within), 3, 4 (within), 5, 5.5, 6 must respect order

2. **Parallel Design Analysis (Step 2)**:
   - Multiple Figma URLs → Launch ALL figma-design-analyzer agents in parallel (SINGLE message)
   - Each analyzer can work independently on different designs

3. **Parallel Implementation (Step 4)**:
   - Multiple independent components → Launch ALL senior-frontend-engineer agents in parallel (SINGLE message)
   - Each engineer can work on separate files/components simultaneously

4. **Parallel Testing**:
   - Each senior-frontend-engineer auto-triggers its own storybook-expert and react-component-tester in parallel
   - If E2E testing needed → Launch playwright-dev-tester after implementation

5. **Background Processes**:
   - Use `run_in_background: true` for dev server if needed for testing
   - Long-running Playwright tests can use background processes

6. **No Manual Implementation**: You orchestrate agents - do NOT implement code yourself

7. **Wait for Completion**: Wait for all parallel agents to complete before proceeding to next sequential step

8. **Verify Testing**: Ensure all tests pass before marking complete

## Example Execution (Single Component - Optimized):
```
User: /implement-design https://figma.com/file/ABC?node-id=1413-14114
⏺ [Extracts node ID: 1413:14114]
  Assistant: [Launches figma-design-analyzer agent, waits for specs in response]
  Assistant: [Passes Figma specs directly to senior-frontend-engineer agent]
  Assistant: [senior-frontend-engineer auto-triggers storybook-expert and react-component-tester]
  Assistant: [Runs type-check and tests]
  Assistant: [If needed, launches playwright-dev-tester with localhost:3000]
  Assistant: [Runs cleanup to remove any accidentally created files]
Time saved: 30-60 seconds by eliminating file I/O
```

## Example Execution (Multiple Components - Optimized):
```
User: /implement-design https://figma.com/file/ABC?node-id=1413-14114 https://figma.com/file/ABC?node-id=1413-15016
⏺ [Extracts 2 node IDs: 1413:14114, 1413:15016]

  Assistant: [PARALLEL LAUNCH - SINGLE MESSAGE - NO FILE CREATION]:
    • figma-design-analyzer for node 1413:14114 - returns specs in response
    • figma-design-analyzer for node 1413:15016 - returns specs in response
  [Waits for both responses with embedded specs]

  Assistant: [Determines 2 independent components from responses]

  Assistant: [PARALLEL LAUNCH - SINGLE MESSAGE - SPECS EMBEDDED IN PROMPTS]:
    • senior-frontend-engineer for Component1 (specs from analyzer response)
    • senior-frontend-engineer for Component2 (specs from analyzer response)
  [Waits for both to complete]

  [Each of 2 engineers auto-triggers 2 agents = 6 agents total in parallel]:
    • 2 × storybook-expert (one per component)
    • 2 × react-component-tester (one per component)

  Assistant: [Runs type-check and tests]
  Assistant: [If E2E testing needed, launches playwright-dev-tester in background]
  Assistant: [Runs cleanup]

Total agents: 2 Figma + 2 Engineers + 4 Testing = 8 agents
Time saved: 2× faster than sequential + 1 minute from eliminating file I/O
```

---

**NOW BEGIN THE WORKFLOW**: Parse Figma URLs from {{prompt}} and execute all steps above in order. Do not wait for additional prompts - start immediately with Step 1.

ARGUMENTS: {{prompt}}
