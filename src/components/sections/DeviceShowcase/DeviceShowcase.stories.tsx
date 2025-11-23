import type { StoryObj } from '@storybook/react';
import { DeviceShowcase } from './DeviceShowcase';

const meta = {
  title: 'Sections/DeviceShowcase',
  component: DeviceShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width device showcase section that displays a collection of device products in a responsive grid. Features customizable title, description, and device list with individual device cards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section heading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Choose Your Device'" },
      },
    },
    description: {
      control: 'text',
      description: 'Section subtitle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Premium devices available for immediate delivery'" },
      },
    },
    devices: {
      description: 'Array of device products to display',
      table: {
        type: { summary: 'Device[]' },
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
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default device showcase with three iPhone models using default pricing.',
      },
    },
  },
};

export const CustomDevices: Story = {
  args: {
    title: 'Latest Smartphones',
    description: 'Explore our collection of the latest smartphone models from top brands',
    devices: [
      {
        id: 'samsung-s24',
        name: 'Samsung Galaxy S24',
        price: 999,
        image: samsungImage,
      },
      {
        id: 'google-pixel',
        name: 'Google Pixel 8 Pro',
        price: 899,
        image: googleImage,
      },
      {
        id: 'iphone-pro-max',
        name: 'iPhone 15 Pro Max',
        price: 1199,
        image: iphoneImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Device showcase with mixed brands (Samsung, Google, Apple) at various price points.',
      },
    },
  },
};

export const AppleDevices: Story = {
  args: {
    title: 'Apple Lineup',
    description: 'Discover the complete Apple device ecosystem',
    devices: [
      {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        price: 999,
        image: iphoneImage,
      },
      {
        id: 'iphone-15-pro-max',
        name: 'iPhone 15 Pro Max',
        price: 1199,
        image: iphoneImage,
      },
      {
        id: 'iphone-15',
        name: 'iPhone 15',
        price: 799,
        image: iphoneImage,
      },
      {
        id: 'iphone-13',
        name: 'iPhone 13',
        price: 599,
        image: iphoneImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Apple device lineup showcasing iPhone models from budget to premium.',
      },
    },
  },
};

export const BudgetSelection: Story = {
  args: {
    title: 'Affordable Devices',
    description: 'Great devices at budget-friendly prices',
    devices: [
      {
        id: 'budget-1',
        name: 'Budget Smartphone 1',
        price: 199,
        image: iphoneImage,
      },
      {
        id: 'budget-2',
        name: 'Budget Smartphone 2',
        price: 249,
        image: samsungImage,
      },
      {
        id: 'budget-3',
        name: 'Budget Smartphone 3',
        price: 299,
        image: googleImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of affordable device options for cost-conscious buyers.',
      },
    },
  },
};

export const PremiumDevices: Story = {
  args: {
    title: 'Premium Collection',
    description: 'Flagship devices with cutting-edge technology',
    devices: [
      {
        id: 'flagship-1',
        name: 'iPhone 15 Pro Max',
        price: 1199,
        image: iphoneImage,
      },
      {
        id: 'flagship-2',
        name: 'Samsung Galaxy S24 Ultra',
        price: 1299,
        image: samsungImage,
      },
      {
        id: 'flagship-3',
        name: 'Google Pixel 8 Pro XL',
        price: 1099,
        image: googleImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Premium flagship devices at the top price range.',
      },
    },
  },
};

export const TwoDevices: Story = {
  args: {
    title: 'Featured Devices',
    description: 'Two of our most popular choices',
    devices: [
      {
        id: 'device-1',
        name: 'iPhone 15 Pro',
        price: 999,
        image: iphoneImage,
      },
      {
        id: 'device-2',
        name: 'Samsung Galaxy S24',
        price: 999,
        image: samsungImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact showcase with two featured devices.',
      },
    },
  },
};

export const SingleDevice: Story = {
  args: {
    title: 'Device of the Month',
    description: 'Our featured recommendation this month',
    devices: [
      {
        id: 'featured',
        name: 'iPhone 15 Pro Max',
        price: 1199,
        image: iphoneImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single featured device showcase.',
      },
    },
  },
};

export const LargeShowcase: Story = {
  args: {
    title: 'Complete Device Catalog',
    description: 'Browse our entire selection of devices',
    devices: [
      {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        price: 999,
        image: iphoneImage,
      },
      {
        id: 'iphone-15-pro-max',
        name: 'iPhone 15 Pro Max',
        price: 1199,
        image: iphoneImage,
      },
      {
        id: 'iphone-15',
        name: 'iPhone 15',
        price: 799,
        image: iphoneImage,
      },
      {
        id: 'samsung-s24',
        name: 'Samsung Galaxy S24',
        price: 999,
        image: samsungImage,
      },
      {
        id: 'google-pixel',
        name: 'Google Pixel 8 Pro',
        price: 899,
        image: googleImage,
      },
      {
        id: 'iphone-13',
        name: 'iPhone 13',
        price: 599,
        image: iphoneImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Large showcase with six devices demonstrating full responsive grid behavior.',
      },
    },
  },
};

export const CustomTitles: Story = {
  args: {
    title: 'Top Rated Smartphones 2024',
    description: 'Award-winning devices from industry-leading manufacturers. Find the perfect phone for your needs with free shipping on all orders.',
    devices: [
      {
        id: 'top-1',
        name: 'Premium Flagship',
        price: 1299,
        image: samsungImage,
      },
      {
        id: 'top-2',
        name: 'Best Value',
        price: 699,
        image: googleImage,
      },
      {
        id: 'top-3',
        name: 'Best Camera',
        price: 999,
        image: iphoneImage,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Device showcase with custom marketing-focused title and description.',
      },
    },
  },
};
