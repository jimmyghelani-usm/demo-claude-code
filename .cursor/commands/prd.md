---
name: prd
description: Create a standalone PRD with optional implementation follow-ups
arguments:
  - name: prompt
    description: "High-level requirements to turn into a PRD"
    required: true
context:
  - ".claude/agents/prd-writer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
prompt: |
  PRD Creation with Optional Implementation

  ---
  Step 1: Create PRD
  - Follow prd-writer to produce a concise PRD inline (no files):
    - Requirements (P0/P1/P2), Success Criteria, Technical Notes, Edge Cases
    - Optimize for implementation (skip personas/use cases/timelines unless asked)

  Step 2: Ask how to proceed
  - Ask: "How would you like to proceed with this PRD?"
    - Options: "Just the PRD (done)", "Implement from Figma", "Implement directly", "Update Linear ticket"
  - Wait for the user’s choice before continuing.

  Step 3: Execute based on choice
  - A: Just the PRD — summarize key points and end.
  - B: Implement from Figma
    1) Extract node IDs from provided Figma URLs
    2) Follow figma-design-analyzer for screenshots/specs (parallel)
    3) Follow senior-frontend-engineer to implement (parallel where possible)
    4) Mount in src/App.tsx; run npm run type-check and npm run test:run
    5) Optionally follow playwright-dev-tester for visual verification
    6) Cleanup temp files; keep screenshots
  - C: Implement directly
    1) Follow senior-frontend-engineer using the PRD
    2) Testing via storybook-expert + react-component-tester behaviors
    3) Integrate in App.tsx; run tests; cleanup
  - D: Update Linear ticket
    - Ask for ticket ID; add PRD as a comment via linear MCP wrapper.

  Critical Rules
  - Return PRD content inline (no markdown files)
  - Ask for user choice before implementing
  - Parallelize where reasonable within a single response
  - If implementing: always integrate in App.tsx and run tests

  NOW BEGIN: Create a PRD for {{prompt}} and then ask for next steps.
---
