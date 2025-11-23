# Design Specifications Summary - Business Page Desktop

## Quick Reference

**Figma File:** Marketing Page Components
**Node ID:** 1413:24025
**Component:** Business page - desktop
**Viewport:** 1440px × 5620px (full page height)
**Analysis Generated:** 2025-11-23

---

## Executive Summary

Complete design specifications for a professional B2B marketing website featuring:
- Sticky navigation header (60px)
- Hero section with background imagery and blur effects
- FAQ accordion section with two-column layout
- Comprehensive footer with social media integration
- Professional color scheme with deep blues and grays
- GT Walsheim Pro typography throughout
- Extensive use of gradients, shadows, and visual depth

---

## Color System

### Primary Brand Colors
```
Primary Blue:     #1d5ff6 (CTA buttons, active states)
Secondary Blue:   #2051c2 (overlays, accents)
Deep Navy:        #0c173e (headings, primary text)
Text Gray:        #586271 (navigation, secondary text)
```

### Supporting Colors
```
Silver/Gray:      #9ba1aa (footer text, disabled)
Light Blue:       #c3c8ec (subtle accents)
Dark Gray:        #3d4667 (text accents)
Off-White:        #fdfdfe (card backgrounds)
White:            #ffffff (primary background)
```

### Gradient Colors
```
Blue Overlay:     rgba(138,197,247,0.5) - Hero section
Light Blue Overlay: rgba(229,237,255,0.5) - Content sections
Faded White:      rgba(255,255,255,0.667) - Footer fade
```

---

## Typography System

### Font Family
**Primary:** GT Walsheim Pro (Regular, Medium, Bold)

### Type Scale
```
64px - Hero/Large Headers      | Bold | line-height: auto
42px - Section Headers         | Bold | line-height: auto
38px - Secondary Headers       | Bold | line-height: auto
32px - Subheadings            | Bold | line-height: 32px
30px - Medium Headers         | Bold | line-height: auto
24px - FAQ Questions          | Bold | line-height: 32px | tracking: -0.2px
20px - Body Headers           | Bold | line-height: auto
18px - Body Text              | Reg  | line-height: auto
16px - Standard Body          | Reg  | line-height: auto
14px - Small Text             | Reg  | line-height: auto
12px - Navigation/Buttons     | Bold | line-height: normal | tracking: 0.6px
12px - Footer Labels          | Med  | line-height: normal | tracking: 0.6px
```

### Text Treatments
- **Uppercase:** All navigation, buttons, footer labels
- **Letter Spacing:** 0.6px for small caps, -0.2px for headers
- **Text Transform:** None on body, uppercase on UI elements

---

## Spacing & Layout Grid

### Layout Dimensions
```
Viewport Width:        1440px
Content Max-Width:     1300px
Horizontal Padding:    70px (left/right)
Card Container Width:  1072px
Card Width (FAQ):      540px / 538px (two-column)
```

### Spacing Scale
```
4px    - Minimal gaps
8px    - Tight spacing
12px   - Label spacing, button padding
14px   - Small component spacing
16px   - Standard spacing
18px   - Button internal padding
20px   - Card spacing
24px   - Section spacing
30px   - Card internal padding
32px   - Major spacing, gaps
70px   - Page horizontal padding
```

### Component Heights
```
Header:              60px
Hero Section:        738px
Main Card:           499px
FAQ Card (normal):   80px
FAQ Card (expanded): 110px
Footer Content:      635px
```

---

## Components & Patterns

### 1. Navigation Header
- **Height:** 60px
- **Background:** White with subtle border `rgba(25,35,50,0.1)`
- **Layout:** Sticky/fixed positioning
- **Contents:**
  - Logo (left)
  - Navigation menu: NETWORKS, HOW IT WORKS, SHOP
  - Sign In button
  - Main CTA button
  - Icons: chat, shopping bag

### 2. Main Button (CTA)
- **Colors:**
  - Primary: `#1d5ff6`
  - Secondary: `rgba(102,122,244,0.85)`
- **Border Radius:** 32px (pill-shaped)
- **Padding:** 12px × 18px internal
- **Font:** 12px Bold, uppercase, 0.6px tracking
- **Shadow:** `0px 1px 3px 0px rgba(101,121,243,0.25)`
- **Text Color:** White

### 3. Navigation Links
- **Color:** `#586271`
- **Font:** 12px Regular, uppercase
- **Spacing:** 0.6px tracking
- **States:** Hover color change (define as needed)

### 4. Hero Section
- **Height:** 738px
- **Width:** 1440px (full viewport)
- **Background:** Image with cover fit
- **Overlay Effects:**
  - Blue blur: 34px on `#2051c2` @ 25% opacity
  - Gradient overlay: `rgba(138,197,247,0.5)` top to transparent

### 5. FAQ Accordion Cards
- **Background:** White (`#ffffff`)
- **Dimensions:** 540px × 80px (collapsed) / 110px (expanded)
- **Border Radius:** 15px
- **Shadow:** `0px 20px 80px -10px rgba(16,41,130,0.1)`
- **Content Padding:** 30px (left/right)
- **Title:** 24px Bold, `#0c173e`, tracking -0.2px
- **Expand Icon:** Right-aligned, 17px × 16.987px

### 6. Footer
- **Background:** Gradient fade with image
- **Height:** 635px + 95px padding
- **Social Icons:** 31px × 31px, color `#9ba1aa`
- **Links:** 12px Medium, uppercase, 0.6px tracking
- **Layout:** Full-width with background image

---

## Visual Effects

### Shadows
```
Button Shadow:      0px 1px 3px 0px rgba(101,121,243,0.25)
Card Shadow:        0px 20px 80px -10px rgba(16,41,130,0.1)
Large Card Shadow:  0px 9.833px 34.417px -24.583px rgba(24,39,75,0.12)
```

### Blur Effects
```
Hero Blur:          34px on blue element
Used for:           Creating depth and visual hierarchy
```

### Border Radius
```
Buttons:            32px (pill-shaped)
Major Cards:        20px
FAQ Cards:          15px
Medium Controls:    17.5px
```

### Gradients (Vertical)
```
Type 1 - Soft Blue Transition
  From: rgba(229,237,255,0.5) @ 3.364%
  To:   rgba(253,254,255,0.5) @ 93.161%

Type 2 - Blue to White
  From: rgba(138,197,247,0.5) @ 3.364%
  To:   rgba(253,254,255,0.5) @ 93.161%

Type 3 - Light Blue Transition
  From: rgba(236,242,255,0.5) @ 3.364%
  To:   rgba(253,254,255,0.5) @ 93.161%
```

---

## Interactive States

### Buttons
- **Normal:** Full opacity, defined shadow
- **Hover:** (to be defined - suggest: darker blue, increased shadow)
- **Active:** (to be defined)
- **Disabled:** (to be defined - suggest: lower opacity, gray color)

### Navigation Links
- **Default:** Gray text, no background
- **Hover:** (to be defined)
- **Active:** (to be defined - suggest: blue color)

### FAQ Accordion
- **Collapsed:** Height 80px, question visible
- **Expanded:** Height 110px, answer visible
- **Icon:** Chevron rotates 180° on expand

### Expandable Cards
- **Interaction:** Click to toggle expanded state
- **Animation:** Smooth height transition (timing not specified)
- **Icon:** Union/chevron (17px) right-aligned

---

## Assets Required

### Images
```
Hero Background:      Full width hero image (1440px)
Footer Background:    597.56px × 629.177px with SVG mask
```

### Icons (SVG)
```
Logo:                USmobile Logo (complex multi-part SVG)
Social Icons:        Instagram, Facebook, LinkedIn, Twitter (31px)
Expansion Chevron:   Union icon (17px × 16.987px)
Chat Icon:           Icon component (35px × 35px)
Bag/Shopping Icon:   Icon component (35px × 35px)
```

### Total Assets: 40+ files

---

## Responsive Considerations

**Current Design:** Desktop-only (1440px)

**Recommendations for Responsive:**
- **Tablet:** Reduce padding to 40px, adjust card layout to single column
- **Mobile:** Full-width layout, single-column cards, vertical navigation
- **Header:** Consider hamburger menu for mobile
- **Footer:** Stack social icons and links vertically

---

## Implementation Priorities

### Phase 1 (Core)
- [ ] Header/Navigation structure
- [ ] Main button component
- [ ] Color tokens/CSS variables
- [ ] Typography utilities

### Phase 2 (Content)
- [ ] Hero section
- [ ] FAQ accordion cards
- [ ] Main content card
- [ ] Gradient spacers

### Phase 3 (Polish)
- [ ] Footer with social icons
- [ ] Hover/focus states
- [ ] Animations/transitions
- [ ] Image optimization

### Phase 4 (QA)
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Mobile responsiveness

---

## Developer Notes

### CSS Architecture
```
Recommended structure:
- CSS Variables for colors (--color-primary-blue, etc.)
- Tailwind for utility classes
- Custom components for shadows, gradients
- CSS Grid or Flexbox for layout (instead of absolute positioning)
```

### Font Loading
```
Load GT Walsheim Pro weights:
- 400 (Regular)
- 500 (Medium)
- 700 (Bold)

Use @font-face declarations or web font service
```

### Accessibility
```
- Use semantic HTML (header, nav, main, footer, section)
- ARIA labels for icon buttons
- aria-expanded for accordion state
- Proper heading hierarchy (h1, h2, h3)
- Color contrast meets WCAG AA
- Keyboard navigation support
```

### Performance
```
- Optimize hero image (consider WebP format)
- Lazy load footer image
- Minimize SVG files
- Consider CSS containment for card grid
- Load fonts with font-display: swap
```

### Browser Support
```
Recommended: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
Fallbacks needed for:
- CSS masks (SVG mask as primary)
- CSS gradients (solid color fallback)
- Blur filter (no fallback, graceful degradation)
```

---

## Figma Organization

### Node Hierarchy
```
1413:24025 - Business page - desktop (main)
├─ 1413:24139 - Header
│  ├─ 1413:24140 - Navigation
│  ├─ Icons and buttons
│  └─ Logo
├─ 1413:24134 - Hero section
├─ 1413:24135 - Blur overlay
├─ 1413:24137 - Main content card
├─ 1413:24034-24076 - FAQ section
│  ├─ Left column cards (1413:24035-24052)
│  └─ Right column cards (1413:24055-24076)
└─ 1413:24031-24133 - Footer
   ├─ Social icons
   ├─ Footer links
   └─ Background image
```

---

## Related Documentation

- **Full Analysis:** `/docs/FIGMA_DESIGN_ANALYSIS_1413-24025.md`
- **Design File:** https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components?node-id=1413-24025&m=dev

---

**Next Steps:** Senior Frontend Engineer can now build React components using these specifications.
