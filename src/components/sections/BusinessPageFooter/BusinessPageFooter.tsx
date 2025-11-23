import React from 'react';
import styles from './BusinessPageFooter.module.css';

/**
 * BusinessPageFooter Component
 * Complete footer with social icons and footer links
 * Features:
 * - Social media icons (Twitter, LinkedIn, Facebook, Instagram)
 * - Footer links organized horizontally
 * - Background image with gradient fade
 * - Responsive layout
 */
export function BusinessPageFooter() {
  const socialLinks = [
    { icon: 'twitter', label: 'Twitter', href: 'https://twitter.com' },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
    { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  ];

  const footerLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'BUSINESS', href: '#business' },
    { label: 'IoT', href: '#iot' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'UNLOCK', href: '#unlock' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'PRIVACY', href: '#privacy' },
    { label: 'TERMS', href: '#terms' },
    { label: 'BLOG', href: '#blog' },
  ];

  const getSocialIcon = (icon: string) => {
    const icons: Record<string, string> = {
      twitter: '𝕏',
      linkedin: 'in',
      facebook: 'f',
      instagram: '📷',
    };
    return icons[icon] || icon;
  };

  return (
    <footer className={styles.footer}>
      {/* Background Fade Overlay */}
      <div className={styles.backgroundFade} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {/* Footer Links - Left Section */}
          <div className={styles.linksSection}>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.footerLink}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons - Right Section */}
          <div className={styles.socialSection}>
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                href={social.href}
                className={styles.socialIcon}
                aria-label={`Visit our ${social.label}`}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
              >
                <span className={styles.iconContent}>
                  {getSocialIcon(social.icon)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} US Mobile. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
