import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

/**
 * Footer component for the US Mobile Trade In landing page.
 *
 * Design Specifications:
 * - 60px height
 * - Contains footer navigation links and social media icons
 * - Centered content with max-width constraint
 *
 * ## Layout
 * - Left side: Footer navigation links (ABOUT, REVIEWS, BUSINESS, etc.)
 * - Right side: Social media icons (Twitter, LinkedIn, Facebook, Instagram)
 *
 * ## Links
 * Footer includes 10 navigation links:
 * - ABOUT, REVIEWS, BUSINESS, IOT, UNLOCK
 * - CONTACT, FAQs, PRIVACY, TERMS, BLOG
 *
 * ## Social Media
 * Four social platforms with icon links:
 * - Twitter (X)
 * - LinkedIn
 * - Facebook
 * - Instagram
 *
 * ## Accessibility
 * - Semantic `<footer>` element
 * - Proper navigation labeling
 * - Social links with aria-labels
 * - Links open in new tab with proper rel attributes
 */
const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main footer component with navigation links and social media icons. 60px height.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer state on desktop
 */
export const Default: Story = {};

/**
 * Footer on mobile viewport (375px)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Footer displayed on mobile viewport (375px width).',
      },
    },
  },
};

/**
 * Footer on tablet viewport (768px)
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Footer displayed on tablet viewport (768px width).',
      },
    },
  },
};

/**
 * Footer on large desktop viewport (1920px)
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Footer displayed on large desktop viewport (1920px width).',
      },
    },
  },
};

/**
 * Footer with page content to show positioning at bottom
 */
export const WithPageContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div
        style={{
          flex: 1,
          padding: '40px 20px',
          background: '#F4F8FF',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Page Content</h1>
          <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
            The footer appears at the bottom of the page. On short pages, it stays at the bottom
            of the viewport. On long pages, it appears after all content.
          </p>
          {Array.from({ length: 5 }).map((_, i) => (
            <p key={i} style={{ marginBottom: '16px', lineHeight: '1.6' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates footer positioning at the bottom of page content.',
      },
    },
  },
};

/**
 * Footer navigation links showcase
 */
export const NavigationLinks: Story = {
  render: () => (
    <div>
      <div style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>Footer Navigation Links</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              { label: 'ABOUT', desc: 'About US Mobile' },
              { label: 'REVIEWS', desc: 'Customer reviews' },
              { label: 'BUSINESS', desc: 'Business solutions' },
              { label: 'IOT', desc: 'IoT connectivity' },
              { label: 'UNLOCK', desc: 'Device unlocking' },
              { label: 'CONTACT', desc: 'Contact support' },
              { label: 'FAQs', desc: 'Frequently asked questions' },
              { label: 'PRIVACY', desc: 'Privacy policy' },
              { label: 'TERMS', desc: 'Terms of service' },
              { label: 'BLOG', desc: 'Company blog' },
            ].map((link) => (
              <div
                key={link.label}
                style={{
                  padding: '12px',
                  background: '#f9f9f9',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              >
                <strong style={{ fontSize: '12px' }}>{link.label}</strong>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>{link.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all footer navigation links.',
      },
    },
  },
};

/**
 * Social media links showcase
 */
export const SocialMediaLinks: Story = {
  render: () => (
    <div>
      <div style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>Social Media Links</h2>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { name: 'Twitter (X)', icon: '𝕏', color: '#000000' },
              { name: 'LinkedIn', icon: 'in', color: '#0A66C2' },
              { name: 'Facebook', icon: 'f', color: '#1877F2' },
              { name: 'Instagram', icon: '📷', color: '#E4405F' },
            ].map((social) => (
              <div
                key={social.name}
                style={{
                  padding: '16px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                  minWidth: '150px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: social.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    margin: '0 auto 8px',
                    fontSize: '20px',
                  }}
                >
                  {social.icon}
                </div>
                <strong style={{ fontSize: '12px' }}>{social.name}</strong>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Social links open in new tabs with proper security attributes (rel="noopener
            noreferrer")
          </p>
        </div>
      </div>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all social media links with icons.',
      },
    },
  },
};

/**
 * Full page layout with header and footer
 */
export const FullPageLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header
        style={{
          height: '60px',
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <strong>Header (60px)</strong>
      </header>
      <main
        style={{
          flex: 1,
          padding: '40px 20px',
          background: '#F4F8FF',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Main Content Area</h1>
          <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
            This demonstrates a full page layout with header, main content, and footer.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete page layout showing header, content, and footer.',
      },
    },
  },
};

/**
 * Interactive test - clicking navigation links
 */
export const ClickNavigationLinks: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies footer navigation links are present and have correct URLs.',
      },
    },
  },
};

/**
 * Interactive test - social media links
 */
export const ClickSocialLinks: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story:
          'Verifies social media links open in new tabs with proper security attributes.',
      },
    },
  },
};

/**
 * Accessibility test - all links count
 */
export const AllLinksAccessible: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies all 14 links (10 navigation + 4 social) are present and accessible.',
      },
    },
  },
};

/**
 * Dark background variant
 */
export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#0C173E', minHeight: '100vh', paddingTop: '40px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer displayed on dark background to check contrast and visibility.',
      },
    },
  },
};
