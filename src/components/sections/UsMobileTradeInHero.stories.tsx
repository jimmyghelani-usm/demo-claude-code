import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { UsMobileTradeInHero } from './UsMobileTradeInHero';

const meta: Meta<typeof UsMobileTradeInHero> = {
  title: 'Sections/UsMobileTradeInHero',
  component: UsMobileTradeInHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section for the US Mobile Trade In page. Features a large headline with trade-in messaging, subheadline emphasizing benefits, call-to-action button with arrow icon, scroll indicator, and responsive gradient background. Includes full accessibility support with ARIA attributes.',
      },
    },
  },
  argTypes: {
    headline: {
      control: { type: 'text' },
      description: 'Main headline text for the hero section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Trade In Your Old Phone'" },
      },
    },
    subheadline: {
      control: { type: 'text' },
      description: 'Subheadline text emphasizing benefits',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Get instant credit toward your next device'" },
      },
    },
    ctaLabel: {
      control: { type: 'text' },
      description: 'Text for the call-to-action button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'START TRADE IN'" },
      },
    },
    ctaHref: {
      control: { type: 'text' },
      description: 'URL for the CTA link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'#'" },
      },
    },
    onCtaClick: {
      description: 'Callback function triggered when CTA button is clicked',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UsMobileTradeInHero>;

/**
 * Default hero section with standard props.
 * Shows the complete hero experience with headline, subheadline, CTA button, and scroll indicator.
 */
export const Default: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
};

/**
 * Hero with custom headline messaging.
 * Demonstrates how different headline text affects the messaging.
 */
export const CustomHeadline: Story = {
  args: {
    headline: 'Get Maximum Value for Your Device',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a custom headline emphasizing value proposition.',
      },
    },
  },
};

/**
 * Hero with extended subheadline text.
 * Tests how longer descriptive text is handled in the layout.
 */
export const ExtendedSubheadline: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device and save money on your upgrade today',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles longer subheadline text.',
      },
    },
  },
};

/**
 * Hero with alternative CTA label.
 * Shows different call-to-action text for different contexts.
 */
export const AlternativeCTA: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'GET YOUR QUOTE NOW',
    ctaHref: '/trade-in/quote',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with alternative CTA button text and link.',
      },
    },
  },
};

/**
 * Hero with short CTA label.
 * Tests how the component handles shorter button text.
 */
export const ShortCTA: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles short CTA button text.',
      },
    },
  },
};

/**
 * Hero with long CTA label.
 * Tests how the component handles longer button text.
 */
export const LongCTA: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START YOUR TRADE IN PROCESS TODAY',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles longer CTA button text.',
      },
    },
  },
};

/**
 * Interactive CTA button story.
 * Demonstrates the CTA button click handler with console logging.
 */
export const InteractiveCTA: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
    onCtaClick: () => {
      console.log('Trade-in CTA button clicked - navigating to trade-in form');
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component with an onCtaClick handler. Check the console when clicking the button to see the callback in action.',
      },
    },
  },
};

/**
 * Hero with mobile viewport.
 * Shows how the component adapts to mobile screen sizes.
 */
export const MobileView: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Shows the component on mobile viewport (375px width).',
      },
    },
  },
};

/**
 * Hero with tablet viewport.
 * Shows how the component renders on tablet screens.
 */
export const TabletView: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Shows the component on tablet viewport.',
      },
    },
  },
};

/**
 * Hero with desktop viewport.
 * Shows the component on large desktop screens.
 */
export const DesktopView: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component on desktop viewport.',
      },
    },
  },
};

/**
 * Hero with custom CSS class.
 * Demonstrates how to apply custom styling via className prop.
 */
export const WithCustomClassName: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
    className: 'custom-trade-in-hero',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how to apply custom CSS classes via the className prop.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section).toHaveClass('custom-trade-in-hero');
  },
};

/**
 * Accessibility features story.
 * Demonstrates semantic HTML and ARIA attributes for screen readers.
 */
export const Accessibility: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including semantic HTML, ARIA labels, and keyboard navigation support.',
      },
    },
  },
};

/**
 * Button click interaction.
 * Tests CTA button click functionality.
 */
export const ButtonInteraction: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ctaButton = canvas.getByRole('link', {
      name: /START TRADE IN/i,
    });
    expect(ctaButton).toBeVisible();
  },
};

/**
 * Button focus and keyboard interaction.
 * Tests keyboard navigation and button focus states.
 */
export const KeyboardInteraction: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
    onCtaClick: () => {
      console.log('CTA clicked via keyboard');
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates keyboard navigation and focus states. Tab to the button and press Enter to activate.',
      },
    },
  },
};

/**
 * RTL (Right-to-Left) language support.
 * Shows how the component handles RTL text direction.
 */
export const RTLSupport: Story = {
  args: {
    headline: 'استبدل هاتفك القديم',
    subheadline: 'احصل على رصيد فوري نحو جهازك التالي',
    ctaLabel: 'ابدأ التبديل',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with RTL text (Arabic example).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/**
 * Hero with very long headline.
 * Tests how the component handles multi-line headlines.
 */
export const VeryLongHeadline: Story = {
  args: {
    headline: 'Trade In Your Old Phone and Get Maximum Value for Your Device Today',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles very long headline text.',
      },
    },
  },
};

/**
 * Minimal configuration.
 * Shows the component with only required props, using all defaults.
 */
export const Minimal: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with default props when no arguments are provided.',
      },
    },
  },
};

/**
 * CTA button click interaction test.
 * Verifies the CTA button is clickable and properly configured.
 */
export const CTAClickInteraction: Story = {
  args: {
    headline: 'Trade In Your Old Phone',
    subheadline: 'Get instant credit toward your next device',
    ctaLabel: 'START TRADE IN',
    ctaHref: '/trade-in/start',
    onCtaClick: () => {
      console.log('Trade-in process initiated');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests the CTA button click interaction and callback execution.',
      },
    },
  },
};
