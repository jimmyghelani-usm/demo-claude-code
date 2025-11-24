import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { UsMobileTradeInFooter, type FooterLink, type SocialIcon } from './UsMobileTradeInFooter';

const meta: Meta<typeof UsMobileTradeInFooter> = {
  title: 'Sections/UsMobileTradeInFooter',
  component: UsMobileTradeInFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Footer section for the US Mobile Trade In page. Features brand information, footer links, social media icons with hover effects, copyright information, fully responsive mobile-first design, and accessible navigation with proper ARIA attributes.',
      },
    },
  },
  argTypes: {
    brandText: {
      control: { type: 'text' },
      description: 'Brand name to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'US Mobile'" },
      },
    },
    brandDescription: {
      control: { type: 'text' },
      description: 'Brand description text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'The best way to get the most value from your old devices...'" },
      },
    },
    footerLinks: {
      control: 'object',
      description: 'Array of footer links to display',
      table: {
        type: { summary: 'FooterLink[]' },
      },
    },
    socialIcons: {
      control: 'object',
      description: 'Array of social media icons to display',
      table: {
        type: { summary: 'SocialIcon[]' },
      },
    },
    copyrightText: {
      control: { type: 'text' },
      description: 'Copyright text to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'© 2024 US Mobile. All rights reserved.'" },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the footer',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UsMobileTradeInFooter>;

/**
 * Default footer section with standard configuration.
 * Shows brand information, footer links, social icons, and copyright.
 */
export const Default: Story = {
  args: {},
};

/**
 * Footer with custom brand information.
 * Demonstrates how to customize brand text and description.
 */
export const CustomBrand: Story = {
  args: {
    brandText: 'Trade In Hub',
    brandDescription: 'Your trusted partner for device trade-ins and upgrades.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with custom brand text and description.',
      },
    },
  },
};

/**
 * Footer with extended brand description.
 * Tests how the component handles longer descriptive text.
 */
export const ExtendedBrandDescription: Story = {
  args: {
    brandText: 'US Mobile',
    brandDescription:
      'The best way to get the most value from your old devices. We provide fair valuations, free shipping, and instant credit for your new purchase. Join thousands of satisfied customers who have upgraded their devices with us.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles longer brand descriptions.',
      },
    },
  },
};

/**
 * Footer with minimal links.
 * Shows the component with fewer footer links.
 */
export const MinimalLinks: Story = {
  args: {
    footerLinks: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with a minimal set of links.',
      },
    },
  },
};

/**
 * Footer with extended links.
 * Shows the component with more footer links.
 */
export const ExtendedLinks: Story = {
  args: {
    footerLinks: [
      { label: 'About US Mobile', href: '#about' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Contact Support', href: '#contact' },
      { label: 'Trade-In FAQs', href: '#faq' },
      { label: 'Device Status', href: '#status' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Accessibility', href: '#accessibility' },
      { label: 'Sitemap', href: '#sitemap' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with an extended set of links.',
      },
    },
  },
};

/**
 * Footer with custom social icons.
 * Demonstrates different social media platforms.
 */
export const CustomSocialIcons: Story = {
  args: {
    socialIcons: [
      {
        name: 'Facebook',
        href: 'https://facebook.com/usmobile',
        ariaLabel: 'Visit US Mobile on Facebook',
        icon: 'facebook',
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/usmobile',
        ariaLabel: 'Visit US Mobile on Twitter',
        icon: 'twitter',
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/usmobile',
        ariaLabel: 'Visit US Mobile on LinkedIn',
        icon: 'linkedin',
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/usmobile',
        ariaLabel: 'Visit US Mobile on Instagram',
        icon: 'instagram',
      },
      {
        name: 'Reddit',
        href: 'https://reddit.com/r/usmobile',
        ariaLabel: 'Visit US Mobile on Reddit',
        icon: 'reddit',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with all available social media icon options.',
      },
    },
  },
};

/**
 * Footer with single social icon.
 * Tests the component with minimal social media presence.
 */
export const SingleSocialIcon: Story = {
  args: {
    socialIcons: [
      {
        name: 'Twitter',
        href: 'https://twitter.com/usmobile',
        ariaLabel: 'Visit US Mobile on Twitter',
        icon: 'twitter',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with just one social media icon.',
      },
    },
  },
};

/**
 * Footer with custom copyright text.
 * Demonstrates how to customize the copyright notice.
 */
export const CustomCopyright: Story = {
  args: {
    copyrightText:
      '© 2024 US Mobile Inc. All rights reserved. | Made with passion for great mobile experiences',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with custom copyright text.',
      },
    },
  },
};

/**
 * Mobile viewport.
 * Shows how the footer adapts to mobile screen sizes.
 */
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Shows the footer on mobile viewport with responsive layout.',
      },
    },
  },
};

/**
 * Tablet viewport.
 * Shows how the footer renders on tablet screens.
 */
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Shows the footer on tablet viewport.',
      },
    },
  },
};

/**
 * Desktop viewport.
 * Shows the footer on large desktop screens.
 */
export const DesktopView: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer on desktop viewport with full layout.',
      },
    },
  },
};

/**
 * With custom CSS class.
 * Demonstrates how to apply custom styling via className prop.
 */
export const WithCustomClassName: Story = {
  args: {
    className: 'custom-footer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how to apply custom CSS classes via the className prop.',
      },
    },
  },
};

/**
 * Accessibility features story.
 * Demonstrates semantic HTML and ARIA attributes for screen readers.
 */
export const Accessibility: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including semantic HTML, ARIA labels, proper link roles, and navigation landmarks.',
      },
    },
  },
};

/**
 * RTL (Right-to-Left) language support.
 * Shows how the footer handles RTL text direction.
 */
export const RTLSupport: Story = {
  args: {
    brandText: 'يو إس موبايل',
    brandDescription: 'أفضل طريقة للحصول على أفضل قيمة من أجهزتك القديمة.',
    footerLinks: [
      { label: 'عن يو إس موبايل', href: '#' },
      { label: 'سياسة الخصوصية', href: '#' },
      { label: 'شروط الخدمة', href: '#' },
      { label: 'الاتصال بالدعم', href: '#' },
      { label: 'الأسئلة الشائعة', href: '#' },
    ],
    copyrightText: '© 2024 يو إس موبايل. جميع الحقوق محفوظة.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with RTL text (Arabic example).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/**
 * Footer link interaction.
 * Tests clicking on footer links.
 */
export const LinkInteraction: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates interaction with footer links - all links are clickable.',
      },
    },
  },
};

/**
 * Social icon hover states.
 * Tests social icon hover interactions.
 */
export const SocialIconHover: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates social icon hover states. Hover over social icons to see the effect.',
      },
    },
  },
};

/**
 * Complete footer with realistic content.
 * Shows the footer with all realistic elements for a real page.
 */
export const CompleteFooter: Story = {
  args: {
    brandText: 'US Mobile',
    brandDescription:
      'The best way to get the most value from your old devices. Trade in with confidence.',
    footerLinks: [
      { label: 'About US Mobile', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact Support', href: '#' },
      { label: 'Trade-In FAQs', href: '#' },
      { label: 'Device Status', href: '#' },
    ],
    socialIcons: [
      {
        name: 'Facebook',
        href: '#',
        ariaLabel: 'Visit US Mobile on Facebook',
        icon: 'facebook',
      },
      {
        name: 'Twitter',
        href: '#',
        ariaLabel: 'Visit US Mobile on Twitter',
        icon: 'twitter',
      },
      {
        name: 'LinkedIn',
        href: '#',
        ariaLabel: 'Visit US Mobile on LinkedIn',
        icon: 'linkedin',
      },
      {
        name: 'Instagram',
        href: '#',
        ariaLabel: 'Visit US Mobile on Instagram',
        icon: 'instagram',
      },
    ],
    copyrightText: '© 2024 US Mobile. All rights reserved.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a realistic complete footer with all elements.',
      },
    },
  },
};

/**
 * Minimal configuration.
 * Shows the footer with only required props, using all defaults.
 */
export const Minimal: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with default props when no arguments are provided.',
      },
    },
  },
};

/**
 * Very long brand description.
 * Tests how the component handles longer brand descriptions.
 */
export const VeryLongBrandDescription: Story = {
  args: {
    brandDescription:
      'The best way to get the most value from your old devices. Our simple trade-in process takes just minutes, and your credit is applied instantly to your new device purchase. We are committed to providing fair valuations, transparent processes, and exceptional customer service. With thousands of satisfied customers, we have established ourselves as the leading trade-in platform in the industry.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles very long brand descriptions.',
      },
    },
  },
};

/**
 * All social platforms.
 * Shows all available social media platforms integrated.
 */
export const AllSocialPlatforms: Story = {
  args: {
    socialIcons: [
      {
        name: 'Facebook',
        href: '#',
        ariaLabel: 'Follow us on Facebook',
        icon: 'facebook',
      },
      {
        name: 'Twitter',
        href: '#',
        ariaLabel: 'Follow us on Twitter',
        icon: 'twitter',
      },
      {
        name: 'LinkedIn',
        href: '#',
        ariaLabel: 'Connect with us on LinkedIn',
        icon: 'linkedin',
      },
      {
        name: 'Instagram',
        href: '#',
        ariaLabel: 'Follow us on Instagram',
        icon: 'instagram',
      },
      {
        name: 'Reddit',
        href: '#',
        ariaLabel: 'Join us on Reddit',
        icon: 'reddit',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer with all available social media platform options.',
      },
    },
  },
};

/**
 * Keyboard navigation test.
 * Tests keyboard navigation through footer links.
 */
export const KeyboardNavigation: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation through footer links using Tab key.',
      },
    },
  },
};

/**
 * Full page context.
 * Shows the footer in a realistic page context with other sections.
 */
export const FullPageContext: Story = {
  render: (args) => (
    <div>
      {/* Mock header */}
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1d5ff6 0%, #608ff9 100%)',
          color: 'white',
        }}
      >
        <h1 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>Trade In Your Phone</h1>
        <p style={{ margin: 0, fontSize: '16px' }}>Get instant credit toward your next device</p>
      </div>

      {/* Mock main content */}
      <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '300px' }}>
        <h2 style={{ marginTop: 0 }}>Page Content Here</h2>
        <p>This is mock page content to demonstrate the footer in context.</p>
      </div>

      {/* Footer component */}
      <UsMobileTradeInFooter {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows the footer in a realistic full page context.',
      },
    },
    layout: 'fullscreen',
  },
};
