# Hero Banner Figma Update - PRD

## Document Information
- **Author**: Claude Code (AI Product Manager)
- **Date**: 2025-11-20
- **Status**: Draft
- **Version**: 1.0
- **Linear Ticket**: [FE-424](https://linear.app/issue/FE-424)
- **Assignee**: jimmy.ghelani@usmobile.com
- **Team**: FrontEnd
- **Priority**: P0 - Immediate (1-2 days)

## Executive Summary

This PRD outlines the requirements for updating the existing HeroSection component using design specifications extracted from a Figma design via the MCP (Model Context Protocol) integration. This work serves a dual purpose: (1) validating the MCP Figma integration in a real-world scenario, and (2) updating the hero banner with the latest design from the US Mobile design system. The updated component will maintain the existing component API while implementing the new visual design, ensuring pixel-perfect accuracy, responsive behavior, and comprehensive test coverage.

The implementation will leverage the project's MCP Figma wrapper to extract design context, assets, and specifications programmatically, demonstrating the context-efficient workflow pattern that achieves 98.7% context reduction in AI agent workflows.

## Problem Statement

### Current State
- The existing HeroSection component (`src/components/sections/HeroSection.tsx`) uses placeholder device illustrations (SVG graphics with emoji overlays)
- The current design may not align with the latest US Mobile brand guidelines and design system specifications in Figma
- The MCP Figma integration has been implemented but needs validation with a real-world component update workflow
- Manual design-to-code workflows are time-consuming and prone to specification mismatches

### Desired State
- An updated HeroSection component that matches the Figma design specifications exactly (node-id: 2171-13039)
- Design specifications are extracted programmatically via MCP Figma wrappers, validating the integration
- The component uses real assets from Figma when possible, or appropriate existing project assets as fallback
- The component maintains responsive behavior across all breakpoints (mobile, tablet, desktop)
- Comprehensive test coverage through Storybook stories and Vitest tests
- The implementation demonstrates the MCP pattern's value in reducing manual design handoff friction

### Why Now?
- **Technical Validation**: The MCP Figma integration infrastructure is in place and needs real-world validation (testing MCP connection is the primary business goal per Linear ticket FE-424)
- **Rapid Timeline**: P0 priority requires immediate completion (1-2 days) to prove the MCP workflow effectiveness
- **Foundation for Scale**: Success here establishes a proven pattern for future design-to-code workflows across the entire component library
- **Design System Alignment**: Ensures the hero banner reflects the latest brand guidelines captured in the Figma design system

## Goals & Success Metrics

### Primary Goals
1. **Validate MCP Figma Integration**: Successfully extract design context, specifications, and assets from Figma using the MCP wrapper (`mcp/servers/figma/`)
2. **Pixel-Perfect Implementation**: Update HeroSection component to match the Figma design specifications exactly (colors, spacing, typography, layout)
3. **Maintain Responsive Behavior**: Ensure the component works flawlessly across mobile (320px+), tablet (768px+), and desktop (1024px+) breakpoints
4. **Complete Test Coverage**: Implement comprehensive Storybook stories and Vitest tests for the updated component

### Success Metrics
- **MCP Extraction Success**: Design context successfully extracted from Figma node-id 2171-13039 using `figma.getDesignContext()`
- **Visual Accuracy**: Component matches Figma design specifications within 2px tolerance for spacing and exact matches for colors/typography
- **Responsive Quality**: Component renders correctly and passes visual review on mobile (375px), tablet (768px), and desktop (1440px) viewports
- **Test Coverage**:
  - Storybook stories cover all viewport sizes and component states
  - Vitest tests achieve 90%+ code coverage for the component
- **Code Quality**: Passes all linting and type checking with zero errors
- **Delivery Speed**: Implementation completed and merged within P0 timeline (1-2 days)

### Non-Goals
- Performance optimization beyond standard practices (this is not a performance-focused initiative)
- Accessibility improvements beyond maintaining current WCAG 2.1 AA compliance (no new accessibility features required)
- Creating multiple component variants or A/B testing infrastructure (replace existing component only)
- Implementing animation or motion design (unless explicitly specified in Figma design)
- Updating other section components (focused only on HeroSection)
- Manual asset export workflow (focus on programmatic extraction via MCP)

## User Stories & Use Cases

### Primary Personas
1. **Engineering Team Member (Primary)**: Developer implementing the component update and validating the MCP workflow
2. **Design Team Member (Secondary)**: Designer who created the Figma design and needs to verify implementation accuracy
3. **End User (Tertiary)**: Website visitor viewing the hero banner on the trade-in marketing page

### User Stories

#### For Engineering Team
- As a **frontend engineer**, I want to extract design specifications programmatically from Figma using MCP so that I can reduce manual design handoff time and specification errors
- As a **frontend engineer**, I want clear TypeScript types from the Figma extraction so that I can implement the component with type safety and IDE autocomplete
- As a **frontend engineer**, I want to reuse existing project images as fallback so that I can complete the implementation even if direct Figma asset extraction fails
- As a **frontend engineer**, I want comprehensive Storybook stories so that I can visually verify the component across all viewport sizes and states
- As a **frontend engineer**, I want Vitest tests so that I can ensure the component behavior remains stable across future changes

#### For Design Team
- As a **designer**, I want the implementation to match my Figma design exactly so that the brand guidelines are maintained consistently across the website
- As a **designer**, I want to see the component in Storybook so that I can review the implementation without needing to run the full application
- As a **designer**, I want the component to be responsive so that the design intent is preserved across all device sizes

#### For End User
- As a **website visitor**, I want to see an attractive hero banner that clearly communicates the trade-in value proposition so that I understand what US Mobile offers
- As a **website visitor**, I want the hero banner to load quickly and work on my mobile device so that I can access the information regardless of my device

### Use Cases

#### Use Case 1: Extract Design Context from Figma
**Actor**: Frontend Engineer
**Goal**: Extract design specifications from Figma using MCP wrapper
**Preconditions**:
- MCP Figma Desktop server is running and configured
- Figma URL is valid: `https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=2171-13039&m=dev`

**Flow**:
1. Engineer explores `mcp/servers/figma/` directory to discover available Figma tools
2. Engineer imports Figma wrapper: `import { figma } from './mcp'`
3. Engineer calls `figma.getDesignContext()` with node-id: '2171-13039', clientFrameworks: 'react', clientLanguages: 'typescript'
4. System returns design specifications including layout, colors, typography, spacing, and component structure
5. Engineer reviews the extracted data and identifies the key design elements for implementation
6. If asset extraction is needed, engineer calls `figma.getScreenshot()` or attempts direct asset extraction
7. On asset extraction failure, engineer documents the requirement and proceeds with existing project assets

**Postconditions**: Engineer has complete design specifications in TypeScript-typed format

#### Use Case 2: Implement Updated HeroSection Component
**Actor**: Frontend Engineer
**Goal**: Update the existing HeroSection component with Figma design specifications
**Preconditions**: Design context extracted from Figma

**Flow**:
1. Engineer opens `src/components/sections/HeroSection.tsx` for editing
2. Engineer analyzes the current component structure and identifies required changes
3. Engineer updates component JSX structure based on Figma layout specifications
4. Engineer updates `HeroSection.module.css` with extracted colors, spacing, and typography values
5. Engineer replaces placeholder device illustrations with real assets (from Figma or existing project assets)
6. Engineer ensures responsive behavior by implementing/updating media query breakpoints
7. Engineer tests component in dev server (`npm run dev`) across multiple viewport sizes
8. Engineer verifies visual accuracy against Figma design

**Postconditions**: HeroSection component matches Figma design specifications

#### Use Case 3: Create Storybook Stories
**Actor**: Frontend Engineer
**Goal**: Create comprehensive Storybook stories for the updated component
**Preconditions**: HeroSection component implementation is complete

**Flow**:
1. Engineer updates `src/components/sections/HeroSection.stories.tsx`
2. Engineer creates stories for different viewport sizes (mobile, tablet, desktop)
3. Engineer configures viewport addon to enable viewport switching in Storybook UI
4. Engineer adds args/controls if the component accepts props (button click handler, etc.)
5. Engineer adds interaction tests in play functions if applicable
6. Engineer runs Storybook (`npm run storybook`) and verifies all stories render correctly
7. Engineer shares Storybook with design team for visual review

**Postconditions**: Component is documented in Storybook with all variants

#### Use Case 4: Write Vitest Component Tests
**Actor**: Frontend Engineer
**Goal**: Write comprehensive Vitest tests for the updated component
**Preconditions**: HeroSection component implementation is complete

**Flow**:
1. Engineer updates `src/components/sections/HeroSection.test.tsx`
2. Engineer writes tests for component rendering (snapshot test or structure assertions)
3. Engineer writes tests for responsive behavior (CSS class applications, element visibility)
4. Engineer writes tests for user interactions (button click, hover states if applicable)
5. Engineer writes tests for accessibility (ARIA attributes, semantic HTML)
6. Engineer runs tests (`npm test`) and ensures all tests pass
7. Engineer reviews code coverage report to ensure 90%+ coverage

**Postconditions**: Component has comprehensive test coverage with all tests passing

## Requirements

### Functional Requirements

#### Must Have (P0)

**FR-1: Extract Figma Design Context**
- **Requirement**: Use MCP Figma wrapper to extract design context from node-id 2171-13039
- **Implementation**: Call `figma.getDesignContext({ nodeId: '2171-13039', clientFrameworks: 'react', clientLanguages: 'typescript' })`
- **Acceptance Criteria**:
  - MCP call successfully returns design context object
  - Design context includes layout structure, colors, typography, and spacing specifications
  - Design context is logged/documented for reference during implementation
  - Any errors or limitations in extraction are documented

**FR-2: Update HeroSection Component Structure**
- **Requirement**: Update the existing HeroSection component to match Figma design layout and structure
- **Implementation**: Modify `src/components/sections/HeroSection.tsx` based on extracted design specifications
- **Acceptance Criteria**:
  - Component JSX structure reflects Figma design layout (grid/flex, sections, element hierarchy)
  - Component maintains existing TypeScript typing and React best practices
  - Component exports remain consistent (named export HeroSection with displayName)
  - No breaking changes to component API (can be used as drop-in replacement)

**FR-3: Update Visual Styling**
- **Requirement**: Update component CSS to match Figma design specifications exactly
- **Implementation**: Modify `src/components/sections/HeroSection.module.css` with extracted design tokens
- **Acceptance Criteria**:
  - Colors match Figma specifications exactly (hex values, opacity)
  - Typography matches Figma specifications (font-size, font-weight, line-height, font-family)
  - Spacing matches Figma specifications within 2px tolerance (padding, margin, gap)
  - Layout properties match Figma design (grid columns, alignment, min/max widths)
  - Background colors, borders, and border-radius match Figma design

**FR-4: Asset Integration**
- **Requirement**: Replace placeholder device illustrations with appropriate images
- **Implementation**: Use existing project assets that fit the Figma design intent
- **Acceptance Criteria**:
  - Placeholder SVG devices are replaced with real images or appropriate existing assets
  - Images are optimized for web (appropriate format, compressed, responsive sizes)
  - Images have proper alt text for accessibility
  - Fallback behavior is implemented if images fail to load
  - Asset sources are documented in component comments or README

**FR-5: Responsive Behavior**
- **Requirement**: Component must be fully responsive across all breakpoints
- **Implementation**: Update CSS media queries to ensure proper responsive behavior
- **Acceptance Criteria**:
  - Component renders correctly on mobile (320px - 767px)
  - Component renders correctly on tablet (768px - 1023px)
  - Component renders correctly on desktop (1024px+)
  - Layout adjusts appropriately at each breakpoint (grid columns, font sizes, spacing)
  - No horizontal scrolling at any viewport size
  - Touch targets are at least 44x44px on mobile (buttons, interactive elements)

**FR-6: Storybook Documentation**
- **Requirement**: Update Storybook stories to document the updated component
- **Implementation**: Update `src/components/sections/HeroSection.stories.tsx`
- **Acceptance Criteria**:
  - At least one story exists showing the default component state
  - Stories include viewport configurations for mobile, tablet, and desktop views
  - Story documentation includes component description and usage notes
  - Storybook builds without errors (`npm run build-storybook`)
  - Stories are visually reviewed and approved by engineering team

**FR-7: Vitest Component Tests**
- **Requirement**: Update Vitest tests for the updated component
- **Implementation**: Update `src/components/sections/HeroSection.test.tsx`
- **Acceptance Criteria**:
  - Tests cover component rendering (component renders without errors)
  - Tests cover content verification (headline, subheading, CTA button are present)
  - Tests cover button interaction (onClick handler is called when button is clicked)
  - Tests cover accessibility (semantic HTML elements, ARIA attributes if applicable)
  - All tests pass (`npm run test:run`)
  - Code coverage is at least 90% for the component file

#### Should Have (P1)

**FR-8: Design System Token Extraction**
- **Requirement**: Extract and document design system tokens from Figma for future reuse
- **Implementation**: Call `figma.getVariableDefs()` if design uses Figma variables/tokens
- **Acceptance Criteria**:
  - Design tokens are extracted and documented (colors, typography, spacing)
  - Tokens are documented in a comment or separate file for future reference
  - Tokens are mapped to existing CSS custom properties if applicable

**FR-9: Screenshot Comparison**
- **Requirement**: Generate a screenshot of the implemented component for visual comparison
- **Implementation**: Use Figma screenshot API or Playwright to capture component screenshots
- **Acceptance Criteria**:
  - Screenshot of Figma design is captured using `figma.getScreenshot()`
  - Screenshot of implemented component is captured (via Playwright or Storybook)
  - Screenshots are placed side-by-side for manual visual comparison
  - Any visual discrepancies are documented and resolved

**FR-10: Code Quality and Best Practices**
- **Requirement**: Code follows project conventions and passes all quality checks
- **Implementation**: Run linting, formatting, and type checking
- **Acceptance Criteria**:
  - Code passes ESLint with zero errors (`npm run lint`)
  - Code is formatted with Prettier (`npm run format`)
  - Code passes TypeScript type checking (`npm run type-check`)
  - Component follows existing project patterns and conventions
  - CSS uses CSS Modules pattern consistently with existing components

#### Nice to Have (P2)

**FR-11: Visual Regression Testing**
- **Requirement**: Set up visual regression testing to catch unintended design changes
- **Implementation**: Use Storybook's visual testing addon or Playwright visual comparison
- **Acceptance Criteria**:
  - Visual regression test baseline is captured for the component
  - Tests can be run to detect visual changes in future updates
  - Process is documented for team usage

**FR-12: Performance Optimization**
- **Requirement**: Optimize component for performance (image loading, CSS efficiency)
- **Implementation**: Use lazy loading, optimized image formats, and efficient CSS
- **Acceptance Criteria**:
  - Images use modern formats (WebP with fallback) if applicable
  - Images implement lazy loading for below-the-fold content
  - CSS bundle size does not significantly increase
  - Component renders within 100ms on standard hardware

### Non-Functional Requirements

**NFR-1: Performance**
- Component must render in under 200ms on standard hardware (MacBook Pro 2019+, similar)
- Images must be optimized and compressed (under 200KB total for hero banner assets)
- No cumulative layout shift (CLS) during component load
- Component does not block rendering of other page content

**NFR-2: Accessibility**
- Component must maintain WCAG 2.1 AA compliance
- All interactive elements must be keyboard accessible (tab navigation, enter/space activation)
- Color contrast ratios must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Images must have descriptive alt text
- Semantic HTML elements must be used (section, h1, p, button)
- Component must work with screen readers (tested with VoiceOver or NVDA)

**NFR-3: Browser Compatibility**
- Component must work in Chrome (latest 2 versions)
- Component must work in Firefox (latest 2 versions)
- Component must work in Safari (latest 2 versions)
- Component must work in Edge (latest 2 versions)
- Component must gracefully degrade in older browsers (fallback fonts, basic layout)

**NFR-4: Maintainability**
- Code must follow existing project conventions and patterns
- Component must have clear comments explaining complex logic
- CSS must use CSS Modules pattern consistently
- TypeScript types must be explicit (no implicit any)
- Component must be easy to update with future design changes

**NFR-5: Testability**
- Component must be fully testable with Vitest and React Testing Library
- Component must render in Storybook isolation without errors
- Component must not depend on global state or context that makes testing difficult
- Test execution time must be under 1 second for all component tests

### Technical Requirements

**TR-1: MCP Figma Integration**
- Use MCP Figma wrapper from `mcp/servers/figma/` directory
- Import pattern: `import { figma } from './mcp'`
- Ensure Figma Desktop MCP server is running (HTTP transport on configured port)
- Handle MCP errors gracefully and document any extraction limitations
- Reference MCP documentation in `docs/mcp/` only when needed for debugging

**TR-2: Component Structure**
- Component file: `src/components/sections/HeroSection.tsx`
- Styles file: `src/components/sections/HeroSection.module.css`
- Stories file: `src/components/sections/HeroSection.stories.tsx`
- Tests file: `src/components/sections/HeroSection.test.tsx`
- Use `@/` import alias for all internal imports
- Follow existing section component patterns (FAQSection, HowItWorksSection)

**TR-3: TypeScript Configuration**
- Use project TypeScript configuration (`tsconfig.app.json` for app code)
- Enable strict mode (already enabled in project)
- Use explicit return types for component functions
- Use React.FC type for functional components (existing pattern in codebase)
- No `any` types except where absolutely necessary with explanation comment

**TR-4: Styling Approach**
- Use CSS Modules pattern (`.module.css` files)
- Follow BEM-like naming convention for CSS classes (existing pattern)
- Use CSS custom properties for reusable values (colors, spacing) if applicable
- Implement responsive breakpoints using media queries
- Avoid inline styles except for dynamic values

**TR-5: Testing Infrastructure**
- Use Vitest for unit/integration tests (existing setup in `src/test/setup.ts`)
- Use React Testing Library for component testing
- Use jest-dom matchers for assertions (enabled in setup)
- Use Storybook CSF3 format for stories
- Follow existing test patterns from other section components

**TR-6: Asset Management**
- Assets should be placed in `src/assets/` or `public/` directory
- Use appropriate image formats (SVG for icons, PNG/WebP for photos)
- Optimize all images before committing (use tools like ImageOptim, Squoosh)
- Document asset sources and licenses if using external assets
- Use existing project assets when Figma extraction fails

**TR-7: Build and Development**
- Component must work in development mode (`npm run dev`)
- Component must build successfully (`npm run build`)
- Component must work in Storybook (`npm run storybook`)
- All tests must pass (`npm run test:run`)
- No console errors or warnings in any environment

## User Experience

### User Flows

**Flow 1: Initial Page Load (End User)**
1. User navigates to the trade-in marketing page
2. Hero banner begins loading (HTML structure renders immediately)
3. CSS applies styling (no layout shift during load)
4. Images load progressively (lazy loading for below-the-fold if applicable)
5. User sees complete hero banner with headline, subheading, CTA, and device images
6. User can interact with CTA button immediately

**Flow 2: Responsive Behavior (End User on Mobile)**
1. User visits page on mobile device (375px viewport)
2. Hero banner renders in single-column mobile layout
3. Typography scales appropriately for mobile readability
4. Device images resize/reflow to fit mobile viewport
5. CTA button is appropriately sized for touch interaction (44x44px minimum)
6. User can scroll page without horizontal overflow

**Flow 3: Component Development (Engineer)**
1. Engineer makes changes to HeroSection component
2. Engineer saves file and sees hot-reload update in browser
3. Engineer opens Storybook to verify component in isolation
4. Engineer switches between viewport sizes in Storybook to test responsive behavior
5. Engineer runs Vitest tests to ensure no regressions
6. Engineer commits changes and opens pull request

### Wireframes/Mockups

The source of truth for the design is the Figma file:
- **URL**: https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=2171-13039&m=dev
- **Node ID**: 2171-13039

**Existing Component Structure (ASCII):**
```
┌─────────────────────────────────────────────────────────────┐
│                     HeroSection                              │
│  Background: #F4F8FF                                        │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐                    │
│  │   Content      │  │   Showcase     │                    │
│  │                │  │                │                    │
│  │  Headline      │  │   Device Grid  │                    │
│  │  Subheading    │  │   [📱][⌚]     │                    │
│  │  [CTA Button]  │  │   [  ][💻]     │                    │
│  │                │  │                │                    │
│  └────────────────┘  └────────────────┘                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Updated Component Structure (will be determined from Figma extraction):**
- Layout, colors, typography, spacing, and assets will match Figma node 2171-13039
- Responsive breakpoints will be implemented based on Figma responsive design specifications
- Asset replacement will maintain similar visual hierarchy and intent

### Interactions & Behaviors

**Button Interaction:**
- CTA button ("Check trade in value") has hover state (visual feedback)
- Button has active/pressed state for user feedback
- Button has focus state for keyboard navigation (visible outline)
- Button onClick triggers navigation or action (existing behavior maintained)

**Responsive Behavior:**
- Desktop (1024px+): Two-column grid layout with content left, showcase right
- Tablet (768px - 1023px): Two-column layout with adjusted spacing and font sizes
- Mobile (< 768px): Single-column stack with content above showcase
- Font sizes scale appropriately at each breakpoint
- Spacing reduces proportionally on smaller screens

**Device Showcase Hover (if applicable):**
- If Figma design includes hover states for device images, implement subtle scale/transform
- Maintain existing hover behavior: `transform: scale(1.05)` with transition

**Loading Behavior:**
- HTML structure renders immediately (no layout shift)
- CSS applies synchronously (no flash of unstyled content)
- Images load progressively with appropriate loading indicators or blur-up effect
- Fallback behavior if images fail to load (alt text, placeholder color)

## Edge Cases & Error Handling

**EC-1: Figma MCP Connection Failure**
- **Scenario**: MCP Figma server is not running or connection fails
- **Handling**: Document the error, use existing Figma design documentation/screenshots to implement manually, proceed with implementation
- **Mitigation**: Verify MCP Figma server is running before starting implementation, consult `docs/mcp/setup/` if connection issues occur

**EC-2: Design Context Extraction Incomplete**
- **Scenario**: `figma.getDesignContext()` returns partial or missing specifications
- **Handling**: Extract what is available, document gaps, fill gaps by manual inspection of Figma design in Figma Desktop app
- **Mitigation**: Cross-reference extracted data with visual inspection of Figma design, use `figma.getScreenshot()` for visual reference

**EC-3: Asset Extraction Failure**
- **Scenario**: Unable to extract images/assets directly from Figma via MCP
- **Handling**: Use existing project assets that fit the design intent (per requirements), document which assets were substituted
- **Mitigation**: Identify appropriate existing assets from `src/assets/` or `public/` directories, maintain visual hierarchy and intent

**EC-4: Responsive Breakpoint Edge Cases**
- **Scenario**: Component layout breaks at specific viewport widths (between breakpoints)
- **Handling**: Add additional media queries to handle edge cases, test thoroughly across viewport range
- **Mitigation**: Test component at multiple viewport widths (not just defined breakpoints), use browser dev tools responsive mode

**EC-5: Long Content / Dynamic Text**
- **Scenario**: Headline or subheading text is longer than Figma design example, causing layout issues
- **Handling**: Implement text truncation or multi-line handling with appropriate max-width constraints
- **Mitigation**: Test component with longer text variations in Storybook stories

**EC-6: Image Loading Failure**
- **Scenario**: Device showcase images fail to load (network error, missing file)
- **Handling**: Display alt text, fallback color/placeholder, log error to console
- **Mitigation**: Implement error boundary or image onError handler, test with throttled/offline network

**EC-7: Accessibility Tool Warnings**
- **Scenario**: Automated accessibility testing tools flag issues (color contrast, missing ARIA)
- **Handling**: Fix issues immediately, re-test with accessibility tools until no errors
- **Mitigation**: Run axe-core or Lighthouse accessibility audit during development

**EC-8: Browser Compatibility Issues**
- **Scenario**: Component renders incorrectly in specific browser (Safari, Firefox)
- **Handling**: Add browser-specific CSS fixes, test fallback behavior in older browsers
- **Mitigation**: Test component in all target browsers during development, use autoprefixer for CSS

## Dependencies

### Internal Dependencies

**Code Dependencies:**
- Existing Button component (`src/components/ui/Button`)
- CSS Modules configuration (Vite)
- TypeScript configuration (`tsconfig.app.json`)
- Vitest test setup (`src/test/setup.ts`)
- Storybook configuration (`.storybook/main.ts`)

**Infrastructure Dependencies:**
- MCP Figma Desktop server (must be running and configured)
- MCP client infrastructure (`mcp/mcp-client.ts`)
- Figma wrapper implementations (`mcp/servers/figma/`)
- Node.js environment with all project dependencies installed

**Process Dependencies:**
- Figma design must be accessible via provided URL (requires Figma account/permissions)
- Development environment must be set up (npm dependencies installed, `.env` configured if needed)
- Git branch must be created for implementation (per Git workflow)

### External Dependencies

**Design Assets:**
- Figma design at node-id 2171-13039 (source of truth)
- Existing project assets for fallback (`src/assets/`, `public/`)

**Third-Party Services:**
- Figma Desktop app (for MCP server connection)
- Figma API (accessed via MCP server)

**Development Tools:**
- Node.js v18+ (project requirement)
- npm (package manager)
- Figma Desktop application (for MCP Figma server)

### Blockers and Risks

**Risk-1: MCP Figma Server Connectivity Issues**
- **Impact**: Cannot extract design programmatically, falls back to manual implementation
- **Likelihood**: Low (MCP infrastructure is reported working)
- **Mitigation**: Verify MCP Figma server connection before starting, consult `docs/mcp/setup/FIGMA_MCP_SUCCESS.md` for troubleshooting

**Risk-2: Design Specifications Ambiguity**
- **Impact**: Implementation may not match designer's intent, requires iteration
- **Likelihood**: Medium (common in design-to-code workflows)
- **Mitigation**: Extract as much data as possible from Figma, cross-reference with visual inspection, document assumptions

**Risk-3: Asset Quality/Format Issues**
- **Impact**: Images may not be optimized or in correct format for web
- **Likelihood**: Medium (if using existing project assets as fallback)
- **Mitigation**: Optimize all images before committing, use appropriate formats (WebP with fallback), compress files

**Risk-4: Tight Timeline (P0 - 1-2 days)**
- **Impact**: May not have time for extensive iteration or edge case handling
- **Likelihood**: Medium (depends on design complexity and issues encountered)
- **Mitigation**: Focus on must-have requirements (P0) first, document nice-to-have items for future work, parallelize testing work if possible

## Timeline & Milestones

### Phase 1: Discovery & Extraction (4 hours)
- **Duration**: 4 hours (Day 1 morning)
- **Deliverables**:
  - Figma design context extracted via MCP (`figma.getDesignContext()`)
  - Design specifications documented (colors, typography, spacing, layout)
  - Assets identified (Figma assets or existing project assets selected)
  - Implementation plan confirmed based on extracted specifications

### Phase 2: Implementation (8 hours)
- **Duration**: 8 hours (Day 1 afternoon + Day 2 morning)
- **Deliverables**:
  - HeroSection.tsx updated with new component structure
  - HeroSection.module.css updated with Figma design specifications
  - Assets integrated (images replaced, optimized)
  - Component renders correctly in dev server across all breakpoints
  - Visual accuracy verified against Figma design

### Phase 3: Testing & Documentation (4 hours)
- **Duration**: 4 hours (Day 2 afternoon)
- **Deliverables**:
  - Storybook stories updated with viewport variants
  - Vitest tests updated with comprehensive coverage (90%+)
  - All tests passing (`npm run test:run`)
  - Code quality checks passing (lint, format, type-check)
  - Component reviewed in Storybook for visual accuracy

### Phase 4: Review & Merge (2 hours)
- **Duration**: 2 hours (Day 2 evening)
- **Deliverables**:
  - Pull request created with clear description and screenshots
  - Code review completed (self-review or peer review)
  - CI/CD checks passing (tests, build, lint)
  - Merged to main branch
  - Linear ticket FE-424 updated to "Done" status

**Total Estimated Time**: 18 hours (2.25 business days)
**Target Completion**: Within P0 timeline (1-2 days)

## Implementation Approach

### Step 1: Environment Setup
1. Ensure MCP Figma Desktop server is running (verify with test script)
2. Create feature branch: `git checkout -b feat/hero-banner-figma-update`
3. Verify development environment: `npm run dev` works without errors

### Step 2: Figma Design Extraction
1. Explore `mcp/servers/figma/` directory to understand available tools
2. Create extraction script or use interactive Node.js session:
   ```typescript
   import { figma } from './mcp';
   const designContext = await figma.getDesignContext({
     nodeId: '2171-13039',
     clientFrameworks: 'react',
     clientLanguages: 'typescript'
   });
   console.log(JSON.stringify(designContext, null, 2));
   ```
3. Document extracted specifications in implementation notes or comments
4. Attempt `figma.getScreenshot()` for visual reference
5. Identify assets needed and select appropriate existing project assets

### Step 3: Component Implementation
1. Read existing HeroSection component to understand current structure
2. Update JSX structure in `HeroSection.tsx` based on Figma layout
3. Update CSS in `HeroSection.module.css` with extracted design tokens:
   - Colors (hex values from Figma)
   - Typography (font-size, font-weight, line-height)
   - Spacing (padding, margin, gap)
   - Layout (grid columns, alignment)
4. Replace placeholder SVG devices with real images
5. Ensure responsive media queries are updated for all breakpoints
6. Test in dev server at multiple viewport sizes

### Step 4: Visual Verification
1. Compare implemented component with Figma design side-by-side
2. Use browser dev tools to inspect spacing, colors, typography
3. Verify pixel-perfect accuracy (within 2px tolerance)
4. Document any intentional deviations from Figma design

### Step 5: Storybook Stories
1. Update `HeroSection.stories.tsx` with CSF3 format
2. Create default story showing component in standard state
3. Add viewport configurations for mobile, tablet, desktop
4. Add story documentation and usage notes
5. Run Storybook and verify all stories render correctly

### Step 6: Vitest Tests
1. Update `HeroSection.test.tsx` with comprehensive test cases
2. Test component rendering (snapshot or structure assertions)
3. Test content verification (headline, subheading, button present)
4. Test button interaction (onClick handler called)
5. Test accessibility (semantic HTML, ARIA attributes)
6. Run tests and verify 90%+ coverage

### Step 7: Code Quality
1. Run linting: `npm run lint` (fix any errors)
2. Run formatting: `npm run format`
3. Run type checking: `npm run type-check`
4. Run full test suite: `npm run test:run`
5. Run production build: `npm run build`

### Step 8: Review and Merge
1. Create pull request with clear description
2. Add screenshots comparing Figma design and implementation
3. Add notes about MCP extraction experience (successes, challenges)
4. Request review or self-review if authorized
5. Merge to main branch after approval and CI/CD passes
6. Update Linear ticket FE-424 to "Done" status with completion notes

## Open Questions

1. **Figma Design Specifics**: Are there any known issues or limitations with the Figma design at node-id 2171-13039 that should be addressed during implementation?

2. **Asset Export Permissions**: If Figma asset extraction fails, who should be contacted to manually export assets, or is using existing project assets sufficient?

3. **Design Token Reusability**: Should extracted design tokens (colors, typography) be added to a global design system file for reuse across other components, or is that out of scope for this ticket?

4. **Performance Budget**: Are there specific performance budgets (load time, image size) that must be met for the hero banner, or are standard practices sufficient?

5. **Analytics/Tracking**: Should the CTA button include analytics tracking (event logging), or is that handled elsewhere in the application?

6. **Deployment Timeline**: After merge to main, when will this be deployed to production? Are there any deployment dependencies or coordination required?

7. **Design Review Process**: Who from the design team should review the implementation in Storybook, or is engineering review sufficient?

8. **MCP Documentation**: Should the MCP extraction experience and learnings be documented in `docs/mcp/` for future team reference?

## Appendix

### Research & References

**Project Documentation:**
- `/Users/ghelanijimmy/repos/demo-claude-code/CLAUDE.md` - Project overview and conventions
- `/Users/ghelanijimmy/repos/demo-claude-code/mcp/README.md` - MCP architecture documentation
- `/Users/ghelanijimmy/repos/demo-claude-code/docs/mcp/setup/FIGMA_MCP_SUCCESS.md` - Figma MCP setup guide

**External References:**
- [Anthropic MCP Documentation](https://www.anthropic.com/engineering/code-execution-with-mcp) - Code execution with MCP pattern
- [Figma Design URL](https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=2171-13039&m=dev) - Source design
- Linear Ticket FE-424 - Original ticket requirements

**Technical References:**
- Vite Documentation - Build tool configuration
- React Testing Library - Component testing patterns
- Storybook CSF3 Format - Story documentation format

### Revision History

| Version | Date       | Author               | Changes                              |
|---------|------------|----------------------|--------------------------------------|
| 1.0     | 2025-11-20 | Claude Code (AI PM)  | Initial PRD draft based on discovery |

---

**PRD Status**: Draft - Ready for Review
**Next Steps**: Review and approve PRD, begin implementation Phase 1 (Discovery & Extraction)
