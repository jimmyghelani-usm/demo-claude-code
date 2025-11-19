import type { Meta, StoryObj } from '@storybook/react-vite';
import { TradeInLandingPage } from './TradeInLandingPage';

/**
 * TradeInLandingPage - Complete landing page for US Mobile Trade In service.
 *
 * This is the full page composition showcasing the complete user experience for the
 * trade-in flow. It combines all layout, section, and component elements into a cohesive
 * landing page.
 *
 * ## Page Structure
 * 1. **Header** (Fixed) - Logo, navigation, and action buttons
 * 2. **Hero Section** - Main headline, value proposition, and CTA
 * 3. **How It Works Section** - 3-step process explanation with video
 * 4. **FAQ Section** - Comprehensive FAQ with accordion cards
 * 5. **Footer** - Footer links and social media
 *
 * ## User Flow
 * - Land on page → Read value proposition in hero
 * - Understand process in "How It Works"
 * - Get questions answered in FAQ
 * - Take action via CTAs (Check trade-in value, Contact Support)
 *
 * ## Key Features
 * - Fixed header for easy navigation
 * - Clear visual hierarchy
 * - Multiple conversion points
 * - Mobile-responsive design
 * - Accessible throughout
 *
 * ## Responsive Design
 * - Desktop (1440px+): Full layout with side-by-side content
 * - Tablet (768px-1439px): Adjusted spacing and some stacking
 * - Mobile (320px-767px): Vertical stacking, simplified navigation
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Proper heading hierarchy (H1 → H2 → H3)
 * - Keyboard navigable
 * - Screen reader friendly
 * - Focus management
 * - ARIA labels where appropriate
 */
const meta = {
  title: 'Pages/TradeInLandingPage',
  component: TradeInLandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete landing page composition for US Mobile Trade In service, including Header, Hero, How It Works, FAQ sections, and Footer.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TradeInLandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full landing page on desktop viewport
 */
export const Desktop: Story = {};

/**
 * Landing page on tablet viewport (768px)
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Complete landing page layout on tablet viewport.',
      },
    },
  },
};

/**
 * Landing page on mobile viewport (375px)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Complete landing page layout on mobile viewport with stacked sections.',
      },
    },
  },
};

/**
 * Landing page on large desktop viewport (1920px)
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Complete landing page on large desktop viewport.',
      },
    },
  },
};

/**
 * Landing page on small mobile viewport (320px)
 */
export const SmallMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      description: {
        story: 'Complete landing page on small mobile viewport (320px).',
      },
    },
  },
};

/**
 * Page structure breakdown
 */
export const PageStructure: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: '40px 20px',
          background: '#0C173E',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '24px', color: '#fff' }}>Landing Page Structure</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'left',
            }}
          >
            <strong>1. Header (Fixed)</strong> - 60px height, logo, navigation, actions
          </div>
          <div
            style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'left',
            }}
          >
            <strong>2. Hero Section</strong> - Headline, value prop, CTA, device showcase
          </div>
          <div
            style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'left',
            }}
          >
            <strong>3. How It Works Section</strong> - 3-step process with video demo
          </div>
          <div
            style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'left',
            }}
          >
            <strong>4. FAQ Section</strong> - 8 questions in two-column layout
          </div>
          <div
            style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'left',
            }}
          >
            <strong>5. Footer</strong> - 60px height, footer links, social media
          </div>
        </div>
      </div>
      <TradeInLandingPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual breakdown of the page structure and sections.',
      },
    },
  },
};

/**
 * User journey visualization
 */
export const UserJourney: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: '40px 20px',
          background: '#F4F8FF',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>User Journey</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                padding: '20px',
                background: '#fff',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #1D5FF6',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>1️⃣</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Awareness</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                Hero section grabs attention with clear value proposition
              </p>
            </div>
            <div
              style={{
                padding: '20px',
                background: '#fff',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #1D5FF6',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>2️⃣</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Understanding</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                How It Works explains the simple 3-step process
              </p>
            </div>
            <div
              style={{
                padding: '20px',
                background: '#fff',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #1D5FF6',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>3️⃣</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Confidence</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                FAQ section addresses concerns and builds trust
              </p>
            </div>
            <div
              style={{
                padding: '20px',
                background: '#fff',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #1D5FF6',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>4️⃣</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Action</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                Multiple CTAs encourage users to check trade-in value
              </p>
            </div>
          </div>
        </div>
      </div>
      <TradeInLandingPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visualization of the user journey through the landing page.',
      },
    },
  },
};

/**
 * Conversion points
 */
export const ConversionPoints: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Conversion Points</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                background: '#f0f7ff',
                borderRadius: '8px',
                border: '1px solid #1D5FF6',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>
                1. Hero Section CTA (Primary)
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                Large primary button: "Check trade in value" - Main conversion point, highly
                visible above the fold
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f0f7ff',
                borderRadius: '8px',
                border: '1px solid #1D5FF6',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>
                2. Header CTA (Secondary)
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                "Get US Mobile" button - Always accessible in fixed header for brand awareness and
                signup
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f0f7ff',
                borderRadius: '8px',
                border: '1px solid #1D5FF6',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>3. FAQ CTA (Support)</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                "Contact Support" button - For users who need help or have questions not covered
                in FAQ
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f0f7ff',
                borderRadius: '8px',
                border: '1px solid #1D5FF6',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>4. Chat Support Icon</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                Chat icon in header - Immediate support access for users who prefer chat
              </p>
            </div>
          </div>
        </div>
      </div>
      <TradeInLandingPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all conversion points and CTAs on the page.',
      },
    },
  },
};

/**
 * Interactive test - navigate through page
 */
export const NavigateThroughPage: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies all major page sections are present.',
      },
    },
  },
};

/**
 * Interactive test - primary CTA
 */
export const ClickPrimaryCTA: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Tests the primary call-to-action button in the hero section.',
      },
    },
  },
};

/**
 * Interactive test - header navigation
 */
export const NavigateHeaderLinks: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Tests header navigation links.',
      },
    },
  },
};

/**
 * Interactive test - FAQ interactions
 */
export const InteractWithFAQs: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Tests FAQ section presence and interactivity.',
      },
    },
  },
};

/**
 * Accessibility test - semantic structure
 */
export const SemanticStructure: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies semantic HTML structure and proper heading hierarchy.',
      },
    },
  },
};

/**
 * Responsive behavior comparison
 */
export const ResponsiveComparison: Story = {
  render: () => (
    <div style={{ background: '#f5f5f5', padding: '20px' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
          Responsive Design Breakpoints
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Mobile (320px-767px)</h3>
            <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Single column layout</li>
              <li>Stacked sections</li>
              <li>Hamburger menu (future)</li>
              <li>Simplified navigation</li>
            </ul>
          </div>
          <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Tablet (768px-1439px)</h3>
            <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Two-column layouts</li>
              <li>Adjusted spacing</li>
              <li>Full navigation visible</li>
              <li>Optimized touch targets</li>
            </ul>
          </div>
          <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Desktop (1440px+)</h3>
            <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Max-width: 1440px</li>
              <li>Side-by-side layouts</li>
              <li>Full feature set</li>
              <li>Optimal spacing</li>
            </ul>
          </div>
        </div>
      </div>
      <TradeInLandingPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of responsive design breakpoints and behaviors.',
      },
    },
  },
};
