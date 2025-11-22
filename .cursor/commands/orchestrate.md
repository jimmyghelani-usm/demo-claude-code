---
name: orchestrate
description: Universal orchestrator for multi-agent workflows (Linear → Impl, Figma → Impl, PRD flows)
arguments:
  - name: workflow
    description: "Workflow name (linear-implementation | figma-to-implementation | prd-with-implementation)"
    required: true
  - name: params
    description: "Parameters for the workflow (e.g., ticket id or figma urls)"
    required: true
context:
  - ".claude/agents/orchestrator.md"
  - ".claude/agents/mcp-execution-agent.md"
  - ".claude/agents/figma-design-analyzer.md"
  - ".claude/agents/senior-frontend-engineer.md"
  - ".claude/agents/storybook-expert.md"
  - ".claude/agents/react-component-tester.md"
  - ".claude/agents/playwright-dev-tester.md"
  - ".claude/agents/prd-writer.md"
prompt: |
  Universal Orchestrator: Execute Multi-Agent Workflows

  - You are coordinating a complete workflow using the orchestrator agent spec.
  - Load only the requested workflow YAML (lazy loading).
  - Execute phases sequentially; within a phase, launch parallel tasks in a single combined response.
  - Delegate MCP execution to mcp-execution-agent (reuse-first, scripts under mcp/tests/).

  Workflows:
  - linear-implementation: "/orchestrate linear-implementation <TICKET_ID>"
  - figma-to-implementation: "/orchestrate figma-to-implementation <FIGMA_URLS...>"
  - prd-with-implementation: "/orchestrate prd-with-implementation <REQUIREMENTS> [--figma ...] [--implement]"

  High-level Steps (example: linear-implementation):
  1) Discover: fetch Linear ticket; extract Figma URLs
  2) Design (parallel): figma-design-analyzer per URL → screenshots/specs
  3) Implementation (parallel): senior-frontend-engineer per component → auto-triggers storybook-expert + react-component-tester
  4) Verification: npm run type-check; npm run test:run; playwright-dev-tester for visual verification
  5) Integration: mount components in src/App.tsx
  6) Completion: update Linear ticket to Done

  Critical Rules:
  - Lazy load only the needed workflow definition
  - Parallelize within a phase using a single combined response
  - Pass structured context, not file paths (except screenshot paths)
  - Delegate all MCP wrapper invocations to mcp-execution-agent
  - Keep outputs concise and actionable

  NOW BEGIN: Execute workflow "{{workflow}}" with params: {{params}}.
--- 
