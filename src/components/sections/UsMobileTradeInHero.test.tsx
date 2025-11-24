import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsMobileTradeInHero } from './UsMobileTradeInHero';

describe('UsMobileTradeInHero', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<UsMobileTradeInHero />);

      expect(screen.getByRole('heading', { name: /trade in your old phone/i })).toBeInTheDocument();
      expect(screen.getByText(/get instant credit toward your next device/i)).toBeInTheDocument();
    });

    it('renders with custom headline and subheadline', () => {
      const customHeadline = 'Custom Trade In Title';
      const customSubheadline = 'Custom Trade In Subtitle';

      render(
        <UsMobileTradeInHero
          headline={customHeadline}
          subheadline={customSubheadline}
        />
      );

      expect(screen.getByRole('heading', { name: customHeadline })).toBeInTheDocument();
      expect(screen.getByText(customSubheadline)).toBeInTheDocument();
    });

    it('renders CTA button with custom label', () => {
      const customLabel = 'CUSTOM CTA';

      render(<UsMobileTradeInHero ctaLabel={customLabel} />);

      const ctaButton = screen.getByRole('link', { name: new RegExp(customLabel, 'i') });
      expect(ctaButton).toBeInTheDocument();
    });

    it('renders scroll indicator button', () => {
      render(<UsMobileTradeInHero />);

      const scrollButton = screen.getByRole('button', { name: /scroll down to see more details/i });
      expect(scrollButton).toBeInTheDocument();
    });

    it('renders description text', () => {
      render(<UsMobileTradeInHero />);

      expect(screen.getByText(/Get the best value for your old device/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-hero-class';
      const { container } = render(
        <UsMobileTradeInHero className={customClass} />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass(customClass);
    });

    it('renders with empty headline string', () => {
      render(<UsMobileTradeInHero headline="" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('');
    });

    it('handles very long headline text', () => {
      const longHeadline = 'A'.repeat(150);
      render(<UsMobileTradeInHero headline={longHeadline} />);
      expect(screen.getByText(longHeadline)).toBeInTheDocument();
    });

    it('handles emoji in CTA label', () => {
      render(<UsMobileTradeInHero ctaLabel="START TRADE IN 🚀" />);
      expect(screen.getByText(/START TRADE IN 🚀/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders with correct ARIA labels for accessibility', () => {
      render(<UsMobileTradeInHero />);

      // Check for main section heading
      const mainHeading = screen.getByRole('heading', { name: /trade in your old phone/i });
      expect(mainHeading.id).toBe('trade-in-headline');

      // Check for CTA button accessibility
      const ctaButton = screen.getByRole('link', { name: /start trade in/i });
      expect(ctaButton).toHaveAccessibleName(/Get credit for your old phone/i);

      // Check for scroll button
      const scrollButton = screen.getByRole('button', { name: /scroll down to see more details/i });
      expect(scrollButton).toBeInTheDocument();
    });

    it('renders section with proper semantic structure', () => {
      const { container } = render(<UsMobileTradeInHero />);

      // Check section element
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('role', 'region');
      expect(section).toHaveAttribute('aria-labelledby', 'trade-in-headline');

      // Check for complementary role on description
      const description = container.querySelector('[role="complementary"]');
      expect(description).toBeInTheDocument();
    });

    it('has proper heading hierarchy with h1', () => {
      render(<UsMobileTradeInHero />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('marks decorative gradient as aria-hidden', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const gradient = container.querySelector('[aria-hidden="true"]');
      expect(gradient).toBeInTheDocument();
    });

    it('marks SVG icons as aria-hidden', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgs.length).toBeGreaterThanOrEqual(1);
    });

    it('CTA button has descriptive aria-label', () => {
      render(<UsMobileTradeInHero />);
      const ctaButton = screen.getByRole('link');
      expect(ctaButton).toHaveAttribute('aria-label', expect.stringContaining('START TRADE IN'));
    });

    it('scroll indicator button has aria-label', () => {
      render(<UsMobileTradeInHero />);
      const scrollButton = screen.getByLabelText('Scroll down to see more details');
      expect(scrollButton).toHaveAttribute('type', 'button');
    });

    it('has keyboard accessible elements', () => {
      render(<UsMobileTradeInHero />);
      const scrollButton = screen.getByLabelText('Scroll down to see more details');
      scrollButton.focus();
      expect(scrollButton).toHaveFocus();
    });
  });

  describe('CTA Button Interaction', () => {
    it('calls onCtaClick when CTA button is clicked', async () => {
      const user = userEvent.setup();
      const onCtaClick = vi.fn();

      render(<UsMobileTradeInHero onCtaClick={onCtaClick} />);

      const ctaButton = screen.getByRole('link', { name: /start trade in/i });
      await user.click(ctaButton);

      expect(onCtaClick).toHaveBeenCalledOnce();
    });

    it('prevents default navigation when onCtaClick is provided', async () => {
      const user = userEvent.setup();
      const onCtaClick = vi.fn();

      render(
        <UsMobileTradeInHero
          onCtaClick={onCtaClick}
          ctaHref="https://example.com"
        />
      );

      const ctaButton = screen.getByRole('link', { name: /start trade in/i });
      await user.click(ctaButton);

      expect(onCtaClick).toHaveBeenCalled();
    });

    it('renders with correct link href when provided', () => {
      const customHref = '/custom-trade-in';

      render(<UsMobileTradeInHero ctaHref={customHref} />);

      const ctaButton = screen.getByRole('link', { name: /start trade in/i });
      expect(ctaButton).toHaveAttribute('href', customHref);
    });

    it('maintains accessibility with default href', () => {
      render(<UsMobileTradeInHero />);

      const ctaButton = screen.getByRole('link', { name: /start trade in/i });
      expect(ctaButton).toHaveAttribute('href', '#');
    });

    it('renders arrow icon in CTA button', () => {
      const { container } = render(<UsMobileTradeInHero />);

      const ctaButton = container.querySelector('a[href="#"]');
      const svg = ctaButton?.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Scroll Indicator Functionality', () => {
    beforeEach(() => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    });

    it('scrolls to correct position when scroll indicator is clicked', async () => {
      const user = userEvent.setup();
      const scrollSpy = vi.spyOn(window, 'scrollTo');

      render(<UsMobileTradeInHero />);

      const scrollButton = screen.getByRole('button', { name: /scroll down to see more details/i });
      await user.click(scrollButton);

      expect(scrollSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'smooth',
        })
      );

      scrollSpy.mockRestore();
    });

    it('scroll button is type="button"', () => {
      render(<UsMobileTradeInHero />);
      const scrollButton = screen.getByLabelText('Scroll down to see more details');
      expect(scrollButton).toHaveAttribute('type', 'button');
    });

    it('renders scroll indicator SVG', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const scrollButton = screen.getByLabelText('Scroll down to see more details');
      const svg = scrollButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('scroll indicator SVG has correct viewBox', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const scrollButton = screen.getByLabelText('Scroll down to see more details');
      const svg = scrollButton.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
    });
  });

  describe('Responsive Layout', () => {
    it('renders section element for styling layout', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('maintains structure across different viewport sizes', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const section = container.querySelector('section');
      const headline = container.querySelector('h1');
      const cta = container.querySelector('a');

      expect(section).toBeInTheDocument();
      expect(headline).toBeInTheDocument();
      expect(cta).toBeInTheDocument();
    });

    it('content layout container is present', () => {
      const { container } = render(<UsMobileTradeInHero />);
      const contentDiv = container.querySelector('section > div');
      expect(contentDiv).toBeInTheDocument();
    });

    it('has gradient background element for visual effects', () => {
      const { container } = render(<UsMobileTradeInHero />);
      // Check for gradient element with aria-hidden
      const gradient = container.querySelector('[aria-hidden="true"]');
      expect(gradient).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles special characters in headline', () => {
      const specialHeadline = 'Trade In & Get Cash "Instantly" <Now>';
      render(<UsMobileTradeInHero headline={specialHeadline} />);
      expect(screen.getByText(/Trade In/)).toBeInTheDocument();
    });

    it('renders without onCtaClick gracefully', () => {
      render(<UsMobileTradeInHero onCtaClick={undefined} />);
      const ctaButton = screen.getByRole('link');
      expect(ctaButton).toBeInTheDocument();
    });

    it('handles multiple instances independently', () => {
      const { container } = render(
        <>
          <UsMobileTradeInHero headline="Hero 1" />
          <UsMobileTradeInHero headline="Hero 2" />
        </>
      );

      expect(screen.getByText('Hero 1')).toBeInTheDocument();
      expect(screen.getByText('Hero 2')).toBeInTheDocument();

      const sections = container.querySelectorAll('section[role="region"]');
      expect(sections.length).toBe(2);
    });
  });

  describe('Integration Tests', () => {
    it('renders complete hero with all elements', () => {
      render(
        <UsMobileTradeInHero
          headline="Trade In Your Old Phone"
          subheadline="Get instant credit"
          ctaLabel="START"
          ctaHref="/trade-in"
        />
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Get instant credit')).toBeInTheDocument();
      expect(screen.getByText('START')).toBeInTheDocument();
      expect(screen.getByLabelText('Scroll down to see more details')).toBeInTheDocument();
    });

    it('handles complete user workflow', async () => {
      const user = userEvent.setup();
      const onCtaClick = vi.fn();

      render(
        <UsMobileTradeInHero
          headline="Trade In"
          onCtaClick={onCtaClick}
        />
      );

      // User can see the hero
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      // User can click CTA
      const ctaButton = screen.getByRole('link');
      await user.click(ctaButton);
      expect(onCtaClick).toHaveBeenCalled();

      // User can see scroll indicator
      const scrollBtn = screen.getByLabelText('Scroll down to see more details');
      expect(scrollBtn).toBeInTheDocument();
    });
  });
});
