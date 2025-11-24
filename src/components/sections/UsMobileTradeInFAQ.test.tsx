import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsMobileTradeInFAQ, type FAQItem } from './UsMobileTradeInFAQ';

const mockFAQItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What devices can I trade in?',
    answer: 'We accept most smartphones, tablets, and smartwatches in working condition.',
  },
  {
    id: 'faq-2',
    question: 'How long does the evaluation process take?',
    answer: 'Our evaluation typically takes 1-2 business days after we receive your device.',
  },
  {
    id: 'faq-3',
    question: 'Can I trade in a device with damage?',
    answer: 'Yes, we evaluate devices with minor to moderate damage.',
  },
  {
    id: 'faq-4',
    question: 'How is the trade-in credit applied?',
    answer: 'Once your device is evaluated and approved, the credit is applied directly to your account.',
  },
];

describe('UsMobileTradeInFAQ', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<UsMobileTradeInFAQ />);

      expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
      expect(screen.getByText(/Find answers to common questions/i)).toBeInTheDocument();
    });

    it('renders with custom title and subtitle', () => {
      const customTitle = 'Custom FAQ Title';
      const customSubtitle = 'Custom FAQ Subtitle';

      render(
        <UsMobileTradeInFAQ
          title={customTitle}
          subtitle={customSubtitle}
        />
      );

      expect(screen.getByRole('heading', { name: customTitle })).toBeInTheDocument();
      expect(screen.getByText(customSubtitle)).toBeInTheDocument();
    });

    it('renders all default FAQ items', () => {
      render(<UsMobileTradeInFAQ />);

      expect(screen.getByText(/What devices can I trade in/i)).toBeInTheDocument();
      expect(screen.getByText(/How long does the evaluation process take/i)).toBeInTheDocument();
      expect(screen.getByText(/Can I trade in a device with damage/i)).toBeInTheDocument();
      expect(screen.getByText(/How is the trade-in credit applied/i)).toBeInTheDocument();
      expect(screen.getByText(/What if I change my mind after shipping/i)).toBeInTheDocument();
      expect(screen.getByText(/Are there any fees for the trade-in service/i)).toBeInTheDocument();
    });

    it('renders with custom FAQ items', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      expect(screen.getByText(/What devices can I trade in/i)).toBeInTheDocument();
      // Answer not visible initially, so we can't check it without clicking
    });

    it('renders FAQ questions as buttons', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(mockFAQItems.length);
    });

    it('does not render answers initially', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      expect(screen.queryByText(/We accept most smartphones/i)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <UsMobileTradeInFAQ className="custom-faq-class" />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-faq-class');
    });

    it('renders with single FAQ item', () => {
      const singleItem: FAQItem[] = [
        { id: 'single', question: 'Question?', answer: 'Answer.' },
      ];

      render(<UsMobileTradeInFAQ items={singleItem} />);

      expect(screen.getByText('Question?')).toBeInTheDocument();
    });

    it('renders with empty FAQ items array', () => {
      const { container } = render(<UsMobileTradeInFAQ items={[]} />);

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('renders with many FAQ items (10+)', () => {
      const manyItems: FAQItem[] = Array.from({ length: 12 }, (_, idx) => ({
        id: `faq-${idx}`,
        question: `Question ${idx + 1}?`,
        answer: `Answer ${idx + 1}`,
      }));

      render(<UsMobileTradeInFAQ items={manyItems} />);

      // Verify button count matches
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(manyItems.length);

      // Verify at least some items are visible
      expect(screen.getByText('Question 1?')).toBeInTheDocument();
      expect(screen.getByText('Question 12?')).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('expands FAQ item on click', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      await user.click(firstButton!);

      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();
    });

    it('collapses FAQ item on second click', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');

      // Expand
      await user.click(firstButton!);
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();

      // Collapse
      await user.click(firstButton!);
      expect(screen.queryByText(/We accept most smartphones/i)).not.toBeInTheDocument();
    });

    it('toggles multiple times correctly', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');

      // First expand
      await user.click(firstButton!);
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();

      // Collapse
      await user.click(firstButton!);
      expect(screen.queryByText(/We accept most smartphones/i)).not.toBeInTheDocument();

      // Expand again
      await user.click(firstButton!);
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();
    });

    it('allows multiple items to be expanded', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      const secondButton = screen.getByText(/How long does the evaluation/i).closest('button');

      await user.click(firstButton!);
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();

      await user.click(secondButton!);
      // Both should remain expanded (no single-item behavior)
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();
      expect(screen.getByText(/Our evaluation typically takes/i)).toBeInTheDocument();
    });

    it('handles rapid click expansion/collapse', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const button = screen.getByText(/What devices can I trade in/i).closest('button');

      await user.click(button!);
      await user.click(button!);
      await user.click(button!);

      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct heading hierarchy', () => {
      render(<UsMobileTradeInFAQ />);

      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent(/Frequently Asked Questions/i);
    });

    it('section has aria-labelledby connecting to title', () => {
      const { container } = render(<UsMobileTradeInFAQ />);

      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-labelledby', 'faq-title');
    });

    it('title has correct id for aria-labelledby', () => {
      render(<UsMobileTradeInFAQ />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveAttribute('id', 'faq-title');
    });

    it('question buttons have aria-expanded attribute', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('aria-expanded is false initially', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('aria-expanded updates to true when expanded', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      await user.click(firstButton!);

      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('aria-expanded updates back to false when collapsed', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      await user.click(firstButton!);
      await user.click(firstButton!);

      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('buttons have aria-controls pointing to answer', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      expect(firstButton).toHaveAttribute('aria-controls', 'faq-1-answer');
    });

    it('answer region has matching id to aria-controls', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      await user.click(firstButton!);

      const answer = screen.getByText(/We accept most smartphones/i);
      const answerRegion = answer.closest('[role="region"]');
      expect(answerRegion).toHaveAttribute('id', 'faq-1-answer');
    });

    it('answer regions have role="region"', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      await user.click(firstButton!);

      const answer = screen.getByText(/We accept most smartphones/i);
      expect(answer.closest('[role="region"]')).toBeInTheDocument();
    });

    it('answer regions have aria-labelledby pointing to button', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      const buttonId = firstButton?.id;
      await user.click(firstButton!);

      const answer = screen.getByText(/We accept most smartphones/i);
      expect(answer.closest('[role="region"]')).toHaveAttribute('aria-labelledby', buttonId);
    });

    it('buttons are type="button"', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('chevron icons have aria-hidden', () => {
      const { container } = render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('buttons are keyboard accessible via Enter', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      firstButton?.focus();
      expect(firstButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();
    });

    it('buttons are keyboard accessible via Space', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      firstButton?.focus();
      expect(firstButton).toHaveFocus();

      await user.keyboard(' ');
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();
    });

    it('can tab through all FAQ items', () => {
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        button.focus();
        expect(button).toHaveFocus();
      });
    });

    it('handles keyboard navigation between items', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');

      buttons[0].focus();
      await user.keyboard('{Enter}');
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();

      buttons[1].focus();
      await user.keyboard('{Enter}');
      expect(screen.getByText(/Our evaluation typically takes/i)).toBeInTheDocument();
    });
  });

  describe('Visual Feedback', () => {
    it('question button adds expanded class when expanded', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const button = screen.getByText(/What devices can I trade in/i).closest('button');
      const classNameBefore = button?.className;

      await user.click(button!);
      const classNameAfter = button?.className;

      expect(classNameAfter).toContain('Expanded');
    });

    it('chevron icon rotates on expansion', async () => {
      const user = userEvent.setup();
      const { container } = render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const button = screen.getByText(/What devices can I trade in/i).closest('button');
      const icon = button?.querySelector('span[aria-hidden="true"]');

      const classNameBefore = icon?.className;
      await user.click(button!);
      const classNameAfter = icon?.className;

      expect(classNameAfter).not.toEqual(classNameBefore);
    });
  });

  describe('Content Edge Cases', () => {
    it('handles special characters in questions', async () => {
      const user = userEvent.setup();
      const items: FAQItem[] = [
        {
          id: 'special',
          question: 'What about & < > " ?',
          answer: 'Answer with & < > " characters',
        },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      expect(screen.getByText(/What about & < > "/)).toBeInTheDocument();

      const button = screen.getByText(/What about & < > "/).closest('button');
      await user.click(button!);

      expect(screen.getByText(/Answer with & < > "/)).toBeInTheDocument();
    });

    it('handles very long question text', () => {
      const longQuestion = 'This is an extremely long question that tests how the component handles very extended question text that might span multiple lines on smaller screens';
      const items: FAQItem[] = [
        { id: '1', question: longQuestion, answer: 'Answer' },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      expect(screen.getByText(longQuestion)).toBeInTheDocument();
    });

    it('handles very long answer text', async () => {
      const user = userEvent.setup();
      const longAnswer = 'This is a very long answer that tests whether the accordion properly displays extended text content without any truncation or overflow issues. '.repeat(3);
      const items: FAQItem[] = [
        { id: '1', question: 'Q?', answer: longAnswer },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByText(new RegExp(longAnswer.slice(0, 50)))).toBeInTheDocument();
    });

    it('handles empty question or answer strings', () => {
      const items: FAQItem[] = [
        { id: '1', question: '', answer: '' },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      const button = screen.getAllByRole('button')[0];
      expect(button).toBeInTheDocument();
    });

    it('handles emoji content', () => {
      const items: FAQItem[] = [
        {
          id: 'emoji',
          question: 'Can I use emoji? 🎉',
          answer: 'Yes! 🚀 Support emoji everywhere 🎊',
        },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      expect(screen.getByText(/Can I use emoji/)).toBeInTheDocument();
    });

    it('handles numeric IDs correctly', async () => {
      const user = userEvent.setup();
      const items: FAQItem[] = [
        { id: '123', question: 'Q1?', answer: 'A1' },
        { id: '456', question: 'Q2?', answer: 'A2' },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      const button1 = screen.getByText('Q1?').closest('button');
      expect(button1).toHaveAttribute('aria-controls', '123-answer');
    });

    it('handles string IDs with special characters', async () => {
      const user = userEvent.setup();
      const items: FAQItem[] = [
        { id: 'faq-special-id', question: 'Q?', answer: 'A' },
      ];

      render(<UsMobileTradeInFAQ items={items} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-controls', 'faq-special-id-answer');
    });
  });

  describe('Layout & Structure', () => {
    it('renders section element with grid layout', () => {
      const { container } = render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();

      const grid = section?.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('renders items in grid structure', () => {
      const { container } = render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const items = container.querySelectorAll('[class*="item"]');
      expect(items.length).toBe(mockFAQItems.length);
    });

    it('each item has question and answer wrapper', async () => {
      const user = userEvent.setup();
      const { container } = render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const button = screen.getByText(/What devices can I trade in/i).closest('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button?.className).toContain('questionButton');

      await user.click(button!);

      const answerWrapper = container.querySelector('[class*="answerWrapper"]');
      expect(answerWrapper).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('renders complete FAQ with all elements', () => {
      render(
        <UsMobileTradeInFAQ
          title="Trade In FAQ"
          subtitle="Common questions about trading in devices"
          items={mockFAQItems}
        />
      );

      expect(screen.getByRole('heading', { name: 'Trade In FAQ' })).toBeInTheDocument();
      expect(screen.getByText('Common questions about trading in devices')).toBeInTheDocument();

      mockFAQItems.forEach((item) => {
        expect(screen.getByText(new RegExp(item.question, 'i'))).toBeInTheDocument();
      });
    });

    it('handles complete user workflow', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      // User can see all questions
      mockFAQItems.forEach((item) => {
        expect(screen.getByText(new RegExp(item.question, 'i'))).toBeInTheDocument();
      });

      // User expands first item
      const firstButton = screen.getByText(/What devices can I trade in/i).closest('button');
      await user.click(firstButton!);
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();

      // User expands another item
      const secondButton = screen.getByText(/How long does the evaluation/i).closest('button');
      await user.click(secondButton!);
      expect(screen.getByText(/Our evaluation typically takes/i)).toBeInTheDocument();

      // Both should still be visible
      expect(screen.getByText(/We accept most smartphones/i)).toBeInTheDocument();

      // User collapses first item
      await user.click(firstButton!);
      expect(screen.queryByText(/We accept most smartphones/i)).not.toBeInTheDocument();

      // Second item remains expanded
      expect(screen.getByText(/Our evaluation typically takes/i)).toBeInTheDocument();
    });

    it('maintains accessibility throughout interaction', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFAQ items={mockFAQItems} />);

      const button = screen.getByText(/What devices can I trade in/i).closest('button');

      // Initial state
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // After expansion
      await user.click(button!);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Can use keyboard to collapse
      button?.focus();
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Default Props', () => {
    it('has default FAQ items when not provided', () => {
      render(<UsMobileTradeInFAQ items={undefined} />);

      expect(screen.getByText(/What devices can I trade in/i)).toBeInTheDocument();
      expect(screen.getByText(/What if I change my mind after shipping/i)).toBeInTheDocument();
    });

    it('has default title when not provided', () => {
      render(<UsMobileTradeInFAQ title={undefined} />);

      expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
    });

    it('has default subtitle when not provided', () => {
      render(<UsMobileTradeInFAQ subtitle={undefined} />);

      expect(screen.getByText(/Find answers to common questions/i)).toBeInTheDocument();
    });
  });
});
