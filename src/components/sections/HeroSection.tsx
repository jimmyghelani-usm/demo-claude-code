import React from 'react';
import styles from './HeroSection.module.css';

/**
 * HeroSection component - US Mobile Protect Hero with Navigation
 * Updated to match Figma design node 2171:9951
 *
 * Figma Reference:
 * - Node: 2171:9951 (1440px width, full hero section)
 *
 * Design Specifications (node 2171:9951):
 * - Header: 1440px × 60px with logo, navigation, and action buttons
 * - Feature Section: 4-column grid of feature cards
 * - Content Width: 1110px (165px padding on each side)
 * - Card Size: 203px × 236px with 99px horizontal gap
 *
 * Components:
 * - Header Navigation: Logo, menu items (PLANS, NETWORKS, HOW IT WORKS, SHOP)
 * - Action Buttons: Bag icon (with notification dot), Chat icon, Get Started CTA, Sign In
 * - Feature Cards: 4 cards with icon, title, and description
 *
 * Features:
 * - Full-width navigation header
 * - Semantic HTML with WCAG 2.1 AA accessibility
 * - Responsive design with mobile breakpoints
 * - Clean, modern US Mobile Protect branding
 */
export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Header Navigation */}
      <header className={styles.header} role="banner">
        <div className={styles.headerContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <a href="/" aria-label="US Mobile home">
              <span className={styles.logoText}>USmobile</span>
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="/plans" className={styles.navLink}>
              PLANS
            </a>
            <a href="/networks" className={styles.navLink}>
              NETWORKS
            </a>
            <a href="/how-it-works" className={styles.navLink}>
              HOW IT WORKS
            </a>
            <a href="/shop" className={styles.navLink}>
              SHOP
            </a>
          </nav>

          {/* Action Buttons */}
          <div className={styles.actions}>
            {/* Bag Icon with Notification Dot */}
            <button
              className={styles.iconButton}
              type="button"
              aria-label="Shopping bag"
            >
              <div className={styles.iconPlaceholder}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2L3 6V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V6L14 2H6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 10C13 11.0609 12.5786 12.0783 11.8284 12.8284C11.0783 13.5786 10.0609 14 9 14C7.93913 14 6.92172 13.5786 6.17157 12.8284C5.42143 12.0783 5 11.0609 5 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.notificationDot} aria-hidden="true" />
              </div>
            </button>

            {/* Chat Icon */}
            <button
              className={styles.iconButton}
              type="button"
              aria-label="Open chat support"
            >
              <div className={styles.iconPlaceholder}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M18 9.5C18 13.6421 14.4183 17 10 17C8.67039 17 7.40855 16.6896 6.28427 16.1346L2 18L3.86541 13.7157C3.31038 12.5915 3 11.3296 3 10C3 5.85786 6.58172 2.5 11 2.5C15.4183 2.5 18 5.35786 18 9.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Get Started Button */}
            <button className={styles.primaryButton} type="button">
              Get Started
            </button>

            {/* Sign In Button */}
            <button className={styles.secondaryButton} type="button">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <section className={styles.featureSection} aria-labelledby="features-heading">
        <div className={styles.container}>
          <h2 id="features-heading" className={styles.sectionTitle}>
            Protect Your Device with US Mobile
          </h2>

          {/* Feature Cards */}
          <div className={styles.featureCards}>
            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M20 10V20L26 26"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Device Protection</h3>
              <p className={styles.cardDescription}>
                Comprehensive coverage for your device against accidental damage, theft, and
                malfunctions.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L8 12V18C8 26 14 32 20 34C26 32 32 26 32 18V12L20 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Fast Claims</h3>
              <p className={styles.cardDescription}>
                Quick and easy claims process with rapid approval and device replacement or repair.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M20 12V20H28"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Nationwide Coverage</h3>
              <p className={styles.cardDescription}>
                Protection that works wherever you go, with coverage across the entire United
                States.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 34C27.732 34 34 27.732 34 20C34 12.268 27.732 6 20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 14V20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="26" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>24/7 Support</h3>
              <p className={styles.cardDescription}>
                Round-the-clock customer support available whenever you need assistance with your
                device.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

HeroSection.displayName = 'HeroSection';
