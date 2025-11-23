import type { StoryObj } from '@storybook/react';
import { PricingSection } from './PricingSection';

const meta = {
  title: 'Sections/PricingSection',
  component: PricingSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive pricing section component that displays multiple pricing plans in a responsive grid layout. Supports highlighted/featured plans, customizable titles, and flexible plan configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main section heading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Simple, Transparent Pricing'" },
      },
    },
    description: {
      control: 'text',
      description: 'Section subtitle and description',
      table: {
        type: { summary: 'string' },
      },
    },
    plans: {
      description: 'Array of pricing plans to display',
      table: {
        type: { summary: 'Plan[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default pricing section with three standard plans and one highlighted as most popular.',
      },
    },
  },
};

export const TwoPlans: Story = {
  args: {
    title: 'Choose Your Plan',
    description: 'Simple and transparent pricing for individuals and small teams',
    plans: [
      {
        id: 'plan-1',
        title: '5GB Basic',
        price: 39,
        period: '/ Month',
        description: 'Great for light users',
        features: [
          'Unlimited data, talk',
          'Unlimited text',
          '5GB hotspot',
        ],
      },
      {
        id: 'plan-2',
        title: '20GB Plus',
        price: 69,
        period: '/ Month',
        description: 'Most popular choice',
        features: [
          'Unlimited data, talk',
          'Unlimited text',
          '20GB hotspot',
          'International roaming',
        ],
        highlighted: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Pricing section with two plans - basic and highlighted premium option.',
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Enterprise Pricing',
    description: 'Flexible plans designed for businesses of all sizes. Scale as you grow.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default plans with custom title and description for enterprise context.',
      },
    },
  },
};

export const ThreeTierPlans: Story = {
  args: {
    title: 'Flexible Plans for Every Need',
    description: 'Choose the perfect plan and upgrade or downgrade anytime',
    plans: [
      {
        id: 'starter',
        title: 'Starter',
        price: 29,
        period: '/ Month',
        description: 'Perfect for getting started',
        features: [
          '5GB Data',
          'Unlimited Talk & Text',
          '2GB Hotspot',
          'Basic support',
        ],
      },
      {
        id: 'professional',
        title: 'Professional',
        price: 59,
        period: '/ Month',
        description: 'Most popular',
        features: [
          'Unlimited Data',
          'Unlimited Talk & Text',
          '10GB Hotspot',
          'Priority support',
          'International roaming',
        ],
        highlighted: true,
      },
      {
        id: 'enterprise',
        title: 'Enterprise',
        price: 99,
        period: '/ Month',
        description: 'For power users',
        features: [
          'Unlimited Data',
          'Unlimited Talk & Text',
          'Unlimited Hotspot',
          '24/7 premium support',
          'International roaming included',
          'Business features',
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Three-tier pricing structure with starter, professional, and enterprise plans.',
      },
    },
  },
};

export const FourPlans: Story = {
  args: {
    title: 'Pricing Plans',
    description: 'Select the plan that best fits your needs',
    plans: [
      {
        id: 'plan-1',
        title: 'Basic',
        price: 19,
        period: '/ Month',
        features: ['2GB Data', 'Unlimited Talk & Text', 'Basic support'],
      },
      {
        id: 'plan-2',
        title: 'Standard',
        price: 39,
        period: '/ Month',
        features: ['10GB Data', 'Unlimited Talk & Text', '5GB hotspot', 'Email support'],
      },
      {
        id: 'plan-3',
        title: 'Premium',
        price: 79,
        period: '/ Month',
        description: 'Best value',
        features: ['Unlimited Data', 'Unlimited Talk & Text', '20GB hotspot', 'Priority support'],
        highlighted: true,
      },
      {
        id: 'plan-4',
        title: 'Elite',
        price: 129,
        period: '/ Month',
        features: [
          'Unlimited Data',
          'Unlimited Talk & Text',
          'Unlimited hotspot',
          '24/7 VIP support',
          'Exclusive features',
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Four-plan pricing model showing basic through elite tier options.',
      },
    },
  },
};

export const NoHighlighted: Story = {
  args: {
    title: 'Equal Plans',
    description: 'All plans are equally featured',
    plans: [
      {
        id: 'plan-1',
        title: 'Plan A',
        price: 49,
        period: '/ Month',
        features: ['10GB Data', 'Unlimited Talk & Text', 'Standard support'],
      },
      {
        id: 'plan-2',
        title: 'Plan B',
        price: 79,
        period: '/ Month',
        features: ['20GB Data', 'Unlimited Talk & Text', 'Priority support'],
      },
      {
        id: 'plan-3',
        title: 'Plan C',
        price: 99,
        period: '/ Month',
        features: ['Unlimited Data', 'Unlimited Talk & Text', 'VIP support'],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Pricing section with no highlighted plan - all plans presented equally.',
      },
    },
  },
};

export const SinglePlan: Story = {
  args: {
    title: 'One Plan Fits All',
    description: 'Simple, straightforward pricing with no hidden fees',
    plans: [
      {
        id: 'plan-unlimited',
        title: 'Unlimited Everything',
        price: 99,
        period: '/ Month',
        description: 'Complete freedom',
        features: [
          'Unlimited Data',
          'Unlimited Talk & Text',
          'Unlimited Hotspot',
          'Priority support',
          'International roaming',
          'Device insurance included',
        ],
        highlighted: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single plan pricing layout - useful for simplified pricing structures.',
      },
    },
  },
};

export const AnnualBilling: Story = {
  args: {
    title: 'Annual Plans',
    description: 'Save up to 20% with annual billing',
    plans: [
      {
        id: 'annual-basic',
        title: 'Basic Annual',
        price: 540,
        period: '/ Year',
        description: 'Was $600 - Save $60',
        features: ['10GB Data', 'Unlimited Talk & Text', 'Basic support'],
      },
      {
        id: 'annual-pro',
        title: 'Pro Annual',
        price: 900,
        period: '/ Year',
        description: 'Was $1200 - Save $300',
        features: ['Unlimited Data', 'Unlimited Talk & Text', '20GB hotspot', 'Priority support'],
        highlighted: true,
      },
      {
        id: 'annual-elite',
        title: 'Elite Annual',
        price: 1440,
        period: '/ Year',
        description: 'Was $1800 - Save $360',
        features: ['Unlimited Everything', '24/7 support', 'All premium features included'],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Annual billing plans with year-based pricing and savings messaging.',
      },
    },
  },
};
