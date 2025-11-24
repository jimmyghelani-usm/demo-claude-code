import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsMobileTradeInFooter, type FooterLink, type SocialIcon } from './UsMobileTradeInFooter';

const mockFooterLinks: FooterLink[] = [
  { label: 'About US Mobile', href: 'https://example.com/about' },
  { label: 'Privacy Policy', href: 'https://example.com/privacy' },
  { label: 'Terms of Service', href: 'https://example.com/terms' },
];

const mockSocialIcons: SocialIcon[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/usmobile',
    ariaLabel: 'Visit US Mobile on Facebook',
    icon: 'facebook',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/usmobile',
    ariaLabel: 'Visit US Mobile on Twitter',
    icon: 'twitter',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/usmobile',
    ariaLabel: 'Visit US Mobile on Instagram',
    icon: 'instagram',
  },
];

describe('UsMobileTradeInFooter', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<UsMobileTradeInFooter />);

      expect(screen.getByText('US Mobile')).toBeInTheDocument();
      expect(screen.getByText(/The best way to get the most value/i)).toBeInTheDocument();
      expect(screen.getByText(/© 2024 US Mobile/i)).toBeInTheDocument();
    });

    it('renders with custom brand text', () => {
      const customBrand = 'My Trade In Company';

      render(<UsMobileTradeInFooter brandText={customBrand} />);

      expect(screen.getByText(customBrand)).toBeInTheDocument();
    });

    it('renders with custom brand description', () => {
      const customDescription = 'Custom brand description';

      render(<UsMobileTradeInFooter brandDescription={customDescription} />);

      expect(screen.getByText(customDescription)).toBeInTheDocument();
    });

    it('renders with custom copyright text', () => {
      const customCopyright = '© 2024 My Company. All rights reserved.';

      render(<UsMobileTradeInFooter copyrightText={customCopyright} />);

      expect(screen.getByText(customCopyright)).toBeInTheDocument();
    });

    it('renders footer element with aria-label', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const footer = container.querySelector('footer');
      expect(footer).toHaveAttribute('aria-label', 'Footer');
    });

    it('applies custom className', () => {
      const { container } = render(
        <UsMobileTradeInFooter className="custom-footer-class" />
      );

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('custom-footer-class');
    });

    it('renders all default footer links', () => {
      render(<UsMobileTradeInFooter />);

      expect(screen.getByText('About US Mobile')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Contact Support')).toBeInTheDocument();
      expect(screen.getByText('Trade-In FAQs')).toBeInTheDocument();
      expect(screen.getByText('Device Status')).toBeInTheDocument();
    });

    it('renders with custom footer links', () => {
      render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      expect(screen.getByText('About US Mobile')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });

    it('renders footer links as list items', () => {
      const { container } = render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(mockFooterLinks.length);
    });

    it('renders all default social icons', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const socialLinks = container.querySelectorAll('[class*="socialIcon"]');
      expect(socialLinks.length).toBeGreaterThanOrEqual(3);
    });

    it('renders with custom social icons', () => {
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      mockSocialIcons.forEach((social) => {
        const link = screen.getByLabelText(social.ariaLabel);
        expect(link).toHaveAttribute('href', social.href);
      });
    });

    it('renders empty footer links gracefully', () => {
      render(<UsMobileTradeInFooter footerLinks={[]} />);

      const heading = screen.getByText('US Mobile');
      expect(heading).toBeInTheDocument();
    });

    it('renders empty social icons gracefully', () => {
      render(<UsMobileTradeInFooter socialIcons={[]} />);

      const heading = screen.getByText('US Mobile');
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Footer Links', () => {
    it('footer links have correct href attributes', () => {
      render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      const link1 = screen.getByText('About US Mobile') as HTMLAnchorElement;
      expect(link1).toHaveAttribute('href', 'https://example.com/about');

      const link2 = screen.getByText('Privacy Policy') as HTMLAnchorElement;
      expect(link2).toHaveAttribute('href', 'https://example.com/privacy');
    });

    it('footer links are keyboard accessible', () => {
      render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        link.focus();
        expect(link).toHaveFocus();
      });
    });

    it('footer links are semantic anchor elements', () => {
      render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link.tagName).toBe('A');
      });
    });

    it('footer links have aria-label when provided', () => {
      const customLinks: FooterLink[] = [
        {
          label: 'Support',
          href: '#',
          ariaLabel: 'Contact our support team',
        },
      ];

      render(<UsMobileTradeInFooter footerLinks={customLinks} />);

      const link = screen.getByLabelText('Contact our support team');
      expect(link).toBeInTheDocument();
    });

    it('footer links default aria-label to label text', () => {
      render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      const link = screen.getByText('About US Mobile') as HTMLAnchorElement;
      expect(link).toHaveAccessibleName('About US Mobile');
    });
  });

  describe('Social Icons', () => {
    it('social icons have correct href attributes', () => {
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const fbLink = screen.getByLabelText('Visit US Mobile on Facebook');
      expect(fbLink).toHaveAttribute('href', 'https://facebook.com/usmobile');

      const twitterLink = screen.getByLabelText('Visit US Mobile on Twitter');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/usmobile');
    });

    it('social icons have aria-label attributes', () => {
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      mockSocialIcons.forEach((social) => {
        const icon = screen.getByLabelText(social.ariaLabel);
        expect(icon).toHaveAttribute('aria-label', social.ariaLabel);
      });
    });

    it('social icons have title attribute for tooltip', () => {
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const fbIcon = screen.getByLabelText('Visit US Mobile on Facebook');
      expect(fbIcon).toHaveAttribute('title', 'Facebook');
    });

    it('social icon SVGs are rendered', () => {
      const { container } = render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const svgs = container.querySelectorAll('svg[class*="socialSvg"]');
      expect(svgs.length).toBe(mockSocialIcons.length);
    });

    it('social icons are keyboard accessible', () => {
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      mockSocialIcons.forEach((social) => {
        const icon = screen.getByLabelText(social.ariaLabel);
        icon.focus();
        expect(icon).toHaveFocus();
      });
    });

    it('renders different social media icon types', () => {
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      expect(screen.getByLabelText('Visit US Mobile on Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit US Mobile on Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit US Mobile on Instagram')).toBeInTheDocument();
    });

    it('renders all icon types (facebook, twitter, linkedin, instagram, reddit)', () => {
      const allIcons: SocialIcon[] = [
        { name: 'Facebook', href: '#', ariaLabel: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', href: '#', ariaLabel: 'Twitter', icon: 'twitter' },
        { name: 'LinkedIn', href: '#', ariaLabel: 'LinkedIn', icon: 'linkedin' },
        { name: 'Instagram', href: '#', ariaLabel: 'Instagram', icon: 'instagram' },
        { name: 'Reddit', href: '#', ariaLabel: 'Reddit', icon: 'reddit' },
      ];

      render(<UsMobileTradeInFooter socialIcons={allIcons} />);

      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
      expect(screen.getByLabelText('Reddit')).toBeInTheDocument();
    });
  });

  describe('Hover Effects', () => {
    it('social icon hover state updates', async () => {
      const user = userEvent.setup();
      const { container } = render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const fbIcon = screen.getByLabelText('Visit US Mobile on Facebook');

      // Hover on icon
      await user.hover(fbIcon);
      expect(fbIcon.className).toContain('hovered');

      // Unhover
      await user.unhover(fbIcon);
      expect(fbIcon.className).not.toContain('hovered');
    });

    it('multiple social icons can be hovered independently', async () => {
      const user = userEvent.setup();
      render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const fbIcon = screen.getByLabelText('Visit US Mobile on Facebook');
      const twitterIcon = screen.getByLabelText('Visit US Mobile on Twitter');

      await user.hover(fbIcon);
      expect(fbIcon.className).toContain('hovered');
      expect(twitterIcon.className).not.toContain('hovered');

      await user.unhover(fbIcon);
      await user.hover(twitterIcon);
      expect(fbIcon.className).not.toContain('hovered');
      expect(twitterIcon.className).toContain('hovered');
    });
  });

  describe('Accessibility', () => {
    it('footer has semantic footer element', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('footer links section has aria-label for navigation', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const nav = container.querySelector('nav[aria-label="Footer navigation"]');
      expect(nav).toBeInTheDocument();
    });

    it('social section has aria-label', () => {
      const { container } = render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const section = container.querySelector('[aria-label="Follow us on social media"]');
      expect(section).toBeInTheDocument();
    });

    it('renders with proper heading hierarchy in brand section', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const h3 = container.querySelector('h3');
      expect(h3).toBeInTheDocument();
      expect(h3?.textContent).toBe('US Mobile');
    });

    it('SVG icons have aria-hidden attribute', () => {
      const { container } = render(<UsMobileTradeInFooter socialIcons={mockSocialIcons} />);

      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('all links are accessible via keyboard navigation', () => {
      render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} socialIcons={mockSocialIcons} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        link.focus();
        expect(link).toHaveFocus();
      });
    });
  });

  describe('Responsive Layout', () => {
    it('renders container element for layout', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const footerContainer = container.querySelector('[class*="container"]');
      expect(footerContainer).toBeInTheDocument();
    });

    it('maintains structure at different sizes', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const footer = container.querySelector('footer');
      const brandSection = container.querySelector('[class*="brandSection"]');
      const linksSection = container.querySelector('[class*="linksSection"]');
      const socialSection = container.querySelector('[class*="socialSection"]');
      const bottomSection = container.querySelector('[class*="bottom"]');

      expect(footer).toBeInTheDocument();
      expect(brandSection).toBeInTheDocument();
      expect(linksSection).toBeInTheDocument();
      expect(socialSection).toBeInTheDocument();
      expect(bottomSection).toBeInTheDocument();
    });

    it('renders footer links as unordered list', () => {
      const { container } = render(<UsMobileTradeInFooter footerLinks={mockFooterLinks} />);

      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();

      const lis = ul?.querySelectorAll('li');
      expect(lis?.length).toBe(mockFooterLinks.length);
    });

    it('renders copyright text in bottom section', () => {
      const { container } = render(<UsMobileTradeInFooter />);

      const bottomSection = container.querySelector('[class*="bottom"]');
      expect(bottomSection?.textContent).toContain('© 2024 US Mobile');
    });
  });

  describe('Content Edge Cases', () => {
    it('handles very long brand description', () => {
      const longDesc = 'A'.repeat(200);
      render(<UsMobileTradeInFooter brandDescription={longDesc} />);

      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it('handles special characters in brand text', () => {
      render(<UsMobileTradeInFooter brandText="US Mobile & Co. <Official>" />);

      expect(screen.getByText(/US Mobile & Co/)).toBeInTheDocument();
    });

    it('handles many footer links (10+)', () => {
      const manyLinks: FooterLink[] = Array.from({ length: 12 }, (_, idx) => ({
        label: `Link ${idx + 1}`,
        href: `#link-${idx + 1}`,
      }));

      render(<UsMobileTradeInFooter footerLinks={manyLinks} />);

      manyLinks.forEach((link) => {
        expect(screen.getByText(link.label)).toBeInTheDocument();
      });
    });

    it('handles many social icons', () => {
      const manySocial: SocialIcon[] = Array.from({ length: 8 }, (_, idx) => ({
        name: `Social ${idx + 1}`,
        href: `#social-${idx + 1}`,
        ariaLabel: `Social ${idx + 1}`,
        icon: 'facebook',
      }));

      render(<UsMobileTradeInFooter socialIcons={manySocial} />);

      manySocial.forEach((social) => {
        const link = screen.getByLabelText(social.ariaLabel);
        expect(link).toBeInTheDocument();
      });
    });

    it('handles emoji in text', () => {
      render(
        <UsMobileTradeInFooter
          brandText="US Mobile 📱"
          copyrightText="© 2024 US Mobile 🚀"
        />
      );

      expect(screen.getByText(/US Mobile 📱/)).toBeInTheDocument();
      expect(screen.getByText(/© 2024 US Mobile 🚀/)).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('renders complete footer with all elements', () => {
      render(
        <UsMobileTradeInFooter
          brandText="US Mobile"
          brandDescription="Best trade-in value"
          footerLinks={mockFooterLinks}
          socialIcons={mockSocialIcons}
          copyrightText="© 2024 US Mobile"
        />
      );

      // Brand section
      expect(screen.getByText('US Mobile')).toBeInTheDocument();
      expect(screen.getByText('Best trade-in value')).toBeInTheDocument();

      // Links
      expect(screen.getByText('About US Mobile')).toBeInTheDocument();

      // Social icons
      expect(screen.getByLabelText('Visit US Mobile on Facebook')).toBeInTheDocument();

      // Copyright
      expect(screen.getByText('© 2024 US Mobile')).toBeInTheDocument();
    });

    it('handles complete user navigation workflow', async () => {
      const user = userEvent.setup();
      render(
        <UsMobileTradeInFooter
          footerLinks={mockFooterLinks}
          socialIcons={mockSocialIcons}
        />
      );

      // User can navigate footer links
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);

      // User can tab through all interactive elements
      links.forEach((link) => {
        link.focus();
        expect(link).toHaveFocus();
      });
    });

    it('maintains accessibility with all custom props', () => {
      render(
        <UsMobileTradeInFooter
          brandText="Custom Brand"
          brandDescription="Custom description"
          footerLinks={[
            { label: 'Custom Link', href: '#', ariaLabel: 'Custom aria label' },
          ]}
          socialIcons={[
            {
              name: 'Custom',
              href: '#',
              ariaLabel: 'Custom social',
              icon: 'facebook',
            },
          ]}
          copyrightText="Custom copyright"
        />
      );

      expect(screen.getByText('Custom Brand')).toBeInTheDocument();
      expect(screen.getByLabelText('Custom aria label')).toBeInTheDocument();
      expect(screen.getByLabelText('Custom social')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('has default footer links when not provided', () => {
      render(<UsMobileTradeInFooter footerLinks={undefined} />);

      expect(screen.getByText('About US Mobile')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('has default social icons when not provided', () => {
      render(<UsMobileTradeInFooter socialIcons={undefined} />);

      const socialLinks = screen.getAllByRole('link').filter(
        (link) => link.hasAttribute('aria-label') &&
          (link.getAttribute('aria-label')?.includes('Visit US Mobile') || false)
      );
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it('has default brand text when not provided', () => {
      render(<UsMobileTradeInFooter brandText={undefined} />);

      expect(screen.getByText('US Mobile')).toBeInTheDocument();
    });

    it('has default copyright text when not provided', () => {
      render(<UsMobileTradeInFooter copyrightText={undefined} />);

      expect(screen.getByText(/© 2024 US Mobile/i)).toBeInTheDocument();
    });
  });
});
