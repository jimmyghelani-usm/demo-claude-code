import type { Meta, StoryObj } from '@storybook/react';
import { CTASection } from './CTASection';

/**
 * CTASection Component Stories
 * Showcases different variations of the CTA Section component
 */
const meta: Meta<typeof CTASection> = {
  title: 'Sections/CTASection',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Large promotional section with background image, title, description, and call-to-action button. Perfect for marketing campaigns and promotional content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    description: {
      control: 'text',
      description: 'Section description',
    },
    ctaLabel: {
      control: 'text',
      description: 'CTA button label',
    },
    onCtaClick: {
      action: 'ctaClicked',
      description: 'CTA button click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default CTA Section
 * Basic CTA section with title and description
 */
export const Default: Story = {
  args: {
    title: 'Ready to Get Started?',
    description: 'Join thousands of satisfied customers',
    ctaLabel: 'Get Started Today',
  },
};

/**
 * With Background Image
 * CTA section with promotional background image
 */
export const WithBackgroundImage: Story = {
  args: {
    title: 'Unlock Unlimited Possibilities',
    description: 'Experience the future of mobile connectivity',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=1200&h=675&fit=crop',
    ctaLabel: 'Explore Now',
  },
};

/**
 * Promotional Campaign
 * Section promoting a special offer
 */
export const PromotionalCampaign: Story = {
  args: {
    title: 'Limited Time Offer: Save 50% Today',
    description: 'Don\'t miss out on our biggest sale of the year',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=675&fit=crop',
    ctaLabel: 'Claim Your Offer',
  },
};

/**
 * No Background Image
 * Minimal CTA section without background image
 */
export const NoBackgroundImage: Story = {
  args: {
    title: 'Transform Your Experience',
    description: 'With cutting-edge technology and unmatched support',
    ctaLabel: 'Learn More',
  },
};

/**
 * Long Title
 * CTA section with longer, multi-line title
 */
export const LongTitle: Story = {
  args: {
    title: 'Experience the Most Reliable Mobile Network with Advanced Features and World-Class Customer Support',
    description: 'Join millions of users worldwide',
    image: 'https://images.unsplash.com/photo-1571407434351-9f6c3dce6c45?w=1200&h=675&fit=crop',
    ctaLabel: 'Start Free Trial',
  },
};

/**
 * Long Description
 * CTA section with detailed description
 */
export const LongDescription: Story = {
  args: {
    title: 'Revolutionize Your Connectivity',
    description:
      'Our advanced network infrastructure provides seamless connectivity with blazing-fast speeds, exceptional reliability, and world-class customer support. Experience the difference today.',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=1200&h=675&fit=crop',
    ctaLabel: 'Get Started Today',
  },
};

/**
 * Minimal Content
 * CTA section with minimal text
 */
export const MinimalContent: Story = {
  args: {
    title: 'Join Us',
    ctaLabel: 'Start Now',
  },
};

/**
 * Different CTA Labels
 * Showing various CTA button label variations
 */
export const DifferentCtaLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <CTASection
        title="Premium Features Await"
        description="Upgrade to unlock premium features"
        ctaLabel="Upgrade Now"
        image="https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=1200&h=675&fit=crop"
      />
      <CTASection
        title="Start Your Free Trial"
        description="No credit card required"
        ctaLabel="Try Free"
        image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=675&fit=crop"
      />
      <CTASection
        title="Contact Our Sales Team"
        description="Get a personalized solution for your needs"
        ctaLabel="Contact Sales"
        image="https://images.unsplash.com/photo-1571407434351-9f6c3dce6c45?w=1200&h=675&fit=crop"
      />
    </div>
  ),
};

/**
 * With Custom Handler
 * CTA section with click handler demonstration
 */
export const WithCustomHandler: Story = {
  args: {
    title: 'Special Offer Just for You',
    description: 'Limited slots available - Claim yours now',
    ctaLabel: 'Claim Now',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=1200&h=675&fit=crop',
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      button.focus();
    }
  },
};

/**
 * Newsletter Signup
 * CTA section promoting newsletter signup
 */
export const NewsletterSignup: Story = {
  args: {
    title: 'Stay Updated with Latest News',
    description: 'Subscribe to our newsletter for exclusive offers and updates',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=675&fit=crop',
    ctaLabel: 'Subscribe Now',
  },
};

/**
 * Product Launch
 * CTA section for product launch
 */
export const ProductLaunch: Story = {
  args: {
    title: 'Introducing Next Generation Service',
    description: 'Be the first to experience innovation',
    image: 'https://images.unsplash.com/photo-1571407434351-9f6c3dce6c45?w=1200&h=675&fit=crop',
    ctaLabel: 'Get Early Access',
  },
};

/**
 * Mobile Responsive
 * Demonstration of mobile responsiveness
 */
export const MobileResponsive: Story = {
  args: {
    title: 'Mobile-First Design',
    description: 'Looks great on all devices',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=1200&h=675&fit=crop',
    ctaLabel: 'View Demo',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
