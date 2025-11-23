import { render, screen } from '@testing-library/react';
import { BusinessPageHero } from './BusinessPageHero';

describe('BusinessPageHero', () => {
  describe('Rendering with Props', () => {
    it('renders with default title and subtitle', () => {
      render(<BusinessPageHero />);
      expect(screen.getByText('Welcome to Our Business')).toBeInTheDocument();
      expect(screen.getByText('Discover what we can do for you')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(<BusinessPageHero title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders with custom subtitle', () => {
      render(<BusinessPageHero subtitle="Custom Subtitle" />);
      expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
    });

    it('renders with both custom title and subtitle', () => {
      render(
        <BusinessPageHero
          title="Custom Title"
          subtitle="Custom Subtitle"
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
    });

    it('renders with custom background image', () => {
      const customImage = 'https://example.com/image.jpg';
      const { container } = render(
        <BusinessPageHero backgroundImage={customImage} />
      );
      const background = container.querySelector('[style*="background-image"]');
      expect(background?.getAttribute('style')).toContain(customImage);
    });

    it('uses default background image when not provided', () => {
      const { container } = render(<BusinessPageHero />);
      const background = container.querySelector('[style*="background-image"]');
      expect(background?.getAttribute('style')).toContain(
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
      );
    });

    it('renders with empty string title', () => {
      render(<BusinessPageHero title="" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('');
    });

    it('renders with very long title', () => {
      const longTitle = 'This is a very long title that tests how the hero component handles extended text content';
      render(<BusinessPageHero title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe('Semantic Structure', () => {
    it('renders section element', () => {
      const { container } = render(<BusinessPageHero />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has h1 heading for main title', () => {
      const { container } = render(<BusinessPageHero />);
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
      expect(heading?.tagName).toBe('H1');
    });

    it('heading contains correct default text', () => {
      const { container } = render(<BusinessPageHero />);
      const heading = container.querySelector('h1');
      expect(heading?.textContent).toBe('Welcome to Our Business');
    });

    it('subtitle is rendered as paragraph element', () => {
      const { container } = render(<BusinessPageHero />);
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.tagName).toBe('P');
    });

    it('paragraph contains correct default text', () => {
      const { container } = render(<BusinessPageHero />);
      const paragraph = container.querySelector('p');
      expect(paragraph?.textContent).toBe('Discover what we can do for you');
    });
  });

  describe('Accessibility', () => {
    it('decorative background elements have aria-hidden', () => {
      const { container } = render(<BusinessPageHero />);
      const background = container.querySelector('[aria-hidden="true"]');
      expect(background).toBeInTheDocument();
    });

    it('all decorative overlays are hidden from screen readers', () => {
      const { container } = render(<BusinessPageHero />);
      const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeElements.length).toBeGreaterThan(0);
      // Should have: background, blur overlay, gradient overlay
      expect(decorativeElements.length).toBeGreaterThanOrEqual(3);
    });

    it('heading is accessible via role', () => {
      render(<BusinessPageHero />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('content is accessible to screen readers', () => {
      render(<BusinessPageHero title="Test Title" subtitle="Test Subtitle" />);
      const heading = screen.getByRole('heading', { level: 1, name: 'Test Title' });
      const subtitle = screen.getByText('Test Subtitle');
      expect(heading).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe('Visual Elements and Styling', () => {
    it('renders background image div with correct structure', () => {
      const { container } = render(<BusinessPageHero />);
      const backgroundDiv = container.querySelector('[style*="background-image"]');
      expect(backgroundDiv).toBeInTheDocument();
    });

    it('background image has aria-hidden attribute', () => {
      const { container } = render(<BusinessPageHero />);
      const backgroundDiv = container.querySelector('[style*="background-image"]');
      expect(backgroundDiv).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders blur overlay element', () => {
      const { container } = render(<BusinessPageHero />);
      const decorative = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorative.length).toBeGreaterThanOrEqual(2);
    });

    it('renders gradient overlay element', () => {
      const { container } = render(<BusinessPageHero />);
      const decorative = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorative.length).toBeGreaterThanOrEqual(3);
    });

    it('content is visible and not hidden', () => {
      render(<BusinessPageHero />);
      const title = screen.getByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Discover what we can do for you');
      expect(title).toBeVisible();
      expect(subtitle).toBeVisible();
    });
  });

  describe('Background Image Handling', () => {
    it('sets background image as URL in style attribute', () => {
      const testImage = 'https://example.com/test.jpg';
      const { container } = render(<BusinessPageHero backgroundImage={testImage} />);
      const background = container.querySelector('[style*="background-image"]');
      const style = background?.getAttribute('style');
      expect(style).toContain('url(');
      expect(style).toContain(testImage);
    });

    it('wraps image URL in url() CSS function', () => {
      const testImage = 'https://example.com/test.jpg';
      const { container } = render(<BusinessPageHero backgroundImage={testImage} />);
      const background = container.querySelector('[style*="background-image"]');
      const style = background?.getAttribute('style');
      expect(style).toMatch(/url\(.*\)/);
    });

    it('handles image URLs with query parameters', () => {
      const imageWithParams = 'https://example.com/image.jpg?w=1440&h=738&fit=crop';
      const { container } = render(<BusinessPageHero backgroundImage={imageWithParams} />);
      const background = container.querySelector('[style*="background-image"]');
      expect(background?.getAttribute('style')).toContain(imageWithParams);
    });
  });

  describe('Content Rendering', () => {
    it('renders content wrapper div', () => {
      const { container } = render(<BusinessPageHero />);
      const section = container.querySelector('section');
      const divs = section?.querySelectorAll('div');
      expect(divs).toBeDefined();
      expect(divs!.length).toBeGreaterThan(0);
    });

    it('title and subtitle are rendered within section', () => {
      const { container } = render(<BusinessPageHero />);
      const section = container.querySelector('section');
      const heading = section?.querySelector('h1');
      const paragraph = section?.querySelector('p');
      expect(heading).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });

    it('title appears before subtitle', () => {
      const { container } = render(<BusinessPageHero />);
      const section = container.querySelector('section');
      const allContent = section?.textContent || '';
      const titleIndex = allContent.indexOf('Welcome to Our Business');
      const subtitleIndex = allContent.indexOf('Discover what we can do for you');
      expect(titleIndex).toBeLessThan(subtitleIndex);
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      render(<BusinessPageHero title={undefined} subtitle={undefined} backgroundImage={undefined} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('renders with special characters in title', () => {
      const titleWithSpecialChars = 'Title with & < > " \' characters';
      render(<BusinessPageHero title={titleWithSpecialChars} />);
      expect(screen.getByText(titleWithSpecialChars)).toBeInTheDocument();
    });

    it('renders with multiline subtitle', () => {
      const multilineSubtitle = 'Line one\nLine two\nLine three';
      render(<BusinessPageHero subtitle={multilineSubtitle} />);
      // Use a regex matcher for multiline text
      expect(screen.getByText(/Line one[\s\S]*Line two[\s\S]*Line three/)).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('renders complete hero section with all components', () => {
      const { container } = render(
        <BusinessPageHero
          title="Test Title"
          subtitle="Test Subtitle"
          backgroundImage="https://example.com/image.jpg"
        />
      );
      const section = container.querySelector('section');
      const heading = section?.querySelector('h1');
      const paragraph = section?.querySelector('p');
      const background = container.querySelector('[style*="background-image"]');

      expect(section).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
      expect(background).toBeInTheDocument();
    });

    it('properly combines all visual layers', () => {
      const { container } = render(<BusinessPageHero />);
      const section = container.querySelector('section');
      const children = section?.children;
      // Should have: background, blur overlay, gradient overlay, content
      expect(children!.length).toBeGreaterThanOrEqual(4);
    });
  });
});
