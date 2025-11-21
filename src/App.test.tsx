import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import App from './App'

// Minimal mocks for browser APIs used by ReferralRewardsHero
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor() {}
}

describe('App', () => {
  beforeEach(() => {
    // Provide required globals for jsdom
    // @ts-expect-error - jsdom environment
    global.IntersectionObserver = MockIntersectionObserver as any
    // @ts-expect-error - jsdom environment
    global.requestAnimationFrame = vi.fn((cb) => {
      if (typeof cb === 'function') cb(0)
      return 1
    }) as any
    // @ts-expect-error - jsdom environment
    global.cancelAnimationFrame = vi.fn()
  })

  describe('rendering', () => {
    it('renders the Referral Rewards hero heading as h1', () => {
      render(<App />)
      const heading = screen.getByRole('heading', {
        name: /given out in referral rewards/i,
        level: 1,
      })
      expect(heading).toBeInTheDocument()
    })

    it('renders the subheading', () => {
      render(<App />)
      expect(
        screen.getByRole('heading', {
          name: /still counting\. thousands of users are earning just by sharing\./i,
          level: 2,
        })
      ).toBeInTheDocument()
    })

    it('renders the CTA button', () => {
      render(<App />)
      // Accessible name comes from aria-label on the button
      expect(
        screen.getByRole('button', {
          name: /start earning referral rewards now/i,
        })
      ).toBeInTheDocument()
    })
  })

  describe('structure', () => {
    it('renders main content area', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })
  })
})
