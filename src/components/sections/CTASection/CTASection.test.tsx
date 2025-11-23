import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CTASection } from './CTASection';

describe('CTASection', () => {
  it('renders section with title', () => {
    render(
      <CTASection
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders title and description', () => {
    render(
      <CTASection
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <CTASection
        title="Test"
        description="My description"
      />
    );
    expect(screen.getByText('My description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<CTASection title="Test" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('renders background image when provided', () => {
    render(
      <CTASection
        title="Test"
        image="https://example.com/image.jpg"
      />
    );
    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('does not render image container when image not provided', () => {
    const { container } = render(<CTASection title="Test" />);
    const imageContainer = container.querySelector('img');
    expect(imageContainer).not.toBeInTheDocument();
  });

  it('renders CTA button with default label', () => {
    render(<CTASection title="Test" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Get Started');
  });

  it('renders CTA button with custom label', () => {
    render(
      <CTASection
        title="Test"
        ctaLabel="Custom Button"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Custom Button');
  });

  it('calls onClick handler when CTA button is clicked', () => {
    const handleClick = vi.fn();
    render(
      <CTASection
        title="Test"
        onCtaClick={handleClick}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders semantic section element', () => {
    const { container } = render(<CTASection title="Test" />);
    const section = container.querySelector('section');
    expect(section?.tagName).toBe('SECTION');
  });

  it('applies custom className', () => {
    const { container } = render(
      <CTASection
        title="Test"
        className="custom-cta"
      />
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('custom-cta');
  });

  it('handles long title correctly', () => {
    const longTitle = 'This is a very long title that spans multiple lines and provides detailed information about the offer.';
    render(
      <CTASection
        title={longTitle}
        description="Description"
      />
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(longTitle);
  });

  it('handles long description correctly', () => {
    const longDescription =
      'This is a very long description that provides comprehensive information about the call-to-action and should wrap to multiple lines on the page.';
    render(
      <CTASection
        title="Test"
        description={longDescription}
      />
    );
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('maintains proper DOM structure', () => {
    const { container } = render(
      <CTASection
        title="Test"
        description="Description"
        image="https://example.com/image.jpg"
        ctaLabel="Click Me"
      />
    );
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const contentDiv = section?.querySelector('[class*="content"]');
    expect(contentDiv).toBeInTheDocument();

    const heading = section?.querySelector('h2');
    expect(heading).toBeInTheDocument();

    const button = section?.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('button has proper type attribute', () => {
    render(<CTASection title="Test" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('image has empty alt text for decorative image', () => {
    render(
      <CTASection
        title="Test"
        image="https://example.com/image.jpg"
      />
    );
    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('alt', '');
  });

  it('renders without CTA button when ctaLabel is empty string', () => {
    render(
      <CTASection
        title="Test"
        ctaLabel=""
      />
    );
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('handles all props together correctly', () => {
    const handleClick = vi.fn();
    render(
      <CTASection
        title="Promotion Title"
        description="Special offer description"
        image="https://example.com/promo.jpg"
        ctaLabel="Claim Offer"
        onCtaClick={handleClick}
      />
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Promotion Title');
    expect(screen.getByText('Special offer description')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'https://example.com/promo.jpg');

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Claim Offer');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
