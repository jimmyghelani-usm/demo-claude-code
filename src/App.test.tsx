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
    it('renders the BusinessPageHeader', () => {
      render(<App />)
      // Look for the logo/brand text in the header (should be a heading or have a specific role)
      expect(
        screen.getAllByText('US Mobile').length
      ).toBeGreaterThan(0)
    })

    it('renders the BusinessPageHero heading', () => {
      render(<App />)
      expect(
        screen.getByRole('heading', {
          name: /welcome to us mobile/i,
          level: 1,
        })
      ).toBeInTheDocument()
    })

    it('renders the CTA button', () => {
      render(<App />)
      // CTA button from CTASection component
      expect(
        screen.getByRole('button', {
          name: /get started now/i,
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
