import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StepCard } from './StepCard';

const TestIcon = () => (
  <svg data-testid="test-icon" width="40" height="40">
    <circle cx="20" cy="20" r="20" />
  </svg>
);

describe('StepCard', () => {
  const defaultProps = {
    stepNumber: 1,
    title: 'First Step',
    description: 'This is the first step description',
    icon: '✓',
  };

  describe('Rendering', () => {
    it('renders with all required props', () => {
      render(<StepCard {...defaultProps} />);

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /first step/i })).toBeInTheDocument();
      expect(screen.getByText(/this is the first step description/i)).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('renders step number correctly', () => {
      render(<StepCard {...defaultProps} stepNumber={3} />);
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('renders title as heading', () => {
      render(<StepCard {...defaultProps} title="Custom Title" />);
      const heading = screen.getByRole('heading', { name: /custom title/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders description text', () => {
      const longDescription = 'This is a very detailed description that explains the step in depth.';
      render(<StepCard {...defaultProps} description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe('Icon Handling', () => {
    it('renders string icon (emoji)', () => {
      render(<StepCard {...defaultProps} icon="📦" />);
      expect(screen.getByText('📦')).toBeInTheDocument();
    });

    it('renders React element icon', () => {
      render(<StepCard {...defaultProps} icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders SVG icon', () => {
      const svgIcon = (
        <svg data-testid="svg-icon" width="40" height="40">
          <rect width="40" height="40" />
        </svg>
      );
      render(<StepCard {...defaultProps} icon={svgIcon} />);
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });

    it('renders icon with different emojis', () => {
      const { rerender } = render(<StepCard {...defaultProps} icon="✓" />);
      expect(screen.getByText('✓')).toBeInTheDocument();

      rerender(<StepCard {...defaultProps} icon="📦" />);
      expect(screen.getByText('📦')).toBeInTheDocument();

      rerender(<StepCard {...defaultProps} icon="💵" />);
      expect(screen.getByText('💵')).toBeInTheDocument();
    });

    it('icon container has aria-hidden attribute', () => {
      const { container } = render(<StepCard {...defaultProps} />);
      const iconContainer = container.querySelector('[aria-hidden="true"]');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Step Numbers', () => {
    it('renders step 1 correctly', () => {
      render(<StepCard {...defaultProps} stepNumber={1} title="Step One" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders step 2 correctly', () => {
      render(<StepCard {...defaultProps} stepNumber={2} title="Step Two" />);
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    it('renders step 3 correctly', () => {
      render(<StepCard {...defaultProps} stepNumber={3} title="Step Three" />);
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('handles larger step numbers', () => {
      render(<StepCard {...defaultProps} stepNumber={10} title="Step Ten" />);
      expect(screen.getByText('Step 10')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses article element for semantic structure', () => {
      const { container } = render(<StepCard {...defaultProps} />);
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<StepCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('First Step');
    });

    it('icon is decorative (aria-hidden)', () => {
      const { container } = render(<StepCard {...defaultProps} />);
      const iconContainer = container.querySelector('[aria-hidden="true"]');
      expect(iconContainer).toBeInTheDocument();
    });

    it('all text content is accessible', () => {
      render(<StepCard {...defaultProps} />);

      // All important content should be in the document
      expect(screen.getByText('Step 1')).toBeVisible();
      expect(screen.getByRole('heading')).toBeVisible();
      expect(screen.getByText(/this is the first step description/i)).toBeVisible();
    });
  });

  describe('Real-World Use Cases', () => {
    it('renders trade-in process step 1', () => {
      render(
        <StepCard
          stepNumber={1}
          title="Check trade in value"
          description="Answer a few questions about your device to get an instant quote. No commitments required."
          icon="✓"
        />
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /check trade in value/i })).toBeInTheDocument();
      expect(screen.getByText(/answer a few questions/i)).toBeInTheDocument();
    });

    it('renders trade-in process step 2', () => {
      render(
        <StepCard
          stepNumber={2}
          title="Ship your device"
          description="Pack up your device and ship it to us for free. We'll send you a prepaid shipping label."
          icon="📦"
        />
      );

      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /ship your device/i })).toBeInTheDocument();
      expect(screen.getByText('📦')).toBeInTheDocument();
    });

    it('renders trade-in process step 3', () => {
      render(
        <StepCard
          stepNumber={3}
          title="Get Paid"
          description="Once we receive and verify your device, you'll get paid via your preferred method within 2-3 business days."
          icon="💵"
        />
      );

      expect(screen.getByText('Step 3')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /get paid/i })).toBeInTheDocument();
      expect(screen.getByText('💵')).toBeInTheDocument();
    });
  });

  describe('Content Variations', () => {
    it('handles short titles', () => {
      render(<StepCard {...defaultProps} title="Start" />);
      expect(screen.getByRole('heading', { name: /start/i })).toBeInTheDocument();
    });

    it('handles long titles', () => {
      const longTitle = 'Complete the verification process and submit your device';
      render(<StepCard {...defaultProps} title={longTitle} />);
      expect(screen.getByRole('heading', { name: new RegExp(longTitle, 'i') })).toBeInTheDocument();
    });

    it('handles short descriptions', () => {
      render(<StepCard {...defaultProps} description="Simple step." />);
      expect(screen.getByText('Simple step.')).toBeInTheDocument();
    });

    it('handles long descriptions', () => {
      const longDesc = 'This is a comprehensive description that provides detailed information about what the user needs to do in this step. It includes multiple sentences and covers various aspects of the process to ensure clarity.';
      render(<StepCard {...defaultProps} description={longDesc} />);
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      render(
        <StepCard
          stepNumber={1}
          title="Sign & Ship"
          description="We'll handle the rest! Questions? Call 1-800-TEST"
          icon="✓"
        />
      );

      expect(screen.getByRole('heading', { name: /sign & ship/i })).toBeInTheDocument();
      expect(screen.getByText(/questions\? call 1-800-test/i)).toBeInTheDocument();
    });
  });

  describe('Multiple Step Cards', () => {
    it('renders multiple step cards together', () => {
      const { container } = render(
        <>
          <StepCard
            stepNumber={1}
            title="First"
            description="First description"
            icon="1️⃣"
          />
          <StepCard
            stepNumber={2}
            title="Second"
            description="Second description"
            icon="2️⃣"
          />
          <StepCard
            stepNumber={3}
            title="Third"
            description="Third description"
            icon="3️⃣"
          />
        </>
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();

      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(3);
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(StepCard.displayName).toBe('StepCard');
    });
  });
});
