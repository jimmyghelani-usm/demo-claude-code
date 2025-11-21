import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the TradeInLandingPage', () => {
    render(<App />);
    // Check that the hero section is rendered (part of TradeInLandingPage)
    expect(screen.getByText(/Lorem ipsum dolor amet/i)).toBeInTheDocument();
  });

  it('renders the hero section with correct content', () => {
    render(<App />);
    expect(screen.getByText(/Lorem ipsum dolor amet/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Trade in your device and get the latest model with instant credit/i)
    ).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Get started/i })).toBeInTheDocument();
  });

  it('renders the FAQ section', () => {
    render(<App />);
    expect(
      screen.getByText(/You've got questions, we've got answers!/i)
    ).toBeInTheDocument();
  });
});
