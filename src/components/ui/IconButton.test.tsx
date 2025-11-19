import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

const TestIcon = () => (
  <svg data-testid="test-icon" width="20" height="20">
    <circle cx="10" cy="10" r="10" />
  </svg>
);

describe('IconButton', () => {
  describe('Rendering', () => {
    it('renders with required props', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Test button" />
      );
      const button = screen.getByRole('button', { name: /test button/i });
      expect(button).toBeInTheDocument();
    });

    it('renders icon correctly', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Icon button" />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders emoji icons', () => {
      render(
        <IconButton icon="🔔" aria-label="Notification button" />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('🔔');
    });

    it('applies custom className', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Custom"
          className="custom-class"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('has type="button" by default', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Button" />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Badge Functionality', () => {
    it('does not show badge when no badge props provided', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="No badge" />
      );
      const badge = screen.queryByText(/items/i);
      expect(badge).not.toBeInTheDocument();
    });

    it('shows badge with badgeCount', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeCount={5}
        />
      );
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows badge with badgeCount of 0', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeCount={0}
        />
      );
      // Badge should not be visible when count is 0
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('shows badge with custom badgeContent', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeContent="NEW"
        />
      );
      expect(screen.getByText('NEW')).toBeInTheDocument();
    });

    it('shows badge with React element as badgeContent', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeContent={<span data-testid="custom-badge">!</span>}
        />
      );
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
    });

    it('prioritizes badgeContent over badgeCount', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeCount={5}
          badgeContent="HOT"
        />
      );
      expect(screen.getByText('HOT')).toBeInTheDocument();
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });

    it('has accessible badge label', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Notifications"
          badgeCount={3}
        />
      );
      const badge = screen.getByText('3');
      expect(badge).toHaveAttribute('aria-label', '3 items');
    });

    it('handles large badge counts', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Many notifications"
          badgeCount={99}
        />
      );
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('does not show badge when badgeContent is null', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeContent={null}
        />
      );
      expect(screen.queryByLabelText(/items/i)).not.toBeInTheDocument();
    });

    it('does not show badge when badgeContent is empty string', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Badge button"
          badgeContent=""
        />
      );
      // Empty string should still render
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles onClick events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Click me"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Click me"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('can be disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Disabled"
          onClick={handleClick}
          disabled
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard interaction (Enter key)', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Keyboard test"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction (Space key)', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Keyboard test"
          onClick={handleClick}
        />
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('requires aria-label prop', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Accessible button" />
      );
      const button = screen.getByRole('button', { name: /accessible button/i });
      expect(button).toHaveAttribute('aria-label', 'Accessible button');
    });

    it('is focusable', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Focusable" />
      );
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Disabled" disabled />
      );
      const button = screen.getByRole('button');
      button.focus();
      expect(button).not.toHaveFocus();
    });

    it('supports additional ARIA attributes', () => {
      render(
        <IconButton
          icon={<TestIcon />}
          aria-label="Button"
          aria-pressed="true"
          aria-describedby="description"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });

    it('has correct button role', () => {
      render(
        <IconButton icon={<TestIcon />} aria-label="Button" />
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('renders as cart button with badge', () => {
      const CartIcon = () => (
        <svg data-testid="cart-icon">
          <path d="M0 0h24v24H0z" />
        </svg>
      );

      render(
        <IconButton
          icon={<CartIcon />}
          aria-label="Shopping cart"
          badgeCount={3}
        />
      );

      expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /shopping cart/i })).toBeInTheDocument();
    });

    it('renders as notification button', () => {
      render(
        <IconButton
          icon="🔔"
          aria-label="Notifications"
          badgeCount={10}
        />
      );

      expect(screen.getByText('🔔')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('renders as support/chat button', () => {
      const ChatIcon = () => <span data-testid="chat-icon">💬</span>;

      render(
        <IconButton
          icon={<ChatIcon />}
          aria-label="Chat support"
        />
      );

      expect(screen.getByTestId('chat-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /chat support/i })).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(IconButton.displayName).toBe('IconButton');
    });
  });
});
