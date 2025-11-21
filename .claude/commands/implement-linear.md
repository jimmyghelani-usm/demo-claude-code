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
- **Instruct**: "MUST capture screenshot to docs/temp/figma-screenshots/. Return design specs as structured summary in your response. Do NOT create markdown files (screenshots are images, not markdown - they MUST be created)."

Example for 2 Figma URLs:
```typescript
// Single message with 2 Task calls - NO FILE CREATION
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze desktop hero (node 1413:13771).
           MUST capture screenshot to docs/temp/figma-screenshots/desktop-hero-[date].png
           Extract: colors (hex), typography (sizes/weights), layout dimensions, spacing.
           Return structured summary + screenshot path in response. DO NOT create MD files.'
})
Task({
  subagent_type: 'figma-design-analyzer',
  model: 'haiku',
  prompt: 'Analyze mobile hero (node 1413:17052).
           MUST capture screenshot to docs/temp/figma-screenshots/mobile-hero-[date].png
           Extract: colors, typography, dimensions, touch targets (44px).
           Return structured summary + screenshot path in response. DO NOT create MD files.'
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
- **Pass context directly**: Include PRD content (if created), Figma specs from analyzer responses, Linear ticket details
- **No file references**: Copy actual specifications into prompt, not file paths
- **Testing Auto-Trigger**: The senior-frontend-engineer agent is configured to AUTOMATICALLY launch storybook-expert and react-component-tester agents in parallel after implementation
- **Verify**: After agent completes, confirm testing agents were triggered (you'll see their reports)

**4C: Parallel Component Implementation**
If implementing multiple independent components (e.g., HeroSection + Navigation + Footer):

**CRITICAL: Launch ALL senior-frontend-engineer agents in parallel using a SINGLE message with multiple Task calls**

For each independent component:
- Create one Task call with subagent_type='senior-frontend-engineer'
- **Pass context directly**: Include relevant PRD requirements (if created) and Figma specs in the prompt (copy actual text from agent responses)
- **No file references**: Embed specifications directly, not file paths
- **Testing Auto-Trigger**: Each senior-frontend-engineer agent is configured to AUTOMATICALLY launch its own storybook-expert and react-component-tester agents in parallel
- **Verify**: After all complete, confirm all testing agents were triggered (e.g., 3 engineers × 2 testing agents = 6 testing agents)

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

**4D: Integrate Components into App (AUTOMATIC & REQUIRED)** ⚠️ NON-NEGOTIABLE

After implementation completes, YOU (the orchestrator) MUST integrate components so they render in the browser:

1. **Read current App.tsx**: Check what's currently rendered
2. **Update App.tsx** to import and mount new component(s):
   ```typescript
   // src/App.tsx
   import { HeroSection } from '@/components/sections';
   import './App.css';

   function App() {
     return (
       <main>
         <HeroSection />
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

**If Step 3 included Figma analysis**, **STRONGLY RECOMMEND** using playwright-dev-tester to verify implementation matches design:

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
     prompt: 'Test implementation at http://localhost:3000 for Linear ticket [TICKET-ID]

              Visual Verification (PRIMARY GOAL - since Figma designs exist):
              - Compare live implementation against Figma screenshots in docs/temp/figma-screenshots/
              - Take screenshots of live implementation and save to docs/temp/playwright-screenshots/
              - Verify: colors, typography, spacing, layout match Figma design
              - Check responsive behavior (mobile/tablet/desktop)

              Functional Testing (based on Linear ticket requirements):
              - [Specify critical user flows from ticket acceptance criteria]
              - [e.g., "Test login flow, form validation, navigation between pages"]

              Return results in response with screenshot paths for comparison.'
   })
   ```

**If no Figma analysis** (implemented directly from PRD):
- Consider playwright only for complex user flows (checkout, authentication, multi-step wizards)
- Skip for simple components - unit tests are sufficient

**When to SKIP Playwright** (use unit tests only):
- Simple stateless components with no user interactions
- Backend-only changes
- Configuration or tooling updates
- Bug fixes with adequate unit test coverage

## Step 5.5: Cleanup (Remove Temporary Documentation)
**CRITICAL**: Clean up any markdown/documentation files that agents may have accidentally created:

```bash
# Remove ticket-specific PRD files
rm -f docs/project/prd/*.md docs/project/*-prd*.md 2>/dev/null || true

# Remove ticket-specific design spec files (but keep screenshots!)
rm -f docs/project/design-specs/*.md docs/project/*-design-spec*.md docs/project/*-figma-*.md 2>/dev/null || true

# Remove ticket-specific implementation summaries
rm -f docs/project/*-implementation-*.md docs/project/*-summary*.md docs/project/*-analysis*.md 2>/dev/null || true

# Remove any JSON artifacts from Figma analysis (but NOT screenshots)
rm -f docs/project/*.json 2>/dev/null || true

# Remove empty directories
rmdir docs/project/prd docs/project/design-specs 2>/dev/null || true

# Clean up one-off MCP test files (keep only reusable scripts)
rm -f mcp/tests/test-*.ts mcp/tests/analyze-*.ts mcp/tests/extract-*.ts mcp/tests/process-*.ts mcp/tests/update-*.ts mcp/tests/temp-*.ts 2>/dev/null || true
```

**IMPORTANT**: Do NOT delete screenshots from `docs/temp/figma-screenshots/` or `docs/temp/playwright-screenshots/` - these are permanent reference documentation.

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
   - Each senior-frontend-engineer AUTOMATICALLY triggers its own storybook-expert and react-component-tester in parallel
   - Verify all testing agents were triggered after implementation completes
   - If Figma designs exist → STRONGLY RECOMMEND playwright-dev-tester for visual verification
     - Compare against Figma screenshots in docs/temp/figma-screenshots/
     - Save new screenshots to docs/temp/playwright-screenshots/
   - If complex user flows exist → Consider playwright-dev-tester for E2E testing

5. **General Parallelization Rule**:
   - ANY time you identify multiple independent tasks (analysis, implementation, testing, documentation)
   - Launch ALL necessary agents in SINGLE message with multiple Task calls
   - Examples: multiple Figma nodes, multiple components, multiple test suites, multiple documentation files

6. **Background Processes**:
   - **ALWAYS check if server is running first** with `lsof -ti:3000`
   - Use `run_in_background: true` for dev server only if port is free
   - Avoid spawning duplicate server instances

7. **No Manual Implementation**: You orchestrate agents - do NOT implement code yourself

8. **Wait for Completion**: Wait for all parallel agents to complete before proceeding to next sequential step

9. **Verify Testing**: Ensure all tests pass before marking ticket complete

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