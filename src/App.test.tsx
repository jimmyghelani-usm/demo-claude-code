import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the TradeInLandingPage', () => {
    render(<App />);
    // Check that navigation is present (multiple header elements exist)
    const headers = screen.getAllByRole('banner');
    expect(headers.length).toBeGreaterThan(0);
  });

  it('renders the navigation header with correct content', () => {
    render(<App />);
    // Check for navigation menu items (may appear in multiple headers)
    const plansLinks = screen.getAllByText('PLANS');
    const networksLinks = screen.getAllByText('NETWORKS');
    expect(plansLinks.length).toBeGreaterThan(0);
    expect(networksLinks.length).toBeGreaterThan(0);
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
