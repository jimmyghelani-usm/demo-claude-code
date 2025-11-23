import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Button Component Stories
 * Showcases all button variants, states, and interactions
 * - Primary variant: White background with blue text
 * - Secondary variant: Transparent background with white border
 * - States: default, hover, active, disabled, focus
 */
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary action button with primary and secondary variants. Supports icons and disabled state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text label',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler callback',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary Button
 * Default primary button with white background and blue text
 */
export const Primary: Story = {
  args: {
    label: 'Try for Free',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      button.focus();
    }
  },
};

/**
 * Secondary Button
 * Outline-style secondary button with transparent background
 */
export const Secondary: Story = {
  args: {
    label: 'Sign In',
    variant: 'secondary',
  },
};

/**
 * Primary Disabled
 * Primary button in disabled state
 */
export const PrimaryDisabled: Story = {
  args: {
    label: 'Try for Free',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * Secondary Disabled
 * Secondary button in disabled state
 */
export const SecondaryDisabled: Story = {
  args: {
    label: 'Sign In',
    variant: 'secondary',
    disabled: true,
  },
};

/**
 * Button with Icon
 * Primary button with an icon element
 */
export const WithIcon: Story = {
  args: {
    label: 'Download',
    variant: 'primary',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1V11M8 11L3 6M8 11L13 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * Secondary Button with Icon
 * Secondary button with an icon element
 */
export const SecondaryWithIcon: Story = {
  args: {
    label: 'Learn More',
    variant: 'secondary',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 13L11 8L6 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * Button Variants Comparison
 * All button variants side by side
 */
export const AllVariants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button {...args} label="Primary" variant="primary" />
      <Button {...args} label="Secondary" variant="secondary" />
      <Button {...args} label="Primary Disabled" variant="primary" disabled />
      <Button {...args} label="Secondary Disabled" variant="secondary" disabled />
    </div>
  ),
};

/**
 * Button Hover States
 * Interactive demonstration of button hover states
 */
export const InteractiveStates: Story = {
  args: {
    label: 'Hover me',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      // Focus on the button for visibility
      button.focus();
    }
  },
};

/**
 * Long Label Button
 * Button with longer text label
 */
export const LongLabel: Story = {
  args: {
    label: 'Get Started with Premium Plan',
    variant: 'primary',
  },
};
