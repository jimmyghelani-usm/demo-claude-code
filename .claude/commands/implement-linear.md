---
description: Complete workflow - Linear ticket → PRD → Figma → Implementation → Testing (use this for end-to-end ticket completion)
---

# Complete Linear → Implementation Workflow

**Use this when**: You want complete end-to-end ticket implementation (PRD + code + tests).

**For PRD only**: Use `/prd <requirements>` if you just need planning documentation.

---

You will orchestrate a complete feature implementation workflow from a Linear ticket. Follow these steps in order:

## Step 1: Fetch Linear Ticket
Use the helper script to fetch the ticket:
```bash
npx tsx mcp/tests/get-issue.ts {{prompt}}
```

Extract from the JSON output:
- Title, description, labels, assignee
- Any Figma URLs in the description
- Current status and team context

## Step 2: PRD Creation (Optional - Only if User Requests)

**⚡ PERFORMANCE OPTIMIZATION**: Skip PRD by default to save 1-2 minutes.

**Skip PRD if**:
- Ticket description is clear and actionable
- No stakeholder review needed before coding
- Simple feature/bug fix with obvious requirements

**Create PRD only if**:
- User explicitly requests: "/implement-linear FE-123 --with-prd"
- Ticket is ambiguous or requires clarification
- Formal documentation needed for review

**If PRD needed**:
```typescript
Task({
  subagent_type: 'prd-writer',
  model: 'haiku',  // Fast!
  prompt: 'Create CONCISE PRD with: requirements (P0/P1/P2), success criteria, technical notes.
           Skip: personas, use cases, timelines, appendices.
           Return inline summary, save minimal file.'
})
```

## Step 3: Design Analysis (If Figma URLs Found)

**⚡ PERFORMANCE OPTIMIZATION**: Agents return design specs as structured context, not files.

**CRITICAL: Launch ALL Figma analyzers in parallel using a SINGLE message with multiple Task calls**

For each unique Figma URL/node:
- Extract node ID from URL (format: `node-id=XXXX-XXXXX` → `XXXX:XXXXX`)
- Create one Task call with subagent_type='figma-design-analyzer'
- **Instruct**: "Return design specs as structured summary in your response. Do NOT create markdown files."

Example for 2 Figma URLs:
```typescript
// Single message with 2 Task calls - NO FILE CREATION
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze desktop hero (node 1413:13771).
           Extract: colors (hex), typography (sizes/weights), layout dimensions, spacing.
           Return structured summary in response. DO NOT create MD files.'
})
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze mobile hero (node 1413:17052).
           Extract: colors, typography, dimensions, touch targets (44px).
           Return structured summary in response. DO NOT create MD files.'
})
```

**Wait for ALL design analyses, collect responses, pass to implementation.**

## Step 4: Implementation (Parallel if Multiple Components)

**4A: Analyze Implementation Scope**
Review PRD and Figma specs to determine if work can be parallelized:
- **Single component/feature**: Use one senior-frontend-engineer agent
- **Multiple independent components**: Use multiple senior-frontend-engineer agents in parallel

**4B: Single Component Implementation**
If implementing one cohesive feature:
- Use Task tool with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include PRD content from prd-writer response, Figma specs from analyzer responses, Linear ticket details
- **No file references**: Copy actual specifications into prompt, not file paths
- Instruction: "After implementation, delegate to storybook-expert and react-component-tester in parallel"

**4C: Parallel Component Implementation**
If implementing multiple independent components (e.g., HeroSection + Navigation + Footer):

**CRITICAL: Launch ALL senior-frontend-engineer agents in parallel using a SINGLE message with multiple Task calls**

For each independent component:
- Create one Task call with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include relevant PRD requirements and Figma specs in the prompt (copy actual text from agent responses)
- **No file references**: Embed specifications directly, not file paths
- Each agent will auto-trigger its own storybook-expert and react-component-tester

Example for 3 components:
```typescript
// Single message with 3 Task calls - Pass actual specs in prompts
Task({
  subagent_type: 'senior-frontend-engineer',
  prompt: 'Implement HeroSection. Specs: [Copy PRD requirements + Figma colors/typography/layout here]'
})
Task({
  subagent_type: 'senior-frontend-engineer',
  prompt: 'Implement Navigation. Specs: [Copy PRD requirements + Figma specs here]'
})
Task({
  subagent_type: 'senior-frontend-engineer',
  prompt: 'Implement Footer. Specs: [Copy PRD requirements + Figma specs here]'
})
```

**Wait for ALL implementations and their testing agents to complete before proceeding.**

## Step 5: Verification (After Implementation)
After implementation is complete:
1. Run type checking: `npm run type-check`
2. Run all tests: `npm run test:run`
3. **If dev server needed for E2E testing**: Start in background only if not already running: `npm run dev` (run_in_background: true)
4. **If interactive E2E testing needed**: Use Task tool with subagent_type='playwright-dev-tester'
   - Provide URL (e.g., http://localhost:3000)
   - Specify critical user flows to test
   - Agent will return test results in response (no MD files)
   - Focus on integration testing, not unit tests (already covered)

## Step 5.5: Cleanup (Remove Temporary Documentation)
**CRITICAL**: Clean up any markdown/documentation files that agents may have accidentally created:

```bash
# Remove ticket-specific PRD files
rm -f docs/project/prd/*.md docs/project/*-prd*.md 2>/dev/null || true

# Remove ticket-specific design spec files
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md 2>/dev/null || true

# Remove ticket-specific implementation summaries
rm -f docs/project/*-implementation-*.md docs/project/*-summary*.md docs/project/*-analysis*.md 2>/dev/null || true

# Remove any JSON/PNG artifacts from Figma analysis
rm -f docs/project/*.json docs/project/*.png 2>/dev/null || true

# Remove empty directories
rmdir docs/project/prd docs/project/design-specs 2>/dev/null || true

# Clean up one-off MCP test files (keep only reusable scripts)
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/update-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

**Why**: Agents should return specs/PRDs in their responses, not create files. This cleanup ensures:
- No context pollution from stale documentation
- Specs are passed directly between agents (98.7% context reduction)
- Only essential documentation (general guides, MCP setup, agent workflows) remains
- Only reusable MCP execution scripts remain in `mcp/tests/`

**Keep**: Do NOT delete:
- General documentation: `docs/mcp/`, `docs/agents/`, `docs/project/LANDING_PAGE_README.md`, `STORYBOOK_GUIDE.md`
- Reusable MCP scripts: `mcp/tests/get-issue.ts`, `mcp/tests/README.md`

## Step 6: Update Linear Ticket
Create a temporary script to update the ticket:
```bash
# Create update script with the completion details
npx tsx -e "
import { config } from 'dotenv';
import { linear } from './mcp/index.js';
config();
linear.updateIssue({
  id: '{{prompt}}',
  state: 'Done',
  comment: 'Implementation complete with tests and Storybook stories. [Add details]'
}).then(() => console.log('✓ Ticket updated')).catch(err => console.error('Error:', err));
"
```

**Note**: If inline execution fails, create a temporary script file in `mcp/tests/` and run it with `npx tsx`.

## Critical Execution Rules:

**🔀 PARALLELIZATION FIRST**: Always maximize parallel execution. Whenever you have multiple independent tasks, launch ALL agents in a SINGLE message with multiple Task calls.

1. **Sequential Steps**: Steps 1, 2, 5, 6 must run in order (fetch → PRD → verify → update)

2. **Parallel Design Analysis (Step 3)**:
   - Multiple Figma URLs → Launch ALL figma-design-analyzer agents in parallel (SINGLE message)
   - Each analyzer can work independently on different designs

3. **Parallel Implementation (Step 4)**:
   - Multiple independent components → Launch ALL senior-frontend-engineer agents in parallel (SINGLE message)
   - Multiple pages/features → Launch multiple engineers in parallel
   - Each engineer can work on separate files/components simultaneously

4. **Parallel Testing**:
   - Each senior-frontend-engineer auto-triggers its own storybook-expert and react-component-tester in parallel
   - If additional testing needed (E2E, visual regression) → Launch playwright-dev-tester agents in parallel

5. **General Parallelization Rule**:
   - ANY time you identify multiple independent tasks (analysis, implementation, testing, documentation)
   - Launch ALL necessary agents in SINGLE message with multiple Task calls
   - Examples: multiple Figma nodes, multiple components, multiple test suites, multiple documentation files

6. **No Manual Implementation**: You orchestrate agents - do NOT implement code yourself

7. **Wait for Completion**: Wait for all parallel agents to complete before proceeding to next sequential step

8. **Verify Testing**: Ensure all tests pass before marking ticket complete

## Example Execution (Single Component - Optimized):
```
User: /implement-linear FE-424
⏺ [Fetches ticket, sees clear requirements and 1 Figma URL]
  Assistant: [Skips PRD - requirements clear from ticket]
  Assistant: [Uses figma-design-analyzer agent, waits for specs in response]
  Assistant: [Passes Figma specs directly to senior-frontend-engineer agent]
  Assistant: [senior-frontend-engineer auto-triggers storybook-expert and react-component-tester]
  Assistant: [Runs type-check and tests]
  Assistant: [Updates Linear ticket to Done]
Time saved: 1-2 minutes by skipping PRD, 30-60 seconds by eliminating file I/O
```

## Example Execution (Multiple Components - Optimized):
```
User: /implement-linear FE-425
⏺ [Fetches ticket, sees 3 Figma URLs for Hero, Nav, Footer]
  Assistant: [Skips PRD - requirements clear from ticket]
  Assistant: [Launches 3 figma-design-analyzer agents in parallel (SINGLE message), waits]
  Assistant: [Receives specs from all 3 analyzers in their responses]
  Assistant: [Launches 3 senior-frontend-engineer agents in parallel with specs embedded in prompts]
  Assistant: [Each engineer auto-triggers their own storybook-expert and react-component-tester = 9 agents total]
  Assistant: [Runs type-check and tests]
  Assistant: [Updates Linear ticket to Done]
Time saved: 1-2 minutes by skipping PRD, 1-2 minutes by eliminating file I/O
```

## Example Execution (Maximum Parallelization - Optimized):
```
User: /implement-linear FE-426
⏺ [Fetches ticket: "Build complete landing page with 5 sections"]
⏺ [Sees 5 Figma URLs: Hero, Features, Pricing, Testimonials, CTA]

  Assistant: [Skips PRD - requirements clear from ticket description]

  Assistant: [PARALLEL LAUNCH - SINGLE MESSAGE - NO FILE CREATION]:
    • figma-design-analyzer for Hero (node 1234:5678) - returns specs in response
    • figma-design-analyzer for Features (node 2345:6789) - returns specs in response
    • figma-design-analyzer for Pricing (node 3456:7890) - returns specs in response
    • figma-design-analyzer for Testimonials (node 4567:8901) - returns specs in response
    • figma-design-analyzer for CTA (node 5678:9012) - returns specs in response
  [Waits for all 5 responses with embedded specs]

  Assistant: [Determines 5 independent sections from responses]

  Assistant: [PARALLEL LAUNCH - SINGLE MESSAGE - SPECS EMBEDDED IN PROMPTS]:
    • senior-frontend-engineer for HeroSection (specs from analyzer response)
    • senior-frontend-engineer for FeaturesSection (specs from analyzer response)
    • senior-frontend-engineer for PricingSection (specs from analyzer response)
    • senior-frontend-engineer for TestimonialsSection (specs from analyzer response)
    • senior-frontend-engineer for CTASection (specs from analyzer response)
  [Waits for all 5 to complete]

  [Each of 5 engineers auto-triggers 2 agents = 15 agents total in parallel]:
    • 5 × storybook-expert (one per section)
    • 5 × react-component-tester (one per section)

  Assistant: [Runs type-check and tests - all sections]
  Assistant: [If E2E testing needed, launches playwright-dev-tester]
  Assistant: [Updates Linear ticket to Done]

Total agents: 5 Figma + 5 Engineers + 10 Testing = 20 agents (saved 1 PRD agent)
Time saved: 5× faster than sequential + 2-3 minutes from skipping PRD + 1-2 minutes from eliminating file I/O
Total workflow time: ~3-4 minutes instead of 12-15 minutes
```

---

**NOW BEGIN THE WORKFLOW**: Fetch Linear ticket {{prompt}} and execute all steps above in order. Do not wait for additional prompts - start immediately with Step 1