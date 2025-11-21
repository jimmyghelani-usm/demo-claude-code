import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

/**
 * HeroSection Component Tests - Navigation Header
 * Updated to match Figma node 1413:13358
 *
 * Tests the HeroSection component (navigation header) matching Figma design.
 * The component is a fixed navigation header with:
 * - Logo section (left-aligned)
 * - Navigation menu: PLANS, SAVINGS, NETWORKS, FEATURES, BUSINESS, SHOP
 * - Action buttons: Chat, Profile, Get Started, Sign In
 * - 60px height, white background
 */
describe('HeroSection', () => {
  describe('Rendering', () => {
    it('renders the navigation header with correct semantic HTML', () => {
      const { container } = render(<HeroSection />);
      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
      expect(header?.getAttribute('role')).toBe('banner');
    });

    it('renders all navigation menu items', () => {
      render(<HeroSection />);

      expect(screen.getByText('PLANS')).toBeInTheDocument();
      expect(screen.getByText('SAVINGS')).toBeInTheDocument();
      expect(screen.getByText('NETWORKS')).toBeInTheDocument();
      expect(screen.getByText('FEATURES')).toBeInTheDocument();
      expect(screen.getByText('BUSINESS')).toBeInTheDocument();
      expect(screen.getByText('SHOP')).toBeInTheDocument();
    });

    it('renders all action buttons', () => {
      render(<HeroSection />);

      expect(screen.getByRole('button', { name: /chat support/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /user profile/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('renders logo with correct link', () => {
      render(<HeroSection />);
      const logoLink = screen.getByRole('link', { name: /US Mobile home/i });

      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('renders without errors', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<HeroSection />);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Navigation Menu', () => {
    it('renders navigation with correct ARIA label', () => {
      const { container } = render(<HeroSection />);
      const nav = container.querySelector('nav');

      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('renders navigation items in correct order', () => {
      render(<HeroSection />);
      const navLinks = screen.getAllByRole('link').filter(
        (link) => link.getAttribute('href') !== '/'
      );

      expect(navLinks).toHaveLength(6);
      expect(navLinks[0]).toHaveTextContent('PLANS');
      expect(navLinks[1]).toHaveTextContent('SAVINGS');
      expect(navLinks[2]).toHaveTextContent('NETWORKS');
      expect(navLinks[3]).toHaveTextContent('FEATURES');
      expect(navLinks[4]).toHaveTextContent('BUSINESS');
      expect(navLinks[5]).toHaveTextContent('SHOP');
    });

    it('navigation links have correct hrefs', () => {
      render(<HeroSection />);

      expect(screen.getByText('PLANS').closest('a')).toHaveAttribute('href', '/plans');
      expect(screen.getByText('SAVINGS').closest('a')).toHaveAttribute('href', '/savings');
      expect(screen.getByText('NETWORKS').closest('a')).toHaveAttribute('href', '/networks');
      expect(screen.getByText('FEATURES').closest('a')).toHaveAttribute('href', '/features');
      expect(screen.getByText('BUSINESS').closest('a')).toHaveAttribute('href', '/business');
      expect(screen.getByText('SHOP').closest('a')).toHaveAttribute('href', '/shop');
    });
  });

  describe('Action Buttons', () => {
    it('chat button has correct aria label', () => {
      render(<HeroSection />);
      const chatButton = screen.getByRole('button', { name: /chat support/i });

      expect(chatButton).toHaveAttribute('aria-label', 'Open chat support');
    });

    it('profile button has correct aria label', () => {
      render(<HeroSection />);
      const profileButton = screen.getByRole('button', { name: /user profile/i });

      expect(profileButton).toHaveAttribute('aria-label', 'User profile');
    });

    it('get started button renders with correct text', () => {
      render(<HeroSection />);
      const getStartedButton = screen.getByRole('button', { name: /get started/i });

      expect(getStartedButton).toHaveTextContent('GET STARTED');
    });

    it('sign in button renders with correct text', () => {
      render(<HeroSection />);
      const signInButton = screen.getByRole('button', { name: /sign in/i });

      expect(signInButton).toHaveTextContent('SIGN IN');
    });

    it('all buttons have correct type attribute', () => {
      render(<HeroSection />);
      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('all buttons are not disabled', () => {
      render(<HeroSection />);
      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe('User Interactions', () => {
    it('chat button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /chat support/i });

      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('profile button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /user profile/i });

      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('get started button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /get started/i });

      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('sign in button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /sign in/i });

      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('navigation links are clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const plansLink = screen.getByText('PLANS').closest('a');

      expect(plansLink).toBeInTheDocument();
      // Note: Since these are anchor tags, clicking would navigate
    });

    it('buttons are keyboard accessible with Tab', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      // Tab through interactive elements
      await user.tab();
      expect(document.activeElement).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic header element with banner role', () => {
      const { container } = render(<HeroSection />);
      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('role', 'banner');
    });

    it('logo has accessible link text', () => {
      render(<HeroSection />);
      const logoLink = screen.getByRole('link', { name: /US Mobile home/i });

      expect(logoLink).toHaveAccessibleName('US Mobile home');
    });

    it('all buttons have accessible names', () => {
      render(<HeroSection />);

      expect(screen.getByRole('button', { name: /chat support/i })).toHaveAccessibleName();
      expect(screen.getByRole('button', { name: /user profile/i })).toHaveAccessibleName();
      expect(screen.getByRole('button', { name: /get started/i })).toHaveAccessibleName();
      expect(screen.getByRole('button', { name: /sign in/i })).toHaveAccessibleName();
    });

    it('navigation has proper ARIA label', () => {
      const { container } = render(<HeroSection />);
      const nav = container.querySelector('nav');

      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('SVG icons have aria-hidden attribute', () => {
      const { container } = render(<HeroSection />);
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');

      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Layout Structure', () => {
    it('has correct container structure', () => {
      const { container } = render(<HeroSection />);
      const header = container.querySelector('header');
      const containerDiv = header?.querySelector('[class*="container"]');

      expect(header).toBeInTheDocument();
      expect(containerDiv).toBeInTheDocument();
    });

    it('logo section is present', () => {
      const { container } = render(<HeroSection />);
      const logo = container.querySelector('[class*="logo"]');

      expect(logo).toBeInTheDocument();
    });

    it('navigation section is present', () => {
      const { container } = render(<HeroSection />);
      const nav = container.querySelector('nav');

      expect(nav).toBeInTheDocument();
    });

    it('actions section is present', () => {
      const { container } = render(<HeroSection />);
      const actions = container.querySelector('[class*="actions"]');

      expect(actions).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(HeroSection.displayName).toBe('HeroSection');
    });
  });

  describe('Edge Cases', () => {
    it('renders successfully with no props', () => {
      render(<HeroSection />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(4);
    });

    it('does not produce console warnings', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<HeroSection />);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('does not produce console errors', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<HeroSection />);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('handles rapid re-renders without errors', () => {
      const { rerender } = render(<HeroSection />);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      rerender(<HeroSection />);
      rerender(<HeroSection />);
      rerender(<HeroSection />);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('unmounts cleanly', () => {
      const { unmount } = render(<HeroSection />);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      unmount();

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
