import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiStepForm } from './MultiStepForm';

describe('MultiStepForm', () => {
  it('renders with default props', () => {
    render(<MultiStepForm />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('displays step 1 initially', () => {
    render(<MultiStepForm />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('First, let');
  });

  it('renders form fields on step 1', () => {
    render(<MultiStepForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('navigates to step 2 when clicking next', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    const nextButton = screen.getByRole('button', { name: /go to next step/i });
    await user.click(nextButton);

    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByText(/Activate a US Mobile Line/i)).toBeInTheDocument();
  });

  it('displays pricing plans on step 2', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    const nextButton = screen.getByRole('button', { name: /go to next step/i });
    await user.click(nextButton);

    expect(screen.getByText('Unlimited')).toBeInTheDocument();
    expect(screen.getByText('By the Gig')).toBeInTheDocument();
    expect(screen.getAllByText('Light')[0]).toBeInTheDocument();
  });

  it('navigates to step 3 when clicking next from step 2', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    let nextButton = screen.getByRole('button', { name: /go to next step/i });
    await user.click(nextButton); // Step 2
    nextButton = screen.getByRole('button', { name: /go to next step/i });
    await user.click(nextButton); // Step 3

    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(screen.getByText(/all set/i)).toBeInTheDocument();
  });

  it('back button is disabled on step 1', () => {
    render(<MultiStepForm />);
    const backButton = screen.getByRole('button', { name: /go to previous step/i });
    expect(backButton).toBeDisabled();
  });

  it('back button navigates to previous step', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    let nextButton = screen.getByRole('button', { name: /go to next step/i });
    await user.click(nextButton); // Step 2

    const backButton = screen.getByRole('button', { name: /go to previous step/i });
    await user.click(backButton); // Step 1

    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('next button shows complete text on last step', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);

    let nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton); // Step 2
    nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton); // Step 3

    nextButton = screen.getByRole('button', { name: /go to next step/i });
    expect(nextButton).toHaveTextContent('Complete');
    expect(nextButton).toBeDisabled();
  });

  it('calls onStepChange callback when step changes', async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();
    render(<MultiStepForm onStepChange={onStepChange} />);

    const nextButton = screen.getByRole('button', { name: /go to next step/i });
    await user.click(nextButton);

    expect(onStepChange).toHaveBeenCalledWith(2);
  });

  it('progress bar updates with current step', async () => {
    const user = userEvent.setup();
    const { container } = render(<MultiStepForm />);

    let progressFill = container.querySelector('[role="progressbar"]') as HTMLElement;
    const width1 = progressFill.style.width;
    expect(width1).toMatch(/33\.333/);

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    progressFill = container.querySelector('[role="progressbar"]') as HTMLElement;
    const width2 = progressFill.style.width;
    expect(width2).toMatch(/66\.666/);
  });

  it('has correct aria attributes', () => {
    render(<MultiStepForm />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
  });

  it('accepts custom steps', () => {
    const customSteps = [
      { stepNumber: 1, title: 'Custom Step 1', description: 'Desc 1' },
      { stepNumber: 2, title: 'Custom Step 2', description: 'Desc 2' }
    ];
    render(<MultiStepForm steps={customSteps} />);
    expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Custom Step 1')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<MultiStepForm className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
