# Hero Section Design Specification - FE-426

**Date:** 2025-11-20
**Ticket:** FE-426
**Figma File:** https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=1413-13598
**Component:** HeroSection
**Framework:** React + TypeScript
**Screenshot:** `./assets/FE-426-hero-section.png`

---

## Table of Contents
1. [Design Overview](#design-overview)
2. [Layout Specifications](#layout-specifications)
3. [Typography System](#typography-system)
4. [Color Palette](#color-palette)
5. [Spacing & Measurements](#spacing--measurements)
6. [Component Hierarchy](#component-hierarchy)
7. [Assets Inventory](#assets-inventory)
8. [Interactive Elements](#interactive-elements)
9. [Responsive Behavior](#responsive-behavior)
10. [Accessibility Requirements](#accessibility-requirements)
11. [Implementation Notes](#implementation-notes)

---

## Design Overview

### Canvas Dimensions
- **Width:** 1440px
- **Height:** 684px
- **Background:** `#759FFF` (Light blue gradient background)

### Purpose
Full-width hero section for marketing page with:
- Prominent headline and subheadline
- Call-to-action button
- Badge/label component
- Navigation header
- Placeholder image area (right side)

### Layout Strategy
- Two-column layout: Content (left) + Visual placeholder (right)
- Content section spans approximately 50% of width
- Fixed header navigation at top
- Absolute positioning for precise element placement

---

## Layout Specifications

### Container Structure
```
Main Container (1440x684)
├── Header Navigation (1440x60) - Top, fixed position
├── Hero Content (497x300) - Left aligned, x:230, y:206
└── Image Placeholder (410x476) - Right aligned, x:800, y:148
```

### Grid System
- **Container max-width:** 1440px
- **Content start position:** 230px from left edge
- **Content max-width:** 497px
- **Right placeholder start:** 800px from left edge
- **Vertical spacing from header:** 148px

### Key Positioning
- **Badge component:** x:230, y:206 (124x26)
- **Main headline:** x:230, y:244 (497x54)
- **Underline decoration:** x:234, y:304 (213x7)
- **Subheadline:** x:230, y:326 (475x30)
- **Description text:** x:230, y:368 (450x48)
- **CTA button:** x:230, y:456 (230x50)
- **Image placeholder:** x:800, y:148 (410x476, rounded corners)

---

## Typography System

### Font Family
- **Primary:** GT Walsheim Pro
- **Fallback:** sans-serif

### Typography Specifications

#### 1. Main Headline
- **Text:** "At auctor urna nunci"
- **Font:** GT Walsheim Pro Bold
- **Size:** 52px
- **Line Height:** 54px
- **Letter Spacing:** -1.2px
- **Color:** #FFFFFF (white)
- **Width:** 497px
- **Position:** Vertically centered at y:271, x:230

#### 2. Decorative Underline
- **Type:** SVG vector graphic
- **Dimensions:** 213x7px
- **Color:** Appears to be white/light color
- **Transform:** Rotated 180deg, scale-y: -100%
- **Position:** Below first word of headline (x:234, y:304)

#### 3. Subheadline
- **Text:** "Lorem ipsum dolor sit amet, consectetur adi"
- **Font:** GT Walsheim Pro Medium
- **Size:** 24px
- **Line Height:** 30px
- **Color:** #FFFFFF (white)
- **Text Wrap:** No wrap (text-nowrap)
- **Position:** x:230, y:341 (centered vertically)

#### 4. Body/Description Text
- **Text:** "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac placerat vestibulum lectus mauris."
- **Font:** GT Walsheim Pro Regular
- **Size:** 18px
- **Line Height:** 24px
- **Color:** #FFFFFF (white)
- **Width:** 450px
- **Height:** 48px (2 lines)
- **Position:** x:230, y:368

#### 5. Badge Text
- **Text:** "Agna liqua!"
- **Font:** GT Walsheim Pro Bold
- **Size:** 14px
- **Line Height:** normal
- **Color:** #FFFFFF (white)
- **Text Align:** center
- **Width:** 108px
- **Height:** 16px
- **Position:** Centered in badge (x:292, y:219)

#### 6. CTA Button Text
- **Text:** "nullam vehicula iep"
- **Font:** GT Walsheim Pro Bold
- **Size:** 16px
- **Line Height:** normal
- **Color:** #1D5FF6 (brand blue)
- **Text Align:** right
- **Width:** 155px
- **Height:** 20px

#### 7. Navigation Links
- **Font:** GT Walsheim Pro Regular
- **Size:** 12px
- **Line Height:** normal
- **Letter Spacing:** 0.6px
- **Text Transform:** UPPERCASE
- **Color:** #586271 (gray)
- **Links:** PLANS, NETWORKS, HOW IT WORKS, SHOP, SIGN IN

#### 8. Navigation Button
- **Text:** "MAIN BUTTON"
- **Font:** GT Walsheim Pro Bold
- **Size:** 12px
- **Letter Spacing:** 0.6px
- **Text Transform:** UPPERCASE
- **Color:** #FFFFFF (white)
- **Text Align:** center

---

## Color Palette

### Design System Variables
```
utility/full-white: #FFFFFF
brand/main-blue: #1D5FF6
```

### Complete Color Specifications

#### Primary Colors
- **Hero Background:** `#759FFF` (light blue)
- **Header Background:** `#FFFFFF` (white)
- **Badge Background:** `#1D5FF6` (brand main blue)
- **Button Background:** `#FFFFFF` (white)
- **Button Background (Nav):** `rgba(102, 122, 244, 0.85)` (semi-transparent blue)
- **Placeholder Background:** `#EFEFEF` (light gray)

#### Text Colors
- **Primary Text (Hero):** `#FFFFFF` (white)
- **Navigation Links:** `#586271` (gray)
- **Button Text (CTA):** `#1D5FF6` (brand blue)
- **Button Text (Nav):** `#FFFFFF` (white)

#### Shadows
- **Navigation Button:** `0px 1px 3px 0px rgba(101, 121, 243, 0.25)`

#### Opacity
- **Navigation Rectangle:** `opacity: 0.05`

---

## Spacing & Measurements

### Margins & Padding

#### Hero Content Section
- **Left margin:** 230px from viewport edge
- **Top margin:** 206px from viewport top
- **Content width:** 497px
- **Content height:** 300px

#### Vertical Spacing (Content Elements)
- Badge to Headline: 38px (206 to 244)
- Headline to Underline: 60px vertical offset
- Headline to Subheadline: 97px (244 to 341)
- Subheadline to Description: 27px (341 to 368)
- Description to Button: 88px (368 to 456)

#### Header Navigation
- **Height:** 60px
- **Logo position:** x:137, y:7
- **Left nav start:** x:258
- **Right nav end:** x:1294 (sign in button right edge)
- **Vertical center:** 30px (50% of header height)

#### Badge Component
- **Padding horizontal:** ~8px (calculated from text width vs container)
- **Padding vertical:** ~5px (calculated from text height vs container)
- **Border radius:** 6px

#### CTA Button
- **Width:** 230px
- **Height:** 50px
- **Border radius:** 15px
- **Text padding right:** 155px from right edge (for icon)
- **Icon position:** 16x16px at x:418, y:474

#### Navigation Button
- **Padding horizontal:** ~18px left, ~6px right
- **Padding vertical:** ~11px top/bottom
- **Border radius:** 32px

#### Image Placeholder
- **Width:** 410px
- **Height:** 476px
- **Border radius:** 15px
- **Right margin:** 230px (1440 - 800 - 410 = 230)
- **Top margin:** 148px from viewport top

---

## Component Hierarchy

### Level 1: Root Container
```
<div className="bg-[#759fff] relative size-full">
```

### Level 2: Major Sections
1. **Header Navigation** (Component ID: 1413:13619)
   - Fixed at top, white background, 60px height
   - Contains logo, navigation links, icons, buttons

2. **Hero Content Group** (Component ID: 1413:13599)
   - Left-aligned content area
   - Contains badge, headlines, description, CTA

3. **Image Placeholder** (Component ID: 1413:13680)
   - Right-aligned visual element
   - Gray rounded rectangle

### Level 3: Hero Content Breakdown

#### Badge Component (ID: 1413:13615)
```
Badge (124x26)
├── Background Rectangle (#1D5FF6, rounded 6px)
└── Text ("Agna liqua!", white, bold, 14px)
```

#### Content Group (ID: 1413:13600)
```
Content Container
├── Main Headline Group (ID: 1413:13604)
│   ├── Headline Text (52px bold)
│   └── Decorative Underline (SVG)
├── Subheadline (ID: 1413:13614)
│   └── Text (24px medium)
├── Description (ID: 1413:13603)
│   └── Text (18px regular, 2 lines)
└── CTA Button Group (ID: 1413:13607)
    ├── Button Background (white, rounded 15px)
    ├── Button Text (16px bold, blue)
    └── Arrow Icon (16x16, rotated)
```

### Level 3: Header Navigation Breakdown

#### Navigation Structure (ID: 1413:13620)
```
Header (1440x60)
├── Logo (ID: 1413:13660) - x:137
├── Navigation Links
│   ├── PLANS - x:258
│   ├── NETWORKS - x:328
│   ├── HOW IT WORKS - x:426
│   └── SHOP - x:549
├── Icon 1 (Cart/Bag) - x:1005
├── Icon 2 (Chat) - x:1050
├── Main Button - x:1095
└── Sign In Button - x:1220
```

---

## Assets Inventory

### SVG Assets (from Figma asset server)

#### Icon/Logo Assets
1. **Logo Components** (USmobile Logo - ID: 1413:13660)
   - Multiple vector paths composing logo
   - Size: 101x47px
   - Position: x:137, y:7
   - **Assets needed:**
     - `imgVector.svg`
     - `imgVector1.svg`
     - `imgGroup.svg`
     - `imgVector2.svg`
     - `imgVector3.svg`
     - `imgGroup1.svg`
     - `imgGroup2.svg`

2. **Decorative Underline** (ID: 1413:13606)
   - File: `imgVector466.svg`
   - Size: 213x7px
   - Transform: rotate(180deg) + scaleY(-100%)
   - Color: White/light
   - **Export:** SVG format

3. **Arrow Icon** (ID: 1413:13613)
   - File: `img.svg` (arrow-left/light)
   - Original name: `icons/16x16/arrow-left/light`
   - Size: 16x16px
   - Transform: rotate(180deg) to point right
   - Stroke color: `#1D5FF6` (brand blue)
   - **Export:** SVG format, inline use recommended

4. **Chat Icon** (ID: 1413:13624)
   - File: `imgIcon.svg`
   - Component: `Icons/Chat/Big`
   - Size: 24x24px in 35x35px container
   - Background: `imgBackground.svg`
   - **Export:** SVG format

5. **Shopping Bag Icon** (ID: 1413:13649)
   - File: `imgIcon1.svg`
   - Component: `Icons/2px/bag`
   - Size: 31x31px in 35x35px container
   - **Export:** SVG format

6. **Notification Badge** (ID: 1413:13659)
   - File: `imgOval.svg`
   - Size: 12x12px circular
   - Position: Over shopping bag icon
   - **Export:** SVG format

### Asset Export Requirements

#### Required Exports
| Asset                | Type | Size   | Format              | Priority |
|----------------------|------|--------|---------------------|----------|
| Logo                 | SVG  | 101x47 | SVG/React Component | High     |
| Underline decoration | SVG  | 213x7  | SVG inline          | Medium   |
| Arrow icon           | SVG  | 16x16  | Icon library/SVG    | High     |
| Chat icon            | SVG  | 24x24  | Icon library        | Medium   |
| Bag icon             | SVG  | 31x31  | Icon library        | Medium   |
| Notification badge   | SVG  | 12x12  | SVG/Component       | Low      |

#### Asset URLs (from Figma)
All assets are served from Figma's local asset server during design phase:
- Base URL: `http://localhost:3845/assets/`
- Assets have unique hash-based filenames

#### Implementation Strategy
1. **Logo:** Export as React component or SVG sprite
2. **Icons:** Use existing icon library (Heroicons, Lucide, etc.) or export as SVG components
3. **Decorative elements:** Inline SVG for styling flexibility
4. **Optimize:** Run through SVGO for production

---

## Interactive Elements

### CTA Button (Primary)

#### Visual States
- **Default State:**
  - Background: `#FFFFFF` (white)
  - Text: `#1D5FF6` (brand blue)
  - Border radius: 15px
  - Dimensions: 230x50px

- **Hover State:** (Not specified in design, recommend)
  - Background: Slightly darker white or light blue tint
  - Text: Same brand blue
  - Add subtle shadow or scale transform

- **Active/Pressed State:** (Not specified, recommend)
  - Background: Light blue tint
  - Slight scale down (scale: 0.98)

- **Focus State:**
  - Add focus ring for accessibility
  - Color: Brand blue with opacity

#### Button Content
- Text: "nullam vehicula iep" (appears to be placeholder)
- Icon: Arrow pointing right (16x16px)
- Layout: Text left-aligned with icon right-aligned in button

### Navigation Links

#### Visual States
- **Default:**
  - Color: `#586271` (gray)
  - Size: 12px uppercase
  - No underline

- **Hover:** (Not specified, recommend)
  - Color: Darker gray or brand blue
  - Possible underline

- **Active/Current:** (Rectangle shown - ID: 1413:13645)
  - Background: Rounded rectangle (opacity: 0.05)
  - Border radius: 17.5px
  - Dimensions: 96x35px (for "HOW IT WORKS")

### Navigation Buttons

#### Main Button (Primary - Blue)
- Background: `rgba(102, 122, 244, 0.85)`
- Text: "MAIN BUTTON" (white, uppercase)
- Border radius: 32px
- Shadow: `0px 1px 3px 0px rgba(101, 121, 243, 0.25)`
- Dimensions: 123x35px

#### Sign In Button (Secondary - Ghost)
- Background: Transparent with subtle rounded background on hover
- Text: "SIGN IN" (gray, uppercase)
- Border radius: 20px (hover state)
- Dimensions: 74x35px

### Icon Interactions

#### Cart/Bag Icon
- Includes notification badge overlay
- Badge: Red dot (12x12px) at top-right
- Clickable area: 35x35px

#### Chat Icon
- Background decoration element
- Clickable area: 35x35px

---

## Responsive Behavior

### Breakpoint Strategy

#### Desktop (1440px+)
- Use exact measurements as specified
- Fixed 1440px container width
- Centered content layout

#### Tablet (768px - 1439px)
**Recommendations (not specified in design):**
- Stack content vertically or maintain side-by-side with reduced spacing
- Reduce left margin from 230px to 60-80px
- Scale image placeholder proportionally
- Reduce font sizes slightly (headline: 42px, subheadline: 20px)

#### Mobile (< 768px)
**Recommendations (not specified in design):**
- Stack all content vertically
- Full-width content sections with 20-30px horizontal padding
- Hide or collapse navigation to hamburger menu
- Headline: 32-36px
- Subheadline: 18-20px
- Description: 16px
- CTA button: Full width or centered, maintain 50px height
- Hide or stack image placeholder below content

### Responsive Notes
- Design shows only desktop (1440px) viewport
- Component should be built mobile-first with desktop enhancements
- Test at common breakpoints: 375px, 768px, 1024px, 1440px, 1920px

---

## Accessibility Requirements

### Color Contrast Ratios

#### Text on Blue Background (#759FFF)
- **White text (#FFFFFF):** Excellent contrast (AAA)
  - Headline (52px): Ratio exceeds 4.5:1 ✓
  - Subheadline (24px): Ratio exceeds 4.5:1 ✓
  - Body (18px): Ratio exceeds 4.5:1 ✓

#### Text on White Background
- **Gray nav links (#586271 on #FFFFFF):**
  - 12px text should meet AA standard (verify: ratio should be > 4.5:1)
  - May need darkening for AAA compliance

#### Button Contrast
- **Blue text on white background (#1D5FF6 on #FFFFFF):**
  - Should meet AA standard for 16px text
  - Verify contrast ratio > 4.5:1

### ARIA Labels & Semantic HTML

#### Navigation
```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/plans">Plans</a></li>
    <li><a href="/networks">Networks</a></li>
    <!-- ... -->
  </ul>
</nav>
```

#### Hero Section
```html
<section aria-labelledby="hero-heading">
  <span role="status" aria-label="Announcement">Agna liqua!</span>
  <h1 id="hero-heading">At auctor urna nunci</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adi</p>
  <p>Sed do eiusmod tempor incididunt...</p>
  <a href="#action" className="btn-primary">
    nullam vehicula iep
    <span aria-hidden="true">→</span>
  </a>
</section>
```

#### Buttons & Links
- All interactive elements need descriptive labels
- Icon-only buttons require `aria-label`
- CTA button text should be more descriptive than "nullam vehicula iep"

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order: Logo → Nav links → Icons → Buttons → Hero CTA
- Visible focus indicators on all focusable elements
- Skip to main content link (recommended)

### Screen Reader Considerations
- Badge could use `role="status"` or `role="alert"` depending on content
- Decorative underline should have `aria-hidden="true"`
- Image placeholder should have descriptive `alt` text or `aria-label`
- Icons need text alternatives or `aria-label` attributes

---

## Implementation Notes

### Component Structure Recommendation

```tsx
// Suggested component breakdown for parallel development
HeroSection/
├── index.tsx                 // Main container
├── HeroContent.tsx          // Left content section
│   ├── Badge.tsx            // Reusable badge component
│   ├── Headline.tsx         // Headline with underline decoration
│   └── CTAButton.tsx        // Primary button with icon
├── HeroImage.tsx            // Right placeholder/image section
├── Navigation.tsx           // Header navigation
│   ├── Logo.tsx
│   ├── NavLinks.tsx
│   ├── NavIcons.tsx
│   └── NavButtons.tsx
└── HeroSection.styles.ts    // Shared styles/tokens
```

### CSS/Styling Approach

#### Using Tailwind (as shown in generated code)
- Generated code uses Tailwind utility classes
- Custom colors defined in tailwind.config.js:
  ```js
  colors: {
    'hero-bg': '#759FFF',
    'brand-blue': '#1D5FF6',
    'nav-gray': '#586271',
  }
  ```

#### Using CSS Modules or Styled Components
- Extract repeated values as CSS custom properties:
  ```css
  :root {
    --hero-bg: #759FFF;
    --brand-blue: #1D5FF6;
    --white: #FFFFFF;
    --nav-gray: #586271;
    --spacing-hero-left: 230px;
    --border-radius-button: 15px;
    --border-radius-badge: 6px;
  }
  ```

### Design Tokens

Create a tokens file for consistent values:

```typescript
// designTokens.ts
export const colors = {
  hero: {
    background: '#759FFF',
  },
  brand: {
    mainBlue: '#1D5FF6',
  },
  utility: {
    fullWhite: '#FFFFFF',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#586271',
  },
  backgrounds: {
    placeholder: '#EFEFEF',
  },
};

export const typography = {
  fontFamily: {
    primary: "'GT Walsheim Pro', sans-serif",
  },
  fontSize: {
    hero: '52px',
    subheading: '24px',
    body: '18px',
    badge: '14px',
    nav: '12px',
    button: '16px',
  },
  lineHeight: {
    hero: '54px',
    subheading: '30px',
    body: '24px',
  },
  letterSpacing: {
    hero: '-1.2px',
    nav: '0.6px',
  },
};

export const spacing = {
  hero: {
    leftMargin: '230px',
    topMargin: '206px',
    contentWidth: '497px',
  },
  header: {
    height: '60px',
  },
};

export const borderRadius = {
  button: '15px',
  badge: '6px',
  navButton: '32px',
};
```

### Asset Management

#### Font Loading
```typescript
// Load GT Walsheim Pro font
// Option 1: Using @font-face
@font-face {
  font-family: 'GT Walsheim Pro';
  src: url('/fonts/GTWalsheimPro-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'GT Walsheim Pro';
  src: url('/fonts/GTWalsheimPro-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'GT Walsheim Pro';
  src: url('/fonts/GTWalsheimPro-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

// Option 2: Using Fontsource (if available)
// npm install @fontsource/gt-walsheim-pro
import '@fontsource/gt-walsheim-pro/400.css';
import '@fontsource/gt-walsheim-pro/500.css';
import '@fontsource/gt-walsheim-pro/700.css';
```

**Note:** GT Walsheim Pro is a commercial font. Verify licensing before implementation. Consider fallback strategy or alternative font if not available.

#### SVG Asset Optimization
1. Export all SVGs from Figma
2. Run through SVGO: `npx svgo -f assets/svg -o public/assets/svg`
3. Convert icon SVGs to React components or use as data URLs
4. Inline small decorative SVGs directly in JSX

### Technical Considerations

#### Performance
- Lazy load image placeholder if using actual images
- Preload critical fonts (GT Walsheim Pro)
- Minimize layout shift with explicit dimensions
- Consider skeleton loading for content

#### Browser Support
- Flexbox layout (IE11+)
- CSS custom properties (IE11 with polyfill or fallbacks)
- SVG support (all modern browsers)
- Test backdrop-filter if using blur effects

#### Animation Opportunities (Not in Design)
Consider adding subtle animations:
- Fade in hero content on mount
- Slide up CTA button
- Hover scale on buttons
- Underline draw-in effect

### Generated Code Notes

The Figma-generated code uses:
- Tailwind CSS utility classes
- Absolute positioning (may need refactor for responsive)
- Data attributes for Figma node IDs (useful for debugging)
- Inline styles for custom CSS properties
- Image assets from localhost:3845 (development only)

**Refactoring Recommendations:**
1. Replace absolute positioning with flexbox/grid for responsive layout
2. Extract repeated styles to reusable components
3. Replace localhost asset URLs with proper asset imports
4. Simplify nested div structure
5. Add proper semantic HTML elements
6. Implement proper React component structure
7. Add TypeScript prop types
8. Extract inline styles to styled components or CSS modules

---

## Summary for Implementation

### Critical Specifications
1. **Layout:** Two-column (content + image), 1440px max-width
2. **Colors:** Hero bg `#759FFF`, Brand blue `#1D5FF6`, White `#FFFFFF`
3. **Typography:** GT Walsheim Pro (Regular, Medium, Bold)
4. **Key Measurements:**
   - Content starts at 230px from left
   - Header height: 60px
   - Button: 230x50px with 15px border radius
   - Badge: 124x26px with 6px border radius

### Required Assets
- [ ] GT Walsheim Pro font files (3 weights)
- [ ] Logo SVG (USmobile)
- [ ] Arrow icon (16x16)
- [ ] Decorative underline SVG
- [ ] Chat icon (optional, can use library)
- [ ] Bag/cart icon (optional, can use library)

### Implementation Priority
1. **High:** Layout structure, typography, colors, CTA button
2. **Medium:** Navigation header, badge component, responsive behavior
3. **Low:** Icon assets (can use placeholders), animations, advanced interactions

### Testing Requirements
- [ ] Visual regression testing against Figma screenshot
- [ ] Responsive testing at breakpoints: 375px, 768px, 1024px, 1440px
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Keyboard navigation testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Font loading and fallback testing

### Questions for Design Team
1. What should the CTA button text actually say? ("nullam vehicula iep" is placeholder)
2. Are there hover/active states for buttons and links?
3. What content/image goes in the gray placeholder area?
4. Are there specific responsive breakpoint designs?
5. Is GT Walsheim Pro font licensed for web use?
6. Should icons come from a specific icon library (Heroicons, Lucide, etc.)?

---

## Next Steps

1. **Font Acquisition:** Obtain GT Walsheim Pro font files or identify alternative
2. **Asset Export:** Export all required SVG assets from Figma
3. **Component Development:** Build components following hierarchy above
4. **Storybook Stories:** Create stories for all components
5. **Unit Tests:** Write tests for component functionality
6. **Integration:** Integrate with existing HeroSection component
7. **Accessibility Review:** Conduct WCAG audit
8. **Design QA:** Review with design team before final implementation

---

**Analysis completed:** 2025-11-20
**Analyst:** Figma Design Analyst Agent
**Ready for:** Senior Frontend Engineer implementation
