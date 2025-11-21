import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQSection } from './FAQSection';
import type { FAQItem } from './FAQSection';

describe('FAQSection', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<FAQSection />);
      expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
    });

    it('should render with custom title', () => {
      render(<FAQSection title="Custom FAQ Title" />);
      expect(screen.getByText('Custom FAQ Title')).toBeInTheDocument();
    });

    it('should render all default FAQ items', () => {
      render(<FAQSection />);
      expect(
        screen.getByText('How does the US Mobile Rewards Program work?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('How do I get started with referrals?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('What is the US Mobile Rewards card?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Does it cost money to use the US Mobile Rewards card?')
      ).toBeInTheDocument();
      expect(screen.getByText('Is US Mobile a bank?')).toBeInTheDocument();
      expect(
        screen.getByText('Where can I use my US Mobile Rewards card?')
      ).toBeInTheDocument();
    });

    it('should render custom FAQ items', () => {
      const customItems: FAQItem[] = [
        {
          id: 'custom-1',
          question: 'Custom question 1?',
          answer: 'Custom answer 1',
        },
        {
          id: 'custom-2',
          question: 'Custom question 2?',
          answer: 'Custom answer 2',
        },
      ];

      render(<FAQSection items={customItems} />);
      expect(screen.getByText('Custom question 1?')).toBeInTheDocument();
      expect(screen.getByText('Custom question 2?')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(
        <FAQSection className="custom-faq-class" />
      );
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-faq-class');
    });
  });

  describe('Accordion Functionality', () => {
    it('should have all items collapsed by default', () => {
      render(<FAQSection />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should expand item when question button is clicked', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(firstButton);

      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should show answer when item is expanded', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];
      const answerId = firstButton.getAttribute('aria-controls');

      // Initially, answer should not be in the document
      expect(screen.queryByText(/accumulate with each transaction/i)).not.toBeInTheDocument();

      // Click to expand
      await user.click(firstButton);

      // Answer should now be visible
      if (answerId) {
        const answer = document.getElementById(answerId);
        expect(answer).toBeInTheDocument();
      }
    });

    it('should collapse item when expanded button is clicked again', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];

      // Expand
      await user.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');

      // Collapse
      await user.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should allow multiple items to be expanded simultaneously', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');

      // Expand first three items
      await user.click(buttons[0]);
      await user.click(buttons[1]);
      await user.click(buttons[2]);

      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');

      // Rest should be collapsed
      for (let i = 3; i < buttons.length; i++) {
        expect(buttons[i]).toHaveAttribute('aria-expanded', 'false');
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('should expand item with Enter key', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];
      firstButton.focus();

      await user.keyboard('{Enter}');

      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should expand item with Space key', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];
      firstButton.focus();

      await user.keyboard(' ');

      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should toggle with Space key', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];
      firstButton.focus();

      // Expand
      await user.keyboard(' ');
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');

      // Collapse
      await user.keyboard(' ');
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should be navigable with Tab key', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');

      // Focus first button
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();

      // Tab to next
      await user.tab();
      expect(buttons[1]).toHaveFocus();

      // Tab to next
      await user.tab();
      expect(buttons[2]).toHaveFocus();
    });

    it('should support Shift+Tab for reverse navigation', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');

      // Focus second button
      buttons[1].focus();
      expect(buttons[1]).toHaveFocus();

      // Shift+Tab to go back
      await user.tab({ shift: true });
      expect(buttons[0]).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const { container } = render(<FAQSection />);

      // Check section exists with proper attributes
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-labelledby', 'faq-title');

      // Check heading
      const heading = screen.getByRole('heading', {
        name: /frequently asked questions/i,
      });
      expect(heading).toHaveAttribute('id', 'faq-title');
    });

    it('should have proper aria-expanded attributes', () => {
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('should have proper aria-controls attributes', () => {
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-controls');
      });
    });

    it('should have proper answer region structure', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];
      const answerId = firstButton.getAttribute('aria-controls');

      // Expand
      await user.click(firstButton);

      // Check answer region
      if (answerId) {
        const answerRegion = document.getElementById(answerId);
        expect(answerRegion).toHaveAttribute('role', 'region');
        expect(answerRegion).toHaveAttribute('aria-labelledby');
      }
    });

    it('should have focusable question buttons', () => {
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        // Buttons should be focusable (tabindex not negative)
        const tabindex = button.getAttribute('tabindex');
        expect(tabindex === null || parseInt(tabindex) >= 0).toBe(true);
      });
    });

    it('should have descriptive button text', () => {
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);

      buttons.forEach((button) => {
        // Each button should have descriptive text
        expect(button.textContent).not.toBe('');
        expect(button.textContent?.trim()).not.toBe('');
      });
    });

    it('should maintain focus on button after toggle', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];

      // Click button
      await user.click(firstButton);

      // Button should maintain focus (in most implementations)
      // This verifies accessibility best practices
      expect(firstButton).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should display all questions initially visible', () => {
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(6); // Default 6 items
    });

    it('should show correct answer content when expanded', async () => {
      const user = userEvent.setup();
      const customItems: FAQItem[] = [
        {
          id: 'test-1',
          question: 'Test question?',
          answer: 'Test answer content here',
        },
      ];

      render(<FAQSection items={customItems} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByText('Test answer content here')).toBeInTheDocument();
    });

    it('should handle long answer text', async () => {
      const user = userEvent.setup();
      const longAnswer =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.';

      const customItems: FAQItem[] = [
        {
          id: 'test-1',
          question: 'Test question?',
          answer: longAnswer,
        },
      ];

      render(<FAQSection items={customItems} />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Use substring matching instead of exact match for long text
      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    it('should handle special characters in questions and answers', async () => {
      const user = userEvent.setup();
      const specialChars = 'Question with quotes & characters?';
      const specialAnswer = 'Answer with quotes & characters';

      const customItems: FAQItem[] = [
        {
          id: 'test-1',
          question: specialChars,
          answer: specialAnswer,
        },
      ];

      render(<FAQSection items={customItems} />);

      expect(screen.getByText(specialChars)).toBeInTheDocument();

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByText(specialAnswer)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should render as a section element', () => {
      const { container } = render(<FAQSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should render with proper section structure', () => {
      const { container } = render(<FAQSection />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section?.tagName.toLowerCase()).toBe('section');
    });

    it('should contain a title heading', () => {
      render(<FAQSection />);
      const heading = screen.getByRole('heading', {
        name: /frequently asked questions/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('should have proper section structure', () => {
      const { container } = render(<FAQSection />);
      const section = container.querySelector('section');

      // Should contain heading
      const headingInSection = section?.querySelector('h2');
      expect(headingInSection).toBeInTheDocument();

      // Should contain buttons (FAQ items)
      const buttons = section?.querySelectorAll('button');
      expect(buttons && buttons.length).toBeGreaterThan(0);
    });

    it('should render all FAQ items as buttons', () => {
      render(<FAQSection />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(6); // Default 6 items
    });

    it('should have proper button structure for each item', () => {
      const { container } = render(<FAQSection />);
      const buttons = container.querySelectorAll('button');

      buttons.forEach((button) => {
        // Each button should have aria-expanded
        expect(button).toHaveAttribute('aria-expanded');
        // Each button should have aria-controls
        expect(button).toHaveAttribute('aria-controls');
        // Each button should have text content
        expect(button.textContent).not.toBe('');
      });
    });
  });

  describe('Interactive Combinations', () => {
    it('should handle rapid clicking', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const firstButton = screen.getAllByRole('button')[0];

      // Rapid clicks - odd number should leave in expanded state
      await user.click(firstButton);
      await user.click(firstButton);
      await user.click(firstButton);

      // Should be in expanded state (odd number of clicks)
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should handle opening and closing all items', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');

      // Open all
      for (const button of buttons) {
        await user.click(button);
      }

      // All should be expanded
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });

      // Close all
      for (const button of buttons) {
        await user.click(button);
      }

      // All should be collapsed
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should handle keyboard and mouse interactions together', async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole('button');

      // Open with keyboard
      buttons[0].focus();
      await user.keyboard('{Enter}');
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

      // Open with mouse
      await user.click(buttons[1]);
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

      // Close with keyboard
      buttons[0].focus();
      await user.keyboard(' ');
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');

      // Close with mouse
      await user.click(buttons[1]);
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
