import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  describe('rendering', () => {
    it('should render the main heading "Something major is coming."', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /something major is coming/i })
      expect(heading).toBeInTheDocument()
    })

    it('should render the heading as h1', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /something major is coming/i, level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('should render the subheadline about US Mobile customer', () => {
      render(<App />)
      const subtitle = screen.getByText(/It's never been better to be a US Mobile customer/i)
      expect(subtitle).toBeInTheDocument()
    })

    it('should render countdown timer', () => {
      render(<App />)
      const timer = screen.getByRole('timer')
      expect(timer).toBeInTheDocument()
    })
  })

  describe('structure', () => {
    it('should render navigation component', () => {
      render(<App />)
      const nav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(nav).toBeInTheDocument()
    })

    it('should render main content area', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should render navigation links', () => {
      render(<App />)
      expect(screen.getByRole('link', { name: /plans/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /networks/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /business/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /students/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument()
    })

    it('should render CTA buttons', () => {
      render(<App />)
      expect(screen.getByRole('link', { name: /try for free/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have proper heading hierarchy with h1 as primary heading', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(/something major is coming/i)
    })

    it('should render text content with semantic structure', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /something major is coming/i })
      expect(heading).toBeInTheDocument()
      expect(screen.getByText(/It's never been better to be a US Mobile customer/i)).toBeInTheDocument()
    })

    it('should have all text content visible in the document', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /something major is coming/i })
      const subtitle = screen.getByText(/It's never been better to be a US Mobile customer/i)

      expect(heading).toBeVisible()
      expect(subtitle).toBeVisible()
    })
  })

  describe('content', () => {
    it('should display all key text elements', () => {
      const { container } = render(<App />)
      const textContent = container.textContent || ''

      expect(textContent).toContain('Something')
      expect(textContent).toContain('major')
      expect(textContent).toContain('is coming')
      expect(textContent).toContain("It's never been better to be a US Mobile customer")
    })

    it('should render without crashing', () => {
      const { container } = render(<App />)
      expect(container).toBeInTheDocument()
    })

    it('should render countdown timer with time segments', () => {
      render(<App />)
      expect(screen.getByText(/days/i)).toBeInTheDocument()
      expect(screen.getByText(/hours/i)).toBeInTheDocument()
      expect(screen.getByText(/minutes/i)).toBeInTheDocument()
      expect(screen.getByText(/seconds/i)).toBeInTheDocument()
    })
  })

  describe('responsive behavior', () => {
    it('should have content visible at default viewport', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { name: /something major is coming/i })
      expect(heading).toBeVisible()
    })

    it('should maintain text accessibility across renders', () => {
      const { rerender } = render(<App />)
      const heading = screen.getByRole('heading', { name: /something major is coming/i })
      expect(heading).toBeInTheDocument()

      rerender(<App />)
      const headingAfterRerender = screen.getByRole('heading', { name: /something major is coming/i })
      expect(headingAfterRerender).toBeInTheDocument()
    })
  })

  describe('call to action', () => {
    it('should render LOGIN TO SIGN UP button', () => {
      render(<App />)
      const ctaButton = screen.getByRole('link', { name: /login to sign up/i })
      expect(ctaButton).toBeInTheDocument()
    })

    it('should have chat support button', () => {
      render(<App />)
      const chatButton = screen.getByRole('button', { name: /open chat support/i })
      expect(chatButton).toBeInTheDocument()
    })
  })
})
