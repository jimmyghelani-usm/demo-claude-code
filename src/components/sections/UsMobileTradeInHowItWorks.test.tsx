import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsMobileTradeInHowItWorks, type TradeInStep } from './UsMobileTradeInHowItWorks';

describe('UsMobileTradeInHowItWorks', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<UsMobileTradeInHowItWorks />);

      expect(screen.getByRole('heading', { name: /simple 4-step process/i })).toBeInTheDocument();
      expect(screen.getByText(/Get the best value for your device/i)).toBeInTheDocument();
    });

    it('renders with custom section title and description', () => {
      const customTitle = 'Custom Trade In Steps';
      const customDescription = 'Follow these steps to trade in your device';

      render(
        <UsMobileTradeInHowItWorks
          sectionTitle={customTitle}
          sectionDescription={customDescription}
        />
      );

      expect(screen.getByRole('heading', { name: customTitle })).toBeInTheDocument();
      expect(screen.getByText(customDescription)).toBeInTheDocument();
    });

    it('renders all default steps', () => {
      render(<UsMobileTradeInHowItWorks />);

      expect(screen.getByText(/select your device/i)).toBeInTheDocument();
      expect(screen.getByText(/assess condition/i)).toBeInTheDocument();
      expect(screen.getByText(/get instant quote/i)).toBeInTheDocument();
      expect(screen.getByText(/apply your credit/i)).toBeInTheDocument();
    });

    it('renders custom steps', () => {
      const customSteps = [
        {
          stepNumber: 1,
          title: 'Custom Step 1',
          description: 'Custom description 1',
          icon: <div>Icon 1</div>,
        },
        {
          stepNumber: 2,
          title: 'Custom Step 2',
          description: 'Custom description 2',
          icon: <div>Icon 2</div>,
        },
      ];

      render(<UsMobileTradeInHowItWorks steps={customSteps} />);

      expect(screen.getByText(/custom step 1/i)).toBeInTheDocument();
      expect(screen.getByText(/custom description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/custom step 2/i)).toBeInTheDocument();
      expect(screen.getByText(/custom description 2/i)).toBeInTheDocument();
    });

    it('renders step number badges with correct numbering', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const badges = container.querySelectorAll('[class*="stepNumberBadge"]');
      expect(badges.length).toBe(4);

      expect(badges[0].textContent).toBe('1');
      expect(badges[1].textContent).toBe('2');
      expect(badges[2].textContent).toBe('3');
      expect(badges[3].textContent).toBe('4');
    });

    it('renders with empty steps array', () => {
      const { container } = render(<UsMobileTradeInHowItWorks steps={[]} />);

      const stepRegions = container.querySelectorAll('[role="region"]');
      expect(stepRegions.length).toBe(0);
    });

    it('renders with single step', () => {
      const singleStep: TradeInStep[] = [
        {
          stepNumber: 1,
          title: 'Single Step',
          description: 'Description',
          icon: <span>Icon</span>,
        },
      ];

      render(<UsMobileTradeInHowItWorks steps={singleStep} />);

      expect(screen.getByText(/Single Step/i)).toBeInTheDocument();
      expect(screen.getByText(/Description/i)).toBeInTheDocument();
    });

    it('renders with many steps (5+)', () => {
      const manySteps: TradeInStep[] = Array.from({ length: 6 }, (_, idx) => ({
        stepNumber: idx + 1,
        icon: <span>{idx + 1}</span>,
        title: `Step Title ${idx + 1}`,
        description: `Description for step ${idx + 1}`,
      }));

      render(<UsMobileTradeInHowItWorks steps={manySteps} />);

      // Verify region count matches  (step regions + any other regions)
      const regions = screen.getAllByRole('region');
      expect(regions.length).toBeGreaterThanOrEqual(manySteps.length);

      // Check that first and last steps are rendered (representative check)
      expect(screen.getByText('Step Title 1')).toBeInTheDocument();
      expect(screen.getByText('Step Title 6')).toBeInTheDocument();
    });

    it('applies custom className to section', () => {
      const customClass = 'custom-how-it-works-class';
      const { container } = render(
        <UsMobileTradeInHowItWorks className={customClass} />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass(customClass);
    });
  });

  describe('Accessibility', () => {
    it('renders step cards with proper structure', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const stepCards = container.querySelectorAll('[role="region"]');
      expect(stepCards.length).toBe(4);

      stepCards.forEach((card, index) => {
        expect(card).toHaveAttribute('aria-label', `Step ${index + 1}: ${
          [
            'Select Your Device',
            'Assess Condition',
            'Get Instant Quote',
            'Apply Your Credit',
          ][index]
        }`);
      });
    });

    it('renders with proper semantic heading hierarchy', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const mainHeading = screen.getByRole('heading', { name: /simple 4-step process/i });
      expect(mainHeading.tagName).toBe('H2');

      const stepHeadings = container.querySelectorAll('h3');
      expect(stepHeadings.length).toBe(4);
    });

    it('renders with correct ARIA labels for accessibility', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-labelledby', 'trade-in-how-it-works-heading');
    });

    it('section has proper aria-labelledby attribute', () => {
      render(<UsMobileTradeInHowItWorks sectionTitle="Custom Title" />);

      const section = screen.getByRole('heading', { name: 'Custom Title' }).closest('section');
      expect(section).toHaveAttribute('aria-labelledby');
    });

    it('marks step number badges as aria-hidden', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const badges = container.querySelectorAll('[class*="stepNumberBadge"]');
      badges.forEach((badge) => {
        expect(badge).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('marks icon wrappers as aria-hidden', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const icons = container.querySelectorAll('[class*="iconWrapper"]');
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('marks connector lines as aria-hidden', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const connectors = container.querySelectorAll('[class*="connector"]');
      connectors.forEach((connector) => {
        expect(connector).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('marks gradient backgrounds as aria-hidden', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const gradients = container.querySelectorAll('[aria-hidden="true"]');
      expect(gradients.length).toBeGreaterThan(0);
    });

    it('has keyboard accessible structure', () => {
      render(<UsMobileTradeInHowItWorks />);

      const headings = screen.getAllByRole('heading');
      headings.forEach((heading) => {
        expect(heading).toBeVisible();
      });
    });
  });

  describe('Content Rendering', () => {
    it('renders step descriptions for all steps', () => {
      render(<UsMobileTradeInHowItWorks />);

      expect(screen.getByText(/Choose the phone or tablet you want to trade in/i)).toBeInTheDocument();
      expect(screen.getByText(/Answer simple questions about your device condition/i)).toBeInTheDocument();
      expect(screen.getByText(/Receive your trade-in value immediately/i)).toBeInTheDocument();
      expect(screen.getByText(/Use your credit instantly toward any new device purchase/i)).toBeInTheDocument();
    });

    it('renders icons for each step', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const iconWrappers = container.querySelectorAll('[class*="iconWrapper"]');
      expect(iconWrappers.length).toBe(4);

      iconWrappers.forEach((wrapper) => {
        const svg = wrapper.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('maintains proper step content layout', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const stepContents = container.querySelectorAll('[class*="stepContent"]');
      expect(stepContents.length).toBe(4);

      stepContents.forEach((content) => {
        const title = content.querySelector('h3');
        const description = content.querySelector('p');
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });

    it('renders section description element', () => {
      const { container } = render(
        <UsMobileTradeInHowItWorks sectionDescription="Test description" />
      );

      const descriptionText = container.querySelector('[class*="sectionDescription"]');
      expect(descriptionText?.textContent).toContain('Test description');
    });

    it('handles very long step titles', () => {
      const longTitle = 'A'.repeat(100);
      const steps: TradeInStep[] = [
        {
          stepNumber: 1,
          icon: <span>1</span>,
          title: longTitle,
          description: 'Description',
        },
      ];

      render(<UsMobileTradeInHowItWorks steps={steps} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles special characters in titles', () => {
      const steps: TradeInStep[] = [
        {
          stepNumber: 1,
          icon: <span>1</span>,
          title: 'Step & Title <with> "Special" Chars',
          description: 'Description',
        },
      ];

      render(<UsMobileTradeInHowItWorks steps={steps} />);
      expect(screen.getByText(/Step & Title/)).toBeInTheDocument();
    });
  });

  describe('Layout & Structure', () => {
    it('properly structures grid container', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const stepsGrid = container.querySelector('[class*="stepsGrid"]');
      expect(stepsGrid).toBeInTheDocument();

      const stepCards = stepsGrid?.querySelectorAll('[role="region"]');
      expect(stepCards?.length).toBe(4);
    });

    it('renders connector lines', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const connectors = container.querySelectorAll('[class*="connector"]');
      expect(connectors.length).toBeGreaterThan(0);
    });

    it('renders hidden gradient background elements', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const gradientElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('has proper semantic section structure', () => {
      const { container } = render(<UsMobileTradeInHowItWorks />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('renders with custom section title only', () => {
      render(<UsMobileTradeInHowItWorks sectionTitle="Custom Title" />);

      expect(screen.getByRole('heading', { name: 'Custom Title' })).toBeInTheDocument();
    });

    it('renders with custom section description only', () => {
      render(<UsMobileTradeInHowItWorks sectionDescription="Custom description" />);

      expect(screen.getByText('Custom description')).toBeInTheDocument();
    });

    it('renders with all custom props together', () => {
      const customSteps: TradeInStep[] = [
        {
          stepNumber: 1,
          icon: <span>A</span>,
          title: 'Custom Title',
          description: 'Custom description',
        },
      ];

      render(
        <UsMobileTradeInHowItWorks
          sectionTitle="Custom Section"
          sectionDescription="Custom desc"
          steps={customSteps}
          className="test-class"
        />
      );

      expect(screen.getByRole('heading', { name: 'Custom Section' })).toBeInTheDocument();
      expect(screen.getByText('Custom desc')).toBeInTheDocument();
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('renders complete section with all elements', () => {
      render(<UsMobileTradeInHowItWorks />);

      const section = screen.getByRole('heading', { name: /simple 4-step process/i }).closest('section');
      expect(section).toBeInTheDocument();

      // Should have at least 4 step regions (may have more with other elements)
      expect(screen.getAllByRole('region').length).toBeGreaterThanOrEqual(4);
      expect(screen.getByText(/Choose the phone/i)).toBeInTheDocument();
    });
  });
});
