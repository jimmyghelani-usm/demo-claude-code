# Orchestrator Operations Reference

Available operations for `orchestrator` agent tasks. Use `op: <operation>` in workflow YAML.

## Linear Operations

### fetch_linear
Fetch Linear ticket and extract metadata.

```yaml
op: fetch_linear
in: {ticketId: "ENG-123"}
out: linearIssue
```

Returns:
```typescript
{
  id: string,
  title: string,
  description: string,
  labels: string[],
  assignee: string,
  figmaUrls: string[]  // auto-extracted from description
}
```

### update_linear
Update Linear ticket status and add comment.

```yaml
op: update_linear
in: {
  id: "ENG-123",
  status: "Done",
  comment: "Implementation complete..."
}
out: updated
```

---

## Data Analysis Operations

### analyze
Analyze discovered data to determine workflow path.

```yaml
op: analyze
in: {issue: "$from.linearIssue"}
out: context
```

Returns:
```typescript
{
  hasFigma: boolean,
  components: number,
  complexity: "low" | "medium" | "high"
}
```

### parse
Parse Figma URLs or analyze provided data.

```yaml
op: parse
in: {urls: "{{p.urls}}"}
out: context
```

---

## Command Execution Operations

### cmd
Execute shell commands.

```yaml
op: cmd
in: {cmds: ["npm run type-check", "npm run test:run"]}
out: typeRes
```

Returns:
```typescript
{
  exitCode: number,
  stdout: string,
  stderr: string,
  success: boolean
}
```

Common commands:
- `npm run type-check` - TypeScript type checking
- `npm run test:run` - Run all tests once
- `npm run lint` - Check code quality
- `npm run format` - Format code

---

## Component Operations

### mount
Mount React components in App.tsx.

```yaml
op: mount
in: {comps: "$from.impls"}
out: mounted
```

Input format:
```typescript
[
  {
    componentName: "HeroSection",
    filePath: "src/components/sections/HeroSection.tsx",
    exportPath: "src/components/sections/index.ts"
  }
]
```

Returns:
```typescript
{
  success: boolean,
  appTsxPath: string,
  importsAdded: number,
  componentsRendered: number
}
```

---

## Cleanup Operations

### cleanup
Delete temporary files created during workflow.

```yaml
op: cleanup
in: {patterns: ["mcp/tests/temp-*", "docs/project/*-spec*.md"]}
out: cleaned
```

Common patterns:
- `mcp/tests/temp-*` - Temporary MCP test scripts
- `mcp/tests/test-*` - Test files
- `docs/project/*-spec*.md` - Design specification files
- `docs/project/*-design-spec*.md` - Design specs

Returns:
```typescript
{
  filesDeleted: number,
  patterns: string[],
  totalSize: number  // bytes
}
```

---

## Error Handling

Each operation returns status:

```typescript
{
  status: "success" | "error",
  error?: string,  // Only if status === "error"
  data: any
}
```

Use error recovery in YAML:

```yaml
tasks:
  - id: cleanup
    op: cleanup
    error: skip  # Skip if cleanup fails
```

Options:
- `skip` - Continue to next task
- `retry` - Retry up to 2 times
- `halt` - Stop entire workflow

---

## Example Workflows Using Operations

### Linear → Implementation Workflow

```yaml
phases:
  - id: discover
    tasks:
      - id: fetch
        op: fetch_linear
        in: {ticketId: "{{p.ticketId}}"}
        out: linearIssue

      - id: analyze
        op: analyze
        in: {issue: "$from.linearIssue"}
        out: context

  # ... design analysis phase (agent delegation) ...

  - id: verify
    tasks:
      - id: type
        op: cmd
        in: {cmds: ["npm run type-check"]}
        out: typeRes

      - id: test
        op: cmd
        in: {cmds: ["npm run test:run"]}
        out: testRes

  - id: integrate
    tasks:
      - id: mount
        op: mount
        in: {comps: "$from.impls"}
        out: mounted

  - id: cleanup
    error: skip
    tasks:
      - id: clean
        op: cleanup
        in: {patterns: ["mcp/tests/temp-*"]}
        out: cleaned

  - id: done
    tasks:
      - id: update
        op: update_linear
        in: {id: "$from.linearIssue.id", status: "Done", msg: "✅ Complete"}
        out: updated
```

---

## Performance Notes

- `fetch_linear`: ~2 seconds
- `analyze`: ~1 second
- `cmd` (type-check): ~5-10 seconds
- `cmd` (test-run): ~10-30 seconds
- `mount`: ~2 seconds
- `cleanup`: <1 second

Total workflow: 20-50 seconds (excluding agent execution)

---

## Troubleshooting

### fetch_linear fails
- Check LINEAR_API_KEY in .env
- Verify ticket ID format (e.g., ENG-123)
- Check Linear server is accessible

### cmd fails
- Verify command is installed (e.g., npm, tsc)
- Check working directory
- Review stderr for specific error

### mount fails
- Verify component exports are correct
- Check App.tsx is valid React
- Ensure src/App.tsx exists

### cleanup fails with error: skip
- Patterns may not match any files (OK - still succeeds)
- Permission denied (check file permissions)
