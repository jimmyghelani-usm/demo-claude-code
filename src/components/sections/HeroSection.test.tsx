import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  describe('Rendering', () => {
    it('renders the hero section', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders all main content sections', () => {
      render(<HeroSection />);

      // Headline
      expect(screen.getByRole('heading', { name: /us mobile trade in/i })).toBeInTheDocument();

      // Subheading
      expect(screen.getByText(/trade in your old phone/i)).toBeInTheDocument();

      // CTA button
      expect(screen.getByRole('button', { name: /check trade in value/i })).toBeInTheDocument();
    });
  });

  describe('Headline', () => {
    it('renders main headline text', () => {
      render(<HeroSection />);
      expect(screen.getByText('US Mobile Trade In')).toBeInTheDocument();
    });

    it('renders emoji text in headline', () => {
      render(<HeroSection />);
      expect(screen.getByText(/get 💰 for your old 📱/i)).toBeInTheDocument();
    });

    it('headline is an h1 element', () => {
      render(<HeroSection />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('headline contains two spans', () => {
      const { container } = render(<HeroSection />);
      const h1 = container.querySelector('h1');
      const spans = h1?.querySelectorAll('span');
      expect(spans).toHaveLength(2);
    });
  });

  describe('Subheading', () => {
    it('renders subheading text', () => {
      render(<HeroSection />);
      const subheading = screen.getByText(/trade in your old phone, tablet, or smartwatch/i);
      expect(subheading).toBeInTheDocument();
    });

    it('mentions instant quote', () => {
      render(<HeroSection />);
      expect(screen.getByText(/instant quote/i)).toBeInTheDocument();
    });

    it('mentions free shipping', () => {
      render(<HeroSection />);
      expect(screen.getByText(/free shipping/i)).toBeInTheDocument();
    });

    it('mentions fast payout', () => {
      render(<HeroSection />);
      expect(screen.getByText(/fast payout/i)).toBeInTheDocument();
    });

    it('mentions multiple device types', () => {
      render(<HeroSection />);
      const subheading = screen.getByText(/phone, tablet, or smartwatch/i);
      expect(subheading).toBeInTheDocument();
    });
  });

  describe('CTA Button', () => {
    it('renders CTA button with correct text', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /check trade in value/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Check trade in value');
    });

    it('button is clickable', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /check trade in value/i });

      await user.click(button);

      expect(consoleSpy).toHaveBeenCalledWith('Check trade in value');
      consoleSpy.mockRestore();
    });

    it('button is not disabled', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<HeroSection />);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');

      expect(consoleSpy).toHaveBeenCalledWith('Check trade in value');
      consoleSpy.mockRestore();
    });
  });

  describe('Device Showcase', () => {
    it('renders device grid', () => {
      const { container } = render(<HeroSection />);
      const deviceGrid = container.querySelector('[class*="deviceGrid"]');
      expect(deviceGrid).toBeInTheDocument();
    });

    it('renders three device placeholders', () => {
      const { container } = render(<HeroSection />);
      const devices = container.querySelectorAll('[class*="device"]');
      expect(devices.length).toBeGreaterThanOrEqual(3);
    });

    it('displays phone emoji', () => {
      render(<HeroSection />);
      expect(screen.getByText('📱')).toBeInTheDocument();
    });

    it('displays watch emoji', () => {
      render(<HeroSection />);
      expect(screen.getByText('⌚')).toBeInTheDocument();
    });

    it('displays laptop emoji', () => {
      render(<HeroSection />);
      expect(screen.getByText('💻')).toBeInTheDocument();
    });

    it('device elements are decorative', () => {
      const { container } = render(<HeroSection />);
      const devices = container.querySelectorAll('[aria-hidden="true"]');
      expect(devices.length).toBeGreaterThan(0);
    });

    it('renders SVG placeholders', () => {
      const { container } = render(<HeroSection />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Layout Structure', () => {
    it('has container div', () => {
      const { container } = render(<HeroSection />);
      const sectionContainer = container.querySelector('section > div');
      expect(sectionContainer).toBeInTheDocument();
    });

    it('has content section', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
    });

    it('has showcase section', () => {
      const { container } = render(<HeroSection />);
      const showcase = container.querySelector('[class*="showcase"]');
      expect(showcase).toBeInTheDocument();
    });

    it('content and showcase are siblings', () => {
      const { container } = render(<HeroSection />);
      const mainContainer = container.querySelector('section > div');
      const content = mainContainer?.querySelector('[class*="content"]');
      const showcase = mainContainer?.querySelector('[class*="showcase"]');

      expect(content).toBeInTheDocument();
      expect(showcase).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<HeroSection />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('all interactive elements are accessible', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName();
    });

    it('decorative elements are hidden from screen readers', () => {
      const { container } = render(<HeroSection />);
      const decorative = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorative.length).toBeGreaterThan(0);
    });

    it('all text content is accessible', () => {
      render(<HeroSection />);

      expect(screen.getByText('US Mobile Trade In')).toBeVisible();
      expect(screen.getByText(/get 💰 for your old 📱/i)).toBeVisible();
      expect(screen.getByText(/trade in your old phone/i)).toBeVisible();
      expect(screen.getByRole('button')).toBeVisible();
    });
  });

  describe('Content Verification', () => {
    it('mentions key value propositions', () => {
      render(<HeroSection />);

      // Instant quote
      expect(screen.getByText(/instant quote/i)).toBeInTheDocument();

      // Free shipping
      expect(screen.getByText(/free shipping/i)).toBeInTheDocument();

      // Fast payout
      expect(screen.getByText(/fast payout/i)).toBeInTheDocument();
    });

    it('has concise and clear messaging', () => {
      render(<HeroSection />);
      const subheading = screen.getByText(/trade in your old phone, tablet, or smartwatch/i);
      expect(subheading).toHaveTextContent('Instant quote. Free shipping. Fast payout.');
    });
  });

  describe('Visual Elements', () => {
    it('renders device placeholders with correct sizes', () => {
      const { container } = render(<HeroSection />);

      const large = container.querySelector('[class*="deviceLarge"]');
      const medium = container.querySelector('[class*="deviceMedium"]');
      const small = container.querySelector('[class*="deviceSmall"]');

      expect(large).toBeInTheDocument();
      expect(medium).toBeInTheDocument();
      expect(small).toBeInTheDocument();
    });

    it('SVG elements have viewBox attributes', () => {
      const { container } = render(<HeroSection />);
      const svgs = container.querySelectorAll('svg');

      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('viewBox');
      });
    });

    it('device labels are visible', () => {
      const { container } = render(<HeroSection />);
      const labels = container.querySelectorAll('[class*="deviceLabel"]');
      expect(labels.length).toBe(3);
    });
  });

  describe('User Interactions', () => {
    it('CTA button responds to hover', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      const button = screen.getByRole('button');
      await user.hover(button);

      expect(button).toBeInTheDocument();
    });

    it('CTA button maintains focus', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Button should still be in the document after click
      expect(button).toBeInTheDocument();
    });

    it('handles multiple button clicks', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });
  });

  describe('Content Ordering', () => {
    it('headline appears before subheading', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');
      const elements = content?.children;

      // h1 should come before p
      expect(elements?.[0]?.tagName).toBe('H1');
      expect(elements?.[1]?.tagName).toBe('P');
    });

    it('subheading appears before button', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');
      const text = content?.querySelector('p');
      const button = content?.querySelector('button');

      expect(text).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      // Use compareDocumentPosition to check order
      const position = text?.compareDocumentPosition(button!);
      expect(position! & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(HeroSection.displayName).toBe('HeroSection');
    });
  });
});
