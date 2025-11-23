# E2E Tests - Quick Start

Fast setup and execution guide for E2E tests.

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Terminal 1: Start dev server
npm run dev

# 3. Terminal 2: Run tests
npm run test:e2e
```

That's it! Tests will run automatically.

## Common Commands

```bash
# Run all tests
npm run test:e2e

# Run with interactive UI
npm run test:e2e:ui

# Debug in browser
npm run test:e2e:debug

# View results
npm run test:e2e:report
```

## Run Specific Tests

```bash
# Header tests only
npm run test:e2e -- --grep "Header"

# FAQ tests only
npm run test:e2e -- --grep "FAQ"

# Mobile only
npm run test:e2e -- --project "Mobile Chrome"

# Desktop only
npm run test:e2e -- --project chromium
```

## Test Files

- **business-page.e2e.ts** - Main tests (44 tests)
  - Header, Hero, FAQ, Footer
  - Accessibility & visual regression

- **responsive-design.e2e.ts** - Responsive tests (22 tests)
  - Mobile (375px), Tablet (768px), Desktop (1440px)
  - Orientation changes & edge cases

- **user-interactions.e2e.ts** - User flow tests (32 tests)
  - Click, scroll, keyboard, hover interactions
  - Focus management & navigation

## Troubleshooting

### Port Already in Use
```bash
# Kill existing process on port 3000
kill $(lsof -ti:3000) 2>/dev/null

# Then run dev server again
npm run dev
```

### Tests Won't Start
```bash
# Install Playwright browsers
npx playwright install

# Try running tests again
npm run test:e2e
```

### Debug a Failing Test
```bash
# Open interactive UI to see what failed
npm run test:e2e:ui

# Or debug in browser
npm run test:e2e:debug
```

## Directory Structure

```
e2e/
├── business-page.e2e.ts         # Main component tests
├── responsive-design.e2e.ts     # Responsive design tests
├── user-interactions.e2e.ts     # User interaction tests
├── helpers/
│   ├── page-helpers.ts          # Scroll, click, screenshot utilities
│   └── test-utils.ts            # Assertions & test data
└── screenshots/                 # Generated screenshots
```

## What Gets Tested

### Business Page Components
- **Header** - Sticky nav, links, CTA button, icons
- **Hero** - Title, subtitle, background image
- **FAQ** - Expand/collapse, keyboard nav, animations
- **Footer** - Links, social icons, copyright

### Viewports
- Mobile (375px × 812px)
- Tablet (768px × 1024px)
- Desktop (1440px × 900px)

### Interaction Types
- Clicking elements
- Scrolling page
- Keyboard navigation (Tab, Enter, Arrows)
- Hover states
- Focus management

### Accessibility
- ARIA attributes (aria-expanded, aria-label, aria-controls)
- Keyboard navigation
- Focus indicators
- Semantic HTML
- Color contrast

## Test Statistics

| Category | Count |
|----------|-------|
| Total Tests | 98 |
| Header Tests | 7 |
| Hero Tests | 7 |
| FAQ Tests | 8 |
| Footer Tests | 8 |
| Full Page Flow | 3 |
| Accessibility | 6 |
| Visual Regression | 5 |
| Responsive Design | 22 |
| User Interactions | 32 |

## Next Steps

1. Read full guide: `E2E_TEST_GUIDE.md`
2. Read test docs: `e2e/README.md`
3. Explore test files: `e2e/business-page.e2e.ts`
4. Check helpers: `e2e/helpers/page-helpers.ts`

## Tips

- Use `npm run test:e2e:ui` for interactive debugging
- Screenshots are saved to `e2e/screenshots/` on each test
- HTML report shows full results after tests complete
- Tests run in parallel by default (faster!)
- Most tests take 2-5 minutes to complete

## Support

If you hit issues:
1. Check `E2E_TEST_GUIDE.md` troubleshooting section
2. Review `e2e/README.md` for detailed docs
3. Check test output for specific error messages
4. Run in debug mode: `npm run test:e2e:debug`
5. View results: `npm run test:e2e:report`
