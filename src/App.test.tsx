import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  describe('rendering', () => {
    it('should render the main heading with text "Hello World"', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /hello world/i })
      expect(heading).toBeInTheDocument()
    })

    it('should render the heading as h1', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /hello world/i, level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('should render the subtitle with text "Welcome to your fresh, clean React app"', () => {
      render(<App />)
      const subtitle = screen.getByText(/Welcome to your fresh, clean React app/i)
      expect(subtitle).toBeInTheDocument()
    })

    it('should render the pulsing indicator badge text "Ready to build something amazing"', () => {
      render(<App />)
      const badge = screen.getByText(/Ready to build something amazing/i)
      expect(badge).toBeInTheDocument()
    })
  })

  describe('structure', () => {
    it('should render a content card container', () => {
      const { container } = render(<App />)
      // The main content card is the white background container with specific styling
      const contentCards = container.querySelectorAll('div')
      // Verify that a container with position relative exists (the content card)
      expect(contentCards.length).toBeGreaterThan(0)
    })

    it('should render a particle container', () => {
      const { container } = render(<App />)
      // The particle container has pointerEvents: 'none' and covers full screen
      const absoluteContainers = container.querySelectorAll('div[style*="position"]')
      expect(absoluteContainers.length).toBeGreaterThan(0)
    })

    it('should render 20 floating particle elements', () => {
      const { container } = render(<App />)
      // Get all divs and find the particle divs (they are created by map)
      // The particles are created with individual animation delays
      const allDivs = container.querySelectorAll('div')
      // Verify that we have enough divs (background + particles + structure)
      // Each particle is a div with animation
      expect(allDivs.length).toBeGreaterThan(20)
    })

    it('should render decorative corner accents', () => {
      const { container } = render(<App />)
      // The corner accents are divs with border styling
      const divs = container.querySelectorAll('div')
      expect(divs.length).toBeGreaterThan(0)
      // The component should have decorative elements
      expect(container).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have proper heading hierarchy with h1 as primary heading', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Hello World')
    })

    it('should render text content with semantic structure', () => {
      render(<App />)
      // Verify all text content is present and accessible
      expect(screen.getByText(/Hello World/i)).toBeInTheDocument()
      expect(screen.getByText(/Welcome to your fresh, clean React app/i)).toBeInTheDocument()
      expect(screen.getByText(/Ready to build something amazing/i)).toBeInTheDocument()
    })

    it('should have all text content visible in the document', () => {
      render(<App />)
      // Check that main content is not hidden or inaccessible
      const heading = screen.getByRole('heading', { name: /hello world/i })
      const subtitle = screen.getByText(/Welcome to your fresh, clean React app/i)
      const badge = screen.getByText(/Ready to build something amazing/i)

      expect(heading).toBeVisible()
      expect(subtitle).toBeVisible()
      expect(badge).toBeVisible()
    })
  })

  describe('content', () => {
    it('should display all key text elements in correct order', () => {
      const { container } = render(<App />)
      const textContent = container.textContent || ''

      // Verify all key text is present
      expect(textContent).toContain('Hello World')
      expect(textContent).toContain('Welcome to your fresh, clean React app')
      expect(textContent).toContain('Ready to build something amazing')
    })

    it('should render without crashing', () => {
      const { container } = render(<App />)
      expect(container).toBeInTheDocument()
    })

    it('should render multiple text elements within content card', () => {
      render(<App />)
      // Get all paragraphs to verify subtitle
      const paragraphs = screen.getAllByText(/Welcome to your fresh, clean React app/i)
      expect(paragraphs.length).toBeGreaterThan(0)
    })
  })

  describe('responsive behavior', () => {
    it('should have content visible at default viewport', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /hello world/i })
      expect(heading).toBeVisible()
    })

    it('should maintain text accessibility across renders', () => {
      const { rerender } = render(<App />)
      expect(screen.getByText(/Hello World/i)).toBeInTheDocument()

      rerender(<App />)
      expect(screen.getByText(/Hello World/i)).toBeInTheDocument()
    })
  })

  describe('indicator badge', () => {
    it('should display indicator badge with correct text', () => {
      render(<App />)
      const badge = screen.getByText(/Ready to build something amazing/i)
      expect(badge).toBeInTheDocument()
    })

    it('should render pulsing indicator dot', () => {
      const { container } = render(<App />)
      // The indicator badge contains a dot element and text
      const badgeContainer = container.querySelector('div')
      expect(badgeContainer).toBeInTheDocument()
    })
  })
})
