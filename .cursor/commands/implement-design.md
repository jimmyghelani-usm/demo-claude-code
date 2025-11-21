---
name: implement-design
description: Extract Figma designs and implement with testing
arguments:
  - name: prompt
    description: "Figma URLs (comma/space/newline separated) and any notes"
    required: true
context:
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
prompt: |
  Figma Design → Implementation Workflow

  Execute all steps in order. Use the included agent guides as role references. Treat parallel steps as a single combined response.

  ---
  Step 1: Parse Figma URLs
  - Extract node IDs from {{prompt}} (node-id=XXXX-XXXXX → XXXX:XXXXX). Count total for parallelization.

  Step 2: Design Analysis (parallel)
  - For each node, follow figma-design-analyzer:
    - Capture screenshot to docs/temp/figma-screenshots/
    - Extract: colors (hex), typography, layout, spacing, responsive
    - Return specs inline in this response (no markdown files)
  - Aggregate specs across all nodes.

  Step 3: Implementation Planning
  - Identify components (new vs updates), reusable patterns, and which items can be built in parallel.

  Step 4: Implementation
  - For each component, follow senior-frontend-engineer using the gathered specs:
    - Export component from directory index
    - Mount in src/App.tsx via @/components/* and render
    - Run npm run type-check
    - Perform the behaviors of storybook-expert and react-component-tester to create/update stories and tests
  - Keep specs embedded inline (no file path references, except screenshot paths).

  Step 5: Verification
  - Run npm run type-check and npm run test:run
  - If visual verification is useful, follow playwright-dev-tester behaviors against http://localhost:3000 and save screenshots to docs/temp/playwright-screenshots/

  Step 5.5: Cleanup
  - Remove transient design-spec docs and temp MCP scripts per repo policy; keep screenshots under docs/temp/.

  Critical Rules
  - Parallelize analyses and implementations conceptually within this single response
  - Do not create markdown files for specs; return specs inline
  - Always integrate in App.tsx and report the live URL (http://localhost:3000)
  - Check ports before starting servers (lsof -ti:3000)

  NOW BEGIN: Use {{prompt}} to start at Step 1.
---
