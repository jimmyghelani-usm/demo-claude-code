import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

// Icon definitions for stories
const ShoppingCartIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6 2L4 4H1v2h1l1.5 12h11L16 6h1V4h-3l-2-2H6zm0 2h6l1 2H5l1-2zm-2 4h12l-1.2 9.6H5.2L4 8z" />
  </svg>
);

const ChatIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2C5.589 2 2 5.589 2 10s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 2c3.308 0 6 2.692 6 6s-2.692 6-6 6-6-2.692-6-6 2.692-6 6-6zm-1 2v5l3.5 2 .5-1-3-1.8V6H9z" />
  </svg>
);

const MenuIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z" />
  </svg>
);

const BellIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2C8.343 2 7 3.343 7 5v.5c-1.657.457-3 2.023-3 3.9V13l-2 2v1h16v-1l-2-2V9.4c0-1.877-1.343-3.443-3-3.9V5c0-1.657-1.343-3-3-3zm0 2c.555 0 1 .445 1 1v1h-2V5c0-.555.445-1 1-1zM6 9.4C6 7.524 7.29 6 9 6h2c1.71 0 3 1.524 3 3.4V13.5L16 15H4l2-1.5V9.4zM8 16c0 1.105.895 2 2 2s2-.895 2-2H8z" />
  </svg>
);

/**
 * IconButton component for icon-only actions with optional badge notifications.
 *
 * The IconButton is a 35x35px button designed specifically for icon-based interactions:
 * - Supports SVG icons or emoji
 * - Optional badge for notifications or counts
 * - Accessible with required aria-label
 * - Hover and focus states for interaction feedback
 *
 * ## Accessibility
 * - Required `aria-label` for screen readers
 * - Badge includes accessible count announcement
 * - Keyboard accessible (Enter and Space)
 * - Focus visible for keyboard navigation
 *
 * ## Usage
 * Used in the Header for shopping cart and chat support actions.
 */
const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon-only button component with badge support for notifications. Dimensions: 35x35px.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Icon to display (SVG element or emoji)',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers (required)',
    },
    badgeCount: {
      control: 'number',
      description: 'Number to display in badge',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    badgeContent: {
      control: 'text',
      description: 'Custom content for badge (alternative to badgeCount)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Shopping cart icon button as used in the Header
 */
export const ShoppingCart: Story = {
  args: {
    icon: ShoppingCartIcon,
    'aria-label': 'Shopping cart',
  },
};

/**
 * Shopping cart with badge showing item count
 */
export const ShoppingCartWithBadge: Story = {
  args: {
    icon: ShoppingCartIcon,
    'aria-label': 'Shopping cart',
    badgeCount: 3,
  },
};

/**
 * Shopping cart with high badge count
 */
export const ShoppingCartHighCount: Story = {
  args: {
    icon: ShoppingCartIcon,
    'aria-label': 'Shopping cart',
    badgeCount: 12,
  },
};

/**
 * Chat support icon button as used in the Header
 */
export const ChatSupport: Story = {
  args: {
    icon: ChatIcon,
    'aria-label': 'Chat support',
  },
};

/**
 * Menu icon button for mobile navigation
 */
export const Menu: Story = {
  args: {
    icon: MenuIcon,
    'aria-label': 'Open menu',
  },
};

/**
 * Notification bell with badge
 */
export const Notifications: Story = {
  args: {
    icon: BellIcon,
    'aria-label': 'Notifications',
    badgeCount: 5,
  },
};

/**
 * Icon button using emoji instead of SVG
 */
export const EmojiCart: Story = {
  args: {
    icon: '🛒',
    'aria-label': 'Shopping cart',
    badgeCount: 2,
  },
};

/**
 * Icon button with emoji and high badge count
 */
export const EmojiNotification: Story = {
  args: {
    icon: '🔔',
    'aria-label': 'Notifications',
    badgeCount: 99,
  },
};

/**
 * Icon button with custom badge content (text instead of number)
 */
export const CustomBadgeContent: Story = {
  args: {
    icon: BellIcon,
    'aria-label': 'New notifications',
    badgeContent: 'NEW',
  },
};

/**
 * Badge with zero count (badge is not displayed)
 */
export const ZeroBadgeCount: Story = {
  args: {
    icon: ShoppingCartIcon,
    'aria-label': 'Empty shopping cart',
    badgeCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'When badgeCount is 0, the badge is not displayed.',
      },
    },
  },
};

/**
 * All icon button variations displayed together
 */
export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>No badge</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" badgeCount={3} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>With count</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ChatIcon} aria-label="Chat support" />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Chat icon</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={BellIcon} aria-label="Notifications" badgeCount={12} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>High count</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon="🛒" aria-label="Shopping cart" badgeCount={5} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Emoji icon</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of various icon button configurations.',
      },
    },
  },
};

/**
 * Header icon buttons as used in the landing page
 */
export const HeaderButtons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px',
        background: '#fff',
        borderRadius: '8px',
        alignItems: 'center',
      }}
    >
      <IconButton
        icon={ShoppingCartIcon}
        aria-label="Shopping cart"
        badgeCount={0}
      />
      <IconButton icon={ChatIcon} aria-label="Chat support" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons as they appear in the Header component.',
      },
    },
  },
};

/**
 * Interactive test demonstrating icon button click behavior
 */

/**
 * Badge count updates
 */
export const BadgeCountProgression: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" badgeCount={0} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>0 items</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" badgeCount={1} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>1 item</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" badgeCount={5} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>5 items</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" badgeCount={10} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>10 items</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton icon={ShoppingCartIcon} aria-label="Shopping cart" badgeCount={99} />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>99+ items</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows how badge displays different counts.',
      },
    },
  },
};
