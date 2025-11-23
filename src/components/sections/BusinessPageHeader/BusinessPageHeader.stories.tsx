import type { Meta, StoryObj } from '@storybook/react';
import { BusinessPageHeader } from './BusinessPageHeader';

/**
 * BusinessPageHeader Component Stories
 * Showcases the fixed navigation header for business pages
 * - Sticky header with logo, navigation menu, sign-in, CTA button, and social icons
 * - Responsive layout adapting to different viewport sizes
 */
const meta: Meta<typeof BusinessPageHeader> = {
  title: 'Sections/BusinessPageHeader',
  component: BusinessPageHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Fixed sticky navigation header with logo, navigation menu, sign-in link, call-to-action button, and social media icons. Remains visible at the top of the page during scrolling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Header
 * Standard header with all navigation elements
 */
export const Default: Story = {
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '2000px',
          padding: '20px',
          background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
          color: '#333',
        }}
      >
        <h2>Scroll to see sticky header behavior</h2>
        <p>The header should remain visible at the top while scrolling this content.</p>
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Header with Long Content
 * Demonstrates header behavior with extended page content
 */
export const WithLongContent: Story = {
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '3000px',
          padding: '20px',
          background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
          color: '#333',
        }}
      >
        <h2>Extended Page Content</h2>
        <p>This page demonstrates the header behavior with more content to scroll through.</p>
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: 100 }).map((_, i) => (
            <p key={i}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Mobile View
 * Header displayed on mobile viewport size
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '1500px',
          padding: '20px',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2>Mobile Responsive Header</h2>
        <p>The header adapts to mobile viewport with optimized spacing and layout.</p>
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Tablet View
 * Header displayed on tablet viewport size
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '1500px',
          padding: '20px',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2>Tablet Responsive Header</h2>
        <p>The header responds well to tablet-sized viewports.</p>
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i}>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Desktop View - Large Screen
 * Header on a large desktop viewport
 */
export const DesktopLargeScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '2000px',
          padding: '20px',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2>Large Screen Desktop View</h2>
        <p>Header optimized for larger desktop displays with full spacing.</p>
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Header with Minimal Content
 * Simple page content to focus on header
 */
export const WithMinimalContent: Story = {
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '500px',
          padding: '20px',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2>Minimal Content View</h2>
        <p>Simple content page to demonstrate the header in isolation.</p>
      </div>
    </div>
  ),
};

/**
 * Navigation Accessibility Test
 * Interactive test demonstrating keyboard navigation and ARIA attributes
 */
export const NavigationAccessibility: Story = {
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '1500px',
          padding: '20px',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2>Keyboard Navigation Test</h2>
        <p>Press Tab to navigate through all interactive elements:</p>
        <ul style={{ marginTop: '10px' }}>
          <li>Logo link (Home)</li>
          <li>NETWORKS link</li>
          <li>HOW IT WORKS link</li>
          <li>SHOP link</li>
          <li>SIGN IN link</li>
          <li>GET STARTED button</li>
          <li>Chat icon button</li>
          <li>Shopping cart icon button</li>
        </ul>
        <div style={{ marginTop: '30px', marginBottom: '100px' }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <p key={i}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Focus first element for demonstration
    const logo = canvasElement.querySelector('a[href="#home"]');
    if (logo) {
      logo.focus();
    }
  },
};

/**
 * Header Hover States
 * Demonstrates navigation link hover states
 */
export const HoverStates: Story = {
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          height: '1000px',
          padding: '20px',
          background: '#f5f5f5',
          color: '#333',
        }}
      >
        <h2>Hover States Demonstration</h2>
        <p>Hover over navigation elements to see interactive states:</p>
        <ul style={{ marginTop: '10px', fontSize: '14px' }}>
          <li>Logo - hover for home link effect</li>
          <li>Navigation links (NETWORKS, HOW IT WORKS, SHOP) - highlight on hover</li>
          <li>SIGN IN link - interactive underline</li>
          <li>GET STARTED button - color change and elevation</li>
          <li>Social icons (Chat and Cart) - background highlight</li>
        </ul>
        <div style={{ marginTop: '30px', marginBottom: '100px' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              Et harum quidem rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
              recusandae itaque earum rerum.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Full Page Demo
 * Complete page layout with header to show real-world context
 */
export const FullPageDemo: Story = {
  render: () => (
    <div>
      <BusinessPageHeader />
      <div
        style={{
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Welcome to Our Business</h1>
        <p style={{ fontSize: '20px', marginBottom: '40px' }}>Discover what we can do for you</p>
        <button
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Get Started Today
        </button>
      </div>
      <div
        style={{
          height: '1500px',
          padding: '40px 20px',
          background: '#f5f5f5',
        }}
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Why Choose Us?</h2>
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
              <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Feature {i + 1}</h3>
              <p style={{ color: '#666' }}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
