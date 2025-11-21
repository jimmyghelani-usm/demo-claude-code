import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  StatisticsSection,
  type StatisticCardData,
} from './StatisticsSection';

describe('StatisticsSection', () => {
  describe('Rendering Tests', () => {
    it('should render with default props', () => {
      render(<StatisticsSection />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'By the Numbers'
      );
      expect(screen.getByText('Real impact from our referral program')).toBeInTheDocument();
    });

    it('should render 3 default stat cards', () => {
      render(<StatisticsSection />);

      expect(screen.getByText('25,000')).toBeInTheDocument();
      expect(screen.getByText('$175,000')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
    });

    it('should render default card labels', () => {
      render(<StatisticsSection />);

      expect(screen.getByText('Referrers rewarded')).toBeInTheDocument();
      expect(screen.getByText('Biggest monthly payout')).toBeInTheDocument();
      expect(screen.getByText('Top city this week')).toBeInTheDocument();
    });

    it('should render default card descriptions', () => {
      render(<StatisticsSection />);

      expect(
        screen.getByText('Active users earning through referrals')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Maximum rewards distributed in a single month')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Leading city by referral activity')
      ).toBeInTheDocument();
    });

    it('should render section with correct role', () => {
      const { container } = render(<StatisticsSection />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe('SECTION');
    });

    it('should render article elements for each card', () => {
      const { container } = render(<StatisticsSection />);

      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(3);
    });

    it('should render all icons for default cards', () => {
      render(<StatisticsSection />);

      expect(screen.getByText('👥')).toBeInTheDocument();
      expect(screen.getByText('💰')).toBeInTheDocument();
      expect(screen.getByText('📍')).toBeInTheDocument();
    });
  });

  describe('Custom Props Tests', () => {
    it('should render with custom cards', () => {
      const customCards: StatisticCardData[] = [
        {
          id: 'custom1',
          number: '100',
          label: 'Custom Label 1',
          description: 'Custom Description 1',
          icon: '🎯',
        },
        {
          id: 'custom2',
          number: '200',
          label: 'Custom Label 2',
          description: 'Custom Description 2',
          icon: '⭐',
        },
      ];

      render(<StatisticsSection cards={customCards} />);

      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
      expect(screen.getByText('Custom Label 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Label 2')).toBeInTheDocument();
    });

    it('should render correct number of custom cards', () => {
      const customCards: StatisticCardData[] = [
        {
          id: 'card1',
          number: '1',
          label: 'First',
          description: 'First card',
          icon: '1️⃣',
        },
        {
          id: 'card2',
          number: '2',
          label: 'Second',
          description: 'Second card',
          icon: '2️⃣',
        },
        {
          id: 'card3',
          number: '3',
          label: 'Third',
          description: 'Third card',
          icon: '3️⃣',
        },
        {
          id: 'card4',
          number: '4',
          label: 'Fourth',
          description: 'Fourth card',
          icon: '4️⃣',
        },
      ];

      const { container } = render(<StatisticsSection cards={customCards} />);

      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(4);
    });

    it('should apply custom className to section', () => {
      const customClass = 'custom-stats-section';
      const { container } = render(
        <StatisticsSection className={customClass} />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass(customClass);
    });

    it('should handle cards without icons', () => {
      const cardsWithoutIcons: StatisticCardData[] = [
        {
          id: 'no-icon',
          number: '42',
          label: 'No Icon Card',
          description: 'This card has no icon',
        },
      ];

      render(
        <StatisticsSection cards={cardsWithoutIcons} />
      );

      // Only the cards with icons should have icon containers
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('No Icon Card')).toBeInTheDocument();
    });
  });

  describe('Accessibility Tests', () => {
    it('should have section with aria-labelledby', () => {
      const { container } = render(<StatisticsSection />);

      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-labelledby', 'statistics-heading');
    });

    it('should have heading with correct id', () => {
      render(<StatisticsSection />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('id', 'statistics-heading');
    });

    it('should have h2 for main heading', () => {
      render(<StatisticsSection />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('By the Numbers');
    });

    it('should have h3 elements for card numbers', () => {
      const { container } = render(<StatisticsSection />);

      const h3Elements = container.querySelectorAll('h3');
      expect(h3Elements.length).toBeGreaterThanOrEqual(3);

      // Check that h3 elements contain the stat numbers
      const h3Texts = Array.from(h3Elements).map((el) => el.textContent);
      expect(h3Texts).toContain('25,000');
      expect(h3Texts).toContain('$175,000');
      expect(h3Texts).toContain('New York');
    });

    it('should have h4 elements for card labels', () => {
      const { container } = render(<StatisticsSection />);

      const h4Elements = container.querySelectorAll('h4');
      expect(h4Elements.length).toBeGreaterThanOrEqual(3);

      const h4Texts = Array.from(h4Elements).map((el) => el.textContent);
      expect(h4Texts).toContain('Referrers rewarded');
      expect(h4Texts).toContain('Biggest monthly payout');
      expect(h4Texts).toContain('Top city this week');
    });

    it('should have paragraph elements for descriptions', () => {
      const { container } = render(<StatisticsSection />);

      const paragraphs = container.querySelectorAll('p');
      // Should have section subheading + 3 card descriptions
      expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    });

    it('should have aria-label on each card', () => {
      const { container } = render(<StatisticsSection />);

      const articles = container.querySelectorAll('article');
      articles.forEach((article) => {
        expect(article).toHaveAttribute('aria-label');
      });
    });

    it('should have card aria-labels with number and label', () => {
      const { container } = render(<StatisticsSection />);

      const articles = container.querySelectorAll('article');
      const ariaLabels = Array.from(articles).map((el) =>
        el.getAttribute('aria-label')
      );

      expect(ariaLabels).toContain('25,000 - Referrers rewarded');
      expect(ariaLabels).toContain('$175,000 - Biggest monthly payout');
      expect(ariaLabels).toContain('New York - Top city this week');
    });

    it('should mark decorative icons as aria-hidden', () => {
      const { container } = render(<StatisticsSection />);

      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should use semantic article elements for cards', () => {
      const { container } = render(<StatisticsSection />);

      const articles = container.querySelectorAll('article');
      articles.forEach((article) => {
        expect(article.tagName).toBe('ARTICLE');
      });
    });
  });

  describe('Content Validation Tests', () => {
    it('should have correct stat numbers', () => {
      render(<StatisticsSection />);

      expect(screen.getByText('25,000')).toBeInTheDocument();
      expect(screen.getByText('$175,000')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
    });

    it('should have matching stat labels with descriptions', () => {
      render(<StatisticsSection />);

      // Check that labels and descriptions are paired correctly
      const referrersCard = screen.getByText('Referrers rewarded').closest('article');
      expect(referrersCard).toHaveTextContent('Active users earning through referrals');

      const payoutCard = screen.getByText('Biggest monthly payout').closest('article');
      expect(payoutCard).toHaveTextContent('Maximum rewards distributed in a single month');

      const cityCard = screen.getByText('Top city this week').closest('article');
      expect(cityCard).toHaveTextContent('Leading city by referral activity');
    });

    it('should not render undefined or null content', () => {
      const { container } = render(<StatisticsSection />);

      const textContent = container.textContent;
      expect(textContent).not.toContain('undefined');
      expect(textContent).not.toContain('null');
    });
  });

  describe('Responsive Layout Tests', () => {
    it('should render grid container', () => {
      const { container } = render(<StatisticsSection />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('should render all cards in a single render', () => {
      const { container } = render(<StatisticsSection />);

      const cards = container.querySelectorAll('article');
      // Should have exactly 3 default cards
      expect(cards).toHaveLength(3);

      // All cards should have content
      cards.forEach((card) => {
        expect(card.textContent).toMatch(/[^\s]/); // Has non-whitespace content
      });
    });

    it('should maintain consistent card structure', () => {
      const { container } = render(<StatisticsSection />);

      const cards = container.querySelectorAll('article');
      cards.forEach((card) => {
        // Each card should have number, label, and description
        const hasNumber = card.querySelector('h3');
        const hasLabel = card.querySelector('h4');
        const hasDescription = card.querySelector('p');

        // At least number, label, and description should be present
        expect(hasNumber).toBeInTheDocument();
        expect(hasLabel).toBeInTheDocument();
        expect(hasDescription).toBeInTheDocument();
      });
    });
  });

  describe('Props Validation Tests', () => {
    it('should handle empty cards array', () => {
      const { container } = render(<StatisticsSection cards={[]} />);

      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(0);
    });

    it('should preserve card order from props', () => {
      const customCards: StatisticCardData[] = [
        {
          id: 'first',
          number: '1st',
          label: 'First',
          description: 'First card',
          icon: '1️⃣',
        },
        {
          id: 'second',
          number: '2nd',
          label: 'Second',
          description: 'Second card',
          icon: '2️⃣',
        },
        {
          id: 'third',
          number: '3rd',
          label: 'Third',
          description: 'Third card',
          icon: '3️⃣',
        },
      ];

      const { container } = render(<StatisticsSection cards={customCards} />);

      const articles = container.querySelectorAll('article');
      const numbers = Array.from(articles).map((a) =>
        a.querySelector('h3')?.textContent
      );

      expect(numbers).toEqual(['1st', '2nd', '3rd']);
    });

    it('should handle cards with special characters in content', () => {
      const specialCards: StatisticCardData[] = [
        {
          id: 'special',
          number: '$1,000,000+',
          label: 'Special & Symbols <> ©',
          description: 'Content with "quotes" and \'apostrophes\'',
          icon: '⚡',
        },
      ];

      render(<StatisticsSection cards={specialCards} />);

      expect(screen.getByText('$1,000,000+')).toBeInTheDocument();
      expect(screen.getByText('Special & Symbols <> ©')).toBeInTheDocument();
      expect(
        screen.getByText('Content with "quotes" and \'apostrophes\'')
      ).toBeInTheDocument();
    });

    it('should handle very long text content', () => {
      const longCards: StatisticCardData[] = [
        {
          id: 'long',
          number: 'Very Long Number That Takes Multiple Lines',
          label: 'This is a very long label that contains multiple words',
          description:
            'This is an extremely long description that contains a lot of text to test how the component handles overflow content and text wrapping in various viewport sizes',
          icon: '📊',
        },
      ];

      render(<StatisticsSection cards={longCards} />);

      expect(
        screen.getByText('Very Long Number That Takes Multiple Lines')
      ).toBeInTheDocument();
      expect(
        screen.getByText('This is a very long label that contains multiple words')
      ).toBeInTheDocument();
    });
  });

  describe('Component Structure Tests', () => {
    it('should have correct document structure', () => {
      const { container } = render(<StatisticsSection />);

      expect(container.querySelector('section')).toBeInTheDocument();
      expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="header"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="grid"]')).toBeInTheDocument();
    });

    it('should render header before grid', () => {
      const { container } = render(<StatisticsSection />);

      const header = container.querySelector('[class*="header"]');
      const grid = container.querySelector('[class*="grid"]');

      expect(header?.compareDocumentPosition(grid as Node)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });

    it('should maintain nesting hierarchy', () => {
      const { container } = render(<StatisticsSection />);

      const section = container.querySelector('section');
      const containerDiv = section?.querySelector('[class*="container"]');
      const grid = containerDiv?.querySelector('[class*="grid"]');
      const articles = grid?.querySelectorAll('article');

      expect(section).toBeInTheDocument();
      expect(containerDiv).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
      expect(articles?.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle cards with empty strings', () => {
      const emptyCards: StatisticCardData[] = [
        {
          id: 'empty',
          number: '',
          label: '',
          description: '',
          icon: '🎯',
        },
      ];

      const { container } = render(<StatisticsSection cards={emptyCards} />);

      const articles = container.querySelectorAll('article');
      expect(articles).toHaveLength(1);
    });

    it('should handle cards with only whitespace', () => {
      const whitespaceCards: StatisticCardData[] = [
        {
          id: 'whitespace',
          number: '   ',
          label: '   ',
          description: '   ',
          icon: '   ',
        },
      ];

      render(<StatisticsSection cards={whitespaceCards} />);

      // Component should still render without errors
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should handle undefined className gracefully', () => {
      const { container } = render(<StatisticsSection className={undefined} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should handle empty string className', () => {
      const { container } = render(<StatisticsSection className="" />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });
});
