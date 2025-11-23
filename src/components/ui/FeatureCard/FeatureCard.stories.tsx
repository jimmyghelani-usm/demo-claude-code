import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from './FeatureCard';

/**
 * FeatureCard Component Stories
 * Showcases feature card with different content and icon styles
 * - Features: icon, title, description, customizable background color
 * - States: default, hover
 */
const meta: Meta<typeof FeatureCard> = {
  title: 'UI/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card component for displaying features with icon, title, and description. Supports custom icon background colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title text',
    },
    description: {
      control: 'text',
      description: 'Card description text',
    },
    iconBackgroundColor: {
      control: 'color',
      description: 'Background color for icon container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// SVG Icons
const GlobeIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
    <path
      d="M2 16h28M16 2a14 14 0 0 1 0 28 14 14 0 0 1 0-28Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const LightningIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 2l4 8h8l-6.5 5 2.5 8-8-6-8 6 2.5-8-6.5-5h8l4-8z"
      fill="currentColor"
    />
  </svg>
);

const ShieldIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 2L6 6v8c0 8 10 14 10 14s10-6 10-14V6l-10-4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27 8L12 23l-7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Default Feature Card
 * Basic feature card with globe icon
 */
export const Default: Story = {
  args: {
    icon: GlobeIcon,
    title: 'Global Coverage',
    description: 'Connect anywhere in the world with our global network',
    iconBackgroundColor: '#608ff9',
  },
};

/**
 * Fast Network Card
 * Feature card with lightning icon and secondary blue
 */
export const FastNetwork: Story = {
  args: {
    icon: LightningIcon,
    title: 'Fast Network',
    description: 'Lightning-fast speeds and reliability you can count on',
    iconBackgroundColor: '#1d5ff6',
  },
};

/**
 * Secure Card
 * Feature card with shield icon and tertiary blue
 */
export const Secure: Story = {
  args: {
    icon: ShieldIcon,
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security',
    iconBackgroundColor: '#4d6dd9',
  },
};

/**
 * Reliability Card
 * Feature card with check icon
 */
export const Reliability: Story = {
  args: {
    icon: CheckIcon,
    title: 'Reliable Service',
    description: '99.9% uptime guarantee with 24/7 customer support',
    iconBackgroundColor: '#608ff9',
  },
};

/**
 * All Variants
 * Grid of feature cards with different colors
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(253px, 1fr))',
        gap: '24px',
        maxWidth: '900px',
      }}
    >
      <FeatureCard
        icon={GlobeIcon}
        title="Global Coverage"
        description="Connect anywhere in the world"
        iconBackgroundColor="#608ff9"
      />
      <FeatureCard
        icon={LightningIcon}
        title="Fast Network"
        description="Lightning-fast speeds and reliability"
        iconBackgroundColor="#1d5ff6"
      />
      <FeatureCard
        icon={ShieldIcon}
        title="Secure & Private"
        description="Your data is protected with security"
        iconBackgroundColor="#4d6dd9"
      />
      <FeatureCard
        icon={CheckIcon}
        title="Reliable Service"
        description="99.9% uptime guarantee and support"
        iconBackgroundColor="#608ff9"
      />
    </div>
  ),
};

/**
 * Long Description
 * Feature card with longer description text
 */
export const LongDescription: Story = {
  args: {
    icon: GlobeIcon,
    title: 'Exceptional Performance',
    description: 'Experience lightning-fast network speeds with our advanced infrastructure. Optimized for streaming, gaming, and video conferencing without interruption.',
    iconBackgroundColor: '#1d5ff6',
  },
};

/**
 * Custom Color
 * Feature card with custom icon background color
 */
export const CustomColor: Story = {
  args: {
    icon: ShieldIcon,
    title: 'Enterprise Grade',
    description: 'Built for businesses and power users',
    iconBackgroundColor: '#7da3ff',
  },
};

/**
 * Icon Variations
 * Feature cards with emoji icons
 */
export const EmojiIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(253px, 1fr))',
        gap: '24px',
        maxWidth: '900px',
      }}
    >
      <FeatureCard
        icon={<span style={{ fontSize: '32px' }}>🌍</span>}
        title="Global Reach"
        description="Worldwide coverage and support"
        iconBackgroundColor="#608ff9"
      />
      <FeatureCard
        icon={<span style={{ fontSize: '32px' }}>⚡</span>}
        title="Super Fast"
        description="Blazing fast performance"
        iconBackgroundColor="#1d5ff6"
      />
      <FeatureCard
        icon={<span style={{ fontSize: '32px' }}>🛡️</span>}
        title="Secure"
        description="Military-grade encryption"
        iconBackgroundColor="#4d6dd9"
      />
    </div>
  ),
};

/**
 * Feature Grid
 * Multiple feature cards in a 2x2 grid
 */
export const FeatureGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        maxWidth: '600px',
      }}
    >
      <FeatureCard
        icon={GlobeIcon}
        title="Global Coverage"
        description="Connect anywhere in the world"
        iconBackgroundColor="#608ff9"
      />
      <FeatureCard
        icon={LightningIcon}
        title="Fast Network"
        description="Lightning-fast speeds"
        iconBackgroundColor="#1d5ff6"
      />
      <FeatureCard
        icon={ShieldIcon}
        title="Secure & Private"
        description="Enterprise-grade security"
        iconBackgroundColor="#4d6dd9"
      />
      <FeatureCard
        icon={CheckIcon}
        title="Reliable Service"
        description="99.9% uptime guarantee"
        iconBackgroundColor="#608ff9"
      />
    </div>
  ),
};

/**
 * Short Text
 * Feature card with short title and description
 */
export const ShortText: Story = {
  args: {
    icon: LightningIcon,
    title: 'Fast',
    description: 'Quick and reliable',
    iconBackgroundColor: '#1d5ff6',
  },
};
