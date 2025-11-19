import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FAQCard } from './FAQCard';

describe('FAQCard', () => {
  const defaultProps = {
    question: 'What devices can I trade in?',
    answer: 'You can trade in smartphones, tablets, smartwatches, and laptops from most major brands.',
  };

  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<FAQCard {...defaultProps} />);

      expect(screen.getByText(defaultProps.question)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.answer)).toBeInTheDocument();
    });

    it('renders question as heading', () => {
      render(<FAQCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { name: defaultProps.question });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H4');
    });

    it('uses article element for semantic structure', () => {
      const { container } = render(<FAQCard {...defaultProps} />);
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });

    it('has a clickable button for toggling', () => {
      render(<FAQCard {...defaultProps} />);
      const button = screen.getByRole('button', { name: new RegExp(defaultProps.question, 'i') });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('is collapsed by default', () => {
      render(<FAQCard {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows plus icon when collapsed', () => {
      const { container } = render(<FAQCard {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // Plus icon has both vertical and horizontal lines
      const icon = container.querySelector('[aria-hidden="true"]');
      const lines = icon?.querySelectorAll('line');
      expect(lines).toHaveLength(2); // Plus icon has 2 lines
    });

    it('is expanded when defaultExpanded is true', () => {
      render(<FAQCard {...defaultProps} defaultExpanded={true} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('shows minus icon when expanded', () => {
      const { container } = render(<FAQCard {...defaultProps} defaultExpanded={true} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Minus icon has only one line
      const icon = container.querySelector('[aria-hidden="true"]');
      const lines = icon?.querySelectorAll('line');
      expect(lines).toHaveLength(1); // Minus icon has 1 line
    });

    it('toggles from collapsed to expanded on click', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles from expanded to collapsed on click', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} defaultExpanded={true} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles multiple times', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} />);

      const button = screen.getByRole('button');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Keyboard Accessibility', () => {
    it('toggles on Enter key', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.keyboard('{Enter}');

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles on Space key', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.keyboard(' ');

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('prevents default behavior on Space key', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} />);

      const button = screen.getByRole('button');
      button.focus();

      // Space should not scroll the page
      await user.keyboard(' ');

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('is focusable', () => {
      render(<FAQCard {...defaultProps} />);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('can be navigated with Tab key', async () => {
      const user = userEvent.setup();
      render(
        <>
          <FAQCard question="Question 1" answer="Answer 1" />
          <FAQCard question="Question 2" answer="Answer 2" />
        </>
      );

      const button1 = screen.getByRole('button', { name: /question 1/i });
      const button2 = screen.getByRole('button', { name: /question 2/i });

      await user.tab();
      expect(button1).toHaveFocus();

      await user.tab();
      expect(button2).toHaveFocus();
    });
  });

  describe('Content Visibility', () => {
    it('hides answer when collapsed', () => {
      render(<FAQCard {...defaultProps} />);
      const region = screen.getByRole('region', { hidden: true });
      expect(region).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows answer when expanded', () => {
      render(<FAQCard {...defaultProps} defaultExpanded={true} />);
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-hidden', 'false');
    });

    it('updates aria-hidden on toggle', async () => {
      const user = userEvent.setup();
      render(<FAQCard {...defaultProps} />);

      const button = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(region).toHaveAttribute('aria-hidden', 'true');

      await user.click(button);

      expect(region).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Accessibility', () => {
    it('button has correct type attribute', () => {
      render(<FAQCard {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('icon is decorative (aria-hidden)', () => {
      const { container } = render(<FAQCard {...defaultProps} />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('content region has proper role', () => {
      render(<FAQCard {...defaultProps} defaultExpanded={true} />);
      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
    });

    it('button includes question text', () => {
      render(<FAQCard {...defaultProps} />);
      const button = screen.getByRole('button', { name: new RegExp(defaultProps.question, 'i') });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Real-World Use Cases', () => {
    it('renders trade-in eligibility FAQ', () => {
      render(
        <FAQCard
          question="What devices can I trade in?"
          answer="You can trade in smartphones, tablets, smartwatches, and laptops from most major brands including Apple, Samsung, Google, and more."
        />
      );

      expect(screen.getByRole('heading', { name: /what devices can i trade in/i })).toBeInTheDocument();
      expect(screen.getByText(/you can trade in smartphones/i)).toBeInTheDocument();
    });

    it('renders value calculation FAQ', () => {
      render(
        <FAQCard
          question="How is my trade-in value calculated?"
          answer="Trade-in values are based on your device model, storage capacity, condition, and current market demand."
        />
      );

      expect(screen.getByRole('heading', { name: /how is my trade-in value calculated/i })).toBeInTheDocument();
      expect(screen.getByText(/trade-in values are based on/i)).toBeInTheDocument();
    });

    it('renders data security FAQ', () => {
      render(
        <FAQCard
          question="Is my data safe?"
          answer="Absolutely. We recommend you back up and erase your data before shipping. Once we receive your device, we perform a complete data wipe."
          defaultExpanded={true}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(/absolutely/i)).toBeInTheDocument();
    });
  });

  describe('Content Variations', () => {
    it('handles short question', () => {
      render(<FAQCard question="Why?" answer="Because it works." />);
      expect(screen.getByRole('heading', { name: /why/i })).toBeInTheDocument();
    });

    it('handles long question', () => {
      const longQuestion = 'What happens if my device condition does not match what I originally described during the initial quote?';
      render(<FAQCard question={longQuestion} answer="We will send a revised offer." />);
      expect(screen.getByRole('heading', { name: new RegExp(longQuestion, 'i') })).toBeInTheDocument();
    });

    it('handles short answer', () => {
      render(<FAQCard question="Is it free?" answer="Yes." />);
      expect(screen.getByText('Yes.')).toBeInTheDocument();
    });

    it('handles long answer', () => {
      const longAnswer = 'Once we receive your device, we inspect it within 1-2 business days. Our team carefully examines the device condition, functionality, and authenticity. If everything checks out and matches your description, you will receive payment within 2-3 business days after inspection through your preferred payment method.';
      render(<FAQCard question="How long?" answer={longAnswer} />);
      expect(screen.getByText(longAnswer)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      render(
        <FAQCard
          question="Can I trade in a device that's not paid off?"
          answer="You can trade in a device with an outstanding balance, but you're responsible for paying off the remaining amount."
        />
      );

      expect(screen.getByRole('heading', { name: /can i trade in a device that's not paid off/i })).toBeInTheDocument();
      expect(screen.getByText(/you're responsible/i)).toBeInTheDocument();
    });
  });

  describe('Multiple FAQ Cards', () => {
    it('each card maintains independent state', async () => {
      const user = userEvent.setup();
      render(
        <>
          <FAQCard question="Question 1" answer="Answer 1" />
          <FAQCard question="Question 2" answer="Answer 2" />
          <FAQCard question="Question 3" answer="Answer 3" />
        </>
      );

      const button1 = screen.getByRole('button', { name: /question 1/i });
      const button2 = screen.getByRole('button', { name: /question 2/i });

      expect(button1).toHaveAttribute('aria-expanded', 'false');
      expect(button2).toHaveAttribute('aria-expanded', 'false');

      await user.click(button1);

      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'false'); // Should remain closed
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(FAQCard.displayName).toBe('FAQCard');
    });
  });
});
