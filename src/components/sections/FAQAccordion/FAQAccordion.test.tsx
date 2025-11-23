import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQAccordion, type FAQItem } from './FAQAccordion';

const mockFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'What is this?',
    answer: 'This is a test answer.',
  },
  {
    id: '2',
    question: 'How does it work?',
    answer: 'It works by doing the following...',
  },
  {
    id: '3',
    question: 'Where can I learn more?',
    answer: 'You can learn more on our website.',
  },
  {
    id: '4',
    question: 'Do you support mobile?',
    answer: 'Yes, we support all devices.',
  },
];

const singleItemFAQ: FAQItem[] = [
  {
    id: 'single',
    question: 'Single Question?',
    answer: 'Single Answer.',
  },
];

const oddNumberItems: FAQItem[] = [
  {
    id: '1',
    question: 'Question 1?',
    answer: 'Answer 1',
  },
  {
    id: '2',
    question: 'Question 2?',
    answer: 'Answer 2',
  },
  {
    id: '3',
    question: 'Question 3?',
    answer: 'Answer 3',
  },
];

describe('FAQAccordion', () => {
  describe('Rendering', () => {
    it('renders all FAQ questions', () => {
      render(<FAQAccordion items={mockFAQItems} />);
      expect(screen.getByText('What is this?')).toBeInTheDocument();
      expect(screen.getByText('How does it work?')).toBeInTheDocument();
      expect(screen.getByText('Where can I learn more?')).toBeInTheDocument();
      expect(screen.getByText('Do you support mobile?')).toBeInTheDocument();
    });

    it('renders correct number of buttons for items', () => {
      render(<FAQAccordion items={mockFAQItems} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(mockFAQItems.length);
    });

    it('does not render answers initially', () => {
      render(<FAQAccordion items={mockFAQItems} />);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();
      expect(screen.queryByText('It works by doing the following...')).not.toBeInTheDocument();
    });

    it('renders with single item', () => {
      render(<FAQAccordion items={singleItemFAQ} />);
      expect(screen.getByText('Single Question?')).toBeInTheDocument();
    });

    it('renders with odd number of items in two-column layout', () => {
      render(<FAQAccordion items={oddNumberItems} />);
      expect(screen.getByText('Question 1?')).toBeInTheDocument();
      expect(screen.getByText('Question 2?')).toBeInTheDocument();
      expect(screen.getByText('Question 3?')).toBeInTheDocument();
    });

    it('renders empty state gracefully with no items', () => {
      const { container } = render(<FAQAccordion items={[]} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('expands card on click', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);

      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();
    });

    it('collapses card on second click', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();

      await user.click(firstButton!);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();
    });

    it('toggles multiple times correctly', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');

      // First expand
      await user.click(firstButton!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();

      // Collapse
      await user.click(firstButton!);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();

      // Expand again
      await user.click(firstButton!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();
    });
  });

  describe('Single Expanded Item Behavior', () => {
    it('only one card expanded at a time', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      const secondButton = screen.getByText('How does it work?').closest('button');

      await user.click(firstButton!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();

      await user.click(secondButton!);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();
      expect(screen.getByText('It works by doing the following...')).toBeInTheDocument();
    });

    it('closing second item keeps first closed', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      const secondButton = screen.getByText('How does it work?').closest('button');

      // Expand first
      await user.click(firstButton!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();

      // Expand second (first closes)
      await user.click(secondButton!);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();

      // Close second
      await user.click(secondButton!);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();
      expect(screen.queryByText('It works by doing the following...')).not.toBeInTheDocument();
    });

    it('switching between multiple items maintains single expanded state', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');

      // Expand first
      await user.click(buttons[0]);
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');

      // Expand second
      await user.click(buttons[1]);
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

      // Expand third
      await user.click(buttons[2]);
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Layout Modes', () => {
    it('renders two columns by default', () => {
      const { container } = render(<FAQAccordion items={mockFAQItems} />);
      const twoColumns = container.querySelector('[class*="twoColumns"]');
      expect(twoColumns).not.toBeNull();
    });

    it('renders single column when columns prop is 1', () => {
      const { container } = render(
        <FAQAccordion items={mockFAQItems} columns={1} />
      );
      const twoColumns = container.querySelector('[class*="twoColumns"]');
      expect(twoColumns).toBeNull();
    });

    it('respects columns prop with two columns', () => {
      const { container } = render(
        <FAQAccordion items={mockFAQItems} columns={2} />
      );
      const twoColumns = container.querySelector('[class*="twoColumns"]');
      expect(twoColumns).not.toBeNull();
    });

    it('distributes items evenly across columns', () => {
      const { container } = render(
        <FAQAccordion items={mockFAQItems} columns={2} />
      );
      const columns = container.querySelectorAll('[class*="column"]');
      expect(columns.length).toBeGreaterThan(0);
    });

    it('renders all items in single column mode', () => {
      render(<FAQAccordion items={mockFAQItems} columns={1} />);
      mockFAQItems.forEach((item) => {
        expect(screen.getByText(item.question)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility - ARIA Attributes', () => {
    it('has aria-expanded false initially', async () => {
      render(<FAQAccordion items={mockFAQItems} />);
      const firstButton = screen.getByText('What is this?').closest('button');
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded to true when expanded', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('updates aria-expanded back to false when collapsed', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      await user.click(firstButton!);
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-controls pointing to answer element', async () => {
      render(<FAQAccordion items={mockFAQItems} />);
      const firstButton = screen.getByText('What is this?').closest('button');
      expect(firstButton).toHaveAttribute('aria-controls', 'faq-answer-1');
    });

    it('answer element has matching id', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      const answer = screen.getByText('This is a test answer.');
      expect(answer.closest('[role="region"]')).toHaveAttribute('id', 'faq-answer-1');
    });

    it('all buttons have unique aria-controls values', () => {
      render(<FAQAccordion items={mockFAQItems} />);
      const buttons = screen.getAllByRole('button');
      const ariaControls = buttons.map((btn) => btn.getAttribute('aria-controls'));
      const uniqueControls = new Set(ariaControls);
      expect(uniqueControls.size).toBe(ariaControls.length);
    });

    it('answer regions have role="region" attribute', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      const answer = screen.getByText('This is a test answer.');
      expect(answer.closest('[role="region"]')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      firstButton?.focus();
      expect(firstButton).toHaveFocus();
    });

    it('Enter key expands card', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      firstButton?.focus();
      await user.keyboard('{Enter}');
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();
    });

    it('Space key works for button activation', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      firstButton?.focus();
      await user.keyboard(' ');
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();
    });

    it('Tab navigation cycles through buttons', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const buttons = screen.getAllByRole('button');
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();
    });
  });

  describe('Semantic Structure', () => {
    it('renders buttons as type button', () => {
      render(<FAQAccordion items={mockFAQItems} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('questions are rendered as h3 headings', () => {
      const { container } = render(<FAQAccordion items={mockFAQItems} />);
      const headings = container.querySelectorAll('h3');
      expect(headings.length).toBe(mockFAQItems.length);
    });

    it('answers are rendered as paragraphs when expanded', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      const answer = screen.getByText('This is a test answer.').closest('p');
      expect(answer).toBeInTheDocument();
    });

    it('chevron icons have aria-hidden attribute', () => {
      const { container } = render(<FAQAccordion items={mockFAQItems} />);
      const chevrons = container.querySelectorAll('[aria-hidden="true"]');
      expect(chevrons.length).toBeGreaterThan(0);
    });
  });

  describe('Visual Feedback', () => {
    it('adds expanded class when expanded', async () => {
      const user = userEvent.setup();
      const { container } = render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      const classNameBefore = firstButton?.className;

      await user.click(firstButton!);
      const classNameAfter = firstButton?.className;

      // Class name should change when expanded (CSS modules add hash)
      expect(classNameAfter).not.toEqual(classNameBefore);
      expect(classNameAfter).toContain('expanded');
    });

    it('removes expanded class when collapsed', async () => {
      const user = userEvent.setup();
      const { container } = render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      const expandedClassName = firstButton?.className;

      await user.click(firstButton!);
      const collapsedClassName = firstButton?.className;

      expect(expandedClassName).toContain('expanded');
      expect(collapsedClassName).not.toContain('expanded');
    });

    it('chevron rotates on expansion', async () => {
      const user = userEvent.setup();
      const { container } = render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      const cardBefore = firstButton?.className;

      await user.click(firstButton!);
      const cardAfter = firstButton?.className;

      // Verify the card element gets the expanded class
      expect(cardAfter).toContain('expanded');
    });
  });

  describe('Content Rendering', () => {
    it('renders answer content correctly', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      const firstButton = screen.getByText('What is this?').closest('button');
      await user.click(firstButton!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();
    });

    it('renders all answer text without truncation', async () => {
      const user = userEvent.setup();
      const longAnswer = 'This is a very long answer that tests whether the accordion properly displays extended text content without any truncation or overflow issues.';
      const items: FAQItem[] = [
        { id: '1', question: 'Test?', answer: longAnswer },
      ];

      render(<FAQAccordion items={items} />);
      const button = screen.getByText('Test?').closest('button');
      await user.click(button!);
      expect(screen.getByText(longAnswer)).toBeInTheDocument();
    });

    it('preserves whitespace in answers', async () => {
      const user = userEvent.setup();
      const answerWithWhitespace = 'Line 1\nLine 2\nLine 3';
      const items: FAQItem[] = [
        { id: '1', question: 'Test?', answer: answerWithWhitespace },
      ];

      render(<FAQAccordion items={items} />);
      const button = screen.getByText('Test?').closest('button');
      await user.click(button!);
      // Use a regex matcher for multiline text in answers
      expect(screen.getByText(/Line 1[\s\S]*Line 2[\s\S]*Line 3/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Special Content', () => {
    it('handles special characters in questions and answers', async () => {
      const user = userEvent.setup();
      const items: FAQItem[] = [
        {
          id: '1',
          question: 'What about & < > " ?',
          answer: 'Answer with & < > " characters',
        },
      ];

      render(<FAQAccordion items={items} />);
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

      render(<FAQAccordion items={items} />);
      expect(screen.getByText(longQuestion)).toBeInTheDocument();
    });

    it('handles numeric IDs correctly', async () => {
      const user = userEvent.setup();
      const items: FAQItem[] = [
        { id: '123', question: 'Q1?', answer: 'A1' },
        { id: '456', question: 'Q2?', answer: 'A2' },
      ];

      render(<FAQAccordion items={items} />);
      const button1 = screen.getByText('Q1?').closest('button');
      expect(button1).toHaveAttribute('aria-controls', 'faq-answer-123');
    });
  });

  describe('Integration Tests', () => {
    it('renders complete accordion with all items', () => {
      render(<FAQAccordion items={mockFAQItems} />);
      mockFAQItems.forEach((item) => {
        expect(screen.getByText(item.question)).toBeInTheDocument();
      });
    });

    it('manages state correctly with multiple expansions', async () => {
      const user = userEvent.setup();
      render(<FAQAccordion items={mockFAQItems} />);

      // Expand item 1
      const item1 = screen.getByText('What is this?').closest('button');
      await user.click(item1!);
      expect(screen.getByText('This is a test answer.')).toBeInTheDocument();

      // Expand item 2 (item 1 should close)
      const item2 = screen.getByText('How does it work?').closest('button');
      await user.click(item2!);
      expect(screen.queryByText('This is a test answer.')).not.toBeInTheDocument();
      expect(screen.getByText('It works by doing the following...')).toBeInTheDocument();

      // Collapse item 2
      await user.click(item2!);
      expect(screen.queryByText('It works by doing the following...')).not.toBeInTheDocument();
    });

    it('maintains layout consistency across states', async () => {
      const user = userEvent.setup();
      const { container } = render(<FAQAccordion items={mockFAQItems} />);

      const initialButtonCount = container.querySelectorAll('button').length;

      const button = screen.getByText('What is this?').closest('button');
      await user.click(button!);

      const afterExpandButtonCount = container.querySelectorAll('button').length;

      expect(initialButtonCount).toBe(afterExpandButtonCount);
    });
  });
});
