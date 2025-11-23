import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with multiple children', () => {
      render(
        <Card>
          <p>Child 1</p>
          <p>Child 2</p>
        </Card>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('renders with nested elements', () => {
      render(
        <Card>
          <div>
            <h2>Title</h2>
            <p>Content</p>
          </div>
        </Card>
      );
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders as a div by default when no onClick', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.tagName).toBe('DIV');
      expect(card?.getAttribute('role')).not.toBe('button');
    });
  });

  describe('Shadow Variants', () => {
    it('applies small shadow variant', () => {
      const { container } = render(<Card shadow="sm">Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('shadow-sm');
    });

    it('applies medium shadow variant (default)', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('shadow-md');
    });

    it('applies large shadow variant', () => {
      const { container } = render(<Card shadow="lg">Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('shadow-lg');
    });
  });

  describe('Padding Variants', () => {
    it('applies small padding variant', () => {
      const { container } = render(<Card padding="sm">Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('padding-sm');
    });

    it('applies medium padding variant (default)', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('padding-md');
    });

    it('applies large padding variant', () => {
      const { container } = render(<Card padding="lg">Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('padding-lg');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(<Card className="custom-class">Test</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('custom-class');
    });

    it('combines default and custom classes', () => {
      const { container } = render(
        <Card shadow="lg" padding="sm" className="custom-class">
          Test
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('shadow-lg');
      expect(card?.className).toContain('padding-sm');
      expect(card?.className).toContain('custom-class');
    });
  });

  describe('Interactive Card (with onClick)', () => {
    it('renders as button when onClick is provided', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick}>Clickable card</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card?.getAttribute('role')).toBe('button');
    });

    it('becomes focusable when onClick is provided', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick}>Clickable card</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card?.getAttribute('tabindex')).toBe('0');
    });

    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Clickable card</Card>);

      const card = screen.getByText('Clickable card').closest('[role="button"]') as HTMLElement;
      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Clickable card</Card>);

      const card = screen.getByText('Clickable card').closest('[role="button"]') as HTMLElement;
      await user.click(card);
      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Keyboard Navigation', () => {
    it('activates on Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Keyboard card</Card>);

      const card = screen.getByText('Keyboard card').closest('[role="button"]') as HTMLElement;
      card.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('activates on Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Keyboard card</Card>);

      const card = screen.getByText('Keyboard card').closest('[role="button"]') as HTMLElement;
      card.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be focused via Tab key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <>
          <button>First button</button>
          <Card onClick={handleClick}>Focusable card</Card>
        </>
      );

      const card = screen.getByText('Focusable card').closest('[role="button"]') as HTMLElement;
      await user.tab();
      await user.tab();
      expect(card).toHaveFocus();
    });

    it('ignores keyboard when no onClick', async () => {
      const user = userEvent.setup();
      const { container } = render(<Card>Non-interactive card</Card>);

      const card = container.firstChild as HTMLElement;
      card.focus();
      await user.keyboard('{Enter}');

      // Should not throw and should still be document
      expect(card).toBeInTheDocument();
    });

    it('does not activate on other keys', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Keyboard card</Card>);

      const card = screen.getByText('Keyboard card').closest('[role="button"]') as HTMLElement;
      card.focus();
      await user.keyboard('a');

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role when interactive', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick}>Interactive</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card?.getAttribute('role')).toBe('button');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Accessible card</Card>);

      const card = screen.getByText('Accessible card').closest('[role="button"]') as HTMLElement;
      expect(card).toHaveAttribute('tabindex', '0');

      await user.tab();
      expect(card).toHaveFocus();
    });

    it('maintains focus after click', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Focusable card</Card>);

      const card = screen.getByText('Focusable card').closest('[role="button"]') as HTMLElement;
      card.focus();
      await user.click(card);

      // Element should still be in document and was clicked
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('renders empty card', () => {
      const { container } = render(<Card />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles undefined children gracefully', () => {
      const { container } = render(<Card>{undefined}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('works with all variant combinations', () => {
      const { container } = render(
        <Card shadow="lg" padding="sm" className="test">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('shadow-lg');
      expect(card?.className).toContain('padding-sm');
      expect(card?.className).toContain('test');
    });

    it('maintains callback on re-render', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { rerender } = render(
        <Card onClick={handleClick}>Card</Card>
      );

      const card = screen.getByText('Card').closest('[role="button"]') as HTMLElement;
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);

      rerender(<Card onClick={handleClick}>Card</Card>);
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });
});
