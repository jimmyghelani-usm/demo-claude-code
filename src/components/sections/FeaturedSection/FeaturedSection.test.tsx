import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeaturedSection } from './FeaturedSection';

describe('FeaturedSection', () => {
  it('renders with default props', () => {
    render(<FeaturedSection />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders title with correct content', () => {
    const title = 'Custom Title';
    render(<FeaturedSection title={title} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title);
  });

  it('renders description with correct content', () => {
    const description = 'Custom description text';
    render(<FeaturedSection description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders featured image with correct alt text', () => {
    render(<FeaturedSection />);
    const image = screen.getByAltText('Featured content');
    expect(image).toBeInTheDocument();
  });

  it('renders play button with correct aria label', () => {
    render(<FeaturedSection />);
    const playButton = screen.getByRole('button', { name: /play featured video/i });
    expect(playButton).toBeInTheDocument();
  });

  it('play button is clickable', async () => {
    const user = userEvent.setup();
    render(<FeaturedSection />);
    const playButton = screen.getByRole('button', { name: /play featured video/i });

    await user.click(playButton);
    expect(playButton).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<FeaturedSection className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders section with correct aria-labelledby', () => {
    render(<FeaturedSection />);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'featured-title');
  });

  it('has correct image src when imageUrl prop is provided', () => {
    const imageUrl = 'https://example.com/image.jpg';
    render(<FeaturedSection imageUrl={imageUrl} />);
    const image = screen.getByAltText('Featured content') as HTMLImageElement;
    expect(image.src).toBe(imageUrl);
  });

  it('play button SVG is marked as aria-hidden', () => {
    const { container } = render(<FeaturedSection />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
