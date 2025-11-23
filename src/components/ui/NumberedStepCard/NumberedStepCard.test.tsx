import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NumberedStepCard } from './NumberedStepCard';

describe('NumberedStepCard', () => {
  it('renders step number in badge', () => {
    render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
      />
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Step');
  });

  it('renders description correctly', () => {
    render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
      />
    );
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders multiple steps with different numbers', () => {
    const { container } = render(
      <div>
        <NumberedStepCard stepNumber={1} title="Step 1" description="First step" />
        <NumberedStepCard stepNumber={2} title="Step 2" description="Second step" />
        <NumberedStepCard stepNumber={3} title="Step 3" description="Third step" />
      </div>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders semantic heading element', () => {
    render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
      />
    );
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.tagName).toBe('H3');
  });

  it('has proper accessibility label', () => {
    render(
      <NumberedStepCard
        stepNumber={2}
        title="Verify Info"
        description="Verify your information"
      />
    );
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'Step 2: Verify Info');
  });

  it('badge has aria-hidden for non-semantic use', () => {
    const { container } = render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
      />
    );
    const badge = container.querySelector('[aria-hidden="true"]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('1');
  });

  it('applies custom className', () => {
    const { container } = render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
        className="custom-class"
      />
    );
    const card = container.querySelector('[role="article"]');
    expect(card?.className).toContain('custom-class');
  });

  it('handles long titles', () => {
    const longTitle = 'This is a very long step title that spans multiple lines and should render correctly';
    render(
      <NumberedStepCard
        stepNumber={1}
        title={longTitle}
        description="Test description"
      />
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(longTitle);
  });

  it('handles long descriptions', () => {
    const longDescription =
      'This is a very long description that provides detailed information about the step in the process and should wrap to multiple lines.';
    render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description={longDescription}
      />
    );
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('maintains proper DOM structure', () => {
    const { container } = render(
      <NumberedStepCard
        stepNumber={1}
        title="Test Step"
        description="Test description"
      />
    );
    const article = container.querySelector('[role="article"]');
    const badge = article?.querySelector('[aria-hidden="true"]');
    const content = article?.querySelector('div:has(h3)');
    const title = article?.querySelector('h3');
    const description = article?.querySelector('p');

    expect(badge).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('handles large step numbers', () => {
    render(
      <NumberedStepCard
        stepNumber={999}
        title="Far Step"
        description="A step far down the line"
      />
    );
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('handles zero step number', () => {
    render(
      <NumberedStepCard
        stepNumber={0}
        title="Pre-Step"
        description="Before the main steps"
      />
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
