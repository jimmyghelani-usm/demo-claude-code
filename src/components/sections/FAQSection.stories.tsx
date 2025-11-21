import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect, waitFor } from 'storybook/test';
import { FAQSection } from './FAQSection';
import type { FAQItem } from './FAQSection';

const meta: Meta<typeof FAQSection> = {
  title: 'Sections/FAQSection',
  component: FAQSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Frequently Asked Questions section with accordion functionality. Features a 2-column grid layout on desktop, collapsible FAQ items with smooth animations, full keyboard navigation, and ARIA accessibility attributes. Questions display with expand/collapse icons, and answers appear with smooth transitions.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The section title displayed above the FAQ items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Frequently asked questions"' },
      },
    },
    items: {
      description: 'Array of FAQ items with question and answer text',
      table: {
        type: { summary: 'FAQItem[]' },
        defaultValue: { summary: '6 default items' },
      },
      control: false,
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FAQSection>;

/**
 * Default story showing the FAQ section with all 6 default items.
 * Users can click on questions to expand/collapse answers.
 */
export const Default: Story = {
  args: {
    title: 'Frequently asked questions',
  },
};

/**
 * Custom title story showing how to customize the section heading.
 */
export const CustomTitle: Story = {
  args: {
    title: 'Have Questions? We Have Answers',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates customizing the section title.',
      },
    },
  },
};

/**
 * Custom items story showing a shorter FAQ list with custom questions and answers.
 */
export const CustomItems: Story = {
  args: {
    title: 'Quick Questions',
    items: [
      {
        id: 'custom-1',
        question: 'What makes this different?',
        answer:
          'Our rewards program is designed with your needs in mind. Unlike traditional programs, we offer transparency, flexibility, and real value for your loyalty.',
      },
      {
        id: 'custom-2',
        question: 'How long does it take to earn rewards?',
        answer:
          'Rewards are credited immediately with each purchase. You can start redeeming as soon as you have enough points accumulated.',
      },
      {
        id: 'custom-3',
        question: 'Can I transfer my rewards?',
        answer:
          'Currently, rewards are tied to your account for security and terms of service compliance. However, you can use them for account credits or services.',
      },
      {
        id: 'custom-4',
        question: 'What if I have more questions?',
        answer:
          'Contact our customer support team at support@usmobile.com or visit our help center for more information.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom FAQ items (4 items instead of default 6).',
      },
    },
  },
};

/**
 * Accessibility story demonstrating keyboard navigation and ARIA attributes.
 * Users can use Tab to navigate and Enter/Space to toggle items.
 */
export const Accessibility: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates full keyboard accessibility with proper ARIA attributes, semantic HTML, and focus management. Use Tab to navigate, Enter or Space to toggle answers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section has proper aria-labelledby
    const section = canvasElement.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'faq-title');

    // Verify title has proper id
    const title = canvas.getByRole('heading', {
      name: /frequently asked questions/i,
    });
    expect(title).toHaveAttribute('id', 'faq-title');

    // Verify first question button exists and has aria-expanded
    const firstButton = canvas.getAllByRole('button')[0];
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(firstButton).toHaveAttribute('aria-controls');

    // Click to expand first item
    await userEvent.click(firstButton);

    // Verify button now shows expanded state
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Verify answer region exists with proper role and aria-labelledby
    const answerId = firstButton.getAttribute('aria-controls');
    if (answerId) {
      const answerRegion = canvasElement.querySelector(`#${answerId}`);
      expect(answerRegion).toHaveAttribute('role', 'region');
      expect(answerRegion).toHaveAttribute('aria-labelledby');
    }

    // Verify button is keyboard accessible
    firstButton.focus();
    expect(firstButton).toHaveFocus();
  },
};

/**
 * Interactive story showing expand/collapse functionality.
 * Demonstrates clicking on a question to reveal its answer.
 */
export const InteractiveExpand: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the click-to-expand functionality. Click on any question to see its answer appear with a smooth animation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all question buttons
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Verify first item is initially collapsed
    const firstButton = buttons[0];
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await userEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Wait for answer to appear
    const answerId = firstButton.getAttribute('aria-controls');
    if (answerId) {
      await waitFor(() => {
        const answerElement = canvasElement.querySelector(`#${answerId}`);
        expect(answerElement).toBeInTheDocument();
      });
    }

    // Click again to collapse
    await userEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Keyboard navigation story showing Tab and Enter key usage.
 * Demonstrates navigating through items using keyboard only.
 */
export const KeyboardNavigation: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows keyboard navigation with Tab to move between items and Enter/Space to toggle. All interactive elements are keyboard accessible.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all buttons
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(2);

    // Focus first button
    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();

    // Press Enter to expand first item
    await userEvent.keyboard('{Enter}');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    // Tab to next button
    await userEvent.tab();
    expect(buttons[1]).toHaveFocus();

    // Press Space to expand second item
    await userEvent.keyboard(' ');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

    // Both items should be expanded now
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * Multiple expanded items story showing that multiple FAQ items can be open simultaneously.
 */
export const MultipleExpanded: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates that users can have multiple FAQ items expanded at the same time for easy comparison.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all buttons
    const buttons = canvas.getAllByRole('button');

    // Expand first 3 items
    for (let i = 0; i < 3; i++) {
      await userEvent.click(buttons[i]);
    }

    // Verify all 3 are expanded
    for (let i = 0; i < 3; i++) {
      expect(buttons[i]).toHaveAttribute('aria-expanded', 'true');
    }

    // Verify remaining items are collapsed
    for (let i = 3; i < buttons.length; i++) {
      expect(buttons[i]).toHaveAttribute('aria-expanded', 'false');
    }
  },
};

/**
 * Responsive layout story showing the component on different screen sizes.
 */
export const ResponsiveLayout: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: {
      description: {
        story:
          'Responsive FAQ section that adapts to different screen sizes. 2-column grid on desktop, single column on tablets and mobile.',
      },
    },
  },
};

/**
 * Mobile viewport story showing the FAQ section optimized for small screens.
 */
export const MobileViewport: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'FAQ section optimized for mobile devices with single-column layout, touch-friendly button sizes, and readable typography.',
      },
    },
  },
};

/**
 * Dark theme story showing the component with dark background as designed.
 */
export const DarkTheme: Story = {
  args: {
    title: 'Frequently asked questions',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The FAQ section features a dark gradient background with light text, providing excellent contrast and visual hierarchy for accessibility.',
      },
    },
  },
};

/**
 * Custom styling story showing the component with a custom CSS class.
 */
export const CustomStyling: Story = {
  args: {
    title: 'Frequently asked questions',
    className: 'custom-faq-section',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates applying custom CSS classes via the className prop for additional styling flexibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section).toHaveClass('custom-faq-section');
  },
};
