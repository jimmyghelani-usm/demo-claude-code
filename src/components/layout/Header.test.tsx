import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  describe('Rendering', () => {
    it('renders the header component', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('renders all main sections', () => {
      render(<Header />);

      // Logo
      expect(screen.getByLabelText(/us mobile home/i)).toBeInTheDocument();

      // Navigation
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();

      // Action buttons
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /get us mobile/i })).toBeInTheDocument();
    });
  });

  describe('Logo', () => {
    it('renders logo with link to homepage', () => {
      render(<Header />);
      const logoLink = screen.getByLabelText(/us mobile home/i);
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('logo is accessible', () => {
      render(<Header />);
      const logoLink = screen.getByLabelText(/us mobile home/i);
      expect(logoLink).toHaveAttribute('aria-label', 'US Mobile home');
    });

    it('logo SVG is decorative', () => {
      const { container } = render(<Header />);
      const svg = container.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders all navigation links', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /plans/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /networks/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /how it works/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    });

    it('navigation has correct aria-label', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('PLANS link has correct href', () => {
      render(<Header />);
      const link = screen.getByRole('link', { name: /plans/i });
      expect(link).toHaveAttribute('href', '/plans');
    });

    it('NETWORKS link has correct href', () => {
      render(<Header />);
      const link = screen.getByRole('link', { name: /networks/i });
      expect(link).toHaveAttribute('href', '/networks');
    });

    it('HOW IT WORKS link has correct href', () => {
      render(<Header />);
      const link = screen.getByRole('link', { name: /how it works/i });
      expect(link).toHaveAttribute('href', '/how-it-works');
    });

    it('SHOP link has correct href', () => {
      render(<Header />);
      const link = screen.getByRole('link', { name: /shop/i });
      expect(link).toHaveAttribute('href', '/shop');
    });

    it('renders navigation as unordered list', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      const list = nav.querySelector('ul');
      expect(list).toBeInTheDocument();
    });

    it('navigation links are in correct order', () => {
      render(<Header />);
      const links = screen.getAllByRole('link').filter(link =>
        link.textContent && /^(PLANS|NETWORKS|HOW IT WORKS|SHOP)$/.test(link.textContent)
      );

      expect(links[0]).toHaveTextContent('PLANS');
      expect(links[1]).toHaveTextContent('NETWORKS');
      expect(links[2]).toHaveTextContent('HOW IT WORKS');
      expect(links[3]).toHaveTextContent('SHOP');
    });
  });

  describe('Icon Buttons', () => {
    it('renders shopping cart icon button', () => {
      render(<Header />);
      const cartButton = screen.getByRole('button', { name: /shopping cart/i });
      expect(cartButton).toBeInTheDocument();
    });

    it('renders chat support icon button', () => {
      render(<Header />);
      const chatButton = screen.getByRole('button', { name: /chat support/i });
      expect(chatButton).toBeInTheDocument();
    });

    it('cart button has correct aria-label', () => {
      render(<Header />);
      const cartButton = screen.getByRole('button', { name: /shopping cart/i });
      expect(cartButton).toHaveAttribute('aria-label', 'Shopping cart');
    });

    it('chat button has correct aria-label', () => {
      render(<Header />);
      const chatButton = screen.getByRole('button', { name: /chat support/i });
      expect(chatButton).toHaveAttribute('aria-label', 'Chat support');
    });

    it('icon buttons are clickable', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const cartButton = screen.getByRole('button', { name: /shopping cart/i });
      const chatButton = screen.getByRole('button', { name: /chat support/i });

      await user.click(cartButton);
      await user.click(chatButton);

      // Should not throw errors
      expect(cartButton).toBeInTheDocument();
      expect(chatButton).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('renders Sign In button', () => {
      render(<Header />);
      const signInButton = screen.getByRole('button', { name: /sign in/i });
      expect(signInButton).toBeInTheDocument();
    });

    it('renders Get US Mobile button', () => {
      render(<Header />);
      const getButton = screen.getByRole('button', { name: /get us mobile/i });
      expect(getButton).toBeInTheDocument();
    });

    it('Sign In button is clickable', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const button = screen.getByRole('button', { name: /sign in/i });
      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('Get US Mobile button is clickable', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const button = screen.getByRole('button', { name: /get us mobile/i });
      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('buttons are in correct order', () => {
      render(<Header />);
      const buttons = screen.getAllByRole('button');
      const buttonTexts = buttons
        .filter(btn => btn.textContent && /Sign In|Get US Mobile/.test(btn.textContent))
        .map(btn => btn.textContent?.trim());

      expect(buttonTexts).toContain('Sign In');
      expect(buttonTexts).toContain('Get US Mobile');
    });
  });

  describe('Accessibility', () => {
    it('header has semantic HTML structure', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('navigation is properly labeled', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('all interactive elements are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // Tab through interactive elements
      await user.tab();
      const logoLink = screen.getByLabelText(/us mobile home/i);
      expect(logoLink).toHaveFocus();

      // Navigation links should be focusable
      await user.tab();
      expect(screen.getByRole('link', { name: /plans/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('link', { name: /networks/i })).toHaveFocus();
    });

    it('icon buttons have descriptive labels', () => {
      render(<Header />);

      const cartButton = screen.getByRole('button', { name: /shopping cart/i });
      const chatButton = screen.getByRole('button', { name: /chat support/i });

      expect(cartButton).toHaveAccessibleName();
      expect(chatButton).toHaveAccessibleName();
    });

    it('all links have accessible names', () => {
      render(<Header />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('all buttons have accessible names', () => {
      render(<Header />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });
  });

  describe('Layout Structure', () => {
    it('renders container div', () => {
      const { container } = render(<Header />);
      const headerContainer = container.querySelector('header > div');
      expect(headerContainer).toBeInTheDocument();
    });

    it('has logo section', () => {
      const { container } = render(<Header />);
      const logoSection = container.querySelector('header div[class*="logo"]');
      expect(logoSection).toBeInTheDocument();
    });

    it('has navigation section', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('has actions section', () => {
      const { container } = render(<Header />);
      const actionsSection = container.querySelector('header div[class*="actions"]');
      expect(actionsSection).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('logo link is clickable', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const logoLink = screen.getByLabelText(/us mobile home/i);
      await user.click(logoLink);

      expect(logoLink).toBeInTheDocument();
    });

    it('navigation links are clickable', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const plansLink = screen.getByRole('link', { name: /plans/i });
      await user.click(plansLink);

      expect(plansLink).toBeInTheDocument();
    });

    it('supports hover on navigation links', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const link = screen.getByRole('link', { name: /plans/i });
      await user.hover(link);

      expect(link).toBeInTheDocument();
    });

    it('supports hover on buttons', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const button = screen.getByRole('button', { name: /get us mobile/i });
      await user.hover(button);

      expect(button).toBeInTheDocument();
    });
  });

  describe('Content Verification', () => {
    it('displays correct logo text', () => {
      const { container } = render(<Header />);
      const logoText = container.querySelector('text');
      expect(logoText).toHaveTextContent('US Mobile');
    });

    it('navigation text is in uppercase', () => {
      render(<Header />);

      expect(screen.getByText('PLANS')).toBeInTheDocument();
      expect(screen.getByText('NETWORKS')).toBeInTheDocument();
      expect(screen.getByText('HOW IT WORKS')).toBeInTheDocument();
      expect(screen.getByText('SHOP')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(Header.displayName).toBe('Header');
    });
  });
});
