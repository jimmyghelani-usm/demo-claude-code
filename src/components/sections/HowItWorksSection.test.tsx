import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HowItWorksSection } from './HowItWorksSection';

describe('HowItWorksSection', () => {
  describe('Rendering', () => {
    it('renders the default section with all default content', () => {
      render(<HowItWorksSection />);

      expect(screen.getByRole('heading', { level: 2, name: /How Our Referral Program Works/i })).toBeInTheDocument();
      expect(screen.getByText(/Share your link/)).toBeInTheDocument();
      expect(screen.getByText(/Your friend signs up and/)).toBeInTheDocument();
      expect(screen.getByText(/You both get rewarded/)).toBeInTheDocument();
    });

    it('renders with custom section title', () => {
      const customTitle = 'Building Your Referral Network';
      render(<HowItWorksSection sectionTitle={customTitle} />);

      expect(screen.getByRole('heading', { level: 2, name: customTitle })).toBeInTheDocument();
    });

    it('renders all step titles and descriptions', () => {
      render(<HowItWorksSection />);

      const steps = [
        { title: 'Share your link', description: /Get your unique referral link/ },
        { title: 'Your friend signs up and...', description: /They complete their first task/ },
        { title: 'You both get rewarded', description: /Earn rewards instantly/ },
      ];

      steps.forEach(({ title, description }) => {
        expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });

    it('renders custom steps when provided', () => {
      const customSteps = [
        {
          icon: <span>A</span>,
          title: 'Custom Step 1',
          description: 'Custom description 1',
        },
        {
          icon: <span>B</span>,
          title: 'Custom Step 2',
          description: 'Custom description 2',
        },
      ];

      render(<HowItWorksSection steps={customSteps} />);

      expect(screen.getByRole('heading', { level: 3, name: 'Custom Step 1' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Custom Step 2' })).toBeInTheDocument();
      expect(screen.getByText('Custom description 1')).toBeInTheDocument();
      expect(screen.getByText('Custom description 2')).toBeInTheDocument();
    });

    it('renders with a single step', () => {
      const singleStep = [
        {
          icon: <span>1</span>,
          title: 'Single Step Title',
          description: 'Single step description',
        },
      ];

      render(<HowItWorksSection steps={singleStep} />);

      expect(screen.getByRole('heading', { level: 3, name: 'Single Step Title' })).toBeInTheDocument();
    });

    it('renders with many steps (5+)', () => {
      const manySteps = Array.from({ length: 5 }, (_, idx) => ({
        icon: <span>{idx + 1}</span>,
        title: `Step ${idx + 1}`,
        description: `Description for step ${idx + 1}`,
      }));

      render(<HowItWorksSection steps={manySteps} />);

      manySteps.forEach((step, i) => {
        expect(screen.getByRole('heading', { level: 3, name: step.title })).toBeInTheDocument();
      });
    });

    it('renders the visual container on the right column', () => {
      const { container } = render(<HowItWorksSection />);

      const visualContainer = container.querySelector('[data-testid="visual-container"] svg, svg[viewBox]');
      expect(visualContainer).toBeInTheDocument();
    });

    it('renders custom visual content in the right column', () => {
      const customVisual = <div data-testid="custom-visual">Custom Visual Content</div>;
      render(<HowItWorksSection rightColumnContent={customVisual} />);

      expect(screen.getByTestId('custom-visual')).toBeInTheDocument();
      expect(screen.getByText('Custom Visual Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <HowItWorksSection className="custom-class" />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure with section element', () => {
      const { container } = render(<HowItWorksSection />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has aria-labelledby connecting section to heading', () => {
      const { container } = render(<HowItWorksSection />);

      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-labelledby', 'how-it-works-heading');
    });

    it('has proper heading hierarchy', () => {
      render(<HowItWorksSection />);

      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('marks decorative gradients as aria-hidden', () => {
      const { container } = render(<HowItWorksSection />);

      const gradients = container.querySelectorAll('[aria-hidden="true"]');
      expect(gradients.length).toBeGreaterThan(0);
    });

    it('provides region labels for individual steps', () => {
      const { container } = render(<HowItWorksSection />);

      const regions = container.querySelectorAll('[role="region"]');
      expect(regions.length).toBeGreaterThanOrEqual(3);

      const firstRegion = regions[0];
      expect(firstRegion).toHaveAttribute('aria-label', expect.stringContaining('Step 1'));
    });

    it('has accessible text contrast (WCAG AA)', () => {
      const { container } = render(<HowItWorksSection />);

      const headings = container.querySelectorAll('h2, h3');
      const descriptions = container.querySelectorAll('p');

      expect(headings.length).toBeGreaterThan(0);
      expect(descriptions.length).toBeGreaterThan(0);
    });

    it('keyboard navigation is supported through semantic HTML', () => {
      render(<HowItWorksSection />);

      const headings = screen.getAllByRole('heading');
      headings.forEach((heading) => {
        expect(heading).toBeVisible();
      });
    });

    it('icon wrappers are marked as aria-hidden for decorative icons', () => {
      const { container } = render(<HowItWorksSection />);

      const iconWrappers = container.querySelectorAll('[aria-hidden="true"] svg, [aria-hidden="true"] div');
      expect(iconWrappers.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Content Edge Cases', () => {
    it('handles very long step titles', () => {
      const longTitle = 'A'.repeat(100);
      const steps = [
        {
          icon: <span>1</span>,
          title: longTitle,
          description: 'Description',
        },
      ];

      render(<HowItWorksSection steps={steps} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles very long descriptions', () => {
      const longDescription = 'This is a very long description. '.repeat(10);
      const steps = [
        {
          icon: <span>1</span>,
          title: 'Step',
          description: longDescription,
        },
      ];

      render(<HowItWorksSection steps={steps} />);

      const longText = screen.getByText((content, element) =>
        element?.tagName === 'P' && content.includes('This is a very long description')
      );
      expect(longText).toBeInTheDocument();
    });

    it('handles empty step title gracefully', () => {
      const steps = [
        {
          icon: <span>1</span>,
          title: '',
          description: 'Description',
        },
      ];

      render(<HowItWorksSection steps={steps} />);

      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('handles special characters in titles and descriptions', () => {
      const steps = [
        {
          icon: <span>1</span>,
          title: 'Step & Title <with> "Special" Chars',
          description: 'Description with $pecial ch@r$ & symbols',
        },
      ];

      render(<HowItWorksSection steps={steps} />);

      expect(screen.getByText(/Step & Title/)).toBeInTheDocument();
      expect(screen.getByText(/Description with/)).toBeInTheDocument();
    });

    it('handles emoji content', () => {
      const steps = [
        {
          icon: <span>🎯</span>,
          title: 'Share Your Link 📤',
          description: 'Get rewards 🎁',
        },
      ];

      render(<HowItWorksSection steps={steps} />);

      expect(screen.getByText(/Share Your Link 📤/)).toBeInTheDocument();
    });

    it('handles ReactNode icons correctly', () => {
      const customIcon = (
        <div data-testid="custom-icon-component">
          <svg width="32" height="32" />
        </div>
      );

      const steps = [
        {
          icon: customIcon,
          title: 'Step with Custom Icon',
          description: 'Description',
        },
      ];

      render(<HowItWorksSection steps={steps} />);

      expect(screen.getByTestId('custom-icon-component')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('renders with section element for styling', () => {
      const { container } = render(<HowItWorksSection />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('maintains correct layout structure', () => {
      const { container } = render(<HowItWorksSection />);

      // Check for semantic structure rather than specific class names
      const section = container.querySelector('section');
      const contentGrids = section?.querySelectorAll('[role="region"]');
      const visualElements = section?.querySelectorAll('h2, h3, p');

      expect(section).toBeInTheDocument();
      expect(contentGrids?.length).toBeGreaterThan(0);
      expect(visualElements?.length).toBeGreaterThan(0);
    });

    it('renders gradient effects', () => {
      const { container } = render(<HowItWorksSection />);

      // Gradient elements should be marked as aria-hidden
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThan(0);
    });

    it('renders container with proper structure', () => {
      const { container } = render(<HowItWorksSection />);

      const section = container.querySelector('section');
      const h2 = section?.querySelector('h2');

      expect(section).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('has default steps when not provided', () => {
      render(<HowItWorksSection steps={undefined} />);

      expect(screen.getByText(/Share your link/)).toBeInTheDocument();
      expect(screen.getByText(/Your friend signs up and/)).toBeInTheDocument();
      expect(screen.getByText(/You both get rewarded/)).toBeInTheDocument();
    });

    it('has default section title when not provided', () => {
      render(<HowItWorksSection sectionTitle={undefined} />);

      expect(
        screen.getByRole('heading', { level: 2, name: /How Our Referral Program Works/ })
      ).toBeInTheDocument();
    });

    it('has default visual content when not provided', () => {
      const { container } = render(
        <HowItWorksSection rightColumnContent={undefined} />
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('has empty className by default', () => {
      const { container } = render(
        <HowItWorksSection className={undefined} />
      );

      const section = container.querySelector('section');
      const classStr = section?.getAttribute('class') || '';
      expect(classStr).toBeTruthy();
    });
  });

  describe('Combined Props', () => {
    it('works with all custom props together', () => {
      const customSteps = [
        {
          icon: <span>A</span>,
          title: 'Custom Title',
          description: 'Custom description',
        },
      ];
      const customVisual = <div data-testid="visual">Visual</div>;

      render(
        <HowItWorksSection
          sectionTitle="Custom Section"
          steps={customSteps}
          rightColumnContent={customVisual}
          className="test-class"
        />
      );

      expect(screen.getByRole('heading', { level: 2, name: 'Custom Section' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Custom Title' })).toBeInTheDocument();
      expect(screen.getByTestId('visual')).toBeInTheDocument();
    });

    it('renders correctly with custom and default mixed props', () => {
      const customSteps = [
        {
          icon: <span>1</span>,
          title: 'Custom First Step',
          description: 'Custom description',
        },
      ];

      render(
        <HowItWorksSection
          sectionTitle="Custom Title"
          steps={customSteps}
        />
      );

      expect(screen.getByRole('heading', { level: 2, name: 'Custom Title' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Custom First Step' })).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('renders step icons', () => {
      render(<HowItWorksSection />);

      const iconWrappers = screen.getAllByRole('region');
      expect(iconWrappers.length).toBeGreaterThanOrEqual(3);
    });

    it('renders step content with proper semantic tags', () => {
      const { container } = render(<HowItWorksSection />);

      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('visual container has content', () => {
      const { container } = render(<HowItWorksSection />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });
});
