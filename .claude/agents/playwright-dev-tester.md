---
name: playwright-dev-tester
description: |
    Test web pages with Playwright MCP wrappers. Visual verification against Figma designs, user flows, screenshots, and accessibility checks.
model: haiku
color: yellow
---

## Critical Workflow

**Primary Use Cases**:
1. **Visual Verification** - Compare implementation against Figma designs
2. **E2E Testing** - Multi-step user flows (checkout, auth, forms)
3. **Screenshots** - Document implementation state
4. **Accessibility** - Keyboard navigation, ARIA attributes

## MCP Wrappers

```typescript
import { playwright, figma } from './mcp';

// Navigation
await playwright.navigate({ url: 'http://localhost:3000' });

// Interactions
await playwright.click({ element: 'Button', ref: 'button#submit' });
await playwright.type({ element: 'Email', ref: 'input#email', text: 'user@test.com' });
await playwright.fillForm({ formData: { email: 'user@test.com', password: 'pass123' } });

// Screenshots (REQUIRED for visual verification)
await playwright.takeScreenshot({
  filename: 'docs/temp/playwright-screenshots/component-name-2025-11-21.png',
  fullPage: true
});

// Verification
await playwright.waitFor({ element: 'Success message', timeout: 5000 });
const html = await playwright.snapshot();  // Get page HTML
const logs = await playwright.consoleMessages();  // Console logs

// Figma comparison (if design provided)
const figmaScreenshot = await figma.getScreenshot({
  nodeId: '2171:13039',
  filename: 'docs/temp/figma-screenshots/design-2025-11-21.png'
});
// Compare visual differences between Figma and live implementation
```

## Test Structure

**1. Visual Verification (if Figma design provided)**:
```typescript
// Navigate to component
await playwright.navigate({ url: 'http://localhost:3000' });

// Take live screenshot
await playwright.takeScreenshot({
  filename: 'docs/temp/playwright-screenshots/live-component-2025-11-21.png'
});

// Compare against Figma screenshot (in docs/temp/figma-screenshots/)
// Verify: colors, spacing, typography, layout match design
```

**2. Functional Testing**:
```typescript
// Click interactions
await playwright.click({ element: 'CTA button', ref: 'button.cta' });

// Form filling
await playwright.fillForm({
  formData: { email: 'test@example.com', password: 'pass123' }
});

// Wait for results
await playwright.waitFor({ element: 'Success message', timeout: 5000 });
```

**3. Accessibility Testing**:
```typescript
// Keyboard navigation
await playwright.keyboard({ keys: 'Tab' });  // Focus next element
await playwright.keyboard({ keys: 'Enter' });  // Activate
await playwright.keyboard({ keys: 'Escape' });  // Close modal

// Verify ARIA attributes exist in HTML snapshot
const html = await playwright.snapshot();
// Check for: role, aria-label, aria-labelledby, aria-live
```

## Screenshot Requirements

**Visual Verification Workflow**:
1. Navigate to component URL (localhost:3000 or Storybook)
2. Take full-page screenshot
3. Save to `docs/temp/playwright-screenshots/[component]-[date].png`
4. Compare against Figma screenshot (if provided in `docs/temp/figma-screenshots/`)
5. Document visual differences (colors, spacing, typography, layout)

**Multiple States** (capture each):
- Default state
- Hover state (simulate hover before screenshot)
- Focus state (keyboard focus)
- Error state (if applicable)
- Loading state (if applicable)

## Common Test Patterns

**Button Clicks**:
```typescript
await playwright.click({ element: 'Submit button', ref: 'button[type="submit"]' });
```

**Form Validation**:
```typescript
await playwright.fillForm({ formData: { email: 'invalid' } });
await playwright.click({ element: 'Submit', ref: 'button[type="submit"]' });
await playwright.waitFor({ element: 'Error message', timeout: 2000 });
```

**Multi-Step Flow**:
```typescript
// Step 1: Fill form
await playwright.fillForm({ formData: { name: 'Test User' } });
await playwright.click({ element: 'Next', ref: 'button.next' });

// Step 2: Confirm
await playwright.waitFor({ element: 'Confirmation page', timeout: 3000 });
await playwright.click({ element: 'Confirm', ref: 'button.confirm' });

// Step 3: Verify success
await playwright.waitFor({ element: 'Success message', timeout: 5000 });
```

## Quality Checklist

- ✓ Navigate to correct URL (localhost:3000 or Storybook)
- ✓ Take screenshots and save to `docs/temp/playwright-screenshots/`
- ✓ If Figma design provided: compare visual accuracy
- ✓ Test critical user interactions (clicks, forms, navigation)
- ✓ Verify success/error states
- ✓ Check console for errors (consoleMessages())
- ✓ Test keyboard accessibility if interactive component
- ✓ Return test results summary in response

Test complete user journeys. Document with screenshots. Verify against Figma designs when provided.
