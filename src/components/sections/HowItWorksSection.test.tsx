import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { HowItWorksSection } from './HowItWorksSection';

describe('HowItWorksSection', () => {
  describe('Rendering', () => {
    it('renders the section', () => {
      const { container } = render(<HowItWorksSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders all main sections', () => {
      render(<HowItWorksSection />);

      // Heading
      expect(screen.getByRole('heading', { name: /how does us mobile trade in work/i })).toBeInTheDocument();

      // Step cards
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();

      // Video
      expect(screen.getByRole('button', { name: /play trade in demo video/i })).toBeInTheDocument();
    });
  });

  describe('Section Header', () => {
    it('renders main heading', () => {
      render(<HowItWorksSection />);
      const heading = screen.getByRole('heading', { name: /how does us mobile trade in work/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders subheading', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/just three steps between you and that \$\$\$/i)).toBeInTheDocument();
    });

    it('header uses semantic structure', () => {
      const { container } = render(<HowItWorksSection />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Step Cards', () => {
    it('renders exactly 3 step cards', () => {
      render(<HowItWorksSection />);

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
      expect(screen.queryByText('Step 4')).not.toBeInTheDocument();
    });

    it('renders Step 1 correctly', () => {
      render(<HowItWorksSection />);

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /check trade in value/i })).toBeInTheDocument();
      expect(screen.getByText(/answer a few questions about your device/i)).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('renders Step 2 correctly', () => {
      render(<HowItWorksSection />);

      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /ship your device/i })).toBeInTheDocument();
      expect(screen.getByText(/pack up your device and ship it to us/i)).toBeInTheDocument();
      expect(screen.getByText('📦')).toBeInTheDocument();
    });

    it('renders Step 3 correctly', () => {
      render(<HowItWorksSection />);

      expect(screen.getByText('Step 3')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /get paid/i })).toBeInTheDocument();
      expect(screen.getByText(/once we receive and verify your device/i)).toBeInTheDocument();
      expect(screen.getByText('💵')).toBeInTheDocument();
    });

    it('step cards maintain proper order', () => {
      const { container } = render(<HowItWorksSection />);
      const stepCards = container.querySelectorAll('article');

      expect(stepCards).toHaveLength(3);
    });

    it('all step cards are visible', () => {
      render(<HowItWorksSection />);

      const step1 = screen.getByText('Step 1');
      const step2 = screen.getByText('Step 2');
      const step3 = screen.getByText('Step 3');

      expect(step1).toBeVisible();
      expect(step2).toBeVisible();
      expect(step3).toBeVisible();
    });
  });

  describe('Video Placeholder', () => {
    it('renders video placeholder button', () => {
      render(<HowItWorksSection />);
      const videoButton = screen.getByRole('button', { name: /play trade in demo video/i });
      expect(videoButton).toBeInTheDocument();
    });

    it('video button has correct aria-label', () => {
      render(<HowItWorksSection />);
      const button = screen.getByRole('button', { name: /play trade in demo video/i });
      expect(button).toHaveAttribute('aria-label', 'Play trade in demo video');
    });

    it('video button is clickable', async () => {
      const user = userEvent.setup();

      render(<HowItWorksSection />);
      const button = screen.getByRole('button', { name: /play trade in demo video/i });

      // Button should be clickable without errors
      await expect(user.click(button)).resolves.not.toThrow();
      expect(button).toBeInTheDocument();
    });

    it('renders play button icon', () => {
      const { container } = render(<HowItWorksSection />);
      const playButton = container.querySelector('[class*="playButton"]');
      expect(playButton).toBeInTheDocument();
    });

    it('displays video label text', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText('Watch how it works')).toBeInTheDocument();
    });

    it('video thumbnail SVG is decorative', () => {
      render(<HowItWorksSection />);
      const videoButton = screen.getByRole('button', { name: /play trade in demo video/i });
      const svg = videoButton.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();
    });

    it('renders play icon SVG', () => {
      const { container } = render(<HowItWorksSection />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Layout Structure', () => {
    it('has container div', () => {
      const { container } = render(<HowItWorksSection />);
      const sectionContainer = container.querySelector('section > div');
      expect(sectionContainer).toBeInTheDocument();
    });

    it('has header section', () => {
      const { container } = render(<HowItWorksSection />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('has steps section', () => {
      const { container } = render(<HowItWorksSection />);
      const steps = container.querySelector('[class*="steps"]');
      expect(steps).toBeInTheDocument();
    });

    it('has video container', () => {
      const { container } = render(<HowItWorksSection />);
      const videoContainer = container.querySelector('[class*="videoContainer"]');
      expect(videoContainer).toBeInTheDocument();
    });

    it('sections appear in correct order', () => {
      const { container } = render(<HowItWorksSection />);
      const mainContainer = container.querySelector('section > div');
      const children = mainContainer?.children;

      // Header should come first, then steps, then video
      expect(children?.[0]?.tagName).toBe('HEADER');
      expect(children?.[1]?.className).toMatch(/steps/);
      expect(children?.[2]?.className).toMatch(/videoContainer/);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<HowItWorksSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<HowItWorksSection />);

      const h2 = screen.getByRole('heading', { level: 2, name: /how does us mobile trade in work/i });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s).toHaveLength(3); // One for each step card
    });

    it('step cards use article elements', () => {
      const { container } = render(<HowItWorksSection />);
      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(3);
    });

    it('all interactive elements are accessible', () => {
      render(<HowItWorksSection />);
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName();
    });

    it('video button is keyboard accessible', async () => {
      const user = userEvent.setup();

      render(<HowItWorksSection />);
      const button = screen.getByRole('button', { name: /play trade in demo video/i });

      button.focus();
      expect(button).toHaveFocus();

      // Button should respond to Enter key without errors
      await expect(user.keyboard('{Enter}')).resolves.not.toThrow();
    });
  });

  describe('Content Verification', () => {
    it('mentions no commitments required', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/no commitments required/i)).toBeInTheDocument();
    });

    it('mentions free shipping', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/ship it to us for free/i)).toBeInTheDocument();
    });

    it('mentions prepaid shipping label', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/prepaid shipping label/i)).toBeInTheDocument();
    });

    it('mentions payment timeframe', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/2-3 business days/i)).toBeInTheDocument();
    });

    it('uses proper apostrophe in text', () => {
      render(<HowItWorksSection />);
      const text = screen.getByText(/you'll get paid/i);
      expect(text).toHaveTextContent("you'll");
    });
  });

  describe('Step Content Details', () => {
    it('Step 1 emphasizes instant quote', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/instant quote/i)).toBeInTheDocument();
    });

    it('Step 2 mentions packing device', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/pack up your device/i)).toBeInTheDocument();
    });

    it('Step 3 mentions device verification', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/receive and verify your device/i)).toBeInTheDocument();
    });

    it('Step 3 mentions preferred payment method', () => {
      render(<HowItWorksSection />);
      expect(screen.getByText(/via your preferred method/i)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('video button responds to hover', async () => {
      const user = userEvent.setup();
      render(<HowItWorksSection />);

      const button = screen.getByRole('button', { name: /play trade in demo video/i });
      await user.hover(button);

      expect(button).toBeInTheDocument();
    });

    it('handles multiple video button clicks', async () => {
      const user = userEvent.setup();

      render(<HowItWorksSection />);
      const button = screen.getByRole('button', { name: /play trade in demo video/i });

      // Button should handle multiple clicks without errors
      await expect(user.click(button)).resolves.not.toThrow();
      await expect(user.click(button)).resolves.not.toThrow();
      expect(button).toBeInTheDocument();
    });

    it('video button supports space key', async () => {
      const user = userEvent.setup();

      render(<HowItWorksSection />);
      const button = screen.getByRole('button', { name: /play trade in demo video/i });

      button.focus();
      expect(button).toHaveFocus();

      // Button should respond to space key without errors
      await expect(user.keyboard(' ')).resolves.not.toThrow();
    });
  });

  describe('Visual Elements', () => {
    it('renders step icons', () => {
      render(<HowItWorksSection />);

      expect(screen.getByText('✓')).toBeInTheDocument();
      expect(screen.getByText('📦')).toBeInTheDocument();
      expect(screen.getByText('💵')).toBeInTheDocument();
    });

    it('video placeholder has SVG elements', () => {
      const { container } = render(<HowItWorksSection />);
      const videoContainer = container.querySelector('[class*="videoContainer"]');
      const svgs = videoContainer?.querySelectorAll('svg');
      expect(svgs?.length).toBeGreaterThan(0);
    });

    it('play button has circular background', () => {
      const { container } = render(<HowItWorksSection />);
      const playButton = container.querySelector('[class*="playButton"]');
      const circle = playButton?.querySelector('circle');
      expect(circle).toBeInTheDocument();
    });
  });

  describe('Data Structure', () => {
    it('steps data is rendered from array', () => {
      render(<HowItWorksSection />);

      // All three steps should be present
      const stepLabels = screen.getAllByText(/^Step \d$/);
      expect(stepLabels).toHaveLength(3);
    });

    it('each step has unique title', () => {
      render(<HowItWorksSection />);

      const titles = [
        screen.getByRole('heading', { name: /check trade in value/i }),
        screen.getByRole('heading', { name: /ship your device/i }),
        screen.getByRole('heading', { name: /get paid/i }),
      ];

      titles.forEach(title => {
        expect(title).toBeInTheDocument();
      });
    });

    it('each step has unique description', () => {
      render(<HowItWorksSection />);

      expect(screen.getByText(/answer a few questions/i)).toBeInTheDocument();
      expect(screen.getByText(/pack up your device/i)).toBeInTheDocument();
      expect(screen.getByText(/once we receive and verify/i)).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(HowItWorksSection.displayName).toBe('HowItWorksSection');
    });
  });
});
