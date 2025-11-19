import type { Meta, StoryObj } from '@storybook/react-vite';
import { FAQSection } from './FAQSection';

/**
 * FAQSection component - FAQ accordion section with two-column layout.
 *
 * Design Specifications:
 * - Light gradient background
 * - Section heading at top
 * - Two-column grid of FAQ cards (desktop)
 * - CTA at bottom ("Still have questions?" + Contact Support button)
 * - 8 FAQ questions total (4 per column)
 *
 * ## Content
 * - **Heading**: "You've got questions, we've got answers!"
 * - **FAQ Cards**: Collapsible accordion cards with questions/answers
 * - **Bottom CTA**: Encourages users to contact support for additional help
 *
 * ## FAQ Topics
 * 1. What devices can I trade in?
 * 2. How is my trade-in value calculated?
 * 3. How long does the trade-in process take?
 * 4. What happens if device condition doesn't match?
 * 5. Is my data safe?
 * 6. Can I trade in a device that's not paid off?
 * 7. What payment methods are available?
 * 8. Do I need to include accessories?
 *
 * ## Responsive Behavior
 * - Desktop: Two columns
 * - Tablet: Two columns (narrower)
 * - Mobile: Single column
 *
 * ## Accessibility
 * - Semantic `<section>` element
 * - Proper heading hierarchy (`<h2>` for section)
 * - Each FAQ card is independently accessible
 * - First FAQ in column 1 is expanded by default
 */
const meta = {
  title: 'Sections/FAQSection',
  component: FAQSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'FAQ section with two-column accordion layout and 8 common questions about the trade-in process.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FAQSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default FAQ section on desktop
 */
export const Default: Story = {};

/**
 * FAQ section on mobile viewport (375px)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'FAQ section with single-column layout on mobile.',
      },
    },
  },
};

/**
 * FAQ section on tablet viewport (768px)
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'FAQ section with two-column layout on tablet.',
      },
    },
  },
};

/**
 * FAQ section on large desktop viewport (1920px)
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'FAQ section on large desktop viewport.',
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
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Previous section (e.g., How It Works Section)
        </p>
      </div>
      <FAQSection />
      <div
        style={{
          padding: '60px 20px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Next section (e.g., Footer)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAQ section shown in context between other sections.',
      },
    },
  },
};

/**
 * FAQ topics breakdown
 */
export const FAQTopicsBreakdown: Story = {
  render: () => (
    <div>
      <FAQSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>FAQ Topics Covered</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Eligibility
              </h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>What devices can I trade in?</li>
                <li>Can I trade in a device that's not paid off?</li>
              </ul>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Valuation
              </h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>How is my trade-in value calculated?</li>
                <li>What if condition doesn't match?</li>
              </ul>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Process & Timeline
              </h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>How long does the process take?</li>
                <li>Do I need to include accessories?</li>
              </ul>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Security & Payment
              </h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Is my data safe?</li>
                <li>What payment methods are available?</li>
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
        story: 'Categorization of FAQ topics covered in the section.',
      },
    },
  },
};

/**
 * Column layout details
 */
export const ColumnLayoutDetails: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>Two-Column Layout</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              marginTop: '32px',
            }}
          >
            <div
              style={{
                padding: '24px',
                background: '#f0f7ff',
                borderRadius: '12px',
                border: '2px solid #1D5FF6',
              }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Column 1</h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '13px',
                  lineHeight: '2',
                  textAlign: 'left',
                }}
              >
                <li>1. What devices can I trade in? (Expanded)</li>
                <li>2. How is my trade-in value calculated?</li>
                <li>3. How long does the process take?</li>
                <li>4. What if condition doesn't match?</li>
              </ul>
            </div>
            <div
              style={{
                padding: '24px',
                background: '#f0f7ff',
                borderRadius: '12px',
                border: '2px solid #1D5FF6',
              }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Column 2</h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '13px',
                  lineHeight: '2',
                  textAlign: 'left',
                }}
              >
                <li>5. Is my data safe?</li>
                <li>6. Can I trade in unpaid device?</li>
                <li>7. What payment methods available?</li>
                <li>8. Do I need accessories?</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: '24px', fontSize: '14px', color: '#666' }}>
            The first FAQ in column 1 is expanded by default to immediately provide value
          </p>
        </div>
      </div>
      <FAQSection />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Explanation of the two-column layout structure.',
      },
    },
  },
};

/**
 * Bottom CTA details
 */
export const BottomCTADetails: Story = {
  render: () => (
    <div>
      <FAQSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Bottom CTA Component</h2>
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Message</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>"Still have questions?"</p>
            </div>
            <div
              style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>CTA Button</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Primary large button: "Contact Support"
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Purpose</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Provides an escape hatch for users whose questions are not answered in the FAQ,
                encouraging them to reach out for personalized support
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
        story: 'Details about the bottom CTA component.',
      },
    },
  },
};

/**
 * Interactive test - expand/collapse FAQs
 */
export const InteractWithFAQs: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates expanding and collapsing FAQ cards.',
      },
    },
  },
};

/**
 * Interactive test - contact support button
 */
export const ClickContactSupport: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies the Contact Support button is present and clickable.',
      },
    },
  },
};

/**
 * Interactive test - verify all FAQ questions present
 */
export const VerifyAllFAQs: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies all 8 FAQ questions and bottom CTA are present.',
      },
    },
  },
};

/**
 * Content structure breakdown
 */
export const ContentStructure: Story = {
  render: () => (
    <div>
      <FAQSection />
      <div
        style={{
          padding: '40px 20px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Content Structure</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                1. Section Heading (H2)
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                "You've got questions, we've got answers!" - Friendly, confident tone that
                immediately addresses user concerns.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                2. FAQ Grid
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Two-column layout on desktop, single column on mobile. Each FAQ is an accordion
                card with smooth expand/collapse animation.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                3. Default Expanded State
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                The first FAQ ("What devices can I trade in?") is expanded by default to
                immediately provide value and demonstrate interactivity.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#1D5FF6' }}>
                4. Bottom CTA
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Text prompt and Contact Support button for users who need additional help beyond
                the FAQs.
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
        story: 'Detailed breakdown of content structure and purpose.',
      },
    },
  },
};

/**
 * Accessibility test - keyboard navigation through FAQs
 */
export const KeyboardNavigation: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation through FAQ cards.',
      },
    },
  },
};
