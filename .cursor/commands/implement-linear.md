---
name: implement-linear
description: Complete workflow - Linear ticket → PRD → Figma → Implementation → Testing
arguments:
  - name: prompt
    description: "Linear ticket ID (e.g., ENG-123) and flags (optional)"
    required: true
context:
  - ".claude/agents/prd-writer.md"
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
prompt: |
  Linear → Implementation Workflow

  Execute all steps in order. Use the included agent guides as role references.

  ---
  Step 1: Fetch Linear Ticket
  - If available, run: npx tsx mcp/tests/get-issue.ts {{prompt}}
  - Extract: title, description, labels, assignee, Figma URLs, status/team context.

  Step 2: PRD (optional; skip by default)
  - Only create a PRD if user requested (--with-prd), ticket is ambiguous, or formal documentation is needed.
  - If needed, follow prd-writer to return a concise PRD inline (no files).

  Step 3: Design Analysis (if Figma URLs)
  - For each URL, follow figma-design-analyzer; capture screenshots and return specs inline.

  Step 4: Implementation
  - For each component, follow senior-frontend-engineer using PRD/specs/context:
    - Export component from directory index
    - Mount in src/App.tsx via @/components/* and render
    - Run npm run type-check
    - Perform storybook-expert and react-component-tester behaviors to create/update stories and tests.

  Step 5: Verification
  - Run npm run type-check and npm run test:run
  - Optionally follow playwright-dev-tester behaviors; compare against Figma screenshots and save to docs/temp/playwright-screenshots/.

  Step 5.5: Cleanup
  - Remove transient design-spec docs and temp MCP scripts per repo policy; keep screenshots.

  Step 6: Update Linear Ticket
  - Use the linear MCP wrapper to mark Done and add a brief comment:
    - Component implemented, tests passing, live URL (http://localhost:3000), and screenshots path.

  Critical Rules
  - Parallelize agent-style work within this single response
  - Do not create markdown files for PRD/specs; return content inline
  - Always integrate in App.tsx and report the live URL (http://localhost:3000)
  - Check ports before starting servers (lsof -ti:3000)

  NOW BEGIN: Start with Step 1 using {{prompt}}.
---
