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
- **Instruct**: "MUST capture screenshot to docs/temp/figma-screenshots/. Return design specs as structured summary in your response. Do NOT create markdown files (screenshots are images, not markdown - they MUST be created)."

Example for 2 Figma URLs:
```typescript
// Single message with 2 Task calls - NO FILE CREATION
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze desktop component (node 1413:13771).
           MUST capture screenshot to docs/temp/figma-screenshots/desktop-component-[date].png
           Extract: colors (hex), typography (sizes/weights), layout dimensions, spacing.
           Return structured summary + screenshot path in response. DO NOT create MD files.'
})
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze mobile component (node 1413:17052).
           MUST capture screenshot to docs/temp/figma-screenshots/mobile-component-[date].png
           Extract: colors, typography, dimensions, touch targets (44px).
           Return structured summary + screenshot path in response. DO NOT create MD files.'
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
- **Reusable patterns**: Use storybook-expert agents to review patterns (storybook-expert also gets called from senior-frontend-engineer)

**4B: Single Component Implementation**
If implementing one cohesive component:
- Use Task tool with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include Figma specs from analyzer responses
- **No file references**: Copy actual specifications into prompt, not file paths
- **Testing Auto-Trigger**: The senior-frontend-engineer agent is configured to AUTOMATICALLY launch storybook-expert and react-component-tester agents in parallel after implementation
- **Verify**: After agent completes, confirm testing agents were triggered (you'll see their reports)

**4C: Parallel Component Implementation**
If implementing multiple independent components:

**CRITICAL: Launch ALL senior-frontend-engineer agents in parallel using a SINGLE message with multiple Task calls**

For each independent component:
- Create one Task call with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include relevant Figma specs in the prompt (copy actual text from agent responses)
- **No file references**: Embed specifications directly, not file paths
- **Testing Auto-Trigger**: Each senior-frontend-engineer agent is configured to AUTOMATICALLY launch its own storybook-expert and react-component-tester agents in parallel
- **Verify**: After all complete, confirm all testing agents were triggered (6 total: 3 engineers × 2 testing agents each)

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

**4D: Integrate Components into App (AUTOMATIC & REQUIRED)** ⚠️ NON-NEGOTIABLE

After implementation completes, YOU (the orchestrator) MUST integrate components so they render in the browser:

1. **Read current App.tsx**: Check what's currently rendered
2. **Update App.tsx** to import and mount new component(s):
   ```typescript
   // src/App.tsx
   import { ReferralRewardsHero } from '@/components/sections';
   import './App.css';

   function App() {
     return (
       <main>
         <ReferralRewardsHero />
       </main>
     );
   }

   export default App;
   ```

3. **Multiple Components**: Stack in App.tsx or create a demo page:
   ```typescript
   // Stack approach
   import { HeroSection, Navigation, Footer } from '@/components/sections';

   function App() {
     return (
       <main>
         <Navigation />
         <HeroSection />
         <Footer />
       </main>
     );
   }
   ```

4. **Run type-check**: Verify integration with `npm run type-check`

5. **Inform user**: Component is now visible at http://localhost:3000

**Why This Step Exists**: The senior-frontend-engineer agent creates the component, but YOU (orchestrator) must integrate it into App.tsx so users can immediately see their work in the browser.

## Step 5: Verification (After Implementation)
After implementation is complete:

**5A: Run Unit Tests & Type Checking**
1. Run type checking: `npm run type-check`
2. Run all tests: `npm run test:run`
3. Fix any failures before proceeding

**5B: Visual & E2E Testing (RECOMMENDED when Figma designs were analyzed)**

Since Figma designs were provided, **STRONGLY RECOMMEND** using playwright-dev-tester to verify implementation matches design:

1. **Check and start dev server** (if not already running):
   ```bash
   # Check if dev server is already running
   if lsof -ti:3000 > /dev/null; then
     echo "✓ Dev server already running on port 3000"
   else
     echo "Starting dev server in background..."
     npm run dev  # Use run_in_background: true
   fi
   ```

2. **Launch playwright-dev-tester** with Task tool:
   ```typescript
   Task({
     subagent_type: 'playwright-dev-tester',
     model: 'haiku',
     prompt: 'Test implementation at http://localhost:3000

              Visual Verification (PRIMARY GOAL):
              - Compare live implementation against Figma screenshots in docs/temp/figma-screenshots/
              - Take screenshots of live implementation and save to docs/temp/playwright-screenshots/
              - Verify: colors, typography, spacing, layout match Figma design
              - Check responsive behavior (mobile/tablet/desktop)

              Functional Testing:
              - [Specify critical user interactions to test based on component type]
              - [e.g., "Click buttons, fill forms, test navigation"]

              Return results in response with screenshot paths for comparison.'
   })
   ```

**When to SKIP Playwright** (use unit tests only):
- Simple stateless components with no user interactions
- Backend-only changes
- Configuration or tooling updates

## Step 5.5: Cleanup (Remove Temporary Documentation)
**CRITICAL**: Clean up any markdown/documentation files that agents may have accidentally created:

```bash
# Remove ticket-specific design spec files (but keep screenshots!)
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md 2>/dev/null || true

# Remove any JSON artifacts from Figma analysis (but NOT screenshots)
rm -f docs/project/*.json 2>/dev/null || true

# Remove empty directories
rmdir docs/project/design-specs 2>/dev/null || true

# Clean up one-off MCP test files (keep only reusable scripts)
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

**IMPORTANT**: Do NOT delete screenshots from `docs/temp/figma-screenshots/` or `docs/temp/playwright-screenshots/` - these are permanent reference documentation.

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
   - Each senior-frontend-engineer AUTOMATICALLY triggers its own storybook-expert and react-component-tester in parallel
   - Verify all testing agents were triggered after implementation completes
   - If Figma designs exist → STRONGLY RECOMMEND playwright-dev-tester for visual verification
     - Compare against Figma screenshots in docs/temp/figma-screenshots/
     - Save new screenshots to docs/temp/playwright-screenshots/

5. **Background Processes**:
   - **ALWAYS check if server is running first** with `lsof -ti:3000`
   - Use `run_in_background: true` for dev server only if port is free
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
