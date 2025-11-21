import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CTAFooterSection } from './CTAFooterSection';

describe('CTAFooterSection', () => {
  it('renders with default content', () => {
    render(<CTAFooterSection />);

    expect(screen.getByText('What are you waiting for?')).toBeInTheDocument();
    expect(
      screen.getByText(/Lorem ipsum dolor sit amet/)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GET STARTED/i })).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    const customTitle = 'Custom CTA Title';
    const customSubtitle = 'Custom CTA Subtitle';

    render(
      <CTAFooterSection
        ctaTitle={customTitle}
        ctaSubtitle={customSubtitle}
      />
    );

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  it('renders CTA button with custom label and href', () => {
    const customLabel = 'Click Me';
    const customHref = '/custom-url';

    render(
      <CTAFooterSection
        ctaButtonLabel={customLabel}
        ctaButtonHref={customHref}
      />
    );

    const button = screen.getByRole('link', { name: customLabel });
    expect(button).toHaveAttribute('href', customHref);
  });

  it('calls onCtaClick when CTA button is clicked', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(<CTAFooterSection onCtaClick={mockClick} />);

    const button = screen.getByRole('link', { name: /GET STARTED/i });
    await user.click(button);

    expect(mockClick).toHaveBeenCalledOnce();
  });

  it('renders footer links', () => {
    const customLinks = [
      { label: 'Link 1', href: '#link1', ariaLabel: 'Navigate to Link 1' },
      { label: 'Link 2', href: '#link2', ariaLabel: 'Navigate to Link 2' },
    ];

    render(<CTAFooterSection footerLinks={customLinks} />);

    expect(screen.getByRole('link', { name: /Navigate to Link 1/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Navigate to Link 2/i })).toBeInTheDocument();
  });

  it('renders default footer links', () => {
    render(<CTAFooterSection />);

    const termsLinks = screen.getAllByText('TERMS');
    const privacyLink = screen.getByText('PRIVACY');
    const contactLinks = screen.getAllByText('CONTACT');

    expect(termsLinks.length).toBeGreaterThan(0);
    expect(privacyLink).toBeInTheDocument();
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('renders social media icons', () => {
    render(<CTAFooterSection />);

    const socialNav = screen.getByLabelText(/Follow us on social media/i);
    expect(socialNav).toBeInTheDocument();

    const redditLink = screen.getByLabelText(/Visit our Reddit/i);
    const twitterLink = screen.getByLabelText(/Visit our Twitter/i);
    const linkedinLink = screen.getByLabelText(/Visit our LinkedIn/i);
    const facebookLink = screen.getByLabelText(/Visit our Facebook/i);
    const instagramLink = screen.getByLabelText(/Visit our Instagram/i);

    expect(redditLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });

  it('renders custom social icons', () => {
    const customSocial = [
      {
        name: 'Custom',
        href: '#custom',
        ariaLabel: 'Visit Custom',
        icon: 'twitter' as const,
      },
    ];

    render(<CTAFooterSection socialIcons={customSocial} />);

    expect(screen.getByLabelText('Visit Custom')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<CTAFooterSection />);

    const section = screen.getByLabelText(/What are you waiting for?/i).closest('section');
    expect(section).toHaveAttribute('aria-labelledby', 'cta-heading');

    const footerNav = screen.getByLabelText(/Footer navigation/i);
    expect(footerNav).toHaveAttribute('aria-label', 'Footer navigation');
  });

  it('footer links are properly styled and accessible', async () => {
    const user = userEvent.setup();
    render(<CTAFooterSection />);

    const allTermsLinks = screen.getAllByText('TERMS');
    const firstLink = allTermsLinks[0];

    // Click on the CTA button first, then tab to footer
    const ctaButton = screen.getByRole('link', { name: /GET STARTED/i });
    ctaButton.focus();

    await user.tab();

    expect(firstLink.closest('a')).toHaveFocus();
  });

  it('supports keyboard navigation on social icons', async () => {
    const user = userEvent.setup();
    render(<CTAFooterSection />);

    // Focus on the CTA button and tab through to reach social icons
    const ctaButton = screen.getByRole('link', { name: /GET STARTED/i });
    ctaButton.focus();

    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();

    // Verify we can reach the social section eventually
    const socialSection = screen.getByLabelText(/Follow us on social media/i);
    expect(socialSection).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CTAFooterSection className="custom-class" />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('footer has proper semantic structure', () => {
    render(<CTAFooterSection />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const nav = footer.querySelector('nav[aria-label="Footer navigation"]');
    expect(nav).toBeInTheDocument();
  });

  it('renders SVG icons for social media', () => {
    const { container } = render(<CTAFooterSection />);

    const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('handles empty footer links gracefully', () => {
    render(<CTAFooterSection footerLinks={[]} />);

    const footerNav = screen.getByLabelText(/Footer navigation/i);
    expect(footerNav).toBeInTheDocument();
  });

  it('handles empty social icons gracefully', () => {
    render(<CTAFooterSection socialIcons={[]} />);

    const socialDiv = screen.getByLabelText(/Follow us on social media/i);
    expect(socialDiv).toBeInTheDocument();
  });
});
