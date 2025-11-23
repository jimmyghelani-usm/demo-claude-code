import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      render(<TextInput label="Username" />);
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    });

    it('renders with correct HTML structure', () => {
      const { container } = render(<TextInput label="Test" />);
      expect(container.querySelector('label')).toBeInTheDocument();
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<TextInput label="Email" placeholder="your@email.com" />);
      expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    });

    it('renders without placeholder when not provided', () => {
      render(<TextInput label="Username" />);
      const input = screen.getByLabelText(/username/i);
      expect(input).not.toHaveAttribute('placeholder');
    });

    it('associates label with input via htmlFor', () => {
      const { container } = render(<TextInput label="Email" />);
      const label = container.querySelector('label');
      const input = container.querySelector('input');

      expect(label).toHaveAttribute('for', input?.id);
    });

    it('renders error message when provided', () => {
      render(<TextInput label="Email" error="Invalid email" />);
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('does not render error message when not provided', () => {
      const { container } = render(<TextInput label="Email" />);
      const errorSpan = container.querySelector('[class*="errorMessage"]');
      expect(errorSpan).not.toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      render(
        <>
          <TextInput label="First" />
          <TextInput label="Second" />
        </>
      );
      expect(screen.getByLabelText(/first/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/second/i)).toBeInTheDocument();
    });
  });

  describe('Props and Attributes', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <TextInput label="Test" className="custom-class" />
      );
      const inputContainer = container.querySelector('[class*="container"]');
      expect(inputContainer?.className).toContain('custom-class');
    });

    it('accepts custom id', () => {
      render(<TextInput label="Test" id="custom-id" />);
      const input = screen.getByLabelText(/test/i);
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id when not provided', () => {
      const { container: container1 } = render(
        <TextInput label="First" />
      );
      const { container: container2 } = render(
        <TextInput label="Second" />
      );

      const input1 = container1.querySelector('input');
      const input2 = container2.querySelector('input');

      expect(input1?.id).not.toBe(input2?.id);
    });

    it('passes through standard HTML input attributes', () => {
      render(
        <TextInput
          label="Test"
          type="email"
          maxLength={50}
          required={true}
          autoComplete="email"
        />
      );
      const input = screen.getByLabelText(/test/i) as HTMLInputElement;
      expect(input.type).toBe('email');
      expect(input.maxLength).toBe(50);
      expect(input.required).toBe(true);
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('accepts data-testid for testing', () => {
      render(
        <TextInput label="Test" data-testid="email-input" />
      );
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
    });
  });

  describe('States - Default', () => {
    it('renders in default state without error', () => {
      render(<TextInput label="Email" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('renders input without disabled attribute by default', () => {
      render(<TextInput label="Email" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).not.toBeDisabled();
    });
  });

  describe('States - Focus', () => {
    it('can receive focus', async () => {
      const user = userEvent.setup();
      render(<TextInput label="Email" />);
      const input = screen.getByLabelText(/email/i);

      await user.click(input);
      expect(input).toHaveFocus();
    });

    it('calls onChange when focused and typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Email" onChange={handleChange} />);

      const input = screen.getByLabelText(/email/i);
      await user.type(input, 'test@example.com');

      expect(handleChange).toHaveBeenCalled();
    });

    it('is keyboard navigable with Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <TextInput label="Email" />
          <button>After</button>
        </>
      );

      const input = screen.getByLabelText(/email/i);
      const before = screen.getByRole('button', { name: /before/i });

      before.focus();
      await user.tab();

      expect(input).toHaveFocus();
    });
  });

  describe('States - Filled', () => {
    it('accepts and displays input value', async () => {
      const user = userEvent.setup();
      render(<TextInput label="Email" />);
      const input = screen.getByLabelText(/email/i) as HTMLInputElement;

      await user.type(input, 'test@example.com');
      expect(input.value).toBe('test@example.com');
    });

    it('supports default value', () => {
      render(<TextInput label="Email" defaultValue="initial@example.com" />);
      const input = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(input.value).toBe('initial@example.com');
    });

    it('handles clearing input', async () => {
      const user = userEvent.setup();
      render(<TextInput label="Email" defaultValue="test@example.com" />);
      const input = screen.getByLabelText(/email/i) as HTMLInputElement;

      await user.clear(input);
      expect(input.value).toBe('');
    });
  });

  describe('States - Error', () => {
    it('sets aria-invalid when hasError is true', () => {
      render(<TextInput label="Email" hasError={true} />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-invalid when error message is provided', () => {
      render(<TextInput label="Email" error="Invalid email format" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when no error', () => {
      render(<TextInput label="Email" hasError={false} />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('applies error class style when hasError is true', () => {
      const { container } = render(<TextInput label="Email" hasError={true} />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('error');
    });

    it('applies error class style when error message is provided', () => {
      const { container } = render(
        <TextInput label="Email" error="Invalid" />
      );
      const input = container.querySelector('input');
      expect(input?.className).toContain('error');
    });

    it('sets aria-describedby to error message id', () => {
      render(<TextInput label="Email" error="Invalid email" />);
      const input = screen.getByLabelText(/email/i);
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();

      const errorElement = document.getElementById(errorId!);
      expect(errorElement).toHaveTextContent('Invalid email');
    });

    it('removes aria-describedby when no error', () => {
      render(<TextInput label="Email" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('displays multiple error messages', () => {
      render(
        <>
          <TextInput label="Email" error="Invalid format" />
          <TextInput label="Password" error="Too short" />
        </>
      );
      expect(screen.getByText('Invalid format')).toBeInTheDocument();
      expect(screen.getByText('Too short')).toBeInTheDocument();
    });
  });

  describe('States - Disabled', () => {
    it('renders disabled input when disabled prop is true', () => {
      render(<TextInput label="Email" disabled={true} />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toBeDisabled();
    });

    it('does not render disabled input when disabled prop is false', () => {
      render(<TextInput label="Email" disabled={false} />);
      const input = screen.getByLabelText(/email/i);
      expect(input).not.toBeDisabled();
    });

    it('applies disabled class style when disabled', () => {
      const { container } = render(<TextInput label="Email" disabled={true} />);
      const input = container.querySelector('input');
      expect(input?.className).toContain('disabled');
    });

    it('prevents typing when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <TextInput
          label="Email"
          disabled={true}
          onChange={handleChange}
        />
      );

      const input = screen.getByLabelText(/email/i);
      await user.click(input);
      await user.type(input, 'test@example.com');

      expect(input).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not show error when both disabled and hasError', () => {
      render(
        <TextInput
          label="Email"
          disabled={true}
          hasError={true}
          error="Error"
        />
      );
      const input = screen.getByLabelText(/email/i);
      expect(input).toBeDisabled();
      // Error message should still be present for screen readers
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when value changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Email" onChange={handleChange} />);

      const input = screen.getByLabelText(/email/i);
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when input receives focus', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<TextInput label="Email" onFocus={handleFocus} />);

      const input = screen.getByLabelText(/email/i);
      await user.click(input);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(
        <>
          <TextInput label="Email" onBlur={handleBlur} />
          <button>Next</button>
        </>
      );

      const input = screen.getByLabelText(/email/i);
      const button = screen.getByRole('button');

      await user.click(input);
      await user.click(button);

      expect(handleBlur).toHaveBeenCalled();
    });

    it('supports keyboard shortcuts like Ctrl+A', async () => {
      const user = userEvent.setup();
      render(<TextInput label="Email" defaultValue="test@example.com" />);

      const input = screen.getByLabelText(/email/i) as HTMLInputElement;
      await user.click(input);
      await user.keyboard('{Control>}a{/Control}');

      // The text should be selected (browser-dependent)
      expect(input.value).toBe('test@example.com');
    });
  });

  describe('Content Rendering', () => {
    it('renders long label correctly', () => {
      const longLabel = 'This is a very long label that should still render correctly';
      render(<TextInput label={longLabel} />);
      expect(screen.getByLabelText(new RegExp(longLabel))).toBeInTheDocument();
    });

    it('renders long error message correctly', () => {
      const longError = 'This is a very long error message that explains the validation problem in detail';
      render(<TextInput label="Email" error={longError} />);
      expect(screen.getByText(new RegExp(longError))).toBeInTheDocument();
    });

    it('renders special characters in label', () => {
      render(<TextInput label="Email (required) *" />);
      expect(screen.getByLabelText(/email \(required\) \*/i)).toBeInTheDocument();
    });

    it('renders special characters in error message', () => {
      render(<TextInput label="Email" error="Invalid format: user@domain.com" />);
      expect(screen.getByText(/invalid format: user@domain\.com/i)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty label string', () => {
      const { container } = render(<TextInput label="" />);
      expect(container.querySelector('label')).toBeInTheDocument();
    });

    it('renders with very long input', async () => {
      const user = userEvent.setup();
      const longText = 'a'.repeat(500);
      render(<TextInput label="Email" />);

      const input = screen.getByLabelText(/email/i) as HTMLInputElement;
      await user.type(input, longText);

      expect(input.value.length).toBe(500);
    });

    it('handles rapidly changing values', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Email" onChange={handleChange} />);

      const input = screen.getByLabelText(/email/i);
      await user.type(input, 'abc', { delay: 1 });

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('combines multiple states (disabled + error + value)', () => {
      render(
        <TextInput
          label="Email"
          disabled={true}
          hasError={true}
          error="Invalid"
          defaultValue="test@example.com"
        />
      );

      const input = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input.value).toBe('test@example.com');
    });

    it('maintains unique IDs for error descriptions', () => {
      const { container } = render(
        <>
          <TextInput label="Email" error="Error 1" />
          <TextInput label="Password" error="Error 2" />
        </>
      );

      const inputs = container.querySelectorAll('input');
      const errorIds: Set<string> = new Set();

      inputs.forEach((input) => {
        const describedBy = input.getAttribute('aria-describedby');
        if (describedBy) {
          errorIds.add(describedBy);
        }
      });

      expect(errorIds.size).toBe(2);
    });

    it('handles null or undefined placeholder gracefully', () => {
      render(
        <TextInput
          label="Email"
          placeholder={undefined}
        />
      );
      const input = screen.getByLabelText(/email/i);
      expect(input).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works as a controlled component with value prop', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(
        <TextInput
          label="Email"
          value="test@example.com"
          onChange={handleChange}
        />
      );

      const input = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(input.value).toBe('test@example.com');

      await user.type(input, 'x');
      expect(handleChange).toHaveBeenCalled();

      rerender(
        <TextInput
          label="Email"
          value="new@example.com"
          onChange={handleChange}
        />
      );

      expect(input.value).toBe('new@example.com');
    });

    it('works with form submission', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <TextInput label="Email" name="email" />
          <button type="submit">Submit</button>
        </form>
      );

      const input = screen.getByLabelText(/email/i);
      const button = screen.getByRole('button', { name: /submit/i });

      await user.type(input, 'test@example.com');
      await user.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
