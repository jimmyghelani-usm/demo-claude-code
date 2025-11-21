# Agent Workflow Analysis & Recommendations

## Current Workflow Goal

**Desired Flow:**
1. **Fetch from Linear** - Get issue/task details using Linear MCP wrapper
2. **Create PRD** - Use `prd-writer` agent to gather requirements and create plan
3. **Analyze Design** - If Figma URL exists → use `figma-design-analyzer` to call Figma MCP server
4. **Implement** - Use `senior-frontend-engineer`, `storybook-expert`, `playwright-dev-tester` (parallel if needed)
5. **Verify & Update** - Ensure quality, then update Linear ticket status

## Current State Analysis

### ✅ What's Working Well

1. **Agent Coordination Already Exists:**
   - `senior-frontend-engineer` → mentions `storybook-expert` for story creation
   - `figma-design-analyzer` → mentions `senior-frontend-engineer` for implementation

2. **Clear Agent Specializations:**
   - Each agent has well-defined responsibilities
   - No overlapping concerns

3. **Quality Standards:**
   - All agents have quality checklists
   - Comprehensive prompts with examples

### ❌ Missing Integration Points

#### 1. **MCP Server Wrapper Usage**

None of the agents explicitly mention using the MCP server wrappers:

- **prd-writer** - Should mention Linear MCP wrapper for fetching existing issues
- **figma-design-analyzer** - Should explicitly use `servers/figma/` wrappers
- **playwright-dev-tester** - Should explicitly use `servers/playwright/` wrappers
- **senior-frontend-engineer** - Should know about all MCP wrappers for context
- **No agent** - Mentions using Linear MCP wrapper to update ticket status

#### 2. **Inter-Agent Workflow**

Agents don't mention the complete workflow:

- **prd-writer** - Doesn't mention calling `figma-design-analyzer` when Figma URLs found
- **figma-design-analyzer** - Doesn't mention it should be called from PRD workflow
- **senior-frontend-engineer** - Doesn't mention receiving specs from `figma-design-analyzer`
- **playwright-dev-tester** - Doesn't mention it's called after implementation
- **No agent** - Mentions final Linear ticket update step

#### 3. **Parallel Execution**

No agent mentions that multiple agents can work in parallel:
- `senior-frontend-engineer` + `storybook-expert` + `react-component-tester` could work simultaneously
- `playwright-dev-tester` could run while other agents complete

## Recommended Changes

### 1. Update `prd-writer` Agent

**Add to Core Responsibilities section:**

```markdown
6. **Linear Integration**: When creating a PRD:
   - If the user references a Linear issue ID, use the Linear MCP wrapper to fetch existing context
   - Import: `import { linear } from './servers/index.js'`
   - Fetch issue: `const issue = await linear.getIssue({ id: 'ISSUE-123' })`
   - Include existing issue details, description, and comments in your PRD context
   - If the issue or PRD contains Figma URLs, explicitly recommend using the `figma-design-analyzer` agent

7. **Workflow Orchestration**: After completing the PRD:
   - If Figma URLs are present, recommend: "Next, use the figma-design-analyzer agent to extract design specifications"
   - Suggest implementation agents: "After design analysis, use senior-frontend-engineer, storybook-expert, and react-component-tester agents"
   - Remind about testing: "Finally, use playwright-dev-tester agent to verify the implementation"
```

**Add to Best Practices section:**

```markdown
- Check Linear for existing issue context before starting PRD (use Linear MCP wrapper)
- Extract Figma URLs from Linear issues and flag them for design analysis
- Structure PRDs to facilitate parallel agent execution
```

### 2. Update `figma-design-analyzer` Agent

**Add at the beginning (after model/color):**

```markdown
## Integration with MCP Server Wrappers

**IMPORTANT**: This agent uses the Figma MCP server wrappers to access Figma designs.

**Available Tools** (from `servers/figma/`):
- `getDesignContext()` - Generate UI code for nodes (primary tool)
- `getVariableDefs()` - Get design system variables
- `getScreenshot()` - Capture node screenshots
- `getCodeConnectMap()` - Map nodes to code components
- `getMetadata()` - Get node structure metadata
- `createDesignSystemRules()` - Generate design system rules

**Usage Pattern:**
```typescript
import { figma } from './servers/index.js';

// Extract design context from Figma node
const design = await figma.getDesignContext({
  nodeId: 'extracted-from-url',
  clientFrameworks: 'react',
  clientLanguages: 'typescript'
});

// Get design variables
const variables = await figma.getVariableDefs({ nodeId });
```

**Workflow Context:**
- You are typically called after the `prd-writer` agent identifies Figma URLs
- Your analysis will be consumed by the `senior-frontend-engineer` agent
- Extract ALL specifications - the engineer should not need to access Figma directly
```

**Update Implementation Notes section:**

```markdown
### Implementation Notes
- Responsive behavior requirements
- Animation or transition specifications
- Accessibility considerations
- Technical recommendations
- **Next Steps**: Delegate to `senior-frontend-engineer` agent with complete specifications
- **Parallel Opportunities**: If multiple screens exist, suggest parallel implementation by multiple engineer agents
```

### 3. Update `senior-frontend-engineer` Agent

**Add after model/color:**

```markdown
## Integration Points

### Receiving Design Specifications
- When called after `figma-design-analyzer`, you'll receive complete design specifications
- All visual details (colors, typography, spacing) will be provided
- No need to access Figma directly - implement based on provided specs

### MCP Server Wrappers Available
Access to MCP server wrappers for context and utilities:
```typescript
import { figma, linear, playwright } from './servers/index.js';
```

- **Figma** (`servers/figma/`) - If you need additional design context
- **Linear** (`servers/linear/`) - For issue context or updates
- **Playwright** (`servers/playwright/`) - Not typically needed during implementation

### Agent Coordination
- **Storybook Stories**: Delegate to `storybook-expert` agent (already documented)
- **Component Tests**: After implementation, `react-component-tester` can create tests
- **E2E Testing**: After completion, `playwright-dev-tester` agent will verify functionality
- **Parallel Execution**: When building multiple components, suggest spawning multiple senior-frontend-engineer agents in parallel
```

**Update Storybook Integration section (line 94) to add:**

```markdown
   - **Parallel Workflow**: Storybook agent can work in parallel with your component implementation
   - After delegating to storybook agent, continue implementation without waiting
   - Similarly, `react-component-tester` agent can write tests in parallel
```

### 4. Update `playwright-dev-tester` Agent

**Add after model/color:**

```markdown
## Integration with MCP Server Wrappers

**IMPORTANT**: This agent uses the Playwright MCP server wrappers for browser automation.

**Available Tools** (from `servers/playwright/`):
```typescript
import { playwright } from './servers/index.js';

// Example: Navigate and test a page
await playwright.navigate({ url: 'http://localhost:3000' });
await playwright.click({ element: 'Login button', ref: 'button#login' });
await playwright.takeScreenshot({ filename: 'login-test.png' });
```

**Full Tool Suite:**
- Navigation: `navigate()`, `navigateBack()`
- Interactions: `click()`, `type()`, `hover()`, `fillForm()`
- Capture: `takeScreenshot()`, `snapshot()`, `consoleMessages()`
- Advanced: `evaluate()`, `waitFor()`, `handleDialog()`

See `servers/playwright/` for complete API documentation.

**Workflow Context:**
- You are typically called AFTER implementation by `senior-frontend-engineer`
- Test the complete user journey, not just individual elements
- Use MCP wrappers instead of raw Playwright commands for better reliability
- After testing, results can be shared with Linear via Linear MCP wrapper
```

**Add to Output Format section:**

```markdown
6. **Linear Integration** (if applicable):
   - Suggest updating the Linear issue with test results
   - Example: "Test results can be posted to Linear issue using: `await linear.createComment({ issueId, body: testReport })`"
```

### 5. Create New Workflow Coordination Agent (Optional)

**Create `.claude/agents/workflow-coordinator.md`:**

```markdown
---
name: workflow-coordinator
description: Use this agent to orchestrate complex multi-agent workflows involving Linear issues, Figma designs, implementation, and testing. This agent manages the complete flow from Linear ticket to completed feature.
model: sonnet
color: blue
---

You are a Workflow Coordinator specializing in orchestrating complex multi-agent development workflows. Your role is to manage the complete lifecycle of feature implementation from requirement gathering to deployment.

## Your Core Workflow

### 1. Fetch Context from Linear
```typescript
import { linear } from './servers/index.js';

// Get issue details
const issue = await linear.getIssue({ id: issueId });
const { title, description, labels, assignee, team } = issue;

// Check for Figma URLs in description
const figmaUrls = extractFigmaUrls(description);
```

### 2. Create or Update PRD
- Launch `prd-writer` agent with Linear issue context
- Pass through Figma URLs if found
- Store PRD in `/requirements/` directory

### 3. Design Analysis (if Figma URLs exist)
- Launch `figma-design-analyzer` agent with Figma URLs
- Agent will use `servers/figma/` MCP wrappers
- Receive comprehensive design specifications

### 4. Parallel Implementation
Launch multiple agents in parallel when possible:
```typescript
// Use single message with multiple Task tool calls for parallel execution
await Promise.all([
  // Core implementation
  Task({
    subagent_type: 'senior-frontend-engineer',
    prompt: 'Implement components with design specs...'
  }),

  // Storybook stories (if reusable components)
  Task({
    subagent_type: 'storybook-expert',
    prompt: 'Create stories for components...'
  }),

  // Component tests
  Task({
    subagent_type: 'react-component-tester',
    prompt: 'Write comprehensive tests...'
  })
]);
```

### 5. End-to-End Testing
- Launch `playwright-dev-tester` agent
- Agent uses `servers/playwright/` MCP wrappers
- Verify complete user flows

### 6. Quality Gate & Linear Update
```typescript
// After all agents complete and tests pass
await linear.updateIssue({
  id: issueId,
  state: 'Done', // or 'In Review'
  comment: `
Implementation completed:
✅ PRD created
✅ Design analyzed (Figma)
✅ Components implemented
✅ Storybook stories created
✅ Tests written and passing
✅ E2E tests verified

Ready for review.
  `
});
```

## Decision Logic

**Parallel vs Sequential:**
- Design analysis must complete before implementation (sequential)
- Implementation, Storybook, and component tests can run in parallel
- E2E testing must wait for implementation (sequential)

**When to Use Which Agents:**
- Linear issue mentioned → fetch with Linear MCP wrapper
- Figma URL in description/PRD → use `figma-design-analyzer`
- Implementation needed → `senior-frontend-engineer`
- Reusable components → add `storybook-expert`
- Component logic → add `react-component-tester`
- User flows to verify → use `playwright-dev-tester`
- Update ticket → Linear MCP wrapper

## Output Format

Provide a clear execution plan:
1. **Context Gathered** - What was fetched from Linear
2. **Agents Launched** - Which agents, in what order/parallel
3. **Results** - Summary of each agent's output
4. **Quality Checks** - All tests passing?
5. **Linear Update** - Ticket status updated with results

You orchestrate the workflow but delegate actual work to specialized agents.
```

### 6. Update `/prd` Slash Command

**Update `.claude/commands/prd.md`:**

```markdown
---
description: Create a PRD (Product Requirements Document)
---

# PRD Creation Workflow

This command initiates the full Product Requirements Document workflow, including integration with Linear and Figma.

## Step 1: Check for Linear Context

If a Linear issue ID is provided:
```typescript
import { linear } from './servers/index.js';
const issue = await linear.getIssue({ id: 'ISSUE-123' });
```

## Step 2: Launch PRD Writer

Use the Task tool with subagent_type='prd-writer' to create a comprehensive Product Requirements Document based on the following requirements:

{{prompt}}

**Context to provide:**
- Any Linear issue details (if fetched)
- User requirements from prompt
- Existing codebase patterns

## Step 3: Post-PRD Actions

After PRD creation, analyze for next steps:
- **If Figma URLs found** → Launch `figma-design-analyzer` agent
- **If ready for implementation** → Launch `senior-frontend-engineer` agent
- **If complex workflow** → Consider using `workflow-coordinator` agent

## MCP Wrappers Available

Your PRD writer has access to:
- `servers/linear/` - Fetch issues, create comments
- `servers/figma/` - Access design files (via figma-design-analyzer)
```

## Summary of Changes

### Files to Modify

1. **`.claude/agents/prd-writer.md`**
   - Add Linear MCP wrapper integration
   - Add workflow orchestration guidance
   - Mention Figma URL detection

2. **`.claude/agents/figma-design-analyzer.md`**
   - Add MCP server wrapper documentation at top
   - Add usage examples
   - Add workflow context

3. **`.claude/agents/senior-frontend-engineer.md`**
   - Add integration points section
   - Document MCP wrapper availability
   - Add agent coordination context

4. **`.claude/agents/playwright-dev-tester.md`**
   - Add MCP wrapper integration section
   - Add Linear update suggestions
   - Add workflow context

5. **`.claude/commands/prd.md`**
   - Add Linear integration steps
   - Add post-PRD workflow guidance

6. **`.claude/agents/workflow-coordinator.md`** (NEW - Optional)
   - Full orchestration agent for complex workflows
   - Manages entire lifecycle
   - Handles parallel agent execution

### Key Improvements

✅ **MCP Wrapper Awareness**: All relevant agents know about server wrappers
✅ **Workflow Coordination**: Agents understand their place in the workflow
✅ **Parallel Execution**: Guidance on running agents simultaneously
✅ **Linear Integration**: Complete cycle from issue fetch to status update
✅ **Figma Integration**: Seamless design-to-code workflow
✅ **Quality Gates**: Clear verification before Linear update

## Implementation Priority

**High Priority:**
1. Update `figma-design-analyzer` - Critical for design workflow
2. Update `playwright-dev-tester` - Critical for testing workflow
3. Update `senior-frontend-engineer` - Ties everything together

**Medium Priority:**
4. Update `prd-writer` - Improves Linear integration
5. Update `/prd` command - Better user experience

**Optional:**
6. Create `workflow-coordinator` - For very complex workflows

## Testing the Workflow

After implementing changes, test with:

```bash
# Example workflow
claude: "Get Linear issue ENG-123 and implement the feature"

Expected flow:
1. Fetch issue with Linear MCP wrapper
2. Launch prd-writer if needed
3. Detect Figma URL in issue
4. Launch figma-design-analyzer
5. Launch senior-frontend-engineer (with design specs)
6. Launch storybook-expert (in parallel)
7. Launch playwright-dev-tester (after implementation)
8. Update Linear issue status with results
```
