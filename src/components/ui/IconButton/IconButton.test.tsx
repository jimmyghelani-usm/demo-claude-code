import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  describe('Rendering', () => {
    it('renders with icon and aria-label', () => {
      render(
        <IconButton
          icon={<span data-testid="test-icon">+</span>}
          ariaLabel="Add item"
        />
      );
      const button = screen.getByRole('button', { name: /add item/i });
      expect(button).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders with correct HTML structure', () => {
      const { container } = render(
        <IconButton
          icon={<span>X</span>}
          ariaLabel="Close"
        />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.type).toBe('button');
    });

    it('wraps icon in icon container', () => {
      const { container } = render(
        <IconButton
          icon={<span data-testid="icon">+</span>}
          ariaLabel="Add"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer?.querySelector('[data-testid="icon"]')).toBeInTheDocument();
    });

    it('renders SVG icon elements', () => {
      render(
        <IconButton
          icon={
            <svg data-testid="svg-icon" width="24" height="24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          }
          ariaLabel="Settings"
        />
      );
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      render(
        <>
          <IconButton icon={<span>+</span>} ariaLabel="Add" />
          <IconButton icon={<span>-</span>} ariaLabel="Remove" />
        </>
      );
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    });
  });

  describe('Aria and Accessibility', () => {
    it('has aria-label attribute set', () => {
      render(
        <IconButton
          icon={<span>♥</span>}
          ariaLabel="Add to favorites"
        />
      );
      const button = screen.getByRole('button', { name: /add to favorites/i });
      expect(button).toHaveAttribute('aria-label', 'Add to favorites');
    });

    it('aria-label is used by accessibility tools to identify button', () => {
      render(
        <IconButton
          icon={<span>📝</span>}
          ariaLabel="Edit profile"
        />
      );
      expect(screen.getByRole('button', { name: /edit profile/i })).toBeInTheDocument();
    });

    it('sets aria-disabled when disabled', () => {
      render(
        <IconButton
          icon={<span>⚙</span>}
          ariaLabel="Settings"
          disabled={true}
        />
      );
      const button = screen.getByRole('button', { name: /settings/i });
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-disabled to false when enabled', () => {
      render(
        <IconButton
          icon={<span>⚙</span>}
          ariaLabel="Settings"
          disabled={false}
        />
      );
      const button = screen.getByRole('button', { name: /settings/i });
      expect(button).toHaveAttribute('aria-disabled', 'false');
    });

    it('is keyboard accessible with Tab navigation', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <IconButton icon={<span>+</span>} ariaLabel="Add" />
          <button>After</button>
        </>
      );

      const before = screen.getByRole('button', { name: /before/i });
      const iconButton = screen.getByRole('button', { name: /add/i });

      before.focus();
      await user.tab();

      expect(iconButton).toHaveFocus();
    });

    it('is activated by Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
    });

    it('is activated by Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('renders with outlined variant by default', () => {
      const { container } = render(
        <IconButton icon={<span>+</span>} ariaLabel="Add" />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('outlined');
    });

    it('renders with outlined variant when explicitly set', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          variant="outlined"
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('outlined');
    });

    it('renders with filled variant', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          variant="filled"
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('filled');
    });

    it('renders with ghost variant', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          variant="ghost"
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('ghost');
    });

    it('applies correct class names for each variant', () => {
      const { container: outlinedContainer } = render(
        <IconButton icon={<span>+</span>} ariaLabel="Add" variant="outlined" />
      );
      const { container: filledContainer } = render(
        <IconButton icon={<span>+</span>} ariaLabel="Add" variant="filled" />
      );
      const { container: ghostContainer } = render(
        <IconButton icon={<span>+</span>} ariaLabel="Add" variant="ghost" />
      );

      expect(outlinedContainer.querySelector('button')?.className).toContain('outlined');
      expect(filledContainer.querySelector('button')?.className).toContain('filled');
      expect(ghostContainer.querySelector('button')?.className).toContain('ghost');
    });
  });

  describe('Props and Attributes', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          className="custom-class"
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
    });

    it('combines variant and custom className', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          variant="filled"
          className="custom-class"
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('filled');
      expect(button?.className).toContain('custom-class');
    });

    it('passes through HTML button attributes', () => {
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          data-testid="custom-button"
          title="Add item to list"
        />
      );
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('title', 'Add item to list');
    });

    it('accepts additional button properties', () => {
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          autoFocus={true}
          data-custom="value"
        />
      );
      const button = screen.getByRole('button', { name: /add/i });
      expect(button).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled button with disabled attribute', () => {
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          disabled={true}
        />
      );
      const button = screen.getByRole('button', { name: /add/i });
      expect(button).toBeDisabled();
    });

    it('renders enabled button without disabled attribute', () => {
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          disabled={false}
        />
      );
      const button = screen.getByRole('button', { name: /add/i });
      expect(button).not.toBeDisabled();
    });

    it('applies disabled class style when disabled', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          disabled={true}
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('disabled');
    });

    it('does not apply disabled class when enabled', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          disabled={false}
        />
      );
      const button = container.querySelector('button');
      expect(button?.className).not.toContain('disabled');
    });
  });

  describe('User Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          disabled={true}
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('can be focused and is focusable', async () => {
      const user = userEvent.setup();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      await user.tab();

      expect(button).toHaveFocus();
    });

    it('disabled button is not keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          disabled={true}
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles multiple rapid clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Icon Content', () => {
    it('renders text icon content', () => {
      render(
        <IconButton
          icon={<span>★</span>}
          ariaLabel="Favorite"
        />
      );
      expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('renders complex icon component', () => {
      const ComplexIcon = () => (
        <svg data-testid="complex-icon">
          <path d="M0 0" />
          <circle cx="10" cy="10" r="5" />
        </svg>
      );

      render(
        <IconButton
          icon={<ComplexIcon />}
          ariaLabel="Complex"
        />
      );

      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
    });

    it('renders icon with nested elements', () => {
      render(
        <IconButton
          icon={
            <svg data-testid="icon-with-nested">
              <g>
                <path d="M0 0" />
                <circle cx="10" cy="10" r="5" />
              </g>
            </svg>
          }
          ariaLabel="Nested"
        />
      );

      expect(screen.getByTestId('icon-with-nested')).toBeInTheDocument();
    });

    it('renders emoji icon', () => {
      render(
        <IconButton
          icon={<span>😀</span>}
          ariaLabel="Happy"
        />
      );
      expect(screen.getByText('😀')).toBeInTheDocument();
    });
  });

  describe('Type Attribute', () => {
    it('has type="button" by default', () => {
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
        />
      );
      const button = screen.getByRole('button', { name: /add/i });
      expect(button).toHaveAttribute('type', 'button');
    });

    it('defaults to type="button" and not form submit', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <IconButton
            icon={<span>+</span>}
            ariaLabel="Add"
            onClick={handleClick}
          />
        </form>
      );

      const button = screen.getByRole('button', { name: /add/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('renders with null className', () => {
      const { container } = render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
          className=""
        />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('handles missing onClick handler gracefully', async () => {
      const user = userEvent.setup();
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel="Add"
        />
      );

      const button = screen.getByRole('button', { name: /add/i });
      await expect(user.click(button)).resolves.toBeUndefined();
    });

    it('maintains functionality with all props combined', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <IconButton
          icon={<span data-testid="icon">+</span>}
          ariaLabel="Add"
          variant="filled"
          disabled={false}
          className="custom-class"
          onClick={handleClick}
          data-testid="complex-icon-btn"
        />
      );

      const button = screen.getByTestId('complex-icon-btn');
      expect(button.className).toContain('filled');
      expect(button.className).toContain('custom-class');
      expect(screen.getByTestId('icon')).toBeInTheDocument();

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles very long aria-label', () => {
      const longLabel = 'Add a new item to the list and notify the user that the action was successful';
      render(
        <IconButton
          icon={<span>+</span>}
          ariaLabel={longLabel}
        />
      );

      const button = screen.getByRole('button', { name: new RegExp(longLabel) });
      expect(button).toHaveAttribute('aria-label', longLabel);
    });

    it('renders with all variant combinations', () => {
      const variants = ['outlined', 'filled', 'ghost'] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <IconButton
            icon={<span>{variant[0].toUpperCase()}</span>}
            ariaLabel={variant}
            variant={variant}
          />
        );

        const button = container.querySelector('button');
        expect(button?.className).toContain(variant);
      });
    });
  });

  describe('Integration', () => {
    it('works in a button group', async () => {
      const user = userEvent.setup();
      const handleAdd = vi.fn();
      const handleRemove = vi.fn();
      const handleReset = vi.fn();

      render(
        <div role="group" aria-label="Actions">
          <IconButton
            icon={<span>+</span>}
            ariaLabel="Add"
            onClick={handleAdd}
          />
          <IconButton
            icon={<span>-</span>}
            ariaLabel="Remove"
            onClick={handleRemove}
          />
          <IconButton
            icon={<span>↺</span>}
            ariaLabel="Reset"
            onClick={handleReset}
          />
        </div>
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);

      await user.click(buttons[0]);
      await user.click(buttons[1]);
      await user.click(buttons[2]);

      expect(handleAdd).toHaveBeenCalled();
      expect(handleRemove).toHaveBeenCalled();
      expect(handleReset).toHaveBeenCalled();
    });

    it('works with tooltip or description elements', () => {
      render(
        <div>
          <IconButton
            icon={<span>?</span>}
            ariaLabel="Help"
            title="Click for help"
          />
          <span id="help-tooltip" role="tooltip">
            Click this button to get help
          </span>
        </div>
      );

      const button = screen.getByRole('button', { name: /help/i });
      expect(button).toHaveAttribute('title', 'Click for help');
    });
  });
});
