import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from './SectionHeading';

/**
 * SectionHeading Component Stories
 * Showcases all variants and alignments of the SectionHeading component
 */
const meta: Meta<typeof SectionHeading> = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Heading block with title and optional description for page sections. Supports left, center, and right alignment.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main heading text',
    },
    description: {
      control: 'text',
      description: 'Sub-heading or description text (optional)',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Centered
 * Default SectionHeading with title and description, center-aligned
 */
export const Default: Story = {
  args: {
    title: 'Join the Mobile Revolution',
    description: 'Experience unlimited data with our reliable network coverage',
    align: 'center',
  },
};

/**
 * Title Only
 * SectionHeading with only title, no description
 */
export const TitleOnly: Story = {
  args: {
    title: 'Our Features',
    align: 'center',
  },
};

/**
 * Left Aligned
 * SectionHeading with left text alignment
 */
export const LeftAligned: Story = {
  args: {
    title: 'Why Choose Us?',
    description: 'Discover the benefits of our network',
    align: 'left',
  },
};

/**
 * Right Aligned
 * SectionHeading with right text alignment
 */
export const RightAligned: Story = {
  args: {
    title: 'Premium Service',
    description: 'Quality you can trust',
    align: 'right',
  },
};

/**
 * Long Title
 * SectionHeading with longer, multi-line title
 */
export const LongTitle: Story = {
  args: {
    title: 'Experience Unlimited Connectivity Across the Globe with Our Advanced Network Infrastructure',
    description: 'Fast, reliable, and always available',
    align: 'center',
  },
};

/**
 * Long Description
 * SectionHeading with longer description text
 */
export const LongDescription: Story = {
  args: {
    title: 'Seamless Connectivity',
    description:
      'Our network infrastructure provides seamless connectivity across all major cities and regions. With our advanced technology, you can stay connected wherever you go, whether you are traveling for business or leisure.',
    align: 'center',
  },
};

/**
 * All Alignments
 * Showcasing all three alignment options
 */
export const AllAlignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      <div>
        <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Left Aligned</h3>
        <SectionHeading
          title="Left Aligned Heading"
          description="This heading is aligned to the left"
          align="left"
        />
      </div>
      <div>
        <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Center Aligned</h3>
        <SectionHeading
          title="Center Aligned Heading"
          description="This heading is centered"
          align="center"
        />
      </div>
      <div>
        <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Right Aligned</h3>
        <SectionHeading
          title="Right Aligned Heading"
          description="This heading is aligned to the right"
          align="right"
        />
      </div>
    </div>
  ),
};

/**
 * Dark Background Variant
 * SectionHeading on dark background (typical use case)
 */
export const DarkBackground: Story = {
  args: {
    title: 'Next Generation Wireless',
    description: 'Built for the future, designed for you',
    align: 'center',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px 40px', backgroundColor: '#0f0f0f' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Secondary Background Variant
 * SectionHeading on secondary background
 */
export const SecondaryBackground: Story = {
  args: {
    title: 'Innovative Solutions',
    description: 'Pushing the boundaries of technology',
    align: 'center',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px 40px', backgroundColor: '#1c1c1c' }}>
        <Story />
      </div>
    ),
  ],
};
