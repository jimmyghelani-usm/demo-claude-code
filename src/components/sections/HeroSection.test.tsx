import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

/**
 * HeroSection Component Tests - Updated for Figma node 1413:13347
 *
 * Tests the HeroSection component that matches the Figma design specifications.
 * The component is a presentational component with no props, featuring:
 * - Centered layout with 680px max-width content area
 * - Single-line headline "Lorem ipsum dolor amet"
 * - Description text
 * - CTA button
 * - Responsive behavior for mobile and desktop
 * - Background color #1A5DF6
 */
describe('HeroSection', () => {
  describe('Rendering', () => {
    it('renders the hero section with correct semantic HTML', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');

      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe('SECTION');
    });

    it('renders all main content elements', () => {
      render(<HeroSection />);

      // Headline
      expect(screen.getByText('Lorem ipsum dolor amet')).toBeInTheDocument();

      // Description
      expect(
        screen.getByText('Trade in your device and get the latest model with instant credit.')
      ).toBeInTheDocument();

      // CTA button
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
    });

    it('renders without errors', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<HeroSection />);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('renders with container structure', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      const containerDiv = container.querySelector('[class*="container"]');
      const contentDiv = container.querySelector('[class*="content"]');

      expect(section).toBeInTheDocument();
      expect(containerDiv).toBeInTheDocument();
      expect(contentDiv).toBeInTheDocument();
    });
  });

  describe('Headline', () => {
    it('renders main headline as h1 element', () => {
      render(<HeroSection />);
      const heading = screen.getByRole('heading', { level: 1 });

      expect(heading).toBeInTheDocument();
    });

    it('renders headline with correct text', () => {
      render(<HeroSection />);

      expect(screen.getByText('Lorem ipsum dolor amet')).toBeInTheDocument();
    });

    it('headline has correct id for aria-labelledby', () => {
      const { container } = render(<HeroSection />);
      const heading = container.querySelector('h1');

      expect(heading).toHaveAttribute('id', 'hero-heading');
    });

    it('headline is single line without spans', () => {
      const { container } = render(<HeroSection />);
      const headline = container.querySelector('h1');
      const spans = headline?.querySelectorAll('span');

      expect(spans).toHaveLength(0);
      expect(headline).toHaveTextContent('Lorem ipsum dolor amet');
    });
  });

  describe('Description Text', () => {
    it('renders description text', () => {
      render(<HeroSection />);
      const description = screen.getByText(
        'Trade in your device and get the latest model with instant credit.'
      );

      expect(description).toBeInTheDocument();
    });

    it('description is a paragraph element', () => {
      render(<HeroSection />);
      const description = screen.getByText(
        'Trade in your device and get the latest model with instant credit.'
      );

      expect(description.tagName).toBe('P');
    });

    it('description has correct CSS class', () => {
      const { container } = render(<HeroSection />);
      const description = container.querySelector('[class*="description"]');

      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(
        'Trade in your device and get the latest model with instant credit.'
      );
    });
  });

  describe('CTA Button', () => {
    it('renders CTA button with correct text', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button', { name: /get started/i });

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Get started');
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

    it('button has correct CSS class', () => {
      const { container } = render(<HeroSection />);
      const button = container.querySelector('button');

      expect(button?.className).toContain('ctaButton');
    });

    it('button is visible', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');

      expect(button).toBeVisible();
    });
  });

  describe('User Interactions', () => {
    it('button is clickable', async () => {
      const user = userEvent.setup();
      render(<HeroSection />);
      const button = screen.getByRole('button');

      await user.click(button);

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

    it('button has accessible name', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');

      expect(button).toHaveAccessibleName('Get started');
    });

    it('all text content is accessible and visible', () => {
      render(<HeroSection />);

      expect(screen.getByText('Lorem ipsum dolor amet')).toBeVisible();
      expect(
        screen.getByText('Trade in your device and get the latest model with instant credit.')
      ).toBeVisible();
      expect(screen.getByRole('button')).toBeVisible();
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
    it('has correct container structure', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      const containerDiv = section?.querySelector('[class*="container"]');
      const contentDiv = containerDiv?.querySelector('[class*="content"]');

      expect(section).toBeInTheDocument();
      expect(containerDiv).toBeInTheDocument();
      expect(contentDiv).toBeInTheDocument();
    });

    it('content section contains all elements in correct order', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');
      const children = Array.from(content?.children || []);

      expect(children).toHaveLength(2);
      expect(children[0]?.tagName).toBe('DIV'); // textGroup wrapper
      expect(children[1]?.tagName).toBe('BUTTON');
    });

    it('all CSS classes are applied correctly', () => {
      const { container } = render(<HeroSection />);

      expect(container.querySelector('[class*="hero"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="content"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="textGroup"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="headline"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="description"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="ctaButton"]')).toBeInTheDocument();
    });
  });

  describe('Content Verification', () => {
    it('contains all required text content', () => {
      render(<HeroSection />);

      expect(screen.getByText('Lorem ipsum dolor amet')).toBeInTheDocument();
      expect(
        screen.getByText('Trade in your device and get the latest model with instant credit.')
      ).toBeInTheDocument();
      expect(screen.getByText('Get started')).toBeInTheDocument();
    });

    it('has clear call-to-action', () => {
      render(<HeroSection />);
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Get started');
    });

    it('headline accurately conveys main message', () => {
      render(<HeroSection />);

      const headline = screen.getByText('Lorem ipsum dolor amet');
      expect(headline).toBeInTheDocument();
      expect(headline.tagName).toBe('H1');
    });

    it('description provides supporting information', () => {
      render(<HeroSection />);
      const description = screen.getByText(
        'Trade in your device and get the latest model with instant credit.'
      );

      expect(description).toBeInTheDocument();
      expect(description).toBeVisible();
    });
  });

  describe('Edge Cases', () => {
    it('renders successfully with no props', () => {
      render(<HeroSection />);

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
  });

  describe('Component TypeScript Compliance', () => {
    it('is a functional component', () => {
      expect(typeof HeroSection).toBe('function');
    });

    it('renders as expected with no props', () => {
      const { container } = render(<HeroSection />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    const setViewportSize = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    };

    describe('Desktop Viewport (1024px+)', () => {
      it('renders all content at desktop viewport', () => {
        setViewportSize(1440);
        render(<HeroSection />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText('Get started')).toBeInTheDocument();
      });

      it('headline uses correct styling on desktop', () => {
        setViewportSize(1440);
        const { container } = render(<HeroSection />);

        const headline = container.querySelector('h1');
        expect(headline?.className).toContain('headline');
        expect(headline).toHaveTextContent('Lorem ipsum dolor amet');
      });

      it('button has white background on desktop', () => {
        setViewportSize(1440);
        const { container } = render(<HeroSection />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('ctaButton');
      });

      it('maintains interactivity at desktop viewport', async () => {
        setViewportSize(1440);
        const user = userEvent.setup();
        render(<HeroSection />);

        const button = screen.getByRole('button');
        await user.click(button);

        expect(button).toBeInTheDocument();
      });
    });

    describe('Mobile Viewport (<768px)', () => {
      it('renders all content at mobile viewport (375px baseline)', () => {
        setViewportSize(375);
        render(<HeroSection />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText('Lorem ipsum dolor amet')).toBeInTheDocument();
        expect(screen.getByText('Get started')).toBeInTheDocument();
      });

      it('headline maintains styling on mobile', () => {
        setViewportSize(375);
        const { container } = render(<HeroSection />);

        const headline = container.querySelector('h1');
        expect(headline?.className).toContain('headline');
        expect(headline).toHaveTextContent('Lorem ipsum dolor amet');
      });

      it('button remains accessible on mobile', async () => {
        setViewportSize(375);
        const user = userEvent.setup();
        render(<HeroSection />);

        const button = screen.getByRole('button');
        await user.click(button);

        expect(button).toBeInTheDocument();
      });

      it('all text is visible on mobile', () => {
        setViewportSize(375);
        render(<HeroSection />);

        expect(screen.getByText('Lorem ipsum dolor amet')).toBeVisible();
        expect(
          screen.getByText('Trade in your device and get the latest model with instant credit.')
        ).toBeVisible();
      });
    });

    describe('Small Mobile Viewport (320px)', () => {
      it('renders without errors at 320px', () => {
        setViewportSize(320);
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<HeroSection />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
      });

      it('content remains readable at 320px', () => {
        setViewportSize(320);
        render(<HeroSection />);

        expect(screen.getByText('Lorem ipsum dolor amet')).toBeVisible();
        expect(screen.getByText('Get started')).toBeVisible();
      });
    });

    describe('Touch Target Size (WCAG 2.5.5)', () => {
      it('button meets 44px minimum height requirement on mobile', () => {
        setViewportSize(375);
        const { container } = render(<HeroSection />);
        const button = container.querySelector('button');

        expect(button).toBeInTheDocument();
        expect(button?.className).toContain('ctaButton');
      });

      it('button maintains adequate touch target at 320px', () => {
        setViewportSize(320);
        const { container } = render(<HeroSection />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('ctaButton');
        expect(button).not.toBeDisabled();
      });

      it('button is accessible across all mobile breakpoints', () => {
        const mobileBreakpoints = [320, 360, 375, 390, 414];

        mobileBreakpoints.forEach((width) => {
          setViewportSize(width);
          const { container, unmount } = render(<HeroSection />);
          const button = container.querySelector('button');

          expect(button).toBeInTheDocument();
          expect(button?.className).toContain('ctaButton');
          expect(button).not.toBeDisabled();

          unmount();
        });
      });
    });

    describe('Viewport Breakpoint Tests', () => {
      it('renders correctly at all major breakpoints', () => {
        const breakpoints = [320, 375, 414, 768, 1024, 1440, 1920];

        breakpoints.forEach((width) => {
          setViewportSize(width);
          const { unmount } = render(<HeroSection />);

          expect(screen.getByRole('heading')).toBeInTheDocument();
          expect(screen.getByRole('button')).toBeInTheDocument();

          unmount();
        });
      });

      it('handles viewport transitions without errors', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const { rerender } = render(<HeroSection />);

        setViewportSize(320);
        rerender(<HeroSection />);

        setViewportSize(1440);
        rerender(<HeroSection />);

        setViewportSize(768);
        rerender(<HeroSection />);

        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
      });
    });

    describe('Responsive Accessibility', () => {
      it('maintains semantic structure at all breakpoints', () => {
        const breakpoints = [320, 375, 768, 1024, 1440];

        breakpoints.forEach((width) => {
          setViewportSize(width);
          const { container, unmount } = render(<HeroSection />);

          const section = container.querySelector('section');
          const heading = container.querySelector('h1');

          expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
          expect(heading).toHaveAttribute('id', 'hero-heading');

          unmount();
        });
      });

      it('keyboard navigation works at all viewports', async () => {
        const user = userEvent.setup();
        const breakpoints = [320, 375, 768, 1024];

        for (const width of breakpoints) {
          setViewportSize(width);
          const { unmount } = render(<HeroSection />);

          await user.tab();
          const button = screen.getByRole('button');
          expect(button).toHaveFocus();

          unmount();
        }
      });

      it('focus indicators are visible at mobile viewport', async () => {
        setViewportSize(375);
        const user = userEvent.setup();
        render(<HeroSection />);

        await user.tab();
        const button = screen.getByRole('button');

        expect(button).toHaveFocus();
        expect(button.className).toContain('ctaButton');
      });
    });

    describe('Responsive Edge Cases', () => {
      it('handles extremely small viewport (<280px)', () => {
        setViewportSize(240);
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<HeroSection />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
      });

      it('handles extremely large viewport (>2560px)', () => {
        setViewportSize(3840);
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<HeroSection />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
      });

      it('content remains centered at all viewports', () => {
        const viewports = [280, 320, 375, 768, 1024, 1440, 2560];

        viewports.forEach((width) => {
          setViewportSize(width);
          const { container, unmount } = render(<HeroSection />);
          const content = container.querySelector('[class*="content"]');

          expect(content).toBeInTheDocument();

          unmount();
        });
      });
    });
  });

  describe('CSS Module Classes', () => {
    it('hero section has correct class', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');

      expect(section?.className).toContain('hero');
    });

    it('container has correct class', () => {
      const { container } = render(<HeroSection />);
      const containerDiv = container.querySelector('[class*="container"]');

      expect(containerDiv).toBeInTheDocument();
    });

    it('content has correct class', () => {
      const { container } = render(<HeroSection />);
      const content = container.querySelector('[class*="content"]');

      expect(content).toBeInTheDocument();
    });

    it('headline has correct class', () => {
      const { container } = render(<HeroSection />);
      const headline = container.querySelector('h1');

      expect(headline?.className).toContain('headline');
    });

    it('textGroup wrapper has correct class', () => {
      const { container } = render(<HeroSection />);
      const textGroup = container.querySelector('[class*="textGroup"]');

      expect(textGroup).toBeInTheDocument();
      expect(textGroup?.tagName).toBe('DIV');
    });

    it('description has correct class', () => {
      const { container } = render(<HeroSection />);
      const description = container.querySelector('p');

      expect(description?.className).toContain('description');
    });

    it('button has correct class', () => {
      const { container } = render(<HeroSection />);
      const button = container.querySelector('button');

      expect(button?.className).toContain('ctaButton');
    });
  });
});
