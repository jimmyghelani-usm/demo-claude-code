import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

/**
 * TextInput Component Stories
 * Showcases all input states and variants
 * - States: default, focus, filled, error, disabled
 * - Features: label, placeholder, error message, validation
 */
const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form input field with label, placeholder, and validation states. Supports error messages and disabled state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Input field label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input field',
    },
    hasError: {
      control: 'boolean',
      description: 'Show error state without message',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler callback',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default State
 * Input field in default state with label and placeholder
 */
export const Default: Story = {
  args: {
    label: 'First Name',
    placeholder: 'Jason',
  },
};

/**
 * Focused State
 * Input field with focus
 */
export const Focused: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.focus();
    }
  },
};

/**
 * Filled State
 * Input field with value
 */
export const Filled: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    value: 'John Doe',
    onChange: () => {},
  },
};

/**
 * Error State
 * Input field with error message
 */
export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    hasError: true,
  },
};

/**
 * Disabled State
 * Input field in disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
    disabled: true,
  },
};

/**
 * Required Field
 * Input field with required label indicator
 */
export const Required: Story = {
  args: {
    label: 'Email Address *',
    placeholder: 'you@example.com',
  },
};

/**
 * All States
 * Comparison of all input states
 */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <TextInput label="Default State" placeholder="Enter text" />
      <TextInput
        label="With Value"
        placeholder="Enter text"
        value="John Doe"
        onChange={() => {}}
      />
      <TextInput
        label="Error State"
        placeholder="Enter text"
        error="This field is required"
        hasError={true}
      />
      <TextInput
        label="Disabled State"
        placeholder="Enter text"
        disabled
      />
    </div>
  ),
};

/**
 * Password Field
 * TextInput as password field
 */
export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

/**
 * Email Field
 * TextInput for email input with HTML5 validation
 */
export const Email: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

/**
 * Number Field
 * TextInput for numeric input
 */
export const Number: Story = {
  args: {
    label: 'Age',
    placeholder: '18',
    type: 'number',
  },
};

/**
 * Large Form
 * Multiple input fields in a form layout
 */
export const FormExample: Story = {
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <TextInput
        label="First Name"
        placeholder="Jason"
        required
      />
      <TextInput
        label="Last Name"
        placeholder="Smith"
        required
      />
      <TextInput
        label="Email Address"
        placeholder="jason@example.com"
        type="email"
        required
      />
      <TextInput
        label="Phone Number"
        placeholder="(555) 123-4567"
        type="tel"
      />
      <button
        style={{
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#1d5ff6',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        Submit
      </button>
    </form>
  ),
};
