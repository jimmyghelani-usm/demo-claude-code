# Slash Commands Quick Reference

## When to Use Each Command

### `/implement-linear <ticket-id>`
**Purpose**: Complete end-to-end workflow from Linear ticket to tested implementation

**Use when**:
- ✅ You have a Linear ticket ready to implement
- ✅ You want PRD + implementation + testing in one workflow
- ✅ You're ready to build immediately
- ✅ The ticket may contain Figma URLs that need extraction

**What it does**:
1. Fetches Linear ticket context
2. Creates comprehensive PRD
3. Extracts Figma designs (if URLs present)
4. Implements with senior-frontend-engineer
5. Auto-triggers storybook + testing agents
6. Verifies tests pass
7. Updates Linear ticket as "Done"

**Example**:
```bash
/implement-linear FE-424
```

---

### `/implement-design <figma-url> [<figma-url> ...]`
**Purpose**: Extract Figma design specs and implement with testing

**Use when**:
- ✅ You have Figma design URLs
- ✅ You want to extract design specs + implement
- ✅ No Linear ticket involved (or separate from Linear workflow)
- ✅ You have one or multiple Figma components to build

**What it does**:
1. Extracts design specifications from Figma (parallel if multiple URLs)
2. Implements components (parallel if independent)
3. Auto-triggers storybook + testing agents for each component
4. Verifies all tests pass

**Examples**:
```bash
# Single component
/implement-design https://figma.com/file/ABC?node-id=2171-13039

# Multiple components (extracted in parallel)
/implement-design https://figma.com/.../node-id=2171-13039 https://figma.com/.../node-id=2171-14000
```

---

### `/prd <requirements>`
**Purpose**: Create standalone PRD for planning/documentation (NO implementation)

**Use when**:
- ✅ You need requirements documentation BEFORE implementation
- ✅ Stakeholders need to review the PRD first
- ✅ You're in discovery/planning phase
- ✅ Implementation will happen later or by different team
- ✅ You want product validation before committing to build

**What it does**:
1. Creates comprehensive PRD via prd-writer agent
2. Saves to `requirements/` directory
3. Recommends next steps based on content

**What it does NOT do**:
- ❌ Does not implement code
- ❌ Does not extract Figma designs
- ❌ Does not create tests

**Examples**:
```bash
# From description
/prd Create a user authentication system with OAuth support

# From Linear ticket (PRD only, no implementation)
/prd Linear ticket FE-500 describes a new dashboard feature
```

**When to use `/prd` vs `/implement-linear`**:
- Use `/prd` if you need approval before building
- Use `/implement-linear` if you're ready to build immediately

---

## Decision Tree

```
Do you have a Linear ticket?
├─ YES → Do you want to implement it now?
│  ├─ YES → Use /implement-linear <ticket-id>
│  └─ NO (just need PRD) → Use /prd <description of ticket>
│
└─ NO → Do you have Figma designs?
   ├─ YES → Use /implement-design <figma-urls>
   └─ NO → Do you need a PRD?
      ├─ YES → Use /prd <requirements>
      └─ NO → Manually delegate to appropriate agents
```

## Command Comparison Table

| Feature | `/implement-linear` | `/implement-design` | `/prd` |
|---------|-------------------|-------------------|--------|
| Creates PRD | ✅ Yes (automatic) | ❌ No | ✅ Yes (only) |
| Fetches Linear ticket | ✅ Yes | ❌ No | ❌ No |
| Extracts Figma designs | ✅ Yes (if URLs in ticket) | ✅ Yes (required) | ❌ No |
| Implements code | ✅ Yes | ✅ Yes | ❌ No |
| Creates tests | ✅ Yes (auto) | ✅ Yes (auto) | ❌ No |
| Creates Storybook stories | ✅ Yes (auto) | ✅ Yes (auto) | ❌ No |
| Updates Linear ticket | ✅ Yes | ❌ No | ❌ No |
| **Use case** | End-to-end ticket completion | Figma → code | Planning/docs only |

## Tips

1. **Most common workflow**: `/implement-linear <ticket-id>` handles 90% of cases
2. **Figma-only work**: Use `/implement-design` when you have designs but no Linear ticket
3. **Planning phase**: Use `/prd` when you need documentation before building
4. **Manual control**: You can always manually delegate to specific agents if you need custom workflow

## Behind the Scenes

All commands use the agent orchestration system documented in `docs/agents/WORKFLOW_ORCHESTRATION.md`:
- Agents run in parallel when possible
- senior-frontend-engineer auto-delegates to testing agents
- Each agent specializes in specific tasks
- Maximum efficiency through parallel execution
