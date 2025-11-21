import { expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTAFooterSection, type FooterLink, type SocialIcon } from './CTAFooterSection';

const meta = {
  title: 'Sections/CTAFooterSection',
  component: CTAFooterSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Final CTA section with integrated footer containing links and social icons. Features a dark rounded container with centered CTA content and a two-column footer layout.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CTAFooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with standard content
export const Default: Story = {
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
    ctaButtonHref: '#',
  },
};

// Variant with custom content
export const CustomContent: Story = {
  args: {
    ctaTitle: 'Ready to revolutionize your workflow?',
    ctaSubtitle:
      'Join thousands of users who are already experiencing the power of our platform. Sign up today and get instant access to premium features.',
    ctaButtonLabel: 'START FREE TRIAL',
    ctaButtonHref: '#trial',
  },
};

// Variant with custom footer links
export const CustomFooterLinks: Story = {
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
    footerLinks: [
      { label: 'ABOUT US', href: '#about', ariaLabel: 'Learn more about our company' },
      { label: 'BLOG', href: '#blog', ariaLabel: 'Read our latest blog posts' },
      { label: 'PRICING', href: '#pricing', ariaLabel: 'View our pricing plans' },
      { label: 'DOCUMENTATION', href: '#docs', ariaLabel: 'Read our documentation' },
      { label: 'SUPPORT', href: '#support', ariaLabel: 'Get support' },
    ] as FooterLink[],
  },
};

// Variant with custom social icons
export const CustomSocialIcons: Story = {
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
    socialIcons: [
      { name: 'GitHub', href: '#github', ariaLabel: 'Visit our GitHub', icon: 'twitter' as const },
      { name: 'Twitter', href: '#twitter', ariaLabel: 'Follow us on Twitter', icon: 'twitter' as const },
      { name: 'LinkedIn', href: '#linkedin', ariaLabel: 'Connect on LinkedIn', icon: 'linkedin' as const },
    ] as SocialIcon[],
  },
};

// Variant with minimal content
export const Minimal: Story = {
  args: {
    ctaTitle: 'Join Us',
    ctaSubtitle: 'Take the first step towards success',
    ctaButtonLabel: 'SIGN UP',
    footerLinks: [
      { label: 'TERMS', href: '#' },
      { label: 'PRIVACY', href: '#' },
    ] as FooterLink[],
  },
};

// Variant showcasing interaction callback
export const WithClickHandler: Story = {
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
    onCtaClick: () => {
      // CTA click handler
    },
  },
};

// Variant with extended footer
export const ExtendedFooter: Story = {
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
    footerLinks: [
      { label: 'TERMS', href: '#terms' },
      { label: 'PRIVACY', href: '#privacy' },
      { label: 'COOKIES', href: '#cookies' },
      { label: 'ACCESSIBILITY', href: '#accessibility' },
      { label: 'CONTACT', href: '#contact' },
      { label: 'SITEMAP', href: '#sitemap' },
      { label: 'STATUS', href: '#status' },
      { label: 'LEGAL', href: '#legal' },
    ] as FooterLink[],
  },
};

// Variant with all social platforms
export const AllSocialPlatforms: Story = {
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
    socialIcons: [
      { name: 'Reddit', href: '#reddit', ariaLabel: 'Visit our Reddit community', icon: 'reddit' as const },
      { name: 'Twitter', href: '#twitter', ariaLabel: 'Follow us on Twitter', icon: 'twitter' as const },
      { name: 'LinkedIn', href: '#linkedin', ariaLabel: 'Connect with us on LinkedIn', icon: 'linkedin' as const },
      { name: 'Facebook', href: '#facebook', ariaLabel: 'Like us on Facebook', icon: 'facebook' as const },
      { name: 'Instagram', href: '#instagram', ariaLabel: 'Follow us on Instagram', icon: 'instagram' as const },
    ] as SocialIcon[],
  },
};

// Responsive preview - mobile view
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ctaButtonLabel: 'GET STARTED',
  },
};

// Responsive preview - tablet view
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    ctaTitle: 'What are you waiting for?',
    ctaSubtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ctaButtonLabel: 'GET STARTED',
  },
};

// Story with interaction test (play function)
export const Interactive: Story = {
  args: Default.args,
  async play() {
    // Test that key elements are present and accessible
    // Verify proper semantic structure through accessibility checks
    expect(document.querySelector('h2')).toBeTruthy();
    expect(document.querySelector('footer')).toBeTruthy();
  },
};
