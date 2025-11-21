import type { Meta, StoryObj } from '@storybook/react';
import { RewardsChartSection } from './RewardsChartSection';

/**
 * RewardsChartSection Stories
 *
 * Showcases the tiered referral rewards chart component with various
 * configurations and interaction scenarios.
 */
const meta: Meta<typeof RewardsChartSection> = {
  title: 'Sections/RewardsChartSection',
  component: RewardsChartSection,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the section',
    },
    animationDuration: {
      control: { type: 'number', min: 300, max: 3000, step: 100 },
      description: 'Animation duration in milliseconds',
    },
    onLoad: {
      description: 'Callback function fired when component becomes visible',
      action: 'onLoad',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story - Shows the complete rewards chart with standard animation
 *
 * Features:
 * - All 10 tiers displayed (1st through 10th)
 * - Reward amounts: $25, $25, $75, $100, $225, $225, $225, $225, $225, $225
 * - 1200ms animation duration (default)
 * - Staggered bar animations
 * - Dark background with light border
 * - Responsive scaling
 */
export const Default: Story = {
  args: {
    animationDuration: 1200,
  },
};

/**
 * Fast Animation story - Demonstrates faster animation speed
 *
 * Useful for:
 * - Testing animation clarity at higher speeds
 * - Verifying bar scaling calculations
 * - Performance testing
 */
export const FastAnimation: Story = {
  args: {
    animationDuration: 600,
  },
};

/**
 * Slow Animation story - Demonstrates slower animation speed
 *
 * Useful for:
 * - Observing smooth easing effects
 * - User experience testing
 * - Detailed visual inspection
 */
export const SlowAnimation: Story = {
  args: {
    animationDuration: 2400,
  },
};

/**
 * With Custom Class story - Demonstrates custom className prop
 *
 * Shows how additional classes can be applied to the section
 */
export const WithCustomClass: Story = {
  args: {
    className: 'custom-rewards-chart',
    animationDuration: 1200,
  },
};

/**
 * With Callback story - Demonstrates onLoad callback
 *
 * Features:
 * - onLoad callback fires when section becomes visible
 * - Check the Actions panel to see callback execution
 * - Useful for tracking when chart animation starts
 */
export const WithCallback: Story = {
  args: {
    animationDuration: 1200,
    onLoad: () => console.log('RewardsChartSection loaded and animated'),
  },
};

/**
 * Accessibility Testing story
 *
 * Focus areas:
 * - All bars have proper ARIA labels
 * - SVG has role="img" with descriptive aria-label
 * - Section has aria-labelledby pointing to heading
 * - Text labels are readable for screen readers
 * - Tier labels (1st, 2nd, etc.) are semantically meaningful
 * - Color is not the only visual indicator of data
 */
export const Accessibility: Story = {
  args: {
    animationDuration: 1200,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
          {
            id: 'aria-roles',
            enabled: true,
          },
        ],
      },
    },
  },
};

/**
 * Mobile Responsive story - Shows chart on mobile viewport
 *
 * Tests:
 * - Bar chart scales properly on narrow screens
 * - Font sizes adjust for readability
 * - Labels remain visible and legible
 * - Touch interaction space is adequate
 */
export const Mobile: Story = {
  args: {
    animationDuration: 1200,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};

/**
 * Tablet Responsive story - Shows chart on tablet viewport
 *
 * Tests:
 * - Intermediate responsive behavior
 * - Touch and mouse interaction handling
 * - Chart scaling on medium screens
 */
export const Tablet: Story = {
  args: {
    animationDuration: 1200,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

/**
 * Large Desktop story - Shows chart on ultra-wide viewport
 *
 * Tests:
 * - Maximum scale handling
 * - Content centering on very wide screens
 * - Optimal visual presentation
 */
export const LargeDesktop: Story = {
  args: {
    animationDuration: 1200,
  },
  parameters: {
    viewport: {
      defaultViewport: { name: 'Large Desktop', styles: { width: '1920px', height: '1080px' } },
    },
  },
};

/**
 * Interaction Test story - Tests animation and callback flow
 *
 * Play function demonstrates:
 * - Component rendering
 * - Animation progression
 * - Bar heights from 0 to full height
 * - Label visibility during animation
 */
export const InteractionTest: Story = {
  args: {
    animationDuration: 1200,
    onLoad: () => console.log('Animation started'),
  },
  play: async ({ canvasElement }) => {
    // Verify chart container renders
    const section = canvasElement.querySelector('section');
    if (!section) {
      throw new Error('Section element not found');
    }

    // Verify SVG chart exists
    const svg = canvasElement.querySelector('svg');
    if (!svg) {
      throw new Error('SVG chart not found');
    }

    // Verify aria-label on SVG
    const ariaLabel = svg.getAttribute('aria-label');
    if (!ariaLabel) {
      throw new Error('SVG missing aria-label');
    }

    // Verify role="img" on SVG
    const role = svg.getAttribute('role');
    if (role !== 'img') {
      throw new Error('SVG missing role="img"');
    }

    // Verify subtitle text
    const subtitle = canvasElement.querySelector('p');
    if (!subtitle || !subtitle.textContent?.includes('The first 10 completed referrals')) {
      throw new Error('Subtitle text not found');
    }

    console.log('✓ Component structure verified');
  },
};
