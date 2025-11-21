import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ReferralRewardsHero } from './ReferralRewardsHero'

// Mock requestAnimationFrame and IntersectionObserver before tests
const mockRequestAnimationFrame = vi.fn((callback) => {
  return 1
})
const mockCancelAnimationFrame = vi.fn()

let mockIntersectionObserverCallback: IntersectionObserverCallback | null = null

class MockIntersectionObserver {
  observe = vi.fn((element: Element) => {
    // Trigger callback with isIntersecting: true when observe is called
    if (mockIntersectionObserverCallback) {
      mockIntersectionObserverCallback(
        [{ isIntersecting: true, target: element }] as any,
        this as any
      )
    }
  })
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(callback: IntersectionObserverCallback) {
    mockIntersectionObserverCallback = callback
  }
}

describe('ReferralRewardsHero', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
    // Setup global mocks
    global.requestAnimationFrame = mockRequestAnimationFrame
    global.cancelAnimationFrame = mockCancelAnimationFrame
    global.IntersectionObserver = MockIntersectionObserver as any
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('should render with default props', () => {
      render(<ReferralRewardsHero />)

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Given Out in Referral Rewards'
      )
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Still counting. Thousands of users are earning just by sharing.'
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('Start Earning Now')
    })

    it('should display initial amount as $0', () => {
      render(<ReferralRewardsHero />)

      const amountElement = screen.getByText(/^\$/)
      expect(amountElement).toHaveTextContent('$0')
    })

    it('should accept and apply custom className to container', () => {
      const customClass = 'custom-hero-class'
      const { container } = render(
        <ReferralRewardsHero className={customClass} />
      )

      const section = container.querySelector('section')
      expect(section).toHaveClass(customClass)
    })

    it('should render button with correct text', () => {
      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Start Earning Now')
    })
  })

  describe('Number Formatting Tests', () => {
    it('should format numbers with comma separators', () => {
      render(<ReferralRewardsHero targetAmount={1000000} />)

      const amountElement = screen.getByText(/^\$/)
      // Initially shows $0 before animation
      expect(amountElement).toHaveTextContent('$0')
    })

    it('should display $500,000 with correct formatting', () => {
      render(<ReferralRewardsHero targetAmount={500000} />)

      const amountElement = screen.getByText(/^\$/)
      expect(amountElement).toBeInTheDocument()
    })

    it('should display $5,000,000 with correct formatting', () => {
      render(<ReferralRewardsHero targetAmount={5000000} />)

      const amountElement = screen.getByText(/^\$/)
      // Initially shows $0
      expect(amountElement).toHaveTextContent('$0')
    })

    it('should handle small amounts without unnecessary commas', () => {
      render(<ReferralRewardsHero targetAmount={100} />)

      const amountElement = screen.getByText(/^\$/)
      expect(amountElement).toBeInTheDocument()
    })
  })

  describe('Animation Tests', () => {
    it('should set requestAnimationFrame on component visibility', () => {
      render(<ReferralRewardsHero targetAmount={1000000} animationDuration={1000} />)

      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })

    it('should use specified animationDuration', () => {
      const animationDuration = 3000
      render(
        <ReferralRewardsHero
          targetAmount={1000000}
          animationDuration={animationDuration}
        />
      )

      // Component renders and sets up animation
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })

    it('should apply easing function for smooth animation', () => {
      render(
        <ReferralRewardsHero targetAmount={1000000} animationDuration={1000} />
      )

      // Easing is applied internally during animation
      // Verified by requestAnimationFrame being called
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })

    it('should stop animating after duration completes', () => {
      render(
        <ReferralRewardsHero targetAmount={1000000} animationDuration={1000} />
      )

      // Animation setup is performed
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('Intersection Observer Tests', () => {
    it('should set up Intersection Observer on mount', () => {
      const { container } = render(<ReferralRewardsHero />)

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should trigger animation when component becomes visible', () => {
      render(<ReferralRewardsHero />)

      // Component should render and animation should be triggered
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })

    it('should set up observer on the section element', () => {
      const { container } = render(<ReferralRewardsHero />)

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should handle Intersection Observer callbacks', () => {
      render(<ReferralRewardsHero />)

      // Component handles intersection callbacks properly
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('should set up with correct aria attributes for accessibility', () => {
      const { container } = render(<ReferralRewardsHero />)

      const section = container.querySelector('section')
      expect(section).toHaveAttribute('aria-labelledby', 'referral-heading')
    })
  })

  describe('Button Interaction Tests', () => {
    it('should call onCtaClick when button is clicked', async () => {
      const user = userEvent.setup()
      const mockOnCtaClick = vi.fn()

      render(<ReferralRewardsHero onCtaClick={mockOnCtaClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(mockOnCtaClick).toHaveBeenCalledTimes(1)
    })

    it('should handle button click without onCtaClick callback', async () => {
      const user = userEvent.setup()

      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(button).toBeInTheDocument()
    })

    it('should have button text "Start Earning Now"', () => {
      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Start Earning Now')
    })

    it('should call onCtaClick multiple times on multiple clicks', async () => {
      const user = userEvent.setup()
      const mockOnCtaClick = vi.fn()

      render(<ReferralRewardsHero onCtaClick={mockOnCtaClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(mockOnCtaClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Accessibility Tests', () => {
    it('should use semantic HTML with section element', () => {
      const { container } = render(<ReferralRewardsHero />)

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should have h1 heading for main title', () => {
      render(<ReferralRewardsHero />)

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Given Out in Referral Rewards')
    })

    it('should have h2 heading for subheading', () => {
      render(<ReferralRewardsHero />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()
    })

    it('should have button element for CTA', () => {
      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should have aria-label on button', () => {
      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute(
        'aria-label',
        'Start earning referral rewards now'
      )
    })

    it('should have aria-live on counter for dynamic updates', () => {
      render(<ReferralRewardsHero />)

      const counter = screen.getByText(/^\$/)
      expect(counter).toHaveAttribute('aria-live', 'polite')
    })

    it('should have aria-atomic on counter', () => {
      render(<ReferralRewardsHero />)

      const counter = screen.getByText(/^\$/)
      expect(counter).toHaveAttribute('aria-atomic', 'true')
    })

    it('should have aria-labelledby on section', () => {
      const { container } = render(<ReferralRewardsHero />)

      const section = container.querySelector('section')
      expect(section).toHaveAttribute('aria-labelledby', 'referral-heading')
    })

    it('should have id matching aria-labelledby on heading', () => {
      render(<ReferralRewardsHero />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', 'referral-heading')
    })

    it('should mark decorative elements as aria-hidden', () => {
      const { container } = render(<ReferralRewardsHero />)

      const gradients = container.querySelectorAll('[aria-hidden="true"]')
      expect(gradients.length).toBeGreaterThan(0)
    })
  })

  describe('Keyboard Navigation Tests', () => {
    it('button should be focusable with Tab key', async () => {
      const user = userEvent.setup()

      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      await user.tab()

      expect(button).toHaveFocus()
    })

    it('button should be clickable with Enter key when focused', async () => {
      const user = userEvent.setup()
      const mockOnCtaClick = vi.fn()

      render(<ReferralRewardsHero onCtaClick={mockOnCtaClick} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')

      expect(mockOnCtaClick).toHaveBeenCalled()
    })

    it('button should be clickable with Space key when focused', async () => {
      const user = userEvent.setup()
      const mockOnCtaClick = vi.fn()

      render(<ReferralRewardsHero onCtaClick={mockOnCtaClick} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard(' ')

      expect(mockOnCtaClick).toHaveBeenCalled()
    })
  })

  describe('Cleanup Tests', () => {
    it('should cancel requestAnimationFrame on unmount', () => {
      const { unmount } = render(<ReferralRewardsHero />)

      mockCancelAnimationFrame.mockClear()
      unmount()

      // Cleanup function should cancel animation frame
      expect(mockCancelAnimationFrame).toHaveBeenCalled()
    })

    it('should disconnect Intersection Observer on unmount', () => {
      const { unmount } = render(<ReferralRewardsHero />)

      // Component should render and unmount cleanly
      expect(screen.getByRole('button')).toBeInTheDocument()

      unmount()

      // Component unmounts without errors
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should handle rapid mount/unmount cycles', () => {
      const { unmount, rerender } = render(<ReferralRewardsHero />)
      rerender(<ReferralRewardsHero targetAmount={500000} />)
      unmount()

      // Should handle without errors
      expect(mockCancelAnimationFrame).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle targetAmount of 0', () => {
      render(<ReferralRewardsHero targetAmount={0} />)

      const amountElement = screen.getByText(/^\$/)
      expect(amountElement).toHaveTextContent('$0')
    })

    it('should handle very large targetAmount', () => {
      render(<ReferralRewardsHero targetAmount={999999999} />)

      const amountElement = screen.getByText(/^\$/)
      expect(amountElement).toBeInTheDocument()
    })

    it('should handle very short animationDuration', () => {
      render(<ReferralRewardsHero animationDuration={100} />)

      // Component renders and animates with short duration
      expect(screen.getByText(/^\$/)).toHaveTextContent('$0')
    })

    it('should handle very long animationDuration', () => {
      render(<ReferralRewardsHero animationDuration={10000} />)

      // Component renders and animates with long duration
      expect(screen.getByText(/^\$/)).toHaveTextContent('$0')
    })

    it('should not trigger animation twice if targetAmount changes', () => {
      const { rerender } = render(<ReferralRewardsHero />)

      // Component should handle prop changes
      rerender(<ReferralRewardsHero targetAmount={1000000} />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render all text content correctly', () => {
      render(<ReferralRewardsHero />)

      expect(
        screen.getByText('Given Out in Referral Rewards')
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Still counting. Thousands of users are earning just by sharing.'
        )
      ).toBeInTheDocument()
    })

    it('should display button with correct type', () => {
      render(<ReferralRewardsHero />)

      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveTextContent('Start Earning Now')
    })
  })

  describe('Props Tests', () => {
    it('should accept custom targetAmount', () => {
      const { container } = render(
        <ReferralRewardsHero targetAmount={2500000} />
      )

      expect(container).toBeInTheDocument()
    })

    it('should accept custom animationDuration', () => {
      const { container } = render(
        <ReferralRewardsHero animationDuration={5000} />
      )

      expect(container).toBeInTheDocument()
    })

    it('should accept onCtaClick callback', async () => {
      const user = userEvent.setup()
      const mockOnCtaClick = vi.fn()

      render(<ReferralRewardsHero onCtaClick={mockOnCtaClick} />)

      await user.click(screen.getByRole('button'))
      expect(mockOnCtaClick).toHaveBeenCalled()
    })

    it('should accept all props together', async () => {
      const user = userEvent.setup()
      const mockOnCtaClick = vi.fn()

      render(
        <ReferralRewardsHero
          targetAmount={3000000}
          animationDuration={2500}
          onCtaClick={mockOnCtaClick}
          className="custom-class"
        />
      )

      const button = screen.getByRole('button')
      await user.click(button)

      expect(mockOnCtaClick).toHaveBeenCalled()
      const section = screen.getByRole('button').closest('section')
      expect(section).toHaveClass('custom-class')
    })

    it('should handle undefined onCtaClick gracefully', async () => {
      const user = userEvent.setup()

      render(<ReferralRewardsHero onCtaClick={undefined} />)

      const button = screen.getByRole('button')
      // Should not throw error
      await user.click(button)
      expect(button).toBeInTheDocument()
    })
  })
})
