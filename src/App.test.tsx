import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText(/Vite \+ React \+ TypeScript/i)).toBeInTheDocument()
  })

  it('renders the counter button with initial count', () => {
    render(<App />)
    expect(
      screen.getByRole('button', { name: /count is 0/i })
    ).toBeInTheDocument()
  })

  it('increments count when button is clicked', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })

    fireEvent.click(button)
    expect(
      screen.getByRole('button', { name: /count is 1/i })
    ).toBeInTheDocument()

    fireEvent.click(button)
    expect(
      screen.getByRole('button', { name: /count is 2/i })
    ).toBeInTheDocument()
  })

  it('displays the features list', () => {
    render(<App />)
    expect(screen.getByText(/Configured with:/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Vite for lightning-fast builds/i)
    ).toBeInTheDocument()
  })
})
