import type { StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Card } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible card container component with customizable shadow levels, padding, and optional click handlers. Perfect for creating consistent card-based layouts across your application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Shadow level applied to the card',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Internal padding of the card',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    onClick: {
      description: 'Callback fired when the card is clicked (makes card interactive)',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class for custom styling',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'object',
      description: 'Card content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = (
  <div>
    <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Card Title</h3>
    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This is a card component with default styling</p>
  </div>
);

export const Default: Story = {
  args: {
    children: defaultContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default card with medium shadow and medium padding.',
      },
    },
  },
};

export const SmallShadow: Story = {
  args: {
    shadow: 'sm',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Subtle Shadow</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This card has a subtle shadow effect for minimal visual depth</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with small shadow for subtle depth.',
      },
    },
  },
};

export const MediumShadow: Story = {
  args: {
    shadow: 'md',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Medium Shadow</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This is the default shadow level, providing balanced visual prominence</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with medium shadow (default).',
      },
    },
  },
};

export const LargeShadow: Story = {
  args: {
    shadow: 'lg',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Strong Shadow</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This card has a prominent shadow effect for maximum visual separation</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with large shadow for prominent depth.',
      },
    },
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Small Padding</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This card has minimal internal spacing</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with small padding for compact layouts.',
      },
    },
  },
};

export const MediumPadding: Story = {
  args: {
    padding: 'md',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Medium Padding</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This is the default padding level</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with medium padding (default).',
      },
    },
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Large Padding</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>This card has generous internal spacing for spacious layouts</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with large padding for spacious layouts.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    onClick: fn(),
    children: (
      <div style={{ cursor: 'pointer' }}>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Interactive Card</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Click me to trigger the onClick handler</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with click handler that makes it interactive. Use keyboard (Enter/Space) or mouse to interact.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Interactive story - demonstrates keyboard and mouse interactions
    const card = canvasElement.querySelector('[role="button"]');
    if (card) {
      card.setAttribute('data-interactive', 'true');
    }
  },
};

export const CombinedStyles: Story = {
  args: {
    shadow: 'lg',
    padding: 'lg',
    onClick: fn(),
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Premium Card</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Large shadow and padding combined for maximum prominence</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with both large shadow and large padding for maximum visual prominence.',
      },
    },
  },
};

export const RichContent: Story = {
  args: {
    padding: 'lg',
    shadow: 'md',
    children: (
      <div>
        <h3 style={{ marginBottom: '12px', margin: 0, fontSize: '20px', fontWeight: '700' }}>Featured Content</h3>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.6' }}>
          Cards can contain any React content, including multiple elements, lists, and complex layouts.
        </p>
        <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', fontSize: '14px' }}>
          <li style={{ marginBottom: '4px' }}>First feature</li>
          <li style={{ marginBottom: '4px' }}>Second feature</li>
          <li>Third feature</li>
        </ul>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Action 1</button>
          <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Action 2</button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with rich content including headings, paragraphs, lists, and buttons.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      <Card shadow="sm" padding="md">
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Card 1</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Small shadow</p>
      </Card>
      <Card shadow="md" padding="md">
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Card 2</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Medium shadow (default)</p>
      </Card>
      <Card shadow="lg" padding="md">
        <h3 style={{ marginBottom: '8px', margin: 0, fontSize: '18px', fontWeight: '600' }}>Card 3</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Large shadow</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid of cards showing all shadow variants.',
      },
    },
  },
};
