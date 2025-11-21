import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect, waitFor } from 'storybook/test';
import { ReferralRewardsHero } from './ReferralRewardsHero';

const meta: Meta<typeof ReferralRewardsHero> = {
  title: 'Sections/ReferralRewardsHero',
  component: ReferralRewardsHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section showcasing referral rewards with an animated dollar counter. Features smooth counting animation with easing, gradient blur effects, and a CTA button. Animates when the component enters the viewport using Intersection Observer.',
      },
    },
  },
  argTypes: {
    targetAmount: {
      control: { type: 'number', min: 10000, max: 50000000, step: 100000 },
      description: 'Target amount to count up to for the animated counter',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1000000' },
      },
    },
    animationDuration: {
      control: { type: 'number', min: 500, max: 5000, step: 100 },
      description: 'Duration of the counter animation in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2000' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    onCtaClick: {
      description: 'Callback function triggered when the CTA button is clicked',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReferralRewardsHero>;

/**
 * Default story showing the component with standard props.
 * Counter animates from $0 to $1,000,000 over 2 seconds.
 */
export const Default: Story = {
  args: {
    targetAmount: 1000000,
    animationDuration: 2000,
  },
};

/**
 * Custom amount story showing the component with a higher target amount.
 * Counter animates from $0 to $5,000,000 to demonstrate the flexibility
 * of the targetAmount prop.
 */
export const CustomAmount: Story = {
  args: {
    targetAmount: 5000000,
    animationDuration: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a custom target amount of $5,000,000.',
      },
    },
  },
};

/**
 * Fast animation story with a shorter animation duration.
 * Counter animates quickly (1 second) to $1,000,000.
 */
export const FastAnimation: Story = {
  args: {
    targetAmount: 1000000,
    animationDuration: 1000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates a faster animation duration (1 second) for a snappier feel.',
      },
    },
  },
};

/**
 * Slow animation story with extended animation duration.
 * Counter animates slowly (5 seconds) to allow more time to observe the counting.
 */
export const SlowAnimation: Story = {
  args: {
    targetAmount: 1000000,
    animationDuration: 5000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates a slower animation duration (5 seconds) for detailed observation.',
      },
    },
  },
};

/**
 * Large amount story showcasing a significant referral reward number.
 * Counter animates to $25,000,000 with standard animation duration.
 */
export const LargeAmount: Story = {
  args: {
    targetAmount: 25000000,
    animationDuration: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a large amount ($25,000,000).',
      },
    },
  },
};

/**
 * Interactive story demonstrating the onCtaClick callback.
 * Click the "Start Earning Now" button to see the interaction in action.
 */
export const WithClickHandler: Story = {
  args: {
    targetAmount: 1000000,
    animationDuration: 2000,
    onCtaClick: () => {
      console.log('CTA button clicked - user initiated referral flow');
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the onCtaClick callback. Check the console when clicking the button.',
      },
    },
  },
};

/**
 * Story demonstrating counter animation completion.
 * Waits for the counter animation to complete and verifies the final amount.
 */
export const AnimationCompletion: Story = {
  args: {
    targetAmount: 100000,
    animationDuration: 1500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates that the counter completes animation and displays the correct final amount.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for the amount display to be visible
    const amountDisplay = canvas.getByText(/\$\d+/);
    expect(amountDisplay).toBeInTheDocument();

    // Wait for animation to complete (animationDuration + buffer)
    await waitFor(
      () => {
        // Check that the final amount is displayed (100,000)
        const text = amountDisplay.textContent || '';
        expect(text).toMatch(/100,000/);
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Story demonstrating accessibility features.
 * Verifies semantic HTML, ARIA labels, and keyboard navigation.
 */
export const Accessibility: Story = {
  args: {
    targetAmount: 1000000,
    animationDuration: 2000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Verifies accessibility features including semantic HTML, ARIA labels, and focus states.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section has proper aria-labelledby
    const section = canvasElement.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'referral-heading');

    // Verify heading has proper id
    const heading = canvas.getByRole('heading', {
      name: /given out in referral rewards/i,
    });
    expect(heading).toHaveAttribute('id', 'referral-heading');

    // Verify button has aria-label
    const button = canvas.getByRole('button', {
      name: /start earning referral rewards now/i,
    });
    expect(button).toHaveAttribute(
      'aria-label',
      'Start earning referral rewards now'
    );

    // Verify amount has aria-live region
    const amountDisplay = canvas.getByText(/\$\d+/);
    expect(amountDisplay).toHaveAttribute('aria-live', 'polite');
    expect(amountDisplay).toHaveAttribute('aria-atomic', 'true');

    // Verify button is keyboard accessible
    button.focus();
    expect(button).toHaveFocus();

    // Simulate keyboard navigation with Enter key
    await userEvent.keyboard('{Enter}');
    expect(button).toBeInTheDocument();
  },
};

/**
 * Story showing the component with custom styling via className.
 * Demonstrates how to apply additional CSS classes.
 */
export const WithCustomClassName: Story = {
  args: {
    targetAmount: 1000000,
    animationDuration: 2000,
    className: 'custom-referral-hero',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates applying custom CSS classes via the className prop.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section).toHaveClass('custom-referral-hero');
  },
};
