import type { Meta, StoryObj } from '@storybook/react';
import { BusinessPageFooter } from './BusinessPageFooter';

/**
 * BusinessPageFooter Component Stories
 * Showcases the complete footer with navigation and social links
 * - Footer navigation links
 * - Social media icons
 * - Responsive layout
 * - Copyright information
 */
const meta: Meta<typeof BusinessPageFooter> = {
  title: 'Sections/BusinessPageFooter',
  component: BusinessPageFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete footer component with navigation links, social media icons, background gradient overlay, and copyright information. Responsive design that adapts to all screen sizes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Footer
 * Standard footer with all navigation and social elements
 */
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Page Content</h1>
        <p>This is the main page content. The footer appears at the bottom.</p>
        <div style={{ marginTop: '30px' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Footer Only
 * Isolated footer component
 */
export const FooterOnly: Story = {
  render: () => <BusinessPageFooter />,
};

/**
 * Footer with Minimal Content
 * Minimal page context with footer
 */
export const WithMinimalContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Welcome</h1>
        <p>Short page content.</p>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Mobile View
 * Footer on mobile viewport
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0, fontSize: '24px' }}>Mobile Footer</h1>
        <p>This footer is optimized for mobile screens.</p>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <p key={i} style={{ fontSize: '14px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Tablet View
 * Footer on tablet viewport
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Tablet Footer</h1>
        <p>This footer is optimized for tablet screens.</p>
        <div>
          {Array.from({ length: 7 }).map((_, i) => (
            <p key={i}>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Desktop Large Screen
 * Footer on large desktop viewport
 */
export const DesktopLargeScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '60px 40px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Desktop Large Screen Footer</h1>
        <p>This footer is optimized for large desktop displays.</p>
        <div>
          {Array.from({ length: 15 }).map((_, i) => (
            <p key={i}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * In Full Page Layout
 * Footer as part of a complete page layout
 */
export const InFullPageLayout: Story = {
  render: () => (
    <div>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Our Business</h1>
      </header>

      {/* Hero Section */}
      <div
        style={{
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: '0 0 10px 0' }}>Welcome to Our Platform</h2>
        <p style={{ margin: 0 }}>Discover exceptional products and services</p>
      </div>

      {/* Main Content */}
      <main style={{ padding: '60px 20px', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2>Our Services</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginTop: '30px',
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ marginTop: 0 }}>Service {i + 1}</h3>
                <p>Professional services tailored to your business needs.</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #ddd' }}>
          <h2>Why Choose Us?</h2>
          <p>We deliver exceptional quality and customer service.</p>
          {Array.from({ length: 3 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </main>

      {/* Footer */}
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * With Dark Background
 * Footer demonstrating appearance on dark background
 */
export const WithDarkBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <h1 style={{ marginTop: 0 }}>Dark Theme Page</h1>
        <p>This page has a dark background to demonstrate footer contrast.</p>
        <div>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i}>
              Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Social Links Focus
 * Demonstrates social media icon interactions
 */
export const SocialLinksFocus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Social Media Integration</h1>
        <p>The footer includes social media links for better engagement:</p>
        <ul style={{ fontSize: '16px' }}>
          <li>Twitter (X) - Follow us for updates</li>
          <li>LinkedIn - Professional networking</li>
          <li>Facebook - Community engagement</li>
          <li>Instagram - Visual content and behind-the-scenes</li>
        </ul>
        <p>Hover over the social icons in the footer to see hover effects.</p>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <p key={i}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Navigation Links Showcase
 * Highlights footer navigation links
 */
export const NavigationLinksShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Footer Navigation</h1>
        <p>The footer provides quick access to important pages:</p>
        <ul style={{ fontSize: '16px' }}>
          <li>ABOUT - Learn more about our company</li>
          <li>REVIEWS - See what customers say</li>
          <li>BUSINESS - Business solutions</li>
          <li>IoT - Internet of Things offerings</li>
          <li>CONTACT - Get in touch with us</li>
          <li>UNLOCK - Unlock premium features</li>
          <li>FAQs - Frequently asked questions</li>
          <li>PRIVACY - Privacy policy</li>
          <li>TERMS - Terms of service</li>
          <li>BLOG - Latest news and insights</li>
        </ul>
        <div style={{ marginTop: '30px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <p key={i}>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Keyboard Navigation
 * Demonstrates keyboard navigation through footer links
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Keyboard Navigation Test</h1>
        <p>Press Tab to navigate through all footer links:</p>
        <ul style={{ fontSize: '14px' }}>
          <li>All footer links are keyboard accessible</li>
          <li>Social media links open in new tabs</li>
          <li>Focus indicators are visible for all interactive elements</li>
          <li>Screen readers properly announce all links</li>
        </ul>
        <div>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Find and focus on the first footer link for demonstration
    const footerLink = canvasElement.querySelector('footer a');
    if (footerLink) {
      (footerLink as HTMLElement).focus();
    }
  },
};

/**
 * Accessibility Features
 * Highlights accessibility features of the footer
 */
export const AccessibilityFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ marginTop: 0 }}>Accessibility Features</h1>
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
          <h3 style={{ marginTop: 0 }}>Footer Accessibility:</h3>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>All links have descriptive text for screen readers</li>
            <li>Social icons have aria-label attributes for accessibility</li>
            <li>Links open in new tabs with rel="noopener noreferrer" for security</li>
            <li>Semantic HTML structure for proper document outline</li>
            <li>Sufficient color contrast for readability</li>
            <li>Keyboard navigable with clear focus indicators</li>
          </ul>
        </div>
        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          ))}
        </div>
      </main>
      <BusinessPageFooter />
    </div>
  ),
};

/**
 * Responsive Breakpoints
 * Comparison across different responsive breakpoints
 */
export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>Mobile (375px)</h3>
        <div style={{ width: '375px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '300px', backgroundColor: '#f5f5f5', padding: '20px', overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '12px' }}>Page content...</p>
          </div>
          <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '625px', height: 'auto' }}>
            <BusinessPageFooter />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>Tablet (768px)</h3>
        <div style={{ width: '768px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '300px', backgroundColor: '#f5f5f5', padding: '30px', overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>Page content...</p>
          </div>
          <BusinessPageFooter />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>Desktop (1440px)</h3>
        <div style={{ width: '100%', maxWidth: '1440px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <div style={{ height: '300px', backgroundColor: '#f5f5f5', padding: '40px', overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '16px' }}>Page content...</p>
          </div>
          <BusinessPageFooter />
        </div>
      </div>
    </div>
  ),
};

/**
 * With External Content
 * Footer with various page sections
 */
export const WithExternalContent: Story = {
  render: () => (
    <div>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#333', color: 'white', padding: '15px 20px' }}>
        <ul
          style={{
            display: 'flex',
            gap: '20px',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          <li>
            <a href="#home" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </a>
          </li>
          <li>
            <a href="#products" style={{ color: 'white', textDecoration: 'none' }}>
              Products
            </a>
          </li>
          <li>
            <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>
              Services
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginTop: 0 }}>Welcome to US Mobile</h1>
        <p>Premium mobile solutions for everyone</p>
      </section>

      {/* Content Sections */}
      <main style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <section style={{ marginBottom: '60px' }}>
          <h2>Our Mission</h2>
          <p>
            We are committed to providing the best mobile services with exceptional customer support and innovative
            solutions.
          </p>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2>Services</h2>
          <p>We offer a comprehensive range of mobile services tailored to your needs.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>Have questions? We'd love to hear from you. Reach out to our support team.</p>
        </section>
      </main>

      {/* Footer */}
      <BusinessPageFooter />
    </div>
  ),
};
