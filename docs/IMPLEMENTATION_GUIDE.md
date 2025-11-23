# Implementation Guide - US Mobile Business Page

## Overview

This guide provides step-by-step instructions for implementing the US Mobile Business Page (Figma node 1413-24025) as a React application.

## Design Specifications Available

All design specifications have been extracted and are available in:
- **FIGMA_DESIGN_SPECS_COMPLETE.md** - Comprehensive design documentation
- **DESIGN_SPECS_JSON.json** - Structured JSON format
- **DESIGN_ANALYSIS_SUMMARY.md** - Executive summary
- **figma-node-1413-24025-2025-11-23.png** - Visual reference screenshot

## Component Architecture

```
BusinessPage/
├── Header/
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── Header.test.tsx
│   └── Header.stories.tsx
├── Sections/
│   ├── HeroSection/
│   │   ├── HeroSection.tsx
│   │   ├── HeroSection.module.css
│   │   ├── HeroSection.test.tsx
│   │   └── HeroSection.stories.tsx
│   ├── PricingSection/
│   │   ├── PricingSection.tsx
│   │   ├── PricingSection.module.css
│   │   ├── PricingSection.test.tsx
│   │   └── PricingSection.stories.tsx
│   ├── FAQSection/
│   │   ├── FAQSection.tsx
│   │   ├── FAQSection.module.css
│   │   ├── FAQSection.test.tsx
│   │   └── FAQSection.stories.tsx
│   ├── DeviceSection/
│   │   ├── DeviceSection.tsx
│   │   ├── DeviceSection.module.css
│   │   ├── DeviceSection.test.tsx
│   │   └── DeviceSection.stories.tsx
│   ├── NetworkSection/
│   │   ├── NetworkSection.tsx
│   │   ├── NetworkSection.module.css
│   │   ├── NetworkSection.test.tsx
│   │   └── NetworkSection.stories.tsx
│   └── Footer/
│       ├── Footer.tsx
│       ├── Footer.module.css
│       ├── Footer.test.tsx
│       └── Footer.stories.tsx
├── UI Components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.module.css
│   │   ├── Card.test.tsx
│   │   └── Card.stories.tsx
│   ├── Accordion/
│   │   ├── Accordion.tsx
│   │   ├── Accordion.module.css
│   │   ├── Accordion.test.tsx
│   │   └── Accordion.stories.tsx
│   ├── PricingCard/
│   │   ├── PricingCard.tsx
│   │   ├── PricingCard.module.css
│   │   ├── PricingCard.test.tsx
│   │   └── PricingCard.stories.tsx
│   └── DeviceCard/
│       ├── DeviceCard.tsx
│       ├── DeviceCard.module.css
│       ├── DeviceCard.test.tsx
│       └── DeviceCard.stories.tsx
└── App.tsx
```

## Design System Implementation

### 1. Create Design Tokens

Create `src/styles/tokens.ts`:

```typescript
// Color tokens
export const colors = {
  primary: '#1D5FF6',
  primaryLight: '#E2E6F4',
  white: '#FFFFFF',
  textDark: '#586271',
  textMedium: '#8694AA',
  textLight: '#E1E3E6',
};

// Typography tokens
export const typography = {
  fontFamily: '"GT Walsheim Pro", sans-serif',
  sizes: {
    h3: '32px',
    h4: '24px',
    body: '16px',
    caption: '14px',
  },
  weights: {
    regular: 400,
    medium: 600,
    bold: 700,
  },
  lineHeights: {
    tight: '24px',
    normal: '32px',
    loose: '40px',
  },
};

// Spacing tokens
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '32px',
  xl: '40px',
  xxl: '80px',
};

// Shadow tokens
export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.16)',
};

// Border radius tokens
export const borderRadius = {
  card: '12px',
  button: '8px',
  input: '6px',
  small: '4px',
};
```

### 2. Create Global CSS

Create `src/styles/globals.css`:

```css
:root {
  /* Colors */
  --color-primary: #1D5FF6;
  --color-primary-light: #E2E6F4;
  --color-white: #FFFFFF;
  --color-text-dark: #586271;
  --color-text-medium: #8694AA;
  --color-text-light: #E1E3E6;

  /* Typography */
  --font-family: 'GT Walsheim Pro', sans-serif;
  --font-size-h3: 32px;
  --font-size-h4: 24px;
  --font-size-body: 16px;
  --font-size-caption: 14px;
  --font-weight-regular: 400;
  --font-weight-medium: 600;
  --line-height-tight: 24px;
  --line-height-normal: 32px;
  --line-height-loose: 40px;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 40px;
  --spacing-xxl: 80px;
  --gutter: 70px;
  --container-max-width: 1300px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);

  /* Border Radius */
  --radius-card: 12px;
  --radius-button: 8px;
  --radius-input: 6px;
  --radius-small: 4px;

  /* Transitions */
  --transition-default: 150ms ease-in-out;
  --transition-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  color: var(--color-text-dark);
  background-color: var(--color-white);
  line-height: var(--line-height-tight);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-loose);
  color: var(--color-text-dark);
}

h3 {
  font-size: var(--font-size-h3);
}

h4 {
  font-size: var(--font-size-h4);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-default);
}

a:hover {
  text-decoration: underline;
}

button {
  font-family: var(--font-family);
  cursor: pointer;
  border: none;
  transition: all var(--transition-default);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

## Component Implementation Examples

### Button Component

Create `src/components/ui/Button/Button.tsx`:

```typescript
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

Create `src/components/ui/Button/Button.module.css`:

```css
.button {
  font-family: var(--font-family);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  border-radius: var(--radius-button);
  transition: all var(--transition-default);
  cursor: pointer;
  border: none;
}

.primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 211px;
  height: 50px;
  padding: 12px 20px;
}

.primary:hover:not(:disabled) {
  background-color: #1A4DD9;
  box-shadow: var(--shadow-md);
}

.primary:active:not(:disabled) {
  background-color: #1639B2;
}

.primary:disabled {
  background-color: var(--color-text-light);
  color: var(--color-text-medium);
}

.primary:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.secondary {
  background-color: transparent;
  color: var(--color-primary);
  width: 74px;
  height: 35px;
  border-radius: 6px;
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-primary-light);
}

.secondary:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.icon {
  background-color: var(--color-white);
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.icon:hover:not(:disabled) {
  background-color: var(--color-primary-light);
}

.md {
  /* Default size - applied above */
}

.sm {
  width: auto;
  padding: 8px 16px;
}

.lg {
  width: auto;
  padding: 14px 24px;
}
```

### PricingCard Component

Create `src/components/ui/PricingCard/PricingCard.tsx`:

```typescript
import React from 'react';
import styles from './PricingCard.module.css';

interface Feature {
  id: string;
  text: string;
}

interface PricingCardProps {
  title: string;
  price: number | string;
  features: Feature[];
  highlighted?: boolean;
  cta?: React.ReactNode;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  highlighted = false,
  cta,
}) => {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      <h4 className={styles.title}>{title}</h4>

      <div className={styles.priceSection}>
        <span className={styles.price}>${price}</span>
        <span className={styles.period}>/ Month</span>
      </div>

      <p className={styles.disclaimer}>Incl. taxes and fees</p>

      <ul className={styles.features}>
        {features.map(feature => (
          <li key={feature.id} className={styles.feature}>
            <span className={styles.checkmark}>✓</span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {cta && <div className={styles.cta}>{cta}</div>}
    </div>
  );
};
```

Create `src/components/ui/PricingCard/PricingCard.module.css`:

```css
.card {
  width: 297px;
  padding: 20px;
  border-radius: var(--radius-card);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-default);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.highlighted {
  border: 2px solid var(--color-primary);
}

.title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-lg);
}

.priceSection {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.price {
  font-size: 32px;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.period {
  font-size: var(--font-size-caption);
  color: var(--color-text-medium);
}

.disclaimer {
  font-size: var(--font-size-caption);
  color: var(--color-text-medium);
  margin-bottom: var(--spacing-lg);
}

.features {
  list-style: none;
  margin-bottom: var(--spacing-lg);
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  color: var(--color-text-dark);
  line-height: var(--line-height-tight);
}

.checkmark {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
  margin-top: 2px;
}

.cta {
  margin-top: var(--spacing-lg);
}
```

### Accordion Component

Create `src/components/ui/Accordion/Accordion.tsx`:

```typescript
import React, { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  );

  const toggle = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={styles.accordion}>
      {items.map(item => (
        <div key={item.id} className={styles.item}>
          <button
            className={styles.question}
            onClick={() => toggle(item.id)}
            aria-expanded={openItems.has(item.id)}
          >
            <span>{item.question}</span>
            <span className={styles.icon}>
              {openItems.has(item.id) ? '−' : '+'}
            </span>
          </button>

          {openItems.has(item.id) && (
            <div className={styles.answer}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

Create `src/components/ui/Accordion/Accordion.module.css`:

```css
.accordion {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.item {
  background-color: var(--color-white);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.question {
  width: 100%;
  padding: 20px;
  text-align: left;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-dark);
  background-color: var(--color-white);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color var(--transition-default);
}

.question:hover {
  background-color: var(--color-primary-light);
}

.question:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.icon {
  font-size: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-left: var(--spacing-md);
}

.answer {
  padding: 0 20px 20px;
  font-size: var(--font-size-body);
  color: var(--color-text-medium);
  line-height: var(--line-height-loose);
  animation: slideDown var(--transition-smooth);
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}
```

## Responsive Layout

Create `src/styles/responsive.css`:

```css
/* Desktop (1025px+) - Default styles above */

/* Tablet (641px - 1024px) */
@media (max-width: 1024px) {
  :root {
    --gutter: 32px;
  }

  .grid--3 {
    grid-template-columns: repeat(2, 1fr);
  }

  h3 {
    font-size: 28px;
    line-height: 36px;
  }
}

/* Mobile (0 - 640px) */
@media (max-width: 640px) {
  :root {
    --gutter: 16px;
    --container-max-width: 100%;
    --font-size-h3: 24px;
    --font-size-h4: 20px;
  }

  .grid--3,
  .grid--2 {
    grid-template-columns: 1fr;
  }

  h3 {
    font-size: 24px;
    line-height: 32px;
  }

  button {
    width: 100%;
  }
}
```

## Section Implementation Example

Create `src/components/sections/PricingSection/PricingSection.tsx`:

```typescript
import React from 'react';
import { PricingCard } from '@/components/ui/PricingCard';
import { Button } from '@/components/ui/Button';
import styles from './PricingSection.module.css';

const PRICING_PLANS = [
  {
    id: 'plan-1',
    title: '5GB Free for Unlimited',
    price: 57,
    features: [
      { id: '1', text: 'Unlimited data, talk' },
      { id: '2', text: 'Unlimited data, talk' },
      { id: '3', text: 'Unlimited data, talk' },
    ],
  },
  {
    id: 'plan-2',
    title: '5GB Free for Unlimited',
    price: 74,
    features: [
      { id: '1', text: 'Unlimited data, talk' },
      { id: '2', text: 'Unlimited data, talk' },
      { id: '3', text: 'Unlimited data, talk' },
    ],
    highlighted: true,
  },
  {
    id: 'plan-3',
    title: '5GB Free for Unlimited',
    price: 554,
    features: [
      { id: '1', text: 'Unlimited data, talk' },
      { id: '2', text: 'Unlimited data, talk' },
      { id: '3', text: 'Unlimited data, talk' },
    ],
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>5GB Free for Unlimited</h2>
        <p className={styles.description}>
          Our shareable data plans come with unlimited talk & text. No contracts. No commitment.
        </p>

        <div className={styles.grid}>
          {PRICING_PLANS.map(plan => (
            <PricingCard
              key={plan.id}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              highlighted={plan.highlighted}
              cta={<Button>Choose Plan</Button>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
```

Create `src/components/sections/PricingSection/PricingSection.module.css`:

```css
.section {
  padding: var(--spacing-xxl) var(--gutter);
  background-color: var(--color-white);
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.description {
  font-size: var(--font-size-body);
  color: var(--color-text-medium);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .section {
    padding: var(--spacing-xl) var(--gutter);
  }

  .title {
    font-size: var(--font-size-h4);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

## Testing Checklist

- [ ] All components render correctly
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Button states (hover, active, disabled, focus) work
- [ ] Accordion expands/collapses properly
- [ ] Form inputs are accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] All interactive elements are keyboard accessible
- [ ] Images load and display correctly
- [ ] Page loads within performance budget
- [ ] No console errors or warnings

## Performance Optimization

1. **Image Optimization**
   - Use WebP format with PNG fallback for hero image
   - Lazy load images below the fold
   - Use responsive images (srcset)
   - Compress all images

2. **Code Splitting**
   - Load accordion component only when needed
   - Lazy load heavy sections

3. **CSS Optimization**
   - Use CSS variables for theming
   - Minimize shadow filters
   - Optimize animations

4. **JavaScript Optimization**
   - Minimize re-renders with React.memo
   - Use useCallback for event handlers
   - Lazy load heavy dependencies

## Accessibility Checklist

- [ ] ARIA labels on interactive elements
- [ ] Proper heading hierarchy (h1, h2, h3, etc.)
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Color not the only means of conveying information
- [ ] Form labels are associated with inputs
- [ ] Images have alt text
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Semantic HTML used throughout
- [ ] Tested with screen reader

## Deployment Checklist

- [ ] All tests passing
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build successful
- [ ] Performance audit passed
- [ ] Accessibility audit passed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] All assets optimized
- [ ] Environment variables configured

---

## Resources

- **Design Specifications:** `/docs/FIGMA_DESIGN_SPECS_COMPLETE.md`
- **Design JSON:** `/docs/DESIGN_SPECS_JSON.json`
- **Analysis Summary:** `/docs/DESIGN_ANALYSIS_SUMMARY.md`
- **Screenshot:** `/docs/temp/figma-screenshots/figma-node-1413-24025-2025-11-23.png`
