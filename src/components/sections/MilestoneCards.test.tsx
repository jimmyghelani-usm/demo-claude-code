import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MilestoneCards } from './MilestoneCards';

describe('MilestoneCards', () => {
  it('renders the section title', () => {
    render(<MilestoneCards />);
    expect(screen.getByText(/10 Years of US Mobile: Key Milestones/i)).toBeInTheDocument();
  });

  it('renders all default milestone cards', () => {
    render(<MilestoneCards />);
    expect(screen.getByText('Global Coverage')).toBeInTheDocument();
    expect(screen.getByText('Flexible Plans')).toBeInTheDocument();
    expect(screen.getByText('Premium Data')).toBeInTheDocument();
    expect(screen.getByText('Expert Support Team')).toBeInTheDocument();
  });

  it('renders custom milestones when provided', () => {
    const customMilestones = [
      { icon: 'test', title: 'Test Milestone', description: 'Test description' }
    ];
    render(<MilestoneCards milestones={customMilestones} />);
    expect(screen.getByText('Test Milestone')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<MilestoneCards className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
