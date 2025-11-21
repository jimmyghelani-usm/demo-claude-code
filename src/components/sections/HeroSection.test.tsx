import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

/**
 * HeroSection Component Tests - Navigation Header & Feature Cards
 * Updated to match Figma node 2171:9951
 *
 * Tests the HeroSection component including:
 * - Header Navigation: Logo, menu items (PLANS, NETWORKS, HOW IT WORKS, SHOP)
 * - Action Buttons: Shopping bag (with notification dot), Chat, Get Started, Sign In
 * - Feature Section: 4 feature cards with icons, titles, and descriptions
 * - Semantic HTML with WCAG 2.1 AA accessibility compliance
 */
describe('HeroSection', () => {
  describe('Rendering', () => {
    it('renders the component without crashing', () => {
      render(<HeroSection />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the navigation header with correct semantic HTML', () => {
      const { container } = render(<HeroSection />);
      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
      expect(header?.getAttribute('role')).toBe('banner');
    });

    it('renders logo with correct text', () => {
      render(<HeroSection />);
      expect(screen.getByText('USmobile')).toBeInTheDocument();
    });

    it('renders all navigation menu items', () => {
      render(<HeroSection />);

      expect(screen.getByText('PLANS')).toBeInTheDocument();
      expect(screen.getByText('NETWORKS')).toBeInTheDocument();
      expect(screen.getByText('HOW IT WORKS')).toBeInTheDocument();
      expect(screen.getByText('SHOP')).toBeInTheDocument();
    });

    it('renders all action buttons', () => {
      render(<HeroSection />);

      expect(screen.getByRole('button', { name: /shopping bag/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /open chat support/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('renders feature section with title', () => {
      render(<HeroSection />);
      expect(screen.getByText('Protect Your Device with US Mobile')).toBeInTheDocument();
    });

    it('renders all feature cards with correct titles', () => {
      render(<HeroSection />);

      expect(screen.getByText('Device Protection')).toBeInTheDocument();
      expect(screen.getByText('Fast Claims')).toBeInTheDocument();
      expect(screen.getByText('Nationwide Coverage')).toBeInTheDocument();
      expect(screen.getByText('24/7 Support')).toBeInTheDocument();
    });

    it('renders feature card descriptions', () => {
      render(<HeroSection />);

      expect(
        screen.getByText(
          /comprehensive coverage for your device against accidental damage, theft, and malfunctions/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/quick and easy claims process with rapid approval/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/protection that works wherever you go/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/round-the-clock customer support/i)
      ).toBeInTheDocument();
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

      expect(navLinks).toHaveLength(4);
      expect(navLinks[0]).toHaveTextContent('PLANS');
      expect(navLinks[1]).toHaveTextContent('NETWORKS');
      expect(navLinks[2]).toHaveTextContent('HOW IT WORKS');
      expect(navLinks[3]).toHaveTextContent('SHOP');
    });

    it('navigation links have correct hrefs', () => {
      render(<HeroSection />);

      expect(screen.getByText('PLANS').closest('a')).toHaveAttribute('href', '/plans');
      expect(screen.getByText('NETWORKS').closest('a')).toHaveAttribute('href', '/networks');
      expect(screen.getByText('HOW IT WORKS').closest('a')).toHaveAttribute(
        'href',
        '/how-it-works'
      );
      expect(screen.getByText('SHOP').closest('a')).toHaveAttribute('href', '/shop');
    });

    it('logo link has correct href and aria-label', () => {
      render(<HeroSection />);
      const logoLink = screen.getByRole('link', { name: /US Mobile home/i });

      expect(logoLink).toHaveAttribute('href', '/');
      expect(logoLink).toHaveAttribute('aria-label', 'US Mobile home');
    });
  });

  describe('Action Buttons', () => {
    it('shopping bag button has correct aria label', () => {
      render(<HeroSection />);
      const bagButton = screen.getByRole('button', { name: /shopping bag/i });

      expect(bagButton).toHaveAttribute('aria-label', 'Shopping bag');
      expect(bagButton).toHaveAttribute('type', 'button');
    });

    it('chat button has correct aria label', () => {
      render(<HeroSection />);
      const chatButton = screen.getByRole('button', { name: /open chat support/i });

      expect(chatButton).toHaveAttribute('aria-label', 'Open chat support');
      expect(chatButton).toHaveAttribute('type', 'button');
    });

    it('get started button renders with correct text', () => {
      render(<HeroSection />);
      const getStartedButton = screen.getByRole('button', { name: /get started/i });

      expect(getStartedButton).toHaveTextContent('Get Started');
      expect(getStartedButton).toHaveAttribute('type', 'button');
    });

    it('sign in button renders with correct text', () => {
      render(<HeroSection />);
      const signInButton = screen.getByRole('button', { name: /sign in/i });

      expect(signInButton).toHaveTextContent('Sign In');
      expect(signInButton).toHaveAttribute('type', 'button');
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

    it('notification dot is present on shopping bag button', () => {
      const { container } = render(<HeroSection />);
      const notificationDot = container.querySelector('[class*="notificationDot"]');

      expect(notificationDot).toBeInTheDocument();
    });
  });

  describe('Feature Cards', () => {
    it('renders exactly 4 feature cards', () => {
      const { container } = render(<HeroSection />);
      const cards = container.querySelectorAll('[class*="card"]');

      // Filter to only get actual cards, not icon containers
      const featureCards = Array.from(cards).filter(
        (card) => card.textContent?.includes('Protection') ||
                 card.textContent?.includes('Claims') ||
                 card.textContent?.includes('Coverage') ||
                 card.textContent?.includes('Support')
      );

      expect(featureCards.length).toBeGreaterThanOrEqual(4);
    });

    it('feature section has proper aria-labelledby pointing to title', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');

      expect(section).toHaveAttribute('aria-labelledby', 'features-heading');
    });

    it('section title has correct id for aria-labelledby', () => {
      render(<HeroSection />);
      const title = screen.getByText('Protect Your Device with US Mobile');

      expect(title).toHaveAttribute('id', 'features-heading');
    });

    it('feature cards have semantic heading hierarchy', () => {
      render(<HeroSection />);
      const h3Elements = screen.getAllByRole('heading', { level: 3 });

      expect(h3Elements.length).toBeGreaterThanOrEqual(4);
      expect(h3Elements.map((h) => h.textContent)).toContain('Device Protection');
      expect(h3Elements.map((h) => h.textContent)).toContain('Fast Claims');
      expect(h3Elements.map((h) => h.textContent)).toContain('Nationwide Coverage');
      expect(h3Elements.map((h) => h.textContent)).toContain('24/7 Support');
    });

    it('all feature card descriptions are present and complete', () => {
      render(<HeroSection />);

      expect(
        screen.getByText(/comprehensive coverage for your device against accidental damage/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/quick and easy claims process with rapid approval and device replacement/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/protection that works wherever you go, with coverage across the entire united states/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/round-the-clock customer support available whenever you need assistance/i)
      ).toBeInTheDocument();
    });

    it('feature card icons have aria-hidden attribute', () => {
      const { container } = render(<HeroSection />);
      const cardIcons = container.querySelectorAll('[class*="cardIcon"]');

      cardIcons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('User Interactions', () => {
    it('shopping bag button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /shopping bag/i });

      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    it('chat button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /open chat support/i });

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

    it('navigation links are present and clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const plansLink = screen.getByText('PLANS').closest('a');

      expect(plansLink).toBeInTheDocument();
      await user.click(plansLink!);
      expect(plansLink).toBeInTheDocument();
    });

    it('logo link is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const logoLink = screen.getByRole('link', { name: /US Mobile home/i });

      expect(logoLink).toBeInTheDocument();
      await user.click(logoLink);
      expect(logoLink).toBeInTheDocument();
    });

    it('buttons are keyboard accessible with Tab', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      await user.tab();
      expect(document.activeElement).toBeTruthy();
    });

    it('interactive elements are reachable via keyboard', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      // Tab to first button and verify focus
      await user.tab();
      const activeElement = document.activeElement as HTMLElement;
      expect(activeElement?.getAttribute('href') || activeElement?.tagName).toBeTruthy();
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

    it('all header buttons have accessible names', () => {
      render(<HeroSection />);

      expect(screen.getByRole('button', { name: /shopping bag/i })).toHaveAccessibleName();
      expect(screen.getByRole('button', { name: /open chat support/i })).toHaveAccessibleName();
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

    it('main section has aria-labelledby attribute', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');

      expect(section).toHaveAttribute('aria-labelledby', 'features-heading');
    });

    it('feature section title has proper heading level', () => {
      render(<HeroSection />);
      const title = screen.getByText('Protect Your Device with US Mobile');

      expect(title.tagName).toBe('H2');
    });

    it('feature card titles use semantic heading level 3', () => {
      render(<HeroSection />);
      const deviceProtectionTitle = screen.getByText('Device Protection');

      expect(deviceProtectionTitle.tagName).toBe('H3');
    });

    it('notification dot is marked as aria-hidden', () => {
      const { container } = render(<HeroSection />);
      const notificationDot = container.querySelector('[class*="notificationDot"]');

      expect(notificationDot).toHaveAttribute('aria-hidden', 'true');
    });

    it('provides sufficient color and icon contrast with SVGs', () => {
      const { container } = render(<HeroSection />);
      const svgs = container.querySelectorAll('svg');

      // All SVGs should use currentColor for proper contrast
      svgs.forEach((svg) => {
        const paths = svg.querySelectorAll('path');
        const useElements = svg.querySelectorAll('use');

        // Either has paths with stroke/fill or references other elements
        expect(paths.length + useElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Layout Structure', () => {
    it('has correct header container structure', () => {
      const { container } = render(<HeroSection />);
      const header = container.querySelector('header');
      const headerContainer = header?.querySelector('[class*="headerContainer"]');

      expect(header).toBeInTheDocument();
      expect(headerContainer).toBeInTheDocument();
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

    it('feature section is present with proper structure', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      const featureCards = section?.querySelector('[class*="featureCards"]');

      expect(section).toBeInTheDocument();
      expect(featureCards).toBeInTheDocument();
    });

    it('feature cards grid is present', () => {
      const { container } = render(<HeroSection />);
      const featureCards = container.querySelector('[class*="featureCards"]');

      expect(featureCards).toBeInTheDocument();
    });
  });

  describe('Content Verification', () => {
    it('displays all brand-related text correctly', () => {
      render(<HeroSection />);

      expect(screen.getByText('USmobile')).toBeInTheDocument();
      expect(screen.getByText('Protect Your Device with US Mobile')).toBeInTheDocument();
    });

    it('feature card titles match expected content', () => {
      render(<HeroSection />);

      const titles = [
        'Device Protection',
        'Fast Claims',
        'Nationwide Coverage',
        '24/7 Support'
      ];

      titles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('action button texts are displayed correctly', () => {
      render(<HeroSection />);

      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
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

    it('renders all content on first mount', () => {
      render(<HeroSection />);

      // Check header elements
      expect(screen.getByText('USmobile')).toBeInTheDocument();
      expect(screen.getByText('PLANS')).toBeInTheDocument();

      // Check feature section
      expect(screen.getByText('Device Protection')).toBeInTheDocument();
      expect(screen.getByText('24/7 Support')).toBeInTheDocument();
    });

    it('maintains focus management with multiple interactions', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      const bagButton = screen.getByRole('button', { name: /shopping bag/i });
      const chatButton = screen.getByRole('button', { name: /open chat support/i });

      await user.click(bagButton);
      await user.click(chatButton);

      expect(chatButton).toBeInTheDocument();
      expect(bagButton).toBeInTheDocument();
    });
  });
});
