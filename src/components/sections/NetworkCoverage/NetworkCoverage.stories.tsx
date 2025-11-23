import type { StoryObj } from '@storybook/react';
import { NetworkCoverage } from './NetworkCoverage';

const meta = {
  title: 'Sections/NetworkCoverage',
  component: NetworkCoverage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A two-column network coverage benefits section featuring a title, description, benefits list, and optional illustration. Ideal for showcasing connectivity features and network advantages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section heading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Nationwide Network Coverage'" },
      },
    },
    description: {
      control: 'text',
      description: 'Section subtitle and description',
      table: {
        type: { summary: 'string' },
      },
    },
    benefits: {
      description: 'Array of benefit strings to display in list format',
      table: {
        type: { summary: 'string[]' },
      },
    },
    illustrationUrl: {
      control: 'text',
      description: 'URL to the illustration/image on the right side',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const networkImage = 'https://images.unsplash.com/photo-1450101499163-c8917c7b4edc?w=600&h=600&fit=crop';

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default network coverage section with nationwide 4G/5G benefits and network illustration.',
      },
    },
  },
};

export const GlobalConnectivity: Story = {
  args: {
    title: 'Global Connectivity',
    description: 'Connect anywhere in the world with our global network infrastructure and seamless roaming capabilities',
    benefits: [
      'Coverage in 195 countries',
      'High-speed LTE and 5G networks',
      '99.99% uptime SLA guarantee',
      'Automatic network switching',
      'Priority customer support',
      'Flexible roaming options',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage highlighting global reach with international benefits.',
      },
    },
  },
};

export const USCoverage: Story = {
  args: {
    title: 'United States Network Coverage',
    description: 'Experience the most reliable network coverage across all 50 states with our premium infrastructure',
    benefits: [
      'Coast-to-coast 5G coverage',
      'Nationwide 4G LTE fallback',
      '99.9% network reliability',
      'Lightning-fast data speeds',
      'Rural and urban coverage',
      'No coverage dead zones',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Coverage focused on United States network infrastructure.',
      },
    },
  },
};

export const EnterpriseBenefits: Story = {
  args: {
    title: 'Enterprise Network Solutions',
    description: 'Dedicated network infrastructure designed for mission-critical business operations',
    benefits: [
      'Private network options',
      'Guaranteed bandwidth allocation',
      'SLA-backed reliability (99.99%)',
      'Dedicated account management',
      'Advanced security features',
      '24/7 enterprise support',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage emphasizing enterprise and business solutions.',
      },
    },
  },
};

export const SportingEvent: Story = {
  args: {
    title: 'Event Network Coverage',
    description: 'Reliable connectivity for major events with dedicated network capacity and support',
    benefits: [
      'High-capacity network infrastructure',
      'Event-specific coverage zones',
      'Real-time network monitoring',
      'Rapid technical support on-site',
      'Emergency response priority',
      'Streaming-optimized speeds',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage specialized for large events and gatherings.',
      },
    },
  },
};

export const IoTNetwork: Story = {
  args: {
    title: 'IoT Network Infrastructure',
    description: 'Optimized connectivity for Internet of Things devices and smart applications',
    benefits: [
      'Low-latency connectivity',
      'Optimized for IoT devices',
      'Multiple frequency bands',
      'Extended battery efficiency',
      'Massive device scaling',
      'Secure device authentication',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage specialized for IoT and smart devices.',
      },
    },
  },
};

export const PerformanceMetrics: Story = {
  args: {
    title: 'Network Performance Metrics',
    description: 'Industry-leading network performance backed by comprehensive guarantees and monitoring',
    benefits: [
      'Average latency under 20ms',
      'Download speeds up to 1Gbps',
      'Upload speeds up to 500Mbps',
      'Packet loss under 0.01%',
      'Jitter minimized for gaming',
      'Real-time performance dashboard',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage highlighting performance metrics and speed capabilities.',
      },
    },
  },
};

export const MinimalBenefits: Story = {
  args: {
    title: 'Fast Network Coverage',
    description: 'Simple and reliable connectivity',
    benefits: [
      'Nationwide coverage',
      'High-speed 5G',
      'Reliable service',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage with minimal benefits list (3 items).',
      },
    },
  },
};

export const LongBenefitsList: Story = {
  args: {
    title: 'Complete Network Coverage Package',
    description: 'Comprehensive network solutions covering all aspects of connectivity and support',
    benefits: [
      'Nationwide 4G LTE coverage',
      'Premium 5G network access',
      '99.9% network uptime guarantee',
      'International roaming in 200+ countries',
      '24/7 customer support',
      'Fast switching between networks',
      'Advanced security features',
      'Data compression technology',
      'Priority data speeds',
      'Annual plan discounts',
      'Device protection options',
      'Family plan sharing',
    ],
    illustrationUrl: networkImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage with extended benefits list (12 items) demonstrating full feature set.',
      },
    },
  },
};

export const CustomImage: Story = {
  args: {
    title: 'Network Infrastructure',
    description: 'State-of-the-art network technology powering modern communication',
    benefits: [
      'Advanced fiber optic backbone',
      'Cloud-based network architecture',
      'AI-optimized routing',
      'Real-time traffic management',
      'Redundant failover systems',
      'Continuous network optimization',
    ],
    illustrationUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: 'Network coverage section with custom technology-focused illustration.',
      },
    },
  },
};
