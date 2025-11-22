import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PricingCard } from './PricingCard';

describe('PricingCard', () => {
  it('renders plan name and description', () => {
    render(
      <PricingCard
        planName="Test Plan"
        description="Test description"
        price="10"
      />
    );
    expect(screen.getByText('Test Plan')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders price with dollar sign', () => {
    render(
      <PricingCard
        planName="Test"
        description="Desc"
        price="15.99"
      />
    );
    expect(screen.getByText(/\$15\.99/)).toBeInTheDocument();
  });

  it('renders default period when not provided', () => {
    render(
      <PricingCard
        planName="Test"
        description="Desc"
        price="10"
      />
    );
    expect(screen.getByText('/month')).toBeInTheDocument();
  });

  it('renders custom period when provided', () => {
    render(
      <PricingCard
        planName="Test"
        description="Desc"
        price="100"
        period="/year"
      />
    );
    expect(screen.getByText('/year')).toBeInTheDocument();
  });

  it('renders feature list when provided', () => {
    const features = ['Feature 1', 'Feature 2', 'Feature 3'];
    render(
      <PricingCard
        planName="Test"
        description="Desc"
        price="10"
        features={features}
      />
    );
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders CTA button', () => {
    render(
      <PricingCard
        planName="Test"
        description="Desc"
        price="10"
      />
    );
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  it('applies highlighted class when highlighted prop is true', () => {
    const { container } = render(
      <PricingCard
        planName="Test"
        description="Desc"
        price="10"
        highlighted
      />
    );
    const card = container.querySelector('[role="article"]');
    expect(card?.className).toContain('highlighted');
  });
});
