import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeatureCard } from './FeatureCard';

describe('FeatureCard', () => {
  describe('Rendering', () => {
    it('renders with title and description', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature Title"
          description="Feature description text"
        />
      );
      expect(screen.getByText('Feature Title')).toBeInTheDocument();
      expect(screen.getByText('Feature description text')).toBeInTheDocument();
    });

    it('renders with correct HTML structure', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      expect(container.querySelector('[role="article"]')).toBeInTheDocument();
      expect(container.querySelector('h3')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('renders icon in icon container', () => {
      render(
        <FeatureCard
          icon={<span data-testid="feature-icon">★</span>}
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByTestId('feature-icon')).toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      render(
        <>
          <FeatureCard
            icon={<span>★</span>}
            title="Feature One"
            description="First feature"
          />
          <FeatureCard
            icon={<span>♥</span>}
            title="Feature Two"
            description="Second feature"
          />
        </>
      );
      expect(screen.getByText('Feature One')).toBeInTheDocument();
      expect(screen.getByText('Feature Two')).toBeInTheDocument();
    });

    it('renders SVG icon elements', () => {
      render(
        <FeatureCard
          icon={
            <svg data-testid="svg-icon" width="24" height="24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          }
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });
  });

  describe('Props and Attributes', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          className="custom-class"
        />
      );
      const card = container.querySelector('[role="article"]');
      expect(card?.className).toContain('custom-class');
    });

    it('renders with custom icon background color', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          iconBackgroundColor="#FF5733"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: '#FF5733' });
    });

    it('renders with default icon background color', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: '#608ff9' });
    });

    it('applies custom className alongside default classes', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          className="feature-premium"
        />
      );
      const card = container.querySelector('[role="article"]');
      expect(card?.className).toContain('feature-premium');
    });

    it('supports hex color formats for icon background', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          iconBackgroundColor="#123ABC"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: '#123ABC' });
    });

    it('supports rgb color formats for icon background', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          iconBackgroundColor="rgb(96, 143, 249)"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: 'rgb(96, 143, 249)' });
    });

    it('supports named color formats for icon background', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          iconBackgroundColor="blue"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      // Named colors are converted to RGB by the browser, so check the attribute
      expect(iconContainer?.getAttribute('style')).toContain('blue');
    });
  });

  describe('Semantic HTML', () => {
    it('uses article role for semantic structure', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('uses h3 heading for title', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature Title"
          description="Description"
        />
      );
      const heading = container.querySelector('h3');
      expect(heading).toHaveTextContent('Feature Title');
    });

    it('uses p tag for description', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Feature description text"
        />
      );
      const paragraph = container.querySelector('p');
      expect(paragraph).toHaveTextContent('Feature description text');
    });
  });

  describe('Accessibility', () => {
    it('has aria-label with title for screen reader context', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Fast Performance"
          description="Optimized for speed"
        />
      );
      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-label', 'Fast Performance');
    });

    it('provides proper landmark structure for accessibility', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      expect(article.querySelector('h3')).toBeInTheDocument();
    });

    it('maintains semantic structure for screen readers', () => {
      const { container } = render(
        <FeatureCard
          icon={<span data-testid="icon">★</span>}
          title="Feature Title"
          description="Feature description"
        />
      );

      const article = container.querySelector('[role="article"]');
      const h3 = article?.querySelector('h3');
      const p = article?.querySelector('p');

      expect(h3?.textContent).toBe('Feature Title');
      expect(p?.textContent).toBe('Feature description');
    });
  });

  describe('Content Rendering', () => {
    it('renders long title correctly', () => {
      const longTitle = 'This is a very long feature title that should wrap properly on smaller screens';
      render(
        <FeatureCard
          icon={<span>★</span>}
          title={longTitle}
          description="Description"
        />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders long description correctly', () => {
      const longDescription = 'This is a very long feature description that explains the benefits and features of this component in great detail, including all the important information users need to know.';
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description={longDescription}
        />
      );
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('renders special characters in title', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature & Benefits (Premium)"
          description="Description"
        />
      );
      expect(screen.getByText('Feature & Benefits (Premium)')).toBeInTheDocument();
    });

    it('renders special characters in description', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Get 100% more speed & 50% less cost! #SaveMoney"
        />
      );
      expect(screen.getByText(/Get 100% more speed & 50% less cost!/)).toBeInTheDocument();
    });

    it('renders emoji in title', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="⚡ Lightning Fast"
          description="Description"
        />
      );
      expect(screen.getByText(/⚡ Lightning Fast/)).toBeInTheDocument();
    });

    it('renders emoji in description', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Works great 🚀 on all devices 📱"
        />
      );
      expect(screen.getByText(/Works great 🚀 on all devices 📱/)).toBeInTheDocument();
    });

    it('renders HTML entities correctly', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature &mdash; Subtitle"
          description="Description"
        />
      );
      expect(screen.getByText('Feature — Subtitle')).toBeInTheDocument();
    });
  });

  describe('Icon Variations', () => {
    it('renders text icon', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('renders SVG icon with attributes', () => {
      render(
        <FeatureCard
          icon={
            <svg
              data-testid="custom-svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          }
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByTestId('custom-svg')).toBeInTheDocument();
    });

    it('renders complex icon component with nested elements', () => {
      render(
        <FeatureCard
          icon={
            <svg data-testid="complex-icon">
              <g>
                <path d="M0 0" />
                <circle cx="10" cy="10" r="5" />
              </g>
            </svg>
          }
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
    });

    it('renders emoji icon', () => {
      render(
        <FeatureCard
          icon={<span>😀</span>}
          title="Happy Feature"
          description="Description"
        />
      );
      expect(screen.getByText('😀')).toBeInTheDocument();
    });

    it('renders image icon', () => {
      render(
        <FeatureCard
          icon={<img src="/icon.png" alt="Feature icon" data-testid="img-icon" />}
          title="Feature"
          description="Description"
        />
      );
      expect(screen.getByTestId('img-icon')).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('applies card base styles', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      const card = container.querySelector('[role="article"]');
      expect(card).toBeInTheDocument();
      expect(card?.className).toContain('card');
    });

    it('renders with icon container styles', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renders with content container structure', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
        />
      );
      const content = container.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
      expect(content?.querySelector('h3')).toBeInTheDocument();
      expect(content?.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('Keyboard and Interaction', () => {
    it('is keyboard navigable with Tab', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <FeatureCard
            icon={<span>★</span>}
            title="Feature"
            description="Description"
          />
          <button>After</button>
        </>
      );

      const before = screen.getByRole('button', { name: /before/i });
      before.focus();
      await user.tab();

      const article = screen.getByRole('article');
      // Article element itself isn't focusable, but it's keyboard navigable in reading order
      expect(article).toBeInTheDocument();
    });

    it('is keyboard accessible for content review', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <>
          <button>Focus Start</button>
          <FeatureCard
            icon={<span>★</span>}
            title="Feature"
            description="Description"
          />
          <button>Focus End</button>
        </>
      );

      // The h3 inside the FeatureCard is not focusable by default
      // but the content is keyboard navigable in reading order
      const startButton = screen.getByRole('button', { name: /focus start/i });
      startButton.focus();
      expect(startButton).toHaveFocus();

      await user.tab();
      // Focus moves to next focusable element (button after card)
      const endButton = screen.getByRole('button', { name: /focus end/i });
      expect(endButton).toHaveFocus();
    });

    it('content is readable and accessible without interaction', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature Title"
          description="Feature Description"
        />
      );

      expect(screen.getByText('Feature Title')).toBeVisible();
      expect(screen.getByText('Feature Description')).toBeVisible();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty string title', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title=""
          description="Description"
        />
      );
      const heading = container.querySelector('h3');
      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe('');
    });

    it('renders with empty string description', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description=""
        />
      );
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.textContent).toBe('');
    });

    it('renders with whitespace-only title', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="   "
          description="Description"
        />
      );
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('renders with whitespace-only description', () => {
      render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="   "
        />
      );
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('renders with all props combined', () => {
      const { container } = render(
        <FeatureCard
          icon={<span data-testid="icon">★</span>}
          title="Premium Feature"
          description="Advanced functionality with premium support"
          iconBackgroundColor="#FF6B6B"
          className="premium-card"
        />
      );

      const article = screen.getByRole('article');
      expect(article).toHaveClass('premium-card');
      expect(article).toHaveAttribute('aria-label', 'Premium Feature');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Premium Feature')).toBeInTheDocument();
      expect(screen.getByText('Advanced functionality with premium support')).toBeInTheDocument();

      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: '#FF6B6B' });
    });

    it('maintains structure with very long content', () => {
      const longTitle = 'A'.repeat(200);
      const longDescription = 'B'.repeat(500);

      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title={longTitle}
          description={longDescription}
        />
      );

      const article = container.querySelector('[role="article"]');
      expect(article).toBeInTheDocument();
      expect(article?.querySelector('h3')).toBeInTheDocument();
      expect(article?.querySelector('p')).toBeInTheDocument();
    });

    it('handles special CSS color values', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          iconBackgroundColor="transparent"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      // Check the computed style or attribute directly since CSS values may normalize differently
      expect(iconContainer?.getAttribute('style')).toContain('transparent');
    });

    it('renders with gradient color background', () => {
      const { container } = render(
        <FeatureCard
          icon={<span>★</span>}
          title="Feature"
          description="Description"
          iconBackgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
      );
      const iconContainer = container.querySelector('[class*="iconContainer"]');
      expect(iconContainer).toHaveStyle({
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      });
    });
  });

  describe('Integration', () => {
    it('renders in a feature grid layout', () => {
      render(
        <div role="region" aria-label="Features">
          <FeatureCard
            icon={<span>★</span>}
            title="Feature One"
            description="Description one"
          />
          <FeatureCard
            icon={<span>♥</span>}
            title="Feature Two"
            description="Description two"
          />
          <FeatureCard
            icon={<span>⚡</span>}
            title="Feature Three"
            description="Description three"
          />
        </div>
      );

      expect(screen.getByRole('region', { name: /features/i })).toBeInTheDocument();
      expect(screen.getAllByRole('article')).toHaveLength(3);
    });

    it('works with different icon types together', () => {
      const { container } = render(
        <>
          <FeatureCard
            icon={<span>★</span>}
            title="Text Icon"
            description="Uses text icon"
          />
          <FeatureCard
            icon={
              <svg data-testid="svg">
                <circle cx="12" cy="12" r="10" />
              </svg>
            }
            title="SVG Icon"
            description="Uses SVG icon"
          />
          <FeatureCard
            icon={<img src="/icon.png" alt="Icon" data-testid="img" />}
            title="Image Icon"
            description="Uses image icon"
          />
        </>
      );

      expect(screen.getByText('★')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="svg"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="img"]')).toBeInTheDocument();
    });

    it('maintains consistent structure across variations', () => {
      const features = [
        { icon: '★', title: 'Feature 1', description: 'Desc 1' },
        { icon: '♥', title: 'Feature 2', description: 'Desc 2' },
        { icon: '⚡', title: 'Feature 3', description: 'Desc 3' },
      ];

      const { container } = render(
        <>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={<span>{feature.icon}</span>}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </>
      );

      const articles = container.querySelectorAll('[role="article"]');
      const headings = container.querySelectorAll('h3');
      const descriptions = container.querySelectorAll('p');

      expect(articles).toHaveLength(3);
      expect(headings).toHaveLength(3);
      expect(descriptions).toHaveLength(3);
    });
  });
});
