import type { Meta, StoryObj } from '@storybook/react';
import { BusinessPageHero } from './BusinessPageHero';

/**
 * BusinessPageHero Component Stories
 * Showcases the full-width hero section with background imagery
 * - Background images with blur and gradient overlays
 * - Customizable title and subtitle content
 * - Responsive layouts and multiple background options
 */
const meta: Meta<typeof BusinessPageHero> = {
  title: 'Sections/BusinessPageHero',
  component: BusinessPageHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-viewport height hero section with background image, blur effects, and gradient overlay. Features customizable title and subtitle text with responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: {
      control: 'text',
      description: 'URL of the background image',
    },
    title: {
      control: 'text',
      description: 'Hero section title text',
    },
    subtitle: {
      control: 'text',
      description: 'Hero section subtitle text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Hero
 * Standard hero with default background image and text
 */
export const Default: Story = {
  args: {
    title: 'Welcome to Our Business',
    subtitle: 'Discover what we can do for you',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=738&fit=crop',
  },
};

/**
 * Technology Hero
 * Hero section for a tech company with appropriate background
 */
export const TechHero: Story = {
  args: {
    title: 'Advanced Technology Solutions',
    subtitle: 'Transforming your digital future',
    backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1440&h=738&fit=crop',
  },
};

/**
 * Business Hero
 * Professional business-focused hero section
 */
export const BusinessHero: Story = {
  args: {
    title: 'Empower Your Business',
    subtitle: 'With cutting-edge solutions and expert support',
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=738&fit=crop',
  },
};

/**
 * Innovation Hero
 * Innovation-themed hero section
 */
export const InnovationHero: Story = {
  args: {
    title: 'Innovation Drives Progress',
    subtitle: 'Be part of the revolution',
    backgroundImage: 'https://images.unsplash.com/photo-1516321714253-8cfe6207f59d?w=1440&h=738&fit=crop',
  },
};

/**
 * Short Title
 * Hero with concise, minimal title
 */
export const ShortTitle: Story = {
  args: {
    title: 'Welcome',
    subtitle: 'Let\'s build something amazing together',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=738&fit=crop',
  },
};

/**
 * Long Title
 * Hero with longer, multi-line title
 */
export const LongTitle: Story = {
  args: {
    title: 'Experience the Future of Digital Transformation with Innovative Solutions',
    subtitle: 'Join thousands of companies transforming their businesses',
    backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1440&h=738&fit=crop',
  },
};

/**
 * Long Subtitle
 * Hero with extended subtitle text
 */
export const LongSubtitle: Story = {
  args: {
    title: 'Transform Your Vision',
    subtitle:
      'Discover how our comprehensive suite of services can help you achieve your business goals with proven strategies and dedicated support from our expert team',
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=738&fit=crop',
  },
};

/**
 * No Subtitle
 * Hero section without subtitle text
 */
export const NoSubtitle: Story = {
  args: {
    title: 'Welcome to the Future',
    subtitle: '',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=738&fit=crop',
  },
};

/**
 * Single Line Content
 * Hero with minimal, concise content
 */
export const MinimalContent: Story = {
  args: {
    title: 'Start Now',
    subtitle: 'Make a difference',
    backgroundImage: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=1440&h=738&fit=crop',
  },
};

/**
 * Mobile View
 * Hero section optimized for mobile viewport
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    title: 'Mobile First Design',
    subtitle: 'Optimized for all devices',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=738&fit=crop',
  },
};

/**
 * Tablet View
 * Hero section on tablet-sized viewport
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    title: 'Tablet Responsive Design',
    subtitle: 'Perfect for all screen sizes',
    backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1440&h=738&fit=crop',
  },
};

/**
 * Corporate Hero
 * Professional corporate-styled hero
 */
export const CorporateHero: Story = {
  args: {
    title: 'Enterprise Solutions for Global Leaders',
    subtitle: 'Streamline your operations and maximize ROI',
    backgroundImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1440&h=738&fit=crop',
  },
};

/**
 * Creative Agency Hero
 * Creative and vibrant hero for agencies
 */
export const CreativeAgencyHero: Story = {
  args: {
    title: 'Unleash Your Creativity',
    subtitle: 'Collaborate, innovate, and create exceptional experiences',
    backgroundImage: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=1440&h=738&fit=crop',
  },
};

/**
 * Startup Hero
 * Energetic hero for startups
 */
export const StartupHero: Story = {
  args: {
    title: 'Scale Your Startup',
    subtitle: 'From idea to impact in minutes',
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=738&fit=crop',
  },
};

/**
 * Healthcare Hero
 * Professional healthcare-themed hero
 */
export const HealthcareHero: Story = {
  args: {
    title: 'Your Health, Our Priority',
    subtitle: 'Comprehensive care solutions for better living',
    backgroundImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1440&h=738&fit=crop',
  },
};

/**
 * E-commerce Hero
 * Hero section for e-commerce platforms
 */
export const EcommerceHero: Story = {
  args: {
    title: 'Shop the Latest Collections',
    subtitle: 'Premium products at unbeatable prices',
    backgroundImage: 'https://images.unsplash.com/photo-1460925895917-aae19298e42f?w=1440&h=738&fit=crop',
  },
};

/**
 * Event Hero
 * Hero for event promotions
 */
export const EventHero: Story = {
  args: {
    title: 'Join Us This Year',
    subtitle: 'Network with industry leaders and innovators',
    backgroundImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1440&h=738&fit=crop',
  },
};

/**
 * Education Hero
 * Educational platform hero
 */
export const EducationHero: Story = {
  args: {
    title: 'Expand Your Knowledge',
    subtitle: 'Learn new skills from industry experts',
    backgroundImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1440&h=738&fit=crop',
  },
};

/**
 * SaaS Hero
 * Software-as-a-service product hero
 */
export const SaaSHero: Story = {
  args: {
    title: 'Cloud-Based Solutions',
    subtitle: 'Accessible, scalable, and secure',
    backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1440&h=738&fit=crop',
  },
};

/**
 * Multiple Viewports Comparison
 * Shows hero on different screen sizes side by side
 */
export const ViewportsComparison: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>Mobile (375px)</h3>
        <div style={{ width: '375px', height: '400px', overflow: 'hidden', border: '1px solid #ccc' }}>
          <BusinessPageHero {...args} />
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>Tablet (768px)</h3>
        <div style={{ width: '768px', height: '400px', overflow: 'hidden', border: '1px solid #ccc' }}>
          <BusinessPageHero {...args} />
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>Desktop (1440px)</h3>
        <div style={{ width: '1440px', height: '400px', overflow: 'hidden', border: '1px solid #ccc' }}>
          <BusinessPageHero {...args} />
        </div>
      </div>
    </div>
  ),
  args: {
    title: 'Responsive Hero Design',
    subtitle: 'Perfect on every device',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=738&fit=crop',
  },
};

/**
 * Focus State
 * Demonstrate focus states and accessibility
 */
export const AccessibilityFocus: Story = {
  args: {
    title: 'Accessible Design Matters',
    subtitle: 'Creating inclusive experiences for everyone',
    backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1440&h=738&fit=crop',
  },
  play: async ({ canvasElement }) => {
    // Simulate focus on the hero section for demonstration
    const hero = canvasElement.querySelector('section');
    if (hero) {
      hero.focus();
    }
  },
};
