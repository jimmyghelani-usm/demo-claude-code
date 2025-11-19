import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Button>
          <span>Custom Content</span>
        </Button>
      );
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('applies primary variant styles by default', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/primary/);
    });

    it('applies secondary variant styles', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/secondary/);
    });

    it('applies text variant styles', () => {
      const { container } = render(<Button variant="text">Text</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/text/);
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/md/);
    });

    it('applies small size styles', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/sm/);
    });

    it('applies large size styles', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/lg/);
    });
  });

  describe('Full Width', () => {
    it('applies full width styles when fullWidth is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/fullWidth/);
    });

    it('does not apply full width styles by default', () => {
      const { container } = render(<Button>Normal</Button>);
      const button = container.querySelector('button');
      expect(button?.className).not.toMatch(/fullWidth/);
    });
  });

  describe('Disabled State', () => {
    it('is not disabled by default', () => {
      render(<Button>Enabled</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not trigger onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('User Interactions', () => {
    it('handles onClick events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('supports keyboard interaction (Enter key)', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Press Enter</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction (Space key)', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Press Space</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has correct button role', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('is focusable by default', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).not.toHaveFocus();
    });

    it('supports additional ARIA attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="description">
          Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Combinations', () => {
    it('combines variant and size correctly', () => {
      const { container } = render(
        <Button variant="secondary" size="lg">
          Large Secondary
        </Button>
      );
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/secondary/);
      expect(button?.className).toMatch(/lg/);
    });

    it('combines all props correctly', () => {
      const handleClick = vi.fn();
      render(
        <Button
          variant="primary"
          size="sm"
          fullWidth
          disabled
          onClick={handleClick}
          className="extra-class"
        >
          Complex Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Complex Button');
      expect(button.className).toMatch(/primary/);
      expect(button.className).toMatch(/sm/);
      expect(button.className).toMatch(/fullWidth/);
      expect(button.className).toMatch(/extra-class/);
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(Button.displayName).toBe('Button');
    });
  });
});
