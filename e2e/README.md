# E2E Tests - Business Page

Comprehensive end-to-end tests for the US Mobile Business Page implementation using Playwright.

## Overview

This test suite covers the complete Business Page implementation including:
- **BusinessPageHeader** - Fixed sticky navigation with logo, menu, sign in, and CTA
- **BusinessPageHero** - Hero section with background image and overlays
- **FAQAccordion** - Interactive FAQ section with expand/collapse functionality
- **BusinessPageFooter** - Footer with links and social icons

## Quick Start

### Install Dependencies

Playwright is already included in `package.json`. If not installed, run:

```bash
npm install
```

### Run Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Debug tests (opens browser for debugging)
npm run test:e2e:debug

# View HTML report after tests
npm run test:e2e:report
```

## Test Suite Structure

### 1. Header Navigation Tests
Tests for the sticky header navigation bar:
- Verify header is sticky and remains visible while scrolling
- Test navigation links are clickable and have correct hrefs
- Test "GET STARTED" CTA button functionality
- Test SIGN IN link
- Test icon buttons (chat and shopping bag) with ARIA labels
- Verify header responsive design on mobile (375px), tablet (768px)

### 2. Hero Section Tests
Tests for the hero section:
- Verify hero section visibility and sizing
- Check background image loads correctly
- Verify title and subtitle are readable
- Test responsive sizing across viewports (mobile, tablet, desktop)
- Validate overlay effects

### 3. FAQ Accordion Tests
Tests for the interactive FAQ component:
- Verify all FAQ questions are visible
- Test expanding/collapsing functionality
- Verify single item expansion behavior
- Test keyboard navigation (Enter/Tab keys)
- Test chevron rotation animation
- Verify ARIA attributes (aria-expanded, aria-controls)
- Test responsive layout (single column on mobile)

### 4. Footer Tests
Tests for the footer section:
- Verify all footer links are present and clickable
- Test social media icon links open in new tab
- Check copyright year is current
- Verify footer links have correct hrefs
- Test responsive footer layout across viewports

### 5. Full Page Flow Tests
End-to-end journey tests:
- Complete user journey from top to bottom
- Test page scrolling and content visibility
- Verify all major sections are accessible
- Multi-viewport testing (mobile, tablet, desktop)

### 6. Accessibility Tests
Tests for accessibility compliance:
- Keyboard navigation throughout page
- Focus indicators visibility
- ARIA labels on interactive elements
- Semantic HTML structure
- Tab key navigation
- Color contrast (sampling)
- Link distinguishability

### 7. Visual Regression Tests
Tests for visual design consistency:
- Header design specifications
- Hero section visual design
- FAQ accordion styling
- Footer layout and spacing
- Consistent spacing and alignment

## Test Helpers

### Page Helpers (`helpers/page-helpers.ts`)

Common utility functions for test operations:

```typescript
// Scrolling
await scrollToElement(page, 'selector');
await scrollByPixels(page, 500);
await scrollToTop(page);
await scrollToBottom(page);

// Element interaction
await clickWithRetry(page, 'selector');
await waitForElementClickable(page, 'selector');
await typeWithDelay(page, 'selector', 'text');

// Screenshots
await takeNamedScreenshot(page, 'screenshot-name');

// Styling
await getElementStyles(page, 'selector', ['color', 'padding']);
await isElementSticky(page, 'selector');
await getElementDimensions(page, 'selector');

// Viewport
await setViewport(page, 375, 812);
await isElementInViewport(page, 'selector');

// ARIA & Accessibility
await hasAriaAttribute(page, 'selector', 'aria-expanded');
await getAriaAttribute(page, 'selector', 'aria-label');
```

### Test Utilities (`helpers/test-utils.ts`)

Common assertion helpers and test data:

```typescript
// Assertions
await expectElementVisible(page, 'selector');
await expectElementHasText(page, 'selector', 'text');
await expectElementAttribute(page, 'selector', 'attr', 'value');

// Utilities
await countElements(page, 'selector');
await getElementsText(page, 'selector');
await waitForElement(page, 'selector');
await isElementDisabled(page, 'selector');

// Test data
businessPageTestData.header.navLinks
businessPageTestData.faq.sampleQuestions
businessPageTestData.viewports
```

## File Structure

```
e2e/
├── README.md                          # This file
├── business-page.e2e.ts              # Main test suite
├── helpers/
│   ├── page-helpers.ts               # Page interaction utilities
│   └── test-utils.ts                 # Assertion helpers & test data
└── screenshots/                       # Generated screenshots
```

## Viewport Testing

Tests run across multiple viewports to ensure responsive design:

```typescript
// Mobile (iPhone-like)
375px × 812px

// Tablet
768px × 1024px

// Desktop
1440px × 900px
```

## Screenshots

Screenshots are automatically generated during test execution:
- Saved to `e2e/screenshots/` directory
- Named with timestamp for easy identification
- Captured on test failures and at key test points
- Useful for visual regression tracking

Example screenshot names:
- `header-sticky-2025-11-23T10-30-45-123Z.png`
- `hero-section-visible-2025-11-23T10-30-50-456Z.png`
- `faq-item-expanded-2025-11-23T10-30-55-789Z.png`

## Debugging

### Interactive Testing (UI Mode)

```bash
npm run test:e2e:ui
```

Opens Playwright's interactive test runner where you can:
- Run individual tests
- Pause test execution
- Step through interactions
- Inspect elements
- View snapshots

### Debug Mode

```bash
npm run test:e2e:debug
```

Opens a browser with debugger attached:
- Pause on breakpoints
- Step through test code
- Inspect page state
- View network activity

### View HTML Report

```bash
npm run test:e2e:report
```

Opens detailed HTML report with:
- Test results and timings
- Screenshots on failure
- Video recordings (if enabled)
- Trace files for debugging

## Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
```typescript
// Base URL
baseURL: 'http://localhost:3000'

// Screenshot and video capture
screenshot: 'only-on-failure'
video: 'retain-on-failure'
trace: 'on-first-retry'

// Retries (CI: 2, local: 0)
retries: process.env.CI ? 2 : 0

// Browsers tested
- Chromium
- Firefox
- WebKit
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

// Dev server auto-start
webServer auto-starts npm run dev
```

## Test Coverage

### Components Tested
- BusinessPageHeader (all responsive variants)
- BusinessPageHero (all viewports)
- FAQAccordion (all interactions)
- BusinessPageFooter (all links)

### Test Categories
- 7 Header tests
- 7 Hero tests
- 8 FAQ tests
- 8 Footer tests
- 3 Full page flow tests
- 6 Accessibility tests
- 5 Visual regression tests

**Total: 44 test cases**

### Browsers
- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

## Running Specific Tests

```bash
# Run only header tests
npm run test:e2e -- --grep "Header Navigation"

# Run only FAQ tests
npm run test:e2e -- --grep "FAQ Accordion"

# Run only mobile tests
npm run test:e2e -- --project "Mobile Chrome"

# Run specific test file
npm run test:e2e -- business-page.e2e.ts
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Best Practices

1. **Use Page Helpers**: Leverage helper functions for common operations
2. **Meaningful Selectors**: Use semantic selectors (aria-label, role) over CSS
3. **Wait Properly**: Use `waitForLoadState()` and `waitFor()` instead of fixed delays
4. **Take Screenshots**: Capture key states for visual regression
5. **Test User Flows**: Focus on user interactions, not implementation details
6. **Accessibility First**: Include ARIA and keyboard navigation tests
7. **Responsive Testing**: Always test across mobile, tablet, and desktop
8. **Error Handling**: Retry logic for flaky elements

## Troubleshooting

### Tests timeout
- Increase timeout in specific test: `test.setTimeout(30000)`
- Check if dev server is running on port 3000
- Verify network connectivity

### Screenshots not saving
- Ensure `e2e/screenshots/` directory exists
- Check write permissions
- Verify path is correct

### Element not found
- Verify selector is correct
- Check if element is visible/enabled
- Use `--debug` mode to inspect

### Mobile tests failing
- Verify viewport size is set correctly
- Check responsive CSS is applied
- Test on actual mobile device if possible

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Testing Best Practices](https://playwright.dev/docs/best-practices)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Contributing

When adding new tests:
1. Follow existing test structure
2. Use helper functions for common operations
3. Include accessibility tests
4. Test multiple viewports
5. Add descriptive test names
6. Take screenshots at key points
7. Update this README with new test coverage
