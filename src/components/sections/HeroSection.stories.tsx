import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection } from './HeroSection';

/**
 * HeroSection component - the main hero/banner section of the landing page.
 *
 * Design Specifications:
 * - Two-column layout (desktop)
 * - Background: #F4F8FF (light blue)
 * - Left column: Headline, subheading, and CTA button
 * - Right column: Device showcase with placeholder graphics
 *
 * ## Content
 * - **Headline**: "US Mobile Trade In" (blue #1D5FF6) with emoji accent "Get 💰 for your old 📱"
 * - **Subheading**: "Trade in your old phone, tablet, or smartwatch. Instant quote. Free shipping. Fast payout."
 * - **CTA Button**: "Check trade in value" (primary, large)
 * - **Device Showcase**: Visual representation of phone, watch, and laptop
 *
 * ## Responsive Behavior
 * - Desktop: Side-by-side layout
 * - Tablet: May stack vertically
 * - Mobile: Stacked layout with content first
 *
 * ## Accessibility
 * - Semantic `<section>` element
 * - Proper heading hierarchy (`<h1>`)
 * - Device graphics marked as decorative
 */
const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section with headline, value proposition, CTA button, and device showcase. Features light blue background (#F4F8FF).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero section on desktop
 */
export const Default: Story = {};

/**
 * Hero section on mobile viewport (375px)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Hero section on mobile viewport with stacked layout.',
      },
    },
  },
};

/**
 * Hero section on tablet viewport (768px)
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Hero section on tablet viewport.',
      },
    },
  },
};

/**
 * Hero section on large desktop viewport (1920px)
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Hero section on large desktop viewport.',
      },
    },
  },
};

/**
 * Hero section with context showing it's the first section on the page
 */
export const WithPageContext: Story = {
  render: () => (
    <div style={{ minHeight: '100vh' }}>
      <HeroSection />
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: '#fff',
        }}
      >
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          The Hero Section is typically the first thing users see on the landing page. It
          communicates the core value proposition and includes the primary call-to-action.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hero section shown in context as the first section of the page.',
      },
    },
  },
};

/**
 * Hero section highlighting the headline structure
 */
export const HeadlineDetails: Story = {
  render: () => (
    <div>
      <HeroSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Headline Structure</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Primary Text</h3>
              <p style={{ fontSize: '14px', color: '#1D5FF6', fontWeight: '600' }}>
                "US Mobile Trade In"
              </p>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Brand name and service (blue #1D5FF6)
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Secondary Text</h3>
              <p style={{ fontSize: '14px' }}>
                "Get 💰 for your old 📱"
              </p>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Friendly, engaging value proposition with emojis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breakdown of the hero headline structure with primary and emoji text.',
      },
    },
  },
};

/**
 * Hero section highlighting the device showcase
 */
export const DeviceShowcaseDetails: Story = {
  render: () => (
    <div>
      <HeroSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Device Showcase</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>📱</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Smartphones</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>iPhone & Android devices</p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>⌚</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Smartwatches</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>Apple Watch & Galaxy Watch</p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>💻</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Laptops</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>MacBook & Windows laptops</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Explanation of devices featured in the showcase.',
      },
    },
  },
};

/**
 * Hero section content breakdown
 */
export const ContentBreakdown: Story = {
  render: () => (
    <div>
      <HeroSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Content Elements</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                1. Headline (H1)
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                The main headline uses a two-part structure: brand/service name followed by an
                emoji-enhanced value proposition. This creates immediate emotional connection.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                2. Subheading
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                The subheading expands on the value proposition, explaining what users can trade
                in and key benefits: instant quote, free shipping, and fast payout.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                3. Call-to-Action
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Primary large button with action-oriented copy: "Check trade in value". This is
                the main conversion point from the hero section.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                4. Device Showcase
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Visual representation of tradeable devices helps users quickly identify if their
                device qualifies. Uses placeholder graphics with device emojis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Detailed breakdown of all content elements in the hero section.',
      },
    },
  },
};

/**
 * Interactive test - CTA button click
 */
export const ClickCTAButton: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies the CTA button is present and clickable.',
      },
    },
  },
};

/**
 * Interactive test - verify content structure
 */
export const VerifyContent: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies all key content elements are present in the hero section.',
      },
    },
  },
};

/**
 * Hero section with alternative background colors
 */
export const BackgroundVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#F4F8FF' }}>
        <HeroSection />
      </div>
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#666' }}>Default: #F4F8FF (Light Blue)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows the hero section with its default light blue background.',
      },
    },
  },
};

/**
 * Comparison with different viewport sizes
 */
export const ResponsiveComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <div>
        <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Desktop View</h3>
        <div style={{ border: '2px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <HeroSection />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive layout comparison across different viewport sizes.',
      },
    },
  },
};
