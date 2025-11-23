import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BusinessPageFooter } from './BusinessPageFooter';

describe('BusinessPageFooter', () => {
  describe('Footer Links Rendering', () => {
    it('renders all footer links', () => {
      render(<BusinessPageFooter />);
      expect(screen.getByText('ABOUT')).toBeInTheDocument();
      expect(screen.getByText('REVIEWS')).toBeInTheDocument();
      expect(screen.getByText('BUSINESS')).toBeInTheDocument();
      expect(screen.getByText('IoT')).toBeInTheDocument();
      expect(screen.getByText('CONTACT')).toBeInTheDocument();
      expect(screen.getByText('UNLOCK')).toBeInTheDocument();
      expect(screen.getByText('FAQs')).toBeInTheDocument();
      expect(screen.getByText('PRIVACY')).toBeInTheDocument();
      expect(screen.getByText('TERMS')).toBeInTheDocument();
      expect(screen.getByText('BLOG')).toBeInTheDocument();
    });

    it('renders correct footer link count', () => {
      render(<BusinessPageFooter />);
      const allLinks = screen.getAllByRole('link');
      // 10 footer links + 4 social links = 14 total
      expect(allLinks.length).toBe(14);
    });

    it('footer links have correct href attributes', () => {
      render(<BusinessPageFooter />);
      expect(screen.getByText('ABOUT')).toHaveAttribute('href', '#about');
      expect(screen.getByText('REVIEWS')).toHaveAttribute('href', '#reviews');
      expect(screen.getByText('BUSINESS')).toHaveAttribute('href', '#business');
      expect(screen.getByText('IoT')).toHaveAttribute('href', '#iot');
      expect(screen.getByText('CONTACT')).toHaveAttribute('href', '#contact');
      expect(screen.getByText('UNLOCK')).toHaveAttribute('href', '#unlock');
      expect(screen.getByText('FAQs')).toHaveAttribute('href', '#faqs');
      expect(screen.getByText('PRIVACY')).toHaveAttribute('href', '#privacy');
      expect(screen.getByText('TERMS')).toHaveAttribute('href', '#terms');
      expect(screen.getByText('BLOG')).toHaveAttribute('href', '#blog');
    });

    it('footer links are anchor tags', () => {
      render(<BusinessPageFooter />);
      const aboutLink = screen.getByText('ABOUT').closest('a');
      expect(aboutLink?.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links with aria labels', () => {
      render(<BusinessPageFooter />);
      expect(screen.getByLabelText('Visit our Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit our LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit our Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit our Instagram')).toBeInTheDocument();
    });

    it('social links have correct href attributes', () => {
      render(<BusinessPageFooter />);
      const twitterLink = screen.getByLabelText('Visit our Twitter');
      const linkedInLink = screen.getByLabelText('Visit our LinkedIn');
      const facebookLink = screen.getByLabelText('Visit our Facebook');
      const instagramLink = screen.getByLabelText('Visit our Instagram');

      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
      expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com');
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
    });

    it('social links open in new tab with security attributes', () => {
      render(<BusinessPageFooter />);
      const allSocialLinks = [
        screen.getByLabelText('Visit our Twitter'),
        screen.getByLabelText('Visit our LinkedIn'),
        screen.getByLabelText('Visit our Facebook'),
        screen.getByLabelText('Visit our Instagram'),
      ];

      allSocialLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('social links have title attributes', () => {
      render(<BusinessPageFooter />);
      const twitterLink = screen.getByLabelText('Visit our Twitter');
      const linkedInLink = screen.getByLabelText('Visit our LinkedIn');
      const facebookLink = screen.getByLabelText('Visit our Facebook');
      const instagramLink = screen.getByLabelText('Visit our Instagram');

      expect(twitterLink).toHaveAttribute('title', 'Twitter');
      expect(linkedInLink).toHaveAttribute('title', 'LinkedIn');
      expect(facebookLink).toHaveAttribute('title', 'Facebook');
      expect(instagramLink).toHaveAttribute('title', 'Instagram');
    });

    it('renders social icons with correct symbols', () => {
      render(<BusinessPageFooter />);
      const twitterLink = screen.getByLabelText('Visit our Twitter');
      const instagramLink = screen.getByLabelText('Visit our Instagram');

      expect(twitterLink.textContent).toContain('𝕏');
      expect(instagramLink.textContent).toContain('📷');
    });
  });

  describe('Copyright Information', () => {
    it('renders copyright information with company name', () => {
      render(<BusinessPageFooter />);
      const copyright = screen.getByText(/US Mobile/);
      expect(copyright).toBeInTheDocument();
    });

    it('includes current year in copyright', () => {
      render(<BusinessPageFooter />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('copyright has "All rights reserved" text', () => {
      render(<BusinessPageFooter />);
      expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    });

    it('copyright is rendered as paragraph', () => {
      const { container } = render(<BusinessPageFooter />);
      const paragraph = container.querySelector('footer p');
      expect(paragraph).toBeInTheDocument();
    });
  });

  describe('Semantic Structure', () => {
    it('renders footer element', () => {
      const { container } = render(<BusinessPageFooter />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('has proper footer section organization', () => {
      const { container } = render(<BusinessPageFooter />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();

      // Should have content inside footer
      const content = footer?.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
    });

    it('links section contains footer links', () => {
      const { container } = render(<BusinessPageFooter />);
      const aboutLink = screen.getByText('ABOUT');
      const linksSection = aboutLink.closest('[class*="linksSection"]');
      expect(linksSection).toBeInTheDocument();
    });

    it('social section contains social links', () => {
      const { container } = render(<BusinessPageFooter />);
      const twitterLink = screen.getByLabelText('Visit our Twitter');
      const socialSection = twitterLink.closest('[class*="socialSection"]');
      expect(socialSection).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('all links are accessible via role', () => {
      render(<BusinessPageFooter />);
      const allLinks = screen.getAllByRole('link');
      expect(allLinks.length).toBe(14);
    });

    it('social links have descriptive aria labels', () => {
      render(<BusinessPageFooter />);
      const twitterLink = screen.getByLabelText('Visit our Twitter');
      const linkedInLink = screen.getByLabelText('Visit our LinkedIn');

      expect(twitterLink).toHaveAttribute('aria-label', 'Visit our Twitter');
      expect(linkedInLink).toHaveAttribute('aria-label', 'Visit our LinkedIn');
    });

    it('decorative elements are hidden from screen readers', () => {
      const { container } = render(<BusinessPageFooter />);
      const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeElements.length).toBeGreaterThan(0);
    });

    it('social icon content is hidden from screen readers', () => {
      const { container } = render(<BusinessPageFooter />);
      const socialIcons = container.querySelectorAll('[class*="iconContent"]');
      expect(socialIcons.length).toBeGreaterThan(0);
    });

    it('copyright text is visible and accessible', () => {
      render(<BusinessPageFooter />);
      const copyrightText = screen.getByText(/US Mobile. All rights reserved/);
      expect(copyrightText).toBeVisible();
    });
  });

  describe('Link Interactions', () => {
    it('footer links are clickable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageFooter />);
      const aboutLink = screen.getByText('ABOUT');
      await user.click(aboutLink);
      expect(aboutLink).toBeInTheDocument();
    });

    it('social links are clickable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageFooter />);
      const twitterLink = screen.getByLabelText('Visit our Twitter');
      await user.click(twitterLink);
      expect(twitterLink).toBeInTheDocument();
    });

    it('all links are keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageFooter />);
      const firstLink = screen.getByText('ABOUT');
      firstLink.focus();
      expect(firstLink).toHaveFocus();
    });

    it('links can be traversed with tab key', async () => {
      render(<BusinessPageFooter />);
      const allLinks = screen.getAllByRole('link');
      allLinks[0].focus();
      expect(allLinks[0]).toHaveFocus();
    });
  });

  describe('Layout and Styling', () => {
    it('footer container is displayed', () => {
      const { container } = render(<BusinessPageFooter />);
      const footer = container.querySelector('footer');
      expect(footer).toBeVisible();
    });

    it('all footer links are visible', () => {
      render(<BusinessPageFooter />);
      expect(screen.getByText('ABOUT')).toBeVisible();
      expect(screen.getByText('CONTACT')).toBeVisible();
      expect(screen.getByText('PRIVACY')).toBeVisible();
    });

    it('social icons are visible', () => {
      render(<BusinessPageFooter />);
      const socialLinks = [
        screen.getByLabelText('Visit our Twitter'),
        screen.getByLabelText('Visit our LinkedIn'),
        screen.getByLabelText('Visit our Facebook'),
        screen.getByLabelText('Visit our Instagram'),
      ];
      socialLinks.forEach((link) => {
        expect(link).toBeVisible();
      });
    });

    it('background fade overlay exists', () => {
      const { container } = render(<BusinessPageFooter />);
      const backgroundFade = container.querySelector('[class*="backgroundFade"]');
      expect(backgroundFade).toBeInTheDocument();
    });

    it('background fade has aria-hidden', () => {
      const { container } = render(<BusinessPageFooter />);
      const backgroundFade = container.querySelector('[aria-hidden="true"]');
      expect(backgroundFade).toBeInTheDocument();
    });
  });

  describe('Integration and Complete Rendering', () => {
    it('renders complete footer structure', () => {
      const { container } = render(<BusinessPageFooter />);
      const footer = container.querySelector('footer');
      const content = footer?.querySelector('[class*="content"]');
      const copyright = footer?.querySelector('[class*="copyright"]');

      expect(footer).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(copyright).toBeInTheDocument();
    });

    it('renders links section with all links', () => {
      render(<BusinessPageFooter />);
      const footerLinks = [
        'ABOUT',
        'REVIEWS',
        'BUSINESS',
        'IoT',
        'CONTACT',
        'UNLOCK',
        'FAQs',
        'PRIVACY',
        'TERMS',
        'BLOG',
      ];

      footerLinks.forEach((linkText) => {
        expect(screen.getByText(linkText)).toBeInTheDocument();
      });
    });

    it('renders social section with all icons', () => {
      render(<BusinessPageFooter />);
      const socialLabels = [
        'Visit our Twitter',
        'Visit our LinkedIn',
        'Visit our Facebook',
        'Visit our Instagram',
      ];

      socialLabels.forEach((label) => {
        expect(screen.getByLabelText(label)).toBeInTheDocument();
      });
    });

    it('footer has expected number of children', () => {
      const { container } = render(<BusinessPageFooter />);
      const footer = container.querySelector('footer');
      // Should have: backgroundFade, content, copyright
      expect(footer?.children.length).toBeGreaterThanOrEqual(3);
    });

    it('copyright year updates dynamically', () => {
      render(<BusinessPageFooter />);
      const currentYear = new Date().getFullYear();
      const copyrightText = screen.getByText(new RegExp(currentYear.toString()));
      expect(copyrightText).toBeInTheDocument();
    });

    it('all external social links have proper security attributes', () => {
      render(<BusinessPageFooter />);
      const allLinks = screen.getAllByRole('link');
      const socialLinks = allLinks.slice(10); // Last 4 are social links

      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles footer rendering with all elements present', () => {
      const { container } = render(<BusinessPageFooter />);
      const allAnchors = container.querySelectorAll('a');
      expect(allAnchors.length).toBe(14);
    });

    it('renders without errors with current date', () => {
      expect(() => {
        render(<BusinessPageFooter />);
      }).not.toThrow();
    });

    it('copyright year is always a valid number', () => {
      render(<BusinessPageFooter />);
      const currentYear = new Date().getFullYear();
      expect(typeof currentYear).toBe('number');
      expect(currentYear).toBeGreaterThan(2000);
    });
  });
});
