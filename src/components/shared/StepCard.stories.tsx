import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepCard } from './StepCard';

/**
 * StepCard component displays a single step in the trade-in process.
 *
 * Design Specifications:
 * - Width: 311px
 * - Center-aligned content
 * - Large icon with circular background
 * - Step label (e.g., "Step 1")
 * - Title and description
 *
 * The card is used in the HowItWorksSection to explain the 3-step trade-in process:
 * 1. Check trade in value
 * 2. Ship your device
 * 3. Get Paid
 *
 * ## Accessibility
 * - Uses semantic `<article>` element
 * - Heading hierarchy with `<h3>` for title
 * - Icon marked as decorative with `aria-hidden="true"`
 */
const meta = {
  title: 'Shared/StepCard',
  component: StepCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card component for displaying trade-in process steps with icon, step number, title, and description.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    stepNumber: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Step number (1, 2, or 3)',
    },
    title: {
      control: 'text',
      description: 'Title of the step',
    },
    description: {
      control: 'text',
      description: 'Description text explaining the step',
    },
    icon: {
      control: 'text',
      description: 'Icon to display (emoji, SVG, or image)',
    },
  },
} satisfies Meta<typeof StepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Step 1: Check trade in value
 * First step in the trade-in process where users get an instant quote
 */
export const Step1CheckValue: Story = {
  args: {
    stepNumber: 1,
    title: 'Check trade in value',
    description:
      'Answer a few questions about your device to get an instant quote. No commitments required.',
    icon: '✓',
  },
};

/**
 * Step 2: Ship your device
 * Second step where users ship their device with a prepaid label
 */
export const Step2ShipDevice: Story = {
  args: {
    stepNumber: 2,
    title: 'Ship your device',
    description:
      "Pack up your device and ship it to us for free. We'll send you a prepaid shipping label.",
    icon: '📦',
  },
};

/**
 * Step 3: Get Paid
 * Final step where users receive payment for their device
 */
export const Step3GetPaid: Story = {
  args: {
    stepNumber: 3,
    title: 'Get Paid',
    description:
      "Once we receive and verify your device, you'll get paid via your preferred method within 2-3 business days.",
    icon: '💵',
  },
};

/**
 * All three steps displayed in sequence
 */
export const AllSteps: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '88px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '40px',
        maxWidth: '1200px',
      }}
    >
      <StepCard
        stepNumber={1}
        title="Check trade in value"
        description="Answer a few questions about your device to get an instant quote. No commitments required."
        icon="✓"
      />
      <StepCard
        stepNumber={2}
        title="Ship your device"
        description="Pack up your device and ship it to us for free. We'll send you a prepaid shipping label."
        icon="📦"
      />
      <StepCard
        stepNumber={3}
        title="Get Paid"
        description="Once we receive and verify your device, you'll get paid via your preferred method within 2-3 business days."
        icon="💵"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete 3-step process as displayed in the HowItWorksSection.',
      },
    },
  },
};

/**
 * Step card with shortened description
 */
export const ShortDescription: Story = {
  args: {
    stepNumber: 1,
    title: 'Quick Process',
    description: 'Get your quote in minutes.',
    icon: '⚡',
  },
};

/**
 * Step card with long description to test text wrapping
 */
export const LongDescription: Story = {
  args: {
    stepNumber: 2,
    title: 'Detailed Inspection Process',
    description:
      'Our expert team carefully inspects every device that comes through our facility. We check for functionality, physical condition, screen quality, battery health, water damage, and any other factors that might affect the value. This thorough process ensures accurate valuations and helps us provide the best possible offers to our customers.',
    icon: '🔍',
  },
};

/**
 * Step card with SVG icon instead of emoji
 */
export const WithSVGIcon: Story = {
  args: {
    stepNumber: 1,
    title: 'Check trade in value',
    description: 'Answer a few questions about your device to get an instant quote.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#1D5FF6" opacity="0.1" />
        <path
          d="M15 20L18 23L25 16"
          stroke="#1D5FF6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * Alternative icon options for different steps
 */
export const AlternativeIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', textAlign: 'center', fontSize: '14px' }}>
          Check Value Icons
        </h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <StepCard
            stepNumber={1}
            title="Check value"
            description="Get an instant quote"
            icon="✓"
          />
          <StepCard
            stepNumber={1}
            title="Check value"
            description="Get an instant quote"
            icon="💰"
          />
          <StepCard
            stepNumber={1}
            title="Check value"
            description="Get an instant quote"
            icon="🔍"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exploration of different icon options for the same step.',
      },
    },
  },
};

/**
 * Compact step cards in a grid layout
 */
export const CompactGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 311px))',
        gap: '32px',
        padding: '40px',
        justifyContent: 'center',
        maxWidth: '1200px',
      }}
    >
      <StepCard
        stepNumber={1}
        title="Check trade in value"
        description="Answer questions about your device"
        icon="✓"
      />
      <StepCard
        stepNumber={2}
        title="Ship your device"
        description="We'll send you a prepaid label"
        icon="📦"
      />
      <StepCard
        stepNumber={3}
        title="Get Paid"
        description="Payment within 2-3 business days"
        icon="💵"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Steps displayed in a responsive grid with shortened descriptions.',
      },
    },
  },
};

/**
 * Different device types that can be traded in
 */
export const DeviceTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <StepCard
        stepNumber={1}
        title="Trade in your phone"
        description="Get cash for your old iPhone or Android device"
        icon="📱"
      />
      <StepCard
        stepNumber={2}
        title="Trade in your tablet"
        description="iPads and Android tablets accepted"
        icon="📱"
      />
      <StepCard
        stepNumber={3}
        title="Trade in your watch"
        description="Apple Watch and Samsung Galaxy Watch"
        icon="⌚"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of using step cards to showcase different device categories.',
      },
    },
  },
};
