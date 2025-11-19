# US Mobile Trade In Landing Page

## Project Summary

A production-ready landing page built with React, TypeScript, and Vite following enterprise-grade patterns and best practices.

## File Structure

```
src/
├── theme/
│   └── tokens.ts                     # Design tokens (colors, typography, spacing)
├── components/
│   ├── ui/                           # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── IconButton.tsx
│   │   ├── IconButton.module.css
│   │   └── index.ts
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── Footer.tsx
│   │   ├── Footer.module.css
│   │   └── index.ts
│   ├── shared/                       # Shared business components
│   │   ├── StepCard.tsx
│   │   ├── StepCard.module.css
│   │   ├── FAQCard.tsx
│   │   ├── FAQCard.module.css
│   │   └── index.ts
│   └── sections/                     # Page sections
│       ├── HeroSection.tsx
│       ├── HeroSection.module.css
│       ├── HowItWorksSection.tsx
│       ├── HowItWorksSection.module.css
│       ├── FAQSection.tsx
│       ├── FAQSection.module.css
│       └── index.ts
├── pages/
│   ├── TradeInLandingPage.tsx        # Main landing page
│   ├── TradeInLandingPage.module.css
│   └── index.ts
├── App.tsx                           # App entry point
├── App.css
├── index.css                         # Global styles
└── main.tsx                          # React DOM root
```

## Component Architecture

### Design Tokens (`src/theme/tokens.ts`)
Centralized design system tokens including:
- **Colors**: Brand colors, text colors, backgrounds, borders
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (4px - 88px)
- **Dimensions**: Component-specific measurements
- **Transitions**: Animation timing functions

### UI Components (`src/components/ui/`)

#### Button
- **Variants**: primary, secondary, text
- **Sizes**: sm, md, lg
- **Features**: Full TypeScript support, accessible, hover/focus states
- **Props**: variant, size, disabled, fullWidth, onClick, children

#### IconButton
- **Features**: 35x35px size, badge support, accessible
- **Props**: icon, aria-label, badgeCount, badgeContent

### Layout Components (`src/components/layout/`)

#### Header
- Fixed positioning (60px height)
- Logo, navigation menu, action buttons
- Responsive (hides navigation on tablet/mobile)
- Max-width: 1440px

#### Footer
- Footer links and social media icons
- Responsive two-column to single-column layout
- 60px min-height

### Shared Components (`src/components/shared/`)

#### StepCard
- Displays process steps with icon, title, description
- 311px width, center-aligned
- 140x140px icon container
- **Props**: stepNumber, title, description, icon

#### FAQCard
- Collapsible accordion card
- Smooth height transition animation
- Accessible keyboard navigation
- **Props**: question, answer, defaultExpanded

### Section Components (`src/components/sections/`)

#### HeroSection
- Two-column layout (content + device showcase)
- Background: #F4F8FF
- Responsive grid that stacks on mobile
- Main CTA button

#### HowItWorksSection
- 3-step cards with 88px gap
- Video placeholder with play button
- Fully responsive layout

#### FAQSection
- Two-column FAQ accordion
- Light gradient background
- CTA at bottom
- Automatically splits FAQs into balanced columns

### Pages (`src/pages/`)

#### TradeInLandingPage
- Composition of all sections
- Proper semantic structure (Header, Main, Footer)
- Accounts for fixed header spacing

## Design Implementation

### Colors
- Brand Blue: `#1D5FF6`
- Text colors: Primary (#000000), Secondary (#3C434D), Tertiary (#586271)
- Backgrounds: White (#FFFFFF), Light Blue (#F4F8FF), Card Blue (#F4F7FF)
- Borders: Light (#E1E3E6)

### Typography
- Font: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- Display: 56px/700 (hero headline)
- H2: 32px/700 (section headings)
- H3: 24px/600 (subsections)
- Body: 18px/400 (descriptions)
- Small: 12px uppercase (nav/footer)

### Spacing Scale
- 4, 8, 16, 24, 32, 48, 64, 80, 88px
- Step cards gap: 88px
- Section padding: 80px vertical

### Responsive Breakpoints
- Desktop: 1440px (max-width)
- Tablet: 1024px
- Mobile: 768px
- Min: 320px

## Accessibility Features

1. **Semantic HTML**: Proper use of header, main, section, article, nav tags
2. **ARIA Labels**: All interactive elements have proper labels
3. **Keyboard Navigation**: All interactive elements are keyboard accessible
4. **Focus Indicators**: Clear focus states with outline
5. **Screen Reader Support**: Proper heading hierarchy, alt text
6. **Reduced Motion**: Respects prefers-reduced-motion preference

## Performance Optimizations

1. **CSS Modules**: Component-scoped styles prevent conflicts
2. **Lazy Loading**: Images can be lazy loaded (foundation ready)
3. **Minimal Re-renders**: Proper React patterns
4. **No External Dependencies**: Pure React implementation
5. **Tree-shaking Ready**: ES modules with barrel exports
6. **Optimized Transitions**: GPU-accelerated transforms

## Code Quality

1. **TypeScript**: Full type safety with interfaces
2. **Component Composition**: DRY principles, reusable components
3. **CSS Architecture**: Modular, maintainable, BEM-inspired naming
4. **Accessibility First**: WCAG 2.1 compliant
5. **Documentation**: JSDoc comments on all components
6. **Consistent Patterns**: Barrel exports, predictable structure

## Usage

### Development
```bash
npm run dev
```
Visit http://localhost:5173

### Build
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Format
```bash
npm run format
```

### Lint
```bash
npm run lint
```

### Storybook
```bash
npm run storybook
```

## Next Steps for Storybook

Create stories for the following components:

1. **UI Components**
   - `Button.stories.tsx`: All variants and sizes
   - `IconButton.stories.tsx`: With/without badge

2. **Shared Components**
   - `StepCard.stories.tsx`: Different icons and content
   - `FAQCard.stories.tsx`: Expanded/collapsed states

3. **Layout Components**
   - `Header.stories.tsx`: Desktop/mobile views
   - `Footer.stories.tsx`: Full footer with links

4. **Section Components**
   - `HeroSection.stories.tsx`: Hero with different content
   - `HowItWorksSection.stories.tsx`: Process steps
   - `FAQSection.stories.tsx`: FAQ grid

5. **Pages**
   - `TradeInLandingPage.stories.tsx`: Full page composition

## Testing Recommendations

1. **Unit Tests**: Test component logic and rendering
2. **Integration Tests**: Test section compositions
3. **Accessibility Tests**: Use @storybook/addon-a11y
4. **Visual Regression**: Screenshot testing with Chromatic
5. **Interaction Tests**: Test FAQ expand/collapse, button clicks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Real Images**: Replace placeholder device images
2. **Video Integration**: Add actual trade-in demo video
3. **Form Integration**: Add device value checker form
4. **Animation Library**: Add Framer Motion for advanced animations
5. **Image Optimization**: Add next/image-style optimization
6. **Analytics**: Track user interactions
7. **i18n**: Internationalization support
8. **Dark Mode**: Add dark mode support

## Files Created

### Core Application (28 files)

**Design System:**
- `/src/theme/tokens.ts`

**UI Components:**
- `/src/components/ui/Button.tsx`
- `/src/components/ui/Button.module.css`
- `/src/components/ui/IconButton.tsx`
- `/src/components/ui/IconButton.module.css`
- `/src/components/ui/index.ts`

**Layout Components:**
- `/src/components/layout/Header.tsx`
- `/src/components/layout/Header.module.css`
- `/src/components/layout/Footer.tsx`
- `/src/components/layout/Footer.module.css`
- `/src/components/layout/index.ts`

**Shared Components:**
- `/src/components/shared/StepCard.tsx`
- `/src/components/shared/StepCard.module.css`
- `/src/components/shared/FAQCard.tsx`
- `/src/components/shared/FAQCard.module.css`
- `/src/components/shared/index.ts`

**Section Components:**
- `/src/components/sections/HeroSection.tsx`
- `/src/components/sections/HeroSection.module.css`
- `/src/components/sections/HowItWorksSection.tsx`
- `/src/components/sections/HowItWorksSection.module.css`
- `/src/components/sections/FAQSection.tsx`
- `/src/components/sections/FAQSection.module.css`
- `/src/components/sections/index.ts`

**Pages:**
- `/src/pages/TradeInLandingPage.tsx`
- `/src/pages/TradeInLandingPage.module.css`
- `/src/pages/index.ts`

**App Files (Modified):**
- `/src/App.tsx` (updated)
- `/src/App.css` (updated)
- `/src/index.css` (updated)

## Architecture Decisions

### Why CSS Modules?
- Scoped styles prevent conflicts
- Co-located with components
- No runtime overhead
- TypeScript support available
- Standard Vite support

### Why Barrel Exports?
- Clean import paths
- Easy to refactor
- Tree-shaking friendly
- Consistent pattern

### Why Functional Components?
- Modern React pattern
- Hooks support
- Better performance
- Simpler mental model

### Why TypeScript Interfaces?
- Self-documenting code
- Catch errors at compile time
- Better IDE support
- Maintainability

## Component Reusability

All components are designed to be:
1. **Composable**: Can be combined to create new UIs
2. **Configurable**: Props-driven behavior
3. **Extensible**: className prop for customization
4. **Testable**: Pure functions, predictable output
5. **Documented**: Clear prop types and JSDoc

## Maintenance Guidelines

1. **Adding New Components**: Follow existing patterns in respective directories
2. **Styling**: Use CSS Modules, follow BEM-inspired naming
3. **Types**: Always define interfaces for props
4. **Exports**: Add to barrel exports (index.ts)
5. **Documentation**: Add JSDoc comments
6. **Accessibility**: Test with keyboard, screen readers
7. **Responsive**: Mobile-first approach

---

Built with best practices for production-ready React applications.
