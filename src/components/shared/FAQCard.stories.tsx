import type { Meta, StoryObj } from '@storybook/react-vite';
import { FAQCard } from './FAQCard';

/**
 * FAQCard component - collapsible accordion card for FAQ content.
 *
 * Design Specifications:
 * - White background with 1px border
 * - 12px border radius
 * - Smooth height animation on expand/collapse
 * - Plus/minus icon toggle
 * - Click or keyboard activation (Enter/Space)
 *
 * The card maintains its own expanded/collapsed state and provides a clean
 * accordion interface for FAQ sections.
 *
 * ## Accessibility
 * - Semantic `<article>` element
 * - `<button>` for header with proper ARIA attributes
 * - `aria-expanded` state for screen readers
 * - Keyboard support (Enter and Space)
 * - `aria-hidden` on content when collapsed
 * - Focus visible for keyboard navigation
 */
const meta = {
  title: 'Shared/FAQCard',
  component: FAQCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Collapsible accordion card component for displaying FAQ questions and answers with smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    question: {
      control: 'text',
      description: 'Question text displayed in the card header',
    },
    answer: {
      control: 'text',
      description: 'Answer text displayed when card is expanded',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the card starts in expanded state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof FAQCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default collapsed state
 */
export const Collapsed: Story = {
  args: {
    question: 'What devices can I trade in?',
    answer:
      'You can trade in smartphones, tablets, smartwatches, and laptops from most major brands including Apple, Samsung, Google, and more. The device must be functional and in reasonable condition.',
    defaultExpanded: false,
  },
};

/**
 * Default expanded state
 */
export const Expanded: Story = {
  args: {
    question: 'How is my trade-in value calculated?',
    answer:
      'Trade-in values are based on your device model, storage capacity, condition, and current market demand. Our instant quote tool gives you a transparent estimate based on these factors.',
    defaultExpanded: true,
  },
};

/**
 * FAQ card with long answer text to test text wrapping and content height
 */
export const LongAnswer: Story = {
  args: {
    question: 'Is my data safe?',
    answer:
      'Absolutely. We take data security very seriously. We recommend you back up and erase your data before shipping your device to us. Once we receive your device, we perform a complete and thorough data wipe following industry-standard security protocols. All personal information, photos, contacts, messages, and app data are permanently erased using DOD-level wiping standards that meet or exceed international data security requirements. Your privacy and security are our top priorities.',
    defaultExpanded: true,
  },
};

/**
 * FAQ card with short, concise answer
 */
export const ShortAnswer: Story = {
  args: {
    question: 'Do I need to include accessories?',
    answer: 'No, you only need to send the device itself.',
    defaultExpanded: true,
  },
};

/**
 * FAQ card with very long question
 */
export const LongQuestion: Story = {
  args: {
    question:
      'What happens if my device condition is significantly different from what I originally described in the online assessment form?',
    answer:
      "If the condition differs from your description, we'll send you a revised offer. You can accept the new offer or have your device returned to you at no cost.",
    defaultExpanded: false,
  },
};

/**
 * Multiple FAQ cards stacked together
 */
export const MultipleFAQs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <FAQCard
        question="What devices can I trade in?"
        answer="You can trade in smartphones, tablets, smartwatches, and laptops from most major brands including Apple, Samsung, Google, and more."
        defaultExpanded={true}
      />
      <FAQCard
        question="How long does the trade-in process take?"
        answer="Once we receive your device, we inspect it within 1-2 business days. If everything checks out, you'll receive payment within 2-3 business days after inspection."
        defaultExpanded={false}
      />
      <FAQCard
        question="Is my data safe?"
        answer="Absolutely. We recommend you back up and erase your data before shipping. Once we receive your device, we perform a complete data wipe following industry-standard security protocols."
        defaultExpanded={false}
      />
      <FAQCard
        question="What payment methods are available?"
        answer="You can receive payment via bank transfer, PayPal, or as credit toward your US Mobile account."
        defaultExpanded={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack of FAQ cards demonstrating accordion behavior with one initially expanded.',
      },
    },
  },
};

/**
 * All common FAQ questions from the landing page
 */
export const AllLandingPageFAQs: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '1200px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FAQCard
          question="What devices can I trade in?"
          answer="You can trade in smartphones, tablets, smartwatches, and laptops from most major brands including Apple, Samsung, Google, and more. The device must be functional and in reasonable condition."
          defaultExpanded={true}
        />
        <FAQCard
          question="How is my trade-in value calculated?"
          answer="Trade-in values are based on your device model, storage capacity, condition, and current market demand. Our instant quote tool gives you a transparent estimate based on these factors."
        />
        <FAQCard
          question="How long does the trade-in process take?"
          answer="Once we receive your device, we inspect it within 1-2 business days. If everything checks out, you'll receive payment within 2-3 business days after inspection."
        />
        <FAQCard
          question="What happens if my device condition doesn't match what I described?"
          answer="If the condition differs significantly from your description, we'll send you a revised offer. You can accept the new offer or have your device returned to you at no cost."
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FAQCard
          question="Is my data safe?"
          answer="Absolutely. We recommend you back up and erase your data before shipping. Once we receive your device, we perform a complete data wipe following industry-standard security protocols."
        />
        <FAQCard
          question="Can I trade in a device that's not paid off?"
          answer="You can trade in a device with an outstanding balance, but you're responsible for paying off the remaining amount to your carrier or financing company."
        />
        <FAQCard
          question="What payment methods are available?"
          answer="You can receive payment via bank transfer, PayPal, or as credit toward your US Mobile account. Choose your preferred method when you submit your trade-in."
        />
        <FAQCard
          question="Do I need to include accessories?"
          answer="No, you only need to send the device itself. Keep your charger, case, and other accessories. However, including original packaging may increase your trade-in value slightly."
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete two-column FAQ layout as seen in the FAQSection component.',
      },
    },
  },
};

/**
 * Interactive test - clicking to expand a collapsed FAQ
 */
export const ClickToExpand: Story = {
  args: {
    question: 'What devices can I trade in?',
    answer:
      'You can trade in smartphones, tablets, smartwatches, and laptops from most major brands.',
    defaultExpanded: false,
  },
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates clicking to expand a collapsed FAQ card.',
      },
    },
  },
};

/**
 * Interactive test - clicking to collapse an expanded FAQ
 */
export const ClickToCollapse: Story = {
  args: {
    question: 'How is my trade-in value calculated?',
    answer: 'Trade-in values are based on your device model, storage capacity, and condition.',
    defaultExpanded: true,
  },
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates clicking to collapse an expanded FAQ card.',
      },
    },
  },
};

/**
 * Interactive test - keyboard navigation with Enter key
 */
export const KeyboardExpandWithEnter: Story = {
  args: {
    question: 'Is my data safe?',
    answer:
      'Absolutely. We perform a complete data wipe following industry-standard security protocols.',
    defaultExpanded: false,
  },
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard accessibility with Enter key.',
      },
    },
  },
};

/**
 * Interactive test - keyboard navigation with Space key
 */
export const KeyboardExpandWithSpace: Story = {
  args: {
    question: 'What payment methods are available?',
    answer: 'You can receive payment via bank transfer, PayPal, or as credit.',
    defaultExpanded: false,
  },
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard accessibility with Space key.',
      },
    },
  },
};

/**
 * Interactive test - toggling multiple times
 */
export const ToggleMultipleTimes: Story = {
  args: {
    question: 'Can I trade in a device that\'s not paid off?',
    answer: 'You can trade in a device with an outstanding balance.',
    defaultExpanded: false,
  },
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates toggling FAQ card multiple times.',
      },
    },
  },
};
