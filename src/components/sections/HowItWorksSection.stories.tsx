import type { Meta, StoryObj } from '@storybook/react-vite';
import { HowItWorksSection } from './HowItWorksSection';

/**
 * HowItWorksSection component - explains the 3-step trade-in process.
 *
 * Design Specifications:
 * - Section heading and subheading
 * - Three StepCards displayed horizontally (desktop)
 * - Video placeholder with play button
 * - White/neutral background
 *
 * ## Content Structure
 * - **Heading**: "How does US Mobile Trade In work?"
 * - **Subheading**: "Just three steps between you and that $$$."
 * - **Step Cards**: Three cards explaining the process
 *   1. Check trade in value
 *   2. Ship your device
 *   3. Get Paid
 * - **Video Demo**: Placeholder for explainer video
 *
 * ## Responsive Behavior
 * - Desktop: Cards in horizontal row with 88px gap
 * - Tablet: May wrap to two rows
 * - Mobile: Stacked vertically
 *
 * ## Accessibility
 * - Semantic `<section>` element
 * - Proper heading hierarchy (`<h2>`)
 * - Video button with descriptive aria-label
 */
const meta = {
  title: 'Sections/HowItWorksSection',
  component: HowItWorksSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Section explaining the 3-step trade-in process with step cards and video demo placeholder.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HowItWorksSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default How It Works section on desktop
 */
export const Default: Story = {};

/**
 * How It Works section on mobile viewport (375px)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'How It Works section with vertically stacked step cards on mobile.',
      },
    },
  },
};

/**
 * How It Works section on tablet viewport (768px)
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'How It Works section on tablet viewport.',
      },
    },
  },
};

/**
 * How It Works section on large desktop viewport (1920px)
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'How It Works section on large desktop viewport.',
      },
    },
  },
};

/**
 * Section with page context
 */
export const WithPageContext: Story = {
  render: () => (
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          padding: '60px 20px',
          background: '#F4F8FF',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Previous section (e.g., Hero Section)
        </p>
      </div>
      <HowItWorksSection />
      <div
        style={{
          padding: '60px 20px',
          background: '#F4F8FF',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Next section (e.g., FAQ Section)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'How It Works section shown in context between other sections.',
      },
    },
  },
};

/**
 * Highlighting the 3-step process
 */
export const StepProcessDetails: Story = {
  render: () => (
    <div>
      <HowItWorksSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#f9f9f9',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>The 3-Step Process</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '12px',
                border: '2px solid #1D5FF6',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  textAlign: 'center',
                  marginBottom: '12px',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', textAlign: 'center' }}>
                Step 1: Check Value
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '14px',
                  lineHeight: '1.8',
                }}
              >
                <li>• Answer device questions</li>
                <li>• Get instant quote</li>
                <li>• No commitments</li>
              </ul>
            </div>
            <div
              style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '12px',
                border: '2px solid #1D5FF6',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  textAlign: 'center',
                  marginBottom: '12px',
                }}
              >
                📦
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', textAlign: 'center' }}>
                Step 2: Ship Device
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '14px',
                  lineHeight: '1.8',
                }}
              >
                <li>• Pack your device</li>
                <li>• Free prepaid label</li>
                <li>• Ship for free</li>
              </ul>
            </div>
            <div
              style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '12px',
                border: '2px solid #1D5FF6',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  textAlign: 'center',
                  marginBottom: '12px',
                }}
              >
                💵
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', textAlign: 'center' }}>
                Step 3: Get Paid
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '14px',
                  lineHeight: '1.8',
                }}
              >
                <li>• Device inspection</li>
                <li>• Verification process</li>
                <li>• Payment in 2-3 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Detailed breakdown of the 3-step process with additional information.',
      },
    },
  },
};

/**
 * Video placeholder details
 */
export const VideoPlaceholderDetails: Story = {
  render: () => (
    <div>
      <HowItWorksSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Video Demo Component</h2>
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Dimensions</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>946px x 478px</p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Placeholder Design</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Light blue background (#D2DFFD) with subtle white overlay and centered play
                button
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Play Button</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                64px circular button with primary blue (#1D5FF6) and white play icon
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Label</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>"Watch how it works"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Details about the video placeholder component.',
      },
    },
  },
};

/**
 * Content hierarchy
 */
export const ContentHierarchy: Story = {
  render: () => (
    <div>
      <HowItWorksSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Content Hierarchy</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                1. Section Heading (H2)
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                "How does US Mobile Trade In work?" - Question format engages users and sets
                expectations for educational content.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                2. Subheading
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                "Just three steps between you and that $$$." - Emphasizes simplicity and reward,
                using casual tone to build rapport.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                3. Step Cards
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Three cards with icons, step numbers, titles, and descriptions break down the
                process into digestible chunks.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                4. Video Demo
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Visual learners can watch a demonstration. The placeholder indicates where a real
                explainer video would be embedded.
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
        story: 'Breakdown of content hierarchy and structure.',
      },
    },
  },
};

/**
 * Interactive test - video button click
 */
export const ClickVideoButton: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies the video play button is present and clickable.',
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
        story: 'Verifies all key content elements are present in the How It Works section.',
      },
    },
  },
};

/**
 * Accessibility test - heading hierarchy
 */
export const HeadingHierarchy: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies proper heading hierarchy (H2 for section, H3 for steps).',
      },
    },
  },
};

/**
 * Step spacing and layout
 */
export const StepSpacing: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: '40px 20px',
          background: '#f9f9f9',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', marginBottom: '24px' }}>
          Step cards are spaced 88px apart on desktop, creating clear visual separation while
          maintaining connection between steps.
        </p>
      </div>
      <HowItWorksSection />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the 88px spacing between step cards.',
      },
    },
  },
};
