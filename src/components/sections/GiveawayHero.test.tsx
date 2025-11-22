import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GiveawayHero } from './GiveawayHero';

describe('GiveawayHero', () => {
  it('renders the title', () => {
    render(<GiveawayHero />);
    expect(screen.getByText(/US Mobile's 10th Anniversary Giveaway/i)).toBeInTheDocument();
  });

  it('renders the subtitle with bold Tesla Cybertruck text', () => {
    render(<GiveawayHero />);
    expect(screen.getByText(/Win a/i)).toBeInTheDocument();
    expect(screen.getByText('Tesla Cybertruck')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<GiveawayHero />);
    const cta = screen.getByRole('link', { name: /Enter now to win/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '#entry-form');
  });

  it('has proper ARIA label', () => {
    render(<GiveawayHero />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveAttribute('id', 'giveaway-title');
  });
});
