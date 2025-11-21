import type { Meta, StoryObj } from '@storybook/react-vite';
import { HowItWorksSection } from './HowItWorksSection';

/**
 * HowItWorksSection Stories
 * Demonstrates the two-column "How It Works" section component
 * with customizable steps and visual content
 */
const meta: Meta<typeof HowItWorksSection> = {
  title: 'Sections/HowItWorksSection',
  component: HowItWorksSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default variant with three sample steps
 * Shows the standard "Share → Friend Signs Up → Get Rewarded" flow
 */
export const Default: Story = {
  render: () => <HowItWorksSection />,
};

/**
 * With custom section title
 * Demonstrates how to customize the main heading
 */
export const CustomTitle: Story = {
  args: {
    sectionTitle: 'Building Your Referral Empire',
  },
};

/**
 * With two steps
 * Shows how the component adapts to fewer steps
 */
export const TwoSteps: Story = {
  args: {
    sectionTitle: 'How to Get Started',
    steps: [
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>1</div>,
        title: 'Share Your Link',
        description: 'Copy your unique referral URL and share it across your network via email, social media, or messaging apps.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>2</div>,
        title: 'Earn Rewards',
        description: 'Get instant rewards when your referrals sign up and complete their first action.',
      },
    ],
  },
};

/**
 * With five steps
 * Shows how the component scales with more steps
 */
export const FiveSteps: Story = {
  args: {
    sectionTitle: 'Our Complete Referral Journey',
    steps: [
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>1</div>,
        title: 'Create Account',
        description: 'Sign up for free and get instant access to your unique referral link.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>2</div>,
        title: 'Share Link',
        description: 'Copy and share your referral link with friends, family, and colleagues.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>3</div>,
        title: 'Friend Signs Up',
        description: 'Your referral creates an account using your unique link.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>4</div>,
        title: 'First Action',
        description: 'They complete their first purchase or task on the platform.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>5</div>,
        title: 'Get Rewarded',
        description: 'Both you and your friend receive rewards instantly to your accounts.',
      },
    ],
  },
};

/**
 * With custom visual content
 * Demonstrates using a custom right column element
 */
export const CustomVisualContent: Story = {
  args: {
    sectionTitle: 'How Our Referral Program Works',
    rightColumnContent: (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: '#608ff9',
            marginBottom: 16,
          }}
        >
          50%
        </div>
        <p style={{ margin: 0, color: '#b0b0b0', fontSize: 14 }}>
          Higher conversion rates from referrals
        </p>
      </div>
    ),
  },
};

/**
 * With long text content
 * Shows how the component handles longer step descriptions
 */
export const LongContent: Story = {
  args: {
    sectionTitle: 'How Our Referral Program Works',
    steps: [
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>1</div>,
        title: 'Share your link',
        description:
          'Share your unique referral link with friends and colleagues. You can find your link in your account settings under the referral section. It works across all platforms and devices.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>2</div>,
        title: 'Your friend signs up and...',
        description:
          'When they click your link and create an account, they automatically become associated with your referral. There are no limits to how many people you can refer, and each referral gets tracked separately.',
      },
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>3</div>,
        title: 'You both get rewarded',
        description:
          'Once they complete their first purchase or action, both you and your friend receive rewards instantly. You can withdraw your earnings anytime to your preferred payment method.',
      },
    ],
  },
};

/**
 * With custom className
 * Demonstrates applying additional CSS classes
 */
export const WithCustomClass: Story = {
  args: {
    className: 'custom-how-it-works',
    sectionTitle: 'How Our Referral Program Works',
  },
};

/**
 * Minimal variant with custom icons
 * Shows how to use custom SVG or React components as icons
 */
export const CustomIcons: Story = {
  args: {
    sectionTitle: 'The Referral Process',
    steps: [
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#1d5ff6" strokeWidth="2" />
            <path d="M16 8V16L22 22" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        title: 'Share your link',
        description: 'Get your unique referral link and share it with friends.',
      },
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="8" width="24" height="16" rx="2" stroke="#1d5ff6" strokeWidth="2" />
            <path d="M4 12L16 19L28 12" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: 'They sign up',
        description: 'Your friend receives the referral and creates an account.',
      },
      {
        icon: (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L20.5 11H30L22.75 16.5L25.5 26L16 20.5L6.5 26L9.25 16.5L2 11H11.5L16 2Z" fill="#1d5ff6" />
          </svg>
        ),
        title: 'Get rewarded',
        description: 'You both earn rewards instantly and can use them immediately.',
      },
    ],
  },
};

/**
 * Single step variant
 * Shows how the component works with just one step
 */
export const SingleStep: Story = {
  args: {
    sectionTitle: 'Start Your Referral Journey',
    steps: [
      {
        icon: <div style={{ width: 32, height: 32, background: '#1d5ff6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>1</div>,
        title: 'Share your unique link',
        description:
          'Get started by sharing your unique referral link with your network and earn rewards for every successful referral.',
      },
    ],
  },
};

/**
 * Empty custom content variant
 * Shows how the component handles missing or custom visual content
 */
export const CustomEmptyVisual: Story = {
  args: {
    rightColumnContent: (
      <div style={{ fontSize: 14, color: '#608ff9', textAlign: 'center' }}>
        No image available
      </div>
    ),
  },
};
