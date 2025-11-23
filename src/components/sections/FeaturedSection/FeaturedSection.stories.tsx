import type { Meta, StoryObj } from '@storybook/react';
import { FeaturedSection } from './FeaturedSection';

const meta = {
  title: 'Sections/FeaturedSection',
  component: FeaturedSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeaturedSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Win a Tesla Cybertruck & Enjoy Our Network',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a63dd8813f?w=996&h=570&fit=crop',
  },
};

export const WithCustomContent: Story = {
  args: {
    title: 'Discover Our Premium Services',
    description: 'Experience the future of mobile connectivity with cutting-edge technology and world-class customer support.',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=996&h=570&fit=crop',
  },
};

export const MinimalContent: Story = {
  args: {
    title: 'Featured',
    description: 'Check out our latest offering.',
    imageUrl: 'https://images.unsplash.com/photo-1552082692-882e087a63d7?w=996&h=570&fit=crop',
  },
};
