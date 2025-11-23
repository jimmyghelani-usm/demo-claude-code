# Figma Chunking Quick Reference

## TL;DR

When working with large Figma designs, use `get-figma-chunked.ts` to automatically fetch, size, and recommend chunking.

## Quick Start

```bash
# Fetch a design
npx tsx mcp/tests/get-figma-chunked.ts "https://www.figma.com/design/...?node-id=2172-13308"

# Or use just the node ID
npx tsx mcp/tests/get-figma-chunked.ts "2172:13308"

# Results saved to: docs/temp/figma-chunks/design-*.json
```

## What Happens

✅ **Small designs (< 5 MB):**
- Fetches successfully
- Saved to `docs/temp/figma-chunks/design-{nodeId}.json`
- Ready to use

⚠️ **Large designs (> 5 MB):**
- Fetched successfully
- Size warning displayed
- Chunking recommendations shown
- Can be chunked manually following the guide

## Chunking Strategy (If Needed)

For designs > 5 MB:

```typescript
// 1. Get the design (already done with get-figma-chunked.ts)
const design = await figma.getDesignContext({ nodeId: '2172:13308' });

// 2. Extract child node IDs
const childNodeIds = design.layers
  .filter(layer => layer.type === 'COMPONENT')
  .map(layer => layer.id);
// Result: ['2172:13309', '2172:13310', ...]

// 3. Fetch each child separately (parallel)
const chunks = await Promise.all(
  childNodeIds.map(nodeId =>
    figma.getDesignContext({ nodeId })
  )
);

// 4. Save chunks
chunks.forEach((chunk, i) => {
  fs.writeFileSync(
    `docs/temp/figma-chunks/chunk-${i}.json`,
    JSON.stringify({ nodeId: childNodeIds[i], data: chunk }, null, 2)
  );
});

// 5. Process each chunk independently
chunks.forEach(chunk => {
  const components = extractComponentSpecs(chunk.layers);
  // ... implement component
});
```

## Complete Guides

- **Detailed Strategy**: `docs/mcp/setup/FIGMA_CHUNKING_STRATEGY.md`
- **Implementation Details**: `docs/mcp/setup/FIGMA_CHUNKING_IMPLEMENTATION.md`

## File Organization

```
docs/temp/figma-chunks/          # Temporary chunk storage
├── design-2172-13308.json       # Full design (if < 5 MB)
├── chunk-2172-13309.json        # Child component 1
├── chunk-2172-13310.json        # Child component 2
└── chunk-metadata.json          # Optional: chunk index
```

## When to Use

✅ **Use get-figma-chunked.ts when:**
- Fetching a Figma design for the first time
- Unsure if design will fit in context
- Need to know exact size before proceeding
- Want automatic chunking recommendations

✅ **Use chunking strategy when:**
- Design is > 5 MB
- Need to process components independently
- Agent context is limited
- Want parallel component implementation

## Common Commands

```bash
# Fetch and analyze
npx tsx mcp/tests/get-figma-chunked.ts "<figma-url>"

# Fetch specific component (use node ID)
npx tsx mcp/tests/get-figma-chunked.ts "2172:13308"

# Custom framework/language
npx tsx mcp/tests/get-figma-chunked.ts "2172:13308" "vue" "javascript"

# View saved chunk
cat docs/temp/figma-chunks/design-2172-13308.json | jq '.layers[0]'

# List all chunks
ls -lh docs/temp/figma-chunks/

# Clean up chunks
rm -rf docs/temp/figma-chunks/
```

## Integration with Agents

### MCP Execution Agent
1. Calls `get-figma-chunked.ts` to fetch design
2. If > 5 MB, follows chunking strategy
3. Saves chunks to `docs/temp/figma-chunks/`
4. Returns chunk file paths

### Figma Design Analyzer
1. Receives chunk file path
2. Loads JSON from `docs/temp/figma-chunks/`
3. Extracts component specifications
4. Outputs implementation specs

### Senior Frontend Engineer
1. Receives component specs
2. Implements components
3. Combines if needed

## Troubleshooting

**Q: Design fetch times out**
A: Design is large. Use chunking strategy to fetch components separately.

**Q: JSON is too large to parse**
A: Don't load full design in memory. Process chunks separately, write to files.

**Q: API rate limit exceeded**
A: Reduce parallel requests, add delay between chunk fetches.

**Q: Not sure which node IDs are children**
A: Load the full design, check `layers` array for objects with `type === 'COMPONENT'`.

## Performance Tips

- ✅ Save chunks to disk immediately (don't keep in memory)
- ✅ Process chunks in parallel (they're independent)
- ✅ Load chunk files one at a time when combining
- ✅ Cache chunk results (don't re-fetch)
- ✅ Remove `docs/temp/figma-chunks/` after implementation

## See Also

- `get-figma-details.ts` - Basic Figma fetching (without chunking)
- `get-figma-chunked.ts` - This tool with auto-chunking
- `docs/mcp/setup/FIGMA_CHUNKING_STRATEGY.md` - Complete guide
- `.claude/agents/mcp-execution-agent.md` - How agents use this
