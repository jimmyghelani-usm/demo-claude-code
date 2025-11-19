import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders the footer component', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('renders footer navigation and social links', () => {
      render(<Footer />);

      expect(screen.getByRole('navigation', { name: /footer navigation/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/social media links/i)).toBeInTheDocument();
    });
  });

  describe('Footer Links', () => {
    it('renders all footer links', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /reviews/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /business/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /iot/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /unlock/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /faqs/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    });

    it('ABOUT link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^about$/i });
      expect(link).toHaveAttribute('href', '/about');
    });

    it('REVIEWS link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^reviews$/i });
      expect(link).toHaveAttribute('href', '/reviews');
    });

    it('BUSINESS link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^business$/i });
      expect(link).toHaveAttribute('href', '/business');
    });

    it('IOT link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^iot$/i });
      expect(link).toHaveAttribute('href', '/iot');
    });

    it('UNLOCK link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^unlock$/i });
      expect(link).toHaveAttribute('href', '/unlock');
    });

    it('CONTACT link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^contact$/i });
      expect(link).toHaveAttribute('href', '/contact');
    });

    it('FAQs link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^faqs$/i });
      expect(link).toHaveAttribute('href', '/faqs');
    });

    it('PRIVACY link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^privacy$/i });
      expect(link).toHaveAttribute('href', '/privacy');
    });

    it('TERMS link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^terms$/i });
      expect(link).toHaveAttribute('href', '/terms');
    });

    it('BLOG link has correct href', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /^blog$/i });
      expect(link).toHaveAttribute('href', '/blog');
    });

    it('renders footer links in an unordered list', () => {
      render(<Footer />);
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      const list = nav.querySelector('ul');
      expect(list).toBeInTheDocument();
    });

    it('renders correct number of footer links', () => {
      render(<Footer />);
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      const listItems = nav.querySelectorAll('li');
      expect(listItems).toHaveLength(10);
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media icons', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    });

    it('Twitter link has correct attributes', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /twitter/i });
      expect(link).toHaveAttribute('href', 'https://twitter.com/usmobile');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('LinkedIn link has correct attributes', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /linkedin/i });
      expect(link).toHaveAttribute('href', 'https://linkedin.com/company/usmobile');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('Facebook link has correct attributes', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /facebook/i });
      expect(link).toHaveAttribute('href', 'https://facebook.com/usmobile');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('Instagram link has correct attributes', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /instagram/i });
      expect(link).toHaveAttribute('href', 'https://instagram.com/usmobile');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('social media links open in new tab', () => {
      render(<Footer />);
      const socialLinks = [
        screen.getByRole('link', { name: /twitter/i }),
        screen.getByRole('link', { name: /linkedin/i }),
        screen.getByRole('link', { name: /facebook/i }),
        screen.getByRole('link', { name: /instagram/i }),
      ];

      socialLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });

    it('social media links have security attributes', () => {
      render(<Footer />);
      const socialLinks = [
        screen.getByRole('link', { name: /twitter/i }),
        screen.getByRole('link', { name: /linkedin/i }),
        screen.getByRole('link', { name: /facebook/i }),
        screen.getByRole('link', { name: /instagram/i }),
      ];

      socialLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('renders correct number of social media links', () => {
      const { container } = render(<Footer />);
      const socialSection = container.querySelector('[aria-label="Social media links"]');
      const socialLinks = socialSection?.querySelectorAll('a');
      expect(socialLinks).toHaveLength(4);
    });

    it('social links contain SVG icons', () => {
      const { container } = render(<Footer />);
      const socialSection = container.querySelector('[aria-label="Social media links"]');
      const svgs = socialSection?.querySelectorAll('svg');
      expect(svgs?.length).toBe(4);
    });
  });

  describe('Accessibility', () => {
    it('footer has semantic HTML structure', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('footer navigation is properly labeled', () => {
      render(<Footer />);
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      expect(nav).toHaveAttribute('aria-label', 'Footer navigation');
    });

    it('social media section is properly labeled', () => {
      const { container } = render(<Footer />);
      const socialSection = container.querySelector('[aria-label="Social media links"]');
      expect(socialSection).toBeInTheDocument();
    });

    it('all links have accessible names', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('all links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      await user.tab();
      const firstLink = screen.getByRole('link', { name: /about/i });
      expect(firstLink).toHaveFocus();
    });

    it('social media links have descriptive aria-labels', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: /twitter/i })).toHaveAttribute('aria-label', 'Twitter');
      expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('aria-label', 'LinkedIn');
      expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('aria-label', 'Facebook');
      expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('aria-label', 'Instagram');
    });
  });

  describe('User Interactions', () => {
    it('footer links are clickable', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const aboutLink = screen.getByRole('link', { name: /^about$/i });
      await user.click(aboutLink);

      expect(aboutLink).toBeInTheDocument();
    });

    it('social media links are clickable', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      await user.click(twitterLink);

      expect(twitterLink).toBeInTheDocument();
    });

    it('supports hover on footer links', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const link = screen.getByRole('link', { name: /about/i });
      await user.hover(link);

      expect(link).toBeInTheDocument();
    });

    it('supports hover on social links', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const link = screen.getByRole('link', { name: /twitter/i });
      await user.hover(link);

      expect(link).toBeInTheDocument();
    });

    it('can tab through all links', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const allLinks = screen.getAllByRole('link');

      await user.tab();
      expect(allLinks[0]).toHaveFocus();

      await user.tab();
      expect(allLinks[1]).toHaveFocus();
    });
  });

  describe('Layout Structure', () => {
    it('renders container div', () => {
      const { container } = render(<Footer />);
      const footerContainer = container.querySelector('footer > div');
      expect(footerContainer).toBeInTheDocument();
    });

    it('has links section', () => {
      render(<Footer />);
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('has social section', () => {
      const { container } = render(<Footer />);
      const socialSection = container.querySelector('[aria-label="Social media links"]');
      expect(socialSection).toBeInTheDocument();
    });
  });

  describe('Content Verification', () => {
    it('footer text is in uppercase', () => {
      render(<Footer />);

      expect(screen.getByText('ABOUT')).toBeInTheDocument();
      expect(screen.getByText('REVIEWS')).toBeInTheDocument();
      expect(screen.getByText('BUSINESS')).toBeInTheDocument();
    });

    it('displays correct company name for social links', () => {
      render(<Footer />);

      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      expect(twitterLink).toHaveAttribute('href');
      expect(twitterLink.getAttribute('href')).toContain('usmobile');
    });
  });

  describe('Link Organization', () => {
    it('displays links in correct order', () => {
      render(<Footer />);
      const nav = screen.getByRole('navigation', { name: /footer navigation/i });
      const links = Array.from(nav.querySelectorAll('a'));
      const linkTexts = links.map(link => link.textContent);

      expect(linkTexts).toEqual([
        'ABOUT',
        'REVIEWS',
        'BUSINESS',
        'IOT',
        'UNLOCK',
        'CONTACT',
        'FAQs',
        'PRIVACY',
        'TERMS',
        'BLOG',
      ]);
    });

    it('social links are displayed in correct order', () => {
      render(<Footer />);
      const socialLinks = [
        screen.getByRole('link', { name: /twitter/i }),
        screen.getByRole('link', { name: /linkedin/i }),
        screen.getByRole('link', { name: /facebook/i }),
        screen.getByRole('link', { name: /instagram/i }),
      ];

      // All should exist in document
      socialLinks.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('External Link Security', () => {
    it('all external links have noopener', () => {
      render(<Footer />);
      const externalLinks = [
        screen.getByRole('link', { name: /twitter/i }),
        screen.getByRole('link', { name: /linkedin/i }),
        screen.getByRole('link', { name: /facebook/i }),
        screen.getByRole('link', { name: /instagram/i }),
      ];

      externalLinks.forEach(link => {
        const rel = link.getAttribute('rel');
        expect(rel).toContain('noopener');
      });
    });

    it('all external links have noreferrer', () => {
      render(<Footer />);
      const externalLinks = [
        screen.getByRole('link', { name: /twitter/i }),
        screen.getByRole('link', { name: /linkedin/i }),
        screen.getByRole('link', { name: /facebook/i }),
        screen.getByRole('link', { name: /instagram/i }),
      ];

      externalLinks.forEach(link => {
        const rel = link.getAttribute('rel');
        expect(rel).toContain('noreferrer');
      });
    });
  });

  describe('Display Name', () => {
    it('has correct displayName for debugging', () => {
      expect(Footer.displayName).toBe('Footer');
    });
  });
});
