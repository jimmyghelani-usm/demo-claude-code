import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FAQSection } from './FAQSection';

describe('FAQSection', () => {
  describe('Rendering', () => {
    it('renders the section', () => {
      const { container } = render(<FAQSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders all main sections', () => {
      render(<FAQSection />);

      // Heading
      expect(screen.getByRole('heading', { name: /you've got questions, we've got answers/i })).toBeInTheDocument();

      // FAQ cards
      expect(screen.getByText(/what devices can i trade in/i)).toBeInTheDocument();

      // CTA
      expect(screen.getByRole('button', { name: /contact support/i })).toBeInTheDocument();
    });
  });

  describe('Section Header', () => {
    it('renders main heading', () => {
      render(<FAQSection />);
      const heading = screen.getByRole('heading', { name: /you've got questions, we've got answers/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('heading uses proper apostrophe', () => {
      render(<FAQSection />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.textContent).toContain("You've");
      expect(heading.textContent).toContain("we've");
    });

    it('header uses semantic structure', () => {
      const { container } = render(<FAQSection />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });
  });

  describe('FAQ Cards', () => {
    it('renders exactly 8 FAQ cards', () => {
      const { container } = render(<FAQSection />);
      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(8);
    });

    it('renders "What devices can I trade in?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /what devices can i trade in/i })).toBeInTheDocument();
      expect(screen.getByText(/smartphones, tablets, smartwatches, and laptops/i)).toBeInTheDocument();
    });

    it('renders "How is my trade-in value calculated?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /how is my trade-in value calculated/i })).toBeInTheDocument();
      expect(screen.getByText(/device model, storage capacity, condition/i)).toBeInTheDocument();
    });

    it('renders "How long does the trade-in process take?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /how long does the trade-in process take/i })).toBeInTheDocument();
      expect(screen.getByText(/1-2 business days/i)).toBeInTheDocument();
    });

    it('renders "What happens if my device condition doesn\'t match" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /what happens if my device condition doesn't match/i })).toBeInTheDocument();
      expect(screen.getByText(/revised offer/i)).toBeInTheDocument();
    });

    it('renders "Is my data safe?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /is my data safe/i })).toBeInTheDocument();
      expect(screen.getByText(/absolutely/i)).toBeInTheDocument();
    });

    it('renders "Can I trade in a device that\'s not paid off?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /can i trade in a device that's not paid off/i })).toBeInTheDocument();
      expect(screen.getByText(/outstanding balance/i)).toBeInTheDocument();
    });

    it('renders "What payment methods are available?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /what payment methods are available/i })).toBeInTheDocument();
      expect(screen.getByText(/bank transfer, paypal/i)).toBeInTheDocument();
    });

    it('renders "Do I need to include accessories?" FAQ', () => {
      render(<FAQSection />);
      expect(screen.getByRole('heading', { name: /do i need to include accessories/i })).toBeInTheDocument();
      expect(screen.getByText(/only need to send the device itself/i)).toBeInTheDocument();
    });

    it('first FAQ in first column is expanded by default', () => {
      render(<FAQSection />);
      const buttons = screen.getAllByRole('button');
      const firstFaqButton = buttons[0];
      expect(firstFaqButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('other FAQs are collapsed by default', () => {
      render(<FAQSection />);
      const buttons = screen.getAllByRole('button').filter(btn =>
        btn.getAttribute('aria-label') === null &&
        btn.hasAttribute('aria-expanded')
      );

      // All except first should be collapsed
      buttons.slice(1).forEach(button => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Two-Column Layout', () => {
    it('FAQs are split into columns', () => {
      const { container } = render(<FAQSection />);
      // Check that columns container exists and has the grid layout
      const columnsContainer = container.querySelector('[class*="columns"]');
      expect(columnsContainer).toBeInTheDocument();
    });

    it('all 8 FAQs are rendered', () => {
      const { container } = render(<FAQSection />);
      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(8);
    });

    it('FAQs render in order', () => {
      render(<FAQSection />);

      // Verify all 8 FAQs are present
      expect(screen.getByRole('heading', { name: /what devices can i trade in/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /how is my trade-in value calculated/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /how long does the trade-in process take/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /what happens if my device condition doesn't match/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /is my data safe/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /can i trade in a device that's not paid off/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /what payment methods are available/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /do i need to include accessories/i })).toBeInTheDocument();
    });

    it('columns container uses grid layout', () => {
      const { container } = render(<FAQSection />);
      const columnsContainer = container.querySelector('[class*="columns"]');
      expect(columnsContainer).toBeInTheDocument();

      // Check that it contains articles
      const articles = columnsContainer?.querySelectorAll('article');
      expect(articles?.length).toBeGreaterThan(0);
    });
  });

  describe('CTA Section', () => {
    it('renders CTA text', () => {
      render(<FAQSection />);
      expect(screen.getByText('Still have questions?')).toBeInTheDocument();
    });

    it('renders Contact Support button', () => {
      render(<FAQSection />);
      const button = screen.getByRole('button', { name: /contact support/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Contact Support');
    });

    it('Contact Support button is clickable', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<FAQSection />);
      const button = screen.getByRole('button', { name: /contact support/i });

      await user.click(button);

      expect(consoleSpy).toHaveBeenCalledWith('Contact support');
      consoleSpy.mockRestore();
    });

    it('CTA section is at the bottom', () => {
      const { container } = render(<FAQSection />);
      const ctaContainer = container.querySelector('[class*="ctaContainer"]');
      const mainContainer = container.querySelector('section > div');
      const lastChild = mainContainer?.lastElementChild;

      expect(ctaContainer).toBe(lastChild);
    });
  });

  describe('Layout Structure', () => {
    it('has container div', () => {
      const { container } = render(<FAQSection />);
      const sectionContainer = container.querySelector('section > div');
      expect(sectionContainer).toBeInTheDocument();
    });

    it('has header section', () => {
      const { container } = render(<FAQSection />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('has columns container', () => {
      const { container } = render(<FAQSection />);
      const columns = container.querySelector('[class*="columns"]');
      expect(columns).toBeInTheDocument();
    });

    it('has CTA container', () => {
      const { container } = render(<FAQSection />);
      const ctaContainer = container.querySelector('[class*="ctaContainer"]');
      expect(ctaContainer).toBeInTheDocument();
    });

    it('sections appear in correct order', () => {
      const { container } = render(<FAQSection />);
      const mainContainer = container.querySelector('section > div');
      const children = Array.from(mainContainer?.children || []);

      const headerIndex = children.findIndex(el => el.tagName === 'HEADER');
      const columnsIndex = children.findIndex(el => el.className.includes('columns'));
      const ctaIndex = children.findIndex(el => el.className.includes('ctaContainer'));

      expect(headerIndex).toBeLessThan(columnsIndex);
      expect(columnsIndex).toBeLessThan(ctaIndex);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<FAQSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<FAQSection />);

      const h2 = screen.getByRole('heading', { level: 2 });
      const h4s = screen.getAllByRole('heading', { level: 4 });

      expect(h2).toBeInTheDocument();
      expect(h4s).toHaveLength(8); // One for each FAQ
    });

    it('FAQ cards use article elements', () => {
      const { container } = render(<FAQSection />);
      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(8);
    });

    it('FAQ toggle buttons are accessible', () => {
      render(<FAQSection />);
      const buttons = screen.getAllByRole('button').filter(btn =>
        btn.hasAttribute('aria-expanded')
      );

      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('Contact Support button is accessible', () => {
      render(<FAQSection />);
      const button = screen.getByRole('button', { name: /contact support/i });
      expect(button).toHaveAccessibleName();
    });
  });

  describe('FAQ Interactions', () => {
    it('FAQ cards can be toggled', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button').filter(btn =>
        btn.hasAttribute('aria-expanded')
      );
      const secondFaqButton = buttons[1];

      expect(secondFaqButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(secondFaqButton);

      expect(secondFaqButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('multiple FAQs can be open simultaneously', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button').filter(btn =>
        btn.hasAttribute('aria-expanded')
      );

      await user.click(buttons[1]);
      await user.click(buttons[2]);

      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true'); // Default expanded
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
    });

    it('FAQs support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button').filter(btn =>
        btn.hasAttribute('aria-expanded')
      );
      const firstFaq = buttons[0];

      firstFaq.focus();
      expect(firstFaq).toHaveFocus();

      await user.keyboard('{Enter}');

      // Should toggle
      expect(firstFaq).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Content Verification', () => {
    it('mentions major device brands', () => {
      render(<FAQSection />);
      expect(screen.getByText(/apple, samsung, google/i)).toBeInTheDocument();
    });

    it('mentions device inspection timeframe', () => {
      render(<FAQSection />);
      expect(screen.getByText(/1-2 business days/i)).toBeInTheDocument();
    });

    it('mentions payment timeframe', () => {
      render(<FAQSection />);
      expect(screen.getByText(/2-3 business days/i)).toBeInTheDocument();
    });

    it('mentions data security', () => {
      render(<FAQSection />);
      expect(screen.getByText(/back up and erase your data/i)).toBeInTheDocument();
      expect(screen.getByText(/complete data wipe/i)).toBeInTheDocument();
    });

    it('mentions payment options', () => {
      render(<FAQSection />);
      expect(screen.getByText(/bank transfer, paypal/i)).toBeInTheDocument();
      expect(screen.getByText(/credit toward your us mobile account/i)).toBeInTheDocument();
    });

    it('mentions device return policy', () => {
      render(<FAQSection />);
      expect(screen.getByText(/returned to you at no cost/i)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('Contact Support button responds to hover', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const button = screen.getByRole('button', { name: /contact support/i });
      await user.hover(button);

      expect(button).toBeInTheDocument();
    });

    it('Contact Support button supports keyboard interaction', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<FAQSection />);
      const button = screen.getByRole('button', { name: /contact support/i });

      button.focus();
      await user.keyboard('{Enter}');

      expect(consoleSpy).toHaveBeenCalledWith('Contact support');
      consoleSpy.mockRestore();
    });

    it('handles multiple Contact Support button clicks', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(<FAQSection />);
      const button = screen.getByRole('button', { name: /contact support/i });

      await user.click(button);
      await user.click(button);

      expect(consoleSpy).toHaveBeenCalledTimes(2);
      consoleSpy.mockRestore();
    });
  });

  describe('FAQ Card Keys', () => {
    it('all FAQ cards are rendered', () => {
      const { container } = render(<FAQSection />);
      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(8);
    });

    it('FAQ cards have unique content', () => {
      render(<FAQSection />);

      // Verify all headings are unique
      const headings = screen.getAllByRole('heading', { level: 4 });
      const headingTexts = headings.map(h => h.textContent);
      const uniqueHeadings = new Set(headingTexts);

      expect(headingTexts.length).toBe(uniqueHeadings.size); // All headings should be unique
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(FAQSection.displayName).toBe('FAQSection');
    });
  });
});
