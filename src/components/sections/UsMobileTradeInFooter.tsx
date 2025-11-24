import { useState } from 'react';
import styles from './UsMobileTradeInFooter.module.css';

/**
 * Represents a footer link
 */
export interface FooterLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

/**
 * Represents a social media icon
 */
export interface SocialIcon {
  name: string;
  href: string;
  ariaLabel: string;
  icon: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'reddit';
}

/**
 * Props for the UsMobileTradeInFooter component
 */
export interface UsMobileTradeInFooterProps {
  brandText?: string;
  brandDescription?: string;
  footerLinks?: FooterLink[];
  socialIcons?: SocialIcon[];
  copyrightText?: string;
  className?: string;
}

const DEFAULT_FOOTER_LINKS: FooterLink[] = [
  { label: 'About US Mobile', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Contact Support', href: '#' },
  { label: 'Trade-In FAQs', href: '#' },
  { label: 'Device Status', href: '#' },
];

const DEFAULT_SOCIAL_ICONS: SocialIcon[] = [
  {
    name: 'Facebook',
    href: '#',
    ariaLabel: 'Visit US Mobile on Facebook',
    icon: 'facebook',
  },
  {
    name: 'Twitter',
    href: '#',
    ariaLabel: 'Visit US Mobile on Twitter',
    icon: 'twitter',
  },
  {
    name: 'LinkedIn',
    href: '#',
    ariaLabel: 'Visit US Mobile on LinkedIn',
    icon: 'linkedin',
  },
  {
    name: 'Instagram',
    href: '#',
    ariaLabel: 'Visit US Mobile on Instagram',
    icon: 'instagram',
  },
];

/**
 * UsMobileTradeInFooter - Footer section for Trade In page
 *
 * Features:
 * - Brand information section
 * - Multiple footer links organized by column
 * - Social media icons with hover effects
 * - Copyright and legal information
 * - Fully responsive mobile-first design
 * - Accessible navigation with proper ARIA attributes
 * - Semantic HTML structure
 * - Color scheme matching Figma specification
 */
export function UsMobileTradeInFooter({
  brandText = 'US Mobile',
  brandDescription = 'The best way to get the most value from your old devices. Trade in with confidence.',
  footerLinks = DEFAULT_FOOTER_LINKS,
  socialIcons = DEFAULT_SOCIAL_ICONS,
  copyrightText = '© 2024 US Mobile. All rights reserved.',
  className = '',
}: UsMobileTradeInFooterProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const getSocialIcon = (icon: SocialIcon['icon']) => {
    const iconMap = {
      facebook: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={styles.socialSvg}
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      twitter: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={styles.socialSvg}
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      linkedin: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={styles.socialSvg}
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
      instagram: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={styles.socialSvg}
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 2.2c5.428 0 9.8 4.372 9.8 9.8s-4.372 9.8-9.8 9.8-9.8-4.372-9.8-9.8 4.372-9.8 9.8-9.8m0 1.55c-4.537 0-8.25 3.713-8.25 8.25s3.713 8.25 8.25 8.25 8.25-3.713 8.25-8.25-3.713-8.25-8.25-8.25m0 1.65c3.59 0 6.6 3.01 6.6 6.6s-3.01 6.6-6.6 6.6-6.6-3.01-6.6-6.6 3.01-6.6 6.6-6.6m4.35-1.43a1.04 1.04 0 100 2.08 1.04 1.04 0 000-2.08" />
        </svg>
      ),
      reddit: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={styles.socialSvg}
        >
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22.54C6.26 22.54 1.46 17.74 1.46 12S6.26 1.46 12 1.46s10.54 4.8 10.54 10.54-4.8 10.54-10.54 10.54zm3.89-15.66c-.78 0-1.42.64-1.42 1.42s.64 1.42 1.42 1.42 1.42-.64 1.42-1.42-.64-1.42-1.42-1.42zm-7.78 0c-.78 0-1.42.64-1.42 1.42s.64 1.42 1.42 1.42 1.42-.64 1.42-1.42-.64-1.42-1.42-1.42zm3.89 10.1c-2.02 0-3.71-1.18-4.23-2.77h-.07c-.19.52-.3 1.08-.3 1.66 0 2.36 1.85 4.28 4.13 4.28s4.13-1.92 4.13-4.28c0-.58-.11-1.14-.3-1.66h-.07c-.52 1.59-2.21 2.77-4.23 2.77zm0-7.36c-1.48 0-2.68 1.2-2.68 2.68 0 1.48 1.2 2.68 2.68 2.68s2.68-1.2 2.68-2.68c0-1.48-1.2-2.68-2.68-2.68z" />
        </svg>
      ),
    };
    return iconMap[icon];
  };

  return (
    <footer className={`${styles.footer} ${className}`} aria-label="Footer">
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>{brandText}</h3>
            <p className={styles.brandDescription}>{brandDescription}</p>
          </div>

          {/* Links Section */}
          <nav className={styles.linksSection} aria-label="Footer navigation">
            <ul className={styles.linksList}>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={styles.link}
                    aria-label={link.ariaLabel || link.label}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons Section */}
          <div
            className={styles.socialSection}
            aria-label="Follow us on social media"
          >
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`${styles.socialIcon} ${
                  hoveredIcon === social.name ? styles.hovered : ''
                }`}
                aria-label={social.ariaLabel}
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                title={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
