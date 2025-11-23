# US Mobile Business Page - Complete Design Specifications

**Figma Node ID:** 1413-24025
**Design File:** Marketing Page Components
**Component Name:** Business page - desktop (1440x6321px)
**Date Analyzed:** 2025-11-23
**Screenshot:** `/docs/temp/figma-screenshots/figma-node-1413-24025-2025-11-23.png`

---

## 1. Component Overview

### Purpose
Full-page business marketing website for US Mobile featuring:
- Navigation header
- Hero section with CTA
- Pricing cards/plans display
- Feature comparisons
- Device showcase
- Network coverage benefits
- FAQ accordion
- Social links and footer

### Viewport
- **Width:** 1440px (desktop)
- **Height:** 6321px (full scrollable page)
- **Type:** Responsive frame with absolute positioning

---

## 2. Color Palette

### Primary Colors
- **Brand/Main-Blue:** `#1D5FF6` - Primary action, buttons, highlights
- **Brand/Blue-ExtraLight:** `#E2E6F4` - Light backgrounds, subtle fills

### Secondary Colors
- **Utility/White:** `#FFFFFF` - Text, backgrounds, contrast

### Neutral/Gray Scale
- **Grays/High:** `#586271` - Primary text, headings
- **Grays/High Medium:** `#8694AA` - Secondary text, muted text
- **Grays/Medium Low:** `#E1E3E6` - Dividers, light borders

### Color Applications
| Color | Hex | Usage |
|-------|-----|-------|
| Main Blue | #1D5FF6 | Buttons, links, active states, icons |
| Blue Extra Light | #E2E6F4 | Section backgrounds, card fills |
| White | #FFFFFF | Text on dark, card backgrounds, contrast |
| Dark Gray | #586271 | Headlines, primary text |
| Medium Gray | #8694AA | Body text, secondary info |
| Light Gray | #E1E3E6 | Borders, dividers, subtle elements |

---

## 3. Typography System

### Font Family
**GT Walsheim Pro** (primary font)
- Styles: Regular, Medium, Bold
- Fallback: System sans-serif

### Type Scale

#### Headings
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H3 Medium | 32px | 600 | 40px | Section headings, titles |
| H4 | 24px | 600 | 32px | Card titles |
| Heading | 18px | 600 | 24px | Subsection titles |

#### Body
| Type | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Caption Regular | 14px | 400 | 18px | Labels, footer text, fine print |
| Body | 16px | 400 | 24px | Paragraph text, descriptions |

### Text Applications
- **Navigation:** 14px, 400 weight (uppercase)
- **Button Text:** 14px, 600 weight (uppercase)
- **Card Descriptions:** 16px, 400 weight
- **Prices:** 32px, 600 weight
- **FAQ Questions:** 16px, 600 weight

---

## 4. Spacing & Layout System

### Grid System
- **Base Grid Unit:** 8px
- **Container Width:** 1300px (max content width)
- **Gutter Width:** 70px (left/right margin on 1440px viewport)

### Padding Values (Common)
- **Section Padding:**
  - Top: 80px
  - Bottom: 80px
  - Left: 70px
  - Right: 70px

- **Card Padding:** 20-30px

- **Component Padding:**
  - Button: 12px (vertical) x 20px (horizontal)
  - Input: 12px (vertical) x 16px (horizontal)

### Gap/Spacing Values
- **Section Gap:** 40px (between major sections)
- **Component Gap:** 16px (between items in lists/grids)
- **Item Gap:** 8px (within tight components)

### Layout Spacing (Key Sections)
| Section | Top | Bottom | Left/Right | Width |
|---------|-----|--------|------------|-------|
| Header | 0 | 0 | 0 | 1440px |
| Hero | 60px | 80px | 70px | 1300px |
| Pricing Cards | 80px | 80px | 70px | 1300px |
| FAQ Accordion | 80px | 80px | 70px | 1300px |
| Footer | 80px | 80px | 70px | 1300px |

---

## 5. Component Structure & Hierarchy

### Header Component (Height: 60px)
**Location:** Top of page, sticky/fixed
**Background:** White with subtle shadow

#### Sub-components:
1. **Logo** (80x47px)
   - US Mobile branding
   - Position: Left, 12px margin

2. **Navigation Links** (uppercase text, 14px)
   - PLANS
   - NETWORKS
   - HOW IT WORKS
   - SHOP
   - Spacing between: 40-60px

3. **Action Items** (right side)
   - **Search Icon** (35x35px)
   - **Notification Icon** (35x35px with badge)
   - **Primary Button** "Schedule Demo" (123x35px)
   - **Secondary Button** "SIGN IN" (74x35px, hover state)
   - Spacing between: 20px

### Hero Section (Height: ~800px)
**Content Area:** 1300px width, centered

**Key Elements:**
1. **Headline Text**
   - "US Mobile for Business"
   - Size: Varies, color: #586271
   - Line height: Generous for readability

2. **Subheadline**
   - "Your favorite subscriptions..."
   - Size: 16px, color: #8694AA

3. **CTA Button**
   - Size: 211x50px
   - Background: #1D5FF6
   - Border radius: 8px
   - Text: "MAIN BUTTON" (white, 14px, 600 weight)

4. **Illustration Background**
   - Name: "hero-test 1"
   - Dimensions: 1440x738px

### Pricing Section (Height: ~630px)
**Type:** Pricing card comparison

**Card Layout:**
- **Grid:** 3 columns (1300px width / 3)
- **Card Size:** 297x317px
- **Card Padding:** 20px

**Card Components:**
1. **Price Display**
   - Price: 32px, 600 weight, color: #1D5FF6
   - Period: "/ Month" (14px, gray)
   - Subtext: "Incl. taxes and fees" (14px, gray)

2. **Card Background**
   - Fill: White
   - Border radius: 12px
   - Shadow: Elevation 2 (subtle)

3. **Feature List Items**
   - Checkbox icon: 24x24px
   - Text: 16px, 400 weight
   - Gap between items: 16px
   - Padding: 20px

### FAQ Accordion Section (Height: ~700px)
**Type:** Collapsible accordion

**Accordion Item Structure:**
- **Background:** White
- **Border radius:** 12px
- **Height (closed):** 80px
- **Height (expanded):** Variable (180-220px)
- **Padding:** 20px

**Accordion Elements:**
1. **Question Text**
   - Size: 16px, 600 weight
   - Color: #586271
   - Position: Left

2. **Expand/Collapse Icon**
   - Type: Plus/Minus icon
   - Size: 17x17px (approximately)
   - Color: #1D5FF6
   - Position: Right

3. **Answer Text**
   - Size: 14px, 400 weight
   - Color: #8694AA
   - Margin top: 16px
   - Line height: 24px

4. **Item Spacing**
   - Gap between items: 16px
   - Column layout: 2 columns (left 540px, right 540px)

### Device Card Section (Height: ~430px)
**Type:** Product showcase

**Grid Layout:**
- **Columns:** 3 equal
- **Card Size:** 297x438px
- **Gap:** 16px

**Device Card Elements:**
1. **Device Image**
   - Dimensions: Variable (150-160px height)
   - Aspect ratio: Maintained
   - Position: Top center

2. **Product Name**
   - Size: 14px, 400 weight
   - Color: #8694AA
   - Margin top: 20px

3. **Price**
   - Size: 32px, 600 weight
   - Color: #1D5FF6
   - Margin top: 20px

### Button Variants

#### Primary Button
- **Size:** 211x50px (standard)
- **Background:** Linear gradient or solid #1D5FF6
- **Text:** White, 14px, 600 weight, uppercase
- **Border radius:** 8px
- **State - Hover:** Darker shade (#1A4DD9)
- **State - Active:** Darkest shade (#1639B2)
- **State - Disabled:** #E1E3E6, cursor: not-allowed

#### Secondary Button
- **Size:** 74x35px (navigation)
- **Background:** Transparent (default) / #E2E6F4 (hover)
- **Text:** #1D5FF6, 14px, 600 weight, uppercase
- **Border radius:** 6px

#### Icon Button
- **Size:** 35x35px
- **Background:** #FFFFFF
- **Icon Color:** #586271
- **Border radius:** 8px
- **Hover:** Background #E2E6F4

---

## 6. Visual Effects & Styling

### Shadows
- **Elevation 1 (Subtle):** `0 2px 4px rgba(0, 0, 0, 0.08)`
- **Elevation 2 (Moderate):** `0 4px 12px rgba(0, 0, 0, 0.12)`
- **Elevation 3 (High):** `0 8px 24px rgba(0, 0, 0, 0.16)`

### Border Radius
- **Cards:** 12px
- **Buttons:** 8px
- **Input Fields:** 6px
- **Small Components:** 4px
- **Rounded Rectangles:** 16px (on larger elements)

### Borders
- **Divider Lines:** 1px solid #E1E3E6
- **Input Border:** 1px solid #E1E3E6 (default) / #1D5FF6 (focus)

### Opacity/Alpha
- **Disabled Elements:** 50% opacity
- **Hover Overlay:** 5-10% opacity change
- **Text Muting:** 60% opacity for secondary text

---

## 7. Interactive States

### Button States
- **Default:** Solid blue (#1D5FF6), white text
- **Hover:** Darker blue (#1A4DD9), slight shadow elevation
- **Active/Pressed:** Even darker blue (#1639B2)
- **Disabled:** Gray (#E1E3E6), grayed text, no pointer events
- **Focus:** Blue outline (2px) with 2px spacing

### Input Field States
- **Default:** White background, light gray border (#E1E3E6)
- **Focus:** White background, blue border (#1D5FF6), blue shadow (0 0 0 3px rgba(29, 95, 246, 0.1))
- **Filled:** White background, gray text (#586271)
- **Error:** White background, red border (#DC2626), red bottom indicator
- **Disabled:** #F3F4F6 background, gray text

### Accordion States
- **Closed:** Icon is "+" (plus), answer text hidden, height 80px
- **Open:** Icon is "-" (minus), answer text visible, height expands
- **Hover:** Background shifts to light blue (#E2E6F4)

### Link States
- **Default:** Blue text (#1D5FF6), no underline
- **Hover:** Underline appears, slightly darker blue
- **Active:** Visited color or highlighted state
- **Focus:** Outline ring (2px) with offset

---

## 8. Responsive Behavior

### Breakpoints
- **Mobile:** 0-640px
- **Tablet:** 641-1024px
- **Desktop:** 1025px+

### Current Design (Desktop - 1440px)
- Fully implemented as shown in screenshot
- Multi-column layouts
- Full header with all navigation items visible
- 3-column pricing/product grids

### Responsive Considerations
- Container should remain max-width: 1300px on large screens
- Padding/margins should reduce on smaller viewports
- Grid columns should stack on mobile (1 column)
- Typography should scale with viewport (use relative units)
- Images should be responsive (max-width: 100%)

### Constraints
- **Min-width:** Elements maintain readability down to 320px
- **Max-width:** Container caps at 1440px
- **Aspect Ratios:** Device images maintain their ratios
- **Text Wrapping:** Long text wraps naturally, no overflow

---

## 9. Design Tokens

### Color Tokens
```
Colors: {
  primary: '#1D5FF6',
  primaryLight: '#E2E6F4',
  white: '#FFFFFF',
  textDark: '#586271',
  textMedium: '#8694AA',
  textLight: '#E1E3E6'
}
```

### Typography Tokens
```
Fonts: {
  family: 'GT Walsheim Pro, sans-serif',
  h3: { size: 32, weight: 600, lineHeight: 40 },
  body: { size: 16, weight: 400, lineHeight: 24 },
  caption: { size: 14, weight: 400, lineHeight: 18 }
}
```

### Spacing Tokens
```
Spacing: {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 40,
  xxl: 80
}
```

### Shadow Tokens
```
Shadows: {
  sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.16)'
}
```

---

## 10. Key Sections Detail

### Header Navigation
- **Fixed positioning** (likely)
- **Background:** White
- **Height:** 60px
- **Z-index:** High (100+)
- **Responsive:** Hamburger menu on mobile

### Hero Section
- **Full-width background:** Hero image (1440x738px)
- **Content area:** 1300px max-width, centered
- **Text color:** Inverted (white text on blue/image background)
- **CTA Placement:** Below headline, prominent

### Pricing Comparison Cards
- **Grid:** 3 columns
- **Card aspect ratio:** 1:1.08
- **Feature list:** 3-4 items per card
- **Price emphasis:** Largest text element in card
- **Selected state:** Highlight with border or background change

### Device Showcase
- **Layout:** 3-column grid
- **Image handling:** Maintain aspect ratio, center in card
- **Product info:** Below image (name, price, specs)
- **CTA:** Individual "Add to Cart" or "View Details" per device

### FAQ Section
- **Two-column layout:** Left and right columns
- **Accordion style:** Click to expand/collapse
- **Animation:** Smooth height transition
- **Icon:** Chevron/plus icon indicates closed/open state

---

## 11. Assets & Media

### Images Required
1. **Hero Background** (1440x738px) - Rocket/spaceship illustration
2. **Device Images** - iPhone, XR variant
3. **Network Coverage Graphic** - Circular ripple/coverage area
4. **Illustration Graphics** - Various section backgrounds
5. **Icons:**
   - Search (19x19px)
   - Notification/Bell (19x19px)
   - Hamburger menu (13x3px)
   - Chevron/Collapse (17x17px)
   - Checkmark (24x24px)
   - Social media icons (19x19px - Instagram, Facebook, LinkedIn, Twitter)

### Icon Set
- **Size range:** 16px - 35px
- **Color:** Inherit from context or #1D5FF6
- **Style:** Outlined or filled, clean and modern

---

## 12. Layout Rules & Constraints

### Fixed Constraints
- Page height: 6321px (fixed for this design)
- Header: Always 60px
- Container max-width: 1440px
- Gutter: 70px on desktop

### Flexible Constraints
- Section heights: Variable based on content
- Card heights: Maintain aspect ratio, content-dependent
- Font sizes: Can scale with viewport
- Spacing: Can reduce on smaller screens

### Alignment Rules
- All content centers on the 1440px viewport
- Left/right alignment uses 70px gutters
- Items within sections align to baseline grid
- Nested components use relative positioning

---

## 13. Implementation Notes for Developers

### React Component Structure
```
BusinessPage/
├── Header (fixed positioning)
├── HeroSection
├── PricingComparison
├── DeviceShowcase
├── FAQAccordion
├── NetworkCoverage
├── Footer
└── SocialLinks
```

### Key Classes/Modules Needed
- `Button` - With variants (primary, secondary, icon)
- `Card` - Base card component with optional shadow
- `Accordion` - Reusable accordion item
- `PricingCard` - Specialized card with price display
- `DeviceCard` - Product showcase card
- `Section` - Layout wrapper with consistent spacing
- `Typography` - Text components (H1-H4, Body, Caption)

### CSS Considerations
- Use CSS Grid for multi-column layouts
- Use Flexbox for alignment within components
- Use CSS variables for design tokens
- Use `rem` units for scalability
- Use `:hover`, `:focus`, `:active` states
- Use transitions (150-300ms) for interactive states

### Accessibility
- All interactive elements must be keyboard accessible
- Color contrast must meet WCAG AA standards (4.5:1 for text)
- Buttons must have visible focus indicators
- Icons should have accessible labels/titles
- Form inputs must have associated labels
- Accordion should support keyboard navigation

---

## 14. Additional Notes

### Design System Alignment
This page follows a consistent design system with:
- 8px base grid
- Blue primary color (#1D5FF6)
- Gray neutral palette
- GT Walsheim Pro typography
- Consistent shadow system
- Predictable spacing scale

### Brand Guidelines
- Always use brand blue (#1D5FF6) for primary actions
- Maintain white space around major elements
- Keep text legible with sufficient contrast
- Use consistent iconography style
- Maintain rounded corners at 8-12px for UI elements

### Performance Considerations
- Optimize hero image (use WebP with fallback)
- Lazy load device images below the fold
- Consider animation performance on scroll
- Minimize shadow filters for better rendering

---

## File References

- **Design File:** `/Users/ghelanijimmy/repos/demo-claude-code/docs/temp/figma-chunks/design-1413-24025.json`
- **Screenshot:** `/Users/ghelanijimmy/repos/demo-claude-code/docs/temp/figma-screenshots/figma-node-1413-24025-2025-11-23.png`
- **Node ID:** 1413-24025
