import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NetworkCoverage } from './NetworkCoverage';

describe('NetworkCoverage Component', () => {
  describe('Rendering', () => {
    it('renders with default title and description', () => {
      render(<NetworkCoverage />);
      expect(screen.getByText('Nationwide Network Coverage')).toBeInTheDocument();
      expect(screen.getByText(/seamless connectivity/)).toBeInTheDocument();
    });

    it('renders title as heading', () => {
      render(<NetworkCoverage />);
      const heading = screen.getByRole('heading', { name: /Nationwide Network Coverage/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders section element', () => {
      const { container } = render(<NetworkCoverage />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders container div', () => {
      const { container } = render(<NetworkCoverage />);
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv).toBeInTheDocument();
    });

    it('renders content section', () => {
      const { container } = render(<NetworkCoverage />);
      const content = container.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
    });

    it('renders illustration section', () => {
      const { container } = render(<NetworkCoverage />);
      const illustration = container.querySelector('[class*="illustration"]');
      expect(illustration).toBeInTheDocument();
    });
  });

  describe('Default Content', () => {
    it('renders with default title and description', () => {
      render(<NetworkCoverage />);
      expect(screen.getByText('Nationwide Network Coverage')).toBeInTheDocument();
      expect(screen.getByText(/seamless connectivity/)).toBeInTheDocument();
    });

    it('renders all six default benefits', () => {
      render(<NetworkCoverage />);
      expect(screen.getByText('Nationwide 4G LTE Coverage')).toBeInTheDocument();
      expect(screen.getByText('Premium 5G Network Access')).toBeInTheDocument();
      expect(screen.getByText('99.9% Network Uptime Guarantee')).toBeInTheDocument();
      expect(screen.getByText('International Roaming in 200+ Countries')).toBeInTheDocument();
      expect(screen.getByText('24/7 Customer Support')).toBeInTheDocument();
      expect(screen.getByText('Fast Switching Between Networks')).toBeInTheDocument();
    });

    it('renders benefits in correct order', () => {
      const { container } = render(<NetworkCoverage />);
      const benefitItems = container.querySelectorAll('li');
      expect(benefitItems.length).toBe(6);
    });

    it('renders check mark icon for each benefit', () => {
      const { container } = render(<NetworkCoverage />);
      const icons = container.querySelectorAll('[class*="icon"]');
      expect(icons.length).toBeGreaterThanOrEqual(6);
      icons.forEach((icon) => {
        expect(icon.textContent).toContain('✓');
      });
    });

    it('renders default illustration image', () => {
      render(<NetworkCoverage />);
      const img = screen.getByAltText('Network coverage visualization');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src');
    });
  });

  describe('Custom Content', () => {
    it('accepts custom title and description', () => {
      render(
        <NetworkCoverage
          title="Custom Title"
          description="Custom description"
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom description')).toBeInTheDocument();
    });

    it('renders custom benefits', () => {
      const customBenefits = ['Benefit 1', 'Benefit 2', 'Benefit 3'];
      render(<NetworkCoverage benefits={customBenefits} />);
      expect(screen.getByText('Benefit 1')).toBeInTheDocument();
      expect(screen.getByText('Benefit 2')).toBeInTheDocument();
      expect(screen.getByText('Benefit 3')).toBeInTheDocument();
      expect(screen.queryByText('Nationwide 4G LTE Coverage')).not.toBeInTheDocument();
    });

    it('renders single custom benefit', () => {
      const customBenefits = ['Single Benefit'];
      const { container } = render(<NetworkCoverage benefits={customBenefits} />);
      expect(screen.getByText('Single Benefit')).toBeInTheDocument();
      const benefitItems = container.querySelectorAll('li');
      expect(benefitItems.length).toBe(1);
    });

    it('renders many custom benefits', () => {
      const manyBenefits = Array.from({ length: 10 }, (_, i) => `Benefit ${i + 1}`);
      render(<NetworkCoverage benefits={manyBenefits} />);
      manyBenefits.forEach((benefit) => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    });

    it('renders custom illustration URL', () => {
      const customUrl = 'https://example.com/custom-coverage.jpg';
      render(<NetworkCoverage illustrationUrl={customUrl} />);
      const img = screen.getByAltText('Network coverage visualization');
      expect(img).toHaveAttribute('src', customUrl);
    });

    it('renders custom illustration with query parameters', () => {
      const customUrl = 'https://example.com/coverage.jpg?w=600&h=600&fit=crop';
      render(<NetworkCoverage illustrationUrl={customUrl} />);
      const img = screen.getByAltText('Network coverage visualization') as HTMLImageElement;
      expect(img.src).toContain('?w=600&h=600&fit=crop');
    });
  });

  describe('Benefits List Structure', () => {
    it('renders benefits as list items', () => {
      const { container } = render(<NetworkCoverage />);
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
    });

    it('renders each benefit in a list item', () => {
      const { container } = render(<NetworkCoverage />);
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(6);
    });

    it('renders benefits with proper structure', () => {
      const { container } = render(<NetworkCoverage />);
      const benefitItems = container.querySelectorAll('[class*="benefit"]');
      benefitItems.forEach((item) => {
        expect(item.querySelector('[class*="icon"]')).toBeInTheDocument();
      });
    });

    it('each benefit contains icon and text', () => {
      const { container } = render(<NetworkCoverage />);
      const benefits = container.querySelectorAll('li');
      benefits.forEach((benefit) => {
        const icon = benefit.querySelector('[class*="icon"]');
        const text = benefit.textContent;
        expect(icon).toBeInTheDocument();
        expect(text).toBeTruthy();
      });
    });
  });

  describe('Illustration Handling', () => {
    it('renders illustration image with correct alt text', () => {
      render(<NetworkCoverage />);
      const img = screen.getByAltText('Network coverage visualization');
      expect(img).toBeInTheDocument();
      expect(img.getAttribute('alt')).toBe('Network coverage visualization');
    });

    it('renders image in illustration container', () => {
      const { container } = render(<NetworkCoverage />);
      const illustration = container.querySelector('[class*="illustration"]');
      const img = illustration?.querySelector('img');
      expect(img).toBeInTheDocument();
    });

    it('uses default illustration URL when not provided', () => {
      render(<NetworkCoverage />);
      const img = screen.getByAltText('Network coverage visualization') as HTMLImageElement;
      expect(img.src).toContain('images.unsplash.com');
    });

    it('respects custom illustration URL', () => {
      const customUrl = 'https://custom-cdn.com/image.jpg';
      render(<NetworkCoverage illustrationUrl={customUrl} />);
      const img = screen.getByAltText('Network coverage visualization') as HTMLImageElement;
      expect(img.src).toBe(customUrl);
    });
  });

  describe('Layout Structure', () => {
    it('has two-column layout with content and illustration', () => {
      const { container } = render(<NetworkCoverage />);
      const section = container.querySelector('section');
      const children = section?.children;
      expect(children).toBeTruthy();
      // Should have container with content and illustration
      expect(container.querySelector('[class*="content"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="illustration"]')).toBeInTheDocument();
    });

    it('renders content before illustration', () => {
      const { container } = render(<NetworkCoverage />);
      const content = container.querySelector('[class*="content"]');
      const illustration = container.querySelector('[class*="illustration"]');
      const contentIndex = Array.from(container.querySelectorAll('[class*="content"], [class*="illustration"]')).indexOf(
        content as Element
      );
      const illustrationIndex = Array.from(
        container.querySelectorAll('[class*="content"], [class*="illustration"]')
      ).indexOf(illustration as Element);
      expect(contentIndex).toBeLessThan(illustrationIndex);
    });
  });

  describe('Accessibility', () => {
    it('has semantic heading structure', () => {
      render(<NetworkCoverage />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Nationwide Network Coverage');
    });

    it('description text is accessible', () => {
      render(<NetworkCoverage />);
      const description = screen.getByText(/seamless connectivity/);
      expect(description).toBeInTheDocument();
    });

    it('all benefits are readable text', () => {
      render(<NetworkCoverage />);
      expect(screen.getByText('Nationwide 4G LTE Coverage')).toBeInTheDocument();
      expect(screen.getByText('Premium 5G Network Access')).toBeInTheDocument();
    });

    it('illustration has descriptive alt text', () => {
      render(<NetworkCoverage />);
      const img = screen.getByAltText('Network coverage visualization');
      expect(img).toHaveAttribute('alt', 'Network coverage visualization');
    });

    it('section element is semantic', () => {
      const { container } = render(<NetworkCoverage />);
      const section = container.querySelector('section');
      expect(section?.tagName).toBe('SECTION');
    });

    it('benefits list is semantic HTML', () => {
      const { container } = render(<NetworkCoverage />);
      const list = container.querySelector('ul');
      const items = list?.querySelectorAll('li');
      expect(list).toBeInTheDocument();
      expect(items?.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty benefits array', () => {
      render(<NetworkCoverage benefits={[]} />);
      expect(screen.getByText('Nationwide Network Coverage')).toBeInTheDocument();
      const { container } = render(<NetworkCoverage benefits={[]} />);
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(0);
    });

    it('renders with very long title', () => {
      const longTitle = 'Comprehensive and Nationwide Network Coverage with Premium Infrastructure';
      render(<NetworkCoverage title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders with very long description', () => {
      const longDesc =
        'Experience seamless connectivity across the entire United States with our premium network infrastructure, featuring cutting-edge technology and reliable service.';
      render(<NetworkCoverage description={longDesc} />);
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it('renders benefits with very long text', () => {
      const longBenefit = 'This is a very long benefit description that should still render properly without any issues or layout breaks';
      render(<NetworkCoverage benefits={[longBenefit]} />);
      expect(screen.getByText(longBenefit)).toBeInTheDocument();
    });

    it('handles special characters in benefits', () => {
      const benefitWithSpecial = 'Coverage in 200+ countries & territories (including US territories)';
      render(<NetworkCoverage benefits={[benefitWithSpecial]} />);
      expect(screen.getByText(benefitWithSpecial)).toBeInTheDocument();
    });

    it('maintains functionality with all custom props', () => {
      const customBenefits = [
        'Custom Benefit 1',
        'Custom Benefit 2',
        'Custom Benefit 3',
      ];
      const customUrl = 'https://example.com/custom.jpg';

      render(
        <NetworkCoverage
          title="Custom Network Coverage"
          description="Custom network description"
          benefits={customBenefits}
          illustrationUrl={customUrl}
        />
      );

      expect(screen.getByText('Custom Network Coverage')).toBeInTheDocument();
      expect(screen.getByText('Custom network description')).toBeInTheDocument();
      customBenefits.forEach((benefit) => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
      const img = screen.getByAltText('Network coverage visualization');
      expect(img).toHaveAttribute('src', customUrl);
    });
  });

  describe('Prop Variations', () => {
    it('renders with title prop only', () => {
      render(<NetworkCoverage title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders with description prop only', () => {
      render(<NetworkCoverage description="Custom Description" />);
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('renders with benefits prop only', () => {
      const benefits = ['Benefit A', 'Benefit B'];
      render(<NetworkCoverage benefits={benefits} />);
      expect(screen.getByText('Benefit A')).toBeInTheDocument();
      expect(screen.getByText('Benefit B')).toBeInTheDocument();
    });

    it('renders with illustrationUrl prop only', () => {
      const url = 'https://custom.com/image.jpg';
      render(<NetworkCoverage illustrationUrl={url} />);
      const img = screen.getByAltText('Network coverage visualization') as HTMLImageElement;
      expect(img.src).toBe(url);
    });

    it('renders with all props provided', () => {
      render(
        <NetworkCoverage
          title="Full Custom"
          description="Complete custom"
          benefits={['Benefit 1', 'Benefit 2']}
          illustrationUrl="https://example.com/image.jpg"
        />
      );
      expect(screen.getByText('Full Custom')).toBeInTheDocument();
      expect(screen.getByText('Complete custom')).toBeInTheDocument();
      expect(screen.getByText('Benefit 1')).toBeInTheDocument();
    });
  });
});
