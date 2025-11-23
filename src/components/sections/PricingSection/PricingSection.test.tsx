import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PricingSection } from './PricingSection';

describe('PricingSection Component', () => {
  describe('Rendering', () => {
    it('renders with default title and description', () => {
      render(<PricingSection />);
      expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
      expect(screen.getByText(/Choose the plan that works best/)).toBeInTheDocument();
    });

    it('renders title as heading', () => {
      render(<PricingSection />);
      const heading = screen.getByRole('heading', { name: /Simple, Transparent Pricing/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders section element', () => {
      const { container } = render(<PricingSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders container div', () => {
      const { container } = render(<PricingSection />);
      const container_div = container.querySelector('[class*="container"]');
      expect(container_div).toBeInTheDocument();
    });

    it('renders header with title and description', () => {
      const { container } = render(<PricingSection />);
      const header = container.querySelector('[class*="header"]');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Simple, Transparent Pricing');
    });
  });

  describe('Default Plans', () => {
    it('renders all three default plans', () => {
      render(<PricingSection />);
      expect(screen.getByText('5GB Free for Unlimited')).toBeInTheDocument();
      expect(screen.getByText('10GB Premium')).toBeInTheDocument();
      expect(screen.getByText('Business Plan')).toBeInTheDocument();
    });

    it('renders correct prices for default plans', () => {
      render(<PricingSection />);
      expect(screen.getByText('$57')).toBeInTheDocument();
      expect(screen.getByText('$74')).toBeInTheDocument();
      expect(screen.getByText('$554')).toBeInTheDocument();
    });

    it('renders correct period for default plans', () => {
      render(<PricingSection />);
      const periods = screen.getAllByText('/ Month');
      expect(periods.length).toBeGreaterThanOrEqual(3);
    });

    it('renders descriptions for default plans', () => {
      render(<PricingSection />);
      expect(screen.getByText('Best for individuals')).toBeInTheDocument();
      expect(screen.getByText('Most popular')).toBeInTheDocument();
      expect(screen.getByText('For teams')).toBeInTheDocument();
    });
  });

  describe('Features List', () => {
    it('renders features for each default plan', () => {
      render(<PricingSection />);
      const unlimitedDataFeatures = screen.getAllByText(/Unlimited data, talk/);
      expect(unlimitedDataFeatures.length).toBe(3);
    });

    it('renders different feature types', () => {
      render(<PricingSection />);
      expect(screen.getAllByText('Unlimited text').length).toBeGreaterThan(0);
      expect(screen.getByText('5GB hotspot')).toBeInTheDocument();
      expect(screen.getByText('10GB hotspot')).toBeInTheDocument();
      expect(screen.getByText('Unlimited hotspot')).toBeInTheDocument();
    });

    it('renders all features in correct plans', () => {
      render(<PricingSection />);
      // Check that key features are present (some appear multiple times)
      expect(screen.getAllByText(/Unlimited data, talk/).length).toBeGreaterThan(0);
      expect(screen.getAllByText('Unlimited text').length).toBeGreaterThan(0);
      expect(screen.getByText('5GB hotspot')).toBeInTheDocument();
    });
  });

  describe('Custom Content', () => {
    it('accepts custom title and description', () => {
      render(
        <PricingSection
          title="Custom Title"
          description="Custom description"
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom description')).toBeInTheDocument();
    });

    it('renders custom plans', () => {
      const customPlans = [
        {
          id: 'custom-1',
          title: 'Test Plan',
          price: 99,
          features: ['Test feature 1', 'Test feature 2'],
        },
      ];
      render(<PricingSection plans={customPlans} />);
      expect(screen.getByText('Test Plan')).toBeInTheDocument();
      expect(screen.getByText('Test feature 1')).toBeInTheDocument();
      expect(screen.getByText('Test feature 2')).toBeInTheDocument();
    });

    it('renders single custom plan', () => {
      const customPlans = [
        {
          id: 'single-plan',
          title: 'Single Plan',
          price: 49,
          features: ['Single feature'],
        },
      ];
      render(<PricingSection plans={customPlans} />);
      expect(screen.getByText('Single Plan')).toBeInTheDocument();
      expect(screen.queryByText('5GB Free for Unlimited')).not.toBeInTheDocument();
    });

    it('renders multiple custom plans with different prices', () => {
      const customPlans = [
        { id: '1', title: 'Starter', price: 29, features: [] },
        { id: '2', title: 'Professional', price: 79, features: [] },
        { id: '3', title: 'Enterprise', price: 199, features: [] },
      ];
      render(<PricingSection plans={customPlans} />);
      expect(screen.getByText('Starter')).toBeInTheDocument();
      expect(screen.getByText('Professional')).toBeInTheDocument();
      expect(screen.getByText('Enterprise')).toBeInTheDocument();
    });

    it('respects plan highlighted flag', () => {
      const { container } = render(<PricingSection />);
      // Check that at least one plan has highlighted styling
      const highlightedPlans = container.querySelectorAll('[class*="highlighted"]');
      expect(highlightedPlans.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Grid Layout', () => {
    it('renders grid container', () => {
      const { container } = render(<PricingSection />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('renders pricing cards in grid', () => {
      const { container } = render(<PricingSection />);
      const cardWrappers = container.querySelectorAll('[class*="cardWrapper"]');
      expect(cardWrappers.length).toBe(3);
    });

    it('renders correct number of cards for custom plans', () => {
      const customPlans = [
        { id: '1', title: 'Plan 1', price: 10, features: [] },
        { id: '2', title: 'Plan 2', price: 20, features: [] },
      ];
      const { container } = render(<PricingSection plans={customPlans} />);
      const cardWrappers = container.querySelectorAll('[class*="cardWrapper"]');
      expect(cardWrappers.length).toBe(2);
    });
  });

  describe('Pricing Cards', () => {
    it('renders PricingCard components for each plan', () => {
      const { container } = render(<PricingSection />);
      const pricingCards = container.querySelectorAll('[class*="card"]');
      expect(pricingCards.length).toBeGreaterThanOrEqual(3);
    });

    it('passes correct props to PricingCard components', () => {
      render(<PricingSection />);
      expect(screen.getByText('5GB Free for Unlimited')).toBeInTheDocument();
      expect(screen.getByText('$57')).toBeInTheDocument();
      expect(screen.getByText('Best for individuals')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('displays all interactive buttons for plans', () => {
      render(<PricingSection />);
      const buttons = screen.getAllByRole('button');
      // At least one button per plan
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<PricingSection />);

      const buttons = screen.getAllByRole('button');
      const firstButton = buttons[0];

      await user.tab();
      expect(firstButton).toHaveFocus();
    });

    it('plan cards can be interacted with', async () => {
      const user = userEvent.setup();
      render(<PricingSection />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      await user.click(buttons[0]);
      // Interaction completes without errors
      expect(buttons[0]).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has semantic heading structure', () => {
      render(<PricingSection />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Simple, Transparent Pricing');
    });

    it('all plan names are readable', () => {
      render(<PricingSection />);
      const planNames = [
        '5GB Free for Unlimited',
        '10GB Premium',
        'Business Plan',
      ];
      planNames.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it('all prices are properly formatted and readable', () => {
      render(<PricingSection />);
      const prices = ['$57', '$74', '$554'];
      prices.forEach((price) => {
        expect(screen.getByText(price)).toBeInTheDocument();
      });
    });

    it('all features are visible and readable', () => {
      render(<PricingSection />);
      const dataFeatures = screen.getAllByText(/Unlimited data, talk/);
      expect(dataFeatures.length).toBeGreaterThan(0);
      const textFeatures = screen.getAllByText('Unlimited text');
      expect(textFeatures.length).toBeGreaterThan(0);
    });

    it('section has proper semantic structure', () => {
      const { container } = render(<PricingSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty plans array', () => {
      render(<PricingSection plans={[]} />);
      expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
      const grid = screen.getByText('Simple, Transparent Pricing').closest('section');
      expect(grid).toBeInTheDocument();
    });

    it('renders plan with no description', () => {
      const customPlans = [
        {
          id: 'no-desc',
          title: 'No Description Plan',
          price: 50,
          features: ['Feature 1'],
        },
      ];
      render(<PricingSection plans={customPlans} />);
      expect(screen.getByText('No Description Plan')).toBeInTheDocument();
    });

    it('renders plan with many features', () => {
      const manyFeatures = Array.from({ length: 10 }, (_, i) => `Feature ${i + 1}`);
      const customPlans = [
        {
          id: 'many-features',
          title: 'Complete Plan',
          price: 99,
          features: manyFeatures,
        },
      ];
      render(<PricingSection plans={customPlans} />);
      expect(screen.getByText('Complete Plan')).toBeInTheDocument();
      manyFeatures.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it('maintains functionality with very long text', () => {
      const longText = 'This is a very long title that should still render correctly without breaking the layout or causing any issues';
      render(
        <PricingSection
          title={longText}
          description="Long description"
        />
      );
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });
});
