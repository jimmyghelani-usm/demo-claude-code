# Implementation Code Reference

**Generated from:** Figma Design Analysis (Node 1413:24025)
**Purpose:** Code snippets and patterns for implementation

---

## CSS Variables / Design Tokens

### Colors
```css
:root {
  /* Primary Colors */
  --color-primary-blue: #1d5ff6;
  --color-secondary-blue: #2051c2;
  --color-deep-navy: #0c173e;
  --color-text-primary: #0c173e;
  --color-text-secondary: #586271;
  --color-text-muted: #9ba1aa;

  /* Accent Colors */
  --color-light-blue: #c3c8ec;
  --color-dark-gray: #3d4667;

  /* Neutral Colors */
  --color-white: #ffffff;
  --color-off-white: #fdfdfe;
  --color-border: rgba(25, 35, 50, 0.1);

  /* Semantic Colors */
  --color-background: #ffffff;
  --color-surface: #fdfdfe;
}
```

### Typography
```css
:root {
  /* Font Family */
  --font-primary: 'GT Walsheim Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Font Sizes */
  --text-64: 64px;
  --text-42: 42px;
  --text-38: 38px;
  --text-32: 32px;
  --text-30: 30px;
  --text-24: 24px;
  --text-20: 20px;
  --text-18: 18px;
  --text-16: 16px;
  --text-14: 14px;
  --text-12: 12px;

  /* Line Heights */
  --line-height-tight: 1;
  --line-height-normal: 1.2;
  --line-height-relaxed: 1.5;
  --line-height-32: 32px;
  --line-height-36: 36px;
}
```

### Spacing
```css
:root {
  /* Spacing Scale */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-14: 14px;
  --spacing-16: 16px;
  --spacing-18: 18px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-30: 30px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-70: 70px;

  /* Layout */
  --viewport-width: 1440px;
  --content-max-width: 1300px;
  --header-height: 60px;
  --card-border-radius: 15px;
  --button-border-radius: 32px;
}
```

### Shadows
```css
:root {
  --shadow-button: 0px 1px 3px 0px rgba(101, 121, 243, 0.25);
  --shadow-card: 0px 20px 80px -10px rgba(16, 41, 130, 0.1);
  --shadow-card-large: 0px 9.833px 34.417px -24.583px rgba(24, 39, 75, 0.12);
}
```

---

## Component Patterns

### Main Button Component
```typescript
// MainButton.tsx
interface MainButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function MainButton({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: MainButtonProps) {
  const variants = {
    primary: 'bg-[#1d5ff6] text-white',
    secondary: 'bg-[rgba(102,122,244,0.85)] text-white'
  };

  const sizes = {
    sm: 'text-[12px] px-[18px] py-[12px]',
    md: 'text-[12px] px-[18px] py-[14px]',
    lg: 'text-[14px] px-[24px] py-[16px]'
  };

  return (
    <button
      className={`
        rounded-[32px]
        font-bold
        uppercase
        tracking-[0.6px]
        shadow-[0px_1px_3px_0px_rgba(101,121,243,0.25)]
        transition-all
        hover:shadow-md
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Navigation Link Component
```typescript
// NavLink.tsx
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export function NavLink({ href, children, active = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`
        text-[12px]
        font-regular
        uppercase
        tracking-[0.6px]
        transition-colors
        ${active
          ? 'text-[#1d5ff6]'
          : 'text-[#586271] hover:text-[#0c173e]'
        }
      `}
    >
      {children}
    </a>
  );
}
```

### FAQ Card Component
```typescript
// FAQCard.tsx
interface FAQCardProps {
  question: string;
  answer: string;
  expanded?: boolean;
  onToggle?: () => void;
}

export function FAQCard({
  question,
  answer,
  expanded = false,
  onToggle
}: FAQCardProps) {
  return (
    <button
      className={`
        w-full
        bg-white
        rounded-[15px]
        shadow-[0px_20px_80px_-10px_rgba(16,41,130,0.1)]
        transition-all
        ${expanded ? 'h-[110px]' : 'h-[80px]'}
      `}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-[30px] h-[80px]">
        <h3 className="text-[24px] font-bold text-[#0c173e] tracking-[-0.2px] text-left">
          {question}
        </h3>
        <div className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
          {/* Expand icon */}
        </div>
      </div>

      {expanded && (
        <div className="px-[30px] pb-[20px] text-[16px] text-[#586271]">
          {answer}
        </div>
      )}
    </button>
  );
}
```

### Gradient Spacer Component
```typescript
// GradientSpacer.tsx
interface GradientSpacerProps {
  height?: string;
  type?: 'blue' | 'light-blue' | 'accent';
}

export function GradientSpacer({
  height = '141px',
  type = 'blue'
}: GradientSpacerProps) {
  const gradients = {
    blue: 'from-[rgba(229,237,255,0.5)] to-[rgba(253,254,255,0.5)]',
    'light-blue': 'from-[rgba(138,197,247,0.5)] to-[rgba(253,254,255,0.5)]',
    accent: 'from-[rgba(236,242,255,0.5)] to-[rgba(253,254,255,0.5)]'
  };

  return (
    <div
      className={`
        w-full
        bg-gradient-to-b
        ${gradients[type]}
        opacity-50
      `}
      style={{ height }}
    />
  );
}
```

### Header Component
```typescript
// Header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[60px] bg-white border-b border-[rgba(25,35,50,0.1)]">
      <nav className="max-w-[1440px] mx-auto h-full px-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <USmobileLogo />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-[60px] flex-1 justify-center">
          <NavLink href="#networks">Networks</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#shop">Shop</NavLink>
        </div>

        {/* Actions */}
        <div className="flex gap-[20px] flex-shrink-0 items-center">
          <NavLink href="#signin">Sign In</NavLink>
          <MainButton>Main Button</MainButton>
          <IconButton icon="chat" />
          <IconButton icon="bag" />
        </div>
      </nav>
    </header>
  );
}
```

### Hero Section Component
```typescript
// HeroSection.tsx
interface HeroSectionProps {
  backgroundImage: string;
}

export function HeroSection({ backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[738px] mt-[60px] overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blur Overlay */}
      <div
        className="absolute left-[214px] top-[626px] w-[1012px] h-[83px] bg-[#2051c2] blur-[34px] opacity-25"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(138,197,247,0.5)] to-transparent opacity-50" />
    </section>
  );
}
```

### FAQ Section Component
```typescript
// FAQSection.tsx
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const leftItems = items.slice(0, 4);
  const rightItems = items.slice(4, 8);

  return (
    <section className="relative bg-white py-[95px]">
      {/* Gradient Background */}
      <GradientSpacer type="blue" height="635px" />

      <div className="max-w-[1440px] mx-auto px-[70px]">
        <div className="grid grid-cols-2 gap-[32px]">
          {/* Left Column */}
          <div className="flex flex-col gap-[20px]">
            {leftItems.map(item => (
              <FAQCard
                key={item.id}
                question={item.question}
                answer={item.answer}
                expanded={expanded === item.id}
                onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[20px]">
            {rightItems.map(item => (
              <FAQCard
                key={item.id}
                question={item.question}
                answer={item.answer}
                expanded={expanded === item.id}
                onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Footer Component
```typescript
// Footer.tsx
export function Footer() {
  const socialLinks = [
    { icon: 'twitter', href: '#twitter' },
    { icon: 'linkedin', href: '#linkedin' },
    { icon: 'facebook', href: '#facebook' },
    { icon: 'instagram', href: '#instagram' }
  ];

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Business', href: '#business' },
    { label: 'IoT', href: '#iot' },
    { label: 'Contact', href: '#contact' },
    { label: 'Unlock', href: '#unlock' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Blog', href: '#blog' }
  ];

  return (
    <footer className="relative bg-white pt-[95px] pb-[32px] overflow-hidden">
      {/* Background Image with Fade */}
      <div className="absolute inset-0">
        <img
          src={footerImage}
          alt="Footer background"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[rgba(255,255,255,0.667)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-[70px]">
        <div className="flex justify-between items-end">
          <div className="flex gap-[40px]">
            {footerLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-medium uppercase tracking-[0.6px] text-[#9ba1aa] hover:text-[#1d5ff6] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-[20px]">
            {socialLinks.map(link => (
              <a
                key={link.icon}
                href={link.href}
                className="w-[31px] h-[31px] flex items-center justify-center rounded hover:bg-[#f0f0f0] transition-colors"
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Layout Patterns

### Page Layout
```typescript
// page.tsx / App.tsx
export default function BusinessPage() {
  return (
    <div className="bg-white">
      <Header />

      <main>
        <HeroSection backgroundImage={heroImage} />

        <GradientSpacer height="141px" type="light-blue" />

        <section className="mx-auto max-w-[1440px] px-[70px]">
          <ContentCard>
            {/* Main content */}
          </ContentCard>
        </section>

        <GradientSpacer height="132px" type="accent" />

        <FAQSection items={faqData} />
      </main>

      <Footer />
    </div>
  );
}
```

---

## Tailwind CSS Custom Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1d5ff6',
        secondary: '#2051c2',
        'navy-dark': '#0c173e',
        'text-secondary': '#586271',
        'text-muted': '#9ba1aa',
      },
      fontFamily: {
        sans: ['GT Walsheim Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '32px',
        '5xl': '38px',
        '6xl': '42px',
        '7xl': '64px',
      },
      spacing: {
        4: '4px',
        8: '8px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        30: '30px',
        32: '32px',
        40: '40px',
        70: '70px',
      },
      boxShadow: {
        button: '0px 1px 3px 0px rgba(101, 121, 243, 0.25)',
        card: '0px 20px 80px -10px rgba(16, 41, 130, 0.1)',
        'card-lg': '0px 9.833px 34.417px -24.583px rgba(24, 39, 75, 0.12)',
      },
      borderRadius: {
        'button': '32px',
        'card': '15px',
        'lg': '20px',
      },
    },
  },
};
```

---

## Animation Examples

### Button Hover Effect
```css
@keyframes buttonHover {
  0% {
    box-shadow: 0px 1px 3px 0px rgba(101, 121, 243, 0.25);
    transform: translateY(0);
  }
  100% {
    box-shadow: 0px 4px 12px 0px rgba(101, 121, 243, 0.35);
    transform: translateY(-2px);
  }
}

.main-button:hover {
  animation: buttonHover 0.3s ease-out forwards;
}
```

### Accordion Expand Animation
```css
@keyframes expandCard {
  from {
    height: 80px;
    opacity: 0.8;
  }
  to {
    height: 110px;
    opacity: 1;
  }
}

.faq-card.expanded {
  animation: expandCard 0.3s ease-out forwards;
}
```

### Icon Rotation
```css
@keyframes rotateIcon {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.faq-card.expanded .expand-icon {
  animation: rotateIcon 0.3s ease-out forwards;
}
```

---

## Accessibility Patterns

### Semantic HTML Structure
```typescript
export function FAQSection() {
  return (
    <section aria-label="Frequently asked questions">
      <h2 id="faq-title" className="sr-only">Common Questions</h2>

      <div role="region" aria-labelledby="faq-title">
        {items.map(item => (
          <button
            key={item.id}
            aria-expanded={expanded === item.id}
            aria-controls={`faq-answer-${item.id}`}
            onClick={() => toggle(item.id)}
          >
            {item.question}
          </button>
        ))}
      </div>
    </section>
  );
}
```

### Icon Button Accessibility
```typescript
interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

export function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="p-2 rounded hover:bg-gray-100 transition"
    >
      <Icon type={icon} />
    </button>
  );
}
```

---

## Testing Examples

### Button Component Test
```typescript
import { render, screen } from '@testing-library/react';
import { MainButton } from './MainButton';

describe('MainButton', () => {
  it('renders button with correct text', () => {
    render(<MainButton>Click Me</MainButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<MainButton onClick={handleClick}>Click Me</MainButton>);

    screen.getByText('Click Me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling variant', () => {
    const { container } = render(<MainButton variant="primary">Test</MainButton>);
    const button = container.querySelector('button');

    expect(button).toHaveClass('bg-[#1d5ff6]');
    expect(button).toHaveClass('text-white');
  });
});
```

### FAQ Card Test
```typescript
import { render, screen } from '@testing-library/react';
import { FAQCard } from './FAQCard';

describe('FAQCard', () => {
  it('renders question text', () => {
    render(
      <FAQCard
        question="What is this?"
        answer="This is a test"
      />
    );

    expect(screen.getByText('What is this?')).toBeInTheDocument();
  });

  it('expands on click', () => {
    const { rerender } = render(
      <FAQCard
        question="What is this?"
        answer="This is a test"
        expanded={false}
      />
    );

    const button = screen.getByRole('button');
    button.click();

    rerender(
      <FAQCard
        question="What is this?"
        answer="This is a test"
        expanded={true}
      />
    );

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
```

---

## Performance Optimization Tips

### Image Optimization
```typescript
// Use Next.js Image for automatic optimization
import Image from 'next/image';

<Image
  src={heroImage}
  alt="Hero background"
  width={1440}
  height={738}
  priority={true}
  quality={85}
/>
```

### Lazy Loading
```typescript
// Lazy load footer image
<img
  src={footerImage}
  alt="Footer background"
  loading="lazy"
  decoding="async"
/>
```

### CSS Containment
```css
.faq-section {
  contain: layout style paint;
}

.faq-card {
  contain: layout style;
}
```

---

## Related Files

- **Full Design Analysis:** `/docs/FIGMA_DESIGN_ANALYSIS_1413-24025.md`
- **Design Specs Summary:** `/docs/DESIGN_SPECS_SUMMARY.md`
- **Figma File:** https://www.figma.com/design/zwyycynQ0MjZgvCl67Ou1A/Marketing-Page-Components

---

**These code snippets provide a starting point for implementation. Adjust based on your specific project requirements and architecture decisions.**
