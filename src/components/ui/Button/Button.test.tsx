import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      render(<Button label="Click me" />);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with correct HTML structure', () => {
      const { container } = render(<Button label="Test" />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.type).toBe('button');
    });

    it('renders icon when provided', () => {
      render(
        <Button label="With Icon" icon={<svg data-testid="test-icon" />} />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders without icon when not provided', () => {
      const { container } = render(<Button label="No Icon" />);
      const iconSpan = container.querySelector('[class*="icon"]');
      expect(iconSpan).not.toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      render(
        <>
          <Button label="First" />
          <Button label="Second" />
        </>
      );
      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /second/i })).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with primary variant by default', () => {
      const { container } = render(<Button label="Primary" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('primary');
    });

    it('renders with primary variant when explicitly set', () => {
      const { container } = render(<Button label="Primary" variant="primary" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('primary');
    });

    it('renders with secondary variant', () => {
      const { container } = render(<Button label="Secondary" variant="secondary" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('secondary');
    });

    it('applies correct class names for each variant', () => {
      const { container: primaryContainer } = render(
        <Button label="Primary" variant="primary" />
      );
      const { container: secondaryContainer } = render(
        <Button label="Secondary" variant="secondary" />
      );

      const primaryButton = primaryContainer.querySelector('button');
      const secondaryButton = secondaryContainer.querySelector('button');

      expect(primaryButton?.className).toContain('primary');
      expect(secondaryButton?.className).toContain('secondary');
    });
  });

  describe('Props and Attributes', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <Button label="Custom" className="custom-class" />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });

    it('sets aria-disabled when disabled', () => {
      render(<Button label="Disabled" disabled={true} />);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-disabled to false when enabled', () => {
      render(<Button label="Enabled" disabled={false} />);
      const button = screen.getByRole('button', { name: /enabled/i });
      expect(button).toHaveAttribute('aria-disabled', 'false');
    });

    it('passes through HTML button attributes', () => {
      render(
        <Button
          label="Test"
          data-testid="custom-button"
          title="Button title"
        />
      );
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('title', 'Button title');
    });

    it('accepts additional button properties', () => {
      render(
        <Button
          label="Test"
          autoFocus={true}
          data-custom="value"
        />
      );
      const button = screen.getByRole('button', { name: /test/i });
      expect(button).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled button with disabled attribute', () => {
      render(<Button label="Disabled" disabled={true} />);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    it('renders enabled button without disabled attribute', () => {
      render(<Button label="Enabled" disabled={false} />);
      const button = screen.getByRole('button', { name: /enabled/i });
      expect(button).not.toBeDisabled();
    });

    it('applies disabled class style when disabled', () => {
      const { container } = render(<Button label="Disabled" disabled={true} />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('disabled');
    });

    it('does not apply disabled class when enabled', () => {
      const { container } = render(<Button label="Enabled" disabled={false} />);
      const button = container.querySelector('button');
      expect(button?.className).not.toContain('disabled');
    });
  });

  describe('User Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button label="Click" onClick={handleClick} />);

      const button = screen.getByRole('button', { name: /click/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button label="Click" disabled={true} onClick={handleClick} />);

      const button = screen.getByRole('button', { name: /click/i });
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('is keyboard accessible with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button label="Click" onClick={handleClick} />);

      const button = screen.getByRole('button', { name: /click/i });
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
    });

    it('is keyboard accessible with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button label="Click" onClick={handleClick} />);

      const button = screen.getByRole('button', { name: /click/i });
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalled();
    });

    it('can be focused and is focusable', async () => {
      const user = userEvent.setup();
      render(<Button label="Focus" />);

      const button = screen.getByRole('button', { name: /focus/i });
      await user.tab();

      expect(button).toHaveFocus();
    });

    it('disabled button is not keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button label="Click" disabled={true} onClick={handleClick} />);

      const button = screen.getByRole('button', { name: /click/i });
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Content Rendering', () => {
    it('renders long text correctly', () => {
      const longText = 'This is a very long button label that should still render correctly without breaking the layout';
      render(<Button label={longText} />);
      expect(screen.getByRole('button', { name: new RegExp(longText) })).toBeInTheDocument();
    });

    it('renders icon and label together', () => {
      render(
        <Button
          label="Icon and Text"
          icon={<svg data-testid="icon" />}
        />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /icon and text/i })).toBeInTheDocument();
    });

    it('renders special characters in label', () => {
      render(<Button label="Click! @#$" />);
      expect(screen.getByRole('button', { name: /click! @#\$/i })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty string label', () => {
      render(<Button label="" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with whitespace-only label', () => {
      render(<Button label="   " />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles missing onClick handler gracefully', async () => {
      const user = userEvent.setup();
      render(<Button label="No Handler" />);

      const button = screen.getByRole('button', { name: /no handler/i });
      await expect(user.click(button)).resolves.toBeUndefined();
    });

    it('maintains functionality with all props combined', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <Button
          label="Complex"
          variant="secondary"
          icon={<span data-testid="icon">+</span>}
          disabled={false}
          className="custom-class"
          onClick={handleClick}
          data-testid="complex-btn"
        />
      );

      const button = screen.getByTestId('complex-btn');
      expect(button.className).toContain('secondary');
      expect(button.className).toContain('custom-class');
      expect(screen.getByTestId('icon')).toBeInTheDocument();

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Type Attribute', () => {
    it('has type="button" by default', () => {
      render(<Button label="Test" />);
      const button = screen.getByRole('button', { name: /test/i });
      expect(button).toHaveAttribute('type', 'button');
    });

    it('defaults to type="button" and not form submit', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <Button label="Click" onClick={handleClick} />
        </form>
      );

      const button = screen.getByRole('button', { name: /click/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
