import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  describe('Rendering', () => {
    it('renders the hero section with correct semantic HTML', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders all main content elements', () => {
      render(<HeroSection />);

      // Badge
      expect(screen.getByText('Agna liqua!')).toBeInTheDocument();

      // Headline
      expect(screen.getByRole('heading', { name: /at auctor urna nunci/i })).toBeInTheDocument();

      // Subheadline
      expect(screen.getByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument();

      // Description
      expect(screen.getByText(/sed do eiusmod tempor/i)).toBeInTheDocument();

      // CTA button
      expect(screen.getByRole('button', { name: /check trade-in value/i })).toBeInTheDocument();
    });

    it('renders without errors', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<HeroSection />);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('renders with container structure', () => {
      const { container } = render(<HeroSection />);
      const sectionElement = container.querySelector('section');
      const containerDiv = sectionElement?.firstElementChild;

      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv?.children.length).toBe(2); // content + imagePlaceholder
    });
  });

  describe('Badge Component', () => {
    it('renders badge with correct text', () => {
      render(<HeroSection />);
      const badge = screen.getByText('Agna liqua!');
      expect(badge).toBeInTheDocument();
    });

    it('badge has correct role for screen readers', () => {
      render(<HeroSection />);
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });

    it('badge has accessible label', () => {
      render(<HeroSection />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAccessibleName('Announcement');
    });

    it('badge is a span element', () => {
      render(<HeroSection />);
      const badge = screen.getByText('Agna liqua!');
      expect(badge.tagName).toBe('SPAN');
    });
  });

  describe('Headline', () => {
    it('renders main headline text', () => {
      render(<HeroSection />);
      expect(screen.getByText('At auctor urna nunci')).toBeInTheDocument();
    });

    it('headline is an h1 element', () => {
      render(<HeroSection />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('At auctor urna nunci');
    });

    it('headline has correct id for aria-labelledby', () => {
      const { container } = render(<HeroSection />);
      const heading = container.querySelector('h1');
      expect(heading).toHaveAttribute('id', 'hero-heading');
    });

    it('renders decorative underline SVG', () => {
      const { container } = render(<HeroSection />);
      const headlineGroup = container.querySelector('[class*="headlineGroup"]');
      const svg = headlineGroup?.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('underline SVG has correct dimensions', () => {
      const { container } = render(<HeroSection />);
      const svg = container.querySelector('svg[width="213"]');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('height', '7');
      expect(svg).toHaveAttribute('viewBox', '0 0 213 7');
    });

    it('underline SVG contains path element', () => {
      const { container } = render(<HeroSection />);
      const headlineGroup = container.querySelector('[class*="headlineGroup"]');
      const path = headlineGroup?.querySelector('svg path');

      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('stroke', 'white');
      expect(path).toHaveAttribute('stroke-width', '2');
    });
  });

  describe('Subheadline', () => {
    it('renders subheadline text', () => {
      render(<HeroSection />);
      const subheadline = screen.getByText('Lorem ipsum dolor sit amet, consectetur adi');
      expect(subheadline).toBeInTheDocument();
    });

    it('subheadline is a paragraph element', () => {
      render(<HeroSection />);
      const subheadline = screen.getByText('Lorem ipsum dolor sit amet, consectetur adi');
      expect(subheadline.tagName).toBe('P');
    });

    it('subheadline has correct CSS class', () => {
      const { container } = render(<HeroSection />);
      const subheadline = container.querySelector('[class*="subheadline"]');
      expect(subheadline).toBeInTheDocument();
      expect(subheadline).toHaveTextContent('Lorem ipsum dolor sit amet, consectetur adi');
    });
  });

  describe('Description Text', () => {
    it('renders description text', () => {
      render(<HeroSection />);
      const description = screen.getByText(/sed do eiusmod tempor incididunt/i);
      expect(description).toBeInTheDocument();
    });

    it('description is a paragraph element', () => {
      render(<HeroSection />);
      const description = screen.getByText(/sed do eiusmod tempor incididunt/i);
      expect(description.tagName).toBe('P');
    });

    it('description contains complete text', () => {
      render(<HeroSection />);
      const description = screen.getByText(
        /sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ac placerat vestibulum lectus mauris./i
      );
      expect(description).toBeInTheDocument();
    });

    it('description has correct CSS class', () => {
      const { container } = render(<HeroSection />);
      const description = container.querySelector('[class*="description"]');
      expect(description).toBeInTheDocument();
    });
  });

  describe('CTA Button', () => {
    it('renders CTA button with correct text', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /check trade-in value/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Check trade-in value');
    });

    it('button has correct type attribute', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('button is not disabled', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('button text is in a span element', () => {
      const { container } = render(<HeroSection />);
      const button = container.querySelector('button');
      const textSpan = button?.querySelector('[class*="buttonText"]');

      expect(textSpan).toBeInTheDocument();
      expect(textSpan).toHaveTextContent('Check trade-in value');
    });

    it('button contains arrow icon SVG', () => {
      const { container } = render(<HeroSection />);
      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('arrow icon has correct dimensions', () => {
      const { container } = render(<HeroSection />);
      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');

      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    });

    it('arrow icon uses currentColor for stroke', () => {
      const { container } = render(<HeroSection />);
      const button = container.querySelector('button');
      const path = button?.querySelector('svg path');

      expect(path).toHaveAttribute('stroke', 'currentColor');
    });

    it('button is visible', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).toBeVisible();
    });
  });

  describe('Image Placeholder', () => {
    it('renders image placeholder element', () => {
      const { container } = render(<HeroSection />);
      const imagePlaceholder = container.querySelector('[class*="imagePlaceholder"]');
      expect(imagePlaceholder).toBeInTheDocument();
    });

    it('image placeholder has img role', () => {
      const { container } = render(<HeroSection />);
      const imagePlaceholder = container.querySelector('[role="img"]');
      expect(imagePlaceholder).toBeInTheDocument();
    });

    it('image placeholder has accessible label', () => {
      const { container } = render(<HeroSection />);
      const imagePlaceholder = container.querySelector('[role="img"]');
      expect(imagePlaceholder).toHaveAttribute('aria-label', 'Product showcase image');
    });

    it('renders placeholder content', () => {
      const { container } = render(<HeroSection />);
      const placeholderContent = container.querySelector('[class*="placeholderContent"]');
      expect(placeholderContent).toBeInTheDocument();
    });

    it('displays placeholder text', () => {
      render(<HeroSection />);
      const placeholderText = screen.getByText('Image Placeholder');
      expect(placeholderText).toBeInTheDocument();
    });

    it('placeholder text is in a span element', () => {
      const { container } = render(<HeroSection />);
      const placeholderText = container.querySelector('[class*="placeholderText"]');
      expect(placeholderText?.tagName).toBe('SPAN');
    });
  });

  describe('User Interactions', () => {
    it('button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.click(button);

      // Button remains in document after click
      expect(button).toBeInTheDocument();
    });

    it('button is keyboard accessible with Tab', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.tab();

      expect(button).toHaveFocus();
    });

    it('button responds to Enter key', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');

      // Button should still exist after Enter
      expect(button).toBeInTheDocument();
    });

    it('button responds to Space key', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');

      expect(button).toBeInTheDocument();
    });

    it('button maintains focus after click', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.click(button);

      // Button should still be focusable
      button.focus();
      expect(button).toHaveFocus();
    });

    it('handles multiple clicks without errors', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('button hover does not cause errors', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.hover(button);
      await user.unhover(button);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('section has aria-labelledby pointing to heading', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
    });

    it('has proper heading hierarchy with single h1', () => {
      const { container } = render(<HeroSection />);
      const headings = container.querySelectorAll('h1');
      expect(headings).toHaveLength(1);
    });

    it('heading is properly associated with section', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      const heading = container.querySelector('h1');

      expect(section).toHaveAttribute('aria-labelledby', heading?.id || '');
    });

    it('all interactive elements have accessible names', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Check trade-in value');
    });

    it('badge has appropriate role and accessible name', () => {
      render(<HeroSection />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAccessibleName('Announcement');
    });

    it('decorative SVG elements are hidden from screen readers', () => {
      const { container } = render(<HeroSection />);
      const svgs = container.querySelectorAll('svg');

      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('all text content is accessible and visible', () => {
      render(<HeroSection />);

      expect(screen.getByText('Agna liqua!')).toBeVisible();
      expect(screen.getByText('At auctor urna nunci')).toBeVisible();
      expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adi')).toBeVisible();
      expect(screen.getByText(/sed do eiusmod tempor/i)).toBeVisible();
      expect(screen.getByRole('button')).toBeVisible();
    });

    it('image placeholder has img role with descriptive label', () => {
      const { container } = render(<HeroSection />);
      const imagePlaceholder = container.querySelector('[role="img"]');

      expect(imagePlaceholder).toBeInTheDocument();
      expect(imagePlaceholder).toHaveAttribute('aria-label', 'Product showcase image');
    });

    it('button is keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);

      await user.tab();
      const button = screen.getByRole('button');
      expect(button).toHaveFocus();
    });

    it('no elements have empty alt text or labels', () => {
      const { container } = render(<HeroSection />);
      const elementsWithAlt = container.querySelectorAll('[alt=""]');
      const elementsWithLabel = container.querySelectorAll('[aria-label=""]');

      expect(elementsWithAlt).toHaveLength(0);
      expect(elementsWithLabel).toHaveLength(0);
    });
  });

  describe('Layout Structure', () => {
    it('has main container div', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      const containerDiv = section?.firstElementChild;

      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv?.children.length).toBe(2);
    });

    it('container has content section', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
    });

    it('container has image placeholder section', () => {
      const { container } = render(<HeroSection />);
      const imagePlaceholder = container.querySelector('[class*="imagePlaceholder"]');
      expect(imagePlaceholder).toBeInTheDocument();
    });

    it('content and image placeholder are siblings', () => {
      const { container } = render(<HeroSection />);
      const mainContainer = container.querySelector('section > div');
      const content = mainContainer?.querySelector('[class*="content"]');
      const imagePlaceholder = mainContainer?.querySelector('[class*="imagePlaceholder"]');

      expect(content).toBeInTheDocument();
      expect(imagePlaceholder).toBeInTheDocument();
      expect(content?.parentElement).toBe(imagePlaceholder?.parentElement);
    });

    it('content section contains all text elements', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');

      const badge = content?.querySelector('[class*="badge"]');
      const headline = content?.querySelector('h1');
      const button = content?.querySelector('button');

      expect(badge).toBeInTheDocument();
      expect(headline).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('elements appear in correct order', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');
      const children = Array.from(content?.children || []);

      // Badge should come first
      expect(children[0].className).toContain('badge');

      // Headline group should come second
      expect(children[1].className).toContain('headlineGroup');

      // Button should come last
      const button = children[children.length - 1];
      expect(button?.tagName).toBe('BUTTON');
    });
  });

  describe('Content Verification', () => {
    it('contains all required text content', () => {
      render(<HeroSection />);

      // Badge
      expect(screen.getByText('Agna liqua!')).toBeInTheDocument();

      // Headline
      expect(screen.getByText('At auctor urna nunci')).toBeInTheDocument();

      // Subheadline
      expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adi')).toBeInTheDocument();

      // Description
      expect(
        screen.getByText(
          /sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ac placerat vestibulum lectus mauris./i
        )
      ).toBeInTheDocument();

      // Button
      expect(screen.getByText('Check trade-in value')).toBeInTheDocument();

      // Placeholder
      expect(screen.getByText('Image Placeholder')).toBeInTheDocument();
    });

    it('has clear call-to-action', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Check trade-in value');
    });

    it('maintains consistent messaging tone', () => {
      render(<HeroSection />);

      // Check that text is present and readable
      const subheadline = screen.getByText('Lorem ipsum dolor sit amet, consectetur adi');
      const description = screen.getByText(/sed do eiusmod tempor/i);

      expect(subheadline).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('renders all content regardless of viewport', () => {
      render(<HeroSection />);

      // All elements should be present
      expect(screen.getByText('Agna liqua!')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Image Placeholder')).toBeInTheDocument();
    });

    it('all CSS classes are applied correctly', () => {
      const { container } = render(<HeroSection />);

      expect(container.querySelector('[class*="hero"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="content"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="badge"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="headlineGroup"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="headline"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="underline"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="subheadline"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="description"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="ctaButton"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="imagePlaceholder"]')).toBeInTheDocument();
    });

    it('component maintains structure integrity', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');

      // Should have one main container
      expect(section?.children.length).toBe(1);

      // Container should have two children (content + image)
      const mainContainer = section?.firstElementChild;
      expect(mainContainer?.children.length).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    it('renders with default content when no props provided', () => {
      render(<HeroSection />);

      // Component should render successfully
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
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

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(HeroSection.displayName).toBe('HeroSection');
    });

    it('displayName is a string', () => {
      expect(typeof HeroSection.displayName).toBe('string');
    });
  });

  describe('SVG Elements', () => {
    it('all SVG elements are properly structured', () => {
      const { container } = render(<HeroSection />);
      const svgs = container.querySelectorAll('svg');

      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('viewBox');
        expect(svg).toHaveAttribute('fill', 'none');
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('underline SVG has correct stroke properties', () => {
      const { container } = render(<HeroSection />);
      const underlinePath = container.querySelector('[class*="underline"] path');

      expect(underlinePath).toHaveAttribute('stroke', 'white');
      expect(underlinePath).toHaveAttribute('stroke-width', '2');
      expect(underlinePath).toHaveAttribute('stroke-linecap', 'round');
    });

    it('button icon SVG has correct stroke properties', () => {
      const { container } = render(<HeroSection />);
      const buttonPath = container.querySelector('button svg path');

      expect(buttonPath).toHaveAttribute('stroke', 'currentColor');
      expect(buttonPath).toHaveAttribute('stroke-width', '2');
      expect(buttonPath).toHaveAttribute('stroke-linecap', 'round');
      expect(buttonPath).toHaveAttribute('stroke-linejoin', 'round');
    });
  });

  describe('Component Props and TypeScript', () => {
    it('is a functional component', () => {
      expect(typeof HeroSection).toBe('function');
    });

    it('renders as expected with no props', () => {
      const { container } = render(<HeroSection />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
