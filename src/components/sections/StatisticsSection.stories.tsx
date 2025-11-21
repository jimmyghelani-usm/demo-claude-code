import type { Meta, StoryObj } from '@storybook/react';
import { StatisticsSection } from './StatisticsSection';

/**
 * StatisticsSection - Landing page statistics showcase
 *
 * Displays 3 key statistics in a responsive grid layout with animated stat cards.
 * Features customizable cards, icons, and descriptions for different use cases.
 */
const meta = {
  title: 'Sections/StatisticsSection',
  component: StatisticsSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive statistics showcase component with 3-column grid layout. Displays key metrics with icons, numbers, labels, and descriptions. Supports custom cards and styling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatisticsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story with referral program statistics
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Custom statistics cards for different metrics
 */
export const CustomCards: Story = {
  args: {
    cards: [
      {
        id: 'users',
        number: '50,000+',
        label: 'Active Users',
        description: 'Users actively participating in our platform',
        icon: '👥',
      },
      {
        id: 'revenue',
        number: '$5.2M',
        label: 'Total Revenue Generated',
        description: 'Cumulative revenue through referral partnerships',
        icon: '💵',
      },
      {
        id: 'countries',
        number: '87',
        label: 'Countries Worldwide',
        description: 'Geographic reach of our referral network',
        icon: '🌍',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Performance metrics variation
 */
export const PerformanceMetrics: Story = {
  args: {
    cards: [
      {
        id: 'uptime',
        number: '99.99%',
        label: 'System Uptime',
        description: 'Guaranteed service reliability',
        icon: '✅',
      },
      {
        id: 'speed',
        number: '<100ms',
        label: 'Average Response Time',
        description: 'Lightning-fast API responses',
        icon: '⚡',
      },
      {
        id: 'security',
        number: 'ISO 27001',
        label: 'Security Certified',
        description: 'Enterprise-grade security standards',
        icon: '🔒',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Achievement statistics variation
 */
export const AchievementStats: Story = {
  args: {
    cards: [
      {
        id: 'awards',
        number: '15+',
        label: 'Industry Awards',
        description: 'Recognition for innovation and excellence',
        icon: '🏆',
      },
      {
        id: 'partnerships',
        number: '200+',
        label: 'Strategic Partnerships',
        description: 'Collaborations with leading companies',
        icon: '🤝',
      },
      {
        id: 'satisfaction',
        number: '4.9/5',
        label: 'Customer Satisfaction',
        description: 'Based on 50,000+ user reviews',
        icon: '⭐',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Variant with custom className
 */
export const WithCustomClass: Story = {
  args: {
    className: 'custom-statistics-section',
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Single card variant (minimum cards)
 */
export const SingleCard: Story = {
  args: {
    cards: [
      {
        id: 'single',
        number: '1M+',
        label: 'Total Downloads',
        description: 'Millions of users trust our platform',
        icon: '📥',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Five cards variant (maximum useful cards)
 */
export const FiveCards: Story = {
  args: {
    cards: [
      {
        id: 'card1',
        number: '10M+',
        label: 'Transactions',
        description: 'Processed securely',
        icon: '💳',
      },
      {
        id: 'card2',
        number: '99.9%',
        label: 'Uptime',
        description: 'Service reliability',
        icon: '✅',
      },
      {
        id: 'card3',
        number: '24/7',
        label: 'Support',
        description: 'Always available',
        icon: '🎧',
      },
      {
        id: 'card4',
        number: '50+',
        label: 'Integrations',
        description: 'With popular tools',
        icon: '🔗',
      },
      {
        id: 'card5',
        number: '2000+',
        label: 'Enterprise Clients',
        description: 'Fortune 500 partners',
        icon: '🏢',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Cards without icons
 */
export const WithoutIcons: Story = {
  args: {
    cards: [
      {
        id: 'no-icon-1',
        number: '25,000',
        label: 'Referrers rewarded',
        description: 'Active users earning through referrals',
      },
      {
        id: 'no-icon-2',
        number: '$175,000',
        label: 'Biggest monthly payout',
        description: 'Maximum rewards distributed in a single month',
      },
      {
        id: 'no-icon-3',
        number: 'New York',
        label: 'Top city this week',
        description: 'Leading city by referral activity',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Growth statistics variation
 */
export const GrowthStats: Story = {
  args: {
    cards: [
      {
        id: 'growth1',
        number: '300%',
        label: 'Year-over-Year Growth',
        description: 'Consistent rapid expansion',
        icon: '📈',
      },
      {
        id: 'growth2',
        number: '$10M+',
        label: 'Total Funding Raised',
        description: 'From leading venture capital firms',
        icon: '💰',
      },
      {
        id: 'growth3',
        number: '500%',
        label: 'User Growth',
        description: 'Exponential platform adoption',
        icon: '🚀',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Accessibility variant with focus states visible
 */
export const AccessibilityFocus: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates accessibility features including focus management and ARIA labels. All cards have proper heading hierarchy (h3 for numbers, h4 for labels) and semantic article elements.',
      },
    },
  },
  render: () => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection />
    </div>
  ),
};

/**
 * Responsive design preview
 */
export const ResponsivePreview: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Component automatically adapts to different screen sizes. Try resizing your browser or changing viewport sizes in Storybook controls.',
      },
    },
  },
  render: () => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection />
    </div>
  ),
};

/**
 * Empty state (no cards)
 */
export const EmptyState: Story = {
  args: {
    cards: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Component handles empty cards array gracefully, showing only the header section.',
      },
    },
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Long content variant to test text wrapping
 */
export const LongContentVariant: Story = {
  args: {
    cards: [
      {
        id: 'long1',
        number: 'Extraordinarily Large Number With Many Digits',
        label: 'This is a very long label that describes a complex metric',
        description:
          'This description contains a substantial amount of text to demonstrate how the component handles and wraps longer content across different screen sizes while maintaining visual hierarchy and readability.',
        icon: '📊',
      },
      {
        id: 'long2',
        number: '$999,999,999,999',
        label: 'Another Long Statistical Label For Demonstration',
        description:
          'Testing how the component manages very lengthy descriptions and whether text wrapping is properly implemented across all viewport sizes.',
        icon: '💹',
      },
      {
        id: 'long3',
        number: '∞',
        label: 'Infinite Possibilities With Extended Label Text',
        description:
          'Verifying responsive behavior and text handling when content exceeds standard line lengths on both desktop and mobile viewports.',
        icon: '🌟',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};

/**
 * Dark theme verification (dark background)
 */
export const DarkThemeVariant: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <StatisticsSection />
    </div>
  ),
};

/**
 * Light theme preview (for contrast testing)
 */
export const LightThemeVariant: Story = {
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: 'Preview on light background to test color contrast and visibility.',
      },
    },
  },
  render: () => (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <StatisticsSection />
    </div>
  ),
};

/**
 * Mixed icon types
 */
export const MixedIconTypes: Story = {
  args: {
    cards: [
      {
        id: 'emoji1',
        number: '🎯',
        label: 'Emoji Icon',
        description: 'Using emoji as the main stat',
        icon: '🎯',
      },
      {
        id: 'number1',
        number: '42',
        label: 'Numeric Stat',
        description: 'Traditional numeric statistic',
        icon: '🔢',
      },
      {
        id: 'text1',
        number: 'Global',
        label: 'Text-Based Stat',
        description: 'Using text instead of number',
        icon: '🌐',
      },
    ],
  },
  render: (args) => (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <StatisticsSection {...args} />
    </div>
  ),
};
