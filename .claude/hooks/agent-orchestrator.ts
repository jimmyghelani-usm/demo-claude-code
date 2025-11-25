#!/usr/bin/env npx ts-node
/**
 * Claude Code Agent Orchestrator Hook
 *
 * Uses SubagentStop hook to intelligently route to the next agent based on:
 * - Current task completion status
 * - Errors or blockers encountered
 * - Type of work completed
 * - Project context
 *
 * This hook reads the session transcript and decides:
 * 1. Should the current agent continue?
 * 2. What agent should run next?
 * 3. What instructions should the next agent receive?
 *
 * CRITICAL REQUIREMENTS:
 * - All agents MUST use local MCP wrappers (mcp/servers directories), never direct API calls
 * - figma-design-analyzer: Use mcp/servers/figma + mcp/tests/figma scripts
 * - senior-frontend-engineer: Can run in parallel for large designs (scale 1-4 instances)
 * - playwright-dev-tester: Use mcp/servers/playwright + mcp/tests/playwright scripts
 * - All test scripts organized by MCP client type in mcp/tests/[client]
 */

import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

interface SubagentStopInput {
  session_id: string;
  transcript_path: string;
  permission_mode: string;
  hook_event_name: string;
  stop_hook_active: boolean;
}

interface SessionEntry {
  type: string;
  role?: string;
  content?: string;
  tool_name?: string;
  tool_use_id?: string;
  result?: string;
}

interface OrchestratorDecision {
  decision?: 'block' | undefined;
  reason?: string;
  nextAgent?: string;
  nextAgentInstructions?: string;
  parallelAgents?: Array<{
    agent: string;
    instructions: string;
  }>;
  shouldContinue?: boolean;
}

/**
 * Read and parse JSONL transcript file
 */
async function readTranscript(transcriptPath: string): Promise<SessionEntry[]> {
  const entries: SessionEntry[] = [];

  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      try {
        const entry = JSON.parse(line);
        entries.push(entry);
      } catch (e) {
        // Ignore parse errors for this line
      }
    });

    rl.on('close', () => {
      resolve(entries);
    });

    rl.on('error', reject);
  });
}

/**
 * Analyze transcript to determine current state
 */
function analyzeTranscript(entries: SessionEntry[]): {
  lastAssistantMessage: string;
  agentsRun: string[];
  errors: string[];
  tasksCompleted: string[];
  currentContext: string;
} {
  const agentsRun: string[] = [];
  const errors: string[] = [];
  const tasksCompleted: string[] = [];
  let lastAssistantMessage = '';
  let currentContext = '';

  for (const entry of entries) {
    if (entry.type === 'message' && entry.role === 'assistant') {
      lastAssistantMessage = entry.content || '';
      currentContext = entry.content || '';
    }

    // Track subagent execution - when a Task tool is used to launch an agent
    if (entry.type === 'tool_use' && entry.tool_name === 'Task') {
      // Extract agent type from tool use arguments
      const result = entry.result;
      if (result && typeof result === 'string') {
        // Look for agent names in the result or arguments
        if (result.includes('senior-frontend-engineer')) {
          agentsRun.push('senior-frontend-engineer');
        } else if (result.includes('react-component-tester')) {
          agentsRun.push('react-component-tester');
        } else if (result.includes('playwright-dev-tester')) {
          agentsRun.push('playwright-dev-tester');
        } else if (result.includes('storybook-expert')) {
          agentsRun.push('storybook-expert');
        } else if (result.includes('prd-writer')) {
          agentsRun.push('prd-writer');
        } else if (result.includes('Explore')) {
          agentsRun.push('Explore');
        }
      }
    }

    if (entry.type === 'tool_result' && entry.result && entry.result.includes('error')) {
      errors.push(entry.result);
    }
  }

  return {
    lastAssistantMessage,
    agentsRun,
    errors,
    tasksCompleted,
    currentContext,
  };
}

/**
 * Determine next agent based on context and completion status
 */
function determineNextAgent(analysis: {
  lastAssistantMessage: string;
  agentsRun: string[];
  errors: string[];
  tasksCompleted: string[];
  currentContext: string;
}): OrchestratorDecision {
  const { lastAssistantMessage, agentsRun, errors, currentContext } = analysis;

  // Check if current agent is done
  const isDone =
    lastAssistantMessage.toLowerCase().includes('complete') ||
    lastAssistantMessage.toLowerCase().includes('finished') ||
    lastAssistantMessage.toLowerCase().includes('done');

  // Check what agents have run
  const ranFrontendEngineer = agentsRun.includes('senior-frontend-engineer');
  const ranComponentTester = agentsRun.includes('react-component-tester');
  const ranPlaywrightTester = agentsRun.includes('playwright-dev-tester');
  const ranStorybookExpert = agentsRun.includes('storybook-expert');

  // Errors detected
  if (errors.length > 0) {
    return {
      decision: 'block',
      reason:
        'Errors detected during agent execution. Previous agent should resolve issues before stopping.',
      nextAgent: undefined,
      shouldContinue: true,
    };
  }

  // Pattern 1-Parallel: senior-frontend-engineer → react-component-tester + storybook-expert (parallel)
  // Triggered when both tests AND storybook documentation are needed
  if (canRunInParallel(analysis)) {
    return {
      decision: undefined,
      parallelAgents: [
        {
          agent: 'react-component-tester',
          instructions:
            'The React component has been created. Now write comprehensive tests using Vitest + React Testing Library. Focus on user interactions, edge cases, and accessibility.',
        },
        {
          agent: 'storybook-expert',
          instructions:
            'The React component has been created. Now create Storybook stories with CSF3 format, args, controls, and play functions. Include all component variants and interactive states.',
        },
      ],
      shouldContinue: false,
    };
  }

  // Pattern 1a: senior-frontend-engineer → storybook-expert (if design system mentioned)
  if (
    ranFrontendEngineer &&
    !ranStorybookExpert &&
    contextMentions(currentContext, ['design system', 'component library', 'storybook', 'story', 'ui kit', 'system'])
  ) {
    return {
      decision: undefined,
      nextAgent: 'storybook-expert',
      nextAgentInstructions:
        'The React component has been created. Now create Storybook stories with CSF3 format, args, controls, and play functions. Include all component variants and interactive states.',
      shouldContinue: false,
    };
  }

  // Pattern 1b: senior-frontend-engineer → react-component-tester (otherwise)
  if (
    ranFrontendEngineer &&
    !ranComponentTester &&
    !ranStorybookExpert &&
    contextMentions(currentContext, ['component', 'react', 'button', 'card', 'modal', 'form'])
  ) {
    return {
      decision: undefined,
      nextAgent: 'react-component-tester',
      nextAgentInstructions: `${generateSeniorEngineerInstructions(currentContext)}

Now write comprehensive tests using Vitest + React Testing Library. Focus on user interactions, edge cases, and accessibility. Use MCP wrappers for any browser testing.`,
      shouldContinue: false,
    };
  }

  // Pattern 2: react-component-tester → storybook-expert (if design system mentioned)
  if (
    ranComponentTester &&
    !ranStorybookExpert &&
    contextMentions(currentContext, ['design system', 'component library', 'storybook', 'story', 'ui kit', 'system'])
  ) {
    return {
      decision: undefined,
      nextAgent: 'storybook-expert',
      nextAgentInstructions:
        'Unit tests are complete. Now create Storybook stories for this component with CSF3 format, args, controls, and play functions. Include all component variants and interactive states.',
      shouldContinue: false,
    };
  }

  // Pattern 3: react-component-tester → playwright-dev-tester
  if (
    ranComponentTester &&
    !ranPlaywrightTester &&
    isDone &&
    contextMentions(currentContext, ['test', 'vitest', 'testing library', 'playwright', 'e2e'])
  ) {
    return {
      decision: undefined,
      nextAgent: 'playwright-dev-tester',
      nextAgentInstructions: `CRITICAL: Use MCP Playwright wrappers only - NO native Playwright code!

1. NEVER write Playwright code directly (await page.goto, await page.click, etc)
2. ALWAYS use wrapper functions from mcp/servers/playwright/
3. Example correct pattern:
   - import { playwright } from '@mcp'
   - await playwright.navigate({ url: 'http://localhost:3000' })
   - await playwright.click({ element: 'Login button', ref: '#login' })
   - const screenshot = await playwright.takeScreenshot({ filename: 'test.png' })
4. Create/reuse test scripts in mcp/tests/playwright/ (organized by client type)
5. Use existing scripts from mcp/tests/ before creating new ones
6. Follow pattern: npx tsx mcp/tests/playwright/test-component.ts <component-name>

Unit tests are complete. Now create browser-based tests using MCP Playwright wrapper to verify visual rendering, user interactions, and end-to-end workflows.`,
      shouldContinue: false,
    };
  }

  // Pattern 4: storybook-expert → playwright-dev-tester (if browser testing mentioned)
  if (
    ranStorybookExpert &&
    !ranPlaywrightTester &&
    contextMentions(currentContext, ['playwright', 'browser', 'e2e', 'visual testing', 'integration test'])
  ) {
    return {
      decision: undefined,
      nextAgent: 'playwright-dev-tester',
      nextAgentInstructions: `CRITICAL: Use MCP Playwright wrappers only - NO native Playwright code!

1. NEVER write Playwright code directly (await page.goto, await page.click, etc)
2. ALWAYS use wrapper functions from mcp/servers/playwright/
3. Example correct pattern:
   - import { playwright } from '@mcp'
   - await playwright.navigate({ url: 'http://localhost:3000' })
   - await playwright.click({ element: 'button' })
   - const screenshot = await playwright.takeScreenshot({ filename: 'test.png' })
4. Create/reuse test scripts in mcp/tests/playwright/ (organized by client type)
5. Use existing scripts from mcp/tests/ before creating new ones
6. Follow pattern: npx tsx mcp/tests/playwright/test-component.ts <component-name>

Storybook stories are complete. Now create browser-based tests using MCP Playwright wrapper to verify visual rendering and user interactions.`,
      shouldContinue: false,
    };
  }

  // Default: allow normal completion
  return {
    decision: undefined,
    shouldContinue: false,
  };
}

/**
 * Check if context mentions any of the provided keywords
 */
function contextMentions(context: string, keywords: string[]): boolean {
  const lowerContext = context.toLowerCase();
  return keywords.some((keyword) => lowerContext.includes(keyword));
}

/**
 * Determine if tests and storybook can run in parallel
 * Returns true if both are needed and context supports parallel execution
 */
function canRunInParallel(analysis: {
  lastAssistantMessage: string;
  agentsRun: string[];
  errors: string[];
  tasksCompleted: string[];
  currentContext: string;
}): boolean {
  const { agentsRun, errors, currentContext } = analysis;

  // Can't run in parallel if there are errors
  if (errors.length > 0) {
    return false;
  }

  // Check if senior-frontend-engineer just completed
  if (!agentsRun.includes('senior-frontend-engineer')) {
    return false;
  }

  // Check if both test and storybook are needed
  const needsTests =
    !agentsRun.includes('react-component-tester') &&
    contextMentions(currentContext, ['test', 'unit', 'vitest', 'testing library', 'spec']);

  const needsStorybook =
    !agentsRun.includes('storybook-expert') &&
    contextMentions(currentContext, ['design system', 'component library', 'storybook', 'story', 'ui kit', 'system']);

  // Both are needed - can run in parallel
  return needsTests && needsStorybook;
}

/**
 * Log hook execution to file
 */
function logHookExecution(input: SubagentStopInput, analysis: any, decision: OrchestratorDecision): void {
  try {
    const logsDir = path.join(process.cwd(), '.claude', 'hooks', 'logs');

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const logFile = path.join(logsDir, 'orchestrator.log');

    const logEntry = {
      timestamp,
      sessionId: input.session_id,
      transcriptPath: input.transcript_path,
      permissionMode: input.permission_mode,
      hookEventName: input.hook_event_name,
      stopHookActive: input.stop_hook_active,
      analysis: {
        agentsRun: analysis.agentsRun,
        agentsRunCount: analysis.agentsRun.length,
        errorsDetected: analysis.errors.length > 0,
        errorCount: analysis.errors.length,
        contextPreview: analysis.currentContext.substring(0, 500),
      },
      decision: {
        action: decision.decision || 'route',
        nextAgent: decision.nextAgent || 'none',
        parallelAgents: decision.parallelAgents?.map((a: any) => a.agent) || [],
        instructionsPreview: decision.nextAgentInstructions?.substring(0, 200) || 'none',
        shouldContinue: decision.shouldContinue,
      },
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    // Append to log file
    fs.appendFileSync(logFile, logLine);

    // Also log to console for debugging
    console.log(`[HOOK] Execution logged to ${logFile}`);
  } catch (error) {
    console.error('Failed to log hook execution:', error);
  }
}

/**
 * Format hook decision for console output
 */
function formatDecisionForConsole(decision: OrchestratorDecision): string {
  const parts: string[] = [];

  if (decision.decision === 'block') {
    parts.push(`[BLOCK] ${decision.reason}`);
  } else if (decision.nextAgent) {
    parts.push(`[ROUTE] → ${decision.nextAgent}`);
  } else if (decision.parallelAgents && decision.parallelAgents.length > 0) {
    parts.push(`[PARALLEL] → ${decision.parallelAgents.map((a) => a.agent).join(', ')}`);
  } else {
    parts.push('[COMPLETE] No further routing needed');
  }

  return parts.join(' ');
}

/**
 * Generate instructions for senior-frontend-engineer with MCP wrapper enforcement
 */
function generateSeniorEngineerInstructions(context: string, isParallel: boolean = false): string {
  const baseInstructions = `You are implementing React components. CRITICAL RULES:
1. NEVER write direct Playwright code - use MCP wrappers from mcp/servers/playwright/
2. For any browser interaction, call playwright.navigate(), playwright.click(), etc.
3. Use reusable scripts from mcp/tests/ directory (organized by client type)
4. Import: import { figma, linear, playwright } from '@mcp'
5. If you need to fetch data, use mcp-execution-agent or existing scripts
6. For Figma specs, use figma.getDesignContext() from wrapper
7. For Linear context, use linear.getIssue() from wrapper
8. Never create direct API client instances`;

  if (isParallel) {
    return `${baseInstructions}

PARALLEL EXECUTION MODE:
- You are one of multiple senior-frontend-engineer instances running in parallel
- Focus ONLY on your assigned components
- Do not attempt to build other components
- Each component should be independent and self-contained
- Use the same patterns as other instances for consistency`;
  }

  return baseInstructions;
}

/**
 * Main hook handler
 */
async function main() {
  try {
    // Log hook entry to stderr immediately (visible in Claude Code UI)
    console.error('[HOOK-ENTRY] SubagentStop hook triggered at', new Date().toISOString());
    console.error('[HOOK-INPUT] argv[2]:', process.argv[2] ? process.argv[2].substring(0, 100) : 'none');

    const input: SubagentStopInput = JSON.parse(process.argv[2] || '{}');

    console.error('[HOOK-PARSED] session_id:', input.session_id);
    console.error('[HOOK-PARSED] transcript_path:', input.transcript_path);

    // Validate required parameters
    if (!input.transcript_path) {
      console.error('[HOOK-ERROR] Missing required parameter: transcript_path');
      console.log(
        JSON.stringify({
          decision: undefined,
          reason: 'Missing required parameter: transcript_path. Hook requires proper SubagentStop input.',
        })
      );
      process.exit(1);
    }

    // Prevent infinite loops
    if (input.stop_hook_active) {
      console.error('[HOOK-BLOCKED] Hook already active, preventing infinite loop');
      console.log(
        JSON.stringify({
          decision: undefined,
          reason: 'Hook already active, preventing infinite loop',
        })
      );
      process.exit(0);
    }

    // Read transcript
    console.error('[HOOK-READING] Starting transcript read from:', input.transcript_path);
    const entries = await readTranscript(input.transcript_path);
    console.error('[HOOK-READ] Transcript entries loaded:', entries.length);

    // Analyze current state
    console.error('[HOOK-ANALYZING] Analyzing transcript...');
    const analysis = analyzeTranscript(entries);
    console.error('[HOOK-ANALYSIS] Agents run:', analysis.agentsRun.join(', ') || 'none');

    // Determine next agent
    console.error('[HOOK-DECIDING] Determining next agent...');
    const decision = determineNextAgent(analysis);
    console.error('[HOOK-DECISION] nextAgent:', decision.nextAgent || 'none');
    console.error('[HOOK-DECISION] parallelAgents:', decision.parallelAgents?.map(a => a.agent).join(', ') || 'none');

    // Log the execution
    logHookExecution(input, analysis, decision);
    console.error('[HOOK-LOGGED] Execution logged to file');

    // Output decision summary to console
    console.log(formatDecisionForConsole(decision));

    // Output JSON decision for Claude Code to parse
    console.log(JSON.stringify(decision));

    console.error('[HOOK-COMPLETE] SubagentStop hook execution completed successfully');
  } catch (error) {
    console.error('[HOOK-ERROR] Agent orchestrator error:', error);
    process.exit(1);
  }
}

main();
