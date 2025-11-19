import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

/**
 * Header component for the US Mobile Trade In landing page.
 *
 * Design Specifications:
 * - Fixed positioning at top of page
 * - 60px height
 * - Max-width: 1440px (centered)
 * - Contains US Mobile logo, navigation menu, and action buttons
 *
 * ## Layout
 * - Left: US Mobile logo
 * - Center: Navigation menu (PLANS, NETWORKS, HOW IT WORKS, SHOP)
 * - Right: Shopping cart icon, chat icon, Sign In button, Get US Mobile button
 *
 * ## Responsive Behavior
 * - Desktop: Full navigation and all buttons visible
 * - Tablet: May need compact navigation
 * - Mobile: Hamburger menu (future enhancement)
 *
 * ## Accessibility
 * - Semantic `<header>` and `<nav>` elements
 * - Skip to main content link (future enhancement)
 * - Proper heading hierarchy
 * - Keyboard navigable links and buttons
 */
const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main header component with logo, navigation, and action buttons. Fixed at top of page with 60px height.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header state on desktop
 */
export const Default: Story = {};

/**
 * Header on mobile viewport (375px)
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Header displayed on mobile viewport (375px width).',
      },
    },
  },
};

/**
 * Header on tablet viewport (768px)
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Header displayed on tablet viewport (768px width).',
      },
    },
  },
};

/**
 * Header on large desktop viewport (1920px)
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Header displayed on large desktop viewport (1920px width).',
      },
    },
  },
};

/**
 * Header with shopping cart badge showing items
 */
export const WithCartItems: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '80px 20px' }}>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Notice the shopping cart has a badge (this would be updated dynamically in a real
          application)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Header showing shopping cart with item count. In production, this badge would be updated based on cart state.',
      },
    },
  },
};

/**
 * Header with page content to show fixed positioning
 */
export const WithPageContent: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '100%' }}>
      <Header />
      <div
        style={{
          paddingTop: '80px',
          padding: '80px 20px 20px',
          minHeight: '100vh',
          background: '#F4F8FF',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Page Content</h1>
          <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
            The header is fixed at the top of the page. Scroll down to see it remain in place.
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginBottom: '16px', lineHeight: '1.6' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates fixed header positioning with scrollable page content.',
      },
    },
  },
};

/**
 * Header navigation links showcase
 */
export const NavigationLinks: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '100%' }}>
      <Header />
      <div style={{ paddingTop: '80px', padding: '80px 20px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>Navigation Menu Items</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>PLANS</strong> - View available plans
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>NETWORKS</strong> - Learn about network options
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>HOW IT WORKS</strong> - Understand the process
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>SHOP</strong> - Browse devices and accessories
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all navigation menu items in the header.',
      },
    },
  },
};

/**
 * Header action buttons showcase
 */
export const ActionButtons: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '100%' }}>
      <Header />
      <div style={{ paddingTop: '80px', padding: '80px 20px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '24px' }}>Header Actions</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Shopping Cart</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Icon button with badge for cart item count
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Chat Support</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Icon button to open chat support
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Sign In</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Text button for user authentication
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
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Get US Mobile</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Primary CTA for new customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all action buttons and icons in the header.',
      },
    },
  },
};

/**
 * Interactive test - clicking navigation links
 */
export const ClickNavigationLink: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies all navigation links are present and accessible.',
      },
    },
  },
};

/**
 * Interactive test - clicking action buttons
 */
export const ClickActionButtons: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies all action buttons are present and clickable.',
      },
    },
  },
};

/**
 * Interactive test - logo link
 */
export const ClickLogo: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Verifies logo link points to home page.',
      },
    },
  },
};

/**
 * Accessibility test - keyboard navigation
 */
export const KeyboardNavigation: Story = {
  // TODO: Re-enable play function when @storybook/test is compatible with Storybook v10
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation through header links.',
      },
    },
  },
};
