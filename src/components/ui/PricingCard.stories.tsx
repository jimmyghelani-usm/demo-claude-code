import type { Meta, StoryObj } from '@storybook/react';
import { PricingCard } from './PricingCard';

/**
 * PricingCard Component Stories
 * Showcases all pricing plan variations and highlighted state
 */
const meta: Meta<typeof PricingCard> = {
  title: 'UI/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card component for displaying pricing plans with price, features, and call-to-action button. Supports highlighted state for featured plans.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    planName: {
      control: 'text',
      description: 'Plan name (e.g., "Unlimited")',
    },
    price: {
      control: 'text',
      description: 'Price amount',
    },
    description: {
      control: 'text',
      description: 'Plan description',
    },
    period: {
      control: 'text',
      description: 'Billing period (e.g., "/month")',
    },
    features: {
      control: 'object',
      description: 'List of plan features',
    },
    highlighted: {
      control: 'boolean',
      description: 'Highlight as popular/featured plan',
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
 * Basic Plan
 * Simple plan without features
 */
export const BasicPlan: Story = {
  args: {
    planName: 'Basic',
    description: 'Perfect for individuals',
    price: '9.99',
    period: '/month',
  },
};

/**
 * Professional Plan
 * Mid-tier plan with features
 */
export const ProfessionalPlan: Story = {
  args: {
    planName: 'Professional',
    description: 'Great for small teams',
    price: '29.99',
    period: '/month',
    features: [
      'Up to 5 users',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'API access',
    ],
  },
};

/**
 * Enterprise Plan
 * High-tier plan with all features
 */
export const EnterprisePlan: Story = {
  args: {
    planName: 'Enterprise',
    description: 'Unlimited power for organizations',
    price: 'Custom',
    period: '/month',
    features: [
      'Unlimited users',
      'Advanced analytics',
      'Priority 24/7 support',
      'Custom integrations',
      'API access',
      'Dedicated account manager',
      'Custom SLA',
    ],
  },
};

/**
 * Featured/Popular Plan
 * Highlighted plan with features
 */
export const FeaturedPlan: Story = {
  args: {
    planName: 'Unlimited',
    description: 'Most popular choice',
    price: '49.99',
    period: '/month',
    features: [
      'Unlimited everything',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'API access',
      'Early access to features',
    ],
    highlighted: true,
  },
};

/**
 * Plan with Annual Billing
 * Plan with yearly billing period
 */
export const AnnualBillingPlan: Story = {
  args: {
    planName: 'Starter',
    description: 'Save 20% with annual billing',
    price: '95.88',
    period: '/year',
    features: ['All Basic features', 'Email support', 'API access'],
  },
};

/**
 * Plan Comparison
 * Multiple plans side by side
 */
export const PlanComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        maxWidth: '1200px',
      }}
    >
      <PricingCard
        planName="Starter"
        description="For beginners"
        price="9.99"
        period="/month"
        features={['5 projects', 'Basic support', '1GB storage']}
      />
      <PricingCard
        planName="Professional"
        description="Most popular"
        price="29.99"
        period="/month"
        features={[
          'Unlimited projects',
          'Priority support',
          '100GB storage',
          'Advanced analytics',
        ]}
        highlighted
      />
      <PricingCard
        planName="Enterprise"
        description="For large teams"
        price="99.99"
        period="/month"
        features={[
          'Everything in Pro',
          'Dedicated support',
          'Unlimited storage',
          'Custom integrations',
          'SLA guarantee',
        ]}
      />
    </div>
  ),
};

/**
 * Minimal Features Plan
 * Plan with just one feature
 */
export const MinimalFeaturesPlan: Story = {
  args: {
    planName: 'Lite',
    description: 'Affordable option',
    price: '4.99',
    period: '/month',
    features: ['Perfect for testing'],
  },
};

/**
 * Many Features Plan
 * Plan with many features
 */
export const ManyFeaturesPlan: Story = {
  args: {
    planName: 'All-In-One',
    description: 'Complete solution',
    price: '199.99',
    period: '/month',
    features: [
      'Unlimited users',
      'Unlimited projects',
      'Advanced analytics',
      'Real-time collaboration',
      'Priority 24/7 support',
      'Custom integrations',
      'API access',
      'Dedicated account manager',
      'Custom SLA',
      'White-label options',
      'Advanced security',
      'Advanced compliance',
    ],
  },
};

/**
 * Free Plan
 * Free tier pricing
 */
export const FreePlan: Story = {
  args: {
    planName: 'Free',
    description: 'Get started today',
    price: '0',
    period: 'forever',
    features: ['Basic features', 'Community support', '1 project'],
  },
};

/**
 * All Plans Display
 * Showcase different pricing tiers together
 */
export const AllPlansDisplay: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '500px',
      }}
    >
      <div>
        <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Basic Plan</h3>
        <PricingCard
          planName="Starter"
          description="For beginners"
          price="9.99"
          period="/month"
          features={['5 projects', 'Email support']}
        />
      </div>
      <div>
        <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Popular Plan (Highlighted)</h3>
        <PricingCard
          planName="Professional"
          description="Most popular choice"
          price="29.99"
          period="/month"
          features={['Unlimited projects', 'Priority support', 'API access']}
          highlighted
        />
      </div>
      <div>
        <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Enterprise Plan</h3>
        <PricingCard
          planName="Enterprise"
          description="For large organizations"
          price="Custom"
          period="/month"
          features={['Everything', 'Dedicated support', 'Custom SLA']}
        />
      </div>
    </div>
  ),
};
