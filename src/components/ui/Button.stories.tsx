import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

/**
 * Button component with multiple variants and sizes.
 *
 * The Button component provides accessible button interactions with:
 * - Three visual variants: primary, secondary, and text
 * - Three sizes: small, medium, and large
 * - Disabled state support
 * - Full-width option
 * - Proper hover, focus, and active states
 *
 * ## Accessibility
 * - Semantic `<button>` element
 * - Keyboard accessible (Enter and Space)
 * - Disabled state prevents interaction
 * - Focus visible for keyboard navigation
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary button component used throughout the US Mobile Trade In application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
      description: 'Visual style variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the button full width of its container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content/label',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary button used for main CTAs like "Check trade in value" and "Get US Mobile"
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Check trade in value',
  },
};

/**
 * Secondary button for alternative actions
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Learn More',
  },
};

/**
 * Text button for subtle actions like "Sign In"
 */
export const Text: Story = {
  args: {
    variant: 'text',
    size: 'md',
    children: 'Sign In',
  },
};

/**
 * Small button variant for compact spaces
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

/**
 * Medium button variant (default size)
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Medium Button',
  },
};

/**
 * Large button variant for prominent CTAs
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

/**
 * Disabled button state prevents interaction
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Disabled Button',
    disabled: true,
  },
};

/**
 * Full width button spans the entire container width
 */
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

/**
 * All button variants displayed together for comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" size="md">
        Primary
      </Button>
      <Button variant="secondary" size="md">
        Secondary
      </Button>
      <Button variant="text" size="md">
        Text
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button variants at medium size.',
      },
    },
  },
};

/**
 * All button sizes displayed together for comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button sizes in primary variant.',
      },
    },
  },
};

/**
 * Interactive test demonstrating button click behavior
 */

/**
 * Shows that disabled buttons cannot be clicked
 */

/**
 * Common button patterns used in the Trade In landing page
 */
export const LandingPageButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Hero Section CTA
        </h4>
        <Button variant="primary" size="lg">
          Check trade in value
        </Button>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
          Header Actions
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="text" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="md">
            Get US Mobile
          </Button>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>FAQ CTA</h4>
        <Button variant="primary" size="lg">
          Contact Support
        </Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Button patterns used throughout the Trade In landing page.',
      },
    },
  },
};
