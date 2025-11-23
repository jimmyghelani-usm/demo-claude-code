import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders title correctly', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders title and description', () => {
    render(
      <SectionHeading
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<SectionHeading title="Test Title" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('applies center alignment by default', () => {
    const { container } = render(
      <SectionHeading
        title="Test Title"
        description="Test Description"
      />
    );
    const headingContainer = container.firstChild;
    expect(headingContainer?.className).toContain('center');
  });

  it('applies left alignment when specified', () => {
    const { container } = render(
      <SectionHeading
        title="Test Title"
        align="left"
      />
    );
    const headingContainer = container.firstChild;
    expect(headingContainer?.className).toContain('left');
  });

  it('applies right alignment when specified', () => {
    const { container } = render(
      <SectionHeading
        title="Test Title"
        align="right"
      />
    );
    const headingContainer = container.firstChild;
    expect(headingContainer?.className).toContain('right');
  });

  it('applies custom className', () => {
    const { container } = render(
      <SectionHeading
        title="Test Title"
        className="custom-class"
      />
    );
    const headingContainer = container.firstChild;
    expect(headingContainer?.className).toContain('custom-class');
  });

  it('renders semantic heading element', () => {
    render(<SectionHeading title="Test Title" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.tagName).toBe('H2');
  });

  it('handles long titles correctly', () => {
    const longTitle = 'This is a very long title that spans multiple lines and should be rendered correctly';
    render(<SectionHeading title={longTitle} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(longTitle);
  });

  it('handles long descriptions correctly', () => {
    const longDescription =
      'This is a very long description that provides detailed information about the section and should wrap to multiple lines.';
    render(
      <SectionHeading
        title="Test Title"
        description={longDescription}
      />
    );
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('maintains proper DOM structure', () => {
    const { container } = render(
      <SectionHeading
        title="Test Title"
        description="Test Description"
      />
    );
    const containerElement = container.firstChild;
    const heading = containerElement?.querySelector('h2');
    const description = containerElement?.querySelector('p');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
