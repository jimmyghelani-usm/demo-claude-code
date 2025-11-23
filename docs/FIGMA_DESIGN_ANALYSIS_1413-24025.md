# Figma Design Analysis: Business Page Desktop (1413:24025)

**Design File:** Marketing Page Components
**Node ID:** 1413:24025
**Component:** Business page - desktop
**Viewport:** 1440px width (desktop)
**Generated:** 2025-11-23

---

## Visual Overview

This is a complete desktop business/marketing page layout featuring:
- **Header Navigation:** Fixed sticky header with logo, menu items, CTA buttons, and icons
- **Hero Section:** Full-width hero image with overlay effects and gradient blurs
- **Content Cards Section:** Multiple white cards with FAQ-style layout in two-column grid
- **Footer:** Complete footer with links, social media icons, and background image
- **Extensive Use of:** Gradient overlays, blur effects, shadow effects, and responsive spacing

---

## Component Inventory

### Primary Components

#### 1. **Header Navigation** (`UI/Navigation/Header/Dashboard/Subscriber/Bag`)
- **Location:** Fixed at top, 60px height
- **Content:**
  - US Mobile Logo (left)
  - Navigation menu items: NETWORKS, HOW IT WORKS, SHOP
  - Sign In button
  - Main CTA button
  - Chat icon
  - Bag/shopping icon
- **Styling:** White background with subtle border

#### 2. **Hero Section** (`hero-test 1`)
- **Dimensions:** Full width (1440px) × 738px height
- **Content:** Full-bleed background image
- **Effects:** Blue blur effect (34px blur) at center, gradient overlay

#### 3. **FAQ Cards Section**
- **Layout:** Two-column grid layout
- **Card Height:** 80-110px per card
- **Container Width:** 1300px (centered with 70px left/right padding)
- **Number of Cards:** 8 accordion-style cards total

#### 4. **Footer Section**
- **Height:** 635px
- **Content:**
  - Social media icons (Instagram, Facebook, LinkedIn, Twitter)
  - Footer links (About, Reviews, Business, IoT, Contact, Unlock, FAQs, Privacy, Terms, Blog)
  - Background image with gradient fade effect
  - Background image dimensions: 549.082px × 455.284px

### Reusable Sub-Components

#### 1. **MainButton**
```
- Background Color: #1d5ff6 (primary blue) or rgba(102,122,244,0.85) (secondary)
- Border Radius: 32px
- Padding: 18px horizontal
- Font: GT Walsheim Pro Bold, 12px, uppercase
- Letter Spacing: 0.6px
- Shadow: 0px 1px 3px 0px rgba(101,121,243,0.25)
- Text Color: White
```

#### 2. **Icon Buttons**
```
- Size: 35px × 35px
- Icon Container: Centered with inset padding
- Background: Transparent or hover state
```

#### 3. **FAQ Card**
```
- Background: White (#ffffff)
- Border Radius: 15px
- Width: 540px or 538px
- Height: 80px or 110px (expanded)
- Shadow: 0px 20px 80px -10px rgba(16,41,130,0.1)
- Padding: 30px (left/right spacing from border)
```

---

## Design System Specifications

### Color Palette

#### Primary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Deep Blue | `#0c173e` | Text headings, primary text |
| Primary Blue | `#1d5ff6` | Main CTA buttons |
| Secondary Blue | `#2051c2` | Blur effects, accents |
| Light Blue (secondary) | `#1a5df6` | Alternative button color |
| Blue Overlay | `rgba(138,197,247,0.5)` | Gradient overlays |

#### Secondary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Gray (text) | `#586271` | Navigation text, secondary text |
| Silver/Gray | `#9ba1aa` | Footer text, disabled states |
| Light Gray (background) | `#ecf2ff` | Background accents |
| Off-white | `#fdfdfe` | Card backgrounds |
| White | `#ffffff` | Primary background, cards |

#### Accent Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Light Blue | `#c3c8ec` | Subtle accents |
| Dark Gray | `#3d4667` | Text accents |
| Navy | `#192332` | Dark text |

### Typography

#### Font Family
- **Primary Font:** GT Walsheim Pro
- **Weights Used:**
  - Regular (400)
  - Medium (500)
  - Bold (700)

#### Font Sizes & Styles

| Size | Weight | Usage | Line Height | Letter Spacing |
|------|--------|-------|-------------|-----------------|
| 64px | - | Hero heading (inferred) | - | - |
| 42px | - | Large section headers | - | - |
| 38px | - | Section headers | - | - |
| 32px | - | Subheadings | 32px | - |
| 30px | - | Medium headers | - | - |
| 24px | Bold | FAQ question text | 32px | -0.2px |
| 20px | - | Body headers | - | - |
| 18px | - | Body text | - | - |
| 16px | - | Standard body | - | - |
| 14px | - | Small text | - | - |
| 12px | Bold | Navigation, buttons | normal | 0.6px |
| 12px | Regular | Navigation links | normal | 0.6px |
| 12px | Medium | Footer labels | normal | 0.6px |

#### Typography Details
- **Default Line Height:** Normal (1.0)
- **Button Letter Spacing:** 0.6px (uppercase text)
- **Heading Letter Spacing:** -0.2px to -0.4px (negative for visual tightness)
- **Text Transform:** Uppercase for buttons, navigation, footer labels

### Spacing & Layout

#### Padding & Margins
| Size | Usage |
|------|-------|
| 70px | Page-level horizontal padding |
| 32px | Card spacing, footer bottom spacing |
| 30px | Card internal padding |
| 20px | Component spacing, border radius |
| 18px | Button padding |
| 15px | Card border radius |
| 14px | Small spacing |
| 12px | Minimal spacing |

#### Container Widths
| Width | Usage |
|-------|-------|
| 1440px | Full viewport width (desktop) |
| 1300px | Main content container |
| 1072px | Card section container |
| 540-538px | FAQ card width |
| 35px | Icon button size |

#### Heights
| Height | Usage |
|--------|-------|
| 738px | Hero section |
| 635px | Footer section |
| 499px | Main content card container |
| 80px | Standard FAQ card |
| 110px | Expanded FAQ card |
| 60px | Header height |

### Shadow & Depth

| Shadow | Usage |
|--------|-------|
| `0px 1px 3px 0px rgba(101,121,243,0.25)` | Button shadow (subtle) |
| `0px_20px_80px_-10px_rgba(16,41,130,0.1)` | Card shadow (elevation) |
| `0px_9.833px_34.417px_-24.583px_rgba(24,39,75,0.12)` | Large card shadow |

### Border Radius

| Radius | Usage |
|--------|-------|
| 32px | Buttons (large, rounded pill) |
| 20px | Major cards, containers |
| 17.5px | Medium controls |
| 15px | FAQ cards |

### Effects & Filters

#### Blur Effects
- **Hero blur:** 34px blur on `#2051c2` at 25% opacity
- **Applied to:** Background shapes for depth

#### Opacity Levels
- **Full opacity:** 100% (default)
- **High opacity:** 85% - `rgba(102,122,244,0.85)` (button fill)
- **Medium opacity:** 50% - Gradient overlays
- **Low opacity:** 10-25% - Subtle shadows and accents

#### Gradients
1. **Vertical Blue Gradient (FAQ Section):**
   - Start: `rgba(229,237,255,0.5)` at 3.364%
   - End: `rgba(253,254,255,0.5)` at 93.161%
   - Rotation: 180deg

2. **Vertical Blue Gradient (Hero):**
   - Start: `rgba(138,197,247,0.5)` at 3.364%
   - End: `rgba(253,254,255,0.5)` at 93.161%
   - Opacity: 50%

3. **Vertical Light Blue Gradient (Content):**
   - Start: `rgba(236,242,255,0.5)` at 3.364%
   - End: `rgba(253,254,255,0.5)` at 93.161%

---

## Layout Patterns

### Page Structure
```
1. Header (Fixed, 60px)
   ├─ Logo left
   ├─ Navigation menu center
   ├─ Sign In / Main Button right
   └─ Icons right

2. Hero Section (60px top margin, 738px height)
   ├─ Background image (full-bleed)
   └─ Blur effect overlay

3. Gradient Spacer (141px height)

4. Main Content Card (499px height, rounded)
   ├─ White background
   └─ FAQ section reference

5. Gradient Spacer (132px height)

6. FAQ Cards Section (635px height)
   ├─ Left column (4 cards)
   │  ├─ Card 1: 80px (3 rows with expand)
   │  ├─ Card 2: 80px
   │  ├─ Card 3: 110px (expanded state)
   │  └─ Card 4: 80px
   └─ Right column (4 cards)
      ├─ Card 5: 110px (expanded)
      ├─ Card 6: 80px
      ├─ Card 7: 80px
      └─ Card 8: 80px

7. Footer (95px + content)
   ├─ Background image with fade gradient
   ├─ Social icons (31px × 31px)
   └─ Footer links
```

### Responsive Considerations
- **Desktop:** 1440px fixed width
- **Content max-width:** 1300px (centered)
- **Horizontal padding:** 70px each side for main container
- **No visible mobile breakpoints** in this artboard
- **Absolute positioning** used throughout for pixel-perfect layout

---

## Interactive Elements & States

### Buttons

#### Main Button (Primary CTA)
- **State: Normal**
  - Background: `#1d5ff6`
  - Text: White, 12px, Bold, Uppercase
  - Border Radius: 32px
  - Shadow: `0px 1px 3px 0px rgba(101,121,243,0.25)`

- **State: Hover** (inferred)
  - Slightly darker blue or increased shadow
  - Cursor pointer

#### Sign In Button
- **Background:** Transparent with hover state indicator
- **Text:** `#586271`, 12px, Regular, Uppercase
- **Border Radius:** 20px
- **Interaction:** Opens sign-in overlay or navigation

#### Navigation Links
- **Default:** `#586271`, 12px, Regular, Uppercase, 0.6px letter spacing
- **Hover:** Color change (not explicitly defined)
- **Active:** Not visible in current artboard

### Accordion/Expandable Cards (FAQ)
- **State: Collapsed**
  - Height: 80px
  - Shows question text with chevron icon right-aligned
  - White background with shadow

- **State: Expanded**
  - Height: 110px (or dynamic based on content)
  - Shows answer content
  - Chevron rotates 180 degrees

- **Icon:** Union icon (right-aligned at 17px × 16.987px)

### Icon Buttons
- **Size:** 35px × 35px
- **Background:** Transparent
- **Hover:** Slight background color or scale change (not defined)

### Social Media Icons (Footer)
- **Size:** 31px × 31px
- **Color:** `#9ba1aa` (silver/gray)
- **Icons:** Instagram, Facebook, LinkedIn, Twitter
- **Hover:** Color change to active state (not defined)

### Footer Links
- **Text:** `#9ba1aa`, 12px, Medium, Uppercase, 0.6px letter spacing
- **States:** Hover color change (not explicitly shown)
- **Uppercase labels:** ABOUT, REVIEWS, BUSINESS, IoT, CONTACT, UNLOCK, FAQs, PRIVACY, TERMS, BLOG

---

## Visual Effects & Decorative Elements

### Background Images
1. **Hero Image** (`hero-test 1`)
   - Width: 1440px
   - Height: 738px
   - Object fit: Cover
   - Position: Center

2. **Footer Image** (`footer-test-11 1`)
   - Width: 597.56px
   - Height: 629.177px
   - Mask applied: Yes (asset: imgFooterTest111)
   - Gradient fade: White to transparent

### Masks & Clipping
- **Mask Type:** alpha (SVG mask)
- **Mask Mode:** intersect
- **Used for:** Footer image fade effect, smooth transitions

### Gradients
- Applied as overlays above and below main content sections
- Used to transition between background colors
- Subtle (50% opacity) for gentle visual effect

### Blur & Filter Effects
- **Hero section blur:** 34px on blue element at center
- **Effect:** Creates depth and visual interest
- **Color:** `#2051c2` at 25% opacity

---

## Component Implementation Notes for React/TypeScript

### Component Structure
```typescript
// Main components to create:
- BusinessPageDesktop (parent wrapper)
  ├─ Header (navigation)
  │  ├─ USmobileLogo
  │  ├─ NavMenu
  │  ├─ MainButton
  │  ├─ SignInButton
  │  └─ Icons (chat, bag)
  ├─ HeroSection
  │  ├─ Background image
  │  └─ Blur overlay
  ├─ ContentCard (main white card)
  ├─ FAQSection
  │  ├─ FAQCard (left column × 4)
  │  └─ FAQCard (right column × 4)
  └─ Footer
     ├─ FooterImage
     ├─ SocialIcons
     └─ FooterLinks
```

### CSS Requirements
- **Tailwind CSS:** Extensively used (all classes extracted)
- **Custom utilities needed:**
  - `mask-alpha`, `mask-intersect`, `mask-position`, `mask-size` (SVG mask support)
  - `object-cover` with specific positioning
  - Complex inset/padding values from Figma
  - Gradient overlays with multiple color stops

### Asset Management
- **Total assets:** 40+ image/SVG files
- **SVG icons:** Logo, social icons, expansion chevrons, decorative elements
- **Raster images:** Hero background, footer background, screenshots
- **Asset structure:** Images served from localhost:3845/assets/

### Typography Implementation
```typescript
// Font system setup required:
font-family: 'GT Walsheim Pro', sans-serif;

// Font weights:
font-weight: 400; // Regular
font-weight: 500; // Medium
font-weight: 700; // Bold

// Text utilities:
text-transform: uppercase; // For navigation, buttons, labels
letter-spacing: 0.6px; // Navigation, buttons
letter-spacing: -0.2px; // Headings
```

### State Management
- **FAQ accordion:** Toggle expanded state per card
- **Navigation:** Active link highlighting (not shown in current design)
- **Button states:** Hover, active, disabled (only normal state visible)

### Accessibility Considerations
- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<footer>`
- **Icons:** Add aria-labels for icon buttons
- **Buttons:** Proper button elements, not styled divs
- **Links:** Semantic `<a>` tags with proper href
- **Contrast:** Text colors meet WCAG AA standards
- **Focus states:** Define keyboard navigation (not shown in design)
- **Expandable elements:** Use aria-expanded, aria-controls for accordion

### Performance Optimizations
1. **Image optimization:** Compress hero and footer images
2. **Lazy loading:** Defer footer image until in viewport
3. **SVG optimization:** Minify and optimize all SVG assets
4. **Code splitting:** Consider separating footer from main content
5. **Mask rendering:** Test mask rendering performance on different browsers

---

## Figma Node References

### Component Nodes
- Main container: `1413:24025` (Business page - desktop)
- Header: `1413:24140`
- Hero section: `1413:24134`
- Main card: `1413:24137`
- FAQ cards: Multiple cards with IDs ranging from `1413:24035` to `1413:24073`
- Footer: `1413:24031` through `1413:24133`

---

## Implementation Checklist

- [ ] Create header component with navigation
- [ ] Implement logo component (USmobileLogo)
- [ ] Create main button component with states
- [ ] Build hero section with background image and blur
- [ ] Create FAQ accordion card component
- [ ] Implement FAQ section with two-column layout
- [ ] Build footer with social icons and links
- [ ] Add all gradient overlays and spacers
- [ ] Optimize and load all assets
- [ ] Implement responsive behavior (if needed)
- [ ] Add interaction/hover states
- [ ] Test accessibility compliance
- [ ] Create Storybook stories for components
- [ ] Write unit tests for components
- [ ] Performance test large image rendering

---

## Notes for Developers

1. **Absolute Positioning:** This design relies heavily on absolute positioning. Consider using CSS Grid or Flexbox for better maintainability in responsive layouts.

2. **Mask Usage:** SVG masks are used for the footer fade effect. Ensure proper browser support and provide fallbacks.

3. **Color Consistency:** The design uses a limited color palette. Create CSS custom properties for all colors.

4. **Typography:** GT Walsheim Pro font must be loaded. Consider using @font-face declarations.

5. **Spacing System:** Use a consistent spacing scale (8px, 12px, 16px, 20px, 24px, etc.) for maintainability.

6. **Accessibility:** Add ARIA labels for expandable sections and icon buttons.

7. **Mobile Responsiveness:** Current design is desktop-only. Plan mobile layout if needed.

8. **Dark Mode:** No dark mode variant shown in this design.

---

**File Generated:** `/Users/ghelanijimmy/repos/demo-claude-code/docs/FIGMA_DESIGN_ANALYSIS_1413-24025.md`
