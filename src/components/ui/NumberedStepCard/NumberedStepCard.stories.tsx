import type { Meta, StoryObj } from '@storybook/react';
import { NumberedStepCard } from './NumberedStepCard';

/**
 * NumberedStepCard Component Stories
 * Showcases all step numbers and variations of the NumberedStepCard component
 */
const meta: Meta<typeof NumberedStepCard> = {
  title: 'UI/NumberedStepCard',
  component: NumberedStepCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card for displaying numbered steps in a process. Perfect for step-by-step instructions, entry forms, and onboarding flows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    stepNumber: {
      control: 'number',
      description: 'Step number to display in badge',
    },
    title: {
      control: 'text',
      description: 'Step title',
    },
    description: {
      control: 'text',
      description: 'Step description',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Step One
 * First step in a process
 */
export const StepOne: Story = {
  args: {
    stepNumber: 1,
    title: 'Create Your Account',
    description: 'Sign up with your email and create a secure password',
  },
};

/**
 * Step Two
 * Second step in a process
 */
export const StepTwo: Story = {
  args: {
    stepNumber: 2,
    title: 'Verify Your Information',
    description: 'Confirm your email address and phone number',
  },
};

/**
 * Step Three
 * Third step in a process
 */
export const StepThree: Story = {
  args: {
    stepNumber: 3,
    title: 'Choose Your Plan',
    description: 'Select the perfect plan that fits your needs',
  },
};

/**
 * Step Four
 * Fourth step in a process
 */
export const StepFour: Story = {
  args: {
    stepNumber: 4,
    title: 'Complete Setup',
    description: 'Activate your service and start using the platform',
  },
};

/**
 * Long Title
 * Step with a longer, multi-line title
 */
export const LongTitle: Story = {
  args: {
    stepNumber: 1,
    title: 'Enter Your Personal Information and Account Details',
    description: 'Provide accurate information for account verification',
  },
};

/**
 * Long Description
 * Step with longer description text
 */
export const LongDescription: Story = {
  args: {
    stepNumber: 2,
    title: 'Verify Your Identity',
    description:
      'We need to verify your identity to ensure account security. This process takes just a few minutes and helps protect your personal information.',
  },
};

/**
 * All Steps Sequence
 * Showcasing all steps in a typical process flow
 */
export const AllStepsSequence: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px' }}>
      <NumberedStepCard
        stepNumber={1}
        title="Create Your Account"
        description="Sign up with your email and create a secure password"
      />
      <NumberedStepCard
        stepNumber={2}
        title="Verify Your Information"
        description="Confirm your email address and phone number"
      />
      <NumberedStepCard
        stepNumber={3}
        title="Choose Your Plan"
        description="Select the perfect plan that fits your needs"
      />
      <NumberedStepCard
        stepNumber={4}
        title="Start Using"
        description="Activate your service and begin your journey"
      />
    </div>
  ),
};

/**
 * Large Step Number
 * Step with a larger number (useful for processes with many steps)
 */
export const LargeStepNumber: Story = {
  args: {
    stepNumber: 10,
    title: 'Advanced Configuration',
    description: 'Fine-tune your settings for optimal performance',
  },
};

/**
 * Minimal Content
 * Step with minimal text
 */
export const MinimalContent: Story = {
  args: {
    stepNumber: 1,
    title: 'Start',
    description: 'Begin here',
  },
};

/**
 * Step in Grid Layout
 * Demonstrating how steps look in a grid arrangement
 */
export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        maxWidth: '1000px',
      }}
    >
      <NumberedStepCard
        stepNumber={1}
        title="Sign Up"
        description="Create your account"
      />
      <NumberedStepCard
        stepNumber={2}
        title="Verify"
        description="Confirm your identity"
      />
      <NumberedStepCard
        stepNumber={3}
        title="Configure"
        description="Set up your preferences"
      />
      <NumberedStepCard
        stepNumber={4}
        title="Launch"
        description="Start using the service"
      />
    </div>
  ),
};

/**
 * Step with Secondary Background
 * Card on secondary background
 */
export const SecondaryBackground: Story = {
  args: {
    stepNumber: 1,
    title: 'Get Started',
    description: 'Begin your journey with us today',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', backgroundColor: '#1c1c1c' }}>
        <Story />
      </div>
    ),
  ],
};
