import type { Meta, StoryObj } from '@storybook/react';
import { FAQAccordion, type FAQItem } from './FAQAccordion';

/**
 * FAQAccordion Component Stories
 * Showcases accordion-style FAQ sections
 * - Individual item expansion/collapse with smooth animations
 * - Single and multi-column layouts
 * - Interactive keyboard navigation
 * - Full accessibility support with ARIA attributes
 */
const meta: Meta<typeof FAQAccordion> = {
  title: 'Sections/FAQAccordion',
  component: FAQAccordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Expandable FAQ accordion component with smooth animations, keyboard navigation, and accessible ARIA attributes. Supports single and multi-column layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of FAQ items with id, question, and answer',
    },
    columns: {
      control: 'select',
      options: [1, 2],
      description: 'Number of columns for layout (1 or 2)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample FAQ data
const sampleFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, debit cards, PayPal, and bank transfers. All transactions are secure and encrypted for your protection.',
  },
  {
    id: '2',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days. International orders may take 2-4 weeks depending on the destination.',
  },
  {
    id: '3',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, simply return it within 30 days for a full refund. No questions asked.',
  },
  {
    id: '4',
    question: 'Do you offer customer support?',
    answer:
      'Yes! Our customer support team is available 24/7 via email, phone, and live chat. We\'re here to help with any questions or concerns you may have.',
  },
];

const extendedFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'What is your company mission?',
    answer:
      'Our mission is to deliver exceptional products and services that exceed customer expectations while maintaining the highest standards of quality and integrity.',
  },
  {
    id: '2',
    question: 'How do I contact your support team?',
    answer:
      'You can reach our support team through multiple channels: email at support@example.com, phone at 1-800-555-0123, or via our live chat on the website. Average response time is under 2 hours.',
  },
  {
    id: '3',
    question: 'Are your products environmentally friendly?',
    answer:
      'Yes, we are committed to sustainability. All our products are made with eco-friendly materials and our packaging is 100% recyclable. We also plant a tree for every product sold.',
  },
  {
    id: '4',
    question: 'Do you offer bulk discounts?',
    answer:
      'Absolutely! For orders over 100 units, we offer special bulk pricing. Please contact our sales team at sales@example.com for a custom quote.',
  },
  {
    id: '5',
    question: 'What warranty do you provide?',
    answer:
      'All products come with a 1-year manufacturer\'s warranty covering defects in materials and workmanship. Extended warranties are available for an additional fee.',
  },
  {
    id: '6',
    question: 'How secure is my personal information?',
    answer:
      'We take data security very seriously. All personal information is encrypted using industry-standard SSL technology and stored on secure servers. We never share your data with third parties.',
  },
];

/**
 * Default Two-Column FAQ
 * Standard FAQ accordion with two-column layout
 */
export const Default: Story = {
  args: {
    items: sampleFAQItems,
    columns: 2,
  },
};

/**
 * Single Column FAQ
 * FAQ accordion displayed in a single column
 */
export const SingleColumn: Story = {
  args: {
    items: sampleFAQItems,
    columns: 1,
  },
};

/**
 * Extended FAQ
 * Longer list of FAQ items with two-column layout
 */
export const ExtendedFAQ: Story = {
  args: {
    items: extendedFAQItems,
    columns: 2,
  },
};

/**
 * Extended FAQ Single Column
 * Longer FAQ list in single column layout
 */
export const ExtendedFAQSingleColumn: Story = {
  args: {
    items: extendedFAQItems,
    columns: 1,
  },
};

/**
 * Short FAQ
 * Minimal FAQ with just 2 items
 */
export const ShortFAQ: Story = {
  args: {
    items: sampleFAQItems.slice(0, 2),
    columns: 1,
  },
};

/**
 * Technical FAQ
 * FAQ focused on technical topics
 */
export const TechnicalFAQ: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'What are the system requirements?',
        answer:
          'Minimum: Windows 10, 4GB RAM, 50GB storage. Recommended: Windows 11, 8GB RAM, SSD with 100GB space for optimal performance.',
      },
      {
        id: '2',
        question: 'Is the software compatible with macOS?',
        answer: 'Yes, we offer native support for macOS 11 and later. Download the macOS version from our downloads page.',
      },
      {
        id: '3',
        question: 'How do I update to the latest version?',
        answer:
          'Updates are automatic by default. You can also manually check for updates by going to Settings > About > Check for Updates.',
      },
      {
        id: '4',
        question: 'What security features are included?',
        answer:
          'The software includes 256-bit AES encryption, multi-factor authentication, regular security audits, and compliance with GDPR and CCPA standards.',
      },
    ],
    columns: 2,
  },
};

/**
 * Pricing FAQ
 * FAQ about pricing and plans
 */
export const PricingFAQ: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'What is included in each plan?',
        answer:
          'Starter: Basic features, 5 users. Professional: Advanced features, 50 users. Enterprise: All features, unlimited users, dedicated support.',
      },
      {
        id: '2',
        question: 'Can I change my plan anytime?',
        answer: 'Yes, you can upgrade or downgrade your plan anytime. Changes take effect at the start of your next billing cycle.',
      },
      {
        id: '3',
        question: 'Do you offer a free trial?',
        answer: 'Yes, all plans come with a 14-day free trial. No credit card required to get started.',
      },
      {
        id: '4',
        question: 'What payment terms are available?',
        answer: 'We offer monthly and annual billing options. Annual plans include a 20% discount compared to monthly pricing.',
      },
    ],
    columns: 2,
  },
};

/**
 * Mobile View
 * FAQ accordion on mobile viewport
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    items: sampleFAQItems,
    columns: 1,
  },
};

/**
 * Tablet View
 * FAQ accordion on tablet viewport
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    items: extendedFAQItems,
    columns: 2,
  },
};

/**
 * Desktop View
 * FAQ accordion on large desktop viewport
 */
export const DesktopView: Story = {
  args: {
    items: extendedFAQItems,
    columns: 2,
  },
};

/**
 * Interactive - Expand All
 * Demonstration of accordion with all items expanded
 */
export const InteractiveDemo: Story = {
  args: {
    items: sampleFAQItems,
    columns: 2,
  },
  play: async ({ canvasElement }) => {
    // Focus on first button to demonstrate interactivity
    const buttons = canvasElement.querySelectorAll('button');
    if (buttons.length > 0) {
      (buttons[0] as HTMLElement).focus();
    }
  },
};

/**
 * Keyboard Navigation Test
 * Demonstrates keyboard navigation capabilities
 */
export const KeyboardNavigationTest: Story = {
  args: {
    items: sampleFAQItems,
    columns: 2,
  },
  render: (args) => (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Keyboard Navigation Instructions:</h3>
        <ul style={{ margin: '0', fontSize: '13px', paddingLeft: '20px' }}>
          <li>Press Tab to navigate between accordion items</li>
          <li>Press Enter or Space to expand/collapse an item</li>
          <li>Arrow Down/Up to navigate between items (if supported)</li>
        </ul>
      </div>
      <FAQAccordion {...args} />
    </div>
  ),
};

/**
 * Accessibility Features
 * Highlights accessibility features and ARIA attributes
 */
export const AccessibilityFeatures: Story = {
  args: {
    items: sampleFAQItems,
    columns: 2,
  },
  render: (args) => (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Accessibility Features:</h3>
        <ul style={{ margin: '0', fontSize: '13px', paddingLeft: '20px' }}>
          <li>aria-expanded attribute shows expansion state</li>
          <li>aria-controls attribute links header to answer content</li>
          <li>role="region" on answer for screen readers</li>
          <li>semantic button elements for proper keyboard interaction</li>
          <li>Rotating chevron icon for visual indicator</li>
        </ul>
      </div>
      <FAQAccordion {...args} />
    </div>
  ),
};

/**
 * Long Content Items
 * FAQ with longer, detailed answers
 */
export const LongContentItems: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'What is the difference between Basic and Premium plans?',
        answer:
          'The Basic plan includes essential features for individuals and small teams: 5 team members, 5GB cloud storage, basic analytics, and email support. The Premium plan is designed for growing businesses and includes: 50 team members, 500GB cloud storage, advanced analytics with custom reports, priority email and phone support, API access, and advanced security features including two-factor authentication and SSO.',
      },
      {
        id: '2',
        question: 'How does the refund process work?',
        answer:
          'We stand behind our products with a 60-day money-back guarantee. If you\'re not completely satisfied with your purchase, simply request a refund within 60 days of purchase. Your refund will be processed within 5-10 business days. To request a refund, contact our support team with your order number. No questions will be asked, and we will ensure a smooth and hassle-free process. In rare cases where there are disputes, our team will work with you to find a satisfactory resolution.',
      },
      {
        id: '3',
        question: 'What security measures are in place to protect my data?',
        answer:
          'Security is our top priority. We use industry-standard encryption (256-bit AES) for all data in transit and at rest. Our servers are hosted on secure, redundant infrastructure with regular security audits and penetration testing. We comply with major data protection regulations including GDPR, CCPA, and HIPAA. All employee access to customer data is logged and monitored. We also offer optional features like two-factor authentication and IP whitelisting for enterprise customers.',
      },
    ],
    columns: 1,
  },
};

/**
 * Varied Question Lengths
 * FAQ with different question lengths
 */
export const VariedQuestionLengths: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'How?',
        answer: 'This is how we do it.',
      },
      {
        id: '2',
        question: 'What are the main benefits?',
        answer: 'We provide comprehensive solutions including cost savings, improved efficiency, and enhanced security.',
      },
      {
        id: '3',
        question: 'Can you walk me through the entire onboarding process from start to finish?',
        answer:
          'Certainly! The onboarding process starts with account creation, followed by profile setup, team member invitation, integration configuration, and finally a guided tour of key features.',
      },
    ],
    columns: 1,
  },
};

/**
 * Two Column Comparison
 * Shows side-by-side comparison of columns
 */
export const ColumnComparison: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Single Column</h3>
        <FAQAccordion {...args} items={sampleFAQItems} columns={1} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Two Columns</h3>
        <FAQAccordion {...args} items={sampleFAQItems} columns={2} />
      </div>
    </div>
  ),
};

/**
 * Full Page Context
 * FAQ accordion in a realistic page context
 */
export const FullPageContext: Story = {
  render: (args) => (
    <div>
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <h1 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>Frequently Asked Questions</h1>
        <p style={{ margin: 0, fontSize: '16px' }}>Find answers to common questions about our service</p>
      </div>

      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <FAQAccordion {...args} items={extendedFAQItems} columns={2} />
      </div>

      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: '10px' }}>Still have questions?</h2>
        <p style={{ margin: 0, marginBottom: '20px' }}>Can't find the answer you're looking for? Contact our support team.</p>
        <button
          style={{
            padding: '12px 32px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Contact Support
        </button>
      </div>
    </div>
  ),
};
