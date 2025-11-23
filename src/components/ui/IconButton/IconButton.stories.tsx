import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

/**
 * IconButton Component Stories
 * Showcases all icon button variants and states
 * - Variants: outlined, filled, ghost
 * - States: default, hover, active, disabled, focus
 */
const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Circular icon button for actions like chat, favorites, etc. Supports outlined, filled, and ghost variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
      description: 'Button style variant',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the button',
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

// SVG Icons
const ChatIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SettingsIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m-4.24 7.08l4.24-4.24M23 12h-6m-6 0H5M19.78 4.22l-4.24 4.24m4.24 7.08l-4.24-4.24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Outlined Variant
 * Default outlined style with white border
 */
export const Outlined: Story = {
  args: {
    icon: ChatIcon,
    variant: 'outlined',
    ariaLabel: 'Chat',
  },
};

/**
 * Filled Variant
 * Filled style with blue background
 */
export const Filled: Story = {
  args: {
    icon: HeartIcon,
    variant: 'filled',
    ariaLabel: 'Like',
  },
};

/**
 * Ghost Variant
 * Subtle ghost style with transparent background
 */
export const Ghost: Story = {
  args: {
    icon: StarIcon,
    variant: 'ghost',
    ariaLabel: 'Favorite',
  },
};

/**
 * Outlined Disabled
 * Outlined button in disabled state
 */
export const OutlinedDisabled: Story = {
  args: {
    icon: ChatIcon,
    variant: 'outlined',
    ariaLabel: 'Chat',
    disabled: true,
  },
};

/**
 * Filled Disabled
 * Filled button in disabled state
 */
export const FilledDisabled: Story = {
  args: {
    icon: HeartIcon,
    variant: 'filled',
    ariaLabel: 'Like',
    disabled: true,
  },
};

/**
 * Ghost Disabled
 * Ghost button in disabled state
 */
export const GhostDisabled: Story = {
  args: {
    icon: StarIcon,
    variant: 'ghost',
    ariaLabel: 'Favorite',
    disabled: true,
  },
};

/**
 * All Variants
 * Comparison of all button variants
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <IconButton
        icon={ChatIcon}
        variant="outlined"
        ariaLabel="Chat"
      />
      <IconButton
        icon={HeartIcon}
        variant="filled"
        ariaLabel="Like"
      />
      <IconButton
        icon={StarIcon}
        variant="ghost"
        ariaLabel="Favorite"
      />
    </div>
  ),
};

/**
 * All Variants Disabled
 * Comparison of all disabled button states
 */
export const AllVariantsDisabled: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <IconButton
        icon={ChatIcon}
        variant="outlined"
        ariaLabel="Chat"
        disabled
      />
      <IconButton
        icon={HeartIcon}
        variant="filled"
        ariaLabel="Like"
        disabled
      />
      <IconButton
        icon={StarIcon}
        variant="ghost"
        ariaLabel="Favorite"
        disabled
      />
    </div>
  ),
};

/**
 * Icon Button Group
 * Multiple icon buttons in a row (toolbar)
 */
export const ToolbarGroup: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <IconButton
        icon={ChatIcon}
        variant="outlined"
        ariaLabel="Chat"
      />
      <IconButton
        icon={HeartIcon}
        variant="outlined"
        ariaLabel="Like"
      />
      <IconButton
        icon={StarIcon}
        variant="outlined"
        ariaLabel="Favorite"
      />
      <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
      <IconButton
        icon={SettingsIcon}
        variant="outlined"
        ariaLabel="Settings"
      />
    </div>
  ),
};

/**
 * Interactive Feedback
 * Icon button showing focus state
 */
export const Interactive: Story = {
  args: {
    icon: HeartIcon,
    variant: 'filled',
    ariaLabel: 'Like',
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      button.focus();
    }
  },
};
