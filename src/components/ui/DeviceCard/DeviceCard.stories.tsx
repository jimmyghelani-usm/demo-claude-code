import type { StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DeviceCard } from './DeviceCard';

const meta = {
  title: 'UI/DeviceCard',
  component: DeviceCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A product showcase card component that displays device information with image, name, price, and optional CTA button. Designed for e-commerce and product catalog layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the device card',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Device product name',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: 'text',
      description: 'Device price (number or string)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    image: {
      control: 'text',
      description: 'URL to the device product image',
      table: {
        type: { summary: 'string' },
      },
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for the device image',
      table: {
        type: { summary: 'string' },
      },
    },
    onViewDetails: {
      description: 'Callback fired when "View Details" button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const iphoneImage = 'https://images.unsplash.com/photo-1592286927505-c8d3ffeaaf78?w=300&h=400&fit=crop';
const samsungImage = 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=300&h=400&fit=crop';
const googleImage = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=400&fit=crop';

export const Default: Story = {
  args: {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 999,
    image: iphoneImage,
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default device card with numeric price and View Details button.',
      },
    },
  },
};

export const WithStringPrice: Story = {
  args: {
    id: 'iphone-15',
    name: 'iPhone 15',
    price: '799',
    image: iphoneImage,
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Device card with string price value.',
      },
    },
  },
};

export const WithoutButton: Story = {
  args: {
    id: 'iphone-13',
    name: 'iPhone 13',
    price: 599,
    image: iphoneImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'Device card without the "View Details" button (onViewDetails not provided).',
      },
    },
  },
};

export const HighPrice: Story = {
  args: {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    price: 1199,
    image: iphoneImage,
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Device card with premium pricing.',
      },
    },
  },
};

export const Samsung: Story = {
  args: {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    price: 999,
    image: samsungImage,
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Device card showcasing Android device.',
      },
    },
  },
};

export const GooglePixel: Story = {
  args: {
    id: 'google-pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    price: 899,
    image: googleImage,
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Device card for Google Pixel device.',
      },
    },
  },
};

export const BudgetDevice: Story = {
  args: {
    id: 'budget-phone',
    name: 'Budget Smartphone',
    price: 299,
    image: iphoneImage,
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Affordable device option with lower price point.',
      },
    },
  },
};

export const WithCustomAlt: Story = {
  args: {
    id: 'device-custom-alt',
    name: 'Premium Device',
    price: 1299,
    image: samsungImage,
    imageAlt: 'High-end smartphone with premium build quality',
    onViewDetails: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Device card with custom alt text for accessibility.',
      },
    },
  },
};

export const Grid3Columns: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      <DeviceCard
        id="iphone-1"
        name="iPhone 15 Pro"
        price={999}
        image={iphoneImage}
        imageAlt="iPhone 15 Pro"
        onViewDetails={fn()}
      />
      <DeviceCard
        id="iphone-2"
        name="iPhone 15"
        price={799}
        image={iphoneImage}
        imageAlt="iPhone 15"
        onViewDetails={fn()}
      />
      <DeviceCard
        id="iphone-13"
        name="iPhone 13"
        price={599}
        image={iphoneImage}
        imageAlt="iPhone 13"
        onViewDetails={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three-column grid layout showcasing multiple device cards.',
      },
    },
  },
};

export const Grid4Columns: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
      <DeviceCard
        id="iphone-15-pro"
        name="iPhone 15 Pro"
        price={999}
        image={iphoneImage}
        imageAlt="iPhone 15 Pro"
        onViewDetails={fn()}
      />
      <DeviceCard
        id="iphone-15"
        name="iPhone 15"
        price={799}
        image={iphoneImage}
        imageAlt="iPhone 15"
        onViewDetails={fn()}
      />
      <DeviceCard
        id="samsung-s24"
        name="Samsung Galaxy S24"
        price={999}
        image={samsungImage}
        imageAlt="Samsung Galaxy S24"
        onViewDetails={fn()}
      />
      <DeviceCard
        id="google-pixel"
        name="Google Pixel 8 Pro"
        price={899}
        image={googleImage}
        imageAlt="Google Pixel 8 Pro"
        onViewDetails={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive auto-fit grid with multiple device variants.',
      },
    },
  },
};

export const MixedWithoutButtons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      <DeviceCard
        id="iphone-15-pro"
        name="iPhone 15 Pro"
        price={999}
        image={iphoneImage}
        onViewDetails={fn()}
      />
      <DeviceCard
        id="iphone-15"
        name="iPhone 15"
        price={799}
        image={iphoneImage}
      />
      <DeviceCard
        id="iphone-13"
        name="iPhone 13"
        price={599}
        image={iphoneImage}
        onViewDetails={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid showing mix of cards with and without buttons.',
      },
    },
  },
};
