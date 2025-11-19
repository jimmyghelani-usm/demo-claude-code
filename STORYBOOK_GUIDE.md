# Storybook Setup Guide for US Mobile Trade In

## Overview
This guide will help you create Storybook stories for all landing page components.

## Component Inventory

### Priority 1: UI Components (Foundation)
1. **Button** - `/src/components/ui/Button.tsx`
2. **IconButton** - `/src/components/ui/IconButton.tsx`

### Priority 2: Shared Components (Reusable)
3. **StepCard** - `/src/components/shared/StepCard.tsx`
4. **FAQCard** - `/src/components/shared/FAQCard.tsx`

### Priority 3: Layout Components
5. **Header** - `/src/components/layout/Header.tsx`
6. **Footer** - `/src/components/layout/Footer.tsx`

### Priority 4: Section Components
7. **HeroSection** - `/src/components/sections/HeroSection.tsx`
8. **HowItWorksSection** - `/src/components/sections/HowItWorksSection.tsx`
9. **FAQSection** - `/src/components/sections/FAQSection.tsx`

### Priority 5: Page Composition
10. **TradeInLandingPage** - `/src/pages/TradeInLandingPage.tsx`

---

## Story Templates

### 1. Button Story Template

Create: `/src/components/ui/Button.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Check trade in value',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Learn More',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'md',
    children: 'Sign In',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" size="md">Primary</Button>
      <Button variant="secondary" size="md">Secondary</Button>
      <Button variant="text" size="md">Text</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};
```

---

### 2. IconButton Story Template

Create: `/src/components/ui/IconButton.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const ShoppingCartIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6 2L4 4H1v2h1l1.5 12h11L16 6h1V4h-3l-2-2H6zm0 2h6l1 2H5l1-2zm-2 4h12l-1.2 9.6H5.2L4 8z" />
  </svg>
);

const ChatIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2C5.589 2 2 5.589 2 10s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 2c3.308 0 6 2.692 6 6s-2.692 6-6 6-6-2.692-6-6 2.692-6 6-6zm-1 2v5l3.5 2 .5-1-3-1.8V6H9z" />
  </svg>
);

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    badgeCount: {
      control: 'number',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShoppingCart: Story = {
  args: {
    icon: ShoppingCartIcon,
    'aria-label': 'Shopping cart',
  },
};

export const WithBadge: Story = {
  args: {
    icon: ShoppingCartIcon,
    'aria-label': 'Shopping cart',
    badgeCount: 3,
  },
};

export const Chat: Story = {
  args: {
    icon: ChatIcon,
    'aria-label': 'Chat support',
  },
};

export const EmojiIcon: Story = {
  args: {
    icon: '🛒',
    'aria-label': 'Shopping cart',
    badgeCount: 5,
  },
};
```

---

### 3. StepCard Story Template

Create: `/src/components/shared/StepCard.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StepCard } from './StepCard';

const meta = {
  title: 'Shared/StepCard',
  component: StepCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckValue: Story = {
  args: {
    stepNumber: 1,
    title: 'Check trade in value',
    description: 'Answer a few questions about your device to get an instant quote. No commitments required.',
    icon: '✓',
  },
};

export const ShipDevice: Story = {
  args: {
    stepNumber: 2,
    title: 'Ship your device',
    description: "Pack up your device and ship it to us for free. We'll send you a prepaid shipping label.",
    icon: '📦',
  },
};

export const GetPaid: Story = {
  args: {
    stepNumber: 3,
    title: 'Get Paid',
    description: "Once we receive and verify your device, you'll get paid via your preferred method within 2-3 business days.",
    icon: '💵',
  },
};

export const AllSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '88px', flexWrap: 'wrap', justifyContent: 'center', padding: '40px' }}>
      <StepCard
        stepNumber={1}
        title="Check trade in value"
        description="Answer a few questions about your device to get an instant quote."
        icon="✓"
      />
      <StepCard
        stepNumber={2}
        title="Ship your device"
        description="Pack up your device and ship it to us for free."
        icon="📦"
      />
      <StepCard
        stepNumber={3}
        title="Get Paid"
        description="Get paid via your preferred method within 2-3 business days."
        icon="💵"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
```

---

### 4. FAQCard Story Template

Create: `/src/components/shared/FAQCard.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FAQCard } from './FAQCard';

const meta = {
  title: 'Shared/FAQCard',
  component: FAQCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultExpanded: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof FAQCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    question: 'What devices can I trade in?',
    answer: 'You can trade in smartphones, tablets, smartwatches, and laptops from most major brands including Apple, Samsung, Google, and more. The device must be functional and in reasonable condition.',
    defaultExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    question: 'How is my trade-in value calculated?',
    answer: 'Trade-in values are based on your device model, storage capacity, condition, and current market demand. Our instant quote tool gives you a transparent estimate based on these factors.',
    defaultExpanded: true,
  },
};

export const LongAnswer: Story = {
  args: {
    question: 'Is my data safe?',
    answer: 'Absolutely. We recommend you back up and erase your data before shipping. Once we receive your device, we perform a complete data wipe following industry-standard security protocols. All data is permanently erased using DOD-level wiping standards.',
    defaultExpanded: true,
  },
};

export const MultipleFAQs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <FAQCard
        question="What devices can I trade in?"
        answer="You can trade in smartphones, tablets, smartwatches, and laptops from most major brands."
        defaultExpanded={true}
      />
      <FAQCard
        question="How long does it take?"
        answer="Once we receive your device, we inspect it within 1-2 business days."
      />
      <FAQCard
        question="Is my data safe?"
        answer="Absolutely. We perform a complete data wipe following industry-standard security protocols."
      />
    </div>
  ),
};
```

---

### 5. Section Stories

Create: `/src/components/sections/HeroSection.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  play: async ({ canvasElement }) => {
    // Add interaction tests here if needed
  },
};
```

Create: `/src/components/sections/HowItWorksSection.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { HowItWorksSection } from './HowItWorksSection';

const meta = {
  title: 'Sections/HowItWorksSection',
  component: HowItWorksSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HowItWorksSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

Create: `/src/components/sections/FAQSection.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FAQSection } from './FAQSection';

const meta = {
  title: 'Sections/FAQSection',
  component: FAQSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FAQSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

---

### 6. Layout Stories

Create: `/src/components/layout/Header.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
```

Create: `/src/components/layout/Footer.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

---

### 7. Page Story

Create: `/src/pages/TradeInLandingPage.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TradeInLandingPage } from './TradeInLandingPage';

const meta = {
  title: 'Pages/TradeInLandingPage',
  component: TradeInLandingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TradeInLandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

---

## Storybook Configuration

Your Storybook is already configured. To add global styles, update:

`.storybook/preview.tsx`:
```tsx
import type { Preview } from '@storybook/react';
import '../src/index.css'; // Import global styles

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'lightBlue', value: '#F4F8FF' },
        { name: 'dark', value: '#0C173E' },
      ],
    },
  },
};

export default preview;
```

---

## Running Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Visit: http://localhost:6006

---

## Testing Stories

Add interaction tests using `@storybook/addon-interactions`:

```tsx
import { userEvent, within } from '@storybook/test';

export const ClickButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
```

---

## Accessibility Testing

All stories automatically use `@storybook/addon-a11y`. Check the accessibility tab in Storybook.

---

## Story Priority

1. Start with UI components (Button, IconButton)
2. Build shared components (StepCard, FAQCard)
3. Document layout components (Header, Footer)
4. Show sections (Hero, HowItWorks, FAQ)
5. Finally, full page composition

This order ensures dependencies are documented first.

---

## Tips

1. **Use Controls**: Make stories interactive with argTypes
2. **Document Props**: Use JSDoc comments for autodocs
3. **Show Variants**: Create stories for each variant
4. **Test Interactions**: Use play functions for user flows
5. **Check Accessibility**: Review a11y tab for each story
6. **Responsive Testing**: Use viewport addon for responsive views
7. **Group Stories**: Use consistent naming (UI/, Shared/, Layout/, etc.)

---

This guide provides complete templates for creating Storybook stories for all components in the US Mobile Trade In landing page.
